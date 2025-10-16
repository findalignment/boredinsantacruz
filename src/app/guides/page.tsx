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
  const [selectedType, setSelectedType] = useState<'all' | 'time' | 'neighborhood' | 'activity'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  // Combine all guides into one array
  const allGuides = useMemo(() => [
    ...timeBasedGuides.map(g => ({ ...g, type: 'time' as const })),
    ...neighborhoodGuides.map(g => ({ ...g, type: 'neighborhood' as const })),
    ...activityGuides.map(g => ({ ...g, type: 'activity' as const })),
  ], []);

  // Filter guides
  const filteredGuides = useMemo(() => {
    return allGuides.filter(guide => {
      // Type filter
      if (selectedType !== 'all' && guide.type !== selectedType) return false;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          guide.title.toLowerCase().includes(query) ||
          guide.description.toLowerCase().includes(query) ||
          guide.bestFor?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Duration filter (only for time-based guides)
      if (selectedDuration !== 'all' && guide.type === 'time') {
        const duration = 'duration' in guide ? guide.duration : '';
        if (selectedDuration === 'short' && !duration.includes('3')) return false;
        if (selectedDuration === 'medium' && !duration.includes('6')) return false;
        if (selectedDuration === 'long' && !duration.includes('Full')) return false;
      }

      return true;
    });
  }, [allGuides, selectedType, searchQuery, selectedDuration]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Popular Guides
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Expert local guides for every type of visit. Simple, clear, and designed to help you make the most of Santa Cruz.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Guides</h2>
        <div className="mb-4">
          <LastUpdated date="2025-01-16" />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="🔍 Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Guide Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="time">Time-Based</option>
                <option value="neighborhood">Neighborhoods</option>
                <option value="activity">Activities</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Any Duration</option>
                <option value="short">3 Hours</option>
                <option value="medium">6 Hours</option>
                <option value="long">Full Day</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-900 font-semibold">
                {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedType('all'); setSearchQuery(''); setSelectedDuration('all'); }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setSelectedType('time')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'time' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              ⏱️ Time-Based
            </button>
            <button
              onClick={() => setSelectedType('neighborhood')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'neighborhood' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              📍 Neighborhoods
            </button>
            <button
              onClick={() => setSelectedType('activity')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'activity' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              🎯 Activities
            </button>
          </div>
        </div>
      </section>

      {/* All Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters</p>
            <button
              onClick={() => { setSelectedType('all'); setSearchQuery(''); setSelectedDuration('all'); }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{guide.emoji}</div>
                  <div className="text-xs px-2 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
                    {guide.type === 'time' && '⏱️ Time'}
                    {guide.type === 'neighborhood' && '📍 Area'}
                    {guide.type === 'activity' && '🎯 Activity'}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                
                {'duration' in guide && guide.duration && (
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                    {guide.duration}
                  </div>
                )}
                
                <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                
                {guide.bestFor && (
                  <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                    <strong>Best for:</strong> {guide.bestFor}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
