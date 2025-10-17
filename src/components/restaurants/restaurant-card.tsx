import Link from 'next/link';
import Image from 'next/image';
import type { Restaurant } from '@/types';
import { getRestaurantStatus } from '@/lib/restaurants/hours';

interface RestaurantCardProps {
  restaurant: Restaurant;
  showOpenStatus?: boolean;
}

export function RestaurantCard({ restaurant, showOpenStatus = true }: RestaurantCardProps) {
  const priceLabel = '$'.repeat(restaurant.priceLevel);
  const status = getRestaurantStatus(restaurant.hours);

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-orange-300 hover:-translate-y-1 h-full">
        {/* Image */}
        {restaurant.image && restaurant.image[0]?.url ? (
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <Image
              src={restaurant.image[0].url}
              alt={restaurant.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🍽️</div>
              <div className="text-sm text-gray-600 font-medium">Photo Coming Soon</div>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-600">
                {restaurant.cuisine.join(', ')}
              </p>
            </div>
            <span className="ml-3 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-semibold border border-orange-200">
              {priceLabel}
            </span>
          </div>

          {/* Open Status */}
          {showOpenStatus && restaurant.hours && (
            <div className="mb-3">
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  status.isOpen ? 'text-green-700' : 'text-gray-600'
                }`}
              >
                {status.message}
              </span>
            </div>
          )}

          {/* Location */}
          <div className="mb-3">
            <p className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              📍 {restaurant.neighborhood}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {restaurant.description}
          </p>

          {/* Best Dish */}
          {restaurant.bestDish && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 mb-4 border border-orange-200">
              <p className="text-xs font-semibold text-orange-700 mb-1">
                🍽️ MUST TRY
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {restaurant.bestDish}
              </p>
            </div>
          )}

          {/* Insider Tip */}
          {restaurant.tips && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-yellow-700 mb-1">
                💡 INSIDER TIP
              </p>
              <p className="text-xs text-gray-700 line-clamp-2">
                {restaurant.tips}
              </p>
            </div>
          )}

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {restaurant.outdoor && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                🌳 Outdoor
              </span>
            )}
            {restaurant.takeout && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                📦 Takeout
              </span>
            )}
            {restaurant.delivery && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                🚗 Delivery
              </span>
            )}
            {restaurant.vegetarianFriendly && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                🌱 Vegetarian
              </span>
            )}
            {restaurant.veganOptions && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                🌿 Vegan
              </span>
            )}
            {restaurant.glutenFree && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
                🌾 GF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

