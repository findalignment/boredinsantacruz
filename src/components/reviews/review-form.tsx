'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { StarRating } from './star-rating';
import { createReview, type CreateReviewData } from '@/app/actions/reviews';

interface ReviewFormProps {
  itemType: 'Activity' | 'Restaurant';
  itemId: string;
  itemName: string;
}

export function ReviewForm({ itemType, itemId, itemName }: ReviewFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // Category-specific ratings
  const [foodRating, setFoodRating] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);

  const [funRating, setFunRating] = useState(0);
  const [activityValueRating, setActivityValueRating] = useState(0);
  const [accessibilityRating, setAccessibilityRating] = useState(0);
  const [weatherRating, setWeatherRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (rating === 0) {
      setError('Please select an overall rating');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (!content.trim()) {
      setError('Please write your review');
      return;
    }

    const data: CreateReviewData = {
      itemType,
      itemId,
      rating,
      title: title.trim(),
      content: content.trim(),
      isPublic,
    };

    // Add category-specific ratings
    if (itemType === 'Restaurant') {
      if (foodRating > 0) data.foodRating = foodRating;
      if (ambianceRating > 0) data.ambianceRating = ambianceRating;
      if (serviceRating > 0) data.serviceRating = serviceRating;
      if (valueRating > 0) data.valueRating = valueRating;
    } else {
      if (funRating > 0) data.funRating = funRating;
      if (activityValueRating > 0) data.activityValueRating = activityValueRating;
      if (accessibilityRating > 0) data.accessibilityRating = accessibilityRating;
      if (weatherRating > 0) data.weatherRating = weatherRating;
    }

    startTransition(async () => {
      const result = await createReview(data);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.back();
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit review');
      }
    });
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h3>
        <p className="text-gray-600">Thank you for sharing your experience.</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Write a Review for {itemName}
        </h2>
        <p className="text-gray-600">Share your experience with the community</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Overall Rating */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <StarRating
          value={rating}
          onChange={setRating}
          size="lg"
          label="Overall Rating *"
        />
      </div>

      {/* Category-Specific Ratings */}
      {itemType === 'Restaurant' ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rate Specific Aspects (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StarRating value={foodRating} onChange={setFoodRating} label="Food Quality" />
            <StarRating value={ambianceRating} onChange={setAmbianceRating} label="Ambiance" />
            <StarRating value={serviceRating} onChange={setServiceRating} label="Service" />
            <StarRating value={valueRating} onChange={setValueRating} label="Value for Money" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rate Specific Aspects (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StarRating value={funRating} onChange={setFunRating} label="Fun Factor" />
            <StarRating value={activityValueRating} onChange={setActivityValueRating} label="Value" />
            <StarRating value={accessibilityRating} onChange={setAccessibilityRating} label="Accessibility" />
            <StarRating value={weatherRating} onChange={setWeatherRating} label="Weather Suitability" />
          </div>
        </div>
      )}

      {/* Title */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Review Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience in one line"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isPending}
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience, tips, and recommendations..."
          rows={8}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isPending}
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1">{content.length}/2000 characters</p>
      </div>

      {/* Public/Private Toggle */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start gap-3">
          <input
            id="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          <div className="flex-1">
            <label htmlFor="isPublic" className="block text-sm font-medium text-gray-900 cursor-pointer">
              Make this review public
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Public reviews help other visitors. Uncheck to keep this private (only you can see it).
            </p>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending || rating === 0 || !title.trim() || !content.trim()}
          className="flex-1 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Review Guidelines:</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Be honest and specific about your experience</li>
          <li>• Include helpful details (when you visited, with whom, etc.)</li>
          <li>• Be respectful and constructive</li>
          <li>• Don't include personal information</li>
        </ul>
      </div>
    </form>
  );
}

