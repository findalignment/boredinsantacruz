import { Metadata } from 'next';
import Link from 'next/link';
import { getRestaurants } from '@/app/actions/getRestaurants';

export const metadata: Metadata = {
  title: 'Santa Cruz Restaurant Week 2025 | October 22-29',
  description: 'Santa Cruz Restaurant Week returns for its 17th year! 8 days of special menus celebrating culinary excellence across Santa Cruz County. October 22-29, 2025.',
  keywords: ['Santa Cruz Restaurant Week', 'dining event', 'special menus', 'Santa Cruz restaurants', 'October 2025'],
  openGraph: {
    title: 'Santa Cruz Restaurant Week 2025',
    description: '8-day celebration of culinary excellence | October 22-29, 2025',
    type: 'website',
  },
};

// Participating restaurants list from santacruzrestaurantweek.com
const PARTICIPATING_RESTAURANTS = {
  capitola: [
    'Margaritaville Capitola',
    "Pete's Capitola",
    'Mobo Sushi',
    'Avanti Restaurant',
    'Gabriella Cafe',
  ],
  santaCruz: [
    "Zelda's on the Beach",
    'Venus Spirits',
    'Sugo Italian Restaurant',
    'La Posta Italian Cuisine',
    "Jack O'Neill Restaurant",
    'Hook+Line',
    'Chocolate Santa Cruz',
    // Additional Santa Cruz restaurants (19 total listed)
    'Chaminade Resort & Spa',
    'Crow\'s Nest',
    'Oswald',
    'Soif Wine Bar',
    'Penny Ice Creamery',
    'Aquarius',
    'Bantam',
    'Sanderlings',
    'Alderwood',
    'The Picnic Basket',
    'Vinocruz',
    'Laili Restaurant',
  ],
  aptos: [
    'Bittersweet Bistro',
  ],
  scottsValley: [
    'Scopazzi\'s',
    'Hilltop Bistro',
  ],
  soquel: [
    'Manuel\'s Mexican Restaurant',
    'Clouds Downtown',
  ],
};

export default async function RestaurantWeekPage() {
  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];

  // Match participating restaurants with our database
  const matchRestaurant = (name: string) => {
    return allRestaurants.find(r => {
      const nameLower = r.name.toLowerCase();
      const searchLower = name.toLowerCase();
      return nameLower.includes(searchLower.split(' ')[0]) || 
             searchLower.includes(nameLower.split(' ')[0]);
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-sm font-semibold">17th Annual Event</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Santa Cruz Restaurant Week
            </h1>
            
            <p className="text-xl md:text-2xl mb-2 text-orange-100">
              October 22-29, 2025
            </p>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
              8 days celebrating culinary excellence across Santa Cruz County
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#participating"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-lg"
              >
                View Participating Restaurants
              </Link>
              <a
                href="https://santacruzrestaurantweek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-orange-800 text-white font-bold rounded-lg hover:bg-orange-900 transition-all shadow-lg"
              >
                Official Website →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">When</h3>
              <p className="text-gray-600">October 22-29, 2025</p>
              <p className="text-sm text-gray-500 mt-1">8 days of special menus</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">🍴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">What</h3>
              <p className="text-gray-600">Special prix fixe menus</p>
              <p className="text-sm text-gray-500 mt-1">Curated by local chefs</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Where</h3>
              <p className="text-gray-600">Throughout Santa Cruz County</p>
              <p className="text-sm text-gray-500 mt-1">Santa Cruz, Capitola, Aptos & more</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 About Restaurant Week
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Santa Cruz Restaurant Week returns for its <strong>17th year</strong>, celebrating 
              the county's finest culinary talent. For 8 days, participating restaurants offer 
              special prix fixe menus showcasing their best dishes at great values.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              This is your chance to try new restaurants, revisit favorites, and experience 
              creative menus crafted by Santa Cruz County's talented chefs.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-gray-800">
                <strong>💡 Pro Tip:</strong> Restaurant Week is extremely popular! 
                Make reservations early at your favorite spots to secure your table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participating Restaurants */}
      <section id="participating" className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Participating Restaurants
            </h2>
            <p className="text-lg text-gray-600">
              Click on any restaurant to view their full details, menu, and hours
            </p>
          </div>

          {/* Capitola */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">🌊</span>
              Capitola ({PARTICIPATING_RESTAURANTS.capitola.length} restaurants)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTICIPATING_RESTAURANTS.capitola.map((name) => {
                const restaurant = matchRestaurant(name);
                return (
                  <div
                    key={name}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 overflow-hidden"
                  >
                    {/* Restaurant Logo/Image placeholder */}
                    <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <span className="text-5xl">🍽️</span>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
                      {restaurant ? (
                        <>
                          {restaurant.cuisine && (
                            <p className="text-sm text-orange-600 mb-3">
                              {restaurant.cuisine.join(', ')}
                            </p>
                          )}
                          {restaurant.address && (
                            <p className="text-sm text-gray-600 mb-4">
                              📍 {restaurant.neighborhood || 'Capitola'}
                            </p>
                          )}
                          <Link
                            href={`/restaurant/${restaurant.id}`}
                            className="block w-full py-2 bg-orange-600 text-white text-center font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            View Details →
                          </Link>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Capitola, CA</p>
                          <a
                            href="https://santacruzrestaurantweek.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Learn More →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Santa Cruz */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">🌊</span>
              Santa Cruz ({PARTICIPATING_RESTAURANTS.santaCruz.length} restaurants)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTICIPATING_RESTAURANTS.santaCruz.map((name) => {
                const restaurant = matchRestaurant(name);
                return (
                  <div
                    key={name}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 overflow-hidden"
                  >
                    <div className="h-32 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                      <span className="text-5xl">🍽️</span>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
                      {restaurant ? (
                        <>
                          {restaurant.cuisine && (
                            <p className="text-sm text-orange-600 mb-3">
                              {restaurant.cuisine.join(', ')}
                            </p>
                          )}
                          {restaurant.address && (
                            <p className="text-sm text-gray-600 mb-4">
                              📍 {restaurant.neighborhood || 'Santa Cruz'}
                            </p>
                          )}
                          <Link
                            href={`/restaurant/${restaurant.id}`}
                            className="block w-full py-2 bg-orange-600 text-white text-center font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            View Details →
                          </Link>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Santa Cruz, CA</p>
                          <a
                            href="https://santacruzrestaurantweek.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Learn More →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aptos */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">🌳</span>
              Aptos ({PARTICIPATING_RESTAURANTS.aptos.length} restaurant)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTICIPATING_RESTAURANTS.aptos.map((name) => {
                const restaurant = matchRestaurant(name);
                return (
                  <div
                    key={name}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 overflow-hidden"
                  >
                    <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <span className="text-5xl">🍽️</span>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
                      {restaurant ? (
                        <>
                          {restaurant.cuisine && (
                            <p className="text-sm text-orange-600 mb-3">
                              {restaurant.cuisine.join(', ')}
                            </p>
                          )}
                          <Link
                            href={`/restaurant/${restaurant.id}`}
                            className="block w-full py-2 bg-orange-600 text-white text-center font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            View Details →
                          </Link>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Aptos, CA</p>
                          <a
                            href="https://santacruzrestaurantweek.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Learn More →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scotts Valley & Soquel */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Scotts Valley */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🏔️</span>
                Scotts Valley ({PARTICIPATING_RESTAURANTS.scottsValley.length} restaurants)
              </h3>
              <div className="space-y-4">
                {PARTICIPATING_RESTAURANTS.scottsValley.map((name) => {
                  const restaurant = matchRestaurant(name);
                  return (
                    <div
                      key={name}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 p-6"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{name}</h4>
                      {restaurant ? (
                        <Link
                          href={`/restaurant/${restaurant.id}`}
                          className="text-orange-600 hover:text-orange-700 font-semibold"
                        >
                          View Details →
                        </Link>
                      ) : (
                        <a
                          href="https://santacruzrestaurantweek.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 font-semibold"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soquel */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🌲</span>
                Soquel ({PARTICIPATING_RESTAURANTS.soquel.length} restaurants)
              </h3>
              <div className="space-y-4">
                {PARTICIPATING_RESTAURANTS.soquel.map((name) => {
                  const restaurant = matchRestaurant(name);
                  return (
                    <div
                      key={name}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 p-6"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{name}</h4>
                      {restaurant ? (
                        <Link
                          href={`/restaurant/${restaurant.id}`}
                          className="text-orange-600 hover:text-orange-700 font-semibold"
                        >
                          View Details →
                        </Link>
                      ) : (
                        <a
                          href="https://santacruzrestaurantweek.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 font-semibold"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Other Upcoming Food Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200">
              <div className="text-5xl mb-4">🍔</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Santa Cruz Burger Week
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                February 26 – March 9, 2026
              </p>
              <p className="text-gray-600 mb-4">
                Celebrate the county's creative chefs with special burger creations at restaurants across Santa Cruz County.
              </p>
              <a
                href="https://santacruzrestaurantweek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-purple-200">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Santa Cruz Pizza Week
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Coming Soon
              </p>
              <p className="text-gray-600 mb-4">
                A celebration of Santa Cruz County's best pizzerias and their creative pies.
              </p>
              <a
                href="https://santacruzrestaurantweek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Restaurant Week?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Make your reservations now for October 22-29, 2025
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/restaurants"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-lg"
            >
              Browse All Restaurants
            </Link>
            <a
              href="https://santacruzrestaurantweek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-orange-800 text-white font-bold rounded-lg hover:bg-orange-900 transition-all shadow-lg"
            >
              Official Event Site →
            </a>
          </div>
        </div>
      </section>

      {/* Source Attribution */}
      <section className="py-8 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            Event information from{' '}
            <a
              href="https://santacruzrestaurantweek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              santacruzrestaurantweek.com
            </a>
            {' '}• Powered by Restoweeks
          </p>
        </div>
      </section>
    </main>
  );
}

