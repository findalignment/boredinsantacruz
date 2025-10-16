import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EventDetails {
  title: string;
  date: string;
  location?: string;
  description?: string;
}

export async function sendApprovalEmail(
  to: string,
  submitterName: string,
  eventDetails: EventDetails
) {
  try {
    const from = process.env.EMAIL_FROM || 'events@boredinsantacruz.com';
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `✅ Your Event "${eventDetails.title}" Has Been Approved!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">🎉 Event Approved!</h1>
              </div>
              <div class="content">
                <p>Hi ${submitterName},</p>
                <p>Great news! Your event submission has been approved and is now live on Bored in Santa Cruz.</p>
                
                <div class="event-details">
                  <h3 style="margin-top: 0; color: #667eea;">📅 ${eventDetails.title}</h3>
                  <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  ${eventDetails.location ? `<p style="margin: 8px 0;"><strong>Location:</strong> ${eventDetails.location}</p>` : ''}
                  ${eventDetails.description ? `<p style="margin: 8px 0;"><strong>Description:</strong> ${eventDetails.description.slice(0, 150)}${eventDetails.description.length > 150 ? '...' : ''}</p>` : ''}
                </div>
                
                <p>Your event is now visible to thousands of Santa Cruz residents and visitors looking for things to do!</p>
                
                <center>
                  <a href="https://boredinsantacruz.com/events" class="button">View Event on Site →</a>
                </center>
                
                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  Want to submit another event? Visit <a href="https://boredinsantacruz.com/events/submit">boredinsantacruz.com/events/submit</a>
                </p>
              </div>
              <div class="footer">
                <p>Bored in Santa Cruz<br>Your guide to Santa Cruz events and activities</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Email] Failed to send approval email:', error);
      return { success: false, error };
    }

    console.log('[Email] Approval email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Email] Error sending approval email:', error);
    return { success: false, error };
  }
}

export async function sendRejectionEmail(
  to: string,
  submitterName: string,
  eventDetails: EventDetails,
  reason?: string
) {
  try {
    const from = process.env.EMAIL_FROM || 'events@boredinsantacruz.com';
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `Event Submission Update: "${eventDetails.title}"`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
              .reason-box { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #fbbf24; }
              .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Event Submission Update</h1>
              </div>
              <div class="content">
                <p>Hi ${submitterName},</p>
                <p>Thank you for submitting your event to Bored in Santa Cruz. Unfortunately, we're unable to approve your submission at this time.</p>
                
                <div class="event-details">
                  <h3 style="margin-top: 0; color: #d97706;">📅 ${eventDetails.title}</h3>
                  <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  ${eventDetails.location ? `<p style="margin: 8px 0;"><strong>Location:</strong> ${eventDetails.location}</p>` : ''}
                </div>
                
                ${reason ? `
                  <div class="reason-box">
                    <strong>Reason:</strong>
                    <p style="margin: 10px 0 0 0;">${reason}</p>
                  </div>
                ` : ''}
                
                <p>We review all submissions carefully to ensure our events calendar maintains high quality for our community. Common reasons for non-approval include:</p>
                <ul>
                  <li>Event is outside Santa Cruz County</li>
                  <li>Insufficient event details provided</li>
                  <li>Event date has already passed</li>
                  <li>Duplicate submission</li>
                  <li>Content doesn't meet our community guidelines</li>
                </ul>
                
                <p><strong>Want to resubmit?</strong> Please review the information above and feel free to submit again with updated details.</p>
                
                <center>
                  <a href="https://boredinsantacruz.com/events/submit" class="button">Submit Another Event →</a>
                </center>
                
                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  Questions? Reply to this email and we'll get back to you.
                </p>
              </div>
              <div class="footer">
                <p>Bored in Santa Cruz<br>Your guide to Santa Cruz events and activities</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Email] Failed to send rejection email:', error);
      return { success: false, error };
    }

    console.log('[Email] Rejection email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Email] Error sending rejection email:', error);
    return { success: false, error };
  }
}
