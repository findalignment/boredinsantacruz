// Restaurant hours parsing and checking

interface ParsedHours {
  [day: string]: { open: string; close: string }[];
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Check if a restaurant is currently open based on hours string
 * Example format: "Mon-Fri: 11am-9pm, Sat-Sun: 10am-10pm"
 */
export function isRestaurantOpen(hoursString: string | undefined): boolean {
  if (!hoursString) return false;
  
  // Get current time in Pacific Time (Santa Cruz, CA)
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const currentDay = DAYS[pacificTime.getDay()];
  const currentTime = pacificTime.getHours() * 60 + pacificTime.getMinutes(); // minutes since midnight
  
  try {
    const hours = parseHours(hoursString);
    const todayHours = hours[currentDay];
    
    if (!todayHours || todayHours.length === 0) return false;
    
    // Check if current time falls within any of today's hours
    for (const period of todayHours) {
      const openTime = parseTimeToMinutes(period.open);
      const closeTime = parseTimeToMinutes(period.close);
      
      if (currentTime >= openTime && currentTime <= closeTime) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error parsing hours:', error);
    return false;
  }
}

/**
 * Parse hours string into structured format
 */
function parseHours(hoursString: string): ParsedHours {
  const hours: ParsedHours = {};
  
  // Initialize all days as closed
  DAYS.forEach(day => {
    hours[day] = [];
  });
  
  // Handle common formats
  // "Mon-Fri: 11am-9pm, Sat-Sun: 10am-10pm"
  // "Daily: 8am-8pm"
  // "Monday-Friday: 11:00 AM - 9:00 PM"
  
  const sections = hoursString.split(',').map(s => s.trim());
  
  for (const section of sections) {
    const match = section.match(/([A-Za-z-]+):\s*(.+)/);
    if (!match) continue;
    
    const [, dayRange, timeRange] = match;
    const days = parseDayRange(dayRange);
    const times = parseTimeRange(timeRange);
    
    if (times) {
      days.forEach(day => {
        hours[day].push(times);
      });
    }
  }
  
  return hours;
}

/**
 * Parse day range like "Mon-Fri" or "Daily"
 */
function parseDayRange(dayRange: string): string[] {
  const normalized = dayRange.toLowerCase().trim();
  
  if (normalized === 'daily' || normalized === 'every day' || normalized === 'everyday') {
    return [...DAYS];
  }
  
  const dayMap: { [key: string]: string } = {
    'mon': 'Monday', 'monday': 'Monday',
    'tue': 'Tuesday', 'tuesday': 'Tuesday', 'tues': 'Tuesday',
    'wed': 'Wednesday', 'wednesday': 'Wednesday',
    'thu': 'Thursday', 'thursday': 'Thursday', 'thurs': 'Thursday',
    'fri': 'Friday', 'friday': 'Friday',
    'sat': 'Saturday', 'saturday': 'Saturday',
    'sun': 'Sunday', 'sunday': 'Sunday',
  };
  
  // Check for range like "Mon-Fri"
  const rangeMatch = normalized.match(/([a-z]+)-([a-z]+)/);
  if (rangeMatch) {
    const [, start, end] = rangeMatch;
    const startDay = dayMap[start];
    const endDay = dayMap[end];
    
    if (startDay && endDay) {
      const startIdx = DAYS.indexOf(startDay);
      const endIdx = DAYS.indexOf(endDay);
      
      if (startIdx <= endIdx) {
        return DAYS.slice(startIdx, endIdx + 1);
      }
    }
  }
  
  // Single day
  const singleDay = dayMap[normalized];
  if (singleDay) {
    return [singleDay];
  }
  
  return [];
}

/**
 * Parse time range like "11am-9pm" or "11:00 AM - 9:00 PM"
 */
function parseTimeRange(timeRange: string): { open: string; close: string } | null {
  const match = timeRange.match(/(\d{1,2}:\d{2}\s*[AP]M|\d{1,2}[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M|\d{1,2}[AP]M)/i);
  
  if (!match) return null;
  
  return {
    open: match[1].trim(),
    close: match[2].trim(),
  };
}

/**
 * Convert time string to minutes since midnight
 */
function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*([AP]M)/i);
  
  if (!match) return 0;
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

/**
 * Get a human-readable status for restaurant hours
 */
export function getRestaurantStatus(hoursString: string | undefined): {
  isOpen: boolean;
  message: string;
} {
  if (!hoursString) {
    return {
      isOpen: false,
      message: 'Hours not available',
    };
  }
  
  const isOpen = isRestaurantOpen(hoursString);
  
  if (isOpen) {
    return {
      isOpen: true,
      message: '🟢 Open Now',
    };
  }
  
  return {
    isOpen: false,
    message: '🔴 Closed',
  };
}

