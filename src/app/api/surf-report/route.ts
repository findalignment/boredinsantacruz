import { NextResponse } from 'next/server';

/**
 * Surf Report API
 * 
 * Note: This is a simplified version. For production, integrate with:
 * - Surfline API (surfline.com/api) - requires subscription
 * - NOAA Buoy Data (free but technical)
 * - Spitcast API (free but limited)
 * - World Weather Online Marine API
 */

interface SurfSpot {
  name: string;
  conditions: string;
  waveHeight: string;
  period: string;
  wind: string;
  tide: string;
  rating: number; // 1-5
  crowdLevel: string;
  bestFor: string[];
  currentConditions: string;
}

// Mock surf report data
// In production, this would fetch from Surfline, NOAA, or other surf APIs
function generateSurfReport(): SurfSpot[] {
  const now = new Date();
  const hour = now.getHours();
  
  // Simplified wave/wind patterns based on time of day
  const morningWinds = hour < 12;
  const afternoon = hour >= 12 && hour < 18;
  
  return [
    {
      name: 'Steamer Lane',
      conditions: morningWinds ? 'Clean' : 'Choppy',
      waveHeight: '3-5 ft',
      period: '14 seconds',
      wind: morningWinds ? 'Light offshore' : 'Onshore 10-15 mph',
      tide: getTideStatus(),
      rating: morningWinds ? 4 : 3,
      crowdLevel: 'Crowded',
      bestFor: ['Advanced', 'Intermediate'],
      currentConditions: morningWinds 
        ? 'Good morning conditions with clean faces' 
        : 'Afternoon winds affecting shape',
    },
    {
      name: 'Pleasure Point (The Hook)',
      conditions: 'Good',
      waveHeight: '2-4 ft',
      period: '12 seconds',
      wind: afternoon ? 'NW 8-12 mph' : 'Light',
      tide: getTideStatus(),
      rating: 4,
      crowdLevel: 'Very Crowded',
      bestFor: ['All Levels', 'Longboard'],
      currentConditions: 'Consistent waves, great for longboarders',
    },
    {
      name: 'Cowells Beach',
      conditions: 'Fair',
      waveHeight: '1-3 ft',
      period: '10 seconds',
      wind: 'Light variable',
      tide: getTideStatus(),
      rating: 3,
      crowdLevel: 'Moderate',
      bestFor: ['Beginners', 'Longboard'],
      currentConditions: 'Mellow waves, perfect for learning',
    },
    {
      name: 'Manresa State Beach',
      conditions: morningWinds ? 'Good' : 'Fair',
      waveHeight: '3-6 ft',
      period: '13 seconds',
      wind: morningWinds ? 'Offshore 5-10 mph' : 'Side-shore',
      tide: getTideStatus(),
      rating: morningWinds ? 4 : 3,
      crowdLevel: 'Less Crowded',
      bestFor: ['Intermediate', 'Advanced'],
      currentConditions: 'Powerful beach break, rips possible',
    },
    {
      name: '26th Avenue (Pleasure Point)',
      conditions: 'Good',
      waveHeight: '2-4 ft',
      period: '11 seconds',
      wind: 'Light NW',
      tide: getTideStatus(),
      rating: 4,
      crowdLevel: 'Crowded',
      bestFor: ['Intermediate', 'Shortboard'],
      currentConditions: 'Fun right point break',
    },
    {
      name: 'Four Mile Beach',
      conditions: morningWinds ? 'Excellent' : 'Good',
      waveHeight: '4-6 ft',
      period: '15 seconds',
      wind: morningWinds ? 'Light offshore' : 'NW 10-15 mph',
      tide: getTideStatus(),
      rating: morningWinds ? 5 : 4,
      crowdLevel: 'Moderate',
      bestFor: ['Advanced', 'Big Wave'],
      currentConditions: 'Heavy beach break, experienced surfers only',
    },
  ];
}

function getTideStatus(): string {
  const hour = new Date().getHours();
  
  // Simplified tide cycle (real data would come from NOAA)
  if (hour < 6) return 'Low → Rising';
  if (hour < 12) return 'High → Falling';
  if (hour < 18) return 'Low → Rising';
  return 'High → Falling';
}

export async function GET() {
  try {
    const surfReport = generateSurfReport();
    
    // Add overall conditions summary
    const avgRating = surfReport.reduce((sum, spot) => sum + spot.rating, 0) / surfReport.length;
    const summary = {
      overallRating: Math.round(avgRating * 10) / 10,
      bestSpots: surfReport
        .filter(s => s.rating >= 4)
        .map(s => s.name),
      conditions: avgRating >= 4 
        ? 'Great surf conditions today!' 
        : avgRating >= 3 
        ? 'Fair to good surf conditions' 
        : 'Challenging conditions',
      lastUpdated: new Date().toISOString(),
      updateInterval: '15 minutes',
      note: 'For live cams and detailed forecasts, visit Surfline.com or Spitcast.com',
    };
    
    return NextResponse.json({
      success: true,
      summary,
      spots: surfReport,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800', // Cache for 15 min
      },
    });
    
  } catch (error) {
    console.error('[Surf Report Error]:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch surf report',
    }, {
      status: 500,
    });
  }
}

