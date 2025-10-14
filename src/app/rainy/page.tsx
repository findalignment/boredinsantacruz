// src/app/rainy/page.tsx
import { getActivities } from '@/app/actions/getActivities';
import { FilteredActivities } from '@/components/filtered-activities';
import { getCurrentWeather, getWeatherConditions } from '@/lib/weather';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rainy Day Activities in Santa Cruz',
  description: 'Discover the best indoor activities, cozy cafes, museums, and entertainment options in Santa Cruz for rainy days. Find things to do when the weather turns wet.',
  keywords: ['Santa Cruz rainy day', 'indoor activities Santa Cruz', 'things to do Santa Cruz rain', 'Santa Cruz museums', 'Santa Cruz cafes', 'rainy day guide'],
  openGraph: {
    title: 'Rainy Day Activities in Santa Cruz',
    description: 'Don\'t let the weather dampen your spirits! Discover amazing indoor activities and cozy spots in Santa Cruz.',
    type: 'website',
  },
};

// Loading component
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-200 rounded-xl h-64 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function WeatherAwareBanner() {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    
    // Check if it's actually rainy
    const isRaining = conditions.category.includes('rain') || 
                     weather.precipitation > 0.05 ||
                     weather.precipProbability && weather.precipProbability > 50;
    
    if (isRaining) {
      return (
        <div className="mb-8 p-6 bg-blue-600 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{conditions.emoji}</div>
            <div>
              <div className="text-2xl font-bold">Perfect timing! It's actually raining today.</div>
              <div className="text-blue-100 mt-1">
                {Math.round(weather.temp)}°F with {weather.description}. Here are the best indoor activities!
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Not raining - show helpful message with link to weather-aware recommendations
      return (
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">☀️</div>
              <div>
                <div className="text-2xl font-bold">Great news! The sun is out today!</div>
                <div className="text-white/90 mt-1">
                  It's {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. 
                  Want weather-aware recommendations instead?
                </div>
              </div>
            </div>
            <Link 
              href="/activities"
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
            >
              See Today's Best Activities →
            </Link>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null; // Fail gracefully
  }
}

async function ActivitiesSection() {
  const result = await getActivities();
  
  if (!result.success) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-600 text-xl font-semibold mb-2">Error loading activities</p>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">🌧️</div>
        <p className="text-gray-600 text-lg">No activities found</p>
      </div>
    );
  }
  
  return <FilteredActivities activities={result.data} />;
}

export default function RainyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌧️ Rainy Day Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't let the weather dampen your spirits! Discover amazing indoor activities and cozy spots in Santa Cruz.
          </p>
        </div>

        {/* Weather-Aware Banner */}
        <Suspense fallback={null}>
          <WeatherAwareBanner />
        </Suspense>

        {/* Activities with Filters */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ActivitiesSection />
        </Suspense>
      </div>
    </main>
  );
}