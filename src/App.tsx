// Main App component

import { useState } from 'react';
import { UserInput, ReportDisplay } from './pages';
import type { AnalysisReport } from './schemas';
import { createMiniMaxClient } from './tools';
import { createAnalyzerService } from './services/analyzer';

const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY || '';

const STEPS = [
  { text: '正在分析你的背景...', icon: '👤' },
  { text: '正在解析岗位描述...', icon: '💼' },
  { text: '正在计算匹配度...', icon: '📊' },
  { text: '正在生成策略建议...', icon: '🎯' },
];

function App() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleAnalyze = async (candidateBackground: string, jobDescription: string) => {
    if (!API_KEY) {
      setError('请设置 VITE_MINIMAX_API_KEY 环境变量');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }, 2000);

    try {
      const client = createMiniMaxClient(API_KEY);
      const analyzer = createAnalyzerService(client);
      const result = await analyzer.analyze({ candidateBackground, jobDescription });
      setReport(result);
      setShowInput(false);
    } catch (e) {
      console.error('Analysis failed:', e);
      setError(e instanceof Error ? e.message : '分析失败，请重试');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Job Analyzer</h1>
            <p>AI 驱动的求职匹配分析与策略系统</p>
          </div>
          <div className="header-right">
            <button className="upgrade-btn">
              <span className="crown-icon">👑</span>
              升级专业版
            </button>
          </div>
        </div>
      </header>

      <main className={`app-main ${report ? 'has-report' : ''}`}>
        <div className="left-panel">
          {report && !showInput ? (
            <button className="input-toggle-btn" onClick={() => setShowInput(true)}>
              <span>📝</span>
              <span>新建分析</span>
            </button>
          ) : (
            <div className={`input-section ${report && !showInput ? 'input-hidden' : ''}`}>
              <div className="input-section-header">
                <h2>📝 开始分析</h2>
                <p>输入你的背景和目标岗位，AI 将生成匹配报告</p>
              </div>
              <UserInput onAnalyze={handleAnalyze} isLoading={isLoading} />
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </div>
        <div className="right-panel">
          {isLoading ? (
            <AnalysisProgress step={STEPS[currentStep]} />
          ) : report ? (
            <ReportDisplay report={report} />
          ) : (
            <ReportPlaceholder />
          )}
        </div>
      </main>
    </div>
  );
}

function AnalysisProgress({ step }: { step: { text: string; icon: string } }) {
  return (
    <div className="analysis-progress">
      <div className="progress-icon">{step.icon}</div>
      <div className="progress-text">{step.text}</div>
      <div className="progress-bar">
        <div className="progress-fill" />
      </div>
    </div>
  );
}

function ReportPlaceholder() {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <div className="placeholder-icon">📊</div>
        <h2>分析报告</h2>
        <p>在左侧输入你的背景和目标岗位<br/>AI 将生成匹配分析报告</p>
      </div>
    </div>
  );
}

export default App;