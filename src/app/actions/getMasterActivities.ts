'use server';

import { tables } from '@/lib/airtable';
import { Activity, ScoredMasterActivity } from '@/types';
import { unstable_cache } from 'next/cache';

// Transform Airtable record to Activity type
function transformActivity(record: any): Activity {
  const fields = record.fields;
  
  // Parse tags (can be array or comma-separated string)
  let tags: string[] = [];
  if (Array.isArray(fields.Tags)) {
    tags = fields.Tags;
  } else if (typeof fields.Tags === 'string') {
    tags = fields.Tags.split(',').map((t: string) => t.trim()).filter(Boolean);
  }
  
  return {
    // Core fields
    id: record.id,
    name: fields.Name || '',
    description: fields.Description || '',
    writeUp: fields.WriteUp || undefined,
    category: fields.Category || 'Activity',
    cost: fields.Cost || 0,
    duration: fields.Duration || '1-2 hours',
    indoorOutdoor: fields.IndoorOutdoor || 'Mixed',
    
    // Location
    address: fields.Address || undefined,
    latitude: fields.Latitude || undefined,
    longitude: fields.Longitude || undefined,
    neighborhood: fields.Neighborhood || undefined,
    city: fields.City || 'Santa Cruz',
    zipCode: fields.ZipCode || undefined,
    
    // Contact
    phone: fields.Phone || undefined,
    website: fields.Website || undefined,
    instagram: fields.Instagram || undefined,
    email: fields.Email || undefined,
    
    // Practical info
    hours: fields.Hours || undefined,
    parkingInfo: fields.ParkingInfo || undefined,
    publicTransit: fields.PublicTransit || undefined,
    
    // Media
    photoUrl: fields.PhotoURL || undefined,
    imageUrl: fields.PhotoURL || undefined,
    
    // Tags & categorization
    tags,
    kidFriendly: fields.KidFriendly ?? undefined,
    petFriendly: fields.PetFriendly || undefined,
    accessibility: fields.Accessibility || undefined,
    
    // Weather-aware fields
    weatherPreferences: fields.WeatherPreferences || undefined,
    rainOk: fields.RainOk ?? undefined,
    idealTempMin: fields.IdealTempMin || undefined,
    idealTempMax: fields.IdealTempMax || undefined,
    windSensitive: fields.WindSensitive ?? undefined,
    requiresGoodVisibility: fields.RequiresGoodVisibility ?? undefined,
    weatherBoost: fields.WeatherBoost || 1.0,
    
    // Tide-aware fields
    tidePreference: fields.TidePreference || undefined,
    tideCritical: fields.TideCritical ?? undefined,
    
    // Insider tips & content
    tips: fields.Tips || undefined,
    bestTimeToVisit: fields.BestTimeToVisit || undefined,
    bestFeature: fields.BestFeature || undefined,
    whatToBring: fields.WhatToBring || undefined,
    
    // Display & sorting
    staffPick: fields.StaffPick ?? undefined,
    featured: fields.Featured ?? undefined,
    priority: fields.Priority || undefined,
    sponsored: fields.Sponsored ?? undefined,
    
    // Ratings
    rating: fields.Rating || undefined,
    reviewCount: fields.ReviewCount || undefined,
    
    // SEO
    metaDescription: fields.MetaDescription || undefined,
    keywords: fields.Keywords || undefined,
    slug: fields.Slug || undefined,
    
    // Admin
    status: fields.Status || 'Published',
    source: fields.Source || undefined,
    
    // Optional advanced
    difficulty: fields.Difficulty || undefined,
    ageRestriction: fields.AgeRestriction || undefined,
    groupSize: fields.GroupSize || undefined,
    reservationRequired: fields.ReservationRequired ?? undefined,
    seasonalAvailability: fields.SeasonalAvailability || undefined,
  };
}

// Fetch all master activities with caching
export const getMasterActivities = unstable_cache(
  async (filters?: {
    category?: string;
    indoorOutdoor?: string;
    rainOk?: boolean;
    weatherPreference?: string;
    kidFriendly?: boolean;
    staffPick?: boolean;
    maxCost?: number;
  }) => {
    try {
      // If master table not configured, return empty
      if (!tables.activities) {
        console.log('[Master Activities] Table not configured');
        return {
          success: false,
          data: [],
          error: 'Activities table not configured',
        };
      }

      // Build filter formula
      let filterFormula = "AND({Status} = 'Published')";
      
      if (filters) {
        const conditions = ["{Status} = 'Published'"];
        
        if (filters.category) {
          conditions.push(`{Category} = '${filters.category}'`);
        }
        
        if (filters.indoorOutdoor) {
          conditions.push(`{IndoorOutdoor} = '${filters.indoorOutdoor}'`);
        }
        
        if (filters.rainOk !== undefined) {
          conditions.push(`{RainOk} = ${filters.rainOk ? 'TRUE()' : 'FALSE()'}`);
        }
        
        if (filters.weatherPreference) {
          conditions.push(`FIND('${filters.weatherPreference}', {WeatherPreferences})`);
        }
        
        if (filters.kidFriendly !== undefined) {
          conditions.push(`{KidFriendly} = ${filters.kidFriendly ? 'TRUE()' : 'FALSE()'}`);
        }
        
        if (filters.staffPick !== undefined) {
          conditions.push(`{StaffPick} = ${filters.staffPick ? 'TRUE()' : 'FALSE()'}`);
        }
        
        if (filters.maxCost !== undefined) {
          conditions.push(`{Cost} <= ${filters.maxCost}`);
        }
        
        filterFormula = conditions.length > 1 
          ? `AND(${conditions.join(', ')})` 
          : conditions[0];
      }

      const records = await tables.activities
        .select({
          filterByFormula: filterFormula,
          sort: [
            { field: 'Priority', direction: 'desc' },
            { field: 'StaffPick', direction: 'desc' },
            { field: 'Rating', direction: 'desc' },
            { field: 'Name', direction: 'asc' },
          ],
        })
        .all();

      const activities: Activity[] = records.map(transformActivity);
      
      console.log(`[Master Activities] Fetched ${activities.length} activities${filters ? ' with filters' : ''}`);
      
      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      console.error('[Master Activities] Error fetching:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to load activities',
      };
    }
  },
  ['master-activities'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['activities', 'master-activities'],
  }
);

// Get single activity by ID
export async function getMasterActivityById(id: string) {
  try {
    if (!tables.activities) {
      return {
        success: false,
        data: null,
        error: 'Activities table not configured',
      };
    }

    const record = await tables.activities.find(id);
    const activity = transformActivity(record);

    return {
      success: true,
      data: activity,
    };
  } catch (error) {
    console.error(`[Master Activities] Error fetching activity ${id}:`, error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Activity not found',
    };
  }
}

// Get activities by category
export async function getActivitiesByCategory(category: string) {
  return getMasterActivities({ category });
}

// Get rainy day activities
export async function getRainyActivities() {
  return getMasterActivities({ rainOk: true });
}

// Get sunny day activities
export async function getSunnyActivities() {
  return getMasterActivities({ weatherPreference: 'sunny' });
}

// Get outdoor activities
export async function getOutdoorActivities() {
  return getMasterActivities({ indoorOutdoor: 'Outdoor' });
}

// Get indoor activities
export async function getIndoorActivities() {
  return getMasterActivities({ indoorOutdoor: 'Indoor' });
}

// Get kid-friendly activities
export async function getKidFriendlyActivities() {
  return getMasterActivities({ kidFriendly: true });
}

// Get staff picks
export async function getStaffPicks() {
  return getMasterActivities({ staffPick: true });
}

// Get featured activities
export async function getFeaturedActivities() {
  const result = await getMasterActivities({ staffPick: true });
  if (result.success) {
    // Return up to 3 featured activities
    return {
      ...result,
      data: result.data.slice(0, 3),
    };
  }
  return result;
}

// Search activities
export async function searchMasterActivities(query: string) {
  const result = await getMasterActivities();
  
  if (!result.success) return result;
  
  const searchQuery = query.toLowerCase();
  const filtered = result.data.filter(activity => {
    return (
      activity.name.toLowerCase().includes(searchQuery) ||
      activity.description.toLowerCase().includes(searchQuery) ||
      activity.category.toLowerCase().includes(searchQuery) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      activity.neighborhood?.toLowerCase().includes(searchQuery)
    );
  });
  
  return {
    success: true,
    data: filtered,
  };
}

