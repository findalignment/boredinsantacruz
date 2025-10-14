// src/app/api/kv/test/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test write
    await kv.set('test-key', { message: 'Hello from KV!', timestamp: new Date().toISOString() });
    
    // Test read
    const result = await kv.get('test-key');
    
    // Test keys
    const keys = await kv.keys('weather:*');
    
    return NextResponse.json({
      status: 'KV is working!',
      testData: result,
      weatherCacheKeys: keys.slice(0, 10), // Show first 10 weather cache keys
      weatherCacheCount: keys.length,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'KV not available',
      error: error instanceof Error ? error.message : 'Unknown error',
      note: 'This is expected if KV environment variables are not set',
    }, { status: 500 });
  }
}

