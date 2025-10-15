# 🎯 Activities Master Table - Complete Field Specification

## Overview

This is the **definitive field list** for your unified Activities table in Airtable. All fields are designed to work with every feature on your website.

---

## 📋 Required Fields (Must Have)

### 1. **ID**
- **Type:** Single line text (or use Airtable Record ID)
- **Purpose:** Unique identifier
- **Example:** `natural-bridges`, `mystery-spot`
- **Format:** lowercase-with-hyphens (URL-friendly)
- **Required:** YES ✅

### 2. **Name**
- **Type:** Single line text
- **Purpose:** Display name of the activity
- **Example:** "Natural Bridges State Beach"
- **Required:** YES ✅

### 3. **Description**
- **Type:** Long text
- **Purpose:** Short activity description (50-150 words for cards)
- **Example:** "Iconic beach featuring a natural rock bridge..."
- **Shows on:** Cards, list previews, search results, SEO
- **Required:** YES ✅

### 4. **WriteUp**
- **Type:** Long text
- **Purpose:** Editorial long-form content (300-800 words)
- **Example:** "We've been visiting Natural Bridges for years, and it never gets old. The tide pools are incredible at low tide - you'll see sea stars, anemones, and hermit crabs. The butterfly grove in winter is magical..."
- **Shows on:** Detail pages only, in a special "Our Take" section
- **Required:** HIGHLY RECOMMENDED ⭐
- **Note:** This is separate from Description - use Description for basic info, WriteUp for storytelling and insider knowledge

### 5. **Category**
- **Type:** Single select (or Multiple select)
- **Purpose:** Primary activity type
- **Options:** Beach, Hiking, Museum, Restaurant, Attraction, Water Activity, Indoor Activity, Outdoor Activity, Family Activity, Date Activity, Wellness, Shopping, Entertainment, Sports, Nature
- **Example:** "Beach"
- **Required:** YES ✅

---

## 📍 Location Fields (Essential)

### 6. **Address**
- **Type:** Single line text
- **Purpose:** Full street address
- **Example:** "2531 West Cliff Drive, Santa Cruz, CA 95060"
- **Shows on:** Detail pages, maps, directions
- **Required:** HIGHLY RECOMMENDED ⭐

### 6. **City**
- **Type:** Single line text
- **Purpose:** City name
- **Example:** "Santa Cruz", "Capitola", "Aptos"
- **Default:** "Santa Cruz"
- **Required:** Recommended

### 7. **ZipCode**
- **Type:** Single line text
- **Purpose:** ZIP code
- **Example:** "95060"
- **Required:** Optional

### 8. **Latitude**
- **Type:** Number (decimal)
- **Purpose:** GPS coordinate for mapping
- **Example:** 36.9509
- **Shows on:** Interactive maps, distance calculations
- **Required:** HIGHLY RECOMMENDED ⭐

### 9. **Longitude**
- **Type:** Number (decimal)
- **Purpose:** GPS coordinate for mapping
- **Example:** -122.0595
- **Shows on:** Interactive maps, distance calculations
- **Required:** HIGHLY RECOMMENDED ⭐

### 10. **Neighborhood**
- **Type:** Single select
- **Purpose:** Area of Santa Cruz
- **Options:** Downtown, Westside, Eastside, Midtown, Seabright, Pleasure Point, Live Oak, Capitola, Aptos, Scotts Valley, Felton, Ben Lomond, Boulder Creek
- **Example:** "Westside"
- **Shows on:** Filters, search
- **Required:** Recommended

---

## 💰 Cost & Practical Info

### 11. **Cost**
- **Type:** Number
- **Purpose:** Typical cost in dollars
- **Example:** 0 (free), 10 (ten dollars), 25, 50, 100
- **Shows as:** Free, $, $$, $$$, $$$$
- **Tiers:** 
  - 0 = Free
  - 1-10 = $
  - 11-30 = $$
  - 31-60 = $$$
  - 61+ = $$$$
- **Required:** YES ✅

### 12. **CostLevel** (Alternative)
- **Type:** Single select
- **Purpose:** Display-ready cost indicator
- **Options:** Free, $, $$, $$$, $$$$
- **Example:** "$$"
- **Note:** Can use instead of numeric Cost
- **Required:** Optional (use Cost OR CostLevel)

### 13. **Duration**
- **Type:** Single line text
- **Purpose:** How long the activity takes
- **Example:** "2-3 hours", "Half day", "1 hour", "All day"
- **Shows on:** Cards, detail pages, planning
- **Required:** HIGHLY RECOMMENDED ⭐

### 14. **Hours**
- **Type:** Long text
- **Purpose:** Operating hours
- **Example:** "8:00 AM - Sunset daily" or "Mon-Fri 10-6, Sat-Sun 9-7"
- **Shows on:** Detail pages
- **Required:** Recommended

---

## 📞 Contact Information

### 15. **Phone**
- **Type:** Phone number (or text)
- **Purpose:** Contact number
- **Example:** "(831) 423-4609"
- **Shows on:** Detail pages, click-to-call
- **Required:** Optional but helpful

### 16. **Website**
- **Type:** URL
- **Purpose:** Official website
- **Example:** "https://www.parks.ca.gov/?page_id=541"
- **Shows on:** Detail pages, external link button
- **Required:** Optional but recommended

### 17. **Instagram**
- **Type:** URL
- **Purpose:** Instagram profile
- **Example:** "https://instagram.com/activity_name"
- **Shows on:** Social links
- **Required:** Optional

### 18. **Email**
- **Type:** Email
- **Purpose:** Contact email
- **Example:** "info@activity.com"
- **Shows on:** Contact options
- **Required:** Optional

---

## 🎨 Media & Visuals

### 19. **PhotoURL** (or ImageURL)
- **Type:** URL
- **Purpose:** Main activity image (externally hosted)
- **Example:** "https://res.cloudinary.com/yoursite/image/natural-bridges.jpg"
- **Shows on:** Cards, detail pages, maps, social shares
- **Size:** 1200x800px recommended, <200KB
- **Required:** HIGHLY RECOMMENDED ⭐

### 20. **Photo** (Alternative)
- **Type:** Attachment
- **Purpose:** Airtable-hosted image
- **Note:** Slower than external URL
- **Required:** Use PhotoURL OR Photo

### 21. **GalleryPhotos**
- **Type:** Attachment (multiple)
- **Purpose:** Additional images for detail page gallery
- **Example:** 3-5 photos showing different aspects
- **Shows on:** Detail page photo carousel
- **Required:** Optional (future feature)

---

## 🏷️ Tags & Categorization

### 22. **Tags**
- **Type:** Multiple select (or comma-separated text)
- **Purpose:** Searchable keywords
- **Example:** beach, tide pools, butterflies, scenic, photography, family, free
- **Shows on:** Search, filters, recommendations
- **Format:** lowercase, comma-separated if text field
- **Required:** HIGHLY RECOMMENDED ⭐

### 23. **IndoorOutdoor**
- **Type:** Single select
- **Purpose:** Indoor/outdoor classification
- **Options:** Indoor, Outdoor, Mixed, Covered
- **Example:** "Outdoor"
- **Shows on:** Filters, weather recommendations
- **Required:** YES ✅

### 24. **KidFriendly**
- **Type:** Checkbox (or Single select: Yes/No/Maybe)
- **Purpose:** Suitable for children
- **Example:** Yes
- **Shows on:** Family filters, kid-friendly page
- **Required:** HIGHLY RECOMMENDED ⭐

### 25. **PetFriendly**
- **Type:** Checkbox (or Single select: Yes/No/Limited)
- **Purpose:** Allows pets/dogs
- **Example:** Yes
- **Shows on:** Pet-friendly filters and pages
- **Required:** Recommended

### 26. **Accessibility**
- **Type:** Long text
- **Purpose:** Wheelchair/accessibility info
- **Example:** "Paved paths, wheelchair accessible, accessible restrooms"
- **Shows on:** Detail pages
- **Required:** Recommended

---

## ⛅ Weather-Aware Fields

### 27. **WeatherPreferences**
- **Type:** Multiple select (or comma-separated text)
- **Purpose:** Which weather types suit this activity
- **Options:** sunny, partly-cloudy, clear, overcast, cloudy, foggy, light-rain, rain, windy, calm, hot, warm, cool, cold
- **Example:** sunny,partly-cloudy,warm
- **Shows on:** Weather-based recommendations
- **Required:** HIGHLY RECOMMENDED ⭐

### 28. **RainOk**
- **Type:** Checkbox
- **Purpose:** Can do in rain
- **Example:** Yes (for indoor activities)
- **Shows on:** Rainy day recommendations
- **Required:** Recommended

### 29. **IdealTempMin**
- **Type:** Number
- **Purpose:** Minimum comfortable temperature (°F)
- **Example:** 55
- **Shows on:** Weather scoring algorithm
- **Required:** Optional (advanced)

### 30. **IdealTempMax**
- **Type:** Number
- **Purpose:** Maximum comfortable temperature (°F)
- **Example:** 85
- **Shows on:** Weather scoring algorithm
- **Required:** Optional (advanced)

### 31. **WindSensitive**
- **Type:** Checkbox
- **Purpose:** Avoid in high winds
- **Example:** Yes (for beach activities)
- **Shows on:** Weather warnings
- **Required:** Optional

### 32. **RequiresGoodVisibility**
- **Type:** Checkbox
- **Purpose:** Needs clear views (avoid fog)
- **Example:** Yes (for scenic viewpoints)
- **Shows on:** Weather warnings
- **Required:** Optional

---

## 🌊 Tide-Aware Fields (for coastal activities)

### 33. **TidePreference**
- **Type:** Single select
- **Purpose:** Optimal tide timing
- **Options:** low-tide, high-tide, mid-tide, rising-tide, falling-tide, tide-change, any-tide
- **Example:** "low-tide" (for tide pools)
- **Shows on:** Tide recommendations
- **Required:** Optional (only for tide-dependent activities)

### 34. **TideCritical**
- **Type:** Checkbox
- **Purpose:** Is tide timing essential?
- **Example:** Yes (for tide pooling)
- **Shows on:** Tide warnings
- **Required:** Optional

---

## 🚗 Practical Information

### 35. **ParkingInfo**
- **Type:** Long text
- **Purpose:** Detailed parking instructions
- **Example:** "Parking lot available, $10 fee. Fills up on sunny weekends. Arrive early or try street parking on residential streets."
- **Shows on:** Detail pages
- **Required:** HIGHLY RECOMMENDED ⭐

### 36. **PublicTransit**
- **Type:** Single line text
- **Purpose:** Bus routes / transit options
- **Example:** "Metro Bus Route 3", "All downtown routes"
- **Shows on:** Detail pages
- **Required:** Recommended

### 37. **BestTimeToVisit**
- **Type:** Long text
- **Purpose:** When to go for best experience
- **Example:** "Low tide for tide pools (check tide tables), afternoon for sunset, fall for butterflies"
- **Shows on:** Detail pages, insider tips
- **Required:** Recommended

### 38. **ReservationRequired**
- **Type:** Checkbox (or Single select: Yes/No/Recommended)
- **Purpose:** Need to book ahead?
- **Example:** No
- **Shows on:** Detail pages, planning tips
- **Required:** Recommended

### 39. **SeasonalAvailability**
- **Type:** Single select (or text)
- **Purpose:** When is it open/available?
- **Options:** year-round, summer-only, winter-only, spring-fall, seasonal
- **Example:** "year-round"
- **Shows on:** Detail pages, seasonal filters
- **Required:** Recommended

---

## 💡 Insider Tips & Content

### 40. **Tips** (or Notes or InsiderTips)
- **Type:** Long text
- **Purpose:** Helpful tips and insider knowledge
- **Example:** "Check tide charts for best tide pool viewing. Butterfly season Oct-Feb. Arrive before 10am on weekends."
- **Shows on:** Detail pages
- **Required:** HIGHLY RECOMMENDED ⭐

### 41. **BestFeature**
- **Type:** Single line text
- **Purpose:** Highlight/signature element
- **Example:** "Natural rock arch", "Historic wooden roller coaster"
- **Shows on:** Cards, teasers
- **Required:** Optional

### 42. **WhatToBring**
- **Type:** Long text
- **Purpose:** Suggested items
- **Example:** "Sturdy shoes, water bottle, camera, sunscreen, layers"
- **Shows on:** Detail pages
- **Required:** Optional

---

## 🎯 Display & Sorting

### 43. **StaffPick**
- **Type:** Checkbox
- **Purpose:** Featured/recommended by you
- **Example:** Yes
- **Shows on:** Staff picks section, featured cards
- **Required:** Optional but useful

### 44. **Featured**
- **Type:** Checkbox
- **Purpose:** Homepage feature
- **Example:** Yes
- **Shows on:** Homepage top section
- **Required:** Optional

### 45. **Priority**
- **Type:** Number
- **Purpose:** Sort order (1 = highest)
- **Example:** 1, 2, 3...
- **Shows on:** Controls display order
- **Required:** Optional

### 46. **Sponsored**
- **Type:** Checkbox
- **Purpose:** Paid placement
- **Example:** No
- **Shows on:** Sponsored badge
- **Required:** Optional (for monetization)

---

## ⭐ Reviews & Ratings

### 47. **Rating**
- **Type:** Number (decimal)
- **Purpose:** Average star rating
- **Example:** 4.8
- **Range:** 0-5
- **Shows on:** Cards, detail pages, sorting
- **Note:** Can be auto-calculated from Reviews table
- **Required:** Optional

### 48. **ReviewCount**
- **Type:** Number
- **Purpose:** Number of reviews
- **Example:** 250
- **Shows on:** Cards, detail pages
- **Note:** Can be auto-calculated from Reviews table
- **Required:** Optional

---

## 🔍 SEO & Discovery

### 49. **MetaDescription**
- **Type:** Long text
- **Purpose:** SEO description
- **Example:** "Discover Natural Bridges State Beach - iconic rock arch, tide pools, and monarch butterflies in Santa Cruz"
- **Length:** 150-160 characters
- **Shows on:** Search engine results
- **Required:** Optional (auto-generated from Description if empty)

### 50. **Keywords**
- **Type:** Long text
- **Purpose:** SEO keywords
- **Example:** "santa cruz beach, tide pools, butterflies, natural bridges"
- **Shows on:** SEO metadata
- **Required:** Optional

### 51. **Slug**
- **Type:** Single line text
- **Purpose:** URL-friendly identifier
- **Example:** "natural-bridges-state-beach"
- **Shows on:** URLs (/activity/natural-bridges-state-beach)
- **Required:** Optional (can use ID if not set)

---

## 📊 Administrative

### 52. **Status**
- **Type:** Single select
- **Purpose:** Publication status
- **Options:** Draft, Published, Archived, Temporarily Closed
- **Example:** "Published"
- **Shows on:** Controls visibility on site
- **Required:** Recommended

### 53. **LastUpdated**
- **Type:** Last modified time (auto)
- **Purpose:** Track when info was updated
- **Shows on:** Admin, freshness indicator
- **Required:** Automatic

### 54. **CreatedBy**
- **Type:** Single line text
- **Purpose:** Who added this
- **Example:** "Staff", "User submission"
- **Required:** Optional

### 55. **Source**
- **Type:** Single select
- **Purpose:** Where data came from
- **Options:** Manual Entry, Google Places, User Submission, Partner, Import
- **Example:** "Manual Entry"
- **Required:** Optional (for tracking)

---

## 🎨 Advanced/Optional Fields

### 56. **Difficulty**
- **Type:** Single select
- **Purpose:** Physical difficulty level
- **Options:** Easy, Moderate, Hard, Expert
- **Example:** "Easy"
- **Shows on:** Hiking/outdoor activity filters
- **Required:** Optional (relevant for some activities)

### 57. **AgeRestriction**
- **Type:** Single line text
- **Purpose:** Age requirements
- **Example:** "All ages", "18+", "21+"
- **Shows on:** Detail pages
- **Required:** Optional

### 58. **GroupSize**
- **Type:** Single line text
- **Purpose:** Capacity/group info
- **Example:** "Great for groups", "Max 6 people", "Solo-friendly"
- **Shows on:** Detail pages, group planning
- **Required:** Optional

### 59. **BookingURL**
- **Type:** URL
- **Purpose:** Direct booking link
- **Example:** "https://example.com/book"
- **Shows on:** "Book Now" button
- **Required:** Optional (for bookable activities)

### 60. **MenuPDF** (for restaurants)
- **Type:** Attachment (or URL)
- **Purpose:** Menu file
- **Shows on:** Restaurant detail pages
- **Required:** Optional

---

## 📋 Summary: Recommended Minimum Fields

For a **fully functional** activity entry, you need:

### Absolute Minimum (8 fields):
1. ✅ ID
2. ✅ Name
3. ✅ Description
4. ✅ Category
5. ✅ Cost
6. ✅ IndoorOutdoor
7. ✅ Address
8. ✅ PhotoURL

### Highly Recommended (13 more):
9. ⭐ WriteUp (editorial content)
10. ⭐ Latitude & Longitude (mapping)
11. ⭐ Duration
12. ⭐ Tags
13. ⭐ WeatherPreferences
14. ⭐ ParkingInfo
15. ⭐ KidFriendly
16. ⭐ Hours
17. ⭐ Website
18. ⭐ Phone
19. ⭐ Tips/Notes
20. ⭐ BestTimeToVisit
21. ⭐ StaffPick

### **Total Recommended: 21 fields** for complete functionality

---

## 🎯 Field Priority Levels

### **Priority 1 (Must Have - 8 fields):**
ID, Name, Description, Category, Cost, IndoorOutdoor, Address, PhotoURL

### **Priority 2 (Highly Recommended - 12 fields):**
Latitude, Longitude, Duration, Tags, WeatherPreferences, ParkingInfo, KidFriendly, Hours, Website, Phone, Tips, BestTimeToVisit

### **Priority 3 (Nice to Have - 15 fields):**
Neighborhood, PetFriendly, PublicTransit, ReservationRequired, SeasonalAvailability, Accessibility, StaffPick, Featured, RainOk, BestFeature, Rating, ReviewCount, Status, TidePreference, Difficulty

### **Priority 4 (Advanced/Optional - 25+ fields):**
All remaining fields

---

## 📝 Quick Start Template

Copy this into Airtable to create your table:

```
Field Name          | Type              | Required
--------------------|-------------------|----------
ID                  | Text              | YES
Name                | Text              | YES
Description         | Long Text         | YES
Category            | Single Select     | YES
Address             | Text              | YES
Latitude            | Number            | Recommended
Longitude           | Number            | Recommended
PhotoURL            | URL               | Recommended
Cost                | Number            | YES
Duration            | Text              | Recommended
Hours               | Long Text         | Optional
Phone               | Phone             | Optional
Website             | URL               | Optional
Tags                | Multiple Select   | Recommended
IndoorOutdoor       | Single Select     | YES
KidFriendly         | Checkbox          | Recommended
PetFriendly         | Checkbox          | Optional
WeatherPreferences  | Multiple Select   | Recommended
ParkingInfo         | Long Text         | Recommended
Tips                | Long Text         | Recommended
BestTimeToVisit     | Long Text         | Optional
StaffPick           | Checkbox          | Optional
```

---

## 🚀 Implementation Steps

1. **Create table** in Airtable named `All_Activities`
2. **Add Priority 1 fields** (8 minimum fields)
3. **Import your CSV** (18 activities included)
4. **Add Priority 2 fields** as you have time
5. **Test on website** - verify display
6. **Add remaining fields** based on needs
7. **Update `.env.local`**: `AIRTABLE_ACTIVITIES_TABLE=All_Activities`
8. **Deploy!**

---

## 💡 Pro Tips

1. **Start simple** - Add minimum fields first, expand later
2. **Use consistent formats** - Especially for dates, times, currency
3. **Fill what you know** - Leave optional fields blank if unknown
4. **Test with one record** - Verify it displays correctly before adding more
5. **Copy from CSV** - Use the included CSV as a template
6. **Batch import** - Add many at once, refine details later
7. **Keep updated** - Review and update hours, prices quarterly

---

**This is your complete field specification!** Pick the fields that matter most to you and start building. You can always add more fields later. 🚀

