import type { Metadata } from "next";
import "./globals.css";
import { StorefrontShell } from '@/components/StorefrontShell'
import { connection } from 'next/server'
import { catalog } from '@/lib/catalog-server'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Zul Luz | Timeless Comfort & Elegance', template: '%s | Zul Luz' },
  description: 'A prototype storefront for Zul Luz, handcrafted with love in Colombia.',
  robots: { index: false, follow: false },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Zul Luz | Timeless Comfort & Elegance',
    description: 'A prototype storefront for Zul Luz, handcrafted with love in Colombia.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Zul Luz',
    images: [
      {
        url: '/favicon.ico',
        width: 512,
        height: 512,
        alt: 'Zul Luz Logo',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Zul Luz | Timeless Comfort & Elegance',
    description: 'A prototype storefront for Zul Luz, handcrafted with love in Colombia.',
    images: ['/favicon.ico'],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection()
  const products = await catalog.getProducts()
  return (
    <html lang="en">
      <body><StorefrontShell products={products}>{children}</StorefrontShell></body>
    </html>
  );
}
