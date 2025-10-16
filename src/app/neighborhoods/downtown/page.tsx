import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Downtown Santa Cruz Guide: Shopping, Dining & Things to Do | 2025',
  description: 'Complete guide to downtown Santa Cruz on Pacific Avenue. Best restaurants, shops, bars, events, and local tips for exploring the heart of Santa Cruz.',
  keywords: ['downtown santa cruz', 'pacific avenue santa cruz', 'santa cruz shopping', 'santa cruz downtown restaurants', 'things to do downtown santa cruz'],
};

const neighborhoodSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Downtown Santa Cruz",
  "description": "The vibrant heart of Santa Cruz with Pacific Avenue shops, restaurants, bars, and street performers",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pacific Avenue",
    "addressLocality": "Santa Cruz",
    "addressRegion": "CA",
    "postalCode": "95060",
    "addressCountry": "US"
  }
};

export default function DowntownPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }} />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">🏙️</span>
              <span className="font-semibold">Neighborhood Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Downtown Santa Cruz
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              The beating heart of Santa Cruz. Pacific Avenue's shops, restaurants, street performers, and vibrant local culture.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          {/* Quick Facts */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-bold text-blue-600 mb-2">🎯 Best For</div>
                <p className="text-gray-700">Shopping, dining, nightlife, events, people-watching</p>
              </div>
              
              <div>
                <div className="font-bold text-blue-600 mb-2">👥 Vibe</div>
                <p className="text-gray-700">Eclectic, artsy, college-town energy, local businesses</p>
              </div>
              
              <div>
                <div className="font-bold text-blue-600 mb-2">🚶 Walkability</div>
                <p className="text-gray-700">Excellent! Everything within 3-4 blocks, pedestrian-friendly</p>
              </div>
              
              <div>
                <div className="font-bold text-blue-600 mb-2">🅿️ Parking</div>
                <p className="text-gray-700">Lots: Louden Nelson ($1.50/hr), Lot 4 (1st hr free). Street: 2-hr meters</p>
              </div>
            </div>
          </div>

          {/* Main Attractions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Main Attractions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Pacific Avenue</h3>
                <p className="text-gray-700 mb-3">
                  The main pedestrian-friendly street. Tree-lined, outdoor dining, street performers, local shops. 
                  Feels like a European boulevard meets California beach town.
                </p>
                <div className="bg-blue-50 rounded p-4">
                  <strong>Don't Miss:</strong> First Friday Art Walk (1st Friday of month, 5-9pm) — galleries open, 
                  food trucks, music, art sales
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Cooper Street</h3>
                <p className="text-gray-700">
                  Quieter side street with hidden gems: vintage shops, art galleries, cozy cafes. Less touristy, more local.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Cedar Street</h3>
                <p className="text-gray-700">
                  Connects downtown to ocean. More residential feel, local restaurants, farmer's market on Wednesdays.
                </p>
              </div>
            </div>
          </div>

          {/* Dining */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🍽️ Where to Eat</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Upscale Dining</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Laili Restaurant</strong> — Afghan, beautiful patio, romantic ($$)</li>
                  <li><strong>Oswald</strong> — Seasonal California, wine bar ($$$)</li>
                  <li><strong>Assembly</strong> — Creative comfort food, craft cocktails ($$$)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Casual Favorites</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Picnic Basket</strong> — Sandwiches, salads, quick lunch ($)</li>
                  <li><strong>Betty Burgers</strong> — Gourmet burgers, local favorite ($)</li>
                  <li><strong>Pizza My Heart</strong> — Slices, late-night fuel ($)</li>
                  <li><strong>Tacos Moreno</strong> — Authentic Mexican, generous portions ($)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Coffee & Treats</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Verve Coffee</strong> — Local roaster, hip atmosphere</li>
                  <li><strong>Cat & Cloud</strong> — Specialty coffee, friendly vibes</li>
                  <li><strong>Penny Ice Creamery</strong> — Artisan ice cream, seasonal flavors</li>
                  <li><strong>Kelly's French Bakery</strong> — Fresh pastries, breakfast</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shopping */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🛍️ Shopping</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-purple-600 mb-3">Bookstores</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Bookshop Santa Cruz</strong> — Independent, huge selection, events</li>
                  <li><strong>Logo's</strong> — Used books, vinyl, local institution</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-purple-600 mb-3">Local Shops</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>O'Neill Surf Shop</strong> — Original flagship store</li>
                  <li><strong>Camouflage</strong> — Vintage clothing</li>
                  <li><strong>Streetlight Records</strong> — Vinyl, CDs, music</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-purple-600 mb-3">Art Galleries</h4>
                <p className="text-gray-700">Multiple galleries on Pacific Ave. Best during First Friday Art Walk.</p>
              </div>

              <div>
                <h4 className="font-bold text-purple-600 mb-3">Farmers Market</h4>
                <p className="text-gray-700">
                  <strong>Wednesdays, 2:30-6:30pm</strong><br/>
                  Lincoln & Cedar streets. Fresh produce, prepared foods, live music.
                </p>
              </div>
            </div>
          </div>

          {/* Nightlife */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌙 Nightlife & Entertainment</h2>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Live Music</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Kuumbwa Jazz Center</strong> — World-class jazz, intimate venue</li>
                  <li><strong>Catalyst</strong> — Live bands, DJs, dancing</li>
                  <li><strong>Moe's Alley</strong> — Blues, funk, local music</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Bars & Breweries</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Seabright Brewery</strong> — Local craft beer, food</li>
                  <li><strong>515 Kitchen & Cocktails</strong> — Upscale cocktails</li>
                  <li><strong>The Crepe Place</strong> — Bohemian vibe, live music, crepes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Local Tips</h2>
            
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🅿️</span>
                <div>
                  <strong>Best Parking:</strong> Louden Nelson Center lot (301 Center St) — $1.50/hr, covered. 
                  Or Lot 4 (Cedar & Locust) — first hour free.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <strong>Best Times:</strong> Weekday mornings (coffee & browsing), First Friday (art & community), 
                  Saturday afternoons (busiest, most energy).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🚶</span>
                <div>
                  <strong>Walking:</strong> Pacific Avenue is pedestrian-friendly. Walk from Water St to Cathcart St (6 blocks) 
                  to see everything.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">👮</span>
                <div>
                  <strong>Safety:</strong> Generally safe, but be aware at night. Stick to well-lit areas. 
                  Some homelessness visible but usually non-threatening.
                </div>
              </li>
            </ul>
          </div>

          {/* Related */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Neighborhoods</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/neighborhoods/westside" className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-3xl mb-2">🌊</div>
                <div className="font-bold text-gray-900 mb-1">Westside</div>
                <div className="text-gray-600 text-sm">Beaches & coastal living</div>
              </Link>
              
              <Link href="/neighborhoods/capitola" className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-3xl mb-2">🏘️</div>
                <div className="font-bold text-gray-900 mb-1">Capitola Village</div>
                <div className="text-gray-600 text-sm">Charming beach town</div>
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
    </>
  );
}

