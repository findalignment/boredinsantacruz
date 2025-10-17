'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use the fallback token if environment variable is not set
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYm9yZWRpbiIsImEiOiJjbWdyMXM3dTYwYm8zMmxwbnpsMGwyejMyIn0.26BRwWSE2SX17dSj_cL7QQ';

interface ActivityMapProps {
  latitude: number;
  longitude: number;
  name: string;
  address?: string;
  className?: string;
}

export function ActivityMap({ latitude, longitude, name, address, className = '' }: ActivityMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 15,
        interactive: true,
      });

      // Add marker
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-gray-900">${name}</h3>
                ${address ? `<p class="text-sm text-gray-600">${address}</p>` : ''}
              </div>
            `)
        )
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, name, address]);

  return (
    <div className={`relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
      {!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
          Demo Map
        </div>
      )}
    </div>
  );
}
