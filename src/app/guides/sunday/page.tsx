import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Perfect Sunday in Santa Cruz - Local\'s Guide',
  description: 'Discover how to spend an ideal Sunday in Santa Cruz. From brunch spots to beach walks, farmers markets to sunset dinners - your complete Sunday guide.',
  keywords: ['Sunday Santa Cruz', 'weekend activities', 'brunch Santa Cruz', 'Sunday plans', 'weekend guide'],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I do on a Sunday in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A perfect Sunday in Santa Cruz includes brunch at Zachary's or Picnic Basket (10am-12pm), visiting the Aptos Farmers Market or relaxing at the beach (12pm-5pm), a walk along West Cliff Drive (3pm-5pm), and sunset dinner at Crow's Nest or Dream Inn (5:30pm-7:30pm)."
      }
    },
    {
      "@type": "Question",
      "name": "Where is the best brunch in Santa Cruz on Sunday?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top Sunday brunch spots include Zachary's Restaurant on Pacific Avenue (classic American, expect 20-30 min wait), The Picnic Basket in Seabright (healthy options, less crowded), Walnut Avenue Cafe on the Westside (cozy, creative dishes), and Betty Burgers on Beach Street (casual, kid-friendly)."
      }
    },
    {
      "@type": "Question",
      "name": "Is parking free on Sundays in downtown Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Downtown Santa Cruz parking is free on Sundays, both street parking and city lots. This makes Sunday perfect for exploring Pacific Avenue, brunch, and downtown shops without parking fees."
      }
    },
    {
      "@type": "Question",
      "name": "What time is sunset in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sunset in Santa Cruz varies by season: 5:30pm in winter (December-February) to 8:30pm in summer (June-August). Arrive 30 minutes before sunset for the best light. Check the current sunset time before making dinner reservations."
      }
    }
  ]
};

export default function SundayGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 font-medium mb-8 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 mt-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-4">
            <span>☀️</span>
            <span className="text-sm font-semibold">Relaxed & Rejuvenating</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perfect Sunday in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Slow mornings, sunny afternoons, and stunning sunsets. Here's your ideal Santa Cruz Sunday.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sunday Vibes</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">🥐</div>
              <div className="font-semibold text-gray-900">Lazy Brunch</div>
              <div className="text-sm text-gray-600">10am - 12pm</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌊</div>
              <div className="font-semibold text-gray-900">Beach Time</div>
              <div className="text-sm text-gray-600">12pm - 5pm</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌅</div>
              <div className="font-semibold text-gray-900">Sunset Dinner</div>
              <div className="text-sm text-gray-600">5pm - 7pm</div>
            </div>
          </div>
        </div>

        {/* Morning: Brunch */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🥐</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Morning: Brunch (10am - 12pm)</h2>
              <p className="text-gray-600">Start slow with the best brunch in town</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Brunch Spots</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-900">Zachary's Restaurant</h4>
                  <p className="text-gray-600 text-sm">Pacific Avenue, Downtown</p>
                  <p className="text-gray-700 mt-2">Classic American brunch, famous for their eggs benedict and bloody marys. Expect a wait on Sundays!</p>
                  <p className="text-sm text-gray-600 mt-1">💰 $$ | ⏱️ Usually 20-30 min wait</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900">The Picnic Basket</h4>
                  <p className="text-gray-600 text-sm">Seabright</p>
                  <p className="text-gray-700 mt-2">Healthy, fresh options. Great for vegetarians. Beautiful patio seating.</p>
                  <p className="text-sm text-gray-600 mt-1">💰 $$ | ✅ Less crowded</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-gray-900">Walnut Avenue Cafe</h4>
                  <p className="text-gray-600 text-sm">Westside</p>
                  <p className="text-gray-700 mt-2">Cozy neighborhood spot with creative breakfast dishes and excellent coffee.</p>
                  <p className="text-sm text-gray-600 mt-1">💰 $$ | 🌿 Vegan options</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-bold text-gray-900">Betty Burgers & Concrete Co.</h4>
                  <p className="text-gray-600 text-sm">Beach Street</p>
                  <p className="text-gray-700 mt-2">Casual breakfast sandwiches and milkshakes. Great for families.</p>
                  <p className="text-sm text-gray-600 mt-1">💰 $ | 👨‍👩‍👧 Kid-friendly</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">☕ Coffee First?</h4>
              <p className="text-gray-700 text-sm">
                <strong>Verve Coffee Roasters</strong> (41st Ave) - Best coffee in town, grab a pour-over before brunch<br/>
                <strong>Lulu Carpenter's</strong> (Downtown) - Cozy atmosphere, great for reading the paper
              </p>
            </div>
          </div>
        </section>

        {/* Midday: Farmers Market or Beach */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🥕</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Midday Option A: Farmers Market (12pm - 3pm)</h2>
              <p className="text-gray-600">Open Sundays at Aptos Village Park</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              Every Sunday, the <strong>Aptos Farmers Market</strong> offers fresh produce, local honey, 
              artisan bread, and live music. Perfect for a leisurely stroll.
            </p>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">What to Buy:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>🍓 Fresh strawberries (seasonal)</li>
                <li>🍯 Local honey from Santa Cruz mountains</li>
                <li>🥖 Artisan sourdough from Gayle's Bakery</li>
                <li>🌻 Fresh flowers</li>
                <li>🎵 Enjoy live acoustic music while you browse</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600">
              📍 <strong>Location:</strong> 7960 Soquel Dr, Aptos<br/>
              🕐 <strong>Time:</strong> 10am - 2:30pm every Sunday<br/>
              🅿️ <strong>Parking:</strong> Free in lot
            </p>
          </div>
        </section>

        {/* Midday: Beach */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌊</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Midday Option B: Beach Time (12pm - 5pm)</h2>
              <p className="text-gray-600">Soak up the sun and relax</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Best Sunday Beaches</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-gray-900">Main Beach</h4>
                <p className="text-gray-700 mt-1">Classic Santa Cruz beach. Walk to the Wharf, ice cream at Marini's, people watching.</p>
                <p className="text-sm text-gray-600 mt-1">
                  ✅ Volleyball courts, boardwalk nearby, lifeguards on duty<br/>
                  🅿️ Beach Street parking structure ($2/hr)
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4">
                <h4 className="font-bold text-gray-900">Natural Bridges State Beach</h4>
                <p className="text-gray-700 mt-1">Quieter, great for tide pooling, stunning rock formations.</p>
                <p className="text-sm text-gray-600 mt-1">
                  🌅 Best for sunset<br/>
                  🐕 Dog-friendly (certain areas)<br/>
                  💰 $10 parking fee
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-4">
                <h4 className="font-bold text-gray-900">Capitola Beach</h4>
                <p className="text-gray-700 mt-1">Charming village vibe, calmer water, colorful houses, esplanade for walking.</p>
                <p className="text-sm text-gray-600 mt-1">
                  🍦 Gayle's Bakery nearby for treats<br/>
                  🅿️ Free street parking (can be challenging)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🏖️ What to Bring:</h4>
              <p className="text-gray-700 text-sm">
                Sunscreen, towel, book, water bottle, snacks, light jacket (for later), 
                beach chairs or blanket, umbrella for shade
              </p>
            </div>
          </div>
        </section>

        {/* Afternoon: West Cliff Walk */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🚶</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Afternoon: West Cliff Drive Walk (3pm - 5pm)</h2>
              <p className="text-gray-600">Scenic coastal trail with ocean views</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              The <strong>West Cliff Drive walking/biking path</strong> is quintessential Santa Cruz. 
              Walk from Natural Bridges to the Wharf (2 miles) for stunning coastal views.
            </p>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">What You'll See:</h4>
              <ul className="text-gray-700 space-y-2">
                <li>🏄 <strong>Steamer Lane:</strong> Watch surfers ride the waves</li>
                <li>🦭 <strong>Seal Rock:</strong> Harbor seals basking in the sun</li>
                <li>🗿 <strong>Lighthouse:</strong> Historic Santa Cruz Lighthouse & Surfing Museum</li>
                <li>🌊 <strong>The Hook:</strong> Popular surf spot, beautiful cove</li>
                <li>🎨 <strong>Dream Inn:</strong> Stop for a drink with ocean views</li>
              </ul>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Pro tip:</strong> Park at Natural Bridges and walk one direction, 
              or do an out-and-back. Sunset views are incredible from here.
            </p>
          </div>
        </section>

        {/* Evening: Sunset Dinner */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌅</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Evening: Sunset Dinner (5:30pm - 7:30pm)</h2>
              <p className="text-gray-600">End your Sunday with a beautiful meal</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Restaurants with Sunset Views</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-bold text-gray-900">Crow's Nest</h4>
                <p className="text-gray-600 text-sm">Santa Cruz Harbor</p>
                <p className="text-gray-700 mt-2">Direct harbor views, seafood-focused, casual upscale. Their patio is perfect for sunset.</p>
                <p className="text-sm text-gray-600 mt-1">
                  💰 $$$ | 🦞 Seafood specialty | 📅 Reservations recommended for window seats
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold text-gray-900">Aldo's Harbor Restaurant</h4>
                <p className="text-gray-600 text-sm">Santa Cruz Harbor</p>
                <p className="text-gray-700 mt-2">Italian seafood, outdoor deck overlooking boats. Romantic atmosphere.</p>
                <p className="text-sm text-gray-600 mt-1">
                  💰 $$$ | 🍝 Italian-American | 🌅 Best sunset deck
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-bold text-gray-900">The Dream Inn</h4>
                <p className="text-gray-600 text-sm">Cowell Beach</p>
                <p className="text-gray-700 mt-2">Aquarius restaurant has floor-to-ceiling windows facing the ocean. Modern California cuisine.</p>
                <p className="text-sm text-gray-600 mt-1">
                  💰 $$$$ | 🍷 Wine bar downstairs | ✨ Upscale
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-gray-900">Zelda's on the Beach</h4>
                <p className="text-gray-600 text-sm">Main Beach</p>
                <p className="text-gray-700 mt-2">Right on the sand, casual atmosphere, great for families. Beachfront patio.</p>
                <p className="text-sm text-gray-600 mt-1">
                  💰 $$ | 👨‍👩‍👧 Kid-friendly | 🌊 Beach access
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🌅 Sunset Timing:</h4>
              <p className="text-gray-700 text-sm">
                Sunset in Santa Cruz ranges from 5:30pm (winter) to 8:30pm (summer). 
                Arrive 30 minutes before for best light. Check today's sunset time before making reservations!
              </p>
            </div>
          </div>
        </section>

        {/* Budget Breakdown */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Sunday Budget</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Relaxed Sunday ($60-120 per person)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>☕ Coffee: $5</li>
                <li>🥐 Brunch: $20-35</li>
                <li>🌊 Beach: FREE</li>
                <li>🚶 West Cliff Walk: FREE</li>
                <li>🍽️ Sunset Dinner: $35-80</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Budget Sunday ($30-50 per person)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🥐 Brunch at home or cafe: $10-15</li>
                <li>🥕 Farmers Market: $15-20</li>
                <li>🌊 Beach picnic: $5-10</li>
                <li>🚶 West Cliff Walk: FREE</li>
                <li>🍕 Casual dinner (Pizza My Heart, etc.): $10-20</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Sunday Pro Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⏰ Timing</h3>
              <p className="text-sm text-gray-700">
                Brunch spots get busy 11am-1pm. Arrive by 10:30am or go after 1:30pm to avoid waits.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🅿️ Parking</h3>
              <p className="text-sm text-gray-700">
                Downtown parking is free on Sundays! Take advantage for brunch and walking around Pacific Avenue.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🌤️ Weather</h3>
              <p className="text-sm text-gray-700">
                Sundays can be foggy in the morning. It usually burns off by noon. Bring layers!
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📅 Reservations</h3>
              <p className="text-sm text-gray-700">
                For sunset dinners with views, book ahead (especially Crow's Nest and Dream Inn).
              </p>
            </div>
          </div>
        </section>

        {/* Alternative Sundays */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Alternative Sunday Themes</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-gray-900">Active Sunday</h3>
              <p className="text-gray-700">Kayak at the harbor → Bike West Cliff Drive → Yoga at sunset</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-gray-900">Cultural Sunday</h3>
              <p className="text-gray-700">MAH Museum → Farmers Market → Live music downtown → Art galleries</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900">Nature Sunday</h3>
              <p className="text-gray-700">Henry Cowell hike → Picnic lunch → Natural Bridges tide pools → Sunset at Lighthouse Point</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold text-gray-900">Cozy Sunday</h3>
              <p className="text-gray-700">Bookshop Santa Cruz browsing → Cafe reading → Matinee movie → Comfort food dinner</p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">More Santa Cruz Guides</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/guides/full-day" className="text-purple-600 hover:text-purple-800 font-medium">
              → Full Day in Santa Cruz
            </Link>
            <Link href="/guides/date-night" className="text-purple-600 hover:text-purple-800 font-medium">
              → Date Night Guide
            </Link>
            <Link href="/guides/family-day" className="text-purple-600 hover:text-purple-800 font-medium">
              → Family Day Itinerary
            </Link>
            <Link href="/restaurants" className="text-purple-600 hover:text-purple-800 font-medium">
              → All Restaurants
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

