import "server-only";

import { headers } from "next/headers";

type Bucket = { count: number; resetAt: number };

/**
 * Fixed-window counters held in process memory.
 *
 * This is deliberately the simplest thing that closes the hole: `login` is an
 * unauthenticated endpoint that spends ~210ms of CPU on bcrypt per call, so
 * without a ceiling a single client can saturate the server. One process keeps
 * one map — behind more than one instance each gets its own counters, so move
 * this to a shared store (Redis) before scaling out.
 */
const buckets = new Map<string, Bucket>();

/** Drop expired entries once the map is big enough to be worth sweeping. */
const SWEEP_THRESHOLD = 10_000;

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets. Zero when the call was allowed. */
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > SWEEP_THRESHOLD) sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is client-supplied and trivially spoofed unless the server
 * sits behind a proxy that overwrites it — which is the deployment this
 * assumes. Treat it as a throttling key, never as identity.
 */
export async function clientIp(): Promise<string> {
  const requestHeaders = await headers();

  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return requestHeaders.get("x-real-ip") ?? "unknown";
}
