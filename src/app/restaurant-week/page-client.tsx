'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Restaurant {
  id: string;
  name: string;
  cuisine?: string[];
  neighborhood?: string;
  address?: string;
}

interface RestaurantWeekClientProps {
  initialRestaurants: Restaurant[];
}

// Participating restaurants list
const PARTICIPATING_RESTAURANTS = {
  capitola: [
    'Margaritaville Capitola',
    "Pete's Capitola",
    'Mobo Sushi',
    'Avanti Restaurant',
    'Gabriella Cafe',
  ],
  santaCruz: [
    "Zelda's on the Beach",
    'Venus Spirits',
    'Sugo Italian Restaurant',
    'La Posta Italian Cuisine',
    "Jack O'Neill Restaurant",
    'Hook+Line',
    'Chocolate Santa Cruz',
    'Chaminade Resort & Spa',
    'Crow\'s Nest',
    'Oswald',
    'Soif Wine Bar',
    'Penny Ice Creamery',
    'Aquarius',
    'Bantam',
    'Sanderlings',
    'The Picnic Basket',
    'Vinocruz',
    'Laili Restaurant',
  ],
  aptos: [
    'Bittersweet Bistro',
  ],
  scottsValley: [
    'Scopazzi\'s',
    'Hilltop Bistro',
  ],
  soquel: [
    'Manuel\'s Mexican Restaurant',
    'Clouds Downtown',
  ],
};

const LOCATIONS = ['all', 'capitola', 'santaCruz', 'aptos', 'scottsValley', 'soquel'];
const LOCATION_LABELS: Record<string, string> = {
  all: 'All Locations',
  capitola: 'Capitola',
  santaCruz: 'Santa Cruz',
  aptos: 'Aptos',
  scottsValley: 'Scotts Valley',
  soquel: 'Soquel',
};

export function RestaurantWeekClient({ initialRestaurants }: RestaurantWeekClientProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Match participating restaurants with database
  const matchRestaurant = (name: string) => {
    return initialRestaurants.find(r => {
      const nameLower = r.name.toLowerCase();
      const searchLower = name.toLowerCase();
      return nameLower.includes(searchLower.split(' ')[0]) || 
             searchLower.includes(nameLower.split(' ')[0]);
    });
  };

  // Get all participating restaurants with location info
  const allParticipating = Object.entries(PARTICIPATING_RESTAURANTS).flatMap(([location, names]) =>
    names.map(name => ({
      name,
      location,
      restaurant: matchRestaurant(name),
    }))
  );

  // Extract unique cuisines
  const allCuisines = Array.from(new Set(
    allParticipating
      .filter(p => p.restaurant?.cuisine)
      .flatMap(p => p.restaurant!.cuisine!)
  )).sort();

  // Filter restaurants
  const filteredRestaurants = allParticipating.filter(item => {
    if (selectedLocation !== 'all' && item.location !== selectedLocation) {
      return false;
    }
    if (selectedCuisine !== 'all' && item.restaurant) {
      if (!item.restaurant.cuisine?.includes(selectedCuisine)) {
        return false;
      }
    }
    return true;
  });

  // Group by location
  const groupedByLocation = LOCATIONS.filter(loc => loc !== 'all').reduce((acc, location) => {
    acc[location] = filteredRestaurants.filter(r => r.location === location);
    return acc;
  }, {} as Record<string, typeof filteredRestaurants>);

  return (
    <>
      {/* Collapsible Filters */}
      <div className="mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-orange-200 hover:bg-orange-50 transition-colors w-full sm:w-auto"
        >
          <span className="font-semibold text-gray-900">🔍 Filter Restaurants</span>
          <ChevronDownIcon className={`w-5 h-5 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {showFilters && (
          <div className="mt-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>
                      {LOCATION_LABELS[loc]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🍽️ Cuisine Type
                </label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Cuisines</option>
                  {allCuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedLocation !== 'all' || selectedCuisine !== 'all') && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedLocation !== 'all' && (
                  <button
                    onClick={() => setSelectedLocation('all')}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1 hover:bg-orange-200"
                  >
                    {LOCATION_LABELS[selectedLocation]}
                    <span>×</span>
                  </button>
                )}
                {selectedCuisine !== 'all' && (
                  <button
                    onClick={() => setSelectedCuisine('all')}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1 hover:bg-orange-200"
                  >
                    {selectedCuisine}
                    <span>×</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedCuisine('all');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing <strong>{filteredRestaurants.length}</strong> of{' '}
              <strong>{allParticipating.length}</strong> participating restaurants
            </div>
          </div>
        )}
      </div>

      {/* Restaurant Cards by Location */}
      {Object.entries(groupedByLocation).map(([location, restaurants]) => {
        if (restaurants.length === 0) return null;

        const emoji = location === 'capitola' || location === 'santaCruz' ? '🌊' :
                      location === 'aptos' ? '🌳' :
                      location === 'scottsValley' ? '🏔️' : '🌲';

        return (
          <div key={location} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">{emoji}</span>
              {LOCATION_LABELS[location]} ({restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map(({ name, restaurant }) => (
                <RestaurantCard
                  key={name}
                  name={name}
                  restaurant={restaurant}
                  emoji={emoji}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more options
          </p>
          <button
            onClick={() => {
              setSelectedLocation('all');
              setSelectedCuisine('all');
            }}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}

function RestaurantCard({ name, restaurant, emoji }: { name: string; restaurant?: Restaurant; emoji: string }) {
  if (restaurant) {
    return (
      <Link
        href={`/restaurant/${restaurant.id}`}
        className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-orange-200 overflow-hidden hover:scale-[1.02] group"
      >
        <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <span className="text-5xl">🍽️</span>
        </div>
        
        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{name}</h4>
          {restaurant.cuisine && (
            <p className="text-sm text-orange-600 mb-3 font-medium">
              {restaurant.cuisine.join(', ')}
            </p>
          )}
          {restaurant.address && (
            <p className="text-sm text-gray-600 mb-4">
              📍 {restaurant.neighborhood || restaurant.address.split(',')[0]}
            </p>
          )}
          <span className="block w-full py-2 bg-orange-600 text-white text-center font-semibold rounded-lg group-hover:bg-orange-700 transition-colors pointer-events-none">
            View Details →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-orange-200 overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
        <span className="text-5xl">🍽️</span>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
        <p className="text-sm text-gray-600 mb-4">Coming soon to our directory</p>
        <a
          href="https://santacruzrestaurantweek.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}

