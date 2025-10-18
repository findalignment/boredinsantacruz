# Airtable Hero Images Setup Guide

## 🎯 **Problem Solved:**
Your guide pages and front page currently use hardcoded image paths like `/images/hero/home.jpg`. You want to manage these images through Airtable instead.

## 📋 **Step 1: Create "Hero Images" Table in Airtable**

### **Table Name:** `Hero Images` (or `Site Images`)

### **Fields to Create:**
1. **Name** (Single line text) - e.g., "Home Page Hero", "Breakfast Guide Hero"
2. **Page** (Single line text) - e.g., "home", "best-breakfast-santa-cruz", "best-bars-santa-cruz"
3. **Image** (Attachment) - Upload your hero images here
4. **Alt Text** (Single line text) - For accessibility
5. **Category** (Single select) - Options: "Front Page", "SEO Guide", "Neighborhood", "Weather"
6. **Active** (Checkbox) - To enable/disable images

### **Sample Records:**
| Name | Page | Image | Alt Text | Category | Active |
|------|------|-------|----------|----------|--------|
| Home Page Hero | home | [upload home.jpg] | Santa Cruz beach and boardwalk | Front Page | ✅ |
| Breakfast Guide Hero | best-breakfast-santa-cruz | [upload breakfast.jpg] | Delicious breakfast spread | SEO Guide | ✅ |
| Bars Guide Hero | best-bars-santa-cruz | [upload tonight.jpg] | Santa Cruz nightlife | SEO Guide | ✅ |
| Beaches Guide Hero | best-beaches-santa-cruz | [upload beaches.jpg] | Beautiful Santa Cruz beaches | SEO Guide | ✅ |

## 📋 **Step 2: Add Environment Variable**

Add this to your `.env.local`:
```
AIRTABLE_HERO_IMAGES_TABLE=Hero Images
```

## 📋 **Step 3: Update Airtable Configuration**

Add to `src/lib/airtable.ts`:
```typescript
export const tables = {
  // ... existing tables ...
  heroImages: process.env.AIRTABLE_HERO_IMAGES_TABLE
    ? base(process.env.AIRTABLE_HERO_IMAGES_TABLE)
    : null,
} as const;
```

## 📋 **Step 4: Create Hero Images Action**

Create `src/app/actions/getHeroImages.ts`:
```typescript
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

export const getHeroImages = unstable_cache(
  async () => {
    try {
      if (!tables.heroImages) {
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

      return { success: true, data: heroImages };
    } catch (error) {
      console.error('Error fetching hero images:', error);
      return { success: false, data: [] };
    }
  },
  ['hero-images'],
  { revalidate: 3600 } // Cache for 1 hour
);
```

## 📋 **Step 5: Create Hero Image Helper**

Create `src/lib/hero-images.ts`:
```typescript
import { getHeroImages } from '@/app/actions/getHeroImages';

export async function getHeroImageForPage(pageName: string): Promise<string | null> {
  const result = await getHeroImages();
  
  if (!result.success) {
    // Fallback to hardcoded images
    const fallbackImages: Record<string, string> = {
      'home': '/images/hero/home.jpg',
      'best-breakfast-santa-cruz': '/images/hero/home.jpg',
      'best-bars-santa-cruz': '/images/hero/tonight.jpg',
      'best-wine-bars-santa-cruz': '/images/hero/seo/date-spots.jpg',
      'best-breweries-santa-cruz': '/images/hero/activities.jpg',
      'best-ice-cream-santa-cruz': '/images/hero/seo/beaches.jpg',
    };
    
    return fallbackImages[pageName] || '/images/hero/home.jpg';
  }

  const heroImage = result.data.find(img => img.page === pageName && img.active);
  return heroImage?.imageUrl || null;
}
```

## 📋 **Step 6: Update Guide Pages**

Update your guide pages to use the dynamic images:

```typescript
import { getHeroImageForPage } from '@/lib/hero-images';

export default async function BestBreakfastPage() {
  const heroImage = await getHeroImageForPage('best-breakfast-santa-cruz');
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center" 
        style={{ 
          backgroundImage: heroImage 
            ? `url(${heroImage})` 
            : 'linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)'
        }}
      >
        {/* ... rest of hero content ... */}
      </section>
      {/* ... rest of page ... */}
    </main>
  );
}
```

## 🎯 **Benefits:**

1. **Easy Management** - Upload and manage hero images through Airtable interface
2. **Dynamic Updates** - Change images without code changes
3. **Fallback System** - Falls back to hardcoded images if Airtable fails
4. **Organized** - All site images in one place
5. **Flexible** - Easy to add new pages and images

## 🚀 **Quick Start:**

1. Create the "Hero Images" table in Airtable
2. Upload your images to the Image field
3. Add the environment variable
4. I'll help you update the code to use dynamic images

This way, you can manage all your hero images (front page, guides, neighborhoods) through Airtable instead of hardcoding them! 🎉
