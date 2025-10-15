import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { getTrips } from '@/app/actions/trips';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Trips',
  description: 'Plan and organize your Santa Cruz adventures',
};

export default async function TripsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login?callbackUrl=/trips');
  }

  const result = await getTrips();
  const trips = result.success ? result.data || [] : [];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-gray-600">Plan your perfect Santa Cruz adventure</p>
          </div>
          <Link
            href="/trips/new"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Trip
          </Link>
        </div>

        {/* Quick Tips */}
        {trips.length === 0 && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-2">✨ Get Started with Trip Planning</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Create a trip for your next Santa Cruz visit</li>
              <li>• Save activities and restaurants from anywhere on the site</li>
              <li>• Organize by days and reorder with drag-and-drop</li>
              <li>• Share with friends or keep it private</li>
            </ul>
            <Link href="/trips/how-to-use" className="text-gray-900 underline mt-3 inline-block">
              Learn more about trip planning →
            </Link>
          </div>
        )}

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No trips yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your Santa Cruz adventure
            </p>
            <Link
              href="/trips/new"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="block group"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-900 transition-all">
                  {/* Cover Image */}
                  {trip.coverImageUrl ? (
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                      <img
                        src={trip.coverImageUrl}
                        alt={trip.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-6xl">📍</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {trip.name}
                    </h3>
                    
                    {trip.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {trip.description}
                      </p>
                    )}

                    {(trip.startDate || trip.endDate) && (
                      <div className="text-sm text-gray-500 mb-3">
                        📅 {trip.startDate} {trip.endDate && `- ${trip.endDate}`}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {trip.isPublic ? '🌐 Public' : '🔒 Private'}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        View Trip →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

