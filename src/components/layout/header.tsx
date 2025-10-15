import Link from 'next/link';
import { Suspense } from 'react';
import { getActivitiesForSearch } from '@/app/actions/searchActivities';
import { SearchDialog } from '@/components/search/search-dialog';
import { UserButton } from '@/components/auth/user-button';
import { MobileMenu } from './mobile-menu';

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
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search */}
            <div className="hidden sm:block">
              <Suspense fallback={<div className="w-24 h-10"></div>}>
                <SearchButton />
              </Suspense>
            </div>
            
            {/* Desktop Links - Simplified Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Things to Do Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm whitespace-nowrap inline-flex items-center gap-1">
                  Things to Do
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                  <div className="py-2">
                    <Link href="/activities" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      🎯 All Activities
                    </Link>
                    <Link href="/restaurants" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      🍽️ Restaurants
                    </Link>
                    <Link href="/wellness" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      🧘 Wellness
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link href="/restaurant-week" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      🍽️ Restaurant Week
                    </Link>
                    <Link href="/sunny" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      ☀️ Sunny Days
                    </Link>
                    <Link href="/rainy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600">
                      🌧️ Rainy Days
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link
                href="/events"
                className="px-3 py-2 text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm whitespace-nowrap"
              >
                Tonight
              </Link>
              
              <Link
                href="/deals"
                className="px-3 py-2 text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm whitespace-nowrap"
              >
                Deals
              </Link>
              
              <Link
                href="/map"
                className="px-3 py-2 text-gray-700 hover:text-cyan-600 font-medium transition-all text-sm whitespace-nowrap"
              >
                Map
              </Link>
            </div>
            
            {/* User Button */}
            <UserButton />
            
            {/* Hamburger Menu */}
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
