// src/lib/weather/categorizer.ts

import { WeatherData, WeatherCategory, WeatherConditions } from './types';

/**
 * Categorize weather data into actionable categories
 */
export function categorizeWeather(weather: WeatherData): WeatherCategory {
  const { temp, condition, windSpeed, visibility, precipitation, cloudCover } = weather;

  // High priority: Active precipitation
  if (precipitation > 0.2) {
    return WeatherCategory.HEAVY_RAIN;
  }
  if (precipitation > 0.05 || condition === 'Rain') {
    return WeatherCategory.RAINY;
  }
  if (precipitation > 0 || condition === 'Drizzle') {
    return WeatherCategory.LIGHT_RAIN;
  }

  // Fog conditions
  if (visibility < 3 || condition === 'Fog' || condition === 'Mist') {
    return WeatherCategory.FOGGY;
  }

  // Wind conditions
  if (windSpeed > 20) {
    return WeatherCategory.WINDY;
  }

  // Temperature-based categories (for clear/partly cloudy days)
  if (temp >= 85) {
    return WeatherCategory.HOT;
  }
  
  if (temp < 50) {
    return WeatherCategory.COLD;
  }

  // Cloud cover based (no precipitation)
  if (cloudCover > 75) {
    return WeatherCategory.OVERCAST;
  }
  
  if (cloudCover > 40) {
    return WeatherCategory.PARTLY_CLOUDY;
  }

  // Clear sky categories by temperature
  if (temp >= 75) {
    return WeatherCategory.HOT_SUNNY;
  }
  
  if (temp >= 65) {
    return WeatherCategory.PERFECT_SUNNY;
  }
  
  return WeatherCategory.COOL_SUNNY;
}

/**
 * Get detailed weather conditions with display information
 */
export function getWeatherConditions(weather: WeatherData): WeatherConditions {
  const category = categorizeWeather(weather);
  
  const conditionsMap: Record<WeatherCategory, Omit<WeatherConditions, 'category'>> = {
    [WeatherCategory.PERFECT_SUNNY]: {
      displayName: 'Perfect Sunny Day',
      emoji: '☀️',
      description: 'Ideal beach weather with comfortable temperatures',
      suitableActivities: ['beach', 'hiking', 'outdoor dining', 'water sports', 'picnic'],
    },
    [WeatherCategory.HOT_SUNNY]: {
      displayName: 'Hot & Sunny',
      emoji: '🌞',
      description: 'Great for water activities and indoor escapes',
      suitableActivities: ['swimming', 'beach', 'water sports', 'air-conditioned venues', 'ice cream'],
    },
    [WeatherCategory.COOL_SUNNY]: {
      displayName: 'Cool & Sunny',
      emoji: '🌤️',
      description: 'Perfect for active outdoor adventures',
      suitableActivities: ['hiking', 'walking', 'cycling', 'photography', 'outdoor markets'],
    },
    [WeatherCategory.PARTLY_CLOUDY]: {
      displayName: 'Partly Cloudy',
      emoji: '⛅',
      description: 'Nice day with occasional clouds',
      suitableActivities: ['outdoor dining', 'sightseeing', 'shopping', 'casual walks', 'cafes'],
    },
    [WeatherCategory.OVERCAST]: {
      displayName: 'Overcast',
      emoji: '☁️',
      description: 'Gray skies but no rain expected',
      suitableActivities: ['museums', 'indoor activities', 'shopping', 'cafes', 'breweries'],
    },
    [WeatherCategory.LIGHT_RAIN]: {
      displayName: 'Light Rain',
      emoji: '🌦️',
      description: 'Drizzly weather, bring an umbrella',
      suitableActivities: ['museums', 'cafes', 'covered areas', 'breweries', 'indoor entertainment'],
    },
    [WeatherCategory.RAINY]: {
      displayName: 'Rainy',
      emoji: '🌧️',
      description: 'Steady rain, indoor activities recommended',
      suitableActivities: ['museums', 'indoor entertainment', 'cafes', 'movies', 'arcades'],
    },
    [WeatherCategory.HEAVY_RAIN]: {
      displayName: 'Heavy Rain',
      emoji: '⛈️',
      description: 'Stay dry and cozy indoors',
      suitableActivities: ['museums', 'indoor entertainment', 'cozy cafes', 'spa', 'shopping malls'],
    },
    [WeatherCategory.FOGGY]: {
      displayName: 'Foggy',
      emoji: '🌫️',
      description: 'Misty and mysterious vibes',
      suitableActivities: ['cozy cafes', 'indoor activities', 'short walks', 'photography', 'covered markets'],
    },
    [WeatherCategory.WINDY]: {
      displayName: 'Windy',
      emoji: '💨',
      description: 'Breezy conditions, secure loose items',
      suitableActivities: ['wind sports', 'indoor activities', 'wind-protected venues', 'urban exploration'],
    },
    [WeatherCategory.COLD]: {
      displayName: 'Cold',
      emoji: '🥶',
      description: 'Bundle up for outdoor activities',
      suitableActivities: ['cozy cafes', 'indoor activities', 'warm drinks', 'shopping', 'heated venues'],
    },
    [WeatherCategory.HOT]: {
      displayName: 'Very Hot',
      emoji: '🔥',
      description: 'Seek shade and stay hydrated',
      suitableActivities: ['swimming', 'air-conditioned venues', 'early morning activities', 'water activities', 'shade'],
    },
  };

  return {
    category,
    ...conditionsMap[category],
  };
}

/**
 * Get a human-readable weather summary
 */
export function getWeatherSummary(weather: WeatherData): string {
  const conditions = getWeatherConditions(weather);
  const parts: string[] = [];

  // Temperature
  parts.push(`${weather.temp}°F`);

  // Main condition
  parts.push(weather.description);

  // Wind if significant
  if (weather.windSpeed > 15) {
    parts.push(`winds ${weather.windSpeed} mph`);
  }

  // Precipitation if any
  if (weather.precipitation > 0) {
    parts.push(`${weather.precipitation}" rain`);
  }

  return parts.join(' • ');
}

/**
 * Get activity recommendations based on weather
 */
export function getWeatherRecommendations(weather: WeatherData): {
  perfect: string[];
  good: string[];
  avoid: string[];
} {
  const conditions = getWeatherConditions(weather);
  const { temp, precipitation, windSpeed, visibility } = weather;

  const perfect: string[] = [...conditions.suitableActivities];
  const good: string[] = [];
  const avoid: string[] = [];

  // Temperature-based recommendations
  if (temp >= 65 && temp <= 75 && precipitation === 0) {
    perfect.push('beach walks', 'outdoor yoga', 'sunset viewing');
  }

  // Rain avoidance
  if (precipitation > 0.1) {
    avoid.push('beach', 'hiking', 'outdoor sports', 'picnic');
  }

  // Wind considerations
  if (windSpeed > 20) {
    avoid.push('paddleboarding', 'kayaking', 'beach umbrella activities');
  }

  // Fog considerations
  if (visibility < 5) {
    avoid.push('scenic drives', 'photography', 'lighthouse visits');
    good.push('mystery atmosphere activities');
  }

  // Cold weather
  if (temp < 55) {
    perfect.push('hot drinks', 'cozy indoor spots');
    avoid.push('swimming', 'cold water activities');
  }

  // Hot weather
  if (temp > 80) {
    perfect.push('water activities', 'air-conditioned venues', 'shaded areas');
  }

  return {
    perfect: [...new Set(perfect)],
    good: [...new Set(good)],
    avoid: [...new Set(avoid)],
  };
}

/**
 * Compare weather between two dates
 */
export function compareWeather(
  weather1: WeatherData,
  weather2: WeatherData
): {
  tempDiff: number;
  betterForOutdoor: WeatherData;
  summary: string;
} {
  const tempDiff = Math.abs(weather1.temp - weather2.temp);
  
  // Score each weather for outdoor activities
  const score1 = scoreWeatherForOutdoor(weather1);
  const score2 = scoreWeatherForOutdoor(weather2);
  
  const betterForOutdoor = score1 > score2 ? weather1 : weather2;
  
  const summary = score1 === score2
    ? 'Both days are similar for outdoor activities'
    : `${betterForOutdoor.date} is better for outdoor activities`;

  return { tempDiff, betterForOutdoor, summary };
}

/**
 * Score weather for outdoor activities (0-100)
 */
function scoreWeatherForOutdoor(weather: WeatherData): number {
  let score = 100;

  // Temperature penalties
  if (weather.temp < 50) score -= 30;
  else if (weather.temp < 60) score -= 15;
  else if (weather.temp > 85) score -= 20;
  else if (weather.temp > 90) score -= 40;

  // Precipitation penalties
  score -= weather.precipitation * 100;

  // Wind penalties
  if (weather.windSpeed > 20) score -= 20;
  else if (weather.windSpeed > 15) score -= 10;

  // Cloud cover (minor penalty)
  score -= weather.cloudCover * 0.1;

  // Visibility penalties
  if (weather.visibility < 3) score -= 20;
  else if (weather.visibility < 5) score -= 10;

  return Math.max(0, Math.min(100, score));
}

/**
 * Check if weather is suitable for a specific activity type
 */
export function isWeatherSuitableFor(
  weather: WeatherData,
  activityType: string
): { suitable: boolean; score: number; reason?: string } {
  const outdoorActivities = ['beach', 'hiking', 'biking', 'picnic', 'water sports'];
  const indoorActivities = ['museum', 'cafe', 'shopping', 'arcade', 'movie'];

  const isOutdoor = outdoorActivities.some(a => activityType.toLowerCase().includes(a));
  const isIndoor = indoorActivities.some(a => activityType.toLowerCase().includes(a));

  if (isOutdoor) {
    const score = scoreWeatherForOutdoor(weather);
    if (score >= 70) return { suitable: true, score };
    if (score >= 50) return { suitable: true, score, reason: 'Acceptable conditions' };
    return { suitable: false, score, reason: 'Weather not ideal for outdoor activities' };
  }

  if (isIndoor) {
    // Indoor activities are always suitable, but better in bad weather
    const outdoorScore = scoreWeatherForOutdoor(weather);
    const indoorScore = 100 - (outdoorScore * 0.5); // Inverse relationship
    return { suitable: true, score: indoorScore };
  }

  // Default for unknown activity types
  return { suitable: true, score: 70 };
}

