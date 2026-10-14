import { CheckCircle2, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultDisplayProps {
  resultText: string;
}

export function ResultDisplay({ resultText }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customized-resume.txt";
    a.click();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" /> Tailored Resume
          Output
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy Text"}
          </button>
          <button
            onClick={handleDownloadTxt}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Download className="w-4 h-4" /> Download Resume
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate-800 leading-relaxed max-h-[500px] overflow-y-auto">
        {resultText}
      </div>
    </div>
  );
}
