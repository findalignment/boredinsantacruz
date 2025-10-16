# 📧 Event Reminders Table Setup

## Airtable Table: "Event Reminders"

Create a new table in your Airtable base for event reminders.

### Fields

| Field Name | Type | Description | Settings |
|------------|------|-------------|----------|
| **ID** | Auto number | Unique ID | Primary field |
| **Email** | Email | User's email address | Required |
| **Event ID** | Text | Linked event ID from Events table | Required |
| **Event Title** | Text | Event name (for easy reference) | |
| **Event Date** | Date | Event start date | Required |
| **Reminder Sent** | Checkbox | Whether reminder was sent | Default: unchecked |
| **Reminder Date** | Date | When reminder should be sent | Formula: `DATEADD({Event Date}, -1, 'days')` |
| **Created At** | Created time | When user signed up | Auto |
| **User ID** | Text | User ID if logged in | Optional |
| **Status** | Single select | pending, sent, cancelled | Options: pending, sent, cancelled |

### Views

1. **Pending Reminders**
   - Filter: Status = "pending"
   - Filter: Reminder Sent = false
   - Filter: Reminder Date <= TODAY()
   - Sort: Reminder Date (ascending)

2. **Sent Today**
   - Filter: Reminder Sent = true
   - Filter: Created At = TODAY()

3. **By Event**
   - Group by: Event ID
   - Sort: Event Date

### Automation (Optional)

If using Airtable Automations:
1. Trigger: When record matches conditions
2. Conditions: Status = "pending" AND Reminder Date <= TODAY() AND Reminder Sent = false
3. Action: Send email or webhook to your API

## Environment Variable

Add to `.env.local`:
```bash
AIRTABLE_REMINDERS_TABLE=Event Reminders
```

## API Endpoint

The system will check for pending reminders daily and send them via:
- `/api/cron/send-reminders` (called by Vercel Cron)

## User Flow

1. User visits event page
2. Clicks "Remind Me" button
3. Enters email (or uses logged-in email)
4. Receives confirmation
5. Gets reminder 1 day before event
6. Email includes:
   - Event details
   - Date/time/location
   - Link to event page
   - "Add to Calendar" link

