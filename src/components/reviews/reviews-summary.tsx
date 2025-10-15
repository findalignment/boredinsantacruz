import Link from 'next/link';
import { StarRating } from './star-rating';

interface ReviewsSummaryProps {
  itemType: 'Activity' | 'Restaurant' | 'Wellness';
  itemId: string;
  averageRating: number;
  reviewCount: number;
  showWriteButton?: boolean;
}

export function ReviewsSummary({
  itemType,
  itemId,
  averageRating,
  reviewCount,
  showWriteButton = true,
}: ReviewsSummaryProps) {
  // Calculate rating distribution (placeholder for now - would need actual data)
  const getRatingDistribution = () => {
    // TODO: Calculate actual distribution from reviews
    return [
      { stars: 5, count: Math.floor(reviewCount * 0.6), percentage: 60 },
      { stars: 4, count: Math.floor(reviewCount * 0.25), percentage: 25 },
      { stars: 3, count: Math.floor(reviewCount * 0.1), percentage: 10 },
      { stars: 2, count: Math.floor(reviewCount * 0.03), percentage: 3 },
      { stars: 1, count: Math.floor(reviewCount * 0.02), percentage: 2 },
    ];
  };

  const distribution = reviewCount > 0 ? getRatingDistribution() : [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Average Rating */}
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {reviewCount > 0 ? averageRating.toFixed(1) : '—'}
          </div>
          <div className="mb-3">
            <StarRating value={Math.round(averageRating)} readonly size="md" />
          </div>
          <p className="text-gray-600">
            {reviewCount === 0 ? 'No reviews yet' : `Based on ${reviewCount} review${reviewCount !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Middle: Rating Distribution */}
        {reviewCount > 0 && (
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Distribution</h4>
            <div className="space-y-2">
              {distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right: Write Review Button */}
        {showWriteButton && (
          <div className="flex-shrink-0 flex items-center">
            <Link
              href={`/review/${itemType.toLowerCase()}/${itemId}`}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              ✍️ Write a Review
            </Link>
          </div>
        )}
      </div>

      {/* If no reviews, show encouragement */}
      {reviewCount === 0 && (
        <div className="mt-6 pt-6 border-t-2 border-gray-100">
          <p className="text-center text-gray-600">
            Be the first to share your experience! Your review helps others discover great places in Santa Cruz.
          </p>
        </div>
      )}
    </div>
  );
}

