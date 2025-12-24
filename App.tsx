
import React, { useState, useEffect } from 'react';
import { currentUser, mockLessons, mockActivities, mockAnnouncements, mockExams } from './mockData';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Lessons from './components/Lessons';
import Activities from './components/Activities';
import Exams from './components/Exams';
import AdminPanel from './components/AdminPanel';
import AIMentor from './components/AIMentor';
import { User, Lesson } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('ay_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate API delay
    setTimeout(() => {
      setUser(currentUser);
      localStorage.setItem('ay_user', JSON.stringify(currentUser));
      setIsLoggingIn(false);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ay_user');
  };

  const handleCompleteLesson = (id: string) => {
    const updatedLessons = lessons.map(l => l.id === id ? { ...l, completed: true } : l);
    setLessons(updatedLessons);
    
    // Update progress
    if (user) {
      const completedCount = updatedLessons.filter(l => l.completed).length;
      const progress = Math.round((completedCount / updatedLessons.length) * 100);
      const updatedUser = { ...user, progress };
      setUser(updatedUser);
      localStorage.setItem('ay_user', JSON.stringify(updatedUser));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full animate-slideUp">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20 rotate-12">
              <i className="fa-solid fa-church text-slate-900 text-4xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Heritage Portal</h1>
            <p className="text-slate-400">Adventist Youth Leadership & Heritage</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Church Email</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-4 text-slate-400"></i>
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                    placeholder="name@church.org" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-4 text-slate-400"></i>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                {isLoggingIn ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  <>
                    <span>Enter Portal</span>
                    <i className="fa-solid fa-arrow-right-to-bracket text-amber-500"></i>
                  </>
                )}
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                Trouble logging in? <a href="#" className="text-blue-600 font-bold hover:underline">Contact AY Leader</a>
              </p>
            </div>
          </form>

          <p className="mt-12 text-center text-slate-500 text-xs">
            © 2024 General Conference of Seventh-day Adventists. <br/> Youth Ministries Department
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      user={user} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          user={user} 
          announcements={mockAnnouncements} 
          activities={mockActivities} 
          lessons={lessons}
          onNavigate={setActiveTab}
        />
      )}
      {activeTab === 'lessons' && (
        <Lessons lessons={lessons} onComplete={handleCompleteLesson} />
      )}
      {activeTab === 'activities' && (
        <Activities activities={mockActivities} />
      )}
      {activeTab === 'exams' && (
        <Exams exams={mockExams} />
      )}
      {activeTab === 'mentor' && (
        <AIMentor />
      )}
      {activeTab === 'admin' && (
        <AdminPanel 
          users={[currentUser, { ...currentUser, id: 'u2', name: 'Director Sarah', role: 'AY_LEADER', progress: 100 }]} 
          activities={mockActivities} 
          lessons={lessons} 
        />
      )}
    </Layout>
  );
};

export default App;
