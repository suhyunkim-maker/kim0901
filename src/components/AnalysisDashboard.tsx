import { AnalysisResult } from '../types';
import { FileText, Hash, Sparkles, MessageSquareQuote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  data: AnalysisResult;
}

export function AnalysisDashboard({ data }: Props) {
  return (
    <div className="flex flex-col gap-10">
      {/* 1. Keywords Row - TOP */}
      <div className="bg-white/50 p-8 rounded-[2.5rem] border-4 border-white flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="flex items-center gap-3 text-slate-400 min-w-32">
          <Hash className="w-5 h-5 text-primary" />
          <span className="text-xs font-black uppercase tracking-wider">주요 키워드</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.keywords.map((kw, i) => (
            <span key={i} className="text-sm px-5 py-2 bg-white text-primary font-bold rounded-2xl border-2 border-secondary shadow-sm hover:scale-105 transition-transform">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Document Headers Extraction */}
      <div className="bg-secondary/30 p-10 rounded-[3rem] border-2 border-dashed border-primary/20">
        <h4 className="text-xs font-bold text-primary/60 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
          <FileText className="w-4 h-4" />
          추출된 문서 주요 제목
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.headers.map((header, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-white shadow-sm">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary text-[10px] font-black rounded-lg flex items-center justify-center">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-bold text-slate-700 leading-tight">{header}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI Summary Section (Previous blogDraft) */}
      <section className="bg-white p-12 rounded-[4rem] border-4 border-white shadow-2xl shadow-primary/5 min-h-[400px] relative">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            문서 본문 정리
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            본문 내용 정리 📋
          </h3>
        </header>
        
        <article className="markdown-body prose prose-slate prose-xl max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-loose px-4">
           <ReactMarkdown>{data.blogDraft}</ReactMarkdown>
        </article>
      </section>

    </div>
  );
}
