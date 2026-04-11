# 🚀 AI Resume Architect

AI-Powered job application pipeline application with a sleek, premium, visually rich UI. 

Use this tool to automatically generate and format your resume for ATS tracking systems and professional human review, tailor prompts intelligently via contextual AI mapping, and render PDF exports with clean typesetting directly in your browser.

---

## ✨ Features

- **Dual-Mode Optimization**: Toggle between ATS-friendly (clean, dense, parsable) and Visual (rich formatting) resume modes.
- **Integrated Prompts**: No more copy-pasting from text files. The app dynamically generates exact prompts for ChatGPT/Claude based on your resume and job description.
- **Cover Letter Engine**: Dedicated mode to generate beautiful, professional cover letters alongside your resume, with bespoke typography.
- **Live Markdown Parsing**: Paste AI outputs back into the app and see them render instantly via `react-markdown`.
- **1-Click PDF Export**: Built-in CSS print logic. Print your resume, cover letter, or a combined PDF directly from the browser natively, without requiring python scripts or WEasyPrint.
- **Premium Glassmorphism UI**: Beautiful, interactive dark/light mode UI built with Tailwind CSS.

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
2. Ensure the "Need Cover Letter?" toggle is enabled to generate independent prompts for both a Resume and Cover Letter.
3. Click **Copy** on the Resume Prompt, paste it into your LLM (Claude/ChatGPT/Gemini), and copy the markdown output into the **AI Result Editor**.
4. Repeat for the Cover Letter Prompt.
5. Review the **Live Previews** on the right panel.
6. Click **Print Resume**, **Print Cover Letter**, or **Export Combined PDF** and use your browser's "Save as PDF" function (ensure margins are set to default/none).


