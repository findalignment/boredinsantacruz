import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRestaurants } from '@/app/actions/getRestaurants';

export const metadata: Metadata = {
  title: 'Best Sushi in Santa Cruz - Top Japanese Restaurants & Sushi Bars',
  description: 'Discover the best sushi in Santa Cruz! From fresh sashimi to creative rolls, find the perfect Japanese dining experience at Santa Cruz County\'s top sushi restaurants.',
  keywords: 'best sushi santa cruz, santa cruz sushi, japanese restaurants santa cruz, sushi bars santa cruz, fresh sushi santa cruz, sashimi santa cruz',
  openGraph: {
    title: 'Best Sushi in Santa Cruz - Top Japanese Restaurants & Sushi Bars',
    description: 'Discover the best sushi in Santa Cruz! From fresh sashimi to creative rolls, find the perfect Japanese dining experience.',
    type: 'article',
  },
};

export default async function BestSushiPage() {
  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];
  
  // Filter for Japanese/sushi restaurants
  const sushiRestaurants = allRestaurants.filter(restaurant => 
    restaurant.cuisine?.some(cuisine => 
      cuisine.toLowerCase().includes('japanese') || 
      cuisine.toLowerCase().includes('sushi') ||
      cuisine.toLowerCase().includes('asian')
    ) || 
    restaurant.name.toLowerCase().includes('sushi')
  );

  // Sort by rating (highest first)
  const sortedSushi = sushiRestaurants.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🍣 Best Sushi in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From fresh sashimi to creative rolls, discover Santa Cruz County's finest Japanese cuisine. 
            Ocean-fresh ingredients meet traditional techniques for an unforgettable dining experience.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{sushiRestaurants.length}</div>
              <div className="text-sm text-gray-600">Sushi Spots</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">4.4+</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">$20-45</div>
              <div className="text-sm text-gray-600">Price Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">Dinner</div>
              <div className="text-sm text-gray-600">Best Time</div>
            </div>
          </div>
        </div>

        {/* Top Sushi Spots */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏆 Top Sushi Spots</h2>
          <div className="grid gap-8">
            {sortedSushi.slice(0, 5).map((restaurant, index) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    {restaurant.image && restaurant.image[0]?.url ? (
                      <Image
                        src={restaurant.image[0].url}
                        alt={`${restaurant.name} sushi restaurant`}
                        width={400}
                        height={300}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    ) : (
                      <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-6xl mb-2">🍣</span>
                          <div className="text-sm text-gray-600 font-medium">Sushi Photo</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-bold">
                            #{index + 1}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                        </div>
                        {restaurant.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-yellow-400">⭐</span>
                            <span className="font-semibold">{restaurant.rating}</span>
                            <span className="text-gray-600 text-sm">rating</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {restaurant.cuisine && (
                      <p className="text-blue-600 font-medium mb-3">
                        {restaurant.cuisine.join(', ')}
                      </p>
                    )}

                    {restaurant.description && (
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {restaurant.description}
                      </p>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {restaurant.address && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">📍 Location</p>
                          <p className="text-gray-600">{restaurant.neighborhood || restaurant.address.split(',')[0]}</p>
                        </div>
                      )}
                      {restaurant.hours && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">🕒 Hours</p>
                          <p className="text-gray-600 text-sm">
                            {restaurant.hours.split(';')[0]} {/* Show first day's hours */}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        🍣 Sushi
                      </span>
                      {restaurant.priceLevel && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {Array(restaurant.priceLevel).fill('$').join('')}
                        </span>
                      )}
                      {restaurant.dineIn && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Dine In
                        </span>
                      )}
                      {restaurant.takeout && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                          Takeout
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/restaurant/${restaurant.id}`}
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Menu & Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sushi Types Guide */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🍣 Sushi Styles in Santa Cruz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">🐟</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Sashimi</h3>
              <p className="text-gray-600 text-sm">
                Ocean-fresh fish sliced perfectly, highlighting the natural flavors of local catches.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-3">🍱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Creative Rolls</h3>
              <p className="text-gray-600 text-sm">
                Innovative combinations with local ingredients, perfect for adventurous palates.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-3">🍚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Traditional Nigiri</h3>
              <p className="text-gray-600 text-sm">
                Classic hand-pressed sushi with expertly seasoned rice and premium fish.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Sushi Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🍣 Ordering Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ask about the day's fresh catches and chef's specials
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Start with lighter fish and work toward richer flavors
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Try omakase (chef's choice) for the full experience
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ask about local fish - Santa Cruz has amazing fresh catches
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">⏰ Best Times</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Dinner: 6:00 PM - 8:30 PM (peak freshness)
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Lunch: 11:30 AM - 2:00 PM (lighter crowds)
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Weekdays generally less busy than weekends
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Happy hour often includes discounted rolls and sake
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">More Food Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/best-pizza-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🍕 Best Pizza</h3>
              <p className="text-gray-600 text-sm">Wood-fired and New York style pizza in Santa Cruz</p>
            </Link>
            <Link href="/best-tacos-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🌮 Best Tacos</h3>
              <p className="text-gray-600 text-sm">Authentic Mexican tacos and street food</p>
            </Link>
            <Link href="/best-breakfast-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🥞 Best Breakfast</h3>
              <p className="text-gray-600 text-sm">Morning favorites and brunch spots</p>
            </Link>
          </div>
        </section>

        {/* Back to Guides */}
        <div className="text-center">
          <Link
            href="/guides"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Back to All Guides
          </Link>
        </div>
      </div>
    </main>
  );
}
