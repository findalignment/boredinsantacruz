'use server';

import { tables } from '@/lib/airtable';
import { RainyActivity, Venue } from '@/types';
import { unstable_cache } from 'next/cache';

// Helper to transform Airtable record to our type
function transformActivity(record: any): RainyActivity {
  const fields = record.fields;
  
  return {
    id: record.id,
    title: fields.Title || fields.Name || fields.title || '',
    venueName: fields.VenueName || fields.Venue?.[0] || 'Local Business',
    tags: fields.Tags || [],
    cost: fields.Cost || 0,
    duration: fields.Duration || '1hr',
    notes: fields.Notes || '',
    writeUp: fields.WriteUp || undefined,
    website: fields.Website || null,
    instagram: fields.Instagram || null,
    imageUrl: fields.Image?.[0]?.url || fields.PhotoURL || fields['Photo URL'] || null,
    venue: {} as Venue, // We'll populate this if needed
    
    // Practical info
    address: fields.Address || undefined,
    hours: fields.Hours || undefined,
    parking: fields.Parking || undefined,
    tips: fields.Tips || undefined,
    phone: fields.Phone || undefined,
    
    // Tide fields
    tidePreference: fields.TidePreference || undefined,
    tideCritical: fields.TideCritical ?? undefined,
    optimalTideHeight: fields.OptimalTideHeight ? {
      min: fields.OptimalTideHeight_Min,
      max: fields.OptimalTideHeight_Max,
    } : undefined,
    
    // Weather fields
    weatherSuitability: fields.WeatherSuitability || undefined,
    idealTempMin: fields.IdealTemp_Min ?? undefined,
    idealTempMax: fields.IdealTemp_Max ?? undefined,
    indoorOutdoor: fields.IndoorOutdoor || undefined,
    rainOk: fields.RainOk ?? undefined,
    windSensitive: fields.WindSensitive ?? undefined,
    requiresGoodVisibility: fields.RequiresGoodVisibility ?? undefined,
    weatherBoost: fields.WeatherBoost ?? undefined,
  };
}

// Fetch all activities with caching
export const getMasterActivities = unstable_cache(
  async () => {
    try {
      // Use the main activities table
      const activitiesTable = tables.activities;
      if (!activitiesTable) {
        return {
          success: false,
          data: [],
          error: 'No activities table configured',
        };
      }
      
      const records = await activitiesTable
        .select({
          view: 'Grid view',
          sort: [{ field: 'Name', direction: 'asc' }],
          maxRecords: 100, // Limit for performance
        })
        .all();

      const activities: RainyActivity[] = records.map(transformActivity);
      
      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      console.error('Error fetching master activities:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to load activities',
      };
    }
  },
  ['master-activities-cache'],
  {
    revalidate: 1800, // 30 minutes
  }
);

// Get rainy day activities specifically
export const getRainyActivities = unstable_cache(
  async () => {
    try {
      const activitiesTable = tables.rainyActivities;
      if (!activitiesTable) {
        return {
          success: false,
          data: [],
          error: 'No rainy activities table configured',
        };
      }
      
      const records = await activitiesTable
        .select({
          view: 'Grid view',
          sort: [{ field: 'Name', direction: 'asc' }],
          maxRecords: 100,
        })
        .all();

      const activities: RainyActivity[] = records.map(transformActivity);
      
      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      console.error('Error fetching rainy activities:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to load rainy activities',
      };
    }
  },
  ['rainy-activities-cache'],
  {
    revalidate: 1800, // 30 minutes
  }
);