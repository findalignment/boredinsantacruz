'use client';

import { useState, useMemo } from 'react';
import type { Restaurant, RestaurantFilters } from '@/types';
import { RestaurantFiltersComponent } from './restaurant-filters';
import { RestaurantCard } from './restaurant-card';
import { isRestaurantOpen } from '@/lib/restaurants/hours';

interface FilteredRestaurantsProps {
  initialRestaurants: Restaurant[];
}

export function FilteredRestaurants({ initialRestaurants }: FilteredRestaurantsProps) {
  const [filters, setFilters] = useState<RestaurantFilters>({
    cuisine: [],
    priceLevel: [],
    neighborhood: [],
    dietary: [],
    features: [],
  });
  const [openNowEnabled, setOpenNowEnabled] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return initialRestaurants.filter((restaurant) => {
      // Cuisine filter
      if (filters.cuisine.length > 0) {
        const hasMatchingCuisine = filters.cuisine.some((c) =>
          restaurant.cuisine.some((rc) => rc.toLowerCase().includes(c.toLowerCase()))
        );
        if (!hasMatchingCuisine) return false;
      }

      // Price level filter
      if (filters.priceLevel.length > 0) {
        if (!filters.priceLevel.includes(restaurant.priceLevel)) return false;
      }

      // Neighborhood filter
      if (filters.neighborhood.length > 0) {
        if (!filters.neighborhood.includes(restaurant.neighborhood)) return false;
      }

      // Dietary filters
      if (filters.dietary.length > 0) {
        if (filters.dietary.includes('vegetarian') && !restaurant.vegetarianFriendly) return false;
        if (filters.dietary.includes('vegan') && !restaurant.veganOptions) return false;
        if (filters.dietary.includes('gluten-free') && !restaurant.glutenFree) return false;
      }

      // Features filters
      if (filters.features.length > 0) {
        if (filters.features.includes('takeout') && !restaurant.takeout) return false;
        if (filters.features.includes('delivery') && !restaurant.delivery) return false;
        if (filters.features.includes('outdoor') && !restaurant.outdoor) return false;
        if (filters.features.includes('reservations') && !restaurant.reservations) return false;
      }

      // Open Now filter
      if (openNowEnabled) {
        if (!isRestaurantOpen(restaurant.hours)) return false;
      }

      return true;
    });
  }, [initialRestaurants, filters, openNowEnabled]);

  const hasActiveFilters =
    filters.cuisine.length > 0 ||
    filters.priceLevel.length > 0 ||
    filters.neighborhood.length > 0 ||
    filters.dietary.length > 0 ||
    filters.features.length > 0 ||
    openNowEnabled;

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {hasActiveFilters ? 'Filtered Results' : 'All Restaurants'}
        </h2>
        <p className="text-gray-600">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <RestaurantFiltersComponent
          onFilterChange={setFilters}
          showOpenNow={true}
          openNowEnabled={openNowEnabled}
          onOpenNowToggle={setOpenNowEnabled}
        />
      </div>

      {/* Results */}
      {filteredRestaurants.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-gray-200/50">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to see more results
          </p>
          <button
            onClick={() => {
              setFilters({
                cuisine: [],
                priceLevel: [],
                neighborhood: [],
                dietary: [],
                features: [],
              });
              setOpenNowEnabled(false);
            }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              showOpenStatus={openNowEnabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

