import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Music Venues in Santa Cruz | Concert Guide 2025',
  description: 'Find live music in Santa Cruz. Concert venues, jazz clubs, and where to see local bands perform.',
  keywords: 'santa cruz live music, concerts, venues, bands, jazz, shows, performances',
};

export default function LiveMusicPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🎸 Live Music Venues</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Where to catch live shows in Santa Cruz</p>
        
        <div className="space-y-6 mb-12">
          {[
            { name: "The Catalyst", capacity: "800", type: "Rock, indie, touring acts", note: "Main venue" },
            { name: "Kuumbwa Jazz Center", capacity: "200", type: "Jazz, world music", note: "Intimate setting" },
            { name: "Moe's Alley", capacity: "300", type: "Blues, reggae, funk", note: "Dance floor" },
            { name: "The Crepe Place", capacity: "100", type: "Folk, acoustic", note: "Restaurant venue" },
            { name: "Crows Nest", capacity: "250", type: "Varies, weekend bands", note: "Harbor views" },
            { name: "Don Quixote's", capacity: "150", type: "Open mic, local acts", note: "Restaurant bar" },
          ].map((venue, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-purple-200">
              <h3 className="text-2xl font-bold mb-3">{venue.name}</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div><strong>Capacity:</strong> {venue.capacity}</div>
                <div><strong>Note:</strong> {venue.note}</div>
                <div className="md:col-span-2"><strong>Music:</strong> {venue.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Check Event Calendar</h2>
          <Link href="/events" className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg">
            See Upcoming Shows
          </Link>
        </div>
      </div>
    </main>
  );
}
