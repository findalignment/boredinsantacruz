import { TodayRecommendations } from '@/components/today-recommendations';
import { WeeklyForecast } from '@/components/weekly-forecast';
import { BestDayBanner } from '@/components/best-day-banner';
import { HomepageChat } from '@/components/chatbot/homepage-chat';
import { TopThreeToday } from '@/components/top-three-today';
import { FeaturedLocalSpotlight } from '@/components/featured-local-spotlight';
import { FirstVisitTooltip } from '@/components/onboarding/first-visit-tooltip';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getWeeklyForecast } from '@/app/actions/getForecast';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Santa Cruz Guide - Things to Do Right Now | Bored in Santa Cruz',
  description: 'Your personalized guide to Santa Cruz. Get recommendations for activities, restaurants, beaches & hidden gems - updated in real-time.',
  keywords: ['Santa Cruz guide', 'things to do Santa Cruz', 'Santa Cruz activities', 'Santa Cruz restaurants', 'visit Santa Cruz', 'Santa Cruz today'],
  openGraph: {
    title: 'Your Personalized Santa Cruz Guide',
    description: 'Things to do in Santa Cruz right now. Recommendations for beaches, food, activities & more.',
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
      {/* First-time visitor onboarding */}
      <FirstVisitTooltip />
      
      {/* Best Day Banner */}
      <Suspense fallback={null}>
        <BestDayBanner />
      </Suspense>

      {/* Hero Section with Clear Value Proposition */}
      <section className="py-8 md:py-16 px-4 bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Value Proposition Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
              <span className="text-lg">🌊</span>
              <span className="text-sm font-semibold">Your Personalized Santa Cruz Guide</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Things to Do in Santa Cruz,
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Right Now
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Discover beaches, restaurants, activities & hidden gems
            </p>
            <p className="text-sm md:text-base text-teal-600 font-semibold">
              ↓ Just tell us what you're looking for ↓
            </p>
          </div>

          {/* Chatbot */}
          <HomepageChat />

          {/* Quick Search Prompts */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:bg-teal-50 transition-all">
                🏖️ Best beach today
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:bg-teal-50 transition-all">
                🍕 Pizza for dinner
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:bg-teal-50 transition-all">
                ☀️ Outdoor activities
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-teal-500 hover:bg-teal-50 transition-all">
                🌧️ Rainy day ideas
              </button>
            </div>
          </div>
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
