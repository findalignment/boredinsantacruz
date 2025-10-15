// Test API route to verify Airtable connection and data
import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export const dynamic = 'force-dynamic'; // Disable caching for testing

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    envVars: {
      hasToken: !!process.env.AIRTABLE_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      activitiesTable: process.env.AIRTABLE_ACTIVITIES_TABLE || 'not set',
      restaurantsTable: process.env.AIRTABLE_RESTAURANTS_TABLE || 'not set',
      rainyTable: process.env.AIRTABLE_RAINY_TABLE || 'not set',
      sunnyTable: process.env.AIRTABLE_SUNNY_TABLE || 'not set',
      wellnessTable: process.env.AIRTABLE_WELLNESS_TABLE || 'not set',
    },
    data: {} as any,
    errors: {} as any,
  };

  // Test Master Activities table
  if (tables.activities) {
    try {
      const records = await tables.activities.select({ maxRecords: 5 }).all();
      results.data.activities = {
        count: records.length,
        sample: records.map(r => ({
          id: r.id,
          name: r.get('Name') || r.get('name'),
          category: r.get('Category') || r.get('category'),
        })),
      };
    } catch (error) {
      results.errors.activities = error instanceof Error ? error.message : 'Unknown error';
    }
  } else {
    results.errors.activities = 'Activities table not configured';
  }

  // Test Restaurants table
  if (tables.restaurants) {
    try {
      const records = await tables.restaurants.select({ maxRecords: 5 }).all();
      results.data.restaurants = {
        count: records.length,
        sample: records.map(r => ({
          id: r.id,
          name: r.get('Name') || r.get('name'),
          cuisine: r.get('Cuisine') || r.get('cuisine'),
        })),
      };
    } catch (error) {
      results.errors.restaurants = error instanceof Error ? error.message : 'Unknown error';
    }
  } else {
    results.errors.restaurants = 'Restaurants table not configured';
  }

  // Test Legacy Rainy Activities
  try {
    const records = await tables.rainyActivities.select({ maxRecords: 5 }).all();
    results.data.rainyActivities = {
      count: records.length,
      sample: records.map(r => ({
        id: r.id,
        title: r.get('Title') || r.get('title'),
      })),
    };
  } catch (error) {
    results.errors.rainyActivities = error instanceof Error ? error.message : 'Unknown error';
  }

  // Test Wellness table
  if (tables.wellness) {
    try {
      const records = await tables.wellness.select({ maxRecords: 5 }).all();
      results.data.wellness = {
        count: records.length,
        sample: records.map(r => ({
          id: r.id,
          name: r.get('Name') || r.get('name'),
        })),
      };
    } catch (error) {
      results.errors.wellness = error instanceof Error ? error.message : 'Unknown error';
    }
  } else {
    results.errors.wellness = 'Wellness table not configured';
  }

  return NextResponse.json(results, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

