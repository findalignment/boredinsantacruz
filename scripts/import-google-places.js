/**
 * Google Places API Import Script
 * 
 * This script fetches businesses from Google Places API and generates a CSV
 * that can be imported into Airtable.
 * 
 * Usage:
 *   node scripts/import-google-places.js wellness
 *   node scripts/import-google-places.js restaurants
 *   node scripts/import-google-places.js all
 * 
 * Prerequisites:
 *   1. Get Google Places API key from: https://console.cloud.google.com/
 *   2. Enable Places API in your Google Cloud project
 *   3. Add GOOGLE_PLACES_API_KEY to .env.local
 *   4. Install: npm install dotenv
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SANTA_CRUZ_CENTER = { lat: 36.9741, lng: -122.0308 };
const RADIUS = 20000; // 20km radius

// Category configurations
const CATEGORIES = {
  wellness: {
    types: ['gym', 'spa', 'physiotherapist', 'health'],
    keywords: ['yoga', 'pilates', 'massage', 'meditation', 'wellness', 'fitness'],
    outputFile: 'santa-cruz-wellness.csv',
  },
  restaurants: {
    types: ['restaurant', 'cafe', 'bar'],
    keywords: ['happy hour', 'brunch', 'dinner'],
    outputFile: 'santa-cruz-restaurants.csv',
  },
  activities: {
    types: ['tourist_attraction', 'museum', 'art_gallery', 'amusement_park', 'bowling_alley'],
    keywords: ['entertainment', 'fun', 'activity'],
    outputFile: 'santa-cruz-activities.csv',
  },
};

async function searchPlaces(type, keyword = null) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  
  let url = `${baseUrl}?location=${SANTA_CRUZ_CENTER.lat},${SANTA_CRUZ_CENTER.lng}&radius=${RADIUS}&type=${type}&key=${API_KEY}`;
  
  if (keyword) {
    url += `&keyword=${encodeURIComponent(keyword)}`;
  }

  console.log(`🔍 Searching for ${type}${keyword ? ` with keyword "${keyword}"` : ''}...`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      console.log(`   ✅ Found ${data.results.length} results`);
      return data.results;
    } else if (data.status === 'ZERO_RESULTS') {
      console.log(`   ℹ️  No results found`);
      return [];
    } else {
      console.error(`   ❌ Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      return [];
    }
  } catch (error) {
    console.error(`   ❌ Fetch error:`, error.message);
    return [];
  }
}

async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,price_level,types,reviews&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching details for ${placeId}:`, error.message);
    return null;
  }
}

function formatCsvValue(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function convertToCsv(places) {
  const headers = [
    'Name',
    'Address',
    'Phone',
    'Website',
    'Rating',
    'PriceLevel',
    'Types',
    'Hours',
    'PlaceId',
    'Latitude',
    'Longitude',
  ];

  const rows = places.map(place => [
    formatCsvValue(place.name),
    formatCsvValue(place.address),
    formatCsvValue(place.phone),
    formatCsvValue(place.website),
    formatCsvValue(place.rating),
    formatCsvValue(place.priceLevel),
    formatCsvValue(place.types?.join('; ')),
    formatCsvValue(place.hours),
    formatCsvValue(place.placeId),
    formatCsvValue(place.lat),
    formatCsvValue(place.lng),
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

async function importCategory(categoryName) {
  const config = CATEGORIES[categoryName];
  if (!config) {
    console.error(`❌ Unknown category: ${categoryName}`);
    console.log(`Available categories: ${Object.keys(CATEGORIES).join(', ')}`);
    return;
  }

  console.log(`\n📦 Importing ${categoryName}...`);
  console.log(`   Types: ${config.types.join(', ')}`);
  console.log(`   Keywords: ${config.keywords.join(', ')}\n`);

  const allPlaces = new Map(); // Use Map to deduplicate by place_id

  // Search by type
  for (const type of config.types) {
    const results = await searchPlaces(type);
    results.forEach(place => allPlaces.set(place.place_id, place));
    await sleep(1000); // Rate limiting
  }

  // Search by keyword
  for (const keyword of config.keywords) {
    const results = await searchPlaces(config.types[0], keyword);
    results.forEach(place => allPlaces.set(place.place_id, place));
    await sleep(1000); // Rate limiting
  }

  console.log(`\n📊 Found ${allPlaces.size} unique places`);
  console.log(`🔍 Fetching detailed information...\n`);

  const detailedPlaces = [];
  let count = 0;

  for (const [placeId, basicInfo] of allPlaces) {
    count++;
    console.log(`   ${count}/${allPlaces.size}: ${basicInfo.name}`);

    const details = await getPlaceDetails(placeId);
    if (details) {
      detailedPlaces.push({
        name: details.name,
        address: details.formatted_address,
        phone: details.formatted_phone_number || '',
        website: details.website || '',
        rating: details.rating || '',
        priceLevel: details.price_level ? '$'.repeat(details.price_level) : '',
        types: details.types || [],
        hours: details.opening_hours?.weekday_text?.join('; ') || '',
        placeId: placeId,
        lat: basicInfo.geometry?.location?.lat || '',
        lng: basicInfo.geometry?.location?.lng || '',
      });
    }

    await sleep(200); // Rate limiting for details
  }

  // Generate CSV
  const csv = convertToCsv(detailedPlaces);
  const outputPath = path.join(__dirname, '..', config.outputFile);
  fs.writeFileSync(outputPath, csv);

  console.log(`\n✅ Success!`);
  console.log(`   Saved ${detailedPlaces.length} places to: ${config.outputFile}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Open ${config.outputFile} in Excel or Google Sheets`);
  console.log(`   2. Review and clean up the data`);
  console.log(`   3. Import to Airtable using the import guide`);
  console.log(`   4. See FACILITIES_IMPORT_GUIDE.md for detailed instructions\n`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // Check for API key
  if (!API_KEY) {
    console.error('❌ Error: GOOGLE_PLACES_API_KEY not found in .env.local');
    console.log('\n📋 Setup instructions:');
    console.log('   1. Go to: https://console.cloud.google.com/');
    console.log('   2. Enable Places API');
    console.log('   3. Create an API key');
    console.log('   4. Add to .env.local: GOOGLE_PLACES_API_KEY=your_key_here\n');
    process.exit(1);
  }

  const category = process.argv[2];

  if (!category || category === 'help') {
    console.log('\n📚 Google Places Import Script');
    console.log('\nUsage:');
    console.log('   node scripts/import-google-places.js <category>');
    console.log('\nCategories:');
    console.log('   wellness     - Gyms, yoga, spas, massage');
    console.log('   restaurants  - Restaurants, cafes, bars');
    console.log('   activities   - Museums, attractions, entertainment');
    console.log('   all          - Import everything (takes longer)\n');
    process.exit(0);
  }

  if (category === 'all') {
    for (const cat of Object.keys(CATEGORIES)) {
      await importCategory(cat);
      console.log('\n' + '='.repeat(60) + '\n');
    }
  } else {
    await importCategory(category);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

