import Link from 'next/link';
import type { Metadata } from 'next';
import { LastUpdated } from '@/components/last-updated';

export const metadata: Metadata = {
  title: 'Santa Cruz Guides - Complete Collection | 2025',
  description: 'Browse our complete collection of Santa Cruz guides. Time-based itineraries, neighborhood guides, and expert local recommendations.',
  keywords: 'santa cruz guides, santa cruz itineraries, visit santa cruz, santa cruz planning',
};

// Define all guides with metadata
const timeBasedGuides = [
  {
    id: '3-hours',
    title: '3 Hours Free',
    description: 'Quick coastal walk, downtown lunch, wharf visit',
    duration: '3 hours',
    href: '/guides/3-hours',
    emoji: '⚡',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['Quick', 'Morning', 'Afternoon'],
    bestFor: ['First Visit', 'Layover', 'Short Stop'],
  },
  {
    id: '6-hours',
    title: '6 Hours Free',
    description: 'Beach boardwalk, downtown, nature or harbor',
    duration: '6 hours',
    href: '/guides/6-hours',
    emoji: '🌅',
    gradient: 'from-orange-500 to-pink-500',
    tags: ['Half Day', 'Morning', 'Afternoon'],
    bestFor: ['Comprehensive', 'Tourists', 'Day Trip'],
  },
  {
    id: 'full-day',
    title: 'Full Day',
    description: 'Complete Santa Cruz experience from sunrise to sunset',
    duration: '8-10 hours',
    href: '/guides/full-day',
    emoji: '☀️',
    gradient: 'from-yellow-500 to-orange-500',
    tags: ['Full Day', 'Complete'],
    bestFor: ['Everything', 'Full Experience', 'Thorough'],
  },
  {
    id: 'date-night',
    title: 'Date Night',
    description: 'Romantic sunset walk, dinner with views, evening drinks',
    duration: '2-3 hours',
    href: '/guides/date-night',
    emoji: '❤️',
    gradient: 'from-rose-500 to-pink-500',
    tags: ['Evening', 'Romantic'],
    bestFor: ['Couples', 'Romance', 'Special Occasion'],
  },
  {
    id: 'family-day',
    title: 'Family Day',
    description: 'Boardwalk, kid-friendly dining, beach fun',
    duration: '4-5 hours',
    href: '/guides/family-day',
    emoji: '👨‍👩‍👧‍👦',
    gradient: 'from-green-500 to-teal-500',
    tags: ['Morning', 'Family'],
    bestFor: ['Kids', 'Families', 'All Ages'],
  },
  {
    id: 'sunday',
    title: 'Perfect Sunday',
    description: 'Brunch, farmers market, beach, sunset dinner',
    duration: 'All day',
    href: '/guides/sunday',
    emoji: '🥐',
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['Weekend', 'Full Day'],
    bestFor: ['Relaxed', 'Locals', 'Weekend'],
  },
  {
    id: 'last-minute',
    title: 'Last-Minute Plans',
    description: 'Spontaneous adventures, no reservations needed',
    duration: 'Flexible',
    href: '/guides/last-minute',
    emoji: '🎲',
    gradient: 'from-yellow-500 to-red-500',
    tags: ['Spontaneous', 'Flexible'],
    bestFor: ['No Planning', 'Walk-ins', 'Improvise'],
  },
  {
    id: 'tonight',
    title: 'Tonight',
    description: 'Sunset spots, dinner, live music, nightlife',
    duration: 'Evening',
    href: '/guides/tonight',
    emoji: '🌙',
    gradient: 'from-indigo-600 to-purple-600',
    tags: ['Evening', 'Night'],
    bestFor: ['Nightlife', 'Music', 'Evening Plans'],
  },
];

const neighborhoodGuides = [
  {
    id: 'downtown',
    title: 'Downtown Santa Cruz',
    description: 'Pacific Avenue shops, restaurants, arts & culture',
    href: '/neighborhoods/downtown',
    emoji: '🏙️',
    gradient: 'from-blue-600 to-purple-600',
    tags: ['Urban', 'Shopping'],
    bestFor: ['Shopping', 'Dining', 'Culture'],
  },
  {
    id: 'westside',
    title: 'Westside',
    description: 'Natural Bridges, West Cliff Drive, surfing & beaches',
    href: '/neighborhoods/westside',
    emoji: '🌊',
    gradient: 'from-cyan-600 to-blue-600',
    tags: ['Coastal', 'Surfing'],
    bestFor: ['Beaches', 'Surfing', 'Coastal'],
  },
  {
    id: 'capitola',
    title: 'Capitola Village',
    description: 'Colorful beach houses, boutique shops, village charm',
    href: '/neighborhoods/capitola',
    emoji: '🏘️',
    gradient: 'from-pink-600 to-rose-600',
    tags: ['Beach Town', 'Charming'],
    bestFor: ['Beach Town', 'Photos', 'Relaxed'],
  },
  {
    id: 'harbor',
    title: 'Seabright & Harbor',
    description: 'Waterfront dining, sea lions, working harbor',
    href: '/neighborhoods/harbor',
    emoji: '⚓',
    gradient: 'from-teal-600 to-cyan-600',
    tags: ['Waterfront', 'Dining'],
    bestFor: ['Seafood', 'Harbor', 'Sea Lions'],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Santa Cruz Guides
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-6">
            Expert local guides for every type of visit. Simple, clear, and designed to help you make the most of Santa Cruz.
          </p>
          <div className="flex justify-center">
            <LastUpdated date="2025-01-16" />
          </div>
        </div>
      </section>

      {/* Time-Based Guides */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan by Time Available
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How much time do you have? We'll show you exactly how to spend it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeBasedGuides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Emoji */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {guide.emoji}
                  </div>

                  {/* Duration Badge */}
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold mb-3">
                    {guide.duration}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {guide.description}
                  </p>

                  {/* Best For Tags */}
                  <div className="flex flex-wrap gap-1">
                    {guide.bestFor.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    View Guide
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Guides */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by Neighborhood
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each area has its own personality. Discover what makes them special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoodGuides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Emoji */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {guide.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {guide.description}
                  </p>

                  {/* Best For Tags */}
                  <div className="flex flex-wrap gap-1">
                    {guide.bestFor.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Explore Area
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our AI assistant can help you find the perfect guide based on your interests, time, and weather.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ask the Assistant
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

