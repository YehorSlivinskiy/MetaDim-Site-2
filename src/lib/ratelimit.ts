/**
 * Rate limiting helper backed by Upstash Redis.
 *
 * - If UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are missing, the
 *   limiter is no-op (always succeeds). This keeps local dev frictionless;
 *   set the env vars in Vercel before going to production.
 * - Sliding window algorithm — simpler, deterministic.
 * - Single Redis instance is shared across keys via prefix.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;
let initialized = false;

function getLimiter(max: number, windowSec: number): Ratelimit | null {
  // Re-init per (max, windowSec) — but cache the most common config.
  if (initialized && limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    initialized = true;
    return null;
  }

  const redis = new Redis({ url, token });
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(max, `${windowSec} s`),
    analytics: false,
    prefix: "metadim",
  });
  initialized = true;
  return limiter;
}

export type RateLimitResult = {
  success: boolean;
  remaining?: number;
  resetIn?: number; // seconds
};

export async function rateLimit(
  identifier: string,
  opts: { max: number; windowSec: number } = { max: 5, windowSec: 60 },
): Promise<RateLimitResult> {
  const l = getLimiter(opts.max, opts.windowSec);
  if (!l) {
    // No-op when Upstash is not configured
    return { success: true };
  }
  const res = await l.limit(identifier);
  return {
    success: res.success,
    remaining: res.remaining,
    resetIn: Math.max(0, Math.round((res.reset - Date.now()) / 1000)),
  };
}
