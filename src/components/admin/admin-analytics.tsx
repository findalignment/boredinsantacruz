'use client';

interface AnalyticsProps {
  stats: {
    totalEvents: number;
    pendingEvents: number;
    approvedEvents: number;
    rejectedEvents: number;
    approvalRate: number;
    avgReviewTime: string;
  };
}

export function AdminAnalytics({ stats }: AnalyticsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Events */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-900">{stats.totalEvents}</div>
          <div className="text-sm font-medium text-blue-700 mt-1">Total Events</div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border-2 border-yellow-200">
          <div className="text-3xl font-bold text-yellow-900">{stats.pendingEvents}</div>
          <div className="text-sm font-medium text-yellow-700 mt-1">Pending Review</div>
        </div>

        {/* Approved */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-200">
          <div className="text-3xl font-bold text-green-900">{stats.approvedEvents}</div>
          <div className="text-sm font-medium text-green-700 mt-1">Approved</div>
        </div>

        {/* Rejected */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-2 border-red-200">
          <div className="text-3xl font-bold text-red-900">{stats.rejectedEvents}</div>
          <div className="text-sm font-medium text-red-700 mt-1">Rejected</div>
        </div>

        {/* Approval Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
          <div className="text-3xl font-bold text-purple-900">{stats.approvalRate}%</div>
          <div className="text-sm font-medium text-purple-700 mt-1">Approval Rate</div>
        </div>

        {/* Avg Review Time */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border-2 border-cyan-200">
          <div className="text-3xl font-bold text-cyan-900">{stats.avgReviewTime}</div>
          <div className="text-sm font-medium text-cyan-700 mt-1">Avg Review Time</div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📈</span>
            <h3 className="font-semibold text-gray-900">Trend</h3>
          </div>
          <p className="text-sm text-gray-700">
            {stats.pendingEvents > 5 ? 'High volume of pending submissions. Consider reviewing soon.' : 'Submission volume is normal.'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✅</span>
            <h3 className="font-semibold text-gray-900">Quality</h3>
          </div>
          <p className="text-sm text-gray-700">
            {stats.approvalRate >= 70 ? 'Great submission quality! High approval rate.' : 'Consider providing clearer submission guidelines.'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-semibold text-gray-900">Speed</h3>
          </div>
          <p className="text-sm text-gray-700">
            {stats.avgReviewTime === '< 1h' ? 'Excellent! Events reviewed quickly.' : 'Good response time. Keep it up!'}
          </p>
        </div>
      </div>
    </div>
  );
}

