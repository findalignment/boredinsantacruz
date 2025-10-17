'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function EventbriteAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      // Get the authorization URL from our API
      const response = await fetch('/api/eventbrite/initiate');
      const data = await response.json();
      
      if (data.authUrl) {
        // Redirect to Eventbrite OAuth
        window.location.href = data.authUrl;
      } else {
        throw new Error('Failed to get authorization URL');
      }
    } catch (error) {
      console.error('Eventbrite auth error:', error);
      alert('Failed to initiate Eventbrite authentication');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoading}
      className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Connecting...
        </>
      ) : (
        <>
          🎫 Connect to Eventbrite
        </>
      )}
    </button>
  );
}
