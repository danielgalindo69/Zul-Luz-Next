import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'

const categories = new Set(['lingerie', 'sleepwear', 'lifestyle', 'best-sellers'])

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!categories.has(category)) notFound()
  return <CategoryPage />
}
