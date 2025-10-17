'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { LastUpdated } from '@/components/last-updated';

// Define all guides with metadata
const timeBasedGuides = [
  {
    id: '3-hours',
    title: '3 Hours Free',
    description: 'Quick coastal walk, downtown lunch, wharf visit',
    duration: '3 hours',
    href: '/guides/3-hours',
    emoji: '⚡',
    bestFor: 'First Visit, Layover, Short Stop',
  },
  {
    id: '6-hours',
    title: '6 Hours Free',
    description: 'Beach boardwalk, downtown, nature or harbor',
    duration: '6 hours',
    href: '/guides/6-hours',
    emoji: '🌅',
    bestFor: 'Comprehensive, Tourists, Day Trip',
  },
  {
    id: 'full-day',
    title: 'Full Day',
    description: 'Complete Santa Cruz experience from sunrise to sunset',
    duration: 'Full Day',
    href: '/guides/full-day',
    emoji: '☀️',
    bestFor: 'Everything, Full Experience',
  },
  {
    id: 'date-night',
    title: 'Date Night',
    description: 'Romantic sunset walk, dinner with views, evening drinks',
    duration: '2-3 hours',
    href: '/guides/date-night',
    emoji: '❤️',
    bestFor: 'Couples, Romance, Special Occasion',
  },
  {
    id: 'family-day',
    title: 'Family Day',
    description: 'Boardwalk, kid-friendly dining, beach fun',
    duration: '4-5 hours',
    href: '/guides/family-day',
    emoji: '👨‍👩‍👧‍👦',
    bestFor: 'Kids, Families, All Ages',
  },
  {
    id: 'sunday',
    title: 'Perfect Sunday',
    description: 'Brunch, farmers market, beach, sunset dinner',
    duration: 'All day',
    href: '/guides/sunday',
    emoji: '🥐',
    bestFor: 'Relaxed, Locals, Weekend',
  },
  {
    id: 'last-minute',
    title: 'Last-Minute Plans',
    description: 'Spontaneous adventures, no reservations needed',
    duration: 'Flexible',
    href: '/guides/last-minute',
    emoji: '🎲',
    bestFor: 'No Planning, Walk-ins',
  },
  {
    id: 'tonight',
    title: 'Tonight',
    description: 'Sunset spots, dinner, live music, nightlife',
    duration: 'Evening',
    href: '/guides/tonight',
    emoji: '🌙',
    bestFor: 'Nightlife, Music, Evening Plans',
  },
];

const neighborhoodGuides = [
  {
    id: 'downtown',
    title: 'Downtown Santa Cruz',
    description: 'Pacific Avenue shops, restaurants, arts & culture',
    href: '/neighborhoods/downtown',
    emoji: '🏙️',
    bestFor: 'Shopping, Dining, Culture',
  },
  {
    id: 'westside',
    title: 'Westside',
    description: 'Natural Bridges, West Cliff Drive, surfing & beaches',
    href: '/neighborhoods/westside',
    emoji: '🌊',
    bestFor: 'Beaches, Surfing, Coastal',
  },
  {
    id: 'capitola',
    title: 'Capitola Village',
    description: 'Colorful beach houses, boutique shops, village charm',
    href: '/neighborhoods/capitola',
    emoji: '🏘️',
    bestFor: 'Beach Town, Photos, Relaxed',
  },
  {
    id: 'harbor',
    title: 'Seabright & Harbor',
    description: 'Waterfront dining, sea lions, working harbor',
    href: '/neighborhoods/harbor',
    emoji: '⚓',
    bestFor: 'Seafood, Harbor, Sea Lions',
  },
];

const activityGuides = [
  {
    id: 'beaches',
    title: 'Best Beaches',
    description: 'Complete guide to Santa Cruz beaches and coastal access',
    href: '/best-beaches',
    emoji: '🏖️',
    bestFor: 'Swimming, Surfing, Sunbathing',
  },
  {
    id: 'hiking',
    title: 'Best Hiking Trails',
    description: 'Redwood forests, coastal trails, and scenic paths',
    href: '/best-hiking-trails',
    emoji: '🥾',
    bestFor: 'Nature, Exercise, Views',
  },
  {
    id: 'surfing',
    title: 'Surfing Spots',
    description: 'Top surf breaks and conditions guide',
    href: '/best-surfing-spots',
    emoji: '🏄',
    bestFor: 'Surfing, Wave Watching',
  },
  {
    id: 'rainy',
    title: 'Rainy Day Activities',
    description: 'Indoor fun when weather doesn\'t cooperate',
    href: '/best-rainy-day-activities',
    emoji: '☔',
    bestFor: 'Indoor, Museums, Shopping',
  },
];

export default function GuidesPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'time' | 'neighborhood' | 'activity'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine all guides into one array
  const allGuides = useMemo(() => [
    ...timeBasedGuides.map(g => ({ ...g, type: 'time' as const })),
    ...neighborhoodGuides.map(g => ({ ...g, type: 'neighborhood' as const })),
    ...activityGuides.map(g => ({ ...g, type: 'activity' as const })),
  ], []);

  // Filter guides with simple logic
  const filteredGuides = useMemo(() => {
    return allGuides.filter(guide => {
      // Type filter
      if (selectedFilter !== 'all' && guide.type !== selectedFilter) return false;

      // Simple search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return guide.title.toLowerCase().includes(query) ||
               guide.description.toLowerCase().includes(query) ||
               guide.bestFor?.toLowerCase().includes(query);
      }

      return true;
    });
  }, [allGuides, selectedFilter, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Santa Cruz Guides
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Expert local guides for every type of visit. Find your perfect Santa Cruz experience.
          </p>
        </div>
      </section>

      {/* Simple Filters */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          {/* Search - Compact */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="🔍 Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Quick Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('time')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'time' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              ⏱️ Time
            </button>
            <button
              onClick={() => setSelectedFilter('neighborhood')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'neighborhood' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              📍 Areas
            </button>
            <button
              onClick={() => setSelectedFilter('activity')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'activity' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              🎯 Activities
            </button>
          </div>
        </div>
        
        {/* Results count - subtle */}
        <div className="text-sm text-gray-500 mb-4">
          {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
          <span className="ml-2 text-xs">
            <LastUpdated date="2025-01-16" />
          </span>
        </div>
      </section>

      {/* Dynamic Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No guides found</h3>
            <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Show All Guides
            </button>
          </div>
        ) : (
          <>
            {/* Featured Guide (first one) */}
            {filteredGuides.length > 0 && selectedFilter === 'all' && !searchQuery && (
              <div className="mb-8">
                <Link
                  href={filteredGuides[0].href}
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{filteredGuides[0].emoji}</div>
                    <div>
                      <div className="text-sm font-semibold opacity-90 mb-1">✨ Featured Guide</div>
                      <h3 className="text-3xl font-bold">{filteredGuides[0].title}</h3>
                      {'duration' in filteredGuides[0] && filteredGuides[0].duration && (
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mt-2">
                          {filteredGuides[0].duration}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-blue-100 text-lg mb-4">{filteredGuides[0].description}</p>
                  {filteredGuides[0].bestFor && (
                    <div className="text-sm opacity-90">
                      <strong>Perfect for:</strong> {filteredGuides[0].bestFor}
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* All Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedFilter === 'all' && !searchQuery ? filteredGuides.slice(1) : filteredGuides).map((guide, index) => (
                <Link
                  key={index}
                  href={guide.href}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{guide.emoji}</div>
                    <div className="text-xs px-3 py-1 rounded-full font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                      {guide.type === 'time' && '⏱️ Time-Based'}
                      {guide.type === 'neighborhood' && '📍 Neighborhood'}
                      {guide.type === 'activity' && '🎯 Activity Guide'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  
                  {'duration' in guide && guide.duration && (
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold mb-3 border border-blue-200">
                      ⏰ {guide.duration}
                    </div>
                  )}
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{guide.description}</p>
                  
                  {guide.bestFor && (
                    <div className="text-sm text-gray-500 border-t pt-3">
                      <span className="font-semibold text-gray-700">Best for:</span> {guide.bestFor}
                    </div>
                  )}
                  
                  {/* Hover effect arrow */}
                  <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore guide
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
