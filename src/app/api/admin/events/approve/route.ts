import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Check admin role
    // if (session.user?.role !== 'admin') {
    //   return NextResponse.json(
    //     { success: false, error: 'Forbidden' },
    //     { status: 403 }
    //   );
    // }

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Check if Airtable is configured
    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { success: false, error: 'Airtable not configured' },
        { status: 503 }
      );
    }

    const eventsTable = process.env.AIRTABLE_EVENTS_TABLE || 'Events';

    // Update event status to Approved
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${eventsTable}/${eventId}`;

    const response = await fetch(airtableUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Status': 'Approved',
          'Reviewed Date': new Date().toISOString(),
          'Reviewed By': session.user?.name || session.user?.email || 'Admin',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable error:', errorData);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const updatedRecord = await response.json();

    // TODO: Send approval email to submitter
    // const submitterEmail = updatedRecord.fields['Submitter Email'];
    // const submitterName = updatedRecord.fields['Submitter Name'];
    // const eventTitle = updatedRecord.fields['Title'];
    // await sendApprovalEmail(submitterEmail, submitterName, eventTitle);

    console.log(`[Admin] Event approved: ${eventId}`);

    return NextResponse.json({
      success: true,
      message: 'Event approved successfully',
      eventId,
    });

  } catch (error) {
    console.error('[Admin] Failed to approve event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve event' },
      { status: 500 }
    );
  }
}

