# 🌤️ Weather Integration Plan for Bored in Santa Cruz

## Overview
Transform the site from static weather categories (rainy/sunny) to a dynamic, weather-aware platform that can make intelligent recommendations based on actual weather conditions for any given date.

---

## 🎯 Goals

1. **Know the weather** for any date (past, present, future)
2. **Smart recommendations** based on actual conditions
3. **Seamless UX** that feels magical to users
4. **SEO benefits** from weather-specific pages
5. **Future-proof architecture** for advanced features

---

## 📊 Phase 1: Weather Data Foundation

### 1.1 Weather API Selection

**Recommended: OpenWeather One Call API 3.0**
- ✅ Historical data (past 40 years)
- ✅ Current weather
- ✅ 7-day forecast
- ✅ Hourly forecasts
- ✅ Free tier: 1,000 calls/day
- ✅ Paid tier: $0.0012 per call (reasonable for scaling)

**Alternative: Visual Crossing Weather API**
- Better historical data (unlimited past dates)
- More expensive but more comprehensive
- Better for data analysis

**Location:**
- Santa Cruz, CA coordinates: `36.9741, -122.0308`

### 1.2 Weather Data Structure

```typescript
interface WeatherData {
  date: string; // ISO date
  location: string; // "Santa Cruz, CA"
  
  // Current/Observed conditions
  temp: number; // Fahrenheit
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number; // percentage
  
  // Conditions
  condition: string; // "Clear", "Rain", "Cloudy", "Fog", etc.
  conditionCode: number; // Standardized code
  description: string; // "light rain", "heavy fog"
  
  // Precipitation
  precipitation: number; // inches
  precipProbability: number; // percentage
  
  // Wind
  windSpeed: number; // mph
  windGust?: number;
  
  // Other
  uvIndex: number;
  visibility: number; // miles
  cloudCover: number; // percentage
  
  // Metadata
  isHistorical: boolean;
  isForecast: boolean;
  confidence?: number; // For forecasts
  lastUpdated: string; // ISO timestamp
}
```

### 1.3 Weather Caching Strategy

**Database Options:**

**Option A: Extend Airtable** (Quick Start)
- Create a new `WeatherCache` table
- Fields: Date, Temperature, Condition, RawData (JSON), CachedAt
- Pros: No new infrastructure, easy to implement
- Cons: Not optimized for time-series data

**Option B: Vercel KV (Redis)** (Recommended)
- Key-value store for fast lookups
- Perfect for caching weather data
- Built into Vercel ecosystem
- Key pattern: `weather:santacruz:2025-10-14`
- TTL: 6 hours for forecasts, 30 days for historical
- Pros: Fast, scalable, built for caching
- Cons: Adds complexity

**Option C: Supabase** (Advanced)
- Postgres database with real-time subscriptions
- Best for advanced features (user preferences, analytics)
- More setup required
- Pros: Full database capabilities, great for growth
- Cons: Overkill for MVP

**Recommended Starting Point: Vercel KV**

---

## 🧠 Phase 2: Weather Intelligence Layer

### 2.1 Weather Categorization System

Go beyond "rainy" vs "sunny" with nuanced categories:

```typescript
enum WeatherCategory {
  PERFECT_SUNNY = "perfect_sunny",      // 65-75°F, clear, low wind
  HOT_SUNNY = "hot_sunny",               // 75°F+, clear
  COOL_SUNNY = "cool_sunny",             // 55-65°F, clear
  PARTLY_CLOUDY = "partly_cloudy",       // Some clouds, no rain
  OVERCAST = "overcast",                 // Fully cloudy, no rain
  LIGHT_RAIN = "light_rain",             // Drizzle, <0.1in/hr
  RAINY = "rainy",                       // Moderate rain
  HEAVY_RAIN = "heavy_rain",             // Heavy rain
  FOGGY = "foggy",                       // Low visibility
  WINDY = "windy",                       // High winds
  COLD = "cold",                         // <50°F
}
```

### 2.2 Activity Matching Logic

**Expand Activity Types:**

Current Airtable schema needs new fields:
- `WeatherCategories` (Multiple select): Which weather conditions suit this activity
- `MinTemp` (Number): Minimum comfortable temperature
- `MaxTemp` (Number): Maximum comfortable temperature
- `IndoorOutdoor` (Select): "Indoor", "Outdoor", "Mixed", "Covered"
- `RainOk` (Checkbox): Can do in rain
- `WindSensitive` (Checkbox): Avoid in high winds
- `ScoreBoost` (Number): Multiplier for certain conditions

**Scoring Algorithm:**

```typescript
function scoreActivity(
  activity: Activity,
  weather: WeatherData,
  userPreferences?: UserPreferences
): number {
  let score = 100; // Base score
  
  // Temperature match
  if (weather.temp < activity.minTemp || weather.temp > activity.maxTemp) {
    score -= 30;
  }
  
  // Indoor/outdoor matching
  if (activity.indoorOutdoor === "outdoor" && weather.precipitation > 0) {
    score -= weather.precipitation * 50; // Reduce score proportionally
  }
  
  // Weather category match
  if (activity.weatherCategories.includes(weather.category)) {
    score += 20;
  }
  
  // Wind sensitivity
  if (activity.windSensitive && weather.windSpeed > 15) {
    score -= 25;
  }
  
  // Visibility (for scenic activities)
  if (activity.tags.includes("scenic") && weather.visibility < 5) {
    score -= 30;
  }
  
  // Apply manual boost
  score *= (activity.scoreBoost || 1);
  
  return Math.max(0, Math.min(100, score));
}
```

### 2.3 Smart Recommendation Engine

```typescript
async function getWeatherBasedRecommendations(
  date: Date,
  options?: {
    limit?: number;
    minScore?: number;
    categories?: string[];
  }
): Promise<{
  weather: WeatherData;
  recommendations: ScoredActivity[];
  insights: string[];
}> {
  // 1. Get weather for date
  const weather = await getWeatherForDate(date);
  
  // 2. Get all activities
  const activities = await getAllActivities();
  
  // 3. Score each activity
  const scored = activities.map(activity => ({
    ...activity,
    score: scoreActivity(activity, weather),
  }));
  
  // 4. Sort and filter
  const recommendations = scored
    .filter(a => a.score >= (options?.minScore || 50))
    .sort((a, b) => b.score - a.score)
    .slice(0, options?.limit || 20);
  
  // 5. Generate insights
  const insights = generateInsights(weather, recommendations);
  
  return { weather, recommendations, insights };
}
```

---

## 🎨 Phase 3: User Experience Design

### 3.1 Dynamic Homepage

Replace static "Rainy" / "Sunny" buttons with:

**Option A: Today's Weather Hero**
```
🌤️ It's 68°F and Partly Cloudy Today
Perfect for: Beach Walks • Outdoor Dining • Casual Hiking

[See Today's Best Activities]
```

**Option B: Date Picker Approach**
```
When are you visiting Santa Cruz?
[Date Picker: Defaults to today]

[Show Me What To Do]
```

**Option C: Hybrid** (Recommended)
```
☀️ Today in Santa Cruz: Perfect Beach Weather
68°F • Sunny • Light Breeze

[Today's Activities] [Plan Another Day]
```

### 3.2 Weather-Aware Activity Pages

**URL Structure:**
- `/activities` - All activities, intelligently sorted by today's weather
- `/activities/2025-10-15` - Activities for specific date
- `/activities?weather=rainy` - Filter by weather type (legacy support)

**Page Layout:**
```
┌─────────────────────────────────────────┐
│ 🌤️ Wednesday, October 15, 2025          │
│ 72°F • Partly Cloudy • Perfect Beach Day│
│ [Change Date]                            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 💡 Weather Insights                      │
│ • Perfect temperature for outdoor dining │
│ • Great visibility for scenic drives     │
│ • Beach conditions: Excellent            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🎯 Perfect For Today (98% Match)        │
│ [Activity Cards...]                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ✅ Also Great (85-97% Match)            │
│ [Activity Cards...]                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🤔 Weather Dependent (50-84% Match)     │
│ [Activity Cards with weather notes...]   │
└─────────────────────────────────────────┘
```

### 3.3 Activity Cards Enhancement

Add weather compatibility indicator:
```
┌────────────────────────────────┐
│ 🎨 Santa Cruz Museum of Art    │
│                                 │
│ ☔ 95% Match • Perfect for Rain│
│ 💰 $15 • ⏱️ 2-3 hours          │
│                                 │
│ [View Details]                  │
└────────────────────────────────┘
```

---

## 🔮 Phase 4: Advanced Features

### 4.1 Weekly Forecast View

```
Your Week in Santa Cruz

Mon 10/14  ☀️  72°F  →  Beach Day!
Tue 10/15  ⛅  68°F  →  Outdoor Dining
Wed 10/16  🌧️  60°F  →  Museum Day
Thu 10/17  🌧️  58°F  →  Cozy Cafes
Fri 10/18  ⛅  65°F  →  Light Hiking
Sat 10/19  ☀️  70°F  →  Beach & Boardwalk
Sun 10/20  ☀️  73°F  →  Full Outdoor Day

[Get Detailed Recommendations]
```

### 4.2 "Best Time to Visit" Feature

For each activity, show:
```
🎯 Natural Bridges Beach

Best visited:
☀️ Summer afternoons (Jun-Aug)
🌅 Sunset year-round
🦅 Monarch season (Oct-Feb)

Weather History:
• Typically sunny 250 days/year
• Fog common in summer mornings
• Average temp: 60-70°F

Next perfect day: Tomorrow, Oct 15
```

### 4.3 Alerts & Notifications

- "Tomorrow is a perfect beach day!" (if user opted in)
- "Heads up: Rain expected this weekend, here are indoor options"
- "The fog is lifting - time for that scenic drive!"

### 4.4 Trip Planning Mode

```
Planning a trip to Santa Cruz?

Dates: Oct 20-24, 2025

Forecast Summary:
• 3 sunny days
• 2 partly cloudy days
• No rain expected

We've created a custom itinerary based on the weather:

Day 1 (Sat, Oct 20): ☀️ Beach & Boardwalk Day
Day 2 (Sun, Oct 21): ☀️ Hiking & Scenic Drives
Day 3 (Mon, Oct 22): ⛅ Downtown & Cafes
Day 4 (Tue, Oct 23): ☀️ Water Activities
Day 5 (Wed, Oct 24): ⛅ Museums & Shopping

[View Full Itinerary]
```

---

## 🛠️ Implementation Roadmap

### Sprint 1: Foundation (Week 1-2)
- [ ] Set up OpenWeather API account
- [ ] Create weather fetching service
- [ ] Implement Vercel KV for caching
- [ ] Create weather data types
- [ ] Build basic weather categorization logic
- [ ] Write unit tests

### Sprint 2: Data Layer (Week 3-4)
- [ ] Extend Airtable schema for weather metadata
- [ ] Update all existing activities with weather attributes
- [ ] Create activity scoring algorithm
- [ ] Build recommendation engine
- [ ] Add comprehensive logging

### Sprint 3: Basic UX (Week 5-6)
- [ ] Update homepage with current weather
- [ ] Create `/activities` dynamic page
- [ ] Add weather display component
- [ ] Implement date picker
- [ ] Add weather insights generator
- [ ] Deploy and test

### Sprint 4: Enhanced Features (Week 7-8)
- [ ] Add weekly forecast view
- [ ] Implement weather-based filtering
- [ ] Add "best time to visit" for activities
- [ ] Create weather compatibility badges
- [ ] SEO optimization for weather pages
- [ ] Analytics implementation

### Sprint 5: Advanced Features (Week 9-10)
- [ ] Trip planning mode
- [ ] Historical weather analysis
- [ ] Email alerts (optional)
- [ ] Mobile app considerations
- [ ] Performance optimization
- [ ] A/B testing framework

---

## 📈 Success Metrics

### Key Performance Indicators
1. **Accuracy**: Weather predictions vs actual (for forecasts)
2. **Engagement**: Time on site increases
3. **Conversion**: More activity clicks/bookings
4. **SEO**: Ranking for "things to do Santa Cruz [date/weather]"
5. **User Satisfaction**: Feedback on recommendations

### Technical Metrics
1. **API Costs**: Stay under $50/month initially
2. **Cache Hit Rate**: >80% for weather lookups
3. **Page Load Time**: <2s for activity pages
4. **Error Rate**: <1% for weather fetching

---

## 💰 Cost Estimation

### Monthly Costs (at scale)
- **OpenWeather API**: $40-100/month (depending on traffic)
- **Vercel KV**: $10/month (included in Pro plan)
- **Vercel Hosting**: $20/month (Pro plan)
- **Total**: ~$70-130/month

### Development Time
- **MVP (Sprints 1-3)**: 6 weeks
- **Full Feature Set (Sprints 1-5)**: 10 weeks

---

## 🚨 Risks & Mitigations

### Risk 1: Weather API Reliability
- **Mitigation**: Implement fallback APIs, graceful degradation
- **Fallback UI**: Show manual weather categories if API fails

### Risk 2: Inaccurate Forecasts
- **Mitigation**: Show confidence levels, update dynamically
- **User Education**: "Forecasts are approximate, check closer to date"

### Risk 3: Activity Categorization Complexity
- **Mitigation**: Start simple, iterate based on data
- **Manual Override**: Allow admin to adjust scores

### Risk 4: API Cost Overruns
- **Mitigation**: Aggressive caching, rate limiting
- **Monitoring**: Set up billing alerts

---

## 🔧 Technical Architecture

```
┌─────────────────────────────────────────────┐
│           User Browser                       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Next.js App Router                   │
│  ┌─────────────────────────────────────┐   │
│  │  /activities/[date]/page.tsx        │   │
│  │  - Server Component                  │   │
│  │  - Fetches weather + activities      │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      Server Actions / API Routes             │
│  ┌─────────────────────────────────────┐   │
│  │  getWeatherForDate(date)            │   │
│  │  getRecommendations(date, prefs)    │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
            ↓                    ↓
┌──────────────────┐    ┌──────────────────┐
│   Vercel KV      │    │   Airtable       │
│   (Weather Cache)│    │   (Activities)   │
└──────────────────┘    └──────────────────┘
            ↓
┌──────────────────┐
│ OpenWeather API  │
└──────────────────┘
```

### File Structure
```
src/
├── lib/
│   ├── weather/
│   │   ├── api.ts              # OpenWeather API client
│   │   ├── cache.ts            # KV cache layer
│   │   ├── categorizer.ts      # Weather categorization
│   │   └── types.ts            # Weather types
│   ├── recommendations/
│   │   ├── scorer.ts           # Activity scoring
│   │   ├── engine.ts           # Recommendation engine
│   │   └── insights.ts         # Insight generation
│   └── airtable.ts             # Existing
├── app/
│   ├── actions/
│   │   ├── getActivities.ts    # Enhanced with weather
│   │   └── getWeather.ts       # New
│   ├── activities/
│   │   ├── page.tsx            # Today's activities
│   │   └── [date]/
│   │       └── page.tsx        # Date-specific
│   └── api/
│       └── weather/
│           └── route.ts        # API endpoint
└── components/
    ├── weather/
    │   ├── weather-display.tsx
    │   ├── date-picker.tsx
    │   ├── forecast-widget.tsx
    │   └── weather-insights.tsx
    └── activity-card.tsx       # Enhanced
```

---

## 🎓 Learning Resources

- [OpenWeather API Docs](https://openweathermap.org/api)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Recommendation System Basics](https://en.wikipedia.org/wiki/Recommender_system)

---

## 📝 Next Steps

1. **Review this plan** with stakeholders
2. **Choose APIs** (OpenWeather vs alternatives)
3. **Set up development environment** (API keys, KV)
4. **Start Sprint 1** implementation
5. **Create test data** in Airtable with weather attributes

---

**Questions to Answer Before Starting:**

1. What's the budget for APIs and hosting?
2. Do we want historical data for "best time to visit" analysis?
3. Should we support multiple locations beyond Santa Cruz?
4. Do we want user accounts for personalized recommendations?
5. Priority: Speed to market vs feature completeness?

---

*Last Updated: October 14, 2025*

