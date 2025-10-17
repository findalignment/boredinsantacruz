import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { ActivityCard } from '@/components/activity-card';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Best Photography Spots in Santa Cruz - Instagram-Worthy Locations',
  description: 'Discover the most photogenic locations in Santa Cruz. From iconic surf spots to hidden gems, find the perfect backdrop for your photos and social media content.',
  keywords: ['Santa Cruz photography spots', 'Instagram Santa Cruz', 'Santa Cruz photo locations', 'Santa Cruz photography', 'Santa Cruz scenic views', 'Santa Cruz landmarks'],
  openGraph: {
    title: 'Best Photography Spots in Santa Cruz - Instagram-Worthy Guide',
    description: 'Capture the beauty of Santa Cruz with our guide to the most photogenic locations and scenic viewpoints.',
    type: 'website',
  },
};

const photographySchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Santa Cruz Photography Spots",
  "description": "Best photography locations in Santa Cruz for stunning photos",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.9741,
    "longitude": -122.0308
  },
  "hasMap": "https://boredinsantacruz.com/map",
  "touristType": "photography"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best photography spots in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best photography spots in Santa Cruz include Steamer Lane for surf photography, West Cliff Drive for ocean views, Natural Bridges State Beach for rock formations, the Santa Cruz Beach Boardwalk for classic California vibes, and the historic lighthouse at Lighthouse Point. Each location offers unique photo opportunities throughout different times of day."
      }
    },
    {
      "@type": "Question",
      "name": "What time of day is best for photography in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Golden hour (1 hour after sunrise and 1 hour before sunset) provides the best lighting for photography in Santa Cruz. Sunrise is perfect for surf photography at Steamer Lane, while sunset offers dramatic lighting along West Cliff Drive. Midday works well for the Boardwalk and downtown areas with vibrant colors."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any photography restrictions in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most public areas in Santa Cruz allow photography. The Santa Cruz Beach Boardwalk requires permits for commercial photography. Some beaches may have restrictions during nesting season for birds. Always respect private property and be mindful of other visitors. Drones are restricted in state parks and some beach areas."
      }
    }
  ]
};

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

async function PhotographySpotsContent() {
  const activitiesResult = await getActivities();

  // Filter for photography-worthy locations
  const photographySpots = activitiesResult.success 
    ? activitiesResult.data.filter(activity => {
        const tags = activity.tags || [];
        const notes = activity.notes?.toLowerCase() || '';
        const title = activity.title?.toLowerCase() || '';
        
        return tags.some(tag => 
          tag.toLowerCase().includes('viewpoint') ||
          tag.toLowerCase().includes('scenic') ||
          tag.toLowerCase().includes('beach') ||
          tag.toLowerCase().includes('lighthouse') ||
          tag.toLowerCase().includes('surf') ||
          tag.toLowerCase().includes('boardwalk')
        ) || 
        notes.includes('photo') ||
        notes.includes('view') ||
        notes.includes('scenic') ||
        title.includes('lighthouse') ||
        title.includes('beach') ||
        title.includes('boardwalk');
      })
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Santa Cruz Photography Spots
          </h1>
          <p className="text-xl text-purple-100 mb-6">
            Capture the stunning beauty of Santa Cruz with our guide to the most photogenic locations. 
            From iconic surf spots to hidden gems, find your perfect backdrop.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">📸</div>
              <div className="text-sm">Instagram-Worthy</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🌅</div>
              <div className="text-sm">Golden Hour</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🏄</div>
              <div className="text-sm">Surf Photography</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl mb-1">🌊</div>
              <div className="text-sm">Ocean Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Photography Locations */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Top Photography Locations
        </h2>
        
        <div className="space-y-8">
          {/* Steamer Lane */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-8">
                <div className="text-4xl mb-4">🏄</div>
                <h3 className="text-2xl font-bold mb-3">Steamer Lane</h3>
                <p className="text-blue-100 mb-4">
                  World-famous surf break perfect for action photography. Capture surfers riding massive waves with the lighthouse in the background.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Surf Photography</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Action Shots</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Lighthouse Views</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h4 className="font-semibold text-gray-900 mb-3">Best Times & Tips</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Best Time:</strong> Early morning (7-9 AM)</li>
                  <li>• <strong>Lighting:</strong> Golden hour for dramatic shots</li>
                  <li>• <strong>Equipment:</strong> Telephoto lens for surfers</li>
                  <li>• <strong>Parking:</strong> Limited - arrive early</li>
                </ul>
              </div>
            </div>
          </div>

          {/* West Cliff Drive */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-green-500 to-teal-500 text-white p-8">
                <div className="text-4xl mb-4">🌊</div>
                <h3 className="text-2xl font-bold mb-3">West Cliff Drive</h3>
                <p className="text-green-100 mb-4">
                  Scenic coastal drive with multiple viewpoints. Perfect for sunset photography and panoramic ocean views.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Sunset Views</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Panoramic</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Coastal</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h4 className="font-semibold text-gray-900 mb-3">Best Times & Tips</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Best Time:</strong> Sunset (6-8 PM)</li>
                  <li>• <strong>Lighting:</strong> Dramatic golden hour</li>
                  <li>• <strong>Equipment:</strong> Wide-angle lens</li>
                  <li>• <strong>Locations:</strong> Multiple pullouts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Natural Bridges */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-orange-500 to-red-500 text-white p-8">
                <div className="text-4xl mb-4">🏖️</div>
                <h3 className="text-2xl font-bold mb-3">Natural Bridges State Beach</h3>
                <p className="text-orange-100 mb-4">
                  Iconic rock formations create perfect natural frames. Great for sunrise photography and unique coastal landscapes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Rock Formations</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Sunrise</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Natural Frames</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h4 className="font-semibold text-gray-900 mb-3">Best Times & Tips</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Best Time:</strong> Sunrise (6-7 AM)</li>
                  <li>• <strong>Lighting:</strong> Soft morning light</li>
                  <li>• <strong>Equipment:</strong> Wide-angle for formations</li>
                  <li>• <strong>Access:</strong> Easy parking and trails</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Santa Cruz Beach Boardwalk */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-pink-500 to-purple-500 text-white p-8">
                <div className="text-4xl mb-4">🎢</div>
                <h3 className="text-2xl font-bold mb-3">Santa Cruz Beach Boardwalk</h3>
                <p className="text-pink-100 mb-4">
                  Classic California beachfront amusement park. Perfect for colorful, vibrant photography with retro vibes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Vibrant Colors</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Retro Vibes</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Beach Fun</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h4 className="font-semibold text-gray-900 mb-3">Best Times & Tips</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Best Time:</strong> Midday (12-3 PM)</li>
                  <li>• <strong>Lighting:</strong> Bright, colorful scenes</li>
                  <li>• <strong>Equipment:</strong> Standard lens</li>
                  <li>• <strong>Access:</strong> Easy parking available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Activities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Photography-Focused Activities
        </h2>
        {photographySpots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographySpots.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Capture the Beauty</h3>
            <p className="text-gray-600 mb-4">
              Discover scenic locations perfect for photography and social media.
            </p>
            <Link
              href="/activities"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Activities
            </Link>
          </div>
        )}
      </section>

      {/* Photography Tips */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Photography Tips for Santa Cruz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Equipment Recommendations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">📷</span>
                Wide-angle lens for landscapes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🔭</span>
                Telephoto lens for surf photography
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🕶️</span>
                Polarizing filter for ocean shots
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🔋</span>
                Extra batteries for long shoots
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Photography Times</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🌅</span>
                Sunrise: 6-7 AM (Natural Bridges)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🏄</span>
                Morning: 7-9 AM (Steamer Lane)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">☀️</span>
                Midday: 12-2 PM (Boardwalk)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🌇</span>
                Sunset: 6-8 PM (West Cliff)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Instagram Tips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Instagram-Worthy Shots</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📱 Social Media Ready</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Use natural lighting</li>
              <li>• Include local landmarks</li>
              <li>• Capture action moments</li>
              <li>• Show unique perspectives</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🏷️ Hashtag Strategy</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• #SantaCruz</li>
              <li>• #CaliforniaCoast</li>
              <li>• #SurfPhotography</li>
              <li>• #PacificOcean</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📸 Composition Tips</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Rule of thirds</li>
              <li>• Leading lines</li>
              <li>• Natural frames</li>
              <li>• Depth of field</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Photography Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/guides/specialized/hidden-gems"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">💎</div>
            <h3 className="font-semibold text-gray-900 mb-2">Hidden Gems</h3>
            <p className="text-sm text-gray-600">Secret spots known only to locals</p>
          </Link>
          <Link
            href="/guides/specialized/sunset-spots"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🌅</div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Sunset Spots</h3>
            <p className="text-sm text-gray-600">Perfect locations for golden hour</p>
          </Link>
          <Link
            href="/guides/neighborhoods/westside"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">🌊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Westside Photography</h3>
            <p className="text-sm text-gray-600">Surf culture and ocean views</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function PhotographySpotsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <span>›</span>
            <Link href="/guides/specialized" className="hover:text-blue-600">Specialized</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Photography Spots</span>
          </div>
        </nav>

        <Suspense fallback={<LoadingSkeleton />}>
          <PhotographySpotsContent />
        </Suspense>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(photographySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </main>
  );
}
