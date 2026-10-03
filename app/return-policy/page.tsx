import type { Metadata } from 'next'
import { LegalPolicyPage } from '@/components/LegalPolicyPage'
import { returnPolicy } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description: 'Return and Refund Policy for the Zul Luz storefront.',
}

export default function ReturnPolicyPage() {
  return <LegalPolicyPage {...returnPolicy} />
}
