import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Restaurants in Santa Cruz | Top 20 Places to Eat in 2025',
  description: 'Discover the best restaurants in Santa Cruz. From seafood to tacos, fine dining to casual eats - find your next great meal.',
  keywords: 'best restaurants santa cruz, where to eat, top restaurants, best food, dining guide, santa cruz food',
};

export default function BestRestaurantsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🍽️ Best Restaurants in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Top 20 places to eat in Santa Cruz County
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz's food scene is as diverse as its landscape. From fresh-caught seafood at the harbor to 
            authentic tacos on the Westside, farm-to-table fine dining to college-town pizza joints, this coastal 
            town serves up incredible food at every price point. Here are the absolute best restaurants in Santa Cruz.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 20 Restaurants</h2>
          <div className="space-y-6">
            {[
              { name: "Oswald", cuisine: "European", price: "$$$", why: "Upscale, seasonal menu, exceptional service" },
              { name: "Laili Restaurant", cuisine: "Afghan", price: "$$", why: "Authentic, beautiful patio, vegetarian-friendly" },
              { name: "The Crow's Nest", cuisine: "Seafood", price: "$$$", why: "Harbor views, fresh catch, sunset dining" },
              { name: "Shadowbrook", cuisine: "American", price: "$$$", why: "Romantic, creekside, cable car entrance" },
              { name: "Bantam", cuisine: "New American", price: "$$", why: "Wood-fired, creative, cozy atmosphere" },
              { name: "Aldo's Harbor Restaurant", cuisine: "Italian", price: "$$-$$$", why: "Waterfront, homemade pasta, family-owned" },
              { name: "Akira", cuisine: "Japanese", price: "$$$", why: "Sushi bar, fresh fish, intimate setting" },
              { name: "Gayle's Bakery", cuisine: "Bakery/Deli", price: "$", why: "Legendary bakery, breakfast, lunch, desserts" },
              { name: "Soif Wine Bar", cuisine: "Wine Bar", price: "$$", why: "Extensive wines, small plates, downtown" },
              { name: "Hula's Island Grill", cuisine: "Hawaiian", price: "$$", why: "Tropical vibes, fresh poke, mai tais" },
              { name: "Engfer Pizza Works", cuisine: "Pizza", price: "$$", why: "NY-style, by the slice, late night" },
              { name: "Taqueria Vallarta", cuisine: "Mexican", price: "$", why: "Best tacos, authentic, cash only" },
              { name: "Linda's Seabreeze Cafe", cuisine: "Breakfast", price: "$", why: "Local favorite, huge portions, casual" },
              { name: "Venus Spirits Cocktail Lounge", cuisine: "Cocktails", price: "$$", why: "Craft spirits, innovative drinks, snacks" },
              { name: "The Picnic Basket", cuisine: "Sandwiches", price: "$", why: "Fresh, healthy, large portions" },
              { name: "Pearl of the Ocean", cuisine: "Chinese", price: "$", why: "Authentic Sichuan, spicy, generous" },
              { name: "India Joze", cuisine: "Global Fusion", price: "$$", why: "Eclectic menu, creative flavors, unique" },
              { name: "Chocolate", cuisine: "Dessert", price: "$", why: "Decadent desserts, coffee, wine" },
              { name: "Betty's Noodles", cuisine: "Asian Fusion", price: "$", why: "Quick, fresh, customizable bowls" }
            ].map((restaurant, i) => (
              <Link
                key={i}
                href="/restaurants"
                className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-orange-300 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors">{i + 1}. {restaurant.name}</h3>
                  <span className="text-sm font-semibold text-red-600">{restaurant.price}</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{restaurant.cuisine}</span>
                </div>
                <p className="text-gray-600 mb-3">{restaurant.why}</p>
                <div className="text-sm font-medium text-orange-600 flex items-center gap-1">
                  View on full list →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best By Cuisine</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { category: "🍕 Best Pizza", pick: "Engfer Pizza Works" },
              { category: "🌮 Best Tacos", pick: "Taqueria Vallarta" },
              { category: "🍣 Best Sushi", pick: "Akira or Mobo Sushi" },
              { category: "🍝 Best Italian", pick: "Aldo's or Gabriella Cafe" },
              { category: "🥩 Best Steak", pick: "Shadowbrook" },
              { category: "🦞 Best Seafood", pick: "Crow's Nest or Stagnaro's" },
              { category: "🍜 Best Asian", pick: "Betty's Noodles" },
              { category: "🥗 Best Healthy", pick: "The Picnic Basket" },
              { category: "🍰 Best Dessert", pick: "Gayle's Bakery" },
              { category: "☕ Best Coffee", pick: "Verve Coffee" },
              { category: "🍺 Best Brewery", pick: "Discretion Brewing" },
              { category: "🍷 Best Wine Bar", pick: "Soif" }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-gray-900 mb-1">{item.category}</h3>
                <p className="text-sm text-gray-700">{item.pick}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Restaurant Neighborhoods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">📍 Downtown</h3>
              <p className="text-gray-700 mb-2">Pacific Avenue corridor, most walkable dining district</p>
              <p className="text-sm text-gray-600">Oswald, Soif, Engfer, many more</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">🚢 Harbor</h3>
              <p className="text-gray-700 mb-2">Fresh seafood with waterfront views</p>
              <p className="text-sm text-gray-600">Crow's Nest, Aldo's, Stagnaro's</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🏄 Westside</h3>
              <p className="text-gray-700 mb-2">Taco shops, surf vibes, casual eats</p>
              <p className="text-sm text-gray-600">Taqueria Vallarta, Linda's, locals spots</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🏘️ Capitola</h3>
              <p className="text-gray-700 mb-2">Village dining, scenic beachside</p>
              <p className="text-sm text-gray-600">Shadowbrook, Gayle's, waterfront cafes</p>
            </div>
          </div>
        </section>

        <div className="bg-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore All Restaurants</h2>
          <p className="text-xl mb-6">Browse menus, reviews, and make reservations</p>
          <Link href="/restaurants" className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50">
            View Restaurant Directory
          </Link>
        </div>
      </div>
    </main>
  );
}

