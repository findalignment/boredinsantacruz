import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCurrentWeather, getWeatherConditions } from '@/lib/weather';
import { getSunnyActivities } from '@/app/actions/getMasterActivities';
import { ActivityCard } from '@/components/activity-card';

export const metadata: Metadata = {
  title: 'Sunny Day Activities - Santa Cruz',
  description: 'Beaches, hiking, outdoor adventures, and the best things to do on sunny days in Santa Cruz.',
};

async function WeatherBanner() {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    
    const isSunny = conditions.category.includes('clear') || 
                   conditions.category.includes('sunny') ||
                   (weather.cloudCover < 30 && !weather.precipitation);
    
    if (isSunny) {
      return (
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-5xl">☀️</div>
            <div>
              <div className="text-2xl font-bold">Perfect sunny day in Santa Cruz!</div>
              <div className="text-white/90 mt-1">
                {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. Great day to get outside!
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mb-8 p-6 bg-blue-100 border-2 border-blue-300 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{conditions.emoji}</div>
          <div>
            <div className="text-xl font-bold text-gray-900">Not quite sunny today</div>
            <div className="text-gray-700 mt-1">
              Currently {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. 
              But these activities are still great options!
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
}

async function ActivitiesSection() {
  const result = await getSunnyActivities();
  
  if (!result.success || result.data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">☀️</div>
        <p className="text-gray-600 text-lg">No sunny day activities found yet.</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon as we add more activities!</p>
        <Link 
          href="/activities"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          View All Activities
        </Link>
      </div>
    );
  }

  const activities = result.data;

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { name: 'Beaches', emoji: '🏖️', count: activities.filter(a => a.category === 'Beach').length },
          { name: 'Hiking', emoji: '🥾', count: activities.filter(a => a.category === 'Hiking').length },
          { name: 'Parks', emoji: '🌳', count: activities.filter(a => a.category === 'Park').length },
          { name: 'Water Activities', emoji: '🌊', count: activities.filter(a => a.category === 'Water Activity').length },
        ].filter(cat => cat.count > 0).map((category) => (
          <div
            key={category.name}
            className="px-4 py-2 bg-white rounded-full border-2 border-orange-200 text-gray-700 font-medium"
          >
            {category.emoji} {category.name} ({category.count})
          </div>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={{
              id: activity.id,
              title: activity.name,
              venue: {} as any,
              venueName: activity.neighborhood || 'Santa Cruz',
              tags: activity.tags,
              cost: activity.cost,
              duration: activity.duration,
              notes: activity.description,
              website: activity.website || null,
              instagram: activity.instagram || null,
              imageUrl: activity.photoUrl || activity.imageUrl || null,
              address: activity.address,
              hours: activity.hours,
              parking: activity.parkingInfo,
              tips: activity.tips,
              phone: activity.phone,
              indoorOutdoor: activity.indoorOutdoor,
              rainOk: activity.rainOk,
              tidePrefence: activity.tidePreference,
            }}
            showRecommendationReason={false}
          />
        ))}
      </div>
    </div>
  );
}

export default function SunnyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ☀️ Sunny Day Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make the most of beautiful Santa Cruz weather! Beaches, hiking trails, outdoor adventures, and more.
          </p>
        </div>

        {/* Weather Banner */}
        <Suspense fallback={null}>
          <WeatherBanner />
        </Suspense>

        {/* Activities */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        }>
          <ActivitiesSection />
        </Suspense>
      </div>
    </main>
  );
}
