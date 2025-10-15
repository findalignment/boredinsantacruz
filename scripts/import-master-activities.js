/**
 * Master Activities Import Script
 * Imports activities from Google Places API for a unified Activities table
 * 
 * This replaces separate rainy/sunny/activities tables with ONE master table
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

// Activity Categories with weather preferences
const ACTIVITY_CATEGORIES = [
  // Beaches - Outdoor, sunny weather
  {
    query: 'beaches in Santa Cruz County',
    keywords: ['Natural Bridges State Beach', 'Cowell Beach', 'Seabright Beach', 'Capitola Beach', 'Main Beach', 'Twin Lakes Beach', 'Manresa State Beach', 'Sunset State Beach', 'Rio Del Mar Beach', 'Seacliff State Beach'],
    category: 'Beach',
    indoorOutdoor: 'Outdoor',
    weatherPreferences: 'sunny,partly-cloudy,warm',
    rainOk: false,
    windSensitive: true,
    requiresGoodVisibility: true,
    idealTempMin: 65,
    idealTempMax: 85,
    tags: 'beach,outdoor,scenic,family,photo-worthy',
  },
  // Hiking Trails - Outdoor, versatile weather
  {
    query: 'hiking trails in Santa Cruz County',
    keywords: ['Henry Cowell Redwoods', 'Wilder Ranch', 'Forest of Nisene Marks', 'Pogonip', 'Delaveaga Park'],
    category: 'Hiking',
    indoorOutdoor: 'Outdoor',
    weatherPreferences: 'sunny,partly-cloudy,cloudy,cool',
    rainOk: false,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 50,
    idealTempMax: 75,
    tags: 'hiking,nature,outdoor,exercise,scenic',
  },
  // Museums - Indoor, any weather
  {
    query: 'museums in Santa Cruz',
    keywords: ['Santa Cruz Museum of Art & History', 'Santa Cruz Surfing Museum', 'Museum of Natural History', 'MAH'],
    category: 'Museum',
    indoorOutdoor: 'Indoor',
    weatherPreferences: 'rainy,cloudy,foggy,any',
    rainOk: true,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 40,
    idealTempMax: 100,
    tags: 'museum,indoor,educational,family,art,culture',
  },
  // Attractions - Mixed
  {
    query: 'tourist attractions in Santa Cruz',
    keywords: ['Santa Cruz Beach Boardwalk', 'Mystery Spot', 'Santa Cruz Wharf', 'Roaring Camp Railroads'],
    category: 'Attraction',
    indoorOutdoor: 'Mixed',
    weatherPreferences: 'sunny,partly-cloudy',
    rainOk: false,
    windSensitive: false,
    requiresGoodVisibility: true,
    idealTempMin: 55,
    idealTempMax: 80,
    tags: 'attraction,tourist,family,fun',
  },
  // Indoor Activities - Rainy day options
  {
    query: 'indoor activities entertainment Santa Cruz',
    keywords: ['Nickelodeon Theatre', 'Del Mar Theatre', 'The Catalyst', 'bowling', 'arcade'],
    category: 'Indoor Activity',
    indoorOutdoor: 'Indoor',
    weatherPreferences: 'rainy,cloudy,foggy,any',
    rainOk: true,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 40,
    idealTempMax: 100,
    tags: 'indoor,entertainment,rainy-day',
  },
  // Breweries & Wineries - Indoor/Covered
  {
    query: 'breweries wineries Santa Cruz',
    keywords: ['Santa Cruz Mountain Brewing', 'Discretion Brewing', 'Sante Adairius', 'Hallcrest Vineyards'],
    category: 'Food & Drink',
    indoorOutdoor: 'Covered',
    weatherPreferences: 'any',
    rainOk: true,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 50,
    idealTempMax: 85,
    tags: 'brewery,winery,drinks,adults,indoor',
  },
  // Parks & Gardens
  {
    query: 'parks gardens Santa Cruz',
    keywords: ['Lighthouse Field', 'Pogonip City Park', 'Delaveaga Park', 'Harvey West Park'],
    category: 'Park',
    indoorOutdoor: 'Outdoor',
    weatherPreferences: 'sunny,partly-cloudy',
    rainOk: false,
    windSensitive: true,
    requiresGoodVisibility: true,
    idealTempMin: 60,
    idealTempMax: 80,
    tags: 'park,outdoor,nature,family,picnic',
  },
  // Water Activities
  {
    query: 'kayaking surfing water sports Santa Cruz',
    keywords: ['Kayak Connection', 'Venture Quest', "O'Neill Surf Shop", 'Club Ed Surf School'],
    category: 'Water Activity',
    indoorOutdoor: 'Outdoor',
    weatherPreferences: 'sunny,partly-cloudy,warm',
    rainOk: false,
    windSensitive: true,
    requiresGoodVisibility: true,
    idealTempMin: 65,
    idealTempMax: 85,
    tags: 'water-sports,surfing,kayaking,outdoor,active',
    tidePreference: 'any-tide',
  },
  // Shopping - Indoor/Mixed
  {
    query: 'shopping Santa Cruz downtown',
    keywords: ['Bookshop Santa Cruz', 'Annieglass', 'Santa Cruz Farmers Market'],
    category: 'Shopping',
    indoorOutdoor: 'Mixed',
    weatherPreferences: 'any',
    rainOk: true,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 50,
    idealTempMax: 85,
    tags: 'shopping,retail,downtown',
  },
  // Arts & Culture
  {
    query: 'art galleries theaters Santa Cruz',
    keywords: ['Tannery Arts Center', 'Kuumbwa Jazz Center', 'Rio Theatre'],
    category: 'Arts & Culture',
    indoorOutdoor: 'Indoor',
    weatherPreferences: 'any',
    rainOk: true,
    windSensitive: false,
    requiresGoodVisibility: false,
    idealTempMin: 50,
    idealTempMax: 90,
    tags: 'arts,culture,theater,music,indoor',
  },
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

// Helper to determine if activity is kid-friendly
function isKidFriendly(types, name, category) {
  const kidFriendlyTypes = ['park', 'museum', 'aquarium', 'zoo', 'playground'];
  const kidFriendlyKeywords = ['family', 'children', 'kids', 'playground', 'beach', 'boardwalk'];
  
  if (types.some(t => kidFriendlyTypes.includes(t))) return true;
  if (kidFriendlyKeywords.some(k => name.toLowerCase().includes(k))) return true;
  if (['Beach', 'Park', 'Museum', 'Attraction'].includes(category)) return true;
  
  return false;
}

// Helper to determine if pet-friendly
function isPetFriendly(types, name, category) {
  const petFriendlyTypes = ['park'];
  const petKeywords = ['dog park', 'pet friendly', 'leash'];
  
  if (types.some(t => petFriendlyTypes.includes(t))) return true;
  if (petKeywords.some(k => name.toLowerCase().includes(k))) return true;
  if (category === 'Park' || category === 'Beach') return 'Leash required';
  
  return false;
}

// Helper to estimate cost
function estimateCost(types, name, category) {
  // Free activities
  if (category === 'Beach' || category === 'Park' || category === 'Hiking') return 0;
  if (name.toLowerCase().includes('free')) return 0;
  
  // Low cost
  if (category === 'Museum') return 10;
  if (types.includes('cafe') || types.includes('bakery')) return 15;
  
  // Medium cost
  if (category === 'Attraction') return 25;
  if (types.includes('restaurant')) return 30;
  
  // Higher cost
  if (types.includes('night_club') || types.includes('bar')) return 40;
  
  return 20; // Default
}

// Helper to estimate duration
function estimateDuration(category) {
  const durationMap = {
    'Beach': '2-4 hours',
    'Hiking': '1-3 hours',
    'Museum': '1-2 hours',
    'Attraction': '2-3 hours',
    'Indoor Activity': '1-2 hours',
    'Food & Drink': '1-2 hours',
    'Park': '1-3 hours',
    'Water Activity': '2-4 hours',
    'Shopping': '1-2 hours',
    'Arts & Culture': '2-3 hours',
  };
  
  return durationMap[category] || '1-2 hours';
}

// Fetch place details
async function fetchPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,price_level,rating,user_ratings_total,photos,types,geometry&key=${GOOGLE_PLACES_API_KEY}`;
  
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

// Search for places
async function searchPlaces(query, categoryConfig) {
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
    console.error(`Error searching places:`, error);
    return [];
  }
}

// Main import function
async function importActivities() {
  console.log('🚀 Starting Master Activities Import from Google Places...\n');
  
  const allActivities = [];
  let processedCount = 0;
  
  for (const config of ACTIVITY_CATEGORIES) {
    console.log(`\n📍 Searching: ${config.query}`);
    console.log(`   Category: ${config.category}`);
    
    const places = await searchPlaces(config.query, config);
    
    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (const place of places) {
      // Check if it matches our specific keywords (if any)
      const matchesKeyword = !config.keywords || 
        config.keywords.some(keyword => 
          place.name.toLowerCase().includes(keyword.toLowerCase())
        );
      
      if (!matchesKeyword && config.keywords) continue;
      
      console.log(`   ✓ Processing: ${place.name}`);
      
      // Fetch detailed information
      const details = await fetchPlaceDetails(place.place_id);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!details) continue;
      
      // Build activity object with all fields
      const activity = {
        // Core fields (Priority 1)
        ID: generateSlug(place.name),
        Name: place.name,
        Description: `${place.name} in Santa Cruz${place.vicinity ? ` - ${place.vicinity}` : ''}. ${config.category} activity perfect for ${config.weatherPreferences.split(',')[0]} weather.`,
        WriteUp: '', // User will fill this in
        Category: config.category,
        Cost: estimateCost(details.types || [], place.name, config.category),
        IndoorOutdoor: config.indoorOutdoor,
        Address: details.formatted_address || place.formatted_address || '',
        PhotoURL: details.photos?.[0] ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}` : '',
        
        // Location fields
        Latitude: details.geometry?.location?.lat || place.geometry?.location?.lat || '',
        Longitude: details.geometry?.location?.lng || place.geometry?.location?.lng || '',
        Neighborhood: '', // User will fill in
        City: 'Santa Cruz',
        ZipCode: '',
        
        // Practical info
        Duration: estimateDuration(config.category),
        Hours: details.opening_hours?.weekday_text?.join('; ') || '',
        Phone: details.formatted_phone_number || '',
        Website: details.website || '',
        Instagram: '',
        Email: '',
        ParkingInfo: '', // User will fill in
        PublicTransit: '',
        
        // Tags & Categorization
        Tags: config.tags,
        KidFriendly: isKidFriendly(details.types || [], place.name, config.category),
        PetFriendly: isPetFriendly(details.types || [], place.name, config.category),
        Accessibility: '',
        
        // Weather-aware fields
        WeatherPreferences: config.weatherPreferences,
        RainOk: config.rainOk,
        IdealTempMin: config.idealTempMin || '',
        IdealTempMax: config.idealTempMax || '',
        WindSensitive: config.windSensitive || false,
        RequiresGoodVisibility: config.requiresGoodVisibility || false,
        WeatherBoost: 1.0,
        
        // Tide-aware fields (for coastal activities)
        TidePreference: config.tidePreference || '',
        TideCritical: config.tidePreference === 'low-tide' ? true : false,
        
        // Insider tips & content
        Tips: '',
        BestTimeToVisit: '',
        BestFeature: '',
        WhatToBring: '',
        
        // Display & sorting
        StaffPick: false,
        Featured: false,
        Priority: '',
        Sponsored: false,
        
        // Ratings (from Google)
        Rating: details.rating || '',
        ReviewCount: details.user_ratings_total || '',
        
        // SEO
        MetaDescription: '',
        Keywords: config.tags.replace(/,/g, ', '),
        Slug: generateSlug(place.name),
        
        // Admin
        Status: 'Published',
        Source: 'Google Places',
        
        // Optional advanced
        Difficulty: '',
        AgeRestriction: '',
        GroupSize: '',
        ReservationRequired: false,
        SeasonalAvailability: 'year-round',
      };
      
      allActivities.push(activity);
      processedCount++;
    }
  }
  
  console.log(`\n✅ Processed ${processedCount} activities`);
  
  // Generate CSV
  const headers = [
    'ID', 'Name', 'Description', 'WriteUp', 'Category', 'Cost', 'IndoorOutdoor', 'Address', 'PhotoURL',
    'Latitude', 'Longitude', 'Neighborhood', 'City', 'ZipCode',
    'Duration', 'Hours', 'Phone', 'Website', 'Instagram', 'Email',
    'ParkingInfo', 'PublicTransit', 'Tags', 'KidFriendly', 'PetFriendly', 'Accessibility',
    'WeatherPreferences', 'RainOk', 'IdealTempMin', 'IdealTempMax', 'WindSensitive', 'RequiresGoodVisibility', 'WeatherBoost',
    'TidePreference', 'TideCritical', 'Tips', 'BestTimeToVisit', 'BestFeature', 'WhatToBring',
    'StaffPick', 'Featured', 'Priority', 'Sponsored',
    'Rating', 'ReviewCount', 'MetaDescription', 'Keywords', 'Slug',
    'Status', 'Source', 'Difficulty', 'AgeRestriction', 'GroupSize', 'ReservationRequired', 'SeasonalAvailability'
  ];
  
  const csvRows = [headers.join(',')];
  
  for (const activity of allActivities) {
    const row = headers.map(header => {
      const value = activity[header];
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
  const filename = 'master-activities-import.csv';
  
  fs.writeFileSync(filename, csv, 'utf8');
  console.log(`\n📁 CSV saved to: ${filename}`);
  console.log(`📊 Total activities: ${allActivities.length}`);
  
  // Print summary
  console.log('\n📈 Category Breakdown:');
  const categoryCounts = {};
  allActivities.forEach(a => {
    categoryCounts[a.Category] = (categoryCounts[a.Category] || 0) + 1;
  });
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });
  
  console.log('\n✅ Import complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Open master-activities-import.csv');
  console.log('2. Review and edit activities (add WriteUp, ParkingInfo, Tips, etc.)');
  console.log('3. Import to Airtable as "Activities" table');
  console.log('4. Update .env.local with: AIRTABLE_ACTIVITIES_TABLE=Activities');
  console.log('5. Let me know when ready - I\'ll update all code to use the master table!');
}

// Run the import
importActivities().catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});

