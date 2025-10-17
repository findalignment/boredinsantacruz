import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.EVENTBRITE_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ 
      error: 'Eventbrite API key not configured',
      hasApiKey: false 
    });
  }

  try {
    // Test the Eventbrite API directly
    const params = new URLSearchParams({
      'location.address': 'Santa Cruz, CA',
      'location.within': '25mi',
      'expand': 'venue',
      'sort_by': 'date',
      'page_size': '5',
      'token': apiKey,
    });

    const url = `https://www.eventbriteapi.com/v3/events/search/?${params.toString()}`;
    
    console.log('Testing Eventbrite API URL:', url.replace(apiKey, '***'));

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0, // No cache for testing
      },
    });

    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      hasApiKey: true,
      url: url.replace(apiKey, '***'),
      data: data,
      eventsFound: data.events?.length || 0,
    });

  } catch (error) {
    return NextResponse.json({
      error: 'API request failed',
      hasApiKey: true,
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
