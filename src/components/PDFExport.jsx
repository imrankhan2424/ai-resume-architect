import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Printer, FileDown, Eye } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PDFExport = () => {
  const { mode, aiResult, setAiResult } = useResume();
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <label className="flex items-center gap-2 text-sm font-semibold mb-3">
          <Eye size={16} className="text-emerald-400" />
          AI Output Preview
        </label>
        
        <div className="mb-4">
          <textarea
            value={aiResult}
            onChange={(e) => setAiResult(e.target.value)}
            placeholder="Paste the tailored result from your AI here to preview and download..."
            className="w-100 min-h-[150px] bg-black/20 border border-white/5 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        {aiResult && (
          <div className="flex items-center gap-3 mb-6 no-print">
            <button
              onClick={handlePrint}
              className="btn btn-primary bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
            >
              <Printer size={18} />
              Print to PDF
            </button>
            <p className="text-xs text-muted font-medium italic">
              Use "Save as PDF" in the print dialog for high-quality export.
            </p>
          </div>
        )}

        <div 
          className={`preview-container bg-white text-black p-[1in] rounded-lg shadow-2xl min-h-[11in] w-full max-w-[8.5in] mx-auto overflow-hidden ${
            mode === 'ats' ? 'ats-style' : 'visual-style'
          }`}
        >
          <div className="resume-content">
            <ReactMarkdown className="markdown-body">
              {aiResult || '### Preview will appear here once you paste your content...'}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preview-container {
          font-family: 'Arial', sans-serif;
          line-height: 1.5;
        }
        .markdown-body h1 { font-size: 24pt; margin-bottom: 0.2rem; border-bottom: none; }
        .markdown-body h2 { font-size: 14pt; border-bottom: 1px solid #ccc; padding-bottom: 0.1rem; margin-top: 1rem; text-transform: uppercase; }
        .markdown-body h3 { font-size: 11pt; margin-top: 0.8rem; margin-bottom: 0.1rem; }
        .markdown-body p { font-size: 10.5pt; margin-bottom: 0.4rem; }
        .markdown-body ul { margin-bottom: 0.4rem; padding-left: 1.2rem; }
        .markdown-body li { font-size: 10.5pt; margin-bottom: 0.2rem; }
        
        .ats-style { font-family: 'Times New Roman', serif; }
        .visual-style { font-family: 'Arial', sans-serif; }
        
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          body * { visibility: hidden; }
          .preview-container, .preview-container * {
            visibility: visible;
          }
          .preview-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default PDFExport;
