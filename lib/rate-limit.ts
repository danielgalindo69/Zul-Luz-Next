/**
 * In-memory sliding-window rate limiter.
 *
 * Designed for serverless / edge-compatible environments where an external
 * store (Redis, Upstash) is not available. Each limiter instance keeps a
 * Map of IP → request timestamps. Expired entries are lazily pruned on
 * every check to keep memory bounded.
 *
 * ⚠️  This is per-process: if you scale horizontally (multiple Vercel
 * serverless instances) each process gets its own counter.  For a single
 * deployment this is perfectly fine. If you later need distributed rate
 * limiting, swap this module for @upstash/ratelimit.
 */

type SlidingWindowEntry = {
  /** Sorted array of request timestamps within the current window. */
  timestamps: number[]
}

type RateLimiterConfig = {
  /** Maximum number of requests allowed within `windowMs`. */
  limit: number
  /** Time window in milliseconds. */
  windowMs: number
}

export class RateLimiter {
  private readonly store = new Map<string, SlidingWindowEntry>()
  private readonly limit: number
  private readonly windowMs: number
  private lastPruneAt = 0
  /** Prune every 60 seconds at most. */
  private static readonly PRUNE_INTERVAL_MS = 60_000

  constructor(config: RateLimiterConfig) {
    this.limit = config.limit
    this.windowMs = config.windowMs
  }

  /**
   * Check whether `key` (typically an IP address) is within the rate limit.
   *
   * @returns An object with:
   *   - `allowed`: `true` if the request should proceed.
   *   - `remaining`: how many requests the client has left in this window.
   *   - `retryAfterMs`: milliseconds until the oldest request in the window
   *     expires (only meaningful when `allowed` is `false`).
   */
  check(key: string): { allowed: boolean; remaining: number; retryAfterMs: number } {
    const now = Date.now()
    this.maybePrune(now)

    const windowStart = now - this.windowMs
    let entry = this.store.get(key)

    if (!entry) {
      entry = { timestamps: [] }
      this.store.set(key, entry)
    }

    // Drop timestamps outside the current window.
    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart)

    if (entry.timestamps.length >= this.limit) {
      const oldestInWindow = entry.timestamps[0]!
      const retryAfterMs = oldestInWindow + this.windowMs - now
      return { allowed: false, remaining: 0, retryAfterMs: Math.max(retryAfterMs, 0) }
    }

    entry.timestamps.push(now)
    const remaining = this.limit - entry.timestamps.length

    return { allowed: true, remaining, retryAfterMs: 0 }
  }

  /** Lazily prune stale entries so the map doesn't grow without bound. */
  private maybePrune(now: number) {
    if (now - this.lastPruneAt < RateLimiter.PRUNE_INTERVAL_MS) return
    this.lastPruneAt = now
    const windowStart = now - this.windowMs
    for (const [key, entry] of this.store) {
      entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart)
      if (entry.timestamps.length === 0) this.store.delete(key)
    }
  }
}
