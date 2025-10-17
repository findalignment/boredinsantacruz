'use server';

import { tables } from '@/lib/airtable';

export interface AirtableEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  address?: string;
  category: string;
  price?: string;
  isFree: boolean;
  website?: string;
  imageUrl?: string;
  tags: string[];
  neighborhood: string;
  featured: boolean;
}

export async function getAirtableEvents() {
  try {
    // Check if events table exists
    if (!tables.events) {
      return {
        success: false,
        error: 'Events table not configured in Airtable',
        data: [],
      };
    }

    const records = await tables.events
      .select({
        view: 'Grid view',
        sort: [{ field: 'StartDate', direction: 'asc' }],
        maxRecords: 100,
      })
      .all();

    const events: AirtableEvent[] = records.map((record) => {
      const fields = record.fields as any;

      return {
        id: record.id,
        name: fields.Name || fields.Title || 'Untitled Event',
        description: fields.Description || '',
        startDate: fields.StartDate || '',
        endDate: fields.EndDate || undefined,
        time: fields.Time || undefined,
        location: fields.Location || fields.Venue || '',
        address: fields.Address || undefined,
        category: fields.Category || 'General',
        price: fields.Price || undefined,
        isFree: fields.IsFree === true || fields.Price === 'Free' || fields.Price === '0',
        website: fields.Website || undefined,
        imageUrl: fields.Image?.[0]?.url || fields.PhotoURL || undefined,
        tags: fields.Tags ? (Array.isArray(fields.Tags) ? fields.Tags : [fields.Tags]) : [],
        neighborhood: fields.Neighborhood || 'Santa Cruz',
        featured: fields.Featured === true,
      };
    });

    return {
      success: true,
      data: events,
    };
  } catch (error: any) {
    console.error('Error fetching Airtable events:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch events',
      data: [],
    };
  }
}

export async function getTodayAirtableEvents() {
  const result = await getAirtableEvents();
  if (!result.success) return result;

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = result.data.filter(event => 
    event.startDate.startsWith(today)
  );

  return {
    success: true,
    data: todayEvents,
  };
}

export async function getUpcomingAirtableEvents(days: number = 30) {
  const result = await getAirtableEvents();
  if (!result.success) return result;

  const today = new Date();
  const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));

  const upcomingEvents = result.data.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate >= today && eventDate <= futureDate;
  });

  return {
    success: true,
    data: upcomingEvents,
  };
}
