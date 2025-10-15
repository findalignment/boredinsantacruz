# 📥 Airtable Import Guide - Activities & Restaurants

## Method 1: Manual CSV Import (Recommended for First Time)

### Step 1: Open Your Airtable Base
1. Go to [airtable.com](https://airtable.com)
2. Open your **boredinsantacruz** base
3. Click on the **RainyActivities** table

### Step 2: Import CSV
1. Click the **"+"** button next to your last field
2. Select **"Import"** from the dropdown
3. Click **"CSV file"**
4. Upload `santacruz-activities-google.csv`

### Step 3: Map Fields

**Map these CSV columns to Airtable fields:**

| CSV Column | Airtable Field | Notes |
|------------|----------------|-------|
| Name | Title | Main activity name |
| Description | Notes | Full description |
| Category | Tags | Multi-select or text |
| Address | Address | Full street address |
| Phone | Phone | Phone number |
| Website | Website | URL |
| GoogleMapsUrl | (Skip or create new field) | Optional |
| Hours | Hours | Business hours |
| Rating | (Skip or create new field) | Google rating |
| ReviewCount | (Skip or create new field) | # of Google reviews |
| PhotoUrl1 | ImageUrl | Main photo |
| Latitude | (Skip) | We have Address |
| Longitude | (Skip) | We have Address |

**Fields to Add Later (Not in CSV):**
- Cost (0-4, $ scale)
- Duration (text)
- IndoorOutdoor (Indoor/Outdoor/Mixed/Covered)
- IdealWeatherMin (number)
- IdealWeatherMax (number)
- Parking (long text)
- Tips (long text)

### Step 4: Review & Import
1. Check field mapping
2. Click **"Import"**
3. Wait for 95 records to import (~30 seconds)
4. Review the imported data

### Step 5: Clean Up (After Import)
1. Go through each record
2. Add missing fields (Cost, Duration, IndoorOutdoor)
3. Add weather suitability data
4. Add parking and tips

---

## Method 2: Direct Import via Script (Faster)

### Quick Import Command:
```bash
export $(cat .env.local | xargs) && npm run import-activities-airtable
```

**This will:**
- ✅ Import all 95 activities directly
- ✅ Automatically map fields
- ✅ Check for duplicates
- ⚠️ Add records immediately (no review step)

**Before running:**
- Make sure Airtable table structure matches
- Backup your table if you have existing data

---

## Restaurant Import

### Step 1: Generate Restaurant CSV
```bash
export $(cat .env.local | xargs) && npm run import-restaurants-csv
```

**This will search for:**
- Restaurants
- Cafes
- Bars
- Bakeries
- Food trucks
- And more...

### Step 2: Import to Airtable
Same process as activities:
1. Open **Restaurants** table in Airtable
2. Import → CSV file
3. Upload `santacruz-restaurants-google.csv`
4. Map fields
5. Import

**Or direct import:**
```bash
export $(cat .env.local | xargs) && npm run import-restaurants-airtable
```

---

## Field Mapping Reference

### Activities Table (`RainyActivities`)

**Core Fields:**
- `Title` ← Name
- `Notes` ← Description
- `Tags` ← Category
- `Address` ← Address
- `Phone` ← Phone
- `Website` ← Website
- `Hours` ← Hours
- `ImageUrl` ← PhotoUrl1

**Optional Fields to Add:**
- `Cost` (0-4)
- `Duration` (e.g., "2-3 hours")
- `IndoorOutdoor` (Single select)
- `IdealWeatherMin` (60)
- `IdealWeatherMax` (85)
- `Parking` (text)
- `Tips` (text)

### Restaurants Table

**Core Fields:**
- `Name` ← Name
- `Description` ← Description
- `Cuisine` ← Category
- `Address` ← Address
- `Phone` ← Phone
- `Website` ← Website
- `Hours` ← Hours
- `ImageUrl` ← PhotoUrl1
- `PriceLevel` (1-4)
- `Rating` (1-5)

**Optional Fields:**
- `Tags` (e.g., "Outdoor Seating", "Family-Friendly")
- `Parking` (text)
- `Reservations` (Yes/No)
- `Delivery` (Yes/No)
- `Takeout` (Yes/No)

---

## Tips for Clean Data

### After Import:

**1. Deduplicate**
- Check for duplicate entries
- Merge or delete duplicates
- Airtable has a built-in duplicate finder

**2. Enhance Descriptions**
- Google descriptions are sometimes generic
- Rewrite to be more engaging
- Add local insider tips

**3. Add Weather Data**
- Indoor activities: `IdealWeatherMin=0, IdealWeatherMax=100`
- Outdoor activities: `IdealWeatherMin=65, IdealWeatherMax=85`
- Beach activities: `IdealWeatherMin=70, IdealWeatherMax=90`

**4. Add Practical Info**
- Parking details
- Best times to visit
- Insider tips
- What to bring

**5. Add Better Photos**
- Google photos are hit-or-miss
- Take your own photos
- Or use high-quality stock photos

---

## Troubleshooting

### "Field not found" Error
- Create the missing field in Airtable first
- Then re-run import

### Duplicate Records
- Script checks for duplicates by name
- If you get duplicates, they might be slightly different names
- Manually merge in Airtable

### Import Failed
- Check your Airtable API token
- Verify base ID and table name
- Check console output for errors

---

## Next Steps After Import

1. **Review Data Quality** (1 hour)
   - Spot check 10-20 records
   - Fix any errors
   - Ensure photos load

2. **Add Weather Data** (2-3 hours)
   - Categorize as Indoor/Outdoor
   - Add ideal weather ranges
   - Add rain suitability

3. **Enhance Content** (Ongoing)
   - Better descriptions
   - Add parking info
   - Add tips
   - Add better photos

4. **Test on Site** (30 minutes)
   - Visit your live site
   - Check activities display
   - Test search
   - Test map markers

---

**Ready to import? Let me know which method you prefer!**

