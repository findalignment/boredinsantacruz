'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getTrips, createTrip } from '@/app/actions/trips';
import { addItemToTrip } from '@/app/actions/tripItems';
import type { Trip } from '@/types/trips';
import { toast } from 'sonner';

interface AddToTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'Activity' | 'Restaurant';
  itemId: string;
  itemName: string;
  itemData?: any;
}

export function AddToTripModal({ isOpen, onClose, itemType, itemId, itemName, itemData }: AddToTripModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTripName, setNewTripName] = useState('');

  useEffect(() => {
    if (isOpen && session?.user) {
      loadTrips();
    }
  }, [isOpen, session]);

  const loadTrips = async () => {
    setLoading(true);
    const result = await getTrips();
    if (result.success && result.data) {
      setTrips(result.data);
    }
    setLoading(false);
  };

  const handleAddToTrip = async (tripId: string) => {
    toast.loading('Adding to trip...');
    
    const result = await addItemToTrip({
      tripId,
      itemType,
      referenceId: itemId,
      itemName,
      itemData: itemData ? {
        ...itemData,
        savedAt: new Date().toISOString(),
      } : undefined,
    });

    if (result.success) {
      toast.success(`Added "${itemName}" to trip!`);
      onClose();
    } else {
      toast.error(result.error || 'Failed to add to trip');
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newTripName.trim()) {
      toast.error('Please enter a trip name');
      return;
    }

    setCreating(true);
    toast.loading('Creating trip...');

    const createResult = await createTrip({ name: newTripName });
    
    if (createResult.success && createResult.data) {
      const addResult = await addItemToTrip({
        tripId: createResult.data.id,
        itemType,
        referenceId: itemId,
        itemName,
        itemData,
      });

      if (addResult.success) {
        toast.success(`Created "${newTripName}" and added "${itemName}"!`);
        router.push(`/trips/${createResult.data.id}`);
        onClose();
      } else {
        toast.error('Trip created but failed to add item');
      }
    } else {
      toast.error(createResult.error || 'Failed to create trip');
    }
    
    setCreating(false);
  };

  if (!isOpen) return null;

  if (!session?.user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-2xl font-bold mb-4">Sign in to save trips</h3>
          <p className="text-gray-600 mb-6">
            Create and save custom trip itineraries by signing in
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Save to Trip</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Saving: <span className="font-medium">{itemName}</span>
        </p>

        {/* Create New Trip */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Create New Trip</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              placeholder="Trip name (e.g., Weekend Getaway)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateAndAdd()}
            />
            <button
              onClick={handleCreateAndAdd}
              disabled={creating || !newTripName.trim()}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              {creating ? '...' : 'Create'}
            </button>
          </div>
        </div>

        {/* Existing Trips */}
        <div>
          <h4 className="font-semibold mb-3">Add to Existing Trip</h4>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading trips...</div>
          ) : trips.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No trips yet. Create your first one above!
            </div>
          ) : (
            <div className="space-y-2">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => handleAddToTrip(trip.id)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all"
                >
                  <div className="font-medium">{trip.name}</div>
                  {trip.description && (
                    <div className="text-sm text-gray-600 mt-1">{trip.description}</div>
                  )}
                  {(trip.startDate || trip.endDate) && (
                    <div className="text-xs text-gray-500 mt-1">
                      {trip.startDate} {trip.endDate && `- ${trip.endDate}`}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

