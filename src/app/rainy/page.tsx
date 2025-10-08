// src/app/rainy/page.tsx
import { getActivities } from '@/app/actions/getActivities';
import { FilteredActivities } from '@/components/filtered-activities';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rainy Day Activities in Santa Cruz',
  description: 'Discover the best indoor activities, cozy cafes, museums, and entertainment options in Santa Cruz for rainy days. Find things to do when the weather turns wet.',
  keywords: ['Santa Cruz rainy day', 'indoor activities Santa Cruz', 'things to do Santa Cruz rain', 'Santa Cruz museums', 'Santa Cruz cafes', 'rainy day guide'],
  openGraph: {
    title: 'Rainy Day Activities in Santa Cruz',
    description: 'Don\'t let the weather dampen your spirits! Discover amazing indoor activities and cozy spots in Santa Cruz.',
    type: 'website',
  },
};

// Loading component
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-200 rounded-xl h-64 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function ActivitiesSection() {
  const result = await getActivities();
  
  if (!result.success) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-600 text-xl font-semibold mb-2">Error loading activities</p>
        <p className="text-gray-600">{result.error}</p>
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">🌧️</div>
        <p className="text-gray-600 text-lg">No activities found</p>
      </div>
    );
  }
  
  return <FilteredActivities activities={result.data} />;
}

export default function RainyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌧️ Rainy Day Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't let the weather dampen your spirits! Discover amazing indoor activities and cozy spots in Santa Cruz.
          </p>
        </div>

        {/* Activities with Filters */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ActivitiesSection />
        </Suspense>
      </div>
    </main>
  );
}