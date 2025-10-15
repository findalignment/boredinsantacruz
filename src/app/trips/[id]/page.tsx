import { auth } from '@/lib/auth/config';
import { redirect, notFound } from 'next/navigation';
import { getTripById } from '@/app/actions/trips';
import Link from 'next/link';
import { TripDetail } from '@/components/trips/trip-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const result = await getTripById(id);
  
  if (!result.success || !result.data) {
    return {
      title: 'Trip Not Found',
    };
  }

  return {
    title: result.data.name,
    description: result.data.description || 'Santa Cruz trip itinerary',
  };
}

export default async function TripDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const result = await getTripById(id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const session = await auth();
  const trip = result.data;

  // Check if user has edit permissions
  const isOwner = session?.user?.email === trip.userId;
  const isCollaborator = trip.collaborators?.includes(session?.user?.email || '');
  const canEdit = isOwner || isCollaborator;

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/trips"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Trips
        </Link>

        <TripDetail trip={trip} canEdit={canEdit} isOwner={isOwner} />
      </div>
    </div>
  );
}

