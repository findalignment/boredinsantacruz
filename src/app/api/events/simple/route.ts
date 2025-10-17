import { NextResponse } from 'next/server';
import { simpleEventbriteService } from '@/lib/events/eventbrite-simple';

export async function GET() {
  try {
    const events = await simpleEventbriteService.fetchSantaCruzEvents();
    
    return NextResponse.json({
      success: true,
      events: events,
      count: events.length,
      hasApiKey: !!process.env.EVENTBRITE_API_KEY,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      events: [],
      count: 0,
    });
  }
}
