# 🎯 Master Activities Table - Complete Migration Guide

## Overview

This guide will help you replace your separate activity tables (RainyActivities, SunnyActivities, etc.) with **ONE master "Activities" table** that can be filtered and sorted by weather, category, and more.

---

## ✅ Step 1: Review the Generated CSV

The file `master-activities-import.csv` has been created with **33 activities** from Google Places.

### What's Included:

**7 Beaches:**
- Natural Bridges State Beach
- Seacliff State Beach
- Cowell Beach
- Seabright Beach
- Sunset State Beach
- Capitola Beach (2 entries)

**5 Hiking Trails:**
- Wilder Ranch State Park
- Forest of Nisene Marks State Park
- Pogonip Open Space
- Henry Cowell Redwoods State Park
- DeLaveaga Park

**3 Museums:**
- Santa Cruz Museum of Art & History
- Santa Cruz Museum of Natural History
- Santa Cruz Surfing Museum

**3 Attractions:**
- The Mystery Spot
- Santa Cruz Beach Boardwalk
- Santa Cruz Wharf

**3 Indoor Activities:**
- Giggles-N-Wiggles (family entertainment)
- Casino Arcade
- Mercantile Arcade

**5 Food & Drink:**
- Santa Cruz Mountain Brewing
- Sante Adairius (2 locations)
- Discretion Brewing
- Hallcrest Vineyards

**3 Water Activities:**
- Venture Quest Kayak
- Kayak Connection (2 entries)

**1 Shopping:**
- Bookshop Santa Cruz

**3 Arts & Culture:**
- Tannery Arts Center
- Colligan Theater
- Rio Theatre

---

## 📋 Step 2: Edit the CSV (Optional but Recommended)

Open `master-activities-import.csv` in Excel, Google Sheets, or a text editor.

### Fields to Fill In (if you have time):

#### High Priority:
1. **WriteUp** - Add 300-800 word editorial content for your favorites
2. **ParkingInfo** - Add parking details
3. **Tips** - Add insider tips
4. **BestTimeToVisit** - When to go for best experience
5. **Neighborhood** - Add specific area (Downtown, Westside, etc.)

#### Medium Priority:
6. **StaffPick** - Mark your favorites as `true`
7. **Featured** - Mark homepage features as `true`
8. **BestFeature** - Highlight the signature element
9. **WhatToBring** - Suggested items
10. **Accessibility** - Wheelchair/accessibility info

#### Already Populated:
- ✅ Name, Description, Category
- ✅ Address, Latitude, Longitude
- ✅ Phone, Website, Hours (from Google)
- ✅ Cost estimate
- ✅ Duration estimate
- ✅ Weather preferences
- ✅ IndoorOutdoor
- ✅ Tags
- ✅ KidFriendly (estimated)
- ✅ Rating (from Google)

---

## 📥 Step 3: Import to Airtable

### Create the New Table:

1. **Open your Airtable base**
2. **Create a new table** called `Activities`
3. **Delete the default fields** (Name, Notes, etc.)

### Import the CSV:

#### Method A: Import via Airtable Interface
1. Click the **dropdown arrow** next to the table name
2. Select **"Import data"** → **"CSV file"**
3. Upload `master-activities-import.csv`
4. Map the fields (Airtable should auto-detect)
5. Click **"Import"**

#### Method B: Copy-Paste (if import doesn't work)
1. Open the CSV in Excel/Google Sheets
2. Select all data (including headers)
3. Copy (Cmd/Ctrl + C)
4. In Airtable, create fields matching the headers
5. Paste into the table

### Fix Field Types:

After import, set the correct field types:

| Field | Type |
|-------|------|
| ID | Single line text |
| Name | Single line text |
| Description | Long text |
| WriteUp | Long text |
| Category | Single select |
| Cost | Number |
| IndoorOutdoor | Single select |
| PhotoURL | URL |
| Latitude, Longitude | Number (decimal) |
| Hours | Long text |
| Phone | Phone number |
| Website, Instagram | URL |
| Tags | Multiple select (or text) |
| WeatherPreferences | Multiple select (or text) |
| KidFriendly, PetFriendly | Checkbox |
| RainOk, WindSensitive, etc. | Checkbox |
| Rating | Number (decimal) |
| StaffPick, Featured, Sponsored | Checkbox |
| Status | Single select |

---

## 🔧 Step 4: Update Environment Variables

Once the table is imported, update your `.env.local`:

```bash
# Master Activities Table (replaces all separate activity tables)
AIRTABLE_ACTIVITIES_TABLE=Activities

# You can keep these for backwards compatibility, or remove them:
# AIRTABLE_RAINY_TABLE=RainyActivities  # Optional - keep if you want legacy support
# AIRTABLE_SUNNY_TABLE=SunnyActivities  # Optional - keep if you want legacy support
```

---

## 🚀 Step 5: Code Migration (I'll do this for you!)

Once you confirm the table is set up, I'll update the following files:

### Files I'll Modify:

1. **`src/lib/airtable.ts`**
   - Add `activities` table reference
   - Keep old tables for backwards compatibility (optional)

2. **`src/app/actions/getActivities.ts`**
   - Update to fetch from new `Activities` table
   - Support filtering by weather, category, indoor/outdoor
   - Add new `getMasterActivities()` function

3. **`src/types/index.ts`**
   - Create new `Activity` interface with all 50+ fields
   - Keep `RainyActivity` for backwards compatibility

4. **`src/app/activities/page.tsx`**
   - Update to use new master table
   - Add category filters

5. **`src/app/rainy/page.tsx`**
   - Update to filter master table by `RainOk = true`
   - Or keep using old table if you prefer

6. **`src/app/sunny/page.tsx`**
   - Update to filter master table by weather preferences

7. **`src/lib/recommendations/engine.ts`**
   - Update to use master table
   - Enhanced weather-based filtering

8. **`src/components/filtered-activities.tsx`**
   - Update to support new fields

### New Features I'll Add:

- ✅ **Weather-based filtering** (rainy, sunny, foggy, etc.)
- ✅ **Category filtering** (beaches, hiking, museums, etc.)
- ✅ **Indoor/Outdoor filtering**
- ✅ **Cost-based filtering**
- ✅ **Kid-friendly filtering**
- ✅ **Pet-friendly filtering**
- ✅ **Enhanced recommendation engine**

---

## 📊 Step 6: Testing Plan

After I update the code, test these pages:

1. **`/activities`** - Should show all activities from master table
2. **`/rainy`** - Should filter to RainOk = true activities
3. **`/sunny`** - Should filter to sunny weather activities
4. **`/activity/[id]`** - Detail pages should still work
5. **Homepage** - Recommendations should use new table
6. **Search** - Should search all activities

---

## 🎯 Migration Benefits

### Before (Multiple Tables):
- ❌ RainyActivities table (20 items)
- ❌ SunnyActivities table (15 items)
- ❌ Activities table (maybe 10 items)
- ❌ Duplicate data
- ❌ Hard to maintain
- ❌ Limited filtering

### After (Master Table):
- ✅ ONE Activities table (100+ items)
- ✅ No duplicates
- ✅ Easy to maintain
- ✅ Advanced filtering by weather, category, cost, etc.
- ✅ Better recommendations
- ✅ Scalable (can add 1000s of activities)

---

## 📝 Field Usage Guide

### How the Code Will Use Fields:

| Field | Used By |
|-------|---------|
| WeatherPreferences | Recommendation engine filters by weather |
| RainOk | `/rainy` page shows only RainOk = true |
| IndoorOutdoor | Filters for outdoor/indoor activities |
| TidePreference | Tide-based recommendations |
| IdealTempMin/Max | Weather scoring algorithm |
| WindSensitive | Weather warnings |
| Tags | Search, filters, recommendations |
| Category | Category pages, filters |
| Cost | Budget filters |
| KidFriendly | Family filters |
| StaffPick | Featured sections |

---

## 🔄 Backwards Compatibility

Don't worry! I'll keep your old tables working until you're ready:

- Old URLs will still work
- Old data will still be accessible
- You can migrate gradually
- No data will be lost

---

## ✅ Quick Start Checklist

- [ ] Review `master-activities-import.csv` (open in Excel/Sheets)
- [ ] Optional: Edit WriteUp, Tips, Parking for your favorites
- [ ] Import CSV to Airtable as new "Activities" table
- [ ] Fix field types (checkboxes, selects, numbers)
- [ ] Add `AIRTABLE_ACTIVITIES_TABLE=Activities` to `.env.local`
- [ ] Reply "table is set up" and I'll migrate the code!

---

## 💡 Pro Tips

1. **Start small** - Import the CSV as-is, test it, then add WriteUps later
2. **Test the import** - Create a test base first if you're nervous
3. **Keep old tables** - Don't delete RainyActivities/SunnyActivities yet
4. **Add gradually** - You can import 33 activities now, add more later
5. **Mark favorites** - Set StaffPick = true for your top 10

---

## 🎨 Example: Filled-Out Activity

Here's what a complete activity looks like:

```
ID: natural-bridges-state-beach
Name: Natural Bridges State Beach
Description: Iconic beach featuring a natural rock bridge, tide pools, monarch butterfly grove, and stunning sunset views.
WriteUp: We've been visiting Natural Bridges for years, and it never gets old. The tide pools at low tide are incredible - you'll see sea stars, anemones, and hermit crabs. Kids love exploring, just remind them to look but not touch! The butterfly grove (Oct-Feb) is absolutely magical with thousands of monarchs. Go on a sunny morning for the best experience. The beach itself is perfect for sunset, but view the bridge from the western side. Don't forget layers - the wind picks up in the afternoon!
Category: Beach
Cost: 0
Duration: 2-4 hours
IndoorOutdoor: Outdoor
Address: 2531 W Cliff Dr, Santa Cruz, CA 95060
Latitude: 36.9509
Longitude: -122.0595
Tags: beach,tide-pools,scenic,family,photo-worthy,butterflies
WeatherPreferences: sunny,partly-cloudy,warm
RainOk: FALSE
IdealTempMin: 65
IdealTempMax: 85
TidePreference: low-tide
TideCritical: TRUE
KidFriendly: TRUE
PetFriendly: Leash required
ParkingInfo: Parking lot available, $10 fee. Fills up by 10am on sunny weekends. Try arriving early or street parking on Delaware Ave.
Tips: Check tide tables for low tide times. Butterfly season is October-February. Bring layers and sunscreen.
BestTimeToVisit: Low tide for tide pools, winter mornings for butterflies, evenings for sunset
StaffPick: TRUE
Rating: 4.7
```

---

## 🚀 Ready to Begin?

1. Open `master-activities-import.csv`
2. Import to Airtable as "Activities" table
3. Update `.env.local`
4. Reply "ready" and I'll migrate all the code!

---

**Questions?** Just ask! I'm here to help with any step of the migration. 🎉

