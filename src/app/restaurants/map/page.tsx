import Link from 'next/link';
import type { Metadata } from 'next';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantMap } from '@/components/restaurants/restaurant-map';

export const metadata: Metadata = {
  title: 'Restaurant Map - Santa Cruz Dining Guide',
  description: 'Interactive map of all restaurants in Santa Cruz County. Find dining options near you.',
};

export default async function RestaurantMapPage() {
  const result = await getRestaurants();
  const restaurants = result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/restaurants"
            className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-flex items-center gap-2 transition-colors"
          >
            ← Back to Restaurants
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🗺️ Restaurant Map
            </h1>
            <p className="text-lg text-gray-600">
              Explore {restaurants.length} restaurants across Santa Cruz County
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <RestaurantMap restaurants={restaurants} />
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 How to use the map
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Click on a marker to see restaurant details</li>
            <li>• Use the controls to zoom and navigate</li>
            <li>• Markers show restaurant locations across the county</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

