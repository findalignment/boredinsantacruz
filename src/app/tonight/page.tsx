import Link from 'next/link';
import type { Metadata } from 'next';
import { getCurrentWeatherAction } from '@/app/actions/getWeather';
import { getMoonPhaseData, formatTime } from '@/lib/moon-phase';

export const metadata: Metadata = {
  title: 'Santa Cruz Tonight - Events & Happenings',
  description: 'Discover what\'s happening in Santa Cruz tonight. Live music, movies, events, and more.',
};

// Placeholder events data - will be dynamic later
const getCurrentEvents = () => {
  // Get current date in Pacific Time (Santa Cruz, CA)
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const dayOfWeek = pacificTime.getDay();

  // Weekly recurring events
  const recurringEvents = [
    {
      id: '1',
      title: 'Farmers Market',
      venue: 'Downtown Pacific Avenue',
      time: '1:00 PM - 6:00 PM',
      category: 'market',
      days: [3], // Wednesday
      description: 'Weekly farmers market with local produce, food vendors, and live music.',
      price: 'Free',
    },
    {
      id: '2',
      title: 'Trivia Night',
      venue: 'Lúpulo Craft Beer House',
      time: '7:00 PM',
      category: 'other',
      days: [4], // Thursday
      description: 'Weekly trivia night with prizes. Teams welcome!',
      price: 'Free',
    },
    {
      id: '3',
      title: 'First Friday Art Walk',
      venue: 'Downtown Santa Cruz',
      time: '5:00 PM - 9:00 PM',
      category: 'art',
      days: [5], // First Friday
      description: 'Monthly art walk featuring local galleries, artists, and street performers.',
      price: 'Free',
    },
    {
      id: '4',
      title: 'Sunday Farmers Market',
      venue: 'Aptos Village',
      time: '10:00 AM - 2:00 PM',
      category: 'market',
      days: [0], // Sunday
      description: 'Aptos farmers market with local vendors and live music.',
      price: 'Free',
    },
  ];

  // Filter by today
  const todayEvents = recurringEvents.filter(event => event.days.includes(dayOfWeek));

  return todayEvents;
};

const upcomingVenues = [
  {
    name: 'The Catalyst',
    type: 'Live Music Venue',
    description: 'Check their calendar for upcoming concerts and shows.',
    link: 'https://catalystclub.com',
  },
  {
    name: 'Rio Theatre',
    type: 'Movie Theater',
    description: 'Historic theater showing independent and classic films.',
    link: 'https://www.riotheatre.com',
  },
  {
    name: 'MAH (Museum of Art & History)',
    type: 'Museum',
    description: 'Rotating exhibits and community events.',
    link: 'https://santacruzmah.org',
  },
  {
    name: 'Santa Cruz Beach Boardwalk',
    type: 'Amusement Park',
    description: 'Rides, arcade, and special events.',
    link: 'https://beachboardwalk.com',
  },
];

export default async function TonightPage() {
  const todayEvents = getCurrentEvents();
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Get weather data for sunset/sunrise
  let weatherData = null;
  try {
    const result = await getCurrentWeatherAction();
    if (result.success) {
      weatherData = result.data;
    }
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }

  // Get moon phase
  const moonPhase = getMoonPhaseData(today);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              🎉 Santa Cruz Tonight
            </h1>
            <p className="text-lg text-gray-600">
              {dayName}, {dateStr}
            </p>
          </div>
        </div>

        {/* Sunset/Sunrise & Moon Phase Info */}
        {weatherData && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sunset */}
            {weatherData.sunset && (
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🌅</span>
                  <div>
                    <div className="text-sm opacity-90">Sunset</div>
                    <div className="text-3xl font-bold">{formatTime(weatherData.sunset)}</div>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-2">Perfect time for a beach walk!</p>
              </div>
            )}

            {/* Sunrise */}
            {weatherData.sunrise && (
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🌄</span>
                  <div>
                    <div className="text-sm opacity-90">Sunrise Tomorrow</div>
                    <div className="text-3xl font-bold">{formatTime(weatherData.sunrise + 86400)}</div>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-2">Early start for tomorrow's adventures</p>
              </div>
            )}

            {/* Moon Phase */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{moonPhase.emoji}</span>
                <div>
                  <div className="text-sm opacity-90">Moon Phase</div>
                  <div className="text-2xl font-bold">{moonPhase.phaseName}</div>
                </div>
              </div>
              <p className="text-sm opacity-80 mt-2">{moonPhase.illumination}% illuminated</p>
            </div>
          </div>
        )}

        {/* Today's Events */}
        {todayEvents.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🌃 Happening Today
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-gray-600">{event.venue}</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                        Today
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-lg">🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-lg">💰</span>
                        <span>{event.price}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🎭</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  No Scheduled Events Today
                </h2>
                <p className="text-purple-100 mb-4">
                  Check out our regular venues below for spontaneous fun, or browse activities that are perfect for today's weather!
                </p>
                <Link
                  href="/activities"
                  className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Browse Activities →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* This Week */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📅 This Week's Regular Events
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-purple-600">WED</div>
                  <div className="text-sm text-gray-500">1-6pm</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">Farmers Market</h3>
                  <p className="text-gray-600 text-sm">Downtown Pacific Avenue</p>
                  <p className="text-gray-500 text-sm mt-1">Local produce, food vendors, live music</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-purple-600">THU</div>
                  <div className="text-sm text-gray-500">7pm</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">Trivia Night</h3>
                  <p className="text-gray-600 text-sm">Lúpulo Craft Beer House</p>
                  <p className="text-gray-500 text-sm mt-1">Weekly trivia with prizes</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-purple-600">FRI</div>
                  <div className="text-sm text-gray-500">5-9pm</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">First Friday Art Walk</h3>
                  <p className="text-gray-600 text-sm">Downtown Santa Cruz</p>
                  <p className="text-gray-500 text-sm mt-1">Monthly art walk (first Friday of month)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold text-purple-600">SUN</div>
                  <div className="text-sm text-gray-500">10-2pm</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">Sunday Farmers Market</h3>
                  <p className="text-gray-600 text-sm">Aptos Village</p>
                  <p className="text-gray-500 text-sm mt-1">Local vendors and live music</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Calendars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🎪 Check These Venues
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingVenues.map((venue, index) => (
              <a
                key={index}
                href={venue.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {venue.name}
                </h3>
                <p className="text-sm text-purple-600 font-semibold mb-2">
                  {venue.type}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {venue.description}
                </p>
                <div className="text-blue-600 text-sm font-medium">
                  View Calendar →
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🚀</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Full Event Calendar Coming Soon!
              </h2>
              <p className="text-orange-100 mb-4">
                We're building a comprehensive events calendar with:
              </p>
              <ul className="space-y-2 text-orange-50 mb-6">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Live music shows at The Catalyst, Moe's Alley, and more</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Movie showtimes at Rio and Del Mar</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Festivals, markets, and community events</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Sports games, tournaments, and competitions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>"Add to calendar" buttons and reminders</span>
                </li>
              </ul>
              <p className="text-sm text-orange-200">
                For now, check venue websites directly for the latest schedules!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

