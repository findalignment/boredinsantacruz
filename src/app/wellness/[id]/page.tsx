import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getWellness } from '@/app/actions/getWellness';
import { getReviews, getAverageRating } from '@/app/actions/reviews';
import { ReviewsSummary } from '@/components/reviews/reviews-summary';
import { ReviewsList } from '@/components/reviews/reviews-list';
import { FavoriteButton } from '@/components/favorites/favorite-button';
import { ClickableAddress } from '@/components/clickable-address';

interface WellnessPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: WellnessPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getWellness();
  
  if (!result.success || !result.data) {
    return {
      title: 'Wellness Facility Not Found',
    };
  }

  const wellness = result.data.find((w) => w.id === id);
  if (!wellness) {
    return {
      title: 'Wellness Facility Not Found',
    };
  }
  
  return {
    title: `${wellness.name} - Santa Cruz Wellness`,
    description: wellness.description || `${wellness.name} in Santa Cruz - ${wellness.wellnessType?.join(', ')}`,
  };
}

async function ReviewsSection({ wellnessId }: { wellnessId: string }) {
  const [reviewsResult, ratingResult] = await Promise.all([
    getReviews('Wellness', wellnessId),
    getAverageRating('Wellness', wellnessId),
  ]);

  const reviews = reviewsResult.success ? reviewsResult.data : [];
  const ratingInfo = ratingResult;

  return (
    <div className="space-y-6">
      <ReviewsSummary
        itemId={wellnessId}
        itemType="Wellness"
        averageRating={ratingInfo.average}
        reviewCount={ratingInfo.count}
        showWriteButton={true}
      />
      {reviews.length > 0 && <ReviewsList reviews={reviews} />}
    </div>
  );
}

export default async function WellnessDetailPage({ params }: WellnessPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const result = await getWellness();

  if (!result.success || !result.data) {
    notFound();
  }

  const wellness = result.data.find((w) => w.id === id);

  if (!wellness) {
    notFound();
  }

  const googleMapsUrl = wellness.address 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wellness.address + ', Santa Cruz, CA')}`
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-green-50/30">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/wellness"
          className="text-teal-600 hover:text-teal-700 font-medium mb-6 inline-flex items-center gap-2 transition-colors"
        >
          ← Back to Wellness
        </Link>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 mb-8">
          {/* Hero Image */}
          {wellness.photoUrl && (
            <div className="relative h-80 w-full bg-gray-200">
              <Image
                src={wellness.photoUrl}
                alt={wellness.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-green-500 px-8 py-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {wellness.name}
                  </h1>
                  <FavoriteButton itemId={wellness.id} itemType="Wellness" />
                </div>
                {wellness.wellnessType && wellness.wellnessType.length > 0 && (
                  <p className="text-teal-100 text-lg mb-2">
                    {wellness.wellnessType.join(', ')}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {wellness.priceRange && (
                    <span className="px-3 py-1 bg-white/20 rounded-full font-semibold">
                      {wellness.priceRange}
                    </span>
                  )}
                  {wellness.category && (
                    <span>🏷️ {wellness.category}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            {wellness.description && (
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {wellness.description}
                </p>
              </div>
            )}

            {/* WriteUp Section - Editorial Long-Form Content */}
            {wellness.writeUp && (
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ✍️ Our Take
                </h2>
                <div className="prose prose-lg max-w-none text-gray-800">
                  <p className="whitespace-pre-line leading-relaxed">
                    {wellness.writeUp}
                  </p>
                </div>
              </div>
            )}

            {/* Amenities */}
            {wellness.amenities && wellness.amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ✨ Amenities & Services
                </h3>
                <div className="flex flex-wrap gap-3">
                  {wellness.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium border border-teal-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Insider Tips */}
            {wellness.tips && (
              <div className="mb-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300">
                <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  💡 Insider Tips
                </h3>
                <p className="text-gray-800 whitespace-pre-line">
                  {wellness.tips}
                </p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact & Location */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Location & Contact
                </h3>
                
                {wellness.address && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Address</p>
                    <ClickableAddress address={`${wellness.address}, Santa Cruz, CA`} />
                  </div>
                )}

                {wellness.phone && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                    <a
                      href={`tel:${wellness.phone}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      📞 {wellness.phone}
                    </a>
                  </div>
                )}

                {wellness.website && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Website</p>
                    <a
                      href={wellness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 break-all"
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                )}

                {wellness.instagram && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Instagram</p>
                    <a
                      href={wellness.instagram.startsWith('http') ? wellness.instagram : `https://instagram.com/${wellness.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      📷 {wellness.instagram.includes('instagram.com') ? 'Follow on Instagram' : `@${wellness.instagram.replace('@', '')}`}
                    </a>
                  </div>
                )}
              </div>

              {/* Hours & Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Details
                </h3>

                {wellness.hours && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Hours</p>
                    <div className="text-gray-800 space-y-1">
                      {wellness.hours.split(';').map((day, index) => (
                        <div key={index} className="text-sm">
                          {day.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {wellness.parking && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Parking</p>
                    <p className="text-gray-800 whitespace-pre-line">{wellness.parking}</p>
                  </div>
                )}

                {wellness.priceRange && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Price Range</p>
                    <p className="text-gray-800">{wellness.priceRange}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {wellness.website && (
                <a
                  href={wellness.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Visit Website →
                </a>
              )}
              {wellness.instagram && (
                <a
                  href={wellness.instagram.startsWith('http') ? wellness.instagram : `https://instagram.com/${wellness.instagram.replace('@', '')}`}
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

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews & Ratings
              </h3>
              <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>}>
                <ReviewsSection wellnessId={wellness.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

