import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCurrentWeather, getWeatherConditions } from '@/lib/weather';

export const metadata: Metadata = {
  title: 'Sunny Day Activities - Santa Cruz',
  description: 'Beaches, hiking, outdoor adventures, and the best things to do on sunny days in Santa Cruz.',
};

// Placeholder data - will come from Airtable
const placeholderActivities = [
  {
    id: '1',
    title: 'Natural Bridges State Beach',
    category: 'Beach',
    description: 'Iconic natural bridge formation. Best tide pooling at low tide. Monarch butterfly sanctuary (Oct-Feb).',
    address: '2531 West Cliff Drive, Santa Cruz, CA 95060',
    parking: '$10 parking fee. Arrives before 10am on weekends.',
    cost: 10,
    duration: '2-3 hours',
    tips: 'Visit 1-2 hours before/after low tide for best tide pools. October-February for monarchs.',
    emoji: '🏖️',
    idealTemp: '55-85°F',
  },
  {
    id: '2',
    title: 'Main Beach & Boardwalk',
    category: 'Beach',
    description: 'Classic California beach with iconic boardwalk. Free beach access. Amusement rides, arcade, food.',
    address: '400 Beach St, Santa Cruz, CA 95060',
    parking: 'Beach St parking structure ($3/hr). Boardwalk lot ($20/day).',
    cost: 0,
    duration: '3-5 hours',
    tips: 'Beach is free! Boardwalk rides require tickets. Go weekdays to avoid crowds.',
    emoji: '🎢',
    idealTemp: '60-95°F',
  },
  {
    id: '3',
    title: 'Its Beach (Itso Wetso)',
    category: 'Beach',
    description: 'Local favorite beach. Dog-friendly. Great surf spot. Less crowded than Main Beach.',
    address: 'West Cliff Drive & Bay St, Santa Cruz, CA 95060',
    parking: 'Free street parking on Bay St. Usually easy to find spots.',
    cost: 0,
    duration: '1-3 hours',
    tips: 'Dogs allowed off-leash before 10am and after 4pm. Less touristy than Main Beach.',
    emoji: '🏖️',
    idealTemp: '55-85°F',
  },
  {
    id: '4',
    title: 'Cowell Beach',
    category: 'Beach',
    description: 'Gentlest waves in Santa Cruz. Perfect for learning to surf. Protected cove. Great swimming.',
    address: '350 West Cliff Dr, Santa Cruz, CA 95060',
    parking: 'Beach St parking structure. Boardwalk lots.',
    cost: 0,
    duration: '2-4 hours',
    tips: 'Best place to learn surfing in SC. Richard Schmidt Surf School right there.',
    emoji: '🏄',
    idealTemp: '60-90°F',
  },
  {
    id: '5',
    title: 'Seabright Beach',
    category: 'Beach',
    description: 'Long, wide beach. Less crowded than Main Beach. Great volleyball courts. Good surf.',
    address: 'East Cliff Dr & Seabright Ave, Santa Cruz, CA 95062',
    parking: 'Free parking lot (fills up on weekends). Street parking available.',
    cost: 0,
    duration: '2-3 hours',
    tips: 'Walk past the jetty for even more solitude. Volleyball nets available.',
    emoji: '🏐',
    idealTemp: '58-88°F',
  },
  {
    id: '6',
    title: 'Capitola Beach',
    category: 'Beach',
    description: 'Picturesque village beach. Colorful houses. Esplanade with shops and restaurants.',
    address: 'Capitola Beach, Capitola, CA 95010',
    parking: 'Paid lots ($2-3/hr). Limited metered street parking.',
    cost: 0,
    duration: '2-4 hours',
    tips: 'Most Instagram-able beach in SC County. Walk the esplanade. Tons of restaurants.',
    emoji: '📸',
    idealTemp: '62-90°F',
  },
  {
    id: '7',
    title: 'West Cliff Drive Walk',
    category: 'Walking',
    description: 'Iconic 3-mile coastal path. Stunning ocean views. Watch surfers. Seals at Seal Rock.',
    address: 'West Cliff Dr, Santa Cruz, CA 95060',
    parking: 'Multiple free parking spots along West Cliff.',
    cost: 0,
    duration: '1-2 hours',
    tips: 'Do the full 3 miles from lighthouse to boardwalk. Stop at Seal Rock. Sunset is magical.',
    emoji: '🚶',
    idealTemp: '50-80°F',
  },
  {
    id: '8',
    title: 'Pogonip Park',
    category: 'Hiking',
    description: '800 acres of trails and meadows. Incredible bay views. Wildflowers in spring. Redwood groves.',
    address: 'Golf Club Dr entrance, Santa Cruz, CA 95060',
    parking: 'Free parking at multiple trailheads. Rarely full.',
    cost: 0,
    duration: '1-3 hours',
    tips: 'Rincon Trail to upper meadow for best views. Spring wildflowers. Bring water.',
    emoji: '🥾',
    idealTemp: '55-80°F',
  },
  {
    id: '9',
    title: 'Henry Cowell Redwoods',
    category: 'Hiking',
    description: 'Ancient redwood grove. Easy flat loop trail. Swimming hole in summer. Peaceful cathedral-like forest.',
    address: '101 N Big Trees Park Rd, Felton, CA 95018',
    parking: '$10 parking fee. Large lot. Rarely fills.',
    cost: 10,
    duration: '1-3 hours',
    tips: '1-mile loop through old growth is a must. Swimming hole in summer. Cool in forest on hot days.',
    emoji: '🌲',
    idealTemp: '50-85°F',
  },
  {
    id: '10',
    title: 'Surfing Lessons',
    category: 'Water Sports',
    description: 'Learn to surf in Santa Cruz! Multiple schools. Beginner-friendly breaks. Wetsuit and board included.',
    address: 'Cowell Beach, Santa Cruz, CA 95060',
    parking: 'Beach St structure. Boardwalk lots.',
    cost: 75,
    duration: '2 hours',
    tips: 'Richard Schmidt, Club Ed, Surf School Santa Cruz all great. Cowell is best beginner break.',
    emoji: '🏄',
    idealTemp: '58-80°F',
  },
  {
    id: '11',
    title: 'Kayaking in the Harbor',
    category: 'Water Sports',
    description: 'Rent kayaks or SUPs. Calm harbor water perfect for beginners. See harbor seals. Explore jetty.',
    address: '135 5th Ave, Santa Cruz, CA 95062',
    parking: 'Free parking lots around harbor. Rarely full.',
    cost: 30,
    duration: '2-3 hours',
    tips: 'Venture Quest and Kayak Connection rent equipment. Harbor is calm - perfect for first-timers.',
    emoji: '🛶',
    idealTemp: '60-85°F',
  },
  {
    id: '12',
    title: 'Santa Cruz Wharf',
    category: 'Walking',
    description: 'Historic 1914 wharf. Half-mile long. Restaurants and gift shops. See sea lions under wharf.',
    address: '21 Municipal Wharf, Santa Cruz, CA 95060',
    parking: 'Free parking on wharf (limited). Beach St structure nearby.',
    cost: 0,
    duration: '1-2 hours',
    tips: 'Free to walk! See sea lions under wharf. Stagnaro\'s for seafood.',
    emoji: '🦭',
    idealTemp: '55-85°F',
  },
];

async function WeatherAwareBanner() {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    
    // Check if it's sunny
    const isSunny = conditions.category.includes('sunny') || 
                   conditions.category.includes('partly-cloudy') ||
                   weather.precipitation < 0.05;
    
    if (isSunny) {
      return (
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{conditions.emoji}</div>
            <div>
              <div className="text-2xl font-bold">Perfect day to be outside!</div>
              <div className="text-white/90 mt-1">
                {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. Get out there and enjoy these activities!
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Not sunny - show indoor suggestion
    return (
      <div className="mb-8 p-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{conditions.emoji}</div>
            <div>
              <div className="text-2xl font-bold">Not quite sunny today</div>
              <div className="text-white/90 mt-1">
                It's {Math.round(weather.temp)}°F and {conditions.displayName.toLowerCase()}. 
                Check out indoor activities instead!
              </div>
            </div>
          </div>
          <Link 
            href="/rainy"
            className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            See Rainy Day Activities →
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
}

function LoadingSkeleton() {
  return (
    <div className="mb-8 h-24 bg-gray-200 animate-pulse rounded-xl"></div>
  );
}

export default function SunnyPage() {
  const beaches = placeholderActivities.filter(a => a.category === 'Beach');
  const hiking = placeholderActivities.filter(a => a.category === 'Hiking');
  const waterSports = placeholderActivities.filter(a => a.category === 'Water Sports');
  const walking = placeholderActivities.filter(a => a.category === 'Walking');

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              ☀️ Sunny Day Activities
            </h1>
            <p className="text-lg text-gray-600">
              Beaches, hiking, water sports, and the best outdoor adventures in Santa Cruz
            </p>
          </div>
        </div>

        {/* Weather Banner */}
        <Suspense fallback={<LoadingSkeleton />}>
          <WeatherAwareBanner />
        </Suspense>

        {/* Beaches Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏖️</span>
            <h2 className="text-3xl font-bold text-gray-900">
              Beaches
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beaches.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>{activity.emoji}</span>
                        <span>{activity.duration}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {activity.description}
                  </p>

                  {/* Address */}
                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      📍 {activity.address}
                    </a>
                  </div>

                  {/* Parking */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      🅿️ PARKING
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.parking}
                    </p>
                  </div>

                  {/* Insider Tip */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-yellow-700 mb-1">
                      💡 INSIDER TIP
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.tips}
                    </p>
                  </div>

                  {/* Ideal Temp */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>🌡️</span>
                    <span>Best: {activity.idealTemp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hiking Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🥾</span>
            <h2 className="text-3xl font-bold text-gray-900">
              Hiking & Nature
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiking.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>{activity.emoji}</span>
                        <span>{activity.duration}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {activity.description}
                  </p>

                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      📍 {activity.address}
                    </a>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      🅿️ PARKING
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.parking}
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-yellow-700 mb-1">
                      💡 INSIDER TIP
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.tips}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>🌡️</span>
                    <span>Best: {activity.idealTemp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Water Sports Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏄</span>
            <h2 className="text-3xl font-bold text-gray-900">
              Water Sports & Activities
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waterSports.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>{activity.emoji}</span>
                        <span>{activity.duration}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {activity.description}
                  </p>

                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      📍 {activity.address}
                    </a>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      🅿️ PARKING
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.parking}
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-yellow-700 mb-1">
                      💡 INSIDER TIP
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.tips}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>🌡️</span>
                    <span>Best: {activity.idealTemp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coastal Walks Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🚶</span>
            <h2 className="text-3xl font-bold text-gray-900">
              Coastal Walks & Views
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {walking.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>{activity.emoji}</span>
                        <span>{activity.duration}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {activity.description}
                  </p>

                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      📍 {activity.address}
                    </a>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      🅿️ PARKING
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.parking}
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-xs font-semibold text-yellow-700 mb-1">
                      💡 INSIDER TIP
                    </p>
                    <p className="text-xs text-gray-700">
                      {activity.tips}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>🌡️</span>
                    <span>Best: {activity.idealTemp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🚀</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Full Sunny Activities Coming Soon!
              </h2>
              <p className="text-orange-100 mb-4">
                We're importing 30+ sunny day activities from Airtable with:
              </p>
              <ul className="space-y-2 text-orange-50 mb-6">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>10 beaches with full parking and tide info</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Multiple hiking trails and nature spots</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Water sports: surfing, kayaking, SUP</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Weather-aware recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Real-time tide predictions for each beach</span>
                </li>
              </ul>
              <p className="text-sm text-orange-200">
                CSV ready to import! See santacruz-sunny-activities.csv
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

