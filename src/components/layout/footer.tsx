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

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            Made with ❤️ for Santa Cruz locals and visitors © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

