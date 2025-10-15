import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog-Friendly Santa Cruz | Complete Pet Guide 2025',
  description: 'Complete guide to dog-friendly Santa Cruz. Best beaches, trails, restaurants, and activities with your pup.',
  keywords: 'santa cruz dogs, dog friendly, pet friendly, dog beaches, dog parks, pets',
};

export default function DogFriendlyGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🐕 Dog-Friendly Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Adventures with your best friend</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🏖️ Dog Beaches</h2>
          <div className="space-y-4">
            {[
              { beach: "Seabright Beach (East End)", rules: "Off-leash before 10am, after 5pm", note: "Most popular dog beach" },
              { beach: "Its Beach", rules: "Off-leash anytime", note: "Small beach, locals favorite" },
              { beach: "Lighthouse Field", rules: "Off-leash in field", note: "Not on main beach" },
              { beach: "Manresa State Beach", rules: "On-leash only", note: "South of SC" },
            ].map((beach, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                <h3 className="text-xl font-bold mb-2">🐾 {beach.beach}</h3>
                <p className="text-gray-700 mb-1"><strong>Rules:</strong> {beach.rules}</p>
                <p className="text-amber-600 text-sm">{beach.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🌲 Dog-Friendly Trails</h2>
          <div className="space-y-4">
            {[
              { trail: "Wilder Ranch", rules: "On-leash", why: "Coastal views, multiple trails" },
              { trail: "Forest of Nisene Marks", rules: "On-leash", why: "Redwoods, creek, shade" },
              { trail: "Pogonip", rules: "Off-leash in some areas", why: "Close to town, varied terrain" },
              { trail: "DeLaveaga Park", rules: "Off-leash in dog park", why: "Disc golf course, trails" },
            ].map((trail, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                <h3 className="text-xl font-bold mb-2">{trail.trail}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Rules:</strong> {trail.rules}</p>
                <p className="text-gray-700">{trail.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🍽️ Dog-Friendly Dining</h2>
          <p className="text-gray-600 mb-4">Most restaurants with outdoor patios welcome dogs:</p>
          <ul className="space-y-2 bg-white rounded-xl p-6 border border-amber-200">
            <li>• Crows Nest (patio)</li>
            <li>• Santa Cruz Mountain Brewing (beer garden)</li>
            <li>• Discretion Brewing (dog-friendly)</li>
            <li>• The Picnic Basket (outdoor tables)</li>
            <li>• Most downtown cafes with sidewalk seating</li>
          </ul>
        </section>

        <div className="bg-amber-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">More Pet-Friendly Activities</h2>
          <Link href="/pet-friendly-activities" className="inline-block px-8 py-4 bg-white text-amber-600 font-bold rounded-lg">
            Complete Pet Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
