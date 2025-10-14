import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Secret Map - Hidden Gems of Santa Cruz',
  description: 'Discover hidden beaches, secret viewpoints, and local favorites that only Santa Cruz locals know about.',
};

const secretSpots = [
  {
    id: '1',
    category: 'beach',
    name: 'Sunny Cove Beach',
    location: 'End of 14th Avenue',
    secretLevel: 'hidden',
    description: 'Small, secluded beach tucked away at the end of a residential street. Perfect for a quiet sunset.',
    bestTime: 'Sunset, weekdays',
    crowdLevel: 'Usually quiet',
    insiderTip: 'Park on 14th Ave and walk down. Low tide reveals tide pools. Local favorite for proposals!',
    coordinates: { lat: 36.9665, lng: -121.9735 },
  },
  {
    id: '2',
    category: 'view',
    name: 'Lighthouse Field South Bench',
    location: 'Lighthouse Field State Beach',
    secretLevel: 'locals-know',
    description: 'The best bench in Santa Cruz. Overlooks Steamer Lane with unobstructed sunset views.',
    bestTime: 'Sunset (30 min before)',
    crowdLevel: 'Sometimes busy',
    insiderTip: 'The bench on the south end is the secret one. Bring a blanket - it gets windy! Park at Lighthouse parking lot.',
    coordinates: { lat: 36.9498, lng: -122.0264 },
  },
  {
    id: '3',
    category: 'nature',
    name: 'Pogonip Meadow Overlook',
    location: 'Upper Pogonip Trail',
    secretLevel: 'hidden',
    description: 'Stunning meadow overlooking downtown and the bay. Wildflowers in spring, perfect for picnics.',
    bestTime: 'Spring mornings, golden hour',
    crowdLevel: 'Always quiet',
    insiderTip: 'Take Rincon Trail to the upper meadow. About 1.5 miles in. Bring a picnic - no facilities up there.',
    coordinates: { lat: 36.9850, lng: -122.0450 },
  },
  {
    id: '4',
    category: 'food',
    name: 'Tacos Moreno Truck',
    location: 'Water Street (weekday mornings)',
    secretLevel: 'locals-know',
    description: 'The best breakfast burritos in Santa Cruz. Cash only, locals line up every morning.',
    bestTime: 'Weekday mornings 7-11am',
    crowdLevel: 'Line moves fast',
    insiderTip: 'Get the chorizo breakfast burrito. They run out by 11am. Cash only! Worth the wait.',
    coordinates: { lat: 36.9741, lng: -122.0264 },
  },
  {
    id: '5',
    category: 'beach',
    name: 'Mitchell\'s Cove Secret Staircase',
    location: 'Between Its Beach and Natural Bridges',
    secretLevel: 'hidden',
    description: 'Hidden staircase leads to a secluded cove. Few people know about it.',
    bestTime: 'Low tide, weekdays',
    crowdLevel: 'Very quiet',
    insiderTip: 'Look for the unmarked stairs on West Cliff between Its Beach and Natural Bridges. Low tide only!',
    coordinates: { lat: 36.9550, lng: -122.0500 },
  },
  {
    id: '6',
    category: 'view',
    name: 'UC Santa Cruz East Field',
    location: 'UCSC East Campus',
    secretLevel: 'locals-know',
    description: 'Massive field with panoramic bay views. Perfect for kite flying, picnics, watching sunsets.',
    bestTime: 'Late afternoon/sunset',
    crowdLevel: 'Usually empty',
    insiderTip: 'Drive to East Remote parking lot. Short walk to field. Incredible views, hardly anyone knows about it!',
    coordinates: { lat: 37.0000, lng: -122.0550 },
  },
  {
    id: '7',
    category: 'nature',
    name: 'Wilder Ranch Old Creamery',
    location: 'Wilder Ranch State Park',
    secretLevel: 'semi-secret',
    description: 'Historic dairy farm with Victorian buildings. Free to explore (parking is $10).',
    bestTime: 'Weekday mornings',
    crowdLevel: 'Moderate on weekends',
    insiderTip: 'The buildings are open Thu-Sun 10-4. Walk around back for ocean views. Great for photos!',
    coordinates: { lat: 36.9670, lng: -122.0818 },
  },
  {
    id: '8',
    category: 'food',
    name: 'The Picnic Basket Secret Patio',
    location: 'Beach Street',
    secretLevel: 'locals-know',
    description: 'Hidden back patio that most tourists don\'t know exists. Order inside, eat outside.',
    bestTime: 'Lunch on sunny days',
    crowdLevel: 'Usually has tables',
    insiderTip: 'Order at counter, ask to sit "out back." The secret garden patio is through the back door!',
    coordinates: { lat: 36.9641, lng: -122.0181 },
  },
  {
    id: '9',
    category: 'view',
    name: 'Seabright Beach South End',
    location: 'Past the harbor jetty',
    secretLevel: 'hidden',
    description: 'Walk past the harbor to the very end. Secluded beach with amazing sunsets.',
    bestTime: 'Sunset, low tide',
    crowdLevel: 'Almost always empty',
    insiderTip: 'Park at Seabright Beach lot, walk PAST the jetty. Keep going. You\'ll have the beach to yourself!',
    coordinates: { lat: 36.9620, lng: -121.9750 },
  },
  {
    id: '10',
    category: 'nature',
    name: 'Henry Cowell Secret Grove',
    location: 'Off main trail loop',
    secretLevel: 'hidden',
    description: 'Small grove of ancient redwoods off the beaten path. Magical and peaceful.',
    bestTime: 'Early morning, misty days',
    crowdLevel: 'Very few people',
    insiderTip: 'From main Redwood Grove Trail, take the small unmarked trail near marker 12. Walk 100 yards. Shhh!',
    coordinates: { lat: 37.0400, lng: -122.0650 },
  },
];

const categoryIcons: Record<string, string> = {
  beach: '🏖️',
  view: '👁️',
  nature: '🌲',
  food: '🍴',
  other: '📍',
};

const secretLevelBadge = (level: string) => {
  switch(level) {
    case 'hidden':
      return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">🤫 Very Secret</span>;
    case 'semi-secret':
      return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">🔒 Semi-Secret</span>;
    case 'locals-know':
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">🤙 Locals Know</span>;
    default:
      return null;
  }
};

export default function SecretMapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-purple-300 hover:text-purple-200 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🤫 The Secret Map
            </h1>
            <p className="text-lg text-purple-200">
              Hidden gems that only locals know about. Share wisely.
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-purple-800/50 border-2 border-purple-500 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🗺️</div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                Local Code of Conduct
              </h2>
              <div className="space-y-2 text-purple-100 text-sm">
                <p>✓ Respect these places - they're special because they're pristine</p>
                <p>✓ Pack out what you pack in - leave no trace</p>
                <p>✓ Be quiet and respectful - locals live nearby</p>
                <p>✓ Don't blast these spots on social media - keep them secret</p>
                <p>✓ Visit during suggested times to avoid crowds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
              All Spots
            </button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-600 transition-colors">
              🏖️ Secret Beaches
            </button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-600 transition-colors">
              👁️ Best Views
            </button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-600 transition-colors">
              🍴 Hidden Eats
            </button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-600 transition-colors">
              🌲 Nature Spots
            </button>
          </div>
        </div>

        {/* Secret Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {secretSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all shadow-xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{categoryIcons[spot.category]}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {spot.name}
                      </h3>
                      <p className="text-purple-300 text-sm">{spot.location}</p>
                    </div>
                  </div>
                  {secretLevelBadge(spot.secretLevel)}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">
                  {spot.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-purple-400">⏰ Best time:</span>
                    <span className="text-gray-300">{spot.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-purple-400">👥 Crowd level:</span>
                    <span className="text-gray-300">{spot.crowdLevel}</span>
                  </div>
                </div>

                {/* Insider Tip */}
                <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4 mb-4">
                  <div className="flex gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="text-xs font-semibold text-purple-300 mb-1">INSIDER TIP</p>
                      <p className="text-sm text-gray-200">{spot.insiderTip}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${spot.coordinates.lat},${spot.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    🗺️ Reveal Location
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Know a Secret Spot? */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🤐</div>
            <h2 className="text-2xl font-bold mb-2">
              Know a Secret Spot?
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              If you're a local and know of a hidden gem that should be on this map, let us know! 
              We carefully curate submissions to keep these places special.
            </p>
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors">
              Submit a Secret Spot
            </button>
            <p className="text-xs text-purple-200 mt-3">
              All submissions reviewed manually • We respect local spots
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

