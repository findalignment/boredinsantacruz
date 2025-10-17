import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const privateToken = process.env.EVENTBRITE_PRIVATE_TOKEN;
    
    if (!privateToken) {
      return NextResponse.json({
        error: 'EVENTBRITE_PRIVATE_TOKEN not configured',
        status: 'missing_token'
      });
    }

    // Test 1: Get user info
    const userResponse = await fetch('https://www.eventbriteapi.com/v3/users/me/', {
      headers: {
        'Authorization': `Bearer ${privateToken}`,
        'Content-Type': 'application/json',
      },
    });

    const userData = userResponse.ok ? await userResponse.json() : null;

    // Test 2: Search for Santa Cruz events
    const eventsResponse = await fetch(
      'https://www.eventbriteapi.com/v3/events/search/?location.address=Santa+Cruz%2C+CA&location.within=25mi&expand=venue&sort_by=date&page_size=5',
      {
        headers: {
          'Authorization': `Bearer ${privateToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const eventsData = eventsResponse.ok ? await eventsResponse.json() : null;

    return NextResponse.json({
      status: 'success',
      tests: {
        user_api: {
          status: userResponse.status,
          statusText: userResponse.statusText,
          success: userResponse.ok,
          data: userData ? {
            id: userData.id,
            name: userData.name,
            email: userData.email
          } : null
        },
        events_api: {
          status: eventsResponse.status,
          statusText: eventsResponse.statusText,
          success: eventsResponse.ok,
          eventCount: eventsData?.events?.length || 0,
          events: eventsData?.events?.slice(0, 3).map((event: any) => ({
            id: event.id,
            name: event.name?.text,
            start: event.start?.local,
            venue: event.venue?.name
          })) || []
        }
      },
      recommendations: userResponse.ok && eventsResponse.ok ? 
        ['Eventbrite API is working perfectly!'] : 
        ['Check Eventbrite token permissions and API access']
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendations: ['Check network connection and Eventbrite API status']
    });
  }
}
