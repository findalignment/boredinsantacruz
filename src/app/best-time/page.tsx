import { Metadata } from 'next';
import {
  MONTHLY_DATA,
  VISITOR_TYPES,
  getBestMonths,
  getTopMonthsForVisitor,
  getCurrentMonthData,
  getMonthInsights,
} from '@/lib/weather/best-time';

export const metadata: Metadata = {
  title: 'Best Time to Visit Santa Cruz',
  description:
    'Plan your perfect Santa Cruz trip! See month-by-month weather, crowd levels, and personalized recommendations for when to visit.',
  keywords: [
    'best time to visit Santa Cruz',
    'Santa Cruz weather by month',
    'when to visit Santa Cruz',
    'Santa Cruz travel guide',
    'Santa Cruz seasons',
  ],
};

export default function BestTimePage() {
  const bestMonths = getBestMonths(3);
  const currentMonth = getCurrentMonthData();
  const currentInsights = getMonthInsights(currentMonth.monthNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🗓️ Best Time to Visit Santa Cruz
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Plan your perfect trip with month-by-month weather insights, crowd levels, and
            personalized recommendations
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-green-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ✨ Quick Answer: Best Overall Months
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {bestMonths.map((month, index) => (
                <div
                  key={month.month}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{month.month}</h3>
                    <div className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <span>🌡️</span>
                      <span>
                        {month.avgHighTemp}°F / {month.avgLowTemp}°F
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>☀️</span>
                      <span>{month.avgSunnyDays} sunny days</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>👥</span>
                      <span>Crowds: {month.crowdLevel}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {month.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs bg-white px-2 py-1 rounded-full text-gray-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-center">
              💡 <strong>Pro tip:</strong> September and October offer the warmest, driest weather
              with fewer crowds than summer!
            </p>
          </div>
        </div>
      </section>

      {/* Current Month */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-4">📅 Visiting This Month? ({currentMonth.month})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Weather Expect</h3>
                <ul className="space-y-2">
                  <li>🌡️ Temps: {currentMonth.avgHighTemp}°F - {currentMonth.avgLowTemp}°F</li>
                  <li>☀️ {currentMonth.avgSunnyDays} sunny days expected</li>
                  <li>🌧️ {currentMonth.avgRainDays} rainy days possible</li>
                  <li>👥 Crowd level: {currentMonth.crowdLevel}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Insights & Tips</h3>
                <ul className="space-y-2">
                  {currentInsights.map((insight, i) => (
                    <li key={i}>✓ {insight}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Don't Miss:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMonth.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Types */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            🎯 Best Months By Travel Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISITOR_TYPES.map((type) => {
              const topMonths = getTopMonthsForVisitor(type, 3);
              return (
                <div key={type.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-5xl mb-3 text-center">{type.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {topMonths.map((month, i) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">
                          {i + 1}. {month.month}
                        </span>
                        <span className="text-sm text-gray-500">{month.crowdLevel} crowds</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monthly Calendar */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            📊 Month-by-Month Breakdown
          </h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Month
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Temps
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Rain Days
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Crowds
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Highlights
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {MONTHLY_DATA.map((month) => (
                    <tr key={month.month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {month.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {month.avgHighTemp}° / {month.avgLowTemp}°
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {month.avgRainDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            month.crowdLevel === 'Low'
                              ? 'bg-green-100 text-green-800'
                              : month.crowdLevel === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : month.crowdLevel === 'High'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {month.crowdLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${month.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{month.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {month.highlights.slice(0, 2).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Insider Tips</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Best value:</strong> Visit in Nov-Feb for lower accommodation prices and
                peaceful vibes
              </li>
              <li>
                <strong>Best weather:</strong> Sep-Oct offers warmest temps and least rain
              </li>
              <li>
                <strong>Avoid crowds:</strong> Skip July-Aug when UC students are gone but tourists
                are peak
              </li>
              <li>
                <strong>Whale watching:</strong> Jan-Mar for gray whales, Apr-Nov for humpbacks
              </li>
              <li>
                <strong>Morning fog:</strong> Expect "June Gloom" coastal fog in early summer - it
                burns off by noon
              </li>
              <li>
                <strong>Pack layers:</strong> Santa Cruz can be 15°F cooler at the coast than
                inland, even in summer
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

