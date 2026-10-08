import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/views/ProductDetail'
import { catalog } from '@/lib/catalog-server'
import { StructuredData } from '@/components/StructuredData'
import { absoluteUrl } from '@/lib/site'
import { hasIndexableProductContent } from '@/lib/seo'

type ProductPageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await catalog.getProductByHandle(id)
  if (!product) return { title: 'Product not found', robots: { index: false, follow: false } }

  const description = product.description || `Shop ${product.name} from Zul Luz.`
  const canonical = `/product/${product.id}`
  return {
    title: product.name,
    description,
    alternates: { canonical },
    ...(!hasIndexableProductContent(product) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: product.name,
      description,
      url: absoluteUrl(canonical),
      images: product.images.map((url) => ({ url, alt: product.name })),
    },
    twitter: { card: 'summary_large_image', title: product.name, description, images: product.images.slice(0, 1) },
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { id } = await params
  const product = await catalog.getProductByHandle(id)
  if (!product) notFound()
  const available = product.variants?.some((variant) => variant.availableForSale) ?? true
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || product.subtitle,
        image: product.images,
        sku: product.id,
        brand: { '@type': 'Brand', name: 'Zul Luz' },
        offers: {
          '@type': 'Offer',
          priceCurrency: product.currencyCode || 'USD',
          price: product.price.toFixed(2),
          availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: absoluteUrl(`/product/${product.id}`),
        },
      }} />
      <ProductDetail product={product} />
    </>
  )
}
