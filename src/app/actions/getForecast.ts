'use server';

import { getWeatherForDate, getWeatherConditions } from '@/lib/weather';
import { addDays, format, startOfDay } from 'date-fns';

/**
 * Get 7-day weather forecast for Santa Cruz
 */
export async function getWeeklyForecast() {
  try {
    const today = startOfDay(new Date());
    const forecastDays = 7;
    
    const forecast = await Promise.all(
      Array.from({ length: forecastDays }, async (_, i) => {
        const date = addDays(today, i);
        const dateString = format(date, 'yyyy-MM-dd');
        console.log('Generated forecast date:', dateString);
        
        try {
          const weather = await getWeatherForDate(dateString);
          const conditions = getWeatherConditions(weather);
          
          return {
            date: dateString,
            weather,
            conditions,
            success: true
          };
        } catch (error) {
          console.error(`Failed to fetch weather for ${dateString}:`, error);
          return {
            date: dateString,
            weather: null,
            conditions: null,
            success: false
          };
        }
      })
    );

    // Filter out failed requests
    const successfulForecasts = forecast.filter(f => f.success && f.weather && f.conditions);

    return {
      success: true,
      data: successfulForecasts.map(f => ({
        date: f.date,
        weather: f.weather!,
        conditions: f.conditions!
      }))
    };
  } catch (error) {
    console.error('Error fetching weekly forecast:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch forecast',
      data: []
    };
  }
}

