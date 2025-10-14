# 📋 How to Get Airtable Table IDs for Vercel

## Step 1: Find Your Table IDs

### Method 1: From Airtable Web Interface
1. Go to [airtable.com](https://airtable.com)
2. Open your **boredinsantacruz** base
3. Click on the **Favorites** table
4. Look at the URL in your browser:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/viwZZZZZZZZZZZZZ
   ```
   - `appXXXXXXXXXXXXXX` = Base ID (you already have this)
   - `tblYYYYYYYYYYYYYY` = **Favorites Table ID** ⭐ Copy this!

5. Click on the **Reviews** table
6. Look at the URL again:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/tblZZZZZZZZZZZZZZ/viwWWWWWWWWWWWWW
   ```
   - `tblZZZZZZZZZZZZZZ` = **Reviews Table ID** ⭐ Copy this!

### Method 2: From Airtable API
1. Go to [airtable.com/api](https://airtable.com/api)
2. Click on your base
3. Scroll down to see all table IDs

## Step 2: Add to Vercel

### Go to Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Select your **boredinsantacruz** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### Add These Two Variables:

#### Variable 1: Favorites Table
- **Name:** `AIRTABLE_FAVORITES_TABLE`
- **Value:** `tblYYYYYYYYYYYYYY` (your Favorites table ID)
- **Environment:** Production, Preview, Development (check all three)
- Click **Save**

#### Variable 2: Reviews Table
- **Name:** `AIRTABLE_REVIEWS_TABLE`
- **Value:** `tblZZZZZZZZZZZZZZ` (your Reviews table ID)
- **Environment:** Production, Preview, Development (check all three)
- Click **Save**

## Step 3: Redeploy

After adding the variables:
1. Go to **Deployments** tab
2. Click the **︙** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (~2 minutes)

## Step 4: Verify

After deployment:
1. Visit your site
2. Log in (Google or Magic Link)
3. Go to an activity page
4. Click the ❤️ heart button to favorite it
5. Go to `/profile` - you should see the favorited item
6. Click "✍️ Write a Review" on an activity
7. Submit a review
8. It should appear on the activity page and your profile

## ✅ Quick Reference

Your environment variables should look like this in Vercel:

```
AIRTABLE_TOKEN = pat...
AIRTABLE_BASE_ID = app...
AIRTABLE_RAINY_TABLE = tbl...
AIRTABLE_RESTAURANTS_TABLE = tbl...
AIRTABLE_SUNNY_TABLE = tbl...
AIRTABLE_FAVORITES_TABLE = tbl... ⭐ NEW
AIRTABLE_REVIEWS_TABLE = tbl... ⭐ NEW
OPENWEATHER_API_KEY = ...
KV_REST_API_URL = https://...
KV_REST_API_TOKEN = ...
MAPBOX_ACCESS_TOKEN = pk...
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN = pk...
OPENAI_API_KEY = sk-...
GOOGLE_CLIENT_ID = ...
GOOGLE_CLIENT_SECRET = ...
NEXTAUTH_URL = https://...
NEXTAUTH_SECRET = ...
RESEND_API_KEY = re_...
EMAIL_FROM = noreply@...
```

## 🐛 Troubleshooting

### "Table not found" error:
- Check that the table ID starts with `tbl`
- Make sure you copied the entire ID
- Verify you're looking at the correct base

### Favorites/Reviews not saving:
- Check Vercel deployment logs
- Verify environment variables are set for all environments
- Redeploy after adding variables

### Still not working?
1. Check that your Airtable token has write access
2. Verify the table schemas match the documentation
3. Check the browser console for errors

---

**Need help?** The table IDs are in the URL when you view the table in Airtable! Look for `tbl` followed by 17 characters.

