/**
 * Google Places API - Restaurant Importer
 * 
 * This script fetches restaurants from Google Places API and either:
 * - Option A: Saves to CSV for manual review
 * - Option B: Imports directly to Airtable
 * 
 * Usage:
 *   npx tsx scripts/import-restaurants-google.ts csv
 *   npx tsx scripts/import-restaurants-google.ts airtable
 *   npx tsx scripts/import-restaurants-google.ts sync (monthly updates)
 */

import { writeFileSync } from 'fs';
import { tables } from '../src/lib/airtable';

// Configuration
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SANTA_CRUZ_CENTER = { lat: 36.9741, lng: -122.0308 };
const SEARCH_RADIUS = 15000; // 15km covers all of Santa Cruz County

// Santa Cruz areas to search
const SEARCH_AREAS = [
  { name: 'Downtown Santa Cruz', lat: 36.9741, lng: -122.0308, radius: 3000 },
  { name: 'Westside Santa Cruz', lat: 36.9700, lng: -122.0450, radius: 3000 },
  { name: 'Eastside/Seabright', lat: 36.9650, lng: -121.9850, radius: 3000 },
  { name: 'Capitola', lat: 36.9752, lng: -121.9532, radius: 2000 },
  { name: 'Aptos', lat: 36.9771, lng: -121.8993, radius: 2000 },
  { name: 'Scotts Valley', lat: 37.0510, lng: -122.0147, radius: 2000 },
  { name: 'Soquel', lat: 37.0000, lng: -121.9500, radius: 2000 },
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
  price_level?: number;
  types: string[];
  photos?: Array<{ photo_reference: string }>;
  business_status?: string;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  url: string; // Google Maps URL
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: {
    weekday_text: string[];
    open_now?: boolean;
  };
  photos?: Array<{ photo_reference: string }>;
  types: string[];
  geometry: {
    location: { lat: number; lng: number };
  };
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
  }>;
}

interface Restaurant {
  googlePlaceId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  googleMapsUrl: string;
  rating?: number;
  reviewCount?: number;
  priceLevel?: string; // $, $$, $$$, $$$$
  cuisine: string[];
  hours?: string;
  openNow?: boolean;
  photoUrls: string[];
}

// Cuisine type mapping from Google types
function extractCuisineTypes(types: string[]): string[] {
  const cuisineMap: Record<string, string> = {
    'restaurant': 'Restaurant',
    'food': 'Food',
    'cafe': 'Cafe',
    'bakery': 'Bakery',
    'bar': 'Bar',
    'meal_takeaway': 'Takeout',
    'meal_delivery': 'Delivery',
    'pizza': 'Pizza',
    'sandwich': 'Sandwiches',
    'seafood_restaurant': 'Seafood',
    'steak_house': 'Steakhouse',
    'sushi_restaurant': 'Sushi',
    'italian_restaurant': 'Italian',
    'mexican_restaurant': 'Mexican',
    'chinese_restaurant': 'Chinese',
    'japanese_restaurant': 'Japanese',
    'thai_restaurant': 'Thai',
    'indian_restaurant': 'Indian',
    'french_restaurant': 'French',
    'mediterranean_restaurant': 'Mediterranean',
    'middle_eastern_restaurant': 'Middle Eastern',
    'vegetarian_restaurant': 'Vegetarian',
    'vegan_restaurant': 'Vegan',
    'breakfast_restaurant': 'Breakfast',
    'brunch_restaurant': 'Brunch',
    'coffee_shop': 'Coffee',
  };

  const cuisines: string[] = [];
  for (const type of types) {
    if (cuisineMap[type]) {
      cuisines.push(cuisineMap[type]);
    }
  }

  return cuisines.length > 0 ? cuisines : ['Restaurant'];
}

// Convert price level to string
function formatPriceLevel(level?: number): string {
  if (!level) return '$$';
  return '$'.repeat(level);
}

// Get photo URL
function getPhotoUrl(photoReference: string, maxWidth: number = 800): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
}

// Search for restaurants in an area
async function searchRestaurants(area: typeof SEARCH_AREAS[0]): Promise<GooglePlace[]> {
  console.log(`🔍 Searching ${area.name}...`);
  
  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
  url.searchParams.set('location', `${area.lat},${area.lng}`);
  url.searchParams.set('radius', area.radius.toString());
  url.searchParams.set('type', 'restaurant');
  url.searchParams.set('key', GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status} - ${data.error_message}`);
  }

  console.log(`   Found ${data.results?.length || 0} restaurants in ${area.name}`);
  return data.results || [];
}

// Get detailed info for a restaurant
async function getRestaurantDetails(placeId: string): Promise<GooglePlaceDetails> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'place_id,name,formatted_address,formatted_phone_number,website,url,rating,user_ratings_total,price_level,opening_hours,photos,types,geometry,reviews');
  url.searchParams.set('key', GOOGLE_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Failed to get details for ${placeId}: ${data.status}`);
  }

  return data.result;
}

// Transform Google data to our format
function transformRestaurant(details: GooglePlaceDetails): Restaurant {
  const photoUrls = details.photos?.slice(0, 3).map(p => getPhotoUrl(p.photo_reference)) || [];
  
  return {
    googlePlaceId: details.place_id,
    name: details.name,
    address: details.formatted_address,
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
    phone: details.formatted_phone_number,
    website: details.website,
    googleMapsUrl: details.url,
    rating: details.rating,
    reviewCount: details.user_ratings_total,
    priceLevel: formatPriceLevel(details.price_level),
    cuisine: extractCuisineTypes(details.types),
    hours: details.opening_hours?.weekday_text.join('; '),
    openNow: details.opening_hours?.open_now,
    photoUrls,
  };
}

// Save to CSV
function saveToCSV(restaurants: Restaurant[], filename: string = 'santacruz-restaurants-google.csv') {
  const headers = [
    'Name', 'Cuisine', 'PriceLevel', 'Address', 'Latitude', 'Longitude',
    'Phone', 'Website', 'GoogleMapsUrl', 'Hours', 'Rating', 'ReviewCount',
    'PhotoUrl1', 'PhotoUrl2', 'PhotoUrl3', 'GooglePlaceId'
  ];

  const rows = restaurants.map(r => [
    r.name,
    r.cuisine.join(', '),
    r.priceLevel,
    r.address,
    r.latitude.toString(),
    r.longitude.toString(),
    r.phone || '',
    r.website || '',
    r.googleMapsUrl,
    r.hours || '',
    r.rating?.toString() || '',
    r.reviewCount?.toString() || '',
    r.photoUrls[0] || '',
    r.photoUrls[1] || '',
    r.photoUrls[2] || '',
    r.googlePlaceId,
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  writeFileSync(filename, csv);
  console.log(`✅ Saved ${restaurants.length} restaurants to ${filename}`);
}

// Import to Airtable
async function importToAirtable(restaurants: Restaurant[]) {
  console.log(`📤 Importing ${restaurants.length} restaurants to Airtable...`);

  // Check for duplicates by name
  const existingRecords = await tables.restaurants.select().all();
  const existingNames = new Set(existingRecords.map(r => r.fields.Name?.toString().toLowerCase()));

  let imported = 0;
  let skipped = 0;

  for (const restaurant of restaurants) {
    if (existingNames.has(restaurant.name.toLowerCase())) {
      console.log(`   ⏭️  Skipped (duplicate): ${restaurant.name}`);
      skipped++;
      continue;
    }

    try {
      await tables.restaurants.create({
        Name: restaurant.name,
        Cuisine: restaurant.cuisine.join(', '),
        PriceLevel: restaurant.priceLevel,
        Address: restaurant.address,
        Latitude: restaurant.latitude,
        Longitude: restaurant.longitude,
        Phone: restaurant.phone,
        Website: restaurant.website,
        GoogleMapsUrl: restaurant.googleMapsUrl,
        Hours: restaurant.hours,
        GoogleRating: restaurant.rating,
        GoogleReviewCount: restaurant.reviewCount,
        Image: restaurant.photoUrls[0],
        GooglePlaceId: restaurant.googlePlaceId,
      });

      console.log(`   ✅ Imported: ${restaurant.name}`);
      imported++;
    } catch (error) {
      console.error(`   ❌ Failed to import ${restaurant.name}:`, error);
    }

    // Rate limiting (Airtable allows 5 requests/second)
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  console.log(`\n✅ Import complete: ${imported} imported, ${skipped} skipped`);
}

// Sync (update existing records)
async function syncWithAirtable(restaurants: Restaurant[]) {
  console.log(`🔄 Syncing ${restaurants.length} restaurants with Airtable...`);

  const existingRecords = await tables.restaurants.select().all();
  const recordsByPlaceId = new Map(
    existingRecords.map(r => [r.fields.GooglePlaceId?.toString(), r])
  );

  let updated = 0;
  let added = 0;

  for (const restaurant of restaurants) {
    const existingRecord = recordsByPlaceId.get(restaurant.googlePlaceId);

    if (existingRecord) {
      // Update hours, rating, and status
      try {
        await tables.restaurants.update(existingRecord.id, {
          Hours: restaurant.hours,
          GoogleRating: restaurant.rating,
          GoogleReviewCount: restaurant.reviewCount,
          Phone: restaurant.phone,
          Website: restaurant.website,
        });
        console.log(`   🔄 Updated: ${restaurant.name}`);
        updated++;
      } catch (error) {
        console.error(`   ❌ Failed to update ${restaurant.name}:`, error);
      }
    } else {
      // New restaurant - add it
      try {
        await tables.restaurants.create({
          Name: restaurant.name,
          Cuisine: restaurant.cuisine.join(', '),
          PriceLevel: restaurant.priceLevel,
          Address: restaurant.address,
          Latitude: restaurant.latitude,
          Longitude: restaurant.longitude,
          Phone: restaurant.phone,
          Website: restaurant.website,
          GoogleMapsUrl: restaurant.googleMapsUrl,
          Hours: restaurant.hours,
          GoogleRating: restaurant.rating,
          GoogleReviewCount: restaurant.reviewCount,
          Image: restaurant.photoUrls[0],
          GooglePlaceId: restaurant.googlePlaceId,
        });
        console.log(`   ➕ Added new: ${restaurant.name}`);
        added++;
      } catch (error) {
        console.error(`   ❌ Failed to add ${restaurant.name}:`, error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 250));
  }

  console.log(`\n✅ Sync complete: ${updated} updated, ${added} added`);
}

// Main execution
async function main() {
  if (!GOOGLE_API_KEY) {
    console.error('❌ Error: GOOGLE_PLACES_API_KEY not found in environment variables');
    console.error('   Add it to .env.local: GOOGLE_PLACES_API_KEY=your_key_here');
    process.exit(1);
  }

  const mode = process.argv[2] || 'csv';
  console.log(`\n🚀 Starting Google Places import (mode: ${mode})\n`);

  // Step 1: Search all areas
  const allPlaces: GooglePlace[] = [];
  const seenPlaceIds = new Set<string>();

  for (const area of SEARCH_AREAS) {
    const places = await searchRestaurants(area);
    
    for (const place of places) {
      if (!seenPlaceIds.has(place.place_id)) {
        allPlaces.push(place);
        seenPlaceIds.add(place.place_id);
      }
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n📊 Total unique restaurants found: ${allPlaces.length}`);

  // Step 2: Get detailed info
  console.log(`\n📝 Fetching detailed information...`);
  const restaurants: Restaurant[] = [];

  for (let i = 0; i < allPlaces.length; i++) {
    const place = allPlaces[i];
    console.log(`   [${i + 1}/${allPlaces.length}] ${place.name}...`);

    try {
      const details = await getRestaurantDetails(place.place_id);
      const restaurant = transformRestaurant(details);
      restaurants.push(restaurant);
    } catch (error) {
      console.error(`   ❌ Failed: ${error}`);
    }

    // Rate limiting (strict for Details API)
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Successfully processed ${restaurants.length} restaurants`);

  // Step 3: Save or import
  if (mode === 'csv') {
    saveToCSV(restaurants);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the CSV file');
    console.log('   2. Import to Airtable manually');
    console.log('   3. Or run: npx tsx scripts/import-restaurants-google.ts airtable');
  } else if (mode === 'airtable') {
    await importToAirtable(restaurants);
  } else if (mode === 'sync') {
    await syncWithAirtable(restaurants);
  } else {
    console.error(`❌ Unknown mode: ${mode}`);
    console.error('   Use: csv, airtable, or sync');
    process.exit(1);
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);

