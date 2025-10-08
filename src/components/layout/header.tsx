import Link from 'next/link';

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
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
            <Link
              href="/"
              className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base"
            >
              Home
            </Link>
            <Link
              href="/rainy"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <span className="sm:hidden">🌧️</span>
              <span className="hidden sm:inline">🌧️ Rainy</span>
            </Link>
            <Link
              href="/sunny"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <span className="sm:hidden">☀️</span>
              <span className="hidden sm:inline">☀️ Sunny</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

