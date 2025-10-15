'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TripItem } from '@/types/trips';
import { removeItemFromTrip } from '@/app/actions/tripItems';
import { toast } from 'sonner';
import Link from 'next/link';

interface TripItemCardProps {
  item: TripItem;
  canEdit: boolean;
  onRemove: () => void;
}

export function TripItemCard({ item, canEdit, onRemove }: TripItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !canEdit });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Remove this item from the trip?')) return;

    const result = await removeItemFromTrip(item.id);
    
    if (result.success) {
      toast.success('Item removed');
      onRemove();
    } else {
      toast.error(result.error || 'Failed to remove item');
    }
  };

  const getItemUrl = () => {
    if (item.itemType === 'Activity') return `/activity/${item.referenceId}`;
    if (item.itemType === 'Restaurant') return `/restaurant/${item.referenceId}`;
    return '#';
  };

  const parsedData = item.itemData ? JSON.parse(item.itemData) : null;

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-900 transition-all">
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          {canEdit && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 pt-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <Link href={getItemUrl()} className="hover:underline">
              <h4 className="font-semibold text-gray-900 mb-1">{item.itemName}</h4>
            </Link>
            
            {parsedData?.address && (
              <p className="text-sm text-gray-600 mb-2">📍 {parsedData.address}</p>
            )}
            
            {item.notes && (
              <p className="text-sm text-gray-700 bg-white rounded px-3 py-2 mt-2">
                💭 {item.notes}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-white rounded">
                {item.itemType}
              </span>
              {parsedData?.cost !== undefined && (
                <span>💰 ${parsedData.cost}</span>
              )}
              {parsedData?.duration && (
                <span>⏱️ {parsedData.duration}</span>
              )}
            </div>
          </div>

          {/* Remove Button */}
          {canEdit && (
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

