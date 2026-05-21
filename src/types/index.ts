export interface AnalysisResult {
  summary: string;
  keywords: string[];
  blogDraft: string;
  suggestedTitle: string;
  headers: string[];
}

export interface PDFData {
  text: string;
  fileName: string;
  pageCount: number;
}
