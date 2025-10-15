'use server';

import { tables } from '@/lib/airtable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { v4 as uuidv4 } from 'uuid';
import type { Trip, TripWithItems, CreateTripInput } from '@/types/trips';

/**
 * Create a new trip
 */
export async function createTrip(input: CreateTripInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in to create a trip' };
    }

    const record = await tables.trips.create({
      Name: input.name,
      Description: input.description || '',
      UserId: session.user.email,
      StartDate: input.startDate || '',
      EndDate: input.endDate || '',
      IsPublic: input.isPublic || false,
      ShareToken: uuidv4(),
      Collaborators: '',
    } as any);

    const trip: Trip = {
      id: (record as any).id,
      name: (record as any).fields.Name,
      description: (record as any).fields.Description,
      userId: (record as any).fields.UserId,
      collaborators: (record as any).fields.Collaborators,
      coverImageUrl: (record as any).fields.CoverImage?.[0]?.url,
      startDate: (record as any).fields.StartDate,
      endDate: (record as any).fields.EndDate,
      isPublic: (record as any).fields.IsPublic,
      shareToken: (record as any).fields.ShareToken,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    return { success: true, data: trip };
  } catch (error: any) {
    console.error('Failed to create trip:', error);
    return { success: false, error: error.message || 'Failed to create trip' };
  }
}

/**
 * Get all trips for the current user
 */
export async function getTrips() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in to view trips' };
    }

    const records = await tables.trips.select({
      filterByFormula: `OR({UserId} = '${session.user.email}', FIND('${session.user.email}', {Collaborators}))`,
      sort: [{ field: 'Created', direction: 'desc' }],
    }).all();

    const trips: Trip[] = records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || 'Untitled Trip',
      description: record.fields.Description || '',
      userId: record.fields.UserId || '',
      collaborators: record.fields.Collaborators || '',
      coverImageUrl: record.fields.CoverImage?.[0]?.url,
      startDate: record.fields.StartDate || '',
      endDate: record.fields.EndDate || '',
      isPublic: record.fields.IsPublic || false,
      shareToken: record.fields.ShareToken || '',
      created: record.fields.Created || new Date().toISOString(),
      updated: record.fields.Updated || new Date().toISOString(),
    }));

    return { success: true, data: trips };
  } catch (error: any) {
    console.error('Failed to get trips:', error);
    return { success: false, error: error.message || 'Failed to get trips' };
  }
}

/**
 * Get a single trip by ID with all items
 */
export async function getTripById(tripId: string): Promise<{ success: boolean; data?: TripWithItems; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    
    // Get trip
    const tripRecord = await tables.trips.find(tripId);
    
    const trip: Trip = {
      id: (tripRecord as any).id,
      name: (tripRecord as any).fields.Name || 'Untitled Trip',
      description: (tripRecord as any).fields.Description || '',
      userId: (tripRecord as any).fields.UserId || '',
      collaborators: (tripRecord as any).fields.Collaborators || '',
      coverImageUrl: (tripRecord as any).fields.CoverImage?.[0]?.url,
      startDate: (tripRecord as any).fields.StartDate || '',
      endDate: (tripRecord as any).fields.EndDate || '',
      isPublic: (tripRecord as any).fields.IsPublic || false,
      shareToken: (tripRecord as any).fields.ShareToken || '',
      created: (tripRecord as any).fields.Created || new Date().toISOString(),
      updated: (tripRecord as any).fields.Updated || new Date().toISOString(),
    };

    // Check permissions
    const isOwner = session?.user?.email === trip.userId;
    const isCollaborator = trip.collaborators?.includes(session?.user?.email || '');
    const canView = trip.isPublic || isOwner || isCollaborator;

    if (!canView) {
      return { success: false, error: 'You do not have permission to view this trip' };
    }

    // Get items
    const itemRecords = await tables.tripItems.select({
      filterByFormula: `{TripId} = '${tripId}'`,
      sort: [{ field: 'Day', direction: 'asc' }, { field: 'Order', direction: 'asc' }],
    }).all();

    const items = itemRecords.map((record: any) => ({
      id: record.id,
      tripId: record.fields.TripId || '',
      itemType: record.fields.ItemType || 'Note',
      referenceId: record.fields.ReferenceId || '',
      itemName: record.fields.ItemName || '',
      itemData: record.fields.ItemData || '',
      day: record.fields.Day || 1,
      order: record.fields.Order || 0,
      notes: record.fields.Notes || '',
      created: record.fields.Created || new Date().toISOString(),
    }));

    return { success: true, data: { ...trip, items } };
  } catch (error: any) {
    console.error('Failed to get trip:', error);
    return { success: false, error: error.message || 'Failed to get trip' };
  }
}

/**
 * Get trip by share token (no auth required)
 */
export async function getTripByToken(token: string): Promise<{ success: boolean; data?: TripWithItems; error?: string }> {
  try {
    const records = await tables.trips.select({
      filterByFormula: `{ShareToken} = '${token}'`,
      maxRecords: 1,
    }).all();

    if (records.length === 0) {
      return { success: false, error: 'Trip not found' };
    }

    const tripRecord = records[0];
    
    return await getTripById((tripRecord as any).id);
  } catch (error: any) {
    console.error('Failed to get trip by token:', error);
    return { success: false, error: error.message || 'Failed to get trip' };
  }
}

/**
 * Update a trip
 */
export async function updateTrip(tripId: string, updates: Partial<CreateTripInput>) {
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

    const updateFields: any = {};
    if (updates.name) updateFields.Name = updates.name;
    if (updates.description !== undefined) updateFields.Description = updates.description;
    if (updates.startDate !== undefined) updateFields.StartDate = updates.startDate;
    if (updates.endDate !== undefined) updateFields.EndDate = updates.endDate;
    if (updates.isPublic !== undefined) updateFields.IsPublic = updates.isPublic;

    await tables.trips.update(tripId, updateFields);

    return { success: true };
  } catch (error: any) {
    console.error('Failed to update trip:', error);
    return { success: false, error: error.message || 'Failed to update trip' };
  }
}

/**
 * Delete a trip
 */
export async function deleteTrip(tripId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    // Check permissions (only owner can delete)
    const tripResult = await getTripById(tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    if (tripResult.data.userId !== session.user.email) {
      return { success: false, error: 'Only the trip owner can delete it' };
    }

    // Delete all items first
    const items = tripResult.data.items;
    for (const item of items) {
      await tables.tripItems.destroy(item.id);
    }

    // Delete trip
    await tables.trips.destroy(tripId);

    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete trip:', error);
    return { success: false, error: error.message || 'Failed to delete trip' };
  }
}

/**
 * Generate or regenerate share token
 */
export async function generateShareToken(tripId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    const tripResult = await getTripById(tripId);
    if (!tripResult.success || !tripResult.data) {
      return { success: false, error: 'Trip not found' };
    }

    if (tripResult.data.userId !== session.user.email) {
      return { success: false, error: 'Only the trip owner can generate share links' };
    }

    const newToken = uuidv4();
    await tables.trips.update(tripId, { ShareToken: newToken } as any);

    return { success: true, data: { token: newToken } };
  } catch (error: any) {
    console.error('Failed to generate share token:', error);
    return { success: false, error: error.message || 'Failed to generate share link' };
  }
}

