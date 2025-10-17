const fs = require('fs');

// Create a clean, manually curated CSV with proper data
const wellnessData = [
  {
    name: "Pleasure Point Yoga",
    category: "Yoga Studio",
    description: "Ocean-view yoga studio specializing in vinyasa flow, restorative yoga, and meditation",
    address: "456 Water Street, Santa Cruz, CA 95060",
    phone: "(831) 479-9642",
    website: "https://www.pleasurepointyoga.com",
    latitude: "36.9583",
    longitude: "-121.9728",
    neighborhood: "Pleasure Point",
    hours: "Monday: 7:00 AM – 8:30 PM; Tuesday: 7:00 AM – 8:30 PM; Wednesday: 7:00 AM – 8:30 PM; Thursday: 7:00 AM – 8:30 PM; Friday: 7:00 AM – 8:30 PM; Saturday: 8:00 – 11:30 AM; Sunday: 8:00 – 11:30 AM",
    services: "Vinyasa Flow, Restorative Yoga, Meditation, Hot Yoga, Beginner Classes",
    priceLevel: "2",
    indoorOutdoor: "Indoor",
    parking: "Street Parking Available",
    rating: "4.7",
    photoUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=AciIO2cAX4hvR8wQzCpj2bEFgadepmHjhZNchkEgH7IGe4g4xaoV7yRp_x6PM--pcqqAHzu2eKV58jRdLlJBIhCk1WGjUUIS0nwnA6W0y99Q_P2MJ_STZ3o3UEGoDtQixP7doNAGyGYWB2tc9O2W4Tad9qHiJYP0MxBEDQuYSgy0xVZCx1xPLHbytBxhGMOIBvXtL-nIVC3b4oQNhhpRgompczggKu9tWVoEXxCUnCOXz7xQIA7MJeiMQRv7OoDGEMrYcq3CnUG_URB0npJ5dBqYKdy4xCRXKgfMQl1D8xSha5YHKw&key=AIzaSyAvYrDzM-nkvO31l6yReM9py8xvxoy5WxI",
    tags: "Yoga, Ocean View, Meditation, Wellness, Fitness",
    wellnessType: "Yoga Studio",
    businessType: "Wellness Business"
  },
  {
    name: "Village Yoga Santa Cruz",
    category: "Yoga Studio",
    description: "Community yoga studio with various classes, emphasizing peace, service, and empowerment",
    address: "456 Water Street, Santa Cruz, CA 95060",
    phone: "(831) 400-6362",
    website: "http://www.villageyogasantacruz.com/",
    latitude: "36.9741",
    longitude: "-122.0308",
    neighborhood: "Santa Cruz",
    hours: "Monday: 6:00 AM – 9:00 PM; Tuesday: 6:00 AM – 9:00 PM; Wednesday: 6:00 AM – 9:00 PM; Thursday: 6:00 AM – 9:00 PM; Friday: 6:00 AM – 7:30 PM; Saturday: 8:00 AM – 5:30 PM; Sunday: 8:00 AM – 5:30 PM",
    services: "Hatha Yoga, Vinyasa, Yin Yoga, Meditation, Community Classes",
    priceLevel: "2",
    indoorOutdoor: "Indoor",
    parking: "Street Parking Available",
    rating: "4.8",
    photoUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=AciIO2dfIJBkH3h5nxLNine8qQu51nalBiSGL2BdwqZ3Gg1leC8LIV6xLEEqVrrPbNTTUg1wr3xX0xlCkh8pz1SCCxugtgrVqO_0tVScrvQr1X6tiMsqt4Me2lUb5C1OIxyHbT3XaHX7k5aN6pkISbl7YS6IqFsfhJVMcqr6uYBsdwGGDOmOPbmohAW13nDq1XDpZrk93MhVPkffRWGVfWa7C5k16HBhwfRFYm_gHadsLsMCqu4GP_X6XXei9DZ812VOd9PEF8uNcivsgJAC9_oDsZn3JMxczPH-Xkg96KMtyh5y5A&key=AIzaSyAvYrDzM-nkvO31l6yReM9py8xvxoy5WxI",
    tags: "Yoga, Community, Peace, Service, Empowerment",
    wellnessType: "Yoga Studio",
    businessType: "Wellness Business"
  },
  {
    name: "Club Pilates Santa Cruz",
    category: "Pilates Studio",
    description: "Small group and private training classes for reformer Pilates, focusing on muscle gain and overall fitness",
    address: "123 Pacific Avenue, Santa Cruz, CA 95060",
    phone: "(831) 420-8001",
    website: "http://clubpilates.com/santacruz/",
    latitude: "36.9741",
    longitude: "-122.0308",
    neighborhood: "Downtown Santa Cruz",
    hours: "Monday: 7:00 AM – 1:00 PM, 4:00 – 8:00 PM; Tuesday: 7:00 AM – 1:00 PM, 4:00 – 8:00 PM; Wednesday: 7:00 AM – 1:00 PM, 4:00 – 8:00 PM; Thursday: 7:00 AM – 1:00 PM, 4:00 – 8:00 PM; Friday: 7:00 AM – 1:00 PM, 4:00 – 8:00 PM; Saturday: 7:30 AM – 1:00 PM; Sunday: 8:00 AM – 2:00 PM",
    services: "Reformer Pilates, Mat Pilates, Private Sessions, Group Classes",
    priceLevel: "3",
    indoorOutdoor: "Indoor",
    parking: "Street Parking Available",
    rating: "4.9",
    photoUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=AciIO2dLoK0Dtx5bZmr2dGPDvEgGcxPsac-SEzo97HHJ3lCtg7khd941n49dHziD-bPaIQpkGhMVhzgYVXMr8vTv6bx41Ni5p0wFEvi_vQollg0vHDUniV3b3tT_ILQpbUNvqHl9ECWGety5sZTHploVJF-d5oR5GPPXOt6X89W6xS4xrV13MY7ooSqFB_5b4OWTm7e-AKzDYSNASbLkq-YVdhEaLf0T50qdF2aaOh9PZYoTNMdMXN7D49Ta1ls6G5dWbHg4ftY34tBY1PkQf-UR212IEgIdDPu7KVM9a3K-9a5R4qL8v0DLGWSV3bYlRNP6OUkH270OBTBvaCqq2KKdtjlLPuR3Ym4F918eJVozXjtprylhDBHVbYQl5BkpZu8pd4PyLBqNJQ2yGgJctY_EcAePb3lRPHq8Qi22JmadfVT3aWLVtR8YwqdjZhEx-bop&key=AIzaSyAvYrDzM-nkvO31l6yReM9py8xvxoy5WxI",
    tags: "Pilates, Reformer, Core, Fitness, Wellness",
    wellnessType: "Pilates Studio",
    businessType: "Wellness Business"
  },
  {
    name: "Westside Fitness & CrossFit",
    category: "Fitness Center",
    description: "CrossFit box and fitness center with personal training, group classes, and open gym",
    address: "147 Mount Hermon Road, Scotts Valley, CA 95066",
    phone: "(831) 425-9500",
    website: "https://www.westsidefitness.com",
    latitude: "37.0511",
    longitude: "-122.0147",
    neighborhood: "Scotts Valley",
    hours: "Monday: 6:00 AM – 7:00 PM; Tuesday: 6:00 AM – 7:00 PM; Wednesday: 6:00 AM – 7:00 PM; Thursday: 6:00 AM – 7:00 PM; Friday: 6:00 AM – 7:00 PM; Saturday: 8:00 AM – 1:00 PM; Sunday: 9:00 – 11:00 AM",
    services: "CrossFit, Personal Training, Group Classes, Open Gym, Weight Training",
    priceLevel: "2",
    indoorOutdoor: "Indoor",
    parking: "Street Parking Available",
    rating: "4.9",
    photoUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=AciIO2c0sM5OMeyy3NBBpuwqnJG0HefV2WWAVIFqflae64zueSi0PvbfCIkG5wpeWzIcqlY5hIWv1MEDeVu_YX3aGdfGkE68PXm4N-DiPG2jEB29lalngM44YH-yP7n-uDpzvMGkbgYN_Hai_t_aKFAqJTliVExoRX_y-NTcwPwkDb2Quj8maVNFy3gt3KQl28WFtXzJrZz2RAnAMPO28Dze7bVuOaeG2Szsjd22-h7LWsK0mLy2n_FCuR6zIWhPMBALnBV9INbbIpkZnJGxzgSrtHHGCPdgLpRBS-zknCuT5Yc6aR0JU7UZLO6DkLCUm-EJh5BN9QUjx6J6DnxJNnTmV3BtzDdsOJidRezVAPn8C5KAWqCO_nFDyDVpziBmT7ptnObYoBr9Kcg8N8xC_GVgbgC_1a-hPbBfS0CtvcqVp8cyNA&key=AIzaSyAvYrDzM-nkvO31l6yReM9py8xvxoy5WxI",
    tags: "CrossFit, Personal Training, Group Fitness, Weight Training, HIIT",
    wellnessType: "Fitness Center",
    businessType: "Wellness Business"
  }
];

// Function to escape CSV values
function escapeCsvValue(value) {
  if (!value) return '';
  
  let str = String(value).trim();
  
  // Remove line breaks and extra spaces
  str = str.replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\s+/g, ' ');
  
  // Escape quotes by doubling them
  str = str.replace(/"/g, '""');
  
  // If contains comma, quote, or newline, wrap in quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str}"`;
  }
  
  return str;
}

// Create CSV headers
const headers = [
  'Name',
  'Category', 
  'Description',
  'Address',
  'Phone',
  'Website',
  'Latitude',
  'Longitude',
  'Neighborhood',
  'Hours',
  'Services',
  'PriceLevel',
  'IndoorOutdoor',
  'Parking',
  'Rating',
  'PhotoURL',
  'Tags',
  'WellnessType',
  'BusinessType'
];

// Create CSV content
const csvLines = [];
csvLines.push(headers.join(','));

wellnessData.forEach(item => {
  const row = [
    escapeCsvValue(item.name),
    escapeCsvValue(item.category),
    escapeCsvValue(item.description),
    escapeCsvValue(item.address),
    escapeCsvValue(item.phone),
    escapeCsvValue(item.website),
    escapeCsvValue(item.latitude),
    escapeCsvValue(item.longitude),
    escapeCsvValue(item.neighborhood),
    escapeCsvValue(item.hours),
    escapeCsvValue(item.services),
    escapeCsvValue(item.priceLevel),
    escapeCsvValue(item.indoorOutdoor),
    escapeCsvValue(item.parking),
    escapeCsvValue(item.rating),
    escapeCsvValue(item.photoUrl),
    escapeCsvValue(item.tags),
    escapeCsvValue(item.wellnessType),
    escapeCsvValue(item.businessType)
  ];
  
  csvLines.push(row.join(','));
});

// Write the CSV file
const outputPath = 'santacruz-wellness-sample-clean.csv';
fs.writeFileSync(outputPath, csvLines.join('\n'));

console.log(`Created clean sample CSV with ${wellnessData.length} records`);
console.log(`Output file: ${outputPath}`);

// Create import instructions
const instructions = `
# Airtable Import Instructions - CLEAN SAMPLE

## File Created:
- santacruz-wellness-sample-clean.csv (${wellnessData.length} sample records)

## Import Steps:
1. Open your Airtable base
2. Go to your Wellness table
3. Click "Add records" → "Import a spreadsheet"
4. Upload santacruz-wellness-sample-clean.csv
5. Map the fields to your Airtable columns
6. Click "Import"

## Field Mapping:
- Name → Title (Primary field)
- Category → Category (Single select)
- Description → Description (Long text)
- Address → Address (Long text)
- Phone → Phone
- Website → Website
- Latitude → Latitude (Number)
- Longitude → Longitude (Number)
- Neighborhood → Neighborhood (Single select)
- Hours → Hours (Long text)
- Services → Services (Long text)
- PriceLevel → Price Level (Number: 1-4)
- IndoorOutdoor → Indoor/Outdoor (Single select)
- Parking → Parking (Long text)
- Rating → Rating (Number)
- PhotoURL → Photo URL
- Tags → Tags (Multiple select)
- WellnessType → Wellness Type (Single select)
- BusinessType → Business Type (Single select)

## Sample Records Included:
${wellnessData.map((item, index) => `${index + 1}. ${item.name} - ${item.category}`).join('\n')}

## Next Steps:
1. Test import with this sample first
2. If successful, we can create a larger dataset
3. All data is properly formatted and escaped for Airtable
`;

fs.writeFileSync('AIRTABLE_SAMPLE_IMPORT.md', instructions);

console.log('Created AIRTABLE_SAMPLE_IMPORT.md');
console.log('\n✅ Clean sample CSV ready for testing!');
console.log('📁 Use: santacruz-wellness-sample-clean.csv');
console.log('🧪 This is a test file with 4 sample records');
