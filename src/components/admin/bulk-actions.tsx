'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface BulkActionsProps {
  selectedIds: string[];
  onAction: () => void;
  onClearSelection: () => void;
}

export function BulkActions({ selectedIds, onAction, onClearSelection }: BulkActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (selectedIds.length === 0) {
    return null;
  }

  const handleBulkApprove = async () => {
    setIsProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const eventId of selectedIds) {
        try {
          const response = await fetch('/api/admin/events/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId }),
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`✅ Approved ${successCount} event${successCount > 1 ? 's' : ''}`);
        onAction();
        onClearSelection();
      }

      if (errorCount > 0) {
        toast.error(`❌ Failed to approve ${errorCount} event${errorCount > 1 ? 's' : ''}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setIsProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const eventId of selectedIds) {
        try {
          const response = await fetch('/api/admin/events/reject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, reason: rejectionReason }),
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`✅ Rejected ${successCount} event${successCount > 1 ? 's' : ''}`);
        onAction();
        onClearSelection();
        setShowRejectModal(false);
        setRejectionReason('');
      }

      if (errorCount > 0) {
        toast.error(`❌ Failed to reject ${errorCount} event${errorCount > 1 ? 's' : ''}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-2xl border-2 border-gray-200 px-6 py-4 flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">
            {selectedIds.length} event{selectedIds.length > 1 ? 's' : ''} selected
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleBulkApprove}
              disabled={isProcessing}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : '✅ Approve All'}
            </button>

            <button
              onClick={() => setShowRejectModal(true)}
              disabled={isProcessing}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              ❌ Reject All
            </button>

            <button
              onClick={onClearSelection}
              disabled={isProcessing}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Reject {selectedIds.length} Event{selectedIds.length > 1 ? 's' : ''}
            </h3>

            <p className="text-gray-600 mb-4">
              Please provide a reason for rejection. This will be included in the email sent to submitters.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Event is outside Santa Cruz County, Insufficient details provided..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isProcessing}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBulkReject}
                disabled={isProcessing || !rejectionReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                disabled={isProcessing}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

