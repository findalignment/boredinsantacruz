import Link from 'next/link';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  emoji: string;
  gradient?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  columns?: 2 | 3 | 4;
}

export function RelatedLinks({ title = "Related Guides", links, columns = 3 }: RelatedLinksProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="mt-16 py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
      <div className="px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            Discover more great content
          </p>
        </div>

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-200"
            >
              <div className="flex items-start gap-3">
                <div className={`text-3xl group-hover:scale-110 transition-transform duration-300 ${link.gradient ? `bg-gradient-to-br ${link.gradient} bg-clip-text` : ''}`}>
                  {link.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {link.description}
                  </p>
                  <div className="mt-2 flex items-center text-blue-600 text-sm font-semibold group-hover:gap-1 transition-all">
                    Learn more
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

