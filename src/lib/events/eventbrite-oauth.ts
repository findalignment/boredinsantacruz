// Eventbrite OAuth service for server-side authentication

export interface EventbriteTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export class EventbriteOAuthService {
  private apiKey: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.apiKey = process.env.EVENTBRITE_API_KEY || '';
    this.clientSecret = process.env.EVENTBRITE_CLIENT_SECRET || '';
    this.redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/eventbrite/auth`;

    if (!this.apiKey || !this.clientSecret) {
      console.warn('Eventbrite OAuth credentials not configured');
    }
  }

  /**
   * Generate authorization URL for OAuth flow
   */
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.apiKey,
      redirect_uri: this.redirectUri,
    });

    return `https://www.eventbrite.com/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<EventbriteTokenResponse> {
    const response = await fetch('https://www.eventbrite.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.apiKey,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<EventbriteTokenResponse> {
    const response = await fetch('https://www.eventbrite.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.apiKey,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}

export const eventbriteOAuth = new EventbriteOAuthService();
