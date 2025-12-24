
import React, { useState } from 'react';
import { Activity } from '../types';

interface ActivitiesProps {
  activities: Activity[];
}

const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    setRegisteredIds([...registeredIds, id]);
    setShowConfirmation(id);
  };

  const getActivityTypeIcon = (type: Activity['type']) => {
    switch (type) {
      case 'Camp': return 'fa-tent';
      case 'Outreach': return 'fa-handshake-angle';
      case 'Drills': return 'fa-person-military-pointing';
      case 'Pathfinder': return 'fa-compass';
      case 'Social': return 'fa-mug-hot';
      default: return 'fa-calendar';
    }
  };

  return (
    <div className="animate-fadeIn relative">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Upcoming Activities</h1>
        <p className="text-slate-500">Join fellow youth in service, learning, and fellowship.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activities.map((act) => {
          const isRegistered = registeredIds.includes(act.id);
          const percentFull = Math.min(100, (act.registeredCount / act.capacity) * 100);

          return (
            <div key={act.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-slate-900 p-8 flex flex-col items-center justify-center text-center text-white">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                  <i className={`fa-solid ${getActivityTypeIcon(act.type)} text-slate-900 text-3xl`}></i>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-1">{act.type}</div>
                <div className="text-xs text-slate-400">{act.location}</div>
              </div>
              
              <div className="p-8 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{act.title}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <i className="fa-solid fa-clock mr-2 text-amber-600"></i>
                      {new Date(act.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-6">{act.description}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {act.requirements.map((req, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        <i className="fa-solid fa-circle-check mr-1 text-slate-400"></i> {req}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                      <span>Capacity</span>
                      <span>{act.registeredCount} / {act.capacity} Registered</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${percentFull > 80 ? 'bg-amber-600' : 'bg-blue-500'}`}
                        style={{ width: `${percentFull}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  {isRegistered ? (
                    <div className="flex items-center space-x-3">
                      <button 
                        disabled 
                        className="flex-1 bg-emerald-100 text-emerald-700 font-bold py-3 rounded-xl border border-emerald-200"
                      >
                        <i className="fa-solid fa-check mr-2"></i> Registered
                      </button>
                      <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200" title="Download Confirmation">
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRegister(act.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>One-Click Register</span>
                      <i className="fa-solid fa-bolt-lightning text-amber-300"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scaleUp">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-check text-4xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-slate-500 mb-8">We've reserved your spot. You will receive an email confirmation shortly.</p>
            <button 
              onClick={() => setShowConfirmation(null)}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Great, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
