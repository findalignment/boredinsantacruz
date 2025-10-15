import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const eventSubmissionSchema = z.object({
  // Basic Info
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  
  // Date & Time
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional(),
  
  // Location
  venueName: z.string().optional(),
  venueAddress: z.string().optional(),
  isOnline: z.boolean().optional(),
  onlineUrl: z.string().url().optional().or(z.literal('')),
  
  // Details
  cost: z.string().optional(),
  ticketUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  
  // Media
  imageUrl: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  
  // Audience
  kidFriendly: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  accessible: z.boolean().optional(),
  ageRestriction: z.string().optional(),
  
  // Submitter
  submitterName: z.string().min(2, 'Name is required'),
  submitterEmail: z.string().email('Valid email is required'),
}).refine((data) => {
  // Either online or venue info required
  if (!data.isOnline && (!data.venueName || !data.venueAddress)) {
    return false;
  }
  return true;
}, {
  message: 'Provide venue information or mark as online event',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = eventSubmissionSchema.parse(body);
    
    // Check if Airtable is configured
    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.error('Airtable credentials not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Event submission is not configured. Please contact support.' 
        },
        { status: 503 }
      );
    }

    // TODO: Check for AIRTABLE_EVENTS_TABLE env var
    const eventsTable = process.env.AIRTABLE_EVENTS_TABLE || 'Events';
    
    // Prepare Airtable record
    const airtableRecord = {
      fields: {
        // Basic Info
        'Title': validatedData.title,
        'Description': validatedData.description,
        'Categories': validatedData.categories.join(', '),
        
        // Date & Time
        'Start Date': validatedData.startDate,
        'Start Time': validatedData.startTime,
        'End Date': validatedData.endDate || '',
        'End Time': validatedData.endTime || '',
        'Is Recurring': validatedData.isRecurring || false,
        'Recurring Pattern': validatedData.recurringPattern || '',
        
        // Location
        'Venue Name': validatedData.venueName || '',
        'Venue Address': validatedData.venueAddress || '',
        'Is Online': validatedData.isOnline || false,
        'Online URL': validatedData.onlineUrl || '',
        
        // Details
        'Cost': validatedData.cost || 'Free',
        'Ticket URL': validatedData.ticketUrl || '',
        'Website URL': validatedData.websiteUrl || '',
        'Contact Email': validatedData.contactEmail || '',
        'Contact Phone': validatedData.contactPhone || '',
        
        // Media
        'Image URL': validatedData.imageUrl || '',
        'Video URL': validatedData.videoUrl || '',
        
        // Audience
        'Kid Friendly': validatedData.kidFriendly || false,
        'Pet Friendly': validatedData.petFriendly || false,
        'Accessible': validatedData.accessible || false,
        'Age Restriction': validatedData.ageRestriction || 'All ages',
        
        // Submitter
        'Submitter Name': validatedData.submitterName,
        'Submitter Email': validatedData.submitterEmail,
        
        // Meta
        'Status': 'Pending Review',
        'Submitted Date': new Date().toISOString(),
        'Source': 'Website Submission',
      },
    };

    // Submit to Airtable
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${eventsTable}`;
    
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(airtableRecord),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable error:', errorData);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const airtableResponse = await response.json();
    const recordId = airtableResponse.id;

    // Send email notifications (don't block on email failures)
    try {
      const { sendSubmissionConfirmationEmail, sendAdminNotificationEmail } = await import('@/lib/email/event-notifications');
      
      // Send confirmation to submitter
      await sendSubmissionConfirmationEmail(
        validatedData.submitterEmail,
        validatedData.submitterName,
        validatedData.title
      );

      // Send notification to admin
      await sendAdminNotificationEmail(
        validatedData.title,
        validatedData.submitterName,
        validatedData.submitterEmail,
        recordId
      );
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('[Event Submission] Email notification failed:', emailError);
    }

    // Log success
    console.log(`[Event Submission] New event submitted: "${validatedData.title}" (ID: ${recordId})`);

    return NextResponse.json({
      success: true,
      message: 'Event submitted successfully! We\'ll review it within 24 hours.',
      recordId,
    });

  } catch (error) {
    console.error('[Event Submission Error]:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit event. Please try again or contact support.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

