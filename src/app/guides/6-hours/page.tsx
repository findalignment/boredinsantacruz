import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '6 Hours in Santa Cruz: Perfect Half-Day Itinerary | 2025',
  description: 'Make the most of 6 hours in Santa Cruz! Beach, boardwalk, downtown dining, and coastal trails. Complete guide with timing, parking, and insider tips.',
  keywords: ['6 hours santa cruz', 'half day santa cruz', 'santa cruz itinerary', 'santa cruz morning', 'santa cruz afternoon'],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Spend 6 Hours in Santa Cruz",
  "description": "Complete half-day guide to experiencing the best of Santa Cruz",
  "totalTime": "PT6H",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Morning: West Cliff Drive Walk",
      "text": "Start with a 1-hour coastal walk along West Cliff Drive. See surfers at Steamer Lane, seals at Seal Rock, and the Lighthouse & Surfing Museum. Free street parking or Natural Bridges lot ($10)."
    },
    {
      "@type": "HowToStep",
      "name": "Mid-Morning: Beach Boardwalk",
      "text": "Spend 2 hours at the Santa Cruz Beach Boardwalk. Ride the historic Giant Dipper roller coaster, play arcade games, or relax on Main Beach. Parking: Beach lots or nearby street parking available."
    },
    {
      "@type": "HowToStep",
      "name": "Lunch: Downtown Dining",
      "text": "Take 1.5 hours for lunch downtown. Try Laili (Afghan), Oswald (upscale), or Betty Burgers (casual). Browse shops and grab coffee at Verve. Park at Louden Nelson ($1.50/hr)."
    },
    {
      "@type": "HowToStep",
      "name": "Afternoon: Nature or Harbor",
      "text": "Finish with 1.5 hours at Natural Bridges (tide pools, sunset), Henry Cowell redwoods (easy hiking), or Santa Cruz Harbor (sea lions, waterfront dining)."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can I do in 6 hours in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 6 hours, enjoy West Cliff coastal walk, visit the Beach Boardwalk, lunch downtown, explore Natural Bridges or hiking trails, and catch sunset at the lighthouse. You'll experience Santa Cruz's beaches, attractions, and local culture."
      }
    }
  ]
};

export default function SixHoursPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">⏰</span>
              <span className="font-semibold">6-Hour Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              6 Hours in Santa Cruz
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              The ultimate half-day experience. Coast, boardwalk, downtown, and nature—all in one memorable visit.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📋</span>
              Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900">Total Time</div>
                <div className="text-gray-600">6 hours</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl mb-2">💰</div>
                <div className="font-bold text-gray-900">Budget</div>
                <div className="text-gray-600">$40-80</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-4xl mb-2">🚶</div>
                <div className="font-bold text-gray-900">Activity Level</div>
                <div className="text-gray-600">Moderate</div>
              </div>
            </div>
          </div>

          {/* Itinerary Stops */}
          <div className="space-y-8">
            {/* Hour 1-2: Coastal Walk + Beach */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">HOURS 1-2</div>
                    <h3 className="text-2xl font-bold">West Cliff Drive + Natural Bridges</h3>
                  </div>
                  <div className="text-5xl">🌊</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  Start with the iconic 2-mile coastal trail, then explore tide pools at Natural Bridges State Beach.
                </p>

                <div className="space-y-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <strong className="text-blue-900">45 min:</strong> Walk West Cliff Drive (lighthouse → Natural Bridges)
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <strong className="text-blue-900">45 min:</strong> Explore Natural Bridges beach & tide pools
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <strong className="text-blue-900">30 min:</strong> Drive to Boardwalk area
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <strong className="text-blue-900">💡 Best Time:</strong> Start by 9-10am for fewer crowds and better tide pool visibility.
                </div>
              </div>
            </div>

            {/* Hour 3: Boardwalk */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">HOUR 3</div>
                    <h3 className="text-2xl font-bold">Beach Boardwalk</h3>
                  </div>
                  <div className="text-5xl">🎢</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  Experience California's oldest amusement park. Free to walk, pay per ride or buy wristband.
                </p>

                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Ride the historic Giant Dipper (1924 wooden roller coaster)</li>
                  <li>• Walk the boardwalk & beach</li>
                  <li>• Arcade games & classic carnival atmosphere</li>
                  <li>• Corn dogs, funnel cakes, salt water taffy</li>
                </ul>

                <div className="bg-gray-50 rounded-lg p-4">
                  <strong className="text-gray-900">Cost:</strong> Free entry • Rides $5-10 each • All-day wristband $50-65
                </div>
              </div>
            </div>

            {/* Hour 4-5: Downtown */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">HOURS 4-5</div>
                    <h3 className="text-2xl font-bold">Downtown Lunch & Shopping</h3>
                  </div>
                  <div className="text-5xl">🍽️</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  Explore Pacific Avenue's shops, galleries, and restaurants.
                </p>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">🍴 Lunch Spots (1 hour)</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded p-3">
                      <strong>Laili Restaurant</strong> - Afghan cuisine, beautiful patio
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <strong>Seabright Brewery</strong> - Craft beer & elevated pub food
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <strong>Akira</strong> - Fresh sushi & Japanese
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">🛍️ Shopping (1 hour)</h4>
                  <p className="text-gray-700">Bookshop Santa Cruz • O'Neill flagship • Local boutiques • Street performers</p>
                </div>
              </div>
            </div>

            {/* Hour 6: Sunset */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">HOUR 6</div>
                    <h3 className="text-2xl font-bold">Sunset at Lighthouse</h3>
                  </div>
                  <div className="text-5xl">🌅</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  End your day at Santa Cruz's most iconic spot—Lighthouse Point.
                </p>

                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Watch surfers at Steamer Lane</li>
                  <li>• Visit Surfing Museum (small donation)</li>
                  <li>• Incredible sunset views</li>
                  <li>• Often see whales (winter/spring)</li>
                </ul>

                <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                  <strong className="text-amber-900">📸 Photo Spot:</strong> Lighthouse with crashing waves = quintessential Santa Cruz shot
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>💰</span>
              Budget Breakdown
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between py-2 border-b">
                <span>Parking</span>
                <span className="font-semibold">$10-15</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Boardwalk (optional rides)</span>
                <span className="font-semibold">$0-50</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Lunch</span>
                <span className="font-semibold">$20-35</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Snacks/Drinks</span>
                <span className="font-semibold">$10-15</span>
              </div>
              <div className="flex justify-between py-3 bg-gray-50 rounded px-4 font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">$40-115</span>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Time-Based Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/guides/3-hours" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900 mb-1">3 Hours</div>
                <div className="text-gray-600 text-sm">Quick visit</div>
              </Link>
              
              <Link href="/guides/full-day" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">☀️</div>
                <div className="font-bold text-gray-900 mb-1">Full Day</div>
                <div className="text-gray-600 text-sm">Complete experience</div>
              </Link>

              <Link href="/guides/date-night" className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">❤️</div>
                <div className="font-bold text-gray-900 mb-1">Date Night</div>
                <div className="text-gray-600 text-sm">Romantic evening</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

