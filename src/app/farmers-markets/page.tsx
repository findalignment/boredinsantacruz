import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Farmers Markets in Santa Cruz | Market Guide 2025',
  description: 'Complete guide to Santa Cruz farmers markets. Fresh produce, local vendors, and market schedules.',
  keywords: 'santa cruz farmers market, fresh produce, local food, markets, organic',
};

export default function FarmersMarketsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🥕 Farmers Markets Guide</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Fresh, local, and delicious</p>
        
        <div className="space-y-6 mb-12">
          {[
            { name: "Downtown Santa Cruz", day: "Wednesday", time: "1:30 PM - 6:00 PM", location: "Lincoln & Cedar", size: "Large", note: "Year-round, live music" },
            { name: "Westside Santa Cruz", day: "Saturday", time: "9:00 AM - 1:00 PM", location: "Western Dr", size: "Medium", note: "Great produce selection" },
            { name: "Aptos", day: "Saturday", time: "8:00 AM - 12:00 PM", location: "Cabrillo College", size: "Large", note: "Organic focus" },
            { name: "Scotts Valley", day: "Sunday", time: "9:00 AM - 1:00 PM", location: "Scotts Valley Dr", size: "Small", note: "May-October" },
            { name: "Felton", day: "Tuesday", time: "2:30 PM - 6:00 PM", location: "Hwy 9", size: "Small", note: "Summer only" },
          ].map((market, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{market.name}</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">{market.size}</span>
              </div>
              <div className="space-y-1 text-gray-700">
                <p><strong>📅 {market.day}</strong> · {market.time}</p>
                <p>📍 {market.location}</p>
                <p className="text-sm text-orange-600">💡 {market.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Food Scene</h2>
          <Link href="/food-and-drink-guide" className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg">
            Complete Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
