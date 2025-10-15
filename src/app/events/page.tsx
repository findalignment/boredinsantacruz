import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTodayEvents, getUpcomingEvents, getEventCategories } from '@/app/actions/getEvents';
import { EventCard } from '@/components/events/event-card';
import { EventFilters } from '@/components/events/event-filters';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Events in Santa Cruz',
  description: 'Discover concerts, festivals, shows, and events happening in Santa Cruz, CA',
};

export default async function EventsPage() {
  const [todayResult, upcomingResult, categoriesResult] = await Promise.all([
    getTodayEvents(),
    getUpcomingEvents(30), // Next 30 days
    getEventCategories(),
  ]);

  const todayEvents = todayResult.success ? todayResult.data || [] : [];
  const upcomingEvents = upcomingResult.success ? upcomingResult.data || [] : [];
  const categories = categoriesResult.success ? categoriesResult.data || [] : [];

  const noApiKey = !process.env.EVENTBRITE_API_KEY;

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎉 Events in Santa Cruz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover concerts, festivals, workshops, and events happening around Santa Cruz County
          </p>
        </div>

        {/* No API Key Warning */}
        {noApiKey && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🚀 Eventbrite Integration Available
            </h3>
            <p className="text-blue-800 mb-4">
              To show live events from Eventbrite, add your API key to the `.env.local` file:
            </p>
            <code className="block bg-blue-100 px-4 py-2 rounded text-sm text-blue-900 mb-4">
              EVENTBRITE_API_KEY=your_token_here
            </code>
            <p className="text-sm text-blue-700">
              See <code>EVENT_CALENDAR_GUIDE.md</code> for setup instructions.
            </p>
          </div>
        )}

        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Today ({format(new Date(), 'EEEE, MMMM d')})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-48 animate-pulse"></div>}>
            <EventFilters categories={categories} />
          </Suspense>
        </div>

        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">
                {noApiKey 
                  ? 'No events to display. Set up Eventbrite API to see live events!'
                  : 'No upcoming events found. Check back soon!'}
              </p>
              {noApiKey && (
                <Link
                  href="/tonight"
                  className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Curated Events
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/events/calendar"
            className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold mb-1">Calendar View</h3>
            <p className="text-sm text-white/90">Browse by date</p>
          </Link>
          
          <Link
            href="/events?category=music"
            className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">🎵</div>
            <h3 className="font-semibold mb-1">Music</h3>
            <p className="text-sm text-white/90">Concerts & shows</p>
          </Link>
          
          <Link
            href="/events?isFree=true"
            className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">🎫</div>
            <h3 className="font-semibold mb-1">Free Events</h3>
            <p className="text-sm text-white/90">No cost activities</p>
          </Link>
          
          <Link
            href="/events?category=food"
            className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">🍽️</div>
            <h3 className="font-semibold mb-1">Food & Drink</h3>
            <p className="text-sm text-white/90">Tastings & festivals</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

