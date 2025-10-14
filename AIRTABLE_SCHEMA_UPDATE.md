# 🗄️ Airtable Schema Update Guide - Sprint 2

This guide shows you how to add weather-aware fields to your Airtable activities.

---

## 🎯 New Fields to Add

Go to your **RainyActivities** table in Airtable and add these fields:

### 1. WeatherSuitability (Multiple Select)
**Type:** Multiple select  
**Options:**
- Perfect Sunny (for outdoor activities that are best in sun)
- Hot Sunny (for water activities, AC venues)
- Cool Sunny (for hiking, active outdoor)
- Partly Cloudy (flexible outdoor activities)
- Overcast (any activity, indoor preferred)
- Light Rain (indoor, covered areas)
- Rainy (indoor only)
- Heavy Rain (fully indoor)
- Foggy (cozy indoor activities)
- Windy (wind-protected venues)
- Cold (heated indoor venues)
- Hot (air-conditioned or water activities)

**Instructions:** Select ALL weather conditions where this activity works well.

---

### 2. IdealTemp_Min (Number)
**Type:** Number  
**Format:** Integer  
**Description:** Minimum comfortable temperature (°F) for this activity  
**Examples:**
- Indoor activities: `0` (any temperature)
- Beach activities: `70`
- Hiking: `55`
- Water sports: `75`

---

### 3. IdealTemp_Max (Number)
**Type:** Number  
**Format:** Integer  
**Description:** Maximum comfortable temperature (°F) for this activity  
**Examples:**
- Indoor activities: `150` (any temperature)
- Beach activities: `90`
- Hiking: `85`
- Hot coffee shop: `85`

---

### 4. IndoorOutdoor (Single Select)
**Type:** Single select  
**Options:**
- Indoor
- Outdoor
- Mixed (both indoor and outdoor elements)
- Covered (outdoor but protected from weather)

---

### 5. RainOk (Checkbox)
**Type:** Checkbox  
**Description:** Check if activity is still enjoyable in light rain  
**Examples:**
- Museums: ✓ Yes
- Beach volleyball: ✗ No
- Covered market: ✓ Yes

---

### 6. WindSensitive (Checkbox)
**Type:** Checkbox  
**Description:** Check if activity should be avoided in high winds (>20mph)  
**Examples:**
- Kayaking: ✓ Yes (wind sensitive)
- Indoor bowling: ✗ No
- Beach umbrella setup: ✓ Yes

---

### 7. RequiresGoodVisibility (Checkbox)
**Type:** Checkbox  
**Description:** Check if activity needs good visibility (avoid in fog)  
**Examples:**
- Scenic drive: ✓ Yes
- Lighthouse visit: ✓ Yes
- Coffee shop: ✗ No

---

### 8. WeatherBoost (Number)
**Type:** Number  
**Format:** Decimal (1 decimal place)  
**Default:** `1.0`  
**Range:** `0.5` to `2.0`  
**Description:** Multiplier to boost this activity in certain weather  
**Examples:**
- Museum on rainy day: `1.3` (extra appealing when raining)
- Ice cream shop on hot day: `1.5` (very appealing when hot)
- Regular cafe: `1.0` (no special boost)
- Beach on cold day: `0.7` (less appealing when cold)

---

## 📝 Sample Data Examples

### Example 1: Santa Cruz Beach Boardwalk
```
Title: Visit the Beach Boardwalk
WeatherSuitability: Perfect Sunny, Hot Sunny, Partly Cloudy
IdealTemp_Min: 65
IdealTemp_Max: 90
IndoorOutdoor: Mixed
RainOk: ☐ No
WindSensitive: ☑ Yes (rides can close)
RequiresGoodVisibility: ☑ Yes (scenic)
WeatherBoost: 1.5
```

### Example 2: Santa Cruz Museum of Art & History
```
Title: MAH Museum
WeatherSuitability: Overcast, Light Rain, Rainy, Heavy Rain, Foggy, Cold
IdealTemp_Min: 0
IdealTemp_Max: 150
IndoorOutdoor: Indoor
RainOk: ☑ Yes
WindSensitive: ☐ No
RequiresGoodVisibility: ☐ No
WeatherBoost: 1.3 (extra appealing on rainy days)
```

### Example 3: Verve Coffee Roasters
```
Title: Verve Coffee
WeatherSuitability: Perfect Sunny, Cool Sunny, Partly Cloudy, Overcast, Light Rain, Rainy, Foggy, Cold
IdealTemp_Min: 0
IdealTemp_Max: 150
IndoorOutdoor: Mixed (indoor seating + outdoor patio)
RainOk: ☑ Yes (indoor seating available)
WindSensitive: ☐ No
RequiresGoodVisibility: ☐ No
WeatherBoost: 1.2 (cozy on cold/rainy days)
```

### Example 4: Natural Bridges State Beach
```
Title: Natural Bridges Beach
WeatherSuitability: Perfect Sunny, Hot Sunny, Cool Sunny, Partly Cloudy
IdealTemp_Min: 60
IdealTemp_Max: 85
IndoorOutdoor: Outdoor
RainOk: ☐ No
WindSensitive: ☑ Yes (can be very windy)
RequiresGoodVisibility: ☑ Yes (scenic views)
WeatherBoost: 1.4
```

### Example 5: West Cliff Drive Walk
```
Title: Walk West Cliff Drive
WeatherSuitability: Perfect Sunny, Cool Sunny, Partly Cloudy, Overcast
IdealTemp_Min: 55
IdealTemp_Max: 80
IndoorOutdoor: Outdoor
RainOk: ☐ No
WindSensitive: ☑ Yes (can be breezy)
RequiresGoodVisibility: ☑ Yes (ocean views)
WeatherBoost: 1.3
```

---

## 🔄 Bulk Update Strategy

### Option 1: Manual Update (Best for Accuracy)
1. Go through each activity one by one
2. Think about what weather conditions suit it best
3. Fill in all 8 new fields

### Option 2: Start with Defaults, Refine Later
1. For ALL indoor activities:
   - WeatherSuitability: All rainy/foggy/cold options
   - IdealTemp_Min: 0
   - IdealTemp_Max: 150
   - IndoorOutdoor: Indoor
   - RainOk: ✓
   - WindSensitive: ☐
   - RequiresGoodVisibility: ☐
   - WeatherBoost: 1.0

2. For ALL outdoor activities:
   - WeatherSuitability: Perfect Sunny, Partly Cloudy
   - IdealTemp_Min: 65
   - IdealTemp_Max: 85
   - IndoorOutdoor: Outdoor
   - RainOk: ☐
   - WindSensitive: ☑
   - RequiresGoodVisibility: ☑
   - WeatherBoost: 1.0

3. Then refine individual activities

---

## 🧪 Testing Your Data

After updating, test with these scenarios:

**Scenario 1: Perfect sunny day (72°F, clear)**
- Should recommend: Beaches, outdoor dining, hiking
- Should NOT highly rank: Museums (unless boosted)

**Scenario 2: Rainy day (58°F, rain)**
- Should recommend: Museums, cafes, indoor entertainment
- Should NOT recommend: Beaches, outdoor activities

**Scenario 3: Foggy morning (62°F, low visibility)**
- Should recommend: Cozy cafes, indoor activities
- Should NOT recommend: Scenic drives, lighthouse visits

**Scenario 4: Hot day (88°F, sunny)**
- Should recommend: Swimming, AC venues, ice cream
- Should NOT highly rank: Hiking, non-AC outdoor activities

---

## ✅ Validation Checklist

Before you're done, verify:

- [ ] All activities have at least 1 WeatherSuitability option
- [ ] IdealTemp_Min is always ≤ IdealTemp_Max
- [ ] Indoor activities have wide temp ranges (0-150)
- [ ] Outdoor activities have realistic temp ranges
- [ ] WeatherBoost values are between 0.5 and 2.0
- [ ] Indoor activities have RainOk checked
- [ ] Outdoor scenic activities have RequiresGoodVisibility checked

---

## 📊 Expected Results

After this update:
- **Indoor activities**: Should score high on rainy/cold days
- **Outdoor activities**: Should score high on nice days
- **Mixed activities**: Should have moderate scores across conditions
- **Boosted activities**: Should rise to the top in their ideal conditions

---

## 💡 Pro Tips

1. **Be generous with WeatherSuitability**: Select all conditions where the activity is reasonably enjoyable

2. **Use WeatherBoost strategically**: 
   - 1.5-2.0: Perfect for this weather (ice cream on hot day)
   - 1.2-1.4: Extra appealing (museum on rainy day)
   - 1.0: Neutral
   - 0.7-0.9: Less appealing (beach on cold day)

3. **Temperature ranges**: 
   - Indoor: Very wide (0-150)
   - Outdoor active: 55-85
   - Beach/water: 70-90
   - Cold weather activities: 40-70

4. **Test as you go**: After updating 5-10 activities, test the recommendations to see if they make sense

---

## 🔄 How to Update Existing Activities

1. Open your Airtable base
2. Go to RainyActivities table
3. Click the ⊕ button to add a field (or click on existing field header)
4. Add each new field one by one
5. Fill in the data for each activity
6. Save!

The code will automatically start using these new fields once they exist in Airtable.

---

**Questions?** The system will work with partial data - missing fields will use sensible defaults.

**Ready to code?** Once you've added the fields (even if not all filled in), we can test the scoring system!

