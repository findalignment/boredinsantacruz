import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Activities in Santa Cruz | Surfing, Kayaking, Swimming & More',
  description: 'Best water activities in Santa Cruz. Surfing, kayaking, paddleboarding, swimming, and ocean adventures.',
  keywords: 'santa cruz water sports, surfing, kayaking, paddleboarding, swimming, ocean activities',
};

export default function WaterActivitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🌊 Water Activities in Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Dive into Santa Cruz's water sports scene</p>
        
        <div className="space-y-6 mb-12">
          {[
            { title: "Surfing", desc: "World-class breaks for all levels", best: "Cowell's (beginner), Steamer Lane (advanced)" },
            { title: "Kayaking", desc: "Harbor tours & Elkhorn Slough wildlife", best: "Elkhorn Slough for otters & seals" },
            { title: "Stand-Up Paddleboarding", desc: "Calm water exercise & exploration", best: "Santa Cruz Harbor, calm days" },
            { title: "Swimming", desc: "Ocean & pool swimming year-round", best: "Cowell's Beach (lifeguards in summer)" },
            { title: "Scuba Diving", desc: "Kelp forests & marine life", best: "Monterey Bay, local dive shops" },
            { title: "Whale Watching", desc: "Seasonal tours from the harbor", best: "April-Nov for humpbacks, Dec-Apr for grays" },
            { title: "Fishing", desc: "Surf, pier, or deep-sea fishing", best: "Santa Cruz Wharf, charter boats" },
            { title: "Sailing", desc: "Harbor sailing lessons & rentals", best: "Club Nautique for lessons" },
          ].map((activity, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
              <p className="text-gray-700 mb-2">{activity.desc}</p>
              <p className="text-sm text-blue-600"><strong>Best:</strong> {activity.best}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Water Adventures</h2>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg">
            View Beach Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
