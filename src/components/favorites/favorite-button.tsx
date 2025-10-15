'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { addFavorite, removeFavorite } from '@/app/actions/favorites';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  itemType: 'Activity' | 'Restaurant' | 'Wellness';
  itemId: string;
  initialIsFavorited?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function FavoriteButton({
  itemType,
  itemId,
  initialIsFavorited = false,
  size = 'md',
  showLabel = false,
}: FavoriteButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isPending, startTransition] = useTransition();

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (status !== 'authenticated' || !session) {
      // Redirect to login with callback
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Optimistic update
    const previousState = isFavorited;
    setIsFavorited(!isFavorited);

    startTransition(async () => {
      try {
        let result;
        if (previousState) {
          // Remove favorite
          result = await removeFavorite(itemType, itemId);
        } else {
          // Add favorite
          result = await addFavorite(itemType, itemId);
        }

        if (!result.success) {
          // Revert on failure
          setIsFavorited(previousState);
          console.error('Favorite action failed:', result.error);
          
          // Show error toast (you can replace with your toast library)
          alert(result.error || 'Failed to update favorite');
        }
      } catch (error) {
        // Revert on error
        setIsFavorited(previousState);
        console.error('Error updating favorite:', error);
        alert('An error occurred');
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center gap-2
        transition-all duration-200
        ${isFavorited
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
        }
        ${isPending ? 'opacity-50 cursor-wait' : 'hover:scale-110'}
        disabled:cursor-not-allowed
        shadow-sm hover:shadow-md
      `}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isPending ? (
        <span className="animate-spin">⏳</span>
      ) : isFavorited ? (
        <span>❤️</span>
      ) : (
        <span>🤍</span>
      )}
      {showLabel && (
        <span className="text-sm font-medium pr-2">
          {isFavorited ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}

