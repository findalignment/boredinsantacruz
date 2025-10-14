# 🗺️ Google Places API - Restaurant Import Setup

## Overview

This guide will help you use Google Places API to automatically import 500+ restaurants from Santa Cruz into your Airtable database.

---

## 📋 Prerequisites

1. **Google Cloud Account** (free tier available)
2. **Google Maps API Key** with Places API enabled
3. **Environment variable** for the API key

---

## 🛠️ Setup Instructions

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable these APIs:
   - **Places API (New)**
   - **Geocoding API** (optional, for coordinates)
4. Create credentials → API Key
5. Restrict the key (optional but recommended):
   - Application restrictions: None (or HTTP referrers for production)
   - API restrictions: Select "Places API"

### Step 2: Add to Environment Variables

Add to your `.env.local`:

```bash
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### Step 3: Install Dependencies (Already Done)

The script uses built-in Node.js `fetch`, no additional packages needed!

---

## 🚀 Usage

### Option A: One-Time Import (Recommended First)

This fetches all restaurants and saves to a CSV:

```bash
npm run import-restaurants-csv
```

**What it does:**
1. Searches Google Places for restaurants in Santa Cruz
2. Fetches detailed info for each (address, hours, price, photos, etc.)
3. Saves to `santacruz-restaurants-google.csv`
4. You review and import to Airtable manually

**Cost:** ~$10 (FREE with Google Cloud's $200/month credit)

### Option B: Direct to Airtable (Automatic)

This imports directly to Airtable:

```bash
npm run import-restaurants-airtable
```

**What it does:**
1. Same as Option A
2. Automatically creates records in Airtable
3. Skips duplicates (checks by name)

---

## 🎯 Data Retrieved

For each restaurant, you'll get:

- ✅ Name
- ✅ Address (formatted + components)
- ✅ GPS Coordinates (lat/lng)
- ✅ Phone Number
- ✅ Website
- ✅ Hours of Operation (structured)
- ✅ Price Level ($, $$, $$$, $$$$)
- ✅ Rating (1-5 stars)
- ✅ Total Reviews Count
- ✅ Cuisine Types (from Google categories)
- ✅ Photos (URLs)
- ✅ Google Maps URL
- ✅ Currently Open/Closed status
- ✅ Place ID (for future updates)

---

## 💰 Cost Breakdown

**Google Places API Pricing:**
- Text Search: $32 per 1,000 requests
- Place Details: $17 per 1,000 requests

**For ~500 restaurants:**
- 10 searches (50 results each) = $0.32
- 500 Place Details = $8.50
- **Total: ~$9**

**Google Cloud Free Tier:**
- $200/month credit (always free)
- So this import is **FREE**!

**Ongoing costs** (if you sync monthly):
- ~$9/month to refresh all data
- Or $0 if you only add new restaurants

---

## 🔄 Sync Strategy (Option B)

### Initial Import:
```bash
npm run import-restaurants-airtable
```

### Monthly Update (Recommended):
```bash
npm run sync-restaurants
```

This will:
1. Update hours, ratings, and status for existing restaurants
2. Add any new restaurants that opened
3. Cost: ~$5-10/month (still FREE with credits)

---

## 📊 Integration with Site Reviews

### Two-Table Approach:

**1. `Restaurants` Table** (Google data):
- Auto-imported from Google Places
- Updated monthly
- Source of truth for hours, address, phone

**2. `Reviews` Table** (Your data):
- User-generated reviews
- Staff picks and insider tips
- Ratings specific to your site
- Private notes

**Relationship:**
- `Reviews.restaurant_id` → `Restaurants.id`
- Your site displays BOTH:
  - Google data (always up-to-date)
  - Your reviews (curated, local insights)

---

## 🎨 Display Strategy

### Homepage/Listing:
- Show Google rating + your site's rating
- Mark staff picks with a badge
- Filter by price, cuisine, etc. (from Google)

### Detail Page:
- Google info (hours, address, map)
- Your reviews section
- "Add Review" button (for logged-in users)
- Private notes section

### Example:
```
🍕 Pizza My Heart
⭐ 4.5 (Google) | 🏆 4.8 (Our Community)
$$ • Italian • Downtown
📍 1116 Pacific Ave (Google Maps Link)
🕐 Open until 10pm

💬 Local Reviews (12)
✨ Staff Pick: "Best late-night pizza!"
```

---

## 🚦 Next Steps

1. **Get Google API key** (5 min)
2. **Run Option A** (CSV import) to test (10 min)
3. **Review CSV** and verify data quality (10 min)
4. **Run Option B** (Direct to Airtable) for full import (20 min)
5. **Set up monthly sync** (optional, 5 min)

---

## 🐛 Troubleshooting

### "API key not valid"
- Make sure Places API is enabled
- Check API key restrictions

### "Quota exceeded"
- You hit the free tier limit ($200/month)
- Unlikely unless you run the script many times

### "No restaurants found"
- Check the search query in the script
- Try different keywords or areas

---

## 📝 Next Sprint Tasks

After import is complete:
1. **Add review system** (user-generated)
2. **Add staff picks** (curated by you)
3. **Add filters** (cuisine, price, location)
4. **Add map view** (show restaurants on map)
5. **Add favorites** (user accounts + bookmarks)

---

**Ready to import? Let's run Option A first!**

