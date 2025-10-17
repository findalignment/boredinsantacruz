import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { ActivityCard } from '@/components/activity-card';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Downtown Santa Cruz Guide - Things to Do, Eat & Explore',
  description: 'Complete guide to downtown Santa Cruz. Discover the best restaurants, shops, activities, and attractions in the heart of Santa Cruz, California.',
  keywords: ['downtown Santa Cruz', 'Santa Cruz downtown', 'Pacific Avenue Santa Cruz', 'Santa Cruz shopping', 'downtown Santa Cruz restaurants', 'Santa Cruz city center'],
  openGraph: {
    title: 'Downtown Santa Cruz - Complete Neighborhood Guide',
    description: 'Explore the heart of Santa Cruz with our comprehensive downtown guide featuring restaurants, shops, and attractions.',
    type: 'website',
  },
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best restaurants in downtown Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Downtown Santa Cruz offers diverse dining from casual cafes to upscale restaurants. Popular spots include The Picnic Basket for healthy eats, Lulu Carpenter's for coffee and pastries, Riva Fish House for seafood, and El Palomar for Mexican cuisine. The downtown area has options for every budget and taste preference."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I park in downtown Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Downtown Santa Cruz has several parking options including street parking (2-hour limit), the Cedar Street Garage, the Front Street Garage, and the Soquel Avenue Garage. Free parking is available after 6 PM and on Sundays. Consider using the Metro bus or walking from nearby neighborhoods to avoid parking hassles."
      }
    },
    {
      "@type": "Question",
      "name": "What shops are in downtown Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Downtown Santa Cruz features unique local shops including Bookshop Santa Cruz (independent bookstore), Pacific Cookie Company, Santa Cruz Mountain Brewing, and various clothing boutiques. The area is known for its local, independent retailers rather than chain stores, giving it a distinctive character."
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

async function DowntownContent() {
  const [activitiesResult, restaurantsResult] = await Promise.all([
    getActivities(),
    getRestaurants(),
  ]);

  // Filter for downtown activities and restaurants
  const downtownActivities = activitiesResult.success 
    ? activitiesResult.data.filter(activity => 
        activity.neighborhood?.toLowerCase().includes('downtown') ||
        activity.address?.toLowerCase().includes('pacific avenue') ||
        activity.address?.toLowerCase().includes('soquel avenue') ||
        activity.tags?.some(tag => tag.toLowerCase().includes('downtown'))
      )
    : [];

  const downtownRestaurants = restaurantsResult.success
    ? restaurantsResult.data.filter(restaurant =>
        restaurant.neighborhood?.toLowerCase().includes('downtown') ||
        restaurant.address?.toLowerCase().includes('pacific avenue') ||
        restaurant.address?.toLowerCase().includes('soquel avenue')
      )
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Downtown Santa Cruz
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            The heart of Santa Cruz featuring Pacific Avenue, local shops, diverse dining, 
            and vibrant street life. Discover the cultural and commercial center of the city.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏪</div>
              <div className="text-sm">Local Shops</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🍽️</div>
              <div className="text-sm">Diverse Dining</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🎭</div>
              <div className="text-sm">Arts & Culture</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🚶</div>
              <div className="text-sm">Walkable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Getting Around</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Pacific Avenue is the main street</li>
              <li>• Walkable area - no car needed</li>
              <li>• Metro bus connections available</li>
              <li>• Bike-friendly with bike lanes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Times to Visit</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Weekday mornings for shopping</li>
              <li>• Friday evenings for nightlife</li>
              <li>• Saturday mornings for farmers market</li>
              <li>• Sunday afternoons for relaxed dining</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Activities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Things to Do in Downtown Santa Cruz
        </h2>
        {downtownActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downtownActivities.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Downtown</h3>
            <p className="text-gray-600 mb-4">
              Discover the vibrant downtown area with its unique shops, restaurants, and attractions.
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
          Downtown Santa Cruz Restaurants
        </h2>
        {downtownRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downtownRestaurants.slice(0, 6).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Diverse Dining Options</h3>
            <p className="text-gray-600 mb-4">
              From casual cafes to upscale restaurants, downtown Santa Cruz offers something for every taste.
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
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Neighborhood Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Must-Visit Spots</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-teal-600">📚</span>
                Bookshop Santa Cruz - Independent bookstore
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-600">☕</span>
                Lulu Carpenter's - Historic coffee house
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-600">🎭</span>
                Del Mar Theatre - Art deco movie theater
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-600">🏛️</span>
                MAH (Museum of Art & History)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🚗</span>
                Free parking after 6 PM
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🚶</span>
                Best explored on foot
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🎪</span>
                Street performers on weekends
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🌅</span>
                Beautiful sunset views from upper floors
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
            href="/guides/neighborhoods/westside"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🌊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Westside Santa Cruz</h3>
            <p className="text-sm text-gray-600">Beach communities and surf culture</p>
          </Link>
          <Link
            href="/guides/neighborhoods/capitola"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🏖️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Capitola Village</h3>
            <p className="text-sm text-gray-600">Charming beach town with colorful houses</p>
          </Link>
          <Link
            href="/guides/neighborhoods/pleasure-point"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🏄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Pleasure Point</h3>
            <p className="text-sm text-gray-600">Surfing hotspot and local hangouts</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function DowntownGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            <span className="text-gray-900 font-medium">Downtown</span>
          </div>
        </nav>

        <Suspense fallback={<LoadingSkeleton />}>
          <DowntownContent />
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
