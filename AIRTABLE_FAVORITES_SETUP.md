# 📋 Airtable Setup - Favorites & Reviews Tables

## Overview

This guide will help you set up the **Favorites** and **Reviews** tables in Airtable for Sprint 8.

---

## 🗂️ Table 1: Favorites

### Purpose
Store user favorites (saved activities and restaurants)

### Fields

| Field Name | Type | Settings | Description |
|-----------|------|----------|-------------|
| `id` | Auto Number | Primary Key | Airtable auto-generates |
| `UserId` | Single Line Text | Required | User ID from NextAuth |
| `ItemType` | Single Select | Required | Options: "Activity", "Restaurant" |
| `ItemId` | Single Line Text | Required | ID of the activity or restaurant |
| `Notes` | Long Text | Optional | Private notes (user only) |
| `CreatedAt` | Date | Required | When favorite was added |

### Setup Steps

1. In your Airtable base, click **"Add or import"** → **"Create empty table"**
2. Name it: **`Favorites`**
3. Add fields as shown above:
   - Click **"+"** next to field names
   - Select field type
   - Configure settings
4. For **ItemType** field:
   - Select "Single Select"
   - Add options: "Activity", "Restaurant"
5. Copy the table ID:
   - Click on the table name
   - Go to **Help** → **"API documentation"**
   - Find the table ID (starts with `tbl...`)
6. Add to `.env.local`:
   ```bash
   AIRTABLE_FAVORITES_TABLE=tblXXXXXXXXXXXXXX
   ```

---

## 🗂️ Table 2: Reviews

### Purpose
Store user reviews and ratings for activities and restaurants

### Fields

| Field Name | Type | Settings | Description |
|-----------|------|----------|-------------|
| `id` | Auto Number | Primary Key | Airtable auto-generates |
| `UserId` | Single Line Text | Required | User ID from NextAuth |
| `UserName` | Single Line Text | Required | Display name |
| `UserEmail` | Email | Optional | For moderation |
| `ItemType` | Single Select | Required | "Activity" or "Restaurant" |
| `ItemId` | Single Line Text | Required | ID of the item |
| `Rating` | Number | Required | Overall rating (1-5) |
| `Title` | Single Line Text | Required | Review title |
| `Content` | Long Text | Required | Review text |
| `IsPublic` | Checkbox | Default: true | Public or private |
| `CreatedAt` | Date | Required | When posted |
| `UpdatedAt` | Date | Optional | Last edit |

### Restaurant-Specific Ratings

| Field Name | Type | Settings | Description |
|-----------|------|----------|-------------|
| `FoodRating` | Number | 1-5 | Quality of food |
| `AmbianceRating` | Number | 1-5 | Atmosphere |
| `ServiceRating` | Number | 1-5 | Service quality |
| `ValueRating` | Number | 1-5 | Price vs value |

### Activity-Specific Ratings

| Field Name | Type | Settings | Description |
|-----------|------|----------|-------------|
| `FunRating` | Number | 1-5 | How fun it was |
| `ValueRating` | Number | 1-5 | Worth the price |
| `AccessibilityRating` | Number | 1-5 | Ease of access |
| `WeatherRating` | Number | 1-5 | Weather dependency |

### Setup Steps

1. Create new table: **`Reviews`**
2. Add all fields as shown above
3. For **ItemType** field:
   - Select "Single Select"
   - Add options: "Activity", "Restaurant"
4. For rating fields:
   - Type: Number
   - Format: Integer
   - Allow negative numbers: No
5. Copy the table ID
6. Add to `.env.local`:
   ```bash
   AIRTABLE_REVIEWS_TABLE=tblYYYYYYYYYYYYYY
   ```

---

## 🔍 Example Records

### Favorites Example:
```
UserId: user_abc123
ItemType: Activity
ItemId: recXXXXXXXXXXXXXX
Notes: "Perfect for rainy days with kids!"
CreatedAt: 2025-10-14
```

### Reviews Example (Restaurant):
```
UserId: user_abc123
UserName: John Doe
UserEmail: john@example.com
ItemType: Restaurant
ItemId: recYYYYYYYYYYYYYY
Rating: 5
Title: "Best tacos in Santa Cruz!"
Content: "Amazing fish tacos, great atmosphere..."
IsPublic: true
FoodRating: 5
AmbianceRating: 4
ServiceRating: 5
ValueRating: 4
CreatedAt: 2025-10-14
```

---

## 🔧 Vercel Environment Variables

Add these to your Vercel project:

```bash
AIRTABLE_FAVORITES_TABLE=tblXXXXXXXXXXXXXX
AIRTABLE_REVIEWS_TABLE=tblYYYYYYYYYYYYYY
```

**How to add in Vercel:**
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add both variables
4. Redeploy

---

## 📊 Airtable Views (Recommended)

### For Favorites Table:

**View 1: All Favorites**
- Show all fields
- Sort by CreatedAt (newest first)

**View 2: Activities Only**
- Filter: ItemType = "Activity"
- Group by UserId

**View 3: Restaurants Only**
- Filter: ItemType = "Restaurant"
- Group by UserId

### For Reviews Table:

**View 1: All Reviews**
- Show all fields
- Sort by CreatedAt (newest first)

**View 2: Public Reviews**
- Filter: IsPublic = true
- Hide UserId, UserEmail

**View 3: Pending Moderation**
- Filter: IsPublic = true
- Show only recent (last 7 days)

**View 4: By Rating**
- Sort by Rating (highest first)
- Filter: IsPublic = true

---

## 🚨 Important Notes

1. **User IDs**: These come from NextAuth and look like `user_xxxxx` or email-based IDs
2. **Item IDs**: These are Airtable record IDs (start with `rec`)
3. **Ratings**: Always 1-5 stars (validate on frontend)
4. **Privacy**: Respect `IsPublic` flag - never show private reviews to other users
5. **Moderation**: Consider adding a moderation workflow for public reviews

---

## ✅ Testing Checklist

After setup:

- [ ] Favorites table created with all fields
- [ ] Reviews table created with all fields
- [ ] Table IDs added to `.env.local`
- [ ] Table IDs added to Vercel
- [ ] Test creating a favorite (via app)
- [ ] Test removing a favorite
- [ ] Test creating a review
- [ ] Verify data appears in Airtable

---

## 🎯 Next Steps

After tables are set up:
1. Deploy the code (already done in Sprint 8)
2. Test the favorite button on activities/restaurants
3. Test writing a review
4. Check that data appears in Airtable
5. Build out the favorites page
6. Build out the reviews display

---

**Ready to set up? Follow the steps above and you'll be tracking favorites and reviews in no time!** 🚀

