import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getWellness } from '@/app/actions/getWellness';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Valid wellness categories
const CATEGORIES = {
  'yoga': { name: 'Yoga', emoji: '🧘', description: 'Yoga studios and classes for all levels' },
  'pilates': { name: 'Pilates', emoji: '🤸', description: 'Pilates studios and mat classes' },
  'gym': { name: 'Gyms', emoji: '💪', description: 'Full-service gyms and fitness centers' },
  'massage': { name: 'Massage', emoji: '💆', description: 'Massage therapy and bodywork' },
  'spa': { name: 'Spas', emoji: '🧖', description: 'Day spas and wellness retreats' },
  'crossfit': { name: 'CrossFit', emoji: '🏋️', description: 'CrossFit boxes and functional fitness' },
  'martial-arts': { name: 'Martial Arts', emoji: '🥋', description: 'Karate, jiu-jitsu, and martial arts' },
  'dance': { name: 'Dance', emoji: '💃', description: 'Dance studios and classes' },
  'cycling': { name: 'Cycling', emoji: '🚴', description: 'Spin classes and cycling studios' },
  'acupuncture': { name: 'Acupuncture', emoji: '📍', description: 'Acupuncture and traditional medicine' },
  'chiropractic': { name: 'Chiropractic', emoji: '🦴', description: 'Chiropractic care and adjustments' },
  'physical-therapy': { name: 'Physical Therapy', emoji: '🩺', description: 'Physical therapy and rehabilitation' },
} as const;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryInfo.name} in Santa Cruz`,
    description: `Find the best ${categoryInfo.name.toLowerCase()} facilities in Santa Cruz. ${categoryInfo.description}`,
    openGraph: {
      title: `${categoryInfo.name} - Santa Cruz Wellness`,
      description: categoryInfo.description,
    },
  };
}

export default async function WellnessCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];

  if (!categoryInfo) {
    notFound();
  }

  const result = await getWellness();
  const allWellness = result.success ? result.data : [];

  // Filter wellness facilities by category
  const filteredWellness = allWellness.filter(facility => {
    const wellnessTypes = facility.wellnessType?.map(t => t.toLowerCase()) || [];
    const categoryName = facility.category?.toLowerCase() || '';
    const categoryLower = category.toLowerCase().replace('-', ' ');
    
    return wellnessTypes.some(type => type.toLowerCase().includes(categoryLower)) ||
           categoryName.includes(categoryLower);
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/wellness"
          className="text-green-600 hover:text-green-700 font-medium mb-6 inline-flex items-center gap-2"
        >
          ← Back to All Wellness
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{categoryInfo.emoji}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {categoryInfo.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Found <strong>{filteredWellness.length}</strong> {filteredWellness.length === 1 ? 'facility' : 'facilities'}
          </p>
        </div>

        {/* Wellness Grid */}
        {filteredWellness.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWellness.map((facility) => (
              <Link
                key={facility.id}
                href={`/wellness/${facility.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] block"
              >
                {facility.photoUrl ? (
                  <div className="h-48">
                    <img src={facility.photoUrl} alt={facility.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <span className="text-6xl">{categoryInfo.emoji}</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {facility.name}
                    </h3>
                    {facility.priceRange && (
                      <span className="text-green-600 font-semibold ml-2">{facility.priceRange}</span>
                    )}
                  </div>
                  {facility.wellnessType && facility.wellnessType.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {facility.wellnessType.slice(0, 3).map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                  {facility.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {facility.description}
                    </p>
                  )}
                  {facility.address && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      📍 {facility.address.split(',')[0]}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No {categoryInfo.name} Facilities Yet
            </h3>
            <p className="text-gray-600 mb-6">
              We haven't found any {categoryInfo.name.toLowerCase()} facilities in our database yet. Check back soon!
            </p>
            <Link
              href="/wellness"
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse All Wellness
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Other Wellness Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(CATEGORIES)
              .filter(([key]) => key !== category)
              .map(([key, info]) => (
                <Link
                  key={key}
                  href={`/wellness/${key}`}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors text-center"
                >
                  <span className="text-4xl mb-2">{info.emoji}</span>
                  <span className="text-sm font-medium text-gray-900">{info.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

