import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TrendingUp, User, Calendar, Plus } from 'recharts';
import DashboardCard from './DashboardCard';
import { mockMetrics, initialScheduledPosts } from './mockData';

const DashboardPage = () => {
  const totalFollowers = useMemo(() => mockMetrics.reduce((sum, m) => sum + m.followers, 0), []);
  const avgEngagement = useMemo(() => mockMetrics.reduce((sum, m) => sum + m.engagement, 0) / mockMetrics.length, []);
  const latestFollowers = mockMetrics[mockMetrics.length - 1].followers;

  const kpis = [
    { title: 'Total Followers', value: `${(totalFollowers / 1000).toFixed(1)}K`, icon: User, color: 'text-indigo-600' },
    { title: 'Avg. Engagement', value: `${Math.round(avgEngagement)}`, icon: TrendingUp, color: 'text-green-500' },
    { title: 'Latest Followers', value: latestFollowers, icon: Plus, color: 'text-red-500' },
    { title: 'Scheduled Posts', value: initialScheduledPosts.length, icon: Calendar, color: 'text-yellow-500' },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <DashboardCard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Follower Growth (Monthly)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="followers" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Engagement Rate</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Bar dataKey="engagement" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;