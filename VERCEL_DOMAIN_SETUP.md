# 🌐 Vercel Custom Domain Setup Guide

## Quick Troubleshooting

### Issue: Domain shows error, can't see DNS records

This usually means the domain isn't fully configured yet. Follow these steps:

---

## Step-by-Step Setup

### 1. **Find Your DNS Records in Vercel**

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings** (top navigation)
3. Click **Domains** (left sidebar)
4. You should see your domain with a status indicator

**What you'll see:**
- ⚠️ **Invalid Configuration** - DNS not set up yet
- ⏳ **Pending Verification** - DNS set up, waiting for propagation
- ✅ **Valid Configuration** - Everything working!

### 2. **Click on Your Domain**

Click on the domain name (e.g., `boredinsantacruz.com`) to expand it.

You should now see:
- **DNS Records** to configure
- **Nameservers** (if Vercel is managing DNS)

---

## DNS Configuration Options

### Option A: Using Your Domain Registrar's DNS (Recommended)

**Best for**: Most users, existing domains

#### For Root Domain (e.g., boredinsantacruz.com)

Vercel will show you need to add **ONE** of these:

**Option 1: A Record (Preferred)**
```
Type: A
Name: @ (or blank)
Value: 76.76.21.21
```

**Option 2: CNAME Record (Alternative)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

> ⚠️ **Important**: Some DNS providers (like GoDaddy) don't support CNAME for root domains. Use A Record instead.

#### For www Subdomain (e.g., www.boredinsantacruz.com)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step-by-Step:
1. Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find **DNS Settings** or **DNS Management**
3. Add the records shown above
4. **Save** changes
5. Wait 5-60 minutes for DNS propagation

---

### Option B: Using Vercel DNS (Advanced)

**Best for**: New domains, full Vercel integration

1. In Vercel domain settings, you'll see **Nameservers** to use
2. Copy the nameservers (usually 2-4 addresses like `ns1.vercel-dns.com`)
3. Go to your domain registrar
4. Find **Nameserver Settings**
5. Replace existing nameservers with Vercel's nameservers
6. Save changes
7. Wait up to 48 hours for propagation

---

## Common Domain Registrars

### GoDaddy
1. Log in to [godaddy.com](https://godaddy.com)
2. Go to **My Products** → **Domains**
3. Click on your domain → **DNS**
4. Click **Add** to add new records
5. Add A record for `@` and CNAME for `www`

### Namecheap
1. Log in to [namecheap.com](https://namecheap.com)
2. **Domain List** → Click **Manage** on your domain
3. Click **Advanced DNS**
4. Click **Add New Record**
5. Add records as shown above

### Google Domains
1. Log in to [domains.google.com](https://domains.google.com)
2. Click on your domain
3. Click **DNS** (left menu)
4. Scroll to **Custom resource records**
5. Add records as shown above

### Cloudflare
1. Log in to [cloudflare.com](https://cloudflare.com)
2. Click on your domain
3. Click **DNS** (top menu)
4. Click **Add record**
5. Add records as shown above
6. ⚠️ Make sure **Proxy status** is **OFF (DNS only)** for Vercel records

---

## Troubleshooting

### Problem 1: "Invalid Configuration" Error

**Cause**: DNS records not set up or not propagated yet

**Solutions**:
1. ✅ Verify you added the records to the correct domain
2. ✅ Check for typos in record values
3. ✅ Wait 5-60 minutes for DNS propagation
4. ✅ Use [whatsmydns.net](https://whatsmydns.net) to check propagation
5. ✅ Clear your browser cache and DNS cache

---

### Problem 2: Can't See DNS Records in Vercel

**Cause**: Domain not added yet or needs to be expanded

**Solutions**:
1. Go to **Project Settings** → **Domains**
2. If domain isn't listed:
   - Click **Add** button
   - Enter your domain (e.g., `boredinsantacruz.com`)
   - Click **Add**
3. Click on the domain name to **expand** it
4. You should now see the DNS records

---

### Problem 3: "Domain Already in Use"

**Cause**: Domain is already added to another Vercel project

**Solutions**:
1. Check if you have multiple Vercel accounts
2. Remove domain from other project first
3. Or use a subdomain (e.g., `app.yourdomain.com`)

---

### Problem 4: www Not Working

**Cause**: Missing CNAME record for www subdomain

**Solutions**:
1. Add CNAME record: `www` → `cname.vercel-dns.com`
2. Or add both domains in Vercel:
   - `boredinsantacruz.com`
   - `www.boredinsantacruz.com`

---

### Problem 5: SSL Certificate Issues

**Cause**: Certificate not provisioned yet

**Solutions**:
1. Wait 5-10 minutes after DNS is verified
2. Vercel automatically provisions SSL certificates
3. Check domain status in Vercel (should say "Valid Configuration")
4. If still issues after 1 hour, try:
   - Remove domain from Vercel
   - Wait 5 minutes
   - Re-add domain

---

## Verification Steps

### 1. Check DNS Propagation
Use [whatsmydns.net](https://whatsmydns.net):
1. Enter your domain
2. Select **A** record type
3. Click **Search**
4. Should show `76.76.21.21` globally (or your specific IP)

### 2. Check in Terminal
```bash
# Check A record
dig yourdomain.com

# Check CNAME record
dig www.yourdomain.com

# Or use nslookup
nslookup yourdomain.com
```

### 3. Check in Vercel
- Go to **Settings** → **Domains**
- Your domain should show ✅ **Valid Configuration**
- Click domain to see "SSL Certificate Issued"

---

## Expected Timeline

| Step | Time |
|------|------|
| Add DNS records | 2-5 minutes |
| DNS propagation | 5-60 minutes (usually ~15 min) |
| SSL certificate | 5-10 minutes after DNS verified |
| **Total** | **~30 minutes** |

> ⏰ In rare cases, DNS can take up to 48 hours to fully propagate globally.

---

## Clear DNS Cache (If Needed)

### Mac
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Windows
```cmd
ipconfig /flushdns
```

### Linux
```bash
sudo systemd-resolve --flush-caches
```

### Chrome
1. Go to `chrome://net-internals/#dns`
2. Click **Clear host cache**

---

## Domain Redirect Setup

### Redirect www to Root Domain (or vice versa)

Once both domains are verified in Vercel:

1. Go to **Settings** → **Domains**
2. Find the domain you want to redirect FROM
3. Click the **⋯** menu next to it
4. Click **Redirect to...**
5. Select the domain to redirect TO
6. Choose **Permanent (308)** redirect

Example: Redirect `www.boredinsantacruz.com` → `boredinsantacruz.com`

---

## Quick Command Reference

### Check if DNS is working:
```bash
# Should return 76.76.21.21
dig +short boredinsantacruz.com

# Should return cname.vercel-dns.com
dig +short www.boredinsantacruz.com CNAME
```

### Check from multiple locations:
```bash
# Install dig if needed (Mac: comes pre-installed, Linux: apt install dnsutils)

# Check from Google DNS
dig @8.8.8.8 yourdomain.com

# Check from Cloudflare DNS
dig @1.1.1.1 yourdomain.com
```

---

## What You Should See (Example)

### In Vercel Dashboard:
```
Domain: boredinsantacruz.com
Status: ✅ Valid Configuration
SSL: ✅ Certificate Issued

DNS Configuration:
- A Record: @ → 76.76.21.21 ✅
- CNAME Record: www → cname.vercel-dns.com ✅
```

### In Your Browser:
- `https://boredinsantacruz.com` → Your site loads ✅
- `https://www.boredinsantacruz.com` → Your site loads ✅
- Both show 🔒 SSL certificate

---

## Still Having Issues?

### Check These Common Mistakes:

1. ❌ Added records to wrong domain
2. ❌ Typo in DNS record value
3. ❌ Used CNAME for root domain (use A record instead)
4. ❌ Cloudflare proxy enabled (should be DNS only)
5. ❌ Didn't save DNS changes
6. ❌ Looking at cached DNS (clear cache)

### Get Help:

1. **Vercel Support**:
   - In dashboard, click **Help** → **Contact Support**
   - Or [vercel.com/support](https://vercel.com/support)

2. **Check Vercel Docs**:
   - [Custom Domains](https://vercel.com/docs/concepts/projects/domains)
   - [DNS Records](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

3. **Community**:
   - [Vercel Discord](https://vercel.com/discord)
   - [GitHub Discussions](https://github.com/vercel/vercel/discussions)

---

## Best Practices

### ✅ Do:
- Use A record for root domain (`@` or blank)
- Use CNAME for subdomains (`www`, `app`, etc.)
- Wait at least 15 minutes for DNS propagation
- Clear browser cache when testing
- Set up both root and www domains

### ❌ Don't:
- Use CNAME for root domain (won't work on most registrars)
- Delete existing MX records (email will break)
- Enable Cloudflare proxy for Vercel domains
- Test immediately (DNS needs time to propagate)

---

## Example: Complete Setup for boredinsantacruz.com

### 1. In Vercel:
- Add domain: `boredinsantacruz.com`
- Add domain: `www.boredinsantacruz.com`
- Set redirect: `www` → root domain

### 2. In DNS Provider (e.g., GoDaddy):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 (10 minutes)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 (10 minutes)
```

### 3. Wait & Verify:
- Wait 15-30 minutes
- Check [whatsmydns.net](https://whatsmydns.net)
- Visit your domain
- Verify SSL certificate shows

### 4. Done! 🎉
Your site is now live on your custom domain!

---

## Quick Start Checklist

- [ ] Domain purchased from registrar
- [ ] Logged into Vercel dashboard
- [ ] Project deployed and working on `.vercel.app`
- [ ] Added domain in Vercel Settings → Domains
- [ ] Noted DNS records shown by Vercel
- [ ] Logged into domain registrar (GoDaddy, etc.)
- [ ] Found DNS Management section
- [ ] Added A record for root domain
- [ ] Added CNAME record for www subdomain
- [ ] Saved DNS changes
- [ ] Waited 15-30 minutes
- [ ] Checked domain status in Vercel (should be ✅)
- [ ] Visited domain in browser (should load)
- [ ] SSL certificate shows 🔒
- [ ] Set up redirect (www → root or vice versa)

---

## Need More Help?

**Tell me:**
1. What domain registrar are you using? (GoDaddy, Namecheap, etc.)
2. What exact error message do you see in Vercel?
3. Have you added the DNS records to your registrar?
4. How long has it been since you added the records?

I can provide specific step-by-step instructions for your exact setup!

