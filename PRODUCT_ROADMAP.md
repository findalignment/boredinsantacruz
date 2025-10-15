# 🗺️ Bored in Santa Cruz - Product Roadmap

**Last Updated:** October 14, 2025  
**Vision:** The ultimate AI-powered Santa Cruz activity discovery and trip planning platform

---

## 🎯 Product Vision

Build a comprehensive platform that:
1. **Knows the conditions** - Weather, tides, crowds, events
2. **Understands preferences** - User accounts, favorites, history
3. **Provides intelligent guidance** - AI chatbot for personalized recommendations
4. **Enables planning** - Trip planner, itineraries, best times to visit
5. **Builds community** - Reviews, ratings, local insights
6. **Generates revenue** - Sustainable business model

---

## 📋 Sprint Prioritization

### **Sprint 7: Core Features** (Current - Week 1)
**Goal:** Finish map, add authentication, build chatbot foundation

Priority Tasks:
1. ✅ Finish interactive map with Mapbox
2. ✅ Implement authentication (NextAuth + Google OAuth + Magic Link)
3. ✅ Build AI chatbot (Santa Cruz focused, no NSFW)
4. ✅ Create weather-type pages (sunny, rainy, foggy, overcast, etc.)
5. ✅ Add "Best Time to Visit" feature
6. ✅ User profiles with favorites/bookmarks

### **Sprint 8: Reviews & Ratings** (Week 2)
**Goal:** Community features and personalized content

Priority Tasks:
1. Rating system (facility-specific)
2. Public reviews
3. Private notes/comments
4. Review moderation
5. User-generated photos
6. Helpful/report buttons

### **Sprint 9: Trip Planning** (Week 3)
**Goal:** Multi-activity itinerary builder

Priority Tasks:
1. Trip planner interface
2. Day-by-day itinerary builder
3. Route optimization
4. Time estimation
5. Weather consideration
6. Export/share trips
7. Suggested itineraries

### **Sprint 10: Monetization** (Week 4)
**Goal:** Revenue generation

Priority Tasks:
1. Affiliate links (hotels, tours)
2. Sponsored listings
3. Premium features
4. Business listings
5. Analytics dashboard
6. Ad system (optional)

---

## 🚀 Sprint 7 Detailed Plan

### **A. Interactive Map** (Priority: URGENT)

#### Features:
- [ ] Mapbox GL JS integration
- [ ] Activity markers (all types)
- [ ] Marker clustering
- [ ] Click for details popup
- [ ] Filter by type/weather
- [ ] Current location
- [ ] Route directions

**Files to Create:**
- `src/components/map/mapbox-map.tsx`
- `src/components/map/activity-marker.tsx`
- `src/components/map/marker-popup.tsx`

---

### **B. Authentication System** (Priority: HIGH)

#### Implementation: NextAuth.js

**Why NextAuth:**
- Built for Next.js
- Multiple providers (Google, Email)
- Session management
- Easy to extend

**Providers:**
1. Google OAuth (social login)
2. Magic Link (passwordless email)
3. Optional: GitHub, Apple

**User Schema:**
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  favorites: string[]; // activity IDs
  bookmarks: string[]; // restaurant IDs
  preferences: {
    temperature: 'F' | 'C';
    darkMode: boolean;
  };
}
```

**Files to Create:**
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth.ts`
- `src/components/auth/sign-in-button.tsx`
- `src/components/auth/user-menu.tsx`
- `src/app/profile/page.tsx`

**Database:** Vercel Postgres or Supabase (for storing user data)

---

### **C. AI Chatbot** (Priority: HIGH)

#### Implementation: Vercel AI SDK + OpenAI

**Features:**
- Santa Cruz activity recommendations
- Weather-aware suggestions
- Natural language queries
- Context-aware responses
- NSFW content filtering
- Non-Santa Cruz topic rejection

**Example Queries:**
- "What should I do on a rainy Saturday with kids?"
- "Best beach for sunset today?"
- "Where can I get authentic Mexican food?"
- "Plan a romantic day in Santa Cruz"

**System Prompt:**
```
You are a helpful Santa Cruz, California activity guide. 
You ONLY provide recommendations for Santa Cruz County.
You have access to:
- Weather data (current + 7-day forecast)
- Tide predictions
- 100+ activities (beaches, hiking, restaurants, etc.)
- User preferences and history

Rules:
1. ONLY discuss Santa Cruz County activities
2. NO NSFW content
3. Consider weather and tides
4. Be friendly and concise
5. Provide specific recommendations with links
6. Politely decline off-topic requests
```

**Tech Stack:**
- Vercel AI SDK (streaming responses)
- OpenAI GPT-4 or GPT-3.5-turbo
- RAG (Retrieval Augmented Generation) with activity database
- Content moderation API

**Files to Create:**
- `src/app/api/chat/route.ts`
- `src/components/chatbot/chat-interface.tsx`
- `src/components/chatbot/message.tsx`
- `src/lib/chatbot/prompt.ts`
- `src/lib/chatbot/rag.ts`

---

### **D. Weather-Type Pages** (Priority: MEDIUM)

#### New Routes:
- `/weather/sunny` - Sunny day activities
- `/weather/rainy` - Rainy day activities
- `/weather/foggy` - Foggy day activities
- `/weather/overcast` - Overcast day activities
- `/weather/windy` - Low-wind activities
- `/weather/hot` - Hot day activities (70°F+)
- `/weather/cool` - Cool day activities (50-65°F)

#### Features:
- Auto-redirect based on current weather
- Filter activities by weather suitability
- Show forecast for each weather type
- "When is the next [weather]?" prediction

**Files to Create:**
- `src/app/weather/[type]/page.tsx` (dynamic route)
- `src/lib/weather/weather-pages.ts` (config)

---

### **E. Best Time to Visit** (Priority: MEDIUM)

From WEATHER_INTEGRATION_PLAN.md:

#### Features:
1. **Historical Data Analysis:**
   - Best month for beach days
   - Least rainy months
   - Optimal hiking seasons
   - Crowd predictions

2. **Activity-Specific:**
   - Tide pooling: Best low tide times
   - Surfing: Optimal swell/wind
   - Hiking: Best weather windows
   - Dining: Least crowded times

3. **Real-time Recommendations:**
   - "Best day this week for X"
   - "Best time today for Y"
   - Hour-by-hour scoring

**Implementation:**
- Historical weather data (OpenWeather API)
- Crowd data (Google Popular Times API or manual)
- Tide predictions
- Event calendar correlation

**Files to Create:**
- `src/lib/recommendations/best-time.ts`
- `src/components/best-time-badge.tsx`
- `src/app/api/best-time/route.ts`

---

## 🎨 Sprint 8: Reviews & Ratings

### **A. Rating System**

#### Restaurant Ratings (1-5 stars):
- Food Quality
- Service
- Ambiance
- Value
- Overall

#### Activity Ratings:
- Experience
- Value
- Crowd Level
- Difficulty (if applicable)
- Overall

#### Beach Ratings:
- Cleanliness
- Crowd Level
- Parking
- Amenities
- Overall

### **B. Review Features**

**Public Reviews:**
- Star ratings
- Written review
- Photos (optional)
- Helpful/Not Helpful votes
- Report inappropriate content
- Verified visitor badge

**Private Notes:**
- Personal comments
- Only visible to user
- Not moderated
- Can include sensitive info

**Database Schema:**
```typescript
interface Review {
  id: string;
  userId: string;
  activityId: string;
  type: 'public' | 'private';
  
  // Public reviews
  ratings: {
    overall: number;
    [key: string]: number; // facility-specific
  };
  text: string;
  photos: string[];
  helpful: number;
  reports: number;
  
  // Private notes
  privateNotes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🗓️ Sprint 9: Trip Planning

### **Trip Planner Features:**

1. **Day-by-Day Builder:**
   - Add activities to days
   - Drag-and-drop reordering
   - Time estimation
   - Map view of route

2. **Smart Suggestions:**
   - Weather-aware recommendations
   - Optimal route ordering
   - Time buffers
   - Meal suggestions

3. **Sharing:**
   - Share trip via link
   - Export to PDF
   - Add to calendar
   - Collaborative planning

4. **Templates:**
   - "Perfect Beach Day"
   - "Rainy Day Adventures"
   - "Foodie Tour"
   - "Family Fun"
   - "Romantic Weekend"

### **Implementation:**
- Trip builder UI
- Route optimization (Google Directions API)
- Time calculation
- Weather integration
- Save/load trips (database)

---

## 💰 Sprint 10: Monetization Strategy

### **Revenue Streams:**

#### 1. **Affiliate Commissions** (Primary)
- Hotel bookings (Booking.com, Expedia)
- Tour bookings (Viator, GetYourGuide)
- Restaurant reservations (OpenTable)
- Activity tickets (Beach Boardwalk, tours)

**Estimated Revenue:**
- 3-7% commission per booking
- Target: $5,000-$20,000/month at scale

---

#### 2. **Business Listings** (High Margin)
- Free basic listing
- Premium listing: $50-$100/month
  - Featured placement
  - Extra photos
  - Analytics
  - Respond to reviews
  - Special offers section

**Estimated Revenue:**
- 50 businesses × $75/month = $3,750/month

---

#### 3. **Sponsored Content**
- Sponsored activities (top of results)
- Sponsored trips (trip planner)
- Banner ads (subtle, native)
- Event promotion

**Estimated Revenue:**
- $500-$2,000/month

---

#### 4. **Premium Features** (Optional)
- Free tier: Basic features
- Premium: $5-$10/month
  - Ad-free
  - Advanced trip planner
  - Weather alerts
  - Priority support
  - Exclusive content

**Estimated Revenue:**
- 1% conversion × 10,000 users = 100 subs
- 100 × $7/month = $700/month

---

#### 5. **Data & Analytics** (Future)
- Sell anonymized visitor data
- Tourism board partnerships
- Market research reports

---

### **Total Revenue Potential:**
**Year 1:** $50,000-$150,000/year  
**Year 2:** $200,000-$500,000/year  
**Year 3:** $500,000-$1M+/year

---

## 🎯 Success Metrics

### **User Metrics:**
- 10,000 monthly visitors (Month 6)
- 50,000 monthly visitors (Year 1)
- 100,000 monthly visitors (Year 2)
- 1,000 registered users (Month 6)
- 10,000 registered users (Year 1)

### **Engagement:**
- 3+ page views per session
- 2+ minute average session
- 30% return visitor rate
- 20% account signup rate

### **Revenue:**
- Break even: Month 6-9
- Profitable: Month 12+
- $10K MRR: Year 2

---

## 🚦 Priority Matrix

### **Must Have (Sprint 7):**
1. Interactive map ⭐⭐⭐
2. Authentication ⭐⭐⭐
3. AI chatbot ⭐⭐⭐
4. Weather pages ⭐⭐
5. Best time feature ⭐⭐

### **Should Have (Sprint 8):**
6. Reviews & ratings ⭐⭐
7. Private notes ⭐⭐
8. User profiles ⭐⭐

### **Nice to Have (Sprint 9):**
9. Trip planner ⭐
10. Collaborative trips ⭐

### **Future (Sprint 10+):**
11. Monetization
12. Advanced analytics
13. Mobile app

---

**Let's build the future of Santa Cruz discovery! 🌊**

