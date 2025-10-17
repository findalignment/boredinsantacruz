'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns';
import { getEvents } from '@/app/actions/getEvents';
import { EventCard } from '@/components/events/event-card';
import type { Event } from '@/lib/events/eventbrite';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Get events for the next 90 days
        const startDate = startOfMonth(currentDate);
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 3); // 3 months ahead
        
        const result = await getEvents({
          startDate,
          endDate,
        });
        
        if (result.success && result.data) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [currentDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days to start calendar on correct day of week
  const startPadding = monthStart.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const endPadding = 6 - monthEnd.getDay();

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.startDate), date)
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/events"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📅 Events Calendar
          </h1>
          <p className="text-lg text-gray-600">
            Browse events by date in Santa Cruz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Padding days */}
                  {Array.from({ length: startPadding }).map((_, i) => (
                    <div key={`start-${i}`} className="h-12"></div>
                  ))}
                  
                  {/* Actual days */}
                  {calendarDays.map(day => {
                    const dayEvents = getEventsForDate(day);
                    const hasEvents = dayEvents.length > 0;
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentDay = isToday(day);
                    
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          h-12 text-sm rounded-lg transition-all relative
                          ${isSameMonth(day, currentDate) 
                            ? 'text-gray-900 hover:bg-blue-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                          }
                          ${isCurrentDay 
                            ? 'bg-blue-100 text-blue-900 font-semibold' 
                            : ''
                          }
                          ${isSelected 
                            ? 'bg-blue-500 text-white font-semibold' 
                            : ''
                          }
                          ${hasEvents && !isSelected 
                            ? 'bg-green-50 border border-green-200' 
                            : ''
                          }
                        `}
                      >
                        {format(day, 'd')}
                        {hasEvents && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                  
                  {/* End padding days */}
                  {Array.from({ length: endPadding }).map((_, i) => (
                    <div key={`end-${i}`} className="h-12"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                </h3>
              </div>
              
              <div className="p-6">
                {selectedDate ? (
                  (() => {
                    const dayEvents = getEventsForDate(selectedDate);
                    return dayEvents.length > 0 ? (
                      <div className="space-y-4">
                        {dayEvents.map(event => (
                          <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{event.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{event.venue.name}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(event.startDate), 'h:mm a')}
                            </p>
                            <Link
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Details →
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">📅</div>
                        <p className="text-gray-500">No events on this date</p>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">👆</div>
                    <p className="text-gray-500">Click on a date to see events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
