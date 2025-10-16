import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sendApprovalEmail } from '@/lib/email/event-notifications';
import { isAdmin, AdminErrors } from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
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

    // Send approval email to submitter
    const fields = updatedRecord.fields;
    if (fields['Submitter Email']) {
      await sendApprovalEmail(
        fields['Submitter Email'],
        fields['Submitter Name'] || 'Event Organizer',
        {
          title: fields['Title'],
          date: fields['Start Date'],
          location: fields['Location'],
          description: fields['Description'],
        }
      );
    }

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

