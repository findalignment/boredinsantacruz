import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Romantic Getaway in Santa Cruz | Couples Guide & Date Ideas',
  description: 'Plan the perfect romantic escape to Santa Cruz. Sunset views, intimate dining, cozy hotels, and romantic activities for couples.',
  keywords: 'romantic santa cruz, couples getaway, romantic weekend, honeymoon, anniversary trip, date ideas',
};

export default function RomanticGetawayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💕 Romantic Getaway in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Your guide to the most romantic experiences in Santa Cruz
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            With stunning ocean sunsets, intimate wine bars, candlelit dinners, and cozy seaside hotels, Santa Cruz 
            is the perfect romantic escape. Whether celebrating an anniversary or planning a surprise proposal, 
            this coastal paradise sets the stage for unforgettable moments together.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">❤️ Top 12 Romantic Experiences</h2>
          <div className="space-y-6">
            {[
              { title: "Sunset at Natural Bridges", type: "Views", cost: "Free", desc: "Watch the sun set through the natural rock arch. Bring a blanket and champagne." },
              { title: "Shadowbrook Restaurant", type: "Dining", cost: "$$$", desc: "Cable car down to creekside dining. Intimate candlelit tables, waterfall views." },
              { title: "Couples Massage at Chaminade Spa", type: "Spa", cost: "$$$", desc: "Hilltop spa with ocean views. Book the couples suite with private deck." },
              { title: "Private Beach Bonfire", type: "Activity", cost: "$$", desc: "Reserve a fire pit at Seabright Beach. Bring s'mores supplies and wine." },
              { title: "West Cliff Drive Sunset Walk", type: "Walk", cost: "Free", desc: "Scenic 3-mile path along cliffs. Hold hands, watch surfers, kiss at the lighthouse." },
              { title: "Wine Tasting at Bargetto", type: "Wine", cost: "$$", desc: "Family-owned winery since 1933. Beautiful grounds, excellent wines, cheese pairings." },
              { title: "Capitola Village Stroll", type: "Walk", cost: "Free", desc: "Colorful beach town, art galleries, ice cream. Perfect for hand-holding." },
              { title: "Oswald Restaurant", type: "Dining", cost: "$$$", desc: "Upscale European cuisine. Cozy atmosphere, excellent service, romantic lighting." },
              { title: "Moonlight Kayaking at Elkhorn Slough", type: "Activity", cost: "$$", desc: "Paddle under stars, see bioluminescence. Book with local tour company." },
              { title: "Penny Ice Creamery", type: "Dessert", cost: "$", desc: "Share artisan ice cream on outdoor benches. Simple pleasures together." },
              { title: "Hot Tubs at Watercourse Way", type: "Spa", cost: "$$", desc: "Private hot tubs by the hour. Includes sauna, massage available." },
              { title: "Crow's Nest Sunset Dinner", type: "Dining", cost: "$$-$$$", desc: "Harbor views, fresh seafood. Request a window table for sunset." },
            ].map((exp, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-pink-200 p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{i + 1}. {exp.title}</h3>
                  <span className="text-sm font-semibold text-pink-600">{exp.cost}</span>
                </div>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">{exp.type}</span>
                </div>
                <p className="text-gray-600">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏨 Romantic Places to Stay</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold mb-3">🌊 Oceanfront Hotels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Dream Inn:</strong> On the beach, modern rooms, rooftop bar</li>
                <li>• <strong>Chaminade Resort:</strong> Hilltop retreat, spa, ocean views</li>
                <li>• <strong>Hotel Paradox:</strong> Boutique style, close to beach</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🏡 Cozy B&Bs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Babbling Brook Inn:</strong> Creek-side, gardens, fireplaces</li>
                <li>• <strong>Capitola Village:</strong> Boutique inns, beach proximity</li>
                <li>• <strong>Airbnb:</strong> Private cottages with ocean views</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💌 Planning Tips</h2>
          <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
            <ul className="space-y-3 text-gray-700">
              <li><strong>📅 Best Time:</strong> Spring & Fall for weather, fewer crowds</li>
              <li><strong>🌅 Sunset Times:</strong> Check daily for perfect timing</li>
              <li><strong>🍽️ Reservations:</strong> Book restaurants 2-3 days ahead on weekends</li>
              <li><strong>🎁 Surprise Elements:</strong> Pre-arrange champagne, flowers, or dessert</li>
              <li><strong>📸 Photos:</strong> Bring a tripod for couple photos at sunset</li>
            </ul>
          </div>
        </section>

        <div className="bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">More Romantic Ideas</h2>
          <p className="text-xl mb-6">Explore date spots and couples activities</p>
          <Link href="/best-date-spots" className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50">
            Browse Date Ideas
          </Link>
        </div>
      </div>
    </main>
  );
}

