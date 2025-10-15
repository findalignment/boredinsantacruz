# Events Page Fix - Eventbrite API

## Issue

The events page at `/events` is not showing any events.

**Root Cause:** Eventbrite API token is invalid or expired.

Error seen: `404 Not Found` when calling Eventbrite API

---

## Solution

You need to get a new Eventbrite API token.

### Step 1: Get New Eventbrite API Token

1. Go to: https://www.eventbrite.com/account-settings/apps
2. Sign in to your Eventbrite account
3. Click "Create New API Key" or "Show" next to existing key
4. Copy the **Private Token** (starts with something like `FKHNBC5MK...`)

### Step 2: Update Environment Variables

**Local Development:**
```bash
# In .env.local
EVENTBRITE_API_KEY=your_new_token_here
```

**Production (Vercel):**
1. Go to: https://vercel.com/[your-project]/settings/environment-variables
2. Find `EVENTBRITE_API_KEY`
3. Edit and update with new token
4. Redeploy

### Step 3: Test

```bash
# Restart dev server
npm run dev

# Visit: http://localhost:3000/events
# Should now show events!
```

---

## How the Events Page Works

The events page integrates with:
1. **Eventbrite API** - Pulls events from Eventbrite (ticketed events)
2. **Airtable** - Your custom events (free events, local happenings)

### Code Location:
- **API Integration:** `src/lib/events/eventbrite.ts`
- **Page:** `src/app/events/page.tsx`
- **Server Action:** `src/lib/events/airtable-events.ts`

---

## Alternative: Disable Eventbrite Temporarily

If you want the events page to work now without Eventbrite:

1. The page will gracefully handle missing Eventbrite events
2. It will show only Airtable events
3. You'll see a warning in console but page works

**To test without Eventbrite:**
- Just leave `EVENTBRITE_API_KEY` empty or invalid
- Page will skip Eventbrite and show only Airtable events

---

## Eventbrite API Limits

**Free Tier:**
- 1,000 requests/day
- Rate limit: 50 requests/minute

**What We Do:**
- Cache results for 6 hours
- Minimize API calls
- Handle rate limits gracefully

---

## Troubleshooting

### "No events found"
- Check if there are actually events in Santa Cruz on Eventbrite
- Verify API key is correct
- Check Vercel logs for errors

### "REQUEST_DENIED" or 401
- API key is invalid
- Get new token from Eventbrite

### Events show but are old
- Clear cache (wait 6 hours or restart server)
- Check date filters in code

---

## Once Fixed

The events page will show:
- ✅ Upcoming events in Santa Cruz
- ✅ Filter by date, category, price
- ✅ Link to buy tickets on Eventbrite
- ✅ Your custom Airtable events too

---

**Action Required:** Get new Eventbrite API token and update environment variables.

