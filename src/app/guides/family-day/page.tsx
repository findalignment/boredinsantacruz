import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Family Day in Santa Cruz: Kid-Friendly Activities & Fun | 2025',
  description: 'Perfect 4-hour family itinerary in Santa Cruz! Beach Boardwalk, kid-friendly restaurants, playgrounds, and activities the whole family will love.',
  keywords: ['santa cruz with kids', 'family activities santa cruz', 'kid friendly santa cruz', 'santa cruz boardwalk kids', 'family day santa cruz'],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Plan a Perfect Family Day in Santa Cruz",
  "description": "Complete 4-hour family itinerary with kid-friendly activities",
  "totalTime": "PT4H",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Morning: Beach Boardwalk",
      "text": "Spend 2-2.5 hours at the Santa Cruz Beach Boardwalk. Start with Kid's Kingdom rides for toddlers, then the Giant Dipper for older kids. Play arcade games and enjoy the beach. Parking: Beach Street structure ($25/day). Arrive when it opens to avoid crowds."
    },
    {
      "@type": "HowToStep",
      "name": "Lunch: Family-Friendly Dining",
      "text": "Take 1 hour for lunch at kid-friendly spots: Zelda's on the Beach (beachfront, casual), Betty Burgers (burgers and milkshakes), Paradise Beach Grille (kids menu), or Pizza My Heart (by the slice). All have high chairs and relaxed atmospheres."
    },
    {
      "@type": "HowToStep",
      "name": "Afternoon: Beach or Exploration",
      "text": "Finish with 30-60 minutes on Main Beach for sandcastles and splashing, or visit the Santa Cruz Wharf to see sea lions (kids love them!). Alternative: Seymour Marine Discovery Center for touch tanks and marine exhibits ($10 adults, $6 kids)."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best family-friendly activities in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top family activities include the Santa Cruz Beach Boardwalk (rides and games), Main Beach (swimming and sandcastles), Seymour Marine Discovery Center (touch tanks, whale exhibits), Natural Bridges State Beach (tide pools), and Roaring Camp Railroads (scenic train rides through redwoods)."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Santa Cruz Beach Boardwalk good for toddlers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The Boardwalk has a Kid's Kingdom section with age-appropriate rides for toddlers and young children, plus the beach and arcade. Height requirements vary by ride. Wristbands offer unlimited rides. Best to visit on weekdays for smaller crowds."
      }
    },
    {
      "@type": "Question",
      "name": "Where are the best kid-friendly restaurants in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Family-friendly restaurants include Betty Burgers (burgers and milkshakes), Zelda's on the Beach (beachfront, casual), Paradise Beach Grille (kids menu, ocean views), Pizza My Heart (pizza by the slice), and The Picnic Basket (healthy options, outdoor seating)."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a family day at the Santa Cruz Beach Boardwalk cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beach access is free. Boardwalk rides cost $4-8 per ride, or unlimited ride wristbands are $40-50 (varies by season). Budget $100-150 for a family of 4 including rides, food, and parking ($25/day). Check for special discount days and online coupons."
      }
    }
  ]
};

export default function FamilyDayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <span className="font-semibold">Family Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Family Day in Santa Cruz
          </h1>
          
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
            4 hours of family fun! Beach, boardwalk, playground, and kid-friendly dining. Perfect for all ages.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect Family Day</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="font-bold text-gray-900 text-sm">Duration</div>
              <div className="text-gray-600 text-sm">4 hours</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-bold text-gray-900 text-sm">Budget</div>
              <div className="text-gray-600 text-sm">$80-150</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-2">👶</div>
              <div className="font-bold text-gray-900 text-sm">Best Ages</div>
              <div className="text-gray-600 text-sm">All ages!</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🎢</div>
              <div className="font-bold text-gray-900 text-sm">Energy</div>
              <div className="text-gray-600 text-sm">Moderate</div>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="space-y-6">
          {/* Hour 1-2: Boardwalk */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90">HOURS 1-2</div>
                  <h3 className="text-xl font-bold">Beach Boardwalk Fun</h3>
                </div>
                <div className="text-4xl">🎢</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Start with California's classic seaside amusement park. Rides for all ages, arcade games, and beach access.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">Little Kids (2-7)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Looff Carousel (historic, beautiful)</li>
                    <li>• Mini Golf</li>
                    <li>• Bulgy the Whale ride</li>
                    <li>• Pirate Ship (mild)</li>
                    <li>• Kiddie rides area</li>
                  </ul>
                </div>

                <div className="bg-pink-50 rounded-lg p-4">
                  <h4 className="font-bold text-pink-900 mb-2">Big Kids (8+)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Giant Dipper (classic coaster)</li>
                    <li>• Logger's Revenge (water ride)</li>
                    <li>• Sea Swings</li>
                    <li>• Arcade (tons of games)</li>
                    <li>• Beach volleyball</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-4">
                <strong className="text-blue-900">💰 Cost Tips:</strong>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• All-day wristband: $45-65 (best value for 2+ hours)</li>
                  <li>• Individual rides: $5-10 each (if doing just a few)</li>
                  <li>• FREE: Walking boardwalk, beach access, watching rides</li>
                  <li>• Tip: Eat before/after, boardwalk food is pricey</li>
                </ul>
              </div>

              <div className="text-sm text-gray-600">
                <strong>Parking:</strong> Boardwalk lot $15-25 or nearby street (meters, 2-hr limit)
              </div>
            </div>
          </div>

          {/* Hour 2.5: Beach Time */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90">30 MINUTES</div>
                  <h3 className="text-xl font-bold">Main Beach Play</h3>
                </div>
                <div className="text-4xl">🏖️</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Let kids run and play on the sand! Wide beach right next to Boardwalk.
              </p>

              <div className="bg-cyan-50 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-cyan-900 mb-2">Beach Activities:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Sandcastle building</strong> — Bring bucket & shovel or buy at boardwalk</li>
                  <li>• <strong>Wade in water</strong> — Supervised, waves can be strong</li>
                  <li>• <strong>Flying kites</strong> — Boardwalk shops sell them</li>
                  <li>• <strong>Beach volleyball</strong> — Courts available, free</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                <strong className="text-amber-900">⚠️ Safety:</strong> Always supervise kids near water. 
                Strong rip currents. Lifeguards in summer only. Bring sunscreen!
              </div>
            </div>
          </div>

          {/* Hour 3: Lunch */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90">HOUR 3</div>
                  <h3 className="text-xl font-bold">Family-Friendly Lunch</h3>
                </div>
                <div className="text-4xl">🍕</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Kid-approved restaurants near the beach with quick service and reasonable prices.
              </p>

              <div className="space-y-3">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Betty Burgers</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Gourmet burgers kids love, fries, shakes. Quick service, casual. $10-15/person
                  </p>
                  <p className="text-xs text-gray-600"><strong>Distance:</strong> 5 min walk from boardwalk</p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Pizza My Heart</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Huge slices, quick, affordable. Kids menu. $8-12/person
                  </p>
                  <p className="text-xs text-gray-600"><strong>Distance:</strong> Downtown, 10 min drive</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Picnic Basket</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Sandwiches, salads, healthy options. Quick takeout, eat at park. $10-15/person
                  </p>
                  <p className="text-xs text-gray-600"><strong>Distance:</strong> Downtown, 10 min drive</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Boardwalk Food (Quick Option)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Corn dogs, fries, pizza slices. Expensive but convenient. $10-15/person
                  </p>
                  <p className="text-xs text-gray-600"><strong>Distance:</strong> Right there!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hour 4: Playground or Museum */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90">HOUR 4</div>
                  <h3 className="text-xl font-bold">Playground or Learning Time</h3>
                </div>
                <div className="text-4xl">🎪</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                End with play time at a great playground OR educational fun at a museum.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">Option A: Park Playground</h4>
                  <div className="mb-3">
                    <strong className="text-sm text-gray-900">San Lorenzo Park</strong>
                    <p className="text-sm text-gray-700">Large playground, multiple structures, swings, picnic tables. FREE!</p>
                    <p className="text-xs text-gray-600 mt-1">Distance: Downtown, 10 min drive</p>
                  </div>
                  <div>
                    <strong className="text-sm text-gray-900">Harvey West Park</strong>
                    <p className="text-sm text-gray-700">Huge playground, skate park nearby, open space. FREE!</p>
                    <p className="text-xs text-gray-600 mt-1">Distance: Westside, 10 min drive</p>
                  </div>
                </div>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
                  <h4 className="font-bold text-teal-900 mb-2">Option B: Museum</h4>
                  <div className="mb-3">
                    <strong className="text-sm text-gray-900">Seymour Marine Discovery Center</strong>
                    <p className="text-sm text-gray-700">Touch pools, marine science, whale skeleton. $10/adult, $7/kids</p>
                    <p className="text-xs text-gray-600 mt-1">Distance: Westside, 15 min drive</p>
                  </div>
                  <div>
                    <strong className="text-sm text-gray-900">Santa Cruz Museum of Natural History</strong>
                    <p className="text-sm text-gray-700">Local wildlife, Native American history, hands-on. $5/person</p>
                    <p className="text-xs text-gray-600 mt-1">Distance: Downtown, 5 min drive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown (Family of 4)</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Parking</span>
              <span className="font-semibold">$15-25</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Boardwalk wristbands (4)</span>
              <span className="font-semibold">$180-260</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>OR individual rides (~10 rides)</span>
              <span className="font-semibold">$50-80</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Lunch (4 people)</span>
              <span className="font-semibold">$40-60</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Museum (optional)</span>
              <span className="font-semibold">$0-35</span>
            </div>
            <div className="flex justify-between py-2 border-b text-gray-700">
              <span>Snacks/ice cream</span>
              <span className="font-semibold">$15-25</span>
            </div>
            <div className="flex justify-between py-3 bg-gray-50 rounded px-4 font-bold text-lg">
              <span>Total</span>
              <span className="text-green-600">$120-400</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4 italic">
            Budget option: Skip wristbands, do 5-10 rides + free beach/playground = $120-150 total
          </p>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">👨‍👩‍👧‍👦 Family Tips</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎫</span>
              <div>
                <strong>Wristband Strategy:</strong> If kids want 5+ rides, wristband pays off. 
                Under 5 rides? Individual tickets cheaper. Height restrictions apply to some rides.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">☀️</span>
              <div>
                <strong>Sun Protection:</strong> Bring sunscreen, hats, sunglasses. Reapply every 2 hours. 
                Boardwalk has some shade but beach is full sun.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎒</span>
              <div>
                <strong>What to Bring:</strong> Water bottles (refill at fountains), snacks (save money), 
                change of clothes (beach gets wet!), towels, zip-lock bags for phones.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚻</span>
              <div>
                <strong>Bathrooms:</strong> Boardwalk has clean facilities. Public restrooms on beach. 
                Museums and restaurants have family bathrooms.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <strong>Best Time:</strong> Weekday mornings (fewer crowds). Avoid peak summer weekends 
                (very crowded). Arrive early (9-10am) for best parking.
              </div>
            </li>
          </ul>
        </div>

        {/* Related */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Family-Friendly Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/kid-friendly-activities" className="bg-yellow-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">👶</div>
              <div className="font-bold text-gray-900 mb-1">Kid-Friendly Activities</div>
              <div className="text-gray-600 text-sm">Complete list with ages & details</div>
            </Link>
            
            <Link href="/free-things-to-do" className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🆓</div>
              <div className="font-bold text-gray-900 mb-1">Free Things to Do</div>
              <div className="text-gray-600 text-sm">Budget-friendly family fun</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

