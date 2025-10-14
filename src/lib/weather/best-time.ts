/**
 * Best Time to Visit Calculator
 * Analyzes historical weather patterns to recommend the best months to visit Santa Cruz
 */

export interface MonthData {
  month: string;
  monthNumber: number;
  avgHighTemp: number;
  avgLowTemp: number;
  avgRainDays: number;
  avgSunnyDays: number;
  crowdLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  conditions: string[];
  highlights: string[];
  score: number; // 0-100
}

export interface VisitorType {
  id: string;
  name: string;
  description: string;
  emoji: string;
  priorities: {
    warmWeather: number; // 0-1
    dryWeather: number;
    lessCrowded: number;
    affordability: number;
  };
}

// Historical Santa Cruz weather data (averaged over many years)
export const MONTHLY_DATA: MonthData[] = [
  {
    month: 'January',
    monthNumber: 1,
    avgHighTemp: 61,
    avgLowTemp: 42,
    avgRainDays: 11,
    avgSunnyDays: 15,
    crowdLevel: 'Low',
    conditions: ['Cool', 'Rainy', 'Peaceful'],
    highlights: ['Whale watching', 'Storm watching', 'Cozy cafes'],
    score: 65,
  },
  {
    month: 'February',
    monthNumber: 2,
    avgHighTemp: 62,
    avgLowTemp: 43,
    avgRainDays: 10,
    avgSunnyDays: 14,
    crowdLevel: 'Low',
    conditions: ['Cool', 'Rainy', 'Quiet'],
    highlights: ['Whale watching', 'Monarch butterflies', 'Local events'],
    score: 68,
  },
  {
    month: 'March',
    monthNumber: 3,
    avgHighTemp: 63,
    avgLowTemp: 45,
    avgRainDays: 9,
    avgSunnyDays: 18,
    crowdLevel: 'Medium',
    conditions: ['Mild', 'Blooming', 'Pleasant'],
    highlights: ['Wildflowers', 'Hiking', 'Spring weather'],
    score: 75,
  },
  {
    month: 'April',
    monthNumber: 4,
    avgHighTemp: 65,
    avgLowTemp: 46,
    avgRainDays: 5,
    avgSunnyDays: 22,
    crowdLevel: 'Medium',
    conditions: ['Warm', 'Sunny', 'Beautiful'],
    highlights: ['Beach walks', 'Hiking', 'Perfect weather'],
    score: 85,
  },
  {
    month: 'May',
    monthNumber: 5,
    avgHighTemp: 67,
    avgLowTemp: 49,
    avgRainDays: 3,
    avgSunnyDays: 25,
    crowdLevel: 'Medium',
    conditions: ['Warm', 'Sunny', 'Ideal'],
    highlights: ['Beach days', 'Outdoor dining', 'Events'],
    score: 90,
  },
  {
    month: 'June',
    monthNumber: 6,
    avgHighTemp: 70,
    avgLowTemp: 52,
    avgRainDays: 1,
    avgSunnyDays: 27,
    crowdLevel: 'High',
    conditions: ['Warm', 'Sunny', 'Foggy mornings'],
    highlights: ['Beach season', 'Surfing', 'Farmers markets'],
    score: 88,
  },
  {
    month: 'July',
    monthNumber: 7,
    avgHighTemp: 71,
    avgLowTemp: 54,
    avgRainDays: 0,
    avgSunnyDays: 29,
    crowdLevel: 'Very High',
    conditions: ['Warm', 'Sunny', 'Busy'],
    highlights: ['Boardwalk', 'Beach life', 'Summer events'],
    score: 82,
  },
  {
    month: 'August',
    monthNumber: 8,
    avgHighTemp: 72,
    avgLowTemp: 55,
    avgRainDays: 0,
    avgSunnyDays: 29,
    crowdLevel: 'Very High',
    conditions: ['Warmest', 'Sunny', 'Crowded'],
    highlights: ['Peak beach season', 'Water sports', 'Festivals'],
    score: 80,
  },
  {
    month: 'September',
    monthNumber: 9,
    avgHighTemp: 73,
    avgLowTemp: 54,
    avgRainDays: 1,
    avgSunnyDays: 26,
    crowdLevel: 'High',
    conditions: ['Warm', 'Sunny', 'Perfect'],
    highlights: ['Best weather', 'Fewer crowds', 'Beach time'],
    score: 95,
  },
  {
    month: 'October',
    monthNumber: 10,
    avgHighTemp: 70,
    avgLowTemp: 51,
    avgRainDays: 3,
    avgSunnyDays: 24,
    crowdLevel: 'Medium',
    conditions: ['Warm', 'Sunny', 'Beautiful'],
    highlights: ['Fall colors', 'Wine tasting', 'Perfect temps'],
    score: 92,
  },
  {
    month: 'November',
    monthNumber: 11,
    avgHighTemp: 65,
    avgLowTemp: 47,
    avgRainDays: 7,
    avgSunnyDays: 18,
    crowdLevel: 'Low',
    conditions: ['Mild', 'Rainy', 'Peaceful'],
    highlights: ['Storm watching', 'Cozy vibes', 'Local culture'],
    score: 72,
  },
  {
    month: 'December',
    monthNumber: 12,
    avgHighTemp: 62,
    avgLowTemp: 43,
    avgRainDays: 10,
    avgSunnyDays: 16,
    crowdLevel: 'Low',
    conditions: ['Cool', 'Rainy', 'Festive'],
    highlights: ['Holiday lights', 'Indoor activities', 'Quiet beaches'],
    score: 68,
  },
];

// Visitor types with different priorities
export const VISITOR_TYPES: VisitorType[] = [
  {
    id: 'beach-lover',
    name: 'Beach Lover',
    description: 'Wants warm, sunny beach days',
    emoji: '🏖️',
    priorities: {
      warmWeather: 1.0,
      dryWeather: 0.9,
      lessCrowded: 0.3,
      affordability: 0.5,
    },
  },
  {
    id: 'budget-traveler',
    name: 'Budget Traveler',
    description: 'Looking for affordable off-season travel',
    emoji: '💰',
    priorities: {
      warmWeather: 0.5,
      dryWeather: 0.6,
      lessCrowded: 0.9,
      affordability: 1.0,
    },
  },
  {
    id: 'local-explorer',
    name: 'Local Explorer',
    description: 'Wants authentic experiences, fewer tourists',
    emoji: '🎒',
    priorities: {
      warmWeather: 0.6,
      dryWeather: 0.7,
      lessCrowded: 1.0,
      affordability: 0.8,
    },
  },
  {
    id: 'outdoor-enthusiast',
    name: 'Outdoor Enthusiast',
    description: 'Hiking, biking, and outdoor activities',
    emoji: '🥾',
    priorities: {
      warmWeather: 0.8,
      dryWeather: 0.9,
      lessCrowded: 0.6,
      affordability: 0.5,
    },
  },
  {
    id: 'family-vacation',
    name: 'Family Vacation',
    description: 'Great weather, kid-friendly activities',
    emoji: '👨‍👩‍👧‍👦',
    priorities: {
      warmWeather: 0.9,
      dryWeather: 0.8,
      lessCrowded: 0.4,
      affordability: 0.7,
    },
  },
];

/**
 * Calculate a score for a month based on visitor priorities
 */
export function scoreMonthForVisitor(month: MonthData, visitor: VisitorType): number {
  const { priorities } = visitor;

  // Normalize values to 0-1 scale
  const warmScore = month.avgHighTemp / 75; // 75°F is ideal
  const dryScore = 1 - month.avgRainDays / 12; // Fewer rain days = better
  const crowdScore = {
    Low: 1.0,
    Medium: 0.7,
    High: 0.4,
    'Very High': 0.2,
  }[month.crowdLevel];
  const affordabilityScore = crowdScore; // Off-season = cheaper

  // Weighted score
  const score =
    warmScore * priorities.warmWeather +
    dryScore * priorities.dryWeather +
    crowdScore * priorities.lessCrowded +
    affordabilityScore * priorities.affordability;

  // Normalize to 0-100
  return Math.round((score / 4) * 100);
}

/**
 * Get top recommended months for a visitor type
 */
export function getTopMonthsForVisitor(visitor: VisitorType, topN: number = 3): MonthData[] {
  const scored = MONTHLY_DATA.map((month) => ({
    ...month,
    visitorScore: scoreMonthForVisitor(month, visitor),
  }));

  return scored.sort((a, b) => b.visitorScore - a.visitorScore).slice(0, topN);
}

/**
 * Get the overall best months to visit (general recommendation)
 */
export function getBestMonths(topN: number = 3): MonthData[] {
  return MONTHLY_DATA.sort((a, b) => b.score - a.score).slice(0, topN);
}

/**
 * Get current month's data
 */
export function getCurrentMonthData(): MonthData {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  return MONTHLY_DATA.find((m) => m.monthNumber === currentMonth) || MONTHLY_DATA[0];
}

/**
 * Generate insights for a specific month
 */
export function getMonthInsights(monthNumber: number): string[] {
  const month = MONTHLY_DATA.find((m) => m.monthNumber === monthNumber);
  if (!month) return [];

  const insights: string[] = [];

  // Temperature insights
  if (month.avgHighTemp >= 70) {
    insights.push('Perfect beach weather');
  } else if (month.avgHighTemp < 65) {
    insights.push('Pack layers for cooler temps');
  }

  // Rain insights
  if (month.avgRainDays <= 3) {
    insights.push('Mostly dry and sunny');
  } else if (month.avgRainDays >= 8) {
    insights.push('Expect frequent rain - bring a jacket');
  }

  // Crowd insights
  if (month.crowdLevel === 'Low') {
    insights.push('Enjoy a peaceful, uncrowded visit');
  } else if (month.crowdLevel === 'Very High') {
    insights.push('Book accommodations early - peak season');
  }

  // Special insights
  if (monthNumber >= 9 && monthNumber <= 10) {
    insights.push('Best overall weather of the year');
  }
  if (monthNumber === 1 || monthNumber === 2) {
    insights.push('Great time for whale watching');
  }
  if (monthNumber >= 6 && monthNumber <= 8) {
    insights.push('Expect morning fog at the coast');
  }

  return insights;
}

