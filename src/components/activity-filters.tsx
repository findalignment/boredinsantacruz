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
  const [showFilterModal, setShowFilterModal] = useState(false);

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
    filters.durations.length > 0;

  const activeFilterCount = 
    filters.tags.length + 
    filters.costRange.length + 
    filters.durations.length;

  return (
    <>
      {/* Compact Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-wrap items-center gap-4">
        {/* Indoor Only Toggle - Always Visible */}
        <div className="flex items-center gap-3">
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
            Indoor Only
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear filters
          </button>
        )}

        {/* Results Count */}
        <div className="ml-auto text-sm text-gray-600">
          <span className="font-semibold text-blue-600">{resultCount}</span> of {totalCount} activities
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowFilterModal(false)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Filter Activities</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

