import type { Metadata } from 'next'
import { LegalPolicyPage } from '@/components/LegalPolicyPage'
import { shippingPolicy } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping Policy for the Zul Luz storefront.',
  alternates: { canonical: '/shipping-policy' },
}

export default function ShippingPolicyPage() {
  return <LegalPolicyPage {...shippingPolicy} />
}
