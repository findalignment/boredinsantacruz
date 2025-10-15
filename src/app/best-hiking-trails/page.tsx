import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Hiking Trails in Santa Cruz | Top 15 Trails with Difficulty Ratings',
  description: 'Discover the best hiking trails in Santa Cruz. Redwood forests, coastal views, waterfall hikes, and mountain trails for all skill levels.',
  keywords: 'santa cruz hiking, hiking trails, redwood hikes, coastal trails, waterfall hikes, best trails',
};

export default function BestHikingTrailsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🥾 Best Hiking Trails in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Explore redwood forests, coastal bluffs, and mountain peaks
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz offers incredible hiking diversity - from towering redwood groves to dramatic coastal cliffs, 
            rushing waterfalls to panoramic mountain views. Whether you're looking for an easy family stroll or a 
            challenging summit climb, you'll find it here.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 15 Hiking Trails</h2>
          <div className="space-y-6">
            {[
              { name: "Berry Creek Falls Loop", distance: "10.5 mi", difficulty: "Hard", highlights: "Waterfall, redwoods" },
              { name: "West Cliff Drive", distance: "3 mi", difficulty: "Easy", highlights: "Ocean views, flat path" },
              { name: "Pogonip Loop", distance: "5 mi", difficulty: "Moderate", highlights: "Meadows, creek views" },
              { name: "Henry Cowell Redwoods - Rincon Trail", distance: "4.8 mi", difficulty: "Easy", highlights: "Ancient redwoods" },
              { name: "Fall Creek Trail", distance: "6 mi", difficulty: "Easy", highlights: "Creek, abandoned limekilns" },
              { name: "Eagle Creek Trail", distance: "8 mi", difficulty: "Moderate", highlights: "Forest, solitude" },
              { name: "Soquel Demonstration Forest", distance: "Varies", difficulty: "Easy-Mod", highlights: "Mountain biking too" },
              { name: "Wilder Ranch Trails", distance: "3-10 mi", difficulty: "Easy-Mod", highlights: "Coastal bluffs, wildlife" },
              { name: "Nisene Marks - Aptos Creek", distance: "8 mi", difficulty: "Moderate", highlights: "Old growth, waterfalls" },
              { name: "Castle Rock State Park", distance: "5 mi", difficulty: "Moderate", highlights: "Rock formations, views" },
              { name: "Big Basin Ridge Trail", distance: "11 mi", difficulty: "Hard", highlights: "Epic views, challenging" },
              { name: "Moore Creek Preserve", distance: "3 mi", difficulty: "Easy", highlights: "Family-friendly, wildlife" },
              { name: "Quail Hollow Ranch", distance: "2 mi", difficulty: "Easy", highlights: "Rare sandhills habitat" },
              { name: "Land of Medicine Buddha", distance: "1.5 mi", difficulty: "Easy", highlights: "Peace garden, statues" },
              { name: "Summit Rock Loop", distance: "2 mi", difficulty: "Easy", highlights: "Quick summit views" }
            ].map((trail, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{i + 1}. {trail.name}</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Distance:</span>
                    <span className="ml-2 text-gray-600">{trail.distance}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Difficulty:</span>
                    <span className={`ml-2 px-2 py-1 rounded ${
                      trail.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      trail.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>{trail.difficulty}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Highlights:</span>
                    <span className="ml-2 text-gray-600">{trail.highlights}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hiking Tips for Santa Cruz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-bold mb-2">🌲 Redwood Trails</h3>
              <p className="text-sm text-gray-700">Cool and shady year-round. Bring layers as it can be 10-15° cooler than the coast.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-bold mb-2">🌊 Coastal Trails</h3>
              <p className="text-sm text-gray-700">Expect wind and fog in summer mornings. Afternoon sun is common.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-bold mb-2">⛰️ Mountain Trails</h3>
              <p className="text-sm text-gray-700">Start early for cooler temps. Bring 2x the water you think you need.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-bold mb-2">🦁 Wildlife</h3>
              <p className="text-sm text-gray-700">Mountain lions present but rare. Make noise, hike in groups, keep dogs leashed.</p>
            </div>
          </div>
        </section>

        <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find More Outdoor Activities</h2>
          <p className="text-xl mb-6">Explore biking, kayaking, and beach activities</p>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50">
            View All Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

