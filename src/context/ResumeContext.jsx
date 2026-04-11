import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultResumes from '../config/defaults.json';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('resume-theme') || 'light');
  const [mode, setMode] = useState(localStorage.getItem('resume-mode') || 'visual');
  const [resumes, setResumes] = useState(() => {
    const saved = localStorage.getItem('resume-data');
    const savedVersion = parseInt(localStorage.getItem('resume-data-version') || '0', 10);
    const currentVersion = defaultResumes.version || 1;

    // If defaults.json was updated (version bumped), replace stale cache
    if (savedVersion < currentVersion) {
      localStorage.setItem('resume-data-version', String(currentVersion));
      localStorage.removeItem('resume-data');
      return { visual: defaultResumes.visual, ats: defaultResumes.ats };
    }

    if (saved) {
      const data = JSON.parse(saved);
      // Migrate legacy 'formatted' key to 'visual'
      if (data.formatted && !data.visual) {
        data.visual = data.formatted;
        delete data.formatted;
      }
      return data;
    }
    return { visual: defaultResumes.visual, ats: defaultResumes.ats };
  });
  const [jobDescription, setJobDescription] = useState('');
  const [aiResult, setAiResult] = useState('');

  useEffect(() => {
    localStorage.setItem('resume-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('resume-mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(resumes));
  }, [resumes]);

  const updateResume = (type, content) => {
    setResumes(prev => ({ ...prev, [type]: content }));
  };

  return (
    <ResumeContext.Provider value={{
      theme, setTheme,
      mode, setMode,
      resumes, updateResume,
      jobDescription, setJobDescription,
      aiResult, setAiResult
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
