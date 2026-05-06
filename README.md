# 🚀 AI Resume Architect

AI-Powered job application pipeline application with a sleek, premium, visually rich UI. 

Use this tool to automatically generate and format your resume for ATS tracking systems and professional human review, tailor prompts intelligently via contextual AI mapping, and render PDF exports with clean typesetting directly in your browser.

---

## ✨ Features

- **Dual-Mode Optimization**: Toggle between ATS-friendly (clean, dense, parsable) and Visual (rich formatting) resume modes.
- **Integrated Prompts**: No more copy-pasting from text files. The app dynamically generates exact prompts for ChatGPT/Claude based on your resume and job description.
- **Cover Letter Engine**: Dedicated mode to generate beautiful, professional cover letters alongside your resume, with bespoke typography.
- **Live Markdown Parsing**: Paste AI outputs back into the app and see them render instantly via `react-markdown`.
- **1-Click PDF Export**: Built-in CSS print logic. Export your resume, cover letter, or a combined PDF directly from the browser natively. Features strict metadata handling and mandatory file naming via `flushSync` to ensure your exported PDFs always have clean, professional titles.
- **HR Outreach Hub**: Persistent lead tracking system that extracts recruiter details (name, email, company) from job descriptions and saves them to local storage. Features 1-click CSV export and "Reach Out" mailto links.
- **Premium Glassmorphism UI**: Beautiful, interactive dark/light mode UI built with Tailwind CSS v4.
- **5 Advanced Prompt Modifiers**:
  - **Score & Fix to ~100**: Injects an ATS scoring instruction into the prompt—the AI acts as an ATS, scores the resume out of 100, and lists exact gaps to fix.
  - **Reframe Older Experience**: Instructs the AI to rewrite older job roles into target titles while keeping the most recent experience untouched.
  - **Weave In Unfamiliar Tools**: Naturally mentions specified tools in older experience bullets where contextually plausible.
  - **Target HR Lead**: Generates a separate Lead Intel prompt to extract recruiter info directly into the Outreach Hub.
  - **Need Cover Letter?**: Appends a dedicated cover letter prompt section tailored to the role.

---

## 🏗️ Project Architecture & Dependency Graph

To optimize token usage and help developers map our project properly, we have mapped out the *Dependency Graph* and provided full file descriptions in a dedicated Architecture file.

**[View Application Architecture & Dependency Graph](ARCHITECTURE.md)**

---

## 🛠️ Why This Tech Stack Was Chosen

This application was intentionally designed to run natively in your browser with zero backend data storage, prioritizing privacy while maintaining premium fidelity. 

- **React 18 + Vite**: Chosen strictly for speed and simplicity. Vite's Hot Module Replacement (HMR) allows for ultra-fast UI iteration. React's Context API was more than enough for our state management (persisting prompts via `localStorage`), negating the heavy baggage of Next.js or Redux.
- **Tailwind CSS v4**: Picked for extreme styling velocity. With Tailwind v4's new engine, we eliminated complex config files entirely. It allowed us to instantly prototype our "glassmorphism" components natively over CSS variables without requiring bloated UI component libraries (like MUI or AntDesign). 
- **React-Markdown**: The backbone of the application. Since AI models output strictly in raw Markdown, injecting `react-markdown` bridges the gap perfectly—allowing the React engine to parse the AI output directly into DOM HTML nodes.
- **Native Browser Print Engine**: Replaced legacy dependency-heavy Python PDF utilities (like `weasyprint`). By leveraging dedicated `@media print` CSS classes and `data-print-target` architecture, we tricked the client's browser into acting as a high-fidelity rendering pipeline, meaning absolutely zero backend processing is required for PDF generation! 

---

## 🚀 Getting Started

**1. Install Dependencies**
```bash
npm install
```

**2. Start Development Server**
```bash
npm run dev
```

**3. Build for Production**
```bash
npm run build
```

---

## ⚡ Application Workflow

1. Paste the target **Job Description** into the required field.
2. *(Optional)* Enable **Need Cover Letter?** to also generate a cover letter prompt.
3. *(Optional)* Enable **Target HR Lead?** to generate a separate prompt that extracts recruiter name, email, and company from the job description.
4. *(Optional)* Enable **Score & Fix to ~100** — the AI will act as an ATS, score the resume, and list exact gaps to hit ~100 after generating the resume.
5. *(Optional)* Enable **Reframe Older Experience** and provide target job titles to have the AI rewrite older roles (not the most recent one) into those titles.
6. *(Optional)* Enable **Weave In Unfamiliar Tools** and list tools (e.g. Zendesk, Salesforce) to have the AI naturally mention them in older experience bullets.
7. Click **Copy** on the Resume Prompt, paste it into your LLM (Claude/ChatGPT/Gemini), and copy the markdown output into the **AI Result Editor**.
8. Repeat for the Cover Letter or Lead Intel prompts if enabled.
9. Review the **Live Previews** on the right panel.
10. If **Target HR Lead** was enabled, paste the AI extraction into the **Lead Outreach Editor** and click **Process & Save Lead** to persist them to the **HR Outreach Hub** at the bottom of the page.
11. Fill out the mandatory **Save as PDF Name** field in the Export Options. This ensures your file saves correctly and the internal PDF metadata looks completely professional to hiring managers.
12. Click **Save / Print Resume**, **Save / Print Cover Letter**, or **Export Combined PDF** and use your browser's "Save as PDF" function (ensure margins are set to default/none).

