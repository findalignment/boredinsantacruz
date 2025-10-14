import { Metadata } from 'next';
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { getFavorites } from '@/app/actions/favorites';
import { getActivities } from '@/app/actions/getActivities';
import { ActivityCardWithFavorite } from '@/components/activity-card-with-favorite';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Favorites',
  description: 'Your saved activities and restaurants in Santa Cruz.',
};

export default async function FavoritesPage() {
  const session = await auth();

  if (!session) {
    redirect('/login?callbackUrl=/favorites');
  }

  // Fetch favorites
  const favoritesResult = await getFavorites();
  const favorites = favoritesResult.success ? favoritesResult.data : [];

  // Fetch all activities
  const activitiesResult = await getActivities();
  const allActivities = activitiesResult.success ? activitiesResult.data : [];

  // Filter to favorited activities
  const favoritedActivities = allActivities.filter((activity) =>
    favorites.some((fav) => fav.itemType === 'Activity' && fav.itemId === activity.id)
  );

  // TODO: Add restaurant favorites when restaurant data is available

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ⭐ My Favorites
          </h1>
          <p className="text-xl text-gray-600">
            {favorites.length === 0
              ? 'Start building your collection of favorite spots!'
              : `You have ${favorites.length} saved ${favorites.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        {/* Content */}
        {favoritedActivities.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">📌</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No favorites yet
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Click the heart button (❤️) on any activity or restaurant to save it here for
              easy access later!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/activities"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Activities
              </Link>
              <Link
                href="/rainy"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Rainy Day Ideas
              </Link>
              <Link
                href="/sunny"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Sunny Day Fun
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Activities Section */}
            {favoritedActivities.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>🎯</span> Activities ({favoritedActivities.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritedActivities.map((activity) => (
                    <ActivityCardWithFavorite
                      key={activity.id}
                      activity={activity}
                      isFavorited={true}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Restaurants Section - Coming Soon */}
            <section className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Restaurant Favorites Coming Soon
              </h2>
              <p className="text-gray-600">
                Soon you'll be able to save your favorite restaurants here too!
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

