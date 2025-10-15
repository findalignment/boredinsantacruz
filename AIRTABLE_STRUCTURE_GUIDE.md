# Airtable Structure Guide - Recommended Setup

## Overview

You have three types of activities. Here's the recommended structure:

## Option 1: Single "Activities" Table (RECOMMENDED) ⭐

**One table with a "Type" field to categorize:**

### Table: `Activities`

**Fields:**
- `Title` (Single line text) - Activity name
- `Type` (Single select) - Options: "Indoor/Rainy", "Outdoor/Sunny", "All Weather"
- `Category` (Multiple select) - "Beach", "Hiking", "Museum", "Restaurant", "Bar", "Fitness", "Wellness", "Entertainment"
- `VenueName` (Single line text)
- `Address` (Long text)
- `Phone` (Phone number)
- `Website` (URL)
- `Instagram` (Single line text)
- `Tags` (Multiple select) - "Kid-friendly", "Pet-friendly", "Date night", "Free", "Accessible"
- `Cost` (Number) - Average cost in dollars
- `Duration` (Single line text) - "30min", "1-2hrs", "Half day"
- `Notes` (Long text) - Description
- `Hours` (Long text) - Operating hours
- `Parking` (Long text) - Parking information
- `Tips` (Long text) - Insider tips

**Weather Fields:**
- `WeatherSuitability` (Multiple select) - "Sunny", "Rainy", "Foggy", "Windy", "Any"
- `IndoorOutdoor` (Single select) - "Indoor", "Outdoor", "Mixed"
- `RainOk` (Checkbox)
- `IdealTemp_Min` (Number)
- `IdealTemp_Max` (Number)

**Special Fields:**
- `HappyHour` (Checkbox) - Has happy hour deals
- `HappyHourDetails` (Long text) - Happy hour times and deals
- `IsWellness` (Checkbox) - Fitness/massage/wellness facility
- `WellnessType` (Multiple select) - "Gym", "Yoga", "Massage", "Spa", "Physical Therapy"

**Tide Fields (for beaches/tide pools):**
- `TidePreference` (Single select) - "low-tide", "high-tide", "any-tide"
- `TideCritical` (Checkbox)

### Environment Variable:
```env
AIRTABLE_RAINY_TABLE=Activities
AIRTABLE_SUNNY_TABLE=Activities
AIRTABLE_ACTIVITIES_TABLE=Activities
```

### Pros:
✅ Single source of truth
✅ Easy to manage and update
✅ Activities can be tagged for multiple weather types
✅ Simplifies filtering and search
✅ Better for SEO (no duplicate content)

---

## Option 2: Separate Tables (Current Setup)

Keep three separate tables:

### Table 1: `RainyActivities` (Indoor/Bad Weather)
### Table 2: `SunnyActivities` (Outdoor/Good Weather)  
### Table 3: `Activities` (General/All Weather)

### Environment Variables:
```env
AIRTABLE_RAINY_TABLE=RainyActivities
AIRTABLE_SUNNY_TABLE=SunnyActivities
AIRTABLE_ACTIVITIES_TABLE=Activities
```

### Pros:
✅ Clear separation
✅ Easy to see what's what
✅ Works with current code

### Cons:
❌ Duplication (some activities work in any weather)
❌ More tables to maintain
❌ Harder to search across all activities

---

## Recommended Structure: Option 1 (Single Table)

### Views to Create in Airtable:

1. **All Activities** - Show everything
2. **Indoor/Rainy Only** - Filter: `Type = "Indoor/Rainy"` OR `RainOk = TRUE`
3. **Outdoor/Sunny Only** - Filter: `Type = "Outdoor/Sunny"` AND `IndoorOutdoor = "Outdoor"`
4. **Happy Hours** - Filter: `HappyHour = TRUE`
5. **Wellness** - Filter: `IsWellness = TRUE`
6. **Free Activities** - Filter: `Cost = 0` OR `Tags contains "Free"`
7. **Kid Friendly** - Filter: `Tags contains "Kid-friendly"`
8. **Beaches** - Filter: `Category contains "Beach"`

---

## Migration Steps (If Moving to Single Table)

### Step 1: Create New "Activities" Table
1. In Airtable, create a new table called `Activities`
2. Add all the fields listed above

### Step 2: Import Data
1. Export `RainyActivities` as CSV
2. Import into `Activities`, set `Type = "Indoor/Rainy"`
3. Export `SunnyActivities` as CSV
4. Import into `Activities`, set `Type = "Outdoor/Sunny"`
5. Export `Activities` as CSV
6. Import into new `Activities`, set `Type = "All Weather"`

### Step 3: Update Environment Variables
```env
# Old (delete these lines)
# AIRTABLE_RAINY_TABLE=RainyActivities
# AIRTABLE_SUNNY_TABLE=SunnyActivities

# New (single table for all)
AIRTABLE_ACTIVITIES_TABLE=Activities
```

### Step 4: Update Code
I'll update the codebase to use the single table with filters.

---

## What I Recommend RIGHT NOW

**Keep your current structure** for now, but add these fields to all three tables:
- `HappyHour` (Checkbox)
- `HappyHourDetails` (Long text)
- `IsWellness` (Checkbox)
- `WellnessType` (Multiple select)
- `Category` (Multiple select)

This way:
1. ✅ No migration needed
2. ✅ Can add happy hours and wellness immediately
3. ✅ Can migrate to single table later if desired

---

## Next: I'll Update the Code

I'll now:
1. Remove Trips from menu
2. Fix events page
3. Create Deals/Happy Hours page
4. Create Wellness page
5. Generate Google Places import scripts
6. Create SEO landing pages

Sound good?

