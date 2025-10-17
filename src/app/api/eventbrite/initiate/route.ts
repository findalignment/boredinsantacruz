import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/eventbrite/auth`;
  
  const authUrl = new URL('https://www.eventbrite.com/oauth/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', process.env.EVENTBRITE_API_KEY!);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  return NextResponse.json({ 
    authUrl: authUrl.toString(),
    redirectUri 
  });
}
