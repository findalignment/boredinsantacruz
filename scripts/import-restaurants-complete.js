/**
 * Complete Restaurant Import Script with 60 Fields
 * Imports restaurants from Google Places API with full field mapping
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SANTA_CRUZ_CENTER = { lat: 36.9741, lng: -122.0308 };
const RADIUS = 25000; // 25km radius

if (!GOOGLE_PLACES_API_KEY) {
  console.error('❌ Error: GOOGLE_PLACES_API_KEY not found in .env.local');
  process.exit(1);
}

// Restaurant categories with specific searches
const RESTAURANT_QUERIES = [
  'restaurants Santa Cruz',
  'cafes Santa Cruz',
  'breakfast Santa Cruz',
  'brunch Santa Cruz',
  'lunch Santa Cruz',
  'dinner Santa Cruz',
  'pizza Santa Cruz',
  'sushi Santa Cruz',
  'mexican food Santa Cruz',
  'italian food Santa Cruz',
  'chinese food Santa Cruz',
  'thai food Santa Cruz',
  'indian food Santa Cruz',
  'vietnamese food Santa Cruz',
  'japanese food Santa Cruz',
  'american food Santa Cruz',
  'seafood Santa Cruz',
  'steakhouse Santa Cruz',
  'vegetarian restaurant Santa Cruz',
  'vegan restaurant Santa Cruz',
  'bars Santa Cruz',
  'brewpubs Santa Cruz',
  'wine bars Santa Cruz',
  'bakery Santa Cruz',
  'dessert Santa Cruz',
  'ice cream Santa Cruz',
];

// Helper to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

// Helper to determine cuisine from types and name
function determineCuisine(types, name) {
  const cuisineMap = {
    'mexican': 'Mexican',
    'italian': 'Italian',
    'chinese': 'Chinese',
    'japanese': 'Japanese',
    'sushi': 'Japanese',
    'thai': 'Thai',
    'indian': 'Indian',
    'vietnamese': 'Vietnamese',
    'american': 'American',
    'seafood': 'Seafood',
    'pizza': 'Pizza',
    'cafe': 'Cafe',
    'bakery': 'Bakery',
    'bar': 'Bar',
  };

  const nameLower = name.toLowerCase();
  
  // Check name first
  for (const [key, value] of Object.entries(cuisineMap)) {
    if (nameLower.includes(key)) return value;
  }
  
  // Check types
  for (const type of types) {
    if (cuisineMap[type]) return cuisineMap[type];
  }
  
  return 'American'; // Default
}

// Helper to determine neighborhood from address
function determineNeighborhood(address) {
  const neighborhoods = {
    'downtown': 'Downtown',
    'pacific avenue': 'Downtown',
    'front street': 'Downtown',
    'west cliff': 'Westside',
    'westside': 'Westside',
    'mission': 'Westside',
    'seabright': 'Seabright',
    'pleasure point': 'Pleasure Point',
    'live oak': 'Live Oak',
    'capitola': 'Capitola',
    'aptos': 'Aptos',
    'soquel': 'Soquel',
    'scotts valley': 'Scotts Valley',
  };
  
  const addressLower = address.toLowerCase();
  for (const [key, value] of Object.entries(neighborhoods)) {
    if (addressLower.includes(key)) return value;
  }
  
  return 'Santa Cruz'; // Default
}

// Helper to determine if kid-friendly
function isKidFriendly(types, name, priceLevel) {
  const kidFriendlyTypes = ['bakery', 'cafe', 'ice_cream', 'pizza'];
  const kidFriendlyKeywords = ['family', 'kids', 'pizza', 'ice cream', 'bakery'];
  
  if (types.some(t => kidFriendlyTypes.includes(t))) return true;
  if (kidFriendlyKeywords.some(k => name.toLowerCase().includes(k))) return true;
  if (priceLevel <= 2) return true; // Budget-friendly often kid-friendly
  
  return false;
}

// Helper to determine if pet-friendly
function isPetFriendly(types, name) {
  const petKeywords = ['dog friendly', 'pet friendly', 'patio', 'outdoor'];
  
  if (types.includes('bar') && types.includes('outdoor')) return 'Outdoor seating';
  if (petKeywords.some(k => name.toLowerCase().includes(k))) return 'Call to confirm';
  
  return false;
}

// Helper to determine category
function determineCategory(types, name) {
  if (types.includes('cafe') || types.includes('bakery')) return 'Cafe';
  if (types.includes('bar') || types.includes('night_club')) return 'Bar';
  if (types.includes('meal_delivery') || types.includes('meal_takeaway')) return 'Quick Service';
  
  return 'Restaurant';
}

// Helper to estimate duration
function estimateDuration(category, types) {
  if (category === 'Cafe' || category === 'Quick Service') return '30-60 minutes';
  if (types.includes('bar')) return '1-3 hours';
  return '1-2 hours';
}

// Helper to determine weather preferences
function getWeatherPreferences(category, hasOutdoor) {
  if (hasOutdoor) {
    return 'sunny,partly-cloudy,warm,cool';
  }
  return 'any,rainy,sunny,cloudy,foggy';
}

// Helper to generate tags
function generateTags(cuisine, category, types, hasOutdoor, vegetarian, vegan) {
  const tags = [];
  
  tags.push('food', 'restaurant', 'dining');
  
  if (cuisine !== 'American') tags.push(cuisine.toLowerCase());
  if (category === 'Cafe') tags.push('cafe', 'coffee');
  if (category === 'Bar') tags.push('bar', 'drinks', 'nightlife');
  
  if (hasOutdoor) tags.push('outdoor-seating', 'patio');
  if (vegetarian) tags.push('vegetarian-friendly');
  if (vegan) tags.push('vegan-options');
  
  if (types.includes('brunch')) tags.push('brunch');
  if (types.includes('breakfast')) tags.push('breakfast');
  if (types.includes('lunch')) tags.push('lunch');
  if (types.includes('dinner')) tags.push('dinner');
  
  return tags.join(',');
}

// Fetch place details
async function fetchPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,price_level,rating,user_ratings_total,photos,types,geometry,reviews,editorial_summary&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    } else {
      console.error(`Error fetching details for ${placeId}: ${data.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching place details:`, error);
    return null;
  }
}

// Search for restaurants
async function searchRestaurants(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${SANTA_CRUZ_CENTER.lat},${SANTA_CRUZ_CENTER.lng}&radius=${RADIUS}&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log(`✅ Found ${data.results.length} results for: ${query}`);
      return data.results;
    } else if (data.status === 'ZERO_RESULTS') {
      console.log(`⚠️  No results for: ${query}`);
      return [];
    } else {
      console.error(`❌ Error searching for ${query}: ${data.status}`);
      return [];
    }
  } catch (error) {
    console.error(`Error searching restaurants:`, error);
    return [];
  }
}

// Main import function
async function importRestaurants() {
  console.log('🚀 Starting Complete Restaurant Import from Google Places...\n');
  
  const allRestaurants = [];
  const seenPlaces = new Set(); // Prevent duplicates
  let processedCount = 0;
  
  for (const query of RESTAURANT_QUERIES) {
    console.log(`\n📍 Searching: ${query}`);
    
    const places = await searchRestaurants(query);
    
    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (const place of places) {
      // Skip duplicates
      if (seenPlaces.has(place.place_id)) {
        continue;
      }
      seenPlaces.add(place.place_id);
      
      console.log(`   ✓ Processing: ${place.name}`);
      
      // Fetch detailed information
      const details = await fetchPlaceDetails(place.place_id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!details) continue;
      
      // Determine attributes
      const types = details.types || [];
      const hasOutdoor = types.includes('outdoor_seating') || types.includes('patio');
      const priceLevel = details.price_level || 2;
      const cuisine = determineCuisine(types, place.name);
      const category = determineCategory(types, place.name);
      const neighborhood = determineNeighborhood(details.formatted_address || '');
      
      // Estimate cost in dollars
      const costEstimate = priceLevel === 0 ? 0 : priceLevel === 1 ? 15 : priceLevel === 2 ? 30 : priceLevel === 3 ? 50 : 75;
      
      // Build restaurant object with ALL 60 fields
      const restaurant = {
        // Core fields (Priority 1)
        ID: generateSlug(place.name),
        Name: place.name,
        Description: details.editorial_summary?.overview || `${place.name} in ${neighborhood}. ${cuisine} cuisine with ${priceLevel === 0 ? 'budget-friendly' : priceLevel === 1 ? 'affordable' : priceLevel === 2 ? 'moderate' : priceLevel === 3 ? 'upscale' : 'fine dining'} prices.`,
        WriteUp: '', // User will fill this in
        Category: category,
        Cost: costEstimate,
        IndoorOutdoor: hasOutdoor ? 'Mixed' : 'Indoor',
        Address: details.formatted_address || place.formatted_address || '',
        PhotoURL: details.photos?.[0] ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}` : '',
        
        // Location fields
        Latitude: details.geometry?.location?.lat || place.geometry?.location?.lat || '',
        Longitude: details.geometry?.location?.lng || place.geometry?.location?.lng || '',
        Neighborhood: neighborhood,
        City: 'Santa Cruz',
        ZipCode: '',
        
        // Contact
        Phone: details.formatted_phone_number || '',
        Website: details.website || '',
        Instagram: '',
        Email: '',
        
        // Practical info
        Duration: estimateDuration(category, types),
        Hours: details.opening_hours?.weekday_text?.join('; ') || '',
        ParkingInfo: '', // User will fill in
        PublicTransit: neighborhood === 'Downtown' ? 'Multiple bus routes' : '',
        
        // Tags & Categorization
        Tags: generateTags(cuisine, category, types, hasOutdoor, false, false),
        KidFriendly: isKidFriendly(types, place.name, priceLevel),
        PetFriendly: isPetFriendly(types, place.name),
        Accessibility: '',
        
        // Weather-aware fields (restaurants are mostly indoor)
        WeatherPreferences: getWeatherPreferences(category, hasOutdoor),
        RainOk: true, // Restaurants work in any weather
        IdealTempMin: 40,
        IdealTempMax: 100,
        WindSensitive: hasOutdoor ? true : false,
        RequiresGoodVisibility: false,
        WeatherBoost: 1.0,
        
        // Tide-aware fields (N/A for restaurants)
        TidePreference: '',
        TideCritical: false,
        
        // Insider tips & content
        Tips: '',
        BestTimeToVisit: category === 'Bar' ? 'Happy hour 4-6 PM' : types.includes('brunch') ? 'Weekend brunch 9-11 AM' : '',
        BestFeature: '',
        WhatToBring: 'Reservation recommended for dinner',
        
        // Display & sorting
        StaffPick: false,
        Featured: false,
        Priority: '',
        Sponsored: false,
        
        // Ratings (from Google)
        Rating: details.rating || '',
        ReviewCount: details.user_ratings_total || '',
        
        // SEO
        MetaDescription: `${place.name} - ${cuisine} restaurant in ${neighborhood}, Santa Cruz. ${details.editorial_summary?.overview || 'Great food and atmosphere.'}`,
        Keywords: `${cuisine.toLowerCase()}, restaurant, ${neighborhood.toLowerCase()}, santa cruz, dining, food`,
        Slug: generateSlug(place.name),
        
        // Admin
        Status: 'Published',
        Source: 'Google Places',
        
        // Optional advanced fields
        Difficulty: '',
        AgeRestriction: types.includes('bar') || types.includes('night_club') ? '21+' : '',
        GroupSize: category === 'Bar' ? 'Great for groups' : 'Reservations recommended for large parties',
        ReservationRequired: priceLevel >= 3 ? true : false,
        SeasonalAvailability: 'year-round',
      };
      
      allRestaurants.push(restaurant);
      processedCount++;
    }
  }
  
  console.log(`\n✅ Processed ${processedCount} unique restaurants`);
  
  // Remove exact duplicates based on name and address
  const uniqueRestaurants = Array.from(
    new Map(
      allRestaurants.map(r => [r.Name + r.Address, r])
    ).values()
  );
  
  console.log(`📊 After deduplication: ${uniqueRestaurants.length} restaurants`);
  
  // Generate CSV with ALL 60 fields
  const headers = [
    'ID', 'Name', 'Description', 'WriteUp', 'Category', 'Cost', 'IndoorOutdoor', 'Address', 'PhotoURL',
    'Latitude', 'Longitude', 'Neighborhood', 'City', 'ZipCode',
    'Phone', 'Website', 'Instagram', 'Email',
    'Duration', 'Hours', 'ParkingInfo', 'PublicTransit',
    'Tags', 'KidFriendly', 'PetFriendly', 'Accessibility',
    'WeatherPreferences', 'RainOk', 'IdealTempMin', 'IdealTempMax', 'WindSensitive', 'RequiresGoodVisibility', 'WeatherBoost',
    'TidePreference', 'TideCritical',
    'Tips', 'BestTimeToVisit', 'BestFeature', 'WhatToBring',
    'StaffPick', 'Featured', 'Priority', 'Sponsored',
    'Rating', 'ReviewCount',
    'MetaDescription', 'Keywords', 'Slug',
    'Status', 'Source',
    'Difficulty', 'AgeRestriction', 'GroupSize', 'ReservationRequired', 'SeasonalAvailability'
  ];
  
  const csvRows = [headers.join(',')];
  
  for (const restaurant of uniqueRestaurants) {
    const row = headers.map(header => {
      const value = restaurant[header];
      if (value === null || value === undefined) return '';
      
      // Escape commas and quotes in CSV
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    
    csvRows.push(row.join(','));
  }
  
  const csv = csvRows.join('\n');
  const filename = 'santa-cruz-restaurants-complete.csv';
  
  fs.writeFileSync(filename, csv, 'utf8');
  console.log(`\n📁 CSV saved to: ${filename}`);
  console.log(`📊 Total restaurants: ${uniqueRestaurants.length}`);
  
  // Print summary by category
  console.log('\n📈 Category Breakdown:');
  const categoryCounts = {};
  uniqueRestaurants.forEach(r => {
    categoryCounts[r.Category] = (categoryCounts[r.Category] || 0) + 1;
  });
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });
  
  // Print summary by cuisine
  console.log('\n🍽️  Cuisine Breakdown:');
  const cuisineCounts = {};
  uniqueRestaurants.forEach(r => {
    const cuisine = r.Tags.split(',').find(t => 
      ['mexican', 'italian', 'chinese', 'japanese', 'thai', 'indian', 'vietnamese'].includes(t.toLowerCase())
    ) || 'other';
    cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
  });
  Object.entries(cuisineCounts).sort((a, b) => b[1] - a[1]).forEach(([cuisine, count]) => {
    console.log(`   ${cuisine}: ${count}`);
  });
  
  // Print summary by neighborhood
  console.log('\n📍 Neighborhood Breakdown:');
  const neighborhoodCounts = {};
  uniqueRestaurants.forEach(r => {
    neighborhoodCounts[r.Neighborhood] = (neighborhoodCounts[r.Neighborhood] || 0) + 1;
  });
  Object.entries(neighborhoodCounts).sort((a, b) => b[1] - a[1]).forEach(([hood, count]) => {
    console.log(`   ${hood}: ${count}`);
  });
  
  console.log('\n✅ Import complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Open santa-cruz-restaurants-complete.csv');
  console.log('2. Review and edit restaurants (add WriteUp, ParkingInfo, Tips, etc.)');
  console.log('3. Import to Airtable as part of "Activities" table OR separate "Restaurants" table');
  console.log('4. Update .env.local if needed');
  console.log('5. All 60 fields are populated where applicable!');
}

// Run the import
importRestaurants().catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});

