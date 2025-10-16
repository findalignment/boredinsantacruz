import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Date Night in Santa Cruz: Romantic Evening Guide | 2025',
  description: 'Perfect Santa Cruz date night ideas! Sunset walks, romantic restaurants, cozy bars, and scenic spots. Complete 2-3 hour evening itinerary.',
  keywords: ['santa cruz date night', 'romantic santa cruz', 'date ideas santa cruz', 'couples santa cruz', 'romantic restaurants santa cruz'],
};

export default function DateNightPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">❤️</span>
            <span className="font-semibold">Date Night Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Date Night in Santa Cruz
          </h1>
          
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            Romantic coastal walks, intimate dining, and sunset views. Your perfect evening awaits.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Evening Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-rose-50 rounded-lg">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="font-bold text-gray-900">Duration</div>
              <div className="text-gray-600">2-3 hours</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-2">💰</div>
              <div className="font-bold text-gray-900">Budget</div>
              <div className="text-gray-600">$60-120</div>
            </div>
            
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <div className="text-4xl mb-2">👥</div>
              <div className="font-bold text-gray-900">Vibe</div>
              <div className="text-gray-600">Romantic</div>
            </div>
          </div>
        </div>

        {/* Perfect Date Options */}
        <div className="space-y-8">
          {/* Classic Date */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-6">
              <h3 className="text-2xl font-bold">Option 1: Classic Romantic Evening</h3>
              <p className="text-rose-100 mt-2">Sunset + Dinner + Stroll</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="font-bold text-gray-900 mb-2">5:30 PM - Sunset Walk (30 min)</div>
                <p className="text-gray-700">West Cliff Drive to Lighthouse Point. Watch surfers, see seals, hold hands. Golden hour lighting is *chef's kiss*.</p>
              </div>

              <div>
                <div className="font-bold text-gray-900 mb-2">6:30 PM - Dinner (1.5 hours)</div>
                <div className="space-y-2">
                  <div className="bg-rose-50 rounded p-3">
                    <strong>Shadowbrook (Capitola)</strong><br/>
                    <span className="text-sm text-gray-600">Arrive by cable car! Creekside dining, dim lighting. $$$$</span>
                  </div>
                  <div className="bg-rose-50 rounded p-3">
                    <strong>Crow's Nest</strong><br/>
                    <span className="text-sm text-gray-600">Harbor views, seafood, sunset seating. $$$</span>
                  </div>
                  <div className="bg-rose-50 rounded p-3">
                    <strong>Laili Restaurant</strong><br/>
                    <span className="text-sm text-gray-600">Afghan, beautiful patio, romantic ambiance. $$</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900 mb-2">8:00 PM - Dessert & Drinks (1 hour)</div>
                <p className="text-gray-700">
                  <strong>Penny Ice Creamery</strong> (artisan ice cream) or <strong>Verve Coffee</strong> (cozy, late hours)
                </p>
              </div>
            </div>
          </div>

          {/* Adventure Date */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <h3 className="text-2xl font-bold">Option 2: Adventure Date</h3>
              <p className="text-purple-100 mt-2">Boardwalk + Games + Late Dinner</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="font-bold text-gray-900 mb-2">6:00 PM - Beach Boardwalk (1.5 hours)</div>
                <p className="text-gray-700">Ride the Giant Dipper, play arcade games, walk the beach. Fun & playful vibes.</p>
              </div>

              <div>
                <div className="font-bold text-gray-900 mb-2">7:30 PM - Dinner (1 hour)</div>
                <div className="space-y-2">
                  <div className="bg-purple-50 rounded p-3">
                    <strong>Assembly</strong><br/>
                    <span className="text-sm text-gray-600">Downtown, California cuisine, craft cocktails</span>
                  </div>
                  <div className="bg-purple-50 rounded p-3">
                    <strong>Oswald</strong><br/>
                    <span className="text-sm text-gray-600">Upscale, seasonal menu, wine bar</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900 mb-2">8:30 PM - Night Walk</div>
                <p className="text-gray-700">Wharf at night (lit up, sea lions), or downtown Pacific Avenue (street performers, vibes)</p>
              </div>
            </div>
          </div>

          {/* Chill Date */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
              <h3 className="text-2xl font-bold">Option 3: Chill & Cozy</h3>
              <p className="text-teal-100 mt-2">Casual Bites + Brewery + Live Music</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="font-bold text-gray-900 mb-2">6:00 PM - Brewery Dinner (1.5 hours)</div>
                <div className="space-y-2">
                  <div className="bg-teal-50 rounded p-3">
                    <strong>Seabright Brewery</strong><br/>
                    <span className="text-sm text-gray-600">Local beers, elevated pub food, outdoor seating</span>
                  </div>
                  <div className="bg-teal-50 rounded p-3">
                    <strong>Sante Adairius Rustic Ales</strong><br/>
                    <span className="text-sm text-gray-600">Warehouse vibe, food trucks, amazing beer</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900 mb-2">7:30 PM - Live Music or Bar Hopping</div>
                <p className="text-gray-700">
                  <strong>Kuumbwa Jazz Center</strong> (world-class jazz) or <strong>Catalyst</strong> (live bands) or 
                  <strong>Pacific Avenue</strong> bar crawl
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Date Night Pro Tips</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <strong>Make Reservations:</strong> Especially Shadowbrook, Oswald, Assembly. Book 3-7 days ahead for weekends.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <strong>Sunset Timing:</strong> Check sunset time and start your evening 30 min before for golden hour.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <strong>Parking:</strong> Downtown: Louden Nelson lot. Capitola: Street parking competitive. Arrive early or Uber.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🧥</span>
              <div>
                <strong>Bring Layers:</strong> Santa Cruz gets chilly at night, even in summer. Bring a sweater or jacket.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎵</span>
              <div>
                <strong>Check Events:</strong> First Friday (art walk), live music venues, special events can add magic to your night.
              </div>
            </li>
          </ul>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Parking</span>
              <span className="font-semibold">$5-10</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Dinner for two</span>
              <span className="font-semibold">$50-100</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Drinks/dessert</span>
              <span className="font-semibold">$10-25</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Activities (optional)</span>
              <span className="font-semibold">$0-30</span>
            </div>
            <div className="flex justify-between py-3 bg-gray-50 rounded px-4 font-bold text-lg">
              <span>Total for Two</span>
              <span className="text-rose-600">$65-165</span>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Santa Cruz Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/best-date-spots" className="bg-rose-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">💕</div>
              <div className="font-bold text-gray-900 mb-1">Best Date Spots</div>
              <div className="text-gray-600 text-sm">Complete list of romantic places</div>
            </Link>
            
            <Link href="/best-restaurants" className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🍽️</div>
              <div className="font-bold text-gray-900 mb-1">Best Restaurants</div>
              <div className="text-gray-600 text-sm">Top dining in Santa Cruz</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

