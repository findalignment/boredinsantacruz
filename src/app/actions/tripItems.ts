'use server';

import { tables } from '@/lib/airtable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import type { TripItem, AddItemToTripInput } from '@/types/trips';
import { getTripById } from './trips';

/**
 * Add an item to a trip
 */
export async function addItemToTrip(input: AddItemToTripInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    // Check permissions
    const tripResult = await getTripById(input.tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    const isOwner = tripResult.data.userId === session.user.email;
    const isCollaborator = tripResult.data.collaborators?.includes(session.user.email);

    if (!isOwner && !isCollaborator) {
      return { success: false, error: 'You do not have permission to add items to this trip' };
    }

    // Get current max order for the day
    const existingItems = tripResult.data.items.filter(item => item.day === (input.day || 1));
    const maxOrder = existingItems.length > 0 ? Math.max(...existingItems.map(item => item.order)) : 0;

    const record = await tables.tripItems.create({
      TripId: input.tripId,
      ItemType: input.itemType,
      ReferenceId: input.referenceId || '',
      ItemName: input.itemName,
      ItemData: input.itemData ? JSON.stringify(input.itemData) : '',
      Day: input.day || 1,
      Order: maxOrder + 1,
      Notes: input.notes || '',
    } as any);

    const item: TripItem = {
      id: (record as any).id,
      tripId: (record as any).fields.TripId,
      itemType: (record as any).fields.ItemType,
      referenceId: (record as any).fields.ReferenceId,
      itemName: (record as any).fields.ItemName,
      itemData: (record as any).fields.ItemData,
      day: (record as any).fields.Day,
      order: (record as any).fields.Order,
      notes: (record as any).fields.Notes,
      created: new Date().toISOString(),
    };

    return { success: true, data: item };
  } catch (error: any) {
    console.error('Failed to add item to trip:', error);
    return { success: false, error: error.message || 'Failed to add item' };
  }
}

/**
 * Remove an item from a trip
 */
export async function removeItemFromTrip(itemId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    // Get the item to find the trip
    const itemRecord = await tables.tripItems.find(itemId);
    const tripId = (itemRecord as any).fields.TripId;

    // Check permissions
    const tripResult = await getTripById(tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    const isOwner = tripResult.data.userId === session.user.email;
    const isCollaborator = tripResult.data.collaborators?.includes(session.user.email);

    if (!isOwner && !isCollaborator) {
      return { success: false, error: 'You do not have permission to remove items from this trip' };
    }

    await tables.tripItems.destroy(itemId);

    return { success: true };
  } catch (error: any) {
    console.error('Failed to remove item from trip:', error);
    return { success: false, error: error.message || 'Failed to remove item' };
  }
}

/**
 * Update trip item notes
 */
export async function updateTripItem(itemId: string, updates: { notes?: string; day?: number }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    // Get the item to find the trip
    const itemRecord = await tables.tripItems.find(itemId);
    const tripId = (itemRecord as any).fields.TripId;

    // Check permissions
    const tripResult = await getTripById(tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    const isOwner = tripResult.data.userId === session.user.email;
    const isCollaborator = tripResult.data.collaborators?.includes(session.user.email);

    if (!isOwner && !isCollaborator) {
      return { success: false, error: 'You do not have permission to edit this trip' };
    }

    const updateFields: any = {};
    if (updates.notes !== undefined) updateFields.Notes = updates.notes;
    if (updates.day !== undefined) updateFields.Day = updates.day;

    await tables.tripItems.update(itemId, updateFields);

    return { success: true };
  } catch (error: any) {
    console.error('Failed to update item:', error);
    return { success: false, error: error.message || 'Failed to update item' };
  }
}

/**
 * Reorder trip items (for drag and drop)
 */
export async function reorderTripItems(tripId: string, items: { id: string; day: number; order: number }[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    // Check permissions
    const tripResult = await getTripById(tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    const isOwner = tripResult.data.userId === session.user.email;
    const isCollaborator = tripResult.data.collaborators?.includes(session.user.email);

    if (!isOwner && !isCollaborator) {
      return { success: false, error: 'You do not have permission to edit this trip' };
    }

    // Update all items
    await Promise.all(
      items.map(item =>
        tables.tripItems.update(item.id, {
          Day: item.day,
          Order: item.order,
        } as any)
      )
    );

    return { success: true };
  } catch (error: any) {
    console.error('Failed to reorder items:', error);
    return { success: false, error: error.message || 'Failed to reorder items' };
  }
}

