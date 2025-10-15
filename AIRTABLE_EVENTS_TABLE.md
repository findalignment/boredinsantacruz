# Airtable Events Table Setup

## Create New Table: "Events"

Add this table to your Airtable base to enable event submissions.

---

## Table Structure

### Field Configuration

| Field Name | Field Type | Description / Options |
|------------|------------|----------------------|
| **Title** | Single line text | Event title (max 100 chars) |
| **Description** | Long text | Full event description (max 2000 chars) |
| **Categories** | Single line text | Comma-separated categories |
| **Start Date** | Date | Event start date (YYYY-MM-DD) |
| **Start Time** | Single line text | Event start time (HH:MM) |
| **End Date** | Date | Event end date (optional) |
| **End Time** | Single line text | Event end time (optional) |
| **Is Recurring** | Checkbox | Is this a recurring event? |
| **Recurring Pattern** | Single line text | Description of recurrence (e.g., "Every Friday") |
| **Venue Name** | Single line text | Name of venue |
| **Venue Address** | Long text | Full venue address |
| **Latitude** | Number | Geocoded latitude (decimal, precision: 6) |
| **Longitude** | Number | Geocoded longitude (decimal, precision: 6) |
| **Is Online** | Checkbox | Is this an online event? |
| **Online URL** | URL | Link to online event (Zoom, etc.) |
| **Cost** | Single select | Options: `Free`, `$`, `$$`, `$$$`, `$$$$` |
| **Ticket URL** | URL | Link to buy tickets |
| **Website URL** | URL | Event website |
| **Contact Email** | Email | Contact email for event |
| **Contact Phone** | Phone number | Contact phone for event |
| **Image URL** | URL | Event image/poster |
| **Video URL** | URL | Promotional video (YouTube, Vimeo) |
| **Kid Friendly** | Checkbox | Is event kid-friendly? |
| **Pet Friendly** | Checkbox | Are pets allowed? |
| **Accessible** | Checkbox | Wheelchair accessible? |
| **Age Restriction** | Single select | Options: `All ages`, `18+`, `21+` |
| **Submitter Name** | Single line text | Name of person who submitted |
| **Submitter Email** | Email | Email of person who submitted |
| **Status** | Single select | Options: `Pending Review`, `Approved`, `Rejected`, `Published`, `Archived` |
| **Submitted Date** | Date | When event was submitted (auto-filled) |
| **Reviewed Date** | Date | When event was reviewed |
| **Reviewed By** | Single line text | Admin who reviewed |
| **Review Notes** | Long text | Internal notes from review |
| **Source** | Single select | Options: `Website Submission`, `Eventbrite`, `Manual Entry`, `Import` |
| **Views** | Number | Number of times event page was viewed |
| **Clicks** | Number | Number of ticket/website clicks |
| **Favorites** | Number | Number of users who favorited |

---

## Recommended Views

### 1. Pending Review (Default)
**Filter:** `Status = "Pending Review"`  
**Sort:** `Submitted Date` (newest first)  
**Purpose:** Admin moderation queue

### 2. Approved Events
**Filter:** `Status = "Approved"` OR `Status = "Published"`  
**Sort:** `Start Date` (ascending)  
**Purpose:** Live events on website

### 3. This Week
**Filter:** 
- `Status = "Approved"` OR `Status = "Published"`
- `Start Date` is within this week

**Sort:** `Start Date` (ascending)  
**Purpose:** Featured events

### 4. Upcoming
**Filter:**
- `Status = "Approved"` OR `Status = "Published"`
- `Start Date` is after today

**Sort:** `Start Date` (ascending)  
**Purpose:** Public event calendar

### 5. By Category
**Group by:** `Categories`  
**Filter:** `Status = "Approved"` OR `Status = "Published"`  
**Purpose:** Browse by category

---

## Environment Variable

Add to `.env.local`:

```bash
AIRTABLE_EVENTS_TABLE="Events"
```

---

## Automation Ideas

### 1. Auto-Notify Submitter on Approval
**Trigger:** When `Status` changes to `Approved`  
**Action:** Send email to `Submitter Email`  
**Message:**
```
Subject: Your event "[Title]" has been approved!

Hi [Submitter Name],

Great news! Your event "[Title]" has been approved and is now live on 
Bored in Santa Cruz.

View your event: https://boredinsantacruz.com/events/[ID]

Thanks for contributing to the Santa Cruz community!

- The Bored in Santa Cruz Team
```

### 2. Auto-Notify Submitter on Rejection
**Trigger:** When `Status` changes to `Rejected`  
**Action:** Send email to `Submitter Email`  
**Message:**
```
Subject: Event submission update: "[Title]"

Hi [Submitter Name],

Thank you for submitting your event "[Title]". Unfortunately, we're unable to 
approve it at this time.

Reason: [Review Notes]

If you have questions or would like to resubmit with changes, please contact us 
at events@boredinsantacruz.com.

- The Bored in Santa Cruz Team
```

### 3. Auto-Archive Past Events
**Trigger:** Daily at midnight  
**Condition:** `Start Date` is more than 7 days ago AND `Status` is `Published`  
**Action:** Change `Status` to `Archived`

---

## Sample Data

Use this sample to test the system:

| Field | Value |
|-------|-------|
| Title | Jazz Night at Kuumbwa |
| Description | Join us for an evening of live jazz featuring local musicians. Doors open at 6:30 PM, show starts at 7 PM. |
| Categories | Music & Live Entertainment |
| Start Date | 2025-10-20 |
| Start Time | 19:00 |
| Venue Name | Kuumbwa Jazz Center |
| Venue Address | 320-2 Cedar St, Santa Cruz, CA 95060 |
| Cost | $$ |
| Ticket URL | https://kuumbwajazz.org |
| Kid Friendly | No |
| Accessible | Yes |
| Age Restriction | All ages |
| Status | Approved |
| Source | Website Submission |

---

## Status Workflow

```
Pending Review
    ↓
[Admin reviews]
    ↓
├─→ Approved ─→ Published (on event date)
│                   ↓
│              (7 days after event)
│                   ↓
│              Archived
│
└─→ Rejected
```

---

## Admin Moderation Checklist

When reviewing events, check:
- [ ] Event is located in/near Santa Cruz County
- [ ] Title is clear and descriptive
- [ ] Description has enough detail
- [ ] Date/time is correct and in the future
- [ ] Venue information is accurate
- [ ] Image URL works (if provided)
- [ ] Ticket/Website URLs work (if provided)
- [ ] Not spam or inappropriate content
- [ ] Not duplicate of existing event
- [ ] Contact information is valid

**Approve:** Change Status to "Approved"  
**Reject:** Change Status to "Rejected" and add Review Notes

---

## API Integration

The website automatically:
- **Writes** to this table when users submit events
- **Reads** approved/published events for the public calendar
- **Updates** view counts and engagement metrics

---

## Setup Complete! ✅

Once this table is created:
1. Add sample event
2. Test submission form at `/events/submit`
3. Check "Pending Review" view
4. Approve sample event
5. Verify it appears on `/events` page

**Ready to accept community event submissions!** 🎉

