// Consistent icon system for the entire site

export const Icons = {
  // Weather & Location
  outdoor: '☀️',
  indoor: '🏠',
  covered: '⛱️',
  rainy: '🌧️',
  sunny: '☀️',
  foggy: '🌫️',
  
  // Cost
  free: '🆓',
  cheap: '$',
  moderate: '$$',
  expensive: '$$$',
  luxury: '$$$$',
  
  // Family & Accessibility
  kidFriendly: '👶',
  petFriendly: '🐕',
  accessible: '♿',
  
  // Distance & Time
  walkable: '🚶',
  driving: '🚗',
  duration: '⏱️',
  
  // Food & Drink
  food: '🍴',
  coffee: '☕',
  drinks: '🍹',
  
  // Activities
  art: '🎨',
  music: '🎵',
  beach: '🏖️',
  hike: '🥾',
  museum: '🏛️',
  shopping: '🛍️',
  
  // Ratings & Features
  star: '⭐',
  heart: '❤️',
  featured: '🌟',
  local: '📍',
  
  // Actions
  view: '👁️',
  share: '↗️',
  favorite: '🤍',
  favorited: '❤️',
};

interface IconBadgeProps {
  icon: string;
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'info';
}

export function IconBadge({ icon, label, variant = 'primary' }: IconBadgeProps) {
  const colors = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
    info: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${colors[variant]}`}>
      <span className="text-base" role="img" aria-label={label}>
        {icon}
      </span>
      <span>{label}</span>
    </span>
  );
}

interface CostBadgeProps {
  cost: number;
}

export function CostBadge({ cost }: CostBadgeProps) {
  if (cost === 0) {
    return <IconBadge icon={Icons.free} label="Free" variant="success" />;
  }
  
  const level = cost < 20 ? Icons.cheap : cost < 50 ? Icons.moderate : cost < 100 ? Icons.expensive : Icons.luxury;
  const label = cost < 20 ? 'Budget' : cost < 50 ? 'Moderate' : cost < 100 ? 'Upscale' : 'Premium';
  const variant = cost < 20 ? 'success' : cost < 50 ? 'primary' : cost < 100 ? 'warning' : 'warning';
  
  return <IconBadge icon={level} label={label} variant={variant} />;
}

interface LocationBadgeProps {
  type: 'Indoor' | 'Outdoor' | 'Mixed' | 'Covered';
}

export function LocationBadge({ type }: LocationBadgeProps) {
  const config = {
    Indoor: { icon: Icons.indoor, label: 'Indoors', variant: 'info' as const },
    Outdoor: { icon: Icons.outdoor, label: 'Outdoors', variant: 'primary' as const },
    Mixed: { icon: Icons.covered, label: 'Indoor/Outdoor', variant: 'info' as const },
    Covered: { icon: Icons.covered, label: 'Covered', variant: 'info' as const },
  };
  
  const { icon, label, variant } = config[type];
  return <IconBadge icon={icon} label={label} variant={variant} />;
}

