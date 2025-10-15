'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TripWithItems } from '@/types/trips';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { updateTrip, deleteTrip, generateShareToken } from '@/app/actions/trips';
import { reorderTripItems } from '@/app/actions/tripItems';
import { TripItemCard } from './trip-item-card';
import { toast } from 'sonner';

interface TripDetailProps {
  trip: TripWithItems;
  canEdit: boolean;
  isOwner: boolean;
}

export function TripDetail({ trip: initialTrip, canEdit, isOwner }: TripDetailProps) {
  const router = useRouter();
  const [trip, setTrip] = useState(initialTrip);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: trip.name,
    description: trip.description || '',
    startDate: trip.startDate || '',
    endDate: trip.endDate || '',
    isPublic: trip.isPublic,
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group items by day
  const itemsByDay = trip.items.reduce((acc, item) => {
    const day = item.day || 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<number, typeof trip.items>);

  const days = Object.keys(itemsByDay).sort((a, b) => Number(a) - Number(b));

  const handleDragEnd = async (event: DragEndEvent, day: number) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const dayItems = itemsByDay[day];
    const oldIndex = dayItems.findIndex((item) => item.id === active.id);
    const newIndex = dayItems.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(dayItems, oldIndex, newIndex);
    
    // Update order numbers
    const updates = reordered.map((item, index) => ({
      id: item.id,
      day,
      order: index,
    }));

    const result = await reorderTripItems(trip.id, updates);
    
    if (result.success) {
      // Update local state
      const newItems = trip.items.map(item => {
        const update = updates.find(u => u.id === item.id);
        return update ? { ...item, order: update.order } : item;
      });
      setTrip({ ...trip, items: newItems });
      toast.success('Reordered items');
    } else {
      toast.error('Failed to reorder');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateTrip(trip.id, editData);
    
    if (result.success) {
      setTrip({ ...trip, ...editData });
      setIsEditing(false);
      toast.success('Trip updated');
    } else {
      toast.error(result.error || 'Failed to update trip');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this trip? This cannot be undone.')) {
      return;
    }

    setLoading(true);
    const result = await deleteTrip(trip.id);
    
    if (result.success) {
      toast.success('Trip deleted');
      router.push('/trips');
    } else {
      toast.error(result.error || 'Failed to delete trip');
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!trip.shareToken) {
      const result = await generateShareToken(trip.id);
      if (result.success && result.data) {
        setTrip({ ...trip, shareToken: result.data.token });
      }
    }
    setShowShareModal(true);
  };

  const shareUrl = trip.shareToken 
    ? `${window.location.origin}/trips/shared/${trip.shareToken}`
    : '';

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full text-3xl font-bold border-b-2 border-gray-300 focus:border-gray-900 outline-none pb-2"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Add a description..."
              rows={2}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={editData.startDate}
                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={editData.endDate}
                onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={editData.isPublic}
                onChange={(e) => setEditData({ ...editData, isPublic: e.target.checked })}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-700">Make public</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.name}</h1>
                {trip.description && (
                  <p className="text-gray-600 mb-3">{trip.description}</p>
                )}
                {(trip.startDate || trip.endDate) && (
                  <p className="text-gray-500">
                    📅 {trip.startDate} {trip.endDate && `- ${trip.endDate}`}
                  </p>
                )}
              </div>
              
              {canEdit && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Share
                  </button>
                  {isOwner && (
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{trip.isPublic ? '🌐 Public' : '🔒 Private'}</span>
              <span>•</span>
              <span>{trip.items.length} item{trip.items.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>

      {/* Items by Day */}
      {days.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No items yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start adding activities and restaurants from anywhere on the site!
          </p>
          <Link
            href="/activities"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Activities
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {days.map((dayNum) => {
            const dayItems = itemsByDay[Number(dayNum)];
            const dayLabel = days.length > 1 ? `Day ${dayNum}` : 'Itinerary';

            return (
              <div key={dayNum} className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{dayLabel}</h2>
                
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, Number(dayNum))}
                >
                  <SortableContext
                    items={dayItems.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {dayItems.map((item) => (
                        <TripItemCard
                          key={item.id}
                          item={item}
                          canEdit={canEdit}
                          onRemove={() => {
                            const newItems = trip.items.filter(i => i.id !== item.id);
                            setTrip({ ...trip, items: newItems });
                          }}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            );
          })}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Share Trip</h3>
            <p className="text-gray-600 mb-4">
              Anyone with this link can view your trip
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success('Link copied!');
                }}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

