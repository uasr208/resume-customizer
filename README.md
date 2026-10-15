# AI Resume Customizer (ThePrepLab Assignment)

An enterprise-grade, AI-powered web application that takes a Job Description and a candidate's resume (PDF/DOCX), analyzes the semantic alignment and missing keywords using OpenRouter LLMs, and generates a fully tailored resume optimized for ATS systems with multi-format exports.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, jsPDF
- **Backend:** Python, Flask, Flask-CORS, PyPDF2, python-docx, Requests, OpenRouter API (`openrouter/free`)

## Key Features

- **Responsive Split-Screen UI:** Modern dashboard layout eliminating vertical scrolling and crowding.
- **ATS Match Score & Analysis:** Real-time match percentage indicator and missing keyword breakdown tags.
- **Robust Document Parsing:** Extracts text seamlessly from both PDF and DOCX files.
- **Multi-Format Export Options:** Guaranteed crop-free **Download TXT**, copy-to-clipboard, and formatted PDF export.

## Local Setup Instructions

1. **Clone the repository & navigate to project:**
   ```bash
   git clone [https://github.com/uasr208/resume-customizer.git](https://github.com/uasr208/resume-customizer.git)
   cd resume-customizer
   Set up Python Flask Backend:
   ```

Bash
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file inside backend/ and add your OpenRouter API key:

Code snippet
OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
Run the Flask server:

Bash
python main.py
Set up Next.js Frontend:

Bash
cd ../frontend
npm install
npm run dev
Open http://localhost:3000 in your browser to use the application.
