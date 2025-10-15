import { Metadata } from 'next';
import Link from 'next/link';
import { getRestaurants } from '@/app/actions/getRestaurants';
import { RestaurantWeekClient } from './page-client';

export const metadata: Metadata = {
  title: 'Santa Cruz Restaurant Week 2025 | October 22-29',
  description: 'Santa Cruz Restaurant Week returns for its 17th year! 8 days of special menus celebrating culinary excellence across Santa Cruz County. October 22-29, 2025.',
  keywords: ['Santa Cruz Restaurant Week', 'dining event', 'special menus', 'Santa Cruz restaurants', 'October 2025'],
  openGraph: {
    title: 'Santa Cruz Restaurant Week 2025',
    description: '8 days of special menus celebrating Santa Cruz County\'s finest restaurants',
    type: 'website',
  },
};

export default async function RestaurantWeekPage() {
  const result = await getRestaurants();
  const allRestaurants = result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🍽️</span>
            <span className="font-semibold">October 22-29, 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Santa Cruz Restaurant Week
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            8 days of special menus celebrating culinary excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#participating"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-lg hover:scale-105"
            >
              View Participating Restaurants →
            </a>
            <a
              href="https://santacruzrestaurantweek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-orange-800 text-white font-bold rounded-lg hover:bg-orange-900 transition-all"
            >
              Official Website ↗
            </a>
          </div>
        </div>
      </section>

      {/* Event Info Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">When</h3>
              <p className="text-gray-600">October 22-29, 2025</p>
              <p className="text-sm text-gray-500 mt-1">8 days of special menus</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">🍴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">What</h3>
              <p className="text-gray-600">Special prix fixe menus</p>
              <p className="text-sm text-gray-500 mt-1">Curated by local chefs</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Where</h3>
              <p className="text-gray-600">Throughout Santa Cruz County</p>
              <p className="text-sm text-gray-500 mt-1">Santa Cruz, Capitola, Aptos & more</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 About Restaurant Week
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Santa Cruz Restaurant Week returns for its <strong>17th year</strong>, celebrating 
              the county's finest culinary talent. For 8 days, participating restaurants offer 
              special prix fixe menus showcasing their best dishes at great values.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              This is your chance to try new restaurants, revisit favorites, and experience 
              creative menus crafted by Santa Cruz County's talented chefs.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-gray-800">
                <strong>💡 Pro Tip:</strong> Restaurant Week is extremely popular! 
                Make reservations early at your favorite spots to secure your table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participating Restaurants */}
      <section id="participating" className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Participating Restaurants
            </h2>
            <p className="text-lg text-gray-600">
              Click on any restaurant to view their full details, menu, and hours
            </p>
          </div>

          {/* Client-side filtering component */}
          <RestaurantWeekClient initialRestaurants={allRestaurants} />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Restaurant Week?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Make your reservations now and prepare for an unforgettable culinary journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurants"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all shadow-lg hover:scale-105"
            >
              Browse All Restaurants
            </Link>
            <Link
              href="/deals"
              className="inline-block px-8 py-4 bg-orange-800 text-white font-bold rounded-lg hover:bg-orange-900 transition-all border-2 border-white"
            >
              View More Deals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
