import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Cruz on a Budget | Cheap & Free Things to Do 2025',
  description: 'How to visit Santa Cruz on a budget. Free activities, cheap eats, budget hotels, and money-saving tips.',
  keywords: 'santa cruz budget, cheap activities, free things, budget travel, save money, affordable santa cruz',
};

export default function BudgetGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">💰 Santa Cruz on a Budget</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Experience Santa Cruz without breaking the bank</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Free Activities (20+)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "All beach access (15+ beaches)",
              "West Cliff Drive 3-mile walk",
              "Natural Bridges tide pools",
              "Lighthouse Field State Beach",
              "Pogonip Park hiking (5 mi)",
              "Downtown window shopping",
              "First Friday art galleries",
              "Street performers downtown",
              "Santa Cruz Wharf walk",
              "Sunset watching (anywhere!)",
              "Surfing Museum (free)",
              "Public libraries",
              "Felton Covered Bridge",
              "Moore Creek trails",
              "Capitola Village stroll",
              "Street art & murals tour"
            ].map((item, i) => (
              <div key={i} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <p className="text-gray-800">✓ {item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Budget Eats (Under $15)</h2>
          <div className="space-y-3">
            {[
              { place: "Taqueria Vallarta", meal: "Best tacos, $3-5 each", tip: "Cash only" },
              { place: "Woodstock's Pizza", meal: "Huge slices, $5-7", tip: "Student discounts" },
              { place: "The Picnic Basket", meal: "Fresh sandwiches, $10-12", tip: "Large portions" },
              { place: "Farmers Markets", meal: "Fresh produce, samples", tip: "Wed & Sat mornings" },
              { place: "The Bagelry", meal: "Bagels & coffee, $5-8", tip: "Early for fresh" },
            ].map((eat, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-emerald-200">
                <h3 className="font-bold text-lg">{eat.place}</h3>
                <p className="text-gray-700">{eat.meal}</p>
                <p className="text-sm text-emerald-600">💡 {eat.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Money-Saving Tips</h2>
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <ul className="space-y-3 text-gray-700">
              <li><strong>🍽️ Happy Hours:</strong> 3-6pm daily (save 30-50%)</li>
              <li><strong>🏖️ Free Parking:</strong> Residential streets (check signs)</li>
              <li><strong>🎫 MAH Museum:</strong> Free first Friday of month</li>
              <li><strong>🥤 Water Bottle:</strong> Fill at public fountains (save $3+/day)</li>
              <li><strong>🏕️ Camping:</strong> $35/night vs $150+ hotels</li>
              <li><strong>🚴 Bike Rentals:</strong> $25/day unlimited exploring</li>
              <li><strong>🍕 Lunch vs Dinner:</strong> Same food, lower prices</li>
              <li><strong>📱 Download Apps:</strong> Restaurant deals & coupons</li>
            </ul>
          </div>
        </section>

        <div className="bg-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">See All Free Activities</h2>
          <Link href="/free-things-to-do" className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg">
            Complete Free Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
