import { Upload, FileCheck, X } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileUpload({ file, onFileChange }: FileUploadProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".docx")
      ) {
        onFileChange(droppedFile);
      } else {
        alert("Please upload a valid PDF or DOCX file.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col h-full justify-between">
      <div>
        <label className="font-semibold text-slate-800 flex items-center gap-2 text-base mb-3">
          <Upload className="w-5 h-5 text-indigo-600" /> Upload Original Resume
        </label>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-500 transition cursor-pointer relative bg-slate-50/50 flex flex-col items-center justify-center min-h-[220px]"
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onFileChange(e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {file ? (
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 px-4 py-3 rounded-xl z-10 w-full">
              <FileCheck className="w-6 h-6 text-indigo-600 flex-shrink-0" />
              <div className="text-left overflow-hidden flex-grow">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileChange(null);
                }}
                className="text-slate-400 hover:text-red-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Click to upload or drag & drop your resume
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF or DOCX format (Max 10MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
