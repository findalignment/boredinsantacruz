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

    // Get first few activities with image URLs
    const activitiesWithImages = result.data
      .filter(activity => activity.imageUrl)
      .slice(0, 3)
      .map(activity => ({
        id: activity.id,
        title: activity.title,
        imageUrl: activity.imageUrl,
        imageUrlType: activity.imageUrl?.includes('maps.googleapis.com') ? 'google_places' : 'other',
      }));

    // Test if Google Places URLs work
    const imageTests = await Promise.all(
      activitiesWithImages.map(async (activity) => {
        if (!activity.imageUrl) return { ...activity, testResult: 'no_url' };
        
        try {
          const response = await fetch(activity.imageUrl, { method: 'HEAD' });
          return {
            ...activity,
            testResult: response.ok ? 'success' : 'failed',
            status: response.status,
            statusText: response.statusText,
          };
        } catch (error) {
          return {
            ...activity,
            testResult: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    return NextResponse.json({
      total: result.data.length,
      withImages: result.data.filter(a => a.imageUrl).length,
      sampleActivities: activitiesWithImages,
      imageTests: imageTests,
      googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY ? 'configured' : 'missing',
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
