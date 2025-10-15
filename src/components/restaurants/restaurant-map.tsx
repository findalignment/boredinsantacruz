'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Restaurant } from '@/types';
import { findCoordinatesForActivity, SANTA_CRUZ_CENTER } from '@/lib/map/known-locations';

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

export function RestaurantMap({ restaurants }: RestaurantMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      setMapError('Mapbox token not configured');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [SANTA_CRUZ_CENTER[0], SANTA_CRUZ_CENTER[1]],
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each restaurant
      restaurants.forEach((restaurant) => {
        if (!map.current) return;

        // Try to find coordinates
        const coords = findCoordinatesForActivity({
          title: restaurant.name,
          venueName: restaurant.name,
          address: restaurant.address,
        });

        if (coords) {
          // Create popup content
          const priceLabel = '$'.repeat(restaurant.priceLevel);
          const popupContent = `
            <div class="p-2">
              <h3 class="font-bold text-lg mb-1">${restaurant.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${restaurant.cuisine.join(', ')}</p>
              <p class="text-sm font-semibold text-orange-600 mb-2">${priceLabel}</p>
              <p class="text-xs text-gray-700 mb-2">${restaurant.neighborhood}</p>
              <a 
                href="/restaurant/${restaurant.id}" 
                class="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details →
              </a>
            </div>
          `;

          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: true,
            closeOnClick: false,
          }).setHTML(popupContent);

          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = '🍽️';
          el.style.fontSize = '24px';
          el.style.cursor = 'pointer';

          new mapboxgl.Marker(el)
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map.current);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to load map');
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [restaurants]);

  if (mapError) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-gray-700 font-medium">{mapError}</p>
          <p className="text-sm text-gray-600 mt-2">
            Please check your Mapbox configuration
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-[600px] w-full" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">
          🍽️ {restaurants.length} Restaurants
        </p>
      </div>
    </div>
  );
}

