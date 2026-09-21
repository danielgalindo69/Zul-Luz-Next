import { notFound } from 'next/navigation'
import ProductDetail from '@/views/ProductDetail'
import { catalog } from '@/lib/catalog-server'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await catalog.getProductByHandle(id)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
