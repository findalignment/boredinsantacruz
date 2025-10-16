# 🔧 Event System Troubleshooting Guide

## Quick Diagnosis

**Visit this URL to check your setup:**
```
http://localhost:3000/api/test-events
```

This will tell you exactly what's configured correctly and what's missing.

---

## Common Issues & Solutions

### ❌ Issue 1: "Nothing happened" when submitting

**Possible Causes:**

**A) Environment Variables Not Set**
```bash
# Check your .env.local has all these:
AIRTABLE_TOKEN="pat...."
AIRTABLE_BASE_ID="app..."
AIRTABLE_EVENTS_TABLE="Events"
RESEND_API_KEY="re_..."
EMAIL_FROM="events@boredinsantacruz.com"
ADMIN_EMAIL="your-email@example.com"
```

**B) Development Server Not Restarted**
After adding environment variables, you MUST restart:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

**C) Wrong Table Name**
- Check your Airtable table is named exactly: `Events`
- Or update `AIRTABLE_EVENTS_TABLE` to match your table name

**D) Missing Airtable Fields**
Your Airtable table must have these fields (case-sensitive):
- Title (Single line text)
- Description (Long text)
- Categories (Single line text)
- Start Date (Date)
- Start Time (Single line text)
- Venue Name (Single line text)
- Venue Address (Single line text)
- Is Online (Checkbox)
- Cost (Single line text)
- Ticket URL (URL)
- Website URL (URL)
- Contact Email (Email)
- Contact Phone (Phone number)
- Image URL (URL)
- Video URL (URL)
- Kid Friendly (Checkbox)
- Pet Friendly (Checkbox)
- Accessible (Checkbox)
- Age Restriction (Single line text)
- Submitter Name (Single line text)
- Submitter Email (Email)
- Status (Single select: "Pending Review", "Approved", "Rejected")
- Submitted Date (Date)

---

### ❌ Issue 2: "Event appears in Airtable but no email"

**Possible Causes:**

**A) Resend Domain Not Verified**
1. Go to [resend.com/domains](https://resend.com/domains)
2. Check if `boredinsantacruz.com` shows "Verified" status
3. If not, check your DNS records (takes 15-30 min)

**B) Wrong EMAIL_FROM Domain**
Your `EMAIL_FROM` must match a verified domain in Resend:
```bash
# Good (if you verified this domain):
EMAIL_FROM="events@boredinsantacruz.com"

# Bad (unverified domain):
EMAIL_FROM="test@gmail.com"
```

**C) Email in Spam Folder**
- Check your spam/junk folder
- Check Resend dashboard for delivery logs

**D) Resend API Key Invalid**
- Get a fresh key from [resend.com/api-keys](https://resend.com/api-keys)
- Make sure it starts with `re_`

---

### ❌ Issue 3: Form shows error message

**Check Browser Console:**
1. Open your browser's Developer Tools (F12)
2. Go to "Console" tab
3. Submit the form again
4. Look for red error messages
5. Share the error with me if you need help

**Check Network Tab:**
1. Open Developer Tools (F12)
2. Go to "Network" tab
3. Submit the form
4. Look for a request to `/api/events/submit`
5. Click it and check the "Response" tab
6. This shows the exact error from the server

---

## Step-by-Step Verification

### ✅ Step 1: Verify Airtable Setup

**Test Airtable Connection:**
```bash
# Replace with your actual values:
AIRTABLE_TOKEN="pat...."
AIRTABLE_BASE_ID="app..."

curl -X GET "https://api.airtable.com/v0/$AIRTABLE_BASE_ID/Events?maxRecords=1" \
  -H "Authorization: Bearer $AIRTABLE_TOKEN"
```

**Expected Response:**
- Status 200 OK
- JSON with `records` array

**If it fails:**
- Check your token is correct
- Check your base ID is correct
- Check the table name is "Events" (case-sensitive)

---

### ✅ Step 2: Verify Resend Setup

**Test Resend API:**
```bash
# Replace with your actual key:
RESEND_API_KEY="re_..."

curl -X GET "https://api.resend.com/domains" \
  -H "Authorization: Bearer $RESEND_API_KEY"
```

**Expected Response:**
- Status 200 OK
- List of domains with status

**If it fails:**
- Check your API key is correct
- Generate a new key if needed

---

### ✅ Step 3: Test Event Submission (Manual)

**Submit a Test Event via API:**

1. Make sure your dev server is running:
```bash
npm run dev
```

2. Open a new terminal and run:
```bash
curl -X POST http://localhost:3000/api/events/submit \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "description": "This is a test event to verify the system works",
    "categories": "Music",
    "startDate": "2025-11-01",
    "startTime": "18:00",
    "endDate": "",
    "endTime": "",
    "venueName": "The Catalyst",
    "venueAddress": "1011 Pacific Ave, Santa Cruz, CA 95060",
    "venueCity": "Santa Cruz",
    "isOnline": false,
    "onlineUrl": "",
    "cost": "$",
    "ticketUrl": "",
    "websiteUrl": "",
    "contactEmail": "",
    "contactPhone": "",
    "imageUrl": "",
    "videoUrl": "",
    "kidFriendly": false,
    "petFriendly": false,
    "accessible": true,
    "ageRestriction": "All ages",
    "submitterName": "Test User",
    "submitterEmail": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Event submitted successfully",
  "eventId": "rec..."
}
```

**If successful:**
1. Check Airtable - record should appear
2. Check email - confirmation should arrive
3. Your system is working! ✅

**If it fails:**
- Check the error message
- Verify all environment variables
- Check server logs in terminal

---

## Debugging Checklist

Use this checklist to diagnose issues:

```
Environment Variables:
□ AIRTABLE_TOKEN is set in .env.local
□ AIRTABLE_BASE_ID is set in .env.local
□ AIRTABLE_EVENTS_TABLE is set in .env.local (or defaults to "Events")
□ RESEND_API_KEY is set in .env.local
□ EMAIL_FROM is set in .env.local
□ ADMIN_EMAIL is set in .env.local (optional)

Airtable:
□ Table named "Events" exists
□ All 24+ required fields exist
□ Field names match exactly (case-sensitive)
□ Token has write permissions

Resend:
□ Account created at resend.com
□ API key generated
□ Domain added (boredinsantacruz.com)
□ DNS records configured
□ Domain status is "Verified" (green checkmark)

Server:
□ Development server is running (npm run dev)
□ Server was restarted after adding env vars
□ No errors in terminal
□ Port 3000 is accessible

Testing:
□ Visited /api/test-events - all checks pass
□ Submitted test event via form
□ Checked browser console for errors
□ Checked Network tab for API response
```

---

## Still Having Issues?

### 1. Check Server Logs

When you submit an event, watch your terminal. You should see:
```
[Event Submission] Received request
[Event Submission] Event created in Airtable: rec...
[Event Submission] Success
```

If you see errors, they'll appear here.

### 2. Enable Debug Mode

Add this to your `.env.local`:
```bash
DEBUG=true
NODE_ENV=development
```

Restart server and try again.

### 3. Check Vercel Logs (Production)

If testing on Vercel:
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Logs" tab
4. Submit an event
5. Watch real-time logs

### 4. Verify Production Environment Variables

On Vercel:
1. Go to Settings → Environment Variables
2. Make sure ALL variables are set:
   - AIRTABLE_TOKEN
   - AIRTABLE_BASE_ID
   - AIRTABLE_EVENTS_TABLE
   - RESEND_API_KEY
   - EMAIL_FROM
   - ADMIN_EMAIL

3. Redeploy after adding variables

---

## Success Indicators

**✅ Everything is working when:**

1. **Form Submission:**
   - Form shows success message
   - No errors in browser console
   - Redirects to /events/submit/success

2. **Airtable:**
   - New record appears in Events table
   - Status is "Pending Review"
   - All fields are populated
   - Submitted Date is set

3. **Email (Submitter):**
   - Confirmation email received
   - From: events@boredinsantacruz.com
   - Subject: "Event Submitted Successfully"
   - Contains event details

4. **Email (Admin):**
   - Notification email received
   - Contains submitter info
   - Has link to admin dashboard

5. **Admin Dashboard:**
   - Visit /admin/events
   - See pending event
   - Can approve/reject

---

## Quick Fix Commands

**Restart Everything:**
```bash
# Stop server (Ctrl+C in terminal)
# Then:
npm run dev
```

**Clear Next.js Cache:**
```bash
rm -rf .next
npm run dev
```

**Rebuild:**
```bash
npm run build
```

**Check Environment Variables Loaded:**
Visit: `http://localhost:3000/api/test-events`

---

## Contact for Help

If you're still stuck after trying all of the above:

1. Share the output of `/api/test-events`
2. Share any error messages from:
   - Browser console
   - Network tab
   - Server terminal
3. Confirm which step failed in the checklist

I'll help you debug it! 🚀

