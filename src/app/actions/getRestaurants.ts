'use server';

import { tables } from '@/lib/airtable';
import type { Restaurant } from '@/types';

export async function getRestaurants() {
  try {
    const records = await tables.restaurants
      .select({
        view: 'Grid view',
      })
      .all();

    const restaurants: Restaurant[] = records.map((record) => {
      const fields = record.fields as any;

      return {
        id: record.id,
        name: fields.Name || 'Unnamed Restaurant',
        cuisine: fields.Cuisine ? (Array.isArray(fields.Cuisine) ? fields.Cuisine : [fields.Cuisine]) : [],
        priceLevel: fields.PriceLevel || 2,
        neighborhood: fields.Neighborhood || 'Santa Cruz',
        
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
        dineIn: fields.DineIn !== false, // Default true
        takeout: fields.Takeout === true,
        delivery: fields.Delivery === true,
        outdoor: fields.Outdoor === true,
        reservations: fields.Reservations === true,
        
        // Insider Knowledge
        bestDish: fields.BestDish || undefined,
        bestTime: fields.BestTime || undefined,
        tips: fields.Tips || undefined,
        
        // Dietary
        vegetarianFriendly: fields.VegetarianFriendly === true,
        veganOptions: fields.VeganOptions === true,
        glutenFree: fields.GlutenFree === true,
        
        // Images
        image: fields.Image,
      };
    });

    return {
      success: true,
      data: restaurants,
    };
  } catch (error: any) {
    console.error('Error fetching restaurants:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch restaurants',
      data: [],
    };
  }
}

export async function getRestaurantById(id: string) {
  try {
    const record = await tables.restaurants.find(id);
    const fields = record.fields as any;

    const restaurant: Restaurant = {
      id: record.id,
      name: fields.Name || 'Unnamed Restaurant',
      cuisine: fields.Cuisine ? (Array.isArray(fields.Cuisine) ? fields.Cuisine : [fields.Cuisine]) : [],
      priceLevel: fields.PriceLevel || 2,
      neighborhood: fields.Neighborhood || 'Santa Cruz',
      
      address: fields.Address || '',
      phone: fields.Phone || undefined,
      website: fields.Website || undefined,
      instagram: fields.Instagram || undefined,
      
      description: fields.Description || '',
      hours: fields.Hours || undefined,
      parking: fields.Parking || undefined,
      
      dineIn: fields.DineIn !== false,
      takeout: fields.Takeout === true,
      delivery: fields.Delivery === true,
      outdoor: fields.Outdoor === true,
      reservations: fields.Reservations === true,
      
      bestDish: fields.BestDish || undefined,
      bestTime: fields.BestTime || undefined,
      tips: fields.Tips || undefined,
      
      vegetarianFriendly: fields.VegetarianFriendly === true,
      veganOptions: fields.VeganOptions === true,
      glutenFree: fields.GlutenFree === true,
      
      image: fields.Image,
    };

    return {
      success: true,
      data: restaurant,
    };
  } catch (error: any) {
    console.error(`Error fetching restaurant ${id}:`, error);
    return {
      success: false,
      error: error.message || 'Failed to fetch restaurant',
      data: null,
    };
  }
}
