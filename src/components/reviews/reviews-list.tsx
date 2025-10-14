import { ReviewCard } from './review-card';
import type { Review } from '@/app/actions/reviews';

interface ReviewsListProps {
  reviews: Review[];
  emptyMessage?: string;
  showItemType?: boolean;
}

export function ReviewsList({
  reviews,
  emptyMessage = 'No reviews yet. Be the first to share your experience!',
  showItemType = false,
}: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showItemType={showItemType} />
      ))}
    </div>
  );
}

