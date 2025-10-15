'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/', emoji: '🏠' },
    { label: 'Activities', href: '/activities', emoji: '🎯' },
    { label: 'Restaurants', href: '/restaurants', emoji: '🍽️' },
    { label: 'Restaurant Week', href: '/restaurant-week', emoji: '🍽️' },
    { label: 'Events', href: '/events', emoji: '🎉' },
    { label: 'Deals', href: '/deals', emoji: '🍻' },
    { label: 'Wellness', href: '/wellness', emoji: '🧘' },
    { label: 'Sunny Days', href: '/sunny', emoji: '☀️' },
    { label: 'Rainy Days', href: '/rainy', emoji: '🌧️' },
    { label: 'Trip Planner', href: '/trips', emoji: '🗺️' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-50 via-white to-cyan-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Menu
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* SEO Pages Section */}
          <div className="px-3">
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Popular Guides
            </h3>
            <div className="space-y-1">
              {[
                { label: 'Weekend Guide', href: '/weekend-guide' },
                { label: 'Best Beaches', href: '/best-beaches' },
                { label: 'Surfing Spots', href: '/best-surfing-spots' },
                { label: 'Free Things', href: '/free-things-to-do' },
                { label: 'Kid Friendly', href: '/kid-friendly-activities' },
                { label: 'Pet Friendly', href: '/pet-friendly-activities' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Bored in Santa Cruz
          </p>
        </div>
      </div>
    </>
  );
}

