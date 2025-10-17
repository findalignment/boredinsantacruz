'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ActivityFilterModal } from './activity-filter-modal';
import type { RainyActivity } from '@/types';

interface RainyDayActivitiesClientProps {
  activities: RainyActivity[];
}

const STATIC_ACTIVITIES = [
  {
    title: "Santa Cruz Museum of Natural History",
    description: "Explore local wildlife, Native American history, and marine life. Perfect for families and anyone curious about the natural world.",
    cost: "$",
    time: "2-3 hours",
    link: "/activity/museum-natural-history",
    type: "museum"
  },
  {
    title: "The Catalyst",
    description: "Catch live music at this iconic venue. Check their calendar for touring bands and local favorites.",
    cost: "$$",
    time: "3-4 hours",
    link: "/events",
    type: "entertainment"
  },
  {
    title: "Verve Coffee Roasters",
    description: "Warm up with expertly crafted coffee in a cozy atmosphere. Multiple locations around Santa Cruz.",
    cost: "$",
    time: "1-2 hours",
    link: "/restaurant/verve-coffee",
    type: "food"
  },
  {
    title: "The MAH (Museum of Art & History)",
    description: "Contemporary art exhibitions, local history, and rotating installations. Free first Friday of every month.",
    cost: "$ (sometimes free)",
    time: "2-3 hours",
    link: "/activity/mah",
    type: "museum"
  },
  {
    title: "Seymour Marine Discovery Center",
    description: "Touch pools, aquariums, and the largest blue whale skeleton on display. Educational and fun for all ages.",
    cost: "$",
    time: "2 hours",
    link: "/activity/seymour-marine",
    type: "museum"
  },
  {
    title: "Bookshop Santa Cruz",
    description: "Independent bookstore with a huge selection, cozy reading nooks, and regular author events.",
    cost: "Free (to browse)",
    time: "1-2 hours",
    link: "/activity/bookshop",
    type: "shopping"
  },
  {
    title: "Pacific Edge Climbing Gym",
    description: "Indoor rock climbing and bouldering. Great for all skill levels, with instruction available.",
    cost: "$$",
    time: "2-3 hours",
    link: "/activity/pacific-edge",
    type: "fitness"
  },
  {
    title: "Santa Cruz Beach Boardwalk Arcade",
    description: "Massive indoor arcade with classic and modern games. Open year-round, rain or shine.",
    cost: "$$",
    time: "2-3 hours",
    link: "/activity/boardwalk-arcade",
    type: "entertainment"
  },
  {
    title: "Abbott Square Market",
    description: "Indoor food hall with diverse cuisines, coffee, and artisan shops.",
    cost: "$$",
    time: "1-2 hours",
    link: "/activity/abbott-square",
    type: "food"
  },
  {
    title: "Santa Cruz Yoga",
    description: "Drop-in yoga classes. Warm up with gentle flow or hot yoga on a rainy day.",
    cost: "$$",
    time: "1-2 hours",
    link: "/wellness/yoga",
    type: "fitness"
  },
  {
    title: "The Bowling Alley",
    description: "Classic bowling fun with arcade games and food. Great for groups and families.",
    cost: "$$",
    time: "2-3 hours",
    link: "/activity/bowling",
    type: "entertainment"
  },
];

export function RainyDayActivitiesClient({ activities }: RainyDayActivitiesClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    cost: [] as string[],
    time: [] as string[],
    type: [] as string[],
  });

  // Filter activities
  const filteredActivities = useMemo(() => {
    return STATIC_ACTIVITIES.filter((activity) => {
      // Cost filter
      if (filters.cost.length > 0) {
        const matchesCost = filters.cost.some((cost) => 
          activity.cost.toLowerCase().includes(cost.toLowerCase())
        );
        if (!matchesCost) return false;
      }

      // Time filter
      if (filters.time.length > 0) {
        const matchesTime = filters.time.some((time) => 
          activity.time.includes(time)
        );
        if (!matchesTime) return false;
      }

      // Type filter
      if (filters.type.length > 0) {
        if (!filters.type.includes(activity.type)) return false;
      }

      return true;
    });
  }, [filters]);

  const hasActiveFilters = 
    filters.cost.length > 0 ||
    filters.time.length > 0 ||
    filters.type.length > 0;

  return (
    <>
      {/* Filter Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {hasActiveFilters ? 'Filtered Activities' : 'Top Rainy Day Activities'}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'} found
          </p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {filters.cost.length + filters.time.length + filters.type.length}
            </span>
          )}
        </button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Active filters:</span>
          {filters.cost.map((cost) => (
            <span key={cost} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              💰 {cost}
            </span>
          ))}
          {filters.time.map((time) => (
            <span key={time} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              ⏱️ {time}
            </span>
          ))}
          {filters.type.map((type) => (
            <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {type}
            </span>
          ))}
          <button
            onClick={() => setFilters({ cost: [], time: [], type: [] })}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Activities Grid */}
      <div className="space-y-8">
        {filteredActivities.map((activity, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-gray-100 hover:border-blue-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold text-gray-900">{activity.title}</h3>
              <div className="flex flex-col items-end gap-2">
                <span className="text-lg font-semibold text-blue-600">{activity.cost}</span>
                <span className="text-sm text-gray-600">{activity.time}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{activity.description}</p>
            <Link
              href={activity.link}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No activities match your filters
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to see more options
          </p>
          <button
            onClick={() => setFilters({ cost: [], time: [], type: [] })}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Filter Modal */}
      <ActivityFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </>
  );
}

