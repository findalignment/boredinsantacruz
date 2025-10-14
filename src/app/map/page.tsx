import { getActivities } from '@/app/actions/getActivities';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity Map - Bored in Santa Cruz',
  description: 'Explore Santa Cruz activities on an interactive map. Find beaches, restaurants, hiking trails, and more.',
};

export default async function MapPage() {
  const result = await getActivities();

  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Activities
          </h1>
          <p className="text-gray-600 mb-4">
            {result.error || 'Please try again later'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/activities"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Activities
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🗺️ Activity Map
            </h1>
            <p className="text-lg text-gray-600">
              Interactive map coming soon! For now, browse by neighborhood.
            </p>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🗺️</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Interactive Map Coming Soon!
              </h2>
              <p className="text-blue-100 mb-4">
                We're building an interactive Mapbox map where you can:
              </p>
              <ul className="space-y-2 text-blue-50">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>See all activities plotted on a map</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Click markers for activity details</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Filter by type, price, and weather</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Find activities near you</span>
                </li>
              </ul>
              <p className="text-sm text-blue-200 mt-4">
                For now, browse activities by neighborhood below!
              </p>
            </div>
          </div>
        </div>

        {/* Activities by Neighborhood */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Westside */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🌊 Westside
            </h3>
            <ul className="space-y-2">
              {result.data
                .filter(a => a.venue?.neighborhood === 'Westside' || 
                  a.title.includes('Natural Bridges') || 
                  a.title.includes('West Cliff'))
                .slice(0, 5)
                .map(activity => (
                  <li key={activity.id}>
                    <Link
                      href={`/activity/${activity.id}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Downtown */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🏙️ Downtown
            </h3>
            <ul className="space-y-2">
              {result.data
                .filter(a => a.venue?.neighborhood === 'Downtown' || 
                  a.title.includes('Pacific') || 
                  a.title.includes('Downtown'))
                .slice(0, 5)
                .map(activity => (
                  <li key={activity.id}>
                    <Link
                      href={`/activity/${activity.id}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Eastside */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🏄 Eastside / Pleasure Point
            </h3>
            <ul className="space-y-2">
              {result.data
                .filter(a => a.venue?.neighborhood === 'Eastside' || 
                  a.title.includes('Pleasure Point') || 
                  a.title.includes('Harbor'))
                .slice(0, 5)
                .map(activity => (
                  <li key={activity.id}>
                    <Link
                      href={`/activity/${activity.id}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Capitola */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🎨 Capitola
            </h3>
            <p className="text-gray-600 text-sm">
              Charming beach village with shops, restaurants, and beach activities.
            </p>
          </div>

          {/* Mountains / Felton */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🌲 Mountains / Felton
            </h3>
            <ul className="space-y-2">
              {result.data
                .filter(a => a.title.includes('Cowell') || 
                  a.title.includes('Felton') || 
                  a.title.includes('Roaring Camp'))
                .slice(0, 5)
                .map(activity => (
                  <li key={activity.id}>
                    <Link
                      href={`/activity/${activity.id}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {activity.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* All Activities */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">
              📋 View All Activities
            </h3>
            <Link
              href="/activities"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              See Full List →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
