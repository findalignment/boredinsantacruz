import { getHeroImages } from '@/app/actions/getHeroImages';

// Fallback images for when Airtable is not available or fails
const FALLBACK_IMAGES: Record<string, string> = {
  'home': '/images/hero/home.jpg',
  'best-breakfast-santa-cruz': '/images/hero/home.jpg',
  'best-bars-santa-cruz': '/images/hero/tonight.jpg',
  'best-wine-bars-santa-cruz': '/images/hero/seo/date-spots.jpg',
  'best-breweries-santa-cruz': '/images/hero/activities.jpg',
  'best-ice-cream-santa-cruz': '/images/hero/seo/beaches.jpg',
  'best-pizza-santa-cruz': '/images/hero/home.jpg',
  'best-tacos-santa-cruz': '/images/hero/home.jpg',
  'best-sushi-santa-cruz': '/images/hero/home.jpg',
  'surfing-santa-cruz-beginners-guide': '/images/hero/seo/surfing.jpg',
  'downtown': '/images/hero/neighborhoods/downtown.jpg',
  'capitola': '/images/hero/neighborhoods/capitola.jpg',
  'westside': '/images/hero/neighborhoods/westside.jpg',
  'harbor': '/images/hero/neighborhoods/harbor.jpg',
};

/**
 * Get hero image for a specific page from Airtable
 * Falls back to hardcoded images if Airtable fails
 */
export async function getHeroImageForPage(pageName: string): Promise<string | null> {
  try {
    const result = await getHeroImages();
    
    if (!result.success || result.data.length === 0) {
      console.log(`No hero images from Airtable, using fallback for ${pageName}`);
      return FALLBACK_IMAGES[pageName] || FALLBACK_IMAGES['home'];
    }

    const heroImage = result.data.find(img => img.page === pageName && img.active);
    
    if (heroImage?.imageUrl) {
      console.log(`Found hero image for ${pageName}: ${heroImage.imageUrl}`);
      return heroImage.imageUrl;
    }

    console.log(`No active hero image found for ${pageName}, using fallback`);
    return FALLBACK_IMAGES[pageName] || FALLBACK_IMAGES['home'];
  } catch (error) {
    console.error(`Error getting hero image for ${pageName}:`, error);
    return FALLBACK_IMAGES[pageName] || FALLBACK_IMAGES['home'];
  }
}

/**
 * Get alt text for a hero image
 */
export async function getHeroImageAltText(pageName: string): Promise<string> {
  try {
    const result = await getHeroImages();
    
    if (!result.success || result.data.length === 0) {
      return `Hero image for ${pageName}`;
    }

    const heroImage = result.data.find(img => img.page === pageName && img.active);
    return heroImage?.altText || `Hero image for ${pageName}`;
  } catch (error) {
    console.error(`Error getting hero image alt text for ${pageName}:`, error);
    return `Hero image for ${pageName}`;
  }
}

/**
 * Get all hero images (useful for debugging or admin purposes)
 */
export async function getAllHeroImages() {
  return await getHeroImages();
}
