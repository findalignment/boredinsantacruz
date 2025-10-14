import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Bored in Santa Cruz - Rules and guidelines for using our website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-blue max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Bored in Santa Cruz ("Site," "we," "our," or "us"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Bored in Santa Cruz provides a platform for discovering activities, restaurants, and experiences in Santa Cruz, California. Our services include activity recommendations, reviews, weather-based suggestions, an AI chatbot, and user accounts for saving favorites and writing reviews.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Account Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Account Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violations of these Terms, fraudulent activity, or any other reason we deem necessary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content and Conduct</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 Your Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of content you submit (reviews, comments, etc.). By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content on our Site.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Prohibited Conduct</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Post false, misleading, or fraudulent content</li>
                <li>Post offensive, defamatory, or harassing content</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post spam or unsolicited advertisements</li>
                <li>Attempt to hack, scrape, or exploit our Site</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Post content containing viruses or malicious code</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Content Moderation</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to remove any content that violates these Terms or that we find objectionable. We are not obligated to monitor all content but may do so at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Reviews and Ratings</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When writing reviews:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Base your review on your own genuine experience</li>
                <li>Be honest, fair, and constructive</li>
                <li>Do not post reviews in exchange for compensation unless disclosed</li>
                <li>Do not post fake or misleading reviews</li>
                <li>You may only post one review per business/activity</li>
                <li>Businesses may not review their own establishment or competitors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 Our Content</h3>
              <p className="text-gray-700 leading-relaxed">
                All content on our Site, including text, graphics, logos, images, software, and design, is the property of Bored in Santa Cruz or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Limited License</h3>
              <p className="text-gray-700 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use our Site for personal, non-commercial purposes. You may not copy, modify, distribute, sell, or exploit any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links and Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Site may contain links to third-party websites, businesses, or services. We are not responsible for the content, products, services, or practices of third parties. Your interactions with third parties are solely between you and them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Affiliate Relationships</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Affiliate Disclosure:</strong> We may earn commissions when you book through our affiliate partner links (Viator, Booking.com, GetYourGuide, etc.) at no additional cost to you. These partnerships help us keep the Site free and up-to-date. Our recommendations are based on quality and relevance, not solely on commission potential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Advertising and Partnerships</h2>
              <p className="text-gray-700 leading-relaxed">
                Some businesses featured on our Site may have paid partnership arrangements. Featured partners are clearly marked with badges such as "Featured Partner," "Silver Partner," or "Gold Sponsor." Paid placements do not influence our recommendation algorithms or review ratings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                OUR SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Accuracy, completeness, or reliability of content</li>
                <li>Availability or uninterrupted access to the Site</li>
                <li>Quality, safety, or legality of businesses listed</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We do not guarantee the accuracy of business hours, prices, availability, or other information. Always verify details directly with businesses before visiting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BORED IN SANTA CRUZ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Bored in Santa Cruz, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Your use of the Site</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content you post on the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Weather and Recommendation Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Weather forecasts and activity recommendations are provided for informational purposes only. Weather conditions can change rapidly and unexpectedly. Always check current conditions and forecasts before engaging in outdoor activities. We are not responsible for weather-related injuries, damages, or disappointments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Site after changes constitute acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising out of or related to these Terms or your use of the Site shall be resolved through binding arbitration in Santa Cruz County, California, except that either party may seek injunctive relief in court for intellectual property violations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                <p className="text-gray-900 font-semibold mb-2">Bored in Santa Cruz</p>
                <p className="text-gray-700">Email: <a href="mailto:legal@boredinsantacruz.com" className="text-blue-600 hover:text-blue-700 underline">legal@boredinsantacruz.com</a></p>
                <p className="text-gray-700">Address: Santa Cruz, California</p>
              </div>
            </section>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
              <p className="text-gray-900 font-semibold mb-2">Important Notice:</p>
              <p className="text-gray-700">
                By using Bored in Santa Cruz, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <p className="text-center text-gray-600">
              <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">← Back to Home</a>
              {' | '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

