import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { auth } from '@/lib/auth/config';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { getCurrentWeather } from '@/lib/weather/service';

export const runtime = 'edge';

const TRIP_GENERATOR_PROMPT = `You are an expert Santa Cruz travel planner. Based on user preferences, create a detailed day-by-day itinerary.

## Your Task:
1. Ask clarifying questions if needed (duration, interests, budget, travel style)
2. Generate a practical, realistic itinerary
3. Include specific activities and restaurants from the database
4. Consider weather, tide times, and travel logistics
5. Provide timing suggestions (e.g., "Morning: 9am-12pm")
6. Include parking and practical tips

## Format your response as:
**Trip Name**: [Catchy name]
**Duration**: [X days]
**Budget**: [$ / $$ / $$$]

**Day 1: [Theme]**
- **9:00 AM** - [Activity name] - [Why this is great] - [Practical tip]
- **12:00 PM** - [Restaurant name] - [Why eat here]
- **2:00 PM** - [Activity name] - [Details]

Repeat for each day.

**Pro Tips:**
- [Parking advice]
- [Weather considerations]
- [Money-saving tips]
- [Best times to visit]

Keep it concise but informative. Be enthusiastic but practical.`;

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await auth();
    if (!session?.user) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages, preferences } = await req.json();

    // Fetch context data
    let contextData = '';

    // Get activities
    try {
      const activitiesResult = await getActivities();
      if (activitiesResult.success && activitiesResult.data) {
        const topActivities = activitiesResult.data.slice(0, 20);
        contextData += `\n## Available Activities:\n${topActivities.map(a => 
          `- ${a.title} (${a.indoorOutdoor}) - ${a.notes || 'Great activity'} - Cost: $${a.cost || 0}`
        ).join('\n')}`;
      }
    } catch (e) {
      console.error('Failed to fetch activities:', e);
    }

    // Get restaurants
    try {
      const restaurantsResult = await getRestaurants();
      if (restaurantsResult.success && restaurantsResult.data) {
        const topRestaurants = restaurantsResult.data.slice(0, 15);
        contextData += `\n\n## Available Restaurants:\n${topRestaurants.map(r =>
          `- ${r.name} (${r.cuisine.join(', ')}) - ${r.priceLevel ? '$'.repeat(r.priceLevel) : '$$'}`
        ).join('\n')}`;
      }
    } catch (e) {
      console.error('Failed to fetch restaurants:', e);
    }

    // Get current weather
    try {
      const weather = await getCurrentWeather();
      contextData += `\n\n## Current Weather:\nTemp: ${Math.round(weather.temp)}°F, ${weather.description}`;
    } catch (e) {
      console.error('Failed to fetch weather:', e);
    }

    // Add preferences if provided
    if (preferences) {
      contextData += `\n\n## User Preferences:\n${Object.entries(preferences).map(([key, value]) =>
        `- ${key}: ${value}`
      ).join('\n')}`;
    }

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      system: TRIP_GENERATOR_PROMPT + contextData,
      messages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Trip generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate trip', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

