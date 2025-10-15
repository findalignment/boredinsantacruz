'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createTrip } from '@/app/actions/trips';
import { addItemToTrip } from '@/app/actions/tripItems';
import { toast } from 'sonner';

interface Preferences {
  duration: string;
  budget: string;
  interests: string[];
  travelStyle: string;
}

export function AITripGenerator() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState<'preferences' | 'generating' | 'review'>('preferences');
  const [preferences, setPreferences] = useState<Preferences>({
    duration: '2',
    budget: 'moderate',
    interests: [],
    travelStyle: 'balanced',
  });
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Beaches & Ocean',
    'Hiking & Nature',
    'Food & Dining',
    'Art & Culture',
    'Family Activities',
    'Romantic Spots',
    'Local History',
    'Shopping',
    'Nightlife',
    'Photography',
  ];

  const handleGenerate = async () => {
    if (!session?.user) {
      router.push('/login?callbackUrl=/trips/generate');
      return;
    }

    setLoading(true);
    setStep('generating');

    try {
      const response = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferences,
          messages: [
            {
              role: 'user',
              content: `Generate a ${preferences.duration}-day Santa Cruz trip for someone who likes: ${preferences.interests.join(', ')}. Budget: ${preferences.budget}. Travel style: ${preferences.travelStyle}.`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error('Failed to generate trip');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() && line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              fullText += text;
              setGeneratedPlan(fullText);
            } catch (e) {
              console.error('Failed to parse chunk:', e);
            }
          }
        }
      }

      setStep('review');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate trip. Please try again.');
      setStep('preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    setLoading(true);

    try {
      // Extract trip name from generated plan
      const nameMatch = generatedPlan.match(/\*\*Trip Name\*\*:\s*(.+)/);
      const tripName = nameMatch ? nameMatch[1].trim() : `Santa Cruz Adventure`;

      // Create trip
      const result = await createTrip({
        name: tripName,
        description: 'AI-generated itinerary',
        isPublic: false,
      });

      if (result.success && result.data) {
        toast.success('Trip created! Add activities manually from the trip page.');
        router.push(`/trips/${result.data.id}`);
      } else {
        toast.error(result.error || 'Failed to create trip');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save trip');
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <h3 className="text-2xl font-bold mb-4">Sign in to use AI Trip Generator</h3>
        <p className="text-gray-600 mb-6">
          Create personalized Santa Cruz itineraries with AI
        </p>
        <button
          onClick={() => router.push('/login?callbackUrl=/trips/generate')}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (step === 'preferences') {
    return (
      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-2">🤖 AI Trip Generator</h2>
        <p className="text-gray-600 mb-8">
          Answer a few questions and we'll create a personalized itinerary
        </p>

        <div className="space-y-6">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              How many days?
            </label>
            <select
              value={preferences.duration}
              onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4-5 days</option>
              <option value="7">1 week</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              What's your budget?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['budget', 'moderate', 'luxury'].map((level) => (
                <button
                  key={level}
                  onClick={() => setPreferences({ ...preferences, budget: level })}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    preferences.budget === level
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level === 'budget' && '$'}
                  {level === 'moderate' && '$$'}
                  {level === 'luxury' && '$$$'}
                  <div className="text-xs mt-1 capitalize">{level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              What are you interested in? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      interests: preferences.interests.includes(interest)
                        ? preferences.interests.filter((i) => i !== interest)
                        : [...preferences.interests, interest],
                    });
                  }}
                  className={`px-4 py-2 rounded-lg border-2 text-sm transition-colors ${
                    preferences.interests.includes(interest)
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Travel style?
            </label>
            <select
              value={preferences.travelStyle}
              onChange={(e) => setPreferences({ ...preferences, travelStyle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="relaxed">Relaxed & Slow</option>
              <option value="balanced">Balanced</option>
              <option value="packed">Packed & Adventurous</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={preferences.interests.length === 0}
            className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Generate My Trip 🚀
          </button>
        </div>
      </div>
    );
  }

  if (step === 'generating') {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
        <div className="text-6xl mb-4 animate-bounce">🤖</div>
        <h3 className="text-2xl font-bold mb-2">Generating Your Perfect Trip...</h3>
        <p className="text-gray-600 mb-6">
          Analyzing {preferences.interests.length} interests, checking weather, and planning your itinerary
        </p>
        {generatedPlan && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg text-left max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {generatedPlan}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6">✨ Your Custom Itinerary</h2>
        
        <div className="mb-6 p-6 bg-gray-50 rounded-lg max-h-[600px] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-sans">
            {generatedPlan}
          </pre>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSaveTrip}
            disabled={loading}
            className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-300"
          >
            {loading ? 'Saving...' : 'Save as Trip'}
          </button>
          <button
            onClick={() => {
              setStep('preferences');
              setGeneratedPlan('');
            }}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Start Over
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          After saving, you can add specific activities and restaurants from their detail pages
        </p>
      </div>
    );
  }

  return null;
}

