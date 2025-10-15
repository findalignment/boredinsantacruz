import Link from 'next/link';
import type { Metadata } from 'next';
import { FilteredRestaurants } from '@/components/restaurants/filtered-restaurants';
import { getRestaurants } from '@/app/actions/getRestaurants';

export const metadata: Metadata = {
  title: 'Restaurants - Santa Cruz Dining Guide',
  description: 'Discover the best restaurants in Santa Cruz County. Local favorites, hidden gems, and insider tips.',
};

// Staff Picks - These can be featured restaurants
const STAFF_PICK_IDS = [
  // Will be populated from Airtable or hardcoded IDs
];

export default async function RestaurantsPage() {
  const result = await getRestaurants();
  const restaurants = result.success ? result.data : [];

  // Staff picks - can be flagged in Airtable or manually curated
  const staffPicks = restaurants.filter(r => 
    STAFF_PICK_IDS.includes(r.id) || r.bestDish || r.tips
  ).slice(0, 6);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-flex items-center gap-2 transition-colors"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                🍴 Santa Cruz Restaurants
              </h1>
              <Link
                href="/restaurants/map"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                🗺️ Map View
              </Link>
            </div>
            <p className="text-lg text-gray-600">
              {restaurants.length > 0 
                ? `Discover ${restaurants.length}+ local favorites, hidden gems, and insider dining tips`
                : 'Local favorites, hidden gems, and insider dining tips'}
            </p>
          </div>
        </div>

        {/* Staff Picks Section */}
        {staffPicks.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">⭐</span>
                <h2 className="text-3xl font-bold">
                  Staff Picks
                </h2>
              </div>
              <p className="text-orange-100">
                Our team's favorite spots — tested, approved, and guaranteed delicious
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffPicks.map((restaurant) => {
                const priceLabel = '$'.repeat(restaurant.priceLevel);
                return (
                  <Link 
                    key={restaurant.id} 
                    href={`/restaurant/${restaurant.id}`}
                    className="block group"
                  >
                    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-1 h-full">
                      {/* Staff Pick Badge */}
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-center">
                        <span className="font-bold text-sm">⭐ STAFF PICK</span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                              {restaurant.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {restaurant.cuisine.join(', ')}
                            </p>
                          </div>
                          <span className="ml-3 px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold">
                            {priceLabel}
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-blue-600 flex items-center gap-1">
                            📍 {restaurant.neighborhood}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {restaurant.description}
                        </p>

                        {restaurant.bestDish && (
                          <div className="bg-white rounded-lg p-3 border-2 border-orange-200">
                            <p className="text-xs font-semibold text-orange-700 mb-1">
                              🍽️ MUST TRY
                            </p>
                            <p className="text-sm text-gray-800 font-medium">
                              {restaurant.bestDish}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Filtered Restaurants Section */}
        <FilteredRestaurants initialRestaurants={restaurants} />

        {/* Submit Restaurant CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            <div className="text-5xl mb-4">🍕</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Own or Love a Restaurant?
            </h2>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Help us build the most comprehensive Santa Cruz dining guide. Submit your favorite spot 
              or claim your restaurant to ensure all information is accurate!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hello@boredinsantacruz.com?subject=Submit a Restaurant"
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-pink-50 transition-colors shadow-lg"
              >
                Submit a Restaurant
              </a>
              <a
                href="mailto:hello@boredinsantacruz.com?subject=Claim My Restaurant"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                Claim Your Restaurant
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
