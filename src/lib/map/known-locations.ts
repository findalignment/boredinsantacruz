// Known Santa Cruz locations with coordinates
// This allows the map to show markers even without geocoding API

export const KNOWN_LOCATIONS: Record<string, [number, number]> = {
  // Beaches
  'natural bridges': [-122.0590, 36.9507],
  'main beach': [-122.0181, 36.9641],
  'its beach': [-122.0296, 36.9525],
  'itso wetso': [-122.0296, 36.9525],
  'cowell beach': [-122.0264, 36.9532],
  'seabright': [-121.9916, 36.9634],
  'twin lakes': [-121.9850, 36.9656],
  'capitola': [-121.9532, 36.9752],
  'pleasure point': [-121.9850, 36.9634],
  'manresa': [-121.8962, 36.9292],
  'lighthouse field': [-122.0275, 36.9498],
  
  // Downtown
  'pacific avenue': [-122.0264, 36.9741],
  'downtown': [-122.0264, 36.9741],
  'cedar street': [-122.0264, 36.9741],
  
  // Other
  'santa cruz wharf': [-122.0181, 36.9623],
  'boardwalk': [-122.0181, 36.9641],
  'beach boardwalk': [-122.0181, 36.9641],
  'ucsc': [-122.0585, 36.9914],
  'harbor': [-122.0033, 36.9625],
  'pogonip': [-122.0450, 36.9850],
  'henry cowell': [-122.0667, 37.0429],
  'wilder ranch': [-122.0818, 36.9670],
  'delaveaga': [-122.0167, 37.0000],
  'roaring camp': [-122.0667, 37.0500],
  
  // Neighborhoods (duplicate seabright removed, already listed as beach)
  'westside': [-122.0450, 36.9700],
  'eastside': [-121.9900, 36.9700],
  'felton': [-122.0728, 37.0516],
  'aptos': [-121.8993, 36.9771],
  'scotts valley': [-122.0147, 37.0510],
};

// Santa Cruz center point
export const SANTA_CRUZ_CENTER: [number, number] = [-122.0308, 36.9741];

// Try to find coordinates for an activity based on its title, venue, or address
export function findCoordinatesForActivity(activity: {
  title?: string;
  venueName?: string;
  address?: string;
}): [number, number] | null {
  const searchText = `${activity.title} ${activity.venueName} ${activity.address}`.toLowerCase();
  
  // Check known locations
  for (const [key, coords] of Object.entries(KNOWN_LOCATIONS)) {
    if (searchText.includes(key)) {
      return coords;
    }
  }
  
  // If address contains specific street names
  if (activity.address) {
    const address = activity.address.toLowerCase();
    
    // Check for specific landmarks
    if (address.includes('west cliff')) return [-122.0296, 36.9525];
    if (address.includes('east cliff')) return [-121.9900, 36.9650];
    if (address.includes('mission')) return [-122.0550, 36.9800];
    if (address.includes('soquel')) return [-122.0120, 36.9850];
    if (address.includes('beach') && address.includes('street')) return [-122.0181, 36.9641];
    
    // Check for zip codes
    if (address.includes('95060')) return [-122.0308, 36.9741]; // Downtown
    if (address.includes('95062')) return [-121.9850, 36.9650]; // Eastside
    if (address.includes('95064')) return [-122.0450, 36.9700]; // Westside
    if (address.includes('95018')) return [-122.0728, 37.0516]; // Felton
    if (address.includes('95003')) return [-121.8993, 36.9771]; // Aptos
    if (address.includes('95010')) return [-121.9532, 36.9752]; // Capitola
  }
  
  // Return null if we can't find it (don't show marker)
  return null;
}

