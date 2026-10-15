# Project Architecture & Execution Plan: AI Resume Customizer

## 1. Overview

The AI Resume Customizer is a production-grade web application built to help job seekers intelligently tailor their resumes to specific Job Descriptions (JDs) using OpenRouter LLM APIs. The system features a decoupled architecture with a high-performance Next.js frontend and a robust Python Flask backend.

## 2. Tech Stack Architecture

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, jsPDF, Client-side State & Validation.
- **Backend:** Python Flask, Flask-CORS, PyPDF2 / python-docx (for document parsing), OpenRouter API (`openrouter/free`).
- **Deployment Strategy:** Vercel (Frontend) + Render / Railway (Backend).

## 3. Modular System Design & Separation of Concerns

- **Component-Driven Frontend:** Separation of UI into atomic, reusable components (`FileUpload.tsx`, `JDInput.tsx`, `ResultDisplay.tsx`, `Header.tsx`).
- **Service-Layer Backend:** Clean separation between Flask API routes (`/api/customize-resume`), document parsing handlers, and OpenRouter prompt engineering services.
- **Error Boundary & Validation:** Client-side file type/size checks and comprehensive backend exception handling for invalid files or API limits.

## 4. Development Milestones & Final Delivery

- **Milestone 1:** Initialize repository structure, documentation (`PLAN.md`, `README.md`), and environment templates (`.env.example`).
- **Milestone 2:** Build modular Next.js frontend with responsive split-screen layout, drag-and-drop file upload, and state management.
- **Milestone 3:** Develop Python Flask backend with secure file parsers (PyPDF2, python-docx) and structured LLM prompting via OpenRouter.
- **Milestone 4:** Integrate frontend-backend REST communication, ATS Match Score indicators, missing keyword chips, and safe multi-format export (`Download TXT` & PDF).
- **Milestone 5:** Production hardening, environment security (Secret protection), and submission readiness.
