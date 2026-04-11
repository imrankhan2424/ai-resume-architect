import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Briefcase, Sparkles } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import clsx from 'clsx';

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
- Keep the language highly professional and tailored to ensure it passes both ATS scanners with a high score and impresses HR reviewers
- Mirror exact keywords, phrases, and terminology from the job description
- Use simple, clean Markdown only: headers (##), bullet points (-), plain text
- The system will directly parse your Markdown using ReactMarkdown and print it as a structured PDF
- For bullets to parse correctly, you MUST leave an empty line before starting any bulleted list (- )
- Keep "Technical Skills" as categorized bullet points (e.g., - **Automation:** Selenium...)
- Condense "Expertise" and "Core Competencies" into a single succinct "Key Skills" section
- Format Key Skills inline separated by pipes (e.g., Skill 1 | Skill 2 | Skill 3) to save vertical space
- Do NOT use tables, emojis, icons, columns, or any special characters
- Strengthen bullet points using the CAR format (Challenge → Action → Result)
- Add a "Key Skills" or "Summary" section at the top if it improves ATS scoring
- Do NOT invent any experience, tools, certifications, or metrics
- Ensure job titles, company names, and dates remain exactly as provided
- ALL company experiences MUST be presented in bullet-point format (-)
- Constrain the total length so the generated resume fits perfectly within two A4 pages
- If an experience block gets cropped between two A4 pages, adjust the content length or instruct to shift it to the next page
- If the content cannot fit within 2 pages normally, adjust the sections and brevity to make it fit

- Return ONLY the updated plain Markdown resume in a single .md compatible code block. No explanations or conversational text.

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
- Keep the language highly professional and tailored to ensure it passes both ATS scanners with a high score and impresses HR reviewers
- Use strong action verbs and quantifiable achievements where possible
- Add relevant keywords from the job description naturally into the content
- The system will directly parse your Markdown using ReactMarkdown and print it as a structured PDF
- For bullets to parse correctly, you MUST leave an empty line before starting any bulleted list (- )
- Do NOT invent any experience, tools, or metrics that are not already in the resume
- Keep "Technical Skills" as categorized bullet points (e.g., - **Automation:** Selenium...)
- Condense "Expertise" and "Core Competencies" into a single succinct "Key Skills" section formatted inline (Skill 1 | Skill 2 | Skill 3) to save vertical space
- Do NOT change the overall structure, headings, or emoji icons except to save space as requested
- Do NOT remove any sections
- Keep the output in the same Markdown format
- ALL company experiences MUST be presented in bullet-point format (-)
- Constrain the total length so the generated resume fits perfectly within two A4 pages
- If an experience block gets cropped between two A4 pages, adjust the content length or instruct to shift it to the next page
- If the content cannot fit within 2 pages normally, adjust the sections and brevity to make it fit

- Return ONLY the updated Markdown resume in a single .md compatible code block. No explanations or conversational text.

--- MY RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(assemblePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const modeBadge = mode === 'ats'
    ? { label: 'ATS Mode', color: 'badge badge-emerald' }
    : { label: 'Visual Mode', color: 'badge badge-accent' };

  return (
    <div className="space-y-4">

      {/* ── Job Description Input ─────────────────── */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
              <Briefcase size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <span className="section-label">Target Role Details</span>
          </div>
          <span className="badge badge-accent">Required</span>
        </div>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here — role, requirements, tech stack, company culture…"
          className="input-base"
          style={{ minHeight: '200px' }}
        />

        <p className="mt-3 text-[10.5px] font-medium" style={{ color: 'var(--text-muted)' }}>
          The more complete the job description, the better the AI alignment.
        </p>
      </div>

      {/* ── Generated Prompt Output ───────────────── */}
      <div className="glass-card overflow-hidden">
        {/* Header bar */}
        <div className="border-b" style={{ padding: '1.5rem 1.75rem 1.25rem', borderColor: 'var(--glass-border)' }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(217,119,6,0.1)' }}>
                  <Sparkles size={14} color="#d97706" />
                </div>
                <span className="section-label">AI Pipeline Prompt</span>
              </div>
              <div className="flex items-center gap-2 ml-9">
                <span className={modeBadge.color}>{modeBadge.label}</span>
                <span className="text-[9.5px] font-medium" style={{ color: 'var(--text-muted)' }}>— ready to copy</span>
              </div>
            </div>

            <button
              id="copy-prompt"
              onClick={handleCopy}
              className={clsx(
                "btn h-9 px-4 text-xs transition-all duration-300",
                copied ? "btn-emerald" : "btn-primary"
              )}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Code preview */}
        <div className="p-5">
          <div className="relative group">
            {/* Glow ring on hover */}
            <div className="absolute -inset-px rounded-[1.25rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' }} />
            <pre className="code-block h-[300px]">{assemblePrompt()}</pre>
            {/* Fade-out bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t rounded-b-[1.25rem] pointer-events-none opacity-80" style={{ backgroundImage: 'linear-gradient(to top, var(--bg-secondary), transparent)' }} />
          </div>

          {/* Tip footer */}
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-lg border" style={{ background: 'var(--accent-soft)', borderColor: 'var(--glass-border)' }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <MessageSquare size={12} style={{ color: 'var(--accent)' }} />
            </div>
            <p className="text-[10.5px] font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Copy the prompt above and paste it into your preferred LLM (ChatGPT, Claude, Gemini).
              The prompt is pre-configured for <strong>{mode.toUpperCase()}</strong> resume architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
