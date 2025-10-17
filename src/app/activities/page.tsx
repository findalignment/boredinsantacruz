// src/app/activities/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { getActivities } from '@/app/actions/getActivities';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { FilteredActivities } from '@/components/filtered-activities';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities - Weather-Aware Recommendations',
  description: 'Discover the best activities in Santa Cruz based on today\'s weather. Smart recommendations that adapt to current conditions.',
};


export default async function ActivitiesPage() {
  const result = await getActivities();

  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unable to Load Activities
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              {result.error || 'Please try again later.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/activities"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Try Again
              </Link>
              <Link
                href="/restaurants"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                🍽️ Browse Restaurants
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const activities = result.data;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎯 All Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all activities in Santa Cruz with smart filtering
          </p>
        </div>


        {/* Activities with Filtering */}
        <FilteredActivities activities={activities} />
      </div>
    </main>
  );
}

