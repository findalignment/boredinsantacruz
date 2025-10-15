'use client';

import { useState, useEffect } from 'react';

export function FirstVisitTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(true);

  useEffect(() => {
    // Check if user has seen the tooltip before
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setHasSeenTooltip(false);
      setTimeout(() => setIsVisible(true), 1000); // Show after 1 second
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  if (hasSeenTooltip || !isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={handleDismiss}
      />
      
      {/* Tooltip */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4 animate-slideUp">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-teal-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                👋
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Welcome to Santa Cruz!
                </h3>
                <p className="text-sm text-gray-600">
                  Your personalized local guide
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Tell us what you're looking for</p>
                <p className="text-sm text-gray-600">Type "something fun tonight" or browse categories</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Get weather-aware recommendations</p>
                <p className="text-sm text-gray-600">We adjust suggestions based on current conditions</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Filter by price, time, or distance</p>
                <p className="text-sm text-gray-600">Use our filters to find exactly what you want</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">Try these popular searches:</p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-teal-50 transition-colors">
                🏖️ Best beach
              </button>
              <button className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-teal-50 transition-colors">
                🍕 Pizza tonight
              </button>
              <button className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-teal-50 transition-colors">
                ☀️ Outdoor fun
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleDismiss}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all"
          >
            Got it! Let's explore
          </button>
        </div>
      </div>
    </>
  );
}

