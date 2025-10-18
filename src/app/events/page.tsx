import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTodayAirtableEvents, getUpcomingAirtableEvents } from '@/app/actions/getAirtableEvents';
import { EventCard } from '@/components/events/event-card';
import { EventFilters } from '@/components/events/event-filters';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Events in Santa Cruz',
  description: 'Discover concerts, festivals, shows, and events happening in Santa Cruz, CA',
};

export default async function EventsPage() {
  const [todayResult, upcomingResult] = await Promise.all([
    getTodayAirtableEvents(),
    getUpcomingAirtableEvents(30), // Next 30 days
  ]);

  const todayEvents = todayResult.success ? todayResult.data || [] : [];
  const upcomingEvents = upcomingResult.success ? upcomingResult.data || [] : [];
  
  // Get unique categories from events
  const categories = Array.from(new Set(upcomingEvents.map(event => event.category)));

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎉 Events in Santa Cruz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-6">
            Discover concerts, festivals, workshops, and events happening around Santa Cruz County
          </p>
          
          {/* Submit Event CTA */}
          <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Hosting an event in Santa Cruz?
              </h3>
              <p className="text-gray-600 text-sm">
                Share it with the community for free! Takes less than 5 minutes.
              </p>
            </div>
            <Link
              href="/events/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span className="text-xl">📅</span>
              Submit Your Event
            </Link>
          </div>
        </div>


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

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/events?category=${encodeURIComponent(category)}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">
                No upcoming events found. Check back soon!
              </p>
              <Link
                href="/events/submit"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Submit an Event
              </Link>
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

