'use client';

import { useState } from 'react';
import { AddToTripModal } from './add-to-trip-modal';

interface SaveToTripButtonProps {
  itemType: 'Activity' | 'Restaurant';
  itemId: string;
  itemName: string;
  itemData?: any;
  variant?: 'default' | 'compact' | 'icon';
}

export function SaveToTripButton({ itemType, itemId, itemName, itemData, variant = 'default' }: SaveToTripButtonProps) {
  const [showModal, setShowModal] = useState(false);

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(true);
          }}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Save to trip"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <AddToTripModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          itemType={itemType}
          itemId={itemId}
          itemName={itemName}
          itemData={itemData}
        />
      </>
    );
  }

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(true);
          }}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Save
        </button>
        <AddToTripModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          itemType={itemType}
          itemId={itemId}
          itemName={itemName}
          itemData={itemData}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
        className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Save to Trip
      </button>
      <AddToTripModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemType={itemType}
        itemId={itemId}
        itemName={itemName}
        itemData={itemData}
      />
    </>
  );
}

