import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '3 Hours Free in Santa Cruz: Perfect Quick Visit Guide | 2025',
  description: 'Make the most of 3 hours in Santa Cruz! Beach walk, downtown lunch, and scenic views. Complete itinerary with parking, timing, and insider tips.',
  keywords: ['3 hours santa cruz', 'quick visit santa cruz', 'half day santa cruz', 'santa cruz morning', 'santa cruz afternoon'],
  openGraph: {
    title: '3 Hours Free in Santa Cruz: Complete Quick Visit Guide',
    description: 'Beach walk, downtown lunch, and scenic views—all in 3 hours. Perfect for a morning or afternoon visit.',
  },
};

// FAQ Schema for SEO
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Spend 3 Hours in Santa Cruz",
  "description": "Complete guide for a perfect 3-hour visit to Santa Cruz",
  "totalTime": "PT3H",
  "step": [
    {
      "@type": "HowToStep",
      "name": "West Cliff Drive Coastal Walk",
      "text": "Start with a 45-minute walk along West Cliff Drive for ocean views, seal spotting, and lighthouse photos. Park at Natural Bridges ($10) or find street parking (free 2-hour limit)."
    },
    {
      "@type": "HowToStep",
      "name": "Downtown Lunch & Shopping",
      "text": "Spend 1.5 hours exploring downtown Pacific Avenue. Enjoy lunch at Picnic Basket, Laili, or Betty Burgers. Browse Bookshop Santa Cruz, O'Neill Surf Shop, and local boutiques. Park at Louden Nelson Center ($1.50/hr)."
    },
    {
      "@type": "HowToStep",
      "name": "Santa Cruz Wharf or Beach Time",
      "text": "End with 45 minutes at the historic Santa Cruz Wharf to see sea lions and shops, or relax on Main Beach. Both options are free to access."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can I do in 3 hours in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 3 hours, you can enjoy West Cliff Drive coastal walk (45 min), explore downtown Pacific Avenue shops and cafes (1.5 hours), and visit Natural Bridges or the Wharf (45 min). This gives you a great taste of Santa Cruz's beach town vibe."
      }
    },
    {
      "@type": "Question",
      "name": "Where should I park for a 3-hour Santa Cruz visit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For West Cliff Drive, park at Natural Bridges ($10) or find street parking on West Cliff Drive (free 2-hour limit). For downtown, use Louden Nelson Center lot ($1.50/hr) or Lot 4 on Cedar/Locust (first hour free)."
      }
    },
    {
      "@type": "Question",
      "name": "Is 3 hours enough to see Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 hours gives you a wonderful introduction to Santa Cruz. You'll see the coast, experience downtown, and get a feel for the town. However, plan a full day if you want to visit the Boardwalk, beaches, or surrounding redwood areas."
      }
    }
  ]
};

export default function ThreeHoursPage() {
  return (
    <>
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">⏱️</span>
              <span className="font-semibold">3-Hour Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              3 Hours Free in Santa Cruz
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Perfect for a morning or afternoon visit. See the coast, explore downtown, and grab a great meal.
            </p>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📋</span>
              Quick Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900">Total Time</div>
                <div className="text-gray-600">3 hours</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl mb-2">💰</div>
                <div className="font-bold text-gray-900">Budget</div>
                <div className="text-gray-600">$15-40</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-4xl mb-2">🚶</div>
                <div className="font-bold text-gray-900">Activity Level</div>
                <div className="text-gray-600">Light walking</div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="space-y-8">
            {/* Stop 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">FIRST 45 MINUTES</div>
                    <h3 className="text-2xl font-bold">West Cliff Drive Coastal Walk</h3>
                  </div>
                  <div className="text-5xl">🌊</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  Start your Santa Cruz adventure with a stunning coastal walk along West Cliff Drive. 
                  This paved path offers incredible ocean views, lighthouse photo ops, and seal spotting.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">📍 Where to Start</div>
                    <p className="text-gray-700">Natural Bridges State Beach parking lot or Lighthouse Point</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">🅿️ Parking</div>
                    <p className="text-gray-700">Natural Bridges: $10/day<br/>Street parking: Free (2-hr limit)</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <div className="font-semibold text-blue-900 mb-2">💡 Insider Tip</div>
                  <p className="text-blue-800">
                    Walk west-to-east for sun at your back in afternoon. Look for sea otters and seals in the kelp beds. 
                    Best time: Morning (fewer crowds) or late afternoon (sunset views).
                  </p>
                </div>
              </div>
            </div>

            {/* Stop 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">NEXT 1.5 HOURS</div>
                    <h3 className="text-2xl font-bold">Downtown Pacific Avenue</h3>
                  </div>
                  <div className="text-5xl">🍽️</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  Head downtown for lunch, shopping, and exploring. Pacific Avenue is the heart of Santa Cruz 
                  with local shops, cafes, street performers, and a vibrant atmosphere.
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">🍴 Lunch Recommendations</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Picnic Basket</div>
                      <p className="text-gray-600">Fresh sandwiches, salads • $12-18 • Quick service</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Laili Restaurant</div>
                      <p className="text-gray-600">Afghan cuisine • $15-25 • Sit-down</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900">Betty Burgers</div>
                      <p className="text-gray-600">Gourmet burgers • $12-16 • Casual</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">🛍️ Quick Browse</h4>
                  <p className="text-gray-700">
                    Bookshop Santa Cruz (local favorite) • O'Neill Surf Shop • Logo's bookstore • 
                    Local boutiques and galleries
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">🅿️ Parking Options</div>
                  <p className="text-gray-700">
                    <strong>Best:</strong> Louden Nelson Center (301 Center St) - $1.50/hr<br/>
                    <strong>Free 1st hour:</strong> Lot 4 (Cedar & Locust)<br/>
                    <strong>Street:</strong> 2-hour meters on Pacific Ave
                  </p>
                </div>
              </div>
            </div>

            {/* Stop 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90 mb-1">FINAL 45 MINUTES</div>
                    <h3 className="text-2xl font-bold">Santa Cruz Wharf or Beach Time</h3>
                  </div>
                  <div className="text-5xl">🏖️</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-4">
                  End your visit with a stroll on the historic Santa Cruz Wharf or relax on Main Beach.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
                    <h4 className="font-bold text-teal-900 mb-2">Option A: The Wharf</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Walk the historic pier (0.5 miles)</li>
                      <li>• See sea lions under the wharf</li>
                      <li>• Browse gift shops</li>
                      <li>• Grab ice cream or coffee</li>
                      <li>• Free to walk</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-900 mb-2">Option B: Main Beach</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Wide sandy beach</li>
                      <li>• Great for photos</li>
                      <li>• Watch surfers</li>
                      <li>• Boardwalk views</li>
                      <li>• Free beach access</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <div className="font-semibold text-green-900 mb-2">🍦 Sweet Ending</div>
                  <p className="text-green-800">
                    Penny Ice Creamery (downtown) or Marini's Candies (wharf) for a final Santa Cruz treat!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>💰</span>
              Budget Breakdown
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Parking</span>
                <span className="font-semibold">$0-10</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Lunch</span>
                <span className="font-semibold">$12-25</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Treats/Coffee</span>
                <span className="font-semibold">$3-5</span>
              </div>
              <div className="flex justify-between py-3 bg-gray-50 rounded px-4 font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">$15-40</span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What can I do in 3 hours in Santa Cruz?
                </h3>
                <p className="text-gray-700">
                  In 3 hours, you can enjoy West Cliff Drive coastal walk (45 min), explore downtown Pacific Avenue 
                  shops and cafes (1.5 hours), and visit Natural Bridges or the Wharf (45 min). This gives you a 
                  great taste of Santa Cruz's beach town vibe.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Where should I park for a 3-hour Santa Cruz visit?
                </h3>
                <p className="text-gray-700">
                  For West Cliff Drive, park at Natural Bridges ($10) or find street parking on West Cliff Drive 
                  (free 2-hour limit). For downtown, use Louden Nelson Center lot ($1.50/hr) or Lot 4 on Cedar/Locust 
                  (first hour free).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is 3 hours enough to see Santa Cruz?
                </h3>
                <p className="text-gray-700">
                  3 hours gives you a wonderful introduction to Santa Cruz. You'll see the coast, experience downtown, 
                  and get a feel for the town. However, plan a full day if you want to visit the Boardwalk, beaches, 
                  or surrounding redwood areas.
                </p>
              </div>
            </div>
          </div>

          {/* Related Guides */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore More Santa Cruz
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/guides/6-hours"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">⏰</div>
                <div className="font-bold text-gray-900 mb-1">6 Hours Free</div>
                <div className="text-gray-600 text-sm">Add beaches, boardwalk, or hiking</div>
              </Link>
              
              <Link
                href="/neighborhoods/downtown"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">🏙️</div>
                <div className="font-bold text-gray-900 mb-1">Downtown Guide</div>
                <div className="text-gray-600 text-sm">Explore Pacific Avenue</div>
              </Link>

              <Link
                href="/restaurants"
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">🍽️</div>
                <div className="font-bold text-gray-900 mb-1">All Restaurants</div>
                <div className="text-gray-600 text-sm">Find the perfect lunch spot</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

