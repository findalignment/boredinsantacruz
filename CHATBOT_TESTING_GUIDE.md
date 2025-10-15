# 🤖 Chatbot Testing & Troubleshooting Guide

## ✅ WHAT I JUST FIXED

Your chatbot now:
1. ✅ **Generates clickable links** to activities and restaurants
2. ✅ **Protects private pages** (no /profile, /favorites, /trips mentions)
3. ✅ **Renders markdown links** as HTML
4. ✅ **Includes activity IDs** in context
5. ✅ **Has enhanced rules** for better responses

---

## 🧪 HOW TO TEST

### **Step 1: Start Dev Server**
```bash
npm run dev
```

### **Step 2: Open Homepage**
Visit: http://localhost:3000

### **Step 3: Try These Queries**

**✅ Should Work:**
- "Beach for sunset"
- "Tacos downtown"
- "Kids activities"
- "Hiking trails"
- "What should I do today?"
- "Restaurants with ocean views"

**🔗 Should Include Links:**
- Chatbot should respond with: "Check out [Natural Bridges](/activity/ID)" (clickable)
- Or: "Browse all [beaches](/sunny)" (clickable)
- Or: "Try [Local Restaurant](/restaurant/ID)" (clickable)

**🔒 Should NOT Mention:**
- Your profile page
- Your favorites
- Your trips
- Login pages
- Any user-specific content

---

## 🐛 TROUBLESHOOTING

### **Issue: "Chat doesn't respond"**

**Check:**
1. **OpenAI API Key**: Is it in `.env.local`?
   ```bash
   # Should be in .env.local
   OPENAI_API_KEY=sk-...
   ```

2. **Console Errors**: Open browser dev tools (F12), check console
   ```
   Common errors:
   - "OpenAI API key not configured" → Add to .env.local
   - "Rate limit exceeded" → Wait a moment, then try again
   - "Network error" → Check internet connection
   ```

3. **Server Running**: Is `npm run dev` running?

---

### **Issue: "Links don't appear"**

**This is EXPECTED right now!** Here's why:

The chatbot will:
1. ✅ Generate links in markdown format: `[Activity](/activity/ID)`
2. ✅ Convert them to clickable HTML links
3. ⚠️ BUT activity IDs might not match exactly until you have activities in Airtable

**To fix:**
- Make sure you have activities in your Airtable
- Activities need an `id` field
- Test with: "What beaches are good?" (should mention beaches you have in database)

---

### **Issue: "Chatbot mentions private pages"**

**Should not happen!** If it does:
1. Try again with a different query
2. The system prompt explicitly blocks these pages
3. If it persists, the AI is ignoring instructions (rare)

**Protected pages:**
- `/profile`
- `/favorites`
- `/trips`
- `/login`

---

### **Issue: "Chatbot is too vague"**

**This means:**
- Not enough activities in your database
- Chatbot doesn't have context

**To fix:**
1. Add more activities to Airtable
2. Activities should have:
   - Good titles
   - Descriptions
   - Tags
   - Addresses

---

### **Issue: "Rate limiting blocks me"**

**If you configured Upstash:**
- You're limited to 20 requests/minute
- This is CORRECT behavior (prevents abuse)
- Wait 1 minute, then try again

**If you didn't configure Upstash:**
- Rate limiting won't work (no Upstash credentials)
- Chatbot still works, just unprotected
- Sign up for Upstash (see `UPSTASH_SIGNUP_GUIDE.md`)

---

## 🎯 WHAT CHATBOT CAN DO

### **✅ Good Queries:**
- "What should I do today?" → Weather-aware suggestions with links
- "Best beaches" → List of beaches with clickable links
- "Tacos near downtown" → Restaurant suggestions with links
- "Kids activities" → Family-friendly options with links
- "Hiking trails" → Outdoor activities with links
- "What's open now?" → Current availability

### **❌ Can't Do (Yet):**
- Real-time restaurant reservations (need OpenTable API)
- User account actions (intentionally blocked for privacy)
- Other cities (strictly Santa Cruz only)
- Booking/payments (external links only)

---

## 🔗 EXAMPLE RESPONSE

**User asks:** "What beaches are good for sunset?"

**Chatbot should respond:**
```
For sunset viewing in Santa Cruz, I recommend:

1. Natural Bridges State Beach - Perfect for sunset and tide pools
   Check out [Natural Bridges State Beach](/activity/rec123) for details
   Parking: $10, best time: 6-7pm

2. Cowell Beach - Great views and close to the wharf
   See [Cowell Beach](/activity/rec456) for more info
   Parking: Street parking nearby, free

3. Lighthouse Point - Stunning views along West Cliff Drive
   Learn more about [West Cliff Drive](/activity/rec789)
   Parking: Limited, arrive early

Want to see all beach options? Browse our [sunny day activities](/sunny)!

What type of experience are you looking for? Romantic, family-friendly, or photography?
```

**Key points:**
- ✅ Includes clickable links
- ✅ Mentions parking & costs
- ✅ Weather-aware (checks current conditions)
- ✅ Asks follow-up question
- ✅ No private pages mentioned

---

## 📝 SYSTEM PROMPT RULES

The chatbot follows these 10 strict rules:

1. **Santa Cruz only** - No other cities
2. **Family-friendly** - No NSFW content
3. **Weather-aware** - Considers current conditions
4. **Specific** - Real names, addresses, links
5. **Concise** - 3-5 recommendations max
6. **Practical** - Parking, cost, hours
7. **Geographic** - Santa Cruz County boundaries only
8. **Always link** - Every activity/restaurant gets a link
9. **Protect private** - No user pages mentioned
10. **Actionable** - Ends with next step

---

## 🚀 NEXT STEPS

### **Make Chatbot Better:**

1. **Add More Activities**
   - Import from Google Places (see `GOOGLE_PLACES_IMPORT_SETUP.md`)
   - Manually curate in Airtable
   - Include good descriptions and tags

2. **Add Restaurant Reservations**
   - Implement OpenTable API (see `REZY_INTEGRATION_GUIDE.md`)
   - OR create manual "Last-Minute Openings" list
   - Display in chatbot responses

3. **Enhance Context**
   - Add tide data to chatbot context
   - Include event information
   - Show "what's happening tonight"

4. **Test & Iterate**
   - Try many different queries
   - Note where it fails
   - Adjust system prompt as needed

---

## 💡 TIPS FOR BEST RESULTS

**Good queries include:**
- Time of day: "tonight", "this morning", "afternoon"
- Activity type: "beach", "hiking", "food", "kids"
- Weather context: "sunny day", "if it rains"
- Specifics: "downtown", "with parking", "free"

**Ask follow-up questions:**
- Chatbot remembers conversation context
- Build on previous responses
- Get more specific recommendations

---

## ✅ CHECKLIST

Before going live, test:

- [ ] Chatbot responds to queries
- [ ] Links are clickable
- [ ] No private pages mentioned
- [ ] Weather info included
- [ ] Activity recommendations relevant
- [ ] Rate limiting works (if Upstash configured)
- [ ] Mobile responsive
- [ ] Fast response time (< 5 seconds)

---

## 🆘 STILL NOT WORKING?

**Check these in order:**

1. **.env.local exists and has:**
   ```bash
   OPENAI_API_KEY=sk-...
   AIRTABLE_TOKEN=...
   AIRTABLE_BASE_ID=...
   OPENWEATHER_API_KEY=...
   ```

2. **Dev server is running:**
   ```bash
   npm run dev
   # Should see: Ready on http://localhost:3000
   ```

3. **Browser console** (F12) shows no errors

4. **Activities exist** in your Airtable database

5. **API keys are valid** (not expired)

If still not working, check the API response:
```bash
# Test the API directly
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi"}]}'
```

---

**Ready to test?** Start with "What should I do today?" and see what happens! 🚀

