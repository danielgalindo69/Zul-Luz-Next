import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'

const categories = new Set(['lingerie', 'sleepwear', 'lifestyle', 'best-sellers'])
const metadataByCategory: Record<string, Pick<Metadata, 'title' | 'description'>> = {
  lingerie: {
    title: 'Luxury Lingerie & Lace Bras',
    description: 'Explore bras, bralettes, and women’s lingerie by Zul Luz, with styles for comfort, support, and everyday confidence.',
  },
  sleepwear: {
    title: 'Women’s Sleepwear & Pajama Sets',
    description: 'Discover women’s pajama sets, robes, and nightgowns from Zul Luz, designed for comfort at home and restful nights.',
  },
  lifestyle: {
    title: 'Botanical Wax, Scrunchies & Wayuu Bags',
    description: 'Explore botanical wax air fresheners, crochet and silk scrunchies, and Wayuu bags from Zul Luz.',
  },
  'best-sellers': {
    title: 'Best-Selling Lingerie & Sleepwear',
    description: 'Browse popular Zul Luz lingerie, sleepwear, and lifestyle products available in the current collection.',
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
