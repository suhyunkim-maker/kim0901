import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function Uploader({ onFileSelect, isLoading }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative group cursor-pointer transition-all duration-500",
        "border-4 border-dashed rounded-[3rem] p-16 text-center",
        isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-slate-200 hover:border-primary/40 bg-white shadow-xl shadow-primary/5",
        isLoading && "opacity-50 pointer-events-none"
      )}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center gap-6">
        <div className={cn(
          "w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-lg",
          isDragging ? "bg-primary text-white rotate-6" : "bg-secondary text-primary"
        )}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-current" />
          ) : (
            <Upload className="w-10 h-10" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 leading-tight">
            {isLoading ? "리포트 분석 중이에요! ✨" : "PDF 파일을 여기에 쏙!"}
          </h3>
          <p className="text-slate-500 font-medium">
            똑똑하게 분석해서 멋진 글을 만들어 드릴게요.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-6 py-3 bg-accent/20 rounded-full border-2 border-accent/30">
          <FileText className="w-5 h-5 text-accent" />
          <span className="text-sm font-bold text-accent">PDF 데이터만 가능해요!</span>
        </div>
      </div>
    </div>
  );
}
