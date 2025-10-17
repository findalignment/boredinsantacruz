'use server';

import { tables } from '@/lib/airtable';
import { eventbriteService, type Event } from '@/lib/events/eventbrite';
import { getMockEvents } from '@/lib/events/mock-events';
import { startOfDay, endOfDay, parseISO, isWithinInterval } from 'date-fns';

export interface EventFilters {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  category?: string;
  isFree?: boolean;
  search?: string;
}

export async function getEvents(filters?: EventFilters): Promise<{ success: boolean; data?: Event[]; error?: string }> {
  try {
    // Try Eventbrite first, fall back to mock events if it fails
    let eventbriteEvents: Event[] = [];
    try {
      eventbriteEvents = await eventbriteService.fetchSantaCruzEvents(
        filters?.startDate,
        filters?.endDate
      );
    } catch (error) {
      console.warn('Eventbrite API failed, using mock events:', error);
      // Convert mock events to Event format
      eventbriteEvents = getMockEvents().map(mockEvent => ({
        id: mockEvent.id,
        name: mockEvent.name,
        description: mockEvent.description,
        startDate: mockEvent.startDate,
        endDate: mockEvent.endDate,
        category: mockEvent.category,
        venue: mockEvent.venue,
        image: mockEvent.image,
        url: mockEvent.url,
        price: mockEvent.price,
        tags: [mockEvent.category.toLowerCase()],
        isOnline: false,
        source: 'eventbrite' as const,
      }));
    }

    // Fetch curated events from Airtable (if table exists)
    let airtableEvents: Event[] = [];
    // TODO: Add Airtable events table if needed for curated events

    // Combine events
    let allEvents = [...eventbriteEvents, ...airtableEvents];

    // Apply filters
    if (filters) {
      // Filter by specific date
      if (filters.date) {
        const dateStart = startOfDay(filters.date);
        const dateEnd = endOfDay(filters.date);
        allEvents = allEvents.filter(event => {
          const eventStart = parseISO(event.startDate);
          return isWithinInterval(eventStart, { start: dateStart, end: dateEnd });
        });
      }

      // Filter by date range
      if (filters.startDate && filters.endDate) {
        allEvents = allEvents.filter(event => {
          const eventStart = parseISO(event.startDate);
          return isWithinInterval(eventStart, { start: filters.startDate!, end: filters.endDate! });
        });
      }

      // Filter by category
      if (filters.category && filters.category !== 'all') {
        allEvents = allEvents.filter(event => 
          event.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      // Filter by price (free only)
      if (filters.isFree) {
        allEvents = allEvents.filter(event => event.price.isFree);
      }

      // Search by name/description
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        allEvents = allEvents.filter(event =>
          event.name.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.venue.name.toLowerCase().includes(searchLower)
        );
      }
    }

    // Sort by date (earliest first)
    allEvents.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return {
      success: true,
      data: allEvents,
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    };
  }
}

export async function getEventById(id: string): Promise<{ success: boolean; data?: Event; error?: string }> {
  try {
    const result = await getEvents();
    if (!result.success || !result.data) {
      return { success: false, error: 'Failed to fetch events' };
    }

    const event = result.data.find(e => e.id === id);
    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    return { success: true, data: event };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch event',
    };
  }
}

export async function getTodayEvents(): Promise<{ success: boolean; data?: Event[]; error?: string }> {
  return getEvents({ date: new Date() });
}

export async function getUpcomingEvents(days: number = 7): Promise<{ success: boolean; data?: Event[]; error?: string }> {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  
  return getEvents({ startDate, endDate });
}

export async function getEventCategories(): Promise<{ success: boolean; data?: string[]; error?: string }> {
  try {
    const result = await getEvents();
    if (!result.success || !result.data) {
      return { success: false, error: 'Failed to fetch events' };
    }

    const categories = [...new Set(result.data.map(e => e.category))].sort();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories',
    };
  }
}

