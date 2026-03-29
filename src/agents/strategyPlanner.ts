// Strategy Planner Agent

import type { CandidateProfile, JobProfile, GapAnalysis, WorkSimulation, ImprovementPlan, JobStrategy } from '../schemas';
import { STRATEGY_PLANNER_PROMPT, SYSTEM_PROMPT, JSON_OUTPUT_INSTRUCTION } from '../prompts';
import type { MiniMaxClient } from '../tools';
import { parseJSONResponse } from './jsonParser';

interface StrategyPlanResponse {
  improvementPlan: ImprovementPlan;
  jobStrategy: JobStrategy;
}

export async function planStrategy(
  client: MiniMaxClient,
  candidateProfile: CandidateProfile,
  jobProfile: JobProfile,
  gapAnalysis: GapAnalysis,
  workSimulation: WorkSimulation
): Promise<{ improvementPlan: ImprovementPlan; jobStrategy: JobStrategy }> {
  const input = `候选人画像：
${JSON.stringify(candidateProfile, null, 2)}

岗位画像：
${JSON.stringify(jobProfile, null, 2)}

差距分析：
${JSON.stringify(gapAnalysis, null, 2)}

工作模拟：
${JSON.stringify(workSimulation, null, 2)}`;

  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT + '\n' + STRATEGY_PLANNER_PROMPT + JSON_OUTPUT_INSTRUCTION },
    { role: 'user' as const, content: input },
  ];

  const response = await client.chat(messages);
  return parseJSONResponse<StrategyPlanResponse>(response);
}
