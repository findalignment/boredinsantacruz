'use client';

import Link from 'next/link';
import { RainyActivity } from '@/types';
import { FavoriteButton } from '@/components/favorites/favorite-button';

interface ActivityCardProps {
  activity: RainyActivity;
  isFavorited?: boolean;
}

export function ActivityCardWithFavorite({ activity, isFavorited = false }: ActivityCardProps) {
  const costLabels = ['Free', '$', '$$', '$$$', '$$$$'];
  const costLabel = costLabels[activity.cost] || 'N/A';

  return (
    <Link href={`/activity/${activity.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer relative">
        {/* Favorite Button - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton
            itemType="Activity"
            itemId={activity.id}
            initialIsFavorited={isFavorited}
            size="md"
          />
        </div>

        {/* Image */}
        {activity.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {activity.title}
          </h3>

          <p className="text-gray-600 mb-3">{activity.venueName}</p>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activity.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span>💰</span>
              <span>{costLabel}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{activity.duration}</span>
            </span>
          </div>

          {/* Address Preview */}
          {activity.address && (
            <div className="mt-3 text-sm text-gray-500 flex items-start gap-1">
              <span>📍</span>
              <span className="line-clamp-1">{activity.address}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

