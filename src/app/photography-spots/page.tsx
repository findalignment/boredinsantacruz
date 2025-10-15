import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Photography Spots in Santa Cruz | Photo Guide 2025',
  description: 'Top photography locations in Santa Cruz. Sunset spots, scenic viewpoints, and Instagram-worthy locations.',
  keywords: 'santa cruz photography, photo spots, instagram, scenic views, best photos',
};

export default function PhotographySpotsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">📸 Best Photography Spots</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Capture the beauty of Santa Cruz</p>
        
        <div className="space-y-6 mb-12">
          {[
            { name: "Natural Bridges at Sunset", time: "Golden hour", best: "Rock arch silhouette", gear: "Wide angle" },
            { name: "Lighthouse Point", time: "Morning or afternoon", best: "Surfers at Steamer Lane", gear: "Telephoto" },
            { name: "Capitola Village", time: "Midday", best: "Colorful houses", gear: "Any" },
            { name: "West Cliff Drive", time: "Sunrise", best: "Ocean + cliffs", gear: "Wide angle" },
            { name: "Mystery Spot", time: "Any", best: "Quirky photos", gear: "Standard lens" },
            { name: "Santa Cruz Wharf", time: "Blue hour", best: "Boardwalk lights", gear: "Tripod helpful" },
            { name: "UC Santa Cruz", time: "Autumn", best: "Redwoods + campus", gear: "Wide angle" },
            { name: "Seabright Beach", time: "Sunset", best: "Beach bonfires", gear: "Fast lens" },
          ].map((spot, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-2xl font-bold mb-3">{spot.name}</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-700">
                <div><strong>⏰ Best time:</strong> {spot.time}</div>
                <div><strong>📷 Best shot:</strong> {spot.best}</div>
                <div><strong>🎥 Gear:</strong> {spot.gear}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">More Scenic Views</h2>
          <Link href="/scenic-views" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg">
            View All Spots
          </Link>
        </div>
      </div>
    </main>
  );
}
