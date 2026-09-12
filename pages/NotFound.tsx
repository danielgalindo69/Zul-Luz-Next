'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 bg-cream">
      <p className="font-display text-[clamp(4rem,12vw,8rem)] font-light text-border leading-none mb-4">404</p>
      <p className="text-[10px] tracking-[0.22em] uppercase text-wine mb-3 font-medium">Page Not Found</p>
      <h1 className="font-display text-2xl lg:text-3xl font-light text-dark mb-4">
        This page doesn&apos;t exist
      </h1>
      <p className="text-xs text-muted leading-[1.8] mb-10 max-w-xs">
        The page you&apos;re looking for may have moved, been renamed, or no longer exists.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark transition-colors duration-300 font-medium">
          Back to Home
        </Link>
        <Link href="/best-sellers" className="inline-block border border-dark text-dark text-[10px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-dark hover:text-cream transition-all duration-300 font-medium">
          Shop Now
        </Link>
      </div>
    </div>
  )
}
