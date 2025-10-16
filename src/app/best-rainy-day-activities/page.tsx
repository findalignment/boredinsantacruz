import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { RainyDayActivitiesClient } from '@/components/activities/rainy-day-activities-client';

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

        {/* Filtered Activities with Popup Modal */}
        <section className="mb-12">
          <RainyDayActivitiesClient activities={activities} />
        </section>

        {/* Quick Tips Section */}
        <section className="mb-12 bg-blue-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">☔ Rainy Day Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🅿️ Parking</h3>
              <p className="text-sm text-gray-700">Downtown parking structures are covered and stay dry!</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">☕ Coffee Shops</h3>
              <p className="text-sm text-gray-700">Verve, Cat & Cloud, and Lulu Carpenter's are perfect for rainy afternoons</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🍕 Food Halls</h3>
              <p className="text-sm text-gray-700">Abbott Square Market offers diverse indoor dining options</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🎨 Free Days</h3>
              <p className="text-sm text-gray-700">MAH is free the first Friday of every month!</p>
            </div>
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
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
