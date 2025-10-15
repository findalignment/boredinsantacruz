import { Metadata } from 'next';
import { EventSubmissionForm } from '@/components/events/event-submission-form';

export const metadata: Metadata = {
  title: 'Submit an Event | Santa Cruz Events Calendar',
  description: 'Submit your event to the Santa Cruz community calendar. Share concerts, festivals, workshops, and more with locals and visitors.',
  keywords: ['submit event', 'add event', 'santa cruz events', 'event calendar', 'community calendar'],
};

export default function SubmitEventPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">📅</span>
            <span className="font-semibold">Submit Your Event</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Your Event with Santa Cruz
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Help the community discover local events. We'll review and publish your submission within 24 hours.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            Before You Submit
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Fill out all required fields (marked with *)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Include event details, date, time, and location</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Add an image for better visibility (recommended)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>We'll review your submission and publish it within 24 hours</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <EventSubmissionForm />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does review take?
              </h3>
              <p className="text-gray-600">
                Most events are reviewed and published within 24 hours. You'll receive an email confirmation when your event is approved.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I edit my event after submission?
              </h3>
              <p className="text-gray-600">
                Yes! Contact us with your event details and we'll help you make changes. You can also resubmit an updated version.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a cost to submit?
              </h3>
              <p className="text-gray-600">
                No, event submissions are completely free! We're here to help promote local events and build community.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What types of events can I submit?
              </h3>
              <p className="text-gray-600">
                We welcome all community events: concerts, festivals, workshops, markets, sports events, fundraisers, and more. 
                Events must be located in or near Santa Cruz County.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why was my event not approved?
              </h3>
              <p className="text-gray-600">
                We may not approve events that are: outside Santa Cruz County, spam/promotional only, inappropriate content, 
                or missing essential information. Contact us if you have questions about a specific event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

