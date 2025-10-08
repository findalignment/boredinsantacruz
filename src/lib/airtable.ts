import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
  .base(process.env.AIRTABLE_BASE_ID!);

export const tables = {
  venues: base('Venues'),
  rainyActivities: base(process.env.AIRTABLE_RAINY_TABLE || 'RainyActivities'),
};