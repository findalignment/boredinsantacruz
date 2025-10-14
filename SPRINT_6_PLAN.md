# 🗺️ Sprint 6 Plan: Maps, Search, Events & User Features

**Status:** 📋 PLANNING  
**Target:** Full-featured discovery platform

---

## 🎯 Sprint Goals

1. ✅ **Search Functionality** - Find activities instantly
2. ✅ **Interactive Map** - See activities on a map
3. ✅ **Santa Cruz Tonight** - Daily events calendar
4. ✅ **The Secret Map** - Hidden gems & local favorites
5. ✅ **User Accounts** - Sign up and personalization
6. ✅ **Favorites/Bookmarks** - Save activities for later

---

## 🔍 Feature 1: Search Functionality

### Search Bar Component
**Location:** Top navigation, homepage hero

**Features:**
- **Instant search** as you type
- **Fuzzy matching** - finds "sushi" when you type "sish"
- **Search by:**
  - Activity name
  - Venue name
  - Tags
  - Description keywords
  - Location/neighborhood

**UI Design:**
```
┌─────────────────────────────────────────┐
│ 🔍 Search activities... What do you     │
│     want to do today?                   │
└─────────────────────────────────────────┘

Results dropdown:
┌─────────────────────────────────────────┐
│ 🏖️ Natural Bridges Tide Pools          │
│    tide-pools, nature • Westside        │
├─────────────────────────────────────────┤
│ 🌊 Steamer Lane Surf Watching          │
│    surfing, views • Westside            │
├─────────────────────────────────────────┤
│ See all 12 results for "beach" →       │
└─────────────────────────────────────────┘
```

**Implementation:**
- Client-side search with `fuse.js` (fuzzy search library)
- Search index built from activities
- Keyboard navigation (↑↓ arrows, Enter)
- Mobile-optimized

**Search Filters:**
- Indoor/Outdoor
- Price range ($, $$, $$$, $$$$)
- Duration
- Weather suitability
- Neighborhoods
- Open now / Coming soon

---

## 🗺️ Feature 2: Interactive Map Page

### Map View
**Route:** `/map`

**Features:**
- **Interactive map** powered by Mapbox or Google Maps
- **Activity markers** clustered by location
- **Click markers** to see activity preview
- **Filter controls** on the side
- **Current location** button
- **Weather overlay** (optional)

**Map UI:**
```
┌────────────────────────────────────────────────────────┐
│ Filters ▼   Search 🔍   [Current Location 📍]        │
├──────────┬─────────────────────────────────────────────┤
│          │                                             │
│ ☑️ Food   │              🗺️ MAP                       │
│ ☑️ Beach  │                                             │
│ ☑️ Indoor │         🏖️     🍕                          │
│ ☐ Events │     🌊        📍 (You)    ☕                │
│          │           🎨                                │
│ Price:   │     🌊    🍺        🏛️                     │
│ $ - $$$$ │                                             │
│          │              🎭                             │
│ Open Now │                      🍴                     │
│ ☐ Yes    │                                             │
└──────────┴─────────────────────────────────────────────┘

Click marker → Activity preview card pops up
```

**Marker Colors:**
- 🔵 Blue - Activities (general)
- 🟢 Green - Perfect weather match today
- 🟡 Yellow - Events happening now
- 🔴 Red - Hidden gems (Secret Map)
- 🟣 Purple - User favorites

**Activity Preview Card:**
```
┌────────────────────────────┐
│ 🏖️ Natural Bridges         │
│                            │
│ 📍 2531 West Cliff Dr      │
│ ⭐ 95% weather match       │
│ 💰 Free (parking $10)      │
│ 🌊 Low tide: 2:15 PM       │
│                            │
│ [View Details →]           │
└────────────────────────────┘
```

**Technical Stack:**
- **Mapbox GL JS** (preferred) or Google Maps API
- Cluster markers when zoomed out
- Smooth animations
- Mobile touch gestures

---

## 🎉 Feature 3: Santa Cruz Tonight

### Events Calendar
**Route:** `/tonight` or `/events`

**What It Shows:**
- Today's events
- This week's events
- Concerts, shows, festivals
- Special happenings

**Data Sources:**
1. **Manual curation** - Start with this
2. **The Catalyst calendar** - Live music
3. **Rio Theatre** - Movie showtimes
4. **Boardwalk events** - Special events
5. **Downtown Santa Cruz** - Street events
6. **Farmers markets** - Weekly schedule

**UI Design:**
```
┌──────────────────────────────────────────┐
│  🌃 SANTA CRUZ TONIGHT                   │
│  Tuesday, October 14, 2025               │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ 🎵 NOW PLAYING                           │
├──────────────────────────────────────────┤
│ 🎸 The Wailers • 8:00 PM                 │
│    The Catalyst                          │
│    $35 • Reggae                          │
│    [Get Tickets →]                       │
├──────────────────────────────────────────┤
│ 🎬 Dune: Part Two • 7:30 PM             │
│    Rio Theatre                           │
│    $12 • Sci-Fi                          │
│    [Showtimes →]                         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ 🗓️ THIS WEEK                             │
├──────────────────────────────────────────┤
│ Wed • Farmers Market • 1-6 PM            │
│ Thu • Trivia Night @ Lúpulo • 7 PM       │
│ Fri • First Friday Art Walk • 5-9 PM     │
│ Sat • Beach Volleyball Tournament        │
│ Sun • Farmers Market @ Aptos • 10-2 PM   │
└──────────────────────────────────────────┘
```

**Event Schema:**
```typescript
interface Event {
  id: string;
  title: string;
  venue: string;
  venueId?: string; // Link to existing venue
  date: string;
  time: string;
  endTime?: string;
  price: number | 'free' | 'varies';
  category: 'music' | 'movie' | 'festival' | 'market' | 'sports' | 'art' | 'other';
  description: string;
  ticketUrl?: string;
  imageUrl?: string;
  recurring?: 'weekly' | 'monthly' | 'daily';
}
```

**Features:**
- Filter by category
- Filter by price
- "Happening now" badge
- Add to calendar button
- Share event link

---

## 🗺️ Feature 4: The Secret Map

### Hidden Gems
**Route:** `/secret-map` or `/hidden-gems`

**Concept:**
Curated collection of **lesser-known spots** that locals love but tourists might miss.

**Categories:**
1. **Secret Beaches** - Hidden coves, quiet spots
2. **Best Views** - Lookout points few know about
3. **Local Eats** - Hole-in-the-wall gems
4. **Nature Spots** - Hidden trails, quiet groves
5. **Locals Only** - Coffee spots, sunset spots

**UI Design:**
```
┌──────────────────────────────────────────┐
│  🤫 THE SECRET MAP                       │
│  Hidden gems only locals know about      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ 🏖️ SECRET BEACHES                        │
├──────────────────────────────────────────┤
│ Sunny Cove Beach                         │
│ 📍 End of 14th Avenue                    │
│ Small, secluded beach. Locals' favorite. │
│ Low tide reveals tide pools.             │
│ [Reveal Location 🗺️]                    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ 🌅 BEST SUNSET SPOTS                     │
├──────────────────────────────────────────┤
│ Lighthouse Field South Bench             │
│ Mitchell's Cove Stairs                   │
│ Natural Bridges Overlook                 │
└──────────────────────────────────────────┘
```

**Special Features:**
- **Reveal mechanic** - Click to see exact location
- **"Locals only" badge**
- **Crowd levels** - "Usually quiet" vs "Can get busy"
- **Best time to visit**
- **Insider tips**

**Secret Spot Schema:**
```typescript
interface SecretSpot {
  id: string;
  name: string;
  category: 'beach' | 'view' | 'food' | 'nature' | 'other';
  secretLevel: 'hidden' | 'semi-secret' | 'locals-know';
  description: string;
  address: string; // Revealed on click
  coordinates: { lat: number; lng: number };
  bestTime: string; // "Sunset", "Early morning", "Weekdays"
  crowdLevel: 'always-quiet' | 'usually-quiet' | 'sometimes-busy';
  insiderTip: string;
  weatherBest: string[]; // When it's best to visit
}
```

---

## 👤 Feature 5: User Accounts

### Authentication System
**Provider:** Next-Auth or Clerk or Supabase Auth

**Sign Up/Login Methods:**
- Email + Password
- Google OAuth
- Facebook OAuth (optional)
- Magic link (email)

**User Profile:**
```typescript
interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinedDate: Date;
  
  // Preferences
  favoriteNeighborhoods: string[];
  preferredActivities: string[];
  indoorOutdoorPreference: 'indoor' | 'outdoor' | 'both';
  
  // Social
  bio?: string;
  socialLinks?: {
    instagram?: string;
    website?: string;
  };
}
```

**Profile Page:**
```
┌──────────────────────────────────────────┐
│  👤 Rock Hudson                          │
│  Member since October 2025               │
│  📍 Santa Cruz, CA                       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ ⭐ YOUR FAVORITES (12)                   │
│ 🗺️ SAVED FOR LATER (5)                  │
│ 📅 UPCOMING EVENTS (3)                   │
│ 🏆 VISITED (47)                          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ SETTINGS                                 │
│ • Edit Profile                           │
│ • Notification Preferences               │
│ • Privacy Settings                       │
│ • Sign Out                               │
└──────────────────────────────────────────┘
```

---

## ⭐ Feature 6: Favorites & Bookmarks

### Save System

**Features:**
1. **Favorites** - Activities you love
2. **Bookmarks** - Save for later
3. **Collections** - Organize into lists
4. **Visited** - Mark as visited
5. **Notes** - Add personal notes

**UI Integration:**

**On Activity Cards:**
```
┌────────────────────────────┐
│ 🏖️ Natural Bridges    [❤️] │  ← Heart icon
│                            │
│ 📍 2531 West Cliff Dr      │
└────────────────────────────┘
```

**On Detail Pages:**
```
[❤️ Favorite]  [🔖 Save]  [✅ Visited]
```

**Collections:**
```
Create Custom Lists:
- "Rainy Day Backup Plans"
- "Date Night Ideas"
- "Weekend Adventures"
- "Bring Out-of-Town Guests Here"
```

**Database Schema:**
```typescript
interface Favorite {
  userId: string;
  activityId: string;
  createdAt: Date;
  collection?: string; // Optional collection name
  notes?: string; // Personal notes
  visited?: boolean;
  visitedDate?: Date;
}
```

---

## 🏗️ Technical Implementation

### Tech Stack Additions:

**Search:**
- `fuse.js` - Fuzzy search library
- Client-side indexing

**Maps:**
- `mapbox-gl` or `@googlemaps/js-api-loader`
- Marker clustering
- Custom marker icons

**Auth:**
- `next-auth` (recommended) or `@clerk/nextjs`
- Session management
- Protected routes

**Database:**
- Extend Airtable or add PostgreSQL (Vercel Postgres)
- Tables: `users`, `favorites`, `events`, `secret_spots`

**Real-time:**
- Vercel KV for session storage
- WebSockets for live event updates (optional)

---

## 📊 Database Schema

### New Tables:

```sql
-- Users (if using PostgreSQL)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  activity_id VARCHAR(255) NOT NULL,
  collection VARCHAR(100),
  notes TEXT,
  visited BOOLEAN DEFAULT FALSE,
  visited_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  venue_id VARCHAR(255),
  venue_name VARCHAR(255),
  date DATE NOT NULL,
  time TIME NOT NULL,
  end_time TIME,
  price DECIMAL(10,2),
  category VARCHAR(50),
  description TEXT,
  ticket_url TEXT,
  image_url TEXT,
  recurring VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Secret Spots
CREATE TABLE secret_spots (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  secret_level VARCHAR(50),
  description TEXT,
  address VARCHAR(255),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  best_time VARCHAR(100),
  crowd_level VARCHAR(50),
  insider_tip TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 UI/UX Enhancements

### Navigation Updates:
```
Header:
┌─────────────────────────────────────────────────┐
│ 🌊 Bored in SC   🔍 Search   🗺️ Map   🎉 Tonight│
│                                    👤 Profile    │
└─────────────────────────────────────────────────┘
```

### Mobile Bottom Nav:
```
┌─────────────────────────────────────┐
│  🏠      🗺️      🔍      🎉      👤  │
│ Home    Map   Search  Events Profile│
└─────────────────────────────────────┘
```

---

## 🚀 Implementation Phases

### Phase 1: Search (Week 1)
- [ ] Install fuse.js
- [ ] Create search component
- [ ] Build search index
- [ ] Add to header
- [ ] Mobile responsive

### Phase 2: Map (Week 1-2)
- [ ] Set up Mapbox/Google Maps
- [ ] Plot activities on map
- [ ] Marker clustering
- [ ] Filter sidebar
- [ ] Activity previews

### Phase 3: Events (Week 2)
- [ ] Events schema/database
- [ ] Events page UI
- [ ] Calendar integration
- [ ] Add initial events

### Phase 4: Secret Map (Week 2-3)
- [ ] Secret spots database
- [ ] Curate 20-30 spots
- [ ] Reveal mechanic
- [ ] Map integration

### Phase 5: Auth (Week 3)
- [ ] Set up Next-Auth
- [ ] Login/signup flows
- [ ] Profile page
- [ ] Protected routes

### Phase 6: Favorites (Week 3-4)
- [ ] Favorites database
- [ ] Heart button on cards
- [ ] Collections feature
- [ ] Profile integration

---

## 🎯 Success Metrics

**Search:**
- 90% of searches return relevant results
- < 200ms search response time

**Map:**
- All activities plotted correctly
- Smooth performance with 50+ markers
- Mobile-friendly interactions

**Events:**
- 10-20 events per week listed
- Keep calendar updated

**User Engagement:**
- 30% of visitors create accounts
- Average 5+ favorites per user
- 20% return weekly

---

## 💡 Future Enhancements (Sprint 7+)

1. **AI Chatbot** - "What should I do on a rainy Saturday?"
2. **Trip Planner** - Multi-activity itineraries
3. **Social Features** - Follow friends, share lists
4. **Reviews** - User-generated ratings
5. **Notifications** - "Perfect tide for tide pools now!"
6. **API** - Let others build on our data

---

## 📝 Content Needs

### For Secret Map:
- 10-15 secret beaches/coves
- 5-10 hidden viewpoints
- 10-15 local food spots
- 5-10 nature spots
- Insider tips for each

### For Events:
- Weekly event calendar
- Recurring events list
- Partner with venues for auto-updates

---

**Sprint 6 will transform the site from an activity guide into a full-featured discovery and planning platform!** 🚀

Let's build it! 🎉

