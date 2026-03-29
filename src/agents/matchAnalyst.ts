// Match Analyst Agent

import type { CandidateProfile, JobProfile, MatchResult, GapAnalysis, WorkSimulation } from '../schemas';
import { MATCH_ANALYST_PROMPT, SYSTEM_PROMPT, JSON_OUTPUT_INSTRUCTION } from '../prompts';
import type { MiniMaxClient } from '../tools';
import { parseJSONResponse } from './jsonParser';

interface MatchAnalysisResponse {
  matchResult: MatchResult;
  gapAnalysis: GapAnalysis;
  workSimulation: WorkSimulation;
}

export async function analyzeMatch(
  client: MiniMaxClient,
  candidateProfile: CandidateProfile,
  jobProfile: JobProfile
): Promise<{ matchResult: MatchResult; gapAnalysis: GapAnalysis; workSimulation: WorkSimulation }> {
  const input = `候选人画像：
${JSON.stringify(candidateProfile, null, 2)}

岗位画像：
${JSON.stringify(jobProfile, null, 2)}`;

  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT + '\n' + MATCH_ANALYST_PROMPT + JSON_OUTPUT_INSTRUCTION },
    { role: 'user' as const, content: input },
  ];

  const response = await client.chat(messages);
  return parseJSONResponse<MatchAnalysisResponse>(response);
}
