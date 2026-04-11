import React from 'react';
import Header from './Header';
import PromptGenerator from './PromptGenerator';
import PDFExport from './PDFExport';
import { useResume } from '../context/ResumeContext';
import { Settings, Info, ArrowRight } from 'lucide-react';

const MainLayout = () => {
  const { mode } = useResume();

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input & Prompt */}
        <div className="space-y-8 animate-fade-in no-print" style={{ animationDelay: '0.1s' }}>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-bold">Configure Pipeline</h2>
            </div>
            <PromptGenerator />
          </section>

          <footer className="pt-8 border-t border-white/5 opacity-50">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Info size={14} />
              Tips for success
            </div>
            <ul className="space-y-2 text-xs text-muted">
              <li>• Use **Claude 3.5 Sonnet** or **GPT-4o** for the best tailoring results.</li>
              <li>• Ensure the job description is pasted in full for maximum keyword matching.</li>
              <li>• Review the AI output and make minor tweaks in the editor if necessary.</li>
            </ul>
          </footer>
        </div>

        {/* Right Column: Preview & Export */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <section>
            <div className="flex items-center gap-2 mb-4 no-print">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-bold">Preview & Export</h2>
            </div>
            <PDFExport />
          </section>
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
