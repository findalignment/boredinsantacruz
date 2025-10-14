// src/components/activity-card-enhanced.tsx
'use client';

import { ScoredActivity } from '@/types';
import Image from 'next/image';

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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {activity.imageUrl && (
        <div className="relative h-48 bg-gray-200">
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill
            className="object-cover"
          />
          
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

        {/* Venue */}
        <p className="text-gray-600 text-sm mb-3">
          📍 {activity.venueName}
        </p>

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
                {tag}
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
          {activity.indoorOutdoor && (
            <span>
              {activity.indoorOutdoor === 'Indoor' && '🏠'}
              {activity.indoorOutdoor === 'Outdoor' && '🌳'}
              {activity.indoorOutdoor === 'Mixed' && '🏠🌳'}
              {activity.indoorOutdoor === 'Covered' && '⛱️'}
              {' '}{activity.indoorOutdoor}
            </span>
          )}
        </div>

        {/* Notes */}
        {activity.notes && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {activity.notes}
          </p>
        )}

        {/* Links */}
        <div className="flex gap-2">
          {activity.website && (
            <a
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Website
            </a>
          )}
          {activity.instagram && (
            <a
              href={activity.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pink-600 text-white text-sm font-semibold rounded-lg hover:bg-pink-700 transition-colors"
            >
              📸
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

