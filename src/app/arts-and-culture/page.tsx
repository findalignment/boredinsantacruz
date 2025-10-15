import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arts & Culture in Santa Cruz | Museums, Galleries, Theater & Music',
  description: 'Discover Santa Cruz arts scene. Museums, art galleries, live music venues, theaters, and cultural events.',
  keywords: 'santa cruz arts, culture, museums, galleries, theater, live music, art scene',
};

export default function ArtsAndCulturePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🎨 Arts & Culture in Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">A thriving creative community by the sea</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Museums & Galleries</h2>
          <div className="space-y-4">
            {[
              { name: "MAH (Museum of Art & History)", desc: "Contemporary art, local history, rotating exhibitions", cost: "$ (Free 1st Friday)" },
              { name: "Santa Cruz Museum of Natural History", desc: "Local wildlife, Native American artifacts", cost: "$" },
              { name: "Seymour Marine Discovery Center", desc: "Marine science, touch tanks, whale skeleton", cost: "$" },
              { name: "Santa Cruz Art League", desc: "Local artist exhibitions, classes", cost: "Free" },
              { name: "First Friday Art Tour", desc: "Monthly gallery walk downtown", cost: "Free" },
            ].map((place, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-purple-200">
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                <p className="text-gray-700 mb-1">{place.desc}</p>
                <p className="text-sm text-purple-600">{place.cost}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Live Music & Theater</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "The Catalyst", type: "Live Music Venue" },
              { name: "Kuumbwa Jazz Center", type: "Jazz Club" },
              { name: "Rio Theatre", type: "Movies & Concerts" },
              { name: "Santa Cruz Civic Auditorium", type: "Large Venue" },
              { name: "The Crow's Nest", type: "Live Music & Dining" },
            ].map((venue, i) => (
              <div key={i} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold">{venue.name}</h3>
                <p className="text-sm text-gray-600">{venue.type}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Culture</h2>
          <Link href="/rainy" className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg">
            Indoor Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
