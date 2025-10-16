import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
  eventId: z.string(),
  eventTitle: z.string(),
  eventDate: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, eventId, eventTitle, eventDate } = subscribeSchema.parse(body);

    // Check if Airtable is configured
    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { success: false, error: 'Reminders not configured' },
        { status: 503 }
      );
    }

    const remindersTable = process.env.AIRTABLE_REMINDERS_TABLE || 'Event Reminders';

    // Check if reminder already exists
    const checkUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${remindersTable}?filterByFormula=AND({Email}='${email}',{Event ID}='${eventId}')`;

    const checkResponse = await fetch(checkUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    });

    if (!checkResponse.ok) {
      throw new Error('Failed to check existing reminders');
    }

    const checkData = await checkResponse.json();

    if (checkData.records && checkData.records.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Reminder already set for this event',
      });
    }

    // Create new reminder
    const createUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${remindersTable}`;

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Email': email,
          'Event ID': eventId,
          'Event Title': eventTitle,
          'Event Date': eventDate,
          'Status': 'pending',
          'Reminder Sent': false,
        },
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('Airtable error:', errorData);
      throw new Error('Failed to create reminder');
    }

    const newRecord = await createResponse.json();

    console.log(`[Reminders] Created reminder for ${email} - Event: ${eventTitle}`);

    return NextResponse.json({
      success: true,
      message: 'Reminder set successfully',
      reminderId: newRecord.id,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.error('[Reminders] Error creating reminder:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to set reminder' },
      { status: 500 }
    );
  }
}

