import React, { useState } from 'react';
import JSZip from 'jszip';
import { PROJECT_FILES, ProjectFile } from '../data/projectFiles';
import { 
  Folder, FileCode, Copy, Check, Download, Archive, Search, 
  ExternalLink, Code, Layers, FileText, CheckCircle2 
} from 'lucide-react';

export const ProjectFilesViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);

  // Filtered files
  const filteredFiles = PROJECT_FILES.filter(file => {
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    const matchesSearch = file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate and download full project ZIP using JSZip
  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add every file to the zip maintaining folder structure
      PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      // Generate zip file blob
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'markdown-live-editor-devops-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Bar with Search & Download ZIP */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-400" />
          <div>
            <h2 className="text-sm font-bold text-white">Project Source Code & DevOps Manifests</h2>
            <p className="text-[11px] text-slate-400">Complete, runnable directory structure ready for Windows, GitHub, and Kubernetes.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
            title="Download entire codebase with all directories in a single ZIP file"
          >
            <Archive className="w-4 h-4" />
            <span>{isZipping ? 'Generating ZIP...' : zipSuccess ? 'Downloaded!' : 'Download Complete Project (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'app', label: 'Application (HTML/CSS/JS)' },
            { id: 'tests', label: 'Tests' },
            { id: 'docker', label: 'Docker' },
            { id: 'jenkins', label: 'Jenkins' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'ansible', label: 'Ansible' },
            { id: 'docs', label: 'Docs' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search file name or path..."
            className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main File Explorer & Code Pane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: File Tree List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/40 flex flex-col overflow-y-auto">
          <div className="p-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
            Files ({filteredFiles.length})
          </div>
          <div className="divide-y divide-slate-800/60">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 flex flex-col gap-1 transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/15 border-l-4 border-blue-500 text-white'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="font-mono text-xs font-medium truncate">{file.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 pl-6">
                    {file.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer & Actions */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* File Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white">{selectedFile.path}</span>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                  {selectedFile.language}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded text-xs font-medium transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadSingle}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded text-xs font-medium transition cursor-pointer"
                title="Download this single file"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Code Body with Line Numbers */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 bg-slate-950">
            <pre className="whitespace-pre">
              {selectedFile.content.split('\n').map((line, index) => (
                <div key={index} className="flex hover:bg-slate-900/60 px-2 py-0.5 rounded">
                  <span className="w-10 shrink-0 text-slate-600 select-none text-right pr-4 font-mono text-[11px]">
                    {index + 1}
                  </span>
                  <span className="flex-1 overflow-x-visible">{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
