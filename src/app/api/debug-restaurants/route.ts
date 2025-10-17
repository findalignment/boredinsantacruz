import { NextResponse } from 'next/server';
import { getRestaurants } from '@/app/actions/getRestaurants';

export async function GET() {
  try {
    const result = await getRestaurants();
    
    if (!result.success || !result.data || result.data.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to fetch restaurants or no restaurants found',
        details: result.error 
      });
    }

    // Get first few restaurants with image data
    const restaurantsWithImages = result.data
      .filter(restaurant => restaurant.image && restaurant.image.length > 0)
      .slice(0, 3)
      .map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        imageUrl: restaurant.image?.[0]?.url,
        imageType: restaurant.image?.[0]?.url?.includes('maps.googleapis.com') ? 'google_places' : 'other',
      }));

    const sampleRestaurant = result.data[0];
    const imageFields = sampleRestaurant.image ? [
      {
        fieldName: 'image',
        value: sampleRestaurant.image,
        type: typeof sampleRestaurant.image,
        isArray: Array.isArray(sampleRestaurant.image),
      }
    ] : [];

    return NextResponse.json({
      total: result.data.length,
      withImages: result.data.filter(r => r.image && r.image.length > 0).length,
      sampleRestaurant: {
        id: sampleRestaurant.id,
        name: sampleRestaurant.name,
        imageFields: imageFields,
      },
      restaurantsWithImages: restaurantsWithImages,
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
