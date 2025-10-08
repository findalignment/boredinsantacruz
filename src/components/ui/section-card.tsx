import Link from 'next/link';

interface SectionCardProps {
  title: string;
  description: string;
  emoji: string;
  href: string;
  gradient: string;
}

export function SectionCard({ title, description, emoji, href, gradient }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className={`h-32 ${gradient} flex items-center justify-center`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
        <div className="mt-4 flex items-center text-blue-600 font-medium">
          Explore
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

