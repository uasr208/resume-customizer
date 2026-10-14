# Project Architecture & Execution Plan: AI Resume Customizer

## 1. Overview

The AI Resume Customizer is an enterprise-grade web application designed to help job seekers intelligently tailor their resumes to specific Job Descriptions (JDs) using LLM APIs. The system features a decoupled architecture with a high-performance Next.js frontend and a robust Python FastAPI backend.

## 2. Tech Stack Architecture

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Client-side State & Validation.
- **Backend:** Python FastAPI, Pydantic, Uvicorn, PyPDF2 / python-docx (for document parsing), Google GenerativeAI / OpenRouter SDK.
- **Deployment Strategy:** Vercel (Frontend) + Render / Railway / Google Cloud Run (Backend).

## 3. Modular System Design & Separation of Concerns

- **Component-Driven Frontend:** Separation of UI into atomic, reusable components (`FileUpload.tsx`, `JDInput.tsx`, `ResultDisplay.tsx`, `Navbar.tsx`).
- **Service-Layer Backend:** Clean separation between API routes, document parsing handlers, and LLM prompt engineering services.
- **Error Boundary & Validation:** Client-side file type/size checks and comprehensive backend exception handling for invalid files or LLM rate limits.

## 4. Development Milestones & Atomic Commit Strategy

- **Milestone 1:** Initialize repository, documentation (`PLAN.md`, `README.md`), and `.env.example`.
- **Milestone 2:** Build modular Next.js frontend with responsive layout, drag-and-drop file upload, and state management.
- **Milestone 3:** Develop Python FastAPI backend with secure file parsers and structured LLM prompting.
- **Milestone 4:** Integrate frontend-backend REST communication, error feedback loops, and export/download features.
- **Milestone 5:** Production hardening, environment security, and live deployment.
