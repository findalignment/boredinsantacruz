// src/app/api/weather/test/route.ts
import { NextResponse } from 'next/server';
import { getCurrentWeather, getForecast } from '@/lib/weather';
import { isKVAvailable } from '@/lib/weather/cache';

/**
 * Test endpoint to verify weather API and caching setup
 * Access at: /api/weather/test
 */
export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    errors: [],
  };

  // Check 1: Environment Variables
  results.checks.envVars = {
    openWeatherKey: !!process.env.OPENWEATHER_API_KEY,
    kvConfigured: !!(
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ),
  };

  // Check 2: KV Availability
  try {
    const kvAvailable = await isKVAvailable();
    results.checks.kvConnection = {
      available: kvAvailable,
      status: kvAvailable ? 'Connected' : 'Not available',
    };
  } catch (error) {
    results.checks.kvConnection = {
      available: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    results.errors.push('KV connection failed');
  }

  // Check 3: Current Weather API
  try {
    const weather = await getCurrentWeather();
    results.checks.currentWeather = {
      success: true,
      date: weather.date,
      temp: weather.temp,
      condition: weather.condition,
      cached: weather.lastUpdated,
    };
  } catch (error) {
    results.checks.currentWeather = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    results.errors.push('Current weather fetch failed');
  }

  // Check 4: Forecast API
  try {
    const forecast = await getForecast(3); // Get 3 days
    results.checks.forecast = {
      success: true,
      daysReturned: forecast.length,
      dates: forecast.map(f => f.date),
    };
  } catch (error) {
    results.checks.forecast = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    results.errors.push('Forecast fetch failed');
  }

  // Overall status
  results.status = results.errors.length === 0 ? 'All systems operational' : 'Some systems have issues';
  results.healthy = results.errors.length === 0;

  return NextResponse.json(results, {
    status: results.healthy ? 200 : 500,
  });
}

