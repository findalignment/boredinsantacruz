import { Suspense } from 'react';
import Link from 'next/link';
import { getCurrentWeather, getWeatherConditions, getWeatherSummary } from '@/lib/weather';
import { getWeeklyForecast } from '@/app/actions/getForecast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather System Test - Bored in Santa Cruz',
  description: 'Technical showcase of the weather intelligence system powering activity recommendations.',
};

async function WeatherSystemDemo() {
  try {
    const weather = await getCurrentWeather();
    const conditions = getWeatherConditions(weather);
    const summary = getWeatherSummary(weather);
    const forecast = await getWeeklyForecast();

    return (
      <div className="space-y-8">
        {/* Current Weather */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Current Weather Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DataCard label="Temperature" value={`${Math.round(weather.temp)}°F`} />
            <DataCard label="Feels Like" value={`${Math.round(weather.feelsLike)}°F`} />
            <DataCard label="Condition" value={weather.condition} />
            <DataCard label="Description" value={weather.description} />
            <DataCard label="Humidity" value={`${weather.humidity}%`} />
            <DataCard label="Wind Speed" value={`${Math.round(weather.windSpeed)} mph`} />
            <DataCard label="Precipitation" value={`${weather.precipitation.toFixed(2)} in`} />
            <DataCard label="Visibility" value={`${weather.visibility.toFixed(1)} mi`} />
            <DataCard label="Cloud Cover" value={`${weather.cloudCover}%`} />
          </div>
        </section>

        {/* Weather Classification */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🧠 AI Weather Classification</h2>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{conditions.emoji}</div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{conditions.displayName}</div>
                <div className="text-gray-600 mt-1">{conditions.description}</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-2">Weather Summary:</div>
              <div className="text-gray-700">{summary}</div>
            </div>
            <div className="mt-4">
              <div className="font-semibold text-gray-900 mb-2">Suitable Activities:</div>
              <div className="flex flex-wrap gap-2">
                {conditions.suitableActivities.map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Raw Data */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Technical Details</h2>
          <details className="cursor-pointer">
            <summary className="font-semibold text-gray-700 hover:text-gray-900">
              View Raw Weather Object (Click to expand)
            </summary>
            <pre className="mt-4 p-4 bg-gray-50 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(weather, null, 2)}
            </pre>
          </details>
        </section>

        {/* Forecast Data */}
        {forecast.success && forecast.data.length > 0 && (
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📅 7-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forecast.data.map(({ date, weather: dayWeather, conditions: dayConditions }) => (
                <div key={date} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    <div className="text-3xl">{dayConditions.emoji}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{Math.round(dayWeather.temp)}°F</div>
                  <div className="text-sm text-gray-600 mt-1">{dayConditions.displayName}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    High: {Math.round(dayWeather.tempMax)}° / Low: {Math.round(dayWeather.tempMin)}°
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* System Info */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ System Status</h2>
          <div className="space-y-2">
            <StatusRow label="Weather API" status="Connected" color="green" />
            <StatusRow label="Data Freshness" status={`Updated ${new Date(weather.lastUpdated).toLocaleTimeString()}`} color="green" />
            <StatusRow label="Caching" status="Active (Vercel KV)" color="yellow" info="Falls back to API if unavailable" />
            <StatusRow label="Location" status="Santa Cruz, CA (36.9741, -122.0308)" color="green" />
            <StatusRow label="Data Source" status="OpenWeather API" color="green" />
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 How Weather Intelligence Works</h2>
          <div className="prose prose-blue max-w-none">
            <ol className="space-y-3">
              <li>
                <strong>Fetch Real-Time Data</strong> - We pull current weather from OpenWeather API every 30 minutes
              </li>
              <li>
                <strong>Categorize Conditions</strong> - Our AI categorizes weather into 12 nuanced types (perfect sunny, rainy, foggy, etc.)
              </li>
              <li>
                <strong>Score Activities</strong> - Each activity gets a 0-100 score based on how well it matches current conditions
              </li>
              <li>
                <strong>Generate Recommendations</strong> - We rank activities into 5 tiers from "Perfect" to "Not Recommended"
              </li>
              <li>
                <strong>Provide Insights</strong> - Smart suggestions like "Perfect day for beach activities!" or "Stay indoors today"
              </li>
            </ol>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-900 mb-2">❌ Error Loading Weather Data</h2>
        <p className="text-red-700">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}

function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

function StatusRow({ 
  label, 
  status, 
  color,
  info 
}: { 
  label: string; 
  status: string; 
  color: 'green' | 'yellow' | 'red';
  info?: string;
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
          {status}
        </span>
        {info && (
          <span className="text-xs text-gray-500" title={info}>ℹ️</span>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="h-48 bg-gray-200 rounded-lg"></div>
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export default function WeatherTestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🌤️ Weather Intelligence System
            </h1>
            <p className="text-gray-600 text-lg">
              Technical showcase of the weather data powering smart activity recommendations
            </p>
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          <WeatherSystemDemo />
        </Suspense>

        {/* Footer Links */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Try It Out:</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Today's Recommendations
            </Link>
            <Link href="/activities" className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50">
              Browse All Activities
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

