import type { Metadata } from 'next'
import { LegalPolicyPage } from '@/components/LegalPolicyPage'
import { shippingPolicy } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping Policy for the Zul Luz storefront.',
}

export default function ShippingPolicyPage() {
  return <LegalPolicyPage {...shippingPolicy} />
}
