import Link from 'next/link';
import type { Metadata } from 'next';
import { getRestaurants } from '@/app/actions/getRestaurants';

export const metadata: Metadata = {
  title: 'Happy Hours & Deals in Santa Cruz',
  description: 'Find the best happy hour deals, drink specials, and food discounts in Santa Cruz, CA',
  keywords: 'santa cruz happy hour, drink specials, food deals, restaurant deals, bar specials',
};

export default async function DealsPage() {
  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];

  // Filter for places with happy hours (you'll need to add this field to Airtable)
  const happyHourPlaces = allRestaurants.filter(r => {
    // For now, we'll show all bars and restaurants
    // Later, filter by a HappyHour checkbox field in Airtable
    return r.name && r.address;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍻 Happy Hours & Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save money while enjoying Santa Cruz's best food and drinks
          </p>
        </div>

        {/* Setup Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📋 Add Happy Hour Information to Airtable
          </h3>
          <p className="text-blue-800 mb-4">
            To show happy hour deals, add these fields to your Airtable Restaurants table:
          </p>
          <ul className="list-disc list-inside text-blue-800 space-y-1 mb-4">
            <li><code className="bg-blue-100 px-2 py-1 rounded">HappyHour</code> (Checkbox)</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">HappyHourDetails</code> (Long text) - e.g., "Mon-Fri 4-6pm: $5 wells, $6 apps"</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">HappyHourDays</code> (Multiple select) - Mon, Tue, Wed, Thu, Fri, Sat, Sun</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">HappyHourStartTime</code> (Single line) - "4:00 PM"</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">HappyHourEndTime</code> (Single line) - "6:00 PM"</li>
          </ul>
          <p className="text-sm text-blue-700">
            See <code>AIRTABLE_STRUCTURE_GUIDE.md</code> for details.
          </p>
        </div>

        {/* Day Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Day</h3>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  day === currentDay
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Deals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🔥 Featured Happy Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards - will be populated once Airtable fields are added */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-6xl">🍺</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Add Your Happy Hours!
                </h3>
                <p className="text-gray-600 mb-3">
                  Update your Airtable to include happy hour details for each restaurant.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🕐</span>
                  <span>Mon-Fri 4-6pm</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-green-600 font-semibold">Example: $5 wells, $6 apps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Restaurants with Potential Happy Hours */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            All Restaurants & Bars
          </h2>
          <p className="text-gray-600 mb-6">
            Check with these venues for current happy hour specials
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {happyHourPlaces.slice(0, 12).map((place) => (
              <Link
                key={place.id}
                href={`/restaurant/${place.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {place.name}
                </h3>
                {place.cuisine && place.cuisine.length > 0 && (
                  <p className="text-sm text-gray-600 mb-2">
                    {place.cuisine.slice(0, 2).join(', ')}
                  </p>
                )}
                {place.neighborhood && (
                  <p className="text-sm text-gray-500 mb-3">
                    📍 {place.neighborhood}
                  </p>
                )}
                {place.priceLevel && (
                  <p className="text-sm text-gray-600">
                    {place.priceLevel}
                  </p>
                )}
                <div className="mt-4 text-orange-600 font-medium text-sm">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Own a Restaurant or Bar?</h2>
          <p className="text-xl mb-6 text-orange-50">
            Get your happy hour deals listed on Bored in Santa Cruz
          </p>
          <a
            href="/advertise"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}

