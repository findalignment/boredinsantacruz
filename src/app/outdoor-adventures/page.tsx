import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor Adventures in Santa Cruz | Hiking, Kayaking, Biking & More',
  description: 'Discover the best outdoor adventures in Santa Cruz. Hiking trails, kayaking, mountain biking, and outdoor activities for adventure seekers.',
  keywords: 'santa cruz outdoor activities, adventure, hiking, kayaking, mountain biking, outdoor sports',
};

export default function OutdoorAdventuresPage() {
  const adventures = [
    { title: "Redwood Forest Hiking", difficulty: "Easy-Hard", time: "2-6 hours", highlight: "Ancient trees, peaceful trails" },
    { title: "Mountain Biking Soquel Forest", difficulty: "Moderate-Hard", time: "2-4 hours", highlight: "Flow trails, technical sections" },
    { title: "Kayaking Elkhorn Slough", difficulty: "Easy", time: "2-3 hours", highlight: "See otters, seals, birds" },
    { title: "Rock Climbing at Pacific Edge", difficulty: "All levels", time: "2-4 hours", highlight: "Indoor climbing gym" },
    { title: "Stand-Up Paddleboarding", difficulty: "Easy", time: "1-2 hours", highlight: "Calm harbor waters" },
    { title: "Surfing Lessons", difficulty: "Beginner", time: "2 hours", highlight: "Learn from locals" },
    { title: "Coastal Bike Path", difficulty: "Easy", time: "1-3 hours", highlight: "Flat, scenic, family-friendly" },
    { title: "Trail Running Wilder Ranch", difficulty: "Moderate", time: "1-2 hours", highlight: "Bluff views, varied terrain" },
    { title: "Ziplining Mt. Hermon", difficulty: "Easy", time: "2-3 hours", highlight: "Through redwoods" },
    { title: "Paragliding Westside", difficulty: "With instructor", time: "30-60 min", highlight: "Bird's eye views" },
    { title: "Horseback Riding Trails", difficulty: "All levels", time: "1-2 hours", highlight: "Beach or forest rides" },
    { title: "Scuba Diving", difficulty: "Certified", time: "Half day", highlight: "Kelp forests, marine life" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏔️ Outdoor Adventures in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            From mountains to ocean - your adventure playground awaits
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top 12 Adventures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {adventures.map((adv, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{adv.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div><strong>Difficulty:</strong> {adv.difficulty}</div>
                  <div><strong>Time:</strong> {adv.time}</div>
                </div>
                <p className="text-gray-700">{adv.highlight}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Adventure</h2>
          <p className="text-xl mb-6">Explore all outdoor activities</p>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50">
            View All Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
