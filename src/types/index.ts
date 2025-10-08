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
}

// Helper type for filtering
export interface ActivityFilters {
  tags: string[];
  maxCost: number | null;
  duration: string[];
  indoorOnly: boolean;
}