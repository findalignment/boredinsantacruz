import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/error?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/error?error=No authorization code received', request.url)
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.eventbrite.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.EVENTBRITE_API_KEY!,
        client_secret: process.env.EVENTBRITE_CLIENT_SECRET!,
        code: code,
        redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/eventbrite/auth`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Store the access token (you might want to store this in a database or session)
    // For now, we'll store it in a cookie
    const response = NextResponse.redirect(new URL('/events', request.url));
    
    response.cookies.set('eventbrite_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in || 3600, // Default 1 hour
    });

    return response;
  } catch (error) {
    console.error('Eventbrite OAuth error:', error);
    return NextResponse.redirect(
      new URL(`/auth/error?error=${encodeURIComponent('Authentication failed')}`, request.url)
    );
  }
}
