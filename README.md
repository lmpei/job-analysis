# Job Analyzer

**Live Demo:** https://job-analysis-blond.vercel.app/

A job matching analysis system for job seekers. Analyzes candidate background and job descriptions to generate structured reports with match conclusions, gap diagnosis, work simulations, improvement suggestions, and job search strategies.

---

## English

### Overview

Job Analyzer is a web application that helps job seekers understand their fit for positions before applying. Upload your background and a job description to receive:

- **Match Score** (0-100) across skills, experience, and education
- **Gap Diagnosis** - Specific skill gaps and mismatches with concrete examples
- **Work Simulation** - Realistic "day in the life" for the target role
- **Improvement Plan** - Prioritized learning resources and actionable 3-day/1-month plans
- **Job Strategy** - Direct job matches, related transition paths, and application tips

### Quick Start

```bash
npm install
npm run dev
```

### Tech Stack

- React + TypeScript + Vite
- MiniMax AI (LLM for analysis)
- pdf.js (for resume parsing - future feature)

### Key Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run typecheck` | TypeScript type check |

### Environment Variables

Create a `.env` file with your MiniMax API key:

```
VITE_MINIMAX_API_KEY=your_api_key_here
```

### Project Structure

```
src/
├── agents/          # AI agent logic
├── pages/           # React page components
├── services/       # API services
├── tools/          # Utility tools
└── App.tsx         # Main application
```

---

## 中文

### 概述

Job Analyzer 是一个面向求职者的岗位匹配分析系统。用户输入自身背景和岗位描述，即可获得：

- **匹配分数** (0-100) - 技能、经验、学历三维度的量化匹配度
- **差距诊断** - 具体技能差距和经验不匹配点，配有实际案例
- **工作模拟** - 目标岗位的真实"一天工作"描述
- **提升计划** - 优先级排序的学习资源和可执行的3天/1个月计划
- **岗位策略** - 直接匹配的岗位、相关转型路径、申请技巧

### 快速开始

```bash
npm install
npm run dev
```

### 技术栈

- React + TypeScript + Vite
- MiniMax AI (LLM 分析引擎)
- pdf.js (简历解析 - 未来功能)

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产环境构建 |
| `npm run typecheck` | TypeScript 类型检查 |

### 环境变量

创建 `.env` 文件，配置 MiniMax API key：

```
VITE_MINIMAX_API_KEY=你的_api_key
```
