# 💰 Monetization Setup Guide

This guide covers setting up revenue streams for Bored in Santa Cruz.

---

## 📊 Revenue Strategy

### Tier 1 (Launch - Month 1-3):
1. **Google AdSense** - Passive ads
2. **Affiliate Links** - Booking commissions

**Expected:** $100-500/month

### Tier 2 (After 10k MAU):
3. **Local Business Partnerships** - Featured listings
4. **Sponsored Content** - "Best Of" lists

**Expected:** +$500-2,000/month

### Tier 3 (After 50k MAU):
5. **Premium Subscription** - Ad-free + premium features
6. **API Access** - For developers

**Expected:** +$2,000-10,000/month

---

## 🎯 Phase 1: Google AdSense

### Setup Steps:

#### 1. Sign Up for Google AdSense
1. Go to [google.com/adsense](https://www.google.com/adsense)
2. Sign up with your Google account
3. Add website: `boredinsantacruz.com` (or your domain)
4. Wait for approval (1-3 days typically)

#### 2. Get Publisher ID
- After approval, go to Account → Account Information
- Copy your Publisher ID (looks like: `ca-pub-1234567890123456`)

#### 3. Add to Environment Variables
```bash
# .env.local
NEXT_PUBLIC_ADSENSE_ID=ca-pub-YOUR_ID_HERE
```

```bash
# Vercel
# Go to Project Settings → Environment Variables
# Add: NEXT_PUBLIC_ADSENSE_ID = ca-pub-YOUR_ID_HERE
```

#### 4. Add AdSense Script to Layout
The script is already added to `src/app/layout.tsx`:
```tsx
{process.env.NEXT_PUBLIC_ADSENSE_ID && (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)}
```

#### 5. Create Ad Units
1. In AdSense dashboard, go to Ads → By ad unit → Display ads
2. Create the following ad units:

**Homepage Hero** (Horizontal)
- Name: "Homepage Hero"
- Type: Display ads
- Size: Responsive
- Copy the ad unit ID → `AdSlots.HOMEPAGE_HERO`

**Activity Detail Top** (Rectangle)
- Name: "Activity Detail Top"
- Type: Display ads
- Size: Responsive (rectangle)
- Copy the ad unit ID → `AdSlots.ACTIVITY_DETAIL_TOP`

**Activity Detail Sidebar** (Vertical)
- Name: "Activity Detail Sidebar"
- Type: Display ads
- Size: 300x600 (skyscraper)
- Copy the ad unit ID → `AdSlots.ACTIVITY_DETAIL_SIDEBAR`

**In-Feed Ads** (Auto)
- Name: "In-Feed Ads"
- Type: In-feed ads
- Size: Responsive
- Copy the ad unit ID → `AdSlots.BETWEEN_CARDS`

#### 6. Update Ad Slots
Edit `src/components/ads/ad-unit.tsx`:
```typescript
export const AdSlots = {
  HOMEPAGE_HERO: 'YOUR_HOMEPAGE_SLOT_ID',
  ACTIVITY_DETAIL_TOP: 'YOUR_ACTIVITY_TOP_SLOT_ID',
  ACTIVITY_DETAIL_SIDEBAR: 'YOUR_SIDEBAR_SLOT_ID',
  SEARCH_RESULTS: 'YOUR_SEARCH_SLOT_ID',
  BETWEEN_CARDS: 'YOUR_INFEED_SLOT_ID',
};
```

#### 7. Test Ads
- Ads may take 24-48 hours to start showing
- Test in production (ads don't show in development)
- Don't click your own ads (against AdSense policy)

### Ad Placements:
- ✅ Homepage: Between chatbot and recommendations
- ✅ Activity Detail: After description, before reviews
- ✅ List Pages: Every 6 items
- ✅ Sidebar: Fixed position (desktop only)

### Expected Revenue:
| Monthly Visitors | Page Views | Est. Revenue |
|------------------|------------|--------------|
| 5,000 | 15,000 | $50-150 |
| 10,000 | 30,000 | $100-300 |
| 25,000 | 75,000 | $250-750 |
| 50,000 | 150,000 | $500-1,500 |

*Assumes $3-10 CPM (cost per 1000 views)*

---

## 🔗 Phase 2: Affiliate Links

### Programs to Join:

#### 1. **Amazon Associates**
- **Purpose:** Books, gear, outdoor equipment
- **Commission:** 1-10% depending on category
- **Sign up:** [amazon.com/associates](https://affiliate-program.amazon.com/)

**Example Uses:**
- "Best Hiking Gear for Santa Cruz"
- "Top 10 Books About Santa Cruz"
- Link from activity pages to related products

#### 2. **Viator** (TripAdvisor)
- **Purpose:** Tours, activities, experiences
- **Commission:** 8% average
- **Sign up:** [viator.com/affiliates](https://www.viator.com/affiliates)

**Example Uses:**
- "Book This Tour" buttons on activity pages
- "Similar Experiences" recommendations
- Curated tour lists

#### 3. **Booking.com**
- **Purpose:** Hotels, accommodations
- **Commission:** 25-40% of Booking.com's commission
- **Sign up:** [booking.com/affiliate](https://www.booking.com/affiliate)

**Example Uses:**
- "Find Hotels Near This Activity"
- Best Time to Visit page: "Book Your Stay"
- Trip planning mode

#### 4. **GetYourGuide**
- **Purpose:** Activities, attractions, experiences
- **Commission:** 8% average
- **Sign up:** [getyourguide.com/affiliates](https://www.getyourguide.com/partnerships/affiliates/)

**Example Uses:**
- Activity detail pages
- "Book Tickets" CTAs
- Event pages

#### 5. **Discover Cars** (Rental Cars)
- **Purpose:** Car rentals
- **Commission:** 8-10%
- **Sign up:** [discovercars.com/affiliate](https://www.discovercars.com/affiliate-program)

**Example Uses:**
- Trip planning mode
- Best Time to Visit page
- "Getting Around Santa Cruz" section

### Implementation:

#### Add Affiliate Component:
```tsx
// src/components/affiliates/affiliate-link.tsx
export function AffiliateLink({ 
  href, 
  children, 
  provider 
}: { 
  href: string; 
  children: React.ReactNode; 
  provider: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
    >
      {children}
      <span className="text-xs opacity-75">via {provider}</span>
    </a>
  );
}
```

#### Add Booking CTAs:
```tsx
// On activity detail pages
<div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mt-6">
  <h3 className="text-lg font-bold text-gray-900 mb-2">
    🎟️ Book This Experience
  </h3>
  <p className="text-gray-700 mb-4">
    Reserve your spot and skip the line with our trusted partner
  </p>
  <AffiliateLink 
    href="https://viator.com/..." 
    provider="Viator"
  >
    Check Availability & Prices
  </AffiliateLink>
</div>
```

#### Add Hotel Finder:
```tsx
// On Best Time to Visit page
<div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
  <h3 className="text-lg font-bold text-gray-900 mb-2">
    🏨 Find Your Perfect Stay
  </h3>
  <p className="text-gray-700 mb-4">
    Book hotels in Santa Cruz with free cancellation
  </p>
  <AffiliateLink 
    href="https://booking.com/..." 
    provider="Booking.com"
  >
    Search Hotels
  </AffiliateLink>
</div>
```

### Expected Revenue:
| Monthly Bookings | Avg. Commission | Est. Revenue |
|------------------|-----------------|--------------|
| 10 | $20 | $200 |
| 50 | $20 | $1,000 |
| 100 | $20 | $2,000 |
| 250 | $20 | $5,000 |

*Assumes 5% conversion rate on 2,000 monthly visitors = 100 bookings*

---

## 📜 Legal Requirements

### Affiliate Disclosure
Add to footer (`src/components/layout/footer.tsx`):

```tsx
<div className="text-xs text-gray-400 mt-4">
  <p>
    <strong>Affiliate Disclosure:</strong> This website contains affiliate links. 
    We may earn a commission when you book through our partners at no additional 
    cost to you. This helps us keep the site free and up-to-date.
  </p>
</div>
```

### Privacy Policy
Add to `/privacy`:
- Mention AdSense cookies
- Mention affiliate tracking
- Provide opt-out options

### Terms of Service
Add to `/terms`:
- Affiliate relationship disclosure
- No guarantee of booking availability
- Price discrepancies possible

---

## 📈 Tracking & Optimization

### Google Analytics Events
Track affiliate clicks:
```typescript
// When user clicks affiliate link
gtag('event', 'click_affiliate', {
  provider: 'Viator',
  activity_id: 'abc123',
  placement: 'activity_detail',
});
```

### A/B Testing
Test different:
- Button colors (green vs blue vs orange)
- Button text ("Book Now" vs "Check Availability" vs "Reserve")
- Placement (above fold vs below fold)
- Urgency ("Limited Spots" vs "Book Now")

### Conversion Optimization
- Show social proof ("127 people booked this today")
- Add urgency ("Only 3 spots left")
- Highlight benefits ("Free cancellation", "Best price guarantee")
- Add trust badges (partner logos)

---

## 🚀 Launch Checklist

### Before Going Live:
- [ ] AdSense approved
- [ ] Publisher ID added to env vars
- [ ] Ad units created
- [ ] Ad slot IDs updated in code
- [ ] At least 2 affiliate programs joined
- [ ] Affiliate links added to 10+ pages
- [ ] Affiliate disclosure added to footer
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] Analytics tracking set up
- [ ] Test all affiliate links
- [ ] Test ads appear (production only)

### Week 1:
- [ ] Monitor ad impressions
- [ ] Check for policy violations
- [ ] Track affiliate clicks
- [ ] Optimize low-performing placements

### Month 1:
- [ ] Review revenue data
- [ ] A/B test affiliate CTAs
- [ ] Add more affiliate partnerships
- [ ] Consider sponsored content

---

## 💡 Growth Strategies

### Increase Ad Revenue:
1. **More Traffic** - SEO, social media, content marketing
2. **More Page Views** - Better internal linking, "You might also like"
3. **Better Placement** - A/B test ad positions
4. **Better Content** - High-value content attracts high-paying ads

### Increase Affiliate Revenue:
1. **Trust Building** - Reviews, testimonials, social proof
2. **Better CTAs** - Test different copy and design
3. **More Opportunities** - Add affiliate links throughout site
4. **Better Targeting** - Recommend relevant products

### Future Revenue Streams:
1. **Local Business Partnerships** - $500-2,000/month per partner
2. **Sponsored Content** - $500-1,000 per article
3. **Premium Membership** - $5-10/month
4. **API Access** - $50-500/month
5. **Consulting** - $100-200/hour

---

## 📊 Revenue Projections

### Conservative (First Year):
| Month | MAU | AdSense | Affiliates | Total |
|-------|-----|---------|------------|-------|
| 1 | 2,000 | $50 | $100 | $150 |
| 3 | 5,000 | $150 | $300 | $450 |
| 6 | 10,000 | $300 | $800 | $1,100 |
| 12 | 25,000 | $750 | $2,000 | $2,750 |

### Optimistic (First Year):
| Month | MAU | AdSense | Affiliates | Partnerships | Total |
|-------|-----|---------|------------|--------------|-------|
| 1 | 5,000 | $150 | $500 | $0 | $650 |
| 3 | 15,000 | $450 | $1,500 | $500 | $2,450 |
| 6 | 30,000 | $900 | $3,000 | $2,000 | $5,900 |
| 12 | 75,000 | $2,250 | $8,000 | $5,000 | $15,250 |

---

## ✅ Quick Start

1. **Sign up for AdSense** (today)
2. **Join Viator + Booking.com** (today)
3. **Add env vars** (after approval)
4. **Update ad slots** (after approval)
5. **Add affiliate links** (this week)
6. **Deploy & monitor** (ongoing)

**Expected time to first dollar:** 7-14 days

---

## 🤝 Support

Questions? Issues?
- AdSense Help: [support.google.com/adsense](https://support.google.com/adsense)
- Contact: your@email.com

---

**Ready to monetize! 🚀💰**

