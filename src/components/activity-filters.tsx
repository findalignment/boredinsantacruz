'use client';

import { useState, useEffect } from 'react';

interface FilterState {
  tags: string[];
  costRange: string[];
  durations: string[];
  indoorOnly: boolean;
}

interface ActivityFiltersProps {
  allTags: string[];
  allDurations: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

export function ActivityFilters({
  allTags,
  allDurations,
  filters,
  onFilterChange,
  resultCount,
  totalCount,
}: ActivityFiltersProps) {
  const costOptions = [
    { value: 'free', label: 'Free', max: 0 },
    { value: 'low', label: '$', max: 10 },
    { value: 'medium', label: '$$', max: 25 },
    { value: 'high', label: '$$$', max: Infinity },
  ];

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const toggleCost = (costValue: string) => {
    const newCosts = filters.costRange.includes(costValue)
      ? filters.costRange.filter(c => c !== costValue)
      : [...filters.costRange, costValue];
    onFilterChange({ ...filters, costRange: newCosts });
  };

  const toggleDuration = (duration: string) => {
    const newDurations = filters.durations.includes(duration)
      ? filters.durations.filter(d => d !== duration)
      : [...filters.durations, duration];
    onFilterChange({ ...filters, durations: newDurations });
  };

  const toggleIndoor = () => {
    onFilterChange({ ...filters, indoorOnly: !filters.indoorOnly });
  };

  const clearFilters = () => {
    onFilterChange({
      tags: [],
      costRange: [],
      durations: [],
      indoorOnly: false,
    });
  };

  const hasActiveFilters = 
    filters.tags.length > 0 || 
    filters.costRange.length > 0 || 
    filters.durations.length > 0 || 
    filters.indoorOnly;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Filter Activities</h2>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold text-blue-600">{resultCount}</span> of {totalCount} activities
            {hasActiveFilters && ' match your filters'}
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Indoor Only Toggle */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <button
            onClick={toggleIndoor}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              filters.indoorOnly ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                filters.indoorOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-900">
            Indoor Activities Only
          </span>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Cost Range Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {costOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleCost(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.costRange.includes(option.value)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        {allDurations.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Duration</h3>
            <div className="flex flex-wrap gap-2">
              {allDurations.map(duration => (
                <button
                  key={duration}
                  onClick={() => toggleDuration(duration)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filters.durations.includes(duration)
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

