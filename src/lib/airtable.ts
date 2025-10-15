import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
  .base(process.env.AIRTABLE_BASE_ID!);

export const tables = {
  // Master Activities table (new unified table)
  activities: process.env.AIRTABLE_ACTIVITIES_TABLE
    ? base(process.env.AIRTABLE_ACTIVITIES_TABLE)
    : null,
  
  // Legacy tables (kept for backwards compatibility)
  venues: base('Venues'),
  rainyActivities: base(process.env.AIRTABLE_RAINY_TABLE || 'RainyActivities'),
  sunnyActivities: process.env.AIRTABLE_SUNNY_TABLE
    ? base(process.env.AIRTABLE_SUNNY_TABLE)
    : null,
  
  // Other tables
  restaurants: process.env.AIRTABLE_RESTAURANTS_TABLE 
    ? base(process.env.AIRTABLE_RESTAURANTS_TABLE) 
    : null,
  wellness: process.env.AIRTABLE_WELLNESS_TABLE
    ? base(process.env.AIRTABLE_WELLNESS_TABLE)
    : null,
  deals: process.env.AIRTABLE_DEALS_TABLE
    ? base(process.env.AIRTABLE_DEALS_TABLE)
    : null,
  favorites: base(process.env.AIRTABLE_FAVORITES_TABLE || 'Favorites'),
  reviews: base(process.env.AIRTABLE_REVIEWS_TABLE || 'Reviews'),
  trips: base(process.env.AIRTABLE_TRIPS_TABLE || 'Trips'),
  tripItems: base(process.env.AIRTABLE_TRIP_ITEMS_TABLE || 'TripItems'),
} as const;