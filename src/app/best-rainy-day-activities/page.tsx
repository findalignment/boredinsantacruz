import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';

export const metadata: Metadata = {
  title: 'Best Rainy Day Activities in Santa Cruz | Top 15 Indoor Things to Do',
  description: 'Discover the best indoor activities in Santa Cruz for rainy days. Museums, cafes, breweries, entertainment, and more indoor fun.',
  keywords: 'santa cruz rainy day activities, indoor things to do santa cruz, rainy day santa cruz, indoor activities, museums',
  openGraph: {
    title: 'Best Rainy Day Activities in Santa Cruz',
    description: 'Top indoor activities and things to do when it rains in Santa Cruz, CA',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the top 5 indoor activities in Santa Cruz for rainy days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top 5 indoor rainy-day activities: 1) Santa Cruz Museum of Art & History (MAH) - rotating art exhibitions, 2) Monterey Bay Aquarium - 30 minutes away, world-class marine life, 3) Bookshop Santa Cruz - independent bookstore with events, 4) Santa Cruz Mountain Brewing or Seabright Brewery - local craft beer, 5) Del Mar Theatre - historic cinema with indie and mainstream films."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Santa Cruz Beach Boardwalk open on rainy days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Santa Cruz Beach Boardwalk has limited operations on rainy days. The arcade is open year-round and provides indoor entertainment. Outdoor rides may be closed depending on weather conditions. Call ahead (831-423-5590) or check their website for current hours and ride status during inclement weather."
      }
    },
    {
      "@type": "Question",
      "name": "Are there indoor playgrounds or activities for kids in Santa Cruz on rainy days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Family-friendly rainy-day options include the Boardwalk arcade (indoor games), Seymour Marine Discovery Center (touch tanks, exhibits), Pacific Edge Climbing Gym (kids climbing area), bowling at The Bowlero, and the Children's Museum of Discovery in nearby Capitola. Many have specific toddler hours or kid-friendly programs."
      }
    }
  ]
};

export default async function BestRainyDayActivitiesPage() {
  const result = await getActivities();
  const activities = result.success ? result.data.filter(a => a.indoorOutdoor === 'Indoor' || a.rainOk) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌧️ Best Rainy Day Activities in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Don't let the rain ruin your plans - explore the best indoor activities Santa Cruz has to offer
          </p>
        </div>

        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz may be known for its beaches and outdoor activities, but when the rain comes, this coastal town 
            transforms into a cozy haven of indoor entertainment. From world-class museums to craft breweries, cozy cafes 
            to entertainment venues, there's no shortage of things to do when the weather turns wet.
          </p>
        </div>

        {/* Top 15 Activities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 15 Rainy Day Activities</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Santa Cruz Museum of Natural History",
                description: "Explore local wildlife, Native American history, and marine life. Perfect for families and anyone curious about the natural world.",
                cost: "$",
                time: "2-3 hours",
                link: "/activity/museum-natural-history"
              },
              {
                title: "The Catalyst",
                description: "Catch live music at this iconic venue. Check their calendar for touring bands and local favorites.",
                cost: "$$",
                time: "3-4 hours",
                link: "/events"
              },
              {
                title: "Verve Coffee Roasters",
                description: "Warm up with expertly crafted coffee in a cozy atmosphere. Multiple locations around Santa Cruz.",
                cost: "$",
                time: "1-2 hours",
                link: "/restaurant/verve-coffee"
              },
              {
                title: "The Nickelodeon Theatre",
                description: "Watch independent and mainstream films at this historic art deco cinema in downtown Santa Cruz.",
                cost: "$$",
                time: "2-3 hours",
                link: "/activity/nickelodeon"
              },
              {
                title: "The MAH (Museum of Art & History)",
                description: "Contemporary art exhibitions, local history, and rotating installations. Free first Friday of every month.",
                cost: "$ (sometimes free)",
                time: "2-3 hours",
                link: "/activity/mah"
              },
              {
                title: "Seymour Marine Discovery Center",
                description: "Touch pools, aquariums, and the largest blue whale skeleton on display. Educational and fun for all ages.",
                cost: "$",
                time: "2 hours",
                link: "/activity/seymour-marine"
              },
              {
                title: "Santa Cruz Public Libraries",
                description: "Browse books, use free wifi, attend events. The downtown library has a great children's section.",
                cost: "Free",
                time: "1-3 hours",
                link: "/activity/library"
              },
              {
                title: "Bowling at Pacific Bowl",
                description: "Classic bowling alley with arcade games and food. Great for groups and families.",
                cost: "$$",
                time: "2-3 hours",
                link: "/activity/pacific-bowl"
              },
              {
                title: "Santa Cruz Mountain Brewing",
                description: "Sample local craft beers in a warehouse taproom. Board games available.",
                cost: "$$",
                time: "2 hours",
                link: "/restaurant/sc-mountain-brewing"
              },
              {
                title: "Bookshop Santa Cruz",
                description: "Independent bookstore with cafe. Browse, read, and enjoy coffee for hours.",
                cost: "$",
                time: "1-3 hours",
                link: "/activity/bookshop"
              },
              {
                title: "Yoga Studios",
                description: "Take a heated yoga class at one of Santa Cruz's many studios. Warm up and zen out.",
                cost: "$$",
                time: "1-2 hours",
                link: "/wellness"
              },
              {
                title: "The Atrium Building",
                description: "Indoor shopping with local boutiques, Verve Coffee, and Woodstock's Pizza under one roof.",
                cost: "$-$$",
                time: "2-3 hours",
                link: "/activity/atrium"
              },
              {
                title: "Santa Cruz Art League",
                description: "View local art exhibitions and attend workshops. Rotating gallery shows monthly.",
                cost: "Free-$",
                time: "1 hour",
                link: "/activity/art-league"
              },
              {
                title: "Cooking Classes",
                description: "Learn to cook at one of Santa Cruz's culinary schools or pop-up classes.",
                cost: "$$$",
                time: "2-3 hours",
                link: "/activity/cooking-classes"
              },
              {
                title: "Indoor Rock Climbing at Pacific Edge",
                description: "Climb routes of all difficulty levels. Great workout and fun challenge.",
                cost: "$$",
                time: "2-3 hours",
                link: "/activity/pacific-edge"
              }
            ].map((activity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {index + 1}. {activity.title}
                  </h3>
                  <span className="text-gray-600 font-medium">{activity.cost}</span>
                </div>
                <p className="text-gray-600 mb-3">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">⏱️ {activity.time}</span>
                  <Link href={activity.link} className="text-blue-600 hover:text-blue-700 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-sm p-6">
              <summary className="font-semibold text-lg cursor-pointer">What are the best indoor activities for families?</summary>
              <p className="mt-3 text-gray-600">The Museum of Natural History, Seymour Marine Center, and Pacific Bowl are all great for families with kids.</p>
            </details>
            <details className="bg-white rounded-lg shadow-sm p-6">
              <summary className="font-semibold text-lg cursor-pointer">Are there free rainy day activities?</summary>
              <p className="mt-3 text-gray-600">Yes! Public libraries, the MAH on first Fridays, and window shopping downtown are all free.</p>
            </details>
            <details className="bg-white rounded-lg shadow-sm p-6">
              <summary className="font-semibold text-lg cursor-pointer">What's open late on rainy days?</summary>
              <p className="mt-3 text-gray-600">Breweries, The Catalyst for shows, movie theaters, and many restaurants stay open late.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">See All Indoor Activities</h2>
          <p className="text-xl mb-6">Browse our complete guide to rainy day fun</p>
          <Link href="/rainy" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            View All Rainy Day Activities
          </Link>
        </div>
      </div>
    </main>
  );
}

