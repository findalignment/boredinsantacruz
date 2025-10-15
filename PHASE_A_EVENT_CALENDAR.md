# 📅 Phase A: Event Calendar Implementation Plan

## Timeline: 2-3 weeks
## Priority: HIGH - Starting NOW

---

## 🎯 Core Requirements (Built Into Everything)

### ✅ Already Implemented
- [x] **Mobile-first responsive design** - All pages
- [x] **Fast loading** - Next.js optimization, image optimization
- [x] **User accounts** - NextAuth with Google OAuth
- [x] **Bookmarking** - Favorites system for activities/restaurants
- [x] **SEO basics** - Meta tags, structured data, sitemaps
- [x] **Analytics** - Google Analytics 4

### 🆕 To Implement in Phase A
- [ ] **Clear category navigation** (Music/Food/Outdoors/Arts/Free/Family)
- [ ] **Search & filters** (date, cost, distance, type)
- [ ] **Map integration** (Mapbox - show events on map)
- [ ] **Event reminders/email alerts** ("Notify me")
- [ ] **Event-specific schema markup**

---

## 📊 Feature Breakdown

### Feature 1: Event Submission Form
**Timeline: Week 1 - Days 1-3**

#### User Story
*"As a local promoter, I want to submit my event so the community can discover it"*

#### Page: `/events/submit`

#### Form Fields
```typescript
interface EventSubmission {
  // Basic Info
  title: string;                    // Required
  description: string;              // Required (rich text)
  category: string[];               // Required (multi-select)
  
  // Date & Time
  startDate: Date;                  // Required
  startTime: string;                // Required
  endDate?: Date;                   // Optional
  endTime?: string;                 // Optional
  isRecurring: boolean;             // Checkbox
  recurringPattern?: string;        // If recurring
  
  // Location
  venueName: string;                // Required
  venueAddress: string;             // Required
  neighborhood: string;             // Auto-populated from address
  latitude?: number;                // Geocoded
  longitude?: number;               // Geocoded
  isOnline: boolean;                // Checkbox
  onlineUrl?: string;               // If online
  
  // Details
  cost: string;                     // "Free", "$5", "$10-20", etc.
  ticketUrl?: string;               // Optional
  websiteUrl?: string;              // Optional
  contactEmail: string;             // Required (hidden from public)
  contactPhone?: string;            // Optional (hidden from public)
  
  // Media
  imageUrl?: string;                // Upload or URL
  videoUrl?: string;                // YouTube/Vimeo embed
  
  // Audience
  kidFriendly: boolean;             // Checkbox
  petFriendly: boolean;             // Checkbox
  accessible: boolean;              // Wheelchair accessible
  ageRestriction?: string;          // "All ages", "18+", "21+", etc.
  
  // Metadata
  submittedBy: string;              // User ID (if logged in)
  submitterName: string;            // Name
  submitterEmail: string;           // Email
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  approvedAt?: Date;
  notes?: string;                   // Admin notes
}
```

#### Categories
- 🎵 Music & Live Entertainment
- 🍽️ Food & Drink
- 🎨 Arts & Culture
- 🏃 Outdoors & Sports
- 👨‍👩‍👧‍👦 Family & Kids
- 🎓 Education & Workshops
- 🎉 Festivals & Markets
- 🌙 Nightlife
- 💼 Business & Networking
- 🧘 Wellness & Fitness
- 🎭 Theater & Performance
- 🎬 Film & Screenings

#### UI Design
- **Layout:** Clean, single-column form
- **Sections:** Collapsible sections for better UX
- **Progress indicator:** Show form completion %
- **Image upload:** Drag & drop or URL
- **Address autocomplete:** Google Places API
- **Date/time picker:** Calendar widget
- **Preview:** Live preview as they type
- **Mobile optimized:** Large touch targets, easy scrolling

#### Validation
- Required fields marked clearly
- Real-time validation
- Character limits displayed
- Image size/format checks
- URL format validation
- Date/time validation (can't be in past)

#### Success Flow
1. User fills form
2. Client-side validation
3. Image upload to Cloudinary (if provided)
4. Geocode address (lat/lng)
5. Submit to Airtable (status: 'pending')
6. Email notification to admin
7. Confirmation page: "Thank you! We'll review your event and publish it within 24 hours."
8. Optional: Auto-email submitter when approved

---

### Feature 2: Event Moderation Dashboard
**Timeline: Week 1 - Days 4-5**

#### User Story
*"As an admin, I want to review and approve submitted events before they go live"*

#### Page: `/admin/events`
**Protected:** Requires admin role

#### Dashboard Features

##### Pending Events List
- **Table view:**
  - Event title
  - Submitter name/email
  - Category
  - Date
  - Submitted date
  - Quick actions (Approve, Reject, Edit)
- **Filters:**
  - Status (Pending, Approved, Rejected)
  - Category
  - Date range
  - Search by title/submitter
- **Sorting:**
  - By submission date
  - By event date
  - By category

##### Event Review Modal
- **Full event details**
- **Edit capabilities:**
  - Fix typos
  - Adjust categories
  - Improve description
  - Add/change image
- **Actions:**
  - ✅ Approve (publishes immediately)
  - ❌ Reject (with reason)
  - ✏️ Request changes (email submitter)
  - 🗑️ Delete (spam)
- **Admin notes:**
  - Internal notes for team
  - Flag for follow-up

##### Bulk Actions
- Select multiple events
- Bulk approve/reject
- Export to CSV

##### Analytics
- Pending count (badge)
- Approval rate
- Average review time
- Most common categories
- Top submitters

---

### Feature 3: Enhanced Event Calendar
**Timeline: Week 2 - Days 1-3**

#### User Story
*"As a user, I want to easily find events that match my interests and schedule"*

#### Page: `/events` (Enhanced)

#### View Modes

##### 1. **Grid View** (Default - Mobile-first)
```
┌──────────────────────────────────┐
│  🎵 Jazz Night at Kuumbwa        │
│  Tonight • 7:00 PM • $25         │
│  📍 Downtown                     │
│  [Bookmark] [Remind Me]          │
└──────────────────────────────────┘
```
- **Card layout:** Image, title, date/time, price, location
- **2 columns on desktop, 1 on mobile**
- **Infinite scroll** (load more as you scroll)
- **Quick actions:** Bookmark, Share, Remind Me

##### 2. **List View**
```
Oct 15 | 🎵 Jazz Night | Kuumbwa | $25 | [Bookmark]
Oct 15 | 🍽️ Food Truck Fair | Harbor | Free | [Bookmark]
Oct 16 | 🎨 Art Walk | Downtown | Free | [Bookmark]
```
- **Compact list:** Date, icon, title, venue, price
- **Desktop-optimized** (more info visible)
- **Sort options:** Date, Price, Distance

##### 3. **Calendar View** (Desktop)
```
October 2025
Mon  Tue  Wed  Thu  Fri  Sat  Sun
                   1    2    3
 4    5    6    7    8    9   10
11   12   13   14  [15]  16   17
          [3]  [5]  [8]  [2]
```
- **Monthly grid:** Click date to see events
- **Event count badges:** Show # of events per day
- **Color coding:** By category
- **Click date → Filter to that day**

##### 4. **Map View**
- **Mapbox integration**
- **Event markers:** Color-coded by category
- **Cluster markers:** When events close together
- **Click marker → Event popup**
- **Filter visible events** (what's on screen)

#### Navigation & Filters

##### Top Navigation Bar
```
┌────────────────────────────────────────────┐
│ [Search events...] [Filters ▼] [Map View] │
└────────────────────────────────────────────┘
```

##### Quick Filters (Horizontal scroll on mobile)
```
[🎯 All] [Today] [This Week] [This Weekend] [Free] [Near Me]
```

##### Filter Panel (Slide-in drawer on mobile)
**Categories:**
- [x] Music & Live Entertainment
- [x] Food & Drink
- [x] Arts & Culture
- [x] Outdoors & Sports
- [x] Family & Kids
- [ ] Education & Workshops
- [ ] Festivals & Markets
- [ ] Nightlife

**Date:**
- ( ) Today
- ( ) Tomorrow
- ( ) This Week
- ( ) This Weekend
- ( ) This Month
- (•) Custom Range: [Oct 15] to [Oct 30]

**Cost:**
- [ ] Free
- [ ] Under $10
- [ ] $10-$25
- [ ] $25-$50
- [ ] $50+

**Distance:** (If location enabled)
- ( ) Within 5 miles
- (•) Within 10 miles
- ( ) Within 25 miles
- ( ) Any distance

**Audience:**
- [ ] Kid-Friendly
- [ ] Pet-Friendly
- [ ] 21+ Only
- [ ] Wheelchair Accessible

**[Apply Filters] [Clear All]**

##### Search
- **Real-time search** as you type
- **Search fields:**
  - Event title
  - Description
  - Venue name
  - Category
- **Fuzzy matching** (typo-tolerant)
- **Search suggestions** (popular searches)

##### Sort Options
```
Sort by: [Relevance ▼]
- Relevance (default)
- Date (soonest first)
- Date (latest first)
- Distance (nearest first)
- Price (low to high)
- Price (high to low)
- Popularity (most bookmarked)
```

---

### Feature 4: Event Detail Pages
**Timeline: Week 2 - Days 4-5**

#### User Story
*"As a user, I want all the information I need to decide if I should attend an event"*

#### Page: `/events/[id]`

#### Layout (Mobile-First)

##### Hero Section
```
┌────────────────────────────────────┐
│                                    │
│        [Event Image]               │
│                                    │
│  🎵 Music & Live Entertainment     │
│                                    │
└────────────────────────────────────┘
```

##### Title & Quick Info
```
Jazz Night at Kuumbwa

📅 Friday, October 15, 2025
🕐 7:00 PM - 10:00 PM
📍 Kuumbwa Jazz Center, Downtown Santa Cruz
💰 $25 advance / $30 door
```

##### Action Buttons
```
[🔖 Bookmark] [🔔 Remind Me] [↗️ Share]
[🎫 Get Tickets →]
```

##### Description Section
```
Experience an unforgettable evening of live jazz...
[Read more ▼]
```

##### Details Tab
```
📋 Event Details
────────────────
Category:     Music & Live Entertainment
Duration:     3 hours
Age:          All ages welcome
Accessibility: Wheelchair accessible
Parking:      Street parking available
Website:      kuumbwajazz.org
```

##### Location Tab
```
📍 Location & Directions
────────────────────────
Kuumbwa Jazz Center
320-2 Cedar St, Santa Cruz, CA 95060

[View on Map ▼]
  [Interactive Mapbox map]
  [Get Directions]
  
Parking: Street parking on Cedar St
Nearby: 5 restaurants, 2 coffee shops
```

##### Similar Events
```
You might also like:

[Event Card 1] [Event Card 2] [Event Card 3]
```

##### Share Section
```
Share this event:
[Facebook] [Twitter] [Copy Link] [Email]
```

##### SEO Optimization
- **Title:** "Jazz Night at Kuumbwa - Oct 15, 2025 | Santa Cruz Events"
- **Meta Description:** "Experience live jazz at Kuumbwa Jazz Center on Oct 15. $25 tickets. Downtown Santa Cruz. All ages welcome. Get tickets now!"
- **Schema Markup:** Event structured data
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Jazz Night at Kuumbwa",
    "startDate": "2025-10-15T19:00",
    "endDate": "2025-10-15T22:00",
    "location": {
      "@type": "Place",
      "name": "Kuumbwa Jazz Center",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "320-2 Cedar St",
        "addressLocality": "Santa Cruz",
        "addressRegion": "CA",
        "postalCode": "95060"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "25",
      "priceCurrency": "USD",
      "url": "https://kuumbwajazz.org"
    }
  }
  ```
- **Open Graph tags:** For social sharing
- **Twitter Card:** Large image card

---

### Feature 5: Event Reminders & Email Alerts
**Timeline: Week 3 - Days 1-2**

#### User Story
*"As a user, I want to be notified about events I'm interested in"*

#### Features

##### 1. "Remind Me" Button
- **One-click reminder:** No form, instant
- **Requires login:** Prompt to sign in
- **Saves to user profile:** List of reminders
- **Email options:**
  - 1 day before
  - 1 week before
  - Custom (user chooses)

##### 2. Event Interest Preferences
**Page:** `/profile/notifications`

**Categories to follow:**
- [x] Music & Live Entertainment
- [ ] Food & Drink
- [x] Arts & Culture
- [x] Outdoors & Sports
- [ ] Family & Kids

**Frequency:**
- ( ) Real-time (as events are added)
- (•) Daily digest (morning email)
- ( ) Weekly digest (Monday mornings)
- ( ) Only for reminders I set

**Location:**
- [x] Events within 10 miles of Santa Cruz
- [ ] Specific neighborhoods: [Downtown] [Westside]

**Cost:**
- [x] Free events only
- [x] Events under $25
- [ ] Any price

##### 3. Email Templates (Resend)

**Reminder Email (1 day before):**
```
Subject: Tomorrow: Jazz Night at Kuumbwa 🎵

Hi [Name],

This is your reminder for:

🎵 Jazz Night at Kuumbwa
📅 Tomorrow, Oct 15 at 7:00 PM
📍 320-2 Cedar St, Santa Cruz
💰 $25 advance / $30 door

[Get Directions] [View Event Details]

See you there!
Bored in Santa Cruz

[Manage Reminders]
```

**Weekly Digest Email:**
```
Subject: This Week in Santa Cruz: 12 events you might love 🌟

Hi [Name],

Here are events matching your interests:

━━━━━━━━━━━━━━━━━
🎵 MUSIC & LIVE ENTERTAINMENT

Jazz Night at Kuumbwa
Fri, Oct 15 • 7:00 PM • $25
[View Event]

Live at the Catalyst
Sat, Oct 16 • 9:00 PM • $15
[View Event]

━━━━━━━━━━━━━━━━━
🎨 ARTS & CULTURE

First Friday Art Walk
Fri, Oct 1 • 5:00 PM • Free
[View Event]

━━━━━━━━━━━━━━━━━

[View All Events] [Manage Preferences]
```

##### 4. In-App Notifications
- **Notification bell icon** in header
- **Badge count:** Unread notifications
- **Notification types:**
  - Event starting soon (if bookmarked)
  - New event in your interests
  - Event updated
  - Event canceled
- **Notification center:** `/notifications`
- **Mark as read/unread**
- **Notification settings:** Enable/disable types

---

### Feature 6: Map Integration
**Timeline: Week 3 - Days 3-4**

#### User Story
*"As a user, I want to see where events are and plan my route"*

#### Implementation

##### Event Map View (`/events/map`)
```
┌────────────────────────────────────────┐
│  [Search] [Filters] [List View]       │
├────────────────────────────────────────┤
│                                        │
│            [Mapbox Map]                │
│                                        │
│  • Markers for each event              │
│  • Color-coded by category             │
│  • Cluster markers (many events)       │
│  • Click → Event popup                 │
│                                        │
└────────────────────────────────────────┘
```

##### Event Markers
- **Color-coded by category:**
  - 🎵 Music: Purple
  - 🍽️ Food: Orange
  - 🎨 Arts: Blue
  - 🏃 Outdoors: Green
  - 👨‍👩‍👧‍👦 Family: Yellow
  - etc.
- **Marker icons:** Custom SVG icons per category
- **Hover effect:** Show event title
- **Click:** Open popup with quick details

##### Event Popup
```
┌─────────────────────────────┐
│  [Event Image]              │
│                             │
│  Jazz Night at Kuumbwa      │
│  📅 Oct 15 • 7:00 PM        │
│  💰 $25                     │
│                             │
│  [View Details] [Bookmark]  │
└─────────────────────────────┘
```

##### Clustering
- **When many events close together:**
  - Show cluster marker with count: `[12]`
  - Click to zoom in
  - Unclusters at higher zoom
- **Performance:** Don't render all markers at once

##### User Location
- **"Near Me" button:** Geolocate user
- **Distance calculation:** Show distance from user
- **Sort by distance:** Nearest first

##### Directions
- **"Get Directions" button:** Opens:
  - Google Maps (mobile)
  - Apple Maps (iOS)
  - In-app directions (desktop)

##### Map Filters (Sidebar on desktop, drawer on mobile)
```
Show on map:
────────────
Categories:
[x] Music
[x] Food
[x] Arts
[ ] Outdoors

Date:
( ) Today
(•) This Week
( ) This Month

Price:
[x] Free
[x] Under $25
[ ] $25+

[Apply]
```

---

### Feature 7: Performance Optimization
**Timeline: Week 3 - Day 5**

#### Mobile-First Optimizations

##### Image Optimization
- **Cloudinary integration:**
  - Auto-format (WebP, AVIF)
  - Responsive images (srcset)
  - Lazy loading
  - Blur placeholder
- **Image sizes:**
  - Thumbnails: 400x300
  - Cards: 800x600
  - Hero: 1600x900
- **Compression:** 80% quality

##### Caching Strategy
- **Static pages:** ISR (revalidate every 30 minutes)
- **Event data:** Cache 30 minutes
- **User data:** No cache (always fresh)
- **Images:** CDN cache (1 year)

##### Code Splitting
- **Route-based:** Each page loads only its code
- **Component lazy loading:** Below-the-fold content
- **Dynamic imports:** Heavy libraries (maps, charts)

##### Bundle Optimization
- **Tree shaking:** Remove unused code
- **Minification:** Production build
- **Compression:** Gzip/Brotli
- **Critical CSS:** Inline above-the-fold CSS

##### Loading States
- **Skeleton screens:** Instead of spinners
- **Progressive loading:** Show content as it loads
- **Optimistic UI:** Update UI before server confirms

##### Performance Targets
- **Lighthouse Score:** 90+ on mobile
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Largest Contentful Paint:** <2.5s

---

### Feature 8: Analytics & Tracking
**Timeline: Integrated throughout**

#### Events to Track

##### Page Views
- Event list page
- Event detail page
- Event submission page
- Map view
- Search results

##### User Actions
- Event bookmark
- Event reminder set
- Filter applied
- Search performed
- Ticket link clicked
- Map marker clicked
- Share button clicked
- Email alert signup

##### Conversions
- Event submission completed
- Ticket purchased (external link)
- Email signup
- User registration

##### Custom Events (Google Analytics 4)
```javascript
// Example tracking
gtag('event', 'bookmark_event', {
  event_id: 'event-123',
  event_title: 'Jazz Night',
  event_category: 'Music',
  event_date: '2025-10-15',
});

gtag('event', 'search', {
  search_term: 'live music',
  result_count: 12,
});

gtag('event', 'filter_applied', {
  filter_type: 'category',
  filter_value: 'Music',
});
```

#### Metrics Dashboard
- **Page:** `/admin/analytics` (admin only)
- **Metrics:**
  - Event views (total, by category)
  - Event bookmarks (most popular)
  - Search queries (trending)
  - Filter usage (most used)
  - Submission rate
  - Approval rate
  - User engagement (time on page, bounce rate)
  - Traffic sources (organic, social, direct)

---

## 🗄️ Database Structure (Airtable)

### Table: `Events`
```
Fields:
- ID (auto)
- Title (text)
- Description (long text)
- Categories (multiple select)
- StartDate (date)
- StartTime (time)
- EndDate (date, optional)
- EndTime (time, optional)
- IsRecurring (checkbox)
- RecurringPattern (text, optional)
- VenueName (text)
- VenueAddress (text)
- Neighborhood (single select)
- Latitude (number)
- Longitude (number)
- IsOnline (checkbox)
- OnlineURL (url, optional)
- Cost (text)
- TicketURL (url, optional)
- WebsiteURL (url, optional)
- ContactEmail (email)
- ContactPhone (phone, optional)
- ImageURL (url)
- VideoURL (url, optional)
- KidFriendly (checkbox)
- PetFriendly (checkbox)
- Accessible (checkbox)
- AgeRestriction (single select)
- SubmittedBy (link to Users)
- SubmitterName (text)
- SubmitterEmail (email)
- Status (single select: pending, approved, rejected)
- SubmittedAt (date)
- ApprovedAt (date, optional)
- ApprovedBy (link to Users, optional)
- AdminNotes (long text, optional)
- ViewCount (number)
- BookmarkCount (number)
- Source (single select: user_submission, eventbrite, airtable, admin)
```

### Table: `EventReminders`
```
Fields:
- ID (auto)
- UserID (link to Users)
- EventID (link to Events)
- ReminderDate (date)
- ReminderTime (time)
- Sent (checkbox)
- SentAt (date, optional)
- CreatedAt (date)
```

### Table: `EventBookmarks` (or extend existing Favorites)
```
Fields:
- ID (auto)
- UserID (link to Users)
- EventID (link to Events)
- CreatedAt (date)
```

### Table: `EventInterests` (User preferences)
```
Fields:
- ID (auto)
- UserID (link to Users)
- Categories (multiple select)
- Frequency (single select: realtime, daily, weekly)
- MaxDistance (number, miles)
- MaxPrice (number)
- FreeOnly (checkbox)
- CreatedAt (date)
- UpdatedAt (date)
```

---

## 🎨 Design System

### Color Palette (by category)
```css
--music: #8B5CF6;      /* Purple */
--food: #F59E0B;       /* Orange */
--arts: #3B82F6;       /* Blue */
--outdoors: #10B981;   /* Green */
--family: #FBBF24;     /* Yellow */
--education: #6366F1;  /* Indigo */
--festivals: #EC4899;  /* Pink */
--nightlife: #8B5CF6;  /* Purple */
--business: #6B7280;   /* Gray */
--wellness: #14B8A6;   /* Teal */
--theater: #DC2626;    /* Red */
--film: #7C3AED;       /* Violet */
```

### Typography
```css
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'Roboto Mono', monospace;
```

### Spacing (Tailwind)
- Mobile: Compact (p-4, gap-4)
- Desktop: Comfortable (p-6, gap-6)

### Breakpoints
```css
--mobile: 0-640px
--tablet: 640-1024px
--desktop: 1024px+
```

---

## 📱 Mobile-First Approach

### Design Principles
1. **Touch-first:** 44px minimum touch targets
2. **One-handed:** Key actions in thumb zone
3. **Progressive disclosure:** Show what's needed, hide complexity
4. **Instant feedback:** Visual response to all actions
5. **Offline support:** Cache event data

### Mobile Optimizations
- **Hamburger menu:** Collapsible navigation
- **Filter drawer:** Slide-in from bottom
- **Sticky filters:** Quick filters always visible
- **Swipe gestures:** Swipe cards, dismiss modals
- **Bottom nav:** Key actions at bottom (search, filters, map)
- **Reduced animations:** Respect motion preferences

---

## ✅ Acceptance Criteria

### User Submission
- [ ] Users can submit events without login
- [ ] Form validates all required fields
- [ ] Images upload successfully
- [ ] Addresses are geocoded
- [ ] Confirmation email sent to submitter
- [ ] Admin receives notification

### Admin Moderation
- [ ] Admins can see pending events
- [ ] Admins can approve/reject events
- [ ] Admins can edit event details
- [ ] Bulk actions work correctly
- [ ] Approval triggers email to submitter

### Event Discovery
- [ ] Events display in grid, list, and calendar views
- [ ] Search returns relevant results in <1s
- [ ] Filters work correctly (all combinations)
- [ ] Sort options work as expected
- [ ] Map view shows all events correctly
- [ ] Load time <2s on 4G mobile

### Event Details
- [ ] All event information displayed
- [ ] Map shows correct location
- [ ] Directions link works
- [ ] Share buttons work
- [ ] Schema markup validates
- [ ] Mobile layout is readable

### Reminders & Alerts
- [ ] Users can set reminders (logged in only)
- [ ] Reminder emails sent on time
- [ ] Weekly digest includes relevant events
- [ ] Users can manage preferences
- [ ] Unsubscribe link works

### Performance
- [ ] Lighthouse score 90+ on mobile
- [ ] Images lazy load
- [ ] Filters apply without page reload
- [ ] Map renders smoothly
- [ ] Works offline (basic browsing)

### Analytics
- [ ] All user actions tracked
- [ ] Custom events fire correctly
- [ ] Dashboard shows accurate data
- [ ] Real-time updates working

---

## 🚀 Deployment Checklist

### Pre-Launch
- [ ] All features tested on mobile
- [ ] All features tested on desktop
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] SEO audit
- [ ] Security review
- [ ] Load testing

### Environment Setup
- [ ] Airtable tables created
- [ ] Cloudinary account configured
- [ ] Resend email templates created
- [ ] Mapbox token added to Vercel
- [ ] Google Analytics events configured
- [ ] Admin users designated

### Go-Live
- [ ] Deploy to production
- [ ] Verify all forms work
- [ ] Test email delivery
- [ ] Check map rendering
- [ ] Monitor error logs
- [ ] Social media announcement

### Post-Launch
- [ ] Monitor analytics
- [ ] Respond to user feedback
- [ ] Fix bugs as discovered
- [ ] Iterate on features
- [ ] Plan Phase B!

---

## 📈 Success Metrics (30 days)

### User Engagement
- **Target:** 100+ event submissions
- **Target:** 50+ approved events
- **Target:** 1,000+ event views
- **Target:** 200+ event bookmarks
- **Target:** 50+ email alert signups

### Traffic
- **Target:** 5,000+ page views
- **Target:** 2,000+ unique visitors
- **Target:** 50% mobile traffic
- **Target:** 60% organic traffic

### Performance
- **Target:** Lighthouse score 90+
- **Target:** <2s page load time
- **Target:** <10% bounce rate on event pages

---

## 🎉 Phase A Complete!

When all acceptance criteria are met, Phase A is DONE. Time to move to Phase B: Time-Based Activity Guides!

---

**Ready to start building?** Let me know and I'll create the first component! 🚀

