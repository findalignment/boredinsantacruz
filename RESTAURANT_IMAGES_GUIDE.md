# Restaurant Images Setup Guide

## 🍽️ Current Status

**✅ Image Support Implemented:**
- Restaurant listings now show images
- Individual restaurant pages have hero images
- Placeholder images for restaurants without photos
- Optimized with Next.js Image component

**📊 Current Data:**
- **276 restaurants** in database
- **274 restaurants** have PhotoURL images (99%!)
- **2 restaurants** show placeholder images

## 🖼️ Adding Restaurant Images

### Option 1: Add to Airtable (Recommended)

1. **Open your Airtable "Restaurants" table**
2. **Find the "Image" field** (or create one if it doesn't exist)
3. **Add images** using one of these methods:

#### Method A: Upload Files
- Click on the Image field
- Upload restaurant photos directly to Airtable
- Airtable will generate URLs automatically

#### Method B: Add Image URLs
- Paste image URLs into the Image field
- Use high-quality photos (1200px+ width recommended)
- Supported formats: JPG, PNG, WebP

### Option 2: Use Google Places API

If you want to automatically populate restaurant images:

1. **Set up Google Places API** with photo access
2. **Use the import script** to fetch restaurant photos
3. **Photos will be added** to the Image field in Airtable

### Option 3: Manual Image Collection

1. **Visit restaurants** and take photos
2. **Use stock photo services** (Unsplash, Pexels)
3. **Contact restaurants** for official photos
4. **Upload to Airtable** Image field

## 📸 Image Guidelines

### Recommended Specs:
- **Size**: 1200px × 800px (3:2 aspect ratio)
- **Format**: JPG or WebP
- **Quality**: High resolution, well-lit
- **Content**: Exterior, interior, or signature dishes

### What Makes Good Restaurant Images:
- **Exterior shots**: Storefront, signage, outdoor seating
- **Interior shots**: Dining room, bar area, ambiance
- **Food photos**: Signature dishes, popular items
- **Atmosphere**: Lighting, decor, crowd

## 🔧 Technical Details

### Image Field in Airtable:
- **Field Name**: `PhotoURL` (primary), `Image` (fallback)
- **Type**: Single line text (PhotoURL) or Attachment field (Image)
- **Format**: Direct URL string or Array of image objects
- **Access**: `restaurant.image[0].url`

### Current Implementation:
```typescript
// Restaurant card component
{restaurant.image && restaurant.image[0]?.url ? (
  <Image src={restaurant.image[0].url} alt={restaurant.name} />
) : (
  <div>🍽️ Photo Coming Soon</div>
)}
```

## 🚀 Quick Start

### Add Your First Restaurant Image:

1. **Go to Airtable** → Restaurants table
2. **Find "The Blue Lagoon"** (already has image)
3. **Pick another restaurant** to add image to
4. **Click the Image field**
5. **Upload a photo** or paste image URL
6. **Save the record**
7. **Visit the restaurant page** to see the image!

### Bulk Upload:
1. **Prepare images** with restaurant names as filenames
2. **Use Airtable's bulk upload** feature
3. **Map restaurant names** to images
4. **Import in batches** of 50-100

## 📱 Testing

### Check Your Images:
- Visit `/restaurants` to see restaurant listings
- Click on restaurants to see detail pages
- Images should load properly with hover effects
- Placeholders should show for restaurants without images

### Debug Images:
- Visit `/api/debug-restaurants` to see image data
- Check console for any image loading errors
- Verify image URLs are accessible

## 🎯 Next Steps

1. **Add 10-20 restaurant images** to test the system
2. **Focus on popular restaurants** first
3. **Use consistent image quality** and style
4. **Consider hiring a photographer** for professional shots
5. **Reach out to restaurants** for official photos

## 💡 Pro Tips

- **Start with staff picks** - these are featured prominently
- **Use high-quality photos** - they make a big difference
- **Be consistent** with image style and quality
- **Update regularly** - restaurants change over time
- **Consider user submissions** - let users contribute photos

## 🔗 Related Files

- `src/components/restaurants/restaurant-card.tsx` - Restaurant listing cards
- `src/app/restaurant/[id]/page.tsx` - Individual restaurant pages
- `src/app/actions/getRestaurants.ts` - Data fetching
- `src/app/api/debug-restaurants/route.ts` - Debug endpoint

---

**Ready to add restaurant images?** Start with a few popular restaurants and watch your listings come to life! 🍽️✨
