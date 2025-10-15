// src/lib/tides/service.ts
import { parseISO, differenceInMinutes } from 'date-fns';
import { tideAPI } from './api';
import type { TideData, TideStatus, TideConditions, TidePrediction } from './types';
import { Logger } from '../logger';

const logger = new Logger('TideService');

/**
 * Tide Service - High-level tide operations
 */
export class TideService {
  /**
   * Get tide data for a specific date
   */
  async getTidesForDate(date: string): Promise<TideData> {
    try {
      const tideData = await tideAPI.getTidePredictions(date);
      
      // Add current status if it's today
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        tideData.currentStatus = this.calculateCurrentStatus(tideData.predictions);
      }

      return tideData;
    } catch (error) {
      logger.error('Error getting tides', error, { date });
      throw error;
    }
  }

  /**
   * Calculate current tide status
   */
  private calculateCurrentStatus(predictions: TidePrediction[]): TideStatus {
    const now = new Date();
    const sortedPredictions = [...predictions].sort((a, b) => 
      new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    // Find next tide
    const nextTide = sortedPredictions.find(p => new Date(p.time) > now);
    
    if (!nextTide) {
      // No more tides today
      return {
        isRising: false,
        nextTide: sortedPredictions[sortedPredictions.length - 1],
        minutesUntilNext: 0,
      };
    }

    // Find last tide
    const lastTideIndex = sortedPredictions.indexOf(nextTide) - 1;
    const lastTide = lastTideIndex >= 0 ? sortedPredictions[lastTideIndex] : undefined;

    // Determine if rising or falling
    let isRising = false;
    if (lastTide) {
      isRising = nextTide.type === 'H'; // Rising if next is high tide
    }

    const minutesUntilNext = differenceInMinutes(new Date(nextTide.time), now);

    return {
      isRising,
      nextTide,
      minutesUntilNext,
      lastTide,
    };
  }

  /**
   * Analyze tide conditions for activities
   */
  analyzeTideConditions(tideData: TideData): TideConditions {
    const predictions = tideData.predictions;
    
    // Find lowest tide of the day
    const lowestTide = predictions.reduce((min, p) => 
      p.height < min.height ? p : min
    );

    const highestTide = predictions.reduce((max, p) => 
      p.height > max.height ? p : max
    );

    // Determine tide level categories
    const avgTide = (highestTide.height + lowestTide.height) / 2;
    let tideLevel: TideConditions['tideLevel'];
    
    if (lowestTide.height < 0.5) tideLevel = 'very-low';
    else if (lowestTide.height < 1.5) tideLevel = 'low';
    else if (lowestTide.height < 3.0) tideLevel = 'mid';
    else if (lowestTide.height < 4.5) tideLevel = 'high';
    else tideLevel = 'very-high';

    // Analyze conditions
    const conditions: TideConditions = {
      bestForTidePools: lowestTide.height < 1.5, // Good when < 1.5 ft
      bestForSurfing: true, // Surfing is tide-dependent by break
      bestForKayaking: highestTide.height > 4.0, // Better at higher tides
      bestForBeachWalk: lowestTide.height < 2.0, // More beach at low tide
      tideLevel,
      warnings: [],
    };

    // Add optimal windows (only during daylight hours - 7am to 7pm)
    if (conditions.bestForTidePools) {
      const lowTideTime = new Date(lowestTide.time);
      const hour = lowTideTime.getHours();
      
      // Only recommend tide pooling during daylight hours (7am - 7pm)
      const isDaylight = hour >= 7 && hour < 19;
      
      if (isDaylight) {
        const startWindow = new Date(lowTideTime.getTime() - 90 * 60000); // 1.5 hrs before
        const endWindow = new Date(lowTideTime.getTime() + 90 * 60000); // 1.5 hrs after

        conditions.optimalWindow = {
          start: startWindow.toISOString(),
          end: endWindow.toISOString(),
          activity: 'Tide Pooling',
          reason: `Low tide at ${lowTideTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} (${lowestTide.height.toFixed(1)} ft)`,
        };
      } else {
        // Low tide is at night - not recommended for tide pooling
        conditions.bestForTidePools = false;
      }
    }

    // Add warnings
    if (tideData.currentStatus) {
      if (tideData.currentStatus.isRising && lowestTide.height < 2.0) {
        conditions.warnings?.push('Tide is rising - be aware of incoming water at tide pools');
      }
    }

    return conditions;
  }

  /**
   * Get tide summary for display
   */
  getTideSummary(tideData: TideData): string {
    const predictions = tideData.predictions;
    
    if (predictions.length === 0) {
      return 'No tide data available';
    }

    const lowestTide = predictions.reduce((min, p) => 
      p.height < min.height ? p : min
    );

    const time = new Date(lowestTide.time).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });

    if (lowestTide.height < 1.0) {
      return `🌊 Excellent! Low tide at ${time} (${lowestTide.height.toFixed(1)} ft) - perfect for tide pools!`;
    } else if (lowestTide.height < 2.0) {
      return `🌊 Good! Low tide at ${time} (${lowestTide.height.toFixed(1)} ft) - good for tide pools`;
    } else {
      return `🌊 Low tide at ${time} (${lowestTide.height.toFixed(1)} ft) - moderate tide`;
    }
  }

  /**
   * Check if current time is good for tide pooling
   */
  isGoodTimeForTidePools(tideData: TideData): boolean {
    if (!tideData.currentStatus) return false;

    const { nextTide, minutesUntilNext, isRising } = tideData.currentStatus;
    
    // Only recommend during daylight hours (7am - 7pm)
    const currentHour = new Date().getHours();
    const isDaylight = currentHour >= 7 && currentHour < 19;
    
    if (!isDaylight) return false;

    // Good if:
    // - Low tide is coming in next 90 minutes
    // - OR low tide was within last 90 minutes
    if (nextTide.type === 'L' && minutesUntilNext <= 90) {
      const nextTideTime = new Date(nextTide.time);
      const nextTideHour = nextTideTime.getHours();
      // Make sure the low tide itself is during daylight
      return nextTideHour >= 7 && nextTideHour < 19;
    }

    if (!isRising && nextTide.type === 'H' && minutesUntilNext >= 90) {
      // We just passed low tide - check if it was during daylight
      return true;
    }

    return false;
  }
}

// Export singleton
export const tideService = new TideService();

