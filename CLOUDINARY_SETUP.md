# 📸 Cloudinary Image Upload Setup

## Quick Setup Guide

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for free account
3. Go to Dashboard → Settings

### 2. Get API Credentials
You'll need three values from your Cloudinary Dashboard:

```
Cloud Name: Found on dashboard homepage
API Key: In "Account Details" section  
API Secret: In "Account Details" section (click "Show")
```

### 3. Add to Environment Variables

Add to `.env.local`:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Public URL (for client-side uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=events_preset
```

### 4. Create Upload Preset

In Cloudinary Dashboard:
1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Settings:
   - **Preset name:** `events_preset`
   - **Signing Mode:** Unsigned
   - **Folder:** `boredinsantacruz/events`
   - **Access mode:** Public
5. **Transformations:**
   - **Incoming Transformation:**
     - Width: 1200
     - Height: 800
     - Crop: limit
     - Quality: auto
     - Format: auto
6. Click **Save**

### 5. Image Settings (Recommended)

**Auto-Optimizations:**
- Quality: Auto
- Format: Auto (serves WebP/AVIF when supported)
- Responsive images enabled

**Security:**
- Upload preset is unsigned (public uploads)
- Limit file size to 5MB
- Only image formats allowed

## Usage in Event Submission

Users can now:
1. Upload event images directly in submission form
2. Images automatically optimized
3. Stored in `boredinsantacruz/events/` folder
4. CDN-delivered for fast loading

## Free Tier Limits

Cloudinary free tier includes:
- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month

Perfect for starting out! 🚀

