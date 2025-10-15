# 🍽️ Rezy Integration Guide

## Overview

[Rezy](https://www.rezy.com/) is a restaurant reservation platform that could provide real-time availability data for last-minute reservations in Santa Cruz restaurants.

---

## ⚠️ IMPORTANT NOTICE

As of 2025, **Rezy does not provide a public API** for third-party integrations.

### Current Limitations:

1. **No Public API**: Rezy's reservation system is proprietary
2. **No Developer Program**: They don't offer API keys to developers
3. **Alternative Approach Needed**: Direct integration isn't possible

---

## 🔄 ALTERNATIVE SOLUTIONS

### **Option 1: Resy (Similar Platform)** ⭐ RECOMMENDED

**Resy** (owned by American Express) has better third-party integration options:

1. **Resy Partner API**: Available for select partners
2. **Widget Integration**: Can embed reservation widgets
3. **Contact**: partners@resy.com

**Setup:**
- Contact Resy for partner API access
- Embed reservation widgets on restaurant pages
- Show "Book Now" buttons that open Resy

---

### **Option 2: OpenTable API** 

**OpenTable** offers the most robust public API:

1. **Reservation Search API**: Find available restaurants
2. **Availability API**: Check real-time table availability
3. **Booking API**: Create reservations

**Free Tier**: Yes, with limitations

**How to Get Started:**
1. Visit: https://opentable.developer.azure-api.net/
2. Sign up for API key
3. Review documentation
4. Implement availability search

**Sample Implementation:**

```typescript
// src/lib/reservations/opentable.ts
export async function getAvailableRestaurants(
  location: string,
  date: string,
  time: string,
  partySize: number
) {
  const response = await fetch(
    `https://opentable.developer.azure-api.net/api/restaurants/search?` +
    `location=${encodeURIComponent(location)}&` +
    `date=${date}&` +
    `time=${time}&` +
    `partySize=${partySize}`,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OPENTABLE_API_KEY!
      }
    }
  );
  
  return await response.json();
}
```

---

### **Option 3: Manual Last-Minute List**

**Create your own curated "Last-Minute Openings" feature:**

1. **Airtable Table**: Create `LastMinuteReservations`
   ```
   Fields:
   - Restaurant (Link to Restaurants)
   - Available Times (Multiple select: 5pm, 6pm, 7pm, 8pm, 9pm)
   - Party Size (Number)
   - Date (Date)
   - Notes (Long text)
   - Reservation Link (URL)
   - Updated At (Last modified time)
   ```

2. **Daily Update Process**:
   - Call restaurants each morning
   - Update Airtable with last-minute availability
   - Display on website

3. **Implementation**:
   ```typescript
   // src/app/actions/getLastMinuteReservations.ts
   export async function getLastMinuteReservations() {
     const records = await tables.lastMinuteReservations
       .select({
         filterByFormula: `IS_AFTER({Date}, TODAY())`
       })
       .all();
     
     return records.map(r => ({
       restaurant: r.get('Restaurant'),
       times: r.get('Available Times'),
       partySize: r.get('Party Size'),
       link: r.get('Reservation Link')
     }));
   }
   ```

---

### **Option 4: Phone/Website Scraping** (Not Recommended)

**Why not recommended:**
- ⚠️ Violates terms of service
- ⚠️ Unreliable
- ⚠️ Maintenance nightmare
- ⚠️ Legal risks

---

## 🎯 RECOMMENDED IMPLEMENTATION

### **Hybrid Approach:**

1. **OpenTable API** for real-time availability (major restaurants)
2. **Manual Curation** for local favorites (daily updates)
3. **Direct Links** to restaurant booking pages

### **User Experience:**

```typescript
// Display last-minute openings
<div className="last-minute-section">
  <h2>🔥 Last-Minute Reservations (Today)</h2>
  
  {/* OpenTable integrated restaurants */}
  <div className="opentable-results">
    {availableRestaurants.map(r => (
      <RestaurantCard
        name={r.name}
        availableTimes={r.times}
        bookingUrl={r.opentableUrl}
      />
    ))}
  </div>
  
  {/* Manually curated */}
  <div className="curated-openings">
    {curatedOpenings.map(r => (
      <OpeningCard
        restaurant={r.name}
        time={r.time}
        note="Just confirmed available!"
        bookingUrl={r.website}
      />
    ))}
  </div>
</div>
```

---

## 📝 IMPLEMENTATION STEPS

### **Phase 1: OpenTable API** (2-3 hours)

1. **Sign up**: https://opentable.developer.azure-api.net/
2. **Get API key**: Free tier available
3. **Create integration**:
   ```typescript
   // src/lib/reservations/opentable.ts
   // src/app/actions/getReservations.ts
   // src/components/reservations/last-minute.tsx
   ```
4. **Add to restaurant pages**: "Check Availability" button
5. **Cache results**: 15-minute cache to avoid rate limits

### **Phase 2: Manual Curation** (1 hour setup)

1. **Create Airtable table**: `LastMinuteReservations`
2. **Build admin interface** (optional): Form to add openings
3. **Daily update process**: Call 5-10 key restaurants
4. **Display on homepage**: "🔥 Last-Minute Tonight" section

### **Phase 3: ChatBot Integration** (30 mins)

Add to system prompt:
```typescript
// In buildContextPrompt
if (context.lastMinuteReservations) {
  prompt += `\n## LAST-MINUTE RESERVATIONS AVAILABLE TODAY:
${context.lastMinuteReservations.map(r => `
- ${r.restaurant}: ${r.times.join(', ')} available
  Link: /restaurant/${r.id}
`).join('\n')}

Mention these when users ask about dinner tonight!\n`;
}
```

---

## 💰 COSTS

| Service | Cost | Limitations |
|---------|------|-------------|
| OpenTable API | Free tier | 1000 requests/month |
| Resy API | Contact for pricing | Partner access only |
| Rezy | No API available | N/A |
| Manual curation | $0 | Time investment |

---

## ✅ RECOMMENDED NEXT STEPS

1. **Start with OpenTable API** (easiest, free, reliable)
2. **Add manual curation** for local favorites
3. **Contact Resy** for partnership opportunities
4. **Monitor usage** and scale as needed

---

## 🆘 NEED HELP?

**For OpenTable API:**
- Documentation: https://opentable.developer.azure-api.net/docs/services
- Support: Contact via developer portal

**For Custom Implementation:**
- I can build the OpenTable integration
- I can create the Airtable manual system
- I can integrate with your chatbot

---

**Ready to implement?** Let me know which option you prefer:
1. OpenTable API (automatic, real-time)
2. Manual curation (flexible, local control)
3. Both (hybrid approach - recommended!)

