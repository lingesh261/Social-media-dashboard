import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <p className="text-sm text-gray-500 mt-1 flex items-center">
      <Icon className={`w-4 h-4 mr-2 ${color}`} />
      {title}
    </p>
  </div>
);

export default DashboardCard;