// scripts/import-activities.ts
// Run with: npx tsx scripts/import-activities.ts

import { tables } from '../src/lib/airtable';

const sampleActivities = [
  {
    Title: 'Santa Cruz Beach Boardwalk',
    VenueName: 'Beach Boardwalk',
    Tags: ['beach', 'amusement park', 'family'],
    Cost: 25,
    Duration: '3-4 hours',
    Notes: 'Classic Santa Cruz experience with rides and games',
    Website: 'https://beachboardwalk.com',
    Instagram: 'https://instagram.com/beachboardwalk',
    WeatherSuitability: ['Perfect Sunny', 'Hot Sunny', 'Partly Cloudy'],
    IdealTemp_Min: 65,
    IdealTemp_Max: 90,
    IndoorOutdoor: 'Mixed',
    RainOk: false,
    WindSensitive: true,
    RequiresGoodVisibility: true,
    WeatherBoost: 1.5,
  },
  // Add more activities here...
];

async function importActivities() {
  console.log('Importing activities to Airtable...');
  
  try {
    // Import in batches of 10 (Airtable limit)
    const batchSize = 10;
    for (let i = 0; i < sampleActivities.length; i += batchSize) {
      const batch = sampleActivities.slice(i, i + batchSize);
      await tables.rainyActivities.create(
        batch.map(activity => ({ fields: activity }))
      );
      console.log(`Imported ${Math.min(i + batchSize, sampleActivities.length)} of ${sampleActivities.length}`);
    }
    
    console.log('✅ Import complete!');
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

importActivities();

