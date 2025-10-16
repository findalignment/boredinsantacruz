'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventFiltersProps {
  categories: string[];
  onViewModeChange?: (mode: 'grid' | 'list' | 'calendar' | 'map') => void;
  currentViewMode?: 'grid' | 'list' | 'calendar' | 'map';
}

export function EventFilters({ categories, onViewModeChange, currentViewMode = 'grid' }: EventFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [isFree, setIsFree] = useState(searchParams.get('isFree') === 'true');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [dateRange, setDateRange] = useState(searchParams.get('dateRange') || 'all');
  const [maxDistance, setMaxDistance] = useState(searchParams.get('distance') || 'all');

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    
    if (isFree) {
      params.set('isFree', 'true');
    }
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (dateRange !== 'all') {
      params.set('dateRange', dateRange);
    }

    if (maxDistance !== 'all') {
      params.set('distance', maxDistance);
    }

    router.push(`/events${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setIsFree(false);
    setSearchQuery('');
    setDateRange('all');
    setMaxDistance('all');
    router.push('/events');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* View Mode Switcher */}
      {onViewModeChange && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900">Filter & View</h3>
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-300">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentViewMode === 'grid'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentViewMode === 'list'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange('calendar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentViewMode === 'calendar'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Calendar View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentViewMode === 'map'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Map View"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        {/* Date Range */}
        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
            When
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="all">Any Time</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
            <option value="this-weekend">This Weekend</option>
            <option value="next-week">Next Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>

        {/* Distance */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
            Distance
          </label>
          <select
            id="distance"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="all">Any Distance</option>
            <option value="5">Within 5 miles</option>
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50">Within 50 miles</option>
          </select>
        </div>
      </div>

      {/* Checkboxes Row */}
      <div className="flex flex-wrap gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm font-medium text-gray-700">Free Events Only</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

