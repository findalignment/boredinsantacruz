// src/lib/weather/service.ts

import { getWeatherAPI } from './api';
import { getWeatherCache } from './cache';
import { categorizeWeather, getWeatherConditions } from './categorizer';
import { WeatherData, WeatherAPIError } from './types';
import { weatherLogger } from '../logger';

/**
 * Main weather service - orchestrates API calls and caching
 */
export class WeatherService {
  private api = getWeatherAPI();
  private cache = getWeatherCache();

  /**
   * Get weather for a specific date
   * Handles current, forecast, and (future) historical data
   */
  async getWeatherForDate(date: string | Date): Promise<WeatherData> {
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    
    // Check cache first
    const cached = await this.cache.get(dateStr);
    if (cached) {
      weatherLogger.weatherFetch(dateStr, 'cache');
      return cached;
    }

    weatherLogger.debug(`Cache miss for ${dateStr}, fetching from API`);

    // Determine if it's today, future, or past
    const targetDate = new Date(dateStr);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

    let weather: WeatherData;

    try {
      if (daysDiff === 0) {
        // Today - get current weather
        weather = await this.api.getCurrentWeather();
      } else if (daysDiff > 0 && daysDiff <= 7) {
        // Next 7 days - get forecast
        const forecasts = await this.api.getForecast();
        const targetForecast = forecasts.find(f => f.date === dateStr);
        
        if (!targetForecast) {
          throw new WeatherAPIError(`No forecast available for ${dateStr}`);
        }
        
        weather = targetForecast;
      } else if (daysDiff > 7) {
        // More than 7 days - not supported yet
        throw new WeatherAPIError('Forecasts beyond 7 days not yet supported');
      } else {
        // Historical data - not implemented yet
        throw new WeatherAPIError('Historical weather data not yet implemented');
      }

      // Cache the result
      await this.cache.set(dateStr, weather);
      weatherLogger.weatherFetch(dateStr, 'api');
      
      return weather;
    } catch (error) {
      weatherLogger.weatherError(`fetch for ${dateStr}`, error as Error);
      
      // Return a fallback weather object
      return this.getFallbackWeather(dateStr);
    }
  }

  /**
   * Get weather for today
   */
  async getCurrentWeather(): Promise<WeatherData> {
    const today = new Date().toISOString().split('T')[0];
    return this.getWeatherForDate(today);
  }

  /**
   * Get weather forecast for the next N days
   */
  async getForecast(days: number = 7): Promise<WeatherData[]> {
    try {
      // Check if we have all days in cache
      const dates: string[] = [];
      const today = new Date();
      
      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }

      const cached = await this.cache.getMany(dates);
      
      // If we have all days cached, return them
      if (cached.size === dates.length) {
        return dates.map(date => cached.get(date)!);
      }

      // Otherwise fetch fresh forecast
      const forecast = await this.api.getForecast(undefined, undefined, days);
      
      // Cache all forecast entries
      await this.cache.setMany(
        forecast.map(weather => ({ date: weather.date, data: weather }))
      );
      
      return forecast;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new WeatherAPIError('Failed to fetch weather forecast');
    }
  }

  /**
   * Get weather with category and recommendations
   */
  async getWeatherWithInsights(date: string | Date): Promise<{
    weather: WeatherData;
    category: ReturnType<typeof categorizeWeather>;
    conditions: ReturnType<typeof getWeatherConditions>;
  }> {
    const weather = await this.getWeatherForDate(date);
    const category = categorizeWeather(weather);
    const conditions = getWeatherConditions(weather);

    return { weather, category, conditions };
  }

  /**
   * Batch get weather for multiple dates
   */
  async getWeatherForDates(dates: (string | Date)[]): Promise<Map<string, WeatherData>> {
    const dateStrs = dates.map(d => 
      typeof d === 'string' ? d : d.toISOString().split('T')[0]
    );

    const results = new Map<string, WeatherData>();
    
    // Try to get from cache first
    const cached = await this.cache.getMany(dateStrs);
    
    // Fetch missing dates
    const missing = dateStrs.filter(d => !cached.has(d));
    
    if (missing.length > 0) {
      const fetches = missing.map(async (date) => {
        try {
          const weather = await this.getWeatherForDate(date);
          return { date, weather };
        } catch (error) {
          console.error(`Failed to fetch weather for ${date}:`, error);
          return null;
        }
      });

      const fetched = await Promise.all(fetches);
      
      fetched.forEach(result => {
        if (result) {
          results.set(result.date, result.weather);
        }
      });
    }

    // Combine cached and fetched
    cached.forEach((weather, date) => {
      results.set(date, weather);
    });

    return results;
  }

  /**
   * Clear weather cache
   */
  async clearCache(): Promise<void> {
    await this.cache.clearAll();
  }

  /**
   * Get fallback weather when API fails
   */
  private getFallbackWeather(date: string): WeatherData {
    // Santa Cruz typical weather patterns by month
    const month = new Date(date).getMonth();
    const typicalTemp = this.getTypicalTemperature(month);

    return {
      date,
      location: {
        name: 'Santa Cruz, CA',
        lat: 36.9741,
        lon: -122.0308,
      },
      temp: typicalTemp,
      tempMin: typicalTemp - 5,
      tempMax: typicalTemp + 5,
      feelsLike: typicalTemp,
      condition: 'Unknown',
      conditionCode: 0,
      description: 'Weather data unavailable',
      icon: '01d',
      humidity: 70,
      pressure: 1013,
      precipitation: 0,
      windSpeed: 8,
      visibility: 10,
      cloudCover: 50,
      dt: Date.now() / 1000,
      isHistorical: false,
      isForecast: true,
      confidence: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get typical temperature for Santa Cruz by month
   */
  private getTypicalTemperature(month: number): number {
    // Typical high temperatures for Santa Cruz by month (°F)
    const temps = [60, 62, 63, 65, 67, 70, 72, 73, 73, 70, 65, 60];
    return temps[month];
  }
}

/**
 * Singleton instance
 */
let serviceInstance: WeatherService | null = null;

export function getWeatherService(): WeatherService {
  if (!serviceInstance) {
    serviceInstance = new WeatherService();
  }
  return serviceInstance;
}

/**
 * Convenience functions for direct use
 */

export async function getWeatherForDate(date: string | Date): Promise<WeatherData> {
  return getWeatherService().getWeatherForDate(date);
}

export async function getCurrentWeather(): Promise<WeatherData> {
  return getWeatherService().getCurrentWeather();
}

export async function getForecast(days: number = 7): Promise<WeatherData[]> {
  return getWeatherService().getForecast(days);
}

export async function getWeatherWithInsights(date: string | Date) {
  return getWeatherService().getWeatherWithInsights(date);
}

