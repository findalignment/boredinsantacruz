// src/lib/weather/types.ts

/**
 * Core weather data structure
 */
export interface WeatherData {
  date: string; // ISO date string (YYYY-MM-DD)
  location: {
    name: string;
    lat: number;
    lon: number;
  };

  // Temperature (Fahrenheit)
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;

  // Conditions
  condition: string; // Main condition: "Clear", "Rain", "Clouds", "Fog", etc.
  conditionCode: number; // OpenWeather condition code
  description: string; // Detailed description: "light rain", "broken clouds"
  icon: string; // OpenWeather icon code

  // Atmospheric
  humidity: number; // percentage
  pressure: number; // hPa
  
  // Precipitation
  precipitation: number; // inches (converted from mm)
  precipProbability?: number; // percentage (only for forecasts)
  
  // Wind
  windSpeed: number; // mph (converted from m/s)
  windGust?: number; // mph
  windDirection?: number; // degrees

  // Visibility & Sky
  visibility: number; // miles (converted from meters)
  cloudCover: number; // percentage
  uvIndex?: number;

  // Timestamps
  dt: number; // Unix timestamp
  sunrise?: number; // Unix timestamp
  sunset?: number; // Unix timestamp
  
  // Metadata
  isHistorical: boolean;
  isForecast: boolean;
  confidence?: number; // 0-100, for forecasts
  lastUpdated: string; // ISO timestamp
}

/**
 * Weather categories for activity matching
 */
export enum WeatherCategory {
  PERFECT_SUNNY = "perfect_sunny",      // 65-75°F, clear, low wind
  HOT_SUNNY = "hot_sunny",               // 75°F+, clear
  COOL_SUNNY = "cool_sunny",             // 55-65°F, clear
  PARTLY_CLOUDY = "partly_cloudy",       // Some clouds, no rain
  OVERCAST = "overcast",                 // Fully cloudy, no rain
  LIGHT_RAIN = "light_rain",             // Drizzle, <0.1in/hr
  RAINY = "rainy",                       // Moderate rain
  HEAVY_RAIN = "heavy_rain",             // Heavy rain
  FOGGY = "foggy",                       // Low visibility
  WINDY = "windy",                       // High winds (>20mph)
  COLD = "cold",                         // <50°F
  HOT = "hot",                           // >85°F
}

/**
 * Simplified weather conditions for display
 */
export interface WeatherConditions {
  category: WeatherCategory;
  displayName: string;
  emoji: string;
  description: string;
  suitableActivities: string[]; // Activity tags that match well
}

/**
 * OpenWeather API response types
 */
export interface OpenWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  current?: OpenWeatherCurrent;
  daily?: OpenWeatherDaily[];
  hourly?: OpenWeatherHourly[];
}

export interface OpenWeatherCurrent {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  rain?: {
    '1h'?: number;
  };
}

export interface OpenWeatherDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: number;
  pop: number; // Probability of precipitation
  rain?: number;
  uvi: number;
}

export interface OpenWeatherHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  pop: number;
  rain?: {
    '1h': number;
  };
}

/**
 * Cache metadata
 */
export interface WeatherCacheEntry {
  data: WeatherData;
  cachedAt: number; // Unix timestamp
  expiresAt: number; // Unix timestamp
  source: 'openweather' | 'fallback';
}

/**
 * Weather fetch options
 */
export interface WeatherFetchOptions {
  includeHourly?: boolean;
  includeDaily?: boolean;
  forceFresh?: boolean; // Bypass cache
}

/**
 * Error types
 */
export class WeatherAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public source?: string
  ) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

export class WeatherCacheError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherCacheError';
  }
}

