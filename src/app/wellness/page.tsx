import Link from 'next/link';
import type { Metadata } from 'next';
import { getWellness } from '@/app/actions/getWellness';
import { WellnessFilters } from '@/components/wellness/wellness-filters';

export const metadata: Metadata = {
  title: 'Wellness & Fitness in Santa Cruz',
  description: 'Find the best gyms, yoga studios, spas, massage therapists, and wellness centers in Santa Cruz, CA',
  keywords: 'santa cruz gyms, yoga studios, spas, massage, wellness, fitness centers, pilates',
};

export default async function WellnessPage() {
  const result = await getWellness();
  const wellnessActivities = result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🧘 Wellness & Fitness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your guide to staying healthy and balanced in Santa Cruz
          </p>
        </div>

        {/* Setup Notice - Only show if no wellness activities */}
        {wellnessActivities.length === 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📋 Add Wellness Facilities to Airtable
            </h3>
            <p className="text-blue-800 mb-4">
              To populate this page, create a "Wellness" table in Airtable with these fields:
            </p>
            <ul className="list-disc list-inside text-blue-800 space-y-1 mb-4">
              <li><code className="bg-blue-100 px-2 py-1 rounded">Name</code> (Single line text)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Description</code> (Long text)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">WellnessType</code> (Multiple select) - Gym, Yoga, Spa, Massage, Pilates, PT, Meditation</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Address</code> (Single line text)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Phone</code> (Phone number)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Website</code> (URL)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Hours</code> (Long text)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">PriceRange</code> (Single select) - $, $$, $$$, $$$$</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">Amenities</code> (Multiple select)</li>
            </ul>
            <p className="text-sm text-blue-700 mb-3">
              Then add <code className="bg-blue-100 px-2 py-1 rounded">AIRTABLE_WELLNESS_TABLE=Wellness</code> to your .env.local
            </p>
            <p className="text-sm text-blue-700">
              Import from: <code className="bg-blue-100 px-2 py-1 rounded">santa-cruz-wellness.csv</code>
            </p>
          </div>
        )}

        {/* Interactive Wellness Filters with Activities */}
        <WellnessFilters activities={wellnessActivities} />

        {/* Benefits Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Wellness in Santa Cruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">🌊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beach Yoga</h3>
              <p className="text-gray-600">
                Practice yoga with ocean views at sunrise or sunset
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🌲</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Forest Bathing</h3>
              <p className="text-gray-600">
                Meditate among ancient redwoods for natural healing
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🏄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Active Lifestyle</h3>
              <p className="text-gray-600">
                Surfing, hiking, and outdoor fitness year-round
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Own a Wellness Business?</h2>
          <p className="text-xl mb-6 text-green-50">
            Get your gym, studio, or spa listed on Bored in Santa Cruz
          </p>
          <a
            href="/advertise"
            className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}

