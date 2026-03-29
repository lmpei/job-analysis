// MiniMax API client

const MINIMAX_API_BASE = 'https://api.minimax.chat/v1';

interface MiniMaxMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MiniMaxRequest {
  model: string;
  messages: MiniMaxMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface MiniMaxResponse {
  choices: {
    message: {
      content: string;
    };
    finish_reason: string;
  }[] | null;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  base_resp?: {
    status_code: number;
    status_msg: string;
  };
}

export interface MiniMaxConfig {
  apiKey: string;
  model?: string;
}

export class MiniMaxClient {
  private apiKey: string;
  private model: string;

  constructor(config: MiniMaxConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'MiniMax-M2.7';
  }

  async chat(messages: MiniMaxMessage[], temperature = 0.7, maxTokens = 8192): Promise<string> {
    const request: MiniMaxRequest = {
      model: this.model,
      messages,
      temperature,
      max_tokens: maxTokens,
    };

    const response = await fetch(`${MINIMAX_API_BASE}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    const data: MiniMaxResponse = await response.json();

    if (!response.ok || data.choices === null) {
      const errorMsg = data.base_resp?.status_msg || await response.text();
      const errorCode = data.base_resp?.status_code || response.status;
      throw new Error(`MiniMax API error ${errorCode}: ${errorMsg}`);
    }

    if (data.choices.length === 0) {
      throw new Error('No response from MiniMax API - empty choices');
    }

    return data.choices[0].message.content;
  }
}

export function createMiniMaxClient(apiKey: string): MiniMaxClient {
  return new MiniMaxClient({ apiKey });
}
