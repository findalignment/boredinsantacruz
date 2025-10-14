import { Metadata } from 'next';
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { getFavorites, getFavoriteCount } from '@/app/actions/favorites';
import { getUserReviews } from '@/app/actions/reviews';
import { getActivities } from '@/app/actions/getActivities';
import { ActivityCardWithFavorite } from '@/components/activity-card-with-favorite';
import { ReviewCard } from '@/components/reviews/review-card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your account, favorites, and reviews.',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // Fetch user data
  const [favoritesResult, reviewsResult, activitiesResult] = await Promise.all([
    getFavorites(),
    getUserReviews(),
    getActivities(),
  ]);

  const favoriteCount = await getFavoriteCount();
  const favorites = favoritesResult.success ? favoritesResult.data : [];
  const reviews = reviewsResult.success ? reviewsResult.data : [];
  const allActivities = activitiesResult.success ? activitiesResult.data : [];

  // Filter to only show favorited activities
  const favoritedActivities = allActivities.filter((activity) =>
    favorites.some((fav) => fav.itemType === 'Activity' && fav.itemId === activity.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-6">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {session.user?.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {session.user?.name || 'User'}
              </h1>
              <p className="text-gray-600">{session.user?.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link href="#favorites" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-gray-900">{favoriteCount}</div>
            <div className="text-gray-600">Favorites</div>
          </Link>
          <Link href="#reviews" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-3xl font-bold text-gray-900">{reviews.length}</div>
            <div className="text-gray-600">Reviews</div>
          </Link>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-2">📝</div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">Private Notes</div>
            <div className="text-xs text-gray-400 mt-1">Coming Soon</div>
          </div>
        </div>

        {/* Favorites Section */}
        <div id="favorites" className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>⭐</span> My Favorites
            </h2>
            {favoriteCount > 0 && (
              <span className="text-sm text-gray-500">{favoriteCount} saved</span>
            )}
          </div>

          {favoritedActivities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📌</div>
              <p className="text-lg font-medium">No favorites yet</p>
              <p className="text-sm mt-2 mb-4">
                Click the heart button on activities and restaurants to save them here
              </p>
              <Link
                href="/activities"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Explore Activities
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedActivities.map((activity) => (
                <ActivityCardWithFavorite
                  key={activity.id}
                  activity={activity}
                  isFavorited={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>💬</span> My Reviews
            </h2>
            {reviews.length > 0 && (
              <span className="text-sm text-gray-500">{reviews.length} written</span>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">✍️</div>
              <p className="text-lg font-medium">No reviews yet</p>
              <p className="text-sm mt-2 mb-4">
                Share your experiences to help others discover great places
              </p>
              <Link
                href="/activities"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Explore Activities
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showItemType={true} />
              ))}
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl p-8 mt-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">🚧 Coming Soon</h2>
          <p className="text-blue-100 mb-4">
            We're building awesome features for your profile:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🗺️</div>
              <div className="font-semibold">Trip Planning</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold">Recommendations</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold">Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

