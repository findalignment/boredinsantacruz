# 📊 Project Summary: Bored in Santa Cruz

**Last Updated**: October 2025  
**Status**: 🟢 Production Ready (Sprint 10 Active)

## 🎯 Overview

A comprehensive Santa Cruz activity guide featuring:
- AI-powered recommendations
- Weather-aware activity ranking
- Trip planning with drag-and-drop
- Restaurant directory with real-time hours
- Interactive maps
- User reviews and favorites
- Tide predictions
- Event calendar

## 📈 Current Stats

- **Activities**: 95+ (imported from Google Places)
- **Restaurants**: 108+ (imported from Google Places)
- **Beaches**: 10 with parking info
- **Pages**: 25+ unique pages
- **Users**: Authentication enabled (Google OAuth + Magic Link)

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: React Server Components + Client Components

### Backend
- **Database**: Airtable (7 tables)
- **Auth**: NextAuth.js v5
- **APIs**: 
  - OpenWeather (weather data)
  - NOAA (tide predictions)
  - OpenAI (AI chatbot)
  - Google Places (data import)
  - Mapbox (maps)

### Infrastructure
- **Hosting**: Vercel
- **Caching**: Vercel KV (Redis) - optional
- **Email**: Resend (Magic Link)
- **CDN**: Vercel Edge Network

## 🗄️ Database Schema (Airtable)

### Tables
1. **RainyActivities** (95 records)
   - Activities for any weather
   - Indoor/outdoor classification
   - Weather suitability scoring
   - Parking, hours, cost info

2. **SunnyActivities** (33 records)
   - Outdoor activities for sunny days
   - Beaches with parking details
   - Seasonal recommendations

3. **Restaurants** (108 records)
   - Full directory with hours
   - Cuisine, price, features
   - Open now status
   - Reviews integration

4. **Favorites** (user-generated)
   - User email + item reference
   - Activity or Restaurant type

5. **Reviews** (user-generated)
   - Star ratings (1-5)
   - Text reviews
   - Public and private notes

6. **Trips** (user-generated)
   - Trip name, description, dates
   - Owner + collaborators
   - Public/private toggle
   - Share tokens

7. **TripItems** (user-generated)
   - Items saved to trips
   - Day-by-day organization
   - Drag-and-drop ordering
   - Personal notes

## 🎨 Key Features by Area

### Discovery
- **AI Chatbot**: Natural language queries → recommendations
- **Weather-Based**: 12 weather categories with scoring
- **Search**: Fuzzy search with filters (tags, cost, duration, indoor/outdoor)
- **Maps**: Interactive Mapbox maps with markers and popups
- **Events**: "Santa Cruz Tonight" page with recurring events
- **Secret Spots**: Curated hidden gems

### Planning
- **Date Picker**: See recommendations for any future date
- **Best Time to Visit**: Seasonal insights based on historical weather
- **Forecasts**: 7-day weather preview
- **Trip Planner**: Create, organize, share trips
  - Drag-and-drop reordering
  - Multi-day itineraries
  - Collaborative editing
  - Share via link (no login required)

### User Features
- **Authentication**: Google OAuth + Magic Link
- **Favorites**: Bookmark activities and restaurants
- **Reviews**: Rate and review with star ratings
- **Profile**: View favorites, reviews, and trips
- **Privacy**: Public vs. private reviews and trips

### Content
- **Activities**: 95+ imported from Google Places
- **Restaurants**: 108+ with real-time hours, cuisine, price
- **Beaches**: 10 beaches with detailed parking info
- **Tide Data**: Real-time NOAA tide predictions for tide pooling

## 🚀 Performance

- **Build Time**: ~5-8 seconds
- **First Load JS**: 102 KB (shared)
- **Largest Page**: /trips/[id] (133 KB)
- **Static Pages**: 7 prerendered
- **Dynamic Pages**: 18+ on-demand

## 🔐 Security

- **Auth**: NextAuth.js v5 with secure sessions
- **Environment Variables**: All secrets in .env.local
- **API Keys**: Server-side only (not exposed to client)
- **Permissions**: Owner/collaborator/public checks on all trips
- **CSRF**: Built-in Next.js protection
- **Content Security**: NSFW filtering in chatbot

## 📱 Mobile Experience

- **Responsive Design**: Mobile-first approach
- **Touch Optimized**: Large tap targets, swipe gestures
- **Performance**: Optimized images, lazy loading
- **PWA Ready**: Can be installed as app (future)

## 🎯 User Journey

### First-Time Visitor
1. Lands on homepage → sees AI chatbot
2. Asks "What should I do today?"
3. Gets 3-5 personalized recommendations
4. Clicks activity → sees full details + map
5. (Optional) Signs in to save to trip

### Returning User
1. Signs in via Google or Magic Link
2. Views profile with favorites
3. Creates a trip for upcoming visit
4. Adds activities/restaurants from any page
5. Organizes by day with drag-and-drop
6. Shares trip with travel companions
7. Exports itinerary (future: PDF)

### Mobile User
1. Opens site on phone while in Santa Cruz
2. Checks "What's open now" in restaurants
3. Uses map to find nearby activities
4. Checks tide times for tide pools
5. Saves favorites for later

## 📊 Sprint History

- **Sprint 1-2**: Weather integration + activity intelligence
- **Sprint 3**: UI components + homepage
- **Sprint 4-5**: Forecast + tide integration
- **Sprint 6**: Search, maps, events, secret map
- **Sprint 7**: AI chatbot, weather pages, auth, best time
- **Sprint 8**: Favorites system, Google Places import
- **Sprint 9**: Reviews, monetization setup, SEO, legal pages
- **Sprint 10**: Trip planner (current)

## 🔮 Roadmap

See `PRODUCT_ROADMAP.md` for detailed future plans.

**Near-term (Sprint 10-11)**:
- AI trip generator
- PDF export
- Trip templates
- Social features (like/comment)
- Cost estimation (hotels, etc.)

**Mid-term (Sprint 12-15)**:
- Real-time collaboration
- Mobile app (React Native)
- Push notifications
- Offline mode
- Advanced filters

**Long-term (Sprint 16+)**:
- Trip templates marketplace
- Local business partnerships
- Guided tours
- Booking integration
- Multi-city expansion

## 📁 File Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── [pages]/           # Page components
├── components/            # React components
│   ├── layout/           # Header, footer
│   ├── auth/             # Auth components
│   ├── trips/            # Trip planner
│   ├── chatbot/          # AI chat
│   └── [features]/       # Feature-specific
├── lib/                  # Utilities
│   ├── weather/         # Weather logic
│   ├── tides/           # Tide logic
│   ├── auth/            # Auth config
│   └── [utils]/         # Helpers
└── types/               # TypeScript types
```

## 🎓 Learning Resources

- **Next.js 15 Docs**: https://nextjs.org/docs
- **Airtable API**: https://airtable.com/developers/web/api/introduction
- **OpenWeather API**: https://openweathermap.org/api
- **NextAuth.js**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🐛 Known Issues

None currently! Report issues as they arise.

## 📞 Support

For questions or issues:
1. Check documentation in `/docs`
2. Review environment variable setup
3. Ensure all API keys are valid
4. Check Vercel deployment logs

---

**Status**: 🟢 Production Ready | **Sprint**: 10 | **Next Deploy**: Continuous
