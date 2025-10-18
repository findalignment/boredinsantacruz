import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';

export const metadata: Metadata = {
  title: 'Best Bars in Santa Cruz - Top Nightlife & Cocktail Spots',
  description: 'Discover the best bars in Santa Cruz County. From craft cocktails to dive bars, find your perfect nightlife spot with our local guide to Santa Cruz bars.',
  keywords: ['best bars Santa Cruz', 'Santa Cruz nightlife', 'cocktail bars Santa Cruz', 'dive bars Santa Cruz', 'Santa Cruz bars', 'nightlife Santa Cruz'],
  openGraph: {
    title: 'Best Bars in Santa Cruz - Nightlife Guide',
    description: 'Your guide to the best bars and nightlife spots in Santa Cruz County.',
    url: 'https://boredinsantacruz.com/best-bars-santa-cruz',
    images: [
      {
        url: 'https://boredinsantacruz.com/images/best-bars-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft cocktails at a Santa Cruz bar',
      },
    ],
  },
};

// Static list of top bar picks (can be expanded or moved to CMS)
const BAR_PICKS = [
  { name: "Venus Spirits", cuisine: "Craft Cocktails", price: "$$$", why: "Award-winning distillery, craft cocktails, industrial chic atmosphere" },
  { name: "The Red Room", cuisine: "Cocktail Bar", price: "$$", why: "Speakeasy vibes, creative cocktails, intimate setting" },
  { name: "The Catalyst", cuisine: "Music Venue", price: "$$", why: "Live music, full bar, iconic Santa Cruz venue" },
  { name: "99 Bottles", cuisine: "Beer Bar", price: "$$", why: "Huge beer selection, casual atmosphere, downtown location" },
  { name: "The Asti", cuisine: "Cocktail Bar", price: "$$", why: "Craft cocktails, small plates, trendy atmosphere" },
  { name: "The Crepe Place", cuisine: "Bar & Restaurant", price: "$$", why: "Full bar, live music, outdoor patio, late night" },
  { name: "The Jury Room", cuisine: "Dive Bar", price: "$", why: "Classic dive bar, cheap drinks, local favorite" },
  { name: "Hula's Island Grill", cuisine: "Tiki Bar", price: "$$", why: "Tropical cocktails, island vibes, fun atmosphere" },
];

const BAR_CATEGORIES = [
  {
    title: "Craft Cocktail Bars",
    description: "Artisanal cocktails, premium spirits, and skilled mixologists",
    spots: ["Venus Spirits", "The Red Room", "The Asti"],
    emoji: "🍸"
  },
  {
    title: "Live Music Venues",
    description: "Bars with live music, dancing, and entertainment",
    spots: ["The Catalyst", "The Crepe Place"],
    emoji: "🎵"
  },
  {
    title: "Beer Bars & Pubs",
    description: "Extensive beer selections and casual pub atmosphere",
    spots: ["99 Bottles", "The Jury Room"],
    emoji: "🍺"
  },
  {
    title: "Themed Bars",
    description: "Unique concepts and themed drinking experiences",
    spots: ["Hula's Island Grill"],
    emoji: "🌺"
  }
];

async function BarRestaurants() {
  const result = await getRestaurants();
  if (!result.success) return null;

  // Filter for bars and nightlife spots
  const barRestaurants = result.data.filter(r => 
    r.cuisine?.some(c => 
      ['Bar', 'Cocktail', 'Pub', 'Nightlife'].includes(c)
    ) || 
    r.name.toLowerCase().includes('bar') ||
    r.name.toLowerCase().includes('spirits') ||
    r.name.toLowerCase().includes('catalyst') ||
    r.name.toLowerCase().includes('room')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {barRestaurants.slice(0, 9).map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function BestBarsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-gray-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/best-bars-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Best Bars in Santa Cruz</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the best bars, cocktail lounges, and nightlife spots in Santa Cruz County.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Santa Cruz Nightlife Scene
          </h2>
          <p className="text-lg text-gray-700">
            From award-winning craft cocktail bars to classic dive bars, Santa Cruz offers a diverse nightlife scene. Whether you're looking for sophisticated cocktails, live music, or a casual beer with friends, you'll find the perfect bar for your night out.
          </p>
        </section>

        {/* Top Bar Picks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Bar Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BAR_PICKS.map((pick, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pick.name}</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                    {pick.price}
                  </span>
                </div>
                <p className="text-purple-600 font-medium mb-2">{pick.cuisine}</p>
                <p className="text-gray-700">{pick.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bar Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bar Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BAR_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
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
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Best Time for Nightlife</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌅</div>
                <h3 className="font-bold text-gray-900 mb-2">Happy Hour (4-7 PM)</h3>
                <p className="text-gray-700 text-sm">Best deals, lighter crowds, perfect for after work</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌙</div>
                <h3 className="font-bold text-gray-900 mb-2">Prime Time (8-11 PM)</h3>
                <p className="text-gray-700 text-sm">Peak atmosphere, live music, full energy</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🕚</div>
                <h3 className="font-bold text-gray-900 mb-2">Late Night (11 PM-2 AM)</h3>
                <p className="text-gray-700 text-sm">Dancing, late-night eats, party atmosphere</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bar Restaurants */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bar & Nightlife Spots</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          }>
            <BarRestaurants />
          </Suspense>
        </section>

        {/* Insider Tips */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nightlife Insider Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-purple-700 mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Weekend crowds:</strong> Arrive early or make reservations for popular spots</li>
                  <li>• <strong>Parking:</strong> Downtown parking can be challenging - consider rideshare or walking</li>
                  <li>• <strong>Dress code:</strong> Most bars are casual, but some cocktail bars prefer smart casual</li>
                  <li>• <strong>Live music:</strong> Check venue websites for upcoming shows and cover charges</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-700 mb-3">🍸 Local Favorites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Venus Spirits:</strong> Award-winning craft cocktails and spirits</li>
                  <li>• <strong>The Catalyst:</strong> Iconic music venue with full bar</li>
                  <li>• <strong>99 Bottles:</strong> Massive beer selection and casual vibe</li>
                  <li>• <strong>The Red Room:</strong> Intimate speakeasy with creative cocktails</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/best-wine-bars" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍷</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Wine Bars</h3>
                <p className="text-gray-600 text-sm">Sophisticated wine experiences</p>
              </div>
            </Link>
            <Link href="/best-breweries" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍺</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Breweries</h3>
                <p className="text-gray-600 text-sm">Local craft beer scene</p>
              </div>
            </Link>
            <Link href="/best-date-spots" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">💕</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Date Spots</h3>
                <p className="text-gray-600 text-sm">Romantic evening venues</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
