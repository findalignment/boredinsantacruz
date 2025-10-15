# Google Places API - Fix Referer Restrictions

## Issue

Your Google Places API key has **referer restrictions** which block server-side requests.

Error: `REQUEST_DENIED - API keys with referer restrictions cannot be used with this API.`

## Solution

You need to create a **separate API key** for server-side use (without referer restrictions).

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Select your project

### Step 2: Create a New API Key for Server-Side Use

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API key**
3. Copy the new API key
4. Click **Edit API key** (pencil icon)

### Step 3: Configure the New Key

**Name it:** `Places API - Server Side`

**API Restrictions:**
- Select "Restrict key"
- Check ONLY:
  - ✅ **Places API**
  - ✅ **Maps JavaScript API** (if using maps)
  - ✅ **Geocoding API** (if using geocoding)

**Application Restrictions:**
- Select **"None"** (this allows server-side requests)
- OR select **"IP addresses"** and add your server IPs

### Step 4: Update Environment Variables

```bash
# Add to .env.local
GOOGLE_PLACES_API_KEY=your_new_unrestricted_key_here
```

### Step 5: Keep Your Original Key

Your original key with referer restrictions is good for **client-side** use.

**Use Cases:**
- **Original key (referer restricted):** Use in `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for maps on frontend
- **New key (unrestricted):** Use in `GOOGLE_PLACES_API_KEY` for server-side imports

### Step 6: Run Import Again

```bash
node scripts/import-google-places.js wellness
```

---

## Alternative: Remove Restrictions (Less Secure)

If you don't want to create a new key:

1. Edit your existing API key
2. Under **Application restrictions**, select **"None"**
3. Save

⚠️ **Warning:** This makes your key less secure. Anyone who gets your key can use it.

---

## Security Best Practice

- ✅ Use restricted keys for client-side (browser) requests
- ✅ Use IP-restricted keys for server-side requests
- ✅ Monitor API usage regularly
- ✅ Set up billing alerts

---

Once fixed, the script will work and generate your CSV!

