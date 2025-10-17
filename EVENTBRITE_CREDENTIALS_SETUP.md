# Eventbrite API Credentials Setup Guide

## 🔑 Required Credentials

You mentioned you have:
- **Client Secret**
- **Public Token** 
- **Private Token**

## 📝 Environment Variables Setup

Add these to your `.env.local` file:

```bash
# Eventbrite API Credentials
EVENTBRITE_CLIENT_ID=your_client_id_here
EVENTBRITE_CLIENT_SECRET=your_client_secret_here
EVENTBRITE_PUBLIC_TOKEN=your_public_token_here
EVENTBRITE_PRIVATE_TOKEN=your_private_token_here

# Legacy (keep for compatibility)
EVENTBRITE_API_KEY=your_private_token_here
```

## 🔧 How to Get These Values

### 1. Go to Eventbrite Developer Console
- Visit: https://www.eventbrite.com/platform/api-keys/
- Sign in to your Eventbrite account

### 2. Create or Select Your App
- Create a new app or select existing one
- Note down the **Client ID** and **Client Secret**

### 3. Generate Tokens
- **Public Token**: For public API access (limited)
- **Private Token**: For full API access (recommended)
- Generate these in your app settings

## 🧪 Test Your Credentials

After adding the environment variables, test them:

```bash
curl -H "Authorization: Bearer YOUR_PRIVATE_TOKEN" \
  "https://www.eventbriteapi.com/v3/users/me/"
```

## 🔍 Common Issues

### Issue 1: 404 NOT_FOUND
- **Cause**: Wrong endpoint or expired token
- **Solution**: Use `/users/me/` endpoint first to test authentication

### Issue 2: 401 Unauthorized
- **Cause**: Invalid token or insufficient permissions
- **Solution**: Regenerate tokens in Eventbrite console

### Issue 3: 403 Forbidden
- **Cause**: Token doesn't have required scopes
- **Solution**: Check app permissions in Eventbrite settings

## 📋 Token Types Explained

### Public Token
- Limited access to public events
- Good for basic event discovery
- Use in URL: `?token=PUBLIC_TOKEN`

### Private Token
- Full API access
- Can access private events
- Use in header: `Authorization: Bearer PRIVATE_TOKEN`

### Client Credentials
- For OAuth applications
- More complex setup
- Best for production apps

## 🚀 Quick Setup Steps

1. **Add credentials to `.env.local`**
2. **Restart your development server**
3. **Test the API connection**
4. **Check events page for results**

## 🔧 API Endpoints to Try

### Test Authentication
```
GET https://www.eventbriteapi.com/v3/users/me/
```

### Get Your Events
```
GET https://www.eventbriteapi.com/v3/users/me/events/
```

### Search Events
```
GET https://www.eventbriteapi.com/v3/events/search/?location.address=Santa+Cruz,CA
```

## 📞 Support

If you're still having issues:
1. Check Eventbrite API documentation
2. Contact Eventbrite support
3. Verify your account has organizer permissions
4. Test with a simple API call first

## 🎯 Current Status

The events page will work with mock events until the API is properly configured. Once you add the credentials and restart the server, the real Eventbrite events should appear.
