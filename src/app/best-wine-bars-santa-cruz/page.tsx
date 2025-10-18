import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';

export const metadata: Metadata = {
  title: 'Best Wine Bars in Santa Cruz - Top Wine Tasting & Wine Bars',
  description: 'Discover the best wine bars in Santa Cruz County. From local Santa Cruz Mountains wines to international selections, find your perfect wine experience.',
  keywords: ['best wine bars Santa Cruz', 'Santa Cruz wine bars', 'wine tasting Santa Cruz', 'Santa Cruz Mountains wine', 'wine bars Santa Cruz', 'wine country Santa Cruz'],
  openGraph: {
    title: 'Best Wine Bars in Santa Cruz - Wine Tasting Guide',
    description: 'Your guide to the best wine bars and tasting rooms in Santa Cruz County.',
    url: 'https://boredinsantacruz.com/best-wine-bars-santa-cruz',
    images: [
      {
        url: 'https://boredinsantacruz.com/images/best-wine-bars-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Wine tasting in Santa Cruz wine country',
      },
    ],
  },
};

// Static list of top wine bar picks (can be expanded or moved to CMS)
const WINE_BAR_PICKS = [
  { name: "Soif Wine Bar", cuisine: "Wine Bar", price: "$$$", why: "Extensive wine list, knowledgeable staff, intimate atmosphere" },
  { name: "Vino Cruz", cuisine: "Wine Bar", price: "$$", why: "Local Santa Cruz Mountains wines, small plates, downtown location" },
  { name: "Oswald", cuisine: "Wine Bar & Restaurant", price: "$$$", why: "Seasonal menu, curated wine selection, sophisticated dining" },
  { name: "Laili Restaurant", cuisine: "Wine Bar & Afghan Cuisine", price: "$$", why: "Unique wine pairings, beautiful patio, romantic setting" },
  { name: "The Crepe Place", cuisine: "Wine Bar & Restaurant", price: "$$", why: "Wine selection, live music, outdoor patio" },
  { name: "Shadowbrook", cuisine: "Fine Dining & Wine", price: "$$$", why: "Extensive wine cellar, romantic atmosphere, creek-side dining" },
  { name: "Bantam", cuisine: "Wine Bar & New American", price: "$$", why: "Natural wines, wood-fired cuisine, cozy atmosphere" },
  { name: "The Asti", cuisine: "Cocktail & Wine Bar", price: "$$", why: "Craft cocktails and wine, small plates, trendy vibe" },
];

const WINE_CATEGORIES = [
  {
    title: "Santa Cruz Mountains Wines",
    description: "Local wine country featuring Pinot Noir, Chardonnay, and other varietals",
    spots: ["Vino Cruz", "Soif Wine Bar"],
    emoji: "🍷"
  },
  {
    title: "International Wine Selections",
    description: "Curated wines from around the world with expert pairings",
    spots: ["Oswald", "Shadowbrook", "Laili Restaurant"],
    emoji: "🌍"
  },
  {
    title: "Natural & Organic Wines",
    description: "Sustainable and biodynamic wine selections",
    spots: ["Bantam", "The Asti"],
    emoji: "🌱"
  },
  {
    title: "Wine & Live Music",
    description: "Wine bars with entertainment and social atmosphere",
    spots: ["The Crepe Place"],
    emoji: "🎵"
  }
];

async function WineBarRestaurants() {
  const result = await getRestaurants();
  if (!result.success) return null;

  // Filter for wine bars and restaurants with wine focus
  const wineBarRestaurants = result.data.filter(r => 
    r.cuisine?.some(c => 
      ['Wine Bar', 'Fine Dining', 'New American', 'Afghan'].includes(c)
    ) || 
    r.name.toLowerCase().includes('wine') ||
    r.name.toLowerCase().includes('soif') ||
    r.name.toLowerCase().includes('vino') ||
    r.name.toLowerCase().includes('oswald') ||
    r.name.toLowerCase().includes('laili') ||
    r.name.toLowerCase().includes('shadowbrook') ||
    r.name.toLowerCase().includes('bantam')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wineBarRestaurants.slice(0, 9).map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function BestWineBarsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/seo/date-spots.jpg')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Best Wine Bars in Santa Cruz</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the best wine bars, tasting rooms, and wine experiences in Santa Cruz County and the Santa Cruz Mountains.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Santa Cruz Wine Country
          </h2>
          <p className="text-lg text-gray-700">
            Santa Cruz County is home to the renowned Santa Cruz Mountains AVA, producing exceptional wines in a stunning coastal mountain setting. From intimate wine bars to sophisticated tasting rooms, discover the best places to experience local and international wines.
          </p>
        </section>

        {/* Top Wine Bar Picks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Wine Bar Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WINE_BAR_PICKS.map((pick, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pick.name}</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    {pick.price}
                  </span>
                </div>
                <p className="text-red-600 font-medium mb-2">{pick.cuisine}</p>
                <p className="text-gray-700">{pick.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wine Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Wine Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WINE_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span className="text-gray-800 font-medium">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Santa Cruz Mountains Wine Region */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-100 to-purple-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Santa Cruz Mountains AVA</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🍇</div>
                <h3 className="font-bold text-gray-900 mb-2">Signature Varietals</h3>
                <p className="text-gray-700 text-sm">Pinot Noir, Chardonnay, Cabernet Sauvignon, and Zinfandel</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🏔️</div>
                <h3 className="font-bold text-gray-900 mb-2">Unique Terroir</h3>
                <p className="text-gray-700 text-sm">Coastal mountains, cool climate, diverse microclimates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-gray-900 mb-2">Award-Winning</h3>
                <p className="text-gray-700 text-sm">Internationally recognized wines and wineries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wine Bar Restaurants */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Wine Bars & Tasting Rooms</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          }>
            <WineBarRestaurants />
          </Suspense>
        </section>

        {/* Wine Tasting Tips */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Wine Tasting Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-red-700 mb-3">🍷 Tasting Etiquette</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pace yourself:</strong> Sip slowly and savor each wine</li>
                  <li>• <strong>Ask questions:</strong> Staff love sharing wine knowledge</li>
                  <li>• <strong>Take notes:</strong> Remember your favorites for future visits</li>
                  <li>• <strong>Food pairings:</strong> Many wine bars offer excellent small plates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-700 mb-3">🌿 Local Favorites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Soif Wine Bar:</strong> Extensive selection and expert staff</li>
                  <li>• <strong>Vino Cruz:</strong> Focus on Santa Cruz Mountains wines</li>
                  <li>• <strong>Oswald:</strong> Seasonal menu with curated wine pairings</li>
                  <li>• <strong>Laili Restaurant:</strong> Unique Afghan cuisine with wine pairings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-100 to-red-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Best Time for Wine Tasting</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌅</div>
                <h3 className="font-bold text-gray-900 mb-2">Afternoon (2-5 PM)</h3>
                <p className="text-gray-700 text-sm">Quieter atmosphere, more time with staff, relaxed pace</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌆</div>
                <h3 className="font-bold text-gray-900 mb-2">Early Evening (5-7 PM)</h3>
                <p className="text-gray-700 text-sm">Happy hour specials, social atmosphere, dinner transition</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌙</div>
                <h3 className="font-bold text-gray-900 mb-2">Evening (7-10 PM)</h3>
                <p className="text-gray-700 text-sm">Full dinner service, romantic atmosphere, live music</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/best-bars" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-red-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍸</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Bars</h3>
                <p className="text-gray-600 text-sm">Cocktail bars and nightlife</p>
              </div>
            </Link>
            <Link href="/best-date-spots" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-red-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">💕</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Date Spots</h3>
                <p className="text-gray-600 text-sm">Romantic wine experiences</p>
              </div>
            </Link>
            <Link href="/best-restaurants" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-red-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍽️</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Restaurants</h3>
                <p className="text-gray-600 text-sm">Fine dining with wine programs</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
