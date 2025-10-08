# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Environment Variables ✅
Make sure your `.env.local` has:
```env
AIRTABLE_TOKEN=your_full_token_here
AIRTABLE_BASE_ID=appOwFPy6P19bd3N6
AIRTABLE_RAINY_TABLE=Rainy
```

### 2. Airtable Data
- [ ] Add 30-40+ activities to your Airtable base
- [ ] Ensure all required fields are filled:
  - Title (required)
  - VenueName
  - Tags (at least 2-3 per activity)
  - Cost (0 for free activities)
  - Duration
  - Notes/Description
  - Website or Instagram (at least one)
  - Images (recommended)

### 3. Test Locally
```bash
npm run dev
```

Test the following:
- [ ] Homepage loads correctly
- [ ] Navigate to /rainy page
- [ ] Activities load from Airtable
- [ ] All filters work (tags, cost, duration, indoor toggle)
- [ ] Clear filters button works
- [ ] Activity count updates correctly
- [ ] Links to websites/Instagram work
- [ ] Mobile responsive design works (use browser dev tools)

### 4. Build Test
```bash
npm run build
npm start
```
- [ ] Build completes without errors
- [ ] Production build works locally

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Bored in Santa Cruz"
git branch -M main
git remote add origin https://github.com/yourusername/boredinsantacruz.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   
3. **Add Environment Variables** in Vercel dashboard:
   - `AIRTABLE_TOKEN` → Your Airtable personal access token
   - `AIRTABLE_BASE_ID` → `appOwFPy6P19bd3N6`
   - `AIRTABLE_RAINY_TABLE` → `Rainy`

4. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit your production URL
- [ ] Test all pages (/, /rainy)
- [ ] Verify activities load from Airtable
- [ ] Test filters functionality
- [ ] Check mobile experience on actual device
- [ ] Test all external links

### 2. Custom Domain (Optional)
- Go to Vercel project settings
- Add your custom domain (e.g., boredinsantacruz.com)
- Update DNS records as instructed
- Wait for SSL certificate provisioning

### 3. SEO Setup
- [ ] Submit sitemap to Google Search Console
  - URL: `https://boredinsantacruz.com/sitemap.xml`
- [ ] Verify site ownership
- [ ] Request indexing for main pages

### 4. Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry, etc.)

## Monitoring

### Check These Regularly:
- Vercel deployment logs for errors
- Airtable API usage (rate limits)
- Site performance (Vercel Analytics)
- User feedback

### Update Content:
- Add new activities weekly
- Update existing activities
- Remove outdated listings
- Respond to user submissions

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Review build logs in Vercel dashboard
- Test build locally with `npm run build`

### Activities Don't Load
- Verify Airtable token is valid
- Check Airtable base ID is correct
- Ensure table name matches `AIRTABLE_RAINY_TABLE`
- Review Vercel function logs

### Slow Performance
- Check Airtable caching (1 hour revalidation)
- Optimize images in Airtable
- Review Vercel Analytics for bottlenecks

## Maintenance

### Regular Updates:
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Deploy Updates:
```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically deploy when you push to your main branch!

---

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Airtable API Docs](https://airtable.com/developers/web/api/introduction)

Good luck with your launch! 🎉

