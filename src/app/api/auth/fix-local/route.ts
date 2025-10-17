import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Authentication fix for local development',
    instructions: [
      '1. Add NEXTAUTH_URL=http://localhost:3001 to your .env.local file',
      '2. Restart your development server (npm run dev)',
      '3. Test authentication at http://localhost:3001/login',
      '4. For production, use NEXTAUTH_URL=https://boredinsantacruz.com'
    ],
    currentIssue: 'NEXTAUTH_URL is set to production domain but you are testing locally',
    fix: 'Set NEXTAUTH_URL=http://localhost:3001 in .env.local'
  });
}
