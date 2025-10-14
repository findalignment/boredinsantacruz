'use server';

import { getActivities } from './getActivities';

/**
 * Server action to get activities for search
 * Returns all activities for client-side search index
 */
export async function getActivitiesForSearch() {
  try {
    const result = await getActivities();
    
    if (!result.success || !result.data) {
      return {
        success: false,
        error: 'Failed to load activities',
        data: [],
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error in getActivitiesForSearch:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
}

