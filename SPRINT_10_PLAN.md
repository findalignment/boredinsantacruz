# 🚀 Sprint 10: Trip Planner & Collaborative Trips

## Overview
Build a Pinterest-style trip planner where users can save activities, restaurants, and create shareable trip boards.

## Goals
1. **Trip Boards** - Pinterest-style collections of saved places
2. **Collaborative Trips** - Share trips with friends/family
3. **Trip Itineraries** - Day-by-day planning
4. **Export & Share** - Share trips via link or PDF

---

## Phase 1: Trip Planner Infrastructure

### Airtable Schema

####  Trips Table
```
- TripId (Auto number)
- Name (Text) - "Weekend in Santa Cruz"
- Description (Long text)
- UserId (Link to Users)
- Collaborators (Multiple user emails, comma-separated)
- Cover Image (Attachment)
- StartDate (Date)
- EndDate (Date)
- IsPublic (Checkbox)
- ShareToken (Text) - UUID for sharing
- Created (Created time)
- Updated (Last modified time)
```

#### TripItems Table
```
- ItemId (Auto number)
- TripId (Link to Trips)
- ItemType (Single select: Activity, Restaurant, Note)
- ItemId (Text) - Reference to activity/restaurant ID
- ItemName (Text)
- Day (Number) - Which day of the trip
- Order (Number) - Order within the day
- Notes (Long text) - Personal notes
- Created (Created time)
```

### Features

**1. My Trips Page (`/trips`)**
- Grid of trip boards (Pinterest style)
- Create new trip button
- Filter: My Trips / Shared with Me / Public Trips

**2. Trip Detail Page (`/trips/[id]`)**
- Cover image
- Trip name & dates
- Collaborators list
- Day-by-day itinerary
- Add activities/restaurants
- Drag to reorder
- Share button

**3. Quick Add to Trip**
- "Add to Trip" button on every activity/restaurant
- Modal: Select existing trip or create new
- Success toast notification

**4. Collaborative Features**
- Invite collaborators by email
- Real-time updates (optional: use Vercel KV for presence)
- Comments on trip items
- Activity feed ("Jane added XYZ to the trip")

---

## Phase 2: UI Components

### TripBoard Component
```tsx
- Card with cover image
- Trip name
- Date range
- # of items
- Collaborator avatars
- Quick actions (share, edit, delete)
```

### TripItinerary Component
```tsx
- Timeline view
- Day sections
- Drag-and-drop reordering
- Inline notes
- Map preview
- Estimated timing
```

### AddToTripModal Component
```tsx
- Search existing trips
- Create new trip
- Select day
- Add notes
```

---

## Phase 3: Sharing & Export

### Share Features
1. **Public Link**: `/trips/shared/[token]` - Anyone with link
2. **Email Invite**: Send invitation to collaborators
3. **Export PDF**: Formatted itinerary for printing
4. **Copy to My Trips**: Clone someone else's public trip

### Permissions
- **Owner**: Full edit access, can delete
- **Collaborator**: Can add/remove items, edit notes
- **Viewer**: Read-only access via share link

---

## Implementation Steps

### Step 1: Database Setup (30 min)
- [ ] Create Trips table in Airtable
- [ ] Create TripItems table
- [ ] Add environment variables
- [ ] Create server actions

### Step 2: Core Pages (2 hours)
- [ ] `/trips` - List all trips
- [ ] `/trips/new` - Create trip
- [ ] `/trips/[id]` - View/edit trip
- [ ] `/trips/shared/[token]` - Public view

### Step 3: Integration (1 hour)
- [ ] Add "Save to Trip" buttons to activity/restaurant cards
- [ ] Add "Save to Trip" button to detail pages
- [ ] Toast notifications for saves

### Step 4: Collaborative Features (2 hours)
- [ ] Invite collaborators
- [ ] Share link generation
- [ ] Permission checks
- [ ] Activity feed (optional)

### Step 5: Polish (1 hour)
- [ ] Drag-and-drop reordering
- [ ] Cover image upload
- [ ] Mobile responsive
- [ ] Loading states

---

## API Routes

### Server Actions
```typescript
// src/app/actions/trips.ts
- createTrip(name, description, dates)
- getTrips(userId)
- getTripById(tripId)
- updateTrip(tripId, data)
- deleteTrip(tripId)
- addCollaborator(tripId, email)
- removeCollaborator(tripId, email)
- generateShareToken(tripId)
- getTripByToken(token)

// src/app/actions/tripItems.ts
- addItemToTrip(tripId, itemType, itemId, day, notes)
- removeItemFromTrip(itemId)
- reorderTripItems(tripId, items)
- updateTripItem(itemId, data)
```

---

## Design System

### Colors
- Primary: Gray 900 (mature, clean)
- Accent: Blue 600
- Success: Green 600
- Background: White / Gray 50

### Components
- Cards: Clean white cards with subtle shadows
- Buttons: Solid fills, no gradients
- Typography: Inter font, clear hierarchy
- Icons: Minimal, monochrome
- Spacing: Generous whitespace

### Pinterest-Style Grid
```css
.trip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.trip-card {
  aspect-ratio: 3/4;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.trip-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  transform: translateY(-4px);
}
```

---

## Success Metrics

- [ ] Users can create trips in < 30 seconds
- [ ] Adding items to trip is 1-click from any page
- [ ] Share link works without requiring login
- [ ] Mobile experience is smooth
- [ ] Collaborative editing works without conflicts

---

## Future Enhancements (Post-Sprint 10)

1. **AI Trip Suggestions**: "Generate a 3-day itinerary"
2. **Budget Tracking**: Sum up costs from activities
3. **Weather Integration**: Show forecast for trip dates
4. **Reservation Links**: Direct booking from trip
5. **Print View**: Beautiful PDF export
6. **Trip Templates**: "Romantic Weekend", "Family Fun", etc.
7. **Social Features**: Like/comment on public trips
8. **Trip Stats**: Distance traveled, money saved, etc.

---

## Technical Stack

- **Frontend**: React Server Components + Client Components
- **Database**: Airtable (Trips + TripItems tables)
- **Auth**: NextAuth (existing)
- **Drag & Drop**: `@dnd-kit/core`
- **Share Links**: UUID tokens
- **Toast**: `sonner` or `react-hot-toast`

---

## Timeline
- **Phase 1 (Infrastructure)**: 2-3 hours
- **Phase 2 (UI Components)**: 3-4 hours
- **Phase 3 (Sharing)**: 2-3 hours
- **Total**: 7-10 hours

---

## Start Now!

Let's build Phase 1 first: Database setup + basic CRUD operations.

