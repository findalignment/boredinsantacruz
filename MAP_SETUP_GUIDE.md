# Map Setup Guide

## 🗺️ The Map Page Not Loading?

The interactive map requires a **Mapbox API token** to function. The page is accessible at `/map` but will show a configuration message until you add the token.

## Quick Fix (3 Steps)

### Step 1: Get Your Mapbox Token

1. Go to [https://www.mapbox.com/](https://www.mapbox.com/)
2. Sign up for a free account (or log in)
3. Navigate to **Account → Tokens**
4. Copy your **Default Public Token** (or create a new one)

**Free Tier Includes:**
- 50,000 free map loads per month
- Perfect for most small-to-medium sites

### Step 2: Add Token to `.env.local`

Add this line to your `.env.local` file:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here
```

**⚠️ Important:** The variable **MUST** start with `NEXT_PUBLIC_` to work in the browser.

### Step 3: Restart Your Server

```bash
# Stop server (Ctrl+C)

# Restart:
npm run dev
```

**That's it!** Visit `/map` to see the interactive map.

---

## What the Map Shows

✅ **All activities** from your Airtable database  
✅ **Color-coded markers** by activity type  
✅ **Interactive popups** with activity details  
✅ **Filters** for location, cuisine, price, and more  
✅ **Geolocation** - Find activities near you  

---

## Troubleshooting

### "Map not loading"
- ✅ Check token starts with `NEXT_PUBLIC_`
- ✅ Restart server after adding token
- ✅ Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- ✅ Check browser console for errors (F12)

### "Invalid token" error
- ✅ Make sure you copied the full token (starts with `pk.`)
- ✅ No quotes around the token in `.env.local`
- ✅ No spaces before or after the `=`

### "Markers not showing"
- ✅ Check that activities have valid addresses in Airtable
- ✅ Map uses known coordinates or geocodes addresses
- ✅ Some activities may not have mappable locations

---

## Navigation Update

**Note:** The Map link has been **removed from the main navigation menu** as requested. 

Users can still access it via:
- ✅ Direct URL: `/map`
- ✅ Chatbot recommendations (when appropriate)
- ✅ Restaurant & activity detail pages may link to map view

---

## For Vercel Deployment

When deploying to Vercel, add the environment variable:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
   - **Value:** Your token
   - **Environment:** Production, Preview, Development (select all)
3. **Redeploy** your site

---

## Cost & Limits

**Mapbox Free Tier:**
- ✅ 50,000 map loads/month
- ✅ No credit card required to start
- ✅ Upgrade only if you exceed limits

**Typical Usage:**
- Small site (100 visitors/day): ~3,000 loads/month ✅ Well within free tier
- Medium site (500 visitors/day): ~15,000 loads/month ✅ Still free
- Large site (2,000 visitors/day): ~60,000 loads/month → Consider Pro plan

---

## Alternative: Remove Map Page

If you don't want to use Mapbox, you can remove the map page entirely:

```bash
# Delete the map page
rm src/app/map/page.tsx

# Or just keep it - it shows a nice "configure me" message
```

The map is **optional** - your site works perfectly without it!

---

## Questions?

- Mapbox Docs: [https://docs.mapbox.com/](https://docs.mapbox.com/)
- Mapbox Pricing: [https://www.mapbox.com/pricing](https://www.mapbox.com/pricing)
- Our interactive map component: `src/components/map/interactive-map.tsx`

