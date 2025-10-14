# 🔗 Airtable Setup & Connection

**Your activities are already in Airtable!** Let's connect them.

---

## ✅ Step 1: Verify Environment Variables

Your `.env.local` file should have these 4 variables:

```bash
# Airtable Configuration
AIRTABLE_TOKEN=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_RAINY_TABLE=RainyActivities

# Weather API
OPENWEATHER_API_KEY=your_openweather_key_here
```

### How to Get These Values:

#### 1. AIRTABLE_TOKEN (Personal Access Token)
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it: "Bored in Santa Cruz"
4. Add scopes:
   - `data.records:read`
   - `data.records:write` (optional, for future updates)
   - `schema.bases:read`
5. Add your base under "Access"
6. Click "Create token"
7. **Copy the token** (you won't see it again!)

#### 2. AIRTABLE_BASE_ID
1. Go to your Airtable base
2. Look at the URL: `https://airtable.com/app...`
3. Copy everything after `/app` up to the next `/`
4. Example: `appXXXXXXXXXXXXXX`

#### 3. AIRTABLE_RAINY_TABLE
- This is the name of your table
- Default: `RainyActivities`
- Use the exact name from your base

---

## ✅ Step 2: Add Weather Fields to Airtable

Your Airtable table needs these fields for weather-aware recommendations:

### Required Fields (You likely already have these):
- **Title** - Single line text
- **VenueName** - Single line text (or linked to Venues table)
- **Tags** - Multiple select
- **Cost** - Number (0-4)
- **Duration** - Single line text
- **Notes** - Long text
- **Website** - URL
- **Instagram** - Single line text
- **Image** - Attachment

### NEW Weather Fields (Add these):

| Field Name | Type | Options |
|------------|------|---------|
| `WeatherSuitability` | Multiple select | `perfect_sunny`, `hot_sunny`, `cool_sunny`, `partly_cloudy`, `overcast`, `light_rain`, `rainy`, `foggy`, `windy`, `cold`, `hot` |
| `IdealTemp_Min` | Number | Min temperature (°F) |
| `IdealTemp_Max` | Number | Max temperature (°F) |
| `IndoorOutdoor` | Single select | `Indoor`, `Outdoor`, `Mixed`, `Covered` |
| `RainOk` | Checkbox | Can do in light rain? |
| `WindSensitive` | Checkbox | Avoid in high winds? |
| `RequiresGoodVisibility` | Checkbox | Needs clear views? |
| `WeatherBoost` | Number | Priority multiplier (0.5-2.0) |

### How to Add Fields in Airtable:
1. Open your base
2. Click **"+"** at the right of your last column
3. Choose field type
4. Name it exactly as shown above (case-sensitive!)
5. For Multiple/Single select, add all the options
6. Click "Create field"

---

## ✅ Step 3: Fill in Weather Data (Quick Start)

Don't worry about filling every field for every activity! Here's a quick approach:

### Priority 1: Indoor/Outdoor (5 min)
Just mark each activity as Indoor, Outdoor, or Mixed. This alone makes a huge difference!

### Priority 2: Weather Suitability (10 min)
For each activity, select the weather types that work well:
- **Indoor activities** → Select: `light_rain`, `rainy`, `foggy`, `cold`, `hot`, `overcast`
- **Outdoor activities** → Select: `perfect_sunny`, `cool_sunny`, `partly_cloudy`
- **Mixed** → Select a range

### Priority 3: Optional Fields (Later)
You can add these later to fine-tune recommendations:
- Temperature ranges
- Rain OK checkbox
- Wind sensitivity
- Weather boost

---

## ✅ Step 4: Test the Connection

Once your `.env.local` is set up:

```bash
# Start dev server
npm run dev

# Visit these pages:
http://localhost:3000/rainy
http://localhost:3000/activities
```

### What to Check:
- ✅ Activities load (no errors)
- ✅ You see your activity titles
- ✅ Images display (if you have them)
- ✅ Tags show up

If you see your activities, **it's working!** 🎉

---

## ✅ Step 5: Deploy to Vercel

Once it works locally, update Vercel:

1. Go to: https://vercel.com/findalignment/boredinsantacruz1/settings/environment-variables
2. Make sure these are set:
   - `AIRTABLE_TOKEN`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_RAINY_TABLE`
   - `OPENWEATHER_API_KEY`
3. Click "Redeploy" on your latest deployment

Your activities will now appear on the live site!

---

## 🔍 Troubleshooting

### Problem: "Error fetching activities"
**Solutions:**
- Check token has correct scopes
- Verify base ID is correct
- Ensure table name matches exactly
- Check token hasn't expired

### Problem: Activities load but weather recommendations don't work
**Solutions:**
- Add `IndoorOutdoor` field to activities
- Add `WeatherSuitability` options
- Fill in at least a few activities to test

### Problem: Some fields are missing
**Solutions:**
- Check field names match exactly (case-sensitive!)
- Look in browser console for errors
- Verify field types match (checkbox vs text, etc.)

---

## 📊 Example Activity Setup

Here's how to set up one activity as an example:

### **Cat & Cloud Coffee**
```
Title: Cat & Cloud Coffee
VenueName: Cat & Cloud Coffee
Tags: coffee, cafe, indoor, work
Cost: 2
Duration: 30min - 1 hour
Notes: Indie coffee shop with great vibes. Perfect rainy day spot.
Website: https://catandcloud.com
Instagram: @catandcloud

--- Weather Fields ---
WeatherSuitability: light_rain, rainy, foggy, cold, overcast
IdealTemp_Min: (leave empty - indoor)
IdealTemp_Max: (leave empty - indoor)
IndoorOutdoor: Indoor
RainOk: ✅ (checked)
WindSensitive: ❌ (unchecked)
RequiresGoodVisibility: ❌ (unchecked)
WeatherBoost: 1.0
```

Once you have 5-10 activities set up like this, test the recommendations!

---

## 🚀 Quick Start Checklist

- [ ] Get Airtable Personal Access Token
- [ ] Find Base ID from URL
- [ ] Create `.env.local` file with all 4 variables
- [ ] Add weather fields to Airtable table
- [ ] Fill `IndoorOutdoor` for all activities (5 min)
- [ ] Fill `WeatherSuitability` for 5-10 activities
- [ ] Test locally: `npm run dev`
- [ ] Check `/activities` page loads
- [ ] Deploy to Vercel
- [ ] Celebrate! 🎉

---

**Need help?** Let me know which step you're stuck on!

