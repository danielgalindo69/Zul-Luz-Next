import type { Metadata } from 'next'
import { LegalPolicyPage } from '@/components/LegalPolicyPage'
import { termsOfService } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the Zul Luz storefront.',
}

export default function TermsAndConditionsPage() {
  return <LegalPolicyPage {...termsOfService} />
}
