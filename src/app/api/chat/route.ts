import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SYSTEM_PROMPT, buildContextPrompt, validateQuery } from '@/lib/chatbot/system-prompt';
import { getActivities } from '@/app/actions/getActivities';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { getWellness } from '@/app/actions/getWellness';
import { getCurrentWeather } from '@/lib/weather/service';
import { chatLimiter, getIdentifier, checkRateLimit } from '@/lib/security/ratelimit';
import { sanitizeText } from '@/lib/security/sanitize';

// Edge runtime for faster responses
export const runtime = 'edge';

export async function POST(req: Request) {
  // 🔒 CRITICAL: Rate limiting to prevent abuse
  if (chatLimiter) {
    const identifier = getIdentifier(req);
    const { success, limit, reset, remaining } = await chatLimiter.limit(identifier);
    
    if (!success) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          limit,
          reset: new Date(reset).toISOString(),
          remaining,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      );
    }
  }

  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'OpenAI API key not configured. Add OPENAI_API_KEY to environment variables.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    // 🔒 CRITICAL: Sanitize user input to prevent XSS
    const userQuery = sanitizeText(latestMessage.content);

    // Validate query (NSFW filter, etc.)
    const validation = validateQuery(userQuery);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          response: validation.reason,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch current weather for context
    let weatherContext;
    try {
      const weather = await getCurrentWeather();
      weatherContext = {
        temp: Math.round(weather.temp),
        condition: weather.description,
        precipitation: weather.precipitation,
      };
    } catch (error) {
      console.error('Failed to fetch weather for chat context:', error);
    }

    // Fetch relevant businesses (activities, restaurants, wellness) for RAG
    let relevantBusinesses: any[] = [];
    try {
      // Fetch all business types in parallel for speed
      const [activitiesResult, restaurantsResult, wellnessResult] = await Promise.all([
        getActivities(),
        getRestaurants(),
        getWellness(),
      ]);

      const keywords = userQuery.toLowerCase().split(/\s+/).filter(k => k.length > 2);
      
      // Process activities
      if (activitiesResult.success && activitiesResult.data) {
        const matchedActivities = activitiesResult.data
          .filter(activity => {
            const searchText = `${activity.title} ${activity.notes} ${activity.tags?.join(' ')}`.toLowerCase();
            return keywords.some(keyword => searchText.includes(keyword));
          })
          .slice(0, 5)
          .map(activity => ({
            id: activity.id,
            name: activity.title,
            description: activity.notes,
            cost: activity.cost,
            tags: activity.tags,
            address: activity.address,
            type: 'activity',
          }));
        relevantBusinesses.push(...matchedActivities);
      }

      // Process restaurants
      if (restaurantsResult.success && restaurantsResult.data) {
        const matchedRestaurants = restaurantsResult.data
          .filter(restaurant => {
            const searchText = `${restaurant.name} ${restaurant.description} ${restaurant.cuisine?.join(' ')} ${restaurant.bestDish || ''}`.toLowerCase();
            return keywords.some(keyword => searchText.includes(keyword));
          })
          .slice(0, 5)
          .map(restaurant => ({
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            cuisine: restaurant.cuisine,
            priceLevel: restaurant.priceLevel,
            address: restaurant.address,
            type: 'restaurant',
          }));
        relevantBusinesses.push(...matchedRestaurants);
      }

      // Process wellness
      if (wellnessResult.success && wellnessResult.data) {
        const matchedWellness = wellnessResult.data
          .filter(wellness => {
            const searchText = `${wellness.name} ${wellness.description} ${wellness.category} ${wellness.wellnessType?.join(' ')}`.toLowerCase();
            return keywords.some(keyword => searchText.includes(keyword));
          })
          .slice(0, 5)
          .map(wellness => ({
            id: wellness.id,
            name: wellness.name,
            description: wellness.description,
            category: wellness.category,
            address: wellness.address,
            type: 'wellness',
          }));
        relevantBusinesses.push(...matchedWellness);
      }

      // Limit total results to top 10 most relevant
      relevantBusinesses = relevantBusinesses.slice(0, 10);
    } catch (error) {
      console.error('Failed to fetch businesses for chat context:', error);
    }

    // Build context-aware prompt
    const contextPrompt = buildContextPrompt({
      weather: weatherContext,
      userQuery,
      relevantBusinesses,
    });

    // Prepare messages for OpenAI
    const chatMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT,
      },
      ...messages.slice(0, -1), // Previous conversation history
      {
        role: 'user' as const,
        content: contextPrompt, // Latest message with context
      },
    ];

    // Call OpenAI API with streaming using Vercel AI SDK
    // Using gpt-4o-mini for faster responses (2-3x faster than gpt-4-turbo)
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages: chatMessages.slice(1), // Remove system message (we set it separately)
      temperature: 0.7,
    });

    // Return streaming response
    return (await result).toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request. Please try again.',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

