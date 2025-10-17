const fs = require('fs');
const path = require('path');

// Read the existing CSV
const csvContent = fs.readFileSync('santacruz-wellness-airtable-ready.csv', 'utf8');
const lines = csvContent.split('\n');
const headers = lines[0].split(',');
const data = lines.slice(1).filter(line => line.trim());

console.log(`Found ${data.length} records with ${headers.length} fields`);

// Essential fields for Airtable (limit to 20 fields max for better compatibility)
const essentialFields = [
  'Name',
  'Category', 
  'Description',
  'Address',
  'City',
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

// Function to escape CSV values
function escapeCsvValue(value) {
  if (!value || value === 'undefined') return '';
  
  // Convert to string and clean up
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

// Function to get field value safely
function getFieldValue(row, fieldName) {
  const index = headers.indexOf(fieldName);
  if (index === -1) return '';
  
  const value = row.split(',')[index];
  return escapeCsvValue(value);
}

// Create simplified CSV
const simplifiedLines = [];
simplifiedLines.push(essentialFields.join(','));

data.forEach((line, index) => {
  if (!line.trim()) return;
  
  const row = [];
  essentialFields.forEach(field => {
    const value = getFieldValue(line, field);
    row.push(value);
  });
  
  simplifiedLines.push(row.join(','));
});

// Write the simplified CSV
const outputPath = 'santacruz-wellness-airtable-simple.csv';
fs.writeFileSync(outputPath, simplifiedLines.join('\n'));

console.log(`Created simplified CSV with ${essentialFields.length} fields and ${data.length} records`);
console.log(`Output file: ${outputPath}`);

// Also create an even simpler version with just the most essential fields
const basicFields = [
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
  'Rating',
  'PhotoURL',
  'Tags'
];

const basicLines = [];
basicLines.push(basicFields.join(','));

data.forEach((line, index) => {
  if (!line.trim()) return;
  
  const row = [];
  basicFields.forEach(field => {
    const value = getFieldValue(line, field);
    row.push(value);
  });
  
  basicLines.push(row.join(','));
});

const basicOutputPath = 'santacruz-wellness-airtable-basic.csv';
fs.writeFileSync(basicOutputPath, basicLines.join('\n'));

console.log(`Created basic CSV with ${basicFields.length} fields and ${data.length} records`);
console.log(`Output file: ${basicOutputPath}`);

// Create import instructions
const instructions = `
# Airtable Import Instructions

## Files Created:
1. santacruz-wellness-airtable-simple.csv (${essentialFields.length} fields)
2. santacruz-wellness-airtable-basic.csv (${basicFields.length} fields)

## Import Steps:
1. Open your Airtable base
2. Go to your Wellness table
3. Click "Add records" → "Import a spreadsheet"
4. Upload the CSV file
5. Map the fields to your Airtable columns
6. Click "Import"

## Recommended Fields for Airtable:
${essentialFields.map(field => `- ${field}`).join('\n')}

## Troubleshooting:
- If import fails, try the basic version first
- Make sure field names match your Airtable column names
- Check that your Airtable plan supports the number of records (${data.length})
- Ensure all required fields are mapped

## Field Mapping Tips:
- Name → Title
- Category → Category (single select)
- Description → Description (long text)
- Address → Address
- Phone → Phone
- Website → Website
- Latitude → Latitude (number)
- Longitude → Longitude (number)
- Neighborhood → Neighborhood (single select)
- Hours → Hours (long text)
- Rating → Rating (number)
- PhotoURL → Photo URL
- Tags → Tags (multiple select)
`;

fs.writeFileSync('AIRTABLE_IMPORT_INSTRUCTIONS.md', instructions);

console.log('Created AIRTABLE_IMPORT_INSTRUCTIONS.md');
console.log('\n✅ CSV files ready for Airtable import!');
