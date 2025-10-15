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
    <section className="bg-white py-16">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-cyan-50/40">
      {/* Best Day Banner */}
      <Suspense fallback={null}>
        <BestDayBanner />
      </Suspense>

      {/* MAIN: AI Assistant */}
      <section className="py-12 md:py-16 px-4">
        <HomepageChat />
      </section>

      {/* Quick Category Buttons - 2 Clicks to Recommendation */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-base md:text-lg font-semibold text-gray-700 mb-4 md:mb-6">
            Or choose a category
          </h2>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4 md:justify-center">
            <Link
              href="/activities"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-blue-50 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Things to do">
                🎯
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Things to Do</span>
            </Link>

            <Link
              href="/restaurants"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-red-50 rounded-2xl border-2 border-gray-200 hover:border-red-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Eat">
                🍴
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Eat</span>
            </Link>

            <Link
              href="/rainy"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-blue-50 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Indoors">
                🏠
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Indoors</span>
            </Link>

            <Link
              href="/sunny"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-orange-50 rounded-2xl border-2 border-gray-200 hover:border-orange-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Outdoors">
                ☀️
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Outdoors</span>
            </Link>

            <Link
              href="/tonight"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-purple-50 rounded-2xl border-2 border-gray-200 hover:border-purple-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Tonight">
                🎵
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Tonight</span>
            </Link>

            <Link
              href="/secret-map"
              className="flex flex-col items-center gap-2 p-4 md:px-8 md:py-4 bg-white hover:bg-purple-50 rounded-2xl border-2 border-gray-200 hover:border-purple-400 transition-all shadow-sm hover:shadow-md group"
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform" role="img" aria-label="Hidden gems">
                🗺️
              </span>
              <span className="text-sm md:text-base font-bold text-gray-900">Hidden Gems</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Top 3 Picks Today */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TopThreeToday />
      </Suspense>

      {/* Featured Local Business */}
      <FeaturedLocalSpotlight />

      {/* More Options */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TodayRecommendations />
      </Suspense>

      {/* Weekly Forecast */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <Suspense fallback={<LoadingForecast />}>
          <ForecastWidget />
        </Suspense>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Never Miss Out
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-6 md:mb-8">
            Get weekly recommendations for the best things to do in Santa Cruz
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-base"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-blue-200 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
