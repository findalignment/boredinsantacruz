# 🎯 Product Vision: Bored in Santa Cruz

**Mission:** Be the smartest, most helpful guide for anyone planning time in Santa Cruz.

---

## 🌟 The Big Idea

**One platform that knows everything you need to plan the perfect Santa Cruz experience.**

Whether you're:
- 🏖️ A tourist planning a weekend trip
- 🏠 A local bored on a Saturday
- 👨‍👩‍👧‍👦 A family looking for activities
- 💑 A couple planning a date

**We've got you covered with AI-powered recommendations that actually help.**

---

## 🎭 Core Features

### 1. 🌤️ Weather & Tide Intelligence (✅ Weather Built - Sprint 1-3, 🚧 Tides - Sprint 5)
- Real-time + 7-day weather forecasts
- Smart weather categorization
- **Tide predictions & optimal tide times**
- **Sunrise/sunset times**
- Activity scoring based on conditions
- Weather + tide aware recommendations
- Perfect for tide pools, surfing, beach walks

### 2. 🎯 Activities Discovery (🚧 In Progress - Sprint 4)
- Browse by weather
- Browse by date
- Browse by type (indoor/outdoor/food/etc.)
- Detailed activity pages

### 3. ⭐ Review Aggregation (🔮 Future - Sprint 5+)
**The Game Changer:** AI-powered review synthesis
- Pull reviews from Google, Yelp, TripAdvisor, Facebook
- AI summarizes: "What people love" vs "Common complaints"
- Real-time sentiment analysis
- Photo aggregation from all sources
- "Recent updates" (menu changes, renovations, etc.)

### 4. 🤖 AI Trip Planning (🔮 Future - Sprint 6+)
**Smart Recommendations Based On:**
- Weather forecast for your dates
- Review scores and sentiment
- Your preferences (budget, pace, interests)
- Time optimization (proximity, hours)
- Crowd levels (busy times to avoid)

**AI Suggests:**
- Complete daily itineraries
- Backup plans if weather changes
- Where to park (free spots, best lots)
- Money-saving tips (happy hours, free days)
- Time-saving routes
- Local insider knowledge

### 5. 💰 Practical Intelligence (🔮 Future - Sprint 7+)
**Money Savers:**
- Free activities
- Happy hour times
- Discount days
- Local deals
- Alternative cheaper options

**Time Savers:**
- Best times to visit (avoid crowds)
- Parking strategies
- Efficient routes
- Quick bites vs sit-down
- "Skip the line" tips

**Parking Intel:**
- Free street parking spots
- Paid lot locations + prices
- Beach parking availability
- Event parking hacks
- Best spots for each activity

---

## 🎯 User Journeys

### Journey 1: Weekend Warrior (Local)
> "I'm bored this Saturday. What should I do?"

1. Lands on homepage
2. Sees today's weather: "Sunny, 75°F"
3. Gets AI recommendations: "Perfect day for beach activities!"
4. Browses top picks with review summaries
5. Clicks "West Cliff Drive" - sees reviews, parking tips, nearby food
6. Adds to their day plan
7. AI suggests: "After, check out the Boardwalk (10 min away) or grab sunset at Steamer Lane"

### Journey 2: Trip Planner (Tourist)
> "Planning a 3-day Santa Cruz trip next month"

1. Selects dates (Oct 25-27)
2. Sees 3-day forecast
3. AI generates suggested itinerary:
   - **Friday:** Outdoor adventures (sunny)
   - **Saturday:** Flexible options (partly cloudy)
   - **Sunday:** Indoor activities (rain likely)
4. Each day has:
   - Recommended activities
   - Review summaries
   - Parking/timing/budget tips
5. Can customize and save plan
6. Gets backup suggestions if weather changes

### Journey 3: Spontaneous Explorer
> "We're here now, what's open and good?"

1. "What's open now?" button
2. Filters by current weather
3. Shows only open venues with live reviews
4. AI highlights: "Seabright Brewery just opened, 4.8★, great for this weather"
5. Shows parking + walking directions
6. Suggests what to order (from reviews)

---

## 🏗️ Information Architecture

```
Homepage
├─ Today's Weather + Top Picks
├─ Browse by Date (date picker)
└─ Quick Links (Activities, Reviews, Plan a Trip)

/activities
├─ All Activities (filterable)
├─ By Category
└─ By Weather Suitability

/activities/[date]
├─ Weather for that date
├─ Recommended activities
└─ AI-generated daily plan

/reviews
├─ All Businesses
├─ By Category
└─ By Rating

/place/[id]
├─ AI Review Summary
├─ Aggregated reviews from all sources
├─ Photos from all platforms
├─ Weather recommendations
├─ Practical info (parking, hours, tips)
└─ Similar places

/plan
├─ AI Trip Planner
├─ Multi-day itineraries
├─ Customization options
└─ Save/share plans

/about
└─ How it works, contact, etc.
```

---

## 🤖 AI Features Roadmap

### Phase 1: Simple AI (Sprint 5-6)
- Review sentiment analysis
- Auto-categorization of activities
- Basic recommendation logic

### Phase 2: Smart AI (Sprint 7-8)
- Multi-source review synthesis
- Itinerary generation
- Personalized suggestions

### Phase 3: Advanced AI (Sprint 9+)
- Natural language queries: "Find me cheap tacos near the beach"
- Predictive recommendations
- Learning user preferences
- Real-time updates (traffic, crowds, weather changes)

---

## 💾 Data Sources

### Current:
- ✅ OpenWeather API (weather)
- ✅ Airtable (activities database)

### Next:
- 🚧 NOAA Tides & Currents API (tide predictions for Santa Cruz)

### Future:
- 🔮 Google Places API (reviews, photos, hours)
- 🔮 Yelp API (reviews, ratings)
- 🔮 TripAdvisor API (tourist reviews)
- 🔮 Meta API (Facebook/Instagram data)
- 🔮 ParkWhiz/SpotHero (parking data)
- 🔮 Google Maps (traffic, routes)
- 🔮 Santa Cruz Events Calendar (happenings)
- 🔮 Surfline API (surf conditions)

---

## 📊 Success Metrics

### MVP Launch (Sprint 4):
- 50+ activities listed
- Weather recommendations working
- Mobile-friendly
- 100+ weekly visitors

### V1 Launch (Sprint 6):
- 200+ businesses with reviews
- AI review summaries
- 1,000+ weekly visitors
- Average 3+ pages per visit

### V2 Launch (Sprint 8+):
- Full AI trip planner
- 5,000+ weekly visitors
- Users saving/sharing plans
- Local business partnerships

---

## 💰 Monetization Ideas (Future)

1. **Affiliate Links** - Earn commission on bookings
2. **Featured Listings** - Businesses pay for top placement
3. **Premium Features** - Advanced trip planning, offline access
4. **Local Ads** - Relevant, non-intrusive ads
5. **Partnerships** - Tourism board, hotels, etc.

---

## 🎨 Design Principles

1. **Weather First** - Always show weather context
2. **AI-Powered** - Use AI to save users time
3. **Honest Reviews** - Never hide negative feedback
4. **Practical** - Real tips that actually help
5. **Local Voice** - Sound like a knowledgeable friend
6. **Mobile-First** - Most users are on-the-go
7. **Fast** - No waiting around
8. **Beautiful** - Make planning enjoyable

---

## 🚀 Development Phases

### ✅ Sprint 1-3: Weather Foundation
- Weather API integration
- Activity recommendations
- Basic UI

### 🚧 Sprint 4: Polish & Content (Current)
- Date picker
- Real activities import
- UI polish

### 🔮 Sprint 5: Review Integration
- Google Places API setup
- Review scraping/aggregation
- Basic review display

### 🔮 Sprint 6: AI Review Synthesis
- OpenAI integration
- Review summarization
- Sentiment analysis

### 🔮 Sprint 7: Trip Planning
- Multi-day planner UI
- AI itinerary generation
- Save/share functionality

### 🔮 Sprint 8: Practical Intel
- Parking data integration
- Money/time saving tips
- Advanced routing

---

## 🎯 Current Focus (Sprint 4)

**Build the foundation before adding AI magic:**

1. ✅ Weather works great
2. 🚧 Date selection (in progress)
3. 🚧 Import 50+ activities
4. 🚧 Polish the UI
5. 🚧 Make it mobile-perfect

**Then we'll layer in the AI superpowers!**

---

*Vision Document*
*Created: October 14, 2025*
*"From weather widget to AI trip planner"*

