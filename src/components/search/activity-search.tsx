'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import type { RainyActivity } from '@/types';

interface ActivitySearchProps {
  activities: RainyActivity[];
  placeholder?: string;
  autoFocus?: boolean;
}

export function ActivitySearch({ 
  activities, 
  placeholder = "Search activities...",
  autoFocus = false 
}: ActivitySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RainyActivity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = useRef(
    new Fuse(activities, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'venueName', weight: 1.5 },
        { name: 'venue.name', weight: 1.5 },
        { name: 'tags', weight: 1 },
        { name: 'notes', weight: 0.5 },
        { name: 'venue.neighborhood', weight: 0.8 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    })
  );

  // Update search results
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = fuse.current.search(query);
    const activities = searchResults.slice(0, 8).map(result => result.item);
    setResults(activities);
    setIsOpen(true);
    setSelectedIndex(0);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateToActivity(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const navigateToActivity = (activity: RainyActivity) => {
    router.push(`/activity/${activity.id}`);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const getActivityIcon = (activity: RainyActivity): string => {
    const tags = activity.tags?.join(' ').toLowerCase() || '';
    
    if (tags.includes('beach') || tags.includes('tide')) return '🏖️';
    if (tags.includes('coffee') || tags.includes('cafe')) return '☕';
    if (tags.includes('food') || tags.includes('restaurant')) return '🍴';
    if (tags.includes('hike') || tags.includes('trail')) return '🥾';
    if (tags.includes('surf')) return '🏄';
    if (tags.includes('museum') || tags.includes('art')) return '🎨';
    if (tags.includes('music') || tags.includes('bar')) return '🎵';
    if (tags.includes('brewery') || tags.includes('beer')) return '🍺';
    if (tags.includes('nature') || tags.includes('park')) return '🌲';
    if (tags.includes('shopping')) return '🛍️';
    
    return '📍';
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg 
              className="h-5 w-5 text-gray-400 hover:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((activity, index) => (
            <button
              key={activity.id}
              onClick={() => navigateToActivity(activity)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">
                  {getActivityIcon(activity)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {activity.title}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <span className="truncate">
                      {activity.venueName || activity.venue?.name}
                    </span>
                    {activity.venue?.neighborhood && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {activity.venue.neighborhood}
                        </span>
                      </>
                    )}
                  </div>
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {activity.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          {/* Show All Results Link */}
          <button
            onClick={() => {
              router.push(`/activities?search=${encodeURIComponent(query)}`);
              setQuery('');
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-center text-blue-600 hover:bg-blue-50 font-medium text-sm border-t-2 border-gray-200"
          >
            See all results for "{query}" →
          </button>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 text-center">
          <div className="text-4xl mb-2">🤷</div>
          <p className="text-gray-600 mb-2">
            No results for "{query}"
          </p>
          <p className="text-sm text-gray-500">
            Try searching for beaches, cafes, hiking, or food
          </p>
        </div>
      )}
    </div>
  );
}

