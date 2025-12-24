
import React from 'react';
import { User, Activity, Announcement, Lesson } from '../types';

interface DashboardProps {
  user: User;
  announcements: Announcement[];
  activities: Activity[];
  lessons: Lesson[];
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, announcements, activities, lessons, onNavigate }) => {
  const nextActivity = activities[0];
  const incompleteLessons = lessons.filter(l => !l.completed);
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 mt-1">Keep growing in your spiritual heritage journey.</p>
      </header>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Learning Progress</span>
            <div className="text-3xl font-bold mt-2">{user.progress}%</div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${user.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Upcoming Activity</span>
          {nextActivity ? (
            <div className="mt-2">
              <div className="font-bold text-lg truncate">{nextActivity.title}</div>
              <div className="text-sm text-slate-500 flex items-center mt-1">
                <i className="fa-solid fa-location-dot mr-2"></i> {nextActivity.location}
              </div>
              <div className="text-sm text-slate-500 flex items-center mt-1">
                <i className="fa-solid fa-calendar mr-2"></i> {new Date(nextActivity.date).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <p className="text-slate-400 mt-2">No upcoming activities scheduled.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Next Lesson</span>
          {incompleteLessons.length > 0 ? (
            <div className="mt-2">
              <div className="font-bold text-lg truncate">{incompleteLessons[0].title}</div>
              <button 
                onClick={() => onNavigate('lessons')}
                className="mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center"
              >
                Continue Learning <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          ) : (
            <p className="text-slate-400 mt-2">All lessons completed! Great job.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Announcements</h2>
            <span className="text-sm text-blue-600 font-semibold cursor-pointer">View all</span>
          </div>
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white p-5 rounded-xl border-l-4 border-amber-500 shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800">{ann.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    ann.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ann.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{ann.content}</p>
                <div className="flex items-center mt-3 text-xs text-slate-400">
                  <i className="fa-solid fa-user-edit mr-1"></i> {ann.author}
                  <span className="mx-2">•</span>
                  <i className="fa-solid fa-clock mr-1"></i> {new Date(ann.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('lessons')}
              className="p-6 bg-blue-50 hover:bg-blue-100 rounded-2xl text-left transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <i className="fa-solid fa-book-open text-blue-600 text-xl"></i>
              </div>
              <div className="font-bold text-slate-800">Study Heritage</div>
              <div className="text-xs text-slate-500 mt-1">Access all lessons</div>
            </button>
            <button 
              onClick={() => onNavigate('exams')}
              className="p-6 bg-amber-50 hover:bg-amber-100 rounded-2xl text-left transition-colors group"
            >
              <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <i className="fa-solid fa-file-pen text-amber-600 text-xl"></i>
              </div>
              <div className="font-bold text-slate-800">Take Quizzes</div>
              <div className="text-xs text-slate-500 mt-1">Test your knowledge</div>
            </button>
            <button 
              onClick={() => onNavigate('activities')}
              className="p-6 bg-emerald-50 hover:bg-emerald-100 rounded-2xl text-left transition-colors group"
            >
              <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <i className="fa-solid fa-people-group text-emerald-600 text-xl"></i>
              </div>
              <div className="font-bold text-slate-800">Join Events</div>
              <div className="text-xs text-slate-500 mt-1">Register for activities</div>
            </button>
            <button 
              onClick={() => onNavigate('mentor')}
              className="p-6 bg-purple-50 hover:bg-purple-100 rounded-2xl text-left transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <i className="fa-solid fa-robot text-purple-600 text-xl"></i>
              </div>
              <div className="font-bold text-slate-800">Ask AI Mentor</div>
              <div className="text-xs text-slate-500 mt-1">Get heritage answers</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
