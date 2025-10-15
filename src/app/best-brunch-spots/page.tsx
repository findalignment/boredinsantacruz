import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Brunch Spots in Santa Cruz | Weekend Brunch Guide 2025',
  description: 'Discover the best brunch restaurants in Santa Cruz. From classic diners to upscale cafes with bottomless mimosas.',
  keywords: 'santa cruz brunch, breakfast, weekend brunch, mimosas, pancakes, best cafes',
};

export default function BestBrunchPage() {
  const spots = [
    { name: "Walnut Avenue Cafe", dish: "Blueberry pancakes", wait: "45+ min weekends", price: "$" },
    { name: "Zachary's", dish: "Mike's Mess", note: "Cash only", price: "$" },
    { name: "Linda's Seabreeze Cafe", dish: "Benedicts", note: "Ocean views", price: "$$" },
    { name: "The Picnic Basket", dish: "Fresh sandwiches", note: "Takeout", price: "$" },
    { name: "Gayle's Bakery", dish: "Pastries + coffee", note: "Arrive early", price: "$" },
    { name: "The Bagelry", dish: "Fresh bagels", note: "Multiple locations", price: "$" },
    { name: "Breakfast Club", dish: "Huge portions", note: "Local favorite", price: "$" },
    { name: "Bantam", dish: "Upscale brunch", note: "Reservations rec", price: "$$" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🥞 Best Brunch Spots in Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Weekend brunch done right</p>
        
        <div className="space-y-6 mb-12">
          {spots.map((spot, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-yellow-200">
              <h3 className="text-2xl font-bold mb-2">{i + 1}. {spot.name}</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">🍳 {spot.dish}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{spot.price}</span>
                {spot.note && <span className="text-gray-600">💡 {spot.note}</span>}
                {spot.wait && <span className="text-orange-600">⏱️ {spot.wait}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore All Restaurants</h2>
          <Link href="/restaurants" className="inline-block px-8 py-4 bg-white text-yellow-600 font-bold rounded-lg">
            View Restaurant Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
