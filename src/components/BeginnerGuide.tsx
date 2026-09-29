import React, { useState } from 'react';
import { GUIDE_PHASES, GuideStep } from '../data/guideSteps';
import { 
  BookOpen, Terminal, CheckCircle2, AlertTriangle, Wrench, 
  Copy, Check, ArrowRight, ArrowLeft, Monitor, ShieldCheck, 
  ExternalLink, Layers, Sparkles 
} from 'lucide-react';

export const BeginnerGuide: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const step: GuideStep = GUIDE_PHASES[currentPhaseIndex];

  const handleCopyCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-sm font-bold text-white">Beginner DevOps Teaching Guide (Phases 1 – 10)</h2>
            <p className="text-[11px] text-slate-400">Step-by-step beginner instructions formatted with WHAT, WHY, HOW, COMMAND, VERIFY, and COMMON ERRORS.</p>
          </div>
        </div>

        {/* Phase Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPhaseIndex(prev => Math.max(0, prev - 1))}
            disabled={currentPhaseIndex === 0}
            className={`p-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              currentPhaseIndex === 0 
                ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-semibold text-slate-300">
            Phase {step.phase} / {GUIDE_PHASES.length}
          </span>
          <button
            onClick={() => setCurrentPhaseIndex(prev => Math.min(GUIDE_PHASES.length - 1, prev + 1))}
            disabled={currentPhaseIndex === GUIDE_PHASES.length - 1}
            className={`p-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              currentPhaseIndex === GUIDE_PHASES.length - 1 
                ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Phase Sidebar Selector */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/40 overflow-y-auto p-2 space-y-1">
          {GUIDE_PHASES.map((p, idx) => {
            const isSelected = idx === currentPhaseIndex;
            return (
              <button
                key={p.phase}
                onClick={() => setCurrentPhaseIndex(idx)}
                className={`w-full text-left p-3 rounded-lg text-xs font-medium transition flex items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                  isSelected ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'
                }`}>
                  {p.phase}
                </span>
                <div className="overflow-hidden">
                  <div className="font-semibold truncate">{p.title.split(':')[1]?.trim() || p.title}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {p.runIn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Detailed Guide */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Phase Header Card */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Phase {step.phase} of 10
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1.5 ${
                step.runIn === 'Windows PowerShell'
                  ? 'bg-sky-950/80 text-sky-300 border-sky-800'
                  : step.runIn === 'Jenkins Server'
                  ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
              }`}>
                <Monitor className="w-3.5 h-3.5" />
                <span>RUN IN: {step.runIn}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{step.title}</h2>
            <p className="text-xs text-slate-400">{step.shortDescription}</p>
          </div>

          {/* WHAT & WHY Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>WHAT ARE WE DOING?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{step.what}</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>WHY ARE WE DOING IT?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{step.why}</p>
            </div>
          </div>

          {/* HOW Section */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>HOW ARE WE DOING IT?</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{step.how}</p>
          </div>

          {/* EXACT COMMAND EXECUTION CARD */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  EXACT COMMANDS TO RUN
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({step.runIn})
                </span>
              </div>
              <button
                onClick={() => handleCopyCommand(step.command, step.phase)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded text-xs font-medium transition cursor-pointer"
              >
                {copiedIndex === step.phase ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedIndex === step.phase ? 'Copied!' : 'Copy Commands'}</span>
              </button>
            </div>
            <div className="p-4 bg-slate-950 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre">
              {step.command}
            </div>
          </div>

          {/* EXPECTED RESULT & HOW TO VERIFY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>EXPECTED RESULT</span>
              </h3>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                {step.expectedResult}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>HOW TO VERIFY IT WORKED</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                {step.howToVerify}
              </p>
            </div>
          </div>

          {/* COMMON ERROR & FIX */}
          <div className="bg-rose-950/20 border border-rose-900/60 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>COMMON ERROR & HOW TO FIX IT</span>
            </div>
            <div className="text-xs text-rose-200/90 font-mono bg-rose-950/40 p-2.5 rounded border border-rose-900/40">
              <strong>Error:</strong> {step.commonError}
            </div>
            <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded border border-slate-800 flex items-start gap-2">
              <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Solution / Fix:</strong> {step.fix}
              </div>
            </div>
          </div>

          {/* Bottom Next Phase Action */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentPhaseIndex(prev => Math.max(0, prev - 1))}
              disabled={currentPhaseIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentPhaseIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Phase</span>
            </button>

            {currentPhaseIndex < GUIDE_PHASES.length - 1 ? (
              <button
                onClick={() => setCurrentPhaseIndex(prev => Math.min(GUIDE_PHASES.length - 1, prev + 1))}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <span>Proceed to Phase {currentPhaseIndex + 2}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>All 10 Phases Ready for College Review!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
