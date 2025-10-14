/**
 * Google Places API - Activity Importer
 * 
 * This script fetches activities (POIs, attractions, museums, etc.) from Google Places API
 * 
 * Usage:
 *   npx tsx scripts/import-activities-google.ts csv
 *   npx tsx scripts/import-activities-google.ts airtable
 *   npx tsx scripts/import-activities-google.ts sync
 */

import { writeFileSync } from 'fs';
import { tables } from '../src/lib/airtable';

// Configuration
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SANTA_CRUZ_CENTER = { lat: 36.9741, lng: -122.0308 };

// Categories to search for
const ACTIVITY_CATEGORIES = [
  { type: 'tourist_attraction', name: 'Attractions', radius: 15000 },
  { type: 'museum', name: 'Museums', radius: 15000 },
  { type: 'park', name: 'Parks', radius: 15000 },
  { type: 'amusement_park', name: 'Amusement Parks', radius: 15000 },
  { type: 'aquarium', name: 'Aquariums', radius: 15000 },
  { type: 'art_gallery', name: 'Art Galleries', radius: 10000 },
  { type: 'zoo', name: 'Zoos', radius: 15000 },
  { type: 'shopping_mall', name: 'Shopping', radius: 10000 },
  { type: 'movie_theater', name: 'Theaters', radius: 10000 },
  { type: 'bowling_alley', name: 'Entertainment', radius: 10000 },
];

interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  user_ratings_total?: number;
  types: string[];
  photos?: Array<{ photo_reference: string }>;
  business_status?: string;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  url: string; // Google Maps URL
  rating?: number;
  user_ratings_total?: number;
  opening_hours?: {
    weekday_text: string[];
    open_now?: boolean;
  };
  photos?: Array<{ photo_reference: string }>;
  types: string[];
  geometry: {
    location: { lat: number; lng: number };
  };
  editorial_summary?: {
    overview?: string;
  };
}

interface Activity {
  googlePlaceId: string;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  googleMapsUrl: string;
  rating?: number;
  reviewCount?: number;
  hours?: string;
  tags: string[];
  photoUrls: string[];
  category: string; // Main category
}

// Determine main category from types
function getCategoryFromTypes(types: string[]): string {
  const categoryMap: Record<string, string> = {
    'tourist_attraction': 'Attractions',
    'museum': 'Museums',
    'park': 'Parks & Nature',
    'amusement_park': 'Entertainment',
    'aquarium': 'Marine Life',
    'art_gallery': 'Arts & Culture',
    'zoo': 'Wildlife',
    'shopping_mall': 'Shopping',
    'movie_theater': 'Entertainment',
    'bowling_alley': 'Entertainment',
    'natural_feature': 'Parks & Nature',
    'point_of_interest': 'Attractions',
  };

  for (const type of types) {
    if (categoryMap[type]) {
      return categoryMap[type];
    }
  }

  return 'Other';
}

// Extract tags from Google types
function extractTags(types: string[], category: string): string[] {
  const tags: string[] = [category];

  const tagMap: Record<string, string> = {
    'outdoor': 'Outdoor',
    'indoor': 'Indoor',
    'family_friendly': 'Family-Friendly',
    'historical': 'Historical',
    'educational': 'Educational',
    'scenic': 'Scenic',
    'interactive': 'Interactive',
    'free_admission': 'Free',
  };

  // Add relevant tags based on types
  if (types.includes('park') || types.includes('natural_feature')) {
    tags.push('Outdoor', 'Nature');
  }
  if (types.includes('museum') || types.includes('art_gallery')) {
    tags.push('Indoor', 'Educational', 'Rainy Day');
  }
  if (types.includes('amusement_park') || types.includes('aquarium')) {
    tags.push('Family-Friendly', 'Indoor');
  }

  return [...new Set(tags)]; // Remove duplicates
}

// Get photo URL
function getPhotoUrl(photoReference: string, maxWidth: number = 800): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
}

// Search for activities by category
async function searchActivities(category: typeof ACTIVITY_CATEGORIES[0]): Promise<GooglePlace[]> {
  console.log(`🔍 Searching for ${category.name}...`);

  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
  url.searchParams.set('location', `${SANTA_CRUZ_CENTER.lat},${SANTA_CRUZ_CENTER.lng}`);
  url.searchParams.set('radius', category.radius.toString());
  url.searchParams.set('type', category.type);
  url.searchParams.set('key', GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status} - ${data.error_message}`);
  }

  console.log(`   Found ${data.results?.length || 0} ${category.name}`);
  return data.results || [];
}

// Get detailed info for an activity
async function getActivityDetails(placeId: string): Promise<GooglePlaceDetails> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set(
    'fields',
    'place_id,name,formatted_address,formatted_phone_number,website,url,rating,user_ratings_total,opening_hours,photos,types,geometry,editorial_summary'
  );
  url.searchParams.set('key', GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Failed to get details for ${placeId}: ${data.status}`);
  }

  return data.result;
}

// Transform Google data to our format
function transformActivity(details: GooglePlaceDetails): Activity {
  const photoUrls = details.photos?.slice(0, 3).map((p) => getPhotoUrl(p.photo_reference)) || [];
  const category = getCategoryFromTypes(details.types);
  const tags = extractTags(details.types, category);

  return {
    googlePlaceId: details.place_id,
    name: details.name,
    description: details.editorial_summary?.overview,
    address: details.formatted_address,
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
    phone: details.formatted_phone_number,
    website: details.website,
    googleMapsUrl: details.url,
    rating: details.rating,
    reviewCount: details.user_ratings_total,
    hours: details.opening_hours?.weekday_text.join('; '),
    tags,
    photoUrls,
    category,
  };
}

// Save to CSV
function saveToCSV(
  activities: Activity[],
  filename: string = 'santacruz-activities-google.csv'
) {
  const headers = [
    'Name',
    'Category',
    'Tags',
    'Description',
    'Address',
    'Latitude',
    'Longitude',
    'Phone',
    'Website',
    'GoogleMapsUrl',
    'Hours',
    'Rating',
    'ReviewCount',
    'PhotoUrl1',
    'PhotoUrl2',
    'PhotoUrl3',
    'GooglePlaceId',
  ];

  const rows = activities.map((a) => [
    a.name,
    a.category,
    a.tags.join(', '),
    a.description || '',
    a.address,
    a.latitude.toString(),
    a.longitude.toString(),
    a.phone || '',
    a.website || '',
    a.googleMapsUrl,
    a.hours || '',
    a.rating?.toString() || '',
    a.reviewCount?.toString() || '',
    a.photoUrls[0] || '',
    a.photoUrls[1] || '',
    a.photoUrls[2] || '',
    a.googlePlaceId,
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  writeFileSync(filename, csv);
  console.log(`✅ Saved ${activities.length} activities to ${filename}`);
}

// Import to Airtable
async function importToAirtable(activities: Activity[]) {
  console.log(`📤 Importing ${activities.length} activities to Airtable...`);

  if (!tables.rainyActivities) {
    console.error('❌ Airtable table not configured');
    return;
  }

  // Check for duplicates by name
  const existingRecords = await tables.rainyActivities.select().all();
  const existingNames = new Set(
    existingRecords.map((r) => r.fields.Title?.toString().toLowerCase())
  );

  let imported = 0;
  let skipped = 0;

  for (const activity of activities) {
    if (existingNames.has(activity.name.toLowerCase())) {
      console.log(`   ⏭️  Skipped (duplicate): ${activity.name}`);
      skipped++;
      continue;
    }

    try {
      await tables.rainyActivities.create({
        Title: activity.name,
        VenueName: activity.name,
        Tags: activity.tags,
        Notes: activity.description || `${activity.category} in Santa Cruz`,
        Cost: 0, // Unknown, will need manual update
        Duration: '1-2 hours', // Default
        Website: activity.website,
        Address: activity.address,
        Hours: activity.hours,
        Phone: activity.phone,
        // Weather fields - set reasonable defaults
        IndoorOutdoor: activity.category.includes('Park') ? 'Outdoor' : 'Indoor',
        RainOk: activity.category.includes('Park') ? false : true,
      } as any); // Type assertion needed for dynamic Airtable fields

      console.log(`   ✅ Imported: ${activity.name}`);
      imported++;
    } catch (error) {
      console.error(`   ❌ Failed to import ${activity.name}:`, error);
    }

    // Rate limiting (Airtable allows 5 requests/second)
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`\n✅ Import complete: ${imported} imported, ${skipped} skipped`);
}

// Main execution
async function main() {
  if (!GOOGLE_API_KEY) {
    console.error('❌ Error: GOOGLE_PLACES_API_KEY not found in environment variables');
    console.error('   Add it to .env.local: GOOGLE_PLACES_API_KEY=your_key_here');
    process.exit(1);
  }

  const mode = process.argv[2] || 'csv';
  console.log(`\n🚀 Starting Google Places activity import (mode: ${mode})\n`);

  // Step 1: Search all categories
  const allPlaces: GooglePlace[] = [];
  const seenPlaceIds = new Set<string>();

  for (const category of ACTIVITY_CATEGORIES) {
    try {
      const places = await searchActivities(category);

      for (const place of places) {
        if (!seenPlaceIds.has(place.place_id)) {
          allPlaces.push(place);
          seenPlaceIds.add(place.place_id);
        }
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error searching ${category.name}:`, error);
    }
  }

  console.log(`\n📊 Total unique activities found: ${allPlaces.length}`);

  // Step 2: Get detailed info
  console.log(`\n📝 Fetching detailed information...`);
  const activities: Activity[] = [];

  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i];
    console.log(`   [${i + 1}/${allPlaces.length}] ${place.name}...`);

    try {
      const details = await getActivityDetails(place.place_id);
      const activity = transformActivity(details);
      activities.push(activity);
    } catch (error) {
      console.error(`   ❌ Failed: ${error}`);
    }

    // Rate limiting (strict for Details API)
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Successfully processed ${activities.length} activities`);

  // Step 3: Save or import
  if (mode === 'csv') {
    saveToCSV(activities);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the CSV file');
    console.log('   2. Add weather suitability manually');
    console.log('   3. Import to Airtable manually');
    console.log('   4. Or run: npx tsx scripts/import-activities-google.ts airtable');
  } else if (mode === 'airtable') {
    await importToAirtable(activities);
  } else {
    console.error(`❌ Unknown mode: ${mode}`);
    console.error('   Use: csv or airtable');
    process.exit(1);
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);

