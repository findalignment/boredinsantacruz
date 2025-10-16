import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Full Day in Santa Cruz: Complete Itinerary From Morning to Night | 2025',
  description: 'The ultimate Santa Cruz day trip! Beaches, boardwalk, downtown, hiking, and sunset dining. Complete hour-by-hour guide with insider tips.',
  keywords: ['full day santa cruz', 'santa cruz day trip', 'one day santa cruz', 'santa cruz itinerary', 'things to do santa cruz'],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Spend a Perfect Day in Santa Cruz",
  "description": "Complete guide for a full day in Santa Cruz, from sunrise to sunset",
  "totalTime": "PT10H",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Morning: Coffee & Coastal Walk",
      "text": "Start with coffee downtown, then walk West Cliff Drive to see surfers and seals.",
      "url": "https://boredinsantacruz.com/guides/full-day#morning"
    },
    {
      "@type": "HowToStep",
      "name": "Late Morning: Beach or Hike",
      "text": "Choose Natural Bridges for tide pools or hiking trails in the redwoods.",
      "url": "https://boredinsantacruz.com/guides/full-day#late-morning"
    },
    {
      "@type": "HowToStep",
      "name": "Lunch: Downtown Dining",
      "text": "Enjoy lunch on Pacific Avenue with many local restaurant options.",
      "url": "https://boredinsantacruz.com/guides/full-day#lunch"
    },
    {
      "@type": "HowToStep",
      "name": "Afternoon: Boardwalk & Beach",
      "text": "Experience the iconic Santa Cruz Beach Boardwalk and main beach.",
      "url": "https://boredinsantacruz.com/guides/full-day#afternoon"
    },
    {
      "@type": "HowToStep",
      "name": "Evening: Sunset & Dinner",
      "text": "Watch sunset at Lighthouse Point, then dinner at a waterfront restaurant.",
      "url": "https://boredinsantacruz.com/guides/full-day#evening"
    }
  ]
};

export default function FullDayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">☀️</span>
              <span className="font-semibold">Full Day Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Full Day in Santa Cruz
            </h1>
            
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              The complete Santa Cruz experience. From sunrise coffee to sunset dining, this is your perfect day.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect Day Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900 text-sm">Duration</div>
                <div className="text-gray-600 text-sm">8-10 hours</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-bold text-gray-900 text-sm">Budget</div>
                <div className="text-gray-600 text-sm">$75-150</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">🚶</div>
                <div className="font-bold text-gray-900 text-sm">Activity</div>
                <div className="text-gray-600 text-sm">Moderate</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">👥</div>
                <div className="font-bold text-gray-900 text-sm">Best For</div>
                <div className="text-gray-600 text-sm">Everyone</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {/* 8-9am */}
            <div id="morning" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">8:00-9:00 AM</div>
                    <h3 className="text-xl font-bold">Coffee & Coastal Walk</h3>
                  </div>
                  <div className="text-4xl">☕</div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">
                  Start your day like a local. Grab coffee downtown, then walk West Cliff Drive.
                </p>
                <div className="bg-amber-50 rounded p-3 text-sm">
                  <strong>Coffee:</strong> Verve Coffee, Lulu Carpenter's, or Cat & Cloud<br/>
                  <strong>Walk:</strong> West Cliff Drive (2 miles, paved, stunning views)
                </div>
              </div>
            </div>

            {/* 9:30-11:30am */}
            <div id="late-morning" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">9:30-11:30 AM</div>
                    <h3 className="text-xl font-bold">Beach or Hiking</h3>
                  </div>
                  <div className="text-4xl">🏖️</div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">Choose your adventure:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded p-3">
                    <strong className="text-blue-900">Option A:</strong> Natural Bridges tide pools + beach time
                  </div>
                  <div className="bg-green-50 rounded p-3">
                    <strong className="text-green-900">Option B:</strong> Pogonip or Wilder Ranch hiking trails
                  </div>
                </div>
              </div>
            </div>

            {/* 12-1:30pm */}
            <div id="lunch" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">12:00-1:30 PM</div>
                    <h3 className="text-xl font-bold">Downtown Lunch</h3>
                  </div>
                  <div className="text-4xl">🍽️</div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">Refuel with Santa Cruz's best dining:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 rounded p-2"><strong>Laili:</strong> Afghan, beautiful patio ($$)</div>
                  <div className="bg-gray-50 rounded p-2"><strong>Akira:</strong> Fresh sushi ($$)</div>
                  <div className="bg-gray-50 rounded p-2"><strong>Assembly:</strong> California comfort food ($$$)</div>
                  <div className="bg-gray-50 rounded p-2"><strong>Picnic Basket:</strong> Quick sandwiches ($)</div>
                </div>
              </div>
            </div>

            {/* 2-5pm */}
            <div id="afternoon" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">2:00-5:00 PM</div>
                    <h3 className="text-xl font-bold">Boardwalk & Beach</h3>
                  </div>
                  <div className="text-4xl">🎢</div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">
                  Classic Santa Cruz experience. Boardwalk rides, arcade, beach time, or shopping.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Giant Dipper roller coaster (1924 classic)</li>
                  <li>• Main Beach swimming/sunbathing</li>
                  <li>• Wharf walk (see sea lions!)</li>
                  <li>• Seabright Brewery happy hour (3-6pm)</li>
                </ul>
              </div>
            </div>

            {/* 5:30-7pm */}
            <div id="evening" className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">5:30-7:00 PM</div>
                    <h3 className="text-xl font-bold">Sunset & Dinner</h3>
                  </div>
                  <div className="text-4xl">🌅</div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 mb-3">
                  End with breathtaking views and delicious dinner.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="bg-indigo-50 rounded p-3">
                    <strong className="text-indigo-900">Sunset Spot:</strong> Lighthouse Point or Its Beach
                  </div>
                  <div className="bg-blue-50 rounded p-3">
                    <strong className="text-blue-900">Dinner Options:</strong><br/>
                    • Crow's Nest (harbor views, seafood)<br/>
                    • Shadowbrook (Capitola, romantic, cable car!)<br/>
                    • The Bagelry (casual, local favorite)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Breakdown</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between py-2 border-b"><span>Coffee & breakfast</span><span>$8-15</span></div>
              <div className="flex justify-between py-2 border-b"><span>Parking (3 locations)</span><span>$15-25</span></div>
              <div className="flex justify-between py-2 border-b"><span>Lunch</span><span>$15-30</span></div>
              <div className="flex justify-between py-2 border-b"><span>Boardwalk (optional)</span><span>$0-60</span></div>
              <div className="flex justify-between py-2 border-b"><span>Snacks/drinks</span><span>$10-20</span></div>
              <div className="flex justify-between py-2 border-b"><span>Dinner</span><span>$25-50</span></div>
              <div className="flex justify-between py-3 bg-gray-50 rounded px-4 font-bold text-lg">
                <span>Total</span><span className="text-blue-600">$73-200</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span><strong>Best Day:</strong> Tuesday-Thursday for fewer crowds</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🅿️</span>
                <span><strong>Parking Strategy:</strong> Start at Natural Bridges, move car to downtown, end at Boardwalk/Wharf</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🌤️</span>
                <span><strong>Weather:</strong> Mornings often foggy, afternoons sunny. Bring layers!</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📸</span>
                <span><strong>Photo Spots:</strong> Lighthouse, Natural Bridges arch, Boardwalk Giant Dipper</span>
              </li>
            </ul>
          </div>

          {/* Related */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Time-Based Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/guides/3-hours" className="bg-blue-50 rounded-lg p-4 hover:shadow transition">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900">3 Hours</div>
              </Link>
              
              <Link href="/guides/6-hours" className="bg-purple-50 rounded-lg p-4 hover:shadow transition">
                <div className="text-3xl mb-2">⏰</div>
                <div className="font-bold text-gray-900">6 Hours</div>
              </Link>

              <Link href="/guides/date-night" className="bg-pink-50 rounded-lg p-4 hover:shadow transition">
                <div className="text-3xl mb-2">❤️</div>
                <div className="font-bold text-gray-900">Date Night</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

