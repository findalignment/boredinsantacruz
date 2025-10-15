import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Date Spots in Santa Cruz | Romantic Restaurants, Activities & Views',
  description: 'Find the most romantic date spots in Santa Cruz. From sunset views to intimate restaurants and couples activities.',
  keywords: 'santa cruz date ideas, romantic restaurants, couples activities, date night, romantic things to do',
};

export default function BestDateSpotsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💕 Best Date Spots in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Romantic restaurants, sunset views, and unforgettable experiences
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz sets the perfect scene for romance - dramatic ocean sunsets, intimate wine bars, redwood forest 
            walks, and world-class dining. Whether it's your first date or your anniversary, these spots will help you 
            create magical memories together.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">15 Best Date Ideas</h2>
          <div className="space-y-6">
            {[
              { name: "Sunset at Natural Bridges", type: "Views", cost: "Free", why: "Classic Santa Cruz sunset with tide pools" },
              { name: "Oswald Restaurant", type: "Dining", cost: "$$$", why: "Upscale European, intimate atmosphere" },
              { name: "Venus Spirits Cocktail Lounge", type: "Drinks", cost: "$$", why: "Craft cocktails, cozy vibe" },
              { name: "West Cliff Drive Walk", type: "Activity", cost: "Free", why: "Ocean views, hold hands, watch surfers" },
              { name: "The Penny Ice Creamery", type: "Dessert", cost: "$", why: "Artisan ice cream, cute outdoor seating" },
              { name: "Soif Wine Bar", type: "Wine", cost: "$$", why: "Extensive wine list, small plates" },
              { name: "Garden Court Cafe", type: "Brunch", cost: "$$", why: "Garden patio, mimosas, relaxed vibe" },
              { name: "Bargetto Winery Tasting Room", type: "Wine", cost: "$$", why: "Local wines, beautiful grounds" },
              { name: "Sunset Kayaking at Elkhorn Slough", type: "Activity", cost: "$$", why: "Otters, seals, peaceful waters" },
              { name: "Shadowbrook Restaurant", type: "Dining", cost: "$$$", why: "Creekside dining, cable car entrance" },
              { name: "Bookshop Santa Cruz + Coffee", type: "Casual", cost: "$", why: "Browse books together, cozy cafe" },
              { name: "Beach Bonfire at Seabright", type: "Activity", cost: "$", why: "S'mores under the stars (permit req'd)" },
              { name: "Kuumbwa Jazz Center", type: "Entertainment", cost: "$$", why: "Live jazz in intimate venue" },
              { name: "Capitola Village Stroll", type: "Activity", cost: "Free-$", why: "Colorful village, beach, boutiques" },
              { name: "Crow's Nest Sunset Dinner", type: "Dining", cost: "$$-$$$", why: "Harbor views, seafood, romantic" }
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{i + 1}. {spot.name}</h3>
                  <span className="text-sm font-semibold text-pink-600">{spot.cost}</span>
                </div>
                <div className="flex gap-3 text-sm mb-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">{spot.type}</span>
                </div>
                <p className="text-gray-600 italic">{spot.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Date Ideas by Type</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold mb-3">🍷 First Date Ideas</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Coffee at Verve (casual, easy out)</li>
                <li>• West Cliff walk (active, conversation)</li>
                <li>• Lunch at The Picnic Basket (relaxed)</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold mb-3">💍 Anniversary Ideas</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Shadowbrook dinner (special occasion)</li>
                <li>• Sunset champagne at beach (romantic)</li>
                <li>• Couples massage (pampering)</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🎭 Unique Dates</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Surfing lesson together</li>
                <li>• Cooking class</li>
                <li>• Jazz show at Kuumbwa</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold mb-3">💰 Budget-Friendly</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Picnic at Lighthouse Field</li>
                <li>• Free outdoor movies (summer)</li>
                <li>• Explore downtown galleries</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find More Date Ideas</h2>
          <p className="text-xl mb-6">Explore restaurants, activities, and events</p>
          <Link href="/restaurants" className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50">
            Browse Restaurants
          </Link>
        </div>
      </div>
    </main>
  );
}

