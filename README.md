# 🌊 Bored in Santa Cruz

Your ultimate guide to discovering activities, venues, and experiences in Santa Cruz, California — rain or shine!

## Features

- 🌤️ **Weather-Aware Recommendations** - Smart activity suggestions based on real-time weather
- 🌧️ **Rainy Day Activities** - Indoor activities, cozy cafes, museums, and more
- ☀️ **Sunny Day Activities** - Beach days, hiking trails, outdoor dining (coming soon)
- 🔍 **Advanced Filtering** - Filter by tags, cost, duration, and indoor/outdoor
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Modern** - Built with Next.js 15 and React Server Components
- 🎨 **Beautiful UI** - Tailwind CSS with smooth animations
- 🗓️ **7-Day Forecast** - Plan your Santa Cruz activities based on upcoming weather

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Airtable
- **Weather API:** OpenWeather
- **Cache:** Vercel KV (Redis)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Airtable account with API access
- An OpenWeather API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/boredinsantacruz.git
cd boredinsantacruz
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# Airtable
AIRTABLE_TOKEN=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_RAINY_TABLE=RainyActivities

# OpenWeather (get free key at openweathermap.org)
OPENWEATHER_API_KEY=your_openweather_api_key
```

See `ENV_SETUP.md` for detailed setup instructions.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. (Optional) Test weather integration: [http://localhost:3000/api/weather/test](http://localhost:3000/api/weather/test)

For detailed setup instructions, see `QUICK_START.md`.

## Airtable Setup

Your Airtable base should have a table called `RainyActivities` with the following fields:

- **Title** (Single line text) - Required
- **VenueName** (Single line text)
- **Tags** (Multiple select)
- **Cost** (Number)
- **Duration** (Single select or text)
- **Notes** (Long text)
- **Website** (URL)
- **Instagram** (URL)
- **Image** (Attachment)

### Getting Your Airtable Token

1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Give it a name (e.g., "Santa Cruz App")
4. Add scopes: `data.records:read`
5. Add access to your base
6. Click "Create token"
7. Copy the full token and add it to your `.env.local` file

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project" and import your repository

4. Add environment variables:
   - `AIRTABLE_TOKEN` - Your Airtable personal access token
   - `AIRTABLE_BASE_ID` - Your Airtable base ID
   - `AIRTABLE_RAINY_TABLE` - `RainyActivities`
   - `OPENWEATHER_API_KEY` - Your OpenWeather API key
   
5. (Optional) Set up Vercel KV for weather caching:
   - Go to Storage tab → Create Database → KV
   - Name it `weather-cache`
   - Vercel automatically adds the required env vars

6. Click "Deploy"

### Manual Deploy

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your environment variables when asked.

## Weather Integration

This site now features intelligent weather-aware recommendations! See these docs for details:

- 📘 **`WEATHER_INTEGRATION_PLAN.md`** - Complete strategy and roadmap
- ✅ **`SPRINT_1_COMPLETE.md`** - What's been implemented
- 🚀 **`QUICK_START.md`** - Get started with weather features
- ⚙️ **`ENV_SETUP.md`** - Environment setup guide

### Quick Test

After setup, visit `/api/weather/test` to verify the weather system is working.

## Project Structure

```
boredinsantacruz/
├── src/
│   ├── app/
│   │   ├── actions/          # Server actions
│   │   │   ├── getActivities.ts
│   │   │   └── getWeather.ts    # NEW: Weather actions
│   │   ├── api/
│   │   │   └── weather/         # NEW: Weather API routes
│   │   ├── rainy/           # Rainy day activities page
│   │   ├── layout.tsx       # Root layout with header/footer
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── layout/          # Header and Footer
│   │   ├── ui/              # Reusable UI components
│   │   ├── activity-card.tsx
│   │   ├── activity-filters.tsx
│   │   └── filtered-activities.tsx
│   ├── lib/
│   │   ├── airtable.ts      # Airtable connection
│   │   ├── logger.ts        # NEW: Logging utility
│   │   └── weather/         # NEW: Weather module
│   │       ├── api.ts       # OpenWeather API client
│   │       ├── cache.ts     # Vercel KV caching
│   │       ├── categorizer.ts  # Weather intelligence
│   │       ├── service.ts   # Main weather service
│   │       ├── types.ts     # Weather types
│   │       └── index.ts     # Barrel exports
│   └── types/
│       └── index.ts         # TypeScript types
├── public/                  # Static files
└── tailwind.config.ts       # Tailwind configuration
```

## Features Roadmap

### Phase 1: Foundation ✅
- [x] Rainy day activities with filtering
- [x] SEO optimization
- [x] Mobile responsive design
- [x] Weather API integration
- [x] Intelligent weather categorization
- [x] 7-day forecast support
- [x] Weather caching system

### Phase 2: In Progress 🚧
- [ ] Weather-based activity scoring
- [ ] Smart recommendations engine
- [ ] Date picker for planning
- [ ] Sunny day activities

### Phase 3: Coming Soon 🔮
- [ ] Santa Cruz Tonight (live events)
- [ ] The Secret Map (hidden gems)
- [ ] AI Concierge chatbot
- [ ] User submissions
- [ ] Newsletter integration
- [ ] Historical weather analysis

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

Have suggestions or want to add your venue? Email: hello@boredinsantacruz.com

---

Made with ❤️ for Santa Cruz locals and visitors

