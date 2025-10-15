import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://boredinsantacruz.com';
  const currentDate = new Date().toISOString();

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/restaurants`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wellness`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Weather-based activity pages
  const weatherPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/sunny`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rainy`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // SEO landing pages (30 pages)
  const seoPages: MetadataRoute.Sitemap = [
    'best-beaches',
    'best-hiking-trails',
    'best-restaurants',
    'best-happy-hours',
    'best-rainy-day-activities',
    'best-date-spots',
    'kid-friendly-activities',
    'free-things-to-do',
    'pet-friendly-activities',
    'best-wellness-studios',
    'weekend-guide',
    'best-surfing-spots',
    'romantic-getaway',
    'outdoor-adventures',
    'food-and-drink-guide',
    'water-activities',
    'arts-and-culture',
    'best-coffee-shops',
    'scenic-views',
    'budget-guide',
    'best-brunch-spots',
    'nightlife-guide',
    'live-music-venues',
    'family-activities',
    'photography-spots',
    'bike-trails',
    'farmers-markets',
    'day-trips',
    'parking-guide',
    'dog-friendly-guide',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Special pages
  const specialPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/restaurant-week`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-time`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Info pages
  const infoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic pages would be fetched from database
  // TODO: Add when we have data:
  // - Individual activity pages (/activity/[id])
  // - Individual restaurant pages (/restaurant/[id])
  // - Individual wellness pages (/wellness/[id])
  // - Individual event pages (/events/[id])
  // - Category pages (/activities/[category], /restaurants/[category])
  // - Neighborhood pages (when Phase C is built)

  return [
    ...staticPages,
    ...weatherPages,
    ...seoPages,
    ...specialPages,
    ...infoPages,
  ];
}
