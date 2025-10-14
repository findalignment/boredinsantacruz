import type { TideData } from '@/lib/tides/types';
import { format, parseISO } from 'date-fns';

interface TideDisplayProps {
  tideData: TideData;
  compact?: boolean;
}

export function TideDisplay({ tideData, compact = false }: TideDisplayProps) {
  const { predictions, currentStatus } = tideData;

  if (predictions.length === 0) {
    return null;
  }

  if (compact) {
    // Compact version for cards
    const lowestTide = predictions.reduce((min, p) => 
      p.height < min.height ? p : min
    );

    const time = format(parseISO(lowestTide.time), 'h:mm a');
    
    return (
      <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
        <span className="text-lg">🌊</span>
        <span className="font-medium">
          Low tide: {time} ({lowestTide.height.toFixed(1)} ft)
        </span>
      </div>
    );
  }

  // Full version
  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">🌊</span>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Today's Tides</h3>
          <p className="text-sm text-gray-600">{tideData.stationName}</p>
        </div>
      </div>

      <div className="space-y-3">
        {predictions.map((tide, index) => {
          const time = format(parseISO(tide.time), 'h:mm a');
          const isNext = currentStatus && tide.time === currentStatus.nextTide.time;
          
          return (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isNext 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/70 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${isNext ? '' : 'opacity-60'}`}>
                  {tide.type === 'H' ? '⬆️' : '⬇️'}
                </span>
                <div>
                  <div className={`font-semibold ${isNext ? 'text-white' : 'text-gray-900'}`}>
                    {tide.type === 'H' ? 'High' : 'Low'} Tide
                  </div>
                  <div className={`text-sm ${isNext ? 'text-blue-100' : 'text-gray-600'}`}>
                    {time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${isNext ? 'text-white' : 'text-gray-900'}`}>
                  {tide.height.toFixed(1)}
                </div>
                <div className={`text-xs ${isNext ? 'text-blue-100' : 'text-gray-500'}`}>
                  feet
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentStatus && (
        <div className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">
              Currently: {currentStatus.isRising ? '🔼 Rising' : '🔽 Falling'}
            </span>
            <span className="text-gray-600">
              • {currentStatus.nextTide.type === 'H' ? 'High' : 'Low'} tide in {Math.round(currentStatus.minutesUntilNext)} min
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

