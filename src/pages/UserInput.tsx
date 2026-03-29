// User input component

import { useState, DragEvent } from 'react';
import { extractTextFromPDF, isPDFFile, extractTextFromImage, isImageFile } from '../tools';

interface UserInputProps {
  onAnalyze: (candidateBackground: string, jobDescription: string) => void;
  isLoading: boolean;
}

export function UserInput({ onAnalyze, isLoading }: UserInputProps) {
  const [candidateBackground, setCandidateBackground] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [candidateFileName, setCandidateFileName] = useState<string | null>(null);
  const [jobFileName, setJobFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleFile = async (
    file: File,
    setText: (text: string) => void,
    setFileName: (name: string | null) => void
  ) => {
    let result;
    if (isPDFFile(file)) {
      result = await extractTextFromPDF(file);
    } else if (isImageFile(file)) {
      result = await extractTextFromImage(file);
    } else {
      return;
    }
    
    if (result.success) {
      setText(result.text);
      setFileName(file.name);
    }
  };

  const handleDrop = (
    e: DragEvent<HTMLTextAreaElement>,
    setText: (text: string) => void,
    setFileName: (name: string | null) => void
  ) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    handleFile(file, setText, setFileName).finally(() => setIsProcessing(false));
  };

  const handleDragOver = (e: DragEvent<HTMLTextAreaElement>, zone: string) => {
    e.preventDefault();
    setDragOver(zone);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateBackground.trim() && jobDescription.trim() && !isLoading) {
      onAnalyze(candidateBackground, jobDescription);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>你的背景</label>
        {candidateFileName && <span className="file-badge">📄 {candidateFileName}</span>}
        <textarea
          value={candidateBackground}
          onChange={(e) => setCandidateBackground(e.target.value)}
          placeholder="输入或拖放 PDF/图片..."
          rows={5}
          disabled={isLoading}
          onDrop={(e) => handleDrop(e, setCandidateBackground, setCandidateFileName)}
          onDragOver={(e) => handleDragOver(e, 'candidate')}
          onDragLeave={handleDragLeave}
          className={dragOver === 'candidate' ? 'drag-over' : ''}
        />
      </div>

      <div className="input-group">
        <label>目标岗位</label>
        {jobFileName && <span className="file-badge">📄 {jobFileName}</span>}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="输入或拖放 PDF/图片..."
          rows={5}
          disabled={isLoading}
          onDrop={(e) => handleDrop(e, setJobDescription, setJobFileName)}
          onDragOver={(e) => handleDragOver(e, 'job')}
          onDragLeave={handleDragLeave}
          className={dragOver === 'job' ? 'drag-over' : ''}
        />
      </div>

      {isProcessing && <div className="processing-indicator">识别中...</div>}

      <button type="submit" disabled={isLoading || !candidateBackground.trim() || !jobDescription.trim()}>
        {isLoading ? '分析中...' : '开始分析'}
      </button>
    </form>
  );
}
