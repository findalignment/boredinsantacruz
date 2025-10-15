'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Google AdSense Script Component
 * Loads AdSense on all pages EXCEPT the homepage
 */
export function AdSenseScript() {
  const pathname = usePathname();
  
  // Don't show ads on homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7548261434721134"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

