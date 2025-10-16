# Hero Images Directory

Place your hero/header images here.

## Image Specifications

- **Format:** JPEG or WebP
- **Dimensions:** 1920×400px (desktop) or 1200×600px (mobile-friendly)
- **File Size:** Keep under 200KB
- **Naming:** Use kebab-case (e.g., `beach-boardwalk.jpg`)

## Directory Structure

```
hero/
├── [main page images]
├── neighborhoods/ [4 images for neighborhood pages]
├── guides/ [5 images for guide pages]
├── weather/ [7 images for weather-specific pages]
└── seo/ [30 images for SEO landing pages - can reuse]
```

## Quick Start

1. Add your top priority images:
   - home.jpg
   - activities.jpg
   - restaurants.jpg
   - rainy.jpg
   - sunny.jpg

2. See `HERO_IMAGES_GUIDE.md` in project root for complete list

3. Once images are added, let the dev know to implement them in code

## Optimization

Before adding images:
- Compress with TinyPNG.com or similar
- Ensure under 200KB each
- Test loading speed

Images will be automatically optimized by Next.js Image component.

