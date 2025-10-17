const fs = require('fs');

// Read the original CSV
const csvContent = fs.readFileSync('santacruz-wellness-airtable-ready.csv', 'utf8');

// Simple CSV parser that handles quoted fields properly
function parseCSV(content) {
  const lines = content.split('\n');
  const result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        if (inQuotes && line[j + 1] === '"') {
          // Escaped quote
          current += '"';
          j++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    fields.push(current); // Add the last field
    result.push(fields);
  }
  
  return result;
}

// Parse the CSV
const parsedData = parseCSV(csvContent);
console.log(`Parsed ${parsedData.length} rows with ${parsedData[0].length} fields`);

// Essential fields for Airtable
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

const headers = parsedData[0];
const dataRows = parsedData.slice(1);

// Function to escape CSV values
function escapeCsvValue(value) {
  if (!value || value === 'undefined' || value.trim() === '') return '';
  
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
  
  const value = row[index] || '';
  return escapeCsvValue(value);
}

// Create simplified CSV
const simplifiedLines = [];
simplifiedLines.push(essentialFields.join(','));

dataRows.forEach((row, index) => {
  if (!row || row.length === 0) return;
  
  const csvRow = [];
  essentialFields.forEach(field => {
    const value = getFieldValue(row, field);
    csvRow.push(value);
  });
  
  simplifiedLines.push(csvRow.join(','));
});

// Write the simplified CSV
const outputPath = 'santacruz-wellness-airtable-fixed.csv';
fs.writeFileSync(outputPath, simplifiedLines.join('\n'));

console.log(`Created fixed CSV with ${essentialFields.length} fields and ${dataRows.length} records`);
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

dataRows.forEach((row, index) => {
  if (!row || row.length === 0) return;
  
  const csvRow = [];
  basicFields.forEach(field => {
    const value = getFieldValue(row, field);
    csvRow.push(value);
  });
  
  basicLines.push(csvRow.join(','));
});

const basicOutputPath = 'santacruz-wellness-airtable-minimal.csv';
fs.writeFileSync(basicOutputPath, basicLines.join('\n'));

console.log(`Created minimal CSV with ${basicFields.length} fields and ${dataRows.length} records`);
console.log(`Output file: ${basicOutputPath}`);

// Show sample of the fixed data
console.log('\nSample of fixed data:');
console.log('Headers:', essentialFields.slice(0, 5).join(', '));
console.log('First row:', simplifiedLines[1].substring(0, 200) + '...');

// Create import instructions
const instructions = `
# Airtable Import Instructions - FIXED VERSION

## Files Created:
1. santacruz-wellness-airtable-fixed.csv (${essentialFields.length} fields) - **RECOMMENDED**
2. santacruz-wellness-airtable-minimal.csv (${basicFields.length} fields) - **BACKUP OPTION**

## Import Steps:
1. Open your Airtable base
2. Go to your Wellness table
3. Click "Add records" → "Import a spreadsheet"
4. Upload santacruz-wellness-airtable-fixed.csv
5. Map the fields to your Airtable columns
6. Click "Import"

## Field Mapping for Airtable:
- Name → Title (Primary field)
- Category → Category (Single select: Yoga Studio, Pilates Studio, Fitness Center, etc.)
- Description → Description (Long text)
- Address → Address (Long text)
- City → City (Single select)
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

## Troubleshooting:
- ✅ **Fixed CSV parsing issues** - commas and quotes are properly escaped
- ✅ **Limited to essential fields** - easier for Airtable to handle
- ✅ **Clean data format** - no line breaks or formatting issues
- ✅ **Proper escaping** - all special characters handled correctly

## If Import Still Fails:
1. Try the minimal version (santacruz-wellness-airtable-minimal.csv)
2. Import in smaller batches (10-15 records at a time)
3. Check your Airtable plan limits
4. Ensure field types match (text, number, etc.)

## Record Count: ${dataRows.length} wellness facilities
`;

fs.writeFileSync('AIRTABLE_IMPORT_FIXED.md', instructions);

console.log('Created AIRTABLE_IMPORT_FIXED.md');
console.log('\n✅ FIXED CSV files ready for Airtable import!');
console.log('📁 Use: santacruz-wellness-airtable-fixed.csv');
