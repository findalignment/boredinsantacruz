import { SectionCard } from '@/components/ui/section-card';
import { TodayRecommendations } from '@/components/today-recommendations';
import { WeeklyForecast } from '@/components/weekly-forecast';
import { BestDayBanner } from '@/components/best-day-banner';
import { HomepageChat } from '@/components/chatbot/homepage-chat';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getWeeklyForecast } from '@/app/actions/getForecast';

export const metadata: Metadata = {
  title: 'Bored in Santa Cruz - Your Ultimate Guide to Local Activities',
  description: 'Never be bored in Santa Cruz again! Discover activities for sunny days, rainy days, hidden gems, events, and the best local experiences in Santa Cruz, California.',
  keywords: ['Santa Cruz guide', 'things to do Santa Cruz', 'Santa Cruz activities', 'Santa Cruz events', 'visit Santa Cruz', 'Santa Cruz beaches', 'Santa Cruz hiking'],
  openGraph: {
    title: 'Bored in Santa Cruz - Your Ultimate Local Guide',
    description: 'Discover the best activities, venues, and experiences in Santa Cruz - rain or shine!',
    type: 'website',
  },
};

function LoadingRecommendations() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-48 bg-gray-200 rounded-xl max-w-2xl mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    return null; // Gracefully hide if forecast fails
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WeeklyForecast forecast={result.data} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Best Day Banner */}
      <Suspense fallback={null}>
        <BestDayBanner />
      </Suspense>

      {/* MAIN FEATURE: AI Chatbot */}
      <section className="py-16 px-4">
        <HomepageChat />
      </section>

      {/* Quick Links Below Chat */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/rainy"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🌧️ Rainy Day Activities
            </a>
            <a
              href="/sunny"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ☀️ Sunny Day Fun
            </a>
            <a
              href="/tonight"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎵 Events Tonight
            </a>
            <a
              href="/map"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🗺️ Interactive Map
            </a>
          </div>
        </div>
      </section>

      {/* Today's Recommendations - Weather-Aware */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TodayRecommendations />
      </Suspense>

      {/* Weekly Forecast */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <Suspense fallback={<LoadingForecast />}>
          <ForecastWidget />
        </Suspense>
      </section>

      {/* Browse More Section Cards */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Explore More
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Browse activities by weather, category, and more
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SectionCard
              title="Sunny Day Activities"
              description="Beaches, hiking, water sports"
              emoji="☀️"
              href="/sunny"
              gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
            />
            
            <SectionCard
              title="Rainy Day Adventures"
              description="Cozy cafes, museums, indoor fun"
              emoji="🌧️"
              href="/rainy"
              gradient="bg-gradient-to-br from-blue-400 to-blue-600"
            />
            
            <SectionCard
              title="Secret Map"
              description="Hidden gems & local favorites"
              emoji="🗺️"
              href="/secret-map"
              gradient="bg-gradient-to-br from-purple-600 to-pink-600"
            />
            
            <SectionCard
              title="Restaurants"
              description="Best dining in Santa Cruz"
              emoji="🍽️"
              href="/restaurants"
              gradient="bg-gradient-to-br from-red-400 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Never Miss Out
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get weekly recommendations for the best things to do in Santa Cruz, 
            plus exclusive insider tips and new venue updates.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your inbox! 📧
          </p>
        </div>
      </section>

    </div>
  );
}