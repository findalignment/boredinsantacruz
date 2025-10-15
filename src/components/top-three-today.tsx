import Link from 'next/link';
import { getActivities } from '@/app/actions/getActivities';
import { getRecommendationsForDate } from '@/app/actions/getRecommendations';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { getAverageRating } from '@/app/actions/reviews';

export async function TopThreeToday() {
  const today = new Date().toISOString().split('T')[0];
  
  // Get today's weather-aware recommendations
  const recsResult = await getRecommendationsForDate(today);
  const restaurantsResult = await getRestaurants();
  
  if (!recsResult.success || !recsResult.data) {
    return null;
  }

  const { tiers } = recsResult.data;
  
  // Get top activities from perfect and excellent tiers
  const topActivities = [
    ...(tiers.perfect || []),
    ...(tiers.excellent || []),
  ].slice(0, 2);

  // Get a top restaurant
  const allRestaurants = restaurantsResult.success ? restaurantsResult.data : [];
  const topRestaurant = allRestaurants[0]; // In production, this would be curated or rated

  // Fetch ratings for all items
  const topItems = [];
  
  for (const activity of topActivities) {
    const rating = await getAverageRating('Activity', activity.id);
    topItems.push({
      type: 'activity',
      id: activity.id,
      title: activity.title,
      description: activity.notes,
      emoji: '🎯',
      link: `/activity/${activity.id}`,
      reason: activity.matchReason || 'Perfect for today\'s weather',
      rating: rating.average,
      reviewCount: rating.count,
      tags: activity.tags,
    });
  }

  if (topRestaurant) {
    const rating = await getAverageRating('Restaurant', topRestaurant.id);
    topItems.push({
      type: 'restaurant',
      id: topRestaurant.id,
      title: topRestaurant.name,
      description: topRestaurant.description,
      emoji: '🍽️',
      link: `/restaurant/${topRestaurant.id}`,
      reason: topRestaurant.bestDish ? `Must try: ${topRestaurant.bestDish}` : 'Local favorite',
      rating: rating.average,
      reviewCount: rating.count,
      tags: topRestaurant.cuisine,
    });
  }

  const top3 = topItems.slice(0, 3);

  if (top3.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-bold text-sm mb-4 shadow-lg">
            <span className="text-xl">⭐</span>
            TOP PICKS FOR TODAY
          </div>
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Staff Favorites
          </h2>
          <p className="text-lg text-gray-600">
            Our top 3 recommendations based on today's conditions
          </p>
        </div>

        {/* Top 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {top3.map((item, index) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative"
            >
              {/* Rank Badge */}
              <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                #{index + 1}
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-2 h-full p-6">
                {/* Featured Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-center rounded-lg mb-4">
                  <span className="font-bold text-xs">⭐ STAFF PICK</span>
                </div>

                {/* Emoji */}
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 text-center">
                  {item.description}
                </p>

                {/* Reason/Why Recommended */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-yellow-700 mb-1">
                    💡 WHY WE RECOMMEND
                  </p>
                  <p className="text-sm text-gray-800">
                    {item.reason}
                  </p>
                </div>

                {/* Rating */}
                {item.reviewCount > 0 && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.round(item.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.rating.toFixed(1)} ({item.reviewCount} {item.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* More Options CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Want more recommendations?
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Recommendations
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

