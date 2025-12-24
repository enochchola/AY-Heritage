
import React, { useState } from 'react';
import { Exam, Question } from '../types';

interface ExamsProps {
  exams: Exam[];
}

const Exams: React.FC<ExamsProps> = ({ exams }) => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (!activeExam) return;
    const currentQuestion = activeExam.questions[currentQuestionIndex];
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: optionIdx });
  };

  const nextQuestion = () => {
    if (!activeExam) return;
    if (currentQuestionIndex < activeExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    if (!activeExam) return;
    let correctCount = 0;
    activeExam.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / activeExam.questions.length) * 100;
    setScore(finalScore);
    setIsFinished(true);
  };

  if (activeExam && !isFinished) {
    const q = activeExam.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeExam.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">In Progress</div>
              <h2 className="text-xl font-bold">{activeExam.title}</h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Question</div>
              <div className="text-xl font-bold">{currentQuestionIndex + 1} / {activeExam.questions.length}</div>
            </div>
          </div>

          <div className="h-2 w-full bg-slate-100">
            <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">{q.text}</h3>
            
            <div className="space-y-4">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center group ${
                    userAnswers[q.id] === idx 
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-inner' 
                      : 'border-slate-100 hover:border-blue-300 bg-white text-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold border-2 transition-colors ${
                    userAnswers[q.id] === idx 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-slate-200 text-slate-400 group-hover:border-blue-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                disabled={userAnswers[q.id] === undefined}
                onClick={nextQuestion}
                className={`px-10 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all ${
                  userAnswers[q.id] === undefined
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                }`}
              >
                <span>{currentQuestionIndex === activeExam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const passed = score >= (activeExam?.passingScore || 70);
    return (
      <div className="max-w-2xl mx-auto py-12 animate-scaleUp">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            <i className={`fa-solid ${passed ? 'fa-award' : 'fa-circle-xmark'} text-5xl`}></i>
          </div>
          <h2 className="text-4xl font-bold mb-2">{passed ? 'Excellent!' : 'Keep Trying!'}</h2>
          <p className="text-slate-500 text-lg mb-8">You scored {score.toFixed(0)}% in {activeExam?.title}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase mb-1">Score</div>
              <div className={`text-3xl font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>{score.toFixed(0)}%</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase mb-1">Status</div>
              <div className={`text-3xl font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>{passed ? 'PASSED' : 'FAILED'}</div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {!passed && (
              <button 
                onClick={() => startExam(activeExam!)}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Retry Exam
              </button>
            )}
            <button 
              onClick={() => setActiveExam(null)}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Certification Exams</h1>
        <p className="text-slate-500">Validate your heritage knowledge and earn badges.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <i className="fa-solid fa-graduation-cap text-amber-600 text-2xl"></i>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">
                {exam.questions.length} Questions
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{exam.title}</h3>
            <p className="text-sm text-slate-500 mb-8">
              Passing score: {exam.passingScore}% • Time limit: {exam.timeLimit} mins
            </p>

            <button 
              onClick={() => startExam(exam)}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all"
            >
              <span>Start Exam</span>
              <i className="fa-solid fa-play text-amber-400"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
