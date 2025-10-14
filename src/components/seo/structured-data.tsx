/**
 * Structured Data (JSON-LD) Components for SEO
 * Helps search engines understand our content better
 */

interface ActivityStructuredDataProps {
  activity: {
    id: string;
    title: string;
    notes?: string;
    imageUrl?: string;
    address?: string;
    phone?: string;
    website?: string;
    venue?: {
      name?: string;
      address?: string;
    };
  };
  rating?: {
    average: number;
    count: number;
  };
}

export function ActivityStructuredData({ activity, rating }: ActivityStructuredDataProps) {
  const address = activity.address || activity.venue?.address;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: activity.title,
    description: activity.notes || `Discover ${activity.title} in Santa Cruz, California`,
    image: activity.imageUrl,
    address: address ? {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Santa Cruz',
      addressRegion: 'CA',
      addressCountry: 'US',
    } : undefined,
    telephone: activity.phone,
    url: `https://boredinsantacruz.com/activity/${activity.id}`,
    ...(rating && rating.count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.average.toFixed(1),
        reviewCount: rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface RestaurantStructuredDataProps {
  restaurant: {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    address?: string;
    phone?: string;
    website?: string;
    cuisine?: string[];
  };
  rating?: {
    average: number;
    count: number;
  };
}

export function RestaurantStructuredData({ restaurant, rating }: RestaurantStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.description || `Discover ${restaurant.name} in Santa Cruz, California`,
    image: restaurant.imageUrl,
    address: restaurant.address ? {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address,
      addressLocality: 'Santa Cruz',
      addressRegion: 'CA',
      addressCountry: 'US',
    } : undefined,
    telephone: restaurant.phone,
    url: `https://boredinsantacruz.com/restaurant/${restaurant.id}`,
    servesCuisine: restaurant.cuisine,
    ...(rating && rating.count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.average.toFixed(1),
        reviewCount: rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ReviewStructuredDataProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    title: string;
    content: string;
    createdAt: string;
  };
  itemName: string;
}

export function ReviewStructuredData({ review, itemName }: ReviewStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.userName,
    },
    datePublished: review.createdAt,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    name: review.title,
    reviewBody: review.content,
    itemReviewed: {
      '@type': 'Thing',
      name: itemName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bored in Santa Cruz',
    url: 'https://boredinsantacruz.com',
    description: 'Discover the best things to do in Santa Cruz, California. Weather-aware activity recommendations, events, restaurants, and hidden gems.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://boredinsantacruz.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bored in Santa Cruz',
    url: 'https://boredinsantacruz.com',
    logo: 'https://boredinsantacruz.com/logo.png',
    description: 'Your guide to Santa Cruz activities, restaurants, and events',
    sameAs: [
      // Add social media URLs when available
      'https://instagram.com/boredinsantacruz',
      'https://facebook.com/boredinsantacruz',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface EventStructuredDataProps {
  event: {
    title: string;
    date: string;
    description?: string;
    location?: string;
    imageUrl?: string;
  };
}

export function EventStructuredData({ event }: EventStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    description: event.description,
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Cruz',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    } : undefined,
    image: event.imageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

