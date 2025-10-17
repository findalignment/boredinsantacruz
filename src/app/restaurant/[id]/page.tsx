import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurantById } from '@/app/actions/getRestaurants';
import { getReviews, getAverageRating } from '@/app/actions/reviews';
import { ReviewsSummary } from '@/components/reviews/reviews-summary';
import { ReviewsList } from '@/components/reviews/reviews-list';
import { FavoriteButton } from '@/components/favorites/favorite-button';
import { getRestaurantStatus } from '@/lib/restaurants/hours';
import { ClickableAddress } from '@/components/clickable-address';

interface RestaurantPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getRestaurantById(id);
  
  if (!result.success || !result.data) {
    return {
      title: 'Restaurant Not Found',
    };
  }

  const restaurant = result.data;
  
  return {
    title: `${restaurant.name} - Santa Cruz Restaurants`,
    description: restaurant.description || `${restaurant.name} in ${restaurant.neighborhood}. ${restaurant.cuisine.join(', ')}.`,
  };
}

async function ReviewsSection({ restaurantId }: { restaurantId: string }) {
  const [reviewsResult, ratingResult] = await Promise.all([
    getReviews('Restaurant', restaurantId),
    getAverageRating('Restaurant', restaurantId),
  ]);

  const reviews = reviewsResult.success ? reviewsResult.data : [];
  const ratingInfo = ratingResult; // getAverageRating returns { average, count } directly

  return (
    <div className="space-y-6">
      <ReviewsSummary
        itemId={restaurantId}
        itemType="Restaurant"
        averageRating={ratingInfo.average}
        reviewCount={ratingInfo.count}
        showWriteButton={true}
      />
      {reviews.length > 0 && <ReviewsList reviews={reviews} />}
    </div>
  );
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const result = await getRestaurantById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const restaurant = result.data;
  const priceLabel = '$'.repeat(restaurant.priceLevel);
  const status = getRestaurantStatus(restaurant.hours);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/restaurants"
          className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-flex items-center gap-2 transition-colors"
        >
          ← Back to Restaurants
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {restaurant.image && restaurant.image[0]?.url ? (
              <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={restaurant.image[0].url}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative h-96 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍽️</div>
                  <div className="text-xl text-gray-600 font-medium">Photo Coming Soon</div>
                </div>
              </div>
            )}

            {/* Title & Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 flex-1">
                  {restaurant.name}
                </h1>
                <FavoriteButton
                  itemType="Restaurant"
                  itemId={restaurant.id}
                  size="lg"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {priceLabel}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  📍 {restaurant.neighborhood}
                </span>
                {restaurant.hours && (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status.isOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status.message}
                  </span>
                )}
              </div>

              {/* Cuisine Tags */}
              {restaurant.cuisine && restaurant.cuisine.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {restaurant.cuisine.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {restaurant.description && (
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {restaurant.description}
                  </p>
                </div>
              )}
            </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {restaurant.description}
              </p>
            </div>

            {/* WriteUp Section - Editorial Long-Form Content */}
            {restaurant.writeUp && (
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ✍️ Our Take
                </h2>
                <div className="prose prose-lg max-w-none text-gray-800">
                  <p className="whitespace-pre-line leading-relaxed">
                    {restaurant.writeUp}
                  </p>
                </div>
              </div>
            )}

            {/* Best Dish */}
            {restaurant.bestDish && (
              <div className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-orange-700 mb-2 flex items-center gap-2">
                  🍽️ Must Try Dish
                </h3>
                <p className="text-gray-900 font-medium text-xl">
                  {restaurant.bestDish}
                </p>
              </div>
            )}

            {/* Insider Tips */}
            {restaurant.tips && (
              <div className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  💡 Insider Tips
                </h3>
                <p className="text-gray-800">
                  {restaurant.tips}
                </p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact & Location */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Location & Contact
                </h3>
                
                {restaurant.address && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Address</p>
                    <ClickableAddress address={restaurant.address} />
                  </div>
                )}

                {restaurant.phone && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      📞 {restaurant.phone}
                    </a>
                  </div>
                )}

                {restaurant.website && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Website</p>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                )}

                {restaurant.instagram && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Instagram</p>
                    <a
                      href={`https://instagram.com/${restaurant.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      📷 @{restaurant.instagram.replace('@', '')}
                    </a>
                  </div>
                )}
              </div>

              {/* Hours & Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Details
                </h3>

                {restaurant.hours && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Hours</p>
                    <div className="text-gray-800 space-y-1">
                      {restaurant.hours.split(';').map((day, index) => (
                        <div key={index} className="text-sm">
                          {day.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {restaurant.parking && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Parking</p>
                    <p className="text-gray-800">{restaurant.parking}</p>
                  </div>
                )}

                {restaurant.bestTime && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Best Time to Visit</p>
                    <p className="text-gray-800">{restaurant.bestTime}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Features & Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {restaurant.dineIn && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                    🍽️ Dine-In
                  </span>
                )}
                {restaurant.takeout && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                    📦 Takeout
                  </span>
                )}
                {restaurant.delivery && (
                  <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium border border-pink-200">
                    🚗 Delivery
                  </span>
                )}
                {restaurant.outdoor && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    🌳 Outdoor Seating
                  </span>
                )}
                {restaurant.reservations && (
                  <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                    📅 Reservations
                  </span>
                )}
                {restaurant.vegetarianFriendly && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    🌱 Vegetarian Friendly
                  </span>
                )}
                {restaurant.veganOptions && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    🌿 Vegan Options
                  </span>
                )}
                {restaurant.glutenFree && (
                  <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                    🌾 Gluten-Free Options
                  </span>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews & Ratings
              </h3>
              <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>}>
                <ReviewsSection restaurantId={restaurant.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

