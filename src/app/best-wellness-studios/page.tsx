import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Wellness Studios in Santa Cruz | Yoga, Fitness, Spas & Massage',
  description: 'Find the best yoga studios, gyms, spas, and wellness centers in Santa Cruz. Your guide to staying healthy and balanced.',
  keywords: 'santa cruz yoga, best gyms, spas, massage, wellness studios, fitness centers, pilates',
};

export default function BestWellnessStudiosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🧘 Best Wellness Studios in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Top yoga studios, gyms, spas, and wellness centers
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz has a thriving wellness community with world-class yoga studios, innovative fitness centers, 
            rejuvenating spas, and holistic health practitioners. Whether you're looking to build strength, find 
            inner peace, or treat yourself to a massage, you'll find exceptional options here.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🧘‍♀️ Best Yoga Studios</h2>
          <div className="space-y-6">
            {[
              { name: "Yoga Grove", style: "All levels, community-focused", price: "$$", highlight: "Donation-based classes available" },
              { name: "Yoga Source Los Gatos", style: "Hot yoga, vinyasa", price: "$$", highlight: "Multiple SC locations" },
              { name: "The Tannery Yoga", style: "All styles, large studio", price: "$$", highlight: "Great for beginners" },
              { name: "Yoga Mayu", style: "Alignment-focused", price: "$$", highlight: "Small classes, personal attention" },
              { name: "Beach Yoga SC", style: "Outdoor beach yoga", price: "$", highlight: "Sunrise classes on the sand" }
            ].map((studio, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{studio.name}</h3>
                  <span className="text-sm font-semibold text-teal-600">{studio.price}</span>
                </div>
                <p className="text-gray-700 mb-2">{studio.style}</p>
                <p className="text-sm text-green-600 font-medium">✨ {studio.highlight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">💪 Best Fitness Centers & Gyms</h2>
          <div className="space-y-6">
            {[
              { name: "Pacific Edge Climbing Gym", type: "Rock Climbing", price: "$$", why: "World-class climbing, all levels" },
              { name: "West Cliff CrossFit", type: "CrossFit", price: "$$", why: "Community-driven, intense workouts" },
              { name: "RowZone", type: "Rowing Studio", price: "$$", why: "Unique workout, full-body" },
              { name: "In-Shape Health Clubs", type: "Full Gym", price: "$-$$", why: "Pool, classes, equipment" },
              { name: "Physique Fitness", type: "Personal Training", price: "$$$", why: "One-on-one, results-focused" }
            ].map((gym, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{gym.name}</h3>
                  <span className="text-sm font-semibold text-blue-600">{gym.price}</span>
                </div>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{gym.type}</span>
                </div>
                <p className="text-gray-600">{gym.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">💆 Best Spas & Massage</h2>
          <div className="space-y-6">
            {[
              { name: "Chaminade Resort & Spa", type: "Full-Service Spa", price: "$$$", services: "Massage, facials, body treatments, views" },
              { name: "Sunshine Villa Spa", type: "Day Spa", price: "$$-$$$", services: "Massage, waxing, organic products" },
              { name: "Watercourse Way", type: "Hot Tub Experience", price: "$$", services: "Private hot tubs, massage, sauna" },
              { name: "Well Within Spa", type: "Holistic Spa", price: "$$", services: "Massage, acupuncture, reiki" },
              { name: "The Tannery Wellness Center", type: "Multiple Practitioners", price: "$$", services: "Massage, chiropractic, wellness" }
            ].map((spa, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{spa.name}</h3>
                  <span className="text-sm font-semibold text-purple-600">{spa.price}</span>
                </div>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{spa.type}</span>
                </div>
                <p className="text-gray-600">{spa.services}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Wellness by Type</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3">🌿 Mind-Body</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Yoga (multiple studios)</li>
                <li>• Meditation classes</li>
                <li>• Tai Chi in parks</li>
                <li>• Breathwork sessions</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-3">🏋️ Strength & Cardio</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• CrossFit gyms</li>
                <li>• Rock climbing</li>
                <li>• Rowing studio</li>
                <li>• Traditional gyms</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3">💆 Relaxation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Full-service spas</li>
                <li>• Massage therapy</li>
                <li>• Hot tub experiences</li>
                <li>• Acupuncture</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3">🌊 Outdoor Wellness</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Beach yoga</li>
                <li>• Surfing (therapy!)</li>
                <li>• Forest bathing hikes</li>
                <li>• Paddleboard yoga</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-teal-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Wellness in Santa Cruz?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🌊</div>
              <h3 className="font-bold mb-2">Ocean Energy</h3>
              <p className="text-sm text-gray-700">Negative ions from the ocean boost mood and energy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌲</div>
              <h3 className="font-bold mb-2">Redwood Healing</h3>
              <p className="text-sm text-gray-700">Ancient forests provide natural stress relief</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">☀️</div>
              <h3 className="font-bold mb-2">Year-Round Activity</h3>
              <p className="text-sm text-gray-700">Mild climate perfect for outdoor wellness</p>
            </div>
          </div>
        </section>

        <div className="bg-teal-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore All Wellness Options</h2>
          <p className="text-xl mb-6">Find gyms, studios, and wellness practitioners</p>
          <Link href="/wellness" className="inline-block px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-50">
            View Wellness Directory
          </Link>
        </div>
      </div>
    </main>
  );
}

