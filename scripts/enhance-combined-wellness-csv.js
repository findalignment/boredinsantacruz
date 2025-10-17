#!/usr/bin/env node

/**
 * Enhance Combined Wellness CSV with Google Places API Data
 * Combines both wellness CSVs and adds real Google Places data
 */

const fs = require('fs');
const path = require('path');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!GOOGLE_PLACES_API_KEY) {
  console.error('❌ GOOGLE_PLACES_API_KEY environment variable is required');
  process.exit(1);
}

// Read the combined CSV
const csvPath = path.join(__dirname, '..', 'santacruz-wellness-combined.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');
const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));

// Find the indices of important columns
const nameIndex = headers.indexOf('Name');
const addressIndex = headers.indexOf('Address');
const photoUrlIndex = headers.indexOf('PhotoURL');
const ratingIndex = headers.indexOf('Rating');
const reviewCountIndex = headers.indexOf('ReviewCount');

console.log('🔍 Enhancing combined wellness database with Google Places API data...');
console.log(`📊 Processing ${lines.length - 1} wellness businesses...`);

// Function to search for a place by name and address
async function findPlaceOnGoogle(name, address) {
  const query = `${name} ${address}`;
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0]; // Return first result
    }
    return null;
  } catch (error) {
    console.error(`❌ Error searching for ${name}:`, error.message);
    return null;
  }
}

// Function to get place details
async function getPlaceDetails(placeId) {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,formatted_phone_number,website,opening_hours,rating,user_ratings_total,photos,types,business_status,price_level,reviews,editorial_summary,url&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    }
    return null;
  } catch (error) {
    console.error(`❌ Error getting details for ${placeId}:`, error.message);
    return null;
  }
}

// Function to generate photo URL
function generatePhotoURL(photoReference, maxWidth = 800) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}

// Process each business
async function enhanceCombinedCSV() {
  const enhancedLines = [lines[0]]; // Keep header
  let foundCount = 0;
  let photoCount = 0;
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
    const name = values[nameIndex];
    const address = values[addressIndex];
    
    console.log(`\n🔍 Processing: ${name}`);
    
    // Search for the business on Google Places
    const place = await findPlaceOnGoogle(name, address);
    
    if (place) {
      foundCount++;
      console.log(`  ✅ Found on Google Places`);
      
      // Get detailed information
      const details = await getPlaceDetails(place.place_id);
      
      if (details) {
        console.log(`  📊 Rating: ${details.rating || 'N/A'}, Reviews: ${details.user_ratings_total || 'N/A'}`);
        
        // Update values with Google Places data
        if (details.rating) values[ratingIndex] = details.rating.toString();
        if (details.user_ratings_total) values[reviewCountIndex] = details.user_ratings_total.toString();
        
        // Add photo URL if available
        if (details.photos && details.photos[0]) {
          const photoUrl = generatePhotoURL(details.photos[0].photo_reference);
          values[photoUrlIndex] = photoUrl;
          photoCount++;
          console.log(`  🖼️  Added photo URL`);
        }
        
        // Add additional fields if they exist in our CSV
        const websiteIndex = headers.indexOf('Website');
        if (websiteIndex !== -1 && details.website) {
          values[websiteIndex] = details.website;
        }
        
        const phoneIndex = headers.indexOf('Phone');
        if (phoneIndex !== -1 && details.formatted_phone_number) {
          values[phoneIndex] = details.formatted_phone_number;
        }
        
        // Add opening hours if available
        const hoursIndex = headers.indexOf('Hours');
        if (hoursIndex !== -1 && details.opening_hours && details.opening_hours.weekday_text) {
          values[hoursIndex] = details.opening_hours.weekday_text.join('; ');
        }
        
      } else {
        console.log(`  ⚠️  Could not get details`);
      }
    } else {
      console.log(`  ❌ Not found on Google Places`);
    }
    
    // Reconstruct the line with updated values
    const enhancedLine = values.map(v => `"${v}"`).join(',');
    enhancedLines.push(enhancedLine);
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Write enhanced CSV
  const enhancedCsvPath = path.join(__dirname, '..', 'santacruz-wellness-complete-database.csv');
  fs.writeFileSync(enhancedCsvPath, enhancedLines.join('\n'), 'utf8');
  
  console.log(`\n✅ Enhanced combined wellness database saved!`);
  console.log(`📁 Saved to: ${enhancedCsvPath}`);
  console.log(`📊 Total businesses: ${enhancedLines.length - 1}`);
  console.log(`🔍 Found on Google Places: ${foundCount}/${enhancedLines.length - 1}`);
  console.log(`🖼️  With photos: ${photoCount}/${enhancedLines.length - 1}`);
  
  return {
    total: enhancedLines.length - 1,
    found: foundCount,
    photos: photoCount
  };
}

// Run the enhancement
enhanceCombinedCSV().catch(console.error);
