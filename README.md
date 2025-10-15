# 🌊 Bored in Santa Cruz

Your ultimate guide to Santa Cruz activities, powered by AI and real-time weather data.

## 🎯 What It Does

**Bored in Santa Cruz** helps you discover the perfect things to do in Santa Cruz County based on:
- Current weather conditions
- Your preferences and interests
- Time of day and season
- Real-time tide predictions
- Restaurant hours and availability

## ✨ Features

### Core Features
- 🤖 **AI-Powered Recommendations** - Ask "What should I do today?" and get personalized suggestions
- 🌦️ **Weather-Aware** - Activities ranked by current conditions
- 📅 **Date-Based Planning** - See what's best for any future date
- 🌊 **Tide Integration** - Perfect timing for tide pooling
- 🗺️ **Interactive Maps** - Explore activities on a map
- 📍 **Save Favorites** - Bookmark your favorite spots
- ⭐ **Reviews** - Rate and review activities

### Trip Planning
- 📌 **Create Trips** - Plan your Santa Cruz visit
- 🔀 **Drag-and-Drop** - Organize your itinerary by day
- 🤝 **Collaborative** - Share trips with friends/family
- 🔗 **Share Links** - Send read-only trip views
- 💾 **Save from Anywhere** - Add activities/restaurants to trips in 1 click

### Discovery
- 🍴 **Restaurant Directory** - 100+ restaurants with hours, menus, and reviews
- 🏖️ **Beach Guide** - All beaches with parking info
- 🎭 **Events** - What's happening tonight
- 🗺️ **Secret Map** - Hidden local gems
- 🌤️ **Weather Pages** - Activities filtered by condition (sunny, rainy, foggy)

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router, React Server Components)
- **Styling**: Tailwind CSS
- **Database**: Airtable
- **Auth**: NextAuth.js v5 (Google OAuth + Magic Link)
- **AI**: OpenAI GPT-4 Turbo
- **Weather**: OpenWeather API
- **Tides**: NOAA Tides & Currents API
- **Maps**: Mapbox GL JS
- **Search**: Fuse.js
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Airtable account
- OpenWeather API key
- OpenAI API key (for chatbot)

### Environment Variables

Create `.env.local`:

```bash
# Airtable
AIRTABLE_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_RAINY_TABLE=RainyActivities
AIRTABLE_RESTAURANTS_TABLE=Restaurants
AIRTABLE_SUNNY_TABLE=SunnyActivities
AIRTABLE_FAVORITES_TABLE=Favorites
AIRTABLE_REVIEWS_TABLE=Reviews
AIRTABLE_TRIPS_TABLE=Trips
AIRTABLE_TRIP_ITEMS_TABLE=TripItems

# Weather
OPENWEATHER_API_KEY=your_key

# AI Chatbot
OPENAI_API_KEY=your_key

# Maps
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
MAPBOX_ACCESS_TOKEN=your_token

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Email (Magic Link)
RESEND_API_KEY=your_key
EMAIL_FROM=noreply@yourdomain.com

# Optional: Vercel KV (caching)
KV_REST_API_URL=your_url
KV_REST_API_TOKEN=your_token

# Optional: Google Places (data import)
GOOGLE_PLACES_API_KEY=your_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## 📊 Airtable Setup

See `AIRTABLE_IMPORT_GUIDE.md` for detailed setup instructions.

**Quick Start:**
1. Create an Airtable base
2. Import CSVs:
   - `santacruz-activities-google.csv` → RainyActivities table
   - `santacruz-restaurants-google.csv` → Restaurants table
   - `santacruz-sunny-activities.csv` → SunnyActivities table
3. Create additional tables: Favorites, Reviews, Trips, TripItems (see schemas in docs)
4. Add table IDs to `.env.local`

## 🎨 Key Pages

- `/` - Homepage with AI chatbot
- `/activities` - All activities with filters
- `/activities/[date]` - Date-specific recommendations
- `/restaurants` - Restaurant directory
- `/restaurants/map` - Restaurant map view
- `/map` - Interactive activity map
- `/tonight` - Events happening tonight
- `/secret-map` - Hidden local spots
- `/sunny` - Sunny day activities
- `/rainy` - Rainy day activities
- `/weather/[type]` - Weather-specific pages
- `/trips` - Trip planner
- `/best-time` - Best time to visit Santa Cruz
- `/profile` - User profile with favorites
- `/login` - Authentication

## 📈 Project Status

**Current Sprint**: Sprint 10 - Trip Planner
**Status**: 🟢 Active Development

### Completed
- ✅ Weather integration with 12 categories
- ✅ Activity scoring algorithm
- ✅ Recommendation engine
- ✅ Search functionality
- ✅ Map integration
- ✅ Events pages
- ✅ Restaurant directory
- ✅ AI chatbot
- ✅ Authentication (Google OAuth + Magic Link)
- ✅ Favorites system
- ✅ Reviews & ratings
- ✅ Trip planner with drag-and-drop
- ✅ Share trips
- ✅ Tide integration

### In Progress
- 🔄 AI trip generator
- 🔄 PDF export
- 🔄 Trip templates
- 🔄 Social features (like/comment)

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Open an issue or reach out.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Weather data from OpenWeather
- Tide data from NOAA
- Restaurant/activity data from Google Places API
- Icons and design inspiration from various sources

---

Built with ❤️ for Santa Cruz, CA 🌊
