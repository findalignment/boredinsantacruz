import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'Bored in Santa Cruz - Your Guide to Local Activities',
    template: '%s | Bored in Santa Cruz',
  },
  description: 'Discover the best things to do in Santa Cruz, rain or shine. From indoor activities to beach days, cafes to museums, find your next adventure in Santa Cruz, California.',
  keywords: ['Santa Cruz', 'activities', 'things to do', 'California', 'rainy day', 'indoor activities', 'outdoor activities', 'Santa Cruz guide', 'local activities'],
  authors: [{ name: 'Bored in Santa Cruz' }],
  creator: 'Bored in Santa Cruz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boredinsantacruz.com',
    title: 'Bored in Santa Cruz - Your Guide to Local Activities',
    description: 'Discover the best things to do in Santa Cruz, rain or shine. Find indoor activities, outdoor adventures, and hidden gems.',
    siteName: 'Bored in Santa Cruz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bored in Santa Cruz',
    description: 'Your ultimate guide to Santa Cruz activities and experiences',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
