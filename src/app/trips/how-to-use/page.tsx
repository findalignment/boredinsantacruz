import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Use Trip Planner',
  description: 'Learn how to plan your perfect Santa Cruz trip',
};

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/trips"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Trips
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Use the Trip Planner
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Plan your perfect Santa Cruz visit in minutes
        </p>

        {/* Quick Start */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">⚡ Quick Start (Under 30 Seconds)</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">1.</span>
              <span>Click "New Trip" → Enter a name</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">2.</span>
              <span>Browse activities or restaurants</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">3.</span>
              <span>Click "Save to Trip" on anything you like</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">4.</span>
              <span>Done! View your trip and drag items to reorder</span>
            </li>
          </ol>
        </div>

        {/* Features */}
        <div className="space-y-12">
          {/* Creating Trips */}
          <section>
            <h2 className="text-2xl font-bold mb-4">📌 Creating a Trip</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Click <strong>"New Trip"</strong> from the trips page or the header. Give your trip a name like:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>"Weekend Getaway"</li>
                <li>"Family Vacation 2025"</li>
                <li>"Romantic Weekend"</li>
                <li>"Solo Adventure"</li>
              </ul>
              <p>
                Optionally add dates and a description. You can always edit these later.
              </p>
            </div>
          </section>

          {/* Saving Items */}
          <section>
            <h2 className="text-2xl font-bold mb-4">💾 Saving to a Trip</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                You can save activities and restaurants to your trips from <strong>anywhere on the site</strong>:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Activity cards on the homepage</li>
                <li>Restaurant directory</li>
                <li>Search results</li>
                <li>Map view</li>
                <li>Detail pages</li>
              </ul>
              <p>
                Just click <strong>"Save to Trip"</strong> and choose an existing trip or create a new one instantly.
              </p>
            </div>
          </section>

          {/* Organizing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🔀 Organizing Your Trip</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Once you've saved items to your trip, you can organize them by day:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Drag and Drop</strong>: Click and drag items to reorder them</li>
                <li><strong>Multi-Day Trips</strong>: Items are automatically grouped by day</li>
                <li><strong>Add Notes</strong>: Click any item to add personal notes</li>
                <li><strong>Remove Items</strong>: Hover over an item and click the X</li>
              </ul>
              <p className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                💡 <strong>Pro tip:</strong> On mobile, tap and hold to drag items. On desktop, click and drag with your mouse.
              </p>
            </div>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🔗 Sharing Your Trip</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Share your trip with friends, family, or travel companions:
              </p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Open your trip</li>
                <li>Click <strong>"Share"</strong> at the top</li>
                <li>Copy the link and send it to anyone</li>
              </ol>
              <p>
                <strong>Public vs. Private:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-2 mt-2">
                <li><strong>Private</strong> (default): Only people with the share link can view</li>
                <li><strong>Public</strong>: Anyone can discover your trip (coming soon: browse public trips)</li>
              </ul>
              <p className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                🔒 <strong>Note:</strong> Shared links are view-only. Others can't edit your trip unless you add them as collaborators.
              </p>
            </div>
          </section>

          {/* Collaboration */}
          <section>
            <h2 className="text-2xl font-bold mb-4">🤝 Collaborative Planning</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Plan trips together with friends and family:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Add Collaborators</strong>: Share the trip link with edit access (coming soon)</li>
                <li><strong>Real-time Updates</strong>: Changes sync automatically</li>
                <li><strong>Everyone Can Edit</strong>: Add, remove, and reorder items</li>
              </ul>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold mb-4">💡 Pro Tips</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span>✨</span>
                  <span><strong>Save as you browse:</strong> Don't wait until the end - save interesting spots as you discover them</span>
                </li>
                <li className="flex gap-3">
                  <span>🌦️</span>
                  <span><strong>Check the weather:</strong> Our site shows weather-specific recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span>🗺️</span>
                  <span><strong>Use the map:</strong> See all your trip items on the map to plan routes</span>
                </li>
                <li className="flex gap-3">
                  <span>📝</span>
                  <span><strong>Add notes:</strong> Remember parking details, reservation info, or special tips</span>
                </li>
                <li className="flex gap-3">
                  <span>⏰</span>
                  <span><strong>Check hours:</strong> Restaurants show "Open Now" status in real-time</span>
                </li>
                <li className="flex gap-3">
                  <span>🌊</span>
                  <span><strong>Tide pooling:</strong> Check tide times on activity pages</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gray-900 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Planning?</h3>
          <p className="text-gray-300 mb-6">
            Create your first trip and start exploring Santa Cruz
          </p>
          <Link
            href="/trips/new"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Create Your First Trip
          </Link>
        </div>
      </div>
    </div>
  );
}

