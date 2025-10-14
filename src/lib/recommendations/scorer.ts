// src/lib/recommendations/scorer.ts

import { RainyActivity, ScoredActivity } from '@/types';
import { WeatherData, WeatherCategory, categorizeWeather } from '@/lib/weather';

/**
 * Score how well an activity matches the given weather conditions
 * Returns a score from 0-100
 */
export function scoreActivity(
  activity: RainyActivity,
  weather: WeatherData
): number {
  let score = 100; // Start with perfect score

  const category = categorizeWeather(weather);
  const {
    temp,
    precipitation,
    windSpeed,
    visibility,
    cloudCover,
  } = weather;

  // 1. Weather Suitability Match (40 points)
  if (activity.weatherSuitability && activity.weatherSuitability.length > 0) {
    const categoryMatch = activity.weatherSuitability.some(suitable =>
      suitable.toLowerCase().replace(/\s+/g, '_') === category ||
      suitable.toLowerCase().includes(category.replace(/_/g, ' '))
    );
    
    if (categoryMatch) {
      score += 40; // Bonus for perfect category match
    } else {
      score -= 20; // Penalty for category mismatch
    }
  }

  // 2. Temperature Match (25 points)
  const minTemp = activity.idealTempMin ?? 0;
  const maxTemp = activity.idealTempMax ?? 150;
  
  if (temp < minTemp) {
    const tempDiff = minTemp - temp;
    score -= Math.min(25, tempDiff * 2); // -2 points per degree below min
  } else if (temp > maxTemp) {
    const tempDiff = temp - maxTemp;
    score -= Math.min(25, tempDiff * 1.5); // -1.5 points per degree above max
  } else {
    // Within ideal range - bonus!
    score += 15;
  }

  // 3. Indoor/Outdoor Appropriateness (20 points)
  const indoorOutdoor = activity.indoorOutdoor || 'Mixed';
  
  if (precipitation > 0.05) {
    // It's raining
    if (indoorOutdoor === 'Indoor') {
      score += 20; // Perfect for indoor
    } else if (indoorOutdoor === 'Covered') {
      score += 10; // Covered is OK
    } else if (indoorOutdoor === 'Mixed') {
      score -= 5; // Mixed is manageable
    } else {
      // Outdoor
      if (activity.rainOk) {
        score -= 10; // Light penalty if rain OK
      } else {
        score -= 30; // Heavy penalty for outdoor in rain
      }
    }
  } else if (cloudCover < 30) {
    // Clear skies
    if (indoorOutdoor === 'Outdoor') {
      score += 20; // Perfect for outdoor
    } else if (indoorOutdoor === 'Mixed') {
      score += 10; // Mixed is great
    }
  }

  // 4. Wind Sensitivity (10 points)
  if (activity.windSensitive && windSpeed > 20) {
    score -= 25; // Significant penalty for wind-sensitive activities
  } else if (activity.windSensitive && windSpeed > 15) {
    score -= 10; // Minor penalty
  }

  // 5. Visibility Requirements (10 points)
  if (activity.requiresGoodVisibility) {
    if (visibility < 3) {
      score -= 30; // Heavy penalty for low visibility
    } else if (visibility < 5) {
      score -= 15; // Moderate penalty
    } else if (visibility > 8) {
      score += 10; // Bonus for great visibility
    }
  }

  // 6. Precipitation  (already handled above, but additional checks)
  if (precipitation > 0.2) {
    // Heavy rain
    if (indoorOutdoor === 'Outdoor' && !activity.rainOk) {
      score -= 20; // Extra penalty
    }
  }

  // 7. Apply Weather Boost Multiplier
  const boost = activity.weatherBoost ?? 1.0;
  score = score * boost;

  // 8. Special conditions bonuses
  
  // Cozy activities bonus on cold/rainy days
  const cozyTags = ['cafe', 'coffee', 'cozy', 'indoor', 'museum'];
  const hasCozyTag = activity.tags?.some(tag => 
    cozyTags.some(cozy => tag.toLowerCase().includes(cozy))
  );
  
  if (hasCozyTag && (temp < 60 || precipitation > 0.05)) {
    score += 10; // Cozy bonus
  }

  // Beach/water activities bonus on hot days
  const waterTags = ['beach', 'swimming', 'water', 'surf'];
  const hasWaterTag = activity.tags?.some(tag =>
    waterTags.some(water => tag.toLowerCase().includes(water))
  );
  
  if (hasWaterTag && temp > 75) {
    score += 15; // Hot day water activity bonus
  }

  // Hiking/active outdoor bonus on perfect days
  const activeTags = ['hiking', 'walking', 'biking', 'outdoor'];
  const hasActiveTag = activity.tags?.some(tag =>
    activeTags.some(active => tag.toLowerCase().includes(active))
  );
  
  if (hasActiveTag && temp >= 60 && temp <= 75 && precipitation === 0 && cloudCover < 50) {
    score += 15; // Perfect day for active outdoor
  }

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Score an activity and add match reason and warnings
 */
export function scoreActivityWithContext(
  activity: RainyActivity,
  weather: WeatherData
): ScoredActivity {
  const score = scoreActivity(activity, weather);
  const category = categorizeWeather(weather);
  
  // Generate match reason
  let matchReason = '';
  let weatherWarning = '';

  if (score >= 90) {
    matchReason = 'Perfect for today\'s weather!';
  } else if (score >= 75) {
    matchReason = 'Great choice for these conditions';
  } else if (score >= 60) {
    matchReason = 'Good option today';
  } else if (score >= 40) {
    matchReason = 'Acceptable, but not ideal';
  } else {
    matchReason = 'Weather may not be ideal';
  }

  // Add specific weather warnings
  if (weather.precipitation > 0.1 && activity.indoorOutdoor === 'Outdoor' && !activity.rainOk) {
    weatherWarning = '⚠️ Outdoor activity - expect rain';
  } else if (weather.windSpeed > 20 && activity.windSensitive) {
    weatherWarning = '💨 May be affected by high winds';
  } else if (weather.visibility < 3 && activity.requiresGoodVisibility) {
    weatherWarning = '🌫️ Visibility may be limited';
  } else if (weather.temp < (activity.idealTempMin || 0)) {
    weatherWarning = `🥶 Colder than ideal (${weather.temp}°F)`;
  } else if (weather.temp > (activity.idealTempMax || 150)) {
    weatherWarning = `🥵 Hotter than ideal (${weather.temp}°F)`;
  }

  return {
    ...activity,
    weatherScore: score,
    matchReason,
    weatherWarning: weatherWarning || undefined,
  };
}

/**
 * Batch score multiple activities
 */
export function scoreActivities(
  activities: RainyActivity[],
  weather: WeatherData
): ScoredActivity[] {
  return activities
    .map(activity => scoreActivityWithContext(activity, weather))
    .sort((a, b) => b.weatherScore - a.weatherScore); // Sort by score descending
}

