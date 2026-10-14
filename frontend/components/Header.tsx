import { Sparkles, FileCode2 } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white py-4 px-6 md:px-12 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              ThePrepLab Assignment
            </h1>
            <p className="text-xs text-slate-500">
              AI-Powered Resume Customizer & ATS Optimizer
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> Next.js & Python Architecture
        </div>
      </div>
    </header>
  );
}
