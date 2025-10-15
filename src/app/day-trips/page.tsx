import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Day Trips from Santa Cruz | Weekend Getaway Guide 2025',
  description: 'Best day trips from Santa Cruz. Nearby destinations, scenic drives, and weekend getaway ideas.',
  keywords: 'santa cruz day trips, weekend trips, nearby destinations, getaways, scenic drives',
};

export default function DayTripsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🚗 Day Trips from Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Explore nearby destinations</p>
        
        <div className="space-y-6 mb-12">
          {[
            { dest: "Monterey & Carmel", distance: "45 min", highlights: "Aquarium, 17-Mile Drive, beach towns", best: "Full day" },
            { dest: "Big Sur", distance: "1 hour", highlights: "McWay Falls, Bixby Bridge, scenic coast", best: "Full day" },
            { dest: "San Francisco", distance: "1.5 hours", highlights: "City sights, museums, dining", best: "Full day" },
            { dest: "Pinnacles National Park", distance: "2 hours", highlights: "Rock formations, hiking, caves", best: "Full day" },
            { dest: "Año Nuevo State Park", distance: "30 min", highlights: "Elephant seals (Dec-Mar)", best: "Half day" },
            { dest: "Boulder Creek", distance: "30 min", highlights: "Redwoods, small town charm", best: "Half day" },
            { dest: "Moss Landing", distance: "20 min", highlights: "Elkhorn Slough kayaking, antiques", best: "Half day" },
            { dest: "Gilroy Gardens", distance: "45 min", highlights: "Theme park, family-friendly", best: "Full day" },
          ].map((trip, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-teal-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{trip.dest}</h3>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">{trip.distance}</span>
              </div>
              <p className="text-gray-700 mb-2">{trip.highlights}</p>
              <p className="text-sm text-teal-600"><strong>Plan:</strong> {trip.best}</p>
            </div>
          ))}
        </div>

        <div className="bg-teal-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Weekend</h2>
          <Link href="/weekend-guide" className="inline-block px-8 py-4 bg-white text-teal-600 font-bold rounded-lg">
            Weekend Itinerary
          </Link>
        </div>
      </div>
    </main>
  );
}
