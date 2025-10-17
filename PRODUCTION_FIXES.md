# Production Fixes for boredinsantacruz.com

## 🔐 Authentication Issues

### Problem:
- Authentication not working on production domain
- NEXTAUTH_URL configuration mismatch
- Google OAuth redirect URLs not configured

### ✅ Solution:

**1. Update Environment Variables on Vercel:**
```bash
NEXTAUTH_URL=https://boredinsantacruz.com
NEXTAUTH_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_key
EMAIL_FROM=noreply@boredinsantacruz.com
```

**2. Configure Google OAuth Redirect URLs:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to APIs & Services > Credentials
- Edit your OAuth 2.0 Client ID
- Add these authorized redirect URIs:
  ```
  https://boredinsantacruz.com/api/auth/callback/google
  http://localhost:3001/api/auth/callback/google (for development)
  ```

**3. Update NextAuth Configuration:**
```javascript
// src/lib/auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Add trustHost for production
  trustHost: true,
});
```

## 🗺️ Map Issues

### Problem:
- Map not loading on production
- Mapbox API key issues
- Environment variables not set

### ✅ Solution:

**1. Set Mapbox Environment Variables on Vercel:**
```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here
```

**2. Update Map Configuration:**
```javascript
// src/components/map/interactive-map.tsx
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYm9yZWRpbiIsImEiOiJjbWdyMXM3dTYwYm8zMmxwbnpsMGwyejMyIn0.26BRwWSE2SX17dSj_cL7QQ';
```

**3. Verify Mapbox Token Permissions:**
- Go to [Mapbox Account](https://account.mapbox.com/)
- Check token permissions include:
  - `styles:read`
  - `fonts:read`
  - `datasets:read`
  - `geocoding:read`

## 🚀 Deployment Checklist

### Environment Variables to Set on Vercel:
```bash
# Authentication
NEXTAUTH_URL=https://boredinsantacruz.com
NEXTAUTH_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_key
EMAIL_FROM=noreply@boredinsantacruz.com

# Maps
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here

# APIs
OPENWEATHER_API_KEY=your_openweather_key
OPENAI_API_KEY=your_openai_key
AIRTABLE_TOKEN=your_airtable_token
AIRTABLE_BASE_ID=your_airtable_base_id

# Tables
AIRTABLE_ACTIVITIES_TABLE=Activities
AIRTABLE_RESTAURANTS_TABLE=Restaurants
AIRTABLE_WELLNESS_TABLE=Wellness
AIRTABLE_DEALS_TABLE=Deals
AIRTABLE_REVIEWS_TABLE=Reviews
AIRTABLE_FAVORITES_TABLE=Favorites
AIRTABLE_TRIPS_TABLE=Trips
AIRTABLE_TRIP_ITEMS_TABLE=TripItems
```

## 🔧 Testing Steps

### 1. Test Authentication:
```bash
# Visit these URLs:
https://boredinsantacruz.com/login
https://boredinsantacruz.com/api/auth/providers
```

### 2. Test Map:
```bash
# Visit:
https://boredinsantacruz.com/map
```

### 3. Debug Endpoints:
```bash
# Test auth configuration:
https://boredinsantacruz.com/api/auth/test

# Test map configuration:
https://boredinsantacruz.com/api/map/test
```

## 🚨 Common Issues & Solutions

### Issue: "There was a problem with the server configuration"
**Solution:** Check NEXTAUTH_URL matches your domain exactly

### Issue: Map shows "Access Token Required"
**Solution:** Verify NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set

### Issue: Google OAuth "redirect_uri_mismatch"
**Solution:** Add production callback URL to Google Console

### Issue: Environment variables not loading
**Solution:** Redeploy after setting variables in Vercel

## 📞 Support Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

**After implementing these fixes, both authentication and maps should work perfectly on boredinsantacruz.com!** 🚀
