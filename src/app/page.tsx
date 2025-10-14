import { SectionCard } from '@/components/ui/section-card';
import { TodayRecommendations } from '@/components/today-recommendations';
import { Suspense } from 'react';
import { Metadata } from 'next';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            🌊 Bored in Santa Cruz?
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your ultimate guide to discovering amazing activities, venues, and experiences 
            in Santa Cruz — whether it's sunny or rainy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rainy"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Rainy Day Activities
            </a>
            <a
              href="/sunny"
              className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border-2 border-blue-600"
            >
              Find Sunny Day Fun
            </a>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </section>

      {/* Today's Recommendations - Weather-Aware */}
      <Suspense fallback={<LoadingRecommendations />}>
        <TodayRecommendations />
      </Suspense>

      {/* Activities Section Cards */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Browse by Weather
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Or explore activities by category
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SectionCard
              title="Rainy Day Adventures"
              description="Cozy cafes, museums, indoor activities, and more to enjoy when the weather turns wet."
              emoji="🌧️"
              href="/rainy"
              gradient="bg-gradient-to-br from-blue-400 to-blue-600"
            />
            
            <SectionCard
              title="All Activities"
              description="See everything Santa Cruz has to offer, sorted by weather."
              emoji="🗺️"
              href="/activities"
              gradient="bg-gradient-to-br from-purple-400 to-pink-600"
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

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Coming Soon
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Santa Cruz Tonight
              </h3>
              <p className="text-gray-600">
                Live music, events, and nightlife happening right now
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                The Secret Map
              </h3>
              <p className="text-gray-600">
                Hidden gems and local favorites off the beaten path
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Concierge
              </h3>
              <p className="text-gray-600">
                Chat with our AI to get personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}