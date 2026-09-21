import { cache } from 'react'
import { PRODUCTS, type CatalogRepository } from './catalog'
import type { Product, ProductColor, ProductVariant } from './types'

type Money = { amount: string; currencyCode: string }
type ShopifyVariant = {
  id: string
  availableForSale: boolean
  price: Money
  selectedOptions: { name: string; value: string }[]
}
type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  images: { nodes: { url: string }[] }
  options: { name: string; values: string[] }[]
  variants: { nodes: ShopifyVariant[] }
  collections: { nodes: { handle: string }[] }
  priceRange: { minVariantPrice: Money }
}
type ProductPage = {
  products: {
    nodes: ShopifyProduct[]
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
  }
}

const PRODUCT_QUERY = [
  'query CatalogProducts($cursor: String) {',
  '  products(first: 50, after: $cursor) {',
  '    pageInfo { hasNextPage endCursor }',
  '    nodes {',
  '      id handle title description productType',
  '      images(first: 8) { nodes { url } }',
  '      options { name values }',
  '      variants(first: 100) { nodes { id availableForSale price { amount currencyCode } selectedOptions { name value } } }',
  '      collections(first: 10) { nodes { handle } }',
  '      priceRange { minVariantPrice { amount currencyCode } }',
  '    }',
  '  }',
  '}',
].join('\n')

const COLOR_HEX: Record<string, string> = {
  black: '#1A1108', negro: '#1A1108',
  white: '#F5EDE4', blanco: '#F5EDE4', ivory: '#F5EDE4',
  wine: '#8C3F55', vino: '#8C3F55',
  blush: '#E8C4C4', pink: '#E8C4C4', rosa: '#E8C4C4',
  navy: '#2B3A5C', azul: '#2B3A5C',
  beige: '#D7C1A6', nude: '#D7C1A6',
}

function classify(product: ShopifyProduct): Pick<Product, 'category' | 'subcategory'> {
  const collections = product.collections.nodes.map((item) => item.handle.toLowerCase())
  const type = product.productType.toLowerCase()
  const title = product.title.toLowerCase()
  const has = (value: string) => collections.includes(value)

  if (has('sleepwear') || /pajama|pyjama|robe|slip dress|nightgown|sleep/.test(type + ' ' + title)) {
    const subcategory = /robe/.test(type + ' ' + title) ? 'robes'
      : /slip dress|nightgown/.test(type + ' ' + title) ? 'nightgowns'
      : 'pajama-sets'
    return { category: 'sleepwear', subcategory }
  }

  if (has('lingerie') || has('underwear') || /bra|bralet|panti|panty|thong|lingerie/.test(type + ' ' + title)) {
    const subcategory = /bra|bralet/.test(type + ' ' + title) ? 'bras'
      : /set/.test(type + ' ' + title) ? 'sets'
      : 'panties'
    return { category: 'lingerie', subcategory }
  }

  if (has('scrunchies') || /scrunchie/.test(type + ' ' + title)) {
    return { category: 'lifestyle', subcategory: 'scrunchies' }
  }
  if (has('home-fragrance') || /wax|fragrance|scent/.test(type + ' ' + title)) {
    return { category: 'lifestyle', subcategory: 'home-fragrance' }
  }
  return { category: 'lifestyle', subcategory: 'accessories' }
}

function mapProduct(product: ShopifyProduct): Product {
  const collections = product.collections.nodes.map((item) => item.handle.toLowerCase())
  const colorOption = product.options.find((option) => /^(colors?|colours?)$/i.test(option.name))
  const sizeOption = product.options.find((option) => /size|talla|tamaño|cup|copa/i.test(option.name))
  const colors: ProductColor[] = colorOption?.values.map((name) => ({
    name,
    hex: COLOR_HEX[name.trim().toLowerCase()] ?? '#D9D5D1',
  })) ?? [{ name: 'Standard', hex: '#D9D5D1' }]
  const variants: ProductVariant[] = product.variants.nodes.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    price: Number(variant.price.amount),
    selectedOptions: variant.selectedOptions,
  }))
  const { category, subcategory } = classify(product)
  const isBestSeller = collections.some((handle) => ['best-sellers', 'bets-sellers', 'bestsellers'].includes(handle))
  const images = product.images.nodes.map((image) => image.url)

  return {
    id: product.handle,
    name: product.title,
    subtitle: product.productType || '',
    price: Number(product.priceRange.minVariantPrice.amount),
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    category,
    subcategory,
    tag: isBestSeller ? 'Best Seller' : undefined,
    images: images.length > 0 ? images : ['/product-placeholder.svg'],
    description: product.description,
    material: '',
    usageGuide: [],
    colors,
    sizes: sizeOption?.values.length ? sizeOption.values : ['One Size'],
    isBestSeller,
    isGiftIdea: collections.includes('gift-ideas') || /gift card/i.test(product.productType),
    rating: 0,
    reviews: 0,
    source: 'shopify',
    colorOptionName: colorOption?.name,
    sizeOptionName: sizeOption?.name,
    variants,
  }
}

async function queryProducts(cursor: string | null): Promise<ProductPage> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim()
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim()
  if (!domain || !token || !version) throw new Error('Faltan variables de entorno de Shopify.')
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) throw new Error('El dominio técnico de Shopify no es válido.')
  if (!/^\d{4}-(01|04|07|10)$/.test(version)) throw new Error('La versión de Storefront API no es válida.')

  const response = await fetch('https://' + domain + '/api/' + version + '/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query: PRODUCT_QUERY, variables: { cursor } }),
    next: { revalidate: 300 },
  })
  if (!response.ok) throw new Error('Shopify Storefront API respondió HTTP ' + response.status + '.')
  const payload = await response.json() as { data?: ProductPage; errors?: { message: string }[] }
  if (payload.errors?.length) throw new Error('Error GraphQL de Shopify: ' + payload.errors.map((error) => error.message).join('; '))
  if (!payload.data?.products?.nodes) throw new Error('La respuesta del catálogo Shopify está incompleta.')
  return payload.data
}

export const getCatalogProducts = cache(async (): Promise<Product[]> => {
  // El boceto puede seguir ejecutándose sin credenciales en desarrollo local.
  if (process.env.NODE_ENV === 'development' &&
      !process.env.SHOPIFY_STORE_DOMAIN && !process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN) {
    return PRODUCTS
  }

  const products: Product[] = []
  let cursor: string | null = null
  for (let page = 0; page < 10; page += 1) {
    const result = await queryProducts(cursor)
    products.push(...result.products.nodes.map(mapProduct))
    if (!result.products.pageInfo.hasNextPage) return products
    cursor = result.products.pageInfo.endCursor
    if (!cursor) throw new Error('Shopify no devolvió el cursor para continuar el catálogo.')
  }
  throw new Error('El catálogo supera el límite inicial de 500 productos.')
})

class ShopifyCatalog implements CatalogRepository {
  getProducts() { return getCatalogProducts() }
  async getProductByHandle(handle: string) {
    return (await this.getProducts()).find((product) => product.id === handle) ?? null
  }
  async getProductsByCategory(category: string) {
    return (await this.getProducts()).filter((product) => product.category === category)
  }
  async getProductsBySubcategory(subcategory: string) {
    return (await this.getProducts()).filter((product) => product.subcategory === subcategory)
  }
  async getBestSellers() {
    return (await this.getProducts()).filter((product) => product.isBestSeller)
  }
  async getGiftIdeas() {
    return (await this.getProducts()).filter((product) => product.isGiftIdea)
  }
}

export const catalog: CatalogRepository = new ShopifyCatalog()
