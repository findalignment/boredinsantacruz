'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { TripTemplate } from '@/lib/trips/templates';
import { createTrip } from '@/app/actions/trips';
import { toast } from 'sonner';

interface TemplateCardProps {
  template: TripTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const budgetLabel = {
    budget: '$',
    moderate: '$$',
    luxury: '$$$',
  }[template.budget];

  const handleUseTemplate = async () => {
    if (!session?.user) {
      router.push('/login?callbackUrl=/trips/templates');
      return;
    }

    setLoading(true);

    try {
      const result = await createTrip({
        name: template.name,
        description: `${template.description}\n\nSuggested activities:\n${template.activities.map(a => `• ${a}`).join('\n')}`,
        isPublic: false,
      });

      if (result.success && result.data) {
        toast.success(`Created "${template.name}"! Now add specific activities.`);
        router.push(`/trips/${result.data.id}`);
      } else {
        toast.error(result.error || 'Failed to create trip');
      }
    } catch (error) {
      console.error('Template error:', error);
      toast.error('Failed to create trip from template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="text-5xl mb-3">{template.emoji}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {template.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>📅 {template.duration} {template.duration === 1 ? 'day' : 'days'}</span>
          <span>•</span>
          <span>💰 {budgetLabel}</span>
        </div>
      </div>

      {/* Activities Preview */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">
          Suggested Activities:
        </h4>
        <ul className="space-y-2 mb-4">
          {template.activities.slice(0, 4).map((activity, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>{activity}</span>
            </li>
          ))}
          {template.activities.length > 4 && (
            <li className="text-sm text-gray-500 italic">
              + {template.activities.length - 4} more...
            </li>
          )}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Use Template Button */}
        <button
          onClick={handleUseTemplate}
          disabled={loading}
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Use This Template'}
        </button>
      </div>
    </div>
  );
}

