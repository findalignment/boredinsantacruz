# 📝 Santa Cruz Activity Data Import Guide

**Goal:** Import 30-50 real Santa Cruz activities with weather-aware fields

---

## 🎯 What We Need

### Activity Categories:
1. **Food & Drink** (15-20 places)
   - Cafes, restaurants, breweries, bakeries
2. **Outdoor Activities** (10-15 places)
   - Beaches, tide pools, hikes, parks
3. **Indoor Entertainment** (5-10 places)
   - Museums, theaters, arcades, shops
4. **Nightlife** (3-5 places)
   - Bars, live music venues
5. **Misc** (5-10 places)
   - Yoga studios, bookstores, etc.

**Total: 30-50 activities**

---

## 📋 Required Fields for Each Activity

### Basic Info:
- **Title** - Name of activity
- **Venue** - Link to venue (or create new)
- **Tags** - Categories (coffee, beach, hike, museum, etc.)
- **Cost** - 0-4 ($, $$, $$$, $$$$)
- **Duration** - "30min", "1-2 hours", "Half day", "Full day"
- **Notes** - Brief description
- **Website** - Optional URL
- **Instagram** - Optional handle
- **Image** - Optional photo

### Weather-Aware Fields (NEW):
- **Weather Suitability** - Multi-select: 
  - `perfect_sunny`, `hot_sunny`, `cool_sunny`, `partly_cloudy`, `overcast`, `light_rain`, `rainy`, `foggy`, `windy`, `cold`, `hot`
- **Ideal Temp Min** - Minimum comfortable temp (°F)
- **Ideal Temp Max** - Maximum comfortable temp (°F)
- **Indoor/Outdoor** - Select one:
  - `Indoor`, `Outdoor`, `Mixed`, `Covered`
- **Rain OK** - Checkbox: Can do in light rain?
- **Wind Sensitive** - Checkbox: Avoid in high winds?
- **Requires Good Visibility** - Checkbox: Needs clear views?
- **Weather Boost** - Number 0.5-2.0 (default 1.0)
  - Higher = prioritize in recommendations

---

## 🗺️ Santa Cruz Activity Suggestions

### Food & Drink (20 ideas):

**Cafes:**
1. **Cat & Cloud Coffee** - Indie coffee shop
2. **Verve Coffee** - Local roaster, multiple locations
3. **The Penny Ice Creamery** - Artisan ice cream
4. **Lúpulo Craft Beer House** - Craft beer bar

**Restaurants:**
5. **Crow's Nest** - Waterfront dining
6. **Laili Restaurant** - Afghan cuisine
7. **Akira** - Japanese/Sushi
8. **Picnic Basket** - Sandwiches/Deli
9. **La Posta** - Italian restaurant

**Breweries:**
10. **Santa Cruz Mountain Brewing** - Local brewery
11. **Seabright Brewery** - Beach-area brewery

**Bakeries:**
12. **Kelly's French Bakery** - Pastries & coffee
13. **Buttercup Cakes & Farmhouse Frosting** - Bakery

**Breakfast/Brunch:**
14. **Zachary's** - Breakfast spot
15. **The Picnic Basket** - Breakfast/lunch

**Pizza:**
16. **Pizza My Heart** - Local chain
17. **Pleasure Pizza** - East side

**Mexican:**
18. **Taqueria Vallarta** - Tacos
19. **El Palomar** - Upscale Mexican

**Sweet Treats:**
20. **Marianne's Ice Cream** - Classic ice cream shop

---

### Outdoor Activities (15 ideas):

**Beaches:**
1. **Natural Bridges State Beach** - Tide pools, arch
2. **Its Beach (Mitchells Cove)** - Dog-friendly beach
3. **Cowell Beach** - Beginner surfing
4. **Steamer Lane** - Surf watching
5. **Pleasure Point** - Surfing, cliff walk

**Hiking:**
6. **West Cliff Drive Walk** - Oceanfront path
7. **Henry Cowell Redwoods** - Redwood forest
8. **Wilder Ranch Loop** - Coastal hiking
9. **Pogonip** - Trails & meadows

**Tide Pools:**
10. **Natural Bridges Tide Pools** - Best at low tide

**Parks:**
11. **Lighthouse Field State Beach** - Park, paths
12. **DeLaveaga Park** - Disc golf, trails

**Water Activities:**
13. **Santa Cruz Wharf** - Fishing, walks
14. **Harbor Beach** - Kayaking launch
15. **Seacliff State Beach** - Beach, pier

---

### Indoor Activities (10 ideas):

**Museums & Culture:**
1. **Santa Cruz Museum of Art & History (MAH)** - Local art/history
2. **Santa Cruz Surfing Museum** - Surf history
3. **Santa Cruz Museum of Natural History** - Nature exhibits
4. **Bookshop Santa Cruz** - Independent bookstore

**Entertainment:**
5. **The Catalyst** - Live music venue
6. **The Rio Theatre** - Historic movie theater
7. **Santa Cruz Beach Boardwalk Arcade** - Indoor games

**Shopping:**
8. **Pacific Avenue** - Downtown shopping district
9. **Capitola Village** - Shops & galleries

**Activities:**
10. **Nickelodeon Theatre** - Art house cinema

---

### Nightlife (5 ideas):

1. **The Catalyst** - Live music, dancing
2. **Motiv** - Nightclub
3. **The Crepe Place** - Live music, bar
4. **Blue Lagoon** - Bar with games
5. **515 Kitchen & Cocktails** - Cocktail bar

---

### Misc Activities (10 ideas):

1. **Mystery Spot** - Tourist attraction
2. **Roaring Camp Railroads** - Steam train rides
3. **Surf lessons** - Various schools
4. **Kayak rentals** - Harbor area
5. **Farmers markets** - Various days/locations
6. **Yoga studios** - Multiple locations
7. **Climbing gyms** - Indoor climbing
8. **Skateboarding** - Derby Park
9. **Bike rentals** - Beach cruisers
10. **Ghost tours** - Downtown walking tours

---

## 🌤️ Weather Field Guidelines

### How to Fill Weather Fields:

#### Example: **Natural Bridges Tide Pools**
```
Title: Natural Bridges Tide Pools
Tags: tide-pools, nature, outdoors, beach, photography
Cost: 0 (Free, $10 parking)
Duration: 1-2 hours
Indoor/Outdoor: Outdoor

Weather Suitability: 
  ✅ perfect_sunny
  ✅ cool_sunny
  ✅ partly_cloudy
  
Ideal Temp Min: 55°F
Ideal Temp Max: 80°F
Rain OK: ❌ No (slippery rocks)
Wind Sensitive: ⚠️ Yes (high winds = rough water)
Requires Good Visibility: ✅ Yes (see into pools)
Weather Boost: 1.5 (prioritize on good days)

Notes: Best at low tide! Check tide schedule. 
Bring sunscreen and water. Incredible biodiversity - 
sea stars, anemones, crabs. Stay off black rocks (algae is slippery).
```

#### Example: **Cat & Cloud Coffee**
```
Title: Cat & Cloud Coffee
Tags: coffee, cafe, work, indoor, cozy
Cost: 2 ($$)
Duration: 30min - 1 hour
Indoor/Outdoor: Indoor

Weather Suitability: 
  ✅ light_rain
  ✅ rainy
  ✅ foggy
  ✅ cold
  ✅ overcast
  
Ideal Temp Min: N/A (indoor)
Ideal Temp Max: N/A (indoor)
Rain OK: ✅ Yes (indoor)
Wind Sensitive: ❌ No
Requires Good Visibility: ❌ No
Weather Boost: 1.0 (standard)

Notes: Indie coffee shop with great vibes. 
Perfect rainy day spot. Good for working/studying. 
Try the lavender latte!
```

#### Example: **Steamer Lane Surf Watching**
```
Title: Watch Surfers at Steamer Lane
Tags: surfing, view, outdoor, free, photography
Cost: 0 (Free)
Duration: 30min - 1 hour
Indoor/Outdoor: Outdoor

Weather Suitability: 
  ✅ perfect_sunny
  ✅ cool_sunny
  ✅ partly_cloudy
  ✅ windy (good for waves!)
  
Ideal Temp Min: 50°F
Ideal Temp Max: 85°F
Rain OK: ⚠️ Light rain OK
Wind Sensitive: ❌ No (wind = better waves)
Requires Good Visibility: ⚠️ Helps but not critical
Weather Boost: 1.2 (popular)

Notes: World-famous surf break. Best viewing from the 
cliff near the lighthouse. Great for beginners to watch 
pros. Bring binoculars! Winter = bigger waves.
```

---

## 📊 Quick Reference: Weather Suitability

| Activity Type | Suitable Weather |
|--------------|-----------------|
| **Beach activities** | perfect_sunny, hot_sunny, cool_sunny, partly_cloudy |
| **Hiking** | perfect_sunny, cool_sunny, partly_cloudy, overcast |
| **Tide pools** | cool_sunny, partly_cloudy (needs low tide!) |
| **Indoor cafes** | light_rain, rainy, foggy, cold, overcast |
| **Museums** | light_rain, rainy, foggy, cold, hot |
| **Surfing** | All weather (depends on break) |
| **Downtown shopping** | partly_cloudy, overcast, light_rain |
| **Breweries/Bars** | Any weather |
| **Kayaking** | perfect_sunny, cool_sunny, partly_cloudy (avoid wind) |
| **Photography** | perfect_sunny, cool_sunny (visibility important) |

---

## 🚀 Import Methods

### Method 1: Manual Entry (Slow but thorough)
1. Go to Airtable: `https://airtable.com/`
2. Open your base
3. Open "Rainy Activities" table
4. Click "+ Add record"
5. Fill in all fields
6. Repeat 30-50 times 😅

**Time: ~5-10 min per activity = 3-8 hours total**

### Method 2: CSV Import (Faster)
1. Fill out `sample-activities.csv` (already created!)
2. In Airtable, click "..." menu → "Import data" → "CSV file"
3. Map columns to fields
4. Import!

**Time: ~1-2 hours to fill CSV + 5 min import**

### Method 3: Script Import (Fastest for bulk)
Use the `scripts/import-activities.ts` template:
```bash
cd scripts
npm install
# Edit import-activities.ts with your data
ts-node import-activities.ts
```

**Time: ~2-3 hours to prepare data + instant import**

---

## ✅ Import Checklist

Before importing:
- [ ] Airtable fields updated with weather columns
- [ ] At least 30 activities researched
- [ ] Weather suitability assigned for each
- [ ] Indoor/outdoor categorized
- [ ] Temperature ranges set
- [ ] Cost & duration filled
- [ ] Images sourced (optional but nice!)

After importing:
- [ ] Test on local dev server
- [ ] Check recommendations work
- [ ] Verify scoring makes sense
- [ ] Deploy to Vercel
- [ ] Test live site
- [ ] Celebrate! 🎉

---

## 💡 Pro Tips

1. **Start with 10-15 activities** - Test the system before doing all 50
2. **Mix indoor/outdoor** - Good balance for all weather
3. **Include free options** - Not everyone wants to spend money
4. **Add hidden gems** - Local favorites, not just tourist spots
5. **Check hours/seasonality** - Some places have limited hours
6. **Get photos** - Visuals make a huge difference
7. **Test scoring** - Run recommendations and see if results make sense

---

## 🔄 Iterative Approach

### Phase 1: Quick Start (30 min)
- Import 10 activities (5 indoor, 5 outdoor)
- Test recommendations
- Verify weather logic works

### Phase 2: Core Set (2 hours)
- Add 20 more activities
- Cover all major categories
- Add weather fields

### Phase 3: Polish (1 hour)
- Add remaining activities
- Fine-tune scoring
- Add images & details

### Phase 4: Launch (30 min)
- Final testing
- Deploy
- Share with friends!

---

## 🎯 Next Steps

**Ready to start?**

1. Choose your import method
2. Start with 10 activities to test
3. Add weather fields
4. Test locally (`npm run dev`)
5. Check `/activities` page
6. Refine scoring if needed
7. Import remaining activities
8. Deploy to Vercel
9. **Then build the chatbot!** 🤖

---

*Created: October 14, 2025*
*Import first, chatbot second!*

