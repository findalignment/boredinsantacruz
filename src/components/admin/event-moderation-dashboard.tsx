'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AdminAnalytics } from './admin-analytics';
import { BulkActions } from './bulk-actions';

interface PendingEvent {
  id: string;
  title: string;
  description: string;
  categories: string;
  startDate: string;
  startTime: string;
  venueName: string;
  venueAddress: string;
  isOnline: boolean;
  cost: string;
  submitterName: string;
  submitterEmail: string;
  submittedDate: string;
  imageUrl?: string;
  websiteUrl?: string;
  ticketUrl?: string;
}

export function EventModerationDashboard() {
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'this-week'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
    approvalRate: 0,
    avgReviewTime: '< 1h',
  });

  useEffect(() => {
    fetchPendingEvents();
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/events/analytics');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/events/pending');
      const data = await response.json();
      
      if (data.success) {
        setPendingEvents(data.events || []);
      } else {
        toast.error('Failed to load pending events');
      }
    } catch (error) {
      console.error('Failed to fetch pending events:', error);
      toast.error('Failed to load pending events');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Approve event: "${eventTitle}"?`)) {
      return;
    }

    setProcessingId(eventId);
    try {
      const response = await fetch('/api/admin/events/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`✅ Approved: ${eventTitle}`);
        setPendingEvents(prev => prev.filter(e => e.id !== eventId));
      } else {
        toast.error(data.error || 'Failed to approve event');
      }
    } catch (error) {
      console.error('Failed to approve event:', error);
      toast.error('Failed to approve event');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (eventId: string, eventTitle: string) => {
    const reason = prompt(`Reject event: "${eventTitle}"\n\nReason (will be sent to submitter):`);
    
    if (!reason) {
      return; // User cancelled
    }

    setProcessingId(eventId);
    try {
      const response = await fetch('/api/admin/events/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, reason }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`❌ Rejected: ${eventTitle}`);
        setPendingEvents(prev => prev.filter(e => e.id !== eventId));
      } else {
        toast.error(data.error || 'Failed to reject event');
      }
    } catch (error) {
      console.error('Failed to reject event:', error);
      toast.error('Failed to reject event');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredEvents = pendingEvents.filter(event => {
    if (filter === 'all') return true;
    
    const eventDate = new Date(event.startDate);
    const now = new Date();
    
    if (filter === 'today') {
      return eventDate.toDateString() === now.toDateString();
    }
    
    if (filter === 'this-week') {
      const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= now && eventDate <= oneWeek;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading pending events...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Analytics Dashboard */}
      <AdminAnalytics stats={stats} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 font-semibold mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-900">{pendingEvents.length}</p>
            </div>
            <div className="text-5xl">⏳</div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-semibold mb-1">Submitted Today</p>
              <p className="text-3xl font-bold text-blue-900">
                {pendingEvents.filter(e => {
                  const submitted = new Date(e.submittedDate);
                  const today = new Date();
                  return submitted.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <div className="text-5xl">📅</div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-semibold mb-1">This Week's Events</p>
              <p className="text-3xl font-bold text-green-900">
                {pendingEvents.filter(e => {
                  const eventDate = new Date(e.startDate);
                  const now = new Date();
                  const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return eventDate >= now && eventDate <= oneWeek;
                }).length}
              </p>
            </div>
            <div className="text-5xl">🎉</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">Filter:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({pendingEvents.length})
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today's Events
          </button>
          <button
            onClick={() => setFilter('this-week')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'this-week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
          <p className="text-gray-600">No pending events to review.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="md:flex">
                {/* Image */}
                {event.imageUrl && (
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.categories.split(',').map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">📅 Date:</span>{' '}
                      {new Date(event.startDate).toLocaleDateString()} at {event.startTime}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">💰 Cost:</span>{' '}
                      {event.cost}
                    </div>
                    {event.isOnline ? (
                      <div className="md:col-span-2">
                        <span className="font-semibold text-gray-700">💻 Online Event</span>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="font-semibold text-gray-700">📍 Venue:</span>{' '}
                          {event.venueName}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-gray-700">Address:</span>{' '}
                          {event.venueAddress}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Links */}
                  {(event.websiteUrl || event.ticketUrl) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.websiteUrl && (
                        <a
                          href={event.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          🌐 Website
                        </a>
                      )}
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          🎫 Tickets
                        </a>
                      )}
                    </div>
                  )}

                  {/* Submitter Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Submitted by:</span> {event.submitterName} ({event.submitterEmail})
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Submitted:</span>{' '}
                      {new Date(event.submittedDate).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleApprove(event.id, event.title)}
                      disabled={processingId === event.id}
                      className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {processingId === event.id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          ✅ Approve & Publish
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleReject(event.id, event.title)}
                      disabled={processingId === event.id}
                      className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

