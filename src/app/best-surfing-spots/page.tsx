import Link from 'next/link';
import type { Metadata } from 'next';
import { SurfReportWidget } from '@/components/surf/surf-report-widget';

export const metadata: Metadata = {
  title: 'Best Surfing Spots in Santa Cruz | Live Surf Report 2025',
  description: 'Discover the best surf spots in Santa Cruz for all skill levels. Live surf report, wave heights, and conditions updated every 15 minutes.',
  keywords: 'santa cruz surfing, surf report, steamer lane, cowells beach, pleasure point, surf guide, live surf conditions',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best surf spots in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best surf spots in Santa Cruz include Steamer Lane (world-famous, advanced), Pleasure Point/The Hook (intermediate, longboard-friendly), Cowells Beach (beginner-friendly), Manresa State Beach (powerful beach break), 26th Avenue (fun right point), and Four Mile Beach (heavy, advanced). Each spot offers different wave conditions for varying skill levels."
      }
    },
    {
      "@type": "Question",
      "name": "Is Steamer Lane good for beginner surfers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Steamer Lane is NOT recommended for beginners. It's an advanced surf spot with powerful waves, rocks, strong currents, and crowds. Beginners should start at Cowells Beach (longboard-friendly, mellow waves) or take lessons with a local surf school. Once you have solid fundamentals, you can progress to intermediate spots."
      }
    },
    {
      "@type": "Question",
      "name": "Where is the best place to learn to surf in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cowells Beach is the best place to learn surfing in Santa Cruz. It has mellow, consistent waves, a sandy bottom (safer than rocks), lifeguards in summer, and is close to downtown. Several surf schools operate there including Surf School Santa Cruz, Richard Schmidt Surf School, and Club Ed. Lessons typically run $80-120 for 2 hours."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time to surf in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fall and winter (September-March) typically have the biggest swells in Santa Cruz, with waves from 4-12+ feet at advanced spots. Spring and summer (April-August) have smaller, more consistent waves (2-4 feet) ideal for beginners and intermediates. Early morning offers the best conditions with offshore winds and fewer crowds. Check the surf report before heading out."
      }
    }
  ]
};

export default function BestSurfingSpotsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏄 Best Surfing Spots in Santa Cruz
          </h1>
          <p className="text-xl text-gray-600">
            Live surf report + complete guide to Santa Cruz surf breaks
          </p>
        </div>

        {/* Live Surf Report */}
        <div className="mb-16">
          <SurfReportWidget />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Santa Cruz is the surf capital of Northern California, with world-class breaks, a rich surfing heritage, 
            and perfect waves year-round. Whether you're a first-timer or a seasoned pro, Santa Cruz has the perfect 
            spot for you.
          </p>
        </div>

        {/* Surf Spot Details */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Surf Spot Guide</h2>
          <p className="text-center text-gray-600 mb-8">Detailed breakdown of each surf spot by skill level</p>
        </div>

        {/* Beginner Spots */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🌊 Beginner-Friendly Spots</h2>
          <div className="space-y-6">
            {[
              {
                name: "Cowell Beach",
                difficulty: "Beginner",
                waves: "Gentle, 2-4ft",
                bestTime: "Year-round, best morning",
                why: "Long, slow waves perfect for learning. Soft bottom, lifeguards in summer.",
                parking: "Main Beach parking lot ($)",
                lessons: "Many surf schools operate here"
              },
              {
                name: "26th Avenue (Capitola)",
                difficulty: "Beginner",
                waves: "Small, 2-3ft",
                bestTime: "Summer mornings",
                why: "Protected cove with consistent small waves. Less crowded than Cowell's.",
                parking: "Street parking",
                lessons: "Good for first-timers"
              }
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{spot.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">{spot.difficulty}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-semibold">Waves:</span> {spot.waves}
                  </div>
                  <div>
                    <span className="font-semibold">Best Time:</span> {spot.bestTime}
                  </div>
                  <div>
                    <span className="font-semibold">Parking:</span> {spot.parking}
                  </div>
                  <div>
                    <span className="font-semibold">Lessons:</span> {spot.lessons}
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Why surf here:</strong> {spot.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intermediate Spots */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🌊🌊 Intermediate Spots</h2>
          <div className="space-y-6">
            {[
              {
                name: "Pleasure Point",
                difficulty: "Intermediate",
                waves: "Consistent, 3-6ft",
                bestTime: "Fall/Winter, afternoon",
                why: "Long right-hand point break. Multiple peaks. Great for improving skills.",
                parking: "Street parking, competitive",
                crowd: "Popular, can be crowded"
              },
              {
                name: "The Hook (Pleasure Point)",
                difficulty: "Intermediate",
                waves: "Longboarder-friendly, 3-5ft",
                bestTime: "All seasons",
                why: "Protected by cliffs, consistent waves. Classic longboard spot.",
                parking: "Small lot at Pleasure Point Park",
                crowd: "Very popular with longboarders"
              },
              {
                name: "38th Avenue",
                difficulty: "Intermediate",
                waves: "A-frame peaks, 4-6ft",
                bestTime: "Winter swells",
                why: "Less crowded than Pleasure Point. Good for practicing turns.",
                parking: "Street parking",
                crowd: "Moderate on good days"
              }
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{spot.name}</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">{spot.difficulty}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-semibold">Waves:</span> {spot.waves}
                  </div>
                  <div>
                    <span className="font-semibold">Best Time:</span> {spot.bestTime}
                  </div>
                  <div>
                    <span className="font-semibold">Parking:</span> {spot.parking}
                  </div>
                  <div>
                    <span className="font-semibold">Crowd:</span> {spot.crowd}
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Why surf here:</strong> {spot.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Spots */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🌊🌊🌊 Advanced Spots</h2>
          <div className="space-y-6">
            {[
              {
                name: "Steamer Lane",
                difficulty: "Advanced",
                waves: "Heavy, 6-12ft+",
                bestTime: "Winter, big swells",
                why: "World-famous break. Powerful waves, rocky reef. Pro surfers, competitions.",
                parking: "Lighthouse lot or street",
                warning: "⚠️ Experts only! Very challenging"
              },
              {
                name: "The Slot (Steamer Lane)",
                difficulty: "Expert",
                waves: "Powerful barrels, 8-15ft",
                bestTime: "Big winter swells",
                why: "Most challenging section of Steamer. Heavy takeoff, reef bottom.",
                parking: "Lighthouse Field",
                warning: "⚠️ Dangerous! Know your limits"
              },
              {
                name: "Four Mile Beach",
                difficulty: "Advanced",
                waves: "Hollow, 5-10ft",
                bestTime: "Winter swells",
                why: "Less crowded than Steamer. Powerful waves, scenic location north of town.",
                parking: "Small lot on highway",
                warning: "Remote location, strong currents"
              }
            ].map((spot, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border-2 border-red-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{spot.name}</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">{spot.difficulty}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-semibold">Waves:</span> {spot.waves}
                  </div>
                  <div>
                    <span className="font-semibold">Best Time:</span> {spot.bestTime}
                  </div>
                  <div>
                    <span className="font-semibold">Parking:</span> {spot.parking}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-red-600">{spot.warning}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Why surf here:</strong> {spot.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Surf Guide Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Surf Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">🌊 Best Seasons</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Fall/Winter:</strong> Best waves, bigger swells</li>
                <li>• <strong>Spring:</strong> Consistent, less crowded</li>
                <li>• <strong>Summer:</strong> Smaller waves, warm weather</li>
                <li>• <strong>Year-round:</strong> Always surfable!</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">🏄 Wetsuit Guide</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Summer:</strong> 3/2mm or spring suit</li>
                <li>• <strong>Fall/Spring:</strong> 4/3mm full suit</li>
                <li>• <strong>Winter:</strong> 5/4mm with hood</li>
                <li>• Water temp: 48-60°F year-round</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-cyan-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Surf Santa Cruz?</h2>
          <p className="text-xl mb-6">Find surf lessons, rentals, and more activities</p>
          <Link href="/sunny" className="inline-block px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-cyan-50">
            Explore Water Activities
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}

