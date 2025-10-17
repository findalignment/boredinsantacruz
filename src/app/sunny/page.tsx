import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCurrentWeather, getWeatherConditions } from '@/lib/weather';
import { getActivities } from '@/app/actions/getActivities';
import { FilteredActivities } from '@/components/filtered-activities';

export const metadata: Metadata = {
  title: 'Sunny Day Activities - Santa Cruz',
  description: 'Beaches, hiking, outdoor adventures, and the best things to do on sunny days in Santa Cruz.',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best things to do on a sunny day in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On sunny days in Santa Cruz, enjoy the beaches (Main Beach, Natural Bridges, Capitola), hike in Henry Cowell Redwoods or Pogonip, walk West Cliff Drive for ocean views, visit the Santa Cruz Beach Boardwalk, surf or paddleboard, explore tide pools at Natural Bridges, bike the coastal trail, or enjoy outdoor dining with ocean views."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best beach in Santa Cruz for sunny days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best beaches depend on your needs: Main Beach (classic boardwalk experience, volleyball, lifeguards), Natural Bridges (tide pools, sunset, less crowded), Capitola Beach (protected cove, calm water, charming village), Cowells Beach (gentle waves, beginner surfing), or Seabright Beach (local vibe, dog-friendly areas). All offer different experiences."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I hike in Santa Cruz on a sunny day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top sunny-day hikes include Henry Cowell Redwoods State Park (redwood groves, easy trails), Pogonip Open Space (meadows and forest near UCSC), Wilder Ranch State Park (coastal bluffs and wildflowers), Forest of Nisene Marks (creek trails, shaded), and West Cliff Drive coastal path (paved, wheelchair accessible, ocean views). Most trails offer a mix of sun and shade."
      }
    }
  ]
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
  const result = await getActivities();
  
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

  // Filter for outdoor/sunny activities
  const sunnyActivities = result.data.filter(activity => {
    const tags = activity.tags || [];
    const indoorOutdoor = activity.indoorOutdoor?.toLowerCase();
    
    // Include outdoor activities, beaches, hiking, parks, etc.
    return (
      indoorOutdoor?.includes('outdoor') ||
      tags.some(tag => 
        tag.toLowerCase().includes('beach') ||
        tag.toLowerCase().includes('hiking') ||
        tag.toLowerCase().includes('outdoor') ||
        tag.toLowerCase().includes('park') ||
        tag.toLowerCase().includes('trail') ||
        tag.toLowerCase().includes('surf') ||
        tag.toLowerCase().includes('bike') ||
        tag.toLowerCase().includes('water') ||
        tag.toLowerCase().includes('coastal') ||
        tag.toLowerCase().includes('nature')
      )
    );
  });

  return <FilteredActivities activities={sunnyActivities} />;
}

export default function SunnyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
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
    </>
  );
}
