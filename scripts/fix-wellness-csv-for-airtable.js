#!/usr/bin/env node

/**
 * Fix Wellness CSV for Airtable Import
 * Cleans up CSV formatting issues that prevent Airtable from opening the file
 */

const fs = require('fs');
const path = require('path');

// Read the problematic CSV
const csvPath = path.join(__dirname, '..', 'santacruz-wellness-complete-database.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

console.log('🔧 Fixing CSV format for Airtable import...');

// Split into lines
const lines = csvContent.split('\n');
const headers = lines[0];

// Clean up the CSV
const cleanedLines = [headers]; // Keep header as-is

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  // Remove all quotes and split by comma
  const unquotedLine = line.replace(/"/g, '');
  const fields = unquotedLine.split(',');
  
  // Clean each field
  const cleanedFields = fields.map(field => {
    // Remove extra spaces and clean up
    let cleaned = field.trim();
    
    // Handle special cases
    if (cleaned === 'undefined' || cleaned === 'null') {
      cleaned = '';
    }
    
    // Escape commas and quotes in field content
    if (cleaned.includes(',') || cleaned.includes('"') || cleaned.includes('\n')) {
      cleaned = `"${cleaned.replace(/"/g, '""')}"`;
    }
    
    return cleaned;
  });
  
  cleanedLines.push(cleanedFields.join(','));
}

// Write the cleaned CSV
const cleanedCsvPath = path.join(__dirname, '..', 'santacruz-wellness-airtable-ready.csv');
fs.writeFileSync(cleanedCsvPath, cleanedLines.join('\n'), 'utf8');

console.log(`✅ Fixed CSV saved to: ${cleanedCsvPath}`);
console.log(`📊 Total records: ${cleanedLines.length - 1}`);
console.log(`📋 Fields per record: ${headers.split(',').length}`);

// Create a simplified version with only essential fields for easier import
const essentialFields = [
  'Name', 'Category', 'Description', 'Address', 'Phone', 'Website', 
  'Latitude', 'Longitude', 'Neighborhood', 'Services', 'Tags', 
  'PriceLevel', 'Hours', 'Rating', 'ReviewCount', 'PhotoURL'
];

const essentialHeaders = essentialFields.join(',');
const essentialLines = [essentialHeaders];

// Find indices of essential fields
const allHeaders = headers.split(',').map(h => h.replace(/"/g, ''));
const fieldIndices = essentialFields.map(field => allHeaders.indexOf(field));

for (let i = 1; i < cleanedLines.length; i++) {
  const line = cleanedLines[i];
  if (!line.trim()) continue;
  
  const fields = line.split(',');
  const essentialData = fieldIndices.map(index => {
    if (index === -1 || !fields[index]) return '';
    return fields[index].replace(/"/g, '');
  });
  
  // Escape fields that contain commas
  const escapedData = essentialData.map(field => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  });
  
  essentialLines.push(escapedData.join(','));
}

// Write simplified CSV
const simplifiedCsvPath = path.join(__dirname, '..', 'santacruz-wellness-essential.csv');
fs.writeFileSync(simplifiedCsvPath, essentialLines.join('\n'), 'utf8');

console.log(`✅ Simplified CSV saved to: ${simplifiedCsvPath}`);
console.log(`📊 Essential fields only: ${essentialFields.length} fields`);
console.log(`📋 Records: ${essentialLines.length - 1}`);

console.log('\n🚀 Import Instructions:');
console.log('1. Use "santacruz-wellness-airtable-ready.csv" for full data import');
console.log('2. Use "santacruz-wellness-essential.csv" for quick import with key fields');
console.log('3. In Airtable, go to your Wellness table → Import → CSV file');
console.log('4. Map the fields and import');
console.log('5. Add any missing fields manually if needed');
