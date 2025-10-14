import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SYSTEM_PROMPT, buildContextPrompt, validateQuery } from '@/lib/chatbot/system-prompt';
import { getActivities } from '@/app/actions/getActivities';
import { getCurrentWeather } from '@/lib/weather/service';

// Edge runtime for faster responses
export const runtime = 'edge';

export async function POST(req: Request) {
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
    const userQuery = latestMessage.content;

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

    // Fetch relevant activities for RAG
    let relevantActivities;
    try {
      const activitiesResult = await getActivities();
      if (activitiesResult.success && activitiesResult.data) {
        // Simple keyword matching for relevant activities
        // In production, use vector embeddings for better relevance
        const keywords = userQuery.toLowerCase().split(' ');
        relevantActivities = activitiesResult.data
          .filter(activity => {
            const searchText = `${activity.title} ${activity.notes} ${activity.tags?.join(' ')}`.toLowerCase();
            return keywords.some(keyword => searchText.includes(keyword));
          })
          .slice(0, 5)
          .map(activity => ({
            title: activity.title,
            description: activity.notes,
            cost: activity.cost,
            tags: activity.tags,
            address: activity.address,
          }));
      }
    } catch (error) {
      console.error('Failed to fetch activities for chat context:', error);
    }

    // Build context-aware prompt
    const contextPrompt = buildContextPrompt({
      weather: weatherContext,
      userQuery,
      relevantActivities,
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
    const result = streamText({
      model: openai('gpt-4-turbo-preview'), // or 'gpt-3.5-turbo' for lower cost
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

