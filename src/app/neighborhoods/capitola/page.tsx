import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Capitola Village Guide: Beach Town Charm & Venetian Court | 2025',
  description: 'Complete guide to Capitola Village, CA. Colorful beach houses, Shadowbrook restaurant, boutique shopping, and small-town charm near Santa Cruz.',
  keywords: ['capitola village', 'capitola beach', 'shadowbrook restaurant', 'capitola shopping', 'venetian court capitola'],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Capitola Village known for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capitola Village is known for its colorful Venetian Court beach houses (Instagram-famous), charming esplanade along the beach, boutique shopping, Shadowbrook Restaurant (cable car dining), and small-town beach atmosphere. It's California's oldest seaside resort town, founded in 1874."
      }
    },
    {
      "@type": "Question",
      "name": "Is Capitola Beach good for swimming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Capitola Beach is protected by a jetty, making it calmer than open ocean beaches. It's family-friendly with gentle waves, lifeguards in summer, and shallow areas perfect for kids. The beach is sandy and clean. Nearby amenities include restaurants, restrooms, and parking (though parking can be challenging)."
      }
    },
    {
      "@type": "Question",
      "name": "Where should I eat in Capitola Village?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top Capitola restaurants: Shadowbrook (romantic, cable car entrance, creekside setting), Paradise Sushi (fresh, local favorite), Zelda's (beachfront, casual), Mr. Toots Coffeehouse (breakfast, patio), Gayle's Bakery (nearby, must-visit for pastries and bread). Reserve ahead for Shadowbrook on weekends."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get to Capitola Village from Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capitola Village is 5 miles east of Santa Cruz, about 10-15 minutes by car via Highway 1 or scenic East Cliff Drive coastal route. Free parking is limited (street parking fills fast). Paid lots available. You can also bike via the coastal path or take the Santa Cruz Metro bus (routes 54, 55)."
      }
    }
  ]
};

export default function CapitolaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🏘️</span>
            <span className="font-semibold">Neighborhood Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Capitola Village
          </h1>
          
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Charming beach village with colorful Venetian Court, boutique shops, and California's oldest seaside resort.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Facts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold text-pink-600 mb-2">🎯 Best For</div>
              <p className="text-gray-700">Beach time, romantic dining, boutique shopping, photography</p>
            </div>
            
            <div>
              <div className="font-bold text-pink-600 mb-2">👥 Vibe</div>
              <p className="text-gray-700">Quaint, European feel, Instagram-worthy, relaxed elegance</p>
            </div>
            
            <div>
              <div className="font-bold text-pink-600 mb-2">🚶 Walkability</div>
              <p className="text-gray-700">Perfect! Everything within 2-3 blocks, very pedestrian-friendly</p>
            </div>
            
            <div>
              <div className="font-bold text-pink-600 mb-2">🅿️ Parking</div>
              <p className="text-gray-700">Village lot ($2/hr), street (competitive), arrive early weekends</p>
            </div>
          </div>
        </div>

        {/* Main Attractions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Must-See Attractions</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-pink-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Venetian Court</h3>
              <p className="text-gray-700 mb-3">
                The icon of Capitola. Colorful Mediterranean-style condos built in 1920s. Most photographed spot on the Central Coast.
              </p>
              <div className="bg-pink-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Instagram Gold:</strong> Bright pink, yellow, blue facades</li>
                  <li>• <strong>History:</strong> 1924, California's first condominium complex</li>
                  <li>• <strong>Private:</strong> Can't go inside, but beach/esplanade views are perfect</li>
                  <li>• <strong>Best Photo:</strong> From beach or wharf at sunset</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-rose-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Capitola Beach</h3>
              <p className="text-gray-700 mb-3">
                Protected cove, perfect for families. Warmer water than most Santa Cruz beaches.
              </p>
              <div className="bg-rose-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Protected Cove:</strong> Gentle waves, good for kids</li>
                  <li>• <strong>Sandy Beach:</strong> Build sandcastles, volleyball</li>
                  <li>• <strong>Esplanade:</strong> Paved walkway along beach with restaurants</li>
                  <li>• <strong>Facilities:</strong> Restrooms, outdoor showers, lifeguard (summer)</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Capitola Wharf</h3>
              <p className="text-gray-700 mb-3">
                Historic fishing wharf, restaurants, and boat rentals.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Fishing:</strong> Public fishing (license required)</li>
                  <li>• <strong>Boat Rentals:</strong> Kayaks, paddleboards, boats</li>
                  <li>• <strong>Restaurant:</strong> Wharf House (seafood, views)</li>
                  <li>• <strong>Free:</strong> Walk on wharf anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dining */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🍽️ Where to Eat</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Must-Experience Dining:</h4>
              <div className="space-y-3">
                <div>
                  <strong className="text-purple-900">Shadowbrook Restaurant</strong>
                  <p className="text-sm text-gray-700">
                    THE iconic Capitola experience. Arrive by cable car, dine creekside in gardens. 
                    Romantic, upscale. Reservations essential. $$$$
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <strong>Zelda's on the Beach</strong>
                <p className="text-sm text-gray-700">Right on beach, patio dining, California coastal cuisine, great sunset spot ($$)</p>
              </div>
              <div>
                <strong>Gayle's Bakery & Rosticceria</strong>
                <p className="text-sm text-gray-700">Local institution! Amazing baked goods, deli, prepared foods. Always busy. ($)</p>
              </div>
              <div>
                <strong>Margarita's</strong>
                <p className="text-sm text-gray-700">Mexican, margaritas, village atmosphere, patio seating ($$)</p>
              </div>
              <div>
                <strong>Mr. Toots Coffeehouse</strong>
                <p className="text-sm text-gray-700">Coffee, pastries from Gayle's, village charm, morning hangout ($)</p>
              </div>
              <div>
                <strong>Paradise Beach Grille</strong>
                <p className="text-sm text-gray-700">Casual beachfront, breakfast/lunch, outdoor seating ($)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛍️ Shopping</h2>
          
          <p className="text-gray-700 mb-4">
            Capitola Village has charming boutiques, art galleries, and unique shops. Most are along Capitola Avenue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-lg p-4">
              <h4 className="font-bold text-pink-900 mb-2">Boutiques & Gifts</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Local jewelry & art</li>
                <li>• Beach-themed decor</li>
                <li>• Women's clothing boutiques</li>
                <li>• Gift shops</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-bold text-purple-900 mb-2">Art & Galleries</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Local artist galleries</li>
                <li>• Photography</li>
                <li>• Handmade crafts</li>
                <li>• Unique souvenirs</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <strong className="text-blue-900">Art & Wine Festival:</strong> September (huge annual event, 2 days, 200+ artists, wine tasting)
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Things to Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-50 rounded-lg p-4">
              <h4 className="font-bold text-cyan-900 mb-2">🚣 Water Activities</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Kayak rentals</li>
                <li>• Paddleboard rentals</li>
                <li>• Boat tours</li>
                <li>• Swimming (protected cove)</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">🎣 Fishing</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Wharf fishing</li>
                <li>• Rock fishing</li>
                <li>• License required</li>
                <li>• Bait shop on wharf</li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <h4 className="font-bold text-pink-900 mb-2">📸 Photography</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Venetian Court (iconic)</li>
                <li>• Sunset on beach</li>
                <li>• Colorful buildings</li>
                <li>• Wharf perspectives</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="font-bold text-amber-900 mb-2">🌊 Beach Time</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sunbathing</li>
                <li>• Sandcastle building</li>
                <li>• Beach volleyball</li>
                <li>• Picnicking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Local Tips */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Local Tips</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🅿️</span>
              <div>
                <strong>Parking Strategy:</strong> Arrive before 10am on weekends. Village lot ($2/hr) fills fast. 
                Street parking very competitive. Consider biking or Uber from Santa Cruz.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🍽️</span>
              <div>
                <strong>Shadowbrook Reservations:</strong> Book 1-2 weeks ahead for weekends. Request outdoor patio 
                (creekside) or terrace. Arrive 15 min early to ride the cable car down!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📸</span>
              <div>
                <strong>Best Photo Time:</strong> Late afternoon/sunset for Venetian Court. Morning for fewer people. 
                High tide = water close to colorful houses (dramatic).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <strong>Family-Friendly:</strong> Capitola Beach is perfect for kids (protected, shallow, sandy). 
                Gayle's Bakery for treats. Ice cream shops on village.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <strong>Events:</strong> Art & Wine Festival (September, huge!), Begonia Festival (September, boat parade), 
                Twilight Concerts (summer Fridays, free, Esplanade Park).
              </div>
            </li>
          </ul>
        </div>

        {/* Getting There */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚗 Getting to Capitola</h2>
          
          <div className="space-y-3 text-gray-700">
            <div>
              <strong>From Santa Cruz:</strong> 5 miles, 10 minutes via Highway 1 south
            </div>
            <div>
              <strong>From San Jose:</strong> 40 miles, 50 minutes via Highway 17 → Highway 1
            </div>
            <div>
              <strong>From Monterey:</strong> 40 miles, 50 minutes via Highway 1 north
            </div>
            <div className="bg-blue-50 rounded p-3 mt-4">
              <strong>💡 Local Bus:</strong> Santa Cruz Metro route 54 connects downtown Santa Cruz to Capitola Village
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Neighborhoods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/neighborhoods/downtown" className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏙️</div>
              <div className="font-bold text-gray-900 mb-1">Downtown Santa Cruz</div>
              <div className="text-gray-600 text-sm">Shopping & dining</div>
            </Link>
            
            <Link href="/neighborhoods/westside" className="bg-cyan-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🌊</div>
              <div className="font-bold text-gray-900 mb-1">Westside</div>
              <div className="text-gray-600 text-sm">Beaches & surfing</div>
            </Link>

            <Link href="/neighborhoods/harbor" className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">⚓</div>
              <div className="font-bold text-gray-900 mb-1">Seabright/Harbor</div>
              <div className="text-gray-600 text-sm">Working waterfront</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

