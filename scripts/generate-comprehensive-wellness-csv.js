#!/usr/bin/env node

/**
 * Comprehensive Wellness CSV Generator for Santa Cruz County
 * Uses Google Places API to fetch real data for all fitness and wellness facilities
 * Includes all 60+ recommended fields with PhotoURLs, coordinates, and detailed information
 */

const fs = require('fs');
const path = require('path');

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!GOOGLE_PLACES_API_KEY) {
  console.error('❌ GOOGLE_PLACES_API_KEY environment variable is required');
  process.exit(1);
}

// Comprehensive search terms for wellness facilities
const wellnessSearchTerms = [
  // Fitness Centers & Gyms
  'fitness center', 'gym', 'health club', 'crossfit', 'boxing gym', 'martial arts', 'muay thai', 'jiu jitsu', 'karate',
  'personal trainer', 'group fitness', 'bootcamp', 'hiit', 'strength training', 'cardio',
  
  // Yoga & Pilates
  'yoga studio', 'pilates studio', 'hot yoga', 'vinyasa yoga', 'hatha yoga', 'ashtanga yoga', 'bikram yoga',
  'reformer pilates', 'mat pilates', 'barre', 'yoga sculpt',
  
  // Massage & Bodywork
  'massage therapy', 'massage spa', 'deep tissue massage', 'swedish massage', 'thai massage', 'sports massage',
  'bodywork', 'myofascial release', 'craniosacral therapy', 'rolfing', 'trigger point therapy', 'shiatsu',
  'massage therapist', 'licensed massage therapist',
  
  // Spas & Wellness
  'spa', 'day spa', 'wellness center', 'holistic health', 'meditation center', 'reiki', 'energy healing',
  'acupuncture', 'acupuncturist', 'chiropractic', 'chiropractor', 'physical therapy', 'occupational therapy',
  'naturopathic doctor', 'naturopath', 'homeopathic', 'herbal medicine', 'nutritionist', 'dietitian',
  
  // Specialized Fitness
  'dance studio', 'swimming pool', 'aqua fitness', 'water aerobics', 'tennis club', 'golf course',
  'rock climbing gym', 'cycling studio', 'spin class', 'rowing club', 'rowing studio',
  'trampoline park', 'gymnastics', 'pole dancing', 'aerial yoga', 'circus arts',
  
  // Alternative Wellness
  'life coach', 'wellness coach', 'mental health', 'therapy', 'counseling', 'psychotherapy',
  'mindfulness', 'meditation', 'breathing', 'sound healing', 'crystal healing',
  'reflexology', 'aromatherapy', 'salt therapy', 'float therapy', 'cryotherapy',
  
  // Sports & Recreation
  'sports medicine', 'athletic trainer', 'sports therapy', 'rehabilitation', 'injury prevention',
  'movement therapy', 'postural therapy', 'therapeutic exercise'
];

// Santa Cruz County locations for comprehensive coverage
const locations = [
  'Santa Cruz, CA',
  'Capitola, CA',
  'Scotts Valley, CA', 
  'Aptos, CA',
  'Soquel, CA',
  'Watsonville, CA',
  'Live Oak, CA',
  'Pleasure Point, CA',
  'Westside Santa Cruz, CA',
  'Downtown Santa Cruz, CA',
  'Eastside Santa Cruz, CA',
  'Midtown Santa Cruz, CA',
  'Beach Flats, CA',
  'Twin Lakes, CA',
  'Rio del Mar, CA',
  'La Selva Beach, CA',
  'Corralitos, CA',
  'Freedom, CA',
  'Las Lomas, CA'
];

// All 60+ recommended fields for comprehensive wellness data
const fieldHeaders = [
  // Basic Information
  'Name', 'Category', 'Subcategory', 'Description', 'LongDescription', 'WriteUp',
  
  // Contact & Location
  'Address', 'City', 'State', 'ZipCode', 'Phone', 'Website', 'Email', 'Instagram', 'Facebook',
  'Latitude', 'Longitude', 'Neighborhood', 'CrossStreets',
  
  // Services & Offerings
  'Services', 'Specialties', 'Amenities', 'Equipment', 'Classes', 'Programs',
  
  // Pricing & Hours
  'PriceLevel', 'Pricing', 'Hours', 'HolidayHours', 'BestTime', 'PeakHours',
  
  // Features & Accessibility
  'IndoorOutdoor', 'Parking', 'PublicTransportation', 'WheelchairAccessible', 'FamilyFriendly',
  'PetFriendly', 'Wifi', 'Showers', 'LockerRoom', 'EquipmentRental',
  
  // Wellness Specific
  'WellnessType', 'TreatmentTypes', 'Certification', 'Licensed', 'InsuranceAccepted',
  'AppointmentRequired', 'WalkInsWelcome', 'GroupSessions', 'PrivateSessions',
  
  // Target Demographics
  'TargetAudience', 'SkillLevel', 'AgeGroups', 'BeginnerFriendly', 'AdvancedPrograms',
  
  // Quality & Reviews
  'Rating', 'ReviewCount', 'StaffPicks', 'Awards', 'Certifications',
  
  // Media & Marketing
  'PhotoURL', 'ImageGallery', 'VideoURL', 'VirtualTour', 'SocialMedia',
  
  // Business Details
  'BusinessType', 'Ownership', 'Established', 'StaffSize', 'Languages',
  
  // Additional Fields
  'Tags', 'Keywords', 'Seasonal', 'WeatherDependent', 'BookingPlatform',
  'CancellationPolicy', 'MembershipRequired', 'TrialClass', 'PackageDeals',
  
  // SEO & Discovery
  'MetaDescription', 'MetaKeywords', 'Featured', 'Popular', 'Trending'
];

// Function to search Google Places API
async function searchGooglePlaces(query, location, radius = 25000) {
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' in ' + location)}&key=${GOOGLE_PLACES_API_KEY}&radius=${radius}`;
  
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.results;
    } else {
      console.warn(`⚠️  API Error for "${query} in ${location}": ${data.status}`);
      return [];
    }
  } catch (error) {
    console.error(`❌ Error searching for "${query} in ${location}":`, error.message);
    return [];
  }
}

// Function to get detailed place information
async function getPlaceDetails(placeId) {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,formatted_phone_number,website,opening_hours,rating,user_ratings_total,photos,types,business_status,price_level,reviews,editorial_summary&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    } else {
      console.warn(`⚠️  Details API Error for place_id ${placeId}: ${data.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error getting details for place_id ${placeId}:`, error.message);
    return null;
  }
}

// Function to generate photo URL
function generatePhotoURL(photoReference, maxWidth = 800) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}

// Function to categorize business by types
function categorizeBusiness(types, name, details) {
  const typeMap = {
    // Fitness
    'gym': 'Fitness Center',
    'health': 'Wellness Center',
    'spa': 'Spa & Wellness',
    'beauty_salon': 'Spa & Wellness',
    'hair_care': 'Spa & Wellness',
    
    // Yoga & Pilates
    'yoga': 'Yoga Studio',
    'pilates': 'Pilates Studio',
    'dance': 'Dance Studio',
    
    // Massage & Bodywork
    'massage': 'Massage Therapy',
    'physiotherapist': 'Physical Therapy',
    'chiropractor': 'Chiropractic',
    
    // Medical & Health
    'doctor': 'Medical',
    'dentist': 'Medical',
    'hospital': 'Medical',
    'pharmacy': 'Medical',
    
    // Sports & Recreation
    'sports_complex': 'Sports & Recreation',
    'stadium': 'Sports & Recreation',
    'swimming_pool': 'Sports & Recreation',
    'golf_course': 'Sports & Recreation',
    'tennis': 'Sports & Recreation'
  };

  // Determine category based on types and name
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('yoga')) return 'Yoga Studio';
  if (lowerName.includes('pilates')) return 'Pilates Studio';
  if (lowerName.includes('massage')) return 'Massage Therapy';
  if (lowerName.includes('spa')) return 'Spa & Wellness';
  if (lowerName.includes('fitness') || lowerName.includes('gym')) return 'Fitness Center';
  if (lowerName.includes('crossfit')) return 'Fitness Center';
  if (lowerName.includes('bootcamp')) return 'Fitness Bootcamp';
  if (lowerName.includes('dance')) return 'Dance Studio';
  
  // Check types array
  for (const type of types) {
    if (typeMap[type]) return typeMap[type];
  }
  
  return 'Wellness Center';
}

// Function to generate tags
function generateTags(types, name, details) {
  const tags = [];
  const lowerName = name.toLowerCase();
  
  // Add tags based on name
  if (lowerName.includes('yoga')) tags.push('Yoga', 'Fitness', 'Wellness');
  if (lowerName.includes('pilates')) tags.push('Pilates', 'Core', 'Fitness');
  if (lowerName.includes('massage')) tags.push('Massage', 'Relaxation', 'Therapy');
  if (lowerName.includes('spa')) tags.push('Spa', 'Relaxation', 'Beauty');
  if (lowerName.includes('fitness') || lowerName.includes('gym')) tags.push('Fitness', 'Exercise', 'Health');
  if (lowerName.includes('crossfit')) tags.push('CrossFit', 'HIIT', 'Strength');
  if (lowerName.includes('hot')) tags.push('Hot Classes', 'Heated');
  if (lowerName.includes('outdoor')) tags.push('Outdoor', 'Nature');
  if (lowerName.includes('beach')) tags.push('Beach', 'Ocean View');
  
  // Add tags based on types
  if (types.includes('gym')) tags.push('Gym', 'Fitness Equipment');
  if (types.includes('spa')) tags.push('Spa Services', 'Wellness');
  if (types.includes('beauty_salon')) tags.push('Beauty', 'Salon Services');
  if (types.includes('physiotherapist')) tags.push('Physical Therapy', 'Rehabilitation');
  if (types.includes('chiropractor')) tags.push('Chiropractic', 'Spinal Care');
  
  // Remove duplicates and return
  return [...new Set(tags)].slice(0, 10); // Limit to 10 tags
}

// Main function to generate comprehensive wellness CSV
async function generateComprehensiveWellnessCSV() {
  console.log('🚀 Starting comprehensive wellness data collection...');
  console.log(`📍 Searching ${locations.length} locations`);
  console.log(`🔍 Using ${wellnessSearchTerms.length} search terms`);
  
  const allPlaces = new Map(); // Use Map to avoid duplicates
  let totalSearches = 0;
  
  // Search for each term in each location
  for (const location of locations) {
    console.log(`\n📍 Searching in ${location}...`);
    
    for (const searchTerm of wellnessSearchTerms) {
      totalSearches++;
      console.log(`  🔍 ${searchTerm}...`);
      
      const places = await searchGooglePlaces(searchTerm, location);
      
      for (const place of places) {
        if (place.business_status === 'OPERATIONAL') {
          allPlaces.set(place.place_id, place);
        }
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`\n✅ Found ${allPlaces.size} unique wellness businesses`);
  console.log('🔍 Getting detailed information...');
  
  // Get detailed information for each place
  const detailedPlaces = [];
  let processed = 0;
  
  for (const [placeId, place] of allPlaces) {
    processed++;
    if (processed % 10 === 0) {
      console.log(`  📊 Processed ${processed}/${allPlaces.size} places...`);
    }
    
    const details = await getPlaceDetails(placeId);
    if (details) {
      detailedPlaces.push(details);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  console.log(`\n📋 Generating CSV with ${detailedPlaces.length} businesses...`);
  
  // Generate CSV rows
  const csvRows = detailedPlaces.map(place => {
    const category = categorizeBusiness(place.types || [], place.name, place);
    const tags = generateTags(place.types || [], place.name, place);
    const photoUrl = place.photos && place.photos[0] ? 
      generatePhotoURL(place.photos[0].photo_reference) : '';
    
    // Extract address components
    const addressParts = place.formatted_address ? place.formatted_address.split(', ') : [];
    const city = addressParts[1] || '';
    const stateZip = addressParts[2] || '';
    const state = stateZip.split(' ')[0] || 'CA';
    const zipCode = stateZip.split(' ')[1] || '';
    
    // Format hours
    const hours = place.opening_hours ? place.opening_hours.weekday_text.join('; ') : '';
    
    // Generate neighborhood based on city
    let neighborhood = city;
    if (city === 'Santa Cruz') {
      neighborhood = 'Santa Cruz';
    } else if (city === 'Capitola') {
      neighborhood = 'Capitola';
    }
    
    return [
      // Basic Information
      place.name || '',
      category,
      '', // Subcategory
      place.editorial_summary?.overview || '',
      '', // LongDescription
      '', // WriteUp
      
      // Contact & Location
      place.formatted_address || '',
      city,
      state,
      zipCode,
      place.formatted_phone_number || '',
      place.website || '',
      '', // Email
      '', // Instagram
      '', // Facebook
      place.geometry?.location?.lat?.toString() || '',
      place.geometry?.location?.lng?.toString() || '',
      neighborhood,
      '', // CrossStreets
      
      // Services & Offerings
      tags.join('; '), // Services
      '', // Specialties
      '', // Amenities
      '', // Equipment
      '', // Classes
      '', // Programs
      
      // Pricing & Hours
      place.price_level ? place.price_level.toString() : '2',
      '', // Pricing
      hours,
      '', // HolidayHours
      '', // BestTime
      '', // PeakHours
      
      // Features & Accessibility
      'Indoor', // IndoorOutdoor
      'Street Parking', // Parking
      '', // PublicTransportation
      '', // WheelchairAccessible
      '', // FamilyFriendly
      '', // PetFriendly
      '', // Wifi
      '', // Showers
      '', // LockerRoom
      '', // EquipmentRental
      
      // Wellness Specific
      category, // WellnessType
      tags.join('; '), // TreatmentTypes
      '', // Certification
      '', // Licensed
      '', // InsuranceAccepted
      '', // AppointmentRequired
      '', // WalkInsWelcome
      '', // GroupSessions
      '', // PrivateSessions
      
      // Target Demographics
      'All Levels', // TargetAudience
      'Beginner to Advanced', // SkillLevel
      'All Ages', // AgeGroups
      'Yes', // BeginnerFriendly
      '', // AdvancedPrograms
      
      // Quality & Reviews
      place.rating ? place.rating.toString() : '',
      place.user_ratings_total ? place.user_ratings_total.toString() : '',
      '', // StaffPicks
      '', // Awards
      '', // Certifications
      
      // Media & Marketing
      photoUrl,
      '', // ImageGallery
      '', // VideoURL
      '', // VirtualTour
      '', // SocialMedia
      
      // Business Details
      'Wellness Business', // BusinessType
      '', // Ownership
      '', // Established
      '', // StaffSize
      'English', // Languages
      
      // Additional Fields
      tags.join(', '), // Tags
      tags.join(', '), // Keywords
      '', // Seasonal
      '', // WeatherDependent
      '', // BookingPlatform
      '', // CancellationPolicy
      '', // MembershipRequired
      '', // TrialClass
      '', // PackageDeals
      
      // SEO & Discovery
      `${place.name} - ${category} in ${neighborhood}`, // MetaDescription
      tags.join(', '), // MetaKeywords
      '', // Featured
      '', // Popular
      '' // Trending
    ];
  });
  
  // Create CSV content
  const csvContent = [
    fieldHeaders.join(','),
    ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');
  
  // Write to file
  const outputPath = path.join(__dirname, '..', 'santacruz-wellness-comprehensive-google.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  
  console.log(`\n✅ Generated comprehensive wellness CSV!`);
  console.log(`📁 Saved to: ${outputPath}`);
  console.log(`📊 Total businesses: ${detailedPlaces.length}`);
  console.log(`🔍 Total API searches: ${totalSearches}`);
  console.log(`📋 Fields included: ${fieldHeaders.length}`);
  console.log(`🖼️  Photos included: ${detailedPlaces.filter(p => p.photos).length}`);
  
  // Summary by category
  const categoryCount = {};
  detailedPlaces.forEach(place => {
    const category = categorizeBusiness(place.types || [], place.name, place);
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
  
  console.log(`\n📊 Breakdown by category:`);
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} businesses`);
  });
  
  console.log(`\n🚀 Next steps:`);
  console.log(`1. Import ${outputPath} to Airtable Wellness table`);
  console.log(`2. Review and edit business information`);
  console.log(`3. Add additional photos and details`);
  console.log(`4. Update website with comprehensive wellness listings`);
}

// Run the script
generateComprehensiveWellnessCSV().catch(console.error);
