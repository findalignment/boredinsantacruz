'use client';

import Link from 'next/link';
import { format, isToday } from 'date-fns';
import type { WeatherData, WeatherConditions } from '@/lib/weather/types';

interface WeeklyForecastProps {
  forecast: {
    date: string;
    weather: WeatherData;
    conditions: WeatherConditions;
  }[];
}

// Get color for weather category (using WeatherCategory enum values)
const getWeatherColor = (category: string): string => {
  const colors: Record<string, string> = {
    'perfect_sunny': 'bg-yellow-50 border-yellow-300 text-yellow-900',
    'hot_sunny': 'bg-orange-50 border-orange-300 text-orange-900',
    'cool_sunny': 'bg-blue-50 border-blue-200 text-blue-900',
    'partly_cloudy': 'bg-gray-50 border-gray-300 text-gray-900',
    'overcast': 'bg-gray-100 border-gray-400 text-gray-900',
    'light_rain': 'bg-blue-50 border-blue-300 text-blue-900',
    'rainy': 'bg-blue-100 border-blue-400 text-blue-900',
    'heavy_rain': 'bg-blue-200 border-blue-500 text-blue-900',
    'foggy': 'bg-gray-100 border-gray-300 text-gray-800',
    'windy': 'bg-cyan-50 border-cyan-300 text-cyan-900',
    'cold': 'bg-indigo-50 border-indigo-300 text-indigo-900',
    'hot': 'bg-red-50 border-red-300 text-red-900'
  };
  return colors[category] || 'bg-gray-50 border-gray-200 text-gray-900';
};

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">7-Day Forecast</h2>
        <p className="text-gray-600 text-sm mt-1">Plan your perfect Santa Cruz day</p>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-7 gap-3">
        {forecast.map(({ date, weather, conditions }) => {
          const dateObj = new Date(date);
          const today = isToday(dateObj);
          
          return (
            <Link
              key={date}
              href={`/activities/${date}`}
              className={`
                group p-4 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105
                ${getWeatherColor(conditions.category)}
              `}
            >
              <div className="text-center">
                <div className="font-bold text-sm mb-1">
                  {today ? 'Today' : format(dateObj, 'EEE')}
                </div>
                <div className="text-xs opacity-75 mb-2">
                  {format(dateObj, 'MMM d')}
                </div>
                <div className="text-4xl mb-2">
                  {conditions.emoji}
                </div>
                <div className="font-bold text-lg">
                  {Math.round(weather.temp)}°
                </div>
                <div className="text-xs mt-1 capitalize">
                  {conditions.displayName}
                </div>
                <div className="mt-3 text-xs font-medium underline group-hover:no-underline">
                  View Activities
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto -mx-6 px-6">
        <div className="flex gap-3 pb-2">
          {forecast.map(({ date, weather, conditions }) => {
            const dateObj = new Date(date);
            const today = isToday(dateObj);
            
            return (
              <Link
                key={date}
                href={`/activities/${date}`}
                className={`
                  group flex-shrink-0 w-32 p-4 rounded-lg border-2 transition-all hover:shadow-lg
                  ${getWeatherColor(conditions.category)}
                `}
              >
                <div className="text-center">
                  <div className="font-bold text-sm mb-1">
                    {today ? 'Today' : format(dateObj, 'EEE')}
                  </div>
                  <div className="text-xs opacity-75 mb-2">
                    {format(dateObj, 'MMM d')}
                  </div>
                  <div className="text-4xl mb-2">
                    {conditions.emoji}
                  </div>
                  <div className="font-bold text-lg">
                    {Math.round(weather.temp)}°
                  </div>
                  <div className="text-xs mt-1 capitalize">
                    {conditions.displayName}
                  </div>
                  <div className="mt-2 text-xs font-medium underline group-hover:no-underline">
                    View
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

