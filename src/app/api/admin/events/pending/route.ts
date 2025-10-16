import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAdmin, AdminErrors } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(AdminErrors.UNAUTHORIZED, { status: 401 });
    }

    // Check admin role
    if (!isAdmin(session)) {
      return NextResponse.json(AdminErrors.FORBIDDEN, { status: 403 });
    }

    // Check if Airtable is configured
    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { success: false, error: 'Airtable not configured' },
        { status: 503 }
      );
    }

    const eventsTable = process.env.AIRTABLE_EVENTS_TABLE || 'Events';

    // Fetch pending events from Airtable
    const filterFormula = encodeURIComponent(`{Status} = "Pending Review"`);
    const sort = encodeURIComponent(JSON.stringify([{ field: 'Submitted Date', direction: 'desc' }]));
    
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${eventsTable}?filterByFormula=${filterFormula}&sort=${sort}`;

    const response = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Airtable records to our format
    const events = data.records.map((record: any) => ({
      id: record.id,
      title: record.fields['Title'] || '',
      description: record.fields['Description'] || '',
      categories: record.fields['Categories'] || '',
      startDate: record.fields['Start Date'] || '',
      startTime: record.fields['Start Time'] || '',
      venueName: record.fields['Venue Name'] || '',
      venueAddress: record.fields['Venue Address'] || '',
      isOnline: record.fields['Is Online'] || false,
      cost: record.fields['Cost'] || 'Free',
      submitterName: record.fields['Submitter Name'] || '',
      submitterEmail: record.fields['Submitter Email'] || '',
      submittedDate: record.fields['Submitted Date'] || '',
      imageUrl: record.fields['Image URL'] || '',
      websiteUrl: record.fields['Website URL'] || '',
      ticketUrl: record.fields['Ticket URL'] || '',
    }));

    console.log(`[Admin] Fetched ${events.length} pending events`);

    return NextResponse.json({
      success: true,
      events,
      count: events.length,
    });

  } catch (error) {
    console.error('[Admin] Failed to fetch pending events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pending events' },
      { status: 500 }
    );
  }
}

