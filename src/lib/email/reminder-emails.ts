import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReminderEventDetails {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  eventUrl: string;
}

export async function sendEventReminder(
  to: string,
  eventDetails: ReminderEventDetails
) {
  try {
    const from = process.env.EMAIL_FROM || 'events@boredinsantacruz.com';
    
    const eventDate = new Date(eventDetails.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `🔔 Reminder: ${eventDetails.title} is Tomorrow!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .event-card { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .event-detail { margin: 12px 0; display: flex; align-items: start; gap: 10px; }
              .event-detail-icon { font-size: 20px; flex-shrink: 0; }
              .button { display: inline-block; background: #8b5cf6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
              .button:hover { background: #7c3aed; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div style="font-size: 48px; margin-bottom: 10px;">🔔</div>
                <h1 style="margin: 0; font-size: 28px;">Your Event is Tomorrow!</h1>
              </div>
              <div class="content">
                <p style="font-size: 18px; margin-bottom: 20px;">
                  Don't forget! The event you're interested in is happening tomorrow.
                </p>
                
                <div class="event-card">
                  <h2 style="margin-top: 0; color: #8b5cf6; font-size: 24px;">${eventDetails.title}</h2>
                  
                  <div class="event-detail">
                    <span class="event-detail-icon">📅</span>
                    <div>
                      <strong>Date:</strong><br>
                      ${formattedDate}
                    </div>
                  </div>
                  
                  ${eventDetails.time ? `
                    <div class="event-detail">
                      <span class="event-detail-icon">🕐</span>
                      <div>
                        <strong>Time:</strong><br>
                        ${eventDetails.time}
                      </div>
                    </div>
                  ` : ''}
                  
                  ${eventDetails.location ? `
                    <div class="event-detail">
                      <span class="event-detail-icon">📍</span>
                      <div>
                        <strong>Location:</strong><br>
                        ${eventDetails.location}
                      </div>
                    </div>
                  ` : ''}
                  
                  ${eventDetails.description ? `
                    <div class="event-detail">
                      <span class="event-detail-icon">ℹ️</span>
                      <div>
                        <strong>Details:</strong><br>
                        ${eventDetails.description.slice(0, 200)}${eventDetails.description.length > 200 ? '...' : ''}
                      </div>
                    </div>
                  ` : ''}
                </div>
                
                <center>
                  <a href="${eventDetails.eventUrl}" class="button">View Event Details →</a>
                </center>
                
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>💡 Pro Tip:</strong> Add this event to your calendar so you don't miss it!
                  </p>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  Want to discover more events in Santa Cruz? Visit <a href="https://boredinsantacruz.com/events">boredinsantacruz.com/events</a>
                </p>
              </div>
              <div class="footer">
                <p>Bored in Santa Cruz<br>Your guide to Santa Cruz events and activities</p>
                <p style="font-size: 12px; color: #9ca3af;">
                  You're receiving this because you requested a reminder for this event.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Email] Failed to send reminder email:', error);
      return { success: false, error };
    }

    console.log('[Email] Reminder email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Email] Error sending reminder email:', error);
    return { success: false, error };
  }
}

