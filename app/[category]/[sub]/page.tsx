import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'

const subcategories: Record<string, Set<string>> = {
  lingerie: new Set(['bras', 'panties', 'sets']),
  sleepwear: new Set(['pajama-sets', 'robes', 'nightgowns']),
  lifestyle: new Set(['home-fragrance', 'scrunchies', 'accessories']),
}

export default async function Page({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params
  if (!subcategories[category]?.has(sub)) notFound()
  return <CategoryPage />
}
