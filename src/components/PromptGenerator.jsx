import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Check, MessageSquare, Briefcase, Sparkles, FileText, Maximize2, X, Mail, UserCheck, PlusCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import clsx from 'clsx';

const PromptGenerator = () => {
  const { 
    mode, resumes, jobDescription, setJobDescription, 
    includeCoverLetter, setIncludeCoverLetter,
    includeLeadExtraction, setIncludeLeadExtraction 
  } = useResume();
  
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedLead, setCopiedLead] = useState(false);
  const [copiedJobDescription, setCopiedJobDescription] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); // 'resume' | 'cover' | 'lead' | null

  // ── Creative Reframing State ─────────────────────────────────────
  const [enableOtherRoles, setEnableOtherRoles] = useState(false);
  const [otherJobRoles, setOtherJobRoles] = useState('');
  const [enableUntouchedTools, setEnableUntouchedTools] = useState(false);
  const [untouchedTools, setUntouchedTools] = useState('');

  // ── Score .md File State ─────────────────────────────────────────
  const [enableScoreMd, setEnableScoreMd] = useState(false);

  const handleCopyJobDescription = () => {
    if (!jobDescription) return;
    navigator.clipboard.writeText(jobDescription);
    setCopiedJobDescription(true);
    setTimeout(() => setCopiedJobDescription(false), 2000);
  };

  // ── Lead Extraction Prompt ──────────────────────────────────────
  const assembleLeadExtractionPrompt = () => {
    return `You are an expert recruitment researcher. 
    
I will give you a job description. 

Your task:
- Extract specific HR / Lead information from the job description
- Format the output exactly like this structure:

Company: [Company Name]
Location: [Job Location/Remote]
Email: [HR or Recruiter Email]
Person: [Hiring Manager or Recruiter Name]

RULES:
- If any detail is missing, leave it as [NONE] or [UNKNOWN]
- Be precise. Extract only the information found in the text.
- Return ONLY the details above. No other text.

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
  };

  // ── Creative Reframing Block (injected into resume prompt when enabled) ──
  const buildCreativeReframingBlock = () => {
    const hasRoles = enableOtherRoles && otherJobRoles.trim();
    const hasTools = enableUntouchedTools && untouchedTools.trim();
    if (!hasRoles && !hasTools) return '';

    const lines = [
      '',
      '--- CREATIVE REFRAMING INSTRUCTIONS ---',
      'IMPORTANT: The following instructions apply ONLY to older / earlier experience entries (NOT the most recent job):',
      '- Keep ALL personal details (name, contact, education, certifications) exactly as they are',
      '- Keep the most recent work experience entry completely unchanged — do NOT alter its title, company, dates, or bullet points',
    ];

    if (hasRoles) {
      lines.push(
        `- For earlier/older experience entries, you MAY reframe the job role/title to one of these target roles: ${otherJobRoles.trim()}`,
        '  - The company name, dates, and personal achievements MUST remain believable and consistent with the real experience',
        '  - Adapt the bullet points to sound natural for that reframed role while still reflecting the actual work done',
        '  - Keep the reframing subtle and professional — the experience should feel genuine, not fabricated',
      );
    }

    if (hasTools) {
      lines.push(
        `- You MAY naturally mention these tools/technologies in older experience bullets where contextually plausible: ${untouchedTools.trim()}`,
        '  - Only weave them in where the actual tasks would realistically have involved such tools',
        '  - Do NOT contradict or override any QA-specific tools that must remain (e.g., Selenium, Jira, TestRail)',
        '  - The goal is to broaden the apparent skill surface without creating obvious contradictions',
      );
    }

    lines.push(
      '- The final resume must read as a cohesive, credible document — every change must feel earned and natural',
      '- Do NOT add any disclaimer or footnote about changes made',
    );

    return lines.join('\n');
  };

  // ── Score line (injected into prompt when enabled) ───────────────
  const scoringLine = enableScoreMd
    ? `\n- After outputting the resume, act as an ATS system, score it out of 100, and list the exact gaps that must be fixed to obtain a 95+ ATS score. No visual representation, just plain text format.`
    : '';

  // ── Resume Prompt ──────────────────────────────────────────────
  const assembleResumePrompt = () => {
    const resumeText = resumes[mode];
    const isATS = mode === 'ats';
    const creativeBlock = buildCreativeReframingBlock();

    const prompt = isATS
      ? `You are an expert ATS resume optimizer.

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
- If the content cannot fit within 2 pages normally, adjust the sections and brevity to make it fit${scoringLine}

- Return ONLY the updated plain Markdown resume in a single .md compatible code block. No explanations or conversational text.`
      : `You are an expert resume optimizer.

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
- If the content cannot fit within 2 pages normally, adjust the sections and brevity to make it fit${scoringLine}

- Return ONLY the updated Markdown resume in a single .md compatible code block. No explanations or conversational text.`;

    return `${prompt}${creativeBlock}

--- MY RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
  };

  // ── Cover Letter Prompt ─────────────────────────────────────────
  const assembleCoverLetterPrompt = () => {
    const resumeText = resumes[mode];

    return `You are an expert cover letter writer.

I will give you:
1. My resume
2. A job description

Your task:
- Write a professional, compelling cover letter tailored to the job description
- The system will directly parse your Markdown using ReactMarkdown and print it as a structured PDF
- Extract the company name, hiring manager (if available), and target role from the job description automatically

STRUCTURE (follow this exact format):
1. Start with my full name as an H1 heading (# Name)
2. On the next line, put my contact details (phone | email | LinkedIn | location) as plain text
3. Add a horizontal rule (---) as a visual separator
4. Date line (e.g., April 12, 2026)
5. If hiring manager name is found, address them. Otherwise use "Dear Hiring Manager,"
6. Opening paragraph — hook the reader, mention the exact role and company name
7. 2–3 body paragraphs — connect specific achievements from my resume to the job requirements. Use **bold** for key highlights
8. Closing paragraph — confident call to action, express availability
9. Sign off with "Warm regards," followed by my full name only (do NOT repeat contact details here)

FORMATTING RULES:
- Each paragraph must be separated by a blank line for proper Markdown parsing
- Keep paragraphs concise — 3-4 sentences maximum per paragraph
- Use **bold** sparingly for emphasis on core keywords from the job description, key skills, and metrics
- Do NOT use bullet points in the letter body — write in proper letter prose
- Professional tone — no generic filler phrases like "I am a hard worker"
- Constrain the total length so the cover letter fits perfectly within one A4 page
- Do NOT use tables, columns, emojis, or any special characters

- Return ONLY the cover letter in a single .md compatible code block. No explanations or conversational text.

--- MY RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription || '[PASTE JOB DESCRIPTION HERE]'}`;
  };

  const handleCopyResume = () => {
    navigator.clipboard.writeText(assembleResumePrompt());
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2200);
  };

  const handleCopyCover = () => {
    navigator.clipboard.writeText(assembleCoverLetterPrompt());
    setCopiedCover(true);
    setTimeout(() => setCopiedCover(false), 2200);
  };

  const handleCopyLead = () => {
    navigator.clipboard.writeText(assembleLeadExtractionPrompt());
    setCopiedLead(true);
    setTimeout(() => setCopiedLead(false), 2200);
  };

  const modeBadge = mode === 'ats'
    ? { label: 'ATS Mode', color: 'badge badge-emerald' }
    : { label: 'Visual Mode', color: 'badge badge-accent' };

  // Helper: get the active modal prompt text
  const getModalPrompt = () => {
    if (modalTarget === 'cover') return assembleCoverLetterPrompt();
    if (modalTarget === 'lead') return assembleLeadExtractionPrompt();
    return assembleResumePrompt();
  };

  const handleModalCopy = () => {
    const text = getModalPrompt();
    navigator.clipboard.writeText(text);
    if (modalTarget === 'cover') {
      setCopiedCover(true);
      setTimeout(() => setCopiedCover(false), 2200);
    } else if (modalTarget === 'lead') {
      setCopiedLead(true);
      setTimeout(() => setCopiedLead(false), 2200);
    } else {
      setCopiedResume(true);
      setTimeout(() => setCopiedResume(false), 2200);
    }
  };
  const isModalCopied = modalTarget === 'cover' ? copiedCover : (modalTarget === 'lead' ? copiedLead : copiedResume);

  // ── Reusable Prompt Section Component ───────────────────────────
  const PromptSection = ({ title, icon: Icon, iconColor, iconBg, badge, prompt, onCopy, copied, onExpand }) => (
    <div className="glass-card overflow-hidden">
      {/* Header bar */}
      <div className="border-b" style={{ padding: '1.5rem 1.75rem 1.25rem', borderColor: 'var(--glass-border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: iconBg }}>
                <Icon size={14} color={iconColor} />
              </div>
              <span className="section-label" style={{ marginBottom: 0 }}>{title}</span>
            </div>
            <div className="flex items-center gap-2 ml-9">
              <span className={badge.color}>{badge.label}</span>
              <span className="text-[9.5px] font-medium ml-2" style={{ color: 'var(--text-muted)' }}>— ready to copy</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExpand}
              className="btn h-9 px-3 text-xs transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              title="View Full Prompt"
            >
              <Maximize2 size={14} />
            </button>
            <button
              onClick={onCopy}
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
      </div>

      {/* Code preview */}
      <div className="p-5">
        <div className="relative group">
          {/* Glow ring on hover */}
          <div className="absolute -inset-px rounded-[1.25rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' }} />
          <pre className="code-block h-[300px]">{prompt}</pre>
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
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Job Description Input ─────────────────── */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
              <Briefcase size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <span className="section-label">Target Role Details</span>
          </div>
          <div className="flex items-center gap-2">
            {jobDescription && (
              <button
                onClick={handleCopyJobDescription}
                className={`btn h-7 px-3 text-[10.5px] transition-all duration-300 ${copiedJobDescription ? 'btn-accent' : ''}`}
                style={!copiedJobDescription ? { background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' } : {}}
              >
                {copiedJobDescription ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedJobDescription ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
            <span className="badge badge-accent">Required</span>
          </div>
        </div>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here — role, requirements, tech stack, company culture…"
          className="input-base"
          style={{ minHeight: '200px' }}
        />

        <div className="flex flex-col gap-5" style={{ marginTop: '1.5rem' }}>
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold transition-colors duration-300" style={{ color: includeCoverLetter ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--text-primary)' }}>Need Cover Letter?</span>
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Adds a cover letter prompt section below.</span>
            </div>
            <button
              onClick={() => setIncludeCoverLetter(!includeCoverLetter)}
              className="relative flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none shrink-0"
              style={{ 
                background: includeCoverLetter ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--border)',
              }}
            >
              <span
                className={clsx("inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md", includeCoverLetter ? "translate-x-6" : "translate-x-1")}
              />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold transition-colors duration-300" style={{ color: includeLeadExtraction ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--text-primary)' }}>Target HR Lead?</span>
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Identify recruiter email & name details separately.</span>
            </div>
            <button
              onClick={() => setIncludeLeadExtraction(!includeLeadExtraction)}
              className="relative flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none shrink-0"
              style={{ 
                background: includeLeadExtraction ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--border)',
              }}
            >
              <span
                className={clsx("inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md", includeLeadExtraction ? "translate-x-6" : "translate-x-1")}
              />
            </button>
          </div>

          {/* ── Divider */}
          <div style={{ borderTop: '1px solid var(--glass-border)', margin: '0.25rem 0' }} />

          {/* ── Score My .md File toggle ── */}
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold transition-colors duration-300" style={{ color: enableScoreMd ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--text-primary)' }}>Make 95+</span>
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>AI acts as ATS, scores the resume and lists exact gaps to hit 95+.</span>
            </div>
            <button
              onClick={() => setEnableScoreMd(v => !v)}
              className="relative flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none shrink-0"
              style={{
                background: enableScoreMd ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--border)',
              }}
            >
              <span
                className={clsx('inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md', enableScoreMd ? 'translate-x-6' : 'translate-x-1')}
              />
            </button>
          </div>

          {/* ── Divider (before creative reframing) */}
          <div style={{ borderTop: '1px solid var(--glass-border)', margin: '0.25rem 0' }} />

          {/* ── Other Job Roles toggle + input ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold transition-colors duration-300" style={{ color: enableOtherRoles ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--text-primary)' }}>Reframe Older Experience as…</span>
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>AI will adapt early job roles (not your latest QA role) to these target titles.</span>
              </div>
              <button
                onClick={() => setEnableOtherRoles(v => !v)}
                className="relative flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none shrink-0"
                style={{
                  background: enableOtherRoles ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--border)',
                }}
              >
                <span
                  className={clsx("inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md", enableOtherRoles ? "translate-x-6" : "translate-x-1")}
                />
              </button>
            </div>
            {enableOtherRoles && (
              <textarea
                id="other-job-roles"
                value={otherJobRoles}
                onChange={e => setOtherJobRoles(e.target.value)}
                placeholder="e.g. Customer Support Specialist, Technical Support Analyst, IT Help Desk — separate multiple roles with commas"
                className="input-base"
                style={{ minHeight: '72px', fontSize: '12px' }}
              />
            )}
          </div>

          {/* ── Unfamiliar Tools toggle + input ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold transition-colors duration-300" style={{ color: enableUntouchedTools ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--text-primary)' }}>Weave In Unfamiliar Tools</span>
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Mentions these tools in older experience bullets where contextually natural — latest QA experience stays untouched.</span>
              </div>
              <button
                onClick={() => setEnableUntouchedTools(v => !v)}
                className="relative flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none shrink-0"
                style={{
                  background: enableUntouchedTools ? (mode === 'ats' ? 'var(--emerald)' : 'var(--accent)') : 'var(--border)',
                }}
              >
                <span
                  className={clsx("inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md", enableUntouchedTools ? "translate-x-6" : "translate-x-1")}
                />
              </button>
            </div>
            {enableUntouchedTools && (
              <textarea
                id="unfamiliar-tools"
                value={untouchedTools}
                onChange={e => setUntouchedTools(e.target.value)}
                placeholder="e.g. Zendesk, Salesforce, Freshdesk, HubSpot — separate with commas"
                className="input-base"
                style={{ minHeight: '72px', fontSize: '12px' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Resume Prompt Section ──────────────────── */}
      <PromptSection
        title="Resume Prompt"
        icon={Sparkles}
        iconColor="#d97706"
        iconBg="rgba(217,119,6,0.1)"
        badge={modeBadge}
        prompt={assembleResumePrompt()}
        onCopy={handleCopyResume}
        copied={copiedResume}
        onExpand={() => setModalTarget('resume')}
      />

      {/* ── Cover Letter Prompt Section (conditional) ── */}
      {includeCoverLetter && (
        <PromptSection
          title="Cover Letter Prompt"
          icon={FileText}
          iconColor="#7c3aed"
          iconBg="rgba(124,58,237,0.1)"
          badge={{ label: 'Cover Letter', color: 'badge badge-accent' }}
          prompt={assembleCoverLetterPrompt()}
          onCopy={handleCopyCover}
          copied={copiedCover}
          onExpand={() => setModalTarget('cover')}
        />
      )}

      {/* ── Lead Extraction Prompt Section (conditional) ── */}
      {includeLeadExtraction && (
        <PromptSection
          title="Lead Intel Prompt"
          icon={Mail}
          iconColor="#4f46e5"
          iconBg="rgba(79,70,229,0.1)"
          badge={{ label: 'Lead Extraction', color: 'badge bg-indigo-100 text-indigo-700' }}
          prompt={assembleLeadExtractionPrompt()}
          onCopy={handleCopyLead}
          copied={copiedLead}
          onExpand={() => setModalTarget('lead')}
        />
      )}

      {/* ── Modal Portal ───────────────── */}
      {modalTarget && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setModalTarget(null)}>
          <div 
            className="w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in-95 duration-200 rounded-2xl overflow-hidden border" 
            onClick={e => e.stopPropagation()}
            style={{ background: '#0d1117', borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#161b22' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: modalTarget === 'cover' ? 'rgba(124, 58, 237, 0.15)' : (modalTarget === 'lead' ? 'rgba(79,70,229,0.15)' : 'rgba(217,119,6,0.15)') }}>
                  {modalTarget === 'cover' ? <FileText size={18} color="#c084fc" /> : (modalTarget === 'lead' ? <Mail size={18} color="#818cf8" /> : <Sparkles size={18} color="#fbbf24" />)}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-white">
                    {modalTarget === 'cover' ? 'Cover Letter Prompt' : (modalTarget === 'lead' ? 'Lead Extraction Prompt' : 'Resume Prompt')}
                  </h3>
                  <p className="text-[11px] text-slate-400">Ready to paste into ChatGPT or Claude</p>
                </div>
              </div>
              <button onClick={() => setModalTarget(null)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-hidden flex-1 flex flex-col relative" style={{ background: '#0d1117' }}>
              <div className="overflow-y-auto flex-1 relative z-20">
                <pre className="text-[13px] leading-7 font-mono whitespace-pre-wrap select-all text-slate-300" style={{ padding: '2rem 2.5rem', margin: 0, tabSize: 2 }}>{getModalPrompt()}</pre>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none z-30" />
            </div>

            <div className="p-4 px-6 flex justify-between items-center" style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs text-slate-400 flex items-center gap-2 hidden sm:flex">
                <MessageSquare size={14} /> Paste this entire block directly into your LLM chat.
              </span>
              <button
                onClick={handleModalCopy}
                className={clsx(
                  "btn h-10 px-6 text-sm font-semibold shadow-xl transition-all duration-300 border-0 text-white w-full sm:w-auto",
                  isModalCopied 
                    ? "bg-emerald-600 hover:bg-emerald-500" 
                    : (modalTarget === 'cover' ? "bg-violet-600 hover:bg-violet-500" : (modalTarget === 'lead' ? "bg-indigo-600 hover:bg-indigo-500" : "bg-amber-600 hover:bg-amber-500"))
                )}
              >
                {isModalCopied ? <Check size={16} /> : <Copy size={16} />}
                <span>{isModalCopied ? 'Copied to Clipboard!' : 'Copy Prompt'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default PromptGenerator;
