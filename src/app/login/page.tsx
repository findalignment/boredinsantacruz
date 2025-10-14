import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to Bored in Santa Cruz to save favorites, leave reviews, and get personalized recommendations.',
};

// Make this page dynamic (not pre-rendered) because LoginForm uses useSearchParams
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="text-5xl mb-2">🌊</div>
            <h1 className="text-3xl font-bold text-gray-900">Bored in Santa Cruz</h1>
          </Link>
          <p className="text-gray-600 mt-2">
            Sign in to save favorites and leave reviews
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

