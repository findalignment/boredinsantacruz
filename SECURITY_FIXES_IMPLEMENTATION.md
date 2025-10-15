# 🔧 Security Fixes - Implementation Guide

This guide provides **ready-to-use code** for all critical and high-priority security fixes.

---

## 🚀 QUICK START (30 Minutes)

Follow these steps in order:

1. Install dependencies
2. Add rate limiting
3. Add input sanitization
4. Add security headers
5. Add input validation
6. Fix authorization checks
7. Test everything

---

## STEP 1: Install Dependencies

```bash
npm install @upstash/ratelimit @upstash/redis zod isomorphic-dompurify
```

---

## STEP 2: Add Rate Limiting

### **A. Sign up for Upstash (Free)**

1. Go to: https://console.upstash.com/
2. Create account (free tier: 10,000 requests/day)
3. Create Redis database
4. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### **B. Add to `.env.local`:**

```bash
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### **C. Create Rate Limiter:**

```typescript
// src/lib/security/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis (check if env vars exist)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Auth endpoints: 5 attempts per 15 minutes
export const authLimiter = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
}) : null;

// Chat API: 20 requests per minute
export const chatLimiter = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:chat',
}) : null;

// General API: 100 requests per minute
export const apiLimiter = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:api',
}) : null;

// Form submissions: 3 per minute
export const formLimiter = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
  prefix: 'ratelimit:form',
}) : null;

// Helper to get identifier (IP address)
export function getIdentifier(request: Request): string {
  // Try to get real IP from headers (Vercel provides this)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'anonymous';
  return ip;
}
```

### **D. Apply to Chat API:**

```typescript
// src/app/api/chat/route.ts
import { chatLimiter, getIdentifier } from '@/lib/security/ratelimit';

export async function POST(req: Request) {
  // Rate limiting
  if (chatLimiter) {
    const identifier = getIdentifier(req);
    const { success, limit, reset, remaining } = await chatLimiter.limit(identifier);

    if (!success) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          limit,
          reset,
          remaining,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      );
    }
  }

  // ... rest of your chat API code
}
```

### **E. Apply to Auth Routes (via Middleware):**

```typescript
// src/middleware.ts
import { auth } from '@/lib/auth/config';
import { NextResponse } from 'next/server';
import { authLimiter, getIdentifier } from '@/lib/security/ratelimit';

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Rate limit auth endpoints
  if (pathname.startsWith('/api/auth/')) {
    if (authLimiter) {
      const identifier = getIdentifier(req);
      const { success } = await authLimiter.limit(identifier);

      if (!success) {
        return new Response('Too many authentication attempts. Please try again later.', {
          status: 429,
        });
      }
    }
  }

  const isLoggedIn = !!req.auth;

  // Protected routes that require authentication
  const protectedRoutes = ['/profile', '/favorites', '/reviews/new', '/trips'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route while not logged in
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to profile if accessing login while already logged in
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## STEP 3: Add Input Sanitization

```typescript
// src/lib/security/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML input to prevent XSS
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize text input (removes HTML and trims)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick, etc.)
    .trim();
}

/**
 * Sanitize URL to prevent javascript: and data: URIs
 */
export function sanitizeUrl(url: string): string {
  const clean = url.trim().toLowerCase();
  
  if (clean.startsWith('javascript:') || clean.startsWith('data:') || clean.startsWith('vbscript:')) {
    return '';
  }
  
  return url.trim();
}

/**
 * Escape HTML entities
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}
```

### **Apply to Server Actions:**

```typescript
// src/app/actions/trips.ts
import { sanitizeText } from '@/lib/security/sanitize';

export async function createTrip(input: CreateTripInput) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // Sanitize inputs
    const sanitized = {
      name: sanitizeText(input.name),
      description: input.description ? sanitizeText(input.description) : undefined,
      // ... rest of fields
    };

    // Save to Airtable
    const record = await tables.trips.create({
      name: sanitized.name,
      description: sanitized.description,
      // ...
    });

    return { success: true, data: transformTripRecord(record) };
  } catch (error) {
    console.error('Create trip error:', error);
    return { success: false, error: 'Failed to create trip' };
  }
}
```

---

## STEP 4: Add Security Headers

```javascript
// next.config.mjs (or next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.googletagmanager.com https://api.mapbox.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com;
              img-src 'self' data: https: blob:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://www.eventbriteapi.com https://api.openweathermap.org https://tides.mobilegeographics.com;
              frame-src 'self' https://www.google.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## STEP 5: Add Input Validation

```typescript
// src/lib/security/validation.ts
import { z } from 'zod';

export const TripSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim(),
  description: z.string().max(500, 'Description too long').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export const TripItemSchema = z.object({
  tripId: z.string().min(1, 'Trip ID required'),
  type: z.enum(['Activity', 'Restaurant', 'Note']),
  itemId: z.string().min(1, 'Item ID required'),
  itemName: z.string().min(1).max(200).trim(),
  day: z.number().int().min(1).max(30),
  order: z.number().int().min(0),
  notes: z.string().max(500).optional(),
});

export const ReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  itemType: z.enum(['Activity', 'Restaurant']),
  itemId: z.string().min(1),
});

export const FavoriteSchema = z.object({
  itemType: z.enum(['Activity', 'Restaurant']),
  itemId: z.string().min(1),
  itemName: z.string().min(1).max(200),
});
```

### **Apply to Server Actions:**

```typescript
// src/app/actions/trips.ts
import { TripSchema } from '@/lib/security/validation';
import { sanitizeText } from '@/lib/security/sanitize';

export async function createTrip(input: CreateTripInput) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // Validate input
    const validated = TripSchema.parse(input);
    
    // Sanitize
    const sanitized = {
      ...validated,
      name: sanitizeText(validated.name),
      description: validated.description ? sanitizeText(validated.description) : undefined,
    };

    // Save to Airtable
    const record = await tables.trips.create({
      name: sanitized.name,
      description: sanitized.description || '',
      startDate: sanitized.startDate || '',
      endDate: sanitized.endDate || '',
      userId: session.user.email,
      isPublic: sanitized.isPublic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return { success: true, data: transformTripRecord(record) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error('Create trip error:', error);
    return { success: false, error: 'Failed to create trip' };
  }
}
```

---

## STEP 6: Fix Authorization Checks

### **Fix Favorites:**

```typescript
// src/app/actions/favorites.ts
export async function removeFavorite(favoriteId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // ✅ Fetch favorite to verify ownership
    const favorite = await tables.favorites.find(favoriteId);
    
    if (favorite.get('userId') !== session.user.email) {
      console.warn(`Unauthorized favorite deletion attempt by ${session.user.email}`);
      return { success: false, error: 'Unauthorized' };
    }

    // Now safe to delete
    await tables.favorites.destroy([favoriteId]);
    return { success: true };
  } catch (error) {
    console.error('Remove favorite error:', error);
    return { success: false, error: 'Failed to remove favorite' };
  }
}
```

### **Fix Reviews:**

```typescript
// src/app/actions/reviews.ts
export async function deleteReview(reviewId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // ✅ Fetch review to verify ownership
    const review = await tables.reviews.find(reviewId);
    
    if (review.get('userId') !== session.user.email) {
      console.warn(`Unauthorized review deletion attempt by ${session.user.email}`);
      return { success: false, error: 'Unauthorized' };
    }

    await tables.reviews.destroy([reviewId]);
    return { success: true };
  } catch (error) {
    console.error('Delete review error:', error);
    return { success: false, error: 'Failed to delete review' };
  }
}
```

### **Fix Trip Items:**

```typescript
// src/app/actions/tripItems.ts
export async function removeItemFromTrip(itemId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // ✅ Fetch item, then trip, to verify ownership
    const item = await tables.tripItems.find(itemId);
    const tripId = item.get('tripId')[0]; // Linked record
    
    const trip = await tables.trips.find(tripId);
    
    if (trip.get('userId') !== session.user.email) {
      console.warn(`Unauthorized trip item deletion by ${session.user.email}`);
      return { success: false, error: 'Unauthorized' };
    }

    await tables.tripItems.destroy([itemId]);
    return { success: true };
  } catch (error) {
    console.error('Remove trip item error:', error);
    return { success: false, error: 'Failed to remove item' };
  }
}
```

---

## STEP 7: Add Security Logging

```typescript
// src/lib/security/logger.ts
export interface SecurityEvent {
  type: 'auth_failed' | 'unauthorized' | 'ratelimit' | 'xss_attempt' | 'validation_failed';
  userId?: string;
  ip?: string;
  details: string;
  timestamp: string;
}

export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>) {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  // Log to console (Vercel captures this)
  console.warn('[SECURITY EVENT]', JSON.stringify(fullEvent));

  // In production, you might want to send to:
  // - Sentry: Sentry.captureMessage()
  // - LogRocket: LogRocket.track()
  // - Custom endpoint: fetch('/api/security-log')
}

// Usage:
import { logSecurityEvent } from '@/lib/security/logger';

// In your code:
if (unauthorized) {
  logSecurityEvent({
    type: 'unauthorized',
    userId: session.user.email,
    ip: getIdentifier(req),
    details: `Attempted to delete trip ${tripId}`,
  });
}
```

---

## TESTING

### **Test Rate Limiting:**

```bash
# Send 10 rapid chat requests (should block after 20)
for i in {1..25}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"query":"test"}' &
done
```

### **Test Input Sanitization:**

```typescript
// Try creating a trip with XSS payload
const result = await createTrip({
  name: "<script>alert('XSS')</script>",
  description: "<img src=x onerror='alert(1)'>",
});

// Should be sanitized:
console.log(result.data.name); // Output: "" or "scriptalert('XSS')/script" (tags removed)
```

### **Test Authorization:**

```typescript
// Try deleting someone else's favorite
const result = await removeFavorite('someoneElsesFavoriteId');
// Should return: { success: false, error: 'Unauthorized' }
```

---

## DEPLOYMENT

1. **Add all new env vars to Vercel:**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

2. **Commit and push:**
   ```bash
   git add -A
   git commit -m "Add security fixes: rate limiting, sanitization, validation"
   git push
   ```

3. **Verify on production:**
   - Test rate limiting
   - Test XSS protection
   - Test authorization

---

## OPTIONAL: Restrict Mapbox Token

1. Go to: https://account.mapbox.com/access-tokens
2. Click on your token
3. Add URL restrictions:
   - `localhost:3000`
   - `*.vercel.app`
   - `boredinsantacruz.com`
   - `*.boredinsantacruz.com`
4. Save

Now your token only works on your domains!

---

## SUMMARY

After implementing these fixes:

✅ **Rate limiting** protects against abuse  
✅ **Input sanitization** prevents XSS  
✅ **Security headers** block clickjacking & XSS  
✅ **Input validation** ensures data quality  
✅ **Authorization checks** prevent unauthorized access  
✅ **Security logging** enables monitoring

**Your site will be significantly more secure!**

**Time to implement:** 30-60 minutes  
**Time to test:** 30 minutes  
**Total:** ~2 hours for production-ready security

---

**Ready to implement? Let me know if you want me to apply these fixes!**

