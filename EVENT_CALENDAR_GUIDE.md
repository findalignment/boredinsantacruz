# 🎉 Event Calendar API Integration Guide

This guide covers setting up comprehensive event data for Santa Cruz.

---

## 🎯 RECOMMENDED APPROACH

For Santa Cruz events, we recommend a **hybrid approach**:

### **Option A: Eventbrite API (RECOMMENDED)** ⭐

**Pros:**
- ✅ Free tier available
- ✅ Well-documented API
- ✅ Location-based filtering
- ✅ Event categories
- ✅ Easy to implement
- ✅ Most comprehensive for public events

**Cons:**
- ⚠️ Requires API key & OAuth
- ⚠️ Rate limits (1000 requests/hour on free tier)
- ⚠️ Only shows Eventbrite-listed events

**Best For:** Public events, concerts, workshops, festivals

---

### **Option B: Ticketmaster Discovery API**

**Pros:**
- ✅ Free tier available
- ✅ Great for concerts & shows
- ✅ Venue information included
- ✅ Price ranges

**Cons:**
- ⚠️ Limited to ticketed events
- ⚠️ Smaller coverage for small towns

**Best For:** Concerts, sports, theater

---

### **Option C: Predicthq API**

**Pros:**
- ✅ Aggregates multiple sources
- ✅ Very comprehensive
- ✅ ML-powered attendance predictions

**Cons:**
- ❌ Expensive (starts at $499/month)
- ❌ Overkill for single-city site

**Best For:** Enterprise applications

---

### **Option D: Manual Curation + Airtable** (CURRENT)

**Pros:**
- ✅ Full control over quality
- ✅ No API rate limits
- ✅ Can add local non-listed events
- ✅ Already implemented

**Cons:**
- ⚠️ Manual work required
- ⚠️ Need regular updates

**Best For:** Curated experiences, local expertise

---

## 🚀 RECOMMENDED: Eventbrite API Integration

### **1. Setup (10 minutes)**

#### **Get API Key:**
1. Go to https://www.eventbrite.com/platform/
2. Sign up for a developer account
3. Create an app
4. Get your OAuth token (Private Token for server-side)

#### **Add to `.env.local`:**
```bash
EVENTBRITE_API_KEY=your_private_token_here
```

---

### **2. Implementation**

We'll create:
- API route to fetch Eventbrite events
- Cache layer (24-hour refresh)
- Filter & search functionality
- Calendar views (day/week/month)
- Category filters

---

### **3. Event Categories to Pull**

For Santa Cruz, focus on:
- 🎭 **Arts & Culture** (theater, galleries, shows)
- 🎵 **Music** (concerts, open mics, DJ nights)
- 🍽️ **Food & Drink** (tastings, food festivals, restaurant events)
- 🏃 **Sports & Fitness** (runs, yoga, outdoor activities)
- 🎓 **Classes & Workshops** (cooking, art, crafts)
- 👨‍👩‍👧 **Family** (kid-friendly events)
- 🎉 **Festivals** (farmers markets, street fairs)
- 🌊 **Beach & Outdoor** (surf contests, beach cleanups)
- 💼 **Business & Networking** (meetups, conferences)

---

### **4. API Endpoints We'll Build**

```typescript
// Fetch all Santa Cruz events
GET /api/events

// Fetch events for specific date
GET /api/events?date=2025-10-20

// Fetch events for date range
GET /api/events?start=2025-10-20&end=2025-10-25

// Fetch by category
GET /api/events?category=music

// Search events
GET /api/events?search=jazz
```

---

### **5. Data Structure**

```typescript
interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string;
  category: string;
  venue: {
    name: string;
    address: string;
    city: string;
    lat?: number;
    lng?: number;
  };
  image?: string;
  url: string; // Link to Eventbrite
  price: {
    min: number;
    max: number;
    isFree: boolean;
  };
  tags: string[];
  isOnline: boolean;
  capacity?: number;
  ticketsAvailable?: boolean;
}
```

---

### **6. UI Components We'll Build**

- ✅ **Event Calendar View** (month/week/day)
- ✅ **Event Card** (similar to activity card)
- ✅ **Event Filters** (date, category, price, time)
- ✅ **Event Detail Page** (full info + map + add to trip)
- ✅ **"Tonight" Page** (today's events)
- ✅ **"This Weekend" Page**
- ✅ **Event Search**
- ✅ **Save to Trip** button

---

### **7. Caching Strategy**

To avoid hitting rate limits:

```typescript
// Cache events for 6-24 hours
// Refresh automatically
// Store in Vercel KV or in-memory cache

Cache key: `events:santacruz:${date}`
TTL: 6 hours for today's events
TTL: 24 hours for future events
```

---

### **8. Alternative: Hybrid Approach** (BEST)

Combine multiple sources:

1. **Eventbrite API** - Public events (automated)
2. **Airtable** - Curated/recurring events (manual)
3. **Ticketmaster** - Major concerts (automated)

**Benefits:**
- Most comprehensive coverage
- Quality control on important events
- Automatic updates for most events

---

## 📊 COMPARISON TABLE

| Source | Cost | Coverage | Ease | Update Frequency |
|--------|------|----------|------|------------------|
| Eventbrite API | Free | Good | Medium | Real-time |
| Ticketmaster | Free | Limited | Easy | Real-time |
| Predicthq | $499/mo | Excellent | Easy | Real-time |
| Manual/Airtable | Free | Custom | Hard | Manual |
| **Hybrid** ⭐ | **Free** | **Excellent** | **Medium** | **Auto + Manual** |

---

## 🎯 IMPLEMENTATION PLAN

### **Phase 1: Eventbrite Integration** (2-3 hours)
- [ ] Sign up for Eventbrite API
- [ ] Create API route `/api/events`
- [ ] Implement caching layer
- [ ] Test with Santa Cruz events

### **Phase 2: UI Components** (2-3 hours)
- [ ] Event card component
- [ ] Event filters
- [ ] Calendar view
- [ ] Event detail page

### **Phase 3: Integration** (1-2 hours)
- [ ] Update `/events` page
- [ ] Add "Save to Trip" button
- [ ] Map integration
- [ ] Search integration

### **Phase 4: Polish** (1 hour)
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile optimization
- [ ] SEO metadata

---

## 🚀 NEXT STEPS

**Ready to implement?**

1. **Quick Start** (uses Eventbrite API):
   - Sign up for Eventbrite developer account
   - Get OAuth token
   - I'll build the integration

2. **Hybrid Approach** (recommended):
   - Eventbrite for most events
   - Keep Airtable for curated picks
   - Best of both worlds

3. **Manual Only** (current):
   - Keep using Airtable
   - I'll build better calendar UI

---

## 📝 EVENTBRITE API EXAMPLE

```bash
# Fetch Santa Cruz events
curl "https://www.eventbriteapi.com/v3/events/search/?location.address=Santa+Cruz,+CA&location.within=25mi&expand=venue,ticket_availability" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response includes:**
- Event name, description, dates
- Venue (name, address, coordinates)
- Ticket info (price, availability)
- Images
- Categories

---

## ✅ RECOMMENDATION

**Go with Eventbrite API + Airtable Hybrid:**

1. **Eventbrite API** fetches 80-90% of events automatically
2. **Airtable** for:
   - Recurring events (farmers market, weekly events)
   - Local favorites
   - Non-Eventbrite events

This gives you:
- ✅ Comprehensive coverage
- ✅ Automatic updates
- ✅ Quality control
- ✅ Low maintenance
- ✅ Free!

---

**Ready to build this?** Let me know if you want to:
1. Set up Eventbrite API integration
2. Build the hybrid system
3. Just improve the UI for manual events

