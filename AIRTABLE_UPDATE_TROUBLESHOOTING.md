# Airtable Data Not Updating - Troubleshooting Guide

## 🔍 Issue
Data uploaded to Airtable isn't appearing on the deployed website after redeployment.

---

## ✅ Step-by-Step Fix

### 1. **Verify Airtable Setup**

First, confirm your data is actually in Airtable:

1. Go to Airtable.com
2. Open your base
3. Check these tables exist with data:
   - `Activities` (if you're using the new master table)
   - `Restaurants` (or within Activities)
   - `RainyActivities` (legacy, if still using)
   - `SunnyActivities` (legacy, if still using)

---

### 2. **Check Environment Variables on Vercel**

This is the MOST COMMON issue! Your local `.env.local` works, but Vercel needs these set:

#### Go to Vercel Dashboard:
1. Open https://vercel.com
2. Go to your project: `boredinsantacruz`
3. Click **Settings** → **Environment Variables**

#### Verify These Variables Are Set:

**Required:**
```
AIRTABLE_TOKEN=your_token_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXX
```

**Table IDs (check which you're using):**

**If using NEW master table:**
```
AIRTABLE_ACTIVITIES_TABLE=Activities
```

**If using LEGACY tables:**
```
AIRTABLE_RAINY_TABLE=RainyActivities
AIRTABLE_SUNNY_TABLE=SunnyActivities
```

**For Restaurants:**
```
AIRTABLE_RESTAURANTS_TABLE=Restaurants
```

**Other tables:**
```
AIRTABLE_WELLNESS_TABLE=Wellness
AIRTABLE_DEALS_TABLE=Deals
AIRTABLE_FAVORITES_TABLE=Favorites
AIRTABLE_REVIEWS_TABLE=Reviews
AIRTABLE_TRIPS_TABLE=Trips
AIRTABLE_TRIP_ITEMS_TABLE=TripItems
```

#### ⚠️ CRITICAL: After Adding/Changing Variables
After changing ANY environment variable on Vercel:
1. You MUST redeploy (or it will use old cached values)
2. Go to **Deployments** tab
3. Click the **...** menu on latest deployment
4. Click **Redeploy**

---

### 3. **Check Table Names Match EXACTLY**

Common mistake: Table name in Airtable doesn't match environment variable.

**In Airtable, your table must be named EXACTLY:**
- Not "restaurants" (lowercase)
- Not "Restaurant" (singular, if you set it as plural)
- Must match: `Restaurants` or `Activities` or whatever you set in env vars

**To find exact table name:**
1. In Airtable, right-click the table tab
2. Copy the table ID or check the exact spelling

---

### 4. **Clear ISR Cache** (Incremental Static Regeneration)

Some pages cache data for performance. To force refresh:

**Option A: Wait**
- Activities page: Revalidates every **1 hour** (`revalidate: 3600`)
- Restaurants page: Revalidates every **1 hour**
- Sunny/Rainy pages: Revalidate every **30 minutes**

**Option B: Force Immediate Refresh**
```bash
# Visit these URLs to force revalidation:
https://boredinsantacruz.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/activities
https://boredinsantacruz.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/restaurants
```
*(If revalidate API is set up)*

**Option C: Add Force-Refresh to Pages** (temporary)
I can modify the pages to disable caching temporarily for testing.

---

### 5. **Verify Data Structure in Airtable**

Make sure your Airtable fields match what the code expects:

**For Activities table, minimum required fields:**
- `Name` (or `name`)
- `Description` (or `description`)
- `Cost` (or `cost`)
- `Category` (or `category`)

**For Restaurants table, minimum required fields:**
- `Name` (or `name`)
- `Cuisine` (or `cuisine`)
- `Address` (or `address`)
- `PriceLevel` (or `priceLevel`)

**Check field names are spelled correctly!** (case-sensitive)

---

### 6. **Test Locally First**

Before debugging on Vercel, test locally:

```bash
# Make sure your .env.local has the correct values
cd /Users/rockhudson/Desktop/boredinsantacruz
npm run dev
```

Then visit:
- http://localhost:3000/activities
- http://localhost:3000/restaurants

**If it works locally but NOT on Vercel:**
→ Environment variable issue on Vercel

**If it doesn't work locally either:**
→ Airtable table/field name mismatch

---

### 7. **Check Vercel Deployment Logs**

Look for errors in the deployment:

1. Go to Vercel Dashboard
2. Click **Deployments**
3. Click your latest deployment
4. Look at the **Build Logs**
5. Search for errors like:
   - `Airtable`
   - `Table not found`
   - `Field not found`
   - `401 Unauthorized`
   - `404 Not Found`

---

### 8. **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| **401 Unauthorized** | `AIRTABLE_TOKEN` is wrong or not set on Vercel |
| **Table not found** | Table name doesn't match env var (case-sensitive!) |
| **Empty data** | Field names don't match (check capitalization) |
| **Shows old data** | ISR cache, wait 1 hour or force redeploy |
| **Works locally, not on Vercel** | Env vars not set on Vercel or need redeploy |

---

## 🚀 Quick Fix Checklist

Try these in order:

- [ ] **Step 1:** Verify data exists in Airtable tables
- [ ] **Step 2:** Check Vercel environment variables are set
- [ ] **Step 3:** Verify table names match EXACTLY (case-sensitive)
- [ ] **Step 4:** After changing env vars, REDEPLOY on Vercel
- [ ] **Step 5:** Wait 5 minutes for deployment to complete
- [ ] **Step 6:** Clear browser cache (Cmd+Shift+R on Mac)
- [ ] **Step 7:** Check deployment logs for errors

---

## 🔧 I Can Help You:

**Option A: Temporarily Disable Caching**
I can modify the pages to fetch fresh data on every request (for testing).

**Option B: Add Debug Logging**
I can add console logs to see exactly what data is being fetched.

**Option C: Create a Test API Route**
I can create `/api/test-airtable` to verify connection and show what data is returned.

**Which would you like me to do?**

---

## 📊 Current Page Cache Settings

Here's what's currently cached:

- `/activities` - 1 hour cache
- `/restaurants` - 1 hour cache  
- `/sunny` - 30 minute cache
- `/rainy` - 30 minute cache
- `/wellness` - 1 hour cache

After deployment, wait at least 1 hour for these pages to refresh, OR I can disable caching temporarily.

---

## 🎯 Most Likely Cause

**90% of the time, it's one of these:**

1. ✅ **Environment variables not set on Vercel** (most common!)
2. ✅ **Table name mismatch** (Activities vs activities)
3. ✅ **ISR cache** - wait 1 hour or force refresh
4. ✅ **Forgot to redeploy after changing env vars**

---

## 📝 What Information I Need

To help debug further, can you tell me:

1. **Did you upload the CSV to Airtable?** (Which table?)
2. **What is the EXACT name of your Airtable table?**
3. **Have you set environment variables on Vercel?** (Screenshot if possible)
4. **Does it work on localhost?** (npm run dev)
5. **When did you last deploy?** (Check Vercel dashboard)

Let me know and I'll help you fix it! 🚀

