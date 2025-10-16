interface ClickableAddressProps {
  address: string;
  className?: string;
  showIcon?: boolean;
}

export function ClickableAddress({ address, className = '', showIcon = true }: ClickableAddressProps) {
  // Create Google Maps URL (works on all platforms)
  // On mobile, it will intelligently open the native maps app
  const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors ${className}`}
      title="Get directions"
    >
      {showIcon && (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
      <span className="hover:underline">{address}</span>
    </a>
  );
}

