import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Westside Santa Cruz Guide: Beaches, Surfing & Coastal Living | 2025',
  description: 'Complete guide to Westside Santa Cruz. Natural Bridges, Its Beach, West Cliff Drive, surfing, tide pools, and the best coastal neighborhood.',
  keywords: ['westside santa cruz', 'natural bridges', 'its beach', 'west cliff drive', 'santa cruz surfing', 'coastal living santa cruz'],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What beaches are in Westside Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Westside Santa Cruz beaches include Natural Bridges State Beach (tide pools, sunset views, $10 parking), Its Beach (romantic cove, stairs down), Mitchell's Cove (dog-friendly), and Lighthouse Field State Beach. West Cliff Drive connects them all via a scenic coastal walking/biking path."
      }
    },
    {
      "@type": "Question",
      "name": "What is West Cliff Drive in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "West Cliff Drive is a scenic 2-mile coastal road with a paved walking/biking path along the cliffs. It offers stunning ocean views, surf watching at Steamer Lane, seal spotting at Seal Rock, the Lighthouse & Surfing Museum, and connects Natural Bridges to the Wharf. It's free and open 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Where is the best surfing in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best surf spots in Westside Santa Cruz: Steamer Lane (world-famous, advanced), The Hook/Pleasure Point (long right point break, intermediate), Cowells Beach (beginner-friendly longboarding), and Four Mile Beach (powerful, advanced). Steamer Lane hosts professional competitions and is visible from West Cliff Drive."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time to visit Natural Bridges for tide pools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit Natural Bridges tide pools during low tide, ideally at minus tides (-0.5 feet or lower). Check tide charts for Santa Cruz. Best months are winter/spring when tides are lowest. Arrive 1-2 hours before low tide. You'll see anemones, starfish, crabs, and small fish. Parking is $10/day."
      }
    }
  ]
};

export default function WestsidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <section className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🌊</span>
            <span className="font-semibold">Neighborhood Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Westside Santa Cruz
          </h1>
          
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Coastal paradise with world-class surf breaks, stunning beaches, and the iconic West Cliff Drive.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Facts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold text-cyan-600 mb-2">🎯 Best For</div>
              <p className="text-gray-700">Beaches, surfing, coastal walks, sunset views, tide pools</p>
            </div>
            
            <div>
              <div className="font-bold text-cyan-600 mb-2">👥 Vibe</div>
              <p className="text-gray-700">Laid-back, surf culture, residential, natural beauty</p>
            </div>
            
            <div>
              <div className="font-bold text-cyan-600 mb-2">🚶 Walkability</div>
              <p className="text-gray-700">Excellent coastal trail (2 miles paved), residential streets</p>
            </div>
            
            <div>
              <div className="font-bold text-cyan-600 mb-2">🅿️ Parking</div>
              <p className="text-gray-700">Natural Bridges ($10), Its Beach (street, free), West Cliff (2-hr free)</p>
            </div>
          </div>
        </div>

        {/* Main Beaches */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏖️ Beaches</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-cyan-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Natural Bridges State Beach</h3>
              <p className="text-gray-700 mb-3">
                The crown jewel of Westside. Famous for its natural rock arch, tide pools, and monarch butterfly migration.
              </p>
              <div className="bg-cyan-50 rounded-lg p-4 mb-3">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Tide Pools:</strong> Best at low tide, see anemones, crabs, sea stars</li>
                  <li>• <strong>Monarch Butterflies:</strong> Oct-Feb, peak in November (thousands!)</li>
                  <li>• <strong>Beach:</strong> Sandy, protected cove, swimming possible</li>
                  <li>• <strong>Sunset:</strong> Prime spot, arch silhouette</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Parking:</strong> $10/day • <strong>Hours:</strong> 8am-sunset • <strong>Facilities:</strong> Restrooms, picnic areas
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Its Beach (Mitchell's Cove)</h3>
              <p className="text-gray-700 mb-3">
                Local favorite. Dog-friendly, less crowded, tide pools at the point.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Dogs Allowed:</strong> Off-leash before 10am & after 4pm</li>
                  <li>• <strong>Tide Pools:</strong> North end of beach at low tide</li>
                  <li>• <strong>Swimming:</strong> Can be rough, strong rip currents</li>
                  <li>• <strong>Locals' Beach:</strong> Fewer tourists, community vibe</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Parking:</strong> Free street parking (limited) • <strong>Access:</strong> Stairs/ramp from West Cliff
              </div>
            </div>

            <div className="border-l-4 border-indigo-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lighthouse Point (Steamer Lane)</h3>
              <p className="text-gray-700 mb-3">
                World-famous surf break. Watch pros surf 20+ foot waves in winter.
              </p>
              <div className="bg-indigo-50 rounded-lg p-4 mb-3">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Surfing:</strong> Expert level only, heavy local vibe</li>
                  <li>• <strong>Surfing Museum:</strong> In lighthouse, small donation</li>
                  <li>• <strong>Viewing:</strong> Best surfing spectator spot</li>
                  <li>• <strong>Sunset:</strong> Iconic with lighthouse</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Parking:</strong> Free street (limited) • <strong>Museum Hours:</strong> Thu-Mon, 12-4pm
              </div>
            </div>
          </div>
        </div>

        {/* West Cliff Drive */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚶 West Cliff Drive</h2>
          
          <p className="text-gray-700 mb-4">
            The 2-mile paved coastal trail. Santa Cruz's most scenic walk with ocean views, surfers, and marine life.
          </p>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Trail Highlights:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Distance:</strong> 2 miles one-way (Natural Bridges to Lighthouse)</li>
              <li>• <strong>Paved:</strong> Perfect for walking, jogging, skating, biking</li>
              <li>• <strong>Benches:</strong> Many spots to sit and watch ocean</li>
              <li>• <strong>Wildlife:</strong> Seals, sea otters, dolphins, whales (winter)</li>
              <li>• <strong>Surfers:</strong> Watch world-class surfing at multiple breaks</li>
              <li>• <strong>Memorials:</strong> Plaques honoring surfers, benches with dedications</li>
            </ul>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 rounded">
            <strong className="text-cyan-900">💡 Best Times:</strong> Early morning (fewer people, often see whales), 
            late afternoon (golden hour), sunset (spectacular)
          </div>
        </div>

        {/* Dining */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🍽️ Dining on the Westside</h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">With Ocean Views:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Aldo's Harbor Restaurant</strong> — Waterfront, seafood, breakfast/lunch</li>
                <li>• <strong>Dream Inn Beach Bar</strong> — Cocktails, ocean views, hotel guests welcome</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Nearby Westside:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Westside Coffee</strong> — Local coffee shop, neighborhood hub</li>
                <li>• <strong>New Leaf Community Market</strong> — Organic grocery, deli, good sandwiches</li>
                <li>• <strong>Betty's Noodles</strong> — Asian fusion, casual</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm italic mt-4">
              Note: Westside is mostly residential. Most dining is downtown (5-10 min drive).
            </p>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏄 Activities & Things to Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">🏄 Surfing</h4>
              <p className="text-gray-700 text-sm mb-2">
                Beginner-friendly beaches nearby. Westside spots are for experienced surfers.
              </p>
              <ul className="text-sm text-gray-700">
                <li>• Rent boards downtown</li>
                <li>• Lessons at Cowell's Beach</li>
                <li>• Watch pros at Steamer Lane</li>
              </ul>
            </div>

            <div className="bg-cyan-50 rounded-lg p-4">
              <h4 className="font-bold text-cyan-900 mb-2">🐚 Tide Pooling</h4>
              <p className="text-gray-700 text-sm mb-2">
                Best at low tide (check tide charts). See incredible marine life.
              </p>
              <ul className="text-sm text-gray-700">
                <li>• Natural Bridges (best)</li>
                <li>• Its Beach north end</li>
                <li>• Look, don't touch!</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">🚴 Biking</h4>
              <p className="text-gray-700 text-sm mb-2">
                West Cliff Drive is perfect for cycling.
              </p>
              <ul className="text-sm text-gray-700">
                <li>• Rent bikes downtown</li>
                <li>• Paved, mostly flat</li>
                <li>• Connect to other trails</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-bold text-purple-900 mb-2">🦋 Butterfly Viewing</h4>
              <p className="text-gray-700 text-sm mb-2">
                October-February: Monarch butterfly migration at Natural Bridges.
              </p>
              <ul className="text-sm text-gray-700">
                <li>• Peak: November</li>
                <li>• Thousands cluster in eucalyptus</li>
                <li>• Free viewing area</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Local Tips */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Local Tips</h2>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌊</span>
              <div>
                <strong>Swimming Safety:</strong> Strong rip currents. Swim at Natural Bridges cove (protected). 
                Never turn your back on ocean. No lifeguards at most Westside beaches.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🅿️</span>
              <div>
                <strong>Parking Strategy:</strong> Natural Bridges lot fills by 11am weekends. Street parking on 
                West Cliff is free but limited (2-hr). Early morning = best parking.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <strong>Best Sunset Spot:</strong> Lighthouse Point or Natural Bridges. Arrive 30 min early for 
                golden hour. Bring layers—gets cold fast!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🐕</span>
              <div>
                <strong>Dogs:</strong> Allowed at Its Beach (off-leash before 10am/after 4pm). NOT allowed at 
                Natural Bridges. Always clean up!
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <strong>Neighborhood:</strong> Mostly residential, very few businesses. Locals are friendly but 
                protective of their beaches. Respect private property.
              </div>
            </li>
          </ul>
        </div>

        {/* Related */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Neighborhoods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/neighborhoods/downtown" className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏙️</div>
              <div className="font-bold text-gray-900 mb-1">Downtown</div>
              <div className="text-gray-600 text-sm">Shopping & dining hub</div>
            </Link>
            
            <Link href="/neighborhoods/capitola" className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏘️</div>
              <div className="font-bold text-gray-900 mb-1">Capitola Village</div>
              <div className="text-gray-600 text-sm">Charming beach town</div>
            </Link>

            <Link href="/neighborhoods/harbor" className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-2">⚓</div>
              <div className="font-bold text-gray-900 mb-1">Seabright/Harbor</div>
              <div className="text-gray-600 text-sm">Working waterfront</div>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

