import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getActivities } from '@/app/actions/getActivities';
import { getTodaysTides } from '@/app/actions/getTides';
import { getCurrentWeatherAction } from '@/app/actions/getWeather';
import { scoreActivityWithContext } from '@/lib/recommendations/scorer';
import { scoreTideConditions, getTideRecommendation } from '@/lib/recommendations/tide-scorer';
import { TideDisplay } from '@/components/tides/tide-display';
import { getReviews, getAverageRating } from '@/app/actions/reviews';
import { ReviewsSummary } from '@/components/reviews/reviews-summary';
import { ReviewsList } from '@/components/reviews/reviews-list';
import { FavoriteButton } from '@/components/favorites/favorite-button';
import { ActivityStructuredData } from '@/components/seo/structured-data';
import { ClickableAddress } from '@/components/clickable-address';
import { ActivityMap } from '@/components/activity-map';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const result = await getActivities();
    if (!result.success || !result.data) {
      return { title: 'Activity Not Found' };
    }

    const activity = result.data.find(a => a.id === id);
    if (!activity) {
      return { title: 'Activity Not Found' };
    }

    return {
      title: `${activity.title} - Bored in Santa Cruz`,
      description: activity.notes || `Discover ${activity.title} at ${activity.venueName || activity.venue?.name} in Santa Cruz`,
    };
  } catch {
    return { title: 'Activity Not Found' };
  }
}

async function ActivityWeatherInfo({ activityId }: { activityId: string }) {
  try {
    const [activitiesResult, weatherResult, tideResult] = await Promise.all([
      getActivities(),
      getCurrentWeatherAction(),
      getTodaysTides(),
    ]);

    if (!activitiesResult.success || !weatherResult.success) {
      return null;
    }

    const activity = activitiesResult.data?.find(a => a.id === activityId);
    if (!activity) return null;

    const scoredActivity = scoreActivityWithContext(activity, weatherResult.data);
    const tideScore = tideResult.success && tideResult.data 
      ? scoreTideConditions(activity, tideResult.data.tideData)
      : null;
    const tideRec = tideResult.success && tideResult.data
      ? getTideRecommendation(activity, tideResult.data.tideData)
      : null;

    const getScoreColor = (score: number) => {
      if (score >= 85) return 'bg-green-50 border-green-200 text-green-900';
      if (score >= 70) return 'bg-blue-50 border-blue-200 text-blue-900';
      if (score >= 55) return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      return 'bg-gray-50 border-gray-200 text-gray-900';
    };

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          🌤️ Today's Weather Score
        </h3>
        
        <div className={`p-4 rounded-lg border-2 mb-4 ${getScoreColor(scoredActivity.weatherScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{scoredActivity.weatherScore}%</span>
            <span className="text-3xl">
              {scoredActivity.weatherScore >= 85 ? '⭐' : scoredActivity.weatherScore >= 70 ? '✨' : '👍'}
            </span>
          </div>
          <p className="font-medium">{scoredActivity.matchReason}</p>
          {scoredActivity.weatherWarning && (
            <p className="mt-2 text-sm">{scoredActivity.weatherWarning}</p>
          )}
        </div>

        {tideRec && tideScore !== null && (
          <div className="p-4 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-cyan-900">Tide Score: {tideScore}%</span>
            </div>
            <p className="text-sm text-cyan-800">{tideRec}</p>
          </div>
        )}
      </div>
    );
  } catch {
    return null;
  }
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const result = await getActivities();

  if (!result.success || !result.data) {
    notFound();
  }

  const activity = result.data.find(a => a.id === id);

  if (!activity) {
    notFound();
  }

  const address = activity.address || activity.venue?.address;
  const hours = activity.hours || activity.venue?.hours;
  const parking = activity.parking || activity.venue?.parking;
  const tips = activity.tips || activity.venue?.tips;
  const phone = activity.phone || activity.venue?.phone;
  
  const googleMapsUrl = address 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Santa Cruz, CA')}`
    : null;

  // Fetch rating for structured data
  const ratingInfo = await getAverageRating('Activity', id);

  return (
    <>
      {/* Structured Data for SEO */}
      <ActivityStructuredData activity={activity} rating={ratingInfo} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-96 bg-cover bg-center" style={{
          backgroundImage: activity.imageUrl 
            ? `url(${activity.imageUrl})` 
            : 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'
        }}>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl font-bold mb-4">{activity.title}</h1>
              <p className="text-xl mb-4">
                {activity.venueName || activity.venue?.name || 'Santa Cruz Activity'}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                {activity.cost !== undefined && (
                  <span className="px-4 py-2 bg-green-100/20 backdrop-blur-sm text-green-100 rounded-full text-lg font-semibold border border-green-200/30">
                    💰 {activity.cost === 0 ? 'Free' : `$${activity.cost}`}
                  </span>
                )}
                {activity.duration && (
                  <span className="px-4 py-2 bg-blue-100/20 backdrop-blur-sm text-blue-100 rounded-full text-lg font-semibold border border-blue-200/30">
                    ⏱️ {activity.duration}
                  </span>
                )}
                {activity.indoorOutdoor && (
                  <span className="px-4 py-2 bg-purple-100/20 backdrop-blur-sm text-purple-100 rounded-full text-lg font-semibold border border-purple-200/30">
                    {activity.indoorOutdoor === 'Indoor' ? '🏠 Indoor' : 
                     activity.indoorOutdoor === 'Outdoor' ? '🌳 Outdoor' : 
                     activity.indoorOutdoor === 'Mixed' ? '🏠🌳 Mixed' : 
                     activity.indoorOutdoor === 'Covered' ? '⛱️ Covered' : '🌿 Outdoor'}
                  </span>
                )}
              </div>
              {activity.notes && (
                <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                  {activity.notes}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            href="/activities"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to Activities
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Basic Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">About {activity.title}</h2>
                    <div className="flex items-center gap-4">
                      <FavoriteButton
                  itemType="Activity"
                  itemId={activity.id}
                  size="lg"
                />
              </div>

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activity.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* WriteUp Section - Editorial Long-Form Content */}
            {activity.writeUp && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ✍️ Our Take
                </h2>
                <div className="prose prose-lg max-w-none text-gray-800">
                  <p className="whitespace-pre-line leading-relaxed">
                    {activity.writeUp}
                  </p>
                </div>
              </div>
            )}

            {/* Practical Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📋 Practical Information
              </h2>

              {/* Address */}
              {address && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <ClickableAddress address={`${address}, Santa Cruz, CA`} />
                </div>
              )}

              {/* Phone */}
              {phone && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    📞 Phone
                  </h3>
                  <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {phone}
                  </a>
                </div>
              )}

              {/* Hours */}
              {hours && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    🕐 Hours
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    {hours.split(';').map((day, index) => (
                      <div key={index} className="text-sm">
                        {day.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parking */}
              {parking && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    🅿️ Parking
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{parking}</p>
                </div>
              )}

              {/* Tips */}
              {tips && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    💡 Tips for a Great Visit
                  </h3>
                  <p className="text-amber-800 whitespace-pre-line">{tips}</p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                {activity.website && (
                  <a
                    href={activity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Website →
                  </a>
                )}
                {activity.instagram && (
                  <a
                    href={activity.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    📸 Instagram
                  </a>
                )}
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    🗺️ Get Directions
                  </a>
                )}
              </div>
            </div>

            {/* Map */}
            {activity.latitude && activity.longitude && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📍 Location Map
                </h2>
                <ActivityMap
                  latitude={parseFloat(activity.latitude)}
                  longitude={parseFloat(activity.longitude)}
                  name={activity.title}
                  address={address}
                />
              </div>
            )}

            {/* Reviews Section */}
            <Suspense fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
            }>
              <ReviewsSection activityId={id} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Score */}
            <Suspense fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
            }>
              <ActivityWeatherInfo activityId={id} />
            </Suspense>

            {/* Today's Tides */}
            <Suspense fallback={
              <div className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>
            }>
              <TidesSidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

async function TidesSidebar() {
  try {
    const result = await getTodaysTides();
    if (!result.success || !result.data) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">🌊 Today's Tides</h3>
        <TideDisplay tideData={result.data.tideData} compact={true} />
      </div>
    );
  } catch {
    return null;
  }
}

async function ReviewsSection({ activityId }: { activityId: string }) {
  try {
    const [reviewsResult, ratingInfo] = await Promise.all([
      getReviews('Activity', activityId),
      getAverageRating('Activity', activityId),
    ]);

    if (!reviewsResult.success) {
      return null;
    }

    const reviews = reviewsResult.data;

    return (
      <div className="space-y-6">
        {/* Reviews Summary */}
        <ReviewsSummary
          itemType="Activity"
          itemId={activityId}
          averageRating={ratingInfo.average}
          reviewCount={ratingInfo.count}
          showWriteButton={true}
        />

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💬 Reviews ({reviews.length})
            </h2>
            <ReviewsList reviews={reviews} />
          </div>
        )}
      </div>
    );
  } catch {
    return null;
  }
}

