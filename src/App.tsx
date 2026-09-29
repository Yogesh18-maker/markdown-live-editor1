import React, { useState } from 'react';
import { 
  Code, Activity, BookOpen, Folder, GraduationCap, FileText, 
  Archive, ExternalLink, Terminal, ShieldCheck, CheckCircle2, Play 
} from 'lucide-react';
import JSZip from 'jszip';
import { MarkdownEditor } from './components/MarkdownEditor';
import { DevOpsSimulator } from './components/DevOpsSimulator';
import { BeginnerGuide } from './components/BeginnerGuide';
import { ProjectFilesViewer } from './components/ProjectFilesViewer';
import { VivaPreparation } from './components/VivaPreparation';
import { ProjectReportViewer } from './components/ProjectReportViewer';
import { PROJECT_FILES } from './data/projectFiles';

type ActiveTab = 'editor' | 'simulator' | 'guide' | 'files' | 'viva' | 'report';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('editor');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipDownloaded, setZipDownloaded] = useState<boolean>(false);

  // Download complete project ZIP
  const handleDownloadFullProject = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'markdown-live-editor-devops-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setZipDownloaded(true);
      setTimeout(() => setZipDownloaded(false), 3000);
    } catch (err) {
      console.error('Error generating project ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Universal Top Application Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            &#9998;
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                Markdown Live Editor
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                DevOps Automated Pipeline
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              GitHub &bull; Jenkins &bull; Docker &bull; Terraform &bull; Ansible &bull; Kubernetes &bull; Ingress
            </p>
          </div>
        </div>

        {/* Global Quick Action: Download Project ZIP */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadFullProject}
            disabled={isZipping}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
            title="Download full project archive with all files and folders"
          >
            <Archive className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isZipping ? 'Creating ZIP...' : zipDownloaded ? 'Downloaded!' : 'Download Project (.ZIP)'}
            </span>
            <span className="sm:hidden">.ZIP</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-Header Tabs */}
      <nav className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 flex items-center gap-1 overflow-x-auto shrink-0 text-xs">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'editor'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Markdown Live Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>DevOps & Cluster Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Beginner Guide (Phases 1–10)</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'files'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Folder className="w-3.5 h-3.5 text-amber-400" />
          <span>Project Codebase & Manifests</span>
        </button>

        <button
          onClick={() => setActiveTab('viva')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'viva'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          <span>Viva Voce & Exam Q&A</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition whitespace-nowrap cursor-pointer ${
            activeTab === 'report'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-rose-400" />
          <span>College Project Report</span>
        </button>
      </nav>

      {/* Main Workspace Render */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'editor' && <MarkdownEditor />}
        {activeTab === 'simulator' && <DevOpsSimulator />}
        {activeTab === 'guide' && <BeginnerGuide />}
        {activeTab === 'files' && <ProjectFilesViewer />}
        {activeTab === 'viva' && <VivaPreparation />}
        {activeTab === 'report' && <ProjectReportViewer />}
      </main>
    </div>
  );
}
