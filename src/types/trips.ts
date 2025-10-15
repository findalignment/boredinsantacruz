// Trip Planner Types

export interface Trip {
  id: string;
  name: string;
  description?: string;
  userId: string;
  collaborators?: string; // Comma-separated emails
  coverImageUrl?: string;
  startDate?: string;
  endDate?: string;
  isPublic: boolean;
  shareToken?: string;
  created: string;
  updated: string;
}

export interface TripItem {
  id: string;
  tripId: string;
  itemType: 'Activity' | 'Restaurant' | 'Note' | 'Custom';
  referenceId?: string;
  itemName: string;
  itemData?: string; // JSON string with cached data
  day?: number;
  order: number;
  notes?: string;
  created: string;
}

export interface TripWithItems extends Trip {
  items: TripItem[];
}

export interface CreateTripInput {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isPublic?: boolean;
}

export interface AddItemToTripInput {
  tripId: string;
  itemType: 'Activity' | 'Restaurant' | 'Note' | 'Custom';
  referenceId?: string;
  itemName: string;
  itemData?: any;
  day?: number;
  notes?: string;
}

