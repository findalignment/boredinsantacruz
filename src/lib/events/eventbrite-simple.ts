// Simplified Eventbrite API integration
export interface SimpleEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: {
    name: string;
    address: string;
    city: string;
  };
  image?: string;
  url: string;
  price: {
    min: number;
    max: number;
    isFree: boolean;
  };
  category: string;
  source: 'eventbrite' | 'manual';
}

export class SimpleEventbriteService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.EVENTBRITE_API_KEY || '';
  }

  async fetchSantaCruzEvents(): Promise<SimpleEvent[]> {
    if (!this.apiKey) {
      console.warn('Eventbrite API key not configured');
      return [];
    }

    try {
      // Use a simpler approach - get events from a specific organizer or search
      const params = new URLSearchParams({
        'location.address': 'Santa Cruz, CA',
        'location.within': '10mi',
        'status': 'live',
        'page_size': '50',
      });

      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/search/?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Eventbrite API error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();
      
      if (!data.events || !Array.isArray(data.events)) {
        console.warn('No events found in Eventbrite response');
        return [];
      }

      return data.events.map((event: any) => this.transformEvent(event));
    } catch (error) {
      console.error('Error fetching Eventbrite events:', error);
      return [];
    }
  }

  private transformEvent(event: any): SimpleEvent {
    const venue = event.venue || {};
    
    return {
      id: event.id,
      name: event.name?.text || 'Untitled Event',
      description: event.description?.text || '',
      startDate: event.start?.local || new Date().toISOString(),
      endDate: event.end?.local || new Date().toISOString(),
      venue: {
        name: venue.name || 'TBA',
        address: venue.address?.localized_address_display || '',
        city: venue.address?.city || 'Santa Cruz',
      },
      image: event.logo?.url,
      url: event.url || '',
      price: {
        min: event.ticket_availability?.minimum_ticket_price?.major_value 
          ? parseFloat(event.ticket_availability.minimum_ticket_price.major_value) 
          : 0,
        max: event.ticket_availability?.maximum_ticket_price?.major_value 
          ? parseFloat(event.ticket_availability.maximum_ticket_price.major_value) 
          : 0,
        isFree: event.is_free || false,
      },
      category: event.category?.name || 'General',
      source: 'eventbrite',
    };
  }
}

export const simpleEventbriteService = new SimpleEventbriteService();
