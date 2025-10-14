# 🍴 Restaurant Directory Setup Guide

This guide will help you set up the restaurant directory for Bored in Santa Cruz.

---

## 📋 Overview

The restaurant directory is designed to showcase Santa Cruz County dining with:
- **Comprehensive listings** - Every restaurant from food trucks to fine dining
- **Insider knowledge** - Best dishes, tips, and local secrets
- **Practical info** - Hours, parking, phone, dietary options
- **Smart filtering** - By cuisine, price, neighborhood, dietary needs
- **Search integration** - Find restaurants instantly

---

## 🗂️ Airtable Setup

### Create the Restaurants Table

1. **Go to your Airtable base**: https://airtable.com/appOwFPy6P19bd3N6
2. **Create a new table** called `Restaurants`
3. **Add these fields**:

| Field Name | Type | Options | Notes |
|------------|------|---------|-------|
| Name | Single line text | Required | Restaurant name |
| Cuisine | Multiple select | Mexican, Japanese, Italian, American, Asian, Thai, Vietnamese, Indian, Mediterranean, Pizza, Café, Dessert, Food Truck, Gastropub | Can select multiple |
| PriceLevel | Number | Format: Integer, Min: 1, Max: 4 | 1=$, 2=$$, 3=$$$, 4=$$$$ |
| Neighborhood | Single select | Downtown, Westside, Eastside, Seabright, Beach Street, Capitola, Aptos, Scotts Valley, Watsonville, Other | Location area |
| Address | Single line text | Required | Full address |
| Phone | Phone number | | Click-to-call |
| Website | URL | | Restaurant website |
| Instagram | Single line text | | @handle or URL |
| Description | Long text | | 1-2 sentences about the place |
| Hours | Long text | | Operating hours |
| Parking | Long text | | Parking situation |
| BestDish | Single line text | | What to order |
| BestTime | Single line text | | When to visit |
| Tips | Long text | | Insider tips |
| DineIn | Checkbox | | Has dine-in service |
| Takeout | Checkbox | | Has takeout |
| Delivery | Checkbox | | Has delivery |
| Outdoor | Checkbox | | Has outdoor seating |
| Reservations | Checkbox | | Takes reservations |
| VegetarianFriendly | Checkbox | | Good for vegetarians |
| VeganOptions | Checkbox | | Has vegan options |
| GlutenFree | Checkbox | | Has gluten-free options |
| Image | Attachment | | Restaurant photos |

---

## 📊 Import Sample Data

### Option 1: CSV Import (Quick Start)

1. **Open the template**: `santacruz-restaurants-template.csv`
2. **In Airtable**, click the dropdown next to the Restaurants table
3. **Select "Import"** → **"CSV file"**
4. **Upload the CSV** and map fields
5. **Verify** the import

The template includes 10 sample restaurants to get you started!

### Option 2: Manual Entry

Add restaurants one by one through the Airtable interface. Use the CSV as a guide.

---

## 🔌 Connect to the App

### Environment Variables

The restaurant feature will use your existing Airtable credentials:

```env
AIRTABLE_TOKEN=your_token_here
AIRTABLE_BASE_ID=appOwFPy6P19bd3N6
AIRTABLE_RESTAURANTS_TABLE=Restaurants
```

Add the `AIRTABLE_RESTAURANTS_TABLE` variable to your `.env.local` and Vercel environment variables.

### Server Action (Coming Soon)

The app will need a server action similar to `getActivities.ts`:

```typescript
// src/app/actions/getRestaurants.ts
'use server';

import { airtable } from '@/lib/airtable';
import type { Restaurant } from '@/types';

export async function getRestaurants() {
  // Fetch from Airtable Restaurants table
  // Transform to Restaurant type
  // Return results
}
```

---

## 🎯 Two-Phase Rollout

### Phase 1: Manual Curation (Recommended Start)
**Goal**: 50-100 best restaurants with insider knowledge

**Benefits:**
- ✅ High-quality, verified information
- ✅ Personal touch with local tips
- ✅ Quick to launch
- ✅ Build foundation for Phase 2

**How:**
1. Start with 10-20 personal favorites
2. Add popular downtown spots
3. Include diverse cuisines
4. Cover different neighborhoods
5. Aim for 50-100 total

**Timeline**: 1-2 weeks

---

### Phase 2: API Integration (Future)
**Goal**: 500+ restaurants with auto-updating data

**Tools:**
- **Google Places API**
  - Comprehensive data
  - Auto-updating hours
  - Photos and ratings
  - ~$17 per 1,000 requests

**Implementation:**
```typescript
// Example: Fetch restaurants from Google Places
async function importFromGooglePlaces() {
  const locations = [
    'Downtown Santa Cruz',
    'Westside Santa Cruz',
    'Capitola',
    'Aptos',
    // etc.
  ];
  
  for (const location of locations) {
    const restaurants = await googlePlaces.search({
      query: `restaurants in ${location}, CA`,
      type: 'restaurant',
    });
    
    // Transform and import to Airtable
  }
}
```

**Timeline**: Sprint 7 or 8

---

## 🌟 Content Guidelines

### Writing Descriptions
- 1-2 sentences max
- Mention signature dishes or style
- Include vibe/atmosphere

**Good**: "Authentic Japanese cuisine with fresh sushi, ramen, and izakaya dishes. Chef-owned with seasonal specials."

**Bad**: "A restaurant that serves food. Located in Santa Cruz."

### Best Dish Recommendations
- Be specific: "Chorizo Breakfast Burrito" not "Burritos"
- One signature item
- What locals always order

### Insider Tips
- Unique, actionable advice
- Timing tips: "Get there before 11am to avoid the rush"
- Secrets: "Ask to sit in the secret garden patio"
- Warnings: "Cash only!" or "Street parking only"

### Photos
- Exterior shot (for recognition)
- Signature dish (if possible)
- Interior/atmosphere (bonus)
- High quality, well-lit

---

## 🔍 Data Sources

### For Manual Curation:
1. **Personal knowledge** - Your favorites
2. **Google Maps** - Address, hours, phone
3. **Restaurant websites** - Menus, descriptions
4. **Instagram** - Photos, vibes
5. **Local foodie groups** - Facebook, Reddit

### Quick Research Workflow:
1. Pick a restaurant
2. Open Google Maps → get address, phone, hours
3. Visit website → get description, best dishes
4. Check Instagram → get handle, photos
5. Add your insider tip from experience
6. Add to Airtable (5 min per restaurant)

---

## 📱 Features

### Current (Preview Mode)
- ✅ Restaurant cards with key info
- ✅ Price level indicators
- ✅ Cuisine tags
- ✅ Best dish highlights
- ✅ Insider tips
- ✅ Google Maps integration
- ✅ Click-to-call phone numbers
- ✅ Dietary tags

### Coming Soon
- 🔜 Airtable integration
- 🔜 Live filtering
- 🔜 Search integration
- 🔜 Individual restaurant pages
- 🔜 Google Places API import
- 🔜 User reviews
- 🔜 Favorites/bookmarks

---

## 🎯 Recommended First 50 Restaurants

### Must-Haves (Everyone knows these):
- Akira (Japanese)
- The Picnic Basket (Café)
- Penny Ice Creamery (Dessert)
- El Palomar (Mexican)
- Saturn Cafe (Vegetarian)
- Bantam (Pizza)
- La Posta (Mexican)
- Lúpulo (Gastropub)

### Hidden Gems (Locals love these):
- Tacos Moreno (Food Truck)
- Betty's Noodles (Asian)
- Aptos St BBQ
- Cafe Brasil
- Kianti's Pizza
- Laili (Mediterranean)

### Neighborhoods to Cover:
- Downtown (15-20 restaurants)
- Westside (10-15)
- Eastside (5-10)
- Seabright (5-10)
- Capitola (5-10)
- Aptos (5-10)

---

## ✅ Quality Checklist

Before adding a restaurant, ensure you have:
- [ ] Correct address (Google Maps verified)
- [ ] Phone number (if available)
- [ ] Accurate hours (check recently)
- [ ] Good description (1-2 sentences)
- [ ] At least one insider tip
- [ ] Dietary tags if applicable
- [ ] Price level (realistic estimate)
- [ ] Cuisine type(s)

---

## 🚀 Launch Checklist

### Before Going Live:
1. [ ] Import template CSV (10 restaurants)
2. [ ] Add 40+ more restaurants manually
3. [ ] Verify all addresses work in Google Maps
4. [ ] Test phone numbers
5. [ ] Check all websites load
6. [ ] Add at least one photo per restaurant
7. [ ] Update environment variables
8. [ ] Create `getRestaurants.ts` server action
9. [ ] Connect page to Airtable
10. [ ] Test filters work
11. [ ] Integrate with search
12. [ ] Deploy to Vercel

---

## 💡 Pro Tips

### Quality over Quantity
- 50 great restaurants > 500 mediocre listings
- Focus on accurate, helpful information
- Add personal touches

### Keep It Updated
- Check hours quarterly
- Remove closed restaurants
- Add new openings

### Community Input
- Add submission form
- Let restaurants claim listings
- Crowdsource insider tips

### SEO Optimization
- Use full names in titles
- Include neighborhood in descriptions
- Add cuisine keywords

---

## 📞 Next Steps

1. **Import the template CSV** (10 restaurants)
2. **Add 40+ more manually** (use the checklist)
3. **Create server action** to fetch from Airtable
4. **Connect the page** to live data
5. **Deploy and test**
6. **Plan Phase 2** (Google Places API)

---

**Questions?** Check the main README.md or PROJECT_SUMMARY.md for more context.

Good luck building the best Santa Cruz restaurant guide! 🍕🌮🍜

