import React from 'react';
import PromptGenerator from './PromptGenerator';
import PDFExport from './PDFExport';
import { Zap } from 'lucide-react';

const TipItem = ({ number, children }) => (
  <li className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
      {number}
    </span>
    <span>{children}</span>
  </li>
);

const SectionHeader = ({ step, stepClass, title, subtitle }) => (
  <div className="flex items-center gap-3.5 mb-6 no-print">
    <div className={`step-indicator ${stepClass}`}>{step}</div>
    <div>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
    </div>
  </div>
);

const MainLayout = () => {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pt-[120px] pb-[80px]">
      <div className="main-grid">

        {/* ── Left Column: Configure ─────────────────────── */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.05s' }}>

          <section>
            <SectionHeader
              step="01"
              stepClass="step-indicator-violet"
              title="Configure Pipeline"
              subtitle="Tailor your resume to the target role"
            />
            <PromptGenerator />
          </section>

          {/* Tips card */}
          <div className="glass-card p-5 no-print" style={{ borderTop: '2px solid rgba(124,58,237,0.25)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <Zap size={13} style={{ color: 'var(--accent)' }} />
              </div>
              <span className="text-[10px] font-bold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--accent)' }}>
                Pro Tips
              </span>
            </div>

            <ul className="space-y-3">
              <TipItem number="1">
                Use <strong>Claude Sonnet</strong> or <strong>GPT-4o</strong> for the best results.
              </TipItem>
              <TipItem number="2">
                Paste the <strong>full job description</strong> including tech stack and requirements.
              </TipItem>
              <TipItem number="3">
                Paste the AI result into the <strong>editor on the right</strong> to preview & export.
              </TipItem>
            </ul>
          </div>

        </div>

        {/* ── Right Column: Preview & Export ────────────── */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <section>
            <SectionHeader
              step="02"
              stepClass="step-indicator-emerald"
              title="Preview & Export"
              subtitle="Review and download as PDF"
            />
            <PDFExport />
          </section>
        </div>

      </div>
    </main>
  );
};

export default MainLayout;
