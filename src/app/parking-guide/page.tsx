import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Cruz Parking Guide | Where to Park 2025',
  description: 'Complete parking guide for Santa Cruz. Free parking, parking lots, rates, and insider tips.',
  keywords: 'santa cruz parking, where to park, parking lots, free parking, beach parking',
};

export default function ParkingGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🅿️ Santa Cruz Parking Guide</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Find parking without the stress</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">💰 Free Parking</h2>
          <div className="space-y-4">
            {[
              { area: "Seabright Beach", location: "Seabright Ave", note: "Residential street parking", tip: "Early arrival on weekends" },
              { area: "Natural Bridges", location: "West Cliff area", note: "Limited street parking", tip: "Arrive before 10am" },
              { area: "Eastside Santa Cruz", location: "Residential areas", note: "Walk to downtown", tip: "Check parking signs" },
              { area: "Pleasure Point", location: "Residential streets", note: "Near beach", tip: "2 hour limits common" },
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{spot.area}</h3>
                <p className="text-gray-700 mb-1">📍 {spot.location}</p>
                <p className="text-gray-600 text-sm mb-1">{spot.note}</p>
                <p className="text-green-600 text-sm">💡 {spot.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🅿️ Paid Parking</h2>
          <div className="space-y-4">
            {[
              { name: "Main Beach Lot", rate: "$3/hour or $15/day", location: "Beach St", note: "Fills early on sunny days" },
              { name: "Downtown Structures", rate: "$2/hour", location: "Cedar, Locust, Pacific", note: "First hour free some locations" },
              { name: "Natural Bridges Lot", rate: "$10/day", location: "Park entrance", note: "State park fee" },
              { name: "Boardwalk Lot", rate: "$20-30/day", location: "Beach St", note: "Expensive but convenient" },
            ].map((lot, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{lot.name}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{lot.rate}</span>
                </div>
                <p className="text-gray-700 text-sm mb-1">📍 {lot.location}</p>
                <p className="text-gray-600 text-sm">{lot.note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 Pro Tips</h2>
          <ul className="space-y-2 text-blue-50">
            <li>• Arrive early on sunny weekends (before 10am)</li>
            <li>• Bike or use public transit when possible</li>
            <li>• Download ParkMobile app for meters</li>
            <li>• Check posted signs for time limits</li>
            <li>• State parks charge $10 day-use fee</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
