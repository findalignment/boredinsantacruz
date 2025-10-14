import type { TideData, TideConditions } from '@/lib/tides/types';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface TidePoolAlertProps {
  tideData: TideData;
  conditions: TideConditions;
  isGoodForTidePools: boolean;
}

export function TidePoolAlert({ tideData, conditions, isGoodForTidePools }: TidePoolAlertProps) {
  const lowestTide = tideData.predictions.reduce((min, p) => 
    p.height < min.height ? p : min
  );

  const lowTideTime = format(parseISO(lowestTide.time), 'h:mm a');

  // Excellent conditions
  if (lowestTide.height < 1.0 && isGoodForTidePools) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-5xl">🦀</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              Perfect Time for Tide Pooling!
            </h3>
            <p className="text-emerald-50 mb-3">
              Exceptional low tide at <strong>{lowTideTime}</strong> ({lowestTide.height.toFixed(1)} ft).
              Best window: 90 minutes before and after low tide.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/activities?filter=tide-pools"
                className="px-4 py-2 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Find Tide Pool Spots →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Good conditions
  if (lowestTide.height < 1.5 && conditions.bestForTidePools) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-5xl">🌊</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              Great Day for Tide Pooling!
            </h3>
            <p className="text-blue-50 mb-3">
              Good low tide at <strong>{lowTideTime}</strong> ({lowestTide.height.toFixed(1)} ft).
              Visit 1-2 hours before or after for best viewing.
            </p>
            <Link 
              href="/activities?filter=tide-pools"
              className="inline-block px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Explore Tide Pools →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not ideal
  if (lowestTide.height >= 2.0) {
    return (
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-5xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              Not Great for Tide Pools Today
            </h3>
            <p className="text-orange-50 mb-3">
              Lowest tide is {lowestTide.height.toFixed(1)} ft at {lowTideTime} - 
              tide pools may be underwater. Try another day with lower tides!
            </p>
            <Link 
              href="/activities"
              className="inline-block px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              See Other Activities →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default - show tide info
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🌊</span>
        <h3 className="text-xl font-bold text-gray-900">Tide Information</h3>
      </div>
      <p className="text-gray-700">
        Low tide at <strong>{lowTideTime}</strong> ({lowestTide.height.toFixed(1)} ft)
      </p>
    </div>
  );
}

