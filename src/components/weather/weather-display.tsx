// src/components/weather/weather-display.tsx
'use client';

import { WeatherData } from '@/lib/weather/types';

interface WeatherDisplayProps {
  weather: WeatherData;
  summary?: string;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export function WeatherDisplay({ 
  weather, 
  summary,
  size = 'medium',
  showDetails = true 
}: WeatherDisplayProps) {
  const getWeatherEmoji = (condition: string): string => {
    const condition_lower = condition.toLowerCase();
    if (condition_lower.includes('clear')) return '☀️';
    if (condition_lower.includes('cloud')) return '☁️';
    if (condition_lower.includes('rain')) return '🌧️';
    if (condition_lower.includes('drizzle')) return '🌦️';
    if (condition_lower.includes('thunder')) return '⛈️';
    if (condition_lower.includes('snow')) return '❄️';
    if (condition_lower.includes('mist') || condition_lower.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const sizeClasses = {
    small: {
      container: 'p-3',
      emoji: 'text-3xl',
      temp: 'text-2xl',
      description: 'text-sm',
      details: 'text-xs',
    },
    medium: {
      container: 'p-4',
      emoji: 'text-5xl',
      temp: 'text-3xl',
      description: 'text-base',
      details: 'text-sm',
    },
    large: {
      container: 'p-6',
      emoji: 'text-7xl',
      temp: 'text-5xl',
      description: 'text-xl',
      details: 'text-base',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg ${classes.container}`}>
      <div className="flex items-center justify-between">
        {/* Weather Icon & Temp */}
        <div className="flex items-center gap-4">
          <div className={classes.emoji}>
            {getWeatherEmoji(weather.condition)}
          </div>
          <div>
            <div className={`font-bold text-gray-900 ${classes.temp}`}>
              {weather.temp}°F
            </div>
            <div className={`text-gray-600 capitalize ${classes.description}`}>
              {weather.description}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {showDetails && (
          <div className={`text-right text-gray-600 ${classes.details}`}>
            <div>Feels like {weather.feelsLike}°F</div>
            <div className="flex items-center gap-2 justify-end mt-1">
              <span>💨 {weather.windSpeed} mph</span>
              <span>💧 {weather.humidity}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className={`mt-3 text-gray-700 ${classes.description}`}>
          {summary}
        </div>
      )}

      {/* Date */}
      <div className={`mt-2 text-gray-500 ${classes.details}`}>
        {new Date(weather.date).toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        })}
      </div>
    </div>
  );
}

