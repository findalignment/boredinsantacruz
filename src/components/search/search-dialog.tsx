'use client';

import { useState, useEffect } from 'react';
import { ActivitySearch } from './activity-search';
import type { RainyActivity } from '@/types';

interface SearchDialogProps {
  activities: RainyActivity[];
}

export function SearchDialog({ activities }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Open search with Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
          <span>⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed inset-x-0 top-20 z-50 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl">
          <div className="p-4">
            <ActivitySearch 
              activities={activities}
              placeholder="What do you want to do? (beaches, cafes, hiking...)"
              autoFocus
            />
          </div>
          
          {/* Keyboard Shortcuts */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

