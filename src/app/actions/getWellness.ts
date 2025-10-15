'use server';

import { tables } from '@/lib/airtable';

export interface WellnessActivity {
  id: string;
  name: string;
  description?: string;
  writeUp?: string; // Long-form editorial content
  category?: string;
  address?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  hours?: string;
  priceRange?: string;
  parking?: string;
  tips?: string;
  amenities?: string[];
  wellnessType?: string[];
  rating?: number;
  photoUrl?: string;
}

export async function getWellness() {
  try {
    // If wellness table not configured, return empty array
    if (!tables.wellness) {
      console.log('[Wellness] Wellness table not configured');
      return {
        success: true,
        data: [],
      };
    }

    const records = await tables.wellness
      .select({
        view: 'Grid view',
      })
      .all();

    const wellness: WellnessActivity[] = records.map((record) => ({
      id: record.id,
      name: record.get('Name') as string || record.get('name') as string || 'Unnamed',
      description: record.get('Description') as string || record.get('description') as string,
      writeUp: record.get('WriteUp') as string || record.get('writeUp') as string,
      category: record.get('Category') as string || record.get('category') as string,
      address: record.get('Address') as string || record.get('address') as string,
      phone: record.get('Phone') as string || record.get('phone') as string,
      website: record.get('Website') as string || record.get('website') as string,
      instagram: record.get('Instagram') as string || record.get('instagram') as string,
      hours: record.get('Hours') as string || record.get('hours') as string,
      priceRange: record.get('PriceRange') as string || record.get('priceRange') as string || record.get('Price Range') as string,
      parking: record.get('Parking') as string || record.get('parking') as string,
      tips: record.get('Tips') as string || record.get('tips') as string,
      amenities: (record.get('Amenities') as string[] || record.get('amenities') as string[] || []),
      wellnessType: (record.get('WellnessType') as string[] || record.get('wellnessType') as string[] || record.get('Type') as string[] || []),
      rating: record.get('Rating') as number || record.get('rating') as number,
      photoUrl: record.get('PhotoURL') as string || record.get('photoUrl') as string || record.get('Photo') as string,
    }));

    console.log(`[Wellness] Fetched ${wellness.length} wellness facilities`);
    
    return {
      success: true,
      data: wellness,
    };
  } catch (error) {
    console.error('[Wellness] Error fetching wellness data:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

