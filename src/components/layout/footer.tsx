export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              🌊 Bored in Santa Cruz
            </h3>
            <p className="text-sm">
              Your guide to discovering the best activities, venues, and experiences in Santa Cruz, 
              rain or shine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/rainy" className="hover:text-white transition-colors">
                  Rainy Day Activities
                </a>
              </li>
              <li>
                <a href="/sunny" className="hover:text-white transition-colors">
                  Sunny Day Activities
                </a>
              </li>
              <li>
                <a href="/advertise" className="hover:text-white transition-colors font-semibold text-blue-400">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm mb-4">
              Have suggestions or want to add your venue? Get in touch!
            </p>
            <a
              href="mailto:hello@boredinsantacruz.com"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              hello@boredinsantacruz.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Affiliate Disclosure */}
          <div className="mb-6 text-xs text-gray-400 max-w-4xl mx-auto">
            <p className="mb-2">
              <strong className="text-gray-300">Affiliate Disclosure:</strong> This website contains affiliate links. 
              We may earn a commission when you book through our partners (Viator, Booking.com, GetYourGuide, etc.) 
              at no additional cost to you. This helps us keep the site free and up-to-date. Our recommendations 
              are based on quality and relevance, not solely on commission potential.
            </p>
            <p>
              Featured businesses marked with partnership badges have paid promotional arrangements. 
              Paid placements do not influence our recommendation algorithms or user review ratings.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a href="/advertise" className="hover:text-white transition-colors">
              Advertise With Us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm">
            Made with ❤️ for Santa Cruz locals and visitors © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

