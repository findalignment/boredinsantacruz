import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRestaurants } from '@/app/actions/getRestaurants';

export const metadata: Metadata = {
  title: 'Best Pizza in Santa Cruz - Top Pizzerias & Italian Restaurants',
  description: 'Discover the best pizza in Santa Cruz! From wood-fired Neapolitan to New York style, find the perfect slice at Santa Cruz County\'s top pizzerias.',
  keywords: 'best pizza santa cruz, santa cruz pizza, pizza restaurants santa cruz, wood fired pizza santa cruz, neapolitan pizza santa cruz, new york pizza santa cruz',
  openGraph: {
    title: 'Best Pizza in Santa Cruz - Top Pizzerias & Italian Restaurants',
    description: 'Discover the best pizza in Santa Cruz! From wood-fired Neapolitan to New York style, find the perfect slice.',
    type: 'article',
  },
};

export default async function BestPizzaPage() {
  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];
  
  // Filter for pizza restaurants
  const pizzaRestaurants = allRestaurants.filter(restaurant => 
    restaurant.cuisine?.some(cuisine => 
      cuisine.toLowerCase().includes('pizza') || 
      cuisine.toLowerCase().includes('italian')
    ) || 
    restaurant.name.toLowerCase().includes('pizza')
  );

  // Sort by rating (highest first)
  const sortedPizza = pizzaRestaurants.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🍕 Best Pizza in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From wood-fired Neapolitan to New York style, discover Santa Cruz County's most delicious pizza spots. 
            Each slice tells a story of local ingredients and culinary passion.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{pizzaRestaurants.length}</div>
              <div className="text-sm text-gray-600">Pizza Spots</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.5+</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">$15-25</div>
              <div className="text-sm text-gray-600">Price Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">All Day</div>
              <div className="text-sm text-gray-600">Best Time</div>
            </div>
          </div>
        </div>

        {/* Top Pizza Spots */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏆 Top Pizza Spots</h2>
          <div className="grid gap-8">
            {sortedPizza.slice(0, 5).map((restaurant, index) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    {restaurant.image && restaurant.image[0]?.url ? (
                      <Image
                        src={restaurant.image[0].url}
                        alt={`${restaurant.name} pizza restaurant`}
                        width={400}
                        height={300}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    ) : (
                      <div className="h-64 md:h-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-6xl mb-2">🍕</span>
                          <div className="text-sm text-gray-600 font-medium">Pizza Photo</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
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
                      <p className="text-red-600 font-medium mb-3">
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
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        🍕 Pizza
                      </span>
                      {restaurant.priceLevel && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {Array(restaurant.priceLevel).fill('$').join('')}
                        </span>
                      )}
                      {restaurant.dineIn && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Dine In
                        </span>
                      )}
                      {restaurant.takeout && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Takeout
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/restaurant/${restaurant.id}`}
                      className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      View Menu & Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pizza Types Guide */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🍕 Pizza Styles in Santa Cruz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wood-Fired</h3>
              <p className="text-gray-600 text-sm">
                Authentic Neapolitan-style pizza cooked in wood-fired ovens for that perfect char and chew.
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-4xl mb-3">🏙️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">New York Style</h3>
              <p className="text-gray-600 text-sm">
                Large, foldable slices with thin crust, perfect for eating on the go or sharing with friends.
              </p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl mb-3">🍅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gourmet</h3>
              <p className="text-gray-600 text-sm">
                Artisanal pizzas with creative toppings, local ingredients, and innovative flavor combinations.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Pizza Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🍕 Ordering Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Call ahead for popular spots - pizza is always better fresh from the oven
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Ask about daily specials and seasonal toppings
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Many places offer gluten-free and vegan options
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Consider half-and-half toppings to try more flavors
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">⏰ Best Times</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Lunch: 11:30 AM - 2:00 PM (less crowded)
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Dinner: 5:00 PM - 7:00 PM (avoid peak hours)
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Weekdays generally less busy than weekends
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Happy hour specials often available 3-6 PM
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">More Food Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/best-tacos-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🌮 Best Tacos</h3>
              <p className="text-gray-600 text-sm">Authentic Mexican tacos and street food in Santa Cruz</p>
            </Link>
            <Link href="/best-sushi-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🍣 Best Sushi</h3>
              <p className="text-gray-600 text-sm">Fresh sushi and Japanese cuisine spots</p>
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
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            ← Back to All Guides
          </Link>
        </div>
      </div>
    </main>
  );
}
