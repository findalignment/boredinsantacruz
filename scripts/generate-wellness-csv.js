#!/usr/bin/env node

/**
 * Generate comprehensive wellness CSV for Santa Cruz County
 * Includes: fitness, wellness, massage, bodywork, spa, yoga, pilates, bootcamps, etc.
 * With PhotoURLs for images
 */

const fs = require('fs');
const path = require('path');

// Comprehensive wellness categories and search terms
const wellnessCategories = [
  // Fitness Centers & Gyms
  'fitness center', 'gym', 'crossfit', 'boxing gym', 'martial arts', 'muay thai', 'jiu jitsu',
  
  // Yoga & Pilates
  'yoga studio', 'pilates studio', 'hot yoga', 'vinyasa yoga', 'hatha yoga', 'ashtanga yoga',
  
  // Massage & Bodywork
  'massage therapy', 'massage spa', 'deep tissue massage', 'swedish massage', 'thai massage',
  'bodywork', 'myofascial release', 'craniosacral therapy', 'rolfing', 'trigger point therapy',
  
  // Spas & Wellness
  'spa', 'day spa', 'wellness center', 'holistic health', 'meditation center', 'reiki',
  'acupuncture', 'chiropractic', 'physical therapy', 'occupational therapy',
  
  // Specialized Fitness
  'bootcamp', 'personal training', 'group fitness', 'barre', 'dance studio', 'swimming pool',
  'tennis club', 'golf course', 'rock climbing gym', 'cycling studio', 'rowing club',
  
  // Alternative Wellness
  'naturopathic doctor', 'homeopathic', 'herbal medicine', 'nutritionist', 'dietitian',
  'life coach', 'wellness coach', 'mental health', 'therapy', 'counseling'
];

// Santa Cruz County locations
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
  'Downtown Santa Cruz, CA'
];

// Sample wellness businesses with realistic data
const wellnessBusinesses = [
  {
    name: 'Santa Cruz Yoga Center',
    category: 'Yoga Studio',
    address: '123 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 555-0123',
    website: 'https://santacruzyoga.com',
    description: 'Premier yoga studio offering vinyasa, hatha, and hot yoga classes for all levels.',
    hours: 'Mon-Fri: 6:00 AM - 9:00 PM; Sat-Sun: 8:00 AM - 7:00 PM',
    amenities: ['Parking', 'Showers', 'Equipment Rental', 'Retail Shop'],
    priceLevel: 2,
    neighborhood: 'Downtown Santa Cruz'
  },
  {
    name: 'Capitola Wellness Spa',
    category: 'Spa & Wellness',
    address: '456 Esplanade, Capitola, CA 95010',
    phone: '(831) 555-0456',
    website: 'https://capitolawellness.com',
    description: 'Full-service spa offering massage, facials, and wellness treatments in a beachside setting.',
    hours: 'Daily: 9:00 AM - 8:00 PM',
    amenities: ['Parking', 'Ocean Views', 'Couples Treatment Room', 'Retail Shop'],
    priceLevel: 3,
    neighborhood: 'Capitola'
  },
  {
    name: 'Westside Fitness & CrossFit',
    category: 'Fitness Center',
    address: '789 Mission Street, Santa Cruz, CA 95060',
    phone: '(831) 555-0789',
    website: 'https://westsidfitness.com',
    description: 'CrossFit box and fitness center with personal training, group classes, and open gym.',
    hours: 'Mon-Fri: 5:00 AM - 10:00 PM; Sat-Sun: 7:00 AM - 6:00 PM',
    amenities: ['Parking', 'Showers', 'Equipment', 'Personal Training'],
    priceLevel: 2,
    neighborhood: 'Westside Santa Cruz'
  },
  {
    name: 'Aptos Pilates Studio',
    category: 'Pilates Studio',
    address: '321 Soquel Drive, Aptos, CA 95003',
    phone: '(831) 555-0321',
    website: 'https://aptospilates.com',
    description: 'Classical and contemporary pilates instruction with certified instructors and small class sizes.',
    hours: 'Mon-Sat: 6:00 AM - 8:00 PM; Sun: 8:00 AM - 6:00 PM',
    amenities: ['Equipment', 'Private Sessions', 'Group Classes', 'Parking'],
    priceLevel: 3,
    neighborhood: 'Aptos'
  },
  {
    name: 'Therapeutic Massage Center',
    category: 'Massage Therapy',
    address: '654 Ocean Street, Santa Cruz, CA 95060',
    phone: '(831) 555-0654',
    website: 'https://therapeuticmassage.com',
    description: 'Licensed massage therapists specializing in deep tissue, sports massage, and therapeutic bodywork.',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM; Sat: 9:00 AM - 5:00 PM',
    amenities: ['Parking', 'Insurance Accepted', 'Gift Certificates', 'Online Booking'],
    priceLevel: 2,
    neighborhood: 'Santa Cruz'
  },
  {
    name: 'Santa Cruz Bootcamp',
    category: 'Fitness Bootcamp',
    address: 'Beach Flats Park, Santa Cruz, CA 95060',
    phone: '(831) 555-0987',
    website: 'https://santacruzbootcamp.com',
    description: 'Outdoor fitness bootcamp classes on the beach with certified trainers and high-energy workouts.',
    hours: 'Mon-Fri: 6:00 AM - 7:00 AM, 6:00 PM - 7:00 PM; Sat: 8:00 AM - 9:00 AM',
    amenities: ['Outdoor', 'Equipment Provided', 'All Levels', 'Group Motivation'],
    priceLevel: 2,
    neighborhood: 'Santa Cruz'
  },
  {
    name: 'Capitola Pilates & Barre',
    category: 'Pilates Studio',
    address: '987 Capitola Road, Capitola, CA 95010',
    phone: '(831) 555-0987',
    website: 'https://capitolapilates.com',
    description: 'Pilates and barre classes combining strength, flexibility, and core conditioning.',
    hours: 'Mon-Fri: 6:00 AM - 9:00 PM; Sat-Sun: 8:00 AM - 6:00 PM',
    amenities: ['Parking', 'Equipment', 'Private Sessions', 'Group Classes'],
    priceLevel: 3,
    neighborhood: 'Capitola'
  },
  {
    name: 'Scotts Valley Wellness Center',
    category: 'Wellness Center',
    address: '147 Mount Hermon Road, Scotts Valley, CA 95066',
    phone: '(831) 555-0147',
    website: 'https://scottsvalleywellness.com',
    description: 'Comprehensive wellness center offering acupuncture, massage, nutrition counseling, and holistic health services.',
    hours: 'Mon-Fri: 8:00 AM - 7:00 PM; Sat: 9:00 AM - 4:00 PM',
    amenities: ['Parking', 'Insurance Accepted', 'Multiple Services', 'Holistic Approach'],
    priceLevel: 3,
    neighborhood: 'Scotts Valley'
  },
  {
    name: 'Pleasure Point Yoga',
    category: 'Yoga Studio',
    address: '258 41st Avenue, Santa Cruz, CA 95062',
    phone: '(831) 555-0258',
    website: 'https://pleasurepointyoga.com',
    description: 'Ocean-view yoga studio specializing in vinyasa flow, restorative yoga, and meditation.',
    hours: 'Daily: 6:00 AM - 9:00 PM',
    amenities: ['Ocean Views', 'Parking', 'Equipment', 'Retail Shop'],
    priceLevel: 2,
    neighborhood: 'Pleasure Point'
  },
  {
    name: 'Aptos Fitness Club',
    category: 'Fitness Center',
    address: '369 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 555-0369',
    website: 'https://aptosfitness.com',
    description: 'Full-service fitness club with cardio equipment, weight training, group classes, and personal training.',
    hours: 'Mon-Fri: 5:00 AM - 10:00 PM; Sat-Sun: 6:00 AM - 8:00 PM',
    amenities: ['Parking', 'Showers', 'Equipment', 'Personal Training', 'Group Classes'],
    priceLevel: 2,
    neighborhood: 'Aptos'
  },
  {
    name: 'Soquel Massage & Bodywork',
    category: 'Massage Therapy',
    address: '741 Soquel Avenue, Soquel, CA 95073',
    phone: '(831) 555-0741',
    website: 'https://soquelmassage.com',
    description: 'Professional massage therapy including Swedish, deep tissue, sports massage, and therapeutic bodywork.',
    hours: 'Mon-Fri: 9:00 AM - 8:00 PM; Sat: 9:00 AM - 6:00 PM',
    amenities: ['Parking', 'Insurance Accepted', 'Gift Certificates', 'Online Booking'],
    priceLevel: 2,
    neighborhood: 'Soquel'
  },
  {
    name: 'Watsonville Community Fitness',
    category: 'Fitness Center',
    address: '852 Main Street, Watsonville, CA 95076',
    phone: '(831) 555-0852',
    website: 'https://watsonvillefitness.com',
    description: 'Community-focused fitness center with affordable memberships, group classes, and personal training.',
    hours: 'Mon-Fri: 5:00 AM - 10:00 PM; Sat-Sun: 6:00 AM - 8:00 PM',
    amenities: ['Parking', 'Showers', 'Equipment', 'Childcare', 'Group Classes'],
    priceLevel: 1,
    neighborhood: 'Watsonville'
  },
  {
    name: 'Live Oak Yoga & Wellness',
    category: 'Yoga Studio',
    address: '963 17th Avenue, Santa Cruz, CA 95062',
    phone: '(831) 555-0963',
    website: 'https://liveoakyoga.com',
    description: 'Welcoming yoga studio offering classes for all levels, meditation, and wellness workshops.',
    hours: 'Mon-Fri: 6:00 AM - 9:00 PM; Sat-Sun: 8:00 AM - 7:00 PM',
    amenities: ['Parking', 'Equipment', 'Retail Shop', 'Workshops'],
    priceLevel: 2,
    neighborhood: 'Live Oak'
  },
  {
    name: 'Santa Cruz Acupuncture & Wellness',
    category: 'Acupuncture',
    address: '159 Water Street, Santa Cruz, CA 95060',
    phone: '(831) 555-0159',
    website: 'https://santacruzacupuncture.com',
    description: 'Licensed acupuncturist providing traditional Chinese medicine, acupuncture, and wellness consultations.',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM; Sat: 9:00 AM - 2:00 PM',
    amenities: ['Parking', 'Insurance Accepted', 'Traditional Medicine', 'Consultations'],
    priceLevel: 3,
    neighborhood: 'Santa Cruz'
  },
  {
    name: 'Capitola Beach Fitness',
    category: 'Fitness Bootcamp',
    address: 'Capitola Beach, Capitola, CA 95010',
    phone: '(831) 555-0741',
    website: 'https://capitolabeachfitness.com',
    description: 'Beach fitness classes including HIIT, yoga, and bootcamp workouts with ocean views.',
    hours: 'Mon-Fri: 6:00 AM - 7:00 AM, 6:00 PM - 7:00 PM; Sat: 8:00 AM - 9:00 AM',
    amenities: ['Beach Location', 'Equipment Provided', 'All Levels', 'Ocean Views'],
    priceLevel: 2,
    neighborhood: 'Capitola'
  }
];

// Generate PhotoURLs (these would be replaced with actual Google Places API calls)
function generatePhotoURL(businessName, category) {
  // This is a placeholder - in real implementation, you'd use Google Places API
  const baseURL = 'https://maps.googleapis.com/maps/api/place/photo';
  const photoRef = `photo_ref_${businessName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
  
  return `${baseURL}?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`;
}

// Convert to CSV format
function generateCSV() {
  const headers = [
    'Name',
    'Category',
    'Address',
    'Phone',
    'Website',
    'Description',
    'Hours',
    'Amenities',
    'PriceLevel',
    'Neighborhood',
    'PhotoURL',
    'Latitude',
    'Longitude'
  ];

  const rows = wellnessBusinesses.map(business => [
    business.name,
    business.category,
    business.address,
    business.phone,
    business.website,
    business.description,
    business.hours,
    business.amenities.join('; '),
    business.priceLevel,
    business.neighborhood,
    generatePhotoURL(business.name, business.category),
    '', // Latitude - would be filled by geocoding
    ''  // Longitude - would be filled by geocoding
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');

  return csvContent;
}

// Write CSV file
const csvContent = generateCSV();
const outputPath = path.join(__dirname, '..', 'santacruz-wellness-comprehensive.csv');

fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`✅ Generated comprehensive wellness CSV with ${wellnessBusinesses.length} businesses`);
console.log(`📁 Saved to: ${outputPath}`);
console.log(`📊 Categories included: Yoga, Pilates, Fitness, Massage, Spa, Wellness, Bootcamp, etc.`);
console.log(`🖼️ PhotoURLs included for image integration`);
console.log(`\n🚀 Next steps:`);
console.log(`1. Replace photo references with actual Google Places API calls`);
console.log(`2. Add geocoding for latitude/longitude coordinates`);
console.log(`3. Import to Airtable Wellness table`);
console.log(`4. Update PhotoURL field with actual image URLs`);
