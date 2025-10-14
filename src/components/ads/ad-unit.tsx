'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

/**
 * Google AdSense Ad Unit Component
 * 
 * Usage:
 * <AdUnit slot="1234567890" format="auto" responsive />
 * 
 * Setup:
 * 1. Sign up for Google AdSense
 * 2. Add NEXT_PUBLIC_ADSENSE_ID to .env
 * 3. Add AdSense script to layout.tsx
 */
export function AdUnit({ slot, format = 'auto', responsive = true, className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        // @ts-ignore - AdSense script adds this globally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Don't show ads if no publisher ID is set
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * Predefined ad slots for common placements
 */
export const AdSlots = {
  HOMEPAGE_HERO: '1234567890', // Replace with actual slot ID
  ACTIVITY_DETAIL_TOP: '2345678901',
  ACTIVITY_DETAIL_SIDEBAR: '3456789012',
  SEARCH_RESULTS: '4567890123',
  BETWEEN_CARDS: '5678901234',
};

/**
 * Homepage ad - between chatbot and recommendations
 */
export function HomepageAd() {
  return (
    <div className="my-8">
      <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
      <AdUnit slot={AdSlots.HOMEPAGE_HERO} format="horizontal" />
    </div>
  );
}

/**
 * Activity detail page ad - after description
 */
export function ActivityDetailAd() {
  return (
    <div className="my-6">
      <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
      <AdUnit slot={AdSlots.ACTIVITY_DETAIL_TOP} format="rectangle" />
    </div>
  );
}

/**
 * Sidebar ad - fixed position (desktop only)
 */
export function SidebarAd() {
  return (
    <div className="hidden lg:block sticky top-4">
      <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
      <AdUnit slot={AdSlots.ACTIVITY_DETAIL_SIDEBAR} format="vertical" responsive={false} />
    </div>
  );
}

/**
 * In-feed ad - between list items
 * Place every 6 items in a list
 */
export function InFeedAd({ index }: { index: number }) {
  // Only show on every 6th item
  if ((index + 1) % 6 !== 0) {
    return null;
  }

  return (
    <div className="my-4">
      <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
      <AdUnit slot={AdSlots.BETWEEN_CARDS} format="auto" />
    </div>
  );
}

