// src/app/actions/getRecommendations.ts
'use server';

import { getActivities } from './getActivities';
import { getCurrentWeather, getWeatherForDate } from '@/lib/weather';
import { getRecommendations, generateInsights, RecommendationResult } from '@/lib/recommendations/engine';

/**
 * Get weather-aware activity recommendations for today
 */
export async function getTodaysRecommendations() {
  try {
    // Fetch activities
    const activitiesResult = await getActivities();
    if (!activitiesResult.success) {
      return {
        success: false,
        error: activitiesResult.error,
        data: null,
      };
    }

    // Fetch current weather
    const weather = await getCurrentWeather();

    // Get recommendations
    const recommendations = getRecommendations(activitiesResult.data, weather, {
      minScore: 40, // Only show activities scoring 40+
    });

    // Generate insights
    const insights = generateInsights(recommendations);

    return {
      success: true,
      data: {
        ...recommendations,
        insights,
      },
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get recommendations',
      data: null,
    };
  }
}

/**
 * Get recommendations for a specific date
 */
export async function getRecommendationsForDate(date: string) {
  try {
    // Fetch activities
    const activitiesResult = await getActivities();
    if (!activitiesResult.success) {
      return {
        success: false,
        error: activitiesResult.error,
        data: null,
      };
    }

    // Fetch weather for date
    const weather = await getWeatherForDate(date);

    // Get recommendations
    const recommendations = getRecommendations(activitiesResult.data, weather, {
      minScore: 40,
    });

    // Generate insights
    const insights = generateInsights(recommendations);

    return {
      success: true,
      data: {
        ...recommendations,
        insights,
      },
    };
  } catch (error) {
    console.error('Error getting recommendations for date:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get recommendations',
      data: null,
    };
  }
}

/**
 * Get top recommendations (simplified version)
 */
export async function getTopRecommendations(limit: number = 10) {
  try {
    const result = await getTodaysRecommendations();
    
    if (!result.success || !result.data) {
      return result;
    }

    return {
      success: true,
      data: {
        weather: result.data.weather,
        weatherSummary: result.data.weatherSummary,
        topActivities: result.data.topPicks.slice(0, limit),
        insights: result.data.insights,
      },
    };
  } catch (error) {
    console.error('Error getting top recommendations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get top recommendations',
      data: null,
    };
  }
}

/**
 * Get recommendations grouped by score tiers
 */
export async function getRecommendationsByTier() {
  try {
    const result = await getTodaysRecommendations();
    
    if (!result.success || !result.data) {
      return result;
    }

    const { tiers, weather, weatherSummary, weatherConditions, insights } = result.data;

    return {
      success: true,
      data: {
        weather,
        weatherSummary,
        weatherConditions,
        insights,
        perfect: tiers.perfect,
        great: tiers.great,
        good: tiers.good,
        acceptable: tiers.acceptable,
      },
    };
  } catch (error) {
    console.error('Error getting recommendations by tier:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get recommendations by tier',
      data: null,
    };
  }
}

/**
 * Type exports for client-side use
 */
export type TodaysRecommendationsResult = Awaited<ReturnType<typeof getTodaysRecommendations>>;
export type RecommendationsForDateResult = Awaited<ReturnType<typeof getRecommendationsForDate>>;
export type TopRecommendationsResult = Awaited<ReturnType<typeof getTopRecommendations>>;
export type RecommendationsByTierResult = Awaited<ReturnType<typeof getRecommendationsByTier>>;

