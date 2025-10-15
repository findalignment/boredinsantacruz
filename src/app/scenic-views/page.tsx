import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Scenic Views in Santa Cruz | Photo Spots & Lookout Points',
  description: 'Discover the most beautiful views in Santa Cruz. Top photo spots, sunrise & sunset locations, and scenic lookouts.',
  keywords: 'santa cruz views, scenic spots, photo locations, best views, lookout points, instagram spots',
};

export default function ScenicViewsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">📸 Best Scenic Views in Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Instagram-worthy spots & breathtaking vistas</p>
        
        <div className="space-y-6 mb-12">
          {[
            { spot: "Natural Bridges Sunset", type: "Sunset", desc: "Rock arch silhouette against orange sky", best: "30 min before sunset" },
            { spot: "West Cliff Drive", type: "Ocean Views", desc: "3-mile coastal path with constant views", best: "Morning or sunset" },
            { spot: "Lighthouse Point", type: "Surf Views", desc: "Watch Steamer Lane surfers from cliff", best: "Afternoon big swells" },
            { spot: "Seymour Marine Lab Overlook", type: "Panoramic", desc: "Wide ocean views, whale watching", best: "Morning (clearer)" },
            { spot: "Twin Lakes Beach View", type: "Beach Scene", desc: "Classic beach photo with harbor", best: "Midday for color" },
            { spot: "Capitola Village", type: "Colorful Town", desc: "Rainbow houses by the beach", best: "Anytime, but morning light" },
            { spot: "Santa Cruz Wharf", type: "Classic View", desc: "Iconic boardwalk & beach scene", best: "Golden hour" },
            { spot: "UC Santa Cruz Campus", type: "Forest & Ocean", desc: "Redwoods meet ocean views", best: "Afternoon" },
          ].map((view, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-sky-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{view.spot}</h3>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">{view.type}</span>
              </div>
              <p className="text-gray-700 mb-2">{view.desc}</p>
              <p className="text-sm text-sky-600"><strong>Best time:</strong> {view.best}</p>
            </div>
          ))}
        </div>

        <div className="bg-sky-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Views</h2>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-sky-600 font-bold rounded-lg">
            Outdoor Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
