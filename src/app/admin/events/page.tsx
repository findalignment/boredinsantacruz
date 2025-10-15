import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { EventModerationDashboard } from '@/components/admin/event-moderation-dashboard';

export const metadata: Metadata = {
  title: 'Event Moderation | Admin',
  description: 'Review and approve community event submissions',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions);

  // TODO: Add proper admin role check
  // For now, require any logged-in user
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin/events');
  }

  // TODO: Check if user has admin role
  // const isAdmin = session.user?.role === 'admin';
  // if (!isAdmin) {
  //   redirect('/?error=unauthorized');
  // }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span>🛡️</span>
            Event Moderation Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Review and approve community event submissions
          </p>
        </div>

        {/* Dashboard */}
        <EventModerationDashboard />
      </div>
    </main>
  );
}

