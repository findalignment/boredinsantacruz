// src/lib/weather/cache.ts

import { kv } from '@vercel/kv';
import { WeatherData, WeatherCacheEntry, WeatherCacheError } from './types';
import { cacheLogger } from '../logger';

// Check if KV is configured
const isKVConfigured = Boolean(
  process.env.KV_REST_API_URL && 
  process.env.KV_REST_API_TOKEN
);

/**
 * Cache TTL values (in seconds)
 */
const CACHE_TTL = {
  CURRENT: 1800,      // 30 minutes for current weather
  FORECAST: 3600,     // 1 hour for forecasts
  HISTORICAL: 86400 * 30, // 30 days for historical data
};

/**
 * Generate cache key for weather data
 */
function getCacheKey(date: string, location: string = 'santacruz'): string {
  return `weather:${location}:${date}`;
}

/**
 * Weather cache manager using Vercel KV
 */
export class WeatherCache {
  /**
   * Get weather data from cache
   */
  async get(date: string): Promise<WeatherData | null> {
    // Skip cache if KV not configured
    if (!isKVConfigured) {
      return null;
    }
    
    try {
      const key = getCacheKey(date);
      const entry = await kv.get<WeatherCacheEntry>(key);
      
      if (!entry) {
        return null;
      }

      // Check if cache has expired
      const now = Date.now();
      if (entry.expiresAt < now) {
        // Remove expired entry
        cacheLogger.debug(`Cache expired for ${date}`, { expiresAt: new Date(entry.expiresAt).toISOString() });
        await this.delete(date);
        return null;
      }

      cacheLogger.info(`Cache hit for ${date}`);
      return entry.data;
    } catch (error) {
      cacheLogger.error('Cache read error', error as Error);
      // Don't throw - gracefully degrade to fetching fresh data
      return null;
    }
  }

  /**
   * Set weather data in cache
   */
  async set(
    date: string,
    data: WeatherData,
    ttl?: number
  ): Promise<void> {
    // Skip cache if KV not configured
    if (!isKVConfigured) {
      return;
    }
    
    try {
      const key = getCacheKey(date);
      
      // Determine TTL based on data type
      let cacheTTL = ttl;
      if (!cacheTTL) {
        if (data.isHistorical) {
          cacheTTL = CACHE_TTL.HISTORICAL;
        } else if (data.isForecast) {
          cacheTTL = CACHE_TTL.FORECAST;
        } else {
          cacheTTL = CACHE_TTL.CURRENT;
        }
      }

      const now = Date.now();
      const entry: WeatherCacheEntry = {
        data,
        cachedAt: now,
        expiresAt: now + (cacheTTL * 1000),
        source: 'openweather',
      };

      await kv.set(key, entry, { ex: cacheTTL });
      cacheLogger.info(`Cached weather for ${date}`, { ttl: `${cacheTTL}s` });
    } catch (error) {
      cacheLogger.error('Cache write error', error as Error);
      // Don't throw - caching is optional
    }
  }

  /**
   * Delete weather data from cache
   */
  async delete(date: string): Promise<void> {
    if (!isKVConfigured) {
      return;
    }
    
    try {
      const key = getCacheKey(date);
      await kv.del(key);
      console.log(`🗑️  Deleted cache for ${date}`);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Get multiple dates from cache (batch operation)
   */
  async getMany(dates: string[]): Promise<Map<string, WeatherData>> {
    if (!isKVConfigured) {
      return new Map();
    }
    
    const results = new Map<string, WeatherData>();
    
    // Fetch all in parallel
    const promises = dates.map(async (date) => {
      const data = await this.get(date);
      return { date, data };
    });

    const settled = await Promise.allSettled(promises);
    
    settled.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.data) {
        results.set(result.value.date, result.value.data);
      }
    });

    return results;
  }

  /**
   * Set multiple dates in cache (batch operation)
   */
  async setMany(entries: Array<{ date: string; data: WeatherData }>): Promise<void> {
    if (!isKVConfigured) {
      return;
    }
    
    const promises = entries.map(({ date, data }) => this.set(date, data));
    await Promise.allSettled(promises);
  }

  /**
   * Clear all weather cache (use with caution)
   */
  async clearAll(): Promise<void> {
    try {
      // Get all keys matching pattern
      const keys = await kv.keys('weather:*');
      
      if (keys.length > 0) {
        await Promise.all(keys.map((key) => kv.del(key)));
        console.log(`🗑️  Cleared ${keys.length} weather cache entries`);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
      throw new WeatherCacheError('Failed to clear cache');
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    totalEntries: number;
    sampleKeys: string[];
  }> {
    try {
      const keys = await kv.keys('weather:*');
      return {
        totalEntries: keys.length,
        sampleKeys: keys.slice(0, 10),
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return { totalEntries: 0, sampleKeys: [] };
    }
  }
}

/**
 * Singleton instance
 */
let cacheInstance: WeatherCache | null = null;

export function getWeatherCache(): WeatherCache {
  if (!cacheInstance) {
    cacheInstance = new WeatherCache();
  }
  return cacheInstance;
}

/**
 * Helper function to check if KV is available
 */
export async function isKVAvailable(): Promise<boolean> {
  if (!isKVConfigured) {
    return false;
  }
  
  try {
    // Try a simple operation
    await kv.set('weather:health-check', 'ok', { ex: 10 });
    await kv.del('weather:health-check');
    return true;
  } catch (error) {
    console.error('KV not available:', error);
    return false;
  }
}

