// Candidate Profiler Agent

import type { CandidateProfile } from '../schemas';
import { CANDIDATE_PROFILER_PROMPT, SYSTEM_PROMPT, JSON_OUTPUT_INSTRUCTION } from '../prompts';
import type { MiniMaxClient } from '../tools';
import { parseJSONResponse } from './jsonParser';

export async function profileCandidate(
  client: MiniMaxClient,
  background: string
): Promise<CandidateProfile> {
  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT + '\n' + CANDIDATE_PROFILER_PROMPT + JSON_OUTPUT_INSTRUCTION },
    { role: 'user' as const, content: background },
  ];

  const response = await client.chat(messages);
  return parseJSONResponse<CandidateProfile>(response);
}
