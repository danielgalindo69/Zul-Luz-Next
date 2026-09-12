import type { Metadata } from "next";
import "./globals.css";
import { StorefrontShell } from '@/components/StorefrontShell'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Zul Luz | Timeless Comfort & Elegance', template: '%s | Zul Luz' },
  description: 'A prototype storefront for Zul Luz, handcrafted with love in Colombia.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><StorefrontShell>{children}</StorefrontShell></body>
    </html>
  );
}
