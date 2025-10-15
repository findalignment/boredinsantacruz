import Link from 'next/link';

interface FeaturedSpotlight {
  id: string;
  title: string;
  type: 'activity' | 'restaurant';
  description: string;
  specialOffer?: string;
  imageUrl?: string;
  link: string;
  ctaText: string;
}

// This would come from Airtable with a "Featured" flag or premium tier
const FEATURED_SPOTLIGHTS: FeaturedSpotlight[] = [
  {
    id: '1',
    title: 'Kayaking Adventure',
    type: 'activity',
    description: 'Explore Monterey Bay with expert guides. Perfect for beginners!',
    specialOffer: '10% off with code BORED10',
    link: '/activity/kayaking',
    ctaText: 'Book Now',
  },
];

export function FeaturedLocalSpotlight() {
  // In production, fetch from Airtable with premium/featured flag
  const spotlight = FEATURED_SPOTLIGHTS[0];
  
  if (!spotlight) return null;

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xs mb-4 w-fit">
                <span className="text-lg">⭐</span>
                FEATURED LOCAL SPOTLIGHT
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {spotlight.title}
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                {spotlight.description}
              </p>

              {spotlight.specialOffer && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
                  <p className="text-sm font-semibold text-yellow-800">
                    🎁 SPECIAL OFFER
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {spotlight.specialOffer}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Link
                  href={spotlight.link}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {spotlight.ctaText}
                  <span>→</span>
                </Link>
                <Link
                  href={spotlight.link}
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl border-2 border-purple-500 hover:bg-purple-50 transition-all"
                >
                  Learn More
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                <em>Sponsored • Supporting local businesses</em>
              </p>
            </div>

            {/* Image */}
            <div className="bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center p-8">
              {spotlight.imageUrl ? (
                <img 
                  src={spotlight.imageUrl} 
                  alt={spotlight.title}
                  className="rounded-2xl shadow-xl w-full h-full object-cover"
                />
              ) : (
                <div className="text-8xl">
                  {spotlight.type === 'activity' ? '🚣' : '🍽️'}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-white text-sm mt-6">
          <strong>Want to feature your business here?</strong> Contact us to learn about our local partnership opportunities.
        </p>
      </div>
    </section>
  );
}

