'use client';

import { useState } from 'react';
import type { RestaurantFilters } from '@/types';

interface RestaurantFiltersProps {
  onFilterChange: (filters: RestaurantFilters) => void;
  showOpenNow?: boolean;
  openNowEnabled?: boolean;
  onOpenNowToggle?: (enabled: boolean) => void;
}

const CUISINE_OPTIONS = [
  'Mexican', 'Italian', 'American', 'Japanese', 'Chinese', 'Thai', 
  'Vietnamese', 'Indian', 'Mediterranean', 'French', 'Korean', 
  'Cafe', 'Bakery', 'Seafood', 'BBQ', 'Pizza', 'Burgers', 'Sushi'
];

const NEIGHBORHOOD_OPTIONS = [
  'Downtown', 'Westside', 'Eastside', 'Seabright', 'Beach Street',
  'Capitola', 'Aptos', 'Scotts Valley', 'Felton', 'Ben Lomond'
];

export function RestaurantFiltersComponent({ 
  onFilterChange, 
  showOpenNow = true,
  openNowEnabled = false,
  onOpenNowToggle 
}: RestaurantFiltersProps) {
  const [filters, setFilters] = useState<RestaurantFilters>({
    cuisine: [],
    priceLevel: [],
    neighborhood: [],
    dietary: [],
    features: [],
  });

  const updateFilters = (newFilters: Partial<RestaurantFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleArrayFilter = <K extends keyof RestaurantFilters>(
    key: K,
    value: RestaurantFilters[K] extends Array<infer T> ? T : never
  ) => {
    const currentArray = filters[key] as any[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilters({ [key]: newArray } as Partial<RestaurantFilters>);
  };

  const clearFilters = () => {
    const cleared: RestaurantFilters = {
      cuisine: [],
      priceLevel: [],
      neighborhood: [],
      dietary: [],
      features: [],
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters = 
    filters.cuisine.length > 0 ||
    filters.priceLevel.length > 0 ||
    filters.neighborhood.length > 0 ||
    filters.dietary.length > 0 ||
    filters.features.length > 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Filter Restaurants
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Open Now Toggle */}
      {showOpenNow && onOpenNowToggle && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={openNowEnabled}
              onChange={(e) => onOpenNowToggle(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <div>
              <span className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                🕐 Show Only Open Now
              </span>
              <p className="text-xs text-gray-600 mt-1">
                Filter restaurants by current business hours
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Cuisine Type */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Cuisine Type
        </label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleArrayFilter('cuisine', cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.cuisine.includes(cuisine)
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Price Level */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Price Level
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => toggleArrayFilter('priceLevel', level)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                filters.priceLevel.includes(level)
                  ? level === 1
                    ? 'bg-green-500 text-white shadow-md'
                    : level === 2
                    ? 'bg-orange-500 text-white shadow-md'
                    : level === 3
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {'$'.repeat(level)}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Neighborhood
        </label>
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOOD_OPTIONS.map((hood) => (
            <button
              key={hood}
              onClick={() => toggleArrayFilter('neighborhood', hood)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.neighborhood.includes(hood)
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {hood}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Options */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Dietary Options
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => toggleArrayFilter('dietary', 'vegetarian')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.dietary.includes('vegetarian')
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-green-50 border border-green-300 text-green-800 hover:bg-green-100'
            }`}
          >
            🌱 Vegetarian
          </button>
          <button
            onClick={() => toggleArrayFilter('dietary', 'vegan')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.dietary.includes('vegan')
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-green-50 border border-green-300 text-green-800 hover:bg-green-100'
            }`}
          >
            🌿 Vegan
          </button>
          <button
            onClick={() => toggleArrayFilter('dietary', 'gluten-free')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.dietary.includes('gluten-free')
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
          >
            🌾 Gluten-Free
          </button>
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Features
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => toggleArrayFilter('features', 'takeout')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.features.includes('takeout')
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-blue-50 border border-blue-300 text-blue-800 hover:bg-blue-100'
            }`}
          >
            📦 Takeout
          </button>
          <button
            onClick={() => toggleArrayFilter('features', 'delivery')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.features.includes('delivery')
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-purple-50 border border-purple-300 text-purple-800 hover:bg-purple-100'
            }`}
          >
            🚗 Delivery
          </button>
          <button
            onClick={() => toggleArrayFilter('features', 'outdoor')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.features.includes('outdoor')
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🌳 Outdoor Seating
          </button>
          <button
            onClick={() => toggleArrayFilter('features', 'reservations')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.features.includes('reservations')
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-pink-50 border border-pink-300 text-pink-800 hover:bg-pink-100'
            }`}
          >
            📅 Reservations
          </button>
        </div>
      </div>
    </div>
  );
}

