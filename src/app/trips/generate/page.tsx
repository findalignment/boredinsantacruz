import { Metadata } from 'next';
import Link from 'next/link';
import { AITripGenerator } from '@/components/trips/ai-trip-generator';

export const metadata: Metadata = {
  title: 'AI Trip Generator',
  description: 'Create personalized Santa Cruz itineraries with AI',
};

export default function GenerateTripPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/trips"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Trips
        </Link>

        <AITripGenerator />
      </div>
    </div>
  );
}

