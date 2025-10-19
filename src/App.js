import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, TrendingUp, Calendar, User, LogOut, Send, Twitter, Instagram, Plus } from 'lucide-react';
import DashboardPage from './DashboardPage';
import AnalyticsPage from './AnalyticsPage';
import SchedulePage from './SchedulePage';
import Sidebar from './Sidebar';
import LoginComponent from './LoginComponent';

// --- MAIN APP COMPONENT ---

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'schedule':
        return <SchedulePage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 antialiased">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="fixed left-0 top-0 h-full w-64" onClick={(e) => e.stopPropagation()}>
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 sticky top-0 z-10 lg:pl-4">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <span className="text-xl font-semibold capitalize text-gray-700">{currentPage}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:inline">{user?.username || 'Analyst'}</span>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer" title="User Profile">
              {user?.username ? user.username[0].toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;