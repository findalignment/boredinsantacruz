'use client';

import { useEffect } from 'react';

interface DisplayAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Google AdSense Display Ad Component
 * Renders responsive AdSense ads
 */
export function DisplayAd({ 
  slot, 
  format = 'auto',
  responsive = true,
  className = '',
  style = {}
}: DisplayAdProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-7548261434721134"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

