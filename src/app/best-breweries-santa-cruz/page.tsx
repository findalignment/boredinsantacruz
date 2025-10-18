import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';

export const metadata: Metadata = {
  title: 'Best Breweries in Santa Cruz - Top Craft Beer & Breweries',
  description: 'Discover the best breweries in Santa Cruz County. From local craft beer to award-winning breweries, find your perfect pint with our guide to Santa Cruz breweries.',
  keywords: ['best breweries Santa Cruz', 'Santa Cruz breweries', 'craft beer Santa Cruz', 'Santa Cruz beer', 'breweries Santa Cruz', 'local beer Santa Cruz'],
  openGraph: {
    title: 'Best Breweries in Santa Cruz - Craft Beer Guide',
    description: 'Your guide to the best breweries and craft beer in Santa Cruz County.',
    url: 'https://boredinsantacruz.com/best-breweries-santa-cruz',
    images: [
      {
        url: 'https://boredinsantacruz.com/images/best-breweries-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Craft beer at a Santa Cruz brewery',
      },
    ],
  },
};

// Static list of top brewery picks (can be expanded or moved to CMS)
const BREWERY_PICKS = [
  { name: "Santa Cruz Mountain Brewing", cuisine: "Brewery", price: "$$", why: "Organic beers, sustainable brewing, local ingredients" },
  { name: "Discretion Brewing", cuisine: "Brewery", price: "$$", why: "Award-winning IPAs, family-friendly, outdoor seating" },
  { name: "Steel Bonnet Brewing", cuisine: "Brewery", price: "$$", why: "Scottish-inspired ales, cozy taproom, food trucks" },
  { name: "Humble Sea Brewing", cuisine: "Brewery", price: "$$", why: "Hazy IPAs, beach vibes, multiple locations" },
  { name: "New Bohemia Brewing", cuisine: "Brewery", price: "$$", why: "Czech-style lagers, traditional brewing, downtown location" },
  { name: "Sante Adairius Rustic Ales", cuisine: "Brewery", price: "$$", why: "Farmhouse ales, barrel-aged beers, artisanal approach" },
  { name: "99 Bottles", cuisine: "Beer Bar", price: "$$", why: "Huge beer selection, local and international, downtown" },
  { name: "The Crepe Place", cuisine: "Bar & Restaurant", price: "$$", why: "Local beer selection, live music, outdoor patio" },
];

const BREWERY_CATEGORIES = [
  {
    title: "Production Breweries",
    description: "Full-scale brewing operations with tasting rooms and tours",
    spots: ["Santa Cruz Mountain Brewing", "Discretion Brewing", "Steel Bonnet Brewing"],
    emoji: "🍺"
  },
  {
    title: "Specialty Breweries",
    description: "Unique styles and artisanal brewing approaches",
    spots: ["Humble Sea Brewing", "Sante Adairius Rustic Ales", "New Bohemia Brewing"],
    emoji: "🍻"
  },
  {
    title: "Beer Bars & Pubs",
    description: "Extensive beer selections featuring local and international brews",
    spots: ["99 Bottles", "The Crepe Place"],
    emoji: "🍺"
  }
];

async function BreweryRestaurants() {
  const result = await getRestaurants();
  if (!result.success) return null;

  // Filter for breweries and beer-focused establishments
  const breweryRestaurants = result.data.filter(r => 
    r.cuisine?.some(c => 
      ['Brewery', 'Beer Bar', 'Pub'].includes(c)
    ) || 
    r.name.toLowerCase().includes('brewing') ||
    r.name.toLowerCase().includes('brewery') ||
    r.name.toLowerCase().includes('beer') ||
    r.name.toLowerCase().includes('99 bottles') ||
    r.name.toLowerCase().includes('crepe place')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {breweryRestaurants.slice(0, 9).map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function BestBreweriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/best-breweries-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Best Breweries in Santa Cruz</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover the best breweries, craft beer, and beer bars in Santa Cruz County.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Santa Cruz Craft Beer Scene
          </h2>
          <p className="text-lg text-gray-700">
            Santa Cruz County has a thriving craft beer scene with breweries ranging from small artisanal operations to larger production facilities. From hazy IPAs to traditional lagers, discover the best local breweries and beer bars that showcase the region's brewing talent.
          </p>
        </section>

        {/* Top Brewery Picks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Brewery Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BREWERY_PICKS.map((pick, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pick.name}</h3>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                    {pick.price}
                  </span>
                </div>
                <p className="text-amber-600 font-medium mb-2">{pick.cuisine}</p>
                <p className="text-gray-700">{pick.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brewery Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Brewery Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BREWERY_CATEGORIES.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.spots.map((spot, spotIndex) => (
                    <div key={spotIndex} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span className="text-gray-800 font-medium">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Beer Styles */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Popular Beer Styles</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🍺</div>
                <h3 className="font-bold text-gray-900 mb-2">IPAs</h3>
                <p className="text-gray-700 text-sm">Hazy, West Coast, and Double IPAs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🍻</div>
                <h3 className="font-bold text-gray-900 mb-2">Lagers</h3>
                <p className="text-gray-700 text-sm">Czech-style and traditional lagers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🍺</div>
                <h3 className="font-bold text-gray-900 mb-2">Stouts & Porters</h3>
                <p className="text-gray-700 text-sm">Rich, dark, and barrel-aged varieties</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🍺</div>
                <h3 className="font-bold text-gray-900 mb-2">Sours & Wild Ales</h3>
                <p className="text-gray-700 text-sm">Farmhouse and barrel-aged sours</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brewery Restaurants */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Breweries & Beer Bars</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          }>
            <BreweryRestaurants />
          </Suspense>
        </section>

        {/* Brewery Tours & Events */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Brewery Tours & Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-amber-700 mb-3">🏭 Brewery Tours</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Santa Cruz Mountain Brewing:</strong> Organic brewing process tours</li>
                  <li>• <strong>Discretion Brewing:</strong> Family-friendly brewery tours</li>
                  <li>• <strong>Steel Bonnet Brewing:</strong> Scottish brewing traditions</li>
                  <li>• <strong>Call ahead:</strong> Most breweries offer tours by appointment</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-700 mb-3">🎉 Events & Festivals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Beer festivals:</strong> Annual Santa Cruz beer celebrations</li>
                  <li>• <strong>Tap takeovers:</strong> Special events at local bars</li>
                  <li>• <strong>Food truck events:</strong> Breweries often host food trucks</li>
                  <li>• <strong>Live music:</strong> Many breweries feature local bands</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Best Time for Brewery Visits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌅</div>
                <h3 className="font-bold text-gray-900 mb-2">Afternoon (2-5 PM)</h3>
                <p className="text-gray-700 text-sm">Quieter atmosphere, more time with brewers, relaxed tasting</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌆</div>
                <h3 className="font-bold text-gray-900 mb-2">Happy Hour (4-7 PM)</h3>
                <p className="text-gray-700 text-sm">Best deals, social atmosphere, after-work crowd</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌙</div>
                <h3 className="font-bold text-gray-900 mb-2">Evening (7-10 PM)</h3>
                <p className="text-gray-700 text-sm">Full atmosphere, live music, dinner pairings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/best-bars" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-amber-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍸</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Bars</h3>
                <p className="text-gray-600 text-sm">Cocktail bars and nightlife</p>
              </div>
            </Link>
            <Link href="/best-happy-hours" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-amber-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍻</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Happy Hours</h3>
                <p className="text-gray-600 text-sm">Drink specials and deals</p>
              </div>
            </Link>
            <Link href="/best-restaurants" className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-amber-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🍽️</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Best Restaurants</h3>
                <p className="text-gray-600 text-sm">Dining with beer programs</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
