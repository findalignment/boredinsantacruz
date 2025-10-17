'use client';

import { useState, useMemo } from 'react';
import { ActivityCard } from '@/components/activity-card';
import type { Activity, RainyActivity } from '@/types';

interface SunnyActivitiesClientProps {
  activities: (Activity | RainyActivity)[];
}

export function SunnyActivitiesClient({ activities }: SunnyActivitiesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories with counts
  const categories = useMemo(() => {
    const cats = [
      { name: 'All', slug: 'all', emoji: '☀️', count: activities.length },
      { name: 'Beaches', slug: 'Beach', emoji: '🏖️', count: activities.filter(a => ('category' in a ? a.category : '') === 'Beach').length },
      { name: 'Hiking', slug: 'Hiking', emoji: '🥾', count: activities.filter(a => ('category' in a ? a.category : '') === 'Hiking').length },
      { name: 'Parks', slug: 'Park', emoji: '🌳', count: activities.filter(a => ('category' in a ? a.category : '') === 'Park').length },
      { name: 'Water Activities', slug: 'Water Activity', emoji: '🌊', count: activities.filter(a => ('category' in a ? a.category : '') === 'Water Activity').length },
    ];
    return cats.filter(cat => cat.count > 0);
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') {
      return activities;
    }
    return activities.filter(activity => ('category' in activity ? activity.category : '') === selectedCategory);
  }, [activities, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => {
          const isActive = selectedCategory === category.slug;
          return (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:shadow-md'
              }`}
            >
              {category.emoji} {category.name} ({category.count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="text-center text-gray-600">
        Showing <strong>{filteredActivities.length}</strong> {filteredActivities.length === 1 ? 'activity' : 'activities'}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={{
              id: activity.id,
              title: 'name' in activity ? activity.name : activity.title,
              venue: {} as any,
              venueName: ('neighborhood' in activity ? activity.neighborhood : ('venueName' in activity ? activity.venueName : undefined)) || 'Santa Cruz',
              tags: activity.tags,
              cost: activity.cost,
              duration: activity.duration,
              notes: 'description' in activity ? activity.description : activity.notes,
              website: activity.website || null,
              instagram: activity.instagram || null,
              imageUrl: ('photoUrl' in activity ? activity.photoUrl : activity.imageUrl) || null,
              address: activity.address,
              hours: activity.hours,
              parking: ('parkingInfo' in activity ? activity.parkingInfo : ('parking' in activity ? activity.parking : undefined)),
              tips: activity.tips,
              phone: activity.phone,
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No activities in this category
          </h3>
          <p className="text-gray-600 mb-6">
            Try selecting a different category
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Show All Activities
          </button>
        </div>
      )}
    </div>
  );
}

