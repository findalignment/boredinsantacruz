import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Last-Minute Plans in Santa Cruz - Spontaneous Fun',
  description: 'Spontaneous in Santa Cruz? No problem! Quick ideas for last-minute plans - no reservations needed. Beach walks, sunset spots, casual dining, and instant adventures.',
  keywords: ['last minute Santa Cruz', 'spontaneous plans', 'no reservations', 'walk-in restaurants', 'impromptu activities'],
};

export default function LastMinutePlansPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 font-medium mb-8 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 mt-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4">
            <span>⚡</span>
            <span className="text-sm font-semibold">No Planning Required</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Last-Minute Plans in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Spontaneous decisions. Zero reservations. Maximum fun. Here's what you can do RIGHT NOW.
          </p>
        </div>

        {/* Quick Decision Guide */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick: What's Your Mood?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🌊</div>
              <div className="font-semibold text-gray-900">Outdoor & Active</div>
              <div className="text-sm text-gray-600">Beach, walk, hike, explore</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">🍕</div>
              <div className="font-semibold text-gray-900">Food & Drink</div>
              <div className="text-sm text-gray-600">Quick bites, casual dining</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-semibold text-gray-900">Entertainment</div>
              <div className="text-sm text-gray-600">Live music, events, nightlife</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">☕</div>
              <div className="font-semibold text-gray-900">Chill & Casual</div>
              <div className="text-sm text-gray-600">Coffee, browsing, relaxing</div>
            </div>
          </div>
        </div>

        {/* Outdoor & Active */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌊</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Outdoor & Active</h2>
              <p className="text-gray-600">Just grab your keys and go</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 text-lg">🏖️ Hit the Beach (Any Time)</h3>
                <p className="text-gray-700 mt-2">
                  <strong>Main Beach:</strong> Classic Santa Cruz. Walk the wharf, grab ice cream, people watch.<br/>
                  <strong>Cowell Beach:</strong> Right downtown. Surfing lessons available walk-up.<br/>
                  <strong>Twin Lakes:</strong> Quieter, warmer water, good for families.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  ⏱️ Anytime | 🅿️ Beach Street parking structure | 💰 $2/hr
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-gray-900 text-lg">🚶 West Cliff Drive Walk (30-90 min)</h3>
                <p className="text-gray-700 mt-2">
                  Start anywhere along the coastal path. Watch surfers at Steamer Lane, 
                  see harbor seals at Seal Rock, visit the lighthouse. Easy, beautiful, FREE.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  ⏱️ Anytime (sunset is magical) | 🅿️ Free street parking | 💰 FREE
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h3 className="font-bold text-gray-900 text-lg">🌲 Quick Hike Options</h3>
                <p className="text-gray-700 mt-2">
                  <strong>Natural Bridges:</strong> 15-min walk to tide pools<br/>
                  <strong>Wilder Ranch:</strong> Old Cove Landing Trail (2 miles, easy)<br/>
                  <strong>Forest of Nisene Marks:</strong> Pick any trail, they're all good
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  ⏱️ 1-3 hours | 🅿️ Varies by location | 💰 Parking $10 or FREE
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="font-bold text-gray-900 text-lg">🚴 Rent Bikes & Cruise (1-2 hours)</h3>
                <p className="text-gray-700 mt-2">
                  <strong>Pacific Ave Cycles</strong> - Rent by the hour, ride along West Cliff or through town.<br/>
                  No reservation needed, just walk in!
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  📍 Downtown | ⏱️ Usually available | 💰 $10-15/hr
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Food & Drink */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🍕</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Food & Drink (No Reservations)</h2>
              <p className="text-gray-600">Walk-ins welcome!</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick & Casual</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900">🌮 Mexican Fast-Casual</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Taqueria Vallarta:</strong> Best burritos, always busy, always fast<br/>
                    <strong>Tacos Moreno:</strong> Authentic, generous portions, $ pricing<br/>
                    <strong>Los Pericos:</strong> Big menu, margaritas, family-friendly
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900">🍕 Pizza (Walk-In or Delivery)</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Pizza My Heart:</strong> Huge slices, late night, right downtown<br/>
                    <strong>Woodstock's Pizza:</strong> By the slice or pie, lively atmosphere<br/>
                    <strong>Pleasure Pizza:</strong> Upscale but casual, good for groups
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900">🍔 Burgers & Sandwiches</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Betty Burgers:</strong> Classic burgers, shakes, casual vibe<br/>
                    <strong>Zachary's:</strong> Usually has counter seating available<br/>
                    <strong>The Picnic Basket:</strong> Healthy options, grab & go
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900">🍜 Asian Quick Bites</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Akira:</strong> Sushi & ramen, usually seats available<br/>
                    <strong>Pho 75:</strong> Vietnamese, large portions, quick service<br/>
                    <strong>Bantam:</strong> Modern Asian, walk-ins welcome at the bar
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bars & Happy Hours (No Reservation)</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-amber-500 pl-4">
                  <p className="font-semibold text-gray-900">🍺 Craft Beer Bars</p>
                  <p className="text-gray-700 text-sm">Humble Sea Brewing, Santa Cruz Mountain Brewing, West End Tap & Kitchen</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <p className="font-semibold text-gray-900">🍷 Wine Bars</p>
                  <p className="text-gray-700 text-sm">Soif, Vinocruz, Seabright Social</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-semibold text-gray-900">🍹 Cocktail Spots</p>
                  <p className="text-gray-700 text-sm">Venus Spirits, Alderwood, The Crepe Place (patio bar)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entertainment */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎵</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Entertainment & Events</h2>
              <p className="text-gray-600">What's happening tonight?</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🎵 Live Music (Check Tonight's Lineup)</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>The Catalyst:</strong> Major venue, check online for tonight's show<br/>
                <strong>Moe's Alley:</strong> Blues, jazz, funk - usually $10-20 cover<br/>
                <strong>Kuumbwa Jazz Center:</strong> Intimate jazz performances<br/>
                <strong>The Crepe Place:</strong> Free shows some nights, outdoor patio
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🎬 Movies</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Del Mar Theatre:</strong> Historic downtown cinema<br/>
                <strong>Regal Cinema</strong>: Standard first-run movies<br/>
                <strong>Nickelodeon Theatre:</strong> Art house & independent films
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🎰 Games & Fun</h3>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Beach Boardwalk:</strong> Open until 10pm+ (summer), arcade & rides<br/>
                <strong>Santa Cruz Bowl:</strong> Bowling, arcade, bar<br/>
                <strong>Round 1:</strong> Japanese arcade with karaoke & bowling
              </p>
            </div>
          </div>
        </section>

        {/* Chill & Casual */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">☕</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Chill & Casual</h2>
              <p className="text-gray-600">Low-key, no pressure</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-gray-900">☕ Coffee Shops (Hang Out)</h3>
              <p className="text-gray-700 mt-2">
                <strong>Verve Coffee:</strong> Best coffee, busy but great people watching<br/>
                <strong>Lulu Carpenter's:</strong> Cozy, couches, good for reading<br/>
                <strong>Cat & Cloud Coffee:</strong> Friendly vibe, outdoor seating
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-gray-900">📚 Browse & Explore</h3>
              <p className="text-gray-700 mt-2">
                <strong>Bookshop Santa Cruz:</strong> Independent bookstore, hours of browsing<br/>
                <strong>Pacific Avenue:</strong> Window shopping, street performers, cafes<br/>
                <strong>Abbott Square:</strong> Shops, restaurants, outdoor seating
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-bold text-gray-900">🌅 Sunset Watching (FREE!)</h3>
              <p className="text-gray-700 mt-2">
                <strong>Lighthouse Point:</strong> Classic sunset spot with benches<br/>
                <strong>Natural Bridges:</strong> Rock formations silhouetted<br/>
                <strong>Santa Cruz Wharf:</strong> Walk out, watch from the end<br/>
                <strong>Capitola Esplanade:</strong> Colorful village, charming sunset
              </p>
            </div>
          </div>
        </section>

        {/* By Time of Day */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⏰ What Time Is It?</h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🌅 Morning (Before 12pm)</h3>
              <p className="text-gray-700 text-sm">
                Coffee run → Farmers Market (Sundays) → Beach walk → Early hike
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">☀️ Afternoon (12pm - 5pm)</h3>
              <p className="text-gray-700 text-sm">
                Lunch spot hopping → Beach time → West Cliff walk → Browse downtown → Ice cream at Penny's
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🌆 Evening (5pm - 9pm)</h3>
              <p className="text-gray-700 text-sm">
                Sunset watching → Casual dinner → Wine bar → Live music → Boardwalk (summer)
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900">🌙 Late Night (After 9pm)</h3>
              <p className="text-gray-700 text-sm">
                Late night pizza → The Catalyst show → Bar hopping downtown → Boardwalk arcade (summer) → Night beach walk
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Last-Minute Pro Tips</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📱 Check These Apps/Sites NOW</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• <strong>Yelp:</strong> "Open Now" filter for restaurants</li>
                <li>• <strong>Google Maps:</strong> See live wait times at popular spots</li>
                <li>• <strong>The Catalyst:</strong> Check tonight's music lineup</li>
                <li>• <strong>Sunset times:</strong> Google "sunset today Santa Cruz"</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🅿️ Parking Hacks</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• <strong>Downtown:</strong> Cedar St. garage usually has space</li>
                <li>• <strong>Beach:</strong> Beach Street structure ($2/hr)</li>
                <li>• <strong>Free options:</strong> Residential streets (check signs!)</li>
                <li>• <strong>Sunday:</strong> All downtown parking is FREE</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Spontaneous Mindset</h3>
              <p className="text-gray-700 text-sm">
                The best last-minute plans are flexible. If one spot is too busy, 
                pivot! Santa Cruz has endless options within walking distance of each other.
              </p>
            </div>
          </div>
        </section>

        {/* Budget Guide */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Quick Budget Guide</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">Under $20</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Beach (FREE)</li>
                <li>• Walk (FREE)</li>
                <li>• Coffee ($5)</li>
                <li>• Taco place ($8-12)</li>
                <li>• Sunset watching (FREE)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">$20-50</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Casual restaurant ($15-25)</li>
                <li>• Brewery ($8-15)</li>
                <li>• Movie ticket ($14)</li>
                <li>• Bike rental ($15/hr)</li>
                <li>• Boardwalk games ($10-20)</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">$50-100</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Nice dinner ($40-70)</li>
                <li>• Concert ticket ($25-40)</li>
                <li>• Wine bar night ($30-50)</li>
                <li>• Surf lesson ($75)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">More Planning Guides</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/guides/tonight" className="text-orange-600 hover:text-orange-800 font-medium">
              → Tonight in Santa Cruz
            </Link>
            <Link href="/guides/3-hours" className="text-orange-600 hover:text-orange-800 font-medium">
              → Quick 3-Hour Visit
            </Link>
            <Link href="/restaurants" className="text-orange-600 hover:text-orange-800 font-medium">
              → All Restaurants
            </Link>
            <Link href="/events" className="text-orange-600 hover:text-orange-800 font-medium">
              → Tonight's Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

