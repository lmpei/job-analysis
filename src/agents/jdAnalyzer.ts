// JD Analyzer Agent

import type { JobProfile } from '../schemas';
import { JD_ANALYZER_PROMPT, SYSTEM_PROMPT, JSON_OUTPUT_INSTRUCTION } from '../prompts';
import type { MiniMaxClient } from '../tools';
import { parseJSONResponse } from './jsonParser';

export async function analyzeJobDescription(
  client: MiniMaxClient,
  jobDescription: string
): Promise<JobProfile> {
  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT + '\n' + JD_ANALYZER_PROMPT + JSON_OUTPUT_INSTRUCTION },
    { role: 'user' as const, content: jobDescription },
  ];

  const response = await client.chat(messages);
  return parseJSONResponse<JobProfile>(response);
}
