import React, { useState } from 'react';
import OnlineAppointments from '../components/AdminDashboard/OnlineAppointments';
import OfflineAppointments from '../components/AdminDashboard/OfflineAppointments';
import DisableSlot from '../components/AdminDashboard/DisableSlot';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('online');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderMainContent = () => {
    switch (activeComponent) {
      case 'online':
        return <OnlineAppointments />;
      case 'offline':
        return <OfflineAppointments />;
      case 'disable':
        return <DisableSlot />;
      default:
        return <OnlineAppointments />;
    }
  };

  const navItems = [
    { key: 'online', label: 'Online Appointments' },
    { key: 'offline', label: 'Offline Appointments' },
    { key: 'disable', label: 'Disable Slot/Off Day' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 scrollbar-hide">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeComponent === item.key
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
              onClick={() => setActiveComponent(item.key)}
            >
              {sidebarOpen && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500  rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {navItems.find(item => item.key === activeComponent)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">Notifications</span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;