// JSON parsing utility

export function parseJSONResponse<T>(response: string): T {
  let cleaned = response.trim();
  
  // Remove markdown code blocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json?\s*/i, '').replace(/\s*```$/, '');
  }
  
  // Try to find JSON object in the response
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }

  // Try direct parse first
  try {
    return JSON.parse(cleaned) as T;
  } catch (e) {
    // Try to fix truncated JSON by finding complete objects
    const fixed = fixTruncatedJSON(cleaned);
    if (fixed !== cleaned) {
      try {
        return JSON.parse(fixed) as T;
      } catch {
        // Fall through to error
      }
    }
    
    console.error('Failed to parse JSON:', response.substring(0, 500));
    throw new Error('Failed to parse JSON response: ' + (e instanceof Error ? e.message : 'Unknown error') + '\nResponse was truncated - try reducing input size');
  }
}

function fixTruncatedJSON(json: string): string {
  // Handle common truncation patterns
  let fixed = json;
  
  // If string is truncated mid-word, complete it minimally
  // Remove trailing incomplete strings (ending with " or ' without closing)
  fixed = fixed.replace(/(")[^"]*$/, '');
  
  // Remove trailing commas before closing brackets
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
  
  // If still incomplete, try to at least close all brackets
  const opens = (fixed.match(/\[/g) || []).length;
  const closes = (fixed.match(/\]/g) || []).length;
  const openBraces = (fixed.match(/\{/g) || []).length;
  const closeBraces = (fixed.match(/\}/g) || []).length;
  
  for (let i = 0; i < opens - closes; i++) {
    fixed += ']';
  }
  for (let i = 0; i < openBraces - closeBraces; i++) {
    fixed += '}';
  }
  
  return fixed;
}