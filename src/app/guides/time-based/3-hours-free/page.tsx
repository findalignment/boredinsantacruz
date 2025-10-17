import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '3 Hours Free in Santa Cruz - Quick Activities & Attractions',
  description: 'Make the most of 3 hours in Santa Cruz with our curated list of free activities, attractions, and experiences. Perfect for short visits and quick stops.',
  keywords: 'santa cruz 3 hours free, quick santa cruz activities, free things to do santa cruz, short visit santa cruz, santa cruz quick stop',
  openGraph: {
    title: '3 Hours Free in Santa Cruz - Quick Activities & Attractions',
    description: 'Make the most of 3 hours in Santa Cruz with our curated list of free activities, attractions, and experiences.',
    type: 'article',
  },
};

export default function ThreeHoursFreePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3 Hours Free in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfect for a quick visit, layover, or short stop. Here's how to experience the best of Santa Cruz without spending a dime.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Jump to Activities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#beach-time" className="text-blue-600 hover:text-blue-800 font-medium">🏖️ Beach Time</a>
            <a href="#downtown-explore" className="text-blue-600 hover:text-blue-800 font-medium">🏛️ Downtown</a>
            <a href="#nature-walks" className="text-blue-600 hover:text-blue-800 font-medium">🌳 Nature</a>
            <a href="#food-scene" className="text-blue-600 hover:text-blue-800 font-medium">🍕 Food</a>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="space-y-8">
          
          {/* Hour 1: Beach Time */}
          <section id="beach-time" className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="/hero/santa-cruz-beach.jpg"
                  alt="Santa Cruz Beach Boardwalk and beach"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Hour 1
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">Beach & Boardwalk</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Start your Santa Cruz experience at the iconic beach and boardwalk area. Even if you don't ride the rides, the atmosphere is worth the visit.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏖️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Main Beach Walk</h3>
                      <p className="text-gray-600 text-sm">Free beach access, people watching, and ocean views</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎠</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Boardwalk Stroll</h3>
                      <p className="text-gray-600 text-sm">Free to walk around, watch rides, enjoy the atmosphere</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🌊</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Capitola Wharf</h3>
                      <p className="text-gray-600 text-sm">Short drive to scenic wharf with harbor views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hour 2: Downtown Exploration */}
          <section id="downtown-explore" className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex flex-row-reverse">
              <div className="md:w-1/2">
                <Image
                  src="/hero/downtown-santa-cruz.jpg"
                  alt="Downtown Santa Cruz Pacific Avenue"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Hour 2
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">Downtown Discovery</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Explore the heart of Santa Cruz with its unique shops, street art, and local culture. Pacific Avenue is the main drag with plenty of free entertainment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🛍️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Pacific Avenue Stroll</h3>
                      <p className="text-gray-600 text-sm">Window shopping, street performers, local vibe</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎨</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Street Art & Murals</h3>
                      <p className="text-gray-600 text-sm">Free public art throughout downtown</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏛️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Santa Cruz Museum of Art & History</h3>
                      <p className="text-gray-600 text-sm">Free first Friday of each month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hour 3: Nature & Food */}
          <section id="nature-walks" className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="/hero/natural-bridges.jpg"
                  alt="Natural Bridges State Beach"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                    Hour 3
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">Nature & Local Bites</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  End your visit with some nature time and a taste of local Santa Cruz. Choose between coastal views or redwood forests, then grab a quick local bite.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🌉</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Natural Bridges</h3>
                      <p className="text-gray-600 text-sm">Iconic rock formation, monarch butterflies (seasonal)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🌲</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Henry Cowell Redwoods</h3>
                      <p className="text-gray-600 text-sm">Quick redwood loop trail (30 minutes)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🍕</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Local Food Scene</h3>
                      <p className="text-gray-600 text-sm">Food trucks, farmers market, or casual cafes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Pro Tips */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Pro Tips for 3 Hours</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Timing</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Arrive early (9-10 AM) for parking</li>
                <li>• Avoid weekend afternoons (crowded)</li>
                <li>• Check tide times for beach activities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Transportation</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Downtown parking can be challenging</li>
                <li>• Consider the free Downtown Trolley</li>
                <li>• Beach parking fills up quickly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Time-Based Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/6-hours" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">6 Hours Free</h3>
              <p className="text-gray-600 text-sm">Half-day Santa Cruz exploration with more activities</p>
            </Link>
            <Link href="/guides/full-day" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Day Itinerary</h3>
              <p className="text-gray-600 text-sm">Complete day-long Santa Cruz experience</p>
            </Link>
            <Link href="/guides/last-minute" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Last-Minute Plans</h3>
              <p className="text-gray-600 text-sm">Spontaneous Santa Cruz activities</p>
            </Link>
          </div>
        </section>

        {/* Back to Guides */}
        <div className="text-center mt-12">
          <Link
            href="/guides"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Back to All Guides
          </Link>
        </div>
      </div>
    </main>
  );
}