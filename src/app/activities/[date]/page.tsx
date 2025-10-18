import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { getWeeklyForecast } from '@/app/actions/getForecast';
import { scoreActivityWithContext } from '@/lib/recommendations/scorer';
import { ActivityCard } from '@/components/activity-card';
import { format } from 'date-fns';

interface DateActivitiesPageProps {
  params: Promise<{
    date: string;
  }>;
}

export async function generateMetadata({ params }: DateActivitiesPageProps): Promise<Metadata> {
  const { date } = await params;
  const dateObj = new Date(date);
  
  return {
    title: `Things to Do in Santa Cruz on ${format(dateObj, 'EEEE, MMMM d, yyyy')} - Weather-Aware Activities`,
    description: `Discover the best activities in Santa Cruz for ${format(dateObj, 'MMMM d, yyyy')}. Weather-aware recommendations for ${format(dateObj, 'EEEE')} in Santa Cruz County.`,
  };
}

async function WeatherAwareActivities({ date }: { date: string }) {
  try {
    const [activitiesResult, forecastResult] = await Promise.all([
      getActivities(),
      getWeeklyForecast(),
    ]);

    if (!activitiesResult.success || !forecastResult.success) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌤️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Weather Data Unavailable</h2>
          <p className="text-gray-600 mb-6">We're having trouble loading weather data right now.</p>
          <Link 
            href="/activities" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Activities
          </Link>
        </div>
      );
    }

    const activities = activitiesResult.data || [];
    const forecast = forecastResult.data || [];
    
    // Find the specific date in forecast (with better matching)
    console.log('Looking for date:', date);
    console.log('Available forecast dates:', forecast.map(day => day.date));
    
    const dayForecast = forecast.find(day => {
      // Try exact match first
      if (day.date === date) return true;
      
      // Try date object comparison for timezone issues
      const urlDate = new Date(date + 'T00:00:00');
      const forecastDate = new Date(day.date + 'T00:00:00');
      return urlDate.getTime() === forecastDate.getTime();
    });
    
    if (!dayForecast) {
      console.error('No forecast found for date:', date);
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Date Not Available</h2>
          <p className="text-gray-600 mb-6">Weather forecast not available for this date.</p>
          <p className="text-sm text-gray-500 mb-4">Requested: {date}</p>
          <p className="text-sm text-gray-500 mb-6">Available: {forecast.map(day => day.date).join(', ')}</p>
          <Link 
            href="/activities" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Activities
          </Link>
        </div>
      );
    }

    // Score activities based on weather
    console.log('Using forecast for date:', dayForecast.date, 'with weather:', dayForecast.weather);
    const scoredActivities = activities.map(activity => 
      scoreActivityWithContext(activity, dayForecast.weather)
    );

    // Sort by weather score (best first)
    const sortedActivities = scoredActivities
      .sort((a, b) => b.weatherScore - a.weatherScore)
      .slice(0, 12); // Show top 12 activities

    const dateObj = new Date(date);
    const dayName = format(dateObj, 'EEEE');
    const fullDate = format(dateObj, 'MMMM d, yyyy');

    return (
      <div className="space-y-8">
        {/* Weather Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{dayForecast.conditions.emoji}</div>
            <div>
              <h1 className="text-3xl font-bold">
                {dayName} in Santa Cruz
              </h1>
              <p className="text-blue-100 text-lg">
                {fullDate} • {Math.round(dayForecast.weather.temp)}°F and {dayForecast.conditions.displayName.toLowerCase()}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">High</div>
              <div className="text-xl font-bold">{Math.round(dayForecast.weather.tempMax)}°F</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Low</div>
              <div className="text-xl font-bold">{Math.round(dayForecast.weather.tempMin)}°F</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Wind</div>
              <div className="text-xl font-bold">{Math.round(dayForecast.weather.windSpeed)} mph</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Precip</div>
              <div className="text-xl font-bold">{Math.round((dayForecast.weather.precipProbability || 0) * 100)}%</div>
            </div>
          </div>
        </div>

        {/* Weather-Aware Activities */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Best Activities for {dayName}
          </h2>
          
          {sortedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Activities Found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any activities for this date.</p>
              <Link 
                href="/activities" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Activities
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedActivities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  showRecommendationReason={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Back to All Activities */}
        <div className="text-center pt-8">
          <Link 
            href="/activities" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to All Activities
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading weather-aware activities:', error);
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">We're having trouble loading activities for this date.</p>
        <Link 
          href="/activities" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Activities
        </Link>
      </div>
    );
  }
}

export default async function DateActivitiesPage({ params }: DateActivitiesPageProps) {
  const { date } = await params;
  
  // Validate date format (expecting YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.error('Invalid date format:', date);
    notFound();
  }
  
  const dateObj = new Date(date + 'T00:00:00'); // Ensure local timezone
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date object:', date);
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        }>
          <WeatherAwareActivities date={date} />
        </Suspense>
      </div>
    </main>
  );
}
