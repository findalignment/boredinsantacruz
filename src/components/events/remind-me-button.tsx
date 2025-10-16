'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface RemindMeButtonProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  className?: string;
}

export function RemindMeButton({ eventId, eventTitle, eventDate, className = '' }: RemindMeButtonProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

  const handleClick = async () => {
    // If user is logged in, use their email
    if (session?.user?.email) {
      await subscribeToReminder(session.user.email);
      return;
    }

    // Otherwise, show email input
    setShowEmailInput(true);
  };

  const subscribeToReminder = async (emailAddress: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/event-reminders/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailAddress,
          eventId,
          eventTitle,
          eventDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Reminder set! We\'ll email you the day before.');
        setShowEmailInput(false);
      } else {
        toast.error(data.error || 'Failed to set reminder');
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast.error('Failed to set reminder. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      subscribeToReminder(email);
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  if (showEmailInput) {
    return (
      <form onSubmit={handleEmailSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Setting...' : 'Set Reminder'}
        </button>
        <button
          type="button"
          onClick={() => setShowEmailInput(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {isLoading ? 'Setting...' : 'Remind Me'}
    </button>
  );
}

