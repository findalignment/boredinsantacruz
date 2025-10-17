
# Airtable Import Instructions - FIXED VERSION

## Files Created:
1. santacruz-wellness-airtable-fixed.csv (20 fields) - **RECOMMENDED**
2. santacruz-wellness-airtable-minimal.csv (13 fields) - **BACKUP OPTION**

## Import Steps:
1. Open your Airtable base
2. Go to your Wellness table
3. Click "Add records" → "Import a spreadsheet"
4. Upload santacruz-wellness-airtable-fixed.csv
5. Map the fields to your Airtable columns
6. Click "Import"

## Field Mapping for Airtable:
- Name → Title (Primary field)
- Category → Category (Single select: Yoga Studio, Pilates Studio, Fitness Center, etc.)
- Description → Description (Long text)
- Address → Address (Long text)
- City → City (Single select)
- Phone → Phone
- Website → Website
- Latitude → Latitude (Number)
- Longitude → Longitude (Number)
- Neighborhood → Neighborhood (Single select)
- Hours → Hours (Long text)
- Services → Services (Long text)
- PriceLevel → Price Level (Number: 1-4)
- IndoorOutdoor → Indoor/Outdoor (Single select)
- Parking → Parking (Long text)
- Rating → Rating (Number)
- PhotoURL → Photo URL
- Tags → Tags (Multiple select)
- WellnessType → Wellness Type (Single select)
- BusinessType → Business Type (Single select)

## Troubleshooting:
- ✅ **Fixed CSV parsing issues** - commas and quotes are properly escaped
- ✅ **Limited to essential fields** - easier for Airtable to handle
- ✅ **Clean data format** - no line breaks or formatting issues
- ✅ **Proper escaping** - all special characters handled correctly

## If Import Still Fails:
1. Try the minimal version (santacruz-wellness-airtable-minimal.csv)
2. Import in smaller batches (10-15 records at a time)
3. Check your Airtable plan limits
4. Ensure field types match (text, number, etc.)

## Record Count: 62 wellness facilities
