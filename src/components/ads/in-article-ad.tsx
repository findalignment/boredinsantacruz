'use client';

import { useEffect } from 'react';

interface InArticleAdProps {
  slot: string;
  className?: string;
}

/**
 * Google AdSense In-Article Ad Component
 * Optimized for content pages
 */
export function InArticleAd({ slot, className = '' }: InArticleAdProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-in-article my-8 ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-2">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-7548261434721134"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  );
}

