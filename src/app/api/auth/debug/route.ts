import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    // Test if auth is working
    const session = await auth();
    
    // Check environment variables
    const envCheck = {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Missing',
      EMAIL_FROM: process.env.EMAIL_FROM ? 'Set' : 'Missing',
    };

    return NextResponse.json({
      status: 'Auth debug info',
      session: session ? 'Active session' : 'No session',
      environment: envCheck,
      recommendations: [
        'Check if NEXTAUTH_URL matches your current domain',
        'Verify Google OAuth redirect URLs include your domain',
        'Test authentication flow step by step',
      ],
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Auth debug failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
