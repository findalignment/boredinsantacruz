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
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌊</span>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
              className="text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm lg:text-base whitespace-nowrap hover:scale-105"
            >
              <span className="sm:hidden">🗺️</span>
              <span className="hidden sm:inline">🗺️ Map</span>
            </Link>
            
            <Link
              href="/tonight"
              className="hidden md:block text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm lg:text-base whitespace-nowrap hover:scale-105"
            >
              🎉 Tonight
            </Link>
            
            <Link
              href="/best-time"
              className="hidden lg:block text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm lg:text-base whitespace-nowrap hover:scale-105"
            >
              🗓️ Best Time
            </Link>
            
            <Link
              href="/activities"
              className="hidden lg:block text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm lg:text-base hover:scale-105"
            >
              Activities
            </Link>
            
            <Link
              href="/restaurants"
              className="hidden xl:block text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm lg:text-base hover:scale-105"
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
