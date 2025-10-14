import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getActivities } from '@/app/actions/getActivities';
import { InteractiveMap } from '@/components/map/interactive-map';

export const metadata: Metadata = {
  title: 'Map - Explore Santa Cruz',
  description: 'Interactive map of activities, restaurants, and attractions in Santa Cruz.',
};

async function MapContent() {
  const result = await getActivities();
  
  if (!result.success || !result.data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to Load Activities
        </h3>
        <p className="text-gray-600">
          {result.error || 'Please try again later.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
      <InteractiveMap activities={result.data} />
    </div>
  );
}

function MapLoading() {
  return (
    <div className="bg-gray-200 rounded-xl shadow-lg animate-pulse" style={{ height: '600px' }}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-600 font-medium">Loading map...</p>
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              🗺️ Santa Cruz Map
            </h1>
            <p className="text-lg text-gray-600">
              Explore activities, restaurants, and attractions
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">ℹ️</div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                Interactive Map Features
              </h2>
              <ul className="space-y-1 text-teal-50 text-sm">
                <li>• Click markers for activity details</li>
                <li>• Use controls to zoom and navigate</li>
                <li>• Click location button to find activities near you</li>
                <li>• Different colors represent different activity types</li>
              </ul>
              <p className="text-teal-200 text-xs mt-3">
                💡 Mapbox API key needed. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to environment variables.
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <Suspense fallback={<MapLoading />}>
          <MapContent />
        </Suspense>

        {/* Activity Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing all activities in Santa Cruz County
          </p>
        </div>
      </div>
    </main>
  );
}
