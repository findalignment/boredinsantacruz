// src/lib/weather/api.ts

import {
  WeatherData,
  OpenWeatherResponse,
  WeatherAPIError,
  WeatherFetchOptions,
} from './types';
import { weatherLogger } from '../logger';

/**
 * Santa Cruz location coordinates
 */
export const SANTA_CRUZ_COORDS = {
  lat: 36.9741,
  lon: -122.0308,
  name: 'Santa Cruz, CA',
};

/**
 * OpenWeather API client
 */
export class OpenWeatherAPI {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/3.0';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENWEATHER_API_KEY || '';
    if (!this.apiKey) {
      weatherLogger.warn('OpenWeather API key not configured');
    } else {
      weatherLogger.info('OpenWeather API initialized');
    }
  }

  /**
   * Convert Kelvin to Fahrenheit
   */
  private kelvinToFahrenheit(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
  }

  /**
   * Convert meters per second to miles per hour
   */
  private mpsToMph(mps: number): number {
    return Math.round(mps * 2.237);
  }

  /**
   * Convert millimeters to inches
   */
  private mmToInches(mm: number): number {
    return Math.round(mm * 0.0393701 * 100) / 100;
  }

  /**
   * Convert meters to miles
   */
  private metersToMiles(meters: number): number {
    return Math.round(meters * 0.000621371 * 10) / 10;
  }

  /**
   * Fetch current weather data
   */
  async getCurrentWeather(
    lat: number = SANTA_CRUZ_COORDS.lat,
    lon: number = SANTA_CRUZ_COORDS.lon
  ): Promise<WeatherData> {
    if (!this.apiKey) {
      throw new WeatherAPIError('OpenWeather API key not configured');
    }

    try {
      const startTime = Date.now();
      const url = `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${this.apiKey}`;
      
      weatherLogger.debug('Fetching current weather from API');
      
      const response = await fetch(url, {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      });

      const duration = Date.now() - startTime;

      if (!response.ok) {
        weatherLogger.error('OpenWeather API request failed', undefined, {
          status: response.status,
          statusText: response.statusText,
        });
        throw new WeatherAPIError(
          `OpenWeather API error: ${response.statusText}`,
          response.status,
          'openweather'
        );
      }

      const data: OpenWeatherResponse = await response.json();
      
      if (!data.current) {
        throw new WeatherAPIError('No current weather data in response');
      }

      weatherLogger.info('Current weather fetched successfully', { duration: `${duration}ms` });
      
      return this.transformCurrentWeather(data);
    } catch (error) {
      weatherLogger.error('Failed to fetch current weather', error as Error);
      if (error instanceof WeatherAPIError) {
        throw error;
      }
      throw new WeatherAPIError(
        `Failed to fetch current weather: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        'openweather'
      );
    }
  }

  /**
   * Fetch forecast weather data (up to 7 days)
   */
  async getForecast(
    lat: number = SANTA_CRUZ_COORDS.lat,
    lon: number = SANTA_CRUZ_COORDS.lon,
    days: number = 7
  ): Promise<WeatherData[]> {
    if (!this.apiKey) {
      throw new WeatherAPIError('OpenWeather API key not configured');
    }

    try {
      const url = `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&appid=${this.apiKey}`;
      
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        throw new WeatherAPIError(
          `OpenWeather API error: ${response.statusText}`,
          response.status,
          'openweather'
        );
      }

      const data: OpenWeatherResponse = await response.json();
      
      if (!data.daily || data.daily.length === 0) {
        throw new WeatherAPIError('No forecast data in response');
      }

      return data.daily.slice(0, days).map((day, index) => 
        this.transformDailyWeather(day, data.lat, data.lon, index)
      );
    } catch (error) {
      if (error instanceof WeatherAPIError) {
        throw error;
      }
      throw new WeatherAPIError(
        `Failed to fetch forecast: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        'openweather'
      );
    }
  }

  /**
   * Transform OpenWeather current data to our WeatherData format
   */
  private transformCurrentWeather(data: OpenWeatherResponse): WeatherData {
    const current = data.current!;
    const weather = current.weather[0];
    const now = new Date();

    return {
      date: now.toISOString().split('T')[0],
      location: {
        name: SANTA_CRUZ_COORDS.name,
        lat: data.lat,
        lon: data.lon,
      },
      
      // Temperature
      temp: this.kelvinToFahrenheit(current.temp),
      tempMin: this.kelvinToFahrenheit(current.temp), // Same as current for now
      tempMax: this.kelvinToFahrenheit(current.temp),
      feelsLike: this.kelvinToFahrenheit(current.feels_like),
      
      // Conditions
      condition: weather.main,
      conditionCode: weather.id,
      description: weather.description,
      icon: weather.icon,
      
      // Atmospheric
      humidity: current.humidity,
      pressure: current.pressure,
      
      // Precipitation
      precipitation: this.mmToInches(current.rain?.['1h'] || 0),
      
      // Wind
      windSpeed: this.mpsToMph(current.wind_speed),
      windGust: current.wind_gust ? this.mpsToMph(current.wind_gust) : undefined,
      windDirection: current.wind_deg,
      
      // Visibility & Sky
      visibility: this.metersToMiles(current.visibility),
      cloudCover: current.clouds,
      uvIndex: current.uvi,
      
      // Timestamps
      dt: current.dt,
      sunrise: current.sunrise,
      sunset: current.sunset,
      
      // Metadata
      isHistorical: false,
      isForecast: false,
      lastUpdated: now.toISOString(),
    };
  }

  /**
   * Transform OpenWeather daily data to our WeatherData format
   */
  private transformDailyWeather(
    daily: any,
    lat: number,
    lon: number,
    daysFromNow: number
  ): WeatherData {
    const weather = daily.weather[0];
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);

    return {
      date: date.toISOString().split('T')[0],
      location: {
        name: SANTA_CRUZ_COORDS.name,
        lat,
        lon,
      },
      
      // Temperature
      temp: this.kelvinToFahrenheit(daily.temp.day),
      tempMin: this.kelvinToFahrenheit(daily.temp.min),
      tempMax: this.kelvinToFahrenheit(daily.temp.max),
      feelsLike: this.kelvinToFahrenheit(daily.feels_like.day),
      
      // Conditions
      condition: weather.main,
      conditionCode: weather.id,
      description: weather.description,
      icon: weather.icon,
      
      // Atmospheric
      humidity: daily.humidity,
      pressure: daily.pressure,
      
      // Precipitation
      precipitation: this.mmToInches(daily.rain || 0),
      precipProbability: Math.round(daily.pop * 100),
      
      // Wind
      windSpeed: this.mpsToMph(daily.wind_speed),
      windGust: daily.wind_gust ? this.mpsToMph(daily.wind_gust) : undefined,
      windDirection: daily.wind_deg,
      
      // Visibility & Sky
      visibility: 10, // Default visibility for daily forecast
      cloudCover: daily.clouds,
      uvIndex: daily.uvi,
      
      // Timestamps
      dt: daily.dt,
      sunrise: daily.sunrise,
      sunset: daily.sunset,
      
      // Metadata
      isHistorical: false,
      isForecast: true,
      confidence: this.calculateForecastConfidence(daysFromNow),
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Calculate forecast confidence (degrades over time)
   */
  private calculateForecastConfidence(daysFromNow: number): number {
    // Confidence decreases by ~10% per day
    return Math.max(50, 95 - (daysFromNow * 10));
  }
}

/**
 * Singleton instance
 */
let apiInstance: OpenWeatherAPI | null = null;

export function getWeatherAPI(): OpenWeatherAPI {
  if (!apiInstance) {
    apiInstance = new OpenWeatherAPI();
  }
  return apiInstance;
}

