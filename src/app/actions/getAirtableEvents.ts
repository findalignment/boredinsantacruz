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
    // For now, return empty events since events table is not configured
    // This will be replaced when events table is set up
    return {
      success: true,
      data: [],
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
