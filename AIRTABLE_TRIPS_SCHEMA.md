# 📌 Airtable Schema: Trip Planner Tables

## Setup Instructions

### 1. Create "Trips" Table

**Table Name**: `Trips`

**Fields**:
1. **TripId** (Formula)
   - Type: Formula
   - Formula: `RECORD_ID()`
   - Purpose: Unique identifier

2. **Name** (Single line text) *Required*
   - Example: "Weekend in Santa Cruz"

3. **Description** (Long text)
   - Example: "Exploring beaches and restaurants"

4. **UserId** (Single line text) *Required*
   - Store the user's email from NextAuth
   - Example: "user@example.com"

5. **Collaborators** (Long text)
   - Comma-separated emails
   - Example: "friend1@example.com, friend2@example.com"

6. **CoverImage** (Attachment)
   - Optional trip cover photo

7. **StartDate** (Date)
   - Trip start date

8. **EndDate** (Date)
   - Trip end date

9. **IsPublic** (Checkbox)
   - Default: unchecked
   - If checked, trip is discoverable

10. **ShareToken** (Single line text)
    - UUID for sharing
    - Example: "abc123-def456-ghi789"

11. **Created** (Created time)
    - Automatically set

12. **Updated** (Last modified time)
    - Automatically updates

---

### 2. Create "TripItems" Table

**Table Name**: `TripItems`

**Fields**:
1. **ItemId** (Formula)
   - Type: Formula
   - Formula: `RECORD_ID()`
   - Purpose: Unique identifier

2. **TripId** (Single line text) *Required*
   - Links to Trips table
   - Example: "recXXXXXXXXXXXXXX"

3. **ItemType** (Single select) *Required*
   - Options: Activity, Restaurant, Note, Custom
   - Example: "Activity"

4. **ReferenceId** (Single line text)
   - ID of the activity/restaurant
   - Example: "recYYYYYYYYYYYYYY"

5. **ItemName** (Single line text) *Required*
   - Name of the item
   - Example: "Natural Bridges State Beach"

6. **ItemData** (Long text)
   - JSON string with cached data (address, image, etc.)
   - Example: `{"address":"2531 West Cliff Dr","imageUrl":"...","phone":"..."}`

7. **Day** (Number)
   - Which day of the trip (1, 2, 3, etc.)
   - Example: 1

8. **Order** (Number)
   - Order within the day
   - Example: 1 (first item), 2 (second item), etc.

9. **Notes** (Long text)
   - Personal notes from user
   - Example: "Bring camera for sunset photos"

10. **Created** (Created time)
    - Automatically set

---

## Environment Variables to Add

Add these to your `.env.local` and Vercel:

```bash
AIRTABLE_TRIPS_TABLE=Trips
AIRTABLE_TRIP_ITEMS_TABLE=TripItems
```

---

## Quick Setup Steps

1. Open your Airtable base
2. Click "+ Add or import" → "Create empty table"
3. Name it "Trips"
4. Add all fields listed above
5. Repeat for "TripItems" table
6. Add environment variables to `.env.local`
7. Add same variables in Vercel dashboard
8. Redeploy

---

## Example Data

### Trips Table Example:
| Name | UserId | StartDate | EndDate | IsPublic |
|------|---------|-----------|---------|----------|
| Weekend Getaway | user@example.com | 2025-11-01 | 2025-11-03 | ☑ |
| Family Trip | user@example.com | 2025-12-20 | 2025-12-27 | ☐ |

### TripItems Table Example:
| TripId | ItemType | ItemName | Day | Order | Notes |
|--------|----------|----------|-----|-------|-------|
| recXXX | Activity | Natural Bridges | 1 | 1 | Arrive by 5pm for sunset |
| recXXX | Restaurant | The Picnic Basket | 1 | 2 | Get the turkey pesto |
| recXXX | Activity | Beach Boardwalk | 2 | 1 | Check hours online first |

---

## Testing

Once tables are created, test with:

```bash
npm run dev
# Visit http://localhost:3000/trips
# Try creating a trip
# Try adding items to the trip
```

---

## Next Steps

After creating tables:
1. ✅ Add environment variables
2. ✅ Test trip creation
3. ✅ Test adding items
4. ✅ Test sharing
5. Deploy to Vercel

