/**
 * Fixed-window, in-memory rate limiter keyed by a hashed client identifier.
 *
 * Limitation: memory is per server instance. On serverless or multi-instance
 * hosting, replace with a shared store (e.g. Upstash Redis or Vercel KV).
 * Tracked in docs/LAUNCH_CHECKLIST.md.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now: number) {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }
      return { allowed: true };
    }
    entry.count += 1;
    return { allowed: entry.count <= limit };
  };
}

export const inquiryRateLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
