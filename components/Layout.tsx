
import React, { useState } from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, activeTab, setActiveTab, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-home' },
    { id: 'lessons', label: 'Lessons', icon: 'fa-book' },
    { id: 'activities', label: 'Activities', icon: 'fa-calendar' },
    { id: 'exams', label: 'Exams', icon: 'fa-vial' },
    { id: 'mentor', label: 'AI Mentor', icon: 'fa-robot' },
  ];

  if (user.role === 'ADMIN' || user.role === 'AY_LEADER') {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: 'fa-shield-halved' });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white sticky top-0 h-screen">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-church text-slate-900 text-xl"></i>
          </div>
          <span className="font-bold text-lg leading-tight">AY Heritage<br/><span className="text-amber-500">Portal</span></span>
        </div>

        <nav className="flex-1 px-4 mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-slate-900 font-semibold' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-6`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-amber-500" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-sign-out w-6"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <i className="fa-solid fa-church text-amber-500 text-2xl"></i>
          <span className="font-bold">AY Portal</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900 z-40 pt-20 px-6">
          <nav>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl mb-4 ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-900' : 'text-white bg-slate-800'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-xl`}></i>
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl mt-8 text-red-400 border border-red-400/30"
            >
              <i className="fa-solid fa-sign-out text-xl"></i>
              <span className="text-lg font-medium">Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
