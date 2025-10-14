// src/app/actions/getWeather.ts
'use server';

import {
  getCurrentWeather,
  getWeatherForDate,
  getForecast,
  getWeatherWithInsights,
  categorizeWeather,
  getWeatherConditions,
  getWeatherSummary,
  getWeatherRecommendations,
  WeatherData,
  WeatherCategory,
} from '@/lib/weather';

/**
 * Server action to get current weather for Santa Cruz
 */
export async function getCurrentWeatherAction() {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    const summary = getWeatherSummary(weather);
    const recommendations = getWeatherRecommendations(weather);

    return {
      success: true,
      data: {
        weather,
        conditions,
        summary,
        recommendations,
      },
    };
  } catch (error) {
    console.error('Error in getCurrentWeatherAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch current weather',
      data: null,
    };
  }
}

/**
 * Server action to get weather for a specific date
 */
export async function getWeatherForDateAction(date: string) {
  try {
    const result = await getWeatherWithInsights(date);
    const summary = getWeatherSummary(result.weather);
    const recommendations = getWeatherRecommendations(result.weather);

    return {
      success: true,
      data: {
        ...result,
        summary,
        recommendations,
      },
    };
  } catch (error) {
    console.error('Error in getWeatherForDateAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch weather',
      data: null,
    };
  }
}

/**
 * Server action to get weather forecast
 */
export async function getWeatherForecastAction(days: number = 7) {
  try {
    const forecast = await getForecast(days);
    
    const forecastWithDetails = forecast.map(weather => ({
      weather,
      category: categorizeWeather(weather),
      conditions: getWeatherConditions(weather),
      summary: getWeatherSummary(weather),
    }));

    return {
      success: true,
      data: forecastWithDetails,
    };
  } catch (error) {
    console.error('Error in getWeatherForecastAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch forecast',
      data: [],
    };
  }
}

/**
 * Server action to get best weather day in the forecast
 */
export async function getBestWeatherDayAction(days: number = 7) {
  try {
    const forecast = await getForecast(days);
    
    // Score each day for outdoor activities
    const scored = forecast.map(weather => ({
      weather,
      score: scoreWeatherForOutdoor(weather),
    }));

    // Sort by score and get the best day
    scored.sort((a, b) => b.score - a.score);
    const bestDay = scored[0];

    if (!bestDay) {
      throw new Error('No forecast data available');
    }

    const conditions = getWeatherConditions(bestDay.weather);
    const summary = getWeatherSummary(bestDay.weather);

    return {
      success: true,
      data: {
        weather: bestDay.weather,
        score: bestDay.score,
        conditions,
        summary,
      },
    };
  } catch (error) {
    console.error('Error in getBestWeatherDayAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to find best day',
      data: null,
    };
  }
}

/**
 * Helper function to score weather for outdoor activities
 */
function scoreWeatherForOutdoor(weather: WeatherData): number {
  let score = 100;

  // Temperature penalties
  if (weather.temp < 50) score -= 30;
  else if (weather.temp < 60) score -= 15;
  else if (weather.temp > 85) score -= 20;
  else if (weather.temp > 90) score -= 40;

  // Ideal temperature bonus
  if (weather.temp >= 65 && weather.temp <= 75) score += 10;

  // Precipitation penalties
  score -= weather.precipitation * 100;
  if (weather.precipProbability) {
    score -= weather.precipProbability * 0.2; // Minor penalty for probability
  }

  // Wind penalties
  if (weather.windSpeed > 20) score -= 20;
  else if (weather.windSpeed > 15) score -= 10;

  // Cloud cover (minor penalty)
  score -= weather.cloudCover * 0.15;

  // Visibility penalties
  if (weather.visibility < 3) score -= 20;
  else if (weather.visibility < 5) score -= 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Type exports for client-side use
 */
export type WeatherActionResult = Awaited<ReturnType<typeof getCurrentWeatherAction>>;
export type WeatherForDateResult = Awaited<ReturnType<typeof getWeatherForDateAction>>;
export type WeatherForecastResult = Awaited<ReturnType<typeof getWeatherForecastAction>>;
export type BestWeatherDayResult = Awaited<ReturnType<typeof getBestWeatherDayAction>>;

