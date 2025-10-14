// src/app/activities/page.tsx
import { getRecommendationsByTier } from '@/app/actions/getRecommendations';
import { WeatherDisplay } from '@/components/weather/weather-display';
import { WeatherInsights } from '@/components/weather/weather-insights';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities - Weather-Aware Recommendations',
  description: 'Discover the best activities in Santa Cruz based on today\'s weather. Smart recommendations that adapt to current conditions.',
};

export default async function ActivitiesPage() {
  const result = await getRecommendationsByTier();

  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 text-xl font-semibold">
              Unable to load recommendations
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { weather, weatherSummary, weatherConditions, insights, perfect, great, good, acceptable } = result.data;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {weatherConditions.emoji} Activities for Today
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Personalized recommendations based on current weather conditions
          </p>
        </div>

        {/* Weather Display */}
        <div className="max-w-3xl mx-auto mb-8">
          <WeatherDisplay 
            weather={weather} 
            summary={weatherSummary}
            size="large"
          />
        </div>

        {/* Insights */}
        {insights && insights.length > 0 && (
          <div className="max-w-3xl mx-auto mb-12">
            <WeatherInsights insights={insights} />
          </div>
        )}

        {/* Perfect Activities */}
        {perfect.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                ⭐ Perfect for Today
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {perfect.length} {perfect.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perfect.map((activity) => (
                <ActivityCardEnhanced 
                  key={activity.id} 
                  activity={activity}
                  showScore={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Great Activities */}
        {great.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                ✨ Great Options
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {great.length} {great.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {great.map((activity) => (
                <ActivityCardEnhanced 
                  key={activity.id} 
                  activity={activity}
                  showScore={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Good Activities */}
        {good.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                👍 Good Choices
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {good.length} {good.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {good.map((activity) => (
                <ActivityCardEnhanced 
                  key={activity.id} 
                  activity={activity}
                  showScore={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Acceptable Activities */}
        {acceptable.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🤔 Also Available
              </h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                {acceptable.length} {acceptable.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              These activities might be affected by current weather conditions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptable.map((activity) => (
                <ActivityCardEnhanced 
                  key={activity.id} 
                  activity={activity}
                  showScore={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Activities */}
        {perfect.length === 0 && great.length === 0 && good.length === 0 && acceptable.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🤷</div>
            <p className="text-gray-600 text-lg">
              No activities found. Add some activities to your Airtable!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

