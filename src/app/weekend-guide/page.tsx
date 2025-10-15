import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfect Weekend in Santa Cruz | Complete 2-3 Day Itinerary Guide',
  description: 'Plan the perfect weekend in Santa Cruz with our complete itinerary. Best beaches, restaurants, hiking, and activities for a memorable getaway.',
  keywords: 'santa cruz weekend, weekend getaway, santa cruz itinerary, 2 day trip, 3 day trip, weekend trip',
};

export default function WeekendGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌊 Perfect Weekend in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Your complete 2-3 day itinerary for an unforgettable Santa Cruz getaway
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            A weekend in Santa Cruz offers the perfect blend of beach relaxation, outdoor adventure, amazing food, 
            and coastal charm. Whether you have 2 or 3 days, this guide will help you experience the best of what 
            Santa Cruz has to offer.
          </p>
        </div>

        {/* Friday Evening */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-3xl font-bold">Friday Evening: Arrival & Sunset</h2>
            <p className="text-blue-100 mt-2">Arrive, settle in, and catch the famous Santa Cruz sunset</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🌅</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">4:00 PM - Check In & Explore Downtown</h3>
                  <p className="text-gray-600 mb-3">
                    Check into your hotel/Airbnb. Take a quick walk around downtown Pacific Avenue to get your bearings.
                  </p>
                  <p className="text-sm text-gray-500">📍 Downtown Santa Cruz</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🌊</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5:30 PM - West Cliff Drive Sunset Walk</h3>
                  <p className="text-gray-600 mb-3">
                    Walk or bike the scenic West Cliff Drive as the sun sets over the Pacific. Watch surfers at Steamer Lane.
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 1 hour | Free | Easy walk</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🍽️</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">7:00 PM - Dinner at Laili Restaurant</h3>
                  <p className="text-gray-600 mb-3">
                    Enjoy Afghan cuisine in a beautiful setting with outdoor patio. Or try The Crow's Nest for harbor views.
                  </p>
                  <p className="text-sm text-gray-500">💰 $$ | Reservations recommended</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saturday */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-3xl font-bold">Saturday: Full Day Adventure</h2>
            <p className="text-orange-100 mt-2">Beach, boardwalk, and the best of Santa Cruz</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">☕</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">8:00 AM - Breakfast at Walnut Avenue Cafe</h3>
                  <p className="text-gray-600 mb-3">
                    Start your day with a hearty breakfast at this local favorite. Try the blueberry pancakes or eggs benedict.
                  </p>
                  <p className="text-sm text-gray-500">💰 $ | Cash only | Expect a wait on weekends</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏖️</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">9:30 AM - Beach Time at Natural Bridges</h3>
                  <p className="text-gray-600 mb-3">
                    Visit Natural Bridges State Beach for tide pools (check tide times!). Explore sea caves and watch for seals.
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 2-3 hours | Parking $10 | Bring layers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🥪</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">12:30 PM - Lunch at The Picnic Basket</h3>
                  <p className="text-gray-600 mb-3">
                    Quick, fresh sandwiches and salads. Perfect for refueling before afternoon activities.
                  </p>
                  <p className="text-sm text-gray-500">💰 $ | Takeout available</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎢</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2:00 PM - Santa Cruz Beach Boardwalk</h3>
                  <p className="text-gray-600 mb-3">
                    Hit the rides! Don't miss the Giant Dipper (historic wooden coaster). Play arcade games, get saltwater taffy.
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 2-3 hours | Pay per ride or all-day wristband</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🍷</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5:00 PM - Wine Tasting in Capitola Village</h3>
                  <p className="text-gray-600 mb-3">
                    Drive 10 minutes to Capitola for wine tasting at Bargetto Winery, then explore the colorful beach village.
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 1-2 hours | Tasting $15-20</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🍽️</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">7:30 PM - Dinner at Shadowbrook</h3>
                  <p className="text-gray-600 mb-3">
                    Take the cable car down to this romantic creekside restaurant. Perfect for a special night out.
                  </p>
                  <p className="text-sm text-gray-500">💰 $$$ | Reservations required | Dress code: smart casual</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sunday */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-3xl font-bold">Sunday: Nature & Departure</h2>
            <p className="text-green-100 mt-2">Outdoor adventure and farewell to Santa Cruz</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🌲</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">9:00 AM - Redwood Forest Hike</h3>
                  <p className="text-gray-600 mb-3">
                    Hike among ancient redwoods at Henry Cowell State Park. The Redwood Grove Trail is easy and stunning.
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 2 hours | Parking $10 | Easy trail</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🥐</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">11:30 AM - Brunch at Zachary's</h3>
                  <p className="text-gray-600 mb-3">
                    Fill up on Mike's Mess or famous pumpkin pancakes. Cash only, expect a wait, totally worth it.
                  </p>
                  <p className="text-sm text-gray-500">💰 $ | Cash only | Large portions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🛍️</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1:00 PM - Downtown Shopping & Souvenirs</h3>
                  <p className="text-gray-600 mb-3">
                    Browse Pacific Avenue boutiques, Bookshop Santa Cruz, and local surf shops. Pick up saltwater taffy!
                  </p>
                  <p className="text-sm text-gray-500">⏱️ 1-2 hours | Parking downtown</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🍦</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3:00 PM - Ice Cream at Penny Ice Creamery</h3>
                  <p className="text-gray-600 mb-3">
                    End your weekend with artisan ice cream. Try the salted caramel or seasonal flavors.
                  </p>
                  <p className="text-sm text-gray-500">💰 $ | Multiple locations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Weekend Planning Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">🚗 Getting Around</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Car recommended for flexibility</li>
                <li>• Bike rentals available downtown</li>
                <li>• Most attractions within 15 min drive</li>
                <li>• Downtown parking can be tight</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🏨 Where to Stay</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Downtown: walkable to restaurants</li>
                <li>• Beach hotels: ocean views, pricier</li>
                <li>• Capitola: quieter, charming village</li>
                <li>• Airbnb: great neighborhood options</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">💰 Budget Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Many beaches are free</li>
                <li>• Happy hours 3-6pm (save $$$)</li>
                <li>• Picnic supplies from New Leaf</li>
                <li>• Free parking on residential streets</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">🌤️ Weather Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Mornings often foggy (burns off)</li>
                <li>• Bring layers year-round</li>
                <li>• Sunscreen always needed</li>
                <li>• Ocean water is cold (wetsuit!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Weekend</h2>
          <p className="text-xl mb-6 text-blue-50">
            Explore more activities and create your custom itinerary
          </p>
          <Link href="/" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Discover More Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

