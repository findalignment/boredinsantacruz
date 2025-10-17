import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getActivities } from '@/app/actions/getActivities';
import { ActivityCard } from '@/components/activity-card';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Valid activity categories
const CATEGORIES = {
  'beach': { name: 'Beach', emoji: '🏖️', description: 'Sun, sand, and surf at Santa Cruz beaches' },
  'hiking': { name: 'Hiking', emoji: '🥾', description: 'Trails through redwoods and coastal paths' },
  'museum': { name: 'Museums', emoji: '🏛️', description: 'Art, history, and cultural attractions' },
  'arts': { name: 'Arts & Culture', emoji: '🎨', description: 'Galleries, theaters, and cultural events' },
  'shopping': { name: 'Shopping', emoji: '🛍️', description: 'Unique shops and local boutiques' },
  'entertainment': { name: 'Entertainment', emoji: '🎭', description: 'Shows, events, and fun activities' },
  'water': { name: 'Water Activities', emoji: '🌊', description: 'Surfing, kayaking, and water sports' },
  'fitness': { name: 'Fitness', emoji: '💪', description: 'Gyms, yoga, and active pursuits' },
  'food': { name: 'Food & Dining', emoji: '🍽️', description: 'Restaurants, cafes, and food experiences' },
  'nightlife': { name: 'Nightlife', emoji: '🌃', description: 'Bars, clubs, and evening entertainment' },
  'nature': { name: 'Nature', emoji: '🌲', description: 'Parks, gardens, and natural areas' },
  'family': { name: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Kid-friendly activities for all ages' },
  'adventure': { name: 'Adventure', emoji: '🧗', description: 'Thrilling outdoor experiences' },
  'relaxation': { name: 'Relaxation', emoji: '🧘', description: 'Spas, wellness, and peaceful spots' },
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
    title: `${categoryInfo.name} Activities in Santa Cruz`,
    description: `Discover the best ${categoryInfo.name.toLowerCase()} activities in Santa Cruz. ${categoryInfo.description}`,
    openGraph: {
      title: `${categoryInfo.name} - Santa Cruz Activities`,
      description: categoryInfo.description,
    },
  };
}

export default async function ActivityCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];

  if (!categoryInfo) {
    notFound();
  }

  const result = await getActivities();
  const allActivities = result.success ? result.data : [];

  // Filter activities by category
  const filteredActivities = allActivities.filter(activity => {
    const tags = activity.tags?.map(t => t.toLowerCase()) || [];
    const categoryLower = category.toLowerCase();
    
    // Check if tags match the category
    return tags.some(tag => tag.includes(categoryLower)) ||
           (categoryLower === 'family' && activity.kidFriendly) ||
           (categoryLower === 'water' && tags.some(t => ['surf', 'kayak', 'paddle', 'swim'].some(w => t.includes(w)))) ||
           (categoryLower === 'nature' && tags.some(t => ['park', 'garden', 'trail', 'nature'].some(w => t.includes(w))));
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/activities"
          className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-flex items-center gap-2"
        >
          ← Back to All Activities
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
            Found <strong>{filteredActivities.length}</strong> {filteredActivities.length === 1 ? 'activity' : 'activities'}
          </p>
        </div>

        {/* Activities Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No {categoryInfo.name} Activities Yet
            </h3>
            <p className="text-gray-600 mb-6">
              We haven't found any {categoryInfo.name.toLowerCase()} activities in our database yet. Check back soon!
            </p>
            <Link
              href="/activities"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Activities
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Other Activities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(CATEGORIES)
              .filter(([key]) => key !== category)
              .slice(0, 10)
              .map(([key, info]) => (
                <Link
                  key={key}
                  href={`/activities/${key}`}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-center"
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

