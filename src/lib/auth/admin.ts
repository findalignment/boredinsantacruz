import { Session } from 'next-auth';

/**
 * Check if a user is an admin
 * Admins are identified by their email address matching ADMIN_EMAIL env var
 * or being in a comma-separated list of ADMIN_EMAILS
 */
export function isAdmin(session: Session | null): boolean {
  if (!session?.user?.email) {
    return false;
  }

  const userEmail = session.user.email.toLowerCase();
  
  // Check single admin email
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (adminEmail && userEmail === adminEmail) {
    return true;
  }

  // Check multiple admin emails (comma-separated)
  const adminEmails = process.env.ADMIN_EMAILS?.toLowerCase().split(',').map(e => e.trim());
  if (adminEmails && adminEmails.includes(userEmail)) {
    return true;
  }

  return false;
}

/**
 * Get admin-related error responses
 */
export const AdminErrors = {
  UNAUTHORIZED: {
    success: false,
    error: 'Unauthorized - Please sign in',
  },
  FORBIDDEN: {
    success: false,
    error: 'Forbidden - Admin access required',
  },
} as const;

