import type { MetadataRoute } from 'next'
import { catalog } from '@/lib/catalog-server'
import { absoluteUrl } from '@/lib/site'
import { hasIndexableProductContent } from '@/lib/seo'

export const revalidate = 3600

const staticRoutes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/lingerie', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/sleepwear', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/lifestyle', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/best-sellers', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/gift-ideas', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lingerie/bras', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lingerie/panties', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lingerie/sets', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sleepwear/pajama-sets', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sleepwear/robes', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sleepwear/nightgowns', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lifestyle/home-fragrance', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lifestyle/scrunchies', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/lifestyle/bags', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/size-guide', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/shipping-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/return-policy', changeFrequency: 'yearly', priority: 0.3 },
]

function getSitemapImageUrls(images: string[]) {
  return images.filter((image) => {
    if (!image || image.includes('/product-placeholder.svg')) return false

    try {
      const url = new URL(image)
      return url.protocol === 'https:' || url.protocol === 'http:'
    } catch {
      return false
    }
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: Awaited<ReturnType<typeof catalog.getProducts>> | null = null
  try {
    products = await catalog.getProducts()
  } catch (error) {
    // Keep the static sitemap available if Shopify is temporarily unavailable.
    console.error('Unable to include Shopify products in sitemap', error)
  }

  const availableProducts = products
  const routes: MetadataRoute.Sitemap = staticRoutes
    .filter((route) => {
      const collectionPath = route.path.match(/^\/(lingerie|sleepwear|lifestyle)\/([^/]+)$/)
      if (!collectionPath || !availableProducts) return true
      return availableProducts.some((product) => product.category === collectionPath[1] && product.subcategory === collectionPath[2])
    })
    .map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))

  if (products) {
    routes.push(...products.filter(hasIndexableProductContent).map((product) => ({
      url: absoluteUrl(`/product/${product.id}`),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      images: getSitemapImageUrls(product.images),
    })))
  }

  return routes
}
