import { TodayRecommendations } from '@/components/today-recommendations';
import { WeeklyForecast } from '@/components/weekly-forecast';
import { BestDayBanner } from '@/components/best-day-banner';
import { HomepageChat } from '@/components/chatbot/homepage-chat';
import { TopThreeToday } from '@/components/top-three-today';
import { FeaturedLocalSpotlight } from '@/components/featured-local-spotlight';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getWeeklyForecast } from '@/app/actions/getForecast';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bored in Santa Cruz - Your Local Guide',
  description: 'Find the best things to do in Santa Cruz today. Get personalized recommendations for activities, restaurants, beaches, and hidden gems.',
  keywords: ['Santa Cruz guide', 'things to do Santa Cruz', 'Santa Cruz activities', 'Santa Cruz restaurants', 'visit Santa Cruz'],
  openGraph: {
    title: 'Bored in Santa Cruz - Your Local Guide',
    description: 'Find the best things to do in Santa Cruz today.',
    type: 'website',
  },
};

function LoadingRecommendations() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LoadingForecast() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}

async function ForecastWidget() {
  const result = await getWeeklyForecast();
  
  if (!result.success || result.data.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WeeklyForecast forecast={result.data} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Best Day Banner */}
      <Suspense fallback={null}>
        <BestDayBanner />
      </Suspense>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <HomepageChat />
        </div>
      </section>

      {/* Category Navigation - Minimalist */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Link
              href="/activities"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-900">Things to Do</h3>
              <p className="text-sm text-gray-600 mt-1">Activities & Events</p>
            </Link>

            <Link
              href="/restaurants"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="font-semibold text-gray-900">Eat & Drink</h3>
              <p className="text-sm text-gray-600 mt-1">Restaurants & Cafes</p>
            </Link>

            <Link
              href="/trips"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">📌</div>
              <h3 className="font-semibold text-gray-900">My Trips</h3>
              <p className="text-sm text-gray-600 mt-1">Plan & Save</p>
            </Link>

            <Link
              href="/map"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="font-semibold text-gray-900">Explore Map</h3>
              <p className="text-sm text-gray-600 mt-1">Interactive View</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TopThreeToday />
      </Suspense>

      {/* Featured Business */}
      <FeaturedLocalSpotlight />

      {/* More Options */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TodayRecommendations />
      </Suspense>

      {/* Weekly Forecast */}
      <section className="bg-gray-50 py-12">
        <Suspense fallback={<LoadingForecast />}>
          <ForecastWidget />
        </Suspense>
      </section>
    </div>
  );
}
