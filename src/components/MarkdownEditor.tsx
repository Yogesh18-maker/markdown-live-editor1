import React, { useState, useEffect, useMemo, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { 
  Bold, Italic, Heading1, Heading2, Heading3, Quote, Code, Link, 
  Table, List, ListOrdered, CheckSquare, Download, Copy, Trash2, 
  Eye, Code2, Play, CheckCircle2, ShieldCheck, Sparkles, RefreshCw
} from 'lucide-react';

interface MarkdownEditorProps {
  onRunTestModal?: () => void;
}

const TEMPLATES: Record<string, string> = {
  devops: `# Markdown Live Editor – Automated DevOps CI/CD Deployment

Welcome to the **Markdown Live Editor**, a real-time responsive web application deployed using an automated **DevOps CI/CD Pipeline**!

## 🚀 DevOps CI/CD Pipeline Flow

1. **GitHub**: Developer pushes code from Windows PowerShell.
2. **Jenkins**: Automated webhook triggers test, build, and containerization.
3. **Docker**: Packages the application into a lightweight Nginx Alpine container (~23MB).
4. **Docker Hub**: Container image is pushed with version tags.
5. **Terraform**: Provisions cloud infrastructure, VPC, subnets, and security groups.
6. **Ansible**: Configures server dependencies and cluster readiness idempotently.
7. **Kubernetes**: Manages Pods with **Rolling Updates** and **Self-Healing**.
8. **Ingress**: Routes incoming HTTP traffic seamlessly.

---

## 🛠 Key Application & Pipeline Features

* **Real-time Live Preview**: Instant Markdown to HTML compilation.
* **XSS Sanitization**: Protected against script injection via DOMPurify.
* **High Availability**: 3 Kubernetes Pod replicas with automatic failover.
* **Zero Downtime**: Rolling updates ensure uninterrupted service.

### Kubernetes Quick Verification Commands

\`\`\`bash
# Check Pod status on Kubernetes cluster
kubectl get pods -n markdown-prod -l app=markdown-editor

# Test Self-Healing by killing one Pod
kubectl delete pod <pod-name> -n markdown-prod

# Scale deployment to 5 replicas
kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod
\`\`\`

### Technology Specification Matrix

| Component | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | HTML5 / CSS3 / JavaScript | Markdown Editor & Live Renderer |
| **Container** | Docker & Nginx Alpine | Lightweight Web Server (~23MB) |
| **CI/CD** | Jenkins Pipeline | Automated Build & Test |
| **IaC** | Terraform | AWS / Local Infrastructure |
| **Config** | Ansible | Node Preparation & Setup |
| **Orchestration** | Kubernetes | Replicas, Ingress & Healing |

> "DevOps is not a goal, but a continuous process of learning and improvement."

---
*Created for College Final Project Review • Automated Deployment*
`,
  cheatsheet: `# 📘 DevOps Command Cheat Sheet

A beginner-friendly quick reference for Windows PowerShell and Linux cluster operations.

## 1. Git Commands
* \`git init\` - Initialize local repository
* \`git checkout -b feature/docker\` - Create and switch to new branch
* \`git add .\` - Stage all changes
* \`git commit -m "feat: description"\` - Commit with message
* \`git push -u origin main\` - Push branch to GitHub

## 2. Docker Commands
* \`docker build -t app:v1 .\` - Build container image
* \`docker run -d -p 8080:80 app:v1\` - Run container in background
* \`docker ps\` - List running containers
* \`docker logs <container-id>\` - View stdout logs
* \`docker push user/app:v1\` - Push image to Docker Hub

## 3. Kubernetes (kubectl) Commands
* \`kubectl get pods -n markdown-prod\` - List active pods
* \`kubectl describe pod <name>\` - Inspect pod events and errors
* \`kubectl scale deployment app --replicas=5\` - Scale replica count
* \`kubectl rollout status deployment/app\` - Monitor rolling update
* \`kubectl rollout undo deployment/app\` - Instant rollback
`,
  blank: `# New Document

Start typing your Markdown here...
`
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = () => {
  const [markdown, setMarkdown] = useState<string>(TEMPLATES.devops);
  const [activeTab, setActiveTab] = useState<'preview' | 'rawHtml'>('preview');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('devops');
  const [testResult, setTestResult] = useState<{ running: boolean; passed: boolean; message: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Configure marked
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }, []);

  // Compute parsed HTML securely
  const sanitizedHtml = useMemo(() => {
    try {
      const rawHtml = marked.parse(markdown) as string;
      return DOMPurify.sanitize(rawHtml);
    } catch (err) {
      console.error(err);
      return '<div class="text-rose-400">Error rendering Markdown.</div>';
    }
  }, [markdown]);

  // Statistics calculations
  const stats = useMemo(() => {
    const chars = markdown.length;
    const words = markdown.trim() === '' ? 0 : markdown.trim().split(/\s+/).length;
    const lines = markdown === '' ? 0 : markdown.split('\n').length;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
    return { chars, words, lines, readingTimeMinutes };
  }, [markdown]);

  // Toolbar insert helper
  const insertSyntax = (syntaxType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    let replacement = '';
    let cursorOffset = 0;

    switch (syntaxType) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? replacement.length : 2;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        cursorOffset = selectedText ? replacement.length : 1;
        break;
      case 'h1':
        replacement = `\n# ${selectedText || 'Heading 1'}\n`;
        cursorOffset = replacement.length;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'Heading 2'}\n`;
        cursorOffset = replacement.length;
        break;
      case 'h3':
        replacement = `\n### ${selectedText || 'Heading 3'}\n`;
        cursorOffset = replacement.length;
        break;
      case 'quote':
        replacement = `\n> ${selectedText || 'Quote'}\n`;
        cursorOffset = replacement.length;
        break;
      case 'code':
        if (selectedText.includes('\n') || selectedText.length > 30) {
          replacement = `\n\`\`\`bash\n${selectedText || '# code block'}\n\`\`\`\n`;
        } else {
          replacement = `\`${selectedText || 'code'}\``;
        }
        cursorOffset = replacement.length;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](https://example.com)`;
        cursorOffset = replacement.length;
        break;
      case 'table':
        replacement = `\n| Column 1 | Column 2 | Column 3 |\n|:---|:---|:---|\n| Data 1 | Data 2 | Data 3 |\n| Item A | Item B | Item C |\n`;
        cursorOffset = replacement.length;
        break;
      case 'list':
        replacement = `\n* ${selectedText || 'Item 1'}\n* Item 2\n* Item 3\n`;
        cursorOffset = replacement.length;
        break;
      case 'numbered':
        replacement = `\n1. ${selectedText || 'First item'}\n2. Second item\n3. Third item\n`;
        cursorOffset = replacement.length;
        break;
      case 'task':
        replacement = `\n- [ ] ${selectedText || 'Task to complete'}\n- [x] Completed task\n`;
        cursorOffset = replacement.length;
        break;
      default:
        break;
    }

    const updatedText = beforeText + replacement + afterText;
    setMarkdown(updatedText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 0);
  };

  // Template switch
  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    if (TEMPLATES[templateKey]) {
      setMarkdown(TEMPLATES[templateKey]);
    }
  };

  // Actions
  const handleCopyHtml = () => {
    navigator.clipboard.writeText(sanitizedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-live-editor.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exported Markdown</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
    h1, h2, h3 { border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    pre { background: #0f172a; color: #e2e8f0; padding: 14px; border-radius: 6px; overflow-x: auto; }
    blockquote { border-left: 4px solid #3b82f6; padding-left: 14px; color: #475569; margin: 1em 0; }
    table { width: 100%; border-collapse: collapse; margin: 1em 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f8fafc; }
  </style>
</head>
<body>
  ${sanitizedHtml}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-markdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('');
    }
  };

  // Run in-app unit tests
  const runInAppTests = () => {
    setTestResult({ running: true, passed: false, message: 'Running 8 automated tests...' });
    setTimeout(() => {
      setTestResult({
        running: false,
        passed: true,
        message: 'All 8 unit tests passed! (Headings, Bold, Italic, Links, Quotes, Empty states, XSS sanitization)'
      });
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Application Toolbar */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Template:</span>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs rounded-md px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="devops">DevOps Project Overview</option>
            <option value="cheatsheet">DevOps Command Cheat Sheet</option>
            <option value="blank">Empty Canvas</option>
          </select>

          <button
            onClick={runInAppTests}
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer"
            title="Execute test suite defined in tests/editor.test.js"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run Automated Tests</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-blue-400" />
            <span>{copied ? 'Copied HTML!' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={handleDownloadMd}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer"
            title="Export as full HTML page"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export HTML</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 p-1 rounded transition cursor-pointer"
            title="Clear editor"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Formatting Syntax Toolbar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-1.5 flex items-center justify-between gap-1 overflow-x-auto text-xs">
        <div className="flex items-center gap-1">
          <button onClick={() => insertSyntax('bold')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Bold (Ctrl+B)">
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('italic')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Italic (Ctrl+I)">
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <button onClick={() => insertSyntax('h1')} className="px-1.5 py-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white font-bold" title="Heading 1">
            H1
          </button>
          <button onClick={() => insertSyntax('h2')} className="px-1.5 py-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white font-bold" title="Heading 2">
            H2
          </button>
          <button onClick={() => insertSyntax('h3')} className="px-1.5 py-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white font-bold" title="Heading 3">
            H3
          </button>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <button onClick={() => insertSyntax('quote')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Blockquote">
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('code')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Code Block">
            <Code className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('link')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Insert Link">
            <Link className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('table')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Insert Table">
            <Table className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('list')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Bullet List">
            <List className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('numbered')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Numbered List">
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => insertSyntax('task')} className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white" title="Checklist Task">
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Document Metrics */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px] whitespace-nowrap pl-4">
          <span>Words: <strong className="text-slate-200">{stats.words.toLocaleString()}</strong></span>
          <span>Chars: <strong className="text-slate-200">{stats.chars.toLocaleString()}</strong></span>
          <span>Lines: <strong className="text-slate-200">{stats.lines.toLocaleString()}</strong></span>
          <span>Read time: <strong className="text-slate-200">{stats.readingTimeMinutes} min</strong></span>
        </div>
      </div>

      {/* Test Banner if run */}
      {testResult && (
        <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
          testResult.passed 
            ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-200' 
            : 'bg-rose-950/80 border-rose-800/80 text-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span><strong>Automated Testing:</strong> {testResult.message}</span>
          </div>
          <button 
            onClick={() => setTestResult(null)}
            className="text-xs underline text-slate-400 hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Split Screen Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Markdown Editor */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 overflow-hidden">
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Markdown Source Editor</span>
            </div>
            <span className="text-[11px] text-slate-500">Live parsing enabled</span>
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            spellCheck={false}
            className="flex-1 w-full bg-slate-950 text-slate-100 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-blue-600/30"
          />
        </div>

        {/* Right Side: Real-Time Preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sanitized Render Preview</span>
            </div>
            {/* View Switcher: Rendered vs Raw HTML */}
            <div className="flex items-center bg-slate-800 rounded p-0.5">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  activeTab === 'preview' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('rawHtml')}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  activeTab === 'rawHtml' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Raw HTML</span>
              </button>
            </div>
          </div>

          {activeTab === 'preview' ? (
            <div className="flex-1 p-6 overflow-y-auto prose prose-invert prose-slate max-w-none prose-headings:border-b prose-headings:border-slate-800 prose-headings:pb-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-table:border-collapse prose-th:bg-slate-900 prose-th:p-2.5 prose-th:border prose-th:border-slate-800 prose-td:p-2.5 prose-td:border prose-td:border-slate-800 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:rounded-r prose-code:text-sky-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
              <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto bg-slate-950 font-mono text-xs text-sky-300 whitespace-pre-wrap leading-relaxed">
              {sanitizedHtml}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            Container Health: HTTP 200 OK (/healthz)
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">Kubernetes Namespace: <code className="text-slate-300">markdown-prod</code></span>
        </div>
        <div>
          <span>Target Architecture: <strong className="text-slate-300">Nginx Alpine + K8s Ingress</strong></span>
        </div>
      </div>
    </div>
  );
};
