// Mock events for Santa Cruz - fallback when Eventbrite API is not working
export interface MockEvent {
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
  source: 'mock' | 'eventbrite' | 'manual';
}

export const mockSantaCruzEvents: MockEvent[] = [
  {
    id: 'mock-1',
    name: 'Santa Cruz Farmers Market',
    description: 'Local farmers market featuring fresh produce, artisan goods, and live music every Wednesday and Saturday.',
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // Tomorrow + 4 hours
    venue: {
      name: 'Downtown Santa Cruz',
      address: 'Cedar Street & Lincoln Street',
      city: 'Santa Cruz, CA',
    },
    image: '/images/events/farmers-market.jpg',
    url: '#',
    price: {
      min: 0,
      max: 0,
      isFree: true,
    },
    category: 'Food & Drink',
    source: 'mock',
  },
  {
    id: 'mock-2',
    name: 'Boardwalk Beach Concert Series',
    description: 'Free outdoor concerts featuring local and touring bands at the Santa Cruz Beach Boardwalk.',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // Next week + 3 hours
    venue: {
      name: 'Santa Cruz Beach Boardwalk',
      address: '400 Beach St',
      city: 'Santa Cruz, CA',
    },
    image: '/images/events/boardwalk-concert.jpg',
    url: '#',
    price: {
      min: 0,
      max: 0,
      isFree: true,
    },
    category: 'Music',
    source: 'mock',
  },
  {
    id: 'mock-3',
    name: 'Capitola Art & Wine Festival',
    description: 'Annual festival celebrating local artists, wineries, and the vibrant Capitola community.',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // In 2 weeks
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(), // In 2 weeks + 6 hours
    venue: {
      name: 'Capitola Village',
      address: 'Esplanade & Capitola Ave',
      city: 'Capitola, CA',
    },
    image: '/images/events/art-wine-festival.jpg',
    url: '#',
    price: {
      min: 15,
      max: 25,
      isFree: false,
    },
    category: 'Arts & Culture',
    source: 'mock',
  },
  {
    id: 'mock-4',
    name: 'Surf Contest - Steamer Lane',
    description: 'Monthly surf competition at the famous Steamer Lane break. Open to all skill levels.',
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // In 3 weeks
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(), // In 3 weeks + 8 hours
    venue: {
      name: 'Steamer Lane',
      address: 'West Cliff Drive',
      city: 'Santa Cruz, CA',
    },
    image: '/images/events/surf-contest.jpg',
    url: '#',
    price: {
      min: 25,
      max: 50,
      isFree: false,
    },
    category: 'Sports',
    source: 'mock',
  },
  {
    id: 'mock-5',
    name: 'Downtown Santa Cruz Night Market',
    description: 'Evening market featuring food trucks, local vendors, live music, and family activities.',
    startDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(), // In 4 weeks
    endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // In 4 weeks + 4 hours
    venue: {
      name: 'Pacific Avenue',
      address: 'Pacific Avenue & Water Street',
      city: 'Santa Cruz, CA',
    },
    image: '/images/events/night-market.jpg',
    url: '#',
    price: {
      min: 0,
      max: 0,
      isFree: true,
    },
    category: 'Food & Drink',
    source: 'mock',
  },
];

export function getMockEvents(): MockEvent[] {
  return mockSantaCruzEvents;
}
