// src/components/weather/weather-insights.tsx
'use client';

interface WeatherInsightsProps {
  insights: string[];
}

export function WeatherInsights({ insights }: WeatherInsightsProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl">💡</span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Today's Insights
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

