import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tonight in Santa Cruz - Evening Plans & Nightlife',
  description: 'What to do tonight in Santa Cruz. Live music, bars, restaurants, sunset spots, and nightlife. Your complete evening guide for right now.',
  keywords: ['tonight Santa Cruz', 'nightlife Santa Cruz', 'evening plans', 'live music tonight', 'bars Santa Cruz', 'what to do tonight'],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is there to do tonight in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tonight in Santa Cruz: Catch sunset at West Cliff Drive or Natural Bridges (check sunset time), enjoy dinner downtown or at the harbor, see live music at The Catalyst, Kuumbwa Jazz, or Moe's Alley, visit bars and breweries on Pacific Avenue, or take an evening beach walk along Main Beach or the Wharf."
      }
    },
    {
      "@type": "Question",
      "name": "Where is the best nightlife in Santa Cruz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best nightlife spots include The Catalyst (live bands, dancing), Kuumbwa Jazz Center (world-class jazz), Seabright Brewery (craft beer, food), 515 Kitchen & Cocktails (upscale cocktails), The Crepe Place (bohemian vibe, live music), Blue Lagoon (cocktail lounge), and Motiv (club/lounge)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Santa Cruz safe at night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Santa Cruz is generally safe at night, especially in well-lit areas like downtown Pacific Avenue, the Wharf, and populated restaurant/bar districts. Stick to main streets, travel in groups when possible, use rideshare for late-night transport, and be aware of your surroundings. Beach areas can be dark - bring a flashlight."
      }
    },
    {
      "@type": "Question",
      "name": "What time does sunset happen in Santa Cruz today?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sunset time in Santa Cruz varies by season: around 5:30pm in winter (December-February) and 8:30pm in summer (June-August). Check today's exact sunset time online before heading out. Best sunset viewing spots are West Cliff Drive, Natural Bridges, and Lighthouse Point."
      }
    }
  ]
};

export default function TonightGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="text-gray-300 hover:text-white font-medium mb-8 inline-flex items-center gap-2"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span>🌙</span>
            <span className="text-sm font-semibold">Right Now</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tonight in Santa Cruz
          </h1>
          <p className="text-xl text-gray-200">
            The sun's going down. Let's make tonight memorable. Here's what's happening RIGHT NOW.
          </p>
        </div>

        {/* Time-Based Quick Guide */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">What Time Is It?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🌅</div>
              <div className="font-semibold">Early Evening (5-7pm)</div>
              <div className="text-sm text-gray-200">Sunset watching, happy hours</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="font-semibold">Dinner Time (7-9pm)</div>
              <div className="text-sm text-gray-200">Restaurants, bars, shows starting</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-semibold">Late Night (9pm+)</div>
              <div className="text-sm text-gray-200">Live music, bars, dancing</div>
            </div>
          </div>
        </div>

        {/* Check NOW */}
        <section className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-400/30 p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">📱 Check These RIGHT NOW</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🎵 Live Music Tonight</h3>
              <div className="space-y-2 text-sm">
                <p><strong>The Catalyst:</strong> Check their website for tonight's lineup (catalystclub.com)</p>
                <p><strong>Moe's Alley:</strong> Blues, jazz, funk - usually $10-20 cover (moesalley.com)</p>
                <p><strong>The Crepe Place:</strong> Free shows on patio some nights</p>
                <p><strong>Kuumbwa Jazz:</strong> Intimate jazz performances (kuumbwajazz.org)</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🎪 Events Calendar</h3>
              <p className="text-sm">
                Check our <Link href="/events" className="text-yellow-300 hover:text-yellow-100 underline">Events Page</Link> for 
                tonight's happenings - concerts, comedy shows, special events, and more.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🌅 Sunset Time</h3>
              <p className="text-sm">
                Google "sunset today Santa Cruz" - then head to Lighthouse Point, Natural Bridges, 
                or the Wharf 30 minutes before for perfect views.
              </p>
            </div>
          </div>
        </section>

        {/* Sunset & Early Evening */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌅</span>
            <div>
              <h2 className="text-3xl font-bold">Sunset & Early Evening (5-7pm)</h2>
              <p className="text-gray-200">Start the night right</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Best Sunset Spots</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-semibold">🔆 Lighthouse Point (West Cliff Drive)</p>
                  <p className="text-sm text-gray-200">The classic. Benches, unobstructed views, surfing museum.</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <p className="font-semibold">🌊 Natural Bridges State Beach</p>
                  <p className="text-sm text-gray-200">Rock formations, tide pools, dramatic silhouettes.</p>
                </div>
                <div className="border-l-4 border-pink-400 pl-4">
                  <p className="font-semibold">🎡 Santa Cruz Wharf</p>
                  <p className="text-sm text-gray-200">Walk out over the water, sea lions, restaurants with views.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Happy Hours (5-7pm)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🍺 Craft Beer</p>
                  <p className="text-sm text-gray-200">Humble Sea Brewing, Santa Cruz Mountain Brewing, Seabright Brewery</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🍷 Wine & Cocktails</p>
                  <p className="text-sm text-gray-200">Soif Wine Bar, Venus Spirits, Seabright Social</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🌮 Food Specials</p>
                  <p className="text-sm text-gray-200">Check our <Link href="/deals" className="text-yellow-300 hover:text-yellow-100 underline">Deals Page</Link> for tonight's happy hours</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🏖️ Beach Bars</p>
                  <p className="text-sm text-gray-200">Crow's Nest, Zelda's on the Beach, The Dream Inn</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dinner */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🍽️</span>
            <div>
              <h2 className="text-3xl font-bold">Dinner Options (7-9pm)</h2>
              <p className="text-gray-200">From casual to upscale</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">🚶 Walk-In Friendly (No Reservation)</h3>
              <p className="text-sm text-gray-200 mb-2">
                <strong>Pizza:</strong> Pizza My Heart, Woodstock's, Pleasure Pizza<br/>
                <strong>Mexican:</strong> Taqueria Vallarta, Tacos Moreno, Los Pericos<br/>
                <strong>Asian:</strong> Akira (sushi & ramen), Pho 75, Bantam (sit at bar)<br/>
                <strong>Burgers:</strong> Betty Burgers, The Picnic Basket
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">📅 Call Ahead (May Have Openings)</h3>
              <p className="text-sm text-gray-200 mb-2">
                <strong>Italian:</strong> La Posta, Gabriella Cafe, Ristorante Avanti<br/>
                <strong>Seafood:</strong> Crow's Nest, Aldo's (harbor views)<br/>
                <strong>Upscale:</strong> Oswald, Aquarius at Dream Inn<br/>
                <strong>Farm-to-Table:</strong> Soif
              </p>
            </div>

            <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-400/30">
              <p className="text-sm">
                💡 <strong>Pro Tip:</strong> Bar seating is usually first-come, first-served even at reservation-only restaurants!
              </p>
            </div>
          </div>
        </section>

        {/* Live Music & Shows */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎵</span>
            <div>
              <h2 className="text-3xl font-bold">Live Music & Shows (8pm-2am)</h2>
              <p className="text-gray-200">Check tonight's lineup!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-lg">🎸 The Catalyst</h3>
              <p className="text-sm text-gray-200">
                Main music venue. National acts, local bands. Check catalystclub.com for tonight's show.<br/>
                Usually 8pm doors, $15-40 tickets. Bar upstairs, venue downstairs.
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-bold text-lg">🎺 Moe's Alley</h3>
              <p className="text-sm text-gray-200">
                Blues, jazz, funk. Intimate venue, usually $10-20 cover. Great sound, 21+.<br/>
                Shows start around 9pm. Cash bar.
              </p>
            </div>

            <div className="border-l-4 border-pink-400 pl-4">
              <h3 className="font-bold text-lg">🎹 Kuumbwa Jazz Center</h3>
              <p className="text-sm text-gray-200">
                World-class jazz. Serious listeners, reserved seating. Check kuumbwajazz.org.<br/>
                Usually 7:30pm or 8pm shows. Tickets $20-40.
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold text-lg">🌮 The Crepe Place</h3>
              <p className="text-sm text-gray-200">
                FREE live music on the outdoor patio (some nights). Casual vibe, all ages.<br/>
                Check their Facebook for tonight's schedule.
              </p>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="font-bold text-lg">🍺 Brewery Shows</h3>
              <p className="text-sm text-gray-200">
                Humble Sea, Santa Cruz Mountain Brewing sometimes have acoustic acts.<br/>
                Check their Instagram for tonight's events.
              </p>
            </div>
          </div>
        </section>

        {/* Bars & Nightlife */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🍸</span>
            <div>
              <h2 className="text-3xl font-bold">Bars & Nightlife (9pm-2am)</h2>
              <p className="text-gray-200">Where the night takes you</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">By Vibe</h3>
              
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🕺 Dancing & DJ</p>
                  <p className="text-sm text-gray-200">
                    <strong>The Catalyst:</strong> Dance floor on show nights<br/>
                    <strong>Blue Lagoon:</strong> Dance club (21+, $5-10 cover)<br/>
                    <strong>The Crease:</strong> UCSC students, casual
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🍺 Dive Bars & Casual</p>
                  <p className="text-sm text-gray-200">
                    <strong>Asti:</strong> Local dive, cheap drinks, pool table<br/>
                    <strong>Rush Inn:</strong> Classic dive bar<br/>
                    <strong>99 Bottles:</strong> Craft beer selection<br/>
                    <strong>Seabright Social:</strong> Neighborhood bar, friendly crowd
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🍹 Cocktails & Upscale</p>
                  <p className="text-sm text-gray-200">
                    <strong>Venus Spirits:</strong> Craft cocktails, distillery<br/>
                    <strong>Soif Wine Bar:</strong> Wine-focused, small plates
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🏖️ Beach Bars</p>
                  <p className="text-sm text-gray-200">
                    <strong>Dream Inn:</strong> Upstairs bar, ocean views<br/>
                    <strong>Crow's Nest:</strong> Harbor views, older crowd<br/>
                    <strong>Zelda's:</strong> Right on the sand, casual
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">🎮 Games & Activities</p>
                  <p className="text-sm text-gray-200">
                    <strong>Round 1:</strong> Arcade, bowling, karaoke (until 2am)<br/>
                    <strong>Santa Cruz Bowl:</strong> Bowling, arcade, bar<br/>
                    <strong>Beach Boardwalk:</strong> Arcade open late (summer)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Late Night Eats */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌮</span>
            <div>
              <h2 className="text-3xl font-bold">Late Night Eats (10pm-Midnight+)</h2>
              <p className="text-gray-200">When hunger strikes</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">🍕 Pizza</p>
              <p className="text-sm text-gray-200">
                <strong>Pizza My Heart:</strong> Open until 2am on weekends, huge slices<br/>
                <strong>Woodstock's Pizza:</strong> Open late, delivery available
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">🌮 Tacos</p>
              <p className="text-sm text-gray-200">
                <strong>Taqueria Vallarta:</strong> Multiple locations, some open until midnight<br/>
                <strong>Tacos Moreno:</strong> Late-night taco window
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">🍔 Fast Food</p>
              <p className="text-sm text-gray-200">
                <strong>In-N-Out Burger:</strong> Drive-thru until 1am<br/>
                <strong>Jack in the Box:</strong> 24 hours<br/>
                <strong>Taco Bell:</strong> Drive-thru until 2am
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-semibold mb-2">🍝 Sit-Down Options</p>
              <p className="text-sm text-gray-200">
                <strong>Denny's:</strong> 24 hours<br/>
                <strong>IHOP:</strong> Open late
              </p>
            </div>
          </div>
        </section>

        {/* Safety & Practical Info */}
        <section className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">🛡️ Stay Safe Tonight</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🚗 Getting Around</h3>
              <p className="text-sm text-gray-200">
                <strong>Uber/Lyft:</strong> Available throughout Santa Cruz<br/>
                <strong>Designated Driver:</strong> Plan ahead if drinking<br/>
                <strong>Parking:</strong> Downtown has lots, but they close at 2am
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">⏰ Last Call</h3>
              <p className="text-sm text-gray-200">
                California law: Bars stop serving at 1:30am, close at 2am.<br/>
                Plan your night accordingly!
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📱 Stay Connected</h3>
              <p className="text-sm text-gray-200">
                Keep your phone charged. Tell someone where you're going. Have fun but be smart!
              </p>
            </div>
          </div>
        </section>

        {/* Budget Guide */}
        <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">💰 Tonight's Budget</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-500/20 rounded-lg p-4">
              <h3 className="font-bold mb-2">Chill Night ($20-40)</h3>
              <p className="text-sm text-gray-200">
                Sunset (FREE) → Dive bar ($10-15) → Late night tacos ($8-12) → Uber home ($10-15)
              </p>
            </div>

            <div className="bg-yellow-500/20 rounded-lg p-4">
              <h3 className="font-bold mb-2">Standard Night ($50-100)</h3>
              <p className="text-sm text-gray-200">
                Happy hour ($15-20) → Dinner ($30-50) → Bar hopping ($20-30) → Uber ($10-15)
              </p>
            </div>

            <div className="bg-orange-500/20 rounded-lg p-4">
              <h3 className="font-bold mb-2">Full Night Out ($100-150)</h3>
              <p className="text-sm text-gray-200">
                Nice dinner ($50-80) → Concert ticket ($25-40) → Drinks ($30-50) → Late night food ($15) → Uber ($15)
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="font-bold text-xl mb-4">Plan Your Night</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/events" className="text-yellow-300 hover:text-yellow-100 font-medium">
              → Tonight's Events Calendar
            </Link>
            <Link href="/deals" className="text-yellow-300 hover:text-yellow-100 font-medium">
              → Happy Hour Deals
            </Link>
            <Link href="/restaurants" className="text-yellow-300 hover:text-yellow-100 font-medium">
              → All Restaurants
            </Link>
            <Link href="/guides/last-minute" className="text-yellow-300 hover:text-yellow-100 font-medium">
              → Last-Minute Plans Guide
            </Link>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

