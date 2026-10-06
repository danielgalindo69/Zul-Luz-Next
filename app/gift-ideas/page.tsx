import type { Metadata } from 'next'
import GiftIdeas from '@/views/GiftIdeas'

export const metadata: Metadata = {
  title: 'Gift Ideas',
  description: 'Find thoughtful Zul Luz gifts in lingerie, sleepwear, botanical wax, and lifestyle pieces.',
  alternates: { canonical: '/gift-ideas' },
}

export default function Page() { return <GiftIdeas /> }
