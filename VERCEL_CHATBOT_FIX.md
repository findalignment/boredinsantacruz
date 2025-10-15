# Chatbot Not Working on Vercel - Fix Guide

## The Problem

Chatbot works on localhost ✅ but not on Vercel ❌

**Most Common Cause:** Missing environment variables in Vercel

---

## Quick Diagnosis

### Step 1: Check Vercel Logs

1. Go to: https://vercel.com/[your-username]/[your-project]
2. Click **"Deployments"** tab
3. Click your latest deployment
4. Click **"Functions"** tab
5. Look for `/api/chat` errors

**Common errors you'll see:**
- "OpenAI API key not configured" → Missing `OPENAI_API_KEY`
- "Failed to fetch activities" → Missing Airtable variables
- "Rate limit error" → Missing Redis variables

---

## The Fix: Add Environment Variables

### Step 1: Go to Vercel Settings

1. Visit: https://vercel.com/[your-project]/settings/environment-variables
2. Or: Dashboard → Your Project → Settings → Environment Variables

### Step 2: Add Required Variables

**CRITICAL - Required for Chatbot:**

| Variable Name | Where to Get It | Required? |
|---------------|-----------------|-----------|
| `OPENAI_API_KEY` | OpenAI Dashboard | ✅ YES |
| `AIRTABLE_TOKEN` | Airtable Account Settings | ✅ YES |
| `AIRTABLE_BASE_ID` | Your Airtable URL | ✅ YES |
| `NEXTAUTH_SECRET` | Generate random string | ✅ YES |
| `NEXTAUTH_URL` | Your Vercel domain | ✅ YES |

**Optional (but recommended):**

| Variable Name | Purpose | Required? |
|---------------|---------|-----------|
| `OPENWEATHER_API_KEY` | Weather context in chat | Recommended |
| `KV_REST_API_URL` | Weather caching | Optional |
| `KV_REST_API_TOKEN` | Weather caching | Optional |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | Optional |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | Optional |

### Step 3: How to Add Each Variable

#### 1. OpenAI API Key (REQUIRED!)

```bash
Variable: OPENAI_API_KEY
Value: sk-proj-...your_key...
Environment: Production, Preview, Development (select all)
```

**Get it from:** https://platform.openai.com/api-keys

#### 2. Airtable Credentials

```bash
Variable: AIRTABLE_TOKEN
Value: pat...your_token...
Environment: All

Variable: AIRTABLE_BASE_ID
Value: app...your_base_id...
Environment: All
```

**Get from:**
- Token: https://airtable.com/create/tokens
- Base ID: From your Airtable URL (after `airtable.com/`)

#### 3. NextAuth Variables

```bash
Variable: NEXTAUTH_SECRET
Value: [generate random string - see below]
Environment: Production, Preview

Variable: NEXTAUTH_URL
Value: https://your-site.vercel.app
Environment: Production, Preview
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run this in terminal:
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

---

## Step 4: Redeploy

After adding environment variables:

### Option A: Redeploy from Vercel Dashboard
1. Go to Deployments tab
2. Click the three dots ⋯ on latest deployment
3. Click "Redeploy"

### Option B: Push to GitHub
```bash
git add .
git commit -m "Trigger redeploy for env vars"
git push
```

---

## Testing After Deploy

### 1. Check Vercel Logs

1. Go to your deployment
2. Click "Functions" tab
3. Look for `/api/chat` function
4. Check for errors

### 2. Test Chatbot on Live Site

1. Visit: https://your-site.vercel.app
2. Open browser console (F12)
3. Ask a question in chatbot
4. Check console for errors

**If you see:**
- ✅ Response streams in → It works!
- ❌ "OpenAI API key not configured" → Add `OPENAI_API_KEY` to Vercel
- ❌ "Failed to fetch" → Check network tab in console
- ❌ 500 error → Check Vercel function logs

---

## Common Issues & Solutions

### Issue 1: "OpenAI API key not configured"

**Cause:** `OPENAI_API_KEY` not set in Vercel

**Fix:**
1. Add `OPENAI_API_KEY` to Vercel environment variables
2. Make sure it's selected for "Production" environment
3. Redeploy

### Issue 2: "Too many requests" or Rate Limit Error

**Cause:** Missing Redis rate limiting variables (optional, but recommended)

**Fix:**
1. Sign up for Upstash Redis (free tier)
2. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Vercel
3. Redeploy

**Note:** Rate limiting is optional. Without it, chatbot still works but has no rate protection.

### Issue 3: Chat Opens But No Response

**Cause:** API key invalid or expired

**Fix:**
1. Go to OpenAI dashboard
2. Create new API key
3. Update in Vercel
4. Redeploy

### Issue 4: "CORS Error" in Console

**Cause:** Usually not the issue with Next.js, but check `NEXTAUTH_URL`

**Fix:**
1. Make sure `NEXTAUTH_URL` matches your Vercel domain exactly
2. Format: `https://your-site.vercel.app` (no trailing slash)

### Issue 5: Works on Preview but Not Production

**Cause:** Environment variables only set for one environment

**Fix:**
1. Check each variable in Vercel settings
2. Make sure "Production" is checked
3. Redeploy

---

## Complete Environment Variables Checklist

### For Chatbot to Work (Minimum):

- [ ] `OPENAI_API_KEY` - OpenAI API key
- [ ] `AIRTABLE_TOKEN` - Airtable personal access token
- [ ] `AIRTABLE_BASE_ID` - Your Airtable base ID
- [ ] `NEXTAUTH_SECRET` - Random 32+ character string
- [ ] `NEXTAUTH_URL` - Your Vercel domain

### For Full Functionality:

- [ ] `OPENWEATHER_API_KEY` - Weather context
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth
- [ ] `UPSTASH_REDIS_REST_URL` - Rate limiting
- [ ] `UPSTASH_REDIS_REST_TOKEN` - Rate limiting
- [ ] `EVENTBRITE_API_KEY` - Events page
- [ ] `GOOGLE_PLACES_API_KEY` - Import script (not needed on Vercel)

---

## Quick Test Script

After deploying, test with this curl command:

```bash
curl -X POST https://your-site.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

**Expected:** Stream of text starts returning
**Error:** JSON error message with details

---

## Still Not Working?

### 1. Check Vercel Function Logs

The logs will tell you exactly what's wrong:

```
Functions → /api/chat → Click to see logs
```

### 2. Common Log Errors:

**"Cannot read property 'OPENAI_API_KEY'"**
→ Variable not set or misspelled

**"Invalid API key"**
→ Check your OpenAI key is correct

**"Module not found"**
→ Missing package, run `npm install` and redeploy

**"Edge runtime error"**
→ Check if all imports are edge-compatible

### 3. Verify Variable Names

Double-check spelling in Vercel:
- `OPENAI_API_KEY` (not `OPENAI_KEY` or `OPEN_AI_API_KEY`)
- `AIRTABLE_TOKEN` (not `AIRTABLE_API_KEY`)
- Exact match with your `.env.local`

---

## Summary: Most Likely Fix

99% of the time, the issue is:

1. **Missing `OPENAI_API_KEY` in Vercel** ← Most common!
2. Missing `AIRTABLE_TOKEN` or `AIRTABLE_BASE_ID`
3. Forgot to redeploy after adding variables

**Quick fix:**
1. Add `OPENAI_API_KEY` to Vercel environment variables
2. Make sure "Production" is checked
3. Redeploy
4. Test!

---

## Need Your OpenAI API Key?

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it: "Vercel Production"
4. Copy the key (starts with `sk-`)
5. Add to Vercel immediately (you can't see it again!)

---

**Let me know what error you see in Vercel logs and I can help debug!** 🚀

