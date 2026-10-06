import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'

const subcategories: Record<string, Set<string>> = {
  lingerie: new Set(['bras', 'panties', 'sets']),
  sleepwear: new Set(['pajama-sets', 'robes', 'nightgowns']),
  lifestyle: new Set(['home-fragrance', 'scrunchies', 'accessories', 'bags']),
}
const metadataBySubcategory: Record<string, Pick<Metadata, 'title' | 'description'>> = {
  bras: { title: 'Bras', description: 'Discover elegant bras designed for everyday support, softness, and confidence.' },
  panties: { title: 'Panties', description: 'Shop refined panties crafted for delicate, second-skin comfort.' },
  sets: { title: 'Lingerie Sets', description: 'Explore coordinated Zul Luz lingerie sets for a complete, elegant look.' },
  'pajama-sets': { title: 'Pajama Sets', description: 'Shop soft, polished pajama sets designed for beautiful rest.' },
  robes: { title: 'Robes', description: 'Discover elegant robes for slow mornings, quiet evenings, and everyday rituals.' },
  nightgowns: { title: 'Nightgowns', description: 'Explore feminine nightgowns with a soft, elegant drape.' },
  'home-fragrance': { title: 'Botanical Wax & Fragrance', description: 'Shop botanical scented wax pieces that bring a lasting ritual of fragrance to your home.' },
  scrunchies: { title: 'Scrunchies', description: 'Discover gentle, elegant scrunchies designed as a small daily luxury.' },
  bags: { title: 'Handmade Bags', description: 'Shop handmade Wayuu bags that celebrate Colombian artisan craft.' },
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; sub: string }> }): Promise<Metadata> {
  const { category, sub } = await params
  const metadata = metadataBySubcategory[sub]
  if (!subcategories[category]?.has(sub) || !metadata) {
    return { title: 'Collection not found', robots: { index: false, follow: false } }
  }
  return { ...metadata, alternates: { canonical: `/${category}/${sub}` } }
}

export default async function Page({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params
  if (!subcategories[category]?.has(sub)) notFound()
  return <CategoryPage />
}
