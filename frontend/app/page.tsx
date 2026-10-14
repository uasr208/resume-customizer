"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { JDInput } from "@/components/JDInput";
import { FileUpload } from "@/components/FileUpload";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [customizedResume, setCustomizedResume] = useState("");
  const [error, setError] = useState("");

  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide a valid Job Description.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your resume file (PDF or DOCX).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("job_description", jobDescription);
      formData.append("resume", resumeFile);

      // Backend API endpoint call
      const response = await fetch(
        "http://localhost:8000/api/customize-resume",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to process resume customization.",
        );
      }

      setCustomizedResume(data.customized_resume);
    } catch (err: any) {
      setError(
        err.message ||
          "Something went wrong. Ensure backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Inputs Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <JDInput value={jobDescription} onChange={setJobDescription} />
          <FileUpload file={resumeFile} onFileChange={setResumeFile} />
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition flex items-center gap-3 disabled:opacity-50 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Optimizing Resume
                with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Tailored Resume
              </>
            )}
          </button>
        </div>

        {/* Output Result */}
        {customizedResume && <ResultDisplay resultText={customizedResume} />}
      </main>
    </div>
  );
}
