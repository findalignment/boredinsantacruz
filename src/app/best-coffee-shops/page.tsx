import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Coffee Shops in Santa Cruz | Remote Work & Cafe Guide 2025',
  description: 'Find the best coffee shops in Santa Cruz for remote work, studying, or relaxing. WiFi, outlets, and great coffee.',
  keywords: 'santa cruz coffee, coffee shops, cafes, remote work, wifi, best coffee, coworking',
};

export default function BestCoffeeShopsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">☕ Best Coffee Shops in Santa Cruz</h1>
        <p className="text-xl text-center text-gray-600 mb-12">For remote workers, students, and coffee lovers</p>
        
        <div className="space-y-6 mb-12">
          {[
            { name: "Verve Coffee Roasters", wifi: "Yes", outlets: "Some", vibe: "Modern, bustling", best: "Quality coffee, multiple locations" },
            { name: "Cat & Cloud Coffee", wifi: "Yes", outlets: "Limited", vibe: "Hip, artistic", best: "Friendly service, unique drinks" },
            { name: "Lúlu Carpenter's", wifi: "Yes", outlets: "Yes", vibe: "Cozy, local", best: "Great for working, quiet" },
            { name: "The Penny Ice Creamery", wifi: "Yes", outlets: "Some", vibe: "Casual, sweet treats", best: "Coffee + ice cream combo" },
            { name: "Coffeetopia", wifi: "Yes", outlets: "Yes", vibe: "Study-friendly", best: "Spacious, student favorite" },
            { name: "Santa Cruz Coffee Roasting", wifi: "Yes", outlets: "Limited", vibe: "Classic cafe", best: "Strong coffee, reliable" },
          ].map((shop, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
              <h3 className="text-2xl font-bold mb-3">{shop.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div><strong>WiFi:</strong> {shop.wifi}</div>
                <div><strong>Outlets:</strong> {shop.outlets}</div>
                <div><strong>Vibe:</strong> {shop.vibe}</div>
              </div>
              <p className="text-gray-700"><strong>Best for:</strong> {shop.best}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Find More Cafes</h2>
          <Link href="/restaurants" className="inline-block px-8 py-4 bg-white text-amber-600 font-bold rounded-lg">
            Browse All Restaurants
          </Link>
        </div>
      </div>
    </main>
  );
}
