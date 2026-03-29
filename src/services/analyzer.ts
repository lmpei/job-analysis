// Analyzer Service - orchestrates multi-agent workflow

import type { AnalysisReport, AnalyzeInput } from '../schemas';
import type { MiniMaxClient } from '../tools';
import { profileCandidate, analyzeJobDescription, analyzeMatch, planStrategy } from '../agents';

export interface AnalyzerServiceConfig {
  miniMaxClient: MiniMaxClient;
  modelVersion?: string;
}

export class AnalyzerService {
  private client: MiniMaxClient;
  private modelVersion: string;

  constructor(config: AnalyzerServiceConfig) {
    this.client = config.miniMaxClient;
    this.modelVersion = config.modelVersion || 'MiniMax-M2.7';
  }

  async analyze(input: AnalyzeInput): Promise<AnalysisReport> {
    console.log('Starting analysis...');

    console.log('Step 1: Profiling candidate...');
    const candidateProfile = await profileCandidate(this.client, input.candidateBackground);

    console.log('Step 2: Analyzing job description...');
    const jobProfile = await analyzeJobDescription(this.client, input.jobDescription);

    console.log('Step 3: Analyzing match...');
    const { matchResult, gapAnalysis, workSimulation } = await analyzeMatch(
      this.client,
      candidateProfile,
      jobProfile
    );

    console.log('Step 4: Planning strategy...');
    const { improvementPlan, jobStrategy } = await planStrategy(
      this.client,
      candidateProfile,
      jobProfile,
      gapAnalysis,
      workSimulation
    );

    console.log('Analysis complete.');

    return {
      candidateProfile,
      jobProfile,
      matchResult,
      gapAnalysis,
      workSimulation,
      improvementPlan,
      jobStrategy,
      generatedAt: new Date().toISOString(),
      modelVersion: this.modelVersion,
    };
  }
}

export function createAnalyzerService(client: MiniMaxClient): AnalyzerService {
  return new AnalyzerService({ miniMaxClient: client });
}
