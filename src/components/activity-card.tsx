import { RainyActivity } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ActivityCardProps {
  activity: RainyActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const costDisplay = activity.cost === 0 ? 'Free' : `$${activity.cost}`;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {activity.imageUrl ? (
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
          <span className="text-4xl">🌧️</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
        
        {activity.venueName && (
          <p className="text-sm text-gray-600 mb-3">📍 {activity.venueName}</p>
        )}

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {activity.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Cost and Duration */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <span className="font-semibold">💲</span>
            <span>{costDisplay}</span>
          </span>
          {activity.duration && (
            <span className="flex items-center gap-1">
              <span className="font-semibold">⏱️</span>
              <span>{activity.duration}</span>
            </span>
          )}
        </div>

        {/* Notes */}
        {activity.notes && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {activity.notes}
          </p>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t border-gray-200">
          {activity.website && (
            <Link
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              🌐 Website
            </Link>
          )}
          {activity.instagram && (
            <Link
              href={activity.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              📸 Instagram
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

