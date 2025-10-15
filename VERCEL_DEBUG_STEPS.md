# Vercel Chatbot Debug Steps

## Quick Test Checklist

### 1. Test the Live Chatbot

1. Go to your Vercel site (e.g., https://boredinsantacruz.vercel.app)
2. Open browser console (F12 or Right-click → Inspect → Console)
3. Type a question in the chatbot
4. Click "Ask"

**Watch for:**
- ✅ Response appears → **IT WORKS!**
- ❌ No response → Check console for errors
- ❌ Button disabled → May be state issue
- ❌ Error message → Note the exact error

---

### 2. Check Vercel Function Logs (MOST IMPORTANT!)

This will tell you EXACTLY what's wrong:

1. Go to: https://vercel.com/[your-project]
2. Click **"Deployments"** tab
3. Click your most recent deployment (should be at top)
4. Click **"Functions"** tab
5. Look for `/api/chat`
6. Click to see logs

**What to look for:**
```
✅ GOOD: "200 OK" status
❌ BAD: "500 Internal Server Error"
❌ BAD: "OpenAI API key not configured"
❌ BAD: "Cannot read property..."
```

---

### 3. Test API Directly

Run this in your terminal (replace with your domain):

```bash
curl -X POST https://boredinsantacruz.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

**Expected:** Stream of text starts appearing
**Error:** JSON with error message

---

## Common Issues After Redeploying

### Issue 1: Still Not Working

**Possible causes:**
1. Variables not applied to latest deployment
2. Missing other required variables
3. API key invalid

**Debug:**
- Check function logs for exact error
- Verify all variables are checked for "Production"
- Try creating a new OpenAI API key

### Issue 2: "AIRTABLE_TOKEN is not defined"

**Fix:**
Add to Vercel:
```
AIRTABLE_TOKEN = your_token
AIRTABLE_BASE_ID = your_base_id
```

### Issue 3: "Rate limit error" from OpenAI

**Cause:** Your OpenAI account has no credits or hit rate limit

**Fix:**
1. Go to: https://platform.openai.com/account/billing
2. Add payment method
3. Add credits ($5 minimum)

### Issue 4: Works on Preview but not Production

**Fix:**
- Make sure variables are checked for "Production" environment
- Redeploy production specifically

---

## Complete Environment Variables Needed

Make sure ALL of these are in Vercel:

### Required (Chatbot won't work without these):
- [ ] `OPENAI_API_KEY` ✅ (you said this is set)
- [ ] `AIRTABLE_TOKEN`
- [ ] `AIRTABLE_BASE_ID`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`

### Optional (for better functionality):
- [ ] `OPENWEATHER_API_KEY` (weather context in chat)
- [ ] `KV_REST_API_URL` (caching)
- [ ] `KV_REST_API_TOKEN` (caching)
- [ ] `UPSTASH_REDIS_REST_URL` (rate limiting)
- [ ] `UPSTASH_REDIS_REST_TOKEN` (rate limiting)

**Note:** Without the optional ones, chatbot still works but:
- No weather context in responses
- No rate limiting (anyone can spam)
- No caching (slower responses)

---

## Next Steps

### If It's Working Now ✅
- Test with multiple questions
- Check that links work
- Verify markdown formatting (bold text)
- You're done! 🎉

### If Still Not Working ❌

**Tell me:**
1. What error do you see in Vercel function logs?
2. What happens when you click "Ask" in the chatbot?
3. Any errors in browser console?

I'll help you fix it based on the specific error!

---

## Quick Verification Commands

Check if your deployment has the latest code:

```bash
# See recent deployments
git log --oneline -5

# See what's currently deployed
git show HEAD:src/components/chatbot/homepage-chat.tsx | grep "handleSubmit" | head -5
```

---

## Most Likely Issues

Based on experience, here's what's usually wrong:

1. **70% chance:** Missing `AIRTABLE_TOKEN` or `AIRTABLE_BASE_ID`
2. **20% chance:** OpenAI API key invalid or no credits
3. **5% chance:** Variables not checked for Production
4. **5% chance:** Code issue (less likely since it works locally)

---

**Check function logs first - that's the fastest way to know what's wrong!** 🔍

