'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WellnessActivity } from '@/app/actions/getWellness';

interface WellnessFiltersProps {
  activities: WellnessActivity[];
}

const categories = [
  { name: 'All', emoji: '🌟', slug: 'all' },
  { name: 'Gyms', emoji: '💪', slug: 'gym' },
  { name: 'Yoga', emoji: '🧘', slug: 'yoga' },
  { name: 'Spas', emoji: '💆', slug: 'spa' },
  { name: 'Massage', emoji: '💆‍♂️', slug: 'massage' },
  { name: 'Pilates', emoji: '🤸', slug: 'pilates' },
  { name: 'Meditation', emoji: '🧘‍♀️', slug: 'meditation' },
];

export function WellnessFilters({ activities }: WellnessFiltersProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredActivities = activities.filter((activity) => {
    if (activeCategory === 'all') return true;
    
    const wellnessTypes = activity.wellnessType || [];
    const searchText = [
      activity.name || '',
      activity.category || '',
      ...wellnessTypes,
    ].join(' ').toLowerCase();

    return searchText.includes(activeCategory);
  });

  return (
    <>
      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-xl shadow-sm border-2 p-6 hover:shadow-lg transition-all text-center ${
                  isActive
                    ? 'bg-green-500 border-green-600 text-white'
                    : 'bg-white border-gray-200 hover:border-green-500'
                }`}
              >
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {cat.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Showing <strong>{filteredActivities.length}</strong> {activeCategory === 'all' ? 'wellness facilities' : `${activeCategory} facilities`}
        </p>
      </div>

      {/* Featured Wellness Centers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {activeCategory === 'all' ? '⭐ Featured Wellness Centers' : `${categories.find(c => c.slug === activeCategory)?.emoji} ${categories.find(c => c.slug === activeCategory)?.name}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/wellness/${activity.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] block"
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  {activity.photoUrl ? (
                    <img src={activity.photoUrl} alt={activity.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">
                      {activity.wellnessType?.includes('Yoga') ? '🧘' :
                       activity.wellnessType?.includes('Gym') ? '💪' :
                       activity.wellnessType?.includes('Spa') || activity.wellnessType?.includes('Massage') ? '💆' :
                       '🏃'}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {activity.name}
                    </h3>
                    {activity.priceRange && (
                      <span className="text-green-600 font-semibold ml-2">{activity.priceRange}</span>
                    )}
                  </div>
                  {activity.wellnessType && activity.wellnessType.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {activity.wellnessType.map((type) => (
                        <span key={type} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                  {activity.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                  {activity.address && (
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {activity.address.split(',')[0]}
                    </p>
                  )}
                  {activity.phone && (
                    <p className="text-sm text-gray-500 mb-2">
                      📞 {activity.phone}
                    </p>
                  )}
                  {activity.website && (
                    <span className="text-sm text-green-600 hover:text-green-700 font-medium">
                      Visit Website →
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow-sm border-2 border-gray-200 p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No {activeCategory} facilities found
              </h3>
              <p className="text-gray-600 mb-4">
                Try selecting a different category or check back later.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                View All Facilities
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

