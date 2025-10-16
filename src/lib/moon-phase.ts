/**
 * Calculate moon phase and get moon emoji
 * Based on astronomical calculations
 */

export interface MoonPhaseData {
  phase: number; // 0-1 where 0/1 = new moon, 0.5 = full moon
  phaseName: string;
  emoji: string;
  illumination: number; // percentage
}

/**
 * Calculate the moon phase for a given date
 * Returns a value between 0 and 1
 * 0/1 = New Moon, 0.25 = First Quarter, 0.5 = Full Moon, 0.75 = Last Quarter
 */
export function calculateMoonPhase(date: Date = new Date()): number {
  // Known new moon reference date: January 6, 2000, 18:14 UTC
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodicMonth = 29.530588853; // Days in a lunar cycle

  // Calculate days since known new moon
  const daysSinceNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate current phase (0-1)
  const phase = (daysSinceNew % synodicMonth) / synodicMonth;
  
  return phase;
}

/**
 * Get moon phase data including name and emoji
 */
export function getMoonPhaseData(date: Date = new Date()): MoonPhaseData {
  const phase = calculateMoonPhase(date);
  
  let phaseName: string;
  let emoji: string;
  
  // Determine phase name and emoji
  if (phase < 0.0625 || phase >= 0.9375) {
    phaseName = 'New Moon';
    emoji = '🌑';
  } else if (phase < 0.1875) {
    phaseName = 'Waxing Crescent';
    emoji = '🌒';
  } else if (phase < 0.3125) {
    phaseName = 'First Quarter';
    emoji = '🌓';
  } else if (phase < 0.4375) {
    phaseName = 'Waxing Gibbous';
    emoji = '🌔';
  } else if (phase < 0.5625) {
    phaseName = 'Full Moon';
    emoji = '🌕';
  } else if (phase < 0.6875) {
    phaseName = 'Waning Gibbous';
    emoji = '🌖';
  } else if (phase < 0.8125) {
    phaseName = 'Last Quarter';
    emoji = '🌗';
  } else {
    phaseName = 'Waning Crescent';
    emoji = '🌘';
  }
  
  // Calculate illumination percentage
  const illumination = Math.round(
    (1 - Math.abs((phase - 0.5) * 2)) * 100
  );
  
  return {
    phase,
    phaseName,
    emoji,
    illumination,
  };
}

/**
 * Format time from Unix timestamp to human-readable format
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  });
}

