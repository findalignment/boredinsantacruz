// Trip templates for quick start

export interface TripTemplate {
  id: string;
  name: string;
  description: string;
  emoji: string;
  duration: number; // days
  budget: 'budget' | 'moderate' | 'luxury';
  activities: string[];
  tags: string[];
}

export const TRIP_TEMPLATES: TripTemplate[] = [
  {
    id: 'romantic-weekend',
    name: 'Romantic Weekend',
    emoji: '💕',
    description: 'Perfect for couples seeking beautiful views, intimate dining, and sunset strolls',
    duration: 2,
    budget: 'moderate',
    activities: [
      'Sunset at Natural Bridges State Beach',
      'Wine tasting at local wineries',
      'Romantic dinner with ocean views',
      'Walk along West Cliff Drive',
      'Brunch at The Picnic Basket',
      'Visit Mystery Spot',
    ],
    tags: ['couples', 'romantic', 'relaxed', 'scenic'],
  },
  {
    id: 'family-fun',
    name: 'Family Fun Adventure',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Kid-friendly activities, beach time, and family entertainment',
    duration: 3,
    budget: 'moderate',
    activities: [
      'Beach Boardwalk rides and games',
      'Santa Cruz Wharf for sea lions',
      'Seymour Marine Discovery Center',
      'Natural Bridges tide pools',
      'Family-friendly restaurants',
      'Mini golf or arcade',
    ],
    tags: ['family', 'kids', 'fun', 'active'],
  },
  {
    id: 'adventure-seeker',
    name: 'Adventure Seeker',
    emoji: '🏄‍♂️',
    description: 'High-energy activities, surfing, hiking, and outdoor adventures',
    duration: 3,
    budget: 'moderate',
    activities: [
      'Surf lessons at Cowell Beach',
      'Kayaking in the harbor',
      'Mountain biking in Wilder Ranch',
      'Hiking in Henry Cowell Redwoods',
      'Rock climbing or bouldering',
      'Stand-up paddleboarding',
    ],
    tags: ['adventure', 'active', 'outdoor', 'sports'],
  },
  {
    id: 'foodie-tour',
    name: 'Foodie Paradise',
    emoji: '🍴',
    description: 'Culinary exploration with top restaurants, cafes, and local food scene',
    duration: 2,
    budget: 'luxury',
    activities: [
      'Farm-to-table dinner at Laili',
      'Breakfast at Zachary\'s',
      'Coffee at Verve',
      'Farmers Market on Wednesday',
      'Wine & tapas at Cellar Door',
      'Ice cream at Penny Ice Creamery',
    ],
    tags: ['food', 'dining', 'culinary', 'luxury'],
  },
  {
    id: 'budget-escape',
    name: 'Budget Beach Escape',
    emoji: '💰',
    description: 'Affordable fun with free beaches, parks, and budget-friendly eats',
    duration: 2,
    budget: 'budget',
    activities: [
      'Free beach day (Cowell, Main, Twin Lakes)',
      'Walk West Cliff Drive',
      'Free tide pool exploration',
      'Picnic lunch at park',
      'Downtown Pacific Avenue browsing',
      'Budget-friendly tacos',
    ],
    tags: ['budget', 'beach', 'outdoor', 'free'],
  },
  {
    id: 'nature-wellness',
    name: 'Nature & Wellness',
    emoji: '🧘‍♀️',
    description: 'Peaceful retreat with nature walks, yoga, healthy food, and relaxation',
    duration: 3,
    budget: 'moderate',
    activities: [
      'Morning yoga on the beach',
      'Redwood forest hiking',
      'Healthy breakfast bowls',
      'Meditation at sunset',
      'Spa or massage',
      'Farm-to-table organic dining',
    ],
    tags: ['wellness', 'nature', 'relaxation', 'healthy'],
  },
  {
    id: 'solo-explorer',
    name: 'Solo Explorer',
    emoji: '🎒',
    description: 'Perfect for independent travelers wanting to discover Santa Cruz at their own pace',
    duration: 2,
    budget: 'moderate',
    activities: [
      'Self-guided walking tour',
      'Coffee shop hopping',
      'Museum visits',
      'Beach reading time',
      'Local art galleries',
      'Casual dining alone-friendly spots',
    ],
    tags: ['solo', 'flexible', 'cultural', 'relaxed'],
  },
  {
    id: 'photography-tour',
    name: 'Photography Tour',
    emoji: '📸',
    description: 'Capture the most photogenic spots in Santa Cruz',
    duration: 2,
    budget: 'budget',
    activities: [
      'Sunrise at Natural Bridges',
      'Santa Cruz Wharf sunset',
      'Lighthouse Point views',
      'Boardwalk at golden hour',
      'Redwood forest shots',
      'Downtown murals & street art',
    ],
    tags: ['photography', 'scenic', 'artistic', 'outdoor'],
  },
  {
    id: 'quick-getaway',
    name: 'Quick Day Trip',
    emoji: '⚡',
    description: 'Perfect 1-day itinerary to experience Santa Cruz highlights',
    duration: 1,
    budget: 'moderate',
    activities: [
      'Morning beach walk',
      'Brunch downtown',
      'Boardwalk or Wharf visit',
      'Afternoon shopping',
      'Sunset at West Cliff',
      'Dinner with ocean view',
    ],
    tags: ['day-trip', 'quick', 'highlights', 'efficient'],
  },
  {
    id: 'arts-culture',
    name: 'Arts & Culture',
    emoji: '🎨',
    description: 'Explore Santa Cruz\'s vibrant art scene, galleries, and cultural spots',
    duration: 2,
    budget: 'moderate',
    activities: [
      'MAH (Museum of Art & History)',
      'First Friday Art Walk',
      'Local galleries downtown',
      'Street art tour',
      'Live music venue',
      'Cultural dining experiences',
    ],
    tags: ['art', 'culture', 'museums', 'creative'],
  },
];

export function getTemplateById(id: string): TripTemplate | undefined {
  return TRIP_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByTag(tag: string): TripTemplate[] {
  return TRIP_TEMPLATES.filter(t => t.tags.includes(tag));
}

export function getTemplatesByDuration(days: number): TripTemplate[] {
  return TRIP_TEMPLATES.filter(t => t.duration <= days);
}

export function getTemplatesByBudget(budget: 'budget' | 'moderate' | 'luxury'): TripTemplate[] {
  return TRIP_TEMPLATES.filter(t => t.budget === budget);
}

