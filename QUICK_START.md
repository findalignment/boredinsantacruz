# 🚀 Quick Start Guide - Weather Integration

Get your weather-aware Santa Cruz site up and running in 5 minutes!

---

## ⚡ Quick Setup (Development)

### Step 1: Get OpenWeather API Key (2 minutes)

1. Visit https://openweathermap.org/api
2. Click "Sign Up" (it's free!)
3. Verify your email
4. Go to https://home.openweathermap.org/api_keys
5. Copy your API key

### Step 2: Create Environment File (30 seconds)

Create `.env.local` in the project root:

```bash
# Paste this and replace YOUR_KEY with your actual API key
OPENWEATHER_API_KEY=YOUR_KEY_HERE

# These are already configured from Airtable
AIRTABLE_TOKEN=your_existing_token
AIRTABLE_BASE_ID=your_existing_base_id
AIRTABLE_RAINY_TABLE=RainyActivities
```

### Step 3: Run the Development Server

```bash
npm run dev
```

### Step 4: Test It! (1 minute)

Open your browser and visit:

```
http://localhost:3000/api/weather/test
```

You should see a JSON response like:

```json
{
  "status": "All systems operational",
  "healthy": true,
  "timestamp": "2025-10-14T...",
  "checks": {
    "envVars": {
      "openWeatherKey": true,
      "kvConfigured": false
    },
    "currentWeather": {
      "success": true,
      "temp": 68,
      "condition": "Clear"
    },
    "forecast": {
      "success": true,
      "daysReturned": 3
    }
  }
}
```

✅ **If you see this, you're good to go!**

> **Note:** `kvConfigured: false` is OK for development. The app will work without Vercel KV, just without caching.

---

## 🧪 Testing Weather in Your Components

### Example 1: Get Current Weather

Create a test page at `src/app/weather-test/page.tsx`:

```typescript
import { getCurrentWeatherAction } from '@/app/actions/getWeather';

export default async function WeatherTestPage() {
  const result = await getCurrentWeatherAction();
  
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  const { weather, conditions, summary, recommendations } = result.data;
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {conditions.emoji} {conditions.displayName}
      </h1>
      
      <div className="space-y-4">
        <p className="text-xl">{summary}</p>
        
        <div className="bg-blue-50 p-4 rounded">
          <h2 className="font-bold">Weather Details</h2>
          <p>Temperature: {weather.temp}°F</p>
          <p>Feels Like: {weather.feelsLike}°F</p>
          <p>Condition: {weather.description}</p>
          <p>Wind: {weather.windSpeed} mph</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <h2 className="font-bold">Perfect For:</h2>
          <ul className="list-disc list-inside">
            {recommendations.perfect.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

Then visit: http://localhost:3000/weather-test

### Example 2: Get Weather Forecast

```typescript
import { getWeatherForecastAction } from '@/app/actions/getWeather';

export default async function ForecastPage() {
  const result = await getWeatherForecastAction(5); // 5 days
  
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">5-Day Forecast</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {result.data.map(({ weather, conditions, summary }) => (
          <div key={weather.date} className="bg-white p-4 rounded-lg shadow">
            <div className="text-4xl mb-2">{conditions.emoji}</div>
            <div className="font-bold">{weather.date}</div>
            <div className="text-2xl">{weather.temp}°F</div>
            <div className="text-sm text-gray-600">{conditions.displayName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🏭 Production Setup (Vercel)

### Step 1: Deploy to Vercel

```bash
# If not already done
vercel

# Follow the prompts
```

### Step 2: Add Environment Variables

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add:
   - `OPENWEATHER_API_KEY` = your API key
   - (Keep existing Airtable variables)

### Step 3: Set Up Vercel KV (Optional but Recommended)

1. In Vercel dashboard, go to Storage tab
2. Click "Create Database"
3. Choose "KV" (Redis)
4. Name it: `weather-cache`
5. Region: US West (closest to Santa Cruz)
6. Click "Create"
7. **That's it!** Vercel automatically adds the KV env vars

### Step 4: Redeploy

```bash
vercel --prod
```

### Step 5: Verify

Visit your production site at:
```
https://your-site.vercel.app/api/weather/test
```

You should see `kvConfigured: true` now!

---

## 📊 Monitoring

### Check Weather API Usage

1. Go to https://home.openweathermap.org/statistics
2. Monitor daily API calls
3. Free tier = 1,000 calls/day (plenty with caching!)

### Check Cache Performance

1. Go to Vercel dashboard → Storage → weather-cache
2. View cache hits, misses, and storage usage
3. Typical: 85-95% hit rate after warming up

### Check Logs

In your Vercel dashboard → Logs, filter for:
- `[Weather]` - Weather API calls
- `[Cache]` - Cache operations

---

## 🔧 Troubleshooting

### "OpenWeather API key not configured"

**Fix:** 
```bash
# Check .env.local exists and has the key
cat .env.local | grep OPENWEATHER

# Restart dev server
npm run dev
```

### "Failed to fetch current weather"

**Possible causes:**
1. API key not activated yet (takes ~10 min after signup)
2. API key invalid
3. Network issues

**Fix:**
```bash
# Test API key directly
curl "https://api.openweathermap.org/data/2.5/weather?lat=36.9741&lon=-122.0308&appid=YOUR_KEY"
```

### "KV not available" (in production)

**Fix:**
1. Verify Vercel KV is created in dashboard
2. Check that env vars are set (should be automatic)
3. Redeploy the project

### Weather seems stale

**Fix:**
```bash
# Clear cache via test endpoint (to be added)
# Or wait for TTL to expire (30 min for current, 1 hr for forecast)
```

---

## 🎯 Next Steps

Once you've verified the weather system is working:

1. ✅ Test the API endpoint
2. ✅ Create a test page to display weather
3. ✅ Verify production deployment
4. 📋 **Move to Sprint 2:** Activity scoring and recommendations

See `SPRINT_1_COMPLETE.md` for what was built.

See `WEATHER_INTEGRATION_PLAN.md` for the full roadmap.

---

## 💬 Need Help?

Common questions:

**Q: Do I need Vercel KV for development?**  
A: No! The app works fine without it, just without caching.

**Q: What if I hit the free API limit?**  
A: With caching, you shouldn't. But if you do, upgrade to paid tier ($40/month for 100,000 calls).

**Q: Can I use a different weather API?**  
A: Yes! The architecture is modular. Just create a new API client in `src/lib/weather/api.ts`.

**Q: How do I clear the cache?**  
A: In Vercel dashboard → Storage → weather-cache → Clear all. Or wait for TTL expiry.

---

**Happy coding! 🌤️**

