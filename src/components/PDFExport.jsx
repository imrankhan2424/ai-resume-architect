import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Printer, Edit3, Settings, ShieldCheck, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PDFExport = () => {
  const { mode, aiResult, setAiResult } = useResume();

  const handlePrint = () => window.print();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Editor Section (hidden in print) ──────── */}
      <div className="glass-card no-print" style={{ padding: '1.75rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
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
          className="input-base input-emerald"
          style={{ minHeight: '140px' }}
        />

        {aiResult && (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
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
              In the print dialog, choose <strong>&ldquo;Save as PDF&rdquo;</strong> and <strong>Margins: Default</strong>
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

        {/* Preview container — the outer wrapper hides in print, the inner .print-resume shows */}
        <div className="glass-card overflow-hidden print-preview-wrapper" style={{ padding: 'clamp(0.75rem, 2vw, 2rem)', background: 'rgba(0,0,0,0.06)' }}>
          <div
            id="resume-print-area"
            className={`print-resume shadow-2xl w-full mx-auto overflow-hidden transition-all duration-500 bg-white text-black ${
              mode === 'ats' ? 'font-serif' : 'font-sans'
            }`}
            style={{ maxWidth: '8.5in', minHeight: '11in' }}
          >
            <div style={{ 
              padding: 'clamp(0.4in, 3vw, 0.7in)', 
              boxDecorationBreak: 'clone', 
              WebkitBoxDecorationBreak: 'clone' 
            }}>
              <ReactMarkdown className="markdown-render">
                {aiResult || '### Layout Preview\nYour generated resume content will render here with precise typesetting for PDF export.'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Document skin ──────────────────────── */
        .print-resume {
          font-variant-ligatures: common-ligatures;
          text-rendering: optimizeLegibility;
          transform-origin: top center;
          transition: transform 0.3s ease;
          border-radius: 0.5rem;
        }
        .print-resume:hover { transform: scale(1.003); }

        /* ── Typography for PDF Preview ─────────── */
        .markdown-render {
          color: #1e1b4b;
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
          page-break-after: avoid;
          break-after: avoid;
        }
        .markdown-render h3 {
          font-size: 10.5pt;
          margin-top: 8pt;
          margin-bottom: 1pt;
          font-weight: 700;
          color: #1e1b4b;
          page-break-after: avoid;
          break-after: avoid;
        }
        .markdown-render p {
          font-size: 9.5pt;
          margin-bottom: 4pt;
          color: #374151;
          line-height: 1.5;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        /* Lock company subheader to the bullet list that follows it */
        .markdown-render h3 + p {
          page-break-after: avoid;
          break-after: avoid;
        }
        .markdown-render ul {
          margin-bottom: 6pt;
          padding-left: 14pt;
          list-style-type: disc;
        }
        .markdown-render li {
          font-size: 9.5pt;
          margin-bottom: 2pt;
          color: #374151;
          line-height: 1.45;
          display: list-item;
          page-break-inside: avoid;
          break-inside: avoid;
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

        /* ── Print Styles ──────────────────────── */
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Hide the header, background orbs, and all no-print elements */
          header,
          .app-bg,
          .no-print {
            display: none !important;
          }

          /* Hide the entire left column (PromptGenerator + Tips) */
          .main-grid > div:first-child {
            display: none !important;
          }

          /* Remove all layout constraints on the right column */
          .main-grid {
            display: block !important;
          }

          .main-grid > div:last-child {
            display: block !important;
          }

          /* Hide the section header (02 Preview & Export) */
          .main-grid > div:last-child > section > div:first-child {
            display: none !important;
          }

          /* Hide the editor card (textarea) */
          .main-grid > div:last-child > section > div > div.glass-card.no-print {
            display: none !important;
          }

          /* Remove the glass card wrapper styling around the preview */
          .print-preview-wrapper {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          /* Make the resume fill the page */
          #resume-print-area {
            width: 100% !important;
            max-width: none !important;
            min-height: auto !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
            margin: 0 !important;
            background: white !important;
          }

          /* Remove the main container padding */
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default PDFExport;
