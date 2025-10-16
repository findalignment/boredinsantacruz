'use client';

import { useState, useEffect } from 'react';

interface SurfSpot {
  name: string;
  conditions: string;
  waveHeight: string;
  period: string;
  wind: string;
  tide: string;
  rating: number;
  crowdLevel: string;
  bestFor: string[];
  currentConditions: string;
}

interface SurfReportData {
  summary: {
    overallRating: number;
    bestSpots: string[];
    conditions: string;
    lastUpdated: string;
    note: string;
  };
  spots: SurfSpot[];
}

export function SurfReportWidget() {
  const [data, setData] = useState<SurfReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurfReport() {
      try {
        const res = await fetch('/api/surf-report');
        const json = await res.json();
        
        if (json.success) {
          setData(json);
          setError(null);
        } else {
          setError('Unable to load surf report');
        }
      } catch (err) {
        setError('Failed to fetch surf report');
      } finally {
        setLoading(false);
      }
    }

    fetchSurfReport();
    
    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchSurfReport, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-1/2"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">🏄 Surf Report Unavailable</h3>
        <p>Check Surfline.com or Spitcast.com for live conditions</p>
      </div>
    );
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-300';
    if (rating >= 3) return 'text-yellow-300';
    return 'text-orange-300';
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className="space-y-6">
      {/* Overall Conditions */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-bold flex items-center gap-2">
            🏄 Live Surf Report
          </h3>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getRatingColor(data.summary.overallRating)}`}>
              {getRatingStars(data.summary.overallRating)}
            </div>
            <div className="text-sm opacity-90">Overall Rating</div>
          </div>
        </div>
        
        <p className="text-xl mb-4">{data.summary.conditions}</p>
        
        {data.summary.bestSpots.length > 0 && (
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <p className="font-semibold mb-2">🌊 Best Spots Right Now:</p>
            <p>{data.summary.bestSpots.join(', ')}</p>
          </div>
        )}
        
        <p className="text-sm opacity-75">
          Last updated: {new Date(data.summary.lastUpdated).toLocaleTimeString()} • 
          Updates every 15 minutes
        </p>
        <p className="text-xs opacity-60 mt-2">{data.summary.note}</p>
      </div>

      {/* Individual Spot Reports */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.spots.map((spot, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border-2 border-cyan-200 p-6 hover:border-cyan-400 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-gray-900">{spot.name}</h4>
              <span className={`text-2xl ${getRatingColor(spot.rating)}`}>
                {getRatingStars(spot.rating)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conditions:</span>
                <span className="font-semibold text-gray-900">{spot.conditions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wave Height:</span>
                <span className="font-semibold text-gray-900">{spot.waveHeight}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Period:</span>
                <span className="font-semibold text-gray-900">{spot.period}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wind:</span>
                <span className="font-semibold text-gray-900">{spot.wind}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tide:</span>
                <span className="font-semibold text-gray-900">{spot.tide}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Crowd:</span>
                <span className="font-semibold text-gray-900">{spot.crowdLevel}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">{spot.currentConditions}</p>

            <div className="flex flex-wrap gap-2">
              {spot.bestFor.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-3">📱 More Detailed Forecasts:</h4>
        <div className="grid md:grid-cols-3 gap-3">
          <a
            href="https://www.surfline.com/surf-report/steamer-lane/5842041f4e65fad6a7708890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 transition-colors text-center font-medium text-gray-900"
          >
            Surfline.com →
          </a>
          <a
            href="http://www.spitcast.com/spots/steamer-lane-santa-cruz/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 transition-colors text-center font-medium text-gray-900"
          >
            Spitcast.com →
          </a>
          <a
            href="https://www.ndbc.noaa.gov/station_page.php?station=46042"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-cyan-500 transition-colors text-center font-medium text-gray-900"
          >
            NOAA Buoy Data →
          </a>
        </div>
      </div>
    </div>
  );
}

