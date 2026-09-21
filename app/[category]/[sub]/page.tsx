import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'
import { catalog } from '@/lib/catalog-server'

export default async function Page({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params
  const products = await catalog.getProductsBySubcategory(sub)
  if (!['lingerie', 'lifestyle'].includes(category) || !products.some((product) => product.category === category)) notFound()
  return <CategoryPage />
}
