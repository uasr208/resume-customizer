import { FileText } from "lucide-react";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JDInput({ value, onChange }: JDInputProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-slate-800 flex items-center gap-2 text-base">
          <FileText className="w-5 h-5 text-indigo-600" /> Job Description (JD)
        </label>
        <span className="text-xs text-slate-400">
          {value.length} characters
        </span>
      </div>
      <textarea
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the target job description here (e.g., Full Stack Developer role requirements)..."
        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-normal text-slate-700 resize-none flex-grow"
      />
      <p className="text-xs text-slate-500">
        Tip: Paste the complete job requirements so the AI can precisely target
        matching keywords.
      </p>
    </div>
  );
}
