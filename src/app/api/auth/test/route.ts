import { NextResponse } from 'next/server';

export async function GET() {
  const authConfig = {
    google: {
      clientId: !!process.env.GOOGLE_CLIENT_ID,
      clientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    },
    email: {
      resendApiKey: !!process.env.RESEND_API_KEY,
      emailFrom: !!process.env.EMAIL_FROM,
      emailServerHost: !!process.env.EMAIL_SERVER_HOST,
      emailServerPort: !!process.env.EMAIL_SERVER_PORT,
      emailServerUser: !!process.env.EMAIL_SERVER_USER,
      emailServerPassword: !!process.env.EMAIL_SERVER_PASSWORD,
    },
    nextauth: {
      secret: !!process.env.NEXTAUTH_SECRET,
      url: process.env.NEXTAUTH_URL,
    },
  };

  const issues = [];
  
  if (!authConfig.google.clientId) issues.push('Missing GOOGLE_CLIENT_ID');
  if (!authConfig.google.clientSecret) issues.push('Missing GOOGLE_CLIENT_SECRET');
  if (!authConfig.email.resendApiKey && !authConfig.email.emailServerHost) {
    issues.push('Missing email configuration (RESEND_API_KEY or EMAIL_SERVER_HOST)');
  }
  if (!authConfig.nextauth.secret) issues.push('Missing NEXTAUTH_SECRET');
  if (!authConfig.nextauth.url) issues.push('Missing NEXTAUTH_URL');

  return NextResponse.json({
    status: issues.length === 0 ? 'OK' : 'ISSUES',
    issues,
    config: authConfig,
    recommendations: [
      'For Google OAuth: Set up OAuth 2.0 credentials in Google Cloud Console',
      'For email: Either set RESEND_API_KEY for Resend provider or configure SMTP server',
      'Set NEXTAUTH_SECRET to a random string (32+ characters)',
      'Set NEXTAUTH_URL to your domain (e.g., https://yourdomain.com)',
    ],
  });
}
