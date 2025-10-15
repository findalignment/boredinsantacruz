# Quick Fix: Google Places API Key

## The Problem

Your Google Places API key has **referer restrictions** which block server-side requests (like the import script).

Error: `REQUEST_DENIED - API keys with referer restrictions cannot be used with this API.`

---

## The 5-Minute Fix

### Step 1: Create New API Key (Server-Side)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"+ CREATE CREDENTIALS"** → **"API key"**
3. Copy the new key immediately
4. Click the **pencil icon** to edit it

### Step 2: Configure the Key

**Name:** `Places API - Server Side`

**API restrictions:**
- Select **"Restrict key"**
- Check these APIs:
  - ✅ Places API
  - ✅ Places API (New) - if available
  - ✅ Geocoding API (optional but useful)

**Application restrictions:**
- Select **"None"** 
- (This allows server-side use)

**Save!**

### Step 3: Add to Environment

```bash
# In .env.local
GOOGLE_PLACES_API_KEY=AIza...your_new_key_here
```

### Step 4: Restart & Run

```bash
# Restart dev server (kill and restart)
pkill -f "npm run dev"
npm run dev

# In a new terminal, run import:
node scripts/import-google-places.js wellness
```

---

## Expected Output

You should see:
```
📦 Importing wellness...
🔍 Searching for gym...
   ✅ Found 20 results
🔍 Searching for spa...
   ✅ Found 15 results
...
📊 Found 45 unique places
✅ Success!
   Saved 45 places to: santa-cruz-wellness.csv
```

---

## Keep Both Keys!

**Original Key (Referer Restricted):**
- Use in: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Purpose: Frontend maps (browser)

**New Key (Unrestricted):**
- Use in: `GOOGLE_PLACES_API_KEY`
- Purpose: Server-side imports (backend)

This is the most secure setup!

---

## Alternative: Manually Create CSV

If you don't want to deal with API keys right now, I can help you create a sample wellness CSV manually with some popular Santa Cruz facilities. Just let me know!

