import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Cruz Nightlife Guide | Bars, Clubs & Live Music 2025',
  description: 'Complete guide to Santa Cruz nightlife. Best bars, dance clubs, live music venues, and late-night activities.',
  keywords: 'santa cruz nightlife, bars, clubs, live music, dancing, night out, drinks',
};

export default function NightlifePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🌙 Santa Cruz Nightlife Guide</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Where to go after dark</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🍺 Best Bars</h2>
          <div className="grid gap-4">
            {[
              { name: "Crows Nest", vibe: "Harbor views, live music, dance floor", crowd: "Mixed ages" },
              { name: "Blue Lagoon", vibe: "Beach bar, patio, cocktails", crowd: "20s-30s" },
              { name: "The Catalyst", vibe: "Concert venue + bar", crowd: "Music fans" },
              { name: "Rosie McCann's", vibe: "Irish pub, late night", crowd: "Dive bar fans" },
              { name: "Surf City Billiards", vibe: "Pool tables, craft beer", crowd: "Casual" },
            ].map((bar, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-200">
                <h3 className="text-xl font-bold mb-2">{bar.name}</h3>
                <p className="text-gray-700 mb-1">{bar.vibe}</p>
                <p className="text-sm text-indigo-600">👥 {bar.crowd}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find Events Tonight</h2>
          <Link href="/events" className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg">
            See Whats Happening
          </Link>
        </div>
      </div>
    </main>
  );
}
