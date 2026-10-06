import type { Metadata } from 'next'
import SizeGuide from '@/views/SizeGuide'

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Use the Zul Luz size guide to find a comfortable fit for bras, lingerie, and sleepwear.',
  alternates: { canonical: '/size-guide' },
}

export default function Page() { return <SizeGuide /> }
