# Environment Variables Setup

This document outlines the required environment variables for the Bored in Santa Cruz application.

## Required Variables

Create a `.env.local` file in the root directory with the following variables:

### Airtable Configuration
```bash
AIRTABLE_TOKEN=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_RAINY_TABLE=RainyActivities
```

### OpenWeather API Configuration
```bash
# Get your API key from: https://openweathermap.org/api
# Recommended: Sign up for One Call API 3.0
OPENWEATHER_API_KEY=your_openweather_api_key
```

**Getting an OpenWeather API Key:**
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key
5. For production, consider upgrading to "One Call API 3.0" subscription ($0.0012/call)

**Free Tier Limits:**
- 1,000 calls per day
- Current weather + 7-day forecast
- Good for development and small-scale production

### Vercel KV (Redis) Configuration
```bash
# These are automatically set by Vercel when you add KV storage
# For local development, you can get these from your Vercel dashboard
KV_URL=your_kv_rest_api_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token
```

**Setting up Vercel KV:**

1. **In Vercel Dashboard:**
   - Go to your project
   - Navigate to Storage tab
   - Click "Create Database"
   - Select "KV" (Redis)
   - Choose a name (e.g., "weather-cache")
   - Select a region close to your deployment (US West for Santa Cruz)

2. **Connect to Your Project:**
   - Vercel will automatically add the environment variables to your project
   - For local development:
     - Go to Settings → Environment Variables
     - Copy the KV variables
     - Add them to your `.env.local` file

3. **Local Development Alternative:**
   - You can also use `vercel env pull` to download all environment variables

## Example `.env.local` File

```bash
# Airtable
AIRTABLE_TOKEN=patXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_RAINY_TABLE=RainyActivities

# OpenWeather
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345

# Vercel KV (from Vercel dashboard)
KV_URL=redis://default:xxxxxx@xxxxxx.upstash.io:6379
KV_REST_API_URL=https://xxxxxx.upstash.io
KV_REST_API_TOKEN=xxxxxxxxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxxxxxxxx
```

## Verification

To verify your environment variables are set up correctly:

```bash
# Check if variables are loaded
npm run dev

# You should see logs like:
# ✅ OpenWeather API configured
# ✅ Vercel KV connected
```

## Production Deployment

When deploying to Vercel:

1. **Airtable variables:** Add manually in Vercel dashboard
2. **OpenWeather API key:** Add manually in Vercel dashboard
3. **KV variables:** Automatically added when you create KV storage

### Adding Environment Variables to Vercel:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with appropriate scope (Production, Preview, Development)
4. Redeploy your application

## Security Notes

- **Never commit `.env.local`** to version control (it's in `.gitignore`)
- **Rotate API keys** if they are ever exposed
- **Use different keys** for development and production if possible
- **Set up billing alerts** for OpenWeather API to avoid surprise charges

## Cost Monitoring

### OpenWeather API Costs:
- Free tier: 1,000 calls/day (sufficient for small sites)
- Paid tier: $0.0012 per call (~$40-60/month for moderate traffic)
- With caching (30min-1hr), costs are minimized

### Vercel KV Costs:
- Included in Vercel Pro plan ($20/month)
- Or standalone: $10/month for 100MB storage
- Very affordable for weather caching use case

## Troubleshooting

### "OpenWeather API key not configured"
- Check that `OPENWEATHER_API_KEY` is set in `.env.local`
- Restart your development server after adding variables

### "KV not available"
- Verify all KV variables are set correctly
- Check Vercel KV dashboard for connection status
- For local dev, ensure you've pulled environment variables

### "Cache errors"
- The app will gracefully degrade and fetch fresh weather data
- Check Vercel KV logs for connection issues
- Verify your KV token hasn't expired

## Next Steps

After setting up environment variables:

1. Test weather fetching: Visit `/api/weather/test` (we'll create this)
2. Check cache: Monitor Vercel KV dashboard
3. Monitor costs: Set up billing alerts in OpenWeather dashboard
4. Enable weather features: Start using weather-aware recommendations!

