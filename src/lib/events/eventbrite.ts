// Eventbrite API integration for Santa Cruz events

export interface EventbriteEvent {
  id: string;
  name: { text: string };
  description: { text: string };
  start: { local: string; timezone: string };
  end: { local: string; timezone: string };
  url: string;
  logo?: { original?: { url: string } };
  venue?: {
    name: string;
    address: {
      address_1?: string;
      city?: string;
      region?: string;
      postal_code?: string;
      localized_address_display?: string;
    };
    latitude?: string;
    longitude?: string;
  };
  category?: { name: string };
  is_free: boolean;
  ticket_availability?: {
    minimum_ticket_price?: { major_value: string };
    maximum_ticket_price?: { major_value: string };
  };
}

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string;
  category: string;
  venue: {
    name: string;
    address: string;
    city: string;
    lat?: number;
    lng?: number;
  };
  image?: string;
  url: string;
  price: {
    min: number;
    max: number;
    isFree: boolean;
  };
  tags: string[];
  isOnline: boolean;
  source: 'eventbrite' | 'airtable' | 'manual';
}

class EventbriteService {
  private apiKey: string | undefined;
  private baseUrl = 'https://www.eventbriteapi.com/v3';

  constructor() {
    this.apiKey = process.env.EVENTBRITE_API_KEY;
  }

  async fetchSantaCruzEvents(startDate?: Date, endDate?: Date): Promise<Event[]> {
    if (!this.apiKey) {
      console.warn('Eventbrite API key not configured. Skipping Eventbrite events.');
      return [];
    }

    try {
      // Build query parameters
      const params = new URLSearchParams({
        'location.address': 'Santa Cruz, CA',
        'location.within': '25mi', // 25 mile radius
        'expand': 'venue,ticket_availability,category',
        'sort_by': 'date',
        'page_size': '100', // Max per page
      });

      // Add date filters if provided
      if (startDate) {
        params.append('start_date.range_start', startDate.toISOString());
      }
      if (endDate) {
        params.append('start_date.range_end', endDate.toISOString());
      }

      const response = await fetch(`${this.baseUrl}/events/search/?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 21600, // Cache for 6 hours
        },
      });

      if (!response.ok) {
        console.error('Eventbrite API error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      const events: EventbriteEvent[] = data.events || [];

      return events.map(this.transformEvent);
    } catch (error) {
      console.error('Error fetching Eventbrite events:', error);
      return [];
    }
  }

  private transformEvent(event: EventbriteEvent): Event {
    return {
      id: `eventbrite-${event.id}`,
      name: event.name.text,
      description: event.description?.text || '',
      startDate: event.start.local,
      endDate: event.end.local,
      category: event.category?.name || 'Other',
      venue: {
        name: event.venue?.name || 'TBA',
        address: event.venue?.address?.localized_address_display || '',
        city: event.venue?.address?.city || 'Santa Cruz',
        lat: event.venue?.latitude ? parseFloat(event.venue.latitude) : undefined,
        lng: event.venue?.longitude ? parseFloat(event.venue.longitude) : undefined,
      },
      image: event.logo?.original?.url,
      url: event.url,
      price: {
        min: event.ticket_availability?.minimum_ticket_price?.major_value 
          ? parseFloat(event.ticket_availability.minimum_ticket_price.major_value) 
          : 0,
        max: event.ticket_availability?.maximum_ticket_price?.major_value 
          ? parseFloat(event.ticket_availability.maximum_ticket_price.major_value) 
          : 0,
        isFree: event.is_free,
      },
      tags: [event.category?.name || 'Events'].filter(Boolean),
      isOnline: event.venue?.name?.toLowerCase().includes('online') || false,
      source: 'eventbrite',
    };
  }
}

export const eventbriteService = new EventbriteService();

