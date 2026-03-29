// Image OCR tool using Tesseract.js

import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  success: boolean;
  error?: string;
}

export async function extractTextFromImage(file: File): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(file, 'eng+chi_sim', {
      logger: (m) => console.log('OCR progress:', m),
    });

    return {
      text: result.data.text.trim(),
      success: true,
    };
  } catch (error) {
    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown OCR error',
    };
  }
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || 
    /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i.test(file.name);
}