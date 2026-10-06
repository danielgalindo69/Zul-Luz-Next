import type { Metadata } from 'next'
import AboutUs from '@/views/AboutUs'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about the Colombian inspiration, craftsmanship, and values behind Zul Luz.',
  alternates: { canonical: '/about' },
}

export default function Page() { return <AboutUs /> }
