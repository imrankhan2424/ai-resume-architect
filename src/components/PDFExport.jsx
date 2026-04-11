import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Printer, Edit3, Settings, ShieldCheck, FileText, Copy, Check } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PDFExport = () => {
  const { mode, aiResult, setAiResult, includeCoverLetter, aiCoverLetterResult, setAiCoverLetterResult } = useResume();
  const [printTarget, setPrintTarget] = React.useState('both');
  const [copiedResume, setCopiedResume] = React.useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = React.useState(false);

  const handlePrint = (target) => {
    setPrintTarget(target);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCopyResume = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleCopyCoverLetter = () => {
    if (!aiCoverLetterResult) return;
    navigator.clipboard.writeText(aiCoverLetterResult);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2000);
  };

  return (
    <div data-print-target={printTarget} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Editor Section (hidden in print) ──────── */}
      <div className="glass-card no-print" style={{ padding: '1.75rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--emerald-soft)' }}>
              <Edit3 size={14} style={{ color: 'var(--emerald)' }} />
            </div>
            <span className="section-label">{includeCoverLetter ? 'Resume Editor' : 'AI Result Editor'}</span>
          </div>
          <div className="flex items-center gap-2">
            {aiResult && (
              <button
                onClick={handleCopyResume}
                className={`btn h-7 px-3 text-[10.5px] transition-all duration-300 ${copiedResume ? 'btn-emerald' : ''}`}
                style={!copiedResume ? { background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' } : {}}
              >
                {copiedResume ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedResume ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
            {aiResult && (
              <div className="badge badge-emerald h-7">
                <ShieldCheck size={12} />
                Ready
              </div>
            )}
          </div>
        </div>

        <textarea
          id="ai-result"
          value={aiResult}
          onChange={(e) => setAiResult(e.target.value)}
          placeholder="Paste the tailored Markdown resume from your AI here…"
          className="input-base input-emerald"
          style={{ minHeight: '140px' }}
        />

        {includeCoverLetter && (
          <div className="mt-8 flex flex-col">
            <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                  <Edit3 size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="section-label">Cover Letter Editor</span>
              </div>
              <div className="flex items-center gap-2">
                {aiCoverLetterResult && (
                  <button
                    onClick={handleCopyCoverLetter}
                    className={`btn h-7 px-3 text-[10.5px] transition-all duration-300 ${copiedCoverLetter ? 'btn-accent' : ''}`}
                    style={!copiedCoverLetter ? { background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' } : {}}
                  >
                    {copiedCoverLetter ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedCoverLetter ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
                {aiCoverLetterResult && (
                  <div className="badge badge-accent h-7">
                    <ShieldCheck size={12} />
                    Ready
                  </div>
                )}
              </div>
            </div>

            <textarea
              id="ai-cover-letter-result"
              value={aiCoverLetterResult}
              onChange={(e) => setAiCoverLetterResult(e.target.value)}
              placeholder="Paste the Cover Letter Markdown from your AI here…"
              className="input-base"
              style={{ minHeight: '140px' }}
            />
          </div>
        )}

        {(aiResult || aiCoverLetterResult) && (
          <div className="flex flex-col gap-3" style={{ marginTop: '2rem' }}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePrint('resume')}
                className="btn btn-emerald h-9 px-4 text-xs"
                disabled={!aiResult}
              >
                <Printer size={14} />
                Print Resume
              </button>
              {includeCoverLetter && (
                <>
                  <button
                    onClick={() => handlePrint('cover-letter')}
                    className="btn btn-primary h-9 px-4 text-xs"
                    disabled={!aiCoverLetterResult}
                  >
                    <Printer size={14} />
                    Print Cover Letter
                  </button>
                  <button
                    onClick={() => handlePrint('both')}
                    className="btn text-white h-9 px-4 text-xs"
                    style={{ background: 'linear-gradient(135deg, var(--emerald) 0%, var(--accent) 100%)' }}
                    disabled={!aiResult || !aiCoverLetterResult}
                  >
                    <Printer size={14} />
                    Export Combined PDF
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10.5px] font-medium px-3 py-2 rounded-lg border w-fit" style={{ color: 'var(--emerald)', background: 'var(--emerald-soft)', borderColor: 'rgba(5,150,105,0.15)' }}>
              <Settings size={12} />
              In the print dialog, choose <strong>&ldquo;Save as PDF&rdquo;</strong> and <strong>Margins: Default</strong>
            </div>
          </div>
        )}
      </div>

      {/* ── Live Document Previews ──────────────────── */}
      <div className="flex flex-col gap-8">
        
        {/* COVER LETTER PREVIEW (Shows first if Printing Both, or if only rendering Cover Letter) */}
        {(includeCoverLetter) && (
          <div className="relative preview-cover-letter-container">
            <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 bg-white border rounded-full shadow-sm no-print" style={{ borderColor: 'var(--border)' }}>
              <FileText size={10} color="#7c3aed" />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#7c3aed' }}>Cover Letter Live Preview</span>
            </div>
            <div className="glass-card overflow-hidden print-preview-wrapper" style={{ padding: 'clamp(0.75rem, 2vw, 2rem)', background: 'rgba(0,0,0,0.06)' }}>
              <div id="cover-letter-print-area"
                className={`print-resume shadow-2xl w-full mx-auto overflow-hidden transition-all duration-500 bg-white text-black ${mode === 'ats' ? 'font-serif' : 'font-sans'}`}
                style={{ maxWidth: '8.5in', minHeight: '11in' }}
              >
                <div style={{ padding: 'clamp(0.5in, 4vw, 0.85in)', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
                  <ReactMarkdown className="cover-letter-render">
                    {aiCoverLetterResult || '### Cover Letter Preview\nYour generated cover letter content will render here.'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESUME PREVIEW */}
        <div className="relative preview-resume-container">
          <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 bg-white border rounded-full shadow-sm no-print" style={{ borderColor: 'var(--border)' }}>
            <FileText size={10} color="#059669" />
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Resume Live Preview</span>
          </div>
          <div className="glass-card overflow-hidden print-preview-wrapper" style={{ padding: 'clamp(0.75rem, 2vw, 2rem)', background: 'rgba(0,0,0,0.06)' }}>
            <div
              id="resume-print-area"
              className={`print-resume shadow-2xl w-full mx-auto overflow-hidden transition-all duration-500 bg-white text-black ${mode === 'ats' ? 'font-serif' : 'font-sans'}`}
              style={{ maxWidth: '8.5in', minHeight: '11in' }}
            >
              <div style={{ padding: 'clamp(0.4in, 3vw, 0.7in)', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
                <ReactMarkdown className="markdown-render">
                  {aiResult || '### Layout Preview\nYour generated resume content will render here with precise typesetting for PDF export.'}
                </ReactMarkdown>
              </div>
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

        /* ── Cover Letter Specific Typography ─── */
        .cover-letter-render {
          color: #1f2937;
          line-height: 1.7;
        }
        .cover-letter-render h1 {
          font-size: 20pt;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4pt 0;
          letter-spacing: -0.025em;
        }
        .cover-letter-render h2 {
          font-size: 11pt;
          font-weight: 600;
          color: #334155;
          margin: 0 0 2pt 0;
        }
        .cover-letter-render h3 {
          font-size: 10pt;
          font-weight: 600;
          color: #475569;
          margin: 0 0 2pt 0;
        }
        .cover-letter-render p {
          font-size: 10.5pt;
          margin-bottom: 10pt;
          color: #374151;
          line-height: 1.75;
          text-align: left !important;
        }
        .cover-letter-render strong {
          color: #0f172a;
          font-weight: 700;
        }
        .cover-letter-render hr {
          border: none;
          border-top: 1.5px solid #e2e8f0;
          margin: 12pt 0;
        }
        .cover-letter-render a {
          color: #7c3aed;
          text-decoration: none;
        }
        .cover-letter-render ul, .cover-letter-render ol {
          margin-bottom: 10pt;
          padding-left: 18pt;
        }
        .cover-letter-render li {
          font-size: 10.5pt;
          margin-bottom: 4pt;
          color: #374151;
          line-height: 1.7;
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

          /* Target individual print areas */
          #resume-print-area, #cover-letter-print-area {
            width: 100% !important;
            max-width: none !important;
            min-height: auto !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            transform: none !important;
            margin: 0 !important;
            background: white !important;
          }

          /* Page breaking when printing both */
          .preview-cover-letter-container {
            page-break-after: always;
            break-after: page;
            margin-bottom: 0 !important;
          }

          /* Contextual Hiding Based on Target */
          div[data-print-target="resume"] .preview-cover-letter-container {
            display: none !important;
          }
          div[data-print-target="cover-letter"] .preview-resume-container {
            display: none !important;
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
