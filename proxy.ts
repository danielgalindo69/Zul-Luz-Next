import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiter } from '@/lib/rate-limit'

// ─── Rate Limiters ───────────────────────────────────────────────────────────
// Separate limits for read (GET) and write (POST/PATCH/DELETE) operations.
// The cart mutation limiter is stricter because mutations are more expensive
// and are the main target for abuse (cart-bombing, Shopify API exhaustion).

/** GET /api/cart — generous limit for normal browsing. */
const cartReadLimiter = new RateLimiter({
  limit: 60,        // 60 requests …
  windowMs: 60_000, // … per 60 seconds per IP
})

/** POST/PATCH/DELETE /api/cart — stricter limit for mutations. */
const cartMutateLimiter = new RateLimiter({
  limit: 20,        // 20 mutations …
  windowMs: 60_000, // … per 60 seconds per IP
})

/** POST /api/cart/checkout — very strict to prevent checkout abuse. */
const checkoutLimiter = new RateLimiter({
  limit: 5,         // 5 checkout attempts …
  windowMs: 60_000, // … per 60 seconds per IP
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getClientIp(request: NextRequest): string {
  // x-forwarded-for is set by Vercel, Cloudflare, and most reverse proxies.
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first && first.length <= 64) return first
  }
  // Fallback for local dev or direct connections without a reverse proxy.
  return request.headers.get('x-real-ip')?.trim() || '127.0.0.1'
}

function rateLimitResponse(retryAfterMs: number) {
  const retryAfterSeconds = Math.ceil(retryAfterMs / 1000)
  return NextResponse.json(
    { error: 'Demasiadas solicitudes. Intenta de nuevo en unos segundos.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  )
}

// ─── Proxy (formerly Middleware) ─────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method
  const clientIp = getClientIp(request)

  // ── Rate-limit /api/cart/checkout ────────────────────────────────────────
  if (pathname === '/api/cart/checkout' && method === 'POST') {
    const result = checkoutLimiter.check(clientIp)
    if (!result.allowed) return rateLimitResponse(result.retryAfterMs)

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', '5')
    response.headers.set('X-RateLimit-Remaining', String(result.remaining))
    return response
  }

  // ── Rate-limit /api/cart mutations ──────────────────────────────────────
  if (pathname === '/api/cart' && method !== 'GET') {
    const result = cartMutateLimiter.check(clientIp)
    if (!result.allowed) return rateLimitResponse(result.retryAfterMs)

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', '20')
    response.headers.set('X-RateLimit-Remaining', String(result.remaining))
    return response
  }

  // ── Rate-limit /api/cart reads ──────────────────────────────────────────
  if (pathname === '/api/cart' && method === 'GET') {
    const result = cartReadLimiter.check(clientIp)
    if (!result.allowed) return rateLimitResponse(result.retryAfterMs)

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', '60')
    response.headers.set('X-RateLimit-Remaining', String(result.remaining))
    return response
  }

  // All other routes pass through unchanged.
  return NextResponse.next()
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
// Only run the proxy on API routes. Static files, images, and page routes are
// excluded for performance.

export const config = {
  matcher: '/api/:path*',
}
