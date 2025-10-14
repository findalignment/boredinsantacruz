// src/lib/tides/api.ts
import { format, parseISO } from 'date-fns';
import type { TideData, TidePrediction, NOAAResponse } from './types';
import { Logger } from '../logger';

const logger = new Logger('Tides');

/**
 * NOAA Tides & Currents API Client
 * Documentation: https://tidesandcurrents.noaa.gov/api/
 */
export class NOAATidesAPI {
  private readonly baseUrl = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
  private readonly station = '9413450'; // Santa Cruz, CA
  private readonly stationName = 'Santa Cruz, CA';

  /**
   * Get tide predictions for a specific date
   */
  async getTidePredictions(date: string): Promise<TideData> {
    const startTime = Date.now();
    
    try {
      // Format date for NOAA API (YYYYMMDD)
      const dateObj = parseISO(date);
      const formattedDate = format(dateObj, 'yyyyMMdd');

      const params = new URLSearchParams({
        station: this.station,
        product: 'predictions',
        datum: 'MLLW', // Mean Lower Low Water
        time_zone: 'lst_ldt', // Local time with DST
        units: 'english', // Feet
        format: 'json',
        begin_date: formattedDate,
        end_date: formattedDate,
        interval: 'hilo', // High/Low only (not hourly)
      });

      const url = `${this.baseUrl}?${params.toString()}`;
      
      logger.debug('Fetching tide predictions from NOAA', { date, station: this.station });

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`NOAA API error: ${response.status} ${response.statusText}`);
      }

      const data: NOAAResponse = await response.json();

      if (!data.predictions || data.predictions.length === 0) {
        throw new Error('No tide predictions available for this date');
      }

      // Transform NOAA format to our format
      const predictions: TidePrediction[] = data.predictions.map(p => ({
        time: this.parseNOAATime(p.t),
        height: parseFloat(p.v),
        type: p.type,
      }));

      const duration = Date.now() - startTime;
      logger.info('Tide predictions fetched successfully', { duration: `${duration}ms`, count: predictions.length });

      return {
        station: this.station,
        stationName: this.stationName,
        date,
        predictions,
      };
    } catch (error) {
      logger.error('Error fetching tide predictions', error, { date });
      throw error;
    }
  }

  /**
   * Parse NOAA time format to ISO string
   * "2025-10-14 06:15" => "2025-10-14T06:15:00"
   */
  private parseNOAATime(noaaTime: string): string {
    const [datePart, timePart] = noaaTime.split(' ');
    return `${datePart}T${timePart}:00`;
  }

  /**
   * Get multiple days of tide predictions
   */
  async getMultiDayPredictions(startDate: string, days: number): Promise<TideData[]> {
    const predictions: TideData[] = [];
    
    for (let i = 0; i < days; i++) {
      const dateObj = parseISO(startDate);
      dateObj.setDate(dateObj.getDate() + i);
      const date = format(dateObj, 'yyyy-MM-dd');
      
      try {
        const tidePrediction = await this.getTidePredictions(date);
        predictions.push(tidePrediction);
      } catch (error) {
        logger.error(`Failed to fetch tides for ${date}`, error);
        // Continue with other days even if one fails
      }
    }

    return predictions;
  }
}

// Export singleton instance
export const tideAPI = new NOAATidesAPI();

