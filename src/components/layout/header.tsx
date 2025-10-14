import Link from 'next/link';
import { Suspense } from 'react';
import { getActivitiesForSearch } from '@/app/actions/searchActivities';
import { SearchDialog } from '@/components/search/search-dialog';
import { UserButton } from '@/components/auth/user-button';

async function SearchButton() {
  const result = await getActivitiesForSearch();
  
  if (!result.success || !result.data) {
    return null;
  }

  return <SearchDialog activities={result.data} />;
}

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl">🌊</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Bored in Santa Cruz
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* Search */}
            <Suspense fallback={<div className="w-24 h-10"></div>}>
              <SearchButton />
            </Suspense>
            
            <Link
              href="/map"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <span className="sm:hidden">🗺️</span>
              <span className="hidden sm:inline">🗺️ Map</span>
            </Link>
            
            <Link
              href="/tonight"
              className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              🎉 Tonight
            </Link>
            
            <Link
              href="/best-time"
              className="hidden lg:block text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              🗓️ Best Time
            </Link>
            
            <Link
              href="/activities"
              className="hidden lg:block text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
            >
              Activities
            </Link>
            
            <Link
              href="/restaurants"
              className="hidden xl:block text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
            >
              🍴 Restaurants
            </Link>
            
            {/* User Button */}
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
