import { Metadata } from 'next';
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { hasUserReviewed } from '@/app/actions/reviews';
import { getActivities } from '@/app/actions/getActivities';
import { ReviewForm } from '@/components/reviews/review-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Write a Review',
  description: 'Share your experience and help others discover great activities in Santa Cruz.',
};

interface PageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default async function WriteReviewPage(props: PageProps) {
  const params = await props.params;
  const session = await auth();

  if (!session) {
    redirect(`/login?callbackUrl=/review/${params.type}/${params.id}`);
  }

  // Validate type
  if (params.type !== 'activity' && params.type !== 'restaurant') {
    redirect('/');
  }

  const itemType = params.type === 'activity' ? 'Activity' : 'Restaurant';

  // Check if user has already reviewed
  const alreadyReviewed = await hasUserReviewed(itemType, params.id);

  if (alreadyReviewed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              You've Already Reviewed This
            </h1>
            <p className="text-gray-600 mb-6">
              You can only write one review per {params.type}. You can edit your existing review from your profile.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/profile"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Go to Profile
              </Link>
              <Link
                href={`/${params.type}/${params.id}`}
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
              >
                Back to {params.type === 'activity' ? 'Activity' : 'Restaurant'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch item details
  let itemName = 'this item';
  
  if (params.type === 'activity') {
    const activitiesResult = await getActivities();
    if (activitiesResult.success) {
      const activity = activitiesResult.data.find((a) => a.id === params.id);
      if (activity) {
        itemName = activity.title;
      }
    }
  }
  // TODO: Add restaurant fetch when restaurants are available

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <ReviewForm itemType={itemType} itemId={params.id} itemName={itemName} />
      </div>
    </div>
  );
}

