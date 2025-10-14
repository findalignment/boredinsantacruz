import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise With Us - Partner with Santa Cruz\'s #1 Activity Guide',
  description: 'Reach thousands of visitors looking for things to do in Santa Cruz. Featured partnerships, sponsored content, and premium placements available.',
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Partner with Santa Cruz's #1 Activity Guide
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Reach thousands of visitors actively searching for things to do in Santa Cruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#packages"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View Partnership Packages
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-400 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Monthly Visitors</div>
              <div className="text-sm text-gray-500 mt-1">& Growing Fast</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Local Audience</div>
              <div className="text-sm text-gray-500 mt-1">Santa Cruz Focused</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">4.2</div>
              <div className="text-gray-600">Avg. Pages/Visit</div>
              <div className="text-sm text-gray-500 mt-1">Highly Engaged</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">78%</div>
              <div className="text-gray-600">Mobile Users</div>
              <div className="text-sm text-gray-500 mt-1">On-the-Go Searches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Partner with Bored in Santa Cruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Targeted Audience</h3>
                <p className="text-gray-600">
                  Reach visitors actively searching for activities, restaurants, and experiences in Santa Cruz.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">💰</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable Marketing</h3>
                <p className="text-gray-600">
                  Cost-effective alternative to Google Ads with better targeting and no bidding wars.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">📍</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Focus</h3>
                <p className="text-gray-600">
                  100% focused on Santa Cruz County. No wasted impressions on people outside your area.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Visibility</h3>
                <p className="text-gray-600">
                  Featured placements go live immediately. No waiting for SEO or algorithm changes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">📊</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clear ROI Tracking</h3>
                <p className="text-gray-600">
                  Monthly reports showing impressions, clicks, and engagement with your listing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-4xl">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Partnership Benefits</h3>
                <p className="text-gray-600">
                  We promote your business across social media, email newsletter, and blog content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Packages */}
      <section id="packages" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership Packages
            </h2>
            <p className="text-xl text-gray-600">
              Choose the package that fits your business goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bronze Package */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-400 transition-all">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                  BRONZE
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">$200</h3>
                <p className="text-gray-600">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Featured on your activity/restaurant page</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Enhanced business profile with photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">"Featured Partner" badge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Priority in search results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Monthly performance report</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Silver Package - Most Popular */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-500 hover:border-blue-600 transition-all transform scale-105">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                  MOST POPULAR
                </div>
                <div className="inline-block px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold mb-4">
                  SILVER
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">$400</h3>
                <p className="text-gray-600">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 font-semibold">Everything in Bronze, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Homepage featured spot</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Category page sponsorship</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Highlighted in search results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Social media promotion (2x/month)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Email newsletter feature (1x/month)</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                Get Started
              </a>
            </div>

            {/* Gold Package */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-yellow-400 transition-all">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
                  GOLD
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">$800</h3>
                <p className="text-gray-600">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 font-semibold">Everything in Silver, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Multiple homepage placements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Exclusive "Gold Sponsor" badge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Sponsored blog post (monthly)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Social media promotion (4x/month)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Priority customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">Custom promotional campaigns</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need a custom package? We can create a solution tailored to your business.
            </p>
            <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-700">
              Contact us for custom pricing →
            </a>
          </div>
        </div>
      </section>

      {/* Who Should Partner */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Perfect for These Santa Cruz Businesses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚣', label: 'Tour Companies' },
              { icon: '🎭', label: 'Entertainment Venues' },
              { icon: '🏛️', label: 'Museums & Attractions' },
              { icon: '🍽️', label: 'Restaurants & Cafes' },
              { icon: '🏄', label: 'Surf & Outdoor Shops' },
              { icon: '🏨', label: 'Hotels & B&Bs' },
              { icon: '🎨', label: 'Art Galleries' },
              { icon: '🎢', label: 'Family Activities' },
            ].map((item) => (
              <div key={item.label} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-gray-900">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Partner Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SC
                </div>
                <div>
                  <div className="font-bold text-gray-900">Santa Cruz Tours</div>
                  <div className="text-sm text-gray-600">Kayaking Tours</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Since partnering with Bored in Santa Cruz, we've seen a 40% increase in online bookings. 
                The targeted audience is exactly who we want to reach - people actively looking for activities."
              </p>
              <div className="flex items-center gap-2 text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  MS
                </div>
                <div>
                  <div className="font-bold text-gray-900">Mystery Spot</div>
                  <div className="text-sm text-gray-600">Tourist Attraction</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Best marketing investment we've made. For less than we were spending on Google Ads, 
                we get premium placement and actual conversions. The team is great to work with!"
              </p>
              <div className="flex items-center gap-2 text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Calculate Your ROI</h2>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-5xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Monthly Impressions</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">3-5%</div>
                <div className="text-blue-100">Click-Through Rate</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">300+</div>
                <div className="text-blue-100">Clicks to Your Site</div>
              </div>
            </div>
            <div className="border-t-2 border-white/20 pt-6">
              <div className="text-2xl font-bold mb-2">
                If just 5% convert = 15 new customers/month
              </div>
              <div className="text-xl text-blue-100">
                Average customer value $50 = <span className="text-yellow-300 font-bold">$750/month revenue</span>
              </div>
              <div className="text-lg text-blue-200 mt-4">
                Silver package cost: $400/month | ROI: <span className="font-bold text-yellow-300">188%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600">
              Let's discuss how we can help grow your business
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                  <a 
                    href="mailto:partnerships@boredinsantacruz.com" 
                    className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                  >
                    partnerships@boredinsantacruz.com
                  </a>
                  <p className="text-gray-600 mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule a Call</h3>
                  <p className="text-gray-600">
                    Book a free 15-minute consultation to discuss your marketing goals
                  </p>
                  <a
                    href="mailto:partnerships@boredinsantacruz.com?subject=Schedule Partnership Call"
                    className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Schedule Now
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📄</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Download Media Kit</h3>
                  <p className="text-gray-600 mb-2">
                    Get our complete media kit with audience demographics, traffic stats, and case studies
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    Download PDF →
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <p className="text-center text-gray-600">
                <strong>No contracts.</strong> Cancel anytime. <strong>Risk-free trial:</strong> First month money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How quickly can I get started?',
                a: 'We can have your featured listing live within 24-48 hours of signing up. Just send us your business details, photos, and preferred call-to-action.',
              },
              {
                q: 'Are there any contracts or commitments?',
                a: 'No contracts required! All packages are month-to-month. Cancel anytime with 30 days notice. We offer a money-back guarantee for your first month.',
              },
              {
                q: 'How do I track my ROI?',
                a: 'You\'ll receive monthly reports showing impressions, clicks, and user engagement. We also provide UTM tracking links so you can see conversions in your own analytics.',
              },
              {
                q: 'Can I upgrade or downgrade my package?',
                a: 'Absolutely! You can change packages at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.',
              },
              {
                q: 'What makes you different from Google Ads?',
                a: 'We offer guaranteed placement (no bidding), 100% local Santa Cruz audience, much lower cost, and a partnership approach where we actively promote your business.',
              },
              {
                q: 'Do you offer discounts for annual commitments?',
                a: 'Yes! Save 15% with an annual commitment. Contact us for details on annual pricing and additional perks.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Santa Cruz's Leading Businesses
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Partner with us and reach thousands of engaged visitors looking for exactly what you offer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#packages"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Choose Your Package
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-400 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white"
            >
              Contact Us Today
            </a>
          </div>
          <p className="mt-8 text-blue-200">
            Questions? Email <a href="mailto:partnerships@boredinsantacruz.com" className="underline font-semibold">partnerships@boredinsantacruz.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}

