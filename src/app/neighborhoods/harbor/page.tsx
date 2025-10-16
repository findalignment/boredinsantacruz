import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seabright & Santa Cruz Harbor Guide: Waterfront Dining & Sea Lions | 2025',
  description: 'Complete guide to Seabright neighborhood and Santa Cruz Harbor. Crow\'s Nest restaurant, harbor activities, sea lions, fishing, and working waterfront.',
  keywords: ['santa cruz harbor', 'seabright santa cruz', 'crows nest restaurant', 'santa cruz sea lions', 'harbor fishing'],
};

export default function HarborPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <section className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">⚓</span>
            <span className="font-semibold">Neighborhood Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Seabright & Santa Cruz Harbor
          </h1>
          
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Working waterfront with fishing boats, sea lions, waterfront dining, and authentic coastal character.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Facts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold text-teal-600 mb-2">🎯 Best For</div>
              <p className="text-gray-700">Waterfront dining, fishing, sea lion viewing, boat tours, authentic harbor life</p>
            </div>
            
            <div>
              <div className="font-bold text-teal-600 mb-2">👥 Vibe</div>
              <p className="text-gray-700">Working waterfront, local fishing community, casual, unpretentious</p>
            </div>
            
            <div>
              <div className="font-bold text-teal-600 mb-2">🚶 Walkability</div>
              <p className="text-gray-700">Good around harbor, Seabright Avenue walkable, mostly car-friendly</p>
            </div>
            
            <div>
              <div className="font-bold text-teal-600 mb-2">🅿️ Parking</div>
              <p className="text-gray-700">Harbor lot (free!), street parking along harbor, Seabright commercial areas</p>
            </div>
          </div>
        </div>

        {/* Santa Cruz Harbor */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚓ Santa Cruz Harbor</h2>
          
          <p className="text-gray-700 mb-6">
            Working harbor with fishing fleet, recreational boats, restaurants, and the famous sea lion dock. 
            One of the few protected harbors on Monterey Bay.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-teal-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🦭 Sea Lions at the Harbor</h3>
              <p className="text-gray-700 mb-3">
                The main attraction! Sea lions haul out on floating docks, bark loudly, and are incredibly entertaining.
              </p>
              <div className="bg-teal-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Best Viewing:</strong> Year-round, peak in winter/spring</li>
                  <li>• <strong>Location:</strong> West side of harbor, can't miss the barking!</li>
                  <li>• <strong>Free:</strong> Public viewing, bring camera</li>
                  <li>• <strong>Safety:</strong> Don't get too close, they're wild animals</li>
                  <li>• <strong>Smell:</strong> Yes, it's fishy. That's the authentic experience!</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-cyan-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎣 Harbor Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h4 className="font-bold text-cyan-900 mb-2">Fishing</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Charter boats (salmon, rockfish)</li>
                    <li>• Pier fishing (free, license req.)</li>
                    <li>• Crabbing in season</li>
                    <li>• Bait & tackle shops</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Boat Tours</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Whale watching (winter/spring)</li>
                    <li>• Sailing tours</li>
                    <li>• Kayak rentals</li>
                    <li>• Boat rentals (various sizes)</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">Harbor Walk</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Paved walkway around harbor</li>
                    <li>• Watch boats come/go</li>
                    <li>• Sea bird viewing</li>
                    <li>• Benches with harbor views</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">Shopping</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Marine supply stores</li>
                    <li>• Gift shops</li>
                    <li>• Fresh fish market</li>
                    <li>• Harbor memorabilia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dining */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🍽️ Waterfront Dining</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-teal-900 mb-2">Crow's Nest Restaurant & Beach Club</h3>
              <p className="text-gray-700 mb-3">
                THE harbor dining destination. Upstairs fine dining with harbor views, downstairs casual beach bar.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Upstairs:</strong> Seafood, steaks, full bar, sunset views ($$$)</li>
                <li>• <strong>Downstairs:</strong> Beach bar, casual menu, live music weekends ($$)</li>
                <li>• <strong>Reservations:</strong> Recommended for upstairs, especially sunset</li>
                <li>• <strong>Parking:</strong> Large lot, free</li>
                <li>• <strong>Best Time:</strong> Sunset dinner, happy hour (3-6pm daily)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div>
                <strong>Aldo's Harbor Restaurant</strong>
                <p className="text-sm text-gray-700">Breakfast & lunch, harborfront patio, local favorite, fresh seafood ($$)</p>
              </div>
              <div>
                <strong>Stagnaro Bros</strong>
                <p className="text-sm text-gray-700">Casual seafood, fish & chips, clam chowder, family-friendly ($)</p>
              </div>
              <div>
                <strong>Riva Fish House</strong>
                <p className="text-sm text-gray-700">Fresh catch daily, patio dining, harbor views ($$)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seabright Neighborhood */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏘️ Seabright Neighborhood</h2>
          
          <p className="text-gray-700 mb-4">
            Residential neighborhood between downtown and harbor. Seabright Avenue has local businesses, 
            breweries, and neighborhood charm.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">🍺 Breweries & Bars</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Seabright Brewery</strong> — Local favorite, great food, outdoor seating</li>
                <li><strong>Sante Adairius</strong> — Warehouse taproom, amazing beers, food trucks</li>
                <li><strong>East End Taproom</strong> — Neighborhood bar, pool tables, dive vibe</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">🍴 Dining on Seabright</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Avanti</strong> — Pizza, Italian, family-owned</li>
                <li><strong>Pono Hawaiian Grill</strong> — Plate lunches, poke bowls</li>
                <li><strong>Luna's Tacos</strong> — Authentic Mexican, local favorite</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <strong className="text-blue-900">Local Gem:</strong> Seabright Beach (end of Seabright Ave) — 
            Less crowded than main beach, locals' spot, good for walking
          </div>
        </div>

        {/* Seabright Beach */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏖️ Seabright Beach</h2>
          
          <p className="text-gray-700 mb-4">
            Quieter alternative to Main Beach. Wide sandy beach, less crowded, popular with locals and dog walkers.
          </p>

          <div className="bg-amber-50 rounded-lg p-4 mb-4">
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Vibe:</strong> Locals' beach, families, surfers, dog walkers</li>
              <li>• <strong>Activities:</strong> Swimming, sunbathing, volleyball, walking</li>
              <li>• <strong>Parking:</strong> Street parking (limited), walk from harbor</li>
              <li>• <strong>Facilities:</strong> Restrooms at Castle Beach (nearby)</li>
              <li>• <strong>Dogs:</strong> Allowed on leash, off-leash before 10am & after 4pm in designated areas</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 italic">
            Connected to Main Beach and Boardwalk via paved coastal path (great for walking/biking)
          </p>
        </div>

        {/* Local Tips */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Local Tips</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🅿️</span>
              <div>
                <strong>Parking:</strong> Harbor parking is FREE (rare in Santa Cruz!). Large lot, usually available 
                even on weekends. Best kept secret for beach access.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🦭</span>
              <div>
                <strong>Sea Lions:</strong> Loudest in morning and late afternoon (feeding times). Smell is strongest 
                near docks but fades quickly. Don't feed them or get too close!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🍺</span>
              <div>
                <strong>Brewery Hop:</strong> Seabright Brewery → Sante Adairius are walkable (1 mile). 
                Perfect afternoon activity. Uber back if needed.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <strong>Sunset:</strong> Crow's Nest upstairs patio has best harbor sunset views. Make reservation 
                30 min before sunset. Downstairs beach bar also great (no reservations).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎣</span>
              <div>
                <strong>Fresh Fish:</strong> Stagnaro Bros fish market sells fresh catch daily. Best selection 
                morning when boats come in. Way better than grocery store!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚶</span>
              <div>
                <strong>Coastal Path:</strong> From harbor, you can walk/bike to Boardwalk (1.5 miles) along beach. 
                Beautiful paved trail, very scenic.
              </div>
            </li>
          </ul>
        </div>

        {/* Events */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎉 Harbor Events</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Commercial Fishing Boats</h4>
              <p className="text-gray-700 text-sm">Watch fishing boats come and go early morning (5-8am). 
              Unloading fresh catch, authentic working harbor experience.</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">Live Music at Crow's Nest</h4>
              <p className="text-gray-700 text-sm">Downstairs beach bar has live music most weekends. 
              Check their website for schedule. Usually jazz, blues, or rock cover bands.</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-bold text-purple-900 mb-2">Whale Watching Season</h4>
              <p className="text-gray-700 text-sm">Gray whales (December-April), Humpbacks (April-November). 
              Multiple tour operators leave from harbor daily. Book ahead on nice weather days.</p>
            </div>
          </div>
        </div>

        {/* Getting There */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚗 Getting There</h2>
          
          <div className="space-y-3 text-gray-700">
            <div>
              <strong>From Downtown Santa Cruz:</strong> 2 miles, 5 minutes via Murray St or E Cliff Dr
            </div>
            <div>
              <strong>From Boardwalk:</strong> 1.5 miles, walk/bike on coastal path (paved) or drive via E Cliff Dr
            </div>
            <div>
              <strong>From Highway 1:</strong> Take Bay Ave/Portola exit, follow signs to harbor
            </div>
            <div className="bg-green-50 rounded p-3 mt-4">
              <strong>🚌 Local Bus:</strong> Santa Cruz Metro routes 68, 69 stop near harbor. Free parking makes driving easy though!
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Neighborhoods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/neighborhoods/downtown" className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏙️</div>
              <div className="font-bold text-gray-900 mb-1">Downtown</div>
              <div className="text-gray-600 text-sm">Shopping & dining</div>
            </Link>
            
            <Link href="/neighborhoods/westside" className="bg-cyan-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🌊</div>
              <div className="font-bold text-gray-900 mb-1">Westside</div>
              <div className="text-gray-600 text-sm">Beaches & surfing</div>
            </Link>

            <Link href="/neighborhoods/capitola" className="bg-pink-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏘️</div>
              <div className="font-bold text-gray-900 mb-1">Capitola Village</div>
              <div className="text-gray-600 text-sm">Charming beach town</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

