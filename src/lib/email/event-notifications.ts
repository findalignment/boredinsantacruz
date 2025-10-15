import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || 'events@boredinsantacruz.com';

/**
 * Send confirmation email to event submitter
 */
export async function sendSubmissionConfirmationEmail(
  submitterEmail: string,
  submitterName: string,
  eventTitle: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend API key not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: submitterEmail,
      subject: `Event Received: "${eventTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Bored in Santa Cruz</h1>
            <p style="color: #6b7280; margin: 5px 0;">Santa Cruz Events Calendar</p>
          </div>

          <!-- Success Badge -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
            <h2 style="margin: 0;">Event Submitted Successfully!</h2>
          </div>

          <!-- Content -->
          <div style="background: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin-top: 0;">Hi <strong>${submitterName}</strong>,</p>
            
            <p>Thank you for submitting your event to Bored in Santa Cruz!</p>

            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #2563eb;">Your Event:</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${eventTitle}</p>
            </div>

            <h3 style="color: #2563eb; margin-top: 25px;">What Happens Next?</h3>
            
            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 15px;">
                <strong>Review (24 hours):</strong> Our team will review your event submission to ensure it meets our guidelines.
              </li>
              <li style="margin-bottom: 15px;">
                <strong>Approval:</strong> You'll receive another email when your event is approved.
              </li>
              <li style="margin-bottom: 15px;">
                <strong>Go Live:</strong> Your event will appear on our calendar at <a href="https://boredinsantacruz.com/events" style="color: #2563eb;">boredinsantacruz.com/events</a>
              </li>
            </ol>

            <p>We typically review submissions within <strong>24 hours</strong>. Most events are approved!</p>
          </div>

          <!-- CTA -->}
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://boredinsantacruz.com/events" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Browse All Events
            </a>
          </div>

          <!-- Questions -->
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #1e40af;">Questions or need to make changes?</p>
            <p style="margin: 5px 0 0 0;">Reply to this email or contact us at <a href="mailto:events@boredinsantacruz.com" style="color: #2563eb;">events@boredinsantacruz.com</a></p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 5px 0;">Bored in Santa Cruz</p>
            <p style="margin: 5px 0;">Your guide to Santa Cruz events, activities, and restaurants</p>
            <p style="margin: 15px 0 5px 0;">
              <a href="https://boredinsantacruz.com" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
              <a href="https://boredinsantacruz.com/events" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Events</a>
              <a href="https://boredinsantacruz.com/events/submit" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Submit Event</a>
            </p>
          </div>

        </body>
        </html>
      `,
    });

    console.log(`[Email] Confirmation sent to ${submitterEmail}`);
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send confirmation:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Send notification to admin about new submission
 */
export async function sendAdminNotificationEmail(
  eventTitle: string,
  submitterName: string,
  submitterEmail: string,
  recordId: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend API key not configured, skipping admin notification');
    return { success: false, error: 'Email not configured' };
  }

  // TODO: Set admin email in env var
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@boredinsantacruz.com';

  try {
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `[Action Required] New Event Submission: "${eventTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 48px; margin-bottom: 10px;">📅</div>
            <h2 style="margin: 0;">New Event Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Action required: Review and approve</p>
          </div>

          <!-- Event Details -->
          <div style="background: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #2563eb;">Event Details</h3>
            
            <div style="margin-bottom: 15px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Event Title</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${eventTitle}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Submitted By</p>
              <p style="margin: 5px 0 0 0;">${submitterName}</p>
              <p style="margin: 5px 0 0 0; color: #6b7280;">${submitterEmail}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Record ID</p>
              <p style="margin: 5px 0 0 0; font-family: monospace; background: white; padding: 8px; border-radius: 4px;">${recordId}</p>
            </div>
          </div>

          <!-- Action Required -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #92400e;">⚠️ Action Required</p>
            <p style="margin: 10px 0 0 0; color: #92400e;">Please review this event submission within 24 hours.</p>
          </div>

          <!-- CTAs -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://airtable.com/app${process.env.AIRTABLE_BASE_ID?.substring(3) || ''}/tbl.../${recordId}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
              Review in Airtable
            </a>
            <br>
            <a href="https://boredinsantacruz.com/admin/events" style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
              Admin Dashboard
            </a>
          </div>

          <!-- Moderation Checklist -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #2563eb;">Moderation Checklist</h4>
            <ul style="padding-left: 20px; margin: 0;">
              <li>Event is in/near Santa Cruz County</li>
              <li>Title and description are clear</li>
              <li>Date/time is correct and future</li>
              <li>Venue information is accurate</li>
              <li>URLs work (if provided)</li>
              <li>Not spam or inappropriate</li>
              <li>Not a duplicate</li>
            </ul>
          </div>

          <!-- Footer -->
          <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 5px 0;">Automated notification from Bored in Santa Cruz</p>
          </div>

        </body>
        </html>
      `,
    });

    console.log(`[Email] Admin notification sent for event: ${eventTitle}`);
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send admin notification:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

