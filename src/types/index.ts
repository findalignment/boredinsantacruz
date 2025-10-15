// src/types/index.ts

export interface Venue {
  id: string;
  name: string;
  category: string[];
  indoor: boolean;
  neighborhood: string;
  queerFriendly: boolean;
  website?: string;
  instagram?: string;
  description: string;
  image?: {
    url: string;
    filename: string;
  }[];
  // Practical info
  address?: string;
  hours?: string;
  parking?: string;
  tips?: string;
  phone?: string;
}

export interface RainyActivity {
  id: string;
  title: string;
  venue: Venue; // This will be populated from the linked record
  venueName?: string; // Fallback if venue link breaks
  tags: string[];
  cost: number;
  duration: string;
  notes: string;
  writeUp?: string; // Long-form editorial content (separate from notes/description)
  website?: string | null;
  instagram?: string | null;
  imageUrl?: string | null;
  
  // Practical info (can override venue defaults)
  address?: string;
  hours?: string;
  parking?: string;
  tips?: string;
  phone?: string;
  
  // Weather-aware fields (Sprint 2)
  weatherSuitability?: string[]; // Which weather categories suit this activity
  idealTempMin?: number; // Minimum comfortable temp (°F)
  idealTempMax?: number; // Maximum comfortable temp (°F)
  indoorOutdoor?: 'Indoor' | 'Outdoor' | 'Mixed' | 'Covered';
  rainOk?: boolean; // Can do in light rain
  windSensitive?: boolean; // Avoid in high winds
  requiresGoodVisibility?: boolean; // Needs good visibility (avoid fog)
  weatherBoost?: number; // Score multiplier (0.5-2.0, default 1.0)
  
  // Tide-aware fields (Sprint 5)
  tidePreference?: 'low-tide' | 'high-tide' | 'mid-tide' | 'rising-tide' | 'falling-tide' | 'tide-change' | 'any-tide';
  tideCritical?: boolean; // Is tide timing critical for this activity?
  optimalTideHeight?: {
    min?: number; // Minimum height in feet
    max?: number; // Maximum height in feet
  };
}

// Activity with weather score
export interface ScoredActivity extends RainyActivity {
  weatherScore: number; // 0-100, how well it matches current weather
  matchReason?: string; // Why this activity is recommended
  weatherWarning?: string; // Any weather-related concerns
}

// Helper type for filtering
export interface ActivityFilters {
  tags: string[];
  maxCost: number | null;
  duration: string[];
  indoorOnly: boolean;
}

// Master Activity type (unified table with all fields)
export interface Activity {
  // Core fields
  id: string;
  name: string;
  description: string;
  writeUp?: string;
  category: string;
  cost: number;
  duration: string;
  indoorOutdoor: 'Indoor' | 'Outdoor' | 'Mixed' | 'Covered';
  
  // Location
  address?: string;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  city?: string;
  zipCode?: string;
  
  // Contact
  phone?: string;
  website?: string;
  instagram?: string;
  email?: string;
  
  // Practical info
  hours?: string;
  parkingInfo?: string;
  publicTransit?: string;
  
  // Media
  photoUrl?: string;
  imageUrl?: string; // Alias for photoUrl
  
  // Tags & categorization
  tags: string[];
  kidFriendly?: boolean;
  petFriendly?: boolean | string;
  accessibility?: string;
  
  // Weather-aware fields
  weatherPreferences?: string; // Comma-separated: "sunny,partly-cloudy,warm"
  rainOk?: boolean;
  idealTempMin?: number;
  idealTempMax?: number;
  windSensitive?: boolean;
  requiresGoodVisibility?: boolean;
  weatherBoost?: number;
  
  // Tide-aware fields
  tidePreference?: 'low-tide' | 'high-tide' | 'mid-tide' | 'rising-tide' | 'falling-tide' | 'tide-change' | 'any-tide';
  tideCritical?: boolean;
  
  // Insider tips & content
  tips?: string;
  bestTimeToVisit?: string;
  bestFeature?: string;
  whatToBring?: string;
  
  // Display & sorting
  staffPick?: boolean;
  featured?: boolean;
  priority?: number;
  sponsored?: boolean;
  
  // Ratings
  rating?: number;
  reviewCount?: number;
  
  // SEO
  metaDescription?: string;
  keywords?: string;
  slug?: string;
  
  // Admin
  status?: string;
  source?: string;
  
  // Optional advanced
  difficulty?: string;
  ageRestriction?: string;
  groupSize?: string;
  reservationRequired?: boolean;
  seasonalAvailability?: string;
}

// Activity with weather score
export interface ScoredMasterActivity extends Activity {
  weatherScore: number;
  matchReason?: string;
  weatherWarning?: string;
}

// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[]; // Mexican, Italian, American, etc.
  priceLevel: number; // 1-4 ($, $$, $$$, $$$$)
  neighborhood: string; // Downtown, Westside, Eastside, etc.
  
  // Contact & Location
  address: string;
  phone?: string;
  website?: string;
  instagram?: string;
  
  // Details
  description: string;
  writeUp?: string; // Long-form editorial content (separate from description)
  hours?: string;
  parking?: string;
  
  // Features
  dineIn: boolean;
  takeout: boolean;
  delivery: boolean;
  outdoor: boolean;
  reservations: boolean;
  
  // Insider Knowledge
  bestDish?: string;
  bestTime?: string; // "Weekday lunch", "Sunday brunch", etc.
  tips?: string;
  
  // Dietary
  vegetarianFriendly?: boolean;
  veganOptions?: boolean;
  glutenFree?: boolean;
  
  // Images
  image?: {
    url: string;
    filename: string;
  }[];
}

export interface RestaurantFilters {
  cuisine: string[];
  priceLevel: number[];
  neighborhood: string[];
  dietary: ('vegetarian' | 'vegan' | 'gluten-free')[];
  features: ('takeout' | 'delivery' | 'outdoor' | 'reservations')[];
}