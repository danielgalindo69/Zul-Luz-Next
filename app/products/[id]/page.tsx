import { notFound, permanentRedirect } from 'next/navigation'
import { catalog } from '@/lib/catalog-server'

type LegacyProductPageProps = { params: Promise<{ id: string }> }

/**
 * Preserve links indexed from Shopify's former `/products/{handle}` URLs.
 * Product detail pages in this storefront use `/product/{handle}` instead.
 */
export default async function LegacyProductPage({ params }: LegacyProductPageProps) {
  const { id } = await params
  const product = await catalog.getProductByHandle(id)

  // Do not redirect an unknown legacy handle to an unrelated product page.
  if (!product) notFound()

  permanentRedirect(`/product/${encodeURIComponent(product.id)}`)
}
