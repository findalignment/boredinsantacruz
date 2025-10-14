'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { StarRating } from './star-rating';
import { deleteReview, type Review } from '@/app/actions/reviews';
import { useRouter } from 'next/navigation';

interface ReviewCardProps {
  review: Review;
  showItemType?: boolean;
}

export function ReviewCard({ review, showItemType = false }: ReviewCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwnReview = session?.user?.id === review.userId;

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    startTransition(async () => {
      const result = await deleteReview(review.id);

      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete review');
        setShowDeleteConfirm(false);
      }
    });
  };

  // Format date
  const date = new Date(review.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDate = review.updatedAt ? new Date(review.updatedAt) : null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              <p className="text-sm text-gray-500">
                {formattedDate}
                {updatedDate && ' (edited)'}
              </p>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="flex items-center gap-2">
            <StarRating value={review.rating} readonly size="sm" />
            {!review.isPublic && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                🔒 Private
              </span>
            )}
            {showItemType && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {review.itemType}
              </span>
            )}
          </div>
        </div>

        {/* Actions (if own review) */}
        {isOwnReview && (
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/review/${review.itemType.toLowerCase()}/${review.itemId}`)}
              className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              disabled={isPending}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                showDeleteConfirm
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'text-red-600 hover:text-red-800 hover:bg-red-50'
              }`}
              disabled={isPending}
            >
              {showDeleteConfirm ? '⚠️ Confirm Delete' : '🗑️ Delete'}
            </button>
            {showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isPending}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900">{review.title}</h3>

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>

      {/* Category-Specific Ratings */}
      {(review.foodRating || review.funRating) && (
        <div className="border-t-2 border-gray-100 pt-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">Detailed Ratings:</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Restaurant Ratings */}
            {review.foodRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Food</p>
                <StarRating value={review.foodRating} readonly size="sm" />
              </div>
            )}
            {review.ambianceRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Ambiance</p>
                <StarRating value={review.ambianceRating} readonly size="sm" />
              </div>
            )}
            {review.serviceRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Service</p>
                <StarRating value={review.serviceRating} readonly size="sm" />
              </div>
            )}
            {review.valueRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Value</p>
                <StarRating value={review.valueRating} readonly size="sm" />
              </div>
            )}

            {/* Activity Ratings */}
            {review.funRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Fun Factor</p>
                <StarRating value={review.funRating} readonly size="sm" />
              </div>
            )}
            {review.activityValueRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Value</p>
                <StarRating value={review.activityValueRating} readonly size="sm" />
              </div>
            )}
            {review.accessibilityRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Accessibility</p>
                <StarRating value={review.accessibilityRating} readonly size="sm" />
              </div>
            )}
            {review.weatherRating && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Weather</p>
                <StarRating value={review.weatherRating} readonly size="sm" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

