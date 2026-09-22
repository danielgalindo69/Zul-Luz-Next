import 'server-only'

type GraphQLError = {
  message: string
  extensions?: { code?: string }
}

type StorefrontResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

type StorefrontRequestOptions = {
  buyerIp?: string
  cache?: RequestCache
  revalidate?: number
}

export class StorefrontRequestError extends Error {
  constructor(message: string, readonly status = 502) {
    super(message)
    this.name = 'StorefrontRequestError'
  }
}

function getStorefrontConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim()
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim()

  if (!domain || !token || !version) {
    throw new StorefrontRequestError('Faltan variables de entorno de Shopify.', 503)
  }
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) {
    throw new StorefrontRequestError('El dominio técnico de Shopify no es válido.', 500)
  }
  if (!/^\d{4}-(01|04|07|10)$/.test(version)) {
    throw new StorefrontRequestError('La versión de Storefront API no es válida.', 500)
  }

  return { domain, token, version }
}

export async function storefrontRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: StorefrontRequestOptions = {},
): Promise<T> {
  const { domain, token, version } = getStorefrontConfig()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Shopify-Storefront-Private-Token': token,
  }

  if (options.buyerIp) headers['Shopify-Storefront-Buyer-IP'] = options.buyerIp

  let response: Response
  try {
    response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache: options.cache,
      next: options.revalidate === undefined ? undefined : { revalidate: options.revalidate },
    })
  } catch {
    throw new StorefrontRequestError('No fue posible conectar con Shopify.', 503)
  }

  if (!response.ok) {
    throw new StorefrontRequestError(`Shopify Storefront API respondió HTTP ${response.status}.`, 502)
  }

  let payload: StorefrontResponse<T>
  try {
    payload = await response.json() as StorefrontResponse<T>
  } catch {
    throw new StorefrontRequestError('Shopify devolvió una respuesta no válida.', 502)
  }

  if (payload.errors?.length) {
    throw new StorefrontRequestError(
      `Shopify rechazó la operación: ${payload.errors.map((error) => error.message).join('; ')}`,
      502,
    )
  }
  if (!payload.data) throw new StorefrontRequestError('La respuesta de Shopify está incompleta.', 502)

  return payload.data
}
