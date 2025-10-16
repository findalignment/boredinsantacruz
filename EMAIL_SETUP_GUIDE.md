# 📧 Email Setup Guide: events@boredinsantacruz.com

## Goal: Send Event Notifications from Your Custom Domain

Your site will send beautiful HTML emails from `events@boredinsantacruz.com` when:
- Users submit events (confirmation)
- Admins receive new submissions (notification)
- Future: Approval/rejection emails

---

## Step 1: Set Up Resend Account

### 1.1 Create Resend Account
1. Go to **https://resend.com**
2. Click **"Sign Up"**
3. Use your email (or GitHub login)
4. Verify your email

### 1.2 Get Your API Key
1. After login, go to **API Keys** (left sidebar)
2. Click **"Create API Key"**
3. Name it: `Bored in Santa Cruz - Production`
4. **Permissions:** Full Access (or "Sending access" minimum)
5. Click **Create**
6. **Copy the API key** — you'll only see it once!
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Step 2: Add Your Domain to Resend

### 2.1 Add Domain
1. In Resend dashboard, go to **Domains** (left sidebar)
2. Click **"Add Domain"**
3. Enter: `boredinsantacruz.com`
4. Click **Add**

### 2.2 Verify Domain with DNS Records
Resend will show you **3 DNS records** to add. You need to add these to your domain registrar (wherever you bought boredinsantacruz.com).

**The 3 records will look like this:**

#### Record 1: SPF (TXT record)
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
```

#### Record 2: DKIM (TXT record)
```
Type: TXT
Name: resend._domainkey
Value: [long string provided by Resend]
```

#### Record 3: DKIM (CNAME record)
```
Type: CNAME
Name: resend._domainkey
Value: [provided by Resend]
```

### 2.3 How to Add DNS Records

**If your domain is with:**

#### Namecheap:
1. Login to Namecheap
2. Go to **Domain List** → click your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Add each record (type, host, value)
6. Save

#### GoDaddy:
1. Login to GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Click **Add** for each record
5. Enter type, name, and value
6. Save

#### Vercel (if you're using Vercel DNS):
1. Go to your project in Vercel
2. **Settings** → **Domains**
3. Click on `boredinsantacruz.com`
4. Add DNS records in the DNS section

#### Cloudflare (if using):
1. Login to Cloudflare
2. Select your domain
3. Go to **DNS** tab
4. Click **Add Record**
5. Add each record

### 2.4 Wait for Verification
- DNS changes take **5 minutes to 48 hours** (usually 15-30 min)
- Resend will automatically check every few minutes
- Once verified, you'll see a **green checkmark** ✅ next to your domain

---

## Step 3: Configure Your .env.local File

Add these to `.env.local`:

```bash
# Resend Email Configuration
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="events@boredinsantacruz.com"
ADMIN_EMAIL="your-admin-email@gmail.com"  # Where you want to receive notifications
```

**Example:**
```bash
RESEND_API_KEY="re_ABC123xyz789..."
EMAIL_FROM="events@boredinsantacruz.com"
ADMIN_EMAIL="rock@example.com"
```

---

## Step 4: Verify It's Working (Local Test)

### 4.1 Start Your Dev Server
```bash
npm run dev
```

### 4.2 Test Event Submission
1. Go to http://localhost:3000/events/submit
2. Fill out the event form
3. Submit

### 4.3 Check Your Email
You should receive:
- **Submitter:** Email to the address you entered in the form
- **Admin:** Email to `ADMIN_EMAIL` from your .env.local

### 4.4 Troubleshooting Local Test

**If no email arrives:**

1. **Check console logs:**
   ```bash
   # In your terminal where dev server is running
   # Look for:
   [Email] Confirmation sent to user@example.com
   [Email] Admin notification sent
   # Or:
   [Email] Resend API key not configured
   [Email] Failed to send confirmation: ...
   ```

2. **Check Resend Dashboard:**
   - Go to **Logs** in Resend
   - See if emails were sent/failed
   - Check error messages

3. **Common Issues:**
   - ❌ Domain not verified → Wait for DNS
   - ❌ Wrong API key → Copy it again
   - ❌ Email address not allowed → Domain must be verified first

---

## Step 5: Deploy to Vercel

### 5.1 Add Environment Variables to Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
RESEND_API_KEY → re_your_key_here
EMAIL_FROM → events@boredinsantacruz.com
ADMIN_EMAIL → your-admin-email@gmail.com
```

5. Select **Production, Preview, Development**
6. Click **Save**

### 5.2 Redeploy
```bash
git add .env.local  # DON'T do this! .env.local should be in .gitignore
git push origin main
```

Or trigger a redeploy in Vercel dashboard.

### 5.3 Test in Production
1. Go to https://boredinsantacruz.com/events/submit
2. Submit a test event
3. Check your email!

---

## 📧 Email Templates You're Already Using

Your site will send these beautiful HTML emails:

### 1. Event Submission Confirmation
**To:** User who submitted the event  
**From:** events@boredinsantacruz.com  
**Subject:** Event Received: "[Event Title]"

**Content:**
- ✅ Success badge
- Event title highlighted
- "What happens next" (3 steps)
- Timeline: 24-hour review
- CTA: Browse All Events
- Contact info

### 2. Admin Notification
**To:** Your admin email  
**From:** events@boredinsantacruz.com  
**Subject:** [Action Required] New Event Submission: "[Title]"

**Content:**
- 📅 New event badge
- Event details (title, submitter, etc.)
- Action required notice
- Links to Airtable + admin dashboard
- Moderation checklist

---

## 🎨 Customizing Email Templates

The email templates are in:
```
src/lib/email/event-notifications.ts
```

You can customize:
- Colors (change gradient colors)
- Text (update messages)
- CTAs (change button links)
- Branding (add logo)

---

## 🔐 Security Best Practices

### ✅ Do:
- Keep `RESEND_API_KEY` secret
- Never commit `.env.local` to git
- Use different API keys for dev/production
- Verify domain properly

### ❌ Don't:
- Share API key publicly
- Commit API key to GitHub
- Use same key across multiple projects
- Skip domain verification

---

## 💰 Resend Pricing

**Free Tier:**
- **3,000 emails/month** for free
- Perfect for getting started
- More than enough for initial launch

**Paid Plans** (if you grow):
- **$20/month:** 50,000 emails
- **$80/month:** 100,000 emails

For event submissions, you'll likely stay in free tier for months!

---

## 🧪 Testing Checklist

Before going live:

### Local Testing:
- [ ] Resend API key added to `.env.local`
- [ ] Domain verified in Resend dashboard
- [ ] Test event submission works
- [ ] Submitter receives confirmation email
- [ ] Admin receives notification email
- [ ] Emails look good on mobile
- [ ] All links in emails work

### Production Testing:
- [ ] Environment variables set in Vercel
- [ ] Test submission on live site
- [ ] Verify emails arrive quickly (<30 seconds)
- [ ] Check spam folder if not in inbox
- [ ] Test on multiple email providers (Gmail, Outlook, etc.)

---

## 🚨 Troubleshooting Common Issues

### Issue: "Domain not verified"
**Solution:** 
- Check DNS records are added correctly
- Wait 15-30 minutes for DNS propagation
- Use DNS checker: https://dnschecker.org
- Verify SPF and DKIM records

### Issue: "Emails going to spam"
**Solution:**
- Make sure domain is fully verified
- SPF and DKIM records must be correct
- Warm up your domain (start with low volume)
- Ask recipients to mark as "Not Spam"

### Issue: "No emails being sent"
**Solution:**
- Check console logs for errors
- Verify RESEND_API_KEY is correct
- Check Resend dashboard → Logs
- Ensure domain is verified (green checkmark)

### Issue: "Emails not arriving at admin"
**Solution:**
- Check `ADMIN_EMAIL` is correct in env vars
- Check admin's spam folder
- Verify in Resend logs that email was sent
- Try different admin email address

### Issue: "Rate limit exceeded"
**Solution:**
- Free tier: 3,000 emails/month
- Check if you're being spammed
- Upgrade plan if legitimate traffic

---

## 📞 Support Resources

### Resend:
- **Docs:** https://resend.com/docs
- **Status:** https://status.resend.com
- **Support:** support@resend.com
- **Discord:** https://resend.com/discord

### DNS Help:
- **DNS Checker:** https://dnschecker.org
- **MX Toolbox:** https://mxtoolbox.com/spf.aspx

---

## ✅ Quick Start Summary

**5 Steps to Get Email Working:**

1. **Sign up for Resend** → Get API key
2. **Add domain** → boredinsantacruz.com
3. **Add DNS records** → SPF, DKIM (at domain registrar)
4. **Wait for verification** → Green checkmark (15-30 min)
5. **Add to .env.local:**
   ```bash
   RESEND_API_KEY="re_..."
   EMAIL_FROM="events@boredinsantacruz.com"
   ADMIN_EMAIL="your-email@example.com"
   ```
6. **Test locally** → Submit event, check email
7. **Deploy to Vercel** → Add env vars, redeploy
8. **Test production** → Submit on live site

---

## 🎉 Done!

Once you see this:
- ✅ Domain verified in Resend
- ✅ Test email received
- ✅ Beautiful HTML formatting
- ✅ Links working

**Your event notification system is live!** 📧

Users will get instant confirmation emails, and you'll be notified of every new submission.

---

## 🔄 Future Enhancements (Optional)

Want to level up your email game?

1. **Approval/Rejection Emails**
   - Auto-send when you approve/reject in admin dashboard
   - Already have code structure, just need to uncomment

2. **Email Reminders**
   - Send "Your event is tomorrow!" reminders
   - Event attendee reminders

3. **Newsletter Integration**
   - Weekly digest of new events
   - Monthly "What's happening" email

4. **Custom Email Templates**
   - Add your logo
   - Match site branding
   - A/B test subject lines

Let me know if you want help with any of these! 🚀

