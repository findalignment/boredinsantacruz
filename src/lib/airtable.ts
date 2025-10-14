import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
  .base(process.env.AIRTABLE_BASE_ID!);

export const tables = {
  venues: base('Venues'),
  rainyActivities: base(process.env.AIRTABLE_RAINY_TABLE || 'RainyActivities'),
  restaurants: process.env.AIRTABLE_RESTAURANTS_TABLE 
    ? base(process.env.AIRTABLE_RESTAURANTS_TABLE) 
    : null,
  sunnyActivities: process.env.AIRTABLE_SUNNY_TABLE
    ? base(process.env.AIRTABLE_SUNNY_TABLE)
    : null,
  favorites: base(process.env.AIRTABLE_FAVORITES_TABLE || 'Favorites'),
  reviews: base(process.env.AIRTABLE_REVIEWS_TABLE || 'Reviews'),
} as const;