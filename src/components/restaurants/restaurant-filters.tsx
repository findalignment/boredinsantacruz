'use client';

import { useState, Fragment } from 'react';
import type { RestaurantFilters } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface RestaurantFiltersProps {
  onFilterChange: (filters: RestaurantFilters) => void;
  showOpenNow?: boolean;
  openNowEnabled?: boolean;
  onOpenNowToggle?: (enabled: boolean) => void;
}

// Icon-based cuisine categories
const CUISINE_CATEGORIES = [
  { name: 'All', emoji: '🍽️', slug: 'all' },
  { name: 'Mexican', emoji: '🌮', slug: 'Mexican' },
  { name: 'Italian', emoji: '🍝', slug: 'Italian' },
  { name: 'Asian', emoji: '🍜', slug: 'Asian' },
  { name: 'American', emoji: '🍔', slug: 'American' },
  { name: 'Seafood', emoji: '🦞', slug: 'Seafood' },
  { name: 'Pizza', emoji: '🍕', slug: 'Pizza' },
  { name: 'Coffee', emoji: '☕', slug: 'Coffee' },
];

// More cuisine options for modal
const ALL_CUISINE_OPTIONS = [
  'Mexican', 'Italian', 'American', 'Japanese', 'Chinese', 'Thai', 
  'Vietnamese', 'Indian', 'Mediterranean', 'French', 'Korean', 
  'Coffee', 'Bakery', 'Seafood', 'BBQ', 'Pizza', 'Burgers', 'Sushi'
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
  const [activeCuisine, setActiveCuisine] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<RestaurantFilters>({
    cuisine: [],
    priceLevel: [],
    neighborhood: [],
    dietary: [],
    features: [],
  });

  const handleCuisineClick = (cuisine: string) => {
    setActiveCuisine(cuisine);
    if (cuisine === 'all') {
      const updated = { ...filters, cuisine: [] };
      setFilters(updated);
      onFilterChange(updated);
    } else {
      // Handle "Asian" as umbrella category
      const cuisineFilters = cuisine === 'Asian' 
        ? ['Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Korean', 'Asian']
        : [cuisine];
      const updated = { ...filters, cuisine: cuisineFilters };
      setFilters(updated);
      onFilterChange(updated);
    }
  };

  const toggleArrayFilter = <K extends keyof RestaurantFilters>(
    key: K,
    value: RestaurantFilters[K] extends Array<infer T> ? T : never
  ) => {
    const currentArray = filters[key] as any[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    const updated = { ...filters, [key]: newArray };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearAdvancedFilters = () => {
    const cleared: RestaurantFilters = {
      cuisine: filters.cuisine, // Keep cuisine filter
      priceLevel: [],
      neighborhood: [],
      dietary: [],
      features: [],
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const clearAllFilters = () => {
    setActiveCuisine('all');
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

  const hasAdvancedFilters = 
    filters.priceLevel.length > 0 ||
    filters.neighborhood.length > 0 ||
    filters.dietary.length > 0 ||
    filters.features.length > 0;

  return (
    <>
      {/* Icon-Based Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Cuisine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CUISINE_CATEGORIES.map((cat) => {
            const isActive = activeCuisine === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCuisineClick(cat.slug)}
                className={`rounded-xl shadow-sm border-2 p-4 hover:shadow-lg transition-all text-center ${
                  isActive
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 border-orange-600 text-white'
                    : 'bg-white border-gray-200 hover:border-orange-500'
                }`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {cat.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Open Now + More Filters Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Open Now Toggle */}
        {showOpenNow && onOpenNowToggle && (
          <label className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 cursor-pointer hover:border-green-300 transition-all">
            <input
              type="checkbox"
              checked={openNowEnabled}
              onChange={(e) => onOpenNowToggle(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="font-semibold text-gray-900">
              🕐 Open Now
            </span>
            <span className="text-xs text-gray-500">(with hours data)</span>
          </label>
        )}

        {/* More Filters Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all font-semibold text-gray-900 flex items-center gap-2"
        >
          <span className="text-lg">🔍</span>
          More Filters
          {hasAdvancedFilters && (
            <span className="ml-1 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
              {[
                filters.priceLevel.length,
                filters.neighborhood.length,
                filters.dietary.length,
                filters.features.length
              ].filter(n => n > 0).length}
            </span>
          )}
        </button>

        {/* Clear All */}
        {(activeCuisine !== 'all' || hasAdvancedFilters || openNowEnabled) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      Advanced Filters
                    </Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                    {/* Price Level */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Price Level
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((level) => (
                          <button
                            key={level}
                            onClick={() => toggleArrayFilter('priceLevel', level)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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
                    <div>
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
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Dietary Options
                      </label>
                      <div className="flex flex-wrap gap-2">
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

                  {/* Modal Footer */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={clearAdvancedFilters}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Clear Advanced Filters
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
                    >
                      Apply Filters
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

