import React from 'react';
import { Sun, Moon, Briefcase, FileText, Layout, List } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useResume();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export const ModeSwitcher = () => {
  const { mode, setMode } = useResume();
  return (
    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
      <button
        onClick={() => setMode('visual')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
          mode === 'visual'
            ? 'bg-indigo-500 text-white shadow-lg'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Layout size={16} />
        Visual
      </button>
      <button
        onClick={() => setMode('ats')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
          mode === 'ats'
            ? 'bg-indigo-500 text-white shadow-lg'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <List size={16} />
        ATS Friendly
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-card !rounded-t-none !border-x-0 !border-t-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Briefcase className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none">AI Resume Architect</h1>
          <p className="text-xs text-muted font-medium uppercase tracking-wider mt-1">Senior Optimization Kit</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ModeSwitcher />
        <div className="h-6 w-px bg-white/10" />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
