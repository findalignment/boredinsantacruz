import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Surfing in Santa Cruz: Complete Beginner\'s Guide to Learning to Surf',
  description: 'Learn to surf in Santa Cruz! Complete beginner\'s guide to surfing, best surf spots, surf schools, equipment, and everything you need to know to start surfing in Santa Cruz County.',
  keywords: 'surfing santa cruz, learn to surf santa cruz, santa cruz surf spots, surf schools santa cruz, beginner surfing santa cruz, surf lessons santa cruz',
  openGraph: {
    title: 'Surfing in Santa Cruz: Complete Beginner\'s Guide to Learning to Surf',
    description: 'Learn to surf in Santa Cruz! Complete beginner\'s guide to surfing, best surf spots, surf schools, and everything you need to know.',
    type: 'article',
  },
};

export default function SurfingBeginnersGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏄‍♂️ Surfing in Santa Cruz: Beginner's Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to catch your first wave? Santa Cruz is one of California's best places to learn surfing. 
            This complete guide covers everything from choosing your first surf spot to essential equipment and safety tips.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Jump to Sections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#best-spots" className="text-blue-600 hover:text-blue-800 font-medium">🏄‍♀️ Best Spots</a>
            <a href="#surf-schools" className="text-blue-600 hover:text-blue-800 font-medium">🏫 Surf Schools</a>
            <a href="#equipment" className="text-blue-600 hover:text-blue-800 font-medium">🏄‍♂️ Equipment</a>
            <a href="#safety-tips" className="text-blue-600 hover:text-blue-800 font-medium">⚠️ Safety</a>
          </div>
        </div>

        {/* Best Beginner Surf Spots */}
        <section id="best-spots" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏄‍♀️ Best Beginner Surf Spots</h2>
          
          <div className="grid gap-8">
            {/* Cowell's Beach */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-2">🌊</span>
                      <div className="text-sm text-gray-600 font-medium">Cowell's Beach</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Cowell's Beach</h3>
                  <p className="text-blue-600 font-medium mb-3">🏆 Best for Complete Beginners</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Located right next to the Santa Cruz Beach Boardwalk, Cowell's Beach offers gentle, 
                    consistent waves perfect for learning. The sandy bottom makes it safe for beginners, 
                    and there are often surf schools teaching lessons here.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">📍 Location</p>
                      <p className="text-gray-600">Next to Santa Cruz Beach Boardwalk</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">🌊 Wave Type</p>
                      <p className="text-gray-600">Small, gentle, consistent</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Beginner Friendly
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Sandy Bottom
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Lessons Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capitola Beach */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex flex-row-reverse">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-2">🏖️</span>
                      <div className="text-sm text-gray-600 font-medium">Capitola Beach</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Capitola Beach</h3>
                  <p className="text-blue-600 font-medium mb-3">🏄‍♂️ Great for Longboard Learning</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    This charming beach offers mellow waves that are perfect for longboard beginners. 
                    The Capitola pier provides some protection from larger swells, creating a more 
                    controlled learning environment.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">📍 Location</p>
                      <p className="text-gray-600">Capitola Village</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">🌊 Wave Type</p>
                      <p className="text-gray-600">Mellow, longboard-friendly</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Longboard Friendly
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Protected Break
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Scenic Location
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manresa State Beach */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-2">🏞️</span>
                      <div className="text-sm text-gray-600 font-medium">Manresa State Beach</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Manresa State Beach</h3>
                  <p className="text-blue-600 font-medium mb-3">🌊 Less Crowded Alternative</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Located in Aptos, this beach offers a quieter alternative to the more popular spots. 
                    The waves can be inconsistent, but when they're good, they're perfect for beginners 
                    looking for a more peaceful learning environment.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">📍 Location</p>
                      <p className="text-gray-600">Aptos (South County)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">🌊 Wave Type</p>
                      <p className="text-gray-600">Inconsistent but beginner-friendly</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Less Crowded
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      State Park
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Peaceful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Surf Schools */}
        <section id="surf-schools" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏫 Surf Schools & Lessons</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📚 What to Expect in Your First Lesson</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div>
                    <strong>Beach Safety Briefing:</strong> Learn about rip currents, wave patterns, and ocean safety
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div>
                    <strong>Equipment Introduction:</strong> Understanding your board, leash, and wetsuit
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div>
                    <strong>Paddling Technique:</strong> Learn proper paddling form and positioning
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div>
                    <strong>Pop-up Practice:</strong> Master the standing motion on land first
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <div>
                    <strong>Water Practice:</strong> Apply everything you've learned in the water
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Choosing a Surf School</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <div>
                    <strong>Certified Instructors:</strong> Look for CPR and lifeguard certified teachers
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <div>
                    <strong>Small Class Sizes:</strong> 1:4 or 1:6 student-to-instructor ratio is ideal
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <div>
                    <strong>Equipment Included:</strong> Wetsuit, board, and leash should be provided
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <div>
                    <strong>Beginner-Friendly Spots:</strong> Lessons should be at mellow, safe breaks
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <div>
                    <strong>Flexible Scheduling:</strong> Options for different times and weather conditions
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Equipment Guide */}
        <section id="equipment" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏄‍♂️ Essential Equipment for Beginners</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-3">🏄‍♀️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Surfboard</h3>
              <p className="text-gray-600 text-sm mb-3">
                Start with a longboard (9-10 feet) or foam board. These are stable, forgiving, and perfect for learning.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 9-10 foot longboard</li>
                <li>• Foam or soft-top board</li>
                <li>• Wide, thick profile</li>
                <li>• Rounded nose</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-cyan-50 rounded-lg">
              <div className="text-4xl mb-3">🧥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wetsuit</h3>
              <p className="text-gray-600 text-sm mb-3">
                Santa Cruz water is cold year-round. A 4/3mm wetsuit is ideal for most conditions.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 4/3mm thickness</li>
                <li>• Proper fit (snug but not tight)</li>
                <li>• Hood for winter</li>
                <li>• Booties and gloves</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leash & Accessories</h3>
              <p className="text-gray-600 text-sm mb-3">
                Safety first! A good leash keeps you connected to your board and prevents dangerous situations.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Board leash (same length as board)</li>
                <li>• Wax for traction</li>
                <li>• Sunscreen (waterproof)</li>
                <li>• First aid basics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section id="safety-tips" className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚠️ Essential Safety Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌊 Ocean Safety</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Always check surf conditions before entering the water
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Learn to identify and avoid rip currents
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Never surf alone - always have a buddy
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Respect other surfers and follow surf etiquette
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Know your limits and don't push beyond them
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏥 Injury Prevention</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Warm up and stretch before surfing
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Protect your head - know how to fall safely
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Stay hydrated and fueled during long sessions
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Wear sun protection - UV reflects off water
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Listen to your body and rest when needed
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Times to Learn */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⏰ Best Times to Learn</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Seasonal Timing</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🌞 Summer (June - August)</h4>
                  <p className="text-gray-600 text-sm">Warmer water, smaller waves, perfect for beginners</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🍂 Fall (September - November)</h4>
                  <p className="text-gray-600 text-sm">Consistent waves, fewer crowds, great learning conditions</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">❄️ Winter (December - February)</h4>
                  <p className="text-gray-600 text-sm">Larger waves, colder water - better for experienced surfers</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🌸 Spring (March - May)</h4>
                  <p className="text-gray-600 text-sm">Variable conditions, warming water, good for progression</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🕐 Daily Timing</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🌅 Early Morning (6-9 AM)</h4>
                  <p className="text-gray-600 text-sm">Lightest crowds, cleanest conditions, best for learning</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">☀️ Mid-Morning (9-11 AM)</h4>
                  <p className="text-gray-600 text-sm">Good visibility, warming up, moderate crowds</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🌞 Afternoon (11 AM - 3 PM)</h4>
                  <p className="text-gray-600 text-sm">Busiest time, wind can pick up, avoid if possible</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🌆 Evening (3-6 PM)</h4>
                  <p className="text-gray-600 text-sm">Crowds thinning, good light, decent conditions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">More Activity Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tide-pooling-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🐚 Tide Pooling</h3>
              <p className="text-gray-600 text-sm">Explore Santa Cruz's amazing tide pools and marine life</p>
            </Link>
            <Link href="/whale-watching-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🐋 Whale Watching</h3>
              <p className="text-gray-600 text-sm">Best spots and times to see whales in Santa Cruz</p>
            </Link>
            <Link href="/mountain-biking-santa-cruz" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🚵‍♂️ Mountain Biking</h3>
              <p className="text-gray-600 text-sm">Trails and tips for mountain biking in Santa Cruz</p>
            </Link>
          </div>
        </section>

        {/* Back to Guides */}
        <div className="text-center">
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
