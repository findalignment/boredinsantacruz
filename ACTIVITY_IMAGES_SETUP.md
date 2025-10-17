# Activity Images Setup Guide

## 🔍 Current Status
- **33 activities** in database
- **0 activities with images** (all Image fields are empty)
- **Image domains configured** ✅ (dl.airtable.com, v5.airtableusercontent.com, static.airtableusercontent.com)

## 📸 How to Add Images to Activities

### Option 1: Upload Images to Airtable (Recommended)
1. Go to your Airtable activities table
2. For each activity, click on the **Image** field
3. Upload a photo or paste an image URL
4. Airtable will automatically generate a CDN URL

### Option 2: Use External Image URLs
1. Find images online (Unsplash, Pexels, etc.)
2. Copy the image URL
3. Paste it directly into the Image field in Airtable

### Option 3: Use Local Images (for testing)
1. Add images to `/public/images/activities/` folder
2. Use URLs like `/images/activities/beach.jpg`
3. Add these URLs to Airtable Image field

## 🎯 Suggested Images for Each Activity

### Beaches
- **Capitola Beach**: Beach with colorful houses
- **Cowell Beach**: Classic Santa Cruz beach scene
- **Natural Bridges**: The famous natural arch
- **Seabright Beach**: Sandy beach with cliffs
- **Seacliff State Beach**: Beach with pier
- **Sunset State Beach**: Sunset beach scene

### Museums
- **Santa Cruz Museum of Art & History**: Museum building exterior
- **Santa Cruz Museum of Natural History**: Natural history displays
- **Santa Cruz Surfing Museum**: Surfing memorabilia
- **The Mystery Spot**: The famous tilted building

### Attractions
- **Santa Cruz Beach Boardwalk**: Ferris wheel and rides
- **Santa Cruz Wharf**: Long wooden pier
- **Tannery Arts Center**: Historic building complex

### Parks & Nature
- **Henry Cowell Redwoods**: Giant redwood trees
- **DeLaveaga Park**: Hiking trails and nature
- **Pogonip Open Space**: Forest trails
- **Wilder Ranch State Park**: Historic ranch buildings
- **The Forest of Nisene Marks**: Redwood forest

### Entertainment
- **Casino Arcade**: Vintage arcade games
- **Rio Theatre**: Historic theater building
- **Mercantile Arcade**: Capitola arcade
- **Giggles-N-Wiggles**: Family entertainment center

### Breweries & Food
- **Discretion Brewing**: Brewery interior
- **Hallcrest Vineyards**: Wine tasting room
- **Santa Cruz Mountain Brewing**: Brewery exterior
- **Sante Adairius**: Brewery/restaurant

### Water Sports
- **Kayak Connection**: Kayaks on water
- **Venture Quest Kayak**: Kayaking adventure

## 🚀 Quick Test Setup

To test that images work, add this URL to any activity in Airtable:
```
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop
```

This will show a beach scene and confirm the image system is working.

## 📝 Image Requirements
- **Format**: JPG, PNG, WebP
- **Size**: 800x600px or similar (will be automatically resized)
- **File size**: Under 2MB for best performance
- **Quality**: High quality, well-lit photos

## 🔧 Technical Notes
- Images are served from Airtable's CDN
- Next.js automatically optimizes images
- Images are cached for performance
- All domains are properly configured in next.config.mjs

## ✅ Next Steps
1. **Add 1-2 test images** to verify the system works
2. **Gradually add images** for all activities
3. **Use high-quality photos** that represent each location well
4. **Test on both desktop and mobile** to ensure proper display

Once you add images to Airtable, they will automatically appear on the website! 🎉