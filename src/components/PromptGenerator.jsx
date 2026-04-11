import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Briefcase, Zap } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PromptGenerator = () => {
  const { mode, resumes, jobDescription, setJobDescription } = useResume();
  const [copied, setCopied] = useState(false);

  const assemblePrompt = () => {
    const resumeText = resumes[mode];
    const isATS = mode === 'ats';

    if (isATS) {
      return `You are an expert ATS resume optimizer.

I will give you:
1. My resume in plain Markdown format (no icons, no heavy formatting)
2. A job description

Your task:
- Rewrite the resume to maximize ATS compatibility and keyword match
- Mirror exact keywords, phrases, and terminology from the job description
- Use simple, clean Markdown only: headers (##), bullet points (-), plain text
- Do NOT use tables, emojis, icons, columns, or any special characters
- Strengthen bullet points using the CAR format (Challenge → Action → Result)
- Add a "Key Skills" or "Summary" section at the top if it improves ATS scoring
- Do NOT invent any experience, tools, certifications, or metrics
- Ensure job titles, company names, and dates remain exactly as provided

Return ONLY the updated plain Markdown resume. No explanations.

--- MY RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
    }

    return `You are an expert resume optimizer.

I will give you:
1. My resume in Markdown format (with formatting, emojis, and section structure intact)
2. A job description

Your task:
- Rewrite bullet points to align with the job description requirements
- Use strong action verbs and quantifiable achievements where possible
- Add relevant keywords from the job description naturally into the content
- Do NOT invent any experience, tools, or metrics that are not already in the resume
- Do NOT change the structure, sections, headings, or emoji icons
- Do NOT remove any sections
- Keep the output in the same Markdown format

Return ONLY the updated Markdown resume. No explanations.

--- MY RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(assemblePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <label className="flex items-center gap-2 text-sm font-semibold mb-3">
          <Briefcase size={16} className="text-indigo-400" />
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to tailor your resume..."
          className="w-100 min-h-[200px] bg-black/20 border border-white/5 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      </div>

      <div className="glass-card p-6 border-t-4 border-t-indigo-500">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Zap size={16} className="text-yellow-400" />
            Generated Prompt ({mode.toUpperCase()})
          </label>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copied ? 'bg-green-500 text-white' : 'bg-white/5 hover:bg-white/10 text-muted hover:text-white'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
        
        <div className="relative group">
          <pre className="bg-black/40 rounded-xl p-6 text-xs font-mono text-gray-400 overflow-x-auto max-h-[400px] whitespace-pre-wrap leading-relaxed">
            {assemblePrompt()}
          </pre>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-50 group-hover:opacity-0 transition-opacity" />
        </div>
        
        <p className="mt-4 text-[11px] text-muted flex items-center gap-2 uppercase tracking-widest font-bold">
          <MessageSquare size={12} />
          Paste this into Claude, ChatGPT, or Gemini
        </p>
      </div>
    </div>
  );
};

export default PromptGenerator;
