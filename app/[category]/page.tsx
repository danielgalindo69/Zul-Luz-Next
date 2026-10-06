import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'

const categories = new Set(['lingerie', 'sleepwear', 'lifestyle', 'best-sellers'])
const metadataByCategory: Record<string, Pick<Metadata, 'title' | 'description'>> = {
  lingerie: {
    title: 'Luxury Lingerie',
    description: 'Explore Zul Luz bras, panties, and lingerie sets created for timeless comfort and confidence.',
  },
  sleepwear: {
    title: 'Silk-Feel Sleepwear',
    description: 'Discover elegant pajama sets, robes, and nightgowns for beautiful rituals of rest.',
  },
  lifestyle: {
    title: 'Lifestyle Collection',
    description: 'Shop botanical wax, scrunchies, handmade bags, and thoughtful lifestyle pieces from Zul Luz.',
  },
  'best-sellers': {
    title: 'Best Sellers',
    description: 'Shop the most-loved Zul Luz lingerie, sleepwear, and lifestyle pieces.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const metadata = metadataByCategory[category]
  if (!metadata) return { title: 'Collection not found', robots: { index: false, follow: false } }
  return { ...metadata, alternates: { canonical: `/${category}` } }
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!categories.has(category)) notFound()
  return <CategoryPage />
}
