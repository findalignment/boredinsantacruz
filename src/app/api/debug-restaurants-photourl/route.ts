import { NextResponse } from 'next/server';
import { tables } from '@/lib/airtable';

export async function GET() {
  try {
    const records = await tables.restaurants
      .select({
        view: 'Grid view',
        fields: ['Name', 'PhotoURL', 'Image'], // Only fetch these fields
      })
      .all();

    const restaurantsWithPhotoURL = records.filter(record => record.fields.PhotoURL);
    const restaurantsWithImage = records.filter(record => record.fields.Image);
    
    const sampleWithPhotoURL = restaurantsWithPhotoURL.slice(0, 3).map(record => ({
      id: record.id,
      name: record.fields.Name,
      photoURL: record.fields.PhotoURL,
      image: record.fields.Image,
    }));

    return NextResponse.json({
      total: records.length,
      withPhotoURL: restaurantsWithPhotoURL.length,
      withImage: restaurantsWithImage.length,
      sampleWithPhotoURL: sampleWithPhotoURL,
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
