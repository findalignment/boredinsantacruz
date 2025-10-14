// src/lib/weather/index.ts
// Barrel export for weather module

export * from './types';
export * from './api';
export * from './cache';
export * from './categorizer';
export * from './service';

// Re-export main functions for convenience
export {
  getWeatherForDate,
  getCurrentWeather,
  getForecast,
  getWeatherWithInsights,
  getWeatherService,
} from './service';

export {
  categorizeWeather,
  getWeatherConditions,
  getWeatherSummary,
  getWeatherRecommendations,
  isWeatherSuitableFor,
} from './categorizer';

