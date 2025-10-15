import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Cruz Food & Drink Guide | Best Restaurants, Cafes & Bars 2025',
  description: 'Complete guide to Santa Cruz food scene. From farm-to-table dining to taco trucks, craft beer to coffee shops.',
  keywords: 'santa cruz food, restaurants, bars, cafes, breweries, food guide, where to eat',
};

export default function FoodAndDrinkGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">🍽️ Santa Cruz Food & Drink Guide</h1>
        <p className="text-xl text-center text-gray-600 mb-12">From ocean-fresh seafood to farm-to-table cuisine</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { cat: "Fine Dining", spots: "Oswald, Shadowbrook, Gabriella Cafe" },
            { cat: "Seafood", spots: "Crow's Nest, Aldo's, Stagnaro's" },
            { cat: "Mexican/Tacos", spots: "Taqueria Vallarta, El Palomar" },
            { cat: "Pizza", spots: "Engfer, Woodstock's, Pleasure Pizza" },
            { cat: "Asian", spots: "Akira, Betty's Noodles, Pearl of Ocean" },
            { cat: "Breakfast", spots: "Zachary's, Walnut Ave, Linda's" },
            { cat: "Coffee", spots: "Verve, Cat & Cloud, Lúlu Carpenter's" },
            { cat: "Breweries", spots: "SC Mountain, Discretion, Seabright" },
            { cat: "Wine Bars", spots: "Soif, Bargetto, Venus Spirits" },
            { cat: "Ice Cream", spots: "Penny, Marianne's, The Penny" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <h3 className="text-xl font-bold mb-2">{item.cat}</h3>
              <p className="text-gray-600">{item.spots}</p>
            </div>
          ))}
        </div>

        <div className="bg-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Restaurants</h2>
          <Link href="/restaurants" className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg">
            View All Restaurants
          </Link>
        </div>
      </div>
    </main>
  );
}
