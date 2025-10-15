'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/icons';

export interface UnifiedFilters {
  kidFriendly: boolean;
  petFriendly: boolean;
  free: boolean;
  indoorOnly: boolean;
  outdoorOnly: boolean;
  maxDistance?: number; // in miles
  maxCost?: number;
}

interface UnifiedFiltersComponentProps {
  onFilterChange: (filters: UnifiedFilters) => void;
  showDistanceFilter?: boolean;
}

export function UnifiedFiltersComponent({ 
  onFilterChange, 
  showDistanceFilter = false 
}: UnifiedFiltersComponentProps) {
  const [filters, setFilters] = useState<UnifiedFilters>({
    kidFriendly: false,
    petFriendly: false,
    free: false,
    indoorOnly: false,
    outdoorOnly: false,
  });

  const updateFilter = (key: keyof UnifiedFilters, value: boolean | number | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared: UnifiedFilters = {
      kidFriendly: false,
      petFriendly: false,
      free: false,
      indoorOnly: false,
      outdoorOnly: false,
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters = 
    filters.kidFriendly ||
    filters.petFriendly ||
    filters.free ||
    filters.indoorOnly ||
    filters.outdoorOnly ||
    filters.maxDistance !== undefined ||
    filters.maxCost !== undefined;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Quick Filters - Big Buttons for Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-4">
        {/* Kid Friendly */}
        <button
          onClick={() => updateFilter('kidFriendly', !filters.kidFriendly)}
          className={`p-3 md:p-4 rounded-xl text-sm md:text-base font-semibold transition-all border-2 ${
            filters.kidFriendly
              ? 'bg-green-500 text-white border-green-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
          }`}
          aria-pressed={filters.kidFriendly}
          aria-label="Filter for kid-friendly activities"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl" role="img" aria-hidden="true">{Icons.kidFriendly}</span>
            <span className="text-xs md:text-sm">Kids</span>
          </div>
        </button>

        {/* Pet Friendly */}
        <button
          onClick={() => updateFilter('petFriendly', !filters.petFriendly)}
          className={`p-3 md:p-4 rounded-xl text-sm md:text-base font-semibold transition-all border-2 ${
            filters.petFriendly
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'
          }`}
          aria-pressed={filters.petFriendly}
          aria-label="Filter for pet-friendly places"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl" role="img" aria-hidden="true">{Icons.petFriendly}</span>
            <span className="text-xs md:text-sm">Pets</span>
          </div>
        </button>

        {/* Free */}
        <button
          onClick={() => updateFilter('free', !filters.free)}
          className={`p-3 md:p-4 rounded-xl text-sm md:text-base font-semibold transition-all border-2 ${
            filters.free
              ? 'bg-green-500 text-white border-green-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
          }`}
          aria-pressed={filters.free}
          aria-label="Filter for free activities"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl" role="img" aria-hidden="true">{Icons.free}</span>
            <span className="text-xs md:text-sm">Free</span>
          </div>
        </button>

        {/* Indoor */}
        <button
          onClick={() => {
            updateFilter('indoorOnly', !filters.indoorOnly);
            if (!filters.indoorOnly) updateFilter('outdoorOnly', false);
          }}
          className={`p-3 md:p-4 rounded-xl text-sm md:text-base font-semibold transition-all border-2 ${
            filters.indoorOnly
              ? 'bg-blue-500 text-white border-blue-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
          }`}
          aria-pressed={filters.indoorOnly}
          aria-label="Filter for indoor activities only"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl" role="img" aria-hidden="true">{Icons.indoor}</span>
            <span className="text-xs md:text-sm">Indoors</span>
          </div>
        </button>

        {/* Outdoor */}
        <button
          onClick={() => {
            updateFilter('outdoorOnly', !filters.outdoorOnly);
            if (!filters.outdoorOnly) updateFilter('indoorOnly', false);
          }}
          className={`p-3 md:p-4 rounded-xl text-sm md:text-base font-semibold transition-all border-2 ${
            filters.outdoorOnly
              ? 'bg-orange-500 text-white border-orange-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
          }`}
          aria-pressed={filters.outdoorOnly}
          aria-label="Filter for outdoor activities only"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl" role="img" aria-hidden="true">{Icons.outdoor}</span>
            <span className="text-xs md:text-sm">Outdoors</span>
          </div>
        </button>

        {/* Distance - if enabled */}
        {showDistanceFilter && (
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Distance
            </label>
            <select
              value={filters.maxDistance || ''}
              onChange={(e) => updateFilter('maxDistance', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              aria-label="Maximum distance"
            >
              <option value="">Any</option>
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
            </select>
          </div>
        )}
      </div>

      {/* Cost Slider */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Max Cost: {filters.maxCost ? `$${filters.maxCost}` : 'Any'}
        </label>
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={filters.maxCost || 200}
          onChange={(e) => updateFilter('maxCost', Number(e.target.value) === 200 ? undefined : Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          aria-label="Maximum cost slider"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Free</span>
          <span>$200+</span>
        </div>
      </div>

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {Object.values(filters).filter(Boolean).length} filter{Object.values(filters).filter(Boolean).length !== 1 ? 's' : ''} active
          </p>
        </div>
      )}
    </div>
  );
}

