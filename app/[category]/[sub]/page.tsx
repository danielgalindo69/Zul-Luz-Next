import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPage from '@/views/CategoryPage'
import { catalog } from '@/lib/catalog-server'

const subcategories: Record<string, Set<string>> = {
  lingerie: new Set(['bras', 'panties', 'sets']),
  sleepwear: new Set(['pajama-sets', 'robes', 'nightgowns']),
  lifestyle: new Set(['home-fragrance', 'scrunchies', 'accessories', 'bags']),
}
const metadataBySubcategory: Record<string, Pick<Metadata, 'title' | 'description'>> = {
  bras: { title: 'Lace Bras & Bralettes', description: 'Shop Zul Luz bras and bralettes, including lace styles with wire-free and underwire options.' },
  panties: { title: 'Brazilian Panties, Thongs & Briefs', description: 'Explore women’s underwear from Zul Luz, including Brazilian panties, thongs, hipsters, and full-coverage briefs.' },
  sets: { title: 'Lingerie Sets', description: 'Explore matching Zul Luz bra and panty sets for a coordinated lingerie look.' },
  'pajama-sets': { title: 'Women’s Pajama Sets', description: 'Shop women’s pajama sets from Zul Luz, including short sets, button-down styles, and matching tops and pants.' },
  robes: { title: 'Women’s Robes & Bathrobes', description: 'Discover women’s robes from Zul Luz for relaxed mornings and evenings at home.' },
  nightgowns: { title: 'Women’s Nightgowns & Slip Dresses', description: 'Explore women’s nightgowns and slip-style sleepwear from Zul Luz.' },
  'home-fragrance': { title: 'Botanical Wax Air Fresheners', description: 'Shop botanical wax air fresheners and scented wax tablets for closets and small spaces.' },
  scrunchies: { title: 'Crochet & Silk Scrunchies', description: 'Explore crochet and silk scrunchies from Zul Luz, from colorful handmade styles to smooth hair accessories.' },
  bags: { title: 'Wayuu Bags & Colombian Artisan Bags', description: 'Shop Wayuu bags woven by artisans in La Guajira, Colombia, with each piece offering its own pattern and character.' },
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; sub: string }> }): Promise<Metadata> {
  const { category, sub } = await params
  const metadata = metadataBySubcategory[sub]
  if (!subcategories[category]?.has(sub) || !metadata) {
    return { title: 'Collection not found', robots: { index: false, follow: false } }
  }
  const products = await catalog.getProductsBySubcategory(sub)
  if (products.length === 0) {
    return { ...metadata, alternates: { canonical: `/${category}/${sub}` }, robots: { index: false, follow: true } }
  }
  return { ...metadata, alternates: { canonical: `/${category}/${sub}` } }
}

export default async function Page({ params }: { params: Promise<{ category: string; sub: string }> }) {
  const { category, sub } = await params
  if (!subcategories[category]?.has(sub)) notFound()
  return <CategoryPage />
}
