'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { RainyActivity } from '@/types';

// Mapbox access token - should be in environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface InteractiveMapProps {
  activities: RainyActivity[];
  center?: [number, number]; // [lng, lat]
  zoom?: number;
}

// Santa Cruz coordinates
const SANTA_CRUZ_CENTER: [number, number] = [-122.0308, 36.9741];

// Activity type to color mapping
const ACTIVITY_COLORS: Record<string, string> = {
  beach: '#3B82F6', // blue
  hiking: '#10B981', // green
  food: '#F59E0B', // orange
  museum: '#8B5CF6', // purple
  shopping: '#EC4899', // pink
  default: '#6B7280', // gray
};

// Get color based on activity tags
function getActivityColor(activity: RainyActivity): string {
  const tags = activity.tags || [];
  if (tags.some(t => t.toLowerCase().includes('beach'))) return ACTIVITY_COLORS.beach;
  if (tags.some(t => t.toLowerCase().includes('hik'))) return ACTIVITY_COLORS.hiking;
  if (tags.some(t => ['food', 'restaurant', 'cafe'].includes(t.toLowerCase()))) return ACTIVITY_COLORS.food;
  if (tags.some(t => t.toLowerCase().includes('museum'))) return ACTIVITY_COLORS.museum;
  if (tags.some(t => t.toLowerCase().includes('shop'))) return ACTIVITY_COLORS.shopping;
  return ACTIVITY_COLORS.default;
}

// Parse address to get coordinates (placeholder - needs geocoding)
function getCoordinatesFromAddress(address?: string): [number, number] | null {
  if (!address) return null;
  
  // Placeholder coordinates - in production, use Mapbox Geocoding API
  // For now, return Santa Cruz center with slight random offset
  const randomOffset = () => (Math.random() - 0.5) * 0.02;
  return [
    SANTA_CRUZ_CENTER[0] + randomOffset(),
    SANTA_CRUZ_CENTER[1] + randomOffset()
  ];
}

export function InteractiveMap({
  activities,
  center = SANTA_CRUZ_CENTER,
  zoom = 12,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    // Check if access token is set
    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token not found. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to environment variables.');
      return;
    }

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    // Add markers for each activity
    activities.forEach((activity) => {
      const coords = getCoordinatesFromAddress(activity.address);
      if (!coords) return;

      const color = getActivityColor(activity);

      // Create marker element
      const el = document.createElement('div');
      el.className = 'activity-marker';
      el.style.backgroundColor = color;
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">
            ${activity.title}
          </h3>
          ${activity.venueName ? `
            <p style="color: #6B7280; font-size: 14px; margin-bottom: 8px;">
              ${activity.venueName}
            </p>
          ` : ''}
          ${activity.tags && activity.tags.length > 0 ? `
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
              ${activity.tags.slice(0, 3).map(tag => `
                <span style="background-color: #E5E7EB; padding: 2px 8px; border-radius: 9999px; font-size: 12px;">
                  ${tag}
                </span>
              `).join('')}
            </div>
          ` : ''}
          ${activity.cost !== undefined ? `
            <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">
              ${activity.cost === 0 ? 'Free' : `$${activity.cost}`}
            </p>
          ` : ''}
          <a 
            href="/activity/${activity.id}" 
            style="display: inline-block; background-color: #3B82F6; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 4px;"
          >
            View Details →
          </a>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [activities, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-xl" />
      
      {!mapboxgl.accessToken && (
        <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center rounded-xl">
          <div className="text-center text-white p-8">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold mb-2">Map Configuration Needed</h3>
            <p className="text-gray-300 mb-4">
              Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables
            </p>
            <a 
              href="https://www.mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Get a free Mapbox API key →
            </a>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-sm mb-2">Activity Types</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACTIVITY_COLORS.beach }}></div>
            <span>Beaches</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACTIVITY_COLORS.hiking }}></div>
            <span>Hiking</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACTIVITY_COLORS.food }}></div>
            <span>Food</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACTIVITY_COLORS.museum }}></div>
            <span>Museums</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACTIVITY_COLORS.default }}></div>
            <span>Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}

