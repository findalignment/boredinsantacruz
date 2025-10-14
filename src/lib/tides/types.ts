// src/lib/tides/types.ts

/**
 * Single tide prediction (high or low)
 */
export interface TidePrediction {
  time: string; // ISO timestamp
  height: number; // feet
  type: 'H' | 'L'; // High or Low
}

/**
 * Tide data for a specific date
 */
export interface TideData {
  station: string;
  stationName: string;
  date: string; // YYYY-MM-DD
  predictions: TidePrediction[];
  currentStatus?: TideStatus;
}

/**
 * Current tide status (calculated)
 */
export interface TideStatus {
  isRising: boolean; // Rising or falling
  currentHeight?: number; // Estimated current height in feet
  nextTide: TidePrediction;
  minutesUntilNext: number;
  lastTide?: TidePrediction;
}

/**
 * Tide conditions analysis for activities
 */
export interface TideConditions {
  // Best timing
  bestForTidePools: boolean;
  bestForSurfing: boolean;
  bestForKayaking: boolean;
  bestForBeachWalk: boolean;
  
  // Optimal windows
  optimalWindow?: {
    start: string; // ISO timestamp
    end: string; // ISO timestamp
    activity: string;
    reason: string;
  };
  
  // Current tide level
  tideLevel: 'very-low' | 'low' | 'mid' | 'high' | 'very-high';
  
  // Warnings
  warnings?: string[];
}

/**
 * NOAA API Response
 */
export interface NOAAResponse {
  predictions: Array<{
    t: string; // "2025-10-14 06:15"
    v: string; // "5.23"
    type: 'H' | 'L';
  }>;
}

/**
 * Tide preferences for activities
 */
export type TidePreference = 
  | 'low-tide'      // Needs low tide (tide pools)
  | 'high-tide'     // Needs high tide (kayaking)
  | 'mid-tide'      // Prefers mid tide (some surf breaks)
  | 'rising-tide'   // Good on rising tide
  | 'falling-tide'  // Good on falling tide
  | 'tide-change'   // Best at tide changes (fishing)
  | 'any-tide';     // Doesn't matter

/**
 * Activity with tide requirements
 */
export interface TideAwareActivity {
  tidePreference?: TidePreference;
  tideCritical?: boolean; // Is tide timing critical?
  optimalTideHeight?: {
    min?: number; // Minimum height in feet
    max?: number; // Maximum height in feet
  };
}

/**
 * Tide scoring result
 */
export interface TideScore {
  score: number; // 0-100
  reason: string;
  warning?: string;
  optimalTime?: string; // When to go for best conditions
}

