import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { ActivityCard } from '@/components/activity-card';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Winter in Santa Cruz - Best Activities & Things to Do',
  description: 'Discover the best winter activities in Santa Cruz. From whale watching to cozy cafes, find perfect things to do during the cooler months in Santa Cruz, California.',
  keywords: ['winter Santa Cruz', 'Santa Cruz winter activities', 'whale watching Santa Cruz', 'winter things to do Santa Cruz', 'Santa Cruz December', 'Santa Cruz January'],
  openGraph: {
    title: 'Winter in Santa Cruz - Seasonal Activity Guide',
    description: 'Embrace the cooler months in Santa Cruz with whale watching, cozy dining, and indoor attractions perfect for winter weather.',
    type: 'website',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the weather like in Santa Cruz during winter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Santa Cruz winters are mild with average temperatures ranging from 45-65°F. December through February see more rain and occasional fog, but sunny days are still common. The ocean is colder but surf conditions are often excellent for experienced surfers."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best winter activities in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Winter activities include whale watching (peak season December-March), visiting museums and galleries, enjoying cozy cafes and restaurants, storm watching at the coast, and exploring redwood forests. Indoor attractions like the MAH and Seymour Marine Discovery Center are perfect for rainy days."
      }
    },
    {
      "@type": "Question",
      "name": "Is winter a good time to visit Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Winter is actually a great time to visit Santa Cruz. You'll experience fewer crowds, better hotel rates, spectacular storm watching, peak whale watching season, and the cozy charm of the off-season. Many locals consider winter the best time to enjoy Santa Cruz without the summer tourist crowds."
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

async function WinterContent() {
  const [activitiesResult, restaurantsResult] = await Promise.all([
    getActivities(),
    getRestaurants(),
  ]);

  // Filter for winter-appropriate activities
  const winterActivities = activitiesResult.success 
    ? activitiesResult.data.filter(activity => 
        activity.indoorOutdoor === 'Indoor' ||
        activity.tags?.some(tag => 
          tag.toLowerCase().includes('museum') ||
          tag.toLowerCase().includes('whale') ||
          tag.toLowerCase().includes('storm') ||
          tag.toLowerCase().includes('winter') ||
          tag.toLowerCase().includes('cozy')
        ) ||
        activity.weatherSuitability?.some(weather => 
          weather.toLowerCase().includes('rain') ||
          weather.toLowerCase().includes('storm')
        )
      )
    : [];

  // Filter for cozy restaurants and cafes
  const cozyRestaurants = restaurantsResult.success
    ? restaurantsResult.data.filter(restaurant =>
        restaurant.cuisine.some(cuisine => 
          cuisine.toLowerCase().includes('coffee') ||
          cuisine.toLowerCase().includes('cafe') ||
          cuisine.toLowerCase().includes('warm') ||
          cuisine.toLowerCase().includes('comfort')
        ) ||
        restaurant.description?.toLowerCase().includes('cozy') ||
        restaurant.description?.toLowerCase().includes('fireplace')
      )
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Winter in Santa Cruz
          </h1>
          <p className="text-xl text-indigo-100 mb-6">
            Embrace the magic of winter in Santa Cruz with whale watching, cozy cafes, 
            storm watching, and indoor attractions. Discover why locals love the off-season.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🐋</div>
              <div className="text-sm">Whale Watching</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">☕</div>
              <div className="text-sm">Cozy Cafes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🌊</div>
              <div className="text-sm">Storm Watching</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-sm">Museums</div>
            </div>
          </div>
        </div>
      </div>

      {/* Winter Weather Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Winter Weather in Santa Cruz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Temperature</h3>
            <p className="text-gray-700">45-65°F average</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌧️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Rainfall</h3>
            <p className="text-gray-700">Peak season Dec-Feb</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="font-semibold text-gray-900 mb-1">Ocean</h3>
            <p className="text-gray-700">Colder, bigger surf</p>
          </div>
        </div>
      </div>

      {/* Winter Activities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Best Winter Activities in Santa Cruz
        </h2>
        {winterActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winterActivities.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">❄️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Winter Wonderland</h3>
            <p className="text-gray-600 mb-4">
              Discover the cozy side of Santa Cruz with indoor attractions and seasonal activities.
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

      {/* Cozy Restaurants */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Cozy Winter Dining
        </h2>
        {cozyRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cozyRestaurants.slice(0, 6).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Warm & Cozy</h3>
            <p className="text-gray-600 mb-4">
              Find the perfect spot to warm up with hot drinks and comfort food.
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

      {/* Winter Highlights */}
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Winter Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Seasonal Activities</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🐋</span>
                Whale watching (Dec-Mar peak season)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🌊</span>
                Storm watching at West Cliff Drive
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🏛️</span>
                Museum hopping on rainy days
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🌲</span>
                Redwood forest walks (less crowded)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Winter Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600">🧥</span>
                Always bring layers - weather changes quickly
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600">☂️</span>
                Pack rain gear for storm watching
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600">📅</span>
                Check whale watching tour schedules
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600">🏨</span>
                Enjoy lower hotel rates and fewer crowds
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Winter Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">December</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Holiday light displays</li>
              <li>• Winter farmers markets</li>
              <li>• Cozy cafe events</li>
              <li>• Storm watching season begins</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">January-February</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Peak whale watching</li>
              <li>• Museum special exhibitions</li>
              <li>• Indoor art shows</li>
              <li>• Warm-up dining experiences</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Seasonal Guides */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Seasons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/guides/seasonal/spring"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🌸</div>
            <h3 className="font-semibold text-gray-900 mb-2">Spring in Santa Cruz</h3>
            <p className="text-sm text-gray-600">Wildflowers, whale watching, and mild weather</p>
          </Link>
          <Link
            href="/guides/seasonal/summer"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-yellow-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">☀️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Summer in Santa Cruz</h3>
            <p className="text-sm text-gray-600">Beaches, festivals, and peak tourism season</p>
          </Link>
          <Link
            href="/guides/seasonal/fall"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🍂</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fall in Santa Cruz</h3>
            <p className="text-sm text-gray-600">Harvest season, fewer crowds, and perfect weather</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function WinterGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <span>›</span>
            <Link href="/guides/seasonal" className="hover:text-blue-600">Seasonal</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Winter</span>
          </div>
        </nav>

        <Suspense fallback={<LoadingSkeleton />}>
          <WinterContent />
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
