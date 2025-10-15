import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Things to Do in Santa Cruz | 20+ No-Cost Activities',
  description: 'Discover free activities in Santa Cruz. Beaches, hiking trails, parks, events, and attractions that cost nothing.',
  keywords: 'free things to do santa cruz, free activities, no cost, budget friendly, free events',
};

export default function FreeThingsToDoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💰 Free Things to Do in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            20+ amazing activities that cost absolutely nothing
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            You don't need to spend money to have an incredible time in Santa Cruz. From world-class beaches to 
            redwood forests, street performers to sunset views, some of the best experiences in Santa Cruz are 
            completely free. Here's your guide to enjoying Santa Cruz on any budget.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">20+ Free Activities</h2>
          <div className="space-y-6">
            {[
              { name: "All Beach Access", category: "Beach", detail: "15+ beaches, all free to visit" },
              { name: "West Cliff Drive Walk", category: "Views", detail: "3-mile oceanfront path with seal viewing" },
              { name: "Natural Bridges Tide Pools", category: "Nature", detail: "Explore tide pools (parking fee, but free to walk in)" },
              { name: "Steamer Lane Surf Watching", category: "Activity", detail: "Watch world-class surfing, free street parking" },
              { name: "Downtown Street Performers", category: "Entertainment", detail: "Musicians, artists, magicians on Pacific Ave" },
              { name: "First Friday Art Tour", category: "Art", detail: "Free gallery openings, first Friday monthly" },
              { name: "Pogonip Park Hiking", category: "Hiking", detail: "Miles of free trails, meadows, wildlife" },
              { name: "Lighthouse Field State Beach", category: "Beach", detail: "Surfing, beach walks, sunset views" },
              { name: "Mitchell's Cove Beach", category: "Beach", detail: "Off-leash dog beach, free" },
              { name: "Public Libraries", category: "Indoor", detail: "Books, wifi, events, kids programs" },
              { name: "Capitola Village Stroll", category: "Walking", detail: "Colorful village, free to explore" },
              { name: "Santa Cruz Wharf", category: "Activity", detail: "Free to walk, watch sea lions" },
              { name: "Sunset at any beach", category: "Views", detail: "Nature's best show, every evening" },
              { name: "Felton Covered Bridge", category: "Historic", detail: "Tallest covered bridge in US" },
              { name: "Moore Creek Preserve", category: "Hiking", detail: "Easy trails, wildlife, free parking" },
              { name: "Street Art & Murals Tour", category: "Art", detail: "Self-guided downtown mural walk" },
              { name: "Surfing Museum", category: "Museum", detail: "Free admission, lighthouse location" },
              { name: "Yoga on the Beach", category: "Wellness", detail: "Free community classes (check schedule)" },
              { name: "Outdoor Movies", category: "Entertainment", detail: "Free summer movie series" },
              { name: "Farmers Markets", category: "Food", detail: "Free to browse, local atmosphere" }
            ].map((activity, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{i + 1}. {activity.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">FREE</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{activity.category}</span>
                </div>
                <p className="text-gray-600">{activity.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Free Things by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">🏖️ Free Beach Activities</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Swimming at any beach</li>
                <li>• Beach volleyball (bring net)</li>
                <li>• Tide pool exploring</li>
                <li>• Sunset watching</li>
                <li>• Sea lion viewing at Wharf</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🥾 Free Hiking</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Pogonip (5+ mi of trails)</li>
                <li>• Moore Creek Preserve</li>
                <li>• Lighthouse Field</li>
                <li>• Wilder Ranch (parking fee only)</li>
                <li>• West Cliff Drive path</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🎨 Free Culture</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• First Friday art galleries</li>
                <li>• Street art murals</li>
                <li>• MAH (1st Friday free)</li>
                <li>• Library events</li>
                <li>• Street performers</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">👨‍👩‍👧‍👦 Free Family Fun</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Playground hopping</li>
                <li>• Library story time</li>
                <li>• Beach days</li>
                <li>• Nature walks</li>
                <li>• Window shopping downtown</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore All Activities</h2>
          <p className="text-xl mb-6">Find more things to do, both free and paid</p>
          <Link href="/" className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50">
            Browse All Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

