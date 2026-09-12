import { notFound } from 'next/navigation'
import ProductDetail from '@/pages/ProductDetail'
import { catalog } from '@/lib/catalog'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!await catalog.getProductByHandle(id)) notFound()
  return <ProductDetail />
}
