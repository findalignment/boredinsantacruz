# Hero Images Setup Guide

## Current Status
✅ Your hero images are now working with temporary placeholders. The new SEO guides are using existing images that match their themes.

## What You Need to Do

### 1. **Add Specific Hero Images** (Optional but Recommended)

To get the perfect hero images for each guide, add these specific images to your `public/images/hero/` folder:

```
public/images/hero/
├── best-breakfast-hero.jpg      # Morning dining, coffee, pastries
├── best-bars-hero.jpg           # Nightlife, cocktails, bar atmosphere  
├── best-wine-bars-hero.jpg      # Wine tasting, sophisticated atmosphere
├── best-breweries-hero.jpg      # Craft beer, brewery atmosphere
└── best-ice-cream-hero.jpg      # Ice cream, sweet treats, beach vibes
```

### 2. **Image Specifications**

**Recommended Image Specs:**
- **Dimensions:** 1200x630 pixels (optimal for web)
- **Format:** JPG or PNG
- **File Size:** Under 500KB for fast loading
- **Content:** High-quality photos that represent each category

**Theme Suggestions:**
- **Breakfast:** Coffee shops, morning dining, pastries, breakfast tables
- **Bars:** Nightlife scenes, cocktail glasses, bar interiors, evening atmosphere
- **Wine Bars:** Wine glasses, tasting rooms, sophisticated dining, wine bottles
- **Breweries:** Craft beer, brewery interiors, beer glasses, brewing equipment
- **Ice Cream:** Ice cream cones, beach scenes with treats, colorful desserts

### 3. **Update Image Paths** (After Adding Images)

Once you add the specific images, update the paths in these files:

**File: `src/app/best-breakfast-santa-cruz/page.tsx`**
```tsx
// Change this line:
style={{ backgroundImage: "url('/images/hero/home.jpg')" }}

// To this:
style={{ backgroundImage: "url('/images/hero/best-breakfast-hero.jpg')" }}
```

**File: `src/app/best-bars-santa-cruz/page.tsx`**
```tsx
// Change this line:
style={{ backgroundImage: "url('/images/hero/tonight.jpg')" }}

// To this:
style={{ backgroundImage: "url('/images/hero/best-bars-hero.jpg')" }}
```

**File: `src/app/best-wine-bars-santa-cruz/page.tsx`**
```tsx
// Change this line:
style={{ backgroundImage: "url('/images/hero/seo/date-spots.jpg')" }}

// To this:
style={{ backgroundImage: "url('/images/hero/best-wine-bars-hero.jpg')" }}
```

**File: `src/app/best-breweries-santa-cruz/page.tsx`**
```tsx
// Change this line:
style={{ backgroundImage: "url('/images/hero/activities.jpg')" }}

// To this:
style={{ backgroundImage: "url('/images/hero/best-breweries-hero.jpg')" }}
```

**File: `src/app/best-ice-cream-santa-cruz/page.tsx`**
```tsx
// Change this line:
style={{ backgroundImage: "url('/images/hero/seo/beaches.jpg')" }}

// To this:
style={{ backgroundImage: "url('/images/hero/best-ice-cream-hero.jpg')" }}
```

### 4. **Current Working Images**

Your guides are currently using these existing images as placeholders:

| Guide | Current Image | Theme Match |
|-------|---------------|-------------|
| Best Breakfast | `/images/hero/home.jpg` | General Santa Cruz |
| Best Bars | `/images/hero/tonight.jpg` | Nightlife ✅ |
| Best Wine Bars | `/images/hero/seo/date-spots.jpg` | Romantic ✅ |
| Best Breweries | `/images/hero/activities.jpg` | Social activities ✅ |
| Best Ice Cream | `/images/hero/seo/beaches.jpg` | Beach vibes ✅ |

### 5. **Testing Your Images**

After adding images:

1. **Check the file paths** - Make sure they match exactly
2. **Test locally** - Run `npm run dev` and visit each guide page
3. **Check image loading** - Ensure images load without errors
4. **Verify mobile** - Test on mobile devices for responsive behavior

### 6. **Image Sources**

**Free Stock Photo Sources:**
- Unsplash.com (high-quality, free)
- Pexels.com (free stock photos)
- Pixabay.com (free images)

**Search Terms:**
- "Santa Cruz breakfast" / "morning coffee"
- "Santa Cruz nightlife" / "cocktail bar"
- "wine tasting" / "wine bar Santa Cruz"
- "craft brewery" / "beer Santa Cruz"
- "ice cream beach" / "dessert Santa Cruz"

## Summary

✅ **Your hero images are working now** with good placeholder images that match each guide's theme.

🎯 **Optional:** Add specific hero images for each guide to make them even more compelling.

📁 **File Structure:** Keep images in `public/images/hero/` folder

🔄 **Easy Updates:** Just replace the image files and update the paths in the code

Your website is ready to go with working hero images! 🎉
