# Eventbrite API Setup Guide

## 🚨 Current Issue
The Eventbrite API is returning a 404 error, which means either:
1. The API endpoint URL is incorrect
2. The authentication method is wrong
3. The API key doesn't have proper permissions

## 🔧 Troubleshooting Steps

### 1. Verify API Key
- Go to [Eventbrite Developer Console](https://www.eventbrite.com/platform/api-keys/)
- Make sure your API key is active and has proper permissions
- Test the key with a simple API call

### 2. Check API Endpoint
The current endpoint we're using:
```
https://www.eventbriteapi.com/v3/events/search/
```

Try these alternative endpoints:
```
https://www.eventbriteapi.com/v3/organizations/{organization_id}/events/
https://www.eventbriteapi.com/v3/users/me/events/
```

### 3. Authentication Methods
Try these different authentication approaches:

**Method 1: Bearer Token (Current)**
```javascript
headers: {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
}
```

**Method 2: Token in Query String**
```javascript
const params = new URLSearchParams({
  'token': apiKey,
  // other params...
});
```

**Method 3: Basic Auth**
```javascript
headers: {
  'Authorization': `Basic ${btoa(apiKey + ':')}`,
  'Content-Type': 'application/json',
}
```

### 4. Test API Key
Use this curl command to test your API key:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://www.eventbriteapi.com/v3/users/me/"
```

### 5. Check API Documentation
- Visit [Eventbrite API Documentation](https://www.eventbrite.com/platform/api-keys/)
- Look for the correct endpoints and authentication methods
- Check if there are any rate limits or restrictions

## 🎯 Quick Fix Options

### Option 1: Use Mock Events (Current)
The site now shows mock Santa Cruz events when Eventbrite API fails:
- Santa Cruz Farmers Market
- Boardwalk Beach Concert Series
- Capitola Art & Wine Festival
- Surf Contest - Steamer Lane
- Downtown Santa Cruz Night Market

### Option 2: Manual Event Management
Create an Airtable table for events and manage them manually.

### Option 3: Alternative APIs
Consider using other event APIs:
- Facebook Events API
- Meetup API
- Google Events API
- Local event websites

## 🔍 Debug Information

**Current API Key**: `UDM3MDMIELJ44LKJBM`
**Current Endpoint**: `/v3/events/search/`
**Error**: 404 NOT_FOUND
**Status**: API key exists but endpoint is not accessible

## 📞 Next Steps

1. **Contact Eventbrite Support** - They can help verify your API key and permissions
2. **Check Eventbrite Account** - Make sure you have an active organizer account
3. **Try Alternative Endpoints** - Test with organization-specific endpoints
4. **Use Mock Events** - The site will work with sample events until API is fixed

## 🚀 Current Status

The events page is now working with mock events, so users can see sample Santa Cruz events while we resolve the API issues. The mock events include realistic local events like farmers markets, concerts, and festivals.
