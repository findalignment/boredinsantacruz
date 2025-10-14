'use server';

import { tables } from '@/lib/airtable';
import { RainyActivity, Venue } from '@/types';
import { unstable_cache } from 'next/cache';

// Helper to transform Airtable record to our type
function transformActivity(record: any): RainyActivity {
  const fields = record.fields;
  
  return {
    id: record.id,
    title: fields.Title || '',
    venueName: fields.VenueName || fields.Venue?.[0] || 'Unknown Venue',
    tags: fields.Tags || [],
    cost: fields.Cost || 0,
    duration: fields.Duration || '1hr',
    notes: fields.Notes || '',
    website: fields.Website || null,
    instagram: fields.Instagram || null,
    imageUrl: fields.Image?.[0]?.url || null,
    venue: {} as Venue, // We'll populate this if needed
    
    // Weather fields (Sprint 2)
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
export const getActivities = unstable_cache(
  async () => {
    try {
      const records = await tables.rainyActivities
        .select({
          view: 'Grid view',
          sort: [{ field: 'Title', direction: 'asc' }],
        })
        .all();

      const activities: RainyActivity[] = records.map(transformActivity);
      
      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      console.error('Error fetching activities:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to load activities',
      };
    }
  },
  ['rainy-activities'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['activities'],
  }
);

// Optional: Fetch with filters
export async function getFilteredActivities(filters: {
  tags?: string[];
  maxCost?: number;
}) {
  const result = await getActivities();
  
  if (!result.success) return result;
  
  let filtered = result.data;
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(activity =>
      filters.tags!.some(tag => activity.tags.includes(tag))
    );
  }
  
  if (filters.maxCost !== undefined) {
    filtered = filtered.filter(activity => activity.cost <= filters.maxCost!);
  }
  
  return {
    success: true,
    data: filtered,
  };
}

