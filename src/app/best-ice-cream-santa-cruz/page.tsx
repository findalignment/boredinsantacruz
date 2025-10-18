import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';

export const metadata: Metadata = {
  title: 'Best Ice Cream in Santa Cruz - Top Ice Cream Shops & Gelato',
  description: 'Discover the best ice cream shops in Santa Cruz County. From artisanal gelato to classic ice cream parlors, find your perfect sweet treat with our local guide.',
  keywords: ['best ice cream Santa Cruz', 'Santa Cruz ice cream', 'gelato Santa Cruz', 'ice cream shops Santa Cruz', 'Santa Cruz desserts', 'frozen treats Santa Cruz'],
  openGraph: {
    title: 'Best Ice Cream in Santa Cruz - Sweet Treats Guide',
    description: 'Your guide to the best ice cream shops and frozen treats in Santa Cruz County.',
    url: 'https://boredinsantacruz.com/best-ice-cream-santa-cruz',
    images: [
      {
        url: 'https://boredinsantacruz.com/images/best-ice-cream-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Delicious ice cream in Santa Cruz',
      },
    ],
  },
};

// Static list of top ice cream picks (can be expanded or moved to CMS)
const ICE_CREAM_PICKS = [
  { name: "Penny Ice Creamery", cuisine: "Artisanal Ice Cream", price: "$$", why: "Handcrafted flavors, local ingredients, seasonal specialties" },
  { name: "Marianne's Ice Cream", cuisine: "Classic Ice Cream", price: "$", why: "Santa Cruz institution, 100+ flavors, family-owned since 1947" },
  { name: "The Penny Ice Creamery", cuisine: "Gourmet Ice Cream", price: "$$", why: "Small-batch production, unique flavors, downtown location" },
  { name: "Mission Hill Creamery", cuisine: "Artisanal Ice Cream", price: "$$", why: "Organic ingredients, creative flavors, sustainable practices" },
  { name: "The Picnic Basket", cuisine: "Ice Cream & Beach Food", price: "$$", why: "Beachfront location, fresh ingredients, ocean views" },
  { name: "Gayle's Bakery", cuisine: "Bakery & Ice Cream", price: "$$", why: "Artisanal pastries, seasonal ice cream, local favorite" },
  { name: "Lulu Carpenter's", cuisine: "Coffee & Ice Cream", price: "$", why: "Historic building, great coffee, light frozen treats" },
  { name: "The Buttery", cuisine: "Bakery & Ice Cream", price: "$$", why: "Fresh pastries, artisanal ice cream, cozy atmosphere" },
];

const ICE_CREAM_CATEGORIES = [
  {
    title: "Artisanal & Gourmet",
    description: "Handcrafted ice cream with unique flavors and premium ingredients",
    spots: ["Penny Ice Creamery", "Mission Hill Creamery", "The Penny Ice Creamery"],
    emoji: "🍨"
  },
  {
    title: "Classic Ice Cream Parlors",
    description: "Traditional ice cream shops with extensive flavor selections",
    spots: ["Marianne's Ice Cream"],
    emoji: "🍦"
  },
  {
    title: "Beachfront Treats",
    description: "Ice cream spots with ocean views and beach vibes",
    spots: ["The Picnic Basket"],
    emoji: "🌊"
  },
  {
    title: "Bakery & Ice Cream",
    description: "Combining fresh pastries with frozen treats",
    spots: ["Gayle's Bakery", "The Buttery", "Lulu Carpenter's"],
    emoji: "🥐"
  }
];

async function IceCreamRestaurants() {
  const result = await getRestaurants();
  if (!result.success) return null;

  // Filter for ice cream shops and dessert-focused establishments
  const iceCreamRestaurants = result.data.filter(r => 
    r.cuisine?.some(c => 
      ['Ice Cream', 'Bakery', 'Dessert', 'Coffee'].includes(c)
    ) || 
    r.name.toLowerCase().includes('ice cream') ||
    r.name.toLowerCase().includes('creamery') ||
    r.name.toLowerCase().includes('penny') ||
    r.name.toLowerCase().includes('marianne') ||
    r.name.toLowerCase().includes('picnic basket') ||
    r.name.toLowerCase().includes('gayle') ||
    r.name.toLowerCase().includes('buttery') ||
    r.name.toLowerCase().includes('lulu')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {iceCreamRestaurants.slice(0, 9).map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function BestIceCreamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/best-ice-cream-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Best Ice Cream in Santa Cruz</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the best ice cream shops, gelato parlors, and frozen treats in Santa Cruz County.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sweet Treats in Santa Cruz
          </h2>
          <p className="text-lg text-gray-700">
            Santa Cruz is home to some of the best ice cream shops on the California coast. From artisanal gelato made with local ingredients to classic ice cream parlors with 100+ flavors, discover the perfect frozen treat for any occasion.
          </p>
        </section>

        {/* Top Ice Cream Picks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Ice Cream Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ICE_CREAM_PICKS.map((pick, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-pink-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pick.name}</h3>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">
                    {pick.price}
                  </span>
                </div>
                <p className="text-pink-600 font-medium mb-2">{pick.cuisine}</p>
                <p className="text-gray-700">{pick.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ice Cream Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ice Cream Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ICE_CREAM_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      <span className="text-gray-800 font-medium">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Flavors */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Popular Flavors</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🍓</div>
                <h3 className="font-bold text-gray-900 mb-2">Fruit Flavors</h3>
                <p className="text-gray-700 text-sm">Strawberry, peach, mango, and seasonal fruits</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🍫</div>
                <h3 className="font-bold text-gray-900 mb-2">Chocolate Varieties</h3>
                <p className="text-gray-700 text-sm">Dark chocolate, fudge, and chocolate chip</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🥥</div>
                <h3 className="font-bold text-gray-900 mb-2">Unique & Creative</h3>
                <p className="text-gray-700 text-sm">Lavender, honey, and artisanal combinations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-bold text-gray-900 mb-2">Vegan & Dairy-Free</h3>
                <p className="text-gray-700 text-sm">Coconut milk, almond milk, and plant-based options</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ice Cream Restaurants */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ice Cream Shops & Dessert Spots</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          }>
            <IceCreamRestaurants />
          </Suspense>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Best Time for Ice Cream</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">☀️</div>
                <h3 className="font-bold text-gray-900 mb-2">Afternoon (2-5 PM)</h3>
                <p className="text-gray-700 text-sm">Perfect beach treat, warm weather, family time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌅</div>
                <h3 className="font-bold text-gray-900 mb-2">Evening (6-8 PM)</h3>
                <p className="text-gray-700 text-sm">Post-dinner dessert, sunset views, romantic treat</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌙</div>
                <h3 className="font-bold text-gray-900 mb-2">Late Night (8-10 PM)</h3>
                <p className="text-gray-700 text-sm">Sweet ending to the day, social atmosphere</p>
              </div>
            </div>
          </div>
        </section>

        {/* Insider Tips */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ice Cream Insider Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-pink-700 mb-3">🍨 Pro Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Sample first:</strong> Most shops offer free samples before you buy</li>
                  <li>• <strong>Seasonal flavors:</strong> Ask about limited-time and seasonal offerings</li>
                  <li>• <strong>Local ingredients:</strong> Many shops use local fruits and dairy</li>
                  <li>• <strong>Portion sizes:</strong> Start with a single scoop - portions are often generous</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-pink-700 mb-3">🏆 Local Favorites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Penny Ice Creamery:</strong> Artisanal flavors with local ingredients</li>
                  <li>• <strong>Marianne's Ice Cream:</strong> Santa Cruz institution with 100+ flavors</li>
                  <li>• <strong>Mission Hill Creamery:</strong> Organic and sustainable ice cream</li>
                  <li>• <strong>The Picnic Basket:</strong> Beachfront ice cream with ocean views</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/best-desserts" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-pink-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍰</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Desserts</h3>
                <p className="text-gray-600 text-sm">Sweet treats and desserts</p>
              </div>
            </Link>
            <Link href="/best-coffee-shops" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-pink-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">☕</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Coffee Shops</h3>
                <p className="text-gray-600 text-sm">Coffee and light treats</p>
              </div>
            </Link>
            <Link href="/best-beaches" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-pink-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🏖️</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Beaches</h3>
                <p className="text-gray-600 text-sm">Perfect spots for ice cream</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
