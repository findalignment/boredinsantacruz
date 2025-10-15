import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { FilteredRestaurants } from '@/components/restaurants/filtered-restaurants';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Valid restaurant categories
const CATEGORIES = {
  'italian': { name: 'Italian', emoji: '🇮🇹', description: 'Authentic Italian cuisine, from pasta to pizza' },
  'mexican': { name: 'Mexican', emoji: '🌮', description: 'Tacos, burritos, and authentic Mexican flavors' },
  'chinese': { name: 'Chinese', emoji: '🥡', description: 'Traditional and modern Chinese dishes' },
  'japanese': { name: 'Japanese', emoji: '🍣', description: 'Sushi, ramen, and Japanese specialties' },
  'thai': { name: 'Thai', emoji: '🍜', description: 'Spicy curries, pad thai, and Thai classics' },
  'indian': { name: 'Indian', emoji: '🍛', description: 'Flavorful curries, naan, and Indian cuisine' },
  'american': { name: 'American', emoji: '🍔', description: 'Burgers, comfort food, and American classics' },
  'seafood': { name: 'Seafood', emoji: '🦞', description: 'Fresh catches and ocean-to-table dining' },
  'pizza': { name: 'Pizza', emoji: '🍕', description: 'Wood-fired, traditional, and creative pizzas' },
  'cafe': { name: 'Cafes', emoji: '☕', description: 'Coffee, pastries, and light meals' },
  'bar': { name: 'Bars & Pubs', emoji: '🍺', description: 'Craft cocktails, local brews, and pub fare' },
  'vegetarian': { name: 'Vegetarian', emoji: '🥗', description: 'Plant-based and vegetarian options' },
  'vegan': { name: 'Vegan', emoji: '🌱', description: '100% plant-based dining' },
  'bakery': { name: 'Bakeries', emoji: '🥐', description: 'Fresh bread, pastries, and baked goods' },
  'dessert': { name: 'Desserts', emoji: '🍰', description: 'Sweet treats, ice cream, and desserts' },
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
    title: `${categoryInfo.name} Restaurants in Santa Cruz`,
    description: `Discover the best ${categoryInfo.name.toLowerCase()} restaurants in Santa Cruz. ${categoryInfo.description}`,
    openGraph: {
      title: `${categoryInfo.name} Restaurants - Santa Cruz`,
      description: categoryInfo.description,
    },
  };
}

export default async function RestaurantCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];

  if (!categoryInfo) {
    notFound();
  }

  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];

  // Filter restaurants by category/cuisine
  const filteredRestaurants = allRestaurants.filter(restaurant => {
    const cuisineLower = restaurant.cuisine?.toLowerCase() || '';
    const tagsLower = restaurant.tags?.map(t => t.toLowerCase()) || [];
    const categoryLower = category.toLowerCase();
    
    // Check if cuisine or tags match the category
    return cuisineLower.includes(categoryLower) || 
           tagsLower.some(tag => tag.includes(categoryLower)) ||
           (categoryLower === 'vegetarian' && restaurant.vegetarianFriendly) ||
           (categoryLower === 'vegan' && restaurant.veganOptions);
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/restaurants"
          className="text-orange-600 hover:text-orange-700 font-medium mb-6 inline-flex items-center gap-2"
        >
          ← Back to All Restaurants
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{categoryInfo.emoji}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {categoryInfo.name} Restaurants
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
            Found <strong>{filteredRestaurants.length}</strong> {categoryInfo.name.toLowerCase()} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} in Santa Cruz
          </p>
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] block"
              >
                {restaurant.image ? (
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-6xl">{categoryInfo.emoji}</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {restaurant.name}
                    </h3>
                    {restaurant.priceLevel > 0 && (
                      <span className="text-orange-600 font-semibold ml-2">
                        {'$'.repeat(restaurant.priceLevel)}
                      </span>
                    )}
                  </div>
                  {restaurant.cuisine && (
                    <p className="text-sm text-orange-600 font-medium mb-2">
                      {restaurant.cuisine.join(', ')}
                    </p>
                  )}
                  {restaurant.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {restaurant.description}
                    </p>
                  )}
                  {restaurant.address && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      📍 {restaurant.neighborhood || restaurant.address.split(',')[0]}
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
              No {categoryInfo.name} Restaurants Yet
            </h3>
            <p className="text-gray-600 mb-6">
              We haven't found any {categoryInfo.name.toLowerCase()} restaurants in our database yet. Check back soon!
            </p>
            <Link
              href="/restaurants"
              className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Browse All Restaurants
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Other Cuisines
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(CATEGORIES)
              .filter(([key]) => key !== category)
              .slice(0, 10)
              .map(([key, info]) => (
                <Link
                  key={key}
                  href={`/restaurants/${key}`}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors text-center"
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

