// Prueba local de lectura. No imprime ni almacena el token privado.
const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim()
const version = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim()
const summaryMode = process.argv.includes('--summary')

if (!domain || !token || !version) {
  console.error('Faltan SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_PRIVATE_TOKEN o SHOPIFY_STOREFRONT_API_VERSION en .env.local.')
  process.exit(1)
}

if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) {
  console.error('SHOPIFY_STORE_DOMAIN debe tener el formato tienda.myshopify.com, sin https:// ni rutas.')
  process.exit(1)
}

if (!/^\d{4}-(01|04|07|10)$/.test(version)) {
  console.error('SHOPIFY_STOREFRONT_API_VERSION debe tener el formato AAAA-MM.')
  process.exit(1)
}

const query = [
  'query ProductReadSmokeTest($first: Int!) {',
  '  shop { name }',
  '  products(first: $first) {',
  '    pageInfo { hasNextPage }',
  '    nodes {',
  '      id',
  '      handle',
  '      title',
  '      productType',
  '      collections(first: 5) { nodes { handle } }',
  '      options { name values }',
  '      featuredImage { url }',
  '      priceRange { minVariantPrice { amount currencyCode } }',
  '      variants(first: 5) { nodes { id title availableForSale } }',
  '    }',
  '  }',
  '}',
].join('\n')

try {
  const response = await fetch('https://' + domain + '/api/' + version + '/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query, variables: { first: summaryMode ? 50 : 5 } }),
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    console.error('Shopify respondió HTTP ' + response.status + '. Comprueba el dominio, el token privado de Headless y sus permisos.')
    process.exit(1)
  }

  const payload = await response.json()
  if (payload.errors?.length) {
    const messages = payload.errors.map((error) => String(error.message).slice(0, 250))
    console.error('Shopify devolvió errores GraphQL:', messages.join(' | '))
    process.exit(1)
  }

  if (!payload.data?.products?.nodes || !payload.data?.shop) {
    console.error('La respuesta de Shopify no contiene los datos esperados.')
    process.exit(1)
  }

  const products = payload.data.products.nodes
  console.log('Conexión correcta con la tienda:', payload.data.shop.name)
  console.log('Productos visibles para Headless:', products.length)
  if (summaryMode) {
    const countBy = (getKey) => {
      const counts = new Map()
      for (const product of products) {
        for (const key of getKey(product)) counts.set(key, (counts.get(key) ?? 0) + 1)
      }
      return [...counts].sort((a, b) => b[1] - a[1])
    }
    console.log('Tipos:', countBy((product) => [product.productType || 'sin tipo']))
    console.log('Colecciones:', countBy((product) => product.collections?.nodes?.map((collection) => collection.handle) ?? []))
    console.log('Hay más páginas:', payload.data.products.pageInfo.hasNextPage)
  } else {
    for (const product of products) {
      const price = product.priceRange?.minVariantPrice
      const priceLabel = price ? price.amount + ' ' + price.currencyCode : 'sin precio'
      console.log('- ' + product.title + ' [' + product.handle + '] | ' + priceLabel +
        ' | imagen: ' + (product.featuredImage ? 'sí' : 'no') +
        ' | variantes consultadas: ' + (product.variants?.nodes?.length ?? 0))
      console.log('  Tipo: ' + (product.productType || 'sin tipo') +
        ' | colecciones: ' + (product.collections?.nodes?.map((collection) => collection.handle).join(', ') || 'ninguna') +
        ' | opciones: ' + (product.options?.map((option) => option.name + '=' + option.values.join('/')).join(', ') || 'ninguna'))
    }
  }

  if (products.length === 0) {
    console.error('La API respondió, pero no hay productos visibles. Revisa publicación en Headless y el mercado de la tienda.')
    process.exitCode = 2
  }
} catch (error) {
  const reason = error?.name === 'TimeoutError' ? 'se agotó el tiempo de espera' : 'falló la conexión de red'
  console.error('No se pudo completar la consulta: ' + reason + '.')
  process.exitCode = 1
}
