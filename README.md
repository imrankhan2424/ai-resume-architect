# 🚀 AI Resume Architect

A premium, streamlined web application for modern job seekers. Automate your resume tailoring process, generate optimized AI prompts, and export high-fidelity, ATS-friendly PDFs in seconds.

---

## ✨ Features

- **Dual-Mode System**: Instantly toggle between **Visual (Human-Optimized)** and **ATS Friendly (Machine-Optimized)** resume templates.
- **Smart Prompt Engine**: Automatically assembles the perfect tailoring prompt for Claude, ChatGPT, or Gemini based on your base resume and job description.
- **High-Fidelity PDF Export**: Replicates professional professional layouts using high-quality CSS print styles.
- **Dynamic Context**: Edit your resumes live in the app; changes are saved locally to your browser.
- **Modern UI**: Sleek, glassmorphic design with full **Dark Mode** and **Light Mode** support.

---

## 🛠️ Why This Tool Stack?

This application is engineered for speed, professional aesthetics, and seamless AI integration.

- **React 18 & Vite**: The foundation for a high-performance, reactive user interface. Vite provides near-instant HMR, which is critical for fine-tuning CSS print layouts.
- **Modern Vanilla CSS**: Instead of generic UI libraries, we use a custom-crafted CSS design system with CSS variables and glassmorphism. This ensures a "premium" feel while maintaining total control over PDF print accuracy.
- **React Markdown**: Tailored resumes from LLMs (Claude/GPT) are typically delivered in Markdown. This stack allows for instant, real-time rendering of complex AI output directly into professional templates.
- **Lucide React**: A lightweight, crisp icon set that enhances the visual hierarchy without sacrificing performance.
- **Zero-Backend Architecture**: By leveraging `localStorage` and client-side processing, your data staying strictly in your browser, ensuring maximum privacy for your professional information.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch the Application
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ The Pipeline Workflow

### Step 1 — Configure Details
Paste the target Job Description (JD) into the left-hand panel. The app will automatically sync this with your selected resume version.

### Step 2 — Generate & Copy
Click **"Copy Prompt"**. This creates a comprehensive set of instructions for your AI—including your resume data and the JD—optimized for the best results.

### Step 3 — AI Tailoring
Paste the prompt into Claude, ChatGPT, or Gemini. The AI will provide a rewritten, keyword-rich version of your resume.

### Step 4 — Preview & Export
Copy the AI's output and paste it into the **Preview** area. Review the formatting, then click **"Print to PDF"**. Ensure "Save as PDF" is selected in your browser's print dialog.

---

## ⚙️ Customization

Your default resume data is stored in:
`src/config/defaults.json`

You can update this file to set your permanent base resumes, or simply edit them directly within the application's interface.

---

## 📂 Project Structure

- `src/components/`: Core UI components (Prompt Generator, PDF Engine, Mode Switcher).
- `src/context/`: State management for themes, modes, and data persistence.
- `src/styles/`: Premium design tokens and global styles.
- `legacy_assets/`: Your original resume files and documentation.

---

*Built for high-performance job applications.*
