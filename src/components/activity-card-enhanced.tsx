// src/components/activity-card-enhanced.tsx
'use client';

import { ScoredActivity } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { SaveToTripButton } from '@/components/trips/save-to-trip-button';

interface ActivityCardEnhancedProps {
  activity: ScoredActivity;
  showScore?: boolean;
}

export function ActivityCardEnhanced({ 
  activity, 
  showScore = true 
}: ActivityCardEnhancedProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 55) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getScoreEmoji = (score: number): string => {
    if (score >= 85) return '⭐';
    if (score >= 70) return '✨';
    if (score >= 55) return '👍';
    return '🤔';
  };

  const address = activity.address || activity.venue?.address;
  const googleMapsUrl = address 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Santa Cruz, CA')}`
    : null;

  return (
    <Link 
      href={`/activity/${activity.id}`}
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Image */}
      {activity.imageUrl ? (
        <div className="relative h-48 bg-gray-200">
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🏞️</div>
            <div className="text-sm text-gray-600 font-medium">Photo Coming Soon</div>
          </div>
          {/* Weather Score Badge */}
          {showScore && activity.weatherScore !== undefined && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold border-2 ${getScoreColor(activity.weatherScore)}`}>
              {getScoreEmoji(activity.weatherScore)} {activity.weatherScore}%
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {activity.title}
        </h3>

        {/* Venue & Address */}
        <div className="mb-3">
          <p className="text-gray-900 font-medium text-sm mb-1">
            {activity.venueName || activity.venue?.name}
          </p>
          {googleMapsUrl ? (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 hover:underline"
            >
              📍 {address}
            </a>
          ) : (
            address && (
              <p className="text-gray-600 text-sm flex items-center gap-1">
                📍 {address}
              </p>
            )
          )}
        </div>

        {/* Match Reason */}
        {showScore && activity.matchReason && (
          <div className="mb-3">
            <p className="text-sm text-blue-700 font-medium">
              {activity.matchReason}
            </p>
          </div>
        )}

        {/* Weather Warning */}
        {activity.weatherWarning && (
          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {activity.weatherWarning}
            </p>
          </div>
        )}

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {activity.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {activity.cost !== undefined && (
            <span>💰 ${activity.cost}</span>
          )}
          {activity.duration && (
            <span>⏱️ {activity.duration}</span>
          )}
          {activity.indoorOutdoor && activity.indoorOutdoor.length > 1 && (
            <span>
              {activity.indoorOutdoor === 'Indoor' && '🏠 Indoor'}
              {activity.indoorOutdoor === 'Outdoor' && '🌳 Outdoor'}
              {activity.indoorOutdoor === 'Mixed' && '🏠🌳 Mixed'}
              {activity.indoorOutdoor === 'Covered' && '⛱️ Covered'}
            </span>
          )}
        </div>

        {/* Notes */}
        {activity.notes && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {activity.notes}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 space-y-2">
          <SaveToTripButton
            itemType="Activity"
            itemId={activity.id}
            itemName={activity.title}
            itemData={{
              address: address,
              cost: activity.cost,
              duration: activity.duration,
              imageUrl: activity.imageUrl,
              indoorOutdoor: activity.indoorOutdoor,
            }}
            variant="compact"
          />
          <div className="px-4 py-2 bg-gray-900 text-white text-center text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}

