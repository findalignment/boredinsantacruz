import { RainyActivity, ScoredActivity } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ActivityCardProps {
  activity: RainyActivity | ScoredActivity;
  showRecommendationReason?: boolean;
  rating?: { average: number; count: number };
  isFeatured?: boolean;
  isSponsored?: boolean;
}

export function ActivityCard({ 
  activity, 
  showRecommendationReason = false,
  rating,
  isFeatured = false,
  isSponsored = false,
}: ActivityCardProps) {
  const costDisplay = activity.cost === 0 ? 'Free' : `$${activity.cost}`;
  const scoredActivity = activity as ScoredActivity;
  const hasWeatherScore = 'weatherScore' in activity;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-cyan-300 hover:-translate-y-1">
      {/* Featured/Sponsored Banner */}
      {(isFeatured || isSponsored) && (
        <div className={`${
          isSponsored 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
            : 'bg-gradient-to-r from-orange-500 to-red-500'
        } text-white px-4 py-2 text-center`}>
          <span className="font-bold text-xs">
            {isSponsored ? '⭐ FEATURED LOCAL SPOTLIGHT' : '⭐ STAFF PICK'}
          </span>
        </div>
      )}

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
        <div className="h-48 w-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
          <span className="text-5xl">
            {activity.indoorOutdoor === 'Indoor' ? '🏛️' : 
             activity.indoorOutdoor === 'Outdoor' ? '🌲' : '🌧️'}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
          {activity.title}
        </h3>
        
        {activity.venueName && (
          <p className="text-sm text-blue-600 mb-3 flex items-center gap-1">
            📍 {activity.venueName}
          </p>
        )}

        {/* Rating */}
        {rating && rating.count > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.round(rating.average) ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating.average.toFixed(1)} ({rating.count} {rating.count === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}

        {/* Recommendation Reason */}
        {showRecommendationReason && hasWeatherScore && scoredActivity.matchReason && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-3">
            <p className="text-xs font-semibold text-green-700 mb-1">
              ✓ WHY RECOMMENDED
            </p>
            <p className="text-sm text-gray-800">
              {scoredActivity.matchReason}
            </p>
          </div>
        )}

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {activity.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200"
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
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <Link
            href={`/activity/${activity.id}`}
            className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm"
          >
            View Details
          </Link>
          {activity.website && (
            <a
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors border border-gray-300"
            >
              🌐
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
