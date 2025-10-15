import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Happy Hours in Santa Cruz | Top 15 Bar & Restaurant Deals',
  description: 'Find the best happy hour deals in Santa Cruz. $5 drinks, half-price appetizers, and more at downtown bars and restaurants.',
  keywords: 'santa cruz happy hour, drink specials, food deals, bar specials, restaurant deals, cheap drinks',
};

export default function BestHappyHoursPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🍻 Best Happy Hours in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Save money on drinks and food at Santa Cruz's best happy hour spots
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz knows how to do happy hour right. Whether you're looking for oceanfront deals, downtown dive bars, 
            or upscale cocktail lounges, the city offers incredible discounts on drinks and appetizers every day of the week. 
            From $3 tacos to $5 craft cocktails, here are the best happy hour deals in Santa Cruz.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 15 Happy Hour Spots</h2>
          <div className="space-y-6">
            {[
              { title: "Crow's Nest", deal: "Daily 3-6pm: $5 apps, $6 cocktails", location: "Harbor", vibe: "Oceanfront dining" },
              { title: "The Crepe Place", deal: "Mon-Fri 4-6pm: $7 appetizers, $8 wines", location: "Downtown", vibe: "Eclectic garden patio" },
              { title: "Woodstock's Pizza", deal: "Mon-Fri 3-6pm: $3 pints, $5 apps", location: "Downtown", vibe: "College crowd" },
              { title: "Venus Spirits", deal: "Tue-Thu 3-6pm: $8 cocktails, free bites", location: "Westside", vibe: "Craft cocktails" },
              { title: "Santa Cruz Mountain Brewing", deal: "Mon-Fri 3-6pm: $5 pints, $7 bites", location: "Ingalls", vibe: "Local brewery" },
              { title: "Severino Grill", deal: "Daily 4-6pm: $6 cocktails, half-price apps", location: "Harbor", vibe: "Harbor views" },
              { title: "Aldo's Harbor Restaurant", deal: "Mon-Fri 3-6pm: $5 apps, $7 drinks", location: "Harbor", vibe: "Waterfront" },
              { title: "Hula's Island Grill", deal: "Daily 3-6pm: $5 mai tais, $6 tacos", location: "Downtown", vibe: "Tropical tiki" },
              { title: "Brady's Yacht Club", deal: "Mon-Fri 4-6pm: $4 wells, $6 appetizers", location: "Harbor", vibe: "Dive bar charm" },
              { title: "The Red Room", deal: "Tue-Thu 5-7pm: $7 cocktails, $8 small plates", location: "Downtown", vibe: "Upscale lounge" },
              { title: "99 Bottles of Beer on the Wall", deal: "Daily 3-6pm: $1 off all beers", location: "Soquel", vibe: "Beer heaven" },
              { title: "Oswald", deal: "Mon-Thu 5-6:30pm: $8 cocktails, $9 oysters", location: "Downtown", vibe: "Upscale dining" },
              { title: "Parish Publick House", deal: "Mon-Fri 3-6pm: $5 pints, $7 wings", location: "Downtown", vibe: "British pub" },
              { title: "Discretion Brewing", deal: "Mon-Thu 3-6pm: $5 pints, $6 bites", location: "Soquel", vibe: "Local craft beer" },
              { title: "Seabright Brewery", deal: "Mon-Fri 3-6pm: $4 pints, $6 apps", location: "Seabright", vibe: "Neighborhood brewery" }
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{i + 1}. {spot.title}</h3>
                  <span className="text-sm text-gray-500">{spot.location}</span>
                </div>
                <p className="text-green-600 font-semibold mb-2">{spot.deal}</p>
                <p className="text-gray-600">{spot.vibe}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Happy Hour by Day</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Monday</h3>
              <p className="text-sm text-gray-700">Best day for brewery deals</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Tuesday</h3>
              <p className="text-sm text-gray-700">Taco Tuesday specials all over</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Wednesday</h3>
              <p className="text-sm text-gray-700">Wine Wednesday at many spots</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Thursday</h3>
              <p className="text-sm text-gray-700">Best cocktail specials</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Friday</h3>
              <p className="text-sm text-gray-700">Extended hours, busiest day</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Weekend</h3>
              <p className="text-sm text-gray-700">Brunch deals, limited happy hours</p>
            </div>
          </div>
        </section>

        <div className="bg-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">See All Happy Hour Deals</h2>
          <p className="text-xl mb-6">Browse our complete guide with times and specials</p>
          <Link href="/deals" className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50">
            View All Deals
          </Link>
        </div>
      </div>
    </main>
  );
}

