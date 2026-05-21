import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzePDFContent(text: string): Promise<AnalysisResult> {
    // Forcefully remove watermarks and metadata strings
    const cleanedText = text
      .replace(/Downloaded by kakao418593\(DIGITAL\)/gi, '')
      .replace(/0901suhyunkim@gmail\.com/gi, '')
      .substring(0, 25000);

    const prompt = `
    You are a professional Document Content Clerk. Your task is to ORGANIZE and LIST the literal content of the provided PDF text in KOREAN (한국어).
    
    **STRICT RULES**:
    - DO NOT analyze, refine, or provide "insights".
    - DO NOT summarize the content into your own words.
    - DO NOT describe the document's structure (e.g., "This contains page numbers...").
    - JUST listing the original text/content found in the document.
    - IGNORE all metadata, watermarks, or repeated headers/footers.
    - NEVER mention user identification, email addresses, or "Downloaded by...".

    YOUR OUTPUT MUST BE IN JSON AND FOLLOW THESE CONTENT GUIDELINES:
    1. [summary]: A single sentence identifying the subject of the document (Korean).
    2. [keywords]: Top 5-7 key thematic terms from the text (Korean).
    3. [headers]: List of ONLY the main titles/headers found in the text.
    4. [blogDraft]: This is the "Full Document Content (본문 상세 전문 정리)". 
       - Use the EXACT headers and titles found in the PDF (large font/titles) using ### markdown.
       - **CRITICAL**: Under each header, extract and list the literal content from the PDF as extensively as possible.
       - **GOAL**: Provide a high-volume, verbatim-style extraction (aim for approximately 100 lines or significant detail per major section).
       - DO NOT summarize. DO NOT paraphrase. DO NOT analyze.
       - JUST list the original sentences and paragraphs in a clean, readable format.
       - Remove repetitive metadata or scanning artifacts but keep the primary text.
    5. [suggestedTitle]: The main title of the document.

    FORMATTING RULES:
    - Use clear Markdown for [blogDraft].
    - Headers MUST be preceded by at least TWO newlines.
    - Neutral and faithful Korean presentation.
    - No literal escape sequences like "\\n".
    
    TEXT FROM PDF:
    ${cleanedText}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          headers: { type: Type.ARRAY, items: { type: Type.STRING } },
          blogDraft: { type: Type.STRING },
          suggestedTitle: { type: Type.STRING }
        },
        required: ["summary", "keywords", "headers", "blogDraft", "suggestedTitle"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid response from AI model");
  }
}
