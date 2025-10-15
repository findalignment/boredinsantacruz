'use client';

import { useState, useMemo } from 'react';
import { RainyActivity, Activity } from '@/types';
import { ActivityCard } from './activity-card';
import { ActivityFilters } from './activity-filters';

interface FilterState {
  tags: string[];
  costRange: string[];
  durations: string[];
  indoorOnly: boolean;
}

interface FilteredActivitiesProps {
  activities: (RainyActivity | Activity)[];
}

export function FilteredActivities({ activities }: FilteredActivitiesProps) {
  const [filters, setFilters] = useState<FilterState>({
    tags: [],
    costRange: [],
    durations: [],
    indoorOnly: false,
  });

  // Extract unique tags and durations from activities
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    activities.forEach(activity => {
      activity.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [activities]);

  const allDurations = useMemo(() => {
    const durationSet = new Set<string>();
    activities.forEach(activity => {
      if (activity.duration) {
        durationSet.add(activity.duration);
      }
    });
    return Array.from(durationSet).sort();
  }, [activities]);

  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Indoor filter
      if (filters.indoorOnly) {
        // Check if activity has indoor tag or venue is indoor
        const hasIndoorTag = activity.tags?.some(tag => 
          tag.toLowerCase().includes('indoor')
        );
        // For now, we'll just use the tag - you can extend this to check venue.indoor
        if (!hasIndoorTag) return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag =>
          activity.tags?.includes(filterTag)
        );
        if (!hasMatchingTag) return false;
      }

      // Cost range filter
      if (filters.costRange.length > 0) {
        const activityCost = activity.cost || 0;
        const matchesCost = filters.costRange.some(range => {
          switch (range) {
            case 'free':
              return activityCost === 0;
            case 'low':
              return activityCost > 0 && activityCost <= 10;
            case 'medium':
              return activityCost > 10 && activityCost <= 25;
            case 'high':
              return activityCost > 25;
            default:
              return false;
          }
        });
        if (!matchesCost) return false;
      }

      // Duration filter
      if (filters.durations.length > 0) {
        if (!activity.duration || !filters.durations.includes(activity.duration)) {
          return false;
        }
      }

      return true;
    });
  }, [activities, filters]);

  return (
    <>
      <ActivityFilters
        allTags={allTags}
        allDurations={allDurations}
        filters={filters}
        onFilterChange={setFilters}
        resultCount={filteredActivities.length}
        totalCount={activities.length}
      />

      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No activities found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to see more results
          </p>
          <button
            onClick={() => setFilters({
              tags: [],
              costRange: [],
              durations: [],
              indoorOnly: false,
            })}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </>
  );
}

