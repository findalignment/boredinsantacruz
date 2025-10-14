'use server';

import { tables } from '@/lib/airtable';
import type { Restaurant } from '@/types';
import { unstable_cache } from 'next/cache';

// Helper to transform Airtable record to Restaurant type
function transformRestaurant(record: any): Restaurant {
  const fields = record.fields;
  
  return {
    id: record.id,
    name: fields.Name || '',
    cuisine: fields.Cuisine || [],
    priceLevel: fields.PriceLevel || 2,
    neighborhood: fields.Neighborhood || 'Other',
    
    // Contact & Location
    address: fields.Address || '',
    phone: fields.Phone || undefined,
    website: fields.Website || undefined,
    instagram: fields.Instagram || undefined,
    
    // Details
    description: fields.Description || '',
    hours: fields.Hours || undefined,
    parking: fields.Parking || undefined,
    
    // Features
    dineIn: fields.DineIn ?? true,
    takeout: fields.Takeout ?? false,
    delivery: fields.Delivery ?? false,
    outdoor: fields.Outdoor ?? false,
    reservations: fields.Reservations ?? false,
    
    // Insider Knowledge
    bestDish: fields.BestDish || undefined,
    bestTime: fields.BestTime || undefined,
    tips: fields.Tips || undefined,
    
    // Dietary
    vegetarianFriendly: fields.VegetarianFriendly ?? false,
    veganOptions: fields.VeganOptions ?? false,
    glutenFree: fields.GlutenFree ?? false,
    
    // Images
    image: fields.Image || undefined,
  };
}

// Fetch all restaurants with caching
export const getRestaurants = unstable_cache(
  async () => {
    try {
      // Check if restaurants table exists
      if (!tables.restaurants) {
        console.log('[Restaurants] Table not configured yet');
        return {
          success: false,
          data: [],
          error: 'Restaurants table not configured. See RESTAURANT_SETUP.md',
        };
      }

      const records = await tables.restaurants
        .select({
          view: 'Grid view',
          sort: [{ field: 'Name', direction: 'asc' }],
        })
        .all();

      const restaurants: Restaurant[] = records.map(transformRestaurant);
      
      console.log(`[Restaurants] Fetched ${restaurants.length} restaurants`);
      
      return {
        success: true,
        data: restaurants,
      };
    } catch (error) {
      console.error('[Restaurants] Error fetching restaurants:', error);
      
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to load restaurants',
      };
    }
  },
  ['restaurants'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['restaurants'],
  }
);

// Get restaurants with filters
export async function getFilteredRestaurants(filters: {
  cuisine?: string[];
  priceLevel?: number[];
  neighborhood?: string[];
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
  features?: ('takeout' | 'delivery' | 'outdoor' | 'reservations')[];
}) {
  const result = await getRestaurants();
  
  if (!result.success) return result;
  
  let filtered = result.data;
  
  // Filter by cuisine
  if (filters.cuisine && filters.cuisine.length > 0) {
    filtered = filtered.filter(restaurant =>
      filters.cuisine!.some(cuisine => restaurant.cuisine.includes(cuisine))
    );
  }
  
  // Filter by price level
  if (filters.priceLevel && filters.priceLevel.length > 0) {
    filtered = filtered.filter(restaurant =>
      filters.priceLevel!.includes(restaurant.priceLevel)
    );
  }
  
  // Filter by neighborhood
  if (filters.neighborhood && filters.neighborhood.length > 0) {
    filtered = filtered.filter(restaurant =>
      filters.neighborhood!.includes(restaurant.neighborhood)
    );
  }
  
  // Filter by dietary options
  if (filters.dietary && filters.dietary.length > 0) {
    filtered = filtered.filter(restaurant => {
      if (filters.dietary!.includes('vegetarian') && !restaurant.vegetarianFriendly) {
        return false;
      }
      if (filters.dietary!.includes('vegan') && !restaurant.veganOptions) {
        return false;
      }
      if (filters.dietary!.includes('gluten-free') && !restaurant.glutenFree) {
        return false;
      }
      return true;
    });
  }
  
  // Filter by features
  if (filters.features && filters.features.length > 0) {
    filtered = filtered.filter(restaurant => {
      if (filters.features!.includes('takeout') && !restaurant.takeout) {
        return false;
      }
      if (filters.features!.includes('delivery') && !restaurant.delivery) {
        return false;
      }
      if (filters.features!.includes('outdoor') && !restaurant.outdoor) {
        return false;
      }
      if (filters.features!.includes('reservations') && !restaurant.reservations) {
        return false;
      }
      return true;
    });
  }
  
  return {
    success: true,
    data: filtered,
  };
}

// Get restaurants for search (simplified)
export async function getRestaurantsForSearch() {
  const result = await getRestaurants();
  
  if (!result.success) {
    return {
      success: false,
      data: [],
      error: result.error,
    };
  }
  
  // Return simplified data for search indexing
  const searchData = result.data.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    neighborhood: restaurant.neighborhood,
    description: restaurant.description,
    bestDish: restaurant.bestDish,
    address: restaurant.address,
    type: 'restaurant' as const,
  }));
  
  return {
    success: true,
    data: searchData,
  };
}

