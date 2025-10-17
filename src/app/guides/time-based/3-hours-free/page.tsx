import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { ActivityCard } from '@/components/activity-card';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '3 Hours Free in Santa Cruz - Perfect Half-Day Itinerary',
  description: 'Make the most of 3 hours in Santa Cruz with our curated half-day itinerary. Discover the best quick activities, scenic spots, and must-see attractions.',
  keywords: ['3 hours Santa Cruz', 'half day Santa Cruz', 'quick Santa Cruz itinerary', 'Santa Cruz 3 hours', 'short visit Santa Cruz', 'Santa Cruz highlights'],
  openGraph: {
    title: '3 Hours Free in Santa Cruz - Perfect Half-Day Guide',
    description: 'Experience the best of Santa Cruz in just 3 hours with our expertly curated itinerary.',
    type: 'website',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can I do in Santa Cruz in 3 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 3 hours in Santa Cruz, you can visit the Santa Cruz Beach Boardwalk, explore West Cliff Drive for ocean views, walk through downtown Santa Cruz, grab a meal at a local restaurant, and visit one of the many beaches. Our curated itinerary includes the most efficient route to see the highlights."
      }
    },
    {
      "@type": "Question",
      "name": "Is 3 hours enough time to see Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! 3 hours is perfect for seeing Santa Cruz highlights. You can experience the beach culture, downtown vibe, and scenic coastline. Focus on one main area like the Boardwalk and West Cliff Drive, or combine downtown with a quick beach visit for the best overview."
      }
    },
    {
      "@type": "Question",
      "name": "What's the best route for a 3-hour Santa Cruz visit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start at the Santa Cruz Beach Boardwalk (1 hour), drive along West Cliff Drive for ocean views (30 minutes), explore downtown Santa Cruz for shopping and dining (1 hour), and finish with a quick beach walk or lighthouse visit (30 minutes). This route maximizes your time and covers the main attractions."
      }
    }
  ]
};

const itinerarySchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "3 Hours Free in Santa Cruz Itinerary",
  "description": "Perfect half-day itinerary covering Santa Cruz highlights",
  "touristType": "leisure",
  "itinerary": [
    {
      "@type": "TouristAttraction",
      "name": "Santa Cruz Beach Boardwalk",
      "description": "Historic beachfront amusement park",
      "duration": "60 minutes"
    },
    {
      "@type": "TouristAttraction", 
      "name": "West Cliff Drive",
      "description": "Scenic coastal drive with ocean views",
      "duration": "30 minutes"
    },
    {
      "@type": "TouristAttraction",
      "name": "Downtown Santa Cruz",
      "description": "Shopping, dining, and local culture",
      "duration": "60 minutes"
    },
    {
      "@type": "TouristAttraction",
      "name": "Lighthouse Point",
      "description": "Historic lighthouse and surf viewing",
      "duration": "30 minutes"
    }
  ]
};

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

async function ThreeHoursContent() {
  const [activitiesResult, restaurantsResult] = await Promise.all([
    getActivities(),
    getRestaurants(),
  ]);

  // Filter for quick activities (under 1 hour)
  const quickActivities = activitiesResult.success 
    ? activitiesResult.data.filter(activity => {
        const duration = activity.duration?.toLowerCase() || '';
        return duration.includes('30min') || 
               duration.includes('1hr') || 
               duration.includes('45min') ||
               activity.tags?.some(tag => 
                 tag.toLowerCase().includes('quick') ||
                 tag.toLowerCase().includes('short') ||
                 tag.toLowerCase().includes('viewpoint')
               );
      })
    : [];

  // Filter for quick dining options
  const quickDining = restaurantsResult.success
    ? restaurantsResult.data.filter(restaurant =>
        restaurant.cuisine.some(cuisine => 
          cuisine.toLowerCase().includes('coffee') ||
          cuisine.toLowerCase().includes('cafe') ||
          cuisine.toLowerCase().includes('quick') ||
          cuisine.toLowerCase().includes('casual')
        ) ||
        restaurant.description?.toLowerCase().includes('quick service') ||
        restaurant.description?.toLowerCase().includes('fast casual')
      )
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            3 Hours Free in Santa Cruz
          </h1>
          <p className="text-xl text-green-100 mb-6">
            Make the most of your limited time with our expertly curated half-day itinerary. 
            Experience the best of Santa Cruz's beaches, downtown, and scenic coastline.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm">3 Hours</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏖️</div>
              <div className="text-sm">Beach Views</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-sm">Downtown</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm">Highlights</div>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect Itinerary */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Perfect 3-Hour Itinerary</h2>
        
        <div className="space-y-6">
          {/* Stop 1 */}
          <div className="flex gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Santa Cruz Beach Boardwalk (1 hour)</h3>
              <p className="text-gray-700 mb-3">
                Start your Santa Cruz experience at the historic beachfront amusement park. 
                Take a ride on the Giant Dipper roller coaster, walk the beach, and soak in the California beach culture.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🎢 Roller Coaster</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🏖️ Beach Access</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">📸 Photo Ops</span>
              </div>
            </div>
          </div>

          {/* Stop 2 */}
          <div className="flex gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">West Cliff Drive (30 minutes)</h3>
              <p className="text-gray-700 mb-3">
                Drive or walk along the scenic coastal road for stunning ocean views. 
                Stop at lookout points to watch surfers and enjoy the Pacific coastline.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">🌊 Ocean Views</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">🏄 Surf Watching</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">📷 Scenic Drive</span>
              </div>
            </div>
          </div>

          {/* Stop 3 */}
          <div className="flex gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Downtown Santa Cruz (1 hour)</h3>
              <p className="text-gray-700 mb-3">
                Explore Pacific Avenue for unique shopping, grab a meal at a local restaurant, 
                and experience the vibrant downtown culture. Visit Bookshop Santa Cruz and local cafes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">🛍️ Shopping</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">🍽️ Dining</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">☕ Cafes</span>
              </div>
            </div>
          </div>

          {/* Stop 4 */}
          <div className="flex gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lighthouse Point (30 minutes)</h3>
              <p className="text-gray-700 mb-3">
                End your visit at the historic lighthouse with panoramic ocean views. 
                Watch world-class surfing at Steamer Lane and take in the sunset if timing allows.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">🔭 Lighthouse</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">🏄 Steamer Lane</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">🌅 Sunset Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Activities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Perfect Quick Activities
        </h2>
        {quickActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActivities.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-gray-600 mb-4">
              Discover activities perfect for your 3-hour visit.
            </p>
            <Link
              href="/activities"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Activities
            </Link>
          </div>
        )}
      </section>

      {/* Quick Dining */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Quick Dining Options
        </h2>
        {quickDining.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickDining.slice(0, 6).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Bites</h3>
            <p className="text-gray-600 mb-4">
              Find fast, delicious options to fuel your adventure.
            </p>
            <Link
              href="/restaurants"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Restaurants
            </Link>
          </div>
        )}
      </section>

      {/* Pro Tips */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for 3 Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Management</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">🚗</span>
                Park once and walk between nearby attractions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">📱</span>
                Use GPS for efficient routing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">⏰</span>
                Set alarms to stay on schedule
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">🎫</span>
                Book any tickets in advance
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Must-Do Essentials</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-orange-600">📸</span>
                Take photos at iconic spots
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">🌊</span>
                Touch the Pacific Ocean
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">☕</span>
                Try local coffee or food
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-600">🏄</span>
                Watch surfers if possible
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Time-Based Guides */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Time-Based Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/guides/time-based/6-hours-free"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-semibold text-gray-900 mb-2">6 Hours Free</h3>
            <p className="text-sm text-gray-600">Full day exploration with more activities</p>
          </Link>
          <Link
            href="/guides/time-based/full-day"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🌅</div>
            <h3 className="font-semibold text-gray-900 mb-2">Full Day Santa Cruz</h3>
            <p className="text-sm text-gray-600">Complete 8-hour itinerary with all highlights</p>
          </Link>
          <Link
            href="/guides/time-based/last-minute"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Last-Minute Plans</h3>
            <p className="text-sm text-gray-600">Spontaneous adventures and quick decisions</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ThreeHoursGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <span>›</span>
            <Link href="/guides/time-based" className="hover:text-blue-600">Time-Based</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">3 Hours Free</span>
          </div>
        </nav>

        <Suspense fallback={<LoadingSkeleton />}>
          <ThreeHoursContent />
        </Suspense>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itinerarySchema) }}
        />
      </div>
    </main>
  );
}
