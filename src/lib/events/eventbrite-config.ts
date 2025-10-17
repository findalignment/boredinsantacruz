// Eventbrite API Configuration with all authentication methods

export interface EventbriteConfig {
  publicToken: string;
  privateToken: string;
  clientId: string;
  clientSecret: string;
}

export function getEventbriteConfig(): EventbriteConfig | null {
  const config = {
    publicToken: process.env.EVENTBRITE_PUBLIC_TOKEN || '',
    privateToken: process.env.EVENTBRITE_PRIVATE_TOKEN || '',
    clientId: process.env.EVENTBRITE_CLIENT_ID || '',
    clientSecret: process.env.EVENTBRITE_CLIENT_SECRET || '',
  };

  // Check if we have at least one authentication method
  if (!config.privateToken && !config.publicToken && !config.clientId) {
    return null;
  }

  return config;
}

export async function testEventbriteConnection(): Promise<{
  success: boolean;
  method: string;
  error?: string;
  data?: any;
}> {
  const config = getEventbriteConfig();
  
  if (!config) {
    return {
      success: false,
      method: 'none',
      error: 'No Eventbrite credentials configured',
    };
  }

  // Try different authentication methods
  const methods = [
    {
      name: 'private_token',
      url: 'https://www.eventbriteapi.com/v3/users/me/',
      headers: {
        'Authorization': `Bearer ${config.privateToken}`,
        'Content-Type': 'application/json',
      },
    },
    {
      name: 'public_token',
      url: `https://www.eventbriteapi.com/v3/users/me/?token=${config.publicToken}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {
      name: 'oauth',
      url: 'https://www.eventbriteapi.com/v3/users/me/',
      headers: {
        'Authorization': `Bearer ${config.clientId}`,
        'Content-Type': 'application/json',
      },
    },
  ];

  for (const method of methods) {
    try {
      const response = await fetch(method.url, {
        headers: method.headers,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          method: method.name,
          data: data,
        };
      }
    } catch (error) {
      console.warn(`Eventbrite ${method.name} failed:`, error);
    }
  }

  return {
    success: false,
    method: 'all_failed',
    error: 'All authentication methods failed',
  };
}
