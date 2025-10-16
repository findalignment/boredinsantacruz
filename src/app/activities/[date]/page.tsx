import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { format, isValid, parseISO } from 'date-fns';
import { getRecommendationsForDate } from '@/app/actions/getRecommendations';
import { WeatherDisplay } from '@/components/weather/weather-display';
import { WeatherInsights } from '@/components/weather/weather-insights';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { LastUpdated } from '@/components/last-updated';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    date: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const dateObj = parseISO(date);
  
  if (!isValid(dateObj)) {
    return {
      title: 'Invalid Date',
    };
  }

  const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy');
  
  return {
    title: `Activities for ${formattedDate} - Santa Cruz`,
    description: `Discover the best activities in Santa Cruz for ${formattedDate}. Weather-aware recommendations tailored to the conditions.`,
  };
}

export default async function DateActivitiesPage({ params }: PageProps) {
  const { date } = await params;
  const dateObj = parseISO(date);
  
  // Validate date
  if (!isValid(dateObj)) {
    notFound();
  }

  const result = await getRecommendationsForDate(date);

  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preparing Recommendations
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              We're analyzing weather conditions for {format(dateObj, 'MMMM d, yyyy')}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/activities"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Today's Activities
              </Link>
              <Link
                href="/guides"
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Guides
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { weather, weatherSummary, weatherConditions, insights, tiers } = result.data;

  // Combine all tier activities
  const perfect = tiers.perfect || [];
  const excellent = tiers.excellent || [];
  const great = tiers.great || [];
  const good = tiers.good || [];
  const acceptable = tiers.acceptable || [];

  const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy');
  const isToday = format(new Date(), 'yyyy-MM-dd') === date;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-md border border-gray-200">
            <span className="text-2xl">{weatherConditions.emoji}</span>
            <span className="text-sm font-semibold text-gray-700">
              {isToday ? 'Today' : format(dateObj, 'EEEE')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Activities for {isToday ? 'Today' : format(dateObj, 'MMM d')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {formattedDate}
          </p>
          <div className="flex justify-center">
            <LastUpdated date={new Date().toISOString()} />
          </div>
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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <a href="#perfect" className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium">
            ⭐ Perfect ({perfect.length})
          </a>
          {excellent.length > 0 && (
            <a href="#excellent" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
              ✨ Excellent ({excellent.length})
            </a>
          )}
          {great.length > 0 && (
            <a href="#great" className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition text-sm font-medium">
              👍 Great ({great.length})
            </a>
          )}
          {good.length > 0 && (
            <a href="#good" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm font-medium">
              👌 Good ({good.length})
            </a>
          )}
          {acceptable.length > 0 && (
            <a href="#acceptable" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
              🤔 Also Available ({acceptable.length})
            </a>
          )}
        </div>

        {/* Perfect Activities */}
        {perfect.length > 0 && (
          <section id="perfect" className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                ⭐ Perfect for {isToday ? 'Today' : 'This Day'}
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

        {/* Excellent Activities */}
        {excellent.length > 0 && (
          <section id="excellent" className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                ✨ Excellent Options
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {excellent.length} {excellent.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {excellent.map((activity) => (
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
          <section id="great" className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                👍 Great Choices
              </h2>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">
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
          <section id="good" className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                👌 Good Options
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
          <section id="acceptable" className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🤔 Also Available
              </h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                {acceptable.length} {acceptable.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              These activities might be affected by weather conditions
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
        {perfect.length === 0 && excellent.length === 0 && great.length === 0 && good.length === 0 && acceptable.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🤷</div>
            <p className="text-gray-600 text-lg">
              No activities found for this date yet.
            </p>
          </div>
        )}

        {/* Related Links */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Plan Your Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides" className="bg-white rounded-lg p-5 hover:shadow-lg transition group">
              <div className="text-3xl mb-2">📖</div>
              <div className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">All Guides</div>
              <div className="text-sm text-gray-600">Time-based & neighborhood guides</div>
            </Link>
            <Link href="/restaurants" className="bg-white rounded-lg p-5 hover:shadow-lg transition group">
              <div className="text-3xl mb-2">🍽️</div>
              <div className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">Restaurants</div>
              <div className="text-sm text-gray-600">Find the perfect dining spot</div>
            </Link>
            <Link href="/events" className="bg-white rounded-lg p-5 hover:shadow-lg transition group">
              <div className="text-3xl mb-2">🎉</div>
              <div className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">Events</div>
              <div className="text-sm text-gray-600">What's happening this day</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
