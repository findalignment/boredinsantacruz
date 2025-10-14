// src/components/today-recommendations.tsx
import { getTopRecommendations } from '@/app/actions/getRecommendations';
import { WeatherDisplay } from './weather/weather-display';
import { WeatherInsights } from './weather/weather-insights';
import { ActivityCardEnhanced } from './activity-card-enhanced';
import Link from 'next/link';

export async function TodayRecommendations() {
  const result = await getTopRecommendations(6);

  if (!result.success || !result.data) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Weather recommendations unavailable</p>
          </div>
        </div>
      </section>
    );
  }

  const { weather, weatherSummary, topActivities, insights } = result.data;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Perfect for Today
          </h2>
          <p className="text-xl text-gray-600">
            Weather-picked activities just for you
          </p>
        </div>

        {/* Weather Display */}
        <div className="max-w-2xl mx-auto mb-8">
          <WeatherDisplay 
            weather={weather} 
            summary={weatherSummary}
            size="large"
          />
        </div>

        {/* Weather Insights */}
        {insights && insights.length > 0 && (
          <div className="max-w-3xl mx-auto mb-8">
            <WeatherInsights insights={insights} />
          </div>
        )}

        {/* Top Activities */}
        {topActivities && topActivities.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topActivities.map((activity) => (
                <ActivityCardEnhanced 
                  key={activity.id} 
                  activity={activity}
                  showScore={true}
                />
              ))}
            </div>

            {/* See More Link */}
            <div className="text-center">
              <Link
                href="/activities"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                See All Recommendations →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

