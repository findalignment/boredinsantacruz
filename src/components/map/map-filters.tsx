'use client';

import { useState } from 'react';

export interface MapFilters {
  categories: string[];
  indoorOutdoor: 'all' | 'indoor' | 'outdoor';
  priceRange: 'all' | 'free' | 'low' | 'medium' | 'high';
  kidFriendly: boolean;
  searchQuery: string;
}

interface MapFiltersProps {
  onFiltersChange: (filters: MapFilters) => void;
  activityCount: number;
  filteredCount: number;
}

export function MapFiltersComponent({ onFiltersChange, activityCount, filteredCount }: MapFiltersProps) {
  const [filters, setFilters] = useState<MapFilters>({
    categories: [],
    indoorOutdoor: 'all',
    priceRange: 'all',
    kidFriendly: false,
    searchQuery: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (newFilters: Partial<MapFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    const cleared: MapFilters = {
      categories: [],
      indoorOutdoor: 'all',
      priceRange: 'all',
      kidFriendly: false,
      searchQuery: '',
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.indoorOutdoor !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.kidFriendly ||
    filters.searchQuery.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            🔍 Filter Activities
          </h3>
          <p className="text-sm text-gray-600">
            Showing {filteredCount} of {activityCount} locations
          </p>
        </div>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {isExpanded ? '▼ Less' : '▶ More Filters'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => updateFilters({ kidFriendly: !filters.kidFriendly })}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            filters.kidFriendly
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👶 Kid-Friendly
        </button>
        
        <button
          onClick={() => updateFilters({ priceRange: filters.priceRange === 'free' ? 'all' : 'free' })}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            filters.priceRange === 'free'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💰 Free
        </button>

        <button
          onClick={() => updateFilters({ indoorOutdoor: filters.indoorOutdoor === 'indoor' ? 'all' : 'indoor' })}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            filters.indoorOutdoor === 'indoor'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🏠 Indoor
        </button>

        <button
          onClick={() => updateFilters({ indoorOutdoor: filters.indoorOutdoor === 'outdoor' ? 'all' : 'outdoor' })}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            filters.indoorOutdoor === 'outdoor'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌳 Outdoor
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Category Filters */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { name: '🏖️ Beach', value: 'beach' },
                { name: '🥾 Hiking', value: 'hiking' },
                { name: '🍽️ Food', value: 'food' },
                { name: '🏛️ Museum', value: 'museum' },
                { name: '🎨 Arts', value: 'arts' },
                { name: '🛍️ Shopping', value: 'shopping' },
                { name: '🎭 Entertainment', value: 'entertainment' },
                { name: '🌊 Water Activities', value: 'water' },
                { name: '💪 Fitness', value: 'fitness' },
                { name: '🍷 Wine/Beer', value: 'drinks' },
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => toggleCategory(category.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.categories.includes(category.value)
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex gap-2">
              {[
                { name: 'All', value: 'all' },
                { name: 'Free', value: 'free' },
                { name: '$', value: 'low' },
                { name: '$$', value: 'medium' },
                { name: '$$$+', value: 'high' },
              ].map((price) => (
                <button
                  key={price.value}
                  onClick={() => updateFilters({ priceRange: price.value as MapFilters['priceRange'] })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.priceRange === price.value
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {price.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

