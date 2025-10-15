import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Event Submitted Successfully | Santa Cruz Events',
  description: 'Your event has been submitted for review. We\'ll notify you within 24 hours.',
};

export default function SubmitSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <span className="text-5xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Event Submitted Successfully!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for sharing your event with the Santa Cruz community.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📬</span>
              What Happens Next?
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Review:</strong> Our team will review your event submission within 24 hours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Notification:</strong> You'll receive an email confirmation when your event is approved
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Live:</strong> Your event will appear on our calendar and be discoverable by thousands of Santa Cruz locals and visitors
                </span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Browse All Events
            </Link>
            <Link
              href="/events/submit"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Submit Another Event
            </Link>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Help spread the word about Santa Cruz events!
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://facebook.com/sharer/sharer.php?u=https://boredinsantacruz.com/events"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share on Facebook
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20Santa%20Cruz%20events%20on%20Bored%20in%20Santa%20Cruz&url=https://boredinsantacruz.com/events"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Share on Twitter
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Questions? Need to edit your submission?{' '}
              <a href="mailto:events@boredinsantacruz.com" className="text-blue-600 hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

