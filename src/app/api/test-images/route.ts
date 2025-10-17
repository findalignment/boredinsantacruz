import { NextResponse } from 'next/server';
import { getActivities } from '@/app/actions/getActivities';

export async function GET() {
  try {
    const result = await getActivities();
    
    if (!result.success || !result.data) {
      return NextResponse.json({ 
        error: 'Failed to fetch activities',
        details: result.error 
      });
    }

    // Get first few activities with images
    const activitiesWithImages = result.data
      .filter(activity => activity.imageUrl)
      .slice(0, 5)
      .map(activity => ({
        id: activity.id,
        title: activity.title,
        imageUrl: activity.imageUrl,
        hasImage: !!activity.imageUrl
      }));

    return NextResponse.json({
      total: result.data.length,
      withImages: result.data.filter(a => a.imageUrl).length,
      sampleActivities: activitiesWithImages,
      imageDomains: [
        'dl.airtable.com',
        'v5.airtableusercontent.com', 
        'static.airtableusercontent.com'
      ]
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
