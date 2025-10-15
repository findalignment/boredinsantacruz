import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Kid-Friendly Activities in Santa Cruz | Family Fun Guide',
  description: 'Find the best things to do with kids in Santa Cruz. Family beaches, playgrounds, museums, and activities for all ages.',
  keywords: 'santa cruz kids activities, family friendly, things to do with kids, children activities, family fun',
};

export default function KidFriendlyActivitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            👨‍👩‍👧‍👦 Kid-Friendly Activities in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            The best things to do with kids in Santa Cruz County
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz is a paradise for families! From the iconic Beach Boardwalk to tide pool explorations, 
            hands-on museums to forest adventures, your kids will never be bored in Santa Cruz. Here are the 
            best family-friendly activities that kids actually love.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 15 Kid Activities</h2>
          <div className="space-y-6">
            {[
              { name: "Santa Cruz Beach Boardwalk", age: "All ages", type: "Theme Park", cost: "$$", why: "Rides, arcade, beach access" },
              { name: "Seymour Marine Discovery Center", age: "3+", type: "Museum", cost: "$", why: "Touch pools, whale skeleton, educational" },
              { name: "Santa Cruz Museum of Natural History", age: "3+", type: "Museum", cost: "$", why: "Interactive exhibits, tide pool touch tank" },
              { name: "Natural Bridges Tide Pools", age: "All ages", type: "Nature", cost: "Free", why: "See sea stars, crabs, anemones" },
              { name: "Roaring Camp Railroad", age: "All ages", type: "Train", cost: "$$", why: "Steam train through redwoods" },
              { name: "DeLaveaga Park Playground", age: "2-12", type: "Playground", cost: "Free", why: "Huge playground, hiking trails" },
              { name: "Capitola Beach", age: "All ages", type: "Beach", cost: "Free", why: "Calm waves, village, ice cream" },
              { name: "Twin Lakes Beach", age: "All ages", type: "Beach", cost: "Free", why: "Gentle waves, playground nearby" },
              { name: "Mystery Spot", age: "6+", type: "Attraction", cost: "$$", why: "Gravity-defying fun, kids love it" },
              { name: "Lemos Farm", age: "1-10", type: "Farm", cost: "$", why: "Petting zoo, train, playground" },
              { name: "Pogonip Park", age: "All ages", type: "Nature", cost: "Free", why: "Easy trails, picnic areas, nature" },
              { name: "Library Programs", age: "0-12", type: "Educational", cost: "Free", why: "Story time, crafts, events" },
              { name: "Capitola Wharf", age: "All ages", type: "Activity", cost: "Free-$", why: "Fishing, sea lions, walking" },
              { name: "Felton Covered Bridge Park", age: "All ages", type: "Park", cost: "Free", why: "Historic bridge, river, picnics" },
              { name: "O'Neill Sea Odyssey", age: "8+", type: "Educational", cost: "Free", why: "Free marine science sailing program" }
            ].map((activity, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{i + 1}. {activity.name}</h3>
                  <span className="text-sm font-semibold text-yellow-600">{activity.cost}</span>
                </div>
                <div className="flex gap-2 mb-3 text-sm flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{activity.age}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{activity.type}</span>
                </div>
                <p className="text-gray-600">{activity.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Activities by Age</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold mb-3">👶 Toddlers (0-3)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lemos Farm petting zoo</li>
                <li>• Twin Lakes Beach (gentle waves)</li>
                <li>• Library story time</li>
                <li>• Simple playground visits</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">🧒 Young Kids (4-7)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Beach Boardwalk (kiddie rides)</li>
                <li>• Tide pools at Natural Bridges</li>
                <li>• Roaring Camp Railroad</li>
                <li>• DeLaveaga Playground</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">👦 Big Kids (8-12)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Beach Boardwalk (big rides)</li>
                <li>• Surfing lessons</li>
                <li>• Mystery Spot</li>
                <li>• O'Neill Sea Odyssey</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">👨‍👩‍👧‍👦 All Ages</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Beach days (bring boogie boards!)</li>
                <li>• Easy forest hikes</li>
                <li>• Ice cream crawl</li>
                <li>• Downtown murals & street performers</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-yellow-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Family Day</h2>
          <p className="text-xl mb-6">Find more family-friendly activities and events</p>
          <Link href="/" className="inline-block px-8 py-4 bg-white text-yellow-600 font-bold rounded-lg hover:bg-yellow-50">
            Explore Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

