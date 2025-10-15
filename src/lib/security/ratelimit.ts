// Rate limiting using Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis (only if env vars exist)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Auth endpoints: 5 attempts per 15 minutes
export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
      prefix: 'ratelimit:auth',
    })
  : null;

// Chat API: 20 requests per minute
export const chatLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      analytics: true,
      prefix: 'ratelimit:chat',
    })
  : null;

// General API: 100 requests per minute
export const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null;

// Form submissions: 3 per minute
export const formLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 m'),
      analytics: true,
      prefix: 'ratelimit:form',
    })
  : null;

/**
 * Get identifier for rate limiting (IP address)
 */
export function getIdentifier(request: Request): string {
  // Try to get real IP from headers (Vercel provides this)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
  return ip;
}

/**
 * Helper to apply rate limit and return response if exceeded
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ allowed: true } | { allowed: false; response: Response }> {
  if (!limiter) {
    // No rate limiting configured, allow request
    return { allowed: true };
  }

  const { success, limit, reset, remaining } = await limiter.limit(identifier);

  if (!success) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          limit,
          reset: new Date(reset).toISOString(),
          remaining,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      ),
    };
  }

  return { allowed: true };
}

