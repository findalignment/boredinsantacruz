import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getActivities } from '@/app/actions/getActivities';
import { getCurrentWeather, getWeatherConditions } from '@/lib/weather';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';

// Valid weather types
const WEATHER_TYPES = {
  sunny: {
    title: 'Sunny Day Activities',
    emoji: '☀️',
    description: 'Perfect weather for outdoor adventures, beaches, and exploring Santa Cruz',
    gradient: 'from-yellow-400 to-orange-500',
    suitability: ['Perfect Sunny', 'Hot Sunny', 'Cool Sunny'],
    idealConditions: 'Clear skies, low chance of rain, good visibility',
  },
  rainy: {
    title: 'Rainy Day Activities',
    emoji: '🌧️',
    description: 'Indoor fun, cozy cafes, and museums for wet weather days',
    gradient: 'from-blue-500 to-indigo-600',
    suitability: ['Light Rain', 'Rainy'],
    idealConditions: 'Indoor activities, covered venues, rain-friendly locations',
  },
  foggy: {
    title: 'Foggy Day Activities',
    emoji: '🌫️',
    description: 'Atmospheric adventures and indoor activities for misty days',
    gradient: 'from-gray-400 to-slate-600',
    suitability: ['Foggy'],
    idealConditions: 'Activities that work in low visibility, indoor options',
  },
  overcast: {
    title: 'Overcast Day Activities',
    emoji: '☁️',
    description: 'Perfect for hiking, exploring, and activities without harsh sun',
    gradient: 'from-gray-300 to-gray-500',
    suitability: ['Overcast', 'Partly Cloudy'],
    idealConditions: 'Mild conditions, no harsh sun, comfortable temperatures',
  },
  windy: {
    title: 'Low-Wind Activities',
    emoji: '💨',
    description: 'Sheltered activities and indoor fun when it\'s breezy',
    gradient: 'from-cyan-400 to-blue-500',
    suitability: ['Windy'],
    idealConditions: 'Indoor or sheltered locations, not wind-sensitive',
  },
  hot: {
    title: 'Hot Day Activities',
    emoji: '🔥',
    description: 'Beat the heat with beaches, water activities, and shaded spots',
    gradient: 'from-orange-500 to-red-500',
    suitability: ['Hot Sunny'],
    idealConditions: 'Water activities, shaded venues, indoor cooling',
  },
  cool: {
    title: 'Cool Weather Activities',
    emoji: '🧊',
    description: 'Cozy activities for crisp, cool Santa Cruz days',
    gradient: 'from-blue-300 to-cyan-400',
    suitability: ['Cool Sunny', 'Cold'],
    idealConditions: 'Moderate activity, layered clothing, warm venues',
  },
} as const;

type WeatherType = keyof typeof WEATHER_TYPES;

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: typeParam } = await params;
  const type = typeParam as WeatherType;
  const config = WEATHER_TYPES[type];
  
  if (!config) {
    return { title: 'Weather Activities' };
  }

  return {
    title: `${config.title} - Santa Cruz`,
    description: config.description,
  };
}

// Generate static pages for all weather types
export function generateStaticParams() {
  return Object.keys(WEATHER_TYPES).map((type) => ({
    type,
  }));
}

async function CurrentWeatherBanner({ weatherType }: { weatherType: WeatherType }) {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    const config = WEATHER_TYPES[weatherType];
    
    // Check if current weather matches this page
    const isMatch = config.suitability.some(suit => 
      conditions.category.toLowerCase().includes(suit.toLowerCase().replace(' ', '-'))
    );
    
    if (isMatch) {
      return (
        <div className={`bg-gradient-to-r ${config.gradient} text-white rounded-xl p-6 shadow-lg mb-8`}>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{config.emoji}</div>
            <div>
              <div className="text-2xl font-bold">Perfect timing!</div>
              <div className="text-white/90 mt-1">
                It's currently {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. 
                Great day for these activities!
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{conditions.emoji}</div>
            <div>
              <div className="text-2xl font-bold">Not quite {weatherType} today</div>
              <div className="text-white/90 mt-1">
                Current conditions: {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. 
                But here are great {weatherType} day activities for when the weather matches!
              </div>
            </div>
          </div>
          <Link 
            href="/activities"
            className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            See Today's Activities →
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
}

function BannerLoading() {
  return <div className="h-32 bg-gray-200 animate-pulse rounded-xl mb-8"></div>;
}

export default async function WeatherTypePage({ params }: PageProps) {
  const { type: typeParam } = await params;
  const type = typeParam as WeatherType;
  const config = WEATHER_TYPES[type];
  
  if (!config) {
    notFound();
  }

  const result = await getActivities();
  
  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Activities
          </h1>
          <p className="text-gray-600 mb-4">
            {result.error || 'Please try again later'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // Filter activities by weather suitability
  const suitableActivities = result.data.filter(activity => {
    // Check weatherSuitability field
    if (activity.weatherSuitability && activity.weatherSuitability.length > 0) {
      return config.suitability.some(suit => 
        activity.weatherSuitability?.some(actSuit => 
          actSuit.toLowerCase().includes(suit.toLowerCase().replace(' ', '-'))
        )
      );
    }
    
    // Fallback to indoor/outdoor logic
    if (type === 'rainy' || type === 'windy') {
      return activity.indoorOutdoor === 'Indoor' || activity.rainOk;
    }
    
    if (type === 'sunny' || type === 'hot') {
      return activity.indoorOutdoor === 'Outdoor' || activity.indoorOutdoor === 'Mixed';
    }
    
    return true; // Include all for other types
  });

  return (
    <main className={`min-h-screen bg-gradient-to-br ${config.gradient} bg-opacity-10`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/activities"
            className="text-gray-700 hover:text-gray-900 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to All Activities
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              {config.emoji} {config.title}
            </h1>
            <p className="text-lg text-gray-600">
              {config.description}
            </p>
          </div>
        </div>

        {/* Current Weather Banner */}
        <Suspense fallback={<BannerLoading />}>
          <CurrentWeatherBanner weatherType={type} />
        </Suspense>

        {/* Ideal Conditions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🎯 Ideal Conditions
          </h2>
          <p className="text-gray-700">
            {config.idealConditions}
          </p>
        </div>

        {/* Activity Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            Found {suitableActivities.length} activities perfect for {type} weather
          </p>
        </div>

        {/* Activities Grid */}
        {suitableActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suitableActivities.map((activity) => (
              <ActivityCardEnhanced
                key={activity.id}
                activity={{
                  ...activity,
                  weatherScore: 95, // High score since it matches weather type
                  matchReason: `Perfect for ${type} conditions`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">{config.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No activities found
            </h3>
            <p className="text-gray-600 mb-6">
              We're still adding {type} weather activities to our database.
            </p>
            <Link
              href="/activities"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              See All Activities
            </Link>
          </div>
        )}

        {/* Other Weather Types */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Other Weather Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(WEATHER_TYPES).map(([key, value]) => (
              key !== type && (
                <Link
                  key={key}
                  href={`/weather/${key}`}
                  className={`bg-gradient-to-br ${value.gradient} text-white rounded-lg p-4 hover:scale-105 transition-transform text-center`}
                >
                  <div className="text-3xl mb-2">{value.emoji}</div>
                  <div className="text-sm font-semibold capitalize">{key}</div>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

