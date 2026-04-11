# 🚀 Resume Pipeline Prompts
### AI-Powered Job Application Toolkit — YOUR NAME

Use these prompts in **Claude**, **ChatGPT**, or **Gemini**.
Each prompt is self-contained — paste the relevant markdown content where indicated.

---

## 📁 Files in This Kit

| File | Purpose |
|---|---|
| `Imran_Khan_Resume_Formatted.md` | Full resume with emojis & visual structure |
| `Imran_Khan_Resume_Content_Only.md` | Plain text resume for ATS optimization |
| `Resume_Pipeline_Prompts.html` | This prompt kit as a browser page with copy buttons |
| `md_to_pdf.py` | Python script to convert .md → PDF |

---

## ⚡ Recommended Workflow

```
Imran_Khan_Resume_Content_Only.md
        ↓
[Prompt 2] ATS Resume  →  Tailored_ATS_Resume.md
        ↓
[Prompt 3] Cover Letter  →  Cover_Letter.md
        ↓
[Prompt 4] Python Script  →  .pdf files ✅

Optional: [Prompt 1] for a visually formatted PDF version
```

---

## Prompt 1 — Tailored Resume (Format Preserved)

**Use with:** `Imran_Khan_Resume_Formatted.md`  
**When:** Applying to roles where a human reviews the resume and visual formatting matters.

```
You are an expert resume optimizer.

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
[PASTE Imran_Khan_Resume_Formatted.md content here]

--- JOB DESCRIPTION ---
[PASTE the job description here]
```

---

## Prompt 2 — ATS-Friendly Resume

**Use with:** `Imran_Khan_Resume_Content_Only.md`  
**When:** Submitting through online portals, LinkedIn Easy Apply, or any large company ATS.

```
You are an expert ATS resume optimizer.

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
[PASTE Imran_Khan_Resume_Content_Only.md content here]

--- JOB DESCRIPTION ---
[PASTE the job description here]
```

---

## Prompt 3 — Cover Letter Generator

**Run after:** Prompt 1 or Prompt 2  
**Input:** Paste the AI's tailored resume output as the resume input below.

```
You are a professional career assistant.

I will give you:
1. My tailored resume in Markdown
2. A job description
3. The company name and role I am applying for

Your task:
Write a professional cover letter with:
- A strong opening paragraph that hooks the reader
- 2–3 body paragraphs connecting my experience to the job requirements
- Specific achievements from my resume that match the job
- A confident closing paragraph with a call to action
- Professional tone — no generic filler phrases like "I am a hard worker"
- Length: 3–4 paragraphs, no longer than one page
- Do NOT use placeholders like [Your Name] — use my actual details from the resume

Format the output in plain Markdown.

--- MY TAILORED RESUME ---
[PASTE your tailored resume here]

--- JOB DESCRIPTION ---
[PASTE the job description here]

--- APPLYING FOR ---
Company: [Company Name]
Role: [Job Title]
```

---

## Prompt 4 — Markdown → PDF Converter (Python)

### Step 1 — Install dependencies

```bash
pip install markdown weasyprint
```

### Step 2 — Save as `md_to_pdf.py`

```python
import markdown
from weasyprint import HTML
import sys

def md_to_pdf(input_md, output_pdf):
    with open(input_md, "r", encoding="utf-8") as f:
        md_content = f.read()

    html_body = markdown.markdown(md_content, extensions=["extra", "nl2br"])

    html_full = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.5;
                margin: 40px 50px;
                color: #1a1a1a;
            }}
            h1 {{ font-size: 22pt; margin-bottom: 2px; color: #000; }}
            h2 {{
                font-size: 13pt;
                border-bottom: 1px solid #ccc;
                padding-bottom: 4px;
                margin-top: 20px;
                color: #2c2c2c;
            }}
            h3 {{ font-size: 11pt; margin-bottom: 2px; color: #000; }}
            ul {{ margin: 4px 0; padding-left: 20px; }}
            li {{ margin-bottom: 4px; }}
            p {{ margin: 4px 0; }}
            hr {{ border: none; border-top: 1px solid #ddd; margin: 14px 0; }}
            a {{ color: #0057b8; text-decoration: none; }}
        </style>
    </head>
    <body>{html_body}</body>
    </html>
    """

    HTML(string=html_full).write_pdf(output_pdf)
    print(f"PDF saved to: {output_pdf}")

if __name__ == "__main__":
    if len(sys.argv) == 3:
        md_to_pdf(sys.argv[1], sys.argv[2])
    else:
        md_to_pdf("Imran_Khan_Resume_Formatted.md", "Imran_Khan_Resume_Formatted.pdf")
        md_to_pdf("Imran_Khan_Resume_Content_Only.md", "Imran_Khan_Resume_ATS.pdf")
```

### Step 3 — Run it

```bash
# Convert ATS resume
python md_to_pdf.py Tailored_ATS_Resume.md Tailored_ATS_Resume.pdf

# Convert cover letter
python md_to_pdf.py Cover_Letter.md Cover_Letter.pdf

# Convert formatted resume
python md_to_pdf.py Imran_Khan_Resume_Formatted.md Imran_Khan_Resume.pdf
```

---

## 💡 Tips

- **Always tailor per job** — never send the same resume twice
- **Match the job title** in your resume summary if it's close to your current title
- **Keep metrics** — numbers dramatically increase ATS and human review scores
- **One page** for the cover letter, two pages max for the resume
- **Open the HTML file** (`Resume_Pipeline_Prompts.html`) in any browser for copy buttons on every prompt

---

*Senior Software Test Engineer · City, Country · your.email@example.com*
