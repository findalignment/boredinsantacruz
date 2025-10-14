'use server';

import { tideService } from '@/lib/tides';
import { unstable_cache } from 'next/cache';

/**
 * Get tide predictions for a specific date
 */
export const getTidesForDate = unstable_cache(
  async (date: string) => {
    try {
      const tideData = await tideService.getTidesForDate(date);
      const conditions = tideService.analyzeTideConditions(tideData);
      const summary = tideService.getTideSummary(tideData);
      const isGoodForTidePools = tideService.isGoodTimeForTidePools(tideData);

      return {
        success: true,
        data: {
          tideData,
          conditions,
          summary,
          isGoodForTidePools,
        },
      };
    } catch (error) {
      console.error('Error fetching tides:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tide data',
        data: null,
      };
    }
  },
  ['tide-data'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['tides'],
  }
);

/**
 * Get today's tides
 */
export async function getTodaysTides() {
  const today = new Date().toISOString().split('T')[0];
  return getTidesForDate(today);
}

