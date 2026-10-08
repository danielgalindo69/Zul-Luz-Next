import type { Metadata } from "next";
import "./globals.css";
import { StorefrontShell } from '@/components/StorefrontShell'
import { connection } from 'next/server'
import { catalog } from '@/lib/catalog-server'
import { StructuredData } from '@/components/StructuredData'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Luxury Lingerie & Sleepwear | Zul Luz', template: '%s | Zul Luz' },
  description: 'Shop lace bras, lingerie, women’s sleepwear, and artisan accessories at Zul Luz, a Colombian-founded brand focused on comfort and everyday rituals.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/zulluz-favicon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: [{ url: '/zulluz-favicon.png', type: 'image/png' }],
    apple: [{ url: '/zulluz-favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Luxury Lingerie & Sleepwear | Zul Luz',
    description: 'Shop lace bras, lingerie, women’s sleepwear, and artisan accessories from a Colombian-founded brand.',
    url: SITE_URL,
    siteName: 'Zul Luz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Lingerie & Sleepwear | Zul Luz',
    description: 'Shop lace bras, lingerie, women’s sleepwear, and artisan accessories from a Colombian-founded brand.',
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection()
  const products = await catalog.getProducts()
  return (
    <html lang="en">
      <body>
        <StructuredData data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Zul Luz',
            url: SITE_URL,
            logo: `${SITE_URL}/zulluz-favicon.png`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Zul Luz',
            url: SITE_URL,
          },
        ]} />
        <StorefrontShell products={products}>{children}</StorefrontShell>
      </body>
    </html>
  );
}
