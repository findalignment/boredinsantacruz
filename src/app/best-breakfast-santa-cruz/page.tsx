import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';

export const metadata: Metadata = {
  title: 'Best Breakfast in Santa Cruz - Top Morning Spots & Brunch',
  description: 'Discover the best breakfast spots in Santa Cruz County. From classic diners to trendy brunch cafes, find your perfect morning meal with our local guide.',
  keywords: ['best breakfast Santa Cruz', 'Santa Cruz brunch', 'breakfast restaurants Santa Cruz', 'morning dining Santa Cruz', 'Santa Cruz breakfast spots', 'brunch Santa Cruz'],
  openGraph: {
    title: 'Best Breakfast in Santa Cruz - Morning Dining Guide',
    description: 'Your guide to the best breakfast and brunch spots in Santa Cruz County.',
    url: 'https://boredinsantacruz.com/best-breakfast-santa-cruz',
    images: [
      {
        url: 'https://boredinsantacruz.com/images/best-breakfast-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Delicious breakfast spread in Santa Cruz',
      },
    ],
  },
};

// Static list of top breakfast picks (can be expanded or moved to CMS)
const BREAKFAST_PICKS = [
  { name: "Walnut Avenue Cafe", cuisine: "American", price: "$$", why: "Classic diner vibes, huge portions, local favorite" },
  { name: "Cafe Brasil", cuisine: "Brazilian", price: "$$", why: "Authentic Brazilian breakfast, açai bowls, tropical vibes" },
  { name: "The Buttery", cuisine: "American", price: "$$", why: "Fresh pastries, artisanal bread, cozy atmosphere" },
  { name: "Zachary's Restaurant", cuisine: "American", price: "$$", why: "Famous for Mike's Mess, hearty portions, downtown location" },
  { name: "Cafe Iveta", cuisine: "Mediterranean", price: "$$", why: "Fresh Mediterranean breakfast, healthy options, outdoor seating" },
  { name: "Gayle's Bakery", cuisine: "Bakery", price: "$$", why: "Artisanal pastries, fresh bread, local institution" },
  { name: "The Picnic Basket", cuisine: "American", price: "$$", why: "Beachfront dining, fresh ingredients, ocean views" },
  { name: "Lulu Carpenter's", cuisine: "Coffee & Light Fare", price: "$", why: "Historic building, great coffee, light breakfast options" },
];

const BREAKFAST_CATEGORIES = [
  {
    title: "Classic American Breakfast",
    description: "Traditional diner fare with eggs, pancakes, and hearty portions",
    spots: ["Walnut Avenue Cafe", "Zachary's Restaurant", "The Buttery"],
    emoji: "🥞"
  },
  {
    title: "International Flavors",
    description: "Global breakfast traditions and unique morning dishes",
    spots: ["Cafe Brasil", "Cafe Iveta"],
    emoji: "🌍"
  },
  {
    title: "Bakery & Pastries",
    description: "Fresh-baked goods, artisanal bread, and sweet morning treats",
    spots: ["Gayle's Bakery", "The Buttery", "Lulu Carpenter's"],
    emoji: "🥐"
  },
  {
    title: "Beachfront Breakfast",
    description: "Morning dining with ocean views and fresh coastal vibes",
    spots: ["The Picnic Basket"],
    emoji: "🌊"
  }
];

async function BreakfastRestaurants() {
  const result = await getRestaurants();
  if (!result.success) return null;

  // Filter for breakfast/brunch restaurants
  const breakfastRestaurants = result.data.filter(r => 
    r.cuisine?.some(c => 
      ['American', 'Bakery', 'Coffee', 'Brazilian', 'Mediterranean'].includes(c)
    ) || 
    r.name.toLowerCase().includes('cafe') ||
    r.name.toLowerCase().includes('bakery') ||
    r.name.toLowerCase().includes('breakfast')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {breakfastRestaurants.slice(0, 9).map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function BestBreakfastPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/home.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Best Breakfast in Santa Cruz</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Start your day right with the best breakfast spots, brunch cafes, and morning dining in Santa Cruz County.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rise and Shine in Santa Cruz
          </h2>
          <p className="text-lg text-gray-700">
            From classic American diners to international breakfast traditions, Santa Cruz offers an incredible variety of morning dining experiences. Whether you're craving fluffy pancakes, fresh pastries, or healthy açai bowls, you'll find your perfect breakfast spot here.
          </p>
        </section>

        {/* Top Breakfast Picks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Breakfast Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BREAKFAST_PICKS.map((pick, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pick.name}</h3>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {pick.price}
                  </span>
                </div>
                <p className="text-orange-600 font-medium mb-2">{pick.cuisine}</p>
                <p className="text-gray-700">{pick.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Breakfast Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Breakfast Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BREAKFAST_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-gray-800 font-medium">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Best Time for Breakfast</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌅</div>
                <h3 className="font-bold text-gray-900 mb-2">Early Morning (7-9 AM)</h3>
                <p className="text-gray-700 text-sm">Beat the crowds, fresh pastries, peaceful atmosphere</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">☀️</div>
                <h3 className="font-bold text-gray-900 mb-2">Peak Hours (9-11 AM)</h3>
                <p className="text-gray-700 text-sm">Full menu available, lively atmosphere, weekend brunch</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🕚</div>
                <h3 className="font-bold text-gray-900 mb-2">Late Morning (11 AM-1 PM)</h3>
                <p className="text-gray-700 text-sm">Brunch transition, lighter crowds, extended breakfast</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breakfast Restaurants */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Breakfast Restaurants</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          }>
            <BreakfastRestaurants />
          </Suspense>
        </section>

        {/* Insider Tips */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Breakfast Insider Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-orange-700 mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Weekend crowds:</strong> Arrive before 9 AM or after 11 AM to avoid long waits</li>
                  <li>• <strong>Parking:</strong> Downtown spots fill up fast on weekends - consider walking or biking</li>
                  <li>• <strong>Reservations:</strong> Most breakfast spots don't take reservations, so plan accordingly</li>
                  <li>• <strong>Seasonal menus:</strong> Many places offer seasonal specials - ask your server</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-700 mb-3">🌊 Local Favorites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Mike's Mess at Zachary's:</strong> Legendary scrambled egg dish</li>
                  <li>• <strong>Açai bowls at Cafe Brasil:</strong> Fresh and healthy Brazilian breakfast</li>
                  <li>• <strong>Pastries at Gayle's:</strong> Artisanal bread and sweet treats</li>
                  <li>• <strong>Beachfront dining:</strong> The Picnic Basket for ocean views</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/best-coffee-shops" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">☕</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Coffee Shops</h3>
                <p className="text-gray-600 text-sm">Perfect morning coffee spots</p>
              </div>
            </Link>
            <Link href="/best-brunch-spots" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🥐</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Brunch Spots</h3>
                <p className="text-gray-600 text-sm">Weekend brunch favorites</p>
              </div>
            </Link>
            <Link href="/best-restaurants" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍽️</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Restaurants</h3>
                <p className="text-gray-600 text-sm">Complete dining guide</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
