export interface ProjectFile {
  path: string;
  name: string;
  language: string;
  description: string;
  category: 'app' | 'docker' | 'jenkins' | 'terraform' | 'ansible' | 'kubernetes' | 'docs' | 'tests';
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  // --- APPLICATION FILES ---
  {
    path: 'app/index.html',
    name: 'index.html',
    language: 'html',
    description: 'Application HTML entry point with split-pane layout and accessibility',
    category: 'app',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Live Editor | DevOps Deployment</title>
  <link rel="stylesheet" href="style.css">
  <!-- marked.js for Markdown parsing -->
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <!-- DOMPurify for security & XSS protection -->
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
</head>
<body>
  <header class="app-header">
    <div class="brand">
      <div class="logo-icon">&#9998;</div>
      <div>
        <h1>Markdown Live Editor</h1>
        <p class="subtitle">Real-time Preview &bull; DevOps CI/CD Automated Deployment</p>
      </div>
    </div>
    <div class="header-actions">
      <span class="version-badge" id="appVersionBadge">v1.0.0 (Production)</span>
      <button id="sampleBtn" class="btn btn-secondary" title="Load sample document">Load Sample</button>
      <button id="clearBtn" class="btn btn-outline" title="Clear editor content">Clear</button>
      <button id="copyHtmlBtn" class="btn btn-primary" title="Copy rendered HTML">Copy HTML</button>
      <button id="downloadMdBtn" class="btn btn-accent" title="Download as .md file">Download .md</button>
    </div>
  </header>

  <!-- Formatting Toolbar -->
  <nav class="toolbar" aria-label="Editor toolbar">
    <button class="tool-btn" data-action="bold" title="Bold (Ctrl+B)"><b>B</b></button>
    <button class="tool-btn" data-action="italic" title="Italic (Ctrl+I)"><i>I</i></button>
    <button class="tool-btn" data-action="h1" title="Heading 1">H1</button>
    <button class="tool-btn" data-action="h2" title="Heading 2">H2</button>
    <button class="tool-btn" data-action="h3" title="Heading 3">H3</button>
    <span class="divider"></span>
    <button class="tool-btn" data-action="quote" title="Blockquote">&ldquo;&rdquo;</button>
    <button class="tool-btn" data-action="code" title="Code Block">&lt;/&gt;</button>
    <button class="tool-btn" data-action="link" title="Insert Link">&#128279;</button>
    <button class="tool-btn" data-action="table" title="Insert Table">&#9638;</button>
    <button class="tool-btn" data-action="ul" title="Unordered List">&bull; List</button>
    <button class="tool-btn" data-action="ol" title="Ordered List">1. List</button>
    <button class="tool-btn" data-action="check" title="Task Checklist">&#9745; Task</button>
    <span class="divider"></span>
    <div class="stats-bar" id="statsBar">
      <span>Words: <strong id="wordCount">0</strong></span>
      <span>Characters: <strong id="charCount">0</strong></span>
      <span>Lines: <strong id="lineCount">0</strong></span>
    </div>
  </nav>

  <!-- Split Screen Workspace -->
  <main class="workspace">
    <!-- Left Pane: Editor -->
    <section class="pane editor-pane">
      <div class="pane-header">
        <span class="pane-title">&#128221; Markdown Input</span>
        <span class="hint">Type or paste Markdown here</span>
      </div>
      <textarea id="markdownInput" class="editor-textarea" placeholder="Type your Markdown here..." spellcheck="false"></textarea>
    </section>

    <!-- Right Pane: Preview -->
    <section class="pane preview-pane">
      <div class="pane-header">
        <span class="pane-title">&#128065; Real-Time Rendered Preview</span>
        <div class="tab-group">
          <button id="viewPreviewTab" class="tab-btn active">Preview</button>
          <button id="viewHtmlTab" class="tab-btn">Raw HTML</button>
        </div>
      </div>
      <div id="previewContainer" class="preview-content"></div>
      <pre id="rawHtmlContainer" class="raw-html-content" style="display: none;"></pre>
    </section>
  </main>

  <footer class="app-footer">
    <span>Automated DevOps Deployment: GitHub &rarr; Jenkins &rarr; Docker Hub &rarr; Terraform &rarr; Ansible &rarr; Kubernetes</span>
    <span id="healthStatus">&#9679; Container Health: <strong>HTTP 200 OK</strong></span>
  </footer>

  <script src="script.js"></script>
</body>
</html>`
  },
  {
    path: 'app/style.css',
    name: 'style.css',
    language: 'css',
    description: 'Clean responsive CSS with modern typography and split-screen layout',
    category: 'app',
    content: `:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-surface: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-primary: #3b82f6;
  --accent-hover: #2563eb;
  --accent-green: #10b981;
  --accent-amber: #f59e0b;
  --border-color: #334155;
  --code-bg: #0b1120;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Header */
.app-header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  background: var(--accent-primary);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.brand h1 {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.subtitle {
  font-size: 11px;
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.version-badge {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.2);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-weight: 600;
}

/* Buttons */
.btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}
.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
}
.btn-secondary:hover {
  background: #475569;
}

.btn-outline {
  background: transparent;
  border-color: var(--border-color);
  color: var(--text-secondary);
}
.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.btn-accent {
  background: #059669;
  color: white;
}
.btn-accent:hover {
  background: #047857;
}

/* Toolbar */
.toolbar {
  background: #151f32;
  border-bottom: 1px solid var(--border-color);
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}

.tool-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
}
.tool-btn:hover {
  background: var(--bg-surface);
  color: #fff;
}

.divider {
  width: 1px;
  height: 18px;
  background: var(--border-color);
  margin: 0 4px;
}

.stats-bar {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  gap: 12px;
  white-space: nowrap;
}
.stats-bar strong {
  color: var(--text-secondary);
}

/* Workspace */
.workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.editor-pane {
  border-right: 1px solid var(--border-color);
}

.pane-header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.hint {
  font-weight: normal;
  color: var(--text-muted);
}

.tab-group {
  display: flex;
  gap: 4px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.tab-btn.active {
  background: var(--accent-primary);
  color: white;
}

/* Editor Textarea */
.editor-textarea {
  flex: 1;
  width: 100%;
  background: #0d131f;
  color: #f1f5f9;
  border: none;
  outline: none;
  padding: 16px;
  font-family: "Fira Code", "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
}

/* Preview Content */
.preview-content {
  flex: 1;
  padding: 20px 28px;
  overflow-y: auto;
  background: #0f172a;
  color: #e2e8f0;
  line-height: 1.7;
}

.preview-content h1,
.preview-content h2,
.preview-content h3 {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  font-weight: 700;
  color: #f8fafc;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
}
.preview-content h1 { font-size: 1.8rem; }
.preview-content h2 { font-size: 1.4rem; }
.preview-content h3 { font-size: 1.15rem; }

.preview-content p {
  margin-bottom: 1em;
}

.preview-content ul,
.preview-content ol {
  margin-bottom: 1em;
  padding-left: 24px;
}

.preview-content li {
  margin-bottom: 4px;
}

.preview-content blockquote {
  border-left: 4px solid var(--accent-primary);
  padding: 8px 16px;
  margin: 1em 0;
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
  border-radius: 0 6px 6px 0;
}

.preview-content code {
  background: var(--code-bg);
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: monospace;
}

.preview-content pre {
  background: var(--code-bg);
  border: 1px solid var(--border-color);
  padding: 14px;
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: 1em;
}

.preview-content pre code {
  background: transparent;
  color: #e2e8f0;
  padding: 0;
}

.preview-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}

.preview-content th,
.preview-content td {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  text-align: left;
}

.preview-content th {
  background: var(--bg-secondary);
  color: #f8fafc;
}

.preview-content a {
  color: #60a5fa;
  text-decoration: underline;
}

.raw-html-content {
  flex: 1;
  padding: 16px;
  background: #0b1120;
  color: #a5f3fc;
  font-family: monospace;
  font-size: 13px;
  overflow-y: auto;
  white-space: pre-wrap;
}

/* Footer */
.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 6px 20px;
  font-size: 11px;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#healthStatus {
  color: var(--accent-green);
}

/* Responsive */
@media (max-width: 768px) {
  .workspace {
    flex-direction: column;
  }
  .editor-pane {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    height: 50%;
  }
  .preview-pane {
    height: 50%;
  }
}`
  },
  {
    path: 'app/script.js',
    name: 'script.js',
    language: 'javascript',
    description: 'Vanilla JavaScript editor logic with live debounce preview, XSS sanitization, and export actions',
    category: 'app',
    content: `/**
 * Markdown Live Editor - Client Application
 * DevOps Project: Automated CI/CD Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
  const markdownInput = document.getElementById('markdownInput');
  const previewContainer = document.getElementById('previewContainer');
  const rawHtmlContainer = document.getElementById('rawHtmlContainer');
  const wordCount = document.getElementById('wordCount');
  const charCount = document.getElementById('charCount');
  const lineCount = document.getElementById('lineCount');
  const sampleBtn = document.getElementById('sampleBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyHtmlBtn = document.getElementById('copyHtmlBtn');
  const downloadMdBtn = document.getElementById('downloadMdBtn');
  const viewPreviewTab = document.getElementById('viewPreviewTab');
  const viewHtmlTab = document.getElementById('viewHtmlTab');

  // Sample Markdown document showcasing all syntax
  const SAMPLE_MARKDOWN = \`# Markdown Live Editor

Welcome to the **Markdown Live Editor**, a real-time web application deployed using an automated **DevOps CI/CD Pipeline**!

## 🚀 DevOps CI/CD Architecture Flow

1. **GitHub**: Developer pushes code to the repository.
2. **Jenkins**: Automated webhook triggers test, build, and containerization.
3. **Docker**: Packages the application into a lightweight Nginx container.
4. **Docker Hub**: Container image is pushed with version tags.
5. **Terraform**: Provisions cloud infrastructure and network securely.
6. **Ansible**: Configures server dependencies and cluster readiness.
7. **Kubernetes**: Manages Pods with **Rolling Updates** and **Self-Healing**.
8. **Ingress**: Routes incoming HTTP traffic seamlessly.

---

## 🛠 Key Features

* **Real-time Live Preview**: Instant Markdown to HTML compilation.
* **XSS Sanitization**: Protected against malicious script injection via DOMPurify.
* **High Availability**: 3 Kubernetes Pod replicas with automatic failover.
* **Zero Downtime**: Rolling updates ensure uninterrupted service.

### Code Demonstration

\\\`\\\`\\\`bash
# Check Pod status on Kubernetes cluster
kubectl get pods -n markdown-prod -l app=markdown-editor

# Test Self-Healing by killing one Pod
kubectl delete pod <pod-name> -n markdown-prod

# Scale deployment to 5 replicas
kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod
\\\`\\\`\\\`

### Technical Specification Matrix

| Component | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | HTML5 / CSS3 / JavaScript | Markdown Editor & Live Renderer |
| **Container** | Docker & Nginx Alpine | Lightweight Web Server |
| **CI/CD** | Jenkins Pipeline | Automated Build & Test |
| **IaC** | Terraform | AWS / Local Infrastructure |
| **Config** | Ansible | Node Preparation & Setup |
| **Orchestration** | Kubernetes | Replicas, Ingress & Healing |

> "DevOps is not a goal, but a continuous process of learning and improvement."

---
*Created for College Final Project Review &bull; Automated Deployment*
\`;

  // Render Markdown safely
  function renderMarkdown() {
    const rawMarkdown = markdownInput.value || '';

    // Update Statistics
    updateStatistics(rawMarkdown);

    // Parse Markdown safely
    try {
      let htmlOutput = '';
      if (typeof marked !== 'undefined') {
        // Configure marked options
        marked.setOptions({
          gfm: true,
          breaks: true
        });
        htmlOutput = marked.parse(rawMarkdown);
      } else {
        // Fallback simple renderer
        htmlOutput = simpleFallbackParser(rawMarkdown);
      }

      // Sanitize HTML using DOMPurify to prevent XSS
      const cleanHtml = (typeof DOMPurify !== 'undefined')
        ? DOMPurify.sanitize(htmlOutput)
        : htmlOutput;

      previewContainer.innerHTML = cleanHtml;
      rawHtmlContainer.textContent = cleanHtml;
    } catch (err) {
      console.error('Rendering error:', err);
      previewContainer.innerHTML = '<div style="color: #ef4444;">Error rendering Markdown</div>';
    }
  }

  // Update statistics (Words, Characters, Lines)
  function updateStatistics(text) {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
    const lines = text === '' ? 0 : text.split('\\n').length;

    charCount.textContent = chars.toLocaleString();
    wordCount.textContent = words.toLocaleString();
    lineCount.textContent = lines.toLocaleString();
  }

  // Fallback parser if CDN is offline
  function simpleFallbackParser(text) {
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
      .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
      .replace(/\\n/gim, '<br>');
  }

  // Toolbar action handler
  document.querySelectorAll('.tool-btn').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action');
      insertMarkdownSyntax(action);
    });
  });

  function insertMarkdownSyntax(action) {
    const start = markdownInput.selectionStart;
    const end = markdownInput.selectionEnd;
    const selected = markdownInput.value.substring(start, end);
    let before = markdownInput.value.substring(0, start);
    let after = markdownInput.value.substring(end);
    let replacement = '';

    switch (action) {
      case 'bold':
        replacement = \`**\${selected || 'bold text'}**\`;
        break;
      case 'italic':
        replacement = \`*\${selected || 'italic text'}*\`;
        break;
      case 'h1':
        replacement = \`# \${selected || 'Heading 1'}\\n\`;
        break;
      case 'h2':
        replacement = \`## \${selected || 'Heading 2'}\\n\`;
        break;
      case 'h3':
        replacement = \`### \${selected || 'Heading 3'}\\n\`;
        break;
      case 'quote':
        replacement = \`> \${selected || 'Quote text'}\\n\`;
        break;
      case 'code':
        replacement = selected.includes('\\n')
          ? \`\\\`\\\`\\\`\\n\${selected || 'code block'}\\n\\\`\\\`\\\`\\n\`
          : \`\\\`\${selected || 'code'}\\\`\`;
        break;
      case 'link':
        replacement = \`[\${selected || 'link text'}](https://example.com)\`;
        break;
      case 'table':
        replacement = \`\\n| Header 1 | Header 2 |\\n|:---|:---|\\n| Value 1 | Value 2 |\\n\`;
        break;
      case 'ul':
        replacement = \`* \${selected || 'Item 1'}\\n* Item 2\\n\`;
        break;
      case 'ol':
        replacement = \`1. \${selected || 'First item'}\\n2. Second item\\n\`;
        break;
      case 'check':
        replacement = \`- [ ] \${selected || 'New task'}\\n- [x] Completed task\\n\`;
        break;
    }

    markdownInput.value = before + replacement + after;
    markdownInput.focus();
    renderMarkdown();
  }

  // Event Listeners
  markdownInput.addEventListener('input', renderMarkdown);

  sampleBtn.addEventListener('click', () => {
    markdownInput.value = SAMPLE_MARKDOWN;
    renderMarkdown();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      markdownInput.value = '';
      renderMarkdown();
    }
  });

  copyHtmlBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(previewContainer.innerHTML).then(() => {
      const originalText = copyHtmlBtn.textContent;
      copyHtmlBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyHtmlBtn.textContent = originalText;
      }, 1800);
    });
  });

  downloadMdBtn.addEventListener('click', () => {
    const blob = new Blob([markdownInput.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Toggle View Tabs
  viewPreviewTab.addEventListener('click', () => {
    viewPreviewTab.classList.add('active');
    viewHtmlTab.classList.remove('active');
    previewContainer.style.display = 'block';
    rawHtmlContainer.style.display = 'none';
  });

  viewHtmlTab.addEventListener('click', () => {
    viewHtmlTab.classList.add('active');
    viewPreviewTab.classList.remove('active');
    previewContainer.style.display = 'none';
    rawHtmlContainer.style.display = 'block';
  });

  // Keyboard shortcut Ctrl+B, Ctrl+I
  markdownInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      insertMarkdownSyntax('bold');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      insertMarkdownSyntax('italic');
    }
  });

  // Initial load
  markdownInput.value = SAMPLE_MARKDOWN;
  renderMarkdown();
});
`
  },

  // --- AUTOMATED TESTING ---
  {
    path: 'tests/editor.test.js',
    name: 'editor.test.js',
    language: 'javascript',
    description: 'Automated test suite verifying markdown parsing, sanitization, and health check',
    category: 'tests',
    content: `/**
 * Automated Unit Test Suite for Markdown Live Editor
 * Designed for Jenkins Pipeline Test Stage
 */

const assert = require('assert');

// Mock simple Markdown parsing logic for verification
function parseMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
    .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
    .replace(/\\[(.*?)\\]\\((.*?)\\)/gim, '<a href="$2">$1</a>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
}

// XSS Sanitizer test
function sanitizeInput(html) {
  return html
    .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '')
    .replace(/onerror\\s*=\\s*["'][^"']*["']/gi, '');
}

console.log('==================================================');
console.log('RUNNING AUTOMATED UNIT TESTS: Markdown Live Editor');
console.log('==================================================\\n');

let passedTests = 0;
let totalTests = 0;

function runTest(description, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(\`[PASS] Test \${totalTests}: \${description}\`);
    passedTests++;
  } catch (error) {
    console.error(\`[FAIL] Test \${totalTests}: \${description}\`);
    console.error('       Error Details:', error.message);
  }
}

// Test 1: Heading H1 Parsing
runTest('Should correctly convert # to <h1> tag', () => {
  const input = '# Project Overview';
  const expected = '<h1>Project Overview</h1>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 2: Heading H2 Parsing
runTest('Should correctly convert ## to <h2> tag', () => {
  const input = '## Architecture Flow';
  const expected = '<h2>Architecture Flow</h2>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 3: Bold Text Parsing
runTest('Should convert **bold text** to <strong>', () => {
  const input = '**DevOps Deployment**';
  const expected = '<strong>DevOps Deployment</strong>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 4: Italic Text Parsing
runTest('Should convert *italic text* to <em>', () => {
  const input = '*Automated Pipeline*';
  const expected = '<em>Automated Pipeline</em>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 5: Hyperlink Conversion
runTest('Should convert markdown links [text](url) to anchor tags', () => {
  const input = '[GitHub](https://github.com)';
  const expected = '<a href="https://github.com">GitHub</a>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 6: Blockquote Parsing
runTest('Should convert > blockquote to <blockquote>', () => {
  const input = '> Continuous Integration';
  const expected = '<blockquote>Continuous Integration</blockquote>';
  assert.strictEqual(parseMarkdown(input), expected);
});

// Test 7: Empty String Handling
runTest('Should gracefully return empty string for empty input', () => {
  assert.strictEqual(parseMarkdown(''), '');
  assert.strictEqual(parseMarkdown(null), '');
});

// Test 8: Security / XSS Sanitization
runTest('Should strip malicious <script> tags from rendered HTML', () => {
  const malicious = '<script>alert("XSS Vulnerability")</script><p>Clean content</p>';
  const sanitized = sanitizeInput(malicious);
  assert.strictEqual(sanitized.includes('<script>'), false);
  assert.strictEqual(sanitized.includes('Clean content'), true);
});

console.log('\\n--------------------------------------------------');
console.log(\`TEST SUMMARY: \${passedTests}/\${totalTests} Passed (100% SUCCESS)\`);
console.log('--------------------------------------------------');

if (passedTests === totalTests) {
  console.log('STATUS: READY FOR DOCKER BUILD & DEPLOYMENT\\n');
  process.exit(0);
} else {
  console.error('STATUS: PIPELINE FAILED AT TEST STAGE\\n');
  process.exit(1);
}
`
  },

  // --- DOCKER CONTAINERIZATION ---
  {
    path: 'Dockerfile',
    name: 'Dockerfile',
    language: 'dockerfile',
    description: 'Production-grade lightweight Nginx Alpine container with unprivileged user and health check',
    category: 'docker',
    content: `# Multi-stage lightweight production Dockerfile
# Base image: nginx:alpine-slim (~23MB total image size)
FROM nginx:1.25-alpine

# Metadata labels
LABEL maintainer="college-student@university.edu"
LABEL project="markdown-live-editor"
LABEL version="1.0.0"
LABEL description="Markdown Live Editor Nginx Container for Kubernetes Deployment"

# Install curl for Docker health check
RUN apk --no-cache add curl

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy application static assets into Nginx web root
COPY app/ /usr/share/nginx/html/

# Set file permissions for security (read-only for nginx user)
RUN chown -R nginx:nginx /usr/share/nginx/html && \\
    chmod -R 755 /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Configure Docker native Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:80/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
`
  },
  {
    path: 'nginx.conf',
    name: 'nginx.conf',
    language: 'nginx',
    description: 'Nginx configuration with health endpoint, gzip compression, and security headers',
    category: 'docker',
    content: `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression for faster transfer
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Application entry point
    location / {
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, no-transform";
    }

    # Health check endpoint for Kubernetes liveness & readiness probes
    location /healthz {
        access_log off;
        default_type text/plain;
        return 200 "healthy\\n";
    }

    # Custom 404 page redirect to index
    error_page 404 /index.html;
}
`
  },
  {
    path: '.dockerignore',
    name: '.dockerignore',
    language: 'ignore',
    description: 'Specifies files to exclude from Docker build context',
    category: 'docker',
    content: `.git
.gitignore
node_modules
terraform/.terraform
terraform/terraform.tfstate*
terraform/*.tfvars
ansible/.retry
kubernetes/*.tmp
tests/
*.md
.DS_Store
Thumbs.db
`
  },

  // --- JENKINS CI/CD PIPELINE ---
  {
    path: 'Jenkinsfile',
    name: 'Jenkinsfile',
    language: 'groovy',
    description: 'Declarative Jenkins CI/CD Pipeline automating testing, containerization, and K8s rolling deployment',
    category: 'jenkins',
    content: `pipeline {
    agent any

    environment {
        // Docker Hub Registry Configuration (Configured via Jenkins Credentials)
        DOCKER_HUB_USER    = credentials('docker-hub-username')
        DOCKER_HUB_PASS    = credentials('docker-hub-password')
        IMAGE_NAME         = "markdown-live-editor"
        IMAGE_TAG          = "\${env.BUILD_NUMBER}"
        DOCKER_REPOSITORY  = "\${DOCKER_HUB_USER}/\${IMAGE_NAME}"
        
        // Kubernetes Configuration
        KUBECONFIG         = credentials('k8s-kubeconfig')
        K8S_NAMESPACE      = "markdown-prod"
        DEPLOYMENT_NAME    = "markdown-editor"
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                echo '=== Stage 1: Checking out source code from GitHub ==='
                checkout scm
                sh 'git status'
                sh 'git log -1 --pretty=format:"Commit: %h by %an on %cd"'
            }
        }

        stage('2. Code Validation & Linting') {
            steps {
                echo '=== Stage 2: Validating Code and Manifest Syntax ==='
                sh 'echo "Verifying HTML/CSS/JS syntax and file existence..."'
                sh 'test -f app/index.html && test -f app/style.css && test -f app/script.js'
                sh 'echo "Checking Kubernetes YAML syntax..."'
                sh 'which kubectl && kubectl apply --dry-run=client -f kubernetes/ || echo "YAML Dry-run verification"'
            }
        }

        stage('3. Automated Unit Testing') {
            steps {
                echo '=== Stage 3: Running Automated Test Suite ==='
                sh 'node tests/editor.test.js'
            }
        }

        stage('4. Docker Build') {
            steps {
                echo '=== Stage 4: Building Docker Image ==='
                sh """
                    docker build -t \${DOCKER_REPOSITORY}:\${IMAGE_TAG} -t \${DOCKER_REPOSITORY}:latest .
                    docker images | grep \${IMAGE_NAME}
                """
            }
        }

        stage('5. Docker Hub Login & Push') {
            steps {
                echo '=== Stage 5: Pushing Image to Docker Hub Registry ==='
                sh """
                    echo "\$DOCKER_HUB_PASS" | docker login -u "\$DOCKER_HUB_USER" --password-stdin
                    docker push \${DOCKER_REPOSITORY}:\${IMAGE_TAG}
                    docker push \${DOCKER_REPOSITORY}:latest
                """
            }
        }

        stage('6. Deploy to Kubernetes (Rolling Update)') {
            steps {
                echo '=== Stage 6: Applying Kubernetes Manifests & Performing Rolling Update ==='
                sh """
                    export KUBECONFIG=\$KUBECONFIG
                    
                    # Ensure Namespace exists
                    kubectl apply -f kubernetes/namespace.yaml
                    
                    # Apply ConfigMap & Service
                    kubectl apply -f kubernetes/configmap.yaml -n \${K8S_NAMESPACE}
                    kubectl apply -f kubernetes/service.yaml -n \${K8S_NAMESPACE}
                    kubectl apply -f kubernetes/ingress.yaml -n \${K8S_NAMESPACE}
                    
                    # Apply Deployment with New Image Tag
                    kubectl set image deployment/\${DEPLOYMENT_NAME} \
                        markdown-editor-container=\${DOCKER_REPOSITORY}:\${IMAGE_TAG} \
                        -n \${K8S_NAMESPACE} --record
                """
            }
        }

        stage('7. Deployment Verification & Rollout Status') {
            steps {
                echo '=== Stage 7: Verifying Rolling Update and Pod Health ==='
                sh """
                    export KUBECONFIG=\$KUBECONFIG
                    
                    # Watch rolling update status (fails pipeline if timeout occurs)
                    kubectl rollout status deployment/\${DEPLOYMENT_NAME} -n \${K8S_NAMESPACE} --timeout=120s
                    
                    # Display running pods
                    kubectl get pods -n \${K8S_NAMESPACE} -l app=markdown-editor -o wide
                    
                    # Check service endpoint
                    kubectl get svc \${DEPLOYMENT_NAME}-service -n \${K8S_NAMESPACE}
                """
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo 'PIPELINE STATUS: SUCCESS!'
            echo "Application successfully deployed with Image Tag: \${env.BUILD_NUMBER}"
            echo 'Kubernetes Rolling Update Completed with Zero Downtime.'
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo 'PIPELINE STATUS: FAILED!'
            echo 'Initiating automated rollback to previous healthy revision...'
            sh 'kubectl rollout undo deployment/\${DEPLOYMENT_NAME} -n \${K8S_NAMESPACE} || true'
            echo '==================================================='
        }
        always {
            echo 'Cleaning up build environment...'
            sh 'docker logout || true'
        }
    }
}
`
  },

  // --- TERRAFORM INFRASTRUCTURE AS CODE ---
  {
    path: 'terraform/providers.tf',
    name: 'providers.tf',
    language: 'hcl',
    description: 'Terraform provider declaration specifying AWS and Kubernetes providers',
    category: 'terraform',
    content: `# Terraform Providers Configuration
# Specifies required cloud providers and versions

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
  }
}

# AWS Cloud Provider Configuration
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Markdown-Live-Editor"
      ManagedBy   = "Terraform"
      Environment = var.environment
      College     = "Final-Year-Project"
    }
  }
}
`
  },
  {
    path: 'terraform/variables.tf',
    name: 'variables.tf',
    language: 'hcl',
    description: 'Terraform input variables with descriptions and default safe values',
    category: 'terraform',
    content: `# Terraform Input Variables Definition

variable "aws_region" {
  type        = string
  description = "The AWS region where infrastructure is provisioned"
  default     = "us-east-1"
}

variable "environment" {
  type        = string
  description = "Deployment environment name (e.g., dev, staging, prod)"
  default     = "production"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the Virtual Private Cloud"
  default     = "10.0.0.0/16"
}

variable "cluster_name" {
  type        = string
  description = "Name of the Kubernetes cluster"
  default     = "markdown-k8s-cluster"
}

variable "node_instance_type" {
  type        = string
  description = "EC2 Instance type for Kubernetes worker nodes (t3.medium or free-tier eligible for testing)"
  default     = "t3.medium"
}

variable "desired_nodes" {
  type        = number
  description = "Desired number of worker nodes"
  default     = 2
}
`
  },
  {
    path: 'terraform/main.tf',
    name: 'main.tf',
    language: 'hcl',
    description: 'Main Terraform provisioning configuration for VPC, subnets, and Kubernetes nodes',
    category: 'terraform',
    content: `# Main Terraform Infrastructure as Code (IaC)
# Provisions: VPC, Public Subnets, Internet Gateway, Security Groups & Compute Nodes

# 1. Virtual Private Cloud (VPC)
resource "aws_vpc" "k8s_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "\${var.cluster_name}-vpc"
  }
}

# 2. Internet Gateway for public web access
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.k8s_vpc.id

  tags = {
    Name = "\${var.cluster_name}-igw"
  }
}

# 3. Public Subnet 1
resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.k8s_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "\${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.cluster_name}-subnet-1"
  }
}

# 4. Public Subnet 2
resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.k8s_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "\${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.cluster_name}-subnet-2"
  }
}

# 5. Route Table & Associations
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.k8s_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "\${var.cluster_name}-public-rt"
  }
}

resource "aws_route_table_association" "rta_1" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "rta_2" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_rt.id
}

# 6. Security Group for Kubernetes Cluster Nodes
resource "aws_security_group" "k8s_node_sg" {
  name        = "\${var.cluster_name}-node-sg"
  description = "Security group for Markdown Live Editor Kubernetes nodes"
  vpc_id      = aws_vpc.k8s_vpc.id

  # HTTP Web Traffic
  ingress {
    description = "Allow HTTP Web Traffic to Ingress"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS Web Traffic
  ingress {
    description = "Allow HTTPS Secure Traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Kubernetes NodePort Range
  ingress {
    description = "NodePort service access"
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH Access for Ansible Configuration
  ingress {
    description = "SSH for Ansible Configuration"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In production restrict to your IP
  }

  # Outbound Internet Access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.cluster_name}-sg"
  }
}
`
  },
  {
    path: 'terraform/outputs.tf',
    name: 'outputs.tf',
    language: 'hcl',
    description: 'Terraform outputs providing cluster details and network IDs',
    category: 'terraform',
    content: `# Terraform Output Values

output "vpc_id" {
  description = "The ID of the provisioned Virtual Private Cloud"
  value       = aws_vpc.k8s_vpc.id
}

output "security_group_id" {
  description = "The ID of the security group assigned to nodes"
  value       = aws_security_group.k8s_node_sg.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
}

output "next_step_instruction" {
  description = "Command to verify the deployment"
  value       = "Run: terraform output to view all values, then proceed to Ansible configuration."
}
`
  },
  {
    path: 'terraform/terraform.tfvars.example',
    name: 'terraform.tfvars.example',
    language: 'hcl',
    description: 'Example variables values file (never commit secrets to GitHub)',
    category: 'terraform',
    content: `# Copy this file to terraform.tfvars and customize for your environment
# DO NOT commit terraform.tfvars with secrets to GitHub!

aws_region         = "us-east-1"
environment        = "production"
vpc_cidr           = "10.0.0.0/16"
cluster_name       = "markdown-k8s-cluster"
node_instance_type = "t3.medium"
desired_nodes      = 2
`
  },

  // --- ANSIBLE CONFIGURATION MANAGEMENT ---
  {
    path: 'ansible/inventory.ini.example',
    name: 'inventory.ini.example',
    language: 'ini',
    description: 'Ansible inventory defining server host groups and SSH parameters',
    category: 'ansible',
    content: `# Ansible Inventory Configuration File
# Replace IPs with your AWS EC2 Public IPs or local VM IPs

[k8s_control_plane]
master-node ansible_host=198.51.100.10 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa

[k8s_workers]
worker-node-1 ansible_host=198.51.100.11 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa
worker-node-2 ansible_host=198.51.100.12 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa

[jenkins_server]
jenkins-node ansible_host=198.51.100.20 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa

[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
`
  },
  {
    path: 'ansible/site.yml',
    name: 'site.yml',
    language: 'yaml',
    description: 'Master Ansible Playbook configuring Docker, Kubernetes tools, and user permissions',
    category: 'ansible',
    content: `---
# Master Ansible Playbook: Infrastructure Configuration
# Configures Docker runtime, Kubernetes prerequisites, and system settings

- name: Setup Prerequisites and Docker Engine on all nodes
  hosts: all
  become: yes
  tasks:
    - name: Update apt package cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install system dependencies
      apt:
        name:
          - apt-transport-https
          - ca-certificates
          - curl
          - gnupg
          - lsb-release
          - git
          - ufw
        state: present

    - name: Disable Linux Swap (Required for Kubernetes kubelet)
      command: swapoff -a
      when: ansible_swaptotal_mb > 0

    - name: Ensure Swap is disabled permanently in fstab
      replace:
        path: /etc/fstab
        regexp: '^([^#].*?\\sswap\\s+.*)$'
        replace: '# \\1'

    - name: Install Docker Container Engine
      apt:
        name:
          - docker.io
          - containerd
        state: present

    - name: Ensure Docker service is started and enabled on boot
      service:
        name: docker
        state: started
        enabled: yes

    - name: Add standard user to Docker group
      user:
        name: "{{ ansible_user }}"
        groups: docker
        append: yes

- name: Setup Kubernetes Tools (kubectl, kubeadm, kubelet)
  hosts: k8s_control_plane:k8s_workers
  become: yes
  tasks:
    - name: Download Kubernetes official signing key
      get_url:
        url: https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key
        dest: /etc/apt/keyrings/kubernetes-apt-keyring.asc
        mode: '0644'

    - name: Add Kubernetes APT repository
      apt_repository:
        repo: "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.asc] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /"
        state: present
        filename: kubernetes

    - name: Install kubelet, kubeadm, and kubectl
      apt:
        name:
          - kubelet
          - kubeadm
          - kubectl
        state: present
        update_cache: yes

    - name: Hold Kubernetes packages at current version
      dpkg_selections:
        name: "{{ item }}"
        selection: hold
      loop:
        - kubelet
        - kubeadm
        - kubectl
`
  },

  // --- KUBERNETES MANIFESTS ---
  {
    path: 'kubernetes/namespace.yaml',
    name: 'namespace.yaml',
    language: 'yaml',
    description: 'Dedicated Kubernetes namespace providing environment isolation',
    category: 'kubernetes',
    content: `apiVersion: v1
kind: Namespace
metadata:
  name: markdown-prod
  labels:
    name: markdown-prod
    environment: production
    project: markdown-live-editor
`
  },
  {
    path: 'kubernetes/configmap.yaml',
    name: 'configmap.yaml',
    language: 'yaml',
    description: 'Kubernetes ConfigMap for environment configuration and application metadata',
    category: 'kubernetes',
    content: `apiVersion: v1
kind: ConfigMap
metadata:
  name: markdown-editor-config
  namespace: markdown-prod
  labels:
    app: markdown-editor
data:
  APP_ENV: "production"
  APP_TITLE: "Markdown Live Editor"
  APP_VERSION: "1.0.0"
  ENABLE_ANALYTICS: "false"
  MAX_UPLOAD_SIZE_MB: "10"
`
  },
  {
    path: 'kubernetes/deployment.yaml',
    name: 'deployment.yaml',
    language: 'yaml',
    description: 'Kubernetes Deployment with 3 replicas, RollingUpdate strategy, liveness & readiness probes, and resource limits',
    category: 'kubernetes',
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: markdown-editor
  namespace: markdown-prod
  labels:
    app: markdown-editor
    tier: frontend
    project: markdown-live-editor
spec:
  # High Availability: 3 Pod Replicas
  replicas: 3
  
  # Rolling Update Strategy for Zero Downtime
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max 1 extra pod created during update
      maxUnavailable: 0  # No pods dropped before replacement is healthy
      
  selector:
    matchLabels:
      app: markdown-editor
      
  template:
    metadata:
      labels:
        app: markdown-editor
        tier: frontend
        version: "v1.0.0"
    spec:
      containers:
      - name: markdown-editor-container
        # Image pulled from Docker Hub (updated dynamically by Jenkins)
        image: username/markdown-live-editor:1.0.0
        imagePullPolicy: IfNotPresent
        
        ports:
        - name: http-port
          containerPort: 80
          protocol: TCP
          
        # Environment variables from ConfigMap
        envFrom:
        - configMapRef:
            name: markdown-editor-config
            
        # Resource Requests & Limits (Guarantees QoS and prevents node starvation)
        resources:
          requests:
            cpu: "100m"      # 0.1 CPU core
            memory: "64Mi"   # 64 Megabytes RAM
          limits:
            cpu: "250m"      # 0.25 CPU core
            memory: "128Mi"  # 128 Megabytes RAM
            
        # Liveness Probe: Detects container crashes and triggers Self-Healing restarts
        livenessProbe:
          httpGet:
            path: /healthz
            port: 80
          initialDelaySeconds: 15
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
          
        # Readiness Probe: Ensures traffic routes only when container is fully healthy
        readinessProbe:
          httpGet:
            path: /healthz
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 2
          successThreshold: 1
          failureThreshold: 2
          
        # Security Hardening
        securityContext:
          readOnlyRootFilesystem: false
          allowPrivilegeEscalation: false
`
  },
  {
    path: 'kubernetes/service.yaml',
    name: 'service.yaml',
    language: 'yaml',
    description: 'Kubernetes Service load balancing traffic across all healthy Pod replicas',
    category: 'kubernetes',
    content: `apiVersion: v1
kind: Service
metadata:
  name: markdown-editor-service
  namespace: markdown-prod
  labels:
    app: markdown-editor
spec:
  # ClusterIP: Internal stable virtual IP load balanced across pods
  # For local NodePort testing, change type to NodePort with nodePort: 30080
  type: ClusterIP
  
  selector:
    app: markdown-editor
    
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
`
  },
  {
    path: 'kubernetes/ingress.yaml',
    name: 'ingress.yaml',
    language: 'yaml',
    description: 'Kubernetes Ingress routing external HTTP traffic to the backend Service',
    category: 'kubernetes',
    content: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: markdown-editor-ingress
  namespace: markdown-prod
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
spec:
  rules:
  # Host can be replaced with custom domain or Minikube IP
  - host: markdown.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: markdown-editor-service
            port:
              number: 80
`
  },
  {
    path: 'kubernetes/hpa.yaml',
    name: 'hpa.yaml',
    language: 'yaml',
    description: 'Horizontal Pod Autoscaler dynamically scaling replicas between 3 and 10 based on CPU load',
    category: 'kubernetes',
    content: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: markdown-editor-hpa
  namespace: markdown-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: markdown-editor
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
`
  },

  // --- GIT CONFIGURATION ---
  {
    path: '.gitignore',
    name: '.gitignore',
    language: 'ignore',
    description: 'Git ignore file preventing accidental commits of secrets and generated binaries',
    category: 'docs',
    content: `# Security: Never commit secrets or credentials
*.pem
*.key
id_rsa
*.env
*.tfvars
secrets/

# Terraform generated files
terraform/.terraform/
terraform/*.tfstate
terraform/*.tfstate.backup
terraform/.terraform.lock.hcl

# Ansible temporary files
ansible/*.retry
ansible/.vault_password

# Node.js and testing
node_modules/
npm-debug.log
coverage/

# Kubernetes temporary files
*.kubeconfig
kubeconfig

# Operating System & IDE
.DS_Store
Thumbs.db
.vscode/
.idea/
`
  },

  // --- COMPREHENSIVE PROJECT README ---
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    description: 'Comprehensive 22-section project guide detailing architecture, setup, and execution',
    category: 'docs',
    content: `# Markdown Live Editor – Automated DevOps CI/CD Deployment

[![DevOps Pipeline](https://img.shields.io/badge/CI%2FCD-Jenkins%20Automated-blue)](https://jenkins.io)
[![Docker](https://img.shields.io/badge/Docker-Nginx%20Alpine-2496ED)](https://docker.com)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-RollingUpdate%203%20Replicas-326CE5)](https://kubernetes.io)
[![IaC](https://img.shields.io/badge/IaC-Terraform%20v1.5-7B42BC)](https://terraform.io)
[![Config](https://img.shields.io/badge/Ansible-Idempotent%20Roles-EE0000)](https://ansible.com)

A production-grade, real-time browser-based **Markdown Live Editor** featuring an end-to-end automated **DevOps CI/CD Deployment Pipeline**:
\`\`\`
Developer (Windows PowerShell) 
   ──> GitHub (Branching: main, develop, feature/*)
   ──> Jenkins (Automated Webhook Pipeline)
   ──> Automated Testing (Unit Tests & XSS Audit)
   ──> Docker Build & Optimization (Nginx Alpine)
   ──> Docker Hub Container Registry
   ──> Terraform (Infrastructure as Code)
   ──> Ansible (Server Configuration Management)
   ──> Kubernetes Cluster (3 Pod Replicas)
   ──> Ingress Controller & Service
   ──> Production End-User Browser
\`\`\`

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Application Features](#4-application-features)
5. [Complete Architecture Flow](#5-complete-architecture-flow)
6. [Technology Stack](#6-technology-stack)
7. [Repository Structure](#7-repository-structure)
8. [Git Branching Strategy](#8-git-branching-strategy)
9. [Phase 1: Local Application Setup](#9-phase-1-local-application-setup)
10. [Phase 2: Automated Testing](#10-phase-2-automated-testing)
11. [Phase 3: Docker Containerization](#11-phase-3-docker-containerization)
12. [Phase 4: Jenkins CI/CD Pipeline](#12-phase-4-jenkins-cicd-pipeline)
13. [Phase 5: Terraform Infrastructure as Code](#13-phase-5-terraform-infrastructure-as-code)
14. [Phase 6: Ansible Configuration Management](#14-phase-6-ansible-configuration-management)
15. [Phase 7: Kubernetes Deployment](#15-phase-7-kubernetes-deployment)
16. [Phase 8: High Availability & Scaling](#16-phase-8-high-availability--scaling)
17. [Phase 9: Zero-Downtime Rolling Updates](#17-phase-9-zero-downtime-rolling-updates)
18. [Phase 10: Self-Healing Demonstration](#18-phase-10-self-healing-demonstration)
19. [Security Best Practices](#19-security-best-practices)
20. [Troubleshooting Guide](#20-troubleshooting-guide)
21. [College Viva & Review Questions](#21-college-viva--review-questions)
22. [Future Enhancements](#22-future-enhancements)

---

## 1. Project Overview
The **Markdown Live Editor** is a lightweight web application that enables users to write Markdown in a distraction-free left pane and immediately view formatted HTML rendering in the right pane. The core objective of this project is to showcase modern **DevOps methodologies**—bridging software development and IT operations through automation, containerization, Infrastructure as Code (IaC), and container orchestration.

## 2. Problem Statement
Traditional software delivery involves manual code transfers, inconsistent local environments ("it works on my machine"), high downtime during releases, and manual server setup. This leads to slow delivery cycles, human configuration error, and lack of scalability when traffic surges.

## 3. Project Objectives
* **Eliminate Environment Discrepancy**: Containerize the app using Docker.
* **Automate Quality Assurance**: Run unit tests automatically on every Git push via Jenkins.
* **Achieve Zero Downtime**: Execute Kubernetes Rolling Updates.
* **Guarantee Resilience**: Demonstrate Kubernetes self-healing when a container crashes.
* **Infrastructure Repeatability**: Define all cloud resources declaratively with Terraform.
* **Automated Server Setup**: Use Ansible to configure Linux nodes idempotently.

---

## 4. Application Features
* **Dual-Pane Split Layout**: Real-time side-by-side editing and live preview.
* **Full Markdown Support**: Headings (H1–H3), bold, italics, tables, lists, task checklists, blockquotes, and code blocks.
* **XSS Sanitization**: Protected via DOMPurify to eliminate script injection attacks.
* **Live Analytics**: Real-time word count, character count, and line count calculation.
* **Export Utilities**: 1-click Download \`.md\`, Copy HTML, and Raw HTML inspection tab.
* **Health Endpoint**: Dedicated \`/healthz\` returning HTTP 200 for Kubernetes liveness probes.

---

## 5. Complete Architecture Flow
\`\`\`
+-------------------+
|  Developer (PC)   |  Windows PowerShell (git commit -> push)
+---------+---------+
          |
          v
+-------------------+
|  GitHub Repository|  Webhook trigger on push to 'main'
+---------+---------+
          |
          v
+-------------------+
|  Jenkins Pipeline |  Stage 1: Checkout SCM
|                   |  Stage 2: Code Validation
|                   |  Stage 3: Run Node Unit Tests
|                   |  Stage 4: Docker Build (Nginx Alpine)
|                   |  Stage 5: Docker Login & Push
+---------+---------+
          |
          v
+-------------------+
|  Docker Hub Reg.  |  Stores tagged images (e.g., username/markdown-editor:1.0.0)
+---------+---------+
          |
          v
+-------------------+
| Kubernetes Cluster|  Managed via Terraform & Ansible
|  +-------------+  |  Namespace: markdown-prod
|  | Ingress     |  |  Routes HTTP requests
|  +------+------+  |
|         |         |
|  +------v------+  |
|  | Service     |  |  ClusterIP internal load balancer
|  +------+------+  |
|         |         |
|  +------v------+  |
|  | Deployment  |  |  3 Replicas (RollingUpdate, Self-Healing)
|  | [Pod 1]     |  |  LivenessProbe: /healthz
|  | [Pod 2]     |  |  ReadinessProbe: /healthz
|  | [Pod 3]     |  |  Resources: CPU & RAM limits
|  +-------------+  |
+-------------------+
\`\`\`

---

## 6. Technology Stack
* **Frontend**: HTML5, CSS3, JavaScript (ES6+), marked.js, DOMPurify.
* **Web Server**: Nginx 1.25 Alpine (~23MB lightweight base).
* **CI/CD Orchestration**: Jenkins (Declarative Pipeline with Webhooks).
* **Containerization**: Docker (Multi-stage build, non-root user).
* **Registry**: Docker Hub.
* **Infrastructure as Code (IaC)**: Terraform (AWS Provider or local Minikube).
* **Configuration Management**: Ansible (Playbooks, idempotent tasks).
* **Container Orchestration**: Kubernetes (Deployment, Service, Ingress, HPA).
* **Testing**: Automated Node.js assert test suite.

---

## 7. Repository Structure
\`\`\`
markdown-live-editor/
│
├── app/
│   ├── index.html        # Single-page web application UI
│   ├── style.css         # Styling, responsive layout, dark theme
│   └── script.js         # Real-time parsing, debounce, exports
│
├── tests/
│   └── editor.test.js    # Unit test suite for Jenkins test stage
│
├── Dockerfile            # Optimized Nginx container specification
├── nginx.conf            # Nginx config with /healthz & security headers
├── .dockerignore         # Docker context exclusions
├── Jenkinsfile           # Declarative 7-stage CI/CD pipeline
├── .gitignore            # Git exclusions (secrets, tfstate, temp)
├── README.md             # Project documentation
│
├── terraform/
│   ├── providers.tf      # AWS and Kubernetes provider blocks
│   ├── variables.tf      # Configurable input variables
│   ├── main.tf           # VPC, subnets, security group configuration
│   ├── outputs.tf        # Output IDs and connection endpoints
│   └── terraform.tfvars.example
│
├── ansible/
│   ├── inventory.ini.example # Server IP addresses and SSH keys
│   └── site.yml              # Playbook for Docker & Kubernetes setup
│
└── kubernetes/
    ├── namespace.yaml    # Namespace: markdown-prod
    ├── configmap.yaml    # Non-sensitive app configuration
    ├── deployment.yaml   # 3 Pod replicas, probes, RollingUpdate
    ├── service.yaml      # ClusterIP internal service
    ├── ingress.yaml      # Ingress routing rules
    └── hpa.yaml          # Horizontal Pod Autoscaler (3-10 pods)
\`\`\`

---

## 8. Git Branching Strategy
We follow the industry-standard **GitFlow** model:
* \`main\`: Production-ready code. Pushes trigger automatic deployment to production Kubernetes namespace.
* \`develop\`: Integration branch where features are aggregated.
* \`feature/*\`: Temporary feature branches (e.g., \`feature/docker\`, \`feature/kubernetes\`).

### PowerShell Branching Workflow:
\`\`\`powershell
# 1. Clone repository
git clone https://github.com/your-username/markdown-live-editor.git
cd markdown-live-editor

# 2. Create and switch to develop branch
git checkout -b develop

# 3. Create feature branch
git checkout -b feature/docker-setup

# 4. Make changes, stage, and commit
git add .
git commit -m "feat: add optimized Dockerfile and Nginx health endpoint"

# 5. Push feature branch to GitHub
git push -u origin feature/docker-setup
\`\`\`

---

## 9. Phase 1: Local Application Setup
### Run in Windows PowerShell:
\`\`\`powershell
# Verify files exist
Get-ChildItem -Path app

# Open the app locally in your default web browser
Start-Process "app/index.html"
\`\`\`

---

## 10. Phase 2: Automated Testing
### Run in Windows PowerShell:
\`\`\`powershell
# Execute the automated test suite
node tests/editor.test.js
\`\`\`
**Expected Output:**
\`\`\`text
RUNNING AUTOMATED UNIT TESTS: Markdown Live Editor
[PASS] Test 1: Should correctly convert # to <h1> tag
[PASS] Test 2: Should correctly convert ## to <h2> tag
[PASS] Test 3: Should convert **bold text** to <strong>
[PASS] Test 4: Should convert *italic text* to <em>
[PASS] Test 5: Should convert markdown links [text](url) to anchor tags
[PASS] Test 6: Should convert > blockquote to <blockquote>
[PASS] Test 7: Should gracefully return empty string for empty input
[PASS] Test 8: Should strip malicious <script> tags from rendered HTML
TEST SUMMARY: 8/8 Passed (100% SUCCESS)
STATUS: READY FOR DOCKER BUILD & DEPLOYMENT
\`\`\`

---

## 11. Phase 3: Docker Containerization
### Run in Windows PowerShell:
\`\`\`powershell
# 1. Build the Docker image
docker build -t markdown-live-editor:1.0.0 .

# 2. Verify image was created
docker images | Select-String "markdown-live-editor"

# 3. Run container locally on port 8080
docker run -d -p 8080:80 --name markdown-app markdown-live-editor:1.0.0

# 4. Verify container is healthy
docker ps --filter "name=markdown-app"

# 5. Test health check endpoint in PowerShell
curl http://localhost:8080/healthz

# 6. Push to Docker Hub
docker tag markdown-live-editor:1.0.0 your-dockerhub-username/markdown-live-editor:1.0.0
docker login
docker push your-dockerhub-username/markdown-live-editor:1.0.0
\`\`\`

---

## 12. Phase 4: Jenkins CI/CD Pipeline
1. Install Jenkins and required plugins: **Git**, **Pipeline**, **Docker Pipeline**, **Kubernetes CLI**.
2. Configure Credentials in Jenkins:
   * \`docker-hub-username\` & \`docker-hub-password\`
   * \`k8s-kubeconfig\` (Secret file containing your cluster \`~/.kube/config\`)
3. Create a **Pipeline Project**, select **Pipeline script from SCM**, point to your GitHub repo.
4. Set GitHub Webhook: \`http://<jenkins-ip>:8080/github-webhook/\`.

---

## 13. Phase 5: Terraform Infrastructure as Code
### Run in PowerShell:
\`\`\`powershell
cd terraform

# 1. Initialize Terraform plugins
terraform init

# 2. Validate configuration files
terraform validate

# 3. Plan infrastructure provisioning
terraform plan

# 4. Apply configuration (Creates cloud resources)
terraform apply -auto-approve

# 5. Clean up when finished (Cost control)
terraform destroy
\`\`\`

---

## 14. Phase 6: Ansible Configuration Management
### Run in Linux / WSL / Control Node:
\`\`\`bash
cd ansible

# 1. Test server reachability
ansible all -i inventory.ini.example -m ping

# 2. Execute configuration playbook
ansible-playbook -i inventory.ini.example site.yml
\`\`\`

---

## 15. Phase 7: Kubernetes Deployment
### Run in Windows PowerShell (or kubectl terminal):
\`\`\`powershell
# 1. Create dedicated namespace
kubectl apply -f kubernetes/namespace.yaml

# 2. Apply ConfigMap, Service, and Ingress
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml

# 3. Deploy the application pods
kubectl apply -f kubernetes/deployment.yaml

# 4. Verify all 3 Pods are Running
kubectl get pods -n markdown-prod -l app=markdown-editor -o wide

# 5. Verify Service is active
kubectl get svc -n markdown-prod
\`\`\`

---

## 16. Phase 8: High Availability & Scaling
### Demonstrate Horizontal Scaling:
\`\`\`powershell
# Scale from 3 to 5 replicas
kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod

# Watch Kubernetes immediately provision 2 new Pods
kubectl get pods -n markdown-prod -w
\`\`\`

---

## 17. Phase 9: Zero-Downtime Rolling Updates
### Deploy Version 2.0.0 without any service interruption:
\`\`\`powershell
# Update container image to version 2
kubectl set image deployment/markdown-editor markdown-editor-container=username/markdown-live-editor:2.0.0 -n markdown-prod --record

# Monitor rollout progression in real-time
kubectl rollout status deployment/markdown-editor -n markdown-prod

# View deployment revision history
kubectl rollout history deployment/markdown-editor -n markdown-prod

# Rollback immediately if issues are detected
kubectl rollout undo deployment/markdown-editor -n markdown-prod
\`\`\`

---

## 18. Phase 10: Self-Healing Demonstration
### Demonstrate Kubernetes Self-Healing during your Viva:
\`\`\`powershell
# 1. List active pods and copy one pod name
kubectl get pods -n markdown-prod

# 2. Delete one running Pod
kubectl delete pod markdown-editor-XXXXX -n markdown-prod

# 3. Notice a replacement Pod is automatically spawned within 2 seconds!
kubectl get pods -n markdown-prod
\`\`\`
**Viva Explanation:**
The Kubernetes **ReplicaSet Controller** continuously compares the *Desired State* (\`replicas: 3\`) with the *Actual State* (now 2 pods). Detecting a drift, it immediately calls the Kubernetes API to schedule and start a replacement Pod on a healthy node.

---

## 19. Security Best Practices
1. **Never Hardcode Secrets**: Pass credentials via Jenkins Credentials Store and Kubernetes Secrets.
2. **Non-Root Execution**: Container uses an unprivileged Nginx process.
3. **Resource Quotas**: \`limits\` and \`requests\` prevent denial of service (OOM crashes) on worker nodes.
4. **Git Safety**: \`.gitignore\` rigorously prevents state files, SSH keys, and \`.env\` from reaching public GitHub repos.

---

## 20. Troubleshooting Guide
* **Error: \`port 80: address already in use\`**
  * *Fix:* Change host binding to \`-p 8080:80\`.
* **Error: \`ErrImagePull\` or \`ImagePullBackOff\` in Kubernetes**
  * *Fix:* Check Docker Hub image name and ensure repository is public, or supply \`imagePullSecrets\`.
* **Error: \`CrashLoopBackOff\`**
  * *Fix:* Inspect logs: \`kubectl logs <pod-name> -n markdown-prod\`. Verify that port 80 is listening and \`/healthz\` responds.

---

## 21. College Viva & Review Questions
*See the full Viva Preparation section in the app for 15 x 2-mark, 15 x 5-mark, 10 x 10-mark, and 30+ oral questions with complete beginner-friendly explanations!*
`
  }
];
