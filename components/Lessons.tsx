
import React, { useState } from 'react';
import { Lesson } from '../types';

interface LessonsProps {
  lessons: Lesson[];
  onComplete: (id: string) => void;
}

const Lessons: React.FC<LessonsProps> = ({ lessons, onComplete }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filter, setFilter] = useState<'All' | 'Junior' | 'Senior'>('All');

  const filteredLessons = filter === 'All' 
    ? lessons 
    : lessons.filter(l => l.level === filter);

  if (selectedLesson) {
    return (
      <div className="animate-slideUp">
        <button 
          onClick={() => setSelectedLesson(null)}
          className="mb-6 flex items-center text-slate-600 hover:text-slate-900 font-medium"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Back to Lessons
        </button>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{selectedLesson.level}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-300 text-xs">{selectedLesson.topic}</span>
            </div>
            <h1 className="text-3xl font-bold">{selectedLesson.title}</h1>
          </div>

          <div className="p-8">
            {selectedLesson.videoUrl && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-slate-200">
                <iframe 
                  className="w-full h-full"
                  src={selectedLesson.videoUrl} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                {selectedLesson.content}
              </p>
            </div>

            <div className="mt-12 flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedLesson.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                  <i className={`fa-solid ${selectedLesson.completed ? 'fa-check' : 'fa-circle-check'} text-xl`}></i>
                </div>
                <div>
                  <div className="font-bold">Mark as Finished</div>
                  <div className="text-sm text-slate-500">Track your progress toward certification.</div>
                </div>
              </div>
              <button 
                disabled={selectedLesson.completed}
                onClick={() => {
                  onComplete(selectedLesson.id);
                  setSelectedLesson({...selectedLesson, completed: true});
                }}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  selectedLesson.completed 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                }`}
              >
                {selectedLesson.completed ? 'Completed' : 'Complete Lesson'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Church Heritage Lessons</h1>
          <p className="text-slate-500">Discover the pillars of our faith through history.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          {(['All', 'Junior', 'Senior'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === lvl ? 'bg-amber-500 text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div 
            key={lesson.id} 
            className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
            onClick={() => setSelectedLesson(lesson)}
          >
            <div className="h-32 bg-slate-900 p-6 flex items-end relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                YEAR {lesson.year}
              </div>
              <span className="text-amber-500 text-4xl opacity-20 absolute -bottom-2 -left-2 rotate-12">
                <i className="fa-solid fa-scroll"></i>
              </span>
              <div className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase self-start mb-auto">
                {lesson.level}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{lesson.title}</h3>
                {lesson.completed && <i className="fa-solid fa-circle-check text-emerald-500"></i>}
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{lesson.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-slate-400">{lesson.topic}</span>
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  Start Learning <i className="fa-solid fa-chevron-right ml-1 text-xs text-amber-500 group-hover:translate-x-1 transition-transform"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
