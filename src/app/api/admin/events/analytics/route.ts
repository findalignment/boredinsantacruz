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

    // Fetch all events
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${eventsTable}`;

    const response = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    const events = data.records || [];

    // Calculate stats
    const totalEvents = events.length;
    const pendingEvents = events.filter((r: any) => r.fields['Status'] === 'Pending').length;
    const approvedEvents = events.filter((r: any) => r.fields['Status'] === 'Approved').length;
    const rejectedEvents = events.filter((r: any) => r.fields['Status'] === 'Rejected').length;

    const approvalRate = totalEvents > 0
      ? Math.round((approvedEvents / (approvedEvents + rejectedEvents)) * 100)
      : 0;

    // Calculate average review time (simplified)
    const reviewedEvents = events.filter((r: any) => r.fields['Reviewed Date']);
    let avgReviewTime = '< 1h';
    
    if (reviewedEvents.length > 0) {
      const totalReviewTime = reviewedEvents.reduce((acc: number, r: any) => {
        const submitted = new Date(r.fields['Submitted At'] || r.createdTime);
        const reviewed = new Date(r.fields['Reviewed Date']);
        const diffHours = (reviewed.getTime() - submitted.getTime()) / (1000 * 60 * 60);
        return acc + diffHours;
      }, 0);

      const avgHours = totalReviewTime / reviewedEvents.length;

      if (avgHours < 1) {
        avgReviewTime = '< 1h';
      } else if (avgHours < 24) {
        avgReviewTime = `${Math.round(avgHours)}h`;
      } else {
        avgReviewTime = `${Math.round(avgHours / 24)}d`;
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalEvents,
        pendingEvents,
        approvedEvents,
        rejectedEvents,
        approvalRate,
        avgReviewTime,
      },
    });

  } catch (error) {
    console.error('[Admin] Failed to fetch analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

