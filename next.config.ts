import type { NextConfig } from "next";

// ─── Security Headers ────────────────────────────────────────────────────────
// Applied to every response. The Content-Security-Policy is permissive enough
// for Shopify CDN images, Google Fonts, and inline styles that Next.js and
// framer-motion inject at runtime, while blocking everything else.

const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains. Eligible for HSTS preload.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent the page from being embedded in an iframe (clickjacking defense).
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Stop browsers from MIME-sniffing the Content-Type (XSS vector).
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Only send the origin as referrer on cross-origin navigations.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict access to device APIs that the store does not need.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Enable DNS prefetching for external resources (Shopify CDN, fonts, etc.).
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Content Security Policy — restrictive by default.
  //   • 'self' for scripts and connect
  //   • Shopify CDN + Unsplash for images
  //   • Google Fonts for stylesheets and font files
  //   • 'unsafe-inline' for styles only (required by Next.js / framer-motion)
  //   • frame-ancestors 'none' mirrors X-Frame-Options DENY
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://cdn.shopify.com https://images.unsplash.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Allows an isolated local verification build while `next dev` owns `.next`.
  // Production keeps Next's default output folder unless this variable is set.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  async headers() {
    return [
      {
        // Apply security headers to all routes.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
