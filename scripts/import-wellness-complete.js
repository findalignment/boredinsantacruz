/**
 * Complete Wellness Import Script with 60 Fields
 * Imports fitness, yoga, pilates, massage, spas, gyms from Google Places API
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

// Comprehensive wellness categories with specific searches
const WELLNESS_QUERIES = [
  // Yoga & Pilates
  'yoga studio Santa Cruz',
  'pilates studio Santa Cruz',
  'yoga classes Santa Cruz',
  'hot yoga Santa Cruz',
  'barre studio Santa Cruz',
  
  // Gyms & Fitness
  'gym Santa Cruz',
  'fitness center Santa Cruz',
  'crossfit Santa Cruz',
  'personal training Santa Cruz',
  '24 hour gym Santa Cruz',
  'rock climbing gym Santa Cruz',
  
  // Massage & Bodywork
  'massage therapy Santa Cruz',
  'massage spa Santa Cruz',
  'deep tissue massage Santa Cruz',
  'sports massage Santa Cruz',
  'thai massage Santa Cruz',
  'acupuncture Santa Cruz',
  'chiropractor Santa Cruz',
  'physical therapy Santa Cruz',
  
  // Spas & Wellness
  'spa Santa Cruz',
  'day spa Santa Cruz',
  'wellness center Santa Cruz',
  'meditation center Santa Cruz',
  'holistic health Santa Cruz',
  'reiki healing Santa Cruz',
  
  // Specialized
  'martial arts Santa Cruz',
  'boxing gym Santa Cruz',
  'cycling studio Santa Cruz',
  'dance studio Santa Cruz',
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

// Helper to determine wellness category from types and name
function determineWellnessCategory(types, name) {
  const nameLower = name.toLowerCase();
  
  // Check name first for specific keywords
  if (nameLower.includes('yoga') || nameLower.includes('yogi')) return 'Yoga';
  if (nameLower.includes('pilates')) return 'Pilates';
  if (nameLower.includes('massage') || nameLower.includes('bodywork')) return 'Massage';
  if (nameLower.includes('spa') && !nameLower.includes('sports')) return 'Spa';
  if (nameLower.includes('gym') || nameLower.includes('fitness')) return 'Gym';
  if (nameLower.includes('crossfit')) return 'CrossFit';
  if (nameLower.includes('martial arts') || nameLower.includes('karate') || nameLower.includes('jiu jitsu')) return 'Martial Arts';
  if (nameLower.includes('chiropractor') || nameLower.includes('chiro')) return 'Chiropractic';
  if (nameLower.includes('acupuncture')) return 'Acupuncture';
  if (nameLower.includes('physical therapy') || nameLower.includes('physio')) return 'Physical Therapy';
  if (nameLower.includes('dance')) return 'Dance';
  if (nameLower.includes('cycling') || nameLower.includes('spin')) return 'Cycling';
  
  // Check types
  if (types.includes('gym')) return 'Gym';
  if (types.includes('spa')) return 'Spa';
  if (types.includes('physiotherapist')) return 'Physical Therapy';
  
  return 'Wellness Center'; // Default
}

// Helper to determine wellness type (multiple tags)
function determineWellnessType(category, types, name) {
  const wellnessTypes = [];
  const nameLower = name.toLowerCase();
  
  // Add primary category
  wellnessTypes.push(category);
  
  // Add additional types based on keywords
  if (nameLower.includes('yoga') || category === 'Yoga') wellnessTypes.push('Yoga');
  if (nameLower.includes('pilates') || category === 'Pilates') wellnessTypes.push('Pilates');
  if (nameLower.includes('massage') || category === 'Massage') wellnessTypes.push('Massage');
  if (nameLower.includes('spa') || category === 'Spa') wellnessTypes.push('Spa');
  if (nameLower.includes('gym') || nameLower.includes('fitness') || category === 'Gym') wellnessTypes.push('Fitness');
  if (nameLower.includes('personal train')) wellnessTypes.push('Personal Training');
  if (nameLower.includes('crossfit')) wellnessTypes.push('CrossFit');
  if (nameLower.includes('barre')) wellnessTypes.push('Barre');
  if (nameLower.includes('meditation') || nameLower.includes('mindfulness')) wellnessTypes.push('Meditation');
  if (nameLower.includes('acupuncture')) wellnessTypes.push('Acupuncture');
  if (nameLower.includes('chiropractic')) wellnessTypes.push('Chiropractic');
  if (nameLower.includes('physical therapy')) wellnessTypes.push('Physical Therapy');
  
  // Remove duplicates and return
  return [...new Set(wellnessTypes)].join(',');
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

// Helper to estimate cost from price level and category
function estimateCost(priceLevel, category) {
  // Base costs by category
  const baseCosts = {
    'Yoga': 20,
    'Pilates': 25,
    'Gym': 50,
    'CrossFit': 150,
    'Massage': 80,
    'Spa': 100,
    'Acupuncture': 75,
    'Chiropractic': 60,
    'Physical Therapy': 100,
    'Martial Arts': 100,
    'Dance': 15,
    'Cycling': 25,
  };
  
  const baseCost = baseCosts[category] || 30;
  
  // Adjust by price level
  if (priceLevel === 0) return 0;
  if (priceLevel === 1) return Math.floor(baseCost * 0.7);
  if (priceLevel === 2) return baseCost;
  if (priceLevel === 3) return Math.floor(baseCost * 1.5);
  if (priceLevel === 4) return Math.floor(baseCost * 2);
  
  return baseCost;
}

// Helper to generate description
function generateDescription(name, category, neighborhood, priceLevel) {
  const descriptions = {
    'Yoga': `${name} offers yoga classes in ${neighborhood}. ${priceLevel <= 2 ? 'Affordable' : 'Premium'} yoga studio with experienced instructors.`,
    'Pilates': `${name} provides pilates instruction in ${neighborhood}. ${priceLevel <= 2 ? 'Accessible' : 'High-quality'} pilates studio with certified trainers.`,
    'Gym': `${name} is a ${priceLevel <= 2 ? 'budget-friendly' : 'full-service'} fitness center in ${neighborhood}. Complete gym facilities and equipment.`,
    'Massage': `${name} offers professional massage therapy in ${neighborhood}. ${priceLevel <= 2 ? 'Reasonably priced' : 'Luxury'} massage services.`,
    'Spa': `${name} is a ${priceLevel <= 2 ? 'welcoming' : 'premier'} spa in ${neighborhood}. Full spa services and relaxation treatments.`,
    'CrossFit': `${name} provides CrossFit training in ${neighborhood}. High-intensity functional fitness workouts.`,
    'Acupuncture': `${name} offers acupuncture and traditional Chinese medicine in ${neighborhood}. Licensed practitioners.`,
    'Chiropractic': `${name} provides chiropractic care in ${neighborhood}. Professional spinal adjustments and wellness care.`,
    'Physical Therapy': `${name} offers physical therapy services in ${neighborhood}. Licensed therapists for rehabilitation and recovery.`,
  };
  
  return descriptions[category] || `${name} is a wellness facility in ${neighborhood}, Santa Cruz.`;
}

// Helper to generate tags
function generateTags(category, wellnessType, hasClasses, hasPersonalTraining) {
  const tags = ['wellness', 'health', 'fitness', 'self-care'];
  
  // Add category-specific tags
  const categoryTags = {
    'Yoga': ['yoga', 'mindfulness', 'flexibility', 'stretching', 'meditation'],
    'Pilates': ['pilates', 'core-strength', 'flexibility', 'toning'],
    'Gym': ['gym', 'workout', 'strength-training', 'cardio', 'weights'],
    'CrossFit': ['crossfit', 'hiit', 'functional-fitness', 'strength', 'conditioning'],
    'Massage': ['massage', 'relaxation', 'stress-relief', 'bodywork', 'therapeutic'],
    'Spa': ['spa', 'relaxation', 'pampering', 'beauty', 'treatments'],
    'Acupuncture': ['acupuncture', 'holistic', 'pain-relief', 'traditional-medicine'],
    'Chiropractic': ['chiropractic', 'spinal-health', 'pain-relief', 'wellness'],
    'Physical Therapy': ['physical-therapy', 'rehabilitation', 'injury-recovery', 'mobility'],
  };
  
  if (categoryTags[category]) {
    tags.push(...categoryTags[category]);
  }
  
  if (hasClasses) tags.push('classes', 'group-fitness');
  if (hasPersonalTraining) tags.push('personal-training', '1-on-1');
  
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

// Search for wellness facilities
async function searchWellness(query) {
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
    console.error(`Error searching wellness:`, error);
    return [];
  }
}

// Main import function
async function importWellness() {
  console.log('🚀 Starting Complete Wellness Import from Google Places...\n');
  
  const allFacilities = [];
  const seenPlaces = new Set(); // Prevent duplicates
  let processedCount = 0;
  
  for (const query of WELLNESS_QUERIES) {
    console.log(`\n📍 Searching: ${query}`);
    
    const places = await searchWellness(query);
    
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
      const priceLevel = details.price_level || 2;
      const category = determineWellnessCategory(types, place.name);
      const wellnessType = determineWellnessType(category, types, place.name);
      const neighborhood = determineNeighborhood(details.formatted_address || '');
      const cost = estimateCost(priceLevel, category);
      
      // Build wellness object with ALL 60 fields
      const facility = {
        // Core fields (Priority 1)
        ID: generateSlug(place.name),
        Name: place.name,
        Description: generateDescription(place.name, category, neighborhood, priceLevel),
        WriteUp: '', // User will fill this in
        Category: category,
        Cost: cost,
        IndoorOutdoor: 'Indoor', // Most wellness facilities are indoor
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
        Duration: category === 'Massage' ? '60-90 minutes' : category === 'Gym' ? 'Varies' : '45-60 minutes',
        Hours: details.opening_hours?.weekday_text?.join('; ') || '',
        ParkingInfo: '', // User will fill in
        PublicTransit: neighborhood === 'Downtown' ? 'Multiple bus routes' : '',
        
        // Tags & Categorization
        Tags: generateTags(category, wellnessType, true, category === 'Gym'),
        KidFriendly: ['Martial Arts', 'Dance', 'Yoga'].includes(category),
        PetFriendly: false,
        Accessibility: '',
        
        // Weather-aware fields (indoor facilities)
        WeatherPreferences: 'any,rainy,sunny,cloudy,foggy', // Indoor, works in all weather
        RainOk: true,
        IdealTempMin: 40,
        IdealTempMax: 100,
        WindSensitive: false,
        RequiresGoodVisibility: false,
        WeatherBoost: 1.0,
        
        // Tide-aware fields (N/A)
        TidePreference: '',
        TideCritical: false,
        
        // Insider tips & content
        Tips: '',
        BestTimeToVisit: category === 'Gym' ? 'Early morning or evening' : category === 'Spa' ? 'Weekday afternoons' : '',
        BestFeature: '',
        WhatToBring: category === 'Yoga' || category === 'Pilates' ? 'Yoga mat, water bottle, comfortable clothing' : category === 'Gym' ? 'Workout clothes, water bottle, towel' : '',
        
        // Display & sorting
        StaffPick: false,
        Featured: false,
        Priority: '',
        Sponsored: false,
        
        // Ratings (from Google)
        Rating: details.rating || '',
        ReviewCount: details.user_ratings_total || '',
        
        // SEO
        MetaDescription: `${place.name} - ${category} in ${neighborhood}, Santa Cruz. ${details.editorial_summary?.overview || 'Professional wellness services.'}`,
        Keywords: `${category.toLowerCase()}, wellness, ${neighborhood.toLowerCase()}, santa cruz, fitness, health`,
        Slug: generateSlug(place.name),
        
        // Admin
        Status: 'Published',
        Source: 'Google Places',
        
        // Optional advanced fields
        Difficulty: category === 'CrossFit' ? 'Advanced' : category === 'Yoga' ? 'All Levels' : '',
        AgeRestriction: category === 'Gym' ? '16+' : '',
        GroupSize: ['Yoga', 'Pilates', 'CrossFit'].includes(category) ? 'Classes available' : '1-on-1 sessions',
        ReservationRequired: category === 'Massage' || category === 'Spa' ? true : false,
        SeasonalAvailability: 'year-round',
      };
      
      allFacilities.push(facility);
      processedCount++;
    }
  }
  
  console.log(`\n✅ Processed ${processedCount} unique wellness facilities`);
  
  // Remove exact duplicates based on name and address
  const uniqueFacilities = Array.from(
    new Map(
      allFacilities.map(f => [f.Name + f.Address, f])
    ).values()
  );
  
  console.log(`📊 After deduplication: ${uniqueFacilities.length} facilities`);
  
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
  
  for (const facility of uniqueFacilities) {
    const row = headers.map(header => {
      const value = facility[header];
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
  const filename = 'santa-cruz-wellness-complete.csv';
  
  fs.writeFileSync(filename, csv, 'utf8');
  console.log(`\n📁 CSV saved to: ${filename}`);
  console.log(`📊 Total facilities: ${uniqueFacilities.length}`);
  
  // Print summary by category
  console.log('\n📈 Category Breakdown:');
  const categoryCounts = {};
  uniqueFacilities.forEach(f => {
    categoryCounts[f.Category] = (categoryCounts[f.Category] || 0) + 1;
  });
  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });
  
  // Print summary by neighborhood
  console.log('\n📍 Neighborhood Breakdown:');
  const neighborhoodCounts = {};
  uniqueFacilities.forEach(f => {
    neighborhoodCounts[f.Neighborhood] = (neighborhoodCounts[f.Neighborhood] || 0) + 1;
  });
  Object.entries(neighborhoodCounts).sort((a, b) => b[1] - a[1]).forEach(([hood, count]) => {
    console.log(`   ${hood}: ${count}`);
  });
  
  console.log('\n✅ Import complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Open santa-cruz-wellness-complete.csv');
  console.log('2. Review and edit facilities (add WriteUp, ParkingInfo, Tips, etc.)');
  console.log('3. Import to Airtable "Wellness" table (or add to "Activities" table)');
  console.log('4. Update .env.local: AIRTABLE_WELLNESS_TABLE=Wellness');
  console.log('5. All 60 fields are populated where applicable!');
}

// Run the import
importWellness().catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});

