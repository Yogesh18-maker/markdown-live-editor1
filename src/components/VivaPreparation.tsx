import React, { useState } from 'react';
import { VIVA_QUESTIONS, VivaQuestion } from '../data/vivaQuestions';
import { 
  GraduationCap, Search, CheckCircle2, HelpCircle, ChevronDown, 
  ChevronUp, Sparkles, BookCheck, Shuffle, RotateCcw, Award 
} from 'lucide-react';

export const VivaPreparation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | '2-mark' | '5-mark' | '10-mark' | 'viva'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('2m-1');
  const [flashcardMode, setFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Topics list
  const topics = ['All', 'DevOps & CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Git & Jenkins', 'Security'];

  // Filtered Questions
  const filteredQuestions = VIVA_QUESTIONS.filter(q => {
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTopic && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Flashcard controls
  const currentCard = filteredQuestions[flashcardIndex] || filteredQuestions[0];

  const handleNextCard = () => {
    setShowAnswer(false);
    setFlashcardIndex(prev => (prev + 1) % (filteredQuestions.length || 1));
  };

  const handleRandomCard = () => {
    setShowAnswer(false);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setFlashcardIndex(randomIndex);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-sm font-bold text-white">College Review & Viva Voce Exam Center</h2>
            <p className="text-[11px] text-slate-400">Comprehensive Question Bank: 15 (2-mark), 15 (5-mark), 10 (10-mark), and 35+ Oral Viva Questions with Model Answers.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setFlashcardMode(!flashcardMode); setShowAnswer(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
              flashcardMode 
                ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{flashcardMode ? 'Back to All Questions' : 'Practice Flashcard Mode'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Questions' },
            { id: '2-mark', label: '2-Mark (15 Qs)' },
            { id: '5-mark', label: '5-Mark (15 Qs)' },
            { id: '10-mark', label: '10-Mark (10 Qs)' },
            { id: 'viva', label: 'Viva Voce (35 Qs)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id as any); setFlashcardIndex(0); }}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Topic dropdown and Search input */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedTopic}
            onChange={(e) => { setSelectedTopic(e.target.value); setFlashcardIndex(0); }}
            className="bg-slate-900 border border-slate-700 text-xs rounded-md px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {topics.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>
            ))}
          </select>

          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Main View Area: Flashcard or Question Accordion */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {flashcardMode ? (
          /* Flashcard Practice Mode */
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[420px] space-y-4">
            <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="bg-slate-800 px-2.5 py-0.5 rounded-full font-semibold text-amber-400">
                    {currentCard?.category.toUpperCase()} • {currentCard?.topic}
                  </span>
                  <span>Card {flashcardIndex + 1} of {filteredQuestions.length}</span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
                  {currentCard?.question}
                </h3>

                {showAnswer ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap animate-fadeIn">
                    {currentCard?.answer}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs italic">
                    (Click "Reveal Model Answer" below to test your understanding)
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-800/80">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  {showAnswer ? 'Hide Answer' : 'Reveal Model Answer'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomCard}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Random Question"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextCard}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer shadow-md"
                  >
                    Next Question &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Accordion Question List */
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
              <span>Showing <strong>{filteredQuestions.length}</strong> exam questions</span>
              <span className="text-[11px] text-slate-500">Click any card to expand or collapse answer</span>
            </div>

            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id}
                  className={`border rounded-xl transition-all ${
                    isExpanded 
                      ? 'bg-slate-900 border-amber-500/60 shadow-md ring-1 ring-amber-500/20' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left p-4 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                        q.category === '2-mark' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                        q.category === '5-mark' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                        q.category === '10-mark' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {q.category}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white leading-snug">
                          {q.question}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Topic: {q.topic}
                        </div>
                      </div>
                    </div>

                    <div className="text-slate-400 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3">
                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {q.answer}
                      </div>

                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div className="bg-amber-950/20 border border-amber-900/40 p-2.5 rounded-lg flex items-center gap-2 flex-wrap text-[11px] text-amber-200">
                          <strong className="text-amber-400 font-semibold">Key Viva Keywords:</strong>
                          {q.keyPoints.map((kp, idx) => (
                            <span key={idx} className="bg-amber-900/40 px-2 py-0.5 rounded font-mono text-[10px]">
                              {kp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-16 text-slate-500 text-xs">
                No questions found matching your filter criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
