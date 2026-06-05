/**
 * Intake classifier — thin client-side wrapper over
 * /api/intake/classify. Suggests the right matter type from a
 * free-text description.
 *
 * Failure-tolerant: returns matterType:'unknown' on any error so
 * the intake form falls through to manual selection without
 * blocking the client.
 */

export interface ClassifyResult {
  matterType: string;
  confidence: number;
  summary: string;
  suggestedTemplate: string;
  configured?: boolean;
  error?: string;
}

export async function classifyIntake(description: string): Promise<ClassifyResult> {
  if (!description || description.trim().length < 8) {
    return { matterType: 'unknown', confidence: 0, summary: '', suggestedTemplate: '' };
  }
  try {
    const r = await fetch('/api/intake/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    const j = await r.json().catch(() => ({}));
    return {
      matterType: j?.matterType || 'unknown',
      confidence: Number(j?.confidence || 0),
      summary: j?.summary || '',
      suggestedTemplate: j?.suggestedTemplate || '',
      configured: j?.configured,
      error: j?.error,
    };
  } catch (err: any) {
    return {
      matterType: 'unknown', confidence: 0, summary: '', suggestedTemplate: '',
      error: err?.message || 'network',
    };
  }
}
