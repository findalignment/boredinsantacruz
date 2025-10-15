import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet-Friendly Activities in Santa Cruz | Dog Beaches, Trails & Restaurants',
  description: 'Find the best dog-friendly beaches, hiking trails, restaurants, and activities in Santa Cruz. Your complete pet guide.',
  keywords: 'dog friendly santa cruz, pet friendly beaches, dog beaches, dog hiking trails, pet restaurants',
};

export default function PetFriendlyActivitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🐕 Pet-Friendly Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            The best beaches, trails, and activities for you and your furry friend
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz is incredibly dog-friendly! With off-leash beaches, miles of hiking trails, and welcoming 
            outdoor restaurants, your pup will love this coastal town as much as you do. Here's everything you need 
            to know about bringing your pet to Santa Cruz.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🏖️ Dog-Friendly Beaches</h2>
          <div className="space-y-6">
            {[
              { name: "Its Beach", type: "Off-leash", rules: "Dogs allowed off-leash sunrise-10am & 4pm-sunset", parking: "Street (limited)" },
              { name: "Mitchell's Cove Beach", type: "Off-leash", rules: "Off-leash beach, popular with locals", parking: "Street" },
              { name: "Lighthouse Field State Beach", type: "On-leash", rules: "Dogs on leash, grassy area too", parking: "Free lot" },
              { name: "Seabright State Beach", type: "On-leash", rules: "Dogs allowed on leash anytime", parking: "Paid lot" },
              { name: "Twin Lakes State Beach", type: "On-leash", rules: "Dogs on leash, great for swimming", parking: "Paid lot" },
              { name: "Most State Beaches", type: "On-leash", rules: "Dogs allowed on leash before 10am & after 4pm", parking: "Varies" }
            ].map((beach, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{beach.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    beach.type === 'Off-leash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>{beach.type}</span>
                </div>
                <p className="text-gray-700 mb-2">{beach.rules}</p>
                <p className="text-sm text-gray-500">🅿️ {beach.parking}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🥾 Dog-Friendly Hiking Trails</h2>
          <div className="space-y-6">
            {[
              { name: "Wilder Ranch Trails", distance: "3-10 mi", leash: "On-leash", why: "Coastal bluffs, wide trails" },
              { name: "Pogonip Park", distance: "5 mi", leash: "On-leash", why: "Meadows, creek, off-beaten path" },
              { name: "Moore Creek Preserve", distance: "3 mi", leash: "On-leash", why: "Easy trails, wildlife" },
              { name: "Henry Cowell Redwoods", distance: "Varies", leash: "On-leash", why: "Redwood trails, river" },
              { name: "Nisene Marks State Park", distance: "Varies", leash: "On-leash", why: "Forest trails, waterfalls" }
            ].map((trail, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{trail.name}</h3>
                <div className="flex gap-4 text-sm mb-2">
                  <span className="text-gray-700"><strong>Distance:</strong> {trail.distance}</span>
                  <span className="text-blue-600 font-semibold">{trail.leash}</span>
                </div>
                <p className="text-gray-600">{trail.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🍽️ Dog-Friendly Restaurants</h2>
          <p className="text-gray-600 mb-6">Restaurants with outdoor seating that welcome dogs:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Laili Restaurant (patio)",
              "Woodstock's Pizza (outdoor)",
              "Bantam (back patio)",
              "The Picnic Basket (outdoor)",
              "Linda's Seabreeze Cafe (patio)",
              "The Bagelry (outdoor)",
              "Betty's Noodles (patio)",
              "Most downtown cafes with outdoor seating"
            ].map((place, i) => (
              <div key={i} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-gray-800">{place}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Pet Info</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">📋 Beach Rules</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Always clean up after your dog</li>
                <li>• Bring waste bags (or use beach dispensers)</li>
                <li>• Off-leash areas have time restrictions</li>
                <li>• Voice control required off-leash</li>
                <li>• Watch for posted signs</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🏥 Pet Services</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Multiple vet clinics in area</li>
                <li>• Emergency: Adobe Animal Hospital</li>
                <li>• Dog wash stations at some beaches</li>
                <li>• Pet stores: Petco, Pet Food Express</li>
                <li>• Groomers throughout Santa Cruz</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">💧 Dog Essentials</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Bring water for your dog</li>
                <li>• Collapsible bowl recommended</li>
                <li>• Shade can be limited on trails</li>
                <li>• Avoid hot sand (burns paws)</li>
                <li>• Rinse salt water after beach</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">🚫 Not Dog-Friendly</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Beach Boardwalk (no dogs)</li>
                <li>• Most indoor attractions</li>
                <li>• Some state beaches (posted)</li>
                <li>• Crowded beaches midday</li>
                <li>• Restaurants (indoors)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-amber-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find More Pet-Friendly Spots</h2>
          <p className="text-xl mb-6">Explore trails, beaches, and outdoor dining</p>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50">
            View All Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

