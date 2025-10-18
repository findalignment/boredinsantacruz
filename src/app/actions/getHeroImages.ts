'use server';

import { tables } from '@/lib/airtable';
import { unstable_cache } from 'next/cache';

export interface HeroImage {
  id: string;
  name: string;
  page: string;
  imageUrl: string;
  altText: string;
  category: string;
  active: boolean;
}

// Fetch all hero images with caching
export const getHeroImages = unstable_cache(
  async () => {
    try {
      if (!tables.heroImages) {
        console.log('Hero Images table not configured');
        return { success: false, data: [] };
      }
      
      const records = await tables.heroImages
        .select({
          view: 'Grid view',
          filterByFormula: '{Active} = 1',
        })
        .all();

      const heroImages: HeroImage[] = records.map(record => ({
        id: record.id,
        name: record.fields.Name || '',
        page: record.fields.Page || '',
        imageUrl: record.fields.Image?.[0]?.url || '',
        altText: record.fields.AltText || '',
        category: record.fields.Category || '',
        active: record.fields.Active || false,
      }));

      return {
        success: true,
        data: heroImages,
      };
    } catch (error) {
      console.error('Error fetching hero images:', error);
      return {
        success: false,
        data: [],
      };
    }
  },
  ['hero-images'],
  { revalidate: 3600 } // Cache for 1 hour
);
