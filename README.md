# Bored in Santa Cruz

Your ultimate guide to Santa Cruz activities, powered by AI and real-time weather data.

## What It Does

Bored in Santa Cruz helps you discover the perfect things to do in Santa Cruz County based on current weather conditions, your preferences, time of day, real-time tide predictions, and restaurant availability.

## Features

Core Features:
- AI-Powered Chatbot - Ask "What should I do today?" and get personalized suggestions
- Weather-Aware Recommendations - Activities ranked by current conditions
- Date-Based Planning - See what's best for any future date
- Tide Integration - Perfect timing for tide pooling and coastal activities
- Interactive Maps - Explore activities on a map with filters
- Save Favorites - Bookmark your favorite spots (requires login)
- Reviews & Ratings - Rate and review activities

Trip Planning:
- Create Trips - Plan your Santa Cruz visit with custom itineraries
- Drag-and-Drop - Organize activities by day
- Collaborative - Share trips with friends and family
- Share Links - Send read-only trip views
- Save from Anywhere - Add activities and restaurants to trips in 1 click

Discovery:
- Restaurant Directory - Hundreds of restaurants with hours, menus, and reviews
- Master Activities Table - Unified system with 50+ fields per activity
- Beach Guide - All beaches with parking information
- Events - What's happening tonight via Eventbrite integration
- Weather Pages - Activities filtered by condition (sunny, rainy, foggy)
- Wellness Directory - Fitness, yoga, massage, and wellness facilities
- Deals Page - Happy hours and special offers

## Tech Stack

- Frontend: Next.js 15 (App Router, React Server Components)
- Styling: Tailwind CSS with custom design system
- Database: Airtable (unified Activities table + specialized tables)
- Auth: NextAuth.js v5 (Google OAuth + Magic Link via Resend)
- AI: OpenAI GPT-4 Turbo with RAG (Retrieval Augmented Generation)
- Weather: OpenWeather API with 12 weather categories
- Tides: NOAA Tides & Currents API
- Maps: Mapbox GL JS with custom markers
- Search: Fuse.js for fuzzy search
- Events: Eventbrite API integration
- Deployment: Vercel with Edge Runtime

## Getting Started

Prerequisites:
- Node.js 18 or higher
- npm or yarn
- Airtable account
- OpenWeather API key
- OpenAI API key (for chatbot)
- Mapbox access token (for maps)

Environment Variables:

Create a .env.local file in the root directory:

```
AIRTABLE_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_ACTIVITIES_TABLE=Activities
AIRTABLE_RAINY_TABLE=RainyActivities
AIRTABLE_RESTAURANTS_TABLE=Restaurants
AIRTABLE_SUNNY_TABLE=SunnyActivities
AIRTABLE_WELLNESS_TABLE=Wellness
AIRTABLE_DEALS_TABLE=Deals
AIRTABLE_FAVORITES_TABLE=Favorites
AIRTABLE_REVIEWS_TABLE=Reviews
AIRTABLE_TRIPS_TABLE=Trips
AIRTABLE_TRIP_ITEMS_TABLE=TripItems

OPENWEATHER_API_KEY=your_key
OPENAI_API_KEY=your_key

NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token
MAPBOX_ACCESS_TOKEN=your_token

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

RESEND_API_KEY=your_key
EMAIL_FROM=noreply@yourdomain.com

EVENTBRITE_API_KEY=your_key

GOOGLE_PLACES_API_KEY=your_key

KV_REST_API_URL=your_url (optional)
KV_REST_API_TOKEN=your_token (optional)
```

Installation:

```
npm install
npm run dev
```

Visit http://localhost:3000

Build for production:

```
npm run build
npm start
```

## Airtable Setup

See MASTER_ACTIVITIES_IMPORT_GUIDE.md for detailed setup instructions.

Quick Start:
1. Create an Airtable base
2. Import the master-activities-import.csv to create Activities table
3. Create additional tables: Restaurants, Wellness, Deals, Favorites, Reviews, Trips, TripItems
4. See ACTIVITIES_MASTER_TABLE_FIELDS.md for all 60 field specifications
5. Add table names to .env.local

The new Activities table is a unified system that replaces separate rainy/sunny tables with smart filtering by weather, category, indoor/outdoor, cost, and more.

## Key Pages

Public Pages:
- / - Homepage with AI chatbot
- /activities - All activities with filters
- /activities/[date] - Date-specific recommendations
- /sunny - Sunny day activities (filtered from master table)
- /rainy - Rainy day activities (filtered from master table)
- /weather/[type] - Weather-specific activity pages
- /restaurants - Restaurant directory with filters
- /restaurants/map - Restaurant map view
- /wellness - Wellness facilities directory
- /deals - Happy hours and deals
- /map - Interactive activity map
- /events - Events calendar (Eventbrite integration)
- /tonight - Events happening tonight
- /best-time - Best time to visit Santa Cruz guide
- /activity/[id] - Activity detail pages with reviews
- /restaurant/[id] - Restaurant detail pages with reviews
- /wellness/[id] - Wellness facility detail pages

SEO Pages (30 landing pages):
- /best-rainy-day-activities
- /best-beaches
- /best-hiking-trails
- /best-restaurants
- And 26 more optimized pages

User Pages (requires login):
- /login - Authentication (Google OAuth or Magic Link)
- /profile - User profile with favorites and reviews
- /favorites - Saved activities and restaurants
- /trips - Trip planner dashboard
- /trips/[id] - Individual trip details

## Project Status

Current Phase: Master Activities Migration Complete
Status: Production Ready

Completed:
- Master Activities table with 50+ fields per activity
- Weather integration with 12 nuanced categories
- Activity scoring algorithm (0-100 based on weather)
- Recommendation engine with 5 tiers
- Search functionality with fuzzy search
- Map integration with Mapbox
- Events integration with Eventbrite
- Restaurant directory with 100+ restaurants
- Wellness directory with fitness, yoga, massage facilities
- Deals page for happy hours
- AI chatbot with RAG for context-aware responses
- Authentication with Google OAuth and Magic Link
- Favorites system (save activities, restaurants, wellness)
- Reviews and ratings (1-5 stars)
- Trip planner with drag-and-drop organization
- Share trips with read-only links
- Tide integration for coastal activities
- 30 SEO landing pages
- Mobile-responsive design
- Security hardening (rate limiting, XSS protection, CSP headers)

## Architecture Highlights

Master Activities Table:
- Unified table replaces separate rainy/sunny/activities tables
- 50+ fields including weather preferences, tide info, practical details
- Smart filtering by weather, category, indoor/outdoor, cost, kid-friendly
- Backwards compatible with legacy tables
- Scalable to thousands of activities

Weather System:
- 12 weather categories (sunny, partly cloudy, foggy, rainy, etc.)
- Real-time weather data from OpenWeather API
- Activity scoring based on temperature, precipitation, wind, visibility
- Caching with optional Vercel KV Redis

Content Management:
- Description field for cards (50-150 words)
- WriteUp field for detail pages (300-800 words)
- Separate editorial content for storytelling
- Easy to maintain in Airtable

Security:
- NextAuth.js v5 with Google OAuth and Magic Link
- Protected routes with middleware
- Rate limiting with Upstash Redis
- Input validation with Zod
- XSS protection with custom sanitization
- Security headers (CSP, HSTS, etc.)

## Import Scripts

Located in scripts/ directory:

- import-master-activities.js - Import activities from Google Places API
- import-google-places.js - General Google Places import (wellness, restaurants)

Usage:

```
node scripts/import-master-activities.js
```

Generates master-activities-import.csv with 50+ fields populated from Google Places.

## Documentation

Complete guides in the root directory:

- MIGRATION_COMPLETE.md - Master Activities migration guide
- MASTER_ACTIVITIES_IMPORT_GUIDE.md - How to import activities
- ACTIVITIES_MASTER_TABLE_FIELDS.md - All 60 field specifications
- CONTENT_MANAGEMENT_GUIDE.md - How to write great content
- QUICK_CONTENT_GUIDE.md - 5-minute content quick start
- NEXTAUTH_COMPLETE_GUIDE.md - Authentication setup
- AIRTABLE_TABLE_IDS_GUIDE.md - Airtable configuration
- DEPLOYMENT.md - Vercel deployment guide

## Contributing

This is a personal project, but suggestions and feedback are welcome! Open an issue or reach out.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Weather data from OpenWeather
- Tide data from NOAA Tides & Currents API
- Activity and restaurant data from Google Places API
- Events data from Eventbrite API
- Maps powered by Mapbox
- AI chatbot powered by OpenAI GPT-4 Turbo

---

Built with love for Santa Cruz, CA

Visit: boredinsantacruz.com
