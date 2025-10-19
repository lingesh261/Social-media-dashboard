import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockMetrics } from './mockData';

const AnalyticsPage = () => (
  <div className="p-4 md:p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Detailed Analytics</h1>
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <p className="text-gray-600">
        This section would contain platform-specific deep dives: audience demographics, best time to post,
        content performance tables, and more granular data visualizations. Since we're using mock data,
        we'll focus on the data structure for now.
      </p>
      <div className="mt-6 space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Twitter Performance</h3>
          <p className="text-sm text-blue-600">Top Post Impressions: 12,500 | Average Link Clicks: 58</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-semibold text-pink-800">Instagram Performance</h3>
          <p className="text-sm text-pink-600">Reach Last 7 Days: 8,900 | Story Views (Avg): 1,200</p>
        </div>
      </div>
      <div className="mt-8 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#4f46e5" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#4f46e5" name="Followers" />
            <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#10b981" name="Engagement" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AnalyticsPage;