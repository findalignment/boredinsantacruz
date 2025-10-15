import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Beaches in Santa Cruz | Complete Beach Guide with Parking Info',
  description: 'Discover the best beaches in Santa Cruz County. From family-friendly to surf spots, tide pools to dog beaches - find your perfect beach.',
  keywords: 'santa cruz beaches, best beaches, surf beaches, tide pools, dog friendly beaches, family beaches',
};

export default function BestBeachesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏖️ Best Beaches in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Your complete guide to Santa Cruz County's most beautiful beaches
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            With over 29 miles of coastline, Santa Cruz County offers some of California's most diverse and beautiful 
            beaches. Whether you're a surfer chasing waves, a family looking for calm waters, or a nature lover seeking 
            tide pools and wildlife, you'll find your perfect beach here.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 15 Beaches</h2>
          <div className="space-y-6">
            {[
              { name: "Main Beach / Boardwalk Beach", best: "Families, swimming", parking: "Lot & street ($)", waves: "Small" },
              { name: "Cowell's Beach", best: "Beginner surfing, swimming", parking: "Lot ($)", waves: "Gentle" },
              { name: "Steamer Lane", best: "Advanced surfing, watching surfers", parking: "Street (free)", waves: "Large" },
              { name: "Natural Bridges State Beach", best: "Tide pools, sunset views", parking: "Lot ($)", waves: "Medium" },
              { name: "Its Beach", best: "Dog-friendly, locals", parking: "Street (limited)", waves: "Medium" },
              { name: "Pleasure Point", best: "Surfing, cliff walks", parking: "Street (free)", waves: "Medium-Large" },
              { name: "Twin Lakes State Beach", best: "Families, kayaking", parking: "Lot ($)", waves: "Small" },
              { name: "Seabright State Beach", best: "Long walks, volleyball", parking: "Lot & street ($)", waves: "Medium" },
              { name: "Manresa State Beach", best: "Secluded, pristine sand", parking: "Lot ($)", waves: "Large" },
              { name: "Seacliff State Beach", best: "Fishing pier, RV camping", parking: "Lot ($)", waves: "Medium" },
              { name: "Rio Del Mar Beach", best: "Families, boogie boarding", parking: "Street (free)", waves: "Medium" },
              { name: "New Brighton State Beach", best: "Camping, cliff views", parking: "Lot ($)", waves: "Medium" },
              { name: "Capitola Beach", best: "Village vibes, dining nearby", parking: "Lot & street ($)", waves: "Small" },
              { name: "Panther Beach", best: "Photography, sea caves", parking: "Highway pullout (free)", waves: "Large" },
              { name: "Davenport Beach", best: "Whale watching, rugged beauty", parking: "Street (free)", waves: "Large" }
            ].map((beach, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{i + 1}. {beach.name}</h3>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Best For:</span>
                    <p className="text-gray-600">{beach.best}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Parking:</span>
                    <p className="text-gray-600">{beach.parking}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Waves:</span>
                    <p className="text-gray-600">{beach.waves}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Beach Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">🏄 Best Surf Beaches</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Steamer Lane (advanced)</li>
                <li>• Pleasure Point (all levels)</li>
                <li>• Cowell's (beginners)</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">👨‍👩‍👧‍👦 Best Family Beaches</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Main Beach (lifeguards)</li>
                <li>• Twin Lakes (calm water)</li>
                <li>• Capitola Beach (village)</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🦀 Best Tide Pool Beaches</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Natural Bridges (monarch butterflies too)</li>
                <li>• Panther Beach (caves & pools)</li>
                <li>• Its Beach (rocky areas)</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🐕 Dog-Friendly Beaches</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Its Beach (off-leash)</li>
                <li>• Mitchell's Cove (off-leash)</li>
                <li>• Most beaches (leashed)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Beach Activities</h2>
          <p className="text-xl mb-6">Find the best beach day activities and events</p>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50">
            View Beach Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

