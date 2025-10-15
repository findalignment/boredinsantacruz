import Link from 'next/link';
import type { Metadata } from 'next';
import { TRIP_TEMPLATES } from '@/lib/trips/templates';
import { TemplateCard } from '@/components/trips/template-card';

export const metadata: Metadata = {
  title: 'Trip Templates',
  description: 'Start your Santa Cruz trip with pre-planned templates',
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/trips"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Trips
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trip Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Start your Santa Cruz adventure with our pre-planned templates. Choose a theme, customize it to your liking, and you're ready to go!
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRIP_TEMPLATES.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Custom Template CTA */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Want Something Custom?</h3>
          <p className="text-gray-300 mb-6">
            Use our AI Trip Generator to create a personalized itinerary based on your exact preferences
          </p>
          <Link
            href="/trips/generate"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Generate Custom Trip with AI 🤖
          </Link>
        </div>
      </div>
    </div>
  );
}

