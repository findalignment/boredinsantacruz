import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { ActivityCard } from '@/components/activity-card';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Westside Santa Cruz Guide - Beaches, Surf & Local Hangouts',
  description: 'Complete guide to Westside Santa Cruz. Discover the best beaches, surf spots, restaurants, and activities in Santa Cruz\'s iconic westside neighborhood.',
  keywords: ['Westside Santa Cruz', 'Santa Cruz westside', 'Steamer Lane', 'Lighthouse Point', 'Santa Cruz surfing', 'West Cliff Drive', 'Natural Bridges'],
  openGraph: {
    title: 'Westside Santa Cruz - Beach & Surf Neighborhood Guide',
    description: 'Explore Santa Cruz\'s famous westside with its world-class surf spots, stunning beaches, and laid-back beach culture.',
    type: 'website',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best surf spots on the westside of Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The westside of Santa Cruz is famous for world-class surf spots including Steamer Lane (the most famous), Lighthouse Point, Indicators, and Pleasure Point. Steamer Lane is considered one of the best right-hand point breaks in the world and hosts major surf competitions."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I watch the sunset on the westside?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "West Cliff Drive offers spectacular sunset views along the entire westside coastline. Popular sunset spots include Natural Bridges State Beach, Lighthouse Point, and the West Cliff Drive overlooks. The west-facing beaches provide unobstructed views of the Pacific sunset."
      }
    },
    {
      "@type": "Question",
      "name": "What restaurants are on the westside of Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The westside features casual beachside dining including The Picnic Basket (healthy beach eats), Seabright Brewery, and various cafes along Mission Street. The area is known for its laid-back, surf-inspired dining scene rather than formal restaurants."
      }
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

async function WestsideContent() {
  const [activitiesResult, restaurantsResult] = await Promise.all([
    getActivities(),
    getRestaurants(),
  ]);

  // Filter for westside activities and restaurants
  const westsideActivities = activitiesResult.success 
    ? activitiesResult.data.filter(activity => 
        activity.neighborhood?.toLowerCase().includes('westside') ||
        activity.address?.toLowerCase().includes('west cliff') ||
        activity.address?.toLowerCase().includes('steamer lane') ||
        activity.address?.toLowerCase().includes('lighthouse') ||
        activity.address?.toLowerCase().includes('natural bridges') ||
        activity.tags?.some(tag => tag.toLowerCase().includes('surf') || tag.toLowerCase().includes('beach'))
      )
    : [];

  const westsideRestaurants = restaurantsResult.success
    ? restaurantsResult.data.filter(restaurant =>
        restaurant.neighborhood?.toLowerCase().includes('westside') ||
        restaurant.address?.toLowerCase().includes('west cliff') ||
        restaurant.address?.toLowerCase().includes('mission street')
      )
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Westside Santa Cruz
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            The iconic westside featuring world-class surf spots, stunning beaches, 
            and the legendary West Cliff Drive. Experience Santa Cruz's surf culture at its finest.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏄</div>
              <div className="text-sm">Surf Spots</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🌅</div>
              <div className="text-sm">Sunset Views</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏖️</div>
              <div className="text-sm">Beaches</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🌊</div>
              <div className="text-sm">Ocean Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Famous Surf Spots</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Steamer Lane - World-famous point break</li>
              <li>• Lighthouse Point - Consistent surf</li>
              <li>• Indicators - Advanced surfers only</li>
              <li>• Natural Bridges - Beginner-friendly</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Times to Visit</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Early morning for sunrise</li>
              <li>• Late afternoon for sunset</li>
              <li>• Weekday mornings for fewer crowds</li>
              <li>• Winter months for bigger surf</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Activities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Things to Do on the Westside
        </h2>
        {westsideActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {westsideActivities.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🏄</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Surf & Beach Culture</h3>
            <p className="text-gray-600 mb-4">
              Experience the legendary westside with its world-class surf and stunning coastline.
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

      {/* Restaurants */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Westside Santa Cruz Restaurants
        </h2>
        {westsideRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {westsideRestaurants.slice(0, 6).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Casual Beach Dining</h3>
            <p className="text-gray-600 mb-4">
              Enjoy laid-back dining with ocean views and surf-inspired cuisine.
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

      {/* Neighborhood Highlights */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Westside Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Must-Visit Spots</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-cyan-600">🏄</span>
                Steamer Lane - Watch world-class surfing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-600">🌅</span>
                West Cliff Drive - Sunset walks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-600">🏖️</span>
                Natural Bridges State Beach
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-600">🔭</span>
                Lighthouse Point - Historic lighthouse
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🌊</span>
                Best surf conditions in winter
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🚗</span>
                Limited parking - arrive early
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🧥</span>
                Always bring layers - it's windy
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">📸</span>
                Perfect for photography
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More Neighborhoods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/guides/neighborhoods/downtown"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Downtown Santa Cruz</h3>
            <p className="text-sm text-gray-600">Shopping, dining, and cultural attractions</p>
          </Link>
          <Link
            href="/guides/neighborhoods/pleasure-point"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🏄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Pleasure Point</h3>
            <p className="text-sm text-gray-600">Local surf culture and hangouts</p>
          </Link>
          <Link
            href="/guides/neighborhoods/capitola"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🏖️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Capitola Village</h3>
            <p className="text-sm text-gray-600">Charming beach town atmosphere</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function WestsideGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <span>›</span>
            <Link href="/guides/neighborhoods" className="hover:text-blue-600">Neighborhoods</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Westside</span>
          </div>
        </nav>

        <Suspense fallback={<LoadingSkeleton />}>
          <WestsideContent />
        </Suspense>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </main>
  );
}
