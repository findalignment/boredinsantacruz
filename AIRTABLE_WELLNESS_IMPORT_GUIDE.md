# 🧘‍♀️ Airtable Wellness Import Guide

## ✅ **FIXED CSV FILES READY FOR IMPORT**

### 📁 **Recommended Files:**
1. **`santacruz-wellness-sample-clean.csv`** - **START HERE** (4 sample records)
2. **`santacruz-wellness-airtable-fixed.csv`** - Full dataset (62 records)
3. **`santacruz-wellness-airtable-minimal.csv`** - Minimal fields (62 records)

---

## 🚀 **Quick Import Steps:**

### **Step 1: Test with Sample (RECOMMENDED)**
1. Open your Airtable base
2. Go to your **Wellness** table
3. Click **"Add records"** → **"Import a spreadsheet"**
4. Upload **`santacruz-wellness-sample-clean.csv`**
5. Map the fields (see mapping below)
6. Click **"Import"**

### **Step 2: Full Import (After Testing)**
1. If sample import works, repeat with **`santacruz-wellness-airtable-fixed.csv`**
2. This will add all 62 wellness facilities

---

## 📋 **Field Mapping Guide:**

| CSV Column | Airtable Field | Field Type | Notes |
|------------|----------------|------------|-------|
| Name | **Title** | Single line text | Primary field |
| Category | Category | Single select | Yoga Studio, Pilates Studio, Fitness Center, etc. |
| Description | Description | Long text | Full description |
| Address | Address | Long text | Full address |
| Phone | Phone | Phone number | Format: (831) 123-4567 |
| Website | Website | URL | Full website URL |
| Latitude | Latitude | Number | Decimal format |
| Longitude | Longitude | Number | Decimal format |
| Neighborhood | Neighborhood | Single select | Santa Cruz, Capitola, etc. |
| Hours | Hours | Long text | Operating hours |
| Services | Services | Long text | Services offered |
| PriceLevel | Price Level | Number | 1-4 scale |
| IndoorOutdoor | Indoor/Outdoor | Single select | Indoor, Outdoor, Mixed |
| Parking | Parking | Long text | Parking information |
| Rating | Rating | Number | 1-5 scale |
| PhotoURL | Photo URL | URL | Google Places photo URL |
| Tags | Tags | Multiple select | Comma-separated tags |
| WellnessType | Wellness Type | Single select | Yoga Studio, Pilates, etc. |
| BusinessType | Business Type | Single select | Wellness Business |

---

## 🛠️ **Airtable Setup Requirements:**

### **Create These Field Types:**
1. **Single Select Fields:**
   - Category: `Yoga Studio`, `Pilates Studio`, `Fitness Center`, `Massage Therapy`, `Spa`, `Wellness Center`
   - Neighborhood: `Santa Cruz`, `Capitola`, `Aptos`, `Live Oak`, `Pleasure Point`, `Downtown Santa Cruz`, `Westside Santa Cruz`, `Scotts Valley`
   - Indoor/Outdoor: `Indoor`, `Outdoor`, `Mixed`
   - Wellness Type: `Yoga Studio`, `Pilates Studio`, `Fitness Center`, `Massage Therapy`, `Spa`, `Wellness Center`
   - Business Type: `Wellness Business`, `Fitness Business`

2. **Number Fields:**
   - Price Level (1-4)
   - Rating (1-5)
   - Latitude (decimal)
   - Longitude (decimal)

3. **Multiple Select Field:**
   - Tags: `Yoga`, `Pilates`, `Fitness`, `Meditation`, `Wellness`, `CrossFit`, `Personal Training`, etc.

---

## 🔧 **Troubleshooting:**

### **If Import Fails:**
1. **Try the sample file first** - `santacruz-wellness-sample-clean.csv`
2. **Check field types** - Make sure they match the mapping above
3. **Import in batches** - Try 10-15 records at a time
4. **Check Airtable limits** - Ensure your plan supports the number of records

### **Common Issues:**
- ❌ **Field type mismatch** - Ensure numbers are Number fields, not Text
- ❌ **Single select values** - Make sure dropdown options exist in Airtable
- ❌ **URL format** - Check that Website and PhotoURL fields are URL type
- ❌ **Too many records** - Try the minimal version or import in batches

### **Success Indicators:**
- ✅ All 4 sample records import successfully
- ✅ All fields are mapped correctly
- ✅ No error messages during import
- ✅ Records appear in your Wellness table

---

## 📊 **What You'll Get:**

### **Sample Records (4):**
1. **Pleasure Point Yoga** - Ocean-view yoga studio
2. **Village Yoga Santa Cruz** - Community yoga studio
3. **Club Pilates Santa Cruz** - Reformer Pilates studio
4. **Westside Fitness & CrossFit** - CrossFit and fitness center

### **Full Dataset (62 records):**
- Yoga studios, Pilates studios, fitness centers
- Massage therapy, spas, wellness centers
- Personal trainers, boot camps, dance studios
- Complete with addresses, hours, ratings, photos

---

## 🎯 **Next Steps After Import:**

1. **Verify Data** - Check a few records to ensure accuracy
2. **Add Images** - Upload local photos to replace Google Places URLs if desired
3. **Update Hours** - Verify and update business hours as needed
4. **Add Reviews** - Import or manually add customer reviews
5. **Create Views** - Set up filtered views (by category, neighborhood, etc.)
6. **Add Relationships** - Link to other tables if needed

---

## 📞 **Need Help?**

If you encounter any issues:
1. Start with the **sample file** (`santacruz-wellness-sample-clean.csv`)
2. Check the **field mapping** carefully
3. Ensure **field types** match in Airtable
4. Try importing **smaller batches**

**✅ The CSV files are now properly formatted and ready for Airtable import!**
