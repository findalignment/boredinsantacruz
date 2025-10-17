# 📸 Activity Images Setup Guide

## Quick Setup for Activity Images

### Option 1: Local Images (Easiest)



2. **Upload images to Cloudinary:**
   - Upload to `boredinsantacruz/activities/` folder
   - Get the CDN URLs
   - Add URLs to Airtable Image field

### Image Specifications

**Recommended:**
- **Size:** 800x600px or 1200x800px
- **Format:** JPEG or WebP
- **File Size:** Under 200KB
- **Aspect Ratio:** 4:3 or 16:9

### How It Works

Your activity cards automatically display images when available:

```tsx
{activity.imageUrl && (
  <div className="relative h-48 bg-gray-200">
    <Image
      src={activity.imageUrl}
      alt={activity.title}
      fill
      className="object-cover"
    />
  </div>
)}
```

### Testing Your Images

1. Add images to Airtable or local folder
2. Visit `/activities` page
3. Images should appear on activity cards
4. Click activity cards to see full images on detail pages

### Troubleshooting

**Images not showing?**
- Check Airtable Image field has URLs
- Verify image URLs are accessible
- Check browser console for 404 errors
- Ensure image files exist in public folder

**Slow loading?**
- Compress images (use TinyPNG)
- Use Cloudinary for CDN delivery
- Consider WebP format for better compression
