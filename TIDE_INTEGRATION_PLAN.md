# 🌊 Tide Integration Plan

**Goal:** Add tide predictions to enhance beach activity recommendations

---

## 🎯 Why Tides Matter

Santa Cruz activities heavily dependent on tides:
- 🦀 **Tide Pools** - Best at low tide
- 🏄 **Surfing** - Varies by break (some prefer high, some low)
- 🚣 **Kayaking** - Easier at high tide
- 🏖️ **Beach Walks** - More beach at low tide
- 🎣 **Fishing** - Peak around tide changes
- 📸 **Photography** - Low tide reveals rocks, high tide = dramatic waves

---

## 🔧 Technical Approach

### Data Source: NOAA Tides & Currents API

**Why NOAA?**
- ✅ Free and unlimited
- ✅ Official US government data
- ✅ Highly accurate
- ✅ Covers Santa Cruz (Station 9413450)
- ✅ Provides predictions 30+ days out

**API Endpoint:**
```
https://api.tidesandcurrents.noaa.gov/api/prod/datagetter
```

**Santa Cruz Station ID:** `9413450` (Santa Cruz, CA)

### What We'll Get:

1. **Tide Predictions**
   - High/low tide times
   - Tide heights (in feet)
   - 7-day predictions (matches weather)

2. **Tide Status**
   - Current: Rising or Falling
   - Time to next high/low
   - Optimal windows for activities

3. **Additional Data** (optional)
   - Water temperature
   - Currents
   - Water level

---

## 📋 Implementation Steps

### Phase 1: Tide Data Layer (2 days)

#### 1. Create Tide Service
**File:** `src/lib/tides/api.ts`
- Fetch tide predictions from NOAA
- Parse XML/JSON response
- Calculate current tide status
- Cache predictions (24 hour TTL)

#### 2. Tide Types
**File:** `src/lib/tides/types.ts`
```typescript
interface TidePrediction {
  time: string;
  height: number; // feet
  type: 'H' | 'L'; // High or Low
}

interface TideData {
  station: string;
  date: string;
  predictions: TidePrediction[];
  currentStatus: {
    isRising: boolean;
    nextTide: TidePrediction;
    minutesUntilNext: number;
  };
}

interface TideConditions {
  bestForTidePools: boolean;
  bestForSurfing: boolean;
  bestForKayaking: boolean;
  optimalWindow?: {
    start: string;
    end: string;
    activity: string;
  };
}
```

#### 3. Environment Variables
Add to `.env.local`:
```bash
# No API key needed for NOAA!
TIDE_STATION_ID=9413450
```

---

### Phase 2: Activity Integration (2 days)

#### 1. Update Activity Schema
Add to Airtable:
- `TidePreference` (select: Low Tide, High Tide, Mid Tide, Any, Tide Change)
- `TideCritical` (checkbox: Is tide critical for this activity?)

#### 2. Update Scoring Algorithm
**File:** `src/lib/recommendations/scorer.ts`
- Add tide scoring to weather score
- Boost activities matching optimal tide
- Warn if tide is wrong

#### 3. Example Scoring:
```typescript
Tide Pools:
- Low tide (< 2ft): +20 points
- Rising tide: Warning "Tide coming in soon"
- High tide: -30 points + "Not recommended"

Surfing (beach-dependent):
- Steamer Lane: Best mid-high tide
- Pleasure Point: Best mid-low tide
- Consider swell + tide together
```

---

### Phase 3: UI Components (1 day)

#### 1. Tide Display Widget
**File:** `src/components/tides/tide-display.tsx`
```
┌─────────────────────────┐
│ 🌊 Today's Tides        │
│                         │
│ High: 6:15 AM (5.2 ft) │
│ Low:  12:30 PM (1.1 ft)│
│ High: 6:45 PM (4.8 ft) │
│                         │
│ Currently: 🔽 Falling   │
│ Low tide in 2h 15min    │
└─────────────────────────┘
```

#### 2. Tide Chart (Visual)
Simple visual chart showing tide curve for the day

#### 3. Activity Tide Badge
On activity cards:
```
🦀 Tide Pools
Weather Score: 95/100
🌊 Tide: Perfect (Low tide at 12:30 PM)
```

---

### Phase 4: Smart Recommendations (1 day)

#### 1. Tide-Aware Insights
```typescript
insights: [
  "🌊 Low tide at 12:30 PM - perfect for tide pools!",
  "Best window: 11:30 AM - 1:30 PM",
  "Natural Bridges has excellent tide pools"
]
```

#### 2. Optimal Time Suggestions
```typescript
"Visit Tide Pools at Natural Bridges between 11:30 AM - 1:30 PM"
"Steamer Lane surf: Best around 3:00 PM (mid tide + swell)"
```

#### 3. Combined Weather + Tide Scoring
```typescript
Score = (weatherScore * 0.7) + (tideScore * 0.3)

Example:
Tide Pools on sunny day at low tide:
- Weather: 90 (sunny, warm, no wind)
- Tide: 100 (low tide)
- Final: (90 * 0.7) + (100 * 0.3) = 93
```

---

## 🗺️ Santa Cruz Tide-Dependent Locations

### Tide Pools:
1. **Natural Bridges State Beach** ⭐ Best
   - Low tide required
   - Best: 0-2 ft
   - Rocky reef with lots to see

2. **Its Beach (Mitchell's Cove)**
   - Good tide pools
   - Less crowded

3. **Panther Beach**
   - Advanced (requires hiking)
   - Stunning at low tide

### Surfing (tide preferences vary):
1. **Steamer Lane** - Mid to high tide
2. **Pleasure Point** - Mid to low tide
3. **Cowell's Beach** - Any tide (beginner)
4. **The Hook** - Mid tide

### Kayaking:
- **Elkhorn Slough** - High tide (more water)
- **Harbor Launch** - Any tide

### Beach Activities:
- **More beach space** - Low tide
- **Fewer crowds at tide pools** - Mid-week low tide

---

## 📊 Example User Experiences

### Scenario 1: Planning Tide Pool Visit
```
User: Visits site on Wednesday
System: 
- Checks weather: Sunny, 68°F ✅
- Checks tides: Low tide 1:15 PM (0.8 ft) ✅
- Recommendation: 
  "⭐ PERFECT CONDITIONS for Natural Bridges Tide Pools!
   Visit between 12:00 PM - 2:30 PM
   Low tide at 1:15 PM (0.8 ft)
   Sunny & warm - bring sunscreen!"
```

### Scenario 2: Surfing Steamer Lane
```
User: Wants to surf tomorrow
System:
- Weather: Partly cloudy, light wind ✅
- Swell: 4-6 ft from NW ✅
- Tide: High 9:30 AM, Low 3:15 PM
- Recommendation:
  "Best surf window: 8:00 AM - 11:00 AM
   Mid-high tide with clean conditions
   Crowd level: Medium (weekday morning)"
```

### Scenario 3: Wrong Tide Warning
```
User: Looking at tide pools now (high tide)
System:
- Weather: Perfect ✅
- Tide: High tide 5.1 ft ❌
- Recommendation:
  "⚠️ NOT RECOMMENDED NOW
   Tide pools are underwater at high tide
   ⏰ COME BACK at 12:30 PM (low tide)
   Set a reminder?"
```

---

## 🎨 UI Integration Points

### 1. Homepage
Add tide widget next to weather:
```
┌──────────────────────────────────────┐
│ Today in Santa Cruz                  │
├──────────────────────────────────────┤
│ 🌤️ Sunny, 72°F                       │
│ 🌊 Low tide: 1:15 PM (0.9 ft)        │
│                                      │
│ Perfect for: Tide Pools, Beach Walk  │
└──────────────────────────────────────┘
```

### 2. Activity Cards
Show tide compatibility:
```
┌────────────────────────┐
│ 🦀 Natural Bridges     │
│ Tide Pools             │
│                        │
│ Weather: ⭐ 95/100     │
│ Tide: 🌊 Perfect       │
│                        │
│ 🕐 Best: 12-2 PM       │
└────────────────────────┘
```

### 3. Date Pages
Include tide chart for selected day

### 4. Weekly Forecast
Show tide info for each day:
```
Monday    Tuesday   Wednesday
☀️ 75°F   🌤️ 72°F   ☁️ 68°F
Low: 6am  Low: 7am  Low: 8am
High: 1pm High: 2pm High: 3pm
```

---

## 🧪 Testing

### Test Cases:
1. ✅ Fetch tide data for today
2. ✅ Fetch 7-day predictions
3. ✅ Calculate current tide status
4. ✅ Identify optimal windows
5. ✅ Score activities with tide preference
6. ✅ Handle API failures gracefully
7. ✅ Cache predictions properly

### Manual Testing:
1. Visit site during low tide - verify recommendations
2. Visit during high tide - verify warnings
3. Check 7-day forecast - verify tide times
4. Test tide-dependent activities show correct info

---

## 📦 Implementation Timeline

**Week 1:**
- Day 1-2: Tide API integration & caching
- Day 3-4: Activity schema updates & scoring
- Day 5-6: UI components

**Week 2:**
- Day 7: Smart recommendations & insights
- Day 8-9: Testing & refinement
- Day 10: Documentation & launch

**Total: ~2 weeks** (can be done alongside Sprint 4)

---

## 🚀 Future Enhancements

### Advanced Features:
1. **Tide Alerts** - "Low tide in 1 hour - perfect for tide pools!"
2. **Swell + Tide** - Combine with surf conditions
3. **Moon Phases** - Affects tide heights
4. **Historical Data** - "Best tide pools of the month"
5. **Live Conditions** - Real-time water level
6. **Multi-Location** - Different beaches have different conditions

### API Upgrades:
- Add Surfline API for surf-specific recommendations
- Water temperature data
- Beach cam integration
- Crowd predictions

---

## 💡 Quick Win: Tide Widget (4 hours)

Want to ship something fast? Start with just a tide display:

1. **Fetch NOAA data** (1 hour)
2. **Create simple widget** (2 hours)
3. **Add to homepage** (1 hour)

Users immediately see:
```
🌊 Today's Tides
High: 6:15 AM (5.2 ft)
Low: 12:30 PM (1.1 ft)
```

Then enhance with activity integration later!

---

## 🎯 Success Metrics

After tide integration:
- ✅ Tide data displays accurately
- ✅ Tide-dependent activities show optimal times
- ✅ Recommendations factor in tides
- ✅ Users can plan around tides
- ✅ No failed tide pool visits!

---

**Ready to add tides?** This will make your platform uniquely valuable for Santa Cruz locals and visitors!

*Created: October 14, 2025*
*Priority: High (Perfect for coastal activities)*

