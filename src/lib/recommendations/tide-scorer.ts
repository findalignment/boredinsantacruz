// src/lib/recommendations/tide-scorer.ts

import { RainyActivity } from '@/types';
import type { TideData } from '@/lib/tides/types';
import { differenceInMinutes, parseISO } from 'date-fns';

/**
 * Score how well current tide conditions match an activity's requirements
 * Returns a score from 0-100, or null if tide data isn't available or relevant
 */
export function scoreTideConditions(
  activity: RainyActivity,
  tideData: TideData | null
): number | null {
  // If no tide preference, tide doesn't affect score
  if (!activity.tidePreference || activity.tidePreference === 'any-tide') {
    return null;
  }

  // If no tide data available, can't score
  if (!tideData || !tideData.predictions || tideData.predictions.length === 0) {
    return null;
  }

  const now = new Date();
  let score = 50; // Start neutral

  // Find next tide and current tide status
  const sortedPredictions = [...tideData.predictions].sort((a, b) => 
    new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const nextTide = sortedPredictions.find(p => new Date(p.time) > now);
  if (!nextTide) return null;

  const nextTideIndex = sortedPredictions.indexOf(nextTide);
  const lastTide = nextTideIndex > 0 ? sortedPredictions[nextTideIndex - 1] : null;
  
  if (!lastTide) return null;

  // Determine if tide is rising or falling
  const isRising = nextTide.type === 'H';
  const minutesUntilNext = differenceInMinutes(parseISO(nextTide.time), now);

  // Calculate current approximate tide height (linear interpolation)
  const totalMinutes = differenceInMinutes(parseISO(nextTide.time), parseISO(lastTide.time));
  const elapsedMinutes = differenceInMinutes(now, parseISO(lastTide.time));
  const progress = elapsedMinutes / totalMinutes;
  const currentHeight = lastTide.height + (nextTide.height - lastTide.height) * progress;

  // Score based on preference
  switch (activity.tidePreference) {
    case 'low-tide':
      // Best score when tide is very low (< 1.5 ft)
      if (currentHeight < 1.0) {
        score = 100;
      } else if (currentHeight < 1.5) {
        score = 85;
      } else if (currentHeight < 2.5) {
        score = 60;
      } else {
        score = 30;
      }
      
      // Bonus if low tide is coming soon (within 90 minutes)
      if (nextTide.type === 'L' && minutesUntilNext <= 90) {
        score = Math.min(100, score + 20);
      }
      break;

    case 'high-tide':
      // Best score when tide is very high (> 5 ft)
      if (currentHeight > 5.5) {
        score = 100;
      } else if (currentHeight > 5.0) {
        score = 85;
      } else if (currentHeight > 4.0) {
        score = 60;
      } else {
        score = 30;
      }
      
      // Bonus if high tide is coming soon
      if (nextTide.type === 'H' && minutesUntilNext <= 90) {
        score = Math.min(100, score + 20);
      }
      break;

    case 'mid-tide':
      // Best when tide is between 2.5-4.5 ft
      if (currentHeight >= 2.5 && currentHeight <= 4.5) {
        score = 90;
      } else if (currentHeight >= 2.0 && currentHeight <= 5.0) {
        score = 70;
      } else {
        score = 40;
      }
      break;

    case 'rising-tide':
      // Best during rising tide
      if (isRising) {
        // Better score when tide has more time to rise
        if (minutesUntilNext > 180) {
          score = 90;
        } else if (minutesUntilNext > 90) {
          score = 75;
        } else {
          score = 60; // Less ideal as high tide approaches
        }
      } else {
        score = 40; // Falling tide
      }
      break;

    case 'falling-tide':
      // Best during falling tide
      if (!isRising) {
        if (minutesUntilNext > 180) {
          score = 90;
        } else if (minutesUntilNext > 90) {
          score = 75;
        } else {
          score = 60;
        }
      } else {
        score = 40; // Rising tide
      }
      break;

    case 'tide-change':
      // Best near tide changes (within 30 minutes before or after)
      const minutesSinceChange = Math.abs(differenceInMinutes(now, parseISO(lastTide.time)));
      if (minutesUntilNext < 30 || minutesSinceChange < 30) {
        score = 95;
      } else if (minutesUntilNext < 60 || minutesSinceChange < 60) {
        score = 75;
      } else {
        score = 45;
      }
      break;
  }

  // Apply optimal tide height constraints if specified
  if (activity.optimalTideHeight) {
    const { min, max } = activity.optimalTideHeight;
    
    if (min !== undefined && currentHeight < min) {
      const diff = min - currentHeight;
      score = Math.max(0, score - (diff * 15)); // -15 points per foot below min
    }
    
    if (max !== undefined && currentHeight > max) {
      const diff = currentHeight - max;
      score = Math.max(0, score - (diff * 15)); // -15 points per foot above max
    }
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Get a human-readable tide recommendation for an activity
 */
export function getTideRecommendation(
  activity: RainyActivity,
  tideData: TideData | null
): string | null {
  if (!activity.tidePreference || activity.tidePreference === 'any-tide') {
    return null;
  }

  if (!tideData) {
    return null;
  }

  const score = scoreTideConditions(activity, tideData);
  if (score === null) return null;

  const sortedPredictions = [...tideData.predictions].sort((a, b) => 
    new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const now = new Date();
  const nextTide = sortedPredictions.find(p => new Date(p.time) > now);
  
  if (!nextTide) return null;

  const nextTideTime = parseISO(nextTide.time).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit' 
  });

  if (score >= 85) {
    return `🌊 Perfect tide conditions now! ${nextTide.type === 'H' ? 'High' : 'Low'} tide at ${nextTideTime}`;
  } else if (score >= 65) {
    return `🌊 Good tide conditions. ${nextTide.type === 'H' ? 'High' : 'Low'} tide at ${nextTideTime}`;
  } else if (score >= 40) {
    return `🌊 Tide OK, but not ideal. ${nextTide.type === 'H' ? 'High' : 'Low'} tide at ${nextTideTime}`;
  } else {
    return `⚠️ Not ideal tide timing. Best time: near ${nextTide.type === 'H' ? 'high' : 'low'} tide at ${nextTideTime}`;
  }
}

