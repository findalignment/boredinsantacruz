# 📝 Content Management Guide - Writeups & Images

## Part 1: Restaurant Writeups

### Best Approach: Use Airtable Fields

You have **two options** for adding restaurant writeups:

---

### Option A: Use Existing "Description" Field (Recommended)

**Pros:**
- ✅ Field already exists in Airtable
- ✅ Website already reads this field
- ✅ No code changes needed
- ✅ Displays on restaurant detail pages

**How to Add:**
1. Open your Airtable `Restaurants` table
2. Find (or create) the `Description` column (Long Text field)
3. Write your restaurant descriptions:

```
Example for "The Crow's Nest":
Waterfront restaurant and bar with stunning harbor views. Known for 
fresh seafood, live music on weekends, and unbeatable sunset dining. 
The clam chowder is a local favorite, and the fish tacos are made 
with daily catches. Great happy hour 3-6pm daily with $2 off appetizers 
and drinks. Reservations recommended for dinner, especially Friday/Saturday.
```

**What the Website Shows:**
- Restaurant list page: First 150 characters
- Restaurant detail page: Full description
- Search results: Excerpt with highlighting

---

### Option B: Add Custom "WriteUp" Field

**Pros:**
- ✅ Separate from short description
- ✅ Can have longer, editorial content
- ✅ Better for SEO (more content)

**Cons:**
- ⚠️ Requires code update to display

**How to Implement:**

#### Step 1: Add Field in Airtable
1. Open `Restaurants` table
2. Add new column: `WriteUp` (Long Text)
3. Add your editorial content:

```
Example WriteUp:
=============
THE INSIDER'S TAKE

The Crow's Nest has been a Santa Cruz institution since 1969. 
Perched right on the harbor, it offers some of the best views in 
town – especially from the upstairs dining room at sunset.

WHAT TO ORDER:
• Clam Chowder (local favorite, gets crowded at lunch)
• Fish Tacos (made with daily catch, ask what's fresh)
• Blackened Salmon (perfectly seasoned, comes with seasonal veggies)
• Harbor Burger (not seafood, but secretly the best burger in town)

INSIDER TIPS:
- Arrive 30 min before sunset for window seats
- Happy hour 3-6pm = best value (half-price appetizers)
- Downstairs bar is more casual, upstairs is date-night vibes
- Live music most weekends (check schedule online)
- Free parking, but can fill up – arrive early on weekends

BEST FOR:
Sunset dinner, date night, seafood lovers, live music, happy hour

AVOID IF:
You're in a rush (service can be slow when busy)
```

#### Step 2: Update Website Code
I can add this if you want – it would display the WriteUp on detail pages below the main description.

---

## Part 2: Image Management Guide

### Image Strategy Overview

Your site needs images in several places:

1. **Activities** (Natural Bridges, Mystery Spot, etc.)
2. **Restaurants** (The Crow's Nest, Laili, etc.)
3. **Wellness** (gyms, yoga studios, spas)
4. **SEO Pages** (optional, but helpful)

---

## 🖼️ Where to Host Images

### Recommended: Use Image Hosting Service

**Best Options:**

#### Option 1: Cloudinary (Recommended)
- **Free tier:** 25GB storage, 25GB bandwidth/month
- **Why best:** Automatic image optimization, resizing, CDN
- **Setup:** 5 minutes
- **Cost:** Free for your size

**How to use:**
1. Sign up: https://cloudinary.com
2. Upload images (drag & drop)
3. Copy URL for each image
4. Paste URL in Airtable

**URL Format:**
```
https://res.cloudinary.com/your-account/image/upload/v1234567890/restaurants/crows-nest.jpg
```

#### Option 2: Imgur (Easiest)
- **Free tier:** Unlimited images
- **Why easy:** No signup needed, instant upload
- **Setup:** 30 seconds

**How to use:**
1. Go to https://imgur.com/upload
2. Upload image
3. Right-click image → Copy image address
4. Paste URL in Airtable

**URL Format:**
```
https://i.imgur.com/AbC123.jpg
```

#### Option 3: Your Own Server/Storage
- Use if you already have hosting
- Upload to your server
- Use full URLs in Airtable

---

## 📸 Image Size & Format Guidelines

### Recommended Specs:

| Type | Width | Height | Format | Max Size |
|------|-------|--------|--------|----------|
| **Activities** | 1200px | 800px | JPG/WebP | 200KB |
| **Restaurants** | 1200px | 800px | JPG/WebP | 200KB |
| **Wellness** | 1200px | 800px | JPG/WebP | 200KB |
| **SEO Headers** | 1200px | 400px | JPG/WebP | 150KB |

### Aspect Ratios:
- **List cards:** 3:2 (landscape)
- **Detail pages:** 3:2 or 16:9
- **Map markers:** 1:1 (square)

### How to Optimize Images:

**Free Tools:**
1. **TinyPNG** (https://tinypng.com) - Compress JPG/PNG
2. **Squoosh** (https://squoosh.app) - Google's compressor
3. **ImageOptim** (Mac) - Desktop app

**Before uploading:**
- Resize to recommended dimensions
- Compress to reduce file size
- Use descriptive filenames: `crows-nest-harbor-view.jpg`

---

## 🗂️ Airtable Image Fields

### For Each Table, Add These Fields:

#### Restaurants Table:
```
Photo (Attachment) - Main restaurant photo
PhotoURL (URL) - Link to image (if using external hosting)
GalleryPhotos (Attachment) - Multiple photos (optional)
```

#### Activities Table:
```
Photo (Attachment) - Main activity photo
PhotoURL (URL) - Link to image
ImageURL (URL) - Alternative field name (already exists)
```

#### Wellness Table:
```
Photo (Attachment) - Main facility photo
PhotoURL (URL) - Link to image
```

---

## 📋 Step-by-Step: Adding Images to Restaurants

### Method 1: Direct Airtable Upload (Easiest)

1. **Open Restaurants table**
2. **Find or create** `Photo` field (type: Attachment)
3. **Click the cell** for a restaurant
4. **Drag & drop** image or click to upload
5. **Done!** Airtable hosts the image

**Pros:** 
- ✅ Super easy
- ✅ Airtable handles hosting
- ✅ No external service needed

**Cons:**
- ⚠️ Airtable URLs are long
- ⚠️ Not optimized for web
- ⚠️ Slower load times

---

### Method 2: External Hosting (Recommended)

1. **Prepare your image:**
   - Resize to 1200x800px
   - Compress (aim for < 200KB)
   - Name it: `restaurant-name.jpg`

2. **Upload to Cloudinary/Imgur:**
   - Drag & drop to upload
   - Copy the image URL

3. **Add to Airtable:**
   - Open `Restaurants` table
   - Find `PhotoURL` field (create if needed, type: URL)
   - Paste the image URL

4. **Website automatically shows it!**

---

## 🖼️ Image URL Examples in Airtable

### Restaurant: The Crow's Nest
```
Name: The Crow's Nest
Description: Waterfront restaurant with harbor views...
PhotoURL: https://res.cloudinary.com/yoursite/image/upload/crows-nest.jpg
```

### Activity: Natural Bridges
```
Name: Natural Bridges State Beach
Description: Iconic beach with natural rock bridge...
ImageURL: https://res.cloudinary.com/yoursite/image/upload/natural-bridges.jpg
```

### Wellness: CorePower Yoga
```
Name: CorePower Yoga Santa Cruz
Description: Heated yoga studio with multiple class types...
PhotoURL: https://res.cloudinary.com/yoursite/image/upload/corepower.jpg
```

---

## 🎨 Where Images Appear on Website

### Activities:
- ✅ Activity list page (card thumbnail)
- ✅ Activity detail page (large hero image)
- ✅ Map markers (popup thumbnail)
- ✅ Search results
- ✅ Favorites page
- ✅ Trip planner

### Restaurants:
- ✅ Restaurant list page (card thumbnail)
- ✅ Restaurant detail page (hero image)
- ✅ Restaurant map (popup thumbnail)
- ✅ Search results
- ✅ "Staff Picks" section

### Wellness:
- ✅ Wellness page (card thumbnail)
- ✅ Category filters (visual cards)

---

## 📝 Content Writing Tips

### Restaurant Writeup Structure:

```markdown
[OPENING HOOK - 1-2 sentences]
Short, punchy intro that captures the vibe.

[WHAT MAKES IT SPECIAL - 2-3 sentences]
Why locals love it, unique features, signature dishes.

WHAT TO ORDER:
• Dish 1 (why it's good)
• Dish 2 (insider tip)
• Dish 3 (popular choice)

INSIDER TIPS:
- Best time to visit
- Parking advice
- Reservation recommendations
- Money-saving tips
- What to avoid

BEST FOR:
Date night, families, quick lunch, happy hour, etc.

VIBE:
Casual, upscale, romantic, loud, quiet, etc.
```

### Example - Linda's Seabreeze Cafe:

```
Beachside breakfast spot where locals line up every weekend for 
massive portions and ocean views. Cash only, expect a 30-45 minute 
wait on sunny weekends – but it's worth it.

The pancakes are legendary (bigger than your plate), and the 
Benedicts come with the best hollandaise in town. Sit outside 
if you can – the upstairs patio overlooks the beach.

WHAT TO ORDER:
• Blueberry Pancakes (seriously, they're huge)
• Dungeness Crab Benedict (when in season)
• Seabreeze Scramble (loaded with veggies and cheese)
• Coffee (strong, unlimited refills)

INSIDER TIPS:
- Arrive before 9am to avoid the rush
- Cash only (ATM inside)
- Call ahead for wait time estimate
- Parking fills up fast – try residential streets nearby
- Take leftovers – portions are massive

BEST FOR:
Weekend brunch, families, big appetites, beach day fuel

VIBE:
Casual, loud, beachy, no-frills but beloved
```

---

## 🎯 Quick Start Checklist

### Week 1: Essential Content
- [ ] Add descriptions to top 10 restaurants
- [ ] Add images to top 10 restaurants
- [ ] Add descriptions to top 10 activities
- [ ] Add images to top 10 activities

### Week 2: Full Content
- [ ] Complete all restaurant descriptions
- [ ] Complete all restaurant images
- [ ] Add writeups for staff picks
- [ ] Add wellness facility images

### Week 3: Polish
- [ ] Add gallery photos (multiple images)
- [ ] Review and improve existing descriptions
- [ ] Add SEO page hero images
- [ ] Optimize all image file sizes

---

## 🔧 Technical: How Website Reads Images

### Current Code Structure:

**For Activities:**
```typescript
// Website checks these fields in order:
1. activity.imageUrl
2. activity.image
3. activity.photoUrl
4. Falls back to placeholder emoji
```

**For Restaurants:**
```typescript
// Website checks:
1. restaurant.photoUrl
2. restaurant.imageUrl
3. restaurant.photo (Airtable attachment)
4. Falls back to placeholder gradient
```

### Field Priority:
Use any of these field names in Airtable (website checks all):
- `imageUrl` or `ImageURL`
- `photoUrl` or `PhotoURL`
- `image` or `Image`
- `photo` or `Photo`

---

## 💡 Pro Tips

### Writing Tips:
1. **Be specific:** "Best clam chowder in Santa Cruz" > "Good food"
2. **Add personality:** Write like you're texting a friend
3. **Include prices:** "$$$ but worth it for special occasions"
4. **Be honest:** "Service can be slow when busy"
5. **Update seasonally:** "Try the dungeness crab Nov-May"

### Image Tips:
1. **Use real photos:** Not stock images
2. **Show the food:** Close-ups of signature dishes
3. **Show the space:** Interior, vibe, ambiance
4. **Show the view:** If there's a view, feature it!
5. **Good lighting:** Natural light is best

### SEO Tips:
1. **Use keywords:** "Best seafood restaurant Santa Cruz"
2. **Write 150-300 words** for each restaurant
3. **Include location details:** "Downtown on Pacific Ave"
4. **Mention nearby landmarks:** "Next to the Bookshop"
5. **Update regularly:** Keep hours, menus current

---

## 🚀 Batch Upload Tools

### If You Have LOTS of Images:

**Option 1: Airtable CSV Import**
1. Create CSV with restaurant names and image URLs
2. Import into Airtable
3. Bulk update all at once

**Option 2: Airtable API** (Advanced)
- Script to upload images programmatically
- Let me know if you need this

**Option 3: Manual** (Best for < 50 items)
- Just add them one by one
- Fastest if you don't have many

---

## 📞 Need Help?

### Image Issues:
- "Images not showing" → Check URL is public
- "Images slow to load" → Compress/resize
- "Images look bad" → Use higher quality source

### Content Issues:
- "Don't know what to write" → Use template above
- "Too much content" → 150-300 words is perfect
- "Need inspiration" → Check Yelp, Google reviews

### Technical Issues:
- Website not showing images → Check Airtable field names
- Need code updates → Let me know!

---

## 📊 Example Airtable Structure

### Restaurants Table Should Have:

| Field Name | Type | Purpose | Example |
|------------|------|---------|---------|
| Name | Text | Restaurant name | "The Crow's Nest" |
| Description | Long Text | Main writeup | "Waterfront restaurant..." |
| PhotoURL | URL | Main image | https://... |
| Cuisine | Select | Food type | "Seafood" |
| PriceRange | Select | Cost level | "$$" |
| Address | Text | Location | "2218 East Cliff Dr" |
| Phone | Phone | Contact | "(831) 476-4560" |
| Website | URL | Link | https://... |
| Hours | Long Text | Operating hours | "11:30 AM - 9:00 PM" |
| BestDish | Text | Signature item | "Clam Chowder" |
| Parking | Long Text | Parking info | "Free lot, 50 spaces" |
| Reservations | Checkbox | Need reservation? | Yes/No |

---

## ✅ Summary

**For Writeups:**
- Use `Description` field in Airtable (already works!)
- 150-300 words per restaurant
- Follow the template structure
- Be specific, helpful, honest

**For Images:**
- Host on Cloudinary (recommended) or Imgur (easiest)
- Resize to 1200x800px, compress < 200KB
- Add URL to `PhotoURL` field in Airtable
- Website automatically displays them

**Get Started:**
1. Pick 5 restaurants to start with
2. Write descriptions using template
3. Find/upload images to Cloudinary
4. Paste URLs in Airtable
5. Check your website – images appear automatically!

---

**Need me to update code for anything?** Let me know! 🚀

