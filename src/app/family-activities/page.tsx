import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Activities in Santa Cruz | Kid-Friendly Fun 2025',
  description: 'Best family activities in Santa Cruz. Kid-friendly attractions, parks, beaches, and fun for all ages.',
  keywords: 'santa cruz families, kid activities, children, family fun, kids attractions',
};

export default function FamilyActivitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">👨‍👩‍👧‍👦 Family Activities</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Fun for the whole family in Santa Cruz</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🎢 Top Family Attractions</h2>
          <div className="grid gap-6">
            {[
              { name: "Beach Boardwalk", age: "All ages", why: "Rides, arcade, beach access", cost: "$$" },
              { name: "Natural Bridges Tide Pools", age: "5+", why: "Explore marine life", cost: "Free" },
              { name: "Santa Cruz Museum of Natural History", age: "All ages", why: "Interactive exhibits", cost: "$" },
              { name: "Seymour Discovery Center", age: "6+", why: "Marine science, touch tanks", cost: "$" },
              { name: "DeLaveaga Park", age: "All ages", why: "Playground, disc golf, trails", cost: "Free" },
              { name: "Santa Cruz Farmers Market", age: "All ages", why: "Fresh food, live music", cost: "Free" },
            ].map((activity, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-pink-200">
                <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">👶 {activity.age}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">💰 {activity.cost}</span>
                </div>
                <p className="text-gray-700">{activity.why}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">More Kid-Friendly Activities</h2>
          <Link href="/kid-friendly-activities" className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-lg">
            Complete Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
