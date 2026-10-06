import type { Metadata } from 'next'
import { LegalPolicyPage } from '@/components/LegalPolicyPage'
import { privacyPolicy } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the Zul Luz storefront.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <LegalPolicyPage {...privacyPolicy} />
}
