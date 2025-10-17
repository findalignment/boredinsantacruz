import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export async function GET() {
  try {
    const activitiesTable = tables.activities || tables.rainyActivities;
    if (!activitiesTable) {
      return NextResponse.json({ error: 'No activities table configured' });
    }
    
    // Get first record to see field names
    const records = await activitiesTable
      .select({
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) {
      return NextResponse.json({ error: 'No records found' });
    }

    const firstRecord = records[0];
    const fields = firstRecord.fields;
    
    // Extract all field names and their values
    const fieldInfo = Object.keys(fields).map(key => ({
      fieldName: key,
      value: fields[key],
      type: typeof fields[key],
      isArray: Array.isArray(fields[key]),
      hasUrl: fields[key] && typeof fields[key] === 'object' && Array.isArray(fields[key]) && fields[key][0]?.url
    }));

    return NextResponse.json({
      totalFields: fieldInfo.length,
      allFields: fieldInfo,
      sampleRecord: {
        id: firstRecord.id,
        title: fields.Title || fields.Name || 'No title',
        imageFields: fieldInfo.filter(f => 
          f.fieldName.toLowerCase().includes('image') || 
          f.fieldName.toLowerCase().includes('photo') ||
          f.hasUrl
        )
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
