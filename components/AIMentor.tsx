
import React, { useState, useRef, useEffect } from 'react';
import { askHeritageExpert } from '../services/geminiService';

const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Adventist Heritage Mentor. Feel free to ask me anything about church history, our pioneers, or doctrines." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const answer = await askHeritageExpert(userText);
    setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    setLoading(false);
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto flex flex-col h-[calc(100vh-160px)]">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Heritage Mentor</h1>
          <p className="text-slate-500">Ask any questions about Adventist history.</p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
          <i className="fa-solid fa-sparkles mr-2"></i> Powered by Gemini
        </div>
      </header>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-1 shadow-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white ml-3' : 'bg-slate-900 text-amber-500 mr-3'
                }`}>
                  <i className={`fa-solid ${m.role === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about 1844, pioneers, or Ellen White..."
            className="flex-1 py-4 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-slate-200 disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {['What happened in 1844?', 'Who was William Miller?', 'Why do we keep the Sabbath?'].map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => setInput(suggestion)}
            className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIMentor;
