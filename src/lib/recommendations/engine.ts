// src/lib/recommendations/engine.ts

import { RainyActivity, ScoredActivity } from '@/types';
import { WeatherData, getWeatherConditions, getWeatherSummary } from '@/lib/weather';
import { scoreActivities } from './scorer';

/**
 * Recommendation tiers based on scores
 */
export interface RecommendationTiers {
  perfect: ScoredActivity[];      // 85-100: Perfect for today
  great: ScoredActivity[];        // 70-84: Great options
  good: ScoredActivity[];         // 55-69: Good options
  acceptable: ScoredActivity[];   // 40-54: Acceptable
  notRecommended: ScoredActivity[]; // 0-39: Not recommended
}

/**
 * Complete recommendation result
 */
export interface RecommendationResult {
  weather: WeatherData;
  weatherSummary: string;
  weatherConditions: ReturnType<typeof getWeatherConditions>;
  tiers: RecommendationTiers;
  topPicks: ScoredActivity[]; // Top 5 recommendations
  totalActivities: number;
}

/**
 * Get weather-based activity recommendations
 */
export function getRecommendations(
  activities: RainyActivity[],
  weather: WeatherData,
  options?: {
    minScore?: number;
    limit?: number;
    includeNotRecommended?: boolean;
  }
): RecommendationResult {
  const minScore = options?.minScore ?? 40;
  const limit = options?.limit;
  const includeNotRecommended = options?.includeNotRecommended ?? false;

  // Score all activities
  const scored = scoreActivities(activities, weather);

  // Filter by minimum score
  let filtered = scored.filter(a => a.weatherScore >= minScore);
  
  // Apply limit if specified
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  // Categorize into tiers
  const tiers: RecommendationTiers = {
    perfect: scored.filter(a => a.weatherScore >= 85),
    great: scored.filter(a => a.weatherScore >= 70 && a.weatherScore < 85),
    good: scored.filter(a => a.weatherScore >= 55 && a.weatherScore < 70),
    acceptable: scored.filter(a => a.weatherScore >= 40 && a.weatherScore < 55),
    notRecommended: includeNotRecommended 
      ? scored.filter(a => a.weatherScore < 40)
      : [],
  };

  // Get top picks (top 5, or top 3 from perfect tier if available)
  const topPicks = tiers.perfect.length >= 3
    ? tiers.perfect.slice(0, 5)
    : scored.slice(0, 5);

  // Get weather context
  const weatherSummary = getWeatherSummary(weather);
  const weatherConditions = getWeatherConditions(weather);

  return {
    weather,
    weatherSummary,
    weatherConditions,
    tiers,
    topPicks,
    totalActivities: scored.length,
  };
}

/**
 * Get recommendations grouped by category
 */
export function getRecommendationsByCategory(
  activities: RainyActivity[],
  weather: WeatherData
): {
  weather: WeatherData;
  weatherSummary: string;
  categories: Map<string, ScoredActivity[]>;
} {
  const scored = scoreActivities(activities, weather);
  const weatherSummary = getWeatherSummary(weather);

  // Group by primary tag
  const categories = new Map<string, ScoredActivity[]>();
  
  scored.forEach(activity => {
    const primaryTag = activity.tags?.[0] || 'Other';
    
    if (!categories.has(primaryTag)) {
      categories.set(primaryTag, []);
    }
    
    categories.get(primaryTag)!.push(activity);
  });

  // Sort each category by score
  categories.forEach((acts, category) => {
    categories.set(category, acts.sort((a, b) => b.weatherScore - a.weatherScore));
  });

  return {
    weather,
    weatherSummary,
    categories,
  };
}

/**
 * Find the best day for a specific activity in the forecast
 */
export function findBestDayForActivity(
  activity: RainyActivity,
  forecasts: WeatherData[]
): {
  bestDay: WeatherData;
  score: number;
  allScores: Array<{ date: string; score: number; weather: WeatherData }>;
} {
  const { scoreActivity } = require('./scorer');
  
  const scores = forecasts.map(weather => ({
    date: weather.date,
    score: scoreActivity(activity, weather),
    weather,
  }));

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  return {
    bestDay: scores[0].weather,
    score: scores[0].score,
    allScores: scores,
  };
}

/**
 * Generate insights about recommendations
 */
export function generateInsights(
  result: RecommendationResult
): string[] {
  const insights: string[] = [];
  const { weather, tiers } = result;

  // Insight about overall activity availability
  if (tiers.perfect.length >= 10) {
    insights.push(`🎉 Amazing day! ${tiers.perfect.length} activities are perfect for this weather.`);
  } else if (tiers.perfect.length >= 5) {
    insights.push(`Great day with ${tiers.perfect.length} perfect activity options.`);
  } else if (tiers.perfect.length === 0 && tiers.great.length > 0) {
    insights.push(`No perfect matches, but ${tiers.great.length} great options available.`);
  }

  // Weather-specific insights
  if (weather.precipitation > 0.1) {
    const indoorCount = tiers.perfect.filter(a => a.indoorOutdoor === 'Indoor').length;
    insights.push(`☔ ${indoorCount} indoor activities recommended due to rain.`);
  }

  if (weather.temp > 80) {
    const waterCount = tiers.perfect.filter(a => 
      a.tags?.some(tag => ['beach', 'water', 'swimming'].includes(tag.toLowerCase()))
    ).length;
    if (waterCount > 0) {
      insights.push(`🏖️ Hot day! ${waterCount} water activities recommended.`);
    }
  }

  if (weather.temp < 55) {
    const cozyCount = tiers.perfect.filter(a =>
      a.tags?.some(tag => ['cafe', 'coffee', 'cozy', 'museum'].includes(tag.toLowerCase()))
    ).length;
    if (cozyCount > 0) {
      insights.push(`☕ Cool day - ${cozyCount} cozy indoor spots are perfect.`);
    }
  }

  if (weather.visibility < 5) {
    insights.push(`🌫️ Foggy conditions - scenic outdoor activities may have limited views.`);
  }

  if (weather.windSpeed > 20) {
    insights.push(`💨 Windy day - some outdoor activities may be affected.`);
  }

  // Activity diversity insight
  const topCategories = new Set(tiers.perfect.slice(0, 10).map(a => a.tags?.[0]).filter(Boolean));
  if (topCategories.size >= 5) {
    insights.push(`🎯 Great variety - ${topCategories.size} different types of activities available.`);
  }

  return insights;
}

