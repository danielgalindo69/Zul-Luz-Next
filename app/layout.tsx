import type { Metadata } from "next";
import "./globals.css";
import { StorefrontShell } from '@/components/StorefrontShell'
import { connection } from 'next/server'
import { catalog } from '@/lib/catalog-server'
import { StructuredData } from '@/components/StructuredData'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Zul Luz | Timeless Comfort & Elegance', template: '%s | Zul Luz' },
  description: 'Discover luxury lingerie, sleepwear, and thoughtful lifestyle pieces by Zul Luz. Timeless comfort and elegance, designed for everyday rituals.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/zulluz-favicon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: [{ url: '/zulluz-favicon.png', type: 'image/png' }],
    apple: [{ url: '/zulluz-favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Zul Luz | Timeless Comfort & Elegance',
    description: 'Luxury lingerie, sleepwear, and lifestyle pieces designed for everyday rituals.',
    url: SITE_URL,
    siteName: 'Zul Luz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zul Luz | Timeless Comfort & Elegance',
    description: 'Luxury lingerie, sleepwear, and lifestyle pieces designed for everyday rituals.',
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
