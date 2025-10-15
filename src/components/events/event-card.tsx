'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import type { Event } from '@/lib/events/eventbrite';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  const dateDisplay = format(startDate, 'MMM d');
  const timeDisplay = format(startDate, 'h:mm a');
  const isSameDay = format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd');

  return (
    <Link
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      {event.image ? (
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
            {event.category}
          </div>
          {/* Free Badge */}
          {event.price.isFree && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
              FREE
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
          <div className="text-6xl">🎉</div>
          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
            {event.category}
          </div>
          {/* Free Badge */}
          {event.price.isFree && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
              FREE
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Date/Time */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span className="font-medium">{dateDisplay}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1">
            <span>🕐</span>
            <span>{timeDisplay}</span>
          </div>
        </div>

        {/* Event Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">
          {event.name}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Venue */}
        <div className="flex items-start gap-2 text-sm text-gray-700 mb-3">
          <span className="text-base mt-0.5">📍</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{event.venue.name}</p>
            {event.venue.address && (
              <p className="text-xs text-gray-500 truncate">{event.venue.address}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm">
            {event.price.isFree ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : event.price.min === event.price.max ? (
              <span className="text-gray-900 font-semibold">${event.price.min}</span>
            ) : (
              <span className="text-gray-900 font-semibold">
                ${event.price.min} - ${event.price.max}
              </span>
            )}
          </div>
          
          <div className="text-sm text-cyan-600 font-medium group-hover:translate-x-1 transition-transform">
            View Details →
          </div>
        </div>

        {/* Source Badge */}
        {event.source === 'eventbrite' && (
          <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
            <span>Powered by Eventbrite</span>
          </div>
        )}
      </div>
    </Link>
  );
}

