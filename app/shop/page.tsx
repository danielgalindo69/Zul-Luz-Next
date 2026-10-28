import type { Metadata } from 'next'
import CategoryPage from '@/views/CategoryPage'

export const metadata: Metadata = {
  title: 'Shop All Lingerie, Sleepwear & Accessories',
  description: 'Browse all available Zul Luz lingerie, sleepwear, home fragrance, and accessories in one place.',
  alternates: { canonical: '/shop' },
}

export default function Page() {
  return <CategoryPage />
}
