import React from 'react';
import { LayoutDashboard, TrendingUp, Calendar, LogOut } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Analytics', icon: TrendingUp, page: 'analytics' },
    { name: 'Schedule', icon: Calendar, page: 'schedule' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20 transition-all duration-300 lg:static">
      <div className="p-6 text-2xl font-extrabold text-indigo-400 border-b border-gray-800">
        SocialDash
      </div>
      <nav className="flex-grow p-4">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`flex items-center w-full p-3 my-2 rounded-lg transition-colors duration-200 ${
              currentPage === item.page
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-indigo-400'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;