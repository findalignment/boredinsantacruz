# Facilities Import Guide - Google Places to Airtable

## Overview

This guide walks you through importing wellness facilities, restaurants, and activities from Google Places API into your Airtable base.

---

## Step 1: Run the Import Script

### Setup (One-Time)

1. **Get Google Places API Key:**
   ```
   https://console.cloud.google.com/
   ```
   - Create/select project
   - Enable "Places API"
   - Create API key
   - Copy the key

2. **Add to Environment:**
   ```bash
   # Add to .env.local
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

3. **Install Dependencies (if needed):**
   ```bash
   npm install dotenv
   ```

### Run Import

```bash
# Import wellness facilities (gyms, yoga, spas)
node scripts/import-google-places.js wellness

# Import restaurants
node scripts/import-google-places.js restaurants

# Import all activities
node scripts/import-google-places.js activities

# Import everything
node scripts/import-google-places.js all
```

### What You'll Get

The script generates CSV files:
- `santa-cruz-wellness.csv` - Gyms, yoga studios, spas, massage therapists
- `santa-cruz-restaurants.csv` - Restaurants, cafes, bars
- `santa-cruz-activities.csv` - Museums, attractions, entertainment venues

---

## Step 2: Review and Clean the CSV

### Open in Excel or Google Sheets

1. Open the generated CSV file
2. Review the data for accuracy
3. Remove duplicates
4. Fix any formatting issues

### Clean Up Checklist

- ✅ Remove businesses that are closed
- ✅ Remove duplicates (same business listed multiple times)
- ✅ Verify addresses are complete
- ✅ Check phone numbers are formatted correctly
- ✅ Verify websites work
- ✅ Add any missing information manually

### Add Custom Fields

For **Wellness** (`santa-cruz-wellness.csv`):
```csv
Add columns:
- IsWellness: TRUE for all
- WellnessType: Gym, Yoga, Spa, Massage, etc.
- Amenities: Sauna, Pool, Classes, etc.
- PriceRange: $, $$, $$$, $$$$
```

For **Restaurants** (`santa-cruz-restaurants.csv`):
```csv
Add columns:
- HappyHour: TRUE/FALSE
- HappyHourDetails: "Mon-Fri 4-6pm: $5 wells, $6 apps"
- HappyHourDays: Mon, Tue, Wed, Thu, Fri
- Cuisine: Italian, Mexican, American, etc.
```

---

## Step 3: Prepare Airtable

### Create/Update Fields

#### For Activities Table (Wellness):

| Field Name | Type | Options |
|------------|------|---------|
| `Name` | Single line text | |
| `Address` | Long text | |
| `Phone` | Phone number | |
| `Website` | URL | |
| `Rating` | Number | 0-5, 1 decimal |
| `PriceLevel` | Single select | $, $$, $$$, $$$$ |
| `IsWellness` | Checkbox | |
| `WellnessType` | Multiple select | Gym, Yoga, Spa, Massage, Pilates, PT, Meditation |
| `Amenities` | Multiple select | Sauna, Pool, Classes, Personal Training, Parking |
| `Hours` | Long text | |
| `PlaceId` | Single line text | |

#### For Restaurants Table:

| Field Name | Type | Options |
|------------|------|---------|
| `Name` | Single line text | |
| `Address` | Long text | |
| `Phone` | Phone number | |
| `Website` | URL | |
| `Rating` | Number | 0-5, 1 decimal |
| `PriceLevel` | Single select | $, $$, $$$, $$$$ |
| `Cuisine` | Multiple select | Italian, Mexican, American, Asian, etc. |
| `HappyHour` | Checkbox | |
| `HappyHourDetails` | Long text | |
| `HappyHourDays` | Multiple select | Mon, Tue, Wed, Thu, Fri, Sat, Sun |
| `HappyHourStartTime` | Single line text | |
| `HappyHourEndTime` | Single line text | |
| `Hours` | Long text | |
| `PlaceId` | Single line text | |

---

## Step 4: Import to Airtable

### Method 1: CSV Import (Recommended)

1. **Open Your Airtable Base**
   - Go to https://airtable.com
   - Open your "Bored in Santa Cruz" base

2. **Import CSV**
   - Click table dropdown → "Import data" → "CSV file"
   - Upload your cleaned CSV file
   - Map columns to Airtable fields

3. **Field Mapping:**
   ```
   CSV Column          → Airtable Field
   ------------------    ----------------
   Name                → Name
   Address             → Address
   Phone               → Phone
   Website             → Website
   Rating              → Rating
   PriceLevel          → PriceLevel
   Types               → WellnessType (for wellness) or Cuisine (for restaurants)
   Hours               → Hours
   PlaceId             → PlaceId
   ```

4. **Set Default Values:**
   - After import, select all rows
   - Set `IsWellness = TRUE` for wellness table
   - Set `HappyHour = TRUE` for restaurants with deals

### Method 2: Manual Entry (For Small Lists)

If you only have a few entries:
1. Copy data from CSV
2. Paste directly into Airtable grid view
3. Review and adjust field values

---

## Step 5: Verify and Enhance

### Check Your Import

1. **Review Records:**
   - Check 10-20 random records
   - Verify all fields imported correctly
   - Check for missing data

2. **Fix Issues:**
   - Update incorrect information
   - Add missing details
   - Categorize properly

### Enhance with Additional Info

For each facility, add:

**Wellness Facilities:**
- ✅ Class schedules (link to their schedule page)
- ✅ Amenities (sauna, pool, showers, etc.)
- ✅ Price range (drop-in vs membership)
- ✅ Parking information
- ✅ Best for (beginners, advanced, families, etc.)

**Restaurants:**
- ✅ Happy hour details (times and specials)
- ✅ Cuisine types
- ✅ Best dishes
- ✅ Ambiance (casual, upscale, family-friendly)
- ✅ Outdoor seating availability

---

## Step 6: Test on Website

### View Your New Data

1. **Wellness Page:**
   ```
   http://localhost:3000/wellness
   ```
   Should show all wellness facilities

2. **Deals Page:**
   ```
   http://localhost:3000/deals
   ```
   Should show restaurants with happy hours

3. **Check Individual Pages:**
   - Click on each facility
   - Verify all information displays correctly
   - Test links to websites, directions, etc.

---

## Troubleshooting

### Import Script Issues

**Error: "GOOGLE_PLACES_API_KEY not found"**
- Add API key to `.env.local`
- Restart terminal/command prompt

**Error: "Places API not enabled"**
- Go to Google Cloud Console
- Enable "Places API" for your project

**Error: "Rate limit exceeded"**
- Script includes delays, but if you hit limits:
- Wait 1-2 hours
- Run again with fewer categories

### Airtable Import Issues

**Columns don't match:**
- Create fields in Airtable before importing
- Use exact field names from CSV

**Data looks wrong:**
- Check CSV formatting in Excel
- Ensure commas in addresses are properly escaped
- Use quotes around fields with commas

---

## Best Practices

### Keep Data Fresh

1. **Monthly Updates:**
   - Re-run import script quarterly
   - Compare with existing data
   - Add new businesses
   - Remove closed businesses

2. **User Submissions:**
   - Create a form for users to suggest businesses
   - Review and add manually

3. **Reviews and Ratings:**
   - Keep Google ratings updated
   - Add your own curated ratings

### Data Quality

- ✅ Verify phone numbers work
- ✅ Check websites are live
- ✅ Update hours seasonally
- ✅ Remove closed businesses promptly
- ✅ Add photos when possible
- ✅ Write detailed descriptions

---

## Next Steps

After importing:

1. **Customize Content:**
   - Add local insights
   - Write descriptions
   - Add photos

2. **Enable Features:**
   - Set up happy hour filters on deals page
   - Add wellness categories to filters
   - Create collections/lists

3. **Test Everything:**
   - Check all pages load
   - Verify links work
   - Test on mobile

4. **Deploy:**
   - Push to GitHub
   - Deploy to Vercel
   - Update environment variables

---

## Need Help?

- Check logs in terminal for error messages
- Review CSV in Excel for formatting issues
- See `AIRTABLE_STRUCTURE_GUIDE.md` for field definitions
- Contact Airtable support for import issues

**You're all set!** 🎉

