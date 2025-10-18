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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: restaurant.image && restaurant.image[0]?.url 
          ? `url(${restaurant.image[0].url})` 
          : 'linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)'
      }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-xl mb-4">
              {restaurant.cuisine && restaurant.cuisine.length > 0 
                ? restaurant.cuisine.join(' • ') 
                : 'Restaurant'
              }
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-green-100/20 backdrop-blur-sm text-green-100 rounded-full text-lg font-semibold border border-green-200/30">
                {priceLabel}
              </span>
              <span className="px-4 py-2 bg-blue-100/20 backdrop-blur-sm text-blue-100 rounded-full text-lg font-semibold border border-blue-200/30">
                📍 {restaurant.neighborhood}
              </span>
              {restaurant.hours && (
                <span className={`px-4 py-2 backdrop-blur-sm rounded-full text-lg font-semibold border ${
                  status.isOpen 
                    ? 'bg-green-100/20 text-green-100 border-green-200/30' 
                    : 'bg-gray-100/20 text-gray-100 border-gray-200/30'
                }`}>
                  {status.message}
                </span>
              )}
            </div>
            {restaurant.description && (
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                {restaurant.description}
              </p>
            )}
          </div>
        </div>
      </section>

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
            {/* Title & Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About {restaurant.name}</h2>
                  <div className="flex items-center gap-4">
                    <FavoriteButton
                      itemType="Restaurant"
                      itemId={restaurant.id}
                      size="lg"
                    />
                  </div>
                </div>
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
            </div>

            {/* WriteUp Section - Editorial Long-Form Content */}
            {restaurant.writeUp && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
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
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
                  🍽️ Must Try Dish
                </h3>
                <p className="text-gray-900 font-medium text-lg">
                  {restaurant.bestDish}
                </p>
              </div>
            )}

            {/* Insider Tips */}
            {restaurant.tips && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  💡 Insider Tips
                </h3>
                <p className="text-gray-800">
                  {restaurant.tips}
                </p>
              </div>
            )}

            {/* Info Grid */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
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
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews & Ratings
              </h3>
              <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>}>
                <ReviewsSection restaurantId={restaurant.id} />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Info
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Price Level</p>
                  <p className="text-lg font-bold text-green-600">{priceLabel}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Neighborhood</p>
                  <p className="text-gray-900">{restaurant.neighborhood}</p>
                </div>

                {restaurant.hours && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
                    <p className={`font-medium ${
                      status.isOpen ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {status.message}
                    </p>
                  </div>
                )}

                {restaurant.phone && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {restaurant.phone}
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
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit Website →
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <FavoriteButton
                    itemType="Restaurant"
                    itemId={restaurant.id}
                    size="lg"
                    showLabel={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

