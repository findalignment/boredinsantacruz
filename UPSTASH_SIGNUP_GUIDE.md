# 🚀 Upstash Redis Setup Guide (5 Minutes)

Upstash provides serverless Redis for rate limiting. It's **free** for up to 10,000 requests per day!

---

## STEP 1: Sign Up (2 minutes)

1. **Go to:** https://console.upstash.com/
2. **Click:** "Sign Up" or "Get Started"
3. **Choose:** Sign up with:
   - GitHub (fastest)
   - Google
   - Email

4. **Verify** your email if needed

---

## STEP 2: Create Redis Database (2 minutes)

1. **Once logged in**, you'll see the Upstash dashboard
2. **Click:** "Create Database" (big green button)
3. **Fill in:**
   - **Name:** `boredinsantacruz-ratelimit` (or any name you want)
   - **Type:** Choose **"Regional"** (free tier)
   - **Region:** Choose **"US-West-1" (Oregon)** or closest to you
   - **Eviction:** Leave as "No Eviction"

4. **Click:** "Create"

---

## STEP 3: Get Your Credentials (1 minute)

1. **After creation**, you'll be on the database page
2. **Look for the "REST API" section**
3. **Copy two values:**

   **A. UPSTASH_REDIS_REST_URL**
   - Looks like: `https://us1-example-12345.upstash.io`
   - Copy the entire URL

   **B. UPSTASH_REDIS_REST_TOKEN**
   - Long alphanumeric string
   - Starts with something like: `AXm6AA...`
   - Copy the entire token

---

## STEP 4: Add to .env.local

1. **Open your `.env.local` file** (create from `.env.local.template` if needed)

2. **Add these lines:**
   ```bash
   UPSTASH_REDIS_REST_URL=https://us1-example-12345.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AXm6AA...your-token-here
   ```

3. **Save the file**

---

## STEP 5: Test It!

```bash
# Restart your dev server
npm run dev
```

Rate limiting is now active! 🎉

---

## FREE TIER LIMITS

✅ **10,000 commands per day**  
✅ **256 MB storage**  
✅ **1 concurrent connection**  
✅ **TLS encryption**  
✅ **No credit card required**

This is more than enough for your site!

---

## WHAT HAPPENS NOW?

With rate limiting active:
- ✅ Users can't spam your chat API (20 requests/min)
- ✅ Attackers can't brute-force login (5 attempts/15 min)
- ✅ Forms protected (3 submissions/min)
- ✅ General API protected (100 requests/min)

---

## VERIFYING IT WORKS

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Check console** - you should see:
   ```
   Upstash Redis initialized
   Rate limiting active
   ```

3. **Test the chat** - try sending 25 messages rapidly
   - First 20 should work
   - Messages 21+ should get: "Too many requests. Please try again later."

---

## TROUBLESHOOTING

### "Connection failed"
- Check that you copied the FULL URL (including `https://`)
- Check that you copied the FULL token (no spaces)

### "Rate limit not working"
- Restart your dev server
- Check that env vars are in `.env.local` (not `.env.local.template`)
- Check console for errors

### "Still seeing unlimited requests"
- Clear browser cache
- Try incognito mode
- Check that the limiter is initialized (see console)

---

## UPGRADING (OPTIONAL)

If you need more (unlikely):
- **Pro Plan:** $10/month
  - 100,000 commands/day
  - 1 GB storage
  - 10 concurrent connections

For your site, **FREE TIER IS PLENTY**!

---

## NEXT STEPS

After setting up Upstash:
1. ✅ Rate limiting active
2. ✅ Site protected from abuse
3. ✅ Ready to deploy

**That's it! You're done!** 🎉

