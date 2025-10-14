# 🤖 Cruz Bot - AI Chatbot Setup Guide

**Your intelligent Santa Cruz activity assistant**

---

## ✅ What's Been Built

Cruz Bot is a fully-functional AI chatbot that helps users discover Santa Cruz activities using OpenAI GPT-4.

### Features:
- **Natural Language Understanding** - Users ask questions in plain English
- **Weather-Aware** - Considers current weather in recommendations
- **Activity Database Integration** - Searches through all activities
- **NSFW Filter** - Family-friendly content only
- **Santa Cruz Focused** - Rejects off-topic queries
- **Streaming Responses** - Fast, real-time answers
- **Beautiful UI** - Floating chat button, smooth animations
- **Mobile-Friendly** - Works great on all devices

---

## 🔑 Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `sk-`)

### 2. Add Environment Variable

Add this to your `.env.local` file:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**For Vercel Deployment:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add `OPENAI_API_KEY` with your key
4. Deploy

---

## 💰 Cost Estimation

### Pricing (as of Oct 2025):
- **GPT-4 Turbo:** $10 per 1M input tokens, $30 per 1M output tokens
- **GPT-3.5 Turbo:** $0.50 per 1M input tokens, $1.50 per 1M output tokens

### Estimated Costs:
**With GPT-4 Turbo:**
- Average conversation: ~500 tokens input, ~300 tokens output
- Cost per conversation: ~$0.014
- 1,000 conversations: ~$14
- 10,000 conversations: ~$140

**With GPT-3.5 Turbo:**
- Same conversation: ~$0.001
- 1,000 conversations: ~$1
- 10,000 conversations: ~$10

### Recommendation:
- **Start with GPT-4 Turbo** for best quality
- **Switch to GPT-3.5 Turbo** if costs become an issue
- Set up usage alerts in OpenAI dashboard

---

## 🎯 How It Works

### 1. System Prompt
Defined in `src/lib/chatbot/system-prompt.ts`:
- Strict rules (Santa Cruz only, no NSFW)
- Personality guidelines
- Example responses
- Query validation

### 2. Context Enrichment
When a user asks a question, the bot:
1. Fetches current weather data
2. Searches activity database for relevant activities
3. Builds context-aware prompt
4. Sends to OpenAI

### 3. Response Streaming
- Uses Vercel AI SDK for streaming
- Displays responses in real-time
- Smooth user experience

---

## 🧠 Example Queries

### What Cruz Bot Can Answer:

✅ "What should I do on a rainy Saturday?"
- Bot considers current weather
- Suggests indoor activities
- Provides practical details

✅ "Best beach for sunset today?"
- Checks sunset time
- Recommends west-facing beaches
- Includes parking info

✅ "Where can I get authentic Mexican food?"
- Searches restaurant database
- Provides top recommendations
- Includes addresses

✅ "Fun activities for kids under 10?"
- Filters family-friendly activities
- Considers weather
- Suggests age-appropriate options

✅ "I have 3 hours free, what should I do?"
- Time-appropriate suggestions
- Current weather considered
- Multiple options provided

---

## 🚫 What Cruz Bot Rejects:

❌ NSFW content
- "Where are the strip clubs?"
- Bot responds: "I'm a family-friendly guide..."

❌ Off-topic locations
- "What should I do in New York?"
- Bot responds: "I specialize in Santa Cruz..."

❌ Inappropriate requests
- Bot uses content moderation
- Politely redirects to appropriate topics

---

## 🎨 Customization

### Change the Model:
In `src/app/api/chat/route.ts`:

```typescript
// Use GPT-3.5 Turbo (cheaper)
model: openai('gpt-3.5-turbo')

// Use GPT-4 Turbo (better quality)
model: openai('gpt-4-turbo-preview')

// Use GPT-4 (most expensive, best quality)
model: openai('gpt-4')
```

### Adjust Temperature:
```typescript
temperature: 0.7  // Default (balanced)
temperature: 0.3  // More focused/deterministic
temperature: 1.0  // More creative/varied
```

### Modify Personality:
Edit `src/lib/chatbot/system-prompt.ts`:
- Change welcome message
- Adjust tone/personality
- Add/remove rules
- Update example responses

---

## 🔧 Technical Details

### Files Created:
- `src/app/api/chat/route.ts` - API endpoint
- `src/lib/chatbot/system-prompt.ts` - Bot configuration
- `src/components/chatbot/chat-interface.tsx` - UI component

### Dependencies:
- `ai` - Vercel AI SDK
- `@ai-sdk/openai` - OpenAI provider
- `openai` - OpenAI SDK

### Edge Runtime:
The chat API runs on Vercel Edge Network for:
- Faster response times (< 100ms cold start)
- Global distribution
- Lower costs
- Better scalability

---

## 📊 Analytics & Monitoring

### Track Usage:
Add logging to `src/app/api/chat/route.ts`:

```typescript
// Log each query
console.log('User query:', userQuery);
console.log('Token usage:', response.usage);
```

### Monitor Costs:
1. OpenAI Dashboard → Usage
2. Set up billing alerts
3. Monitor daily/monthly spend

### User Analytics:
- Track common queries
- Identify popular topics
- Optimize system prompt based on usage

---

## 🚀 Future Enhancements

### Phase 1 (Current):
- ✅ Basic Q&A
- ✅ Weather context
- ✅ Activity search

### Phase 2 (Coming Soon):
- [ ] User conversation history
- [ ] Personalized recommendations
- [ ] Multi-turn conversations with memory
- [ ] Image generation for activities
- [ ] Voice input/output

### Phase 3 (Advanced):
- [ ] Trip planning via chat
- [ ] Reservation booking
- [ ] Real-time event updates
- [ ] Multi-language support
- [ ] Integration with user profiles

---

## 💡 Best Practices

### 1. Keep System Prompt Updated
- Add new activities as they're added
- Update seasonal information
- Refine based on user feedback

### 2. Monitor for Abuse
- Set rate limits
- Block inappropriate users
- Log all queries for review

### 3. Optimize Costs
- Use GPT-3.5 for simple queries
- Cache common responses
- Implement query preprocessing

### 4. User Experience
- Keep responses concise (< 150 words)
- Always provide actionable advice
- Include links when relevant
- Be enthusiastic but helpful

---

## 🐛 Troubleshooting

### "OpenAI API key not configured"
- Add `OPENAI_API_KEY` to environment variables
- Restart development server
- Redeploy on Vercel

### Slow Responses
- Check OpenAI API status
- Reduce context size
- Use Edge runtime (already enabled)

### Inappropriate Responses
- Update system prompt
- Add more validation rules
- Implement content filtering

### High Costs
- Switch to GPT-3.5-turbo
- Reduce conversation history
- Implement response caching

---

## 📞 Support

### OpenAI:
- [Platform Status](https://status.openai.com/)
- [API Documentation](https://platform.openai.com/docs)
- [Community Forum](https://community.openai.com/)

### Vercel AI SDK:
- [Documentation](https://sdk.vercel.ai/docs)
- [Examples](https://github.com/vercel/ai)
- [Discord](https://vercel.com/discord)

---

## ✨ The Bot is LIVE!

Cruz Bot is now accessible from every page via the floating chat button in the bottom-right corner.

**Try it out:**
1. Click the 💬 button
2. Ask a question
3. Get instant, intelligent recommendations!

**Enjoy your new AI assistant! 🌊🤖**

