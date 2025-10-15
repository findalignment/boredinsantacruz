import { Suspense } from 'react';
import Link from 'next/link';
import { format, parse, isValid, startOfDay, isAfter, addDays } from 'date-fns';
import { notFound } from 'next/navigation';
import { getRecommendationsForDate } from '@/app/actions/getRecommendations';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { WeatherDisplay } from '@/components/weather/weather-display';
import { WeatherInsights } from '@/components/weather/weather-insights';
import { DatePicker } from '@/components/date-picker';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    date: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Validate date format and ensure it's within forecast range
function validateDate(dateString: string): Date | null {
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    
    if (!isValid(date)) {
      return null;
    }

    const today = startOfDay(new Date());
    const maxDate = addDays(today, 6); // 7-day forecast

    // Date must be today or within next 6 days
    if (isAfter(date, maxDate)) {
      return null;
    }

    return date;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date: dateString } = await params;
  const date = validateDate(dateString);
  
  if (!date) {
    return {
      title: 'Invalid Date - Bored in Santa Cruz',
    };
  }

  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  
  return {
    title: `Activities for ${formattedDate} - Bored in Santa Cruz`,
    description: `Discover the best weather-aware activities in Santa Cruz for ${formattedDate}. Get personalized recommendations based on real-time weather forecasts.`,
  };
}

async function DateActivities({ dateString }: { dateString: string }) {
  const result = await getRecommendationsForDate(dateString);

  if (!result.success || !result.data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">Unable to load activities</p>
        <p className="text-gray-600 text-sm mt-2">{result.error || 'Please try again later'}</p>
      </div>
    );
  }

  const { weather, weatherSummary, insights, tiers, totalActivities } = result.data;
  const date = parse(dateString, 'yyyy-MM-dd', new Date());

  return (
    <>
      {/* Weather Info */}
      <div className="mb-8 space-y-6">
        <WeatherDisplay weather={weather} summary={weatherSummary} />
        {insights.length > 0 && <WeatherInsights insights={insights} />}
      </div>

      {/* Activities by Tier */}
      <div className="space-y-12">
        {tiers.perfect.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">⭐ Perfect Matches</h2>
              <p className="text-gray-600">Ideal conditions for these activities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.perfect.map((activity) => (
                <ActivityCardEnhanced key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {tiers.great.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">🌟 Great Choices</h2>
              <p className="text-gray-600">Excellent options for this weather</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.great.map((activity) => (
                <ActivityCardEnhanced key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {tiers.good.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">👍 Good Options</h2>
              <p className="text-gray-600">Solid activities that work well</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.good.map((activity) => (
                <ActivityCardEnhanced key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {tiers.fair.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">🤷 Fair Weather Activities</h2>
              <p className="text-gray-600">Doable, but not ideal conditions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.fair.map((activity) => (
                <ActivityCardEnhanced key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {tiers.notRecommended.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">⚠️ Not Recommended</h2>
              <p className="text-gray-600">Better saved for another day</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.notRecommended.map((activity) => (
                <ActivityCardEnhanced key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}
      </div>

      {totalActivities === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No activities found for this date.</p>
        </div>
      )}
    </>
  );
}

function LoadingActivities() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function DatePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { date: dateString } = resolvedParams;
  const date = validateDate(dateString);

  if (!date) {
    notFound();
  }

  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  const isToday = format(new Date(), 'yyyy-MM-dd') === dateString;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {isToday ? "Today's Activities" : `Activities for ${format(date, 'EEEE')}`}
              </h1>
              <p className="text-gray-600 mt-2">{formattedDate}</p>
            </div>
            
            {/* Date Picker */}
            <DatePicker selectedDate={date} />
          </div>
        </div>

        <Suspense fallback={<LoadingActivities />}>
          <DateActivities dateString={dateString} />
        </Suspense>
      </div>
    </main>
  );
}

