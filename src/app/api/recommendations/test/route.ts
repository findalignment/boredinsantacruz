// src/app/api/recommendations/test/route.ts
import { NextResponse } from 'next/server';
import { getTodaysRecommendations, getTopRecommendations } from '@/app/actions/getRecommendations';

/**
 * Test endpoint for recommendations system
 * Access at: /api/recommendations/test
 */
export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    sample: {},
  };

  try {
    // Test 1: Get today's recommendations
    const recommendations = await getTodaysRecommendations();
    
    if (recommendations.success && recommendations.data) {
      results.checks.recommendations = {
        success: true,
        totalActivities: recommendations.data.totalActivities,
        perfectCount: recommendations.data.tiers.perfect.length,
        greatCount: recommendations.data.tiers.great.length,
        goodCount: recommendations.data.tiers.good.length,
        topPicksCount: recommendations.data.topPicks.length,
        insightsCount: recommendations.data.insights.length,
      };

      // Sample weather
      results.sample.weather = {
        temp: recommendations.data.weather.temp,
        condition: recommendations.data.weather.condition,
        description: recommendations.data.weather.description,
        summary: recommendations.data.weatherSummary,
      };

      // Sample top pick
      if (recommendations.data.topPicks.length > 0) {
        const topPick = recommendations.data.topPicks[0];
        results.sample.topActivity = {
          title: topPick.title,
          weatherScore: topPick.weatherScore,
          matchReason: topPick.matchReason,
          weatherWarning: topPick.weatherWarning,
          indoorOutdoor: topPick.indoorOutdoor,
          tags: topPick.tags?.slice(0, 3),
        };
      }

      // Sample insights
      results.sample.insights = recommendations.data.insights;

    } else {
      results.checks.recommendations = {
        success: false,
        error: recommendations.error,
      };
    }

    // Test 2: Get top 5 recommendations
    const topRecs = await getTopRecommendations(5);
    
    if (topRecs.success && topRecs.data) {
      results.checks.topRecommendations = {
        success: true,
        count: topRecs.data.topActivities.length,
      };
    } else {
      results.checks.topRecommendations = {
        success: false,
        error: 'error' in topRecs ? topRecs.error : 'Unknown error',
      };
    }

    // Overall status
    results.status = Object.values(results.checks).every((check: any) => check.success)
      ? 'All systems operational'
      : 'Some checks failed';

    results.healthy = results.status === 'All systems operational';

    // Instructions
    results.instructions = {
      message: 'Recommendations system test endpoint',
      note: 'If you see activities with weatherScore values, the system is working!',
      nextSteps: [
        'Add weather fields to your Airtable (see AIRTABLE_SCHEMA_UPDATE.md)',
        'Fill in at least 5-10 activities with weather data',
        'Refresh this endpoint to see scored recommendations',
      ],
    };

    return NextResponse.json(results, {
      status: results.healthy ? 200 : 500,
    });

  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, {
      status: 500,
    });
  }
}

