# 🚀 Sprint 8 Plan - Favorites, Reviews & Monetization

## Overview

Sprint 8 focuses on user engagement features (favorites, reviews) and beginning monetization strategy.

---

## 🎯 Sprint Objectives

### Core Features:
1. **Favorites System** - Save activities and restaurants
2. **Reviews System** - Write and display user reviews
3. **Google Places Activity Importer** - Bulk import activities
4. **Monetization Foundation** - Ads, affiliate links, premium features

### Timeline: 4-5 days

---

## 📋 Phase 1: Favorites System (Day 1)

### Goal: Let users save activities and restaurants

### Tasks:

#### 1. Database Schema (Airtable)
Create new tables:
- **`Favorites`** table:
  - `id` (primary key)
  - `userId` (text)
  - `itemType` (single select: Activity, Restaurant)
  - `itemId` (text - references activity or restaurant)
  - `createdAt` (date)
  - `notes` (long text - private notes)

#### 2. Server Actions
- `src/app/actions/favorites.ts`:
  - `addFavorite(userId, itemType, itemId)`
  - `removeFavorite(userId, itemType, itemId)`
  - `getFavorites(userId)`
  - `isFavorited(userId, itemType, itemId)`

#### 3. UI Components
- `src/components/favorites/favorite-button.tsx`:
  - Heart icon (filled/outline)
  - Optimistic updates
  - Loading states
  - Auth check

#### 4. Integration
- Add favorite button to:
  - Activity cards
  - Restaurant cards
  - Activity detail pages
  - Restaurant detail pages
- Update profile page to show favorites

---

## 📋 Phase 2: Reviews System (Days 2-3)

### Goal: Let users write and read reviews

### Tasks:

#### 1. Database Schema (Airtable)
Create new table:
- **`Reviews`** table:
  - `id` (primary key)
  - `userId` (text)
  - `userName` (text)
  - `userEmail` (text)
  - `itemType` (single select: Activity, Restaurant)
  - `itemId` (text)
  - `rating` (number 1-5)
  - `title` (text)
  - `content` (long text)
  - `isPublic` (checkbox - true/false)
  - `createdAt` (date)
  - `updatedAt` (date)
  - Custom rating fields (based on type):
    - **Restaurants**: `foodRating`, `ambianceRating`, `serviceRating`, `valueRating`
    - **Activities**: `funRating`, `valueRating`, `accessibilityRating`, `weatherRating`

#### 2. Server Actions
- `src/app/actions/reviews.ts`:
  - `createReview(data)`
  - `updateReview(reviewId, data)`
  - `deleteReview(reviewId, userId)`
  - `getReviews(itemType, itemId)`
  - `getUserReviews(userId)`
  - `getAverageRating(itemType, itemId)`

#### 3. UI Components
- `src/components/reviews/review-form.tsx`:
  - Star rating inputs (overall + category-specific)
  - Title and content fields
  - Public/Private toggle
  - Submit/Cancel buttons
  - Validation

- `src/components/reviews/review-card.tsx`:
  - Display review with stars
  - User info
  - Date posted
  - Edit/Delete (if user's own review)

- `src/components/reviews/reviews-section.tsx`:
  - List of reviews
  - Average rating display
  - Filter (public/private if viewing your own)
  - Pagination

#### 4. Pages
- `src/app/reviews/new/[type]/[id]/page.tsx`:
  - Write new review form
  - Protected route
  - Redirect after submit

- Update activity/restaurant detail pages:
  - Show reviews section
  - Average rating
  - "Write Review" button

---

## 📋 Phase 3: Google Places Activity Importer (Day 3)

### Goal: Bulk import activities from Google Places

### Tasks:

#### 1. Script Development
- `scripts/import-activities-google.ts`:
  - Search for POIs (Points of Interest)
  - Categories:
    - `tourist_attraction`
    - `museum`
    - `park`
    - `amusement_park`
    - `aquarium`
    - `art_gallery`
    - `zoo`
    - `shopping_mall`
    - `movie_theater`
  - Fetch details (same as restaurants)
  - Transform to activity format
  - Export to CSV or Airtable

#### 2. NPM Scripts
Add to `package.json`:
```json
"import-activities-csv": "npx tsx scripts/import-activities-google.ts csv",
"import-activities-airtable": "npx tsx scripts/import-activities-google.ts airtable",
"sync-activities": "npx tsx scripts/import-activities-google.ts sync"
```

#### 3. Documentation
- `ACTIVITY_IMPORT_GUIDE.md`:
  - Setup instructions
  - Categories to import
  - How to combine with manual curation
  - Best practices

---

## 📋 Phase 4: Monetization Foundation (Days 4-5)

### Goal: Implement revenue streams

### Option A: Google AdSense

#### Tasks:
1. Sign up for Google AdSense
2. Add ad units to key pages:
   - Homepage (sidebar or between sections)
   - Activity detail pages (after content)
   - Restaurant listings (between cards)
3. Implement `next/third-parties/google`:
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   ```
4. Track performance

#### Expected Revenue:
- **RPM (Revenue per 1,000 views):** $5-15
- **With 10,000 monthly visitors:** $50-150/month
- **With 50,000 monthly visitors:** $250-750/month

---

### Option B: Affiliate Links

#### Tasks:
1. Sign up for affiliate programs:
   - **Amazon Associates** (gear, books, beach equipment)
   - **Viator** (tours, activities)
   - **Booking.com** (hotels, accommodations)
   - **GetYourGuide** (experiences)

2. Add affiliate links:
   - Activity pages: "Book this activity"
   - Restaurant pages: "Reserve a table" (OpenTable)
   - Best Time page: "Find hotels"
   - Secret Map: "Rent a car" (Discover Cars)

3. Disclosure:
   - Add affiliate disclosure to footer
   - "We may earn a commission..." notice

#### Expected Revenue:
- **Commission rates:** 5-15%
- **Average booking:** $50-200
- **With 100 bookings/month:** $250-3,000/month

---

### Option C: Premium Features (Subscription)

#### Features to Gate:
- **Free Users:**
  - Browse activities
  - Read reviews
  - Basic recommendations

- **Premium Users ($5-10/month):**
  - Unlimited favorites
  - Unlimited private notes
  - Trip planning tools
  - Weather forecasts 14 days out
  - Ad-free experience
  - Priority customer support
  - Exclusive content

#### Implementation:
1. Add pricing page
2. Integrate Stripe for payments
3. Create premium badge/indicator
4. Gate premium features in code

#### Expected Revenue:
- **Price:** $7/month or $60/year
- **Conversion rate:** 1-3% of active users
- **With 10,000 users → 100-300 premium:** $700-2,100/month

---

### Option D: Local Business Partnerships

#### Strategy:
1. Offer "Featured" or "Verified" badges
2. Enhanced listings with:
   - Priority placement
   - More photos
   - Special offers
   - Direct booking

#### Pricing:
- **Featured Listing:** $50-150/month per business
- **With 10 businesses:** $500-1,500/month

---

## 📊 Recommended Monetization Mix

### Phase 1 (Immediate):
1. **Google AdSense** - Easy, passive income
2. **Affiliate Links** - Add to existing content

### Phase 2 (After 10k users):
3. **Local Business Partnerships** - High margin

### Phase 3 (After 50k users):
4. **Premium Subscription** - Recurring revenue

---

## 🎨 UI/UX Improvements

### 1. Activity/Restaurant Cards
- Add favorite button (heart icon)
- Show average rating (stars)
- "Verified" or "Featured" badges

### 2. Profile Page
- Favorites section with cards
- Reviews section with previews
- Stats dashboard

### 3. Navigation
- Add "My Reviews" to header dropdown
- Add "Favorites" quick link

---

## 📝 Database Schema Summary

### New Tables:

**Favorites:**
```
- id (primary key)
- userId (text)
- itemType (Activity | Restaurant)
- itemId (text)
- notes (long text - private)
- createdAt (date)
```

**Reviews:**
```
- id (primary key)
- userId (text)
- userName (text)
- userEmail (text)
- itemType (Activity | Restaurant)
- itemId (text)
- rating (number 1-5)
- title (text)
- content (long text)
- isPublic (checkbox)
- createdAt (date)
- updatedAt (date)

# Restaurant-specific
- foodRating (1-5)
- ambianceRating (1-5)
- serviceRating (1-5)
- valueRating (1-5)

# Activity-specific
- funRating (1-5)
- valueRating (1-5)
- accessibilityRating (1-5)
- weatherRating (1-5)
```

---

## 🔧 Technical Details

### Authentication Flow:
- User must be logged in to:
  - Add favorites
  - Write reviews
  - See private notes
- Redirect to `/login` with callback URL

### Optimistic Updates:
- Favorite button updates instantly (optimistic)
- Rollback if server action fails
- Toast notifications for feedback

### Rate Limiting:
- Prevent spam reviews (1 review per item per user)
- Prevent abuse (max 10 favorites per hour)

---

## 📚 Documentation to Create

1. **`FAVORITES_GUIDE.md`** - How favorites work
2. **`REVIEWS_GUIDE.md`** - Writing and managing reviews
3. **`ACTIVITY_IMPORT_GUIDE.md`** - Google Places activity import
4. **`MONETIZATION_STRATEGY.md`** - Revenue streams explained
5. **`SPRINT_8_COMPLETE.md`** - Summary after completion

---

## 🎯 Success Metrics

### Favorites:
- **Goal:** 30% of logged-in users save at least 1 favorite
- **Measure:** Favorites count in Airtable

### Reviews:
- **Goal:** 5% of logged-in users write at least 1 review
- **Measure:** Reviews count in Airtable

### Monetization:
- **Goal:** Generate $100/month in first month
- **Measure:** AdSense + Affiliate dashboards

---

## 🚀 Deployment Checklist

- [ ] Create `Favorites` table in Airtable
- [ ] Create `Reviews` table in Airtable
- [ ] Add table IDs to environment variables
- [ ] Test favorite button (add/remove)
- [ ] Test review form (create/edit/delete)
- [ ] Test Google Places activity import
- [ ] Set up Google AdSense account
- [ ] Add ad units to pages
- [ ] Sign up for affiliate programs
- [ ] Add affiliate links
- [ ] Test all flows end-to-end
- [ ] Deploy to Vercel

---

## 💡 Future Enhancements (Sprint 9+)

1. **Trip Planning:**
   - Multi-day itineraries
   - Share trips with friends
   - Export to calendar

2. **Social Features:**
   - Follow other users
   - Activity feed
   - Share favorites

3. **Advanced Recommendations:**
   - ML-based suggestions
   - "Because you liked X, try Y"
   - Seasonal recommendations

4. **Mobile App:**
   - React Native
   - Push notifications
   - Offline mode

---

**Ready to build Sprint 8! 🚀**

