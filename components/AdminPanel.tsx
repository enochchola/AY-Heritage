
import React, { useState } from 'react';
import { User, Activity, Lesson, Exam } from '../types';

interface AdminPanelProps {
  users: User[];
  activities: Activity[];
  lessons: Lesson[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ users, activities, lessons }) => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'content' | 'activities' | 'reports'>('users');

  const stats = [
    { label: 'Total Members', value: users.length, icon: 'fa-users', color: 'bg-blue-500' },
    { label: 'Lessons Published', value: lessons.length, icon: 'fa-book', color: 'bg-emerald-500' },
    { label: 'Active Activities', value: activities.length, icon: 'fa-calendar', color: 'bg-amber-500' },
    { label: 'Avg. Progress', value: '72%', icon: 'fa-chart-line', color: 'bg-purple-500' },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Admin Management Center</h1>
        <p className="text-slate-500">Manage church content, members, and view reports.</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-10 h-10 ${s.color} text-white rounded-xl flex items-center justify-center mb-3`}>
              <i className={`fa-solid ${s.icon}`}></i>
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          {[
            { id: 'users', label: 'Members', icon: 'fa-user-group' },
            { id: 'content', label: 'Lessons', icon: 'fa-book-bookmark' },
            { id: 'activities', label: 'Activities', icon: 'fa-calendar-plus' },
            { id: 'reports', label: 'Reports', icon: 'fa-chart-pie' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors ${
                activeSubTab === tab.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeSubTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <th className="pb-4">Member</th>
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Progress</th>
                    <th className="pb-4">Joined</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map(u => (
                    <tr key={u.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img src={u.avatar} className="w-10 h-10 rounded-full border border-slate-200" alt="" />
                          <div>
                            <div className="font-bold text-slate-800">{u.name}</div>
                            <div className="text-xs text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          u.role === 'ADMIN' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${u.progress}%` }}></div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-500">{u.joinedAt}</td>
                      <td className="py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 font-bold rounded-xl hover:border-blue-300 hover:text-blue-500 transition-all">
                <i className="fa-solid fa-plus mr-2"></i> Register New Member
              </button>
            </div>
          )}

          {activeSubTab === 'content' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800">Published Lessons</h3>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center hover:bg-slate-800 transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i> New Lesson
                </button>
              </div>
              {lessons.map(l => (
                <div key={l.id} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between hover:border-blue-200 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                      <i className="fa-solid fa-file-lines"></i>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{l.title}</div>
                      <div className="text-xs text-slate-400">{l.level} • {l.topic}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600"><i className="fa-solid fa-pen"></i></button>
                    <button className="p-2 text-slate-400 hover:text-red-600"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'activities' && (
             <div className="text-center py-20 text-slate-400">
               <div className="text-5xl mb-4 text-slate-200"><i className="fa-solid fa-calendar-check"></i></div>
               <div className="font-bold text-lg text-slate-600">No recent activity logs</div>
               <p>Create a new activity to start tracking registrations.</p>
               <button className="mt-6 px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all">
                 Create Activity
               </button>
             </div>
          )}

          {activeSubTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold mb-4 text-slate-800">Participation by Level</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-bold"><span>Senior Youth</span><span>75%</span></div>
                    <div className="w-full bg-slate-200 h-2 rounded-full"><div className="bg-blue-600 h-full rounded-full" style={{ width: '75%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-bold"><span>Junior Youth</span><span>42%</span></div>
                    <div className="w-full bg-slate-200 h-2 rounded-full"><div className="bg-emerald-500 h-full rounded-full" style={{ width: '42%' }}></div></div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold mb-4 text-slate-800">Growth Trends</h4>
                <div className="h-24 flex items-end space-x-2">
                  {[40, 60, 45, 80, 70, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-amber-500/20 rounded-t-lg relative group">
                      <div className="absolute bottom-0 left-0 right-0 bg-amber-500 rounded-t-lg transition-all duration-1000 group-hover:bg-amber-600" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
