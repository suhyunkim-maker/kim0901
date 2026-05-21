import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, RefreshCw, Share2 } from 'lucide-react';
import { Uploader } from './components/Uploader';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { extractTextFromPDF } from './lib/pdf';
import { analyzePDFContent } from './lib/gemini';
import { AnalysisResult } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    try {
      setError(null);
      setIsLoading(true);
      setFile(selectedFile);
      
      const text = await extractTextFromPDF(selectedFile);
      if (!text || text.trim().length < 50) {
        throw new Error("Could not extract enough text from this PDF. Please try another one.");
      }
      
      const result = await analyzePDFContent(text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Analysis failed");
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Header */}
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b-4 border-white flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-primary text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-800">Analyst's Draft ✨</span>
        </div>
        
        {analysis && (
          <div className="flex items-center gap-4">
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-16">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="max-w-3xl mx-auto space-y-12 pt-8"
            >
              <header className="text-center space-y-6">
                <h1 className="text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  데이터가 <span className="text-primary underline decoration-primary/20 underline-offset-8">이야기</span>가 되는 곳!
                </h1>
              </header>

              <Uploader onFileSelect={handleFileSelect} isLoading={isLoading} />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-red-50 border-4 border-white rounded-[2rem] text-red-500 text-sm font-bold text-center shadow-lg"
                >
                  어머나! 오류가 났어요: {error} 😿
                </motion.div>
              )}

              <footer className="pt-16 grid grid-cols-3 gap-8 border-t-4 border-white text-slate-300 text-[11px] font-black uppercase tracking-[0.2em] text-center">
                <div className="flex flex-col gap-2"><span className="text-2xl">📑</span> 01. PDF 쏙</div>
                <div className="flex flex-col gap-2"><span className="text-2xl">🤖</span> 02. AI 슥</div>
                <div className="flex flex-col gap-2"><span className="text-2xl">🪄</span> 03. 글 쨘</div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary w-fit transition-all hover:-translate-x-1"
                >
                  <ArrowLeft className="w-4" />
                  파일 다시 고르기
                </button>
              </div>

              <AnalysisDashboard data={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer minimal info */}
      <footer className="py-12 border-t-4 border-white px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">
          <div>© 2026 Analyst's Draft <span className="text-primary opacity-50">♥</span></div>
          <div>말랑말랑한 데이터 연구소</div>
        </div>
      </footer>
    </div>
  );
}
