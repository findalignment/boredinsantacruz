# Complete Implementation Plan - Bored in Santa Cruz

## ✅ Completed

1. **Airtable Structure Guide** - See `AIRTABLE_STRUCTURE_GUIDE.md`
2. **Header Update** - Removed Trips, Added Deals & Wellness

## 🚧 In Progress

This document outlines everything that needs to be implemented based on your request.

---

## Priority 1: Fix Current Issues

### 1. Fix Airtable Table Name Error ⚠️

**Current Issue:** `/activities/[date]` shows "Application Error"

**Fix:** Update `.env.local`:
```env
AIRTABLE_RAINY_TABLE=Activities  # Or whatever your table is actually named
```

**Test:** Check your Airtable base at https://airtable.com and find the exact table name.

### 2. Fix Eventbrite API (Events Page) ⚠️

**Current Issue:** Events page returns 404 from Eventbrite

**Possible Causes:**
1. API token is invalid or expired
2. Token doesn't have correct permissions
3. Endpoint URL is wrong

**Fix:**
- Get a new Eventbrite API token from: https://www.eventbrite.com/account-settings/apps
- Update `.env.local`:
```env
EVENTBRITE_API_KEY=your_new_token_here
```

---

## Priority 2: New Pages to Create

### 3. Happy Hours/Deals Page 🍻

**Page:** `/deals`

**Features:**
- List all restaurants/bars with happy hour deals
- Filter by day of the week
- Filter by type (Food deals, Drink specials, Both)
- Sort by time (when happy hour starts)
- Show current active deals at top

**Airtable Fields Needed:**
```
HappyHour (Checkbox)
HappyHourDetails (Long text) - e.g., "Mon-Fri 4-6pm: $5 well drinks, $6 appetizers"
HappyHourDays (Multiple select) - Mon, Tue, Wed, Thu, Fri, Sat, Sun
HappyHourStartTime (Single line text) - "4:00 PM"
HappyHourEndTime (Single line text) - "6:00 PM"
```

### 4. Wellness Page 🧘

**Page:** `/wellness`

**Features:**
- Gyms, yoga studios, massage therapists, spas
- Filter by type (Gym, Yoga, Massage, Spa, Physical Therapy, Meditation)
- Filter by amenities (Sauna, Pool, Classes, Personal Training)
- Show pricing ranges
- Link to class schedules

**Airtable Fields Needed:**
```
IsWellness (Checkbox)
WellnessType (Multiple select) - Gym, Yoga, Massage, Spa, PT, Meditation, Pilates
Amenities (Multiple select) - Sauna, Pool, Classes, Personal Training, etc.
PriceRange (Single select) - $, $$, $$$, $$$$
ClassScheduleURL (URL)
```

---

## Priority 3: Google Places Import

### 5. Generate CSV from Google Places 📊

**Script:** Will create `import-google-places.js`

**Categories to Import:**
1. **Wellness:** gyms, yoga studios, spas, massage, physical therapy
2. **Restaurants:** all restaurants (if not already imported)
3. **Bars:** bars with happy hours
4. **Activities:** entertainment venues, museums, theaters

**Fields to Extract:**
- Name
- Address
- Phone
- Website
- Rating
- Price Level
- Opening Hours
- Categories/Types

### 6. Airtable Import Guide 📥

**Will Create:** `FACILITIES_IMPORT_GUIDE.md`

Step-by-step guide for:
1. Running the Google Places import script
2. Cleaning up the CSV
3. Mapping fields to Airtable
4. Importing to correct tables
5. Adding missing data (happy hour details, etc.)

---

## Priority 4: SEO Landing Pages

### 7. SEO Pages to Create 🔍

**Best Practices Pages:**
1. `/best-rainy-day-activities` - Top 10 indoor activities
2. `/best-happy-hours` - Best happy hour deals in Santa Cruz
3. `/best-beaches` - Complete guide to Santa Cruz beaches
4. `/best-hiking-trails` - Top hiking spots
5. `/best-date-spots` - Romantic activities
6. `/kid-friendly-activities` - Family activities
7. `/free-things-to-do` - Budget-friendly activities
8. `/pet-friendly-activities` - Dog-friendly spots
9. `/best-restaurants` - Top dining experiences
10. `/best-wellness-studios` - Top gyms/yoga/spas

**Features for Each:**
- SEO-optimized title & meta description
- H1, H2 structured content
- List of relevant activities with links
- Local keywords for Santa Cruz
- Schema markup for local business
- CTA to book/visit/explore

**Structure:**
```typescript
// /best-[category]/page.tsx
- Hero section with title & description
- Featured image
- List of top 10-15 activities
- Detailed descriptions
- Practical info (hours, cost, parking)
- Map showing locations
- Related pages
- FAQ section
```

---

## Implementation Order

### Phase 1: Fix Current Issues (30 min)
1. ✅ Update header
2. ⏳ Fix Airtable table name
3. ⏳ Debug Eventbrite API

### Phase 2: Add Fields to Airtable (15 min)
1. Add Happy Hour fields
2. Add Wellness fields
3. Update existing records

### Phase 3: Create New Pages (2 hours)
1. Create `/deals` page
2. Create `/wellness` page
3. Test both pages

### Phase 4: Google Places Import (1 hour)
1. Create import script
2. Run for wellness facilities
3. Generate CSV
4. Import to Airtable

### Phase 5: SEO Pages (3 hours)
1. Create page template
2. Generate 10 SEO landing pages
3. Add content for each
4. Test and optimize

### Phase 6: Deploy (30 min)
1. Push to GitHub
2. Deploy to Vercel
3. Test production
4. Update environment variables

---

## Next Steps - What Should I Do Now?

Please confirm which you'd like me to start with:

**Option A:** Create all the files and code now (deals page, wellness page, import scripts, SEO pages)
**Option B:** Fix the current issues first (Airtable table name, Eventbrite API)
**Option C:** Focus on one specific feature

Let me know and I'll continue! 🚀

