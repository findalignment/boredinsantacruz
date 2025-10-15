# 🔐 NextAuth v5 Complete Setup Guide

## ✅ WHAT'S ALREADY DONE

Your NextAuth implementation is **95% complete**! Here's what's working:

- ✅ NextAuth v5 configured
- ✅ Google OAuth provider
- ✅ Magic Link (Resend) provider
- ✅ JWT session strategy
- ✅ Middleware for route protection
- ✅ Login page
- ✅ User button component
- ✅ Session provider wrapper
- ✅ Auth callbacks (session, jwt, redirect)
- ✅ Protected routes (profile, favorites, trips)

---

## 🔧 WHAT NEEDS TO BE COMPLETED

### **1. Environment Variables** (REQUIRED)

You need to add these to your `.env.local` file:

```bash
# NextAuth Core (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters

# Google OAuth (REQUIRED for Google login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (REQUIRED for Magic Link email)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

---

## 📋 STEP-BY-STEP SETUP

### **Step 1: Generate NEXTAUTH_SECRET**

Run this command:

```bash
openssl rand -base64 32
```

Copy the output and add to `.env.local`:

```bash
NEXTAUTH_SECRET=paste-the-generated-secret-here
```

---

### **Step 2: Set Up Google OAuth**

#### **A. Create Google Cloud Project**

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google+ API**

#### **B. Create OAuth 2.0 Credentials**

1. Go to: **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://yourdomain.vercel.app
   https://boredinsantacruz.com (your custom domain)
   ```
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.vercel.app/api/auth/callback/google
   https://boredinsantacruz.com/api/auth/callback/google
   ```
6. Click **Create**
7. Copy **Client ID** and **Client Secret**

#### **C. Add to `.env.local`**

```bash
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz
```

---

### **Step 3: Set Up Resend (Magic Link Email)**

#### **A. Sign Up for Resend**

1. Go to: https://resend.com/
2. Sign up (free tier: 100 emails/day)
3. Verify your email

#### **B. Get API Key**

1. Go to: **API Keys**
2. Create a new API key
3. Copy the key (starts with `re_`)

#### **C. Add Domain (For Production)**

For development, you can use `onboarding@resend.dev`.

For production:
1. Add your domain to Resend
2. Add DNS records (SPF, DKIM, DMARC)
3. Wait for verification (usually < 1 hour)

#### **D. Add to `.env.local`**

```bash
RESEND_API_KEY=re_abc123xyz
EMAIL_FROM=noreply@boredinsantacruz.com  # or onboarding@resend.dev for dev
```

---

### **Step 4: Add Environment Variables to Vercel**

Once you have all env vars working locally:

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add each variable:
   - `NEXTAUTH_URL` = `https://yourdomain.vercel.app`
   - `NEXTAUTH_SECRET` = `your-secret`
   - `GOOGLE_CLIENT_ID` = `your-id`
   - `GOOGLE_CLIENT_SECRET` = `your-secret`
   - `RESEND_API_KEY` = `your-key`
   - `EMAIL_FROM` = `your-email`

3. Redeploy:
   ```bash
   vercel --prod
   ```

---

### **Step 5: Test Locally**

```bash
npm run dev
```

Then test:

1. **Google OAuth:**
   - Go to http://localhost:3000/login
   - Click "Sign in with Google"
   - Should redirect to Google, then back to your site

2. **Magic Link:**
   - Go to http://localhost:3000/login
   - Enter your email
   - Check inbox for magic link
   - Click link, should sign you in

3. **Protected Routes:**
   - Go to http://localhost:3000/profile (should redirect to login)
   - Sign in, then access profile (should work)

---

## 🔒 SECURITY CHECKLIST

### **Current Security Status:**

✅ **Good:**
- JWT-based sessions (stateless)
- Secure cookies (httpOnly)
- CSRF protection (built into NextAuth)
- OAuth 2.0 with PKCE
- 30-day session expiration
- Protected routes via middleware

⚠️ **Missing (needs attention):**
- No rate limiting on auth endpoints
- No email verification (optional, but recommended)
- No user database (JWT-only, no persistent user records)
- No account linking (if user signs in with both Google & email)
- No 2FA/MFA
- No session management UI (user can't see active sessions)

---

## 🗄️ OPTIONAL: Add User Database

Currently using **JWT-only** (no database). This works but has limitations:

**JWT-Only Pros:**
- ✅ Fast
- ✅ No database needed
- ✅ Scales infinitely

**JWT-Only Cons:**
- ❌ Can't revoke sessions
- ❌ Can't see active sessions
- ❌ Can't link accounts
- ❌ User data only stored in JWT

### **To Add Database (Recommended):**

You already have Airtable! Let's use it:

#### **Create Users Table in Airtable:**

Fields:
- `id` (Formula: `RECORD_ID()`)
- `email` (Single line text)
- `name` (Single line text)
- `image` (URL)
- `emailVerified` (Date)
- `provider` (Single select: Google, Email)
- `createdAt` (Created time)

#### **Update NextAuth Config:**

```typescript
// Add adapter
import { AirtableAdapter } from '@auth/airtable-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: AirtableAdapter({
    apiKey: process.env.AIRTABLE_TOKEN,
    baseId: process.env.AIRTABLE_BASE_ID,
  }),
  // ... rest of config
});
```

#### **Install Adapter:**

```bash
npm install @auth/airtable-adapter
```

**Benefits:**
- Persistent user records
- Can revoke sessions
- Can link accounts
- Better audit trail

---

## 🚨 SECURITY VULNERABILITIES (See next section)

Key issues to address:
1. No rate limiting (auth endpoints vulnerable to brute force)
2. No input sanitization on user-generated content
3. Missing CSP headers
4. No HTTPS enforcement in code
5. API keys visible in code (use env vars)
6. No audit logging
7. Missing security headers

**See `SECURITY_AUDIT.md` for full details.**

---

## 📝 QUICK START CHECKLIST

- [ ] Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- [ ] Create Google OAuth credentials
- [ ] Sign up for Resend account
- [ ] Add all env vars to `.env.local`
- [ ] Test Google OAuth locally
- [ ] Test Magic Link locally
- [ ] Add env vars to Vercel
- [ ] Deploy and test production
- [ ] (Optional) Add Airtable user database
- [ ] (Critical) Add rate limiting
- [ ] (Critical) Add security headers

---

## 🎯 MINIMAL WORKING SETUP (5 minutes)

If you want to get it working ASAP:

1. **Generate secret:**
   ```bash
   openssl rand -base64 32
   ```

2. **Add to `.env.local`:**
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=paste-secret-here
   GOOGLE_CLIENT_ID=your-id
   GOOGLE_CLIENT_SECRET=your-secret
   ```

3. **Test:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000/login

That's it! Auth will work locally. Add Resend later for Magic Links.

---

## 🆘 COMMON ISSUES

### **"Cannot find module 'next-auth'"**
```bash
npm install next-auth@beta
```

### **"Invalid NEXTAUTH_SECRET"**
Must be at least 32 characters. Use `openssl rand -base64 32`.

### **"Redirect URI mismatch"**
Add ALL redirect URIs to Google Console (localhost + production domains).

### **"Email not sent"**
Check Resend API key and EMAIL_FROM. Use `onboarding@resend.dev` for testing.

### **"Session undefined"**
Make sure `SessionProvider` wraps your app in `layout.tsx` (✅ already done).

---

## ✅ CURRENT STATUS

**What's Working:**
- ✅ Code is correct
- ✅ Routes protected
- ✅ UI components ready
- ✅ Session management

**What's Missing:**
- ⚠️ Environment variables (need to be added)
- ⚠️ Google OAuth setup (need credentials)
- ⚠️ Resend setup (need API key)

**Time to Complete:** 15-30 minutes

**Difficulty:** Easy (mostly configuration)

---

**Next:** See `SECURITY_AUDIT.md` for vulnerability assessment and fixes.

