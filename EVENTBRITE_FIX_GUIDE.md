# 🎉 Eventbrite API Setup & Troubleshooting Guide

## Current Status

Your Eventbrite integration code is already implemented and working correctly. You just need to ensure your API key is properly configured.

---

## ✅ Quick Fix Steps

### 1. **Get Your Eventbrite API Key**

If you already have the API key, skip to step 2.

Otherwise:
1. Go to [https://www.eventbrite.com/platform/api](https://www.eventbrite.com/platform/api)
2. Sign in to your Eventbrite account
3. Click **"Create an App"** or select existing app
4. Copy your **Private Token** (this is your API key)

### 2. **Add to Environment Variables**

Open your `.env.local` file (in the project root) and add:

```bash
EVENTBRITE_API_KEY=YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with your actual Eventbrite private token.

### 3. **Restart Your Development Server**

Environment variables are only loaded at startup, so you need to restart:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. **Verify It's Working**

Visit these pages to check if events are loading:
- http://localhost:3000/events
- http://localhost:3000/tonight

You should see:
- ✅ Events from Eventbrite appearing
- ❌ No more "API key not configured" warning

---

## 🔍 Troubleshooting

### Issue 1: "No events found"

**Possible causes:**
1. **No events in your area** - Eventbrite might not have events near Santa Cruz right now
2. **Location search too narrow** - Try widening the search radius
3. **Date range issue** - Events might be outside your search window

**Fix:**
1. Check if your API key is working by visiting:
   ```
   https://www.eventbriteapi.com/v3/users/me/?token=YOUR_API_KEY
   ```
2. If that works, try broadening the search in `/src/lib/events/eventbrite.ts`:
   ```typescript
   'location.within': '50mi', // Change from 25mi to 50mi
   ```

---

### Issue 2: "401 Unauthorized" or "403 Forbidden"

**Cause**: API key is invalid or expired

**Fix:**
1. Go to [Eventbrite API Dashboard](https://www.eventbrite.com/account-settings/apps)
2. Check if your app still exists
3. Generate a new private token
4. Update `.env.local` with the new token
5. Restart server

---

### Issue 3: "API key not configured" warning still shows

**Cause**: Environment variable not loaded

**Fix:**
1. Double-check the variable name in `.env.local`:
   ```bash
   # Must be exactly this (case-sensitive):
   EVENTBRITE_API_KEY=your_token_here
   ```
2. Make sure `.env.local` is in the project root (not in `src/`)
3. Restart your server completely (stop and start, don't just refresh)
4. Clear build cache and restart:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Issue 4: Events not updating

**Cause**: Caching

**Fix:**
The API is cached for 6 hours (21600 seconds). To force refresh:
1. Wait 6 hours, OR
2. Update the cache duration in `/src/lib/events/eventbrite.ts`:
   ```typescript
   next: {
     revalidate: 600, // Change to 10 minutes for testing
   }
   ```
3. For production, keep it at 21600 (6 hours) to avoid hitting API limits

---

## 📝 Current Implementation

Your Eventbrite integration already includes:

✅ **Automatic event fetching** from Santa Cruz area (25 mile radius)  
✅ **Event categories** (music, food, arts, etc.)  
✅ **Date filtering** (today, upcoming events)  
✅ **Venue information** with addresses  
✅ **Ticket pricing** (free vs paid)  
✅ **Image support** for event logos  
✅ **6-hour caching** to avoid API rate limits  
✅ **Error handling** with graceful fallbacks  

---

## 🔧 Advanced Configuration

### Change Search Location

Edit `/src/lib/events/eventbrite.ts`:

```typescript
const params = new URLSearchParams({
  'location.address': 'Santa Cruz, CA', // Change city here
  'location.within': '25mi', // Change radius here
  // ...
});
```

### Change Number of Events

```typescript
'page_size': '100', // Change from 100 to desired number (max 100)
```

### Add Event Filtering

```typescript
// Add these to params:
'categories': '103', // Music only
'price': 'free', // Free events only
```

[Full list of Eventbrite categories](https://www.eventbrite.com/platform/api#/reference/category/list)

---

## 🎯 Testing Checklist

After setup, verify:

- [ ] API key added to `.env.local`
- [ ] Server restarted
- [ ] Visit `/events` page
- [ ] No "API key not configured" warning
- [ ] Events displayed (if available in your area)
- [ ] Event cards show: name, date, venue, price
- [ ] Clicking event opens Eventbrite page
- [ ] Filters work (categories, free events, etc.)

---

## 📊 API Rate Limits

**Eventbrite allows:**
- 1,000 requests per hour per API key
- 50,000 requests per day per API key

**Current caching prevents issues:**
- Events cached for 6 hours
- ~4 requests per day maximum
- Well under rate limits ✅

---

## 🚀 Deployment (Vercel)

When deploying, add the environment variable in Vercel:

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add:
   - **Name**: `EVENTBRITE_API_KEY`
   - **Value**: Your Eventbrite token
   - **Environments**: Production, Preview, Development
5. Click **Save**
6. **Redeploy** your site

The events will now work in production!

---

## 🔒 Security Note

**IMPORTANT**: Never commit `.env.local` to git!

Your `.gitignore` already includes:
```
.env*.local
```

This prevents your API key from being exposed publicly.

---

## 💡 Tips

### Increase Event Visibility
1. Include more categories in search
2. Widen search radius (25mi → 50mi)
3. Add keywords filter for Santa Cruz specific events

### Better User Experience
1. Add event countdown timers
2. Show "Happening Now" badge for current events
3. Add calendar export (iCal/Google Calendar)
4. Enable event reminders

### Monetization
1. Add affiliate links to ticket purchases
2. Promote local events with sponsored placement
3. Charge venues for featured event listings

---

## 📞 Get Help

If you're still having issues:

1. **Check Eventbrite Status**:
   - [status.eventbrite.com](https://status.eventbrite.com)

2. **Test API Key**:
   ```bash
   curl "https://www.eventbriteapi.com/v3/users/me/?token=YOUR_TOKEN"
   ```

3. **Check Server Logs**:
   - Look for Eventbrite API errors in terminal
   - Check Network tab in browser DevTools

4. **Eventbrite Documentation**:
   - [API Docs](https://www.eventbrite.com/platform/api)
   - [Support](https://www.eventbrite.com/support/contact-us/)

---

## ✅ Summary

Your Eventbrite integration is **already built and ready to go**. Just:

1. ✅ Add `EVENTBRITE_API_KEY` to `.env.local`
2. ✅ Restart your server
3. ✅ Visit `/events` to see it working

That's it! 🎉

