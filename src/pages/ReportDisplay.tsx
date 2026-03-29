// Report display component

import { useState } from 'react';
import type { AnalysisReport } from '../schemas';

interface ReportDisplayProps {
  report: AnalysisReport;
}

function Section({ title, icon, children, defaultOpen = false }: { title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <section className="report-section">
      <h3 onClick={() => setIsOpen(!isOpen)} className="section-toggle">
        <span>{icon}</span>
        <span>{title}</span>
        <span className="toggle-arrow">{isOpen ? '▼' : '▶'}</span>
      </h3>
      {isOpen && <div className="section-content">{children}</div>}
    </section>
  );
}

export function ReportDisplay({ report }: ReportDisplayProps) {
  return (
    <div className="report-container">
      <Section title="匹配结论" icon="📊" defaultOpen={true}>
        <div className="score-cards">
          <div className="score-card overall">
            <span className="score-label">整体</span>
            <span className="score-value">{report.matchResult.overallScore}</span>
          </div>
          <div className="score-card">
            <span className="score-label">技能</span>
            <span className="score-value">{report.matchResult.skillMatchScore}</span>
          </div>
          <div className="score-card">
            <span className="score-label">经验</span>
            <span className="score-value">{report.matchResult.experienceMatchScore}</span>
          </div>
          <div className="score-card">
            <span className="score-label">学历</span>
            <span className="score-value">{report.matchResult.educationMatchScore}</span>
          </div>
        </div>
        <p className="conclusion">{report.matchResult.conclusion}</p>
        <div className="match-tags">
          {report.matchResult.keyMatches.slice(0, 3).map((m, i) => (
            <span key={i} className="match-tag match">{m}</span>
          ))}
          {report.matchResult.keyGaps.slice(0, 3).map((g, i) => (
            <span key={i} className="match-tag gap">{g}</span>
          ))}
        </div>
      </Section>

      <Section title="差距诊断" icon="🔍">
        <div className="gap-list">
          <div className="gap-item">
            <span className="gap-label missing">❌ 缺失</span>
            <div className="gap-tags">
              {report.gapAnalysis.skillGaps.missing.map((s, i) => (
                <span key={i} className="gap-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="gap-item">
            <span className="gap-label weak">⚡ 薄弱</span>
            <div className="gap-tags">
              {report.gapAnalysis.skillGaps.weak.map((s, i) => (
                <span key={i} className="gap-tag weak">{s}</span>
              ))}
            </div>
          </div>
          <div className="gap-item">
            <span className="gap-label strong">💪 强项</span>
            <div className="gap-tags">
              {report.gapAnalysis.skillGaps.strong.map((s, i) => (
                <span key={i} className="gap-tag strong">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="工作模拟" icon="💼">
        <p className="day-in-life">{report.workSimulation.dayInLife}</p>
        <ul className="task-list">
          {report.workSimulation.dailyTasks.slice(0, 4).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section title="提升计划" icon="📈">
        <div className="plan-section">
          <div className="plan-header">
            <span>短期计划</span>
            <span className="plan-badge">3天</span>
          </div>
          <ul className="plan-actions">
            {report.improvementPlan.shortTerm.actions.slice(0, 3).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="plan-section">
          <div className="plan-header">
            <span>中期计划</span>
            <span className="plan-badge">1个月</span>
          </div>
          <ul className="plan-actions">
            {report.improvementPlan.mediumTerm.actions.slice(0, 4).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="priority-section">
          <span className="priority-label">优先学习</span>
          <div className="priority-skills">
            {report.improvementPlan.prioritySkills.slice(0, 5).map((s, i) => (
              <span key={i} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="学习资源" icon="🎓">
        {report.improvementPlan.learningResources.slice(0, 3).map((lr, i) => (
          <div key={i} className="resource-item">
            <span className="resource-skill">{lr.skill}</span>
            <div className="resource-links">
              {lr.resources.slice(0, 2).map((r, j) => (
                <a key={j} href={r.url || '#'} target="_blank" rel="noopener noreferrer" className="resource-link">
                  {r.type === 'course' && '📚'}
                  {r.type === 'video' && '🎬'}
                  {r.type === 'book' && '📖'}
                  {r.type === 'article' && '📄'}
                  {r.type === 'practice' && '💻'}
                  <span>{r.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
        <div className="premium-banner">
          <span className="premium-icon">👑</span>
          <span>解锁更多付费课程和一对一辅导</span>
        </div>
      </Section>

      <Section title="岗位策略" icon="🎯">
        <div className="strategy-section">
          <h4>直接匹配</h4>
          <div className="job-list">
            {report.jobStrategy.directMatches.slice(0, 3).map((m, i) => (
              <div key={i} className="job-item">
                <span className="job-title">{m.title}</span>
                <span className="job-reason">{m.reason}</span>
                {m.searchUrl && (
                  <a href={m.searchUrl} target="_blank" rel="noopener noreferrer" className="job-search-btn">
                    搜索职位
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="strategy-section">
          <h4>转型路径</h4>
          <div className="transition-list">
            {report.jobStrategy.relatedTransitions.slice(0, 3).map((t, i) => (
              <div key={i} className="transition-item">
                <span>{t.from}</span>
                <span className="arrow">→</span>
                <span>{t.to}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-banner">
          <span className="premium-icon">👑</span>
          <span>解锁更多岗位推荐和申请攻略</span>
        </div>
      </Section>
    </div>
  );
}
