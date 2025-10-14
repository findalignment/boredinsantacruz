# 🚀 Sprint 7 Plan - Polish, Integration & Advanced Features

**Start Date:** October 14, 2025  
**Sprint Goal:** Polish the platform, integrate remaining features, optimize performance, and prepare for growth

---

## 🎯 Sprint Objectives

1. **Airtable Integration** - Connect restaurants & sunny activities
2. **Interactive Map** - Full Mapbox implementation with markers
3. **UI/UX Polish** - Enhance design, animations, mobile experience
4. **Performance Optimization** - Speed up load times, optimize images
5. **Advanced Features** - Enhance search, add filters, improve navigation

---

## 📋 Tasks Breakdown

### **A. Data Integration** (Priority: HIGH)

#### 1. Restaurants Airtable Integration
- [ ] Create Airtable `Restaurants` table (24 fields)
- [ ] Import `santacruz-restaurants-template.csv` (10 restaurants)
- [ ] Add 40+ more restaurants manually
- [ ] Create `src/app/actions/getRestaurants.ts` server action
- [ ] Update `/restaurants` page to fetch from Airtable
- [ ] Add restaurants to search index
- [ ] Test filtering and sorting

**Files to Create:**
- `src/app/actions/getRestaurants.ts`

**Files to Modify:**
- `src/app/restaurants/page.tsx`
- `src/app/actions/searchActivities.ts`
- `src/lib/airtable.ts` (add restaurants table)

---

#### 2. Sunny Activities Airtable Integration
- [ ] Create Airtable `SunnyActivities` table
- [ ] Import `santacruz-sunny-activities.csv` (30 activities)
- [ ] Create server action or reuse `getActivities.ts`
- [ ] Update `/sunny` page to fetch from Airtable
- [ ] Add sunny activities to search
- [ ] Weather-aware scoring for outdoor activities

**Files to Create/Modify:**
- `src/app/actions/getSunnyActivities.ts` (or extend getActivities)
- `src/app/sunny/page.tsx`
- `src/lib/airtable.ts` (add sunny activities table)

---

### **B. Interactive Map** (Priority: HIGH)

#### 3. Mapbox GL JS Integration
- [ ] Install mapbox-gl dependencies
- [ ] Create `MapboxMap` component
- [ ] Add activity markers (all activities)
- [ ] Implement marker clustering
- [ ] Add popup cards on marker click
- [ ] Style map with Santa Cruz theme
- [ ] Add controls (zoom, style toggle)

**Files to Create:**
- `src/components/map/mapbox-map.tsx`
- `src/components/map/activity-marker.tsx`
- `src/components/map/marker-popup.tsx`

**Files to Modify:**
- `src/app/map/page.tsx`

---

#### 4. Map Filters & Features
- [ ] Filter sidebar (cuisine, price, type, weather)
- [ ] "Near me" location button
- [ ] Search within map bounds
- [ ] Weather overlay toggle
- [ ] Route directions (Google Maps link)
- [ ] Save favorite locations

**Files to Create:**
- `src/components/map/map-filters.tsx`
- `src/components/map/map-controls.tsx`

---

### **C. UI/UX Polish** (Priority: MEDIUM)

#### 5. Design Enhancements
- [ ] Add loading skeletons everywhere
- [ ] Smooth page transitions
- [ ] Better error states
- [ ] Empty state designs
- [ ] Consistent spacing & typography
- [ ] Accessibility improvements (ARIA labels, focus states)

**Files to Modify:**
- All page components
- All card components
- `src/app/globals.css`

---

#### 6. Mobile Experience
- [ ] Hamburger menu for mobile nav
- [ ] Touch-friendly buttons (min 44px)
- [ ] Swipeable forecast cards
- [ ] Bottom sheet for mobile filters
- [ ] Optimize for small screens
- [ ] PWA manifest (installable app)

**Files to Create:**
- `src/components/layout/mobile-menu.tsx`
- `public/manifest.json`

---

#### 7. Animations & Micro-interactions
- [ ] Fade-in animations for cards
- [ ] Hover effects on all interactive elements
- [ ] Loading animations
- [ ] Success/error toasts
- [ ] Skeleton loading states
- [ ] Page transition animations

**Library to Add:**
- `framer-motion` (optional)

---

### **D. Performance Optimization** (Priority: MEDIUM)

#### 8. Speed Improvements
- [ ] Optimize images (WebP format, proper sizing)
- [ ] Lazy load below-the-fold content
- [ ] Code splitting (dynamic imports)
- [ ] Reduce bundle size
- [ ] Add service worker (offline support)
- [ ] Optimize fonts (preload, subset)

**Tools:**
- Next.js Image optimization
- Lighthouse audits
- Bundle analyzer

---

#### 9. SEO Enhancements
- [ ] Add JSON-LD structured data
- [ ] Optimize meta descriptions
- [ ] Add canonical URLs
- [ ] Create XML sitemap for all pages
- [ ] Add og:image for all pages
- [ ] Implement breadcrumbs

**Files to Modify:**
- All page metadata
- `src/app/sitemap.ts`

---

### **E. Advanced Features** (Priority: LOW)

#### 10. Enhanced Search
- [ ] Add restaurants to search
- [ ] Search history
- [ ] Popular searches
- [ ] Voice search (optional)
- [ ] Search filters in dialog
- [ ] Recent searches dropdown

**Files to Modify:**
- `src/components/search/activity-search.tsx`
- `src/app/actions/searchActivities.ts`

---

#### 11. User Preferences (Client-Side)
- [ ] Save favorite activities (localStorage)
- [ ] Remember filter preferences
- [ ] Dark mode toggle
- [ ] Temperature unit toggle (°F/°C)
- [ ] Notification preferences
- [ ] Recently viewed activities

**Files to Create:**
- `src/lib/storage.ts` (localStorage wrapper)
- `src/hooks/useLocalStorage.ts`
- `src/components/preferences-dialog.tsx`

---

#### 12. Social Features (Prep for Sprint 8)
- [ ] Share buttons (Twitter, Facebook, WhatsApp)
- [ ] "Add to calendar" for events
- [ ] Print-friendly activity pages
- [ ] QR codes for activities
- [ ] Email activity to friend

**Files to Create:**
- `src/components/share-button.tsx`

---

## 📊 Success Metrics

### Performance:
- [ ] Lighthouse score > 90 (Performance)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 200KB (gzipped)

### User Experience:
- [ ] All interactive elements have hover states
- [ ] No layout shift (CLS = 0)
- [ ] Mobile-friendly (responsive on all devices)
- [ ] Accessible (WCAG 2.1 AA)

### Data:
- [ ] 50+ restaurants in Airtable
- [ ] 30+ sunny activities in Airtable
- [ ] All activities have complete data
- [ ] No broken links or images

---

## 🔧 Technical Stack

### New Libraries (Potential):
- `mapbox-gl` - Interactive maps
- `framer-motion` - Animations (optional)
- `react-hot-toast` - Toast notifications
- `@headlessui/react` - Accessible UI components
- `clsx` / `tailwind-merge` - Class name utilities

### Existing:
- Next.js 15
- TypeScript
- Tailwind CSS
- Airtable
- OpenWeather API
- NOAA Tides API
- Vercel KV

---

## 🎨 Design Decisions

### Color Palette:
- **Sunny:** Yellow (#FBBF24) to Orange (#F97316)
- **Rainy:** Blue (#3B82F6) to Indigo (#6366F1)
- **Restaurants:** Orange (#F97316) to Red (#EF4444)
- **Events:** Purple (#A855F7) to Pink (#EC4899)
- **Map:** Green (#10B981) to Teal (#14B8A6)
- **Secret:** Dark Slate (#1E293B) to Purple (#7C3AED)

### Typography:
- Headings: Bold, large (2xl-5xl)
- Body: Regular, readable (base-lg)
- Labels: Semibold, small (xs-sm)

### Spacing:
- Cards: p-6, rounded-xl, shadow-lg
- Sections: py-12 to py-20
- Gaps: gap-4 to gap-8

---

## 📝 Priority Order

### Week 1 (This Sprint):
1. ✅ Sunny activities page (DONE)
2. 🔄 Airtable integration (restaurants + sunny)
3. 🔄 Interactive map (Mapbox)
4. 🔄 UI polish (animations, mobile nav)

### Week 2 (Next Sprint):
5. Performance optimization
6. Advanced search features
7. User preferences
8. Social features prep

---

## 🚀 Sprint 7 Deliverables

By end of Sprint 7, we should have:

✅ **Data:**
- 50+ restaurants in Airtable
- 30+ sunny activities in Airtable
- All connected to the app

✅ **Features:**
- Interactive map with markers
- Enhanced search (all activities)
- Mobile-friendly navigation
- Dark mode (optional)

✅ **Quality:**
- Lighthouse score > 90
- Fast load times
- Beautiful animations
- Accessible

✅ **Docs:**
- Updated README
- Sprint 7 completion doc
- Deployment guide updates

---

## 🎯 Success Criteria

Sprint 7 is complete when:
- [ ] All restaurants display from Airtable
- [ ] All sunny activities display from Airtable
- [ ] Interactive map works with markers
- [ ] Mobile navigation is polished
- [ ] All pages load < 3 seconds
- [ ] No console errors
- [ ] Deployed to production
- [ ] Lighthouse score > 90

---

**Let's build! 🚀**

