# 🚀 Vercel Setup Guide - Start Fresh

This guide will help you deploy your Santa Cruz activities site to Vercel correctly from scratch.

---

## 🧹 Step 1: Clean Up (If Needed)

### If you have a failed Vercel project, remove it first:

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Find your `boredinsantacruz` project
3. Click on it → Settings → scroll to bottom
4. Click "Delete Project"
5. Type the project name to confirm
6. Delete it

**Option B: Via CLI (if connected)**
```bash
cd /Users/rockhudson/Desktop/boredinsantacruz
rm -rf .vercel  # Remove local Vercel config
vercel remove boredinsantacruz  # Remove from Vercel (if exists)
```

---

## 📋 Step 2: Pre-deployment Checklist

Before deploying, make sure these are ready:

### ✅ Required Environment Variables

You'll need these ready to paste into Vercel:

```bash
# Airtable (you already have these)
AIRTABLE_TOKEN=your_airtable_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_RAINY_TABLE=RainyActivities

# OpenWeather (NEW - get this first!)
OPENWEATHER_API_KEY=your_openweather_key
```

**Don't have OpenWeather key yet?** 
→ Get it now: https://openweathermap.org/api (free, takes 2 minutes)

---

## 🚀 Step 3: Deploy via GitHub (Recommended)

This is the cleanest and most reliable method.

### 3.1 Push to GitHub

```bash
cd /Users/rockhudson/Desktop/boredinsantacruz

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with weather integration"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/boredinsantacruz.git
git branch -M main
git push -u origin main
```

### 3.2 Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo: `boredinsantacruz`
4. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

5. **Add Environment Variables** (click "Environment Variables"):
   
   Add each one:
   ```
   Name: AIRTABLE_TOKEN
   Value: [paste your token]
   Environment: Production, Preview, Development
   
   Name: AIRTABLE_BASE_ID
   Value: [paste your base ID]
   Environment: Production, Preview, Development
   
   Name: AIRTABLE_RAINY_TABLE
   Value: RainyActivities
   Environment: Production, Preview, Development
   
   Name: OPENWEATHER_API_KEY
   Value: [paste your API key]
   Environment: Production, Preview, Development
   ```

6. Click **"Deploy"**

7. Wait 2-3 minutes for deployment to complete

---

## 🎯 Step 4: Verify Deployment

Once deployed:

### 4.1 Test the Site
Visit: `https://your-project-name.vercel.app`

You should see your homepage!

### 4.2 Test Weather API
Visit: `https://your-project-name.vercel.app/api/weather/test`

Expected response:
```json
{
  "status": "All systems operational",
  "healthy": true,
  "checks": {
    "envVars": {
      "openWeatherKey": true,
      "kvConfigured": false  // OK for now
    },
    "currentWeather": {
      "success": true,
      "temp": 68,
      "condition": "Clear"
    }
  }
}
```

✅ If you see this, deployment is successful!

---

## 💾 Step 5: Add Vercel KV (Optional but Recommended)

This adds caching for better performance and lower API costs.

1. In Vercel dashboard, go to your project
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"KV"** (Key-Value Store)
5. Configure:
   - **Name:** `weather-cache`
   - **Region:** `US West` (closest to Santa Cruz)
6. Click **"Create"**
7. Click **"Connect to Project"**
8. Select your `boredinsantacruz` project
9. Click **"Connect"**

**That's it!** Vercel automatically adds the KV environment variables:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### Verify KV is Working

1. Go to your project → Settings → Environment Variables
2. You should see the 4 new KV variables
3. Redeploy: Deployments tab → click ⋯ on latest → "Redeploy"
4. After redeploy, visit: `https://your-site.vercel.app/api/weather/test`
5. You should now see: `"kvConfigured": true`

---

## 🐛 Common Issues & Solutions

### Issue 1: "Build Failed" Error

**Possible causes:**
- Missing environment variables
- TypeScript errors
- Dependency issues

**Solutions:**
```bash
# Test build locally first
npm run build

# If it fails, fix errors, then:
git add .
git commit -m "Fix build errors"
git push
# Vercel will auto-redeploy
```

### Issue 2: "Environment Variable Not Found"

**Solution:**
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all 4 variables are added
3. Make sure they're enabled for "Production"
4. Redeploy

### Issue 3: "OPENWEATHER_API_KEY not configured"

**Solution:**
1. Check that you added the key to Vercel (not just local .env.local)
2. OpenWeather keys take ~10 minutes to activate after creation
3. Wait 10 minutes, then redeploy

### Issue 4: "Module not found: @vercel/kv"

**Solution:**
```bash
# Make sure package is in package.json
npm install @vercel/kv --save
git add .
git commit -m "Add @vercel/kv dependency"
git push
```

### Issue 5: Build succeeds but weather test fails

**Solution:**
1. Check Vercel logs: Project → Deployments → Click on deployment → "Functions" tab
2. Look for error messages
3. Common fixes:
   - Wait for OpenWeather API key to activate (10 min)
   - Verify all env vars are correct
   - Check if API has rate limits

---

## 🔄 Alternative: Deploy via Vercel CLI

If you prefer command-line deployment:

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
cd /Users/rockhudson/Desktop/boredinsantacruz
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? boredinsantacruz
# - Directory? ./
# - Override settings? No
```

### Add Environment Variables
```bash
# Add each variable:
vercel env add AIRTABLE_TOKEN
# Paste value when prompted
# Select: Production, Preview, Development

vercel env add AIRTABLE_BASE_ID
# ... repeat for each variable

vercel env add AIRTABLE_RAINY_TABLE
vercel env add OPENWEATHER_API_KEY
```

### Deploy to Production
```bash
vercel --prod
```

---

## 📊 Post-Deployment Monitoring

### Check Logs
Vercel Dashboard → Your Project → Deployments → Click deployment → "Functions" tab

Look for:
- `[Weather]` - Weather API calls
- `[Cache]` - Cache operations
- Any error messages

### Monitor Usage

**OpenWeather API:**
- Dashboard: https://home.openweathermap.org/statistics
- Free tier: 1,000 calls/day
- With caching, you should use <100/day

**Vercel KV:**
- Dashboard: Project → Storage → weather-cache
- Monitor: hits, misses, storage used
- Target: >85% hit rate

---

## 🎯 Success Checklist

After deployment, verify:

- [ ] Site loads: `https://your-site.vercel.app`
- [ ] Homepage displays correctly
- [ ] `/rainy` page shows activities
- [ ] `/api/weather/test` returns healthy status
- [ ] Weather API key is configured
- [ ] KV cache is connected (optional)
- [ ] No errors in Vercel logs
- [ ] All environment variables are set

---

## 🚀 Next: Automatic Deployments

Once you have GitHub connected:

1. **Every push to `main` branch** = automatic deployment
2. **Pull requests** = preview deployments
3. **No manual deploys needed!**

Just:
```bash
git add .
git commit -m "Your changes"
git push
```

And Vercel deploys automatically! 🎉

---

## 💡 Pro Tips

1. **Use Preview Deployments:** Create a branch, push, and Vercel creates a preview URL. Test before merging to main.

2. **Environment Variables:** Keep production and preview environments separate if needed.

3. **Custom Domain:** Settings → Domains → Add your custom domain (e.g., boredinsantacruz.com)

4. **Edge Functions:** Your weather API routes automatically become edge functions (fast worldwide!)

5. **Analytics:** Settings → Analytics → Enable to see traffic stats

---

## 🆘 Still Having Issues?

If you're still stuck, let's debug together:

1. **Share the error message:** What exactly does Vercel say?
2. **Check build logs:** Deployments → Click deployment → View logs
3. **Test locally first:** Does `npm run build` work locally?
4. **Verify env vars:** Are all 4 variables set in Vercel?

Common patterns:
- "Cannot find module" → Missing dependency
- "Environment variable" → Not set in Vercel
- "Build failed" → TypeScript or linting error
- "Function timeout" → API issue (weather or Airtable)

---

## 📞 Need Help?

I'm here to help! Share:
- The exact error message
- What step you're on
- Screenshots if helpful

We'll get it deployed! 🚀

---

*Last updated: October 14, 2025*

