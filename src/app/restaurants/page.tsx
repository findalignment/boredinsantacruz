import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurants - Santa Cruz Dining Guide',
  description: 'Discover the best restaurants in Santa Cruz County. Local favorites, hidden gems, and insider tips.',
};

// Placeholder restaurant data - will come from Airtable
const placeholderRestaurants = [
  {
    id: '1',
    name: 'Akira',
    cuisine: ['Japanese', 'Sushi'],
    priceLevel: 3,
    neighborhood: 'Downtown',
    address: '1222 Soquel Ave, Santa Cruz, CA 95062',
    phone: '(831) 600-7093',
    website: 'https://www.akirasc.com',
    description: 'Authentic Japanese cuisine with fresh sushi, ramen, and izakaya dishes.',
    bestDish: 'Omakase sushi',
    tips: 'Sit at the sushi bar for the freshest selections. Make reservations for dinner.',
    outdoor: false,
    vegetarianFriendly: true,
    veganOptions: true,
  },
  {
    id: '2',
    name: 'The Picnic Basket',
    cuisine: ['American', 'Café'],
    priceLevel: 2,
    neighborhood: 'Beach Street',
    address: '125 Beach St, Santa Cruz, CA 95060',
    phone: '(831) 427-9946',
    website: 'https://thepicnicbasket.com',
    description: 'Farm-to-table café with incredible sandwiches, salads, and baked goods.',
    bestDish: 'Turkey Pesto Sandwich',
    tips: 'Ask to sit in the secret garden patio out back! Get there early on weekends.',
    outdoor: true,
    vegetarianFriendly: true,
    veganOptions: true,
  },
  {
    id: '3',
    name: 'Tacos Moreno',
    cuisine: ['Mexican', 'Food Truck'],
    priceLevel: 1,
    neighborhood: 'Various',
    address: 'Various locations',
    description: 'The best breakfast burritos in Santa Cruz. Cash only!',
    bestDish: 'Chorizo Breakfast Burrito',
    tips: 'Cash only! They sell out by 11am. Follow on Instagram for daily locations.',
    outdoor: false,
    vegetarianFriendly: true,
    veganOptions: false,
  },
  {
    id: '4',
    name: 'Lúpulo Craft Beer House',
    cuisine: ['American', 'Gastropub'],
    priceLevel: 2,
    neighborhood: 'Downtown',
    address: '233 Cathcart St, Santa Cruz, CA 95060',
    phone: '(831) 454-8306',
    website: 'https://www.lupulosc.com',
    description: 'Gastropub with 24 rotating craft beers and elevated pub food.',
    bestDish: 'Beer-battered fish tacos',
    tips: 'Thursday trivia at 7pm is always packed. Great happy hour 3-6pm weekdays.',
    outdoor: true,
    vegetarianFriendly: true,
    veganOptions: true,
  },
  {
    id: '5',
    name: "Betty's Noodles",
    cuisine: ['Asian', 'Thai', 'Vietnamese'],
    priceLevel: 2,
    neighborhood: 'Westside',
    address: '2839 Mission St, Santa Cruz, CA 95060',
    phone: '(831) 429-8855',
    description: 'Local favorite for pad thai, pho, and Asian fusion. Huge portions!',
    bestDish: 'Pad Thai with Shrimp',
    tips: 'Cash only! Portions are huge - consider sharing. Always a wait during dinner rush.',
    outdoor: false,
    vegetarianFriendly: true,
    veganOptions: true,
  },
  {
    id: '6',
    name: 'La Posta',
    cuisine: ['Mexican'],
    priceLevel: 2,
    neighborhood: 'Seabright',
    address: '538 Seabright Ave, Santa Cruz, CA 95062',
    phone: '(831) 457-2782',
    website: 'https://lapostarestaurant.com',
    description: 'Authentic Mexican cuisine with amazing moles and traditional dishes.',
    bestDish: 'Mole poblano',
    tips: 'Try the mole - made fresh daily. Weekend brunch is special. Great margaritas!',
    outdoor: true,
    vegetarianFriendly: true,
    veganOptions: true,
  },
];

const cuisineTypes = ['All', 'Mexican', 'Japanese', 'American', 'Asian', 'Italian', 'Café'];
const neighborhoods = ['All', 'Downtown', 'Westside', 'Eastside', 'Seabright', 'Beach Street', 'Capitola', 'Aptos'];

const getPriceLevelLabel = (level: number) => {
  return '$'.repeat(level);
};

export default function RestaurantsPage() {
  const restaurants = placeholderRestaurants;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              🍴 Santa Cruz Restaurants
            </h1>
            <p className="text-lg text-gray-600">
              Local favorites, hidden gems, and insider dining tips
            </p>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🚀</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Full Restaurant Guide Coming Soon!
              </h2>
              <p className="text-orange-100 mb-4">
                We're building a comprehensive dining guide with:
              </p>
              <ul className="space-y-2 text-orange-50 mb-6">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>500+ restaurants across Santa Cruz County</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Insider tips from locals on best dishes and timing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Filter by cuisine, price, neighborhood, dietary needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Real-time hours, phone numbers, and parking info</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Integration with Google Places API for auto-updates</span>
                </li>
              </ul>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                  📊 Phase 1: Manual curation (50-100 best spots)
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                  🤖 Phase 2: API integration (500+ restaurants)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Filter Restaurants
          </h2>
          
          {/* Cuisine */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Cuisine Type
            </label>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price Level */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Price Level
            </label>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200">
                $ Budget
              </button>
              <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium hover:bg-orange-200">
                $$ Moderate
              </button>
              <button className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200">
                $$$ Upscale
              </button>
              <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200">
                $$$$ Fine Dining
              </button>
            </div>
          </div>

          {/* Neighborhood */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Neighborhood
            </label>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((hood) => (
                <button
                  key={hood}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  {hood}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Dietary Options
            </label>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-50 border border-green-300 text-green-800 rounded-full text-sm font-medium hover:bg-green-100">
                🌱 Vegetarian
              </button>
              <button className="px-4 py-2 bg-green-50 border border-green-300 text-green-800 rounded-full text-sm font-medium hover:bg-green-100">
                🌿 Vegan
              </button>
              <button className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-100">
                🌾 Gluten-Free
              </button>
            </div>
          </div>
        </div>

        {/* Preview Restaurants */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Featured Restaurants (Preview)
          </h2>
          <p className="text-gray-600 mb-6">
            Here's a taste of what's coming. Full directory launching soon!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {restaurant.cuisine.join(', ')}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm font-semibold">
                      {getPriceLevelLabel(restaurant.priceLevel)}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="mb-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      📍 {restaurant.neighborhood}
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {restaurant.description}
                  </p>

                  {/* Best Dish */}
                  {restaurant.bestDish && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
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
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <p className="text-xs font-semibold text-yellow-700 mb-1">
                        💡 INSIDER TIP
                      </p>
                      <p className="text-xs text-gray-700">
                        {restaurant.tips}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.outdoor && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        🌳 Outdoor
                      </span>
                    )}
                    {restaurant.vegetarianFriendly && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        🌱 Vegetarian
                      </span>
                    )}
                    {restaurant.veganOptions && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        🌿 Vegan
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {restaurant.website && (
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-orange-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Website
                      </a>
                    )}
                    {restaurant.phone && (
                      <a
                        href={`tel:${restaurant.phone}`}
                        className="px-3 py-2 bg-gray-100 text-gray-700 text-center text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        📞 Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Restaurant */}
        <div className="bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🍕</div>
            <h2 className="text-2xl font-bold mb-2">
              Own or Love a Restaurant?
            </h2>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Help us build the most comprehensive Santa Cruz dining guide. Submit your favorite spot 
              or claim your restaurant to ensure all information is accurate!
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-pink-50 transition-colors">
                Submit a Restaurant
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Claim Your Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

