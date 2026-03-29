// PDF text extraction tool

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href;

export interface PDFParseResult {
  text: string;
  pageCount: number;
  success: boolean;
  error?: string;
}

export async function extractTextFromPDF(file: File): Promise<PDFParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pageCount = pdf.numPages;
    
    const textParts: string[] = [];
    
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: unknown) => {
          const textItem = item as { str?: string };
          return textItem.str || '';
        })
        .join(' ');
      textParts.push(pageText);
    }
    
    return {
      text: textParts.join('\n\n'),
      pageCount,
      success: true,
    };
  } catch (error) {
    return {
      text: '',
      pageCount: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
