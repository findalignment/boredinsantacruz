import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint to verify event system configuration
 * Visit: /api/test-events
 */
export async function GET(request: NextRequest) {
  const issues: string[] = [];
  const warnings: string[] = [];
  const success: string[] = [];

  // Check Airtable configuration
  if (!process.env.AIRTABLE_TOKEN) {
    issues.push('❌ AIRTABLE_TOKEN is missing');
  } else {
    success.push('✅ AIRTABLE_TOKEN is set');
  }

  if (!process.env.AIRTABLE_BASE_ID) {
    issues.push('❌ AIRTABLE_BASE_ID is missing');
  } else {
    success.push('✅ AIRTABLE_BASE_ID is set');
  }

  if (!process.env.AIRTABLE_EVENTS_TABLE) {
    warnings.push('⚠️ AIRTABLE_EVENTS_TABLE not set (will default to "Events")');
  } else {
    success.push(`✅ AIRTABLE_EVENTS_TABLE is set: "${process.env.AIRTABLE_EVENTS_TABLE}"`);
  }

  // Check Resend/Email configuration
  if (!process.env.RESEND_API_KEY) {
    issues.push('❌ RESEND_API_KEY is missing');
  } else {
    success.push('✅ RESEND_API_KEY is set');
  }

  if (!process.env.EMAIL_FROM) {
    issues.push('❌ EMAIL_FROM is missing');
  } else {
    success.push(`✅ EMAIL_FROM is set: "${process.env.EMAIL_FROM}"`);
  }

  if (!process.env.ADMIN_EMAIL) {
    warnings.push('⚠️ ADMIN_EMAIL not set (admin notifications will not be sent)');
  } else {
    success.push(`✅ ADMIN_EMAIL is set: "${process.env.ADMIN_EMAIL}"`);
  }

  // Test Airtable connection
  if (process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID) {
    try {
      const eventsTable = process.env.AIRTABLE_EVENTS_TABLE || 'Events';
      const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${eventsTable}?maxRecords=1`;

      const response = await fetch(airtableUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        success.push(`✅ Successfully connected to Airtable table "${eventsTable}"`);
        success.push(`📊 Current records in table: ${data.records?.length || 0} (showing max 1)`);
      } else {
        const errorText = await response.text();
        issues.push(`❌ Airtable connection failed (${response.status}): ${errorText.substring(0, 200)}`);
      }
    } catch (error: any) {
      issues.push(`❌ Airtable connection error: ${error.message}`);
    }
  }

  // Test Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/domains', {
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        success.push(`✅ Successfully connected to Resend API`);
        success.push(`📧 Verified domains: ${data.data?.length || 0}`);
        
        if (data.data && data.data.length > 0) {
          const domains = data.data.map((d: any) => `${d.name} (${d.status})`).join(', ');
          success.push(`   Domains: ${domains}`);
        }
      } else if (response.status === 401) {
        // 401 with "restricted_api_key" message is OK - means it's a send-only key
        const errorData = await response.json().catch(() => ({}));
        if (errorData.name === 'restricted_api_key') {
          success.push(`✅ Resend API key configured (send-only mode)`);
          warnings.push(`⚠️ API key is send-only (can't check domains via API, but email sending works fine)`);
        } else {
          issues.push(`❌ Resend API authentication failed - check your API key`);
        }
      } else {
        const errorText = await response.text();
        issues.push(`❌ Resend API connection failed (${response.status}): ${errorText.substring(0, 200)}`);
      }
    } catch (error: any) {
      issues.push(`❌ Resend API error: ${error.message}`);
    }
  }

  // Determine overall status
  const allGood = issues.length === 0;
  const status = allGood ? 'ready' : 'issues-found';

  return NextResponse.json({
    status,
    message: allGood 
      ? '✅ Event system is fully configured and ready!' 
      : '❌ Some issues need to be resolved',
    success,
    warnings,
    issues,
    nextSteps: allGood 
      ? [
          '1. Try submitting a test event at /events/submit',
          '2. Check your Airtable to see if it appears',
          '3. Check your email for confirmation',
          '4. Visit /admin/events to review submissions'
        ]
      : [
          '1. Fix all ❌ issues listed above',
          '2. Update your .env.local file',
          '3. Restart your development server',
          '4. Refresh this page to test again'
        ],
  }, {
    headers: {
      'Cache-Control': 'no-store',
    }
  });
}

