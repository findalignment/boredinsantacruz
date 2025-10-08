# 🌊 Bored in Santa Cruz

Your ultimate guide to discovering activities, venues, and experiences in Santa Cruz, California — rain or shine!

## Features

- 🌧️ **Rainy Day Activities** - Indoor activities, cozy cafes, museums, and more
- ☀️ **Sunny Day Activities** - Beach days, hiking trails, outdoor dining (coming soon)
- 🔍 **Advanced Filtering** - Filter by tags, cost, duration, and indoor/outdoor
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Modern** - Built with Next.js 15 and React Server Components
- 🎨 **Beautiful UI** - Tailwind CSS with smooth animations

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Airtable
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Airtable account with API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/boredinsantacruz.git
cd boredinsantacruz
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
AIRTABLE_TOKEN=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_RAINY_TABLE=RainyActivities
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Airtable Setup

Your Airtable base should have a table called `RainyActivities` with the following fields:

- **Title** (Single line text) - Required
- **VenueName** (Single line text)
- **Tags** (Multiple select)
- **Cost** (Number)
- **Duration** (Single select or text)
- **Notes** (Long text)
- **Website** (URL)
- **Instagram** (URL)
- **Image** (Attachment)

### Getting Your Airtable Token

1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Give it a name (e.g., "Santa Cruz App")
4. Add scopes: `data.records:read`
5. Add access to your base
6. Click "Create token"
7. Copy the full token and add it to your `.env.local` file

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project" and import your repository

4. Add environment variables:
   - `AIRTABLE_TOKEN` - Your Airtable personal access token
   - `AIRTABLE_BASE_ID` - Your Airtable base ID
   - `AIRTABLE_RAINY_TABLE` - `RainyActivities`

5. Click "Deploy"

### Manual Deploy

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your environment variables when asked.

## Project Structure

```
boredinsantacruz/
├── src/
│   ├── app/
│   │   ├── actions/          # Server actions
│   │   ├── rainy/           # Rainy day activities page
│   │   ├── layout.tsx       # Root layout with header/footer
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── layout/          # Header and Footer
│   │   ├── ui/              # Reusable UI components
│   │   ├── activity-card.tsx
│   │   ├── activity-filters.tsx
│   │   └── filtered-activities.tsx
│   ├── lib/
│   │   └── airtable.ts      # Airtable connection
│   └── types/
│       └── index.ts         # TypeScript types
├── public/                  # Static files
└── tailwind.config.ts       # Tailwind configuration
```

## Features Roadmap

- [x] Rainy day activities with filtering
- [x] SEO optimization
- [x] Mobile responsive design
- [ ] Sunny day activities
- [ ] Santa Cruz Tonight (live events)
- [ ] The Secret Map (hidden gems)
- [ ] AI Concierge chatbot
- [ ] User submissions
- [ ] Newsletter integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

Have suggestions or want to add your venue? Email: hello@boredinsantacruz.com

---

Made with ❤️ for Santa Cruz locals and visitors

