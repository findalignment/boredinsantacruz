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