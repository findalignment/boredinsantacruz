import { getWeeklyForecast } from '@/app/actions/getForecast';
import { format } from 'date-fns';
import Link from 'next/link';

/**
 * Analyzes the weekly forecast and highlights the best day for outdoor activities
 */
export async function BestDayBanner() {
  try {
    const result = await getWeeklyForecast();
    
    if (!result.success || result.data.length === 0) {
      return null; // Don't show banner if forecast unavailable
    }

    // Score each day for outdoor activities
    const scoredDays = result.data.map(({ date, weather, conditions }) => {
      let score = 0;
      
      // Temperature scoring (ideal: 65-75°F)
      if (weather.temp >= 65 && weather.temp <= 75) {
        score += 40;
      } else if (weather.temp >= 60 && weather.temp < 65) {
        score += 30;
      } else if (weather.temp > 75 && weather.temp <= 80) {
        score += 30;
      } else if (weather.temp >= 55 && weather.temp < 60) {
        score += 20;
      } else if (weather.temp > 80 && weather.temp <= 85) {
        score += 20;
      } else {
        score += 10;
      }
      
      // Weather condition scoring
      if (conditions.category === 'perfect_sunny') {
        score += 40;
      } else if (conditions.category === 'hot_sunny' || conditions.category === 'cool_sunny') {
        score += 35;
      } else if (conditions.category === 'partly_cloudy') {
        score += 25;
      } else if (conditions.category === 'overcast') {
        score += 15;
      } else if (conditions.category.includes('rain')) {
        score += 0; // Rain = bad for outdoor
      }
      
      // Precipitation penalty
      if (weather.precipitation > 0.1) {
        score -= 30;
      } else if (weather.precipitation > 0) {
        score -= 15;
      }
      
      // Wind penalty (>15mph is uncomfortable)
      if (weather.windSpeed > 20) {
        score -= 20;
      } else if (weather.windSpeed > 15) {
        score -= 10;
      }
      
      // Visibility bonus
      if (weather.visibility >= 8) {
        score += 10;
      } else if (weather.visibility < 3) {
        score -= 15; // Foggy
      }
      
      // Cloud cover factor
      if (weather.cloudCover < 25) {
        score += 10;
      }
      
      return {
        date,
        score: Math.max(0, Math.min(100, score)),
        weather,
        conditions,
      };
    });

    // Find the best day (skip today if it's not great, look ahead)
    const sortedDays = [...scoredDays].sort((a, b) => b.score - a.score);
    const bestDay = sortedDays[0];
    
    // Only show banner if the best day has a decent score
    if (bestDay.score < 40) {
      return null; // Weather is mediocre all week
    }

    const dateObj = new Date(bestDay.date);
    const dayName = format(dateObj, 'EEEE'); // e.g., "Thursday"
    const fullDate = format(dateObj, 'MMMM d'); // e.g., "October 14"
    const isToday = format(new Date(), 'yyyy-MM-dd') === bestDay.date;
    const isTomorrow = format(new Date(Date.now() + 86400000), 'yyyy-MM-dd') === bestDay.date;

    let timeLabel = dayName;
    if (isToday) timeLabel = 'Today';
    else if (isTomorrow) timeLabel = 'Tomorrow';

    // Generate message based on score
    let message = '';
    let bgColor = '';
    
    if (bestDay.score >= 80) {
      message = `looks absolutely perfect for outdoor activities!`;
      bgColor = 'from-green-500 to-emerald-600';
    } else if (bestDay.score >= 65) {
      message = `looks great for getting outside!`;
      bgColor = 'from-blue-500 to-cyan-600';
    } else {
      message = `is your best bet this week!`;
      bgColor = 'from-indigo-500 to-purple-600';
    }

    return (
      <Link
        href={`/activities/${bestDay.date}`}
        className={`block bg-gradient-to-r ${bgColor} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{bestDay.conditions.emoji}</div>
              <div className="text-white">
                <div className="text-2xl font-bold">
                  {timeLabel} {message}
                </div>
                <div className="text-white/90 mt-1">
                  {Math.round(bestDay.weather.temp)}°F and {bestDay.conditions.displayName.toLowerCase()} 
                  {!isToday && ` on ${fullDate}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-colors">
              <span>See Activities</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </Link>
    );
  } catch (error) {
    console.error('Error generating best day banner:', error);
    return null; // Fail gracefully
  }
}

