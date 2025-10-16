/**
 * Geocoding utilities using Google Maps Geocoding API
 */

export interface GeocodeResult {
  lat: number;
  lon: number;
  formattedAddress: string;
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      console.warn('[Geocoding] API key not configured');
      return null;
    }

    // Add "Santa Cruz, CA" if not already in address
    let searchAddress = address;
    if (!address.toLowerCase().includes('santa cruz')) {
      searchAddress = `${address}, Santa Cruz, CA`;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.warn('[Geocoding] No results found for:', searchAddress);
      return null;
    }

    const result = data.results[0];
    const location = result.geometry.location;

    return {
      lat: location.lat,
      lon: location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    console.error('[Geocoding] Error:', error);
    return null;
  }
}

/**
 * Validate if coordinates are within Santa Cruz County
 * Rough bounding box for Santa Cruz County
 */
export function isInSantaCruzCounty(lat: number, lon: number): boolean {
  const SANTA_CRUZ_BOUNDS = {
    minLat: 36.85,
    maxLat: 37.30,
    minLon: -122.35,
    maxLon: -121.58,
  };

  return (
    lat >= SANTA_CRUZ_BOUNDS.minLat &&
    lat <= SANTA_CRUZ_BOUNDS.maxLat &&
    lon >= SANTA_CRUZ_BOUNDS.minLon &&
    lon <= SANTA_CRUZ_BOUNDS.maxLon
  );
}

