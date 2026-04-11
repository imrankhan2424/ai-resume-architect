import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Printer, Edit3, Settings, ShieldCheck, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PDFExport = () => {
  const { mode, aiResult, setAiResult } = useResume();

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">

      {/* ── Editor Section ────────────────────────── */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--emerald-soft)' }}>
              <Edit3 size={14} style={{ color: 'var(--emerald)' }} />
            </div>
            <span className="section-label">AI Result Editor</span>
          </div>
          {aiResult && (
            <div className="badge badge-emerald">
              <ShieldCheck size={10} />
              Ready
            </div>
          )}
        </div>

        <textarea
          id="ai-result"
          value={aiResult}
          onChange={(e) => setAiResult(e.target.value)}
          placeholder="Paste the tailored Markdown resume from your AI here to preview and export as PDF…"
          className="input-base input-emerald min-h-[140px]"
        />

        {aiResult && (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 no-print">
            <button
              id="generate-pdf"
              onClick={handlePrint}
              className="btn btn-emerald w-full sm:w-auto px-6 h-9 text-xs"
            >
              <Printer size={14} />
              Generate PDF
            </button>
            <div className="flex items-center gap-2 text-[10.5px] font-medium px-3 py-2 rounded-lg border" style={{ color: 'var(--emerald)', background: 'var(--emerald-soft)', borderColor: 'rgba(5,150,105,0.15)' }}>
              <Settings size={12} />
              In the print dialog, choose <strong>&ldquo;Save as PDF&rdquo;</strong>
            </div>
          </div>
        )}
      </div>

      {/* ── Live Document Preview ──────────────────── */}
      <div className="relative">
        {/* Floating label */}
        <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 bg-white border rounded-full shadow-sm no-print" style={{ borderColor: 'var(--border)' }}>
          <FileText size={10} style={{ color: 'var(--accent)' }} />
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Live Preview
          </span>
        </div>

        {/* Preview container */}
        <div className="glass-card overflow-hidden p-3 sm:p-5 md:p-8" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <div
            className={`document-skin shadow-2xl min-h-[11in] w-full max-w-[8.5in] mx-auto overflow-hidden transition-all duration-500 bg-white text-black ${
              mode === 'ats' ? 'font-serif' : 'font-sans'
            }`}
          >
            <div className="p-[0.4in] sm:p-[0.6in] md:p-[0.7in]">
              <ReactMarkdown className="markdown-render">
                {aiResult || '### Layout Preview\nYour generated resume content will render here with precise typesetting for PDF export.'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .document-skin {
          font-variant-ligatures: common-ligatures;
          text-rendering: optimizeLegibility;
          transform-origin: top center;
          transition: transform 0.3s ease;
        }
        .document-skin:hover { transform: scale(1.005); }

        /* Typography for PDF Preview */
        .markdown-render {
          color: #1e1b4b; /* dark slate to ensure high contrast even if parent is dark mode */
        }
        .markdown-render h1 {
          font-size: 24pt;
          margin-bottom: 2pt;
          line-height: 1.1;
          font-weight: 800;
          color: #1e1b4b;
        }
        .markdown-render h2 {
          font-size: 11pt;
          border-bottom: 1.5px solid #ede9fe;
          padding-bottom: 2pt;
          margin-top: 14pt;
          margin-bottom: 4pt;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
          color: #4c1d95;
        }
        .markdown-render h3 {
          font-size: 10.5pt;
          margin-top: 8pt;
          margin-bottom: 1pt;
          font-weight: 700;
          color: #1e1b4b;
        }
        .markdown-render p {
          font-size: 9.5pt;
          margin-bottom: 4pt;
          color: #374151;
          line-height: 1.5;
        }
        .markdown-render ul {
          margin-bottom: 6pt;
          padding-left: 12pt;
        }
        .markdown-render li {
          font-size: 9.5pt;
          margin-bottom: 2pt;
          color: #374151;
          line-height: 1.45;
        }
        .markdown-render strong {
          color: #1e1b4b;
          font-weight: 700;
        }
        .markdown-render hr {
          border: none;
          border-top: 1px solid #ede9fe;
          margin: 8pt 0;
        }
        .markdown-render a {
          color: #7c3aed;
          text-decoration: none;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
          .document-skin {
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
            transform: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body > #root > div > main > div > div:nth-child(2) > section > div > div.relative > div.glass-card {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            backdrop-filter: none !important;
          }
          header, .no-print, .glass-card > div:first-child { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default PDFExport;
