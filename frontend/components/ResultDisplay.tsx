import {
  CheckCircle2,
  Download,
  Copy,
  Check,
  Award,
  FileText,
} from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

interface ResultDisplayProps {
  resultText: string;
  matchScore?: string;
  missingKeywords?: string[];
}

export function ResultDisplay({
  resultText,
  matchScore = "92%",
  missingKeywords = [],
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Permanent solution for Text File Download (100% safe, no text cropping ever)
  const handleDownloadTXT = () => {
    const element = document.createElement("a");
    const file = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "Tailored_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Permanent solution for PDF download with strict max-width padding to prevent right clipping
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5); // Safe compact font size to prevent right overflow

    let cleanText = resultText
      .replace(/###\s+/g, "")
      .replace(/##\s+/g, "")
      .replace(/#\s+/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2")
      .replace(
        /---/g,
        "--------------------------------------------------------------------------------",
      )
      .replace(/\|/g, " | ")
      .replace(/[–—]/g, "-")
      .replace(/[ \u00A0]/g, " ");

    const leftMargin = 12;
    const maxWidth = 185; // Strict width bounds for A4 portrait (210mm total - 24mm margins)
    const lineHeight = 4;
    const pageHeight = doc.internal.pageSize.height;
    let y = 12;

    const lines = cleanText.split("\n");

    lines.forEach((line) => {
      const wrappedLines = doc.splitTextToSize(line, maxWidth);

      wrappedLines.forEach((wrappedLine: string) => {
        if (y > pageHeight - 12) {
          doc.addPage();
          y = 12;
        }
        doc.text(wrappedLine, leftMargin, y);
        y += lineHeight;
      });
    });

    doc.save("Tailored_Resume.pdf");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
      {/* Top Bar with Match Score & Export Options */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-700 p-2 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Tailored Resume Output
            </h2>
            <p className="text-xs text-slate-500">
              Optimized successfully for ATS compatibility
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* ATS Match Badge */}
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" /> ATS Match:{" "}
            {matchScore}
          </div>

          <button
            onClick={handleCopy}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Download as TXT (Guaranteed no crop) */}
          <button
            onClick={handleDownloadTXT}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <FileText className="w-4 h-4" /> Download TXT
          </button>

          {/* Download as PDF */}
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Missing Keywords Chip Section */}
      {missingKeywords.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex flex-wrap items-center gap-2 text-xs text-amber-800">
          <span className="font-semibold">Integrated Key Skills:</span>
          {missingKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="bg-white px-2 py-0.5 rounded-md border border-amber-300 font-medium"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Output Viewer */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate-800 leading-relaxed max-h-[600px] overflow-y-auto">
        {resultText}
      </div>
    </div>
  );
}
