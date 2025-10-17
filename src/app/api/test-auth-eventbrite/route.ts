import { NextResponse } from 'next/server';

export async function GET() {
  const results = {
    authentication: {
      status: 'testing',
      issues: [],
      config: {},
    },
    eventbrite: {
      status: 'testing',
      issues: [],
      config: {},
    },
    recommendations: [],
  };

  // Test Authentication Configuration
  try {
    const authConfig = {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Missing',
      EMAIL_FROM: process.env.EMAIL_FROM ? 'Set' : 'Missing',
    };

    results.authentication.config = authConfig;

    // Check for common issues
    if (!process.env.NEXTAUTH_SECRET) {
      results.authentication.issues.push('NEXTAUTH_SECRET is not set');
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      results.authentication.issues.push('Google OAuth credentials are not fully configured');
    }

    if (process.env.NEXTAUTH_URL === 'https://boredinsantacruz1.vercel.app') {
      results.authentication.issues.push('NEXTAUTH_URL is set to production domain but you may be testing locally');
    }

    results.authentication.status = results.authentication.issues.length === 0 ? 'OK' : 'ISSUES_FOUND';
  } catch (error) {
    results.authentication.status = 'ERROR';
    results.authentication.issues.push(`Auth test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Test Eventbrite Configuration
  try {
    const eventbriteConfig = {
      EVENTBRITE_API_KEY: process.env.EVENTBRITE_API_KEY ? 'Set' : 'Missing',
      EVENTBRITE_CLIENT_ID: process.env.EVENTBRITE_CLIENT_ID ? 'Set' : 'Missing',
      EVENTBRITE_CLIENT_SECRET: process.env.EVENTBRITE_CLIENT_SECRET ? 'Set' : 'Missing',
      EVENTBRITE_PUBLIC_TOKEN: process.env.EVENTBRITE_PUBLIC_TOKEN ? 'Set' : 'Missing',
      EVENTBRITE_PRIVATE_TOKEN: process.env.EVENTBRITE_PRIVATE_TOKEN ? 'Set' : 'Missing',
    };

    results.eventbrite.config = eventbriteConfig;

    // Check for Eventbrite API key
    if (!process.env.EVENTBRITE_API_KEY) {
      results.eventbrite.issues.push('EVENTBRITE_API_KEY is not set');
    }

    if (!process.env.EVENTBRITE_PRIVATE_TOKEN && !process.env.EVENTBRITE_PUBLIC_TOKEN) {
      results.eventbrite.issues.push('No Eventbrite tokens configured (need either PRIVATE_TOKEN or PUBLIC_TOKEN)');
    }

    results.eventbrite.status = results.eventbrite.issues.length === 0 ? 'OK' : 'ISSUES_FOUND';
  } catch (error) {
    results.eventbrite.status = 'ERROR';
    results.eventbrite.issues.push(`Eventbrite test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Generate recommendations
  if (results.authentication.issues.length > 0) {
    results.recommendations.push('For Authentication: Update NEXTAUTH_URL to match your testing environment (http://localhost:3001 for local)');
  }

  if (results.eventbrite.issues.length > 0) {
    results.recommendations.push('For Eventbrite: Add EVENTBRITE_API_KEY and EVENTBRITE_PRIVATE_TOKEN to your environment variables');
  }

  // Test actual API calls if configured
  if (process.env.EVENTBRITE_PRIVATE_TOKEN) {
    try {
      const eventbriteResponse = await fetch('https://www.eventbriteapi.com/v3/users/me/', {
        headers: {
          'Authorization': `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (eventbriteResponse.ok) {
        results.eventbrite.status = 'OK';
        results.eventbrite.issues = [];
      } else {
        results.eventbrite.issues.push(`Eventbrite API call failed: ${eventbriteResponse.status} ${eventbriteResponse.statusText}`);
      }
    } catch (error) {
      results.eventbrite.issues.push(`Eventbrite API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return NextResponse.json(results);
}
