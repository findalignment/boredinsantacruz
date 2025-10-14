'use client';

import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function StarRating({ value, onChange, readonly = false, size = 'md', label }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange?.(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onMouseLeave={() => !readonly && setHoverValue(null)}
            className={`
              ${sizeClasses[size]}
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              transition-transform
              ${readonly ? '' : 'focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'}
            `}
            aria-label={`Rate ${star} stars`}
          >
            {star <= displayValue ? '⭐' : '☆'}
          </button>
        ))}
        {!readonly && (
          <span className="ml-2 text-sm text-gray-600">
            {displayValue > 0 ? `${displayValue}/5` : 'Select rating'}
          </span>
        )}
      </div>
    </div>
  );
}

