import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Bike Trails in Santa Cruz | Cycling Guide 2025',
  description: 'Top bike trails and cycling routes in Santa Cruz. From easy coastal paths to mountain bike trails.',
  keywords: 'santa cruz biking, bike trails, cycling, mountain biking, bike paths',
};

export default function BikeTrailsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🚴 Best Bike Trails</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Cycling routes for every skill level</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">🌊 Easy / Scenic</h2>
            {[
              { name: "West Cliff Drive", distance: "3 miles", elevation: "Flat", surface: "Paved path" },
              { name: "Coastal Rail Trail", distance: "Varies", elevation: "Flat", surface: "Paved/gravel" },
              { name: "Monterey Bay Sanctuary Trail", distance: "10 miles", elevation: "Flat", surface: "Paved" },
            ].map((trail, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-green-200 mb-3">
                <h3 className="font-bold text-lg">{trail.name}</h3>
                <p className="text-sm text-gray-600">{trail.distance} · {trail.elevation} · {trail.surface}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">⛰️ Mountain Biking</h2>
            {[
              { name: "Soquel Demonstration Forest", distance: "20+ miles", difficulty: "Moderate-Hard", note: "Flow trails" },
              { name: "Wilder Ranch Trails", distance: "15 miles", difficulty: "Moderate", note: "Coastal views" },
              { name: "UCSC Upper Campus", distance: "10 miles", difficulty: "Moderate", note: "Redwood trails" },
            ].map((trail, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-green-200 mb-3">
                <h3 className="font-bold text-lg">{trail.name}</h3>
                <p className="text-sm text-gray-600">{trail.distance} · {trail.difficulty}</p>
                <p className="text-sm text-green-600">{trail.note}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="mt-12 bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">More Outdoor Adventures</h2>
          <Link href="/outdoor-adventures" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-lg">
            Explore Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
