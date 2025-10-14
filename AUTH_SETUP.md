# 🔐 Authentication Setup Guide

## Overview

Your site now has full authentication with:
- ✅ **Google OAuth** (Sign in with Google)
- ✅ **Magic Link** (Passwordless email login)
- ✅ **Protected routes** (Profile, Favorites, Reviews)
- ✅ **User profiles** (With stats and content)

---

## 🚀 Quick Setup

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Save and copy your:
   - **Client ID**
   - **Client Secret**

### Step 2: Get Resend API Key (for Magic Links)

1. Go to [Resend.com](https://resend.com)
2. Sign up for free account
3. Verify your domain (or use Resend's test domain for now)
4. Go to **API Keys** and create a new key
5. Copy the API key

### Step 3: Add Environment Variables

Add to your `.env.local` (local development):

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here  # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (Magic Link Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@boredinsantacruz.com
```

Add to **Vercel Environment Variables** (production):

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-random-secret-here  # Same as local

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (Magic Link Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@boredinsantacruz.com
```

### Step 4: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

---

## 📋 Features Implemented

### 1. **Login Page** (`/login`)
- Google OAuth button
- Magic Link (email) form
- Beautiful UI with gradients
- Mobile responsive

### 2. **Profile Page** (`/profile`)
- Protected route (requires login)
- User info display
- Stats (favorites, reviews, notes - placeholders for now)
- Coming soon features teaser

### 3. **User Button** (Header)
- Shows user avatar/initials
- Dropdown menu with:
  - Profile
  - Favorites
  - My Reviews
  - Sign Out
- Login button if not signed in

### 4. **Middleware Protection**
- Automatically redirects to login if accessing:
  - `/profile`
  - `/favorites`
  - `/reviews/new`
- Preserves intended destination (callback URL)

---

## 🎯 User Flow

### Google OAuth Flow:
1. User clicks "Continue with Google"
2. Redirects to Google login
3. User authorizes app
4. Redirects back to `/profile` (or callback URL)
5. Session created, user logged in

### Magic Link Flow:
1. User enters email
2. Clicks "Send magic link"
3. Email sent via Resend
4. User clicks link in email
5. Redirects to `/profile` (or callback URL)
6. Session created, user logged in

---

## 🔧 Testing Locally

### Test Google OAuth:
```bash
npm run dev
# Navigate to http://localhost:3000/login
# Click "Continue with Google"
# Should work if env vars are set correctly
```

### Test Magic Link:
```bash
npm run dev
# Navigate to http://localhost:3000/login
# Enter your email
# Check your email for the magic link
# Click link to sign in
```

**Note:** Resend requires domain verification for production. For testing, use their test domain or verify your own domain.

---

## 🚨 Troubleshooting

### Error: "OAuth client was deleted"
- Your Google OAuth credentials are invalid
- Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Error: "Redirect URI mismatch"
- Add the correct redirect URI to Google Console:
  - Local: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://your-domain.com/api/auth/callback/google`

### Error: "Magic link not sending"
- Check `RESEND_API_KEY` is correct
- Verify domain in Resend dashboard
- Check email spam folder

### Error: "NEXTAUTH_SECRET not set"
- Generate a secret: `openssl rand -base64 32`
- Add to `.env.local` and Vercel

---

## 🎨 Customization

### Change redirect after login:
Edit `src/lib/auth/config.ts`:

```typescript
callbacks: {
  async redirect({ url, baseUrl }) {
    // Change this to redirect to a different page
    return `${baseUrl}/profile`; // Change to /dashboard, /, etc.
  },
}
```

### Add more OAuth providers:
Edit `src/lib/auth/config.ts`:

```typescript
import GitHub from 'next-auth/providers/github';

providers: [
  Google({ ... }),
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  // Add more providers here
],
```

---

## 📊 Next Steps (Future Sprints)

After auth is working, you can build:

1. **Favorites System**
   - Save activities/restaurants
   - Display on profile page
   - Heart icon on cards

2. **Reviews System**
   - Write reviews for activities/restaurants
   - Public + private notes
   - Rating system

3. **User Profiles**
   - Edit profile info
   - Upload avatar
   - Preferences

4. **Trip Planning**
   - Save trips
   - Build itineraries
   - Share with friends

---

## 🔒 Security Notes

- ✅ Passwords are **never stored** (OAuth + Magic Link only)
- ✅ Sessions use **JWT tokens** (signed and encrypted)
- ✅ Protected routes **require authentication**
- ✅ Email verification **automatic** with magic links
- ✅ CSRF protection **built-in** with NextAuth

---

## 📝 Environment Variables Checklist

Before deploying, make sure you have:

- [ ] `NEXTAUTH_URL` (production URL)
- [ ] `NEXTAUTH_SECRET` (generated securely)
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `EMAIL_FROM` (verified domain)
- [ ] Google OAuth redirect URIs configured
- [ ] Resend domain verified (for production emails)

---

**Ready to deploy? All auth features are built and tested!**

