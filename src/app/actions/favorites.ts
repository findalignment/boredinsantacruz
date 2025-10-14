'use server';

import { tables } from '@/lib/airtable';
import { auth } from '@/lib/auth/config';
import { revalidatePath } from 'next/cache';

export interface Favorite {
  id: string;
  userId: string;
  itemType: 'Activity' | 'Restaurant';
  itemId: string;
  notes?: string;
  createdAt: string;
}

/**
 * Add an item to user's favorites
 */
export async function addFavorite(itemType: 'Activity' | 'Restaurant', itemId: string, notes?: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'You must be logged in to add favorites',
    };
  }

  try {
    // Check if already favorited
    const existing = await tables.favorites
      .select({
        filterByFormula: `AND({UserId} = '${session.user.id}', {ItemType} = '${itemType}', {ItemId} = '${itemId}')`,
        maxRecords: 1,
      })
      .firstPage();

    if (existing.length > 0) {
      return {
        success: false,
        error: 'Already in favorites',
      };
    }

    // Create favorite
    const record = await tables.favorites.create({
      UserId: session.user.id,
      ItemType: itemType,
      ItemId: itemId,
      Notes: notes || '',
      CreatedAt: new Date().toISOString(),
    });

    // Revalidate relevant pages
    revalidatePath('/profile');
    revalidatePath('/favorites');

    return {
      success: true,
      data: {
        id: record.id,
        userId: session.user.id,
        itemType,
        itemId,
        notes,
        createdAt: new Date().toISOString(),
      } as Favorite,
    };
  } catch (error) {
    console.error('Error adding favorite:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add favorite',
    };
  }
}

/**
 * Remove an item from user's favorites
 */
export async function removeFavorite(itemType: 'Activity' | 'Restaurant', itemId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'You must be logged in',
    };
  }

  try {
    // Find the favorite
    const records = await tables.favorites
      .select({
        filterByFormula: `AND({UserId} = '${session.user.id}', {ItemType} = '${itemType}', {ItemId} = '${itemId}')`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return {
        success: false,
        error: 'Favorite not found',
      };
    }

    // Delete it
    await tables.favorites.destroy(records[0].id);

    // Revalidate relevant pages
    revalidatePath('/profile');
    revalidatePath('/favorites');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error removing favorite:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove favorite',
    };
  }
}

/**
 * Check if an item is favorited by the current user
 */
export async function isFavorited(itemType: 'Activity' | 'Restaurant', itemId: string): Promise<boolean> {
  const session = await auth();
  
  if (!session?.user?.id) {
    return false;
  }

  try {
    const records = await tables.favorites
      .select({
        filterByFormula: `AND({UserId} = '${session.user.id}', {ItemType} = '${itemType}', {ItemId} = '${itemId}')`,
        maxRecords: 1,
      })
      .firstPage();

    return records.length > 0;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}

/**
 * Get all favorites for the current user
 */
export async function getFavorites() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'You must be logged in',
      data: [],
    };
  }

  try {
    const records = await tables.favorites
      .select({
        filterByFormula: `{UserId} = '${session.user.id}'`,
        sort: [{ field: 'CreatedAt', direction: 'desc' }],
      })
      .all();

    const favorites: Favorite[] = records.map((record) => ({
      id: record.id,
      userId: record.fields.UserId as string,
      itemType: record.fields.ItemType as 'Activity' | 'Restaurant',
      itemId: record.fields.ItemId as string,
      notes: record.fields.Notes as string | undefined,
      createdAt: record.fields.CreatedAt as string,
    }));

    return {
      success: true,
      data: favorites,
    };
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch favorites',
      data: [],
    };
  }
}

/**
 * Get favorite count for the current user
 */
export async function getFavoriteCount() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return 0;
  }

  try {
    const records = await tables.favorites
      .select({
        filterByFormula: `{UserId} = '${session.user.id}'`,
        fields: ['id'],
      })
      .all();

    return records.length;
  } catch (error) {
    console.error('Error counting favorites:', error);
    return 0;
  }
}

