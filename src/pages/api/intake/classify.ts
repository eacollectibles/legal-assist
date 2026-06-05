import type { APIRoute } from 'astro';

/**
 * POST /api/intake/classify
 *
 * Server-side Claude relay that classifies a client's free-text
 * description of their legal issue into the firm's matter-type
 * taxonomy. Returns:
 *   {
 *     matterType: 'ltb' | 'small-claims' | 'traffic' | 'hrto' |
 *                 'warranty' | 'cash-for-keys' | 'defamation' |
 *                 'employment' | 'criminal' | 'sbt' | 'unknown',
 *     confidence: 0..1,
 *     summary: string,      // 1-sentence plain-English summary
 *     suggestedTemplate: string  // retainer template id
 *   }
 *
 * Request body:
 *   { description: string, clientName?: string }
 *
 * Secrets:
 *   LA_ANTHROPIC_API_KEY     — Anthropic API key
 *
 * Without credentials the endpoint returns matterType:'unknown'
 * so the intake flow degrades gracefully to manual selection.
 *
 * Why this matters: cuts the intake-to-retainer time roughly in
 * half. Misclassification cost is bounded because the paralegal
 * reviews every retainer before sending; this is a UX aid, not
 * an autonomous decision.
 */

const PUBLIC_ORIGIN = 'https://www.legalassist.london';

function getSecret(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

const SYSTEM_PROMPT = `You are a triage assistant for an Ontario paralegal firm. \
Classify the client's description into ONE of these matter types:

- ltb               (Landlord & Tenant Board — rent, eviction, repair, illegal entry)
- small-claims      (Small Claims Court — debt up to $50K, contract disputes, NSF cheques)
- traffic           (Highway Traffic Act / Provincial Offences Act — speeding, careless, stunt driving)
- hrto              (Human Rights Tribunal of Ontario — discrimination based on Code grounds)
- warranty          (Tarion / new home warranty disputes)
- cash-for-keys     (LTB landlord-side N12/N13 buyouts)
- defamation        (libel, slander)
- employment        (wrongful dismissal, unpaid wages, ESA)
- criminal          (anything that needs a lawyer — paralegals cannot represent. Refer.)
- sbt               (Social Benefits Tribunal — ODSP/OW denials)
- unknown           (insufficient info to classify with confidence)

Respond ONLY with a JSON object of shape:
{
  "matterType": "<one of the above>",
  "confidence": <0..1>,
  "summary": "<one plain-English sentence>",
  "reasoning": "<one sentence — what tipped you off>"
}

Be conservative. If criminal or quasi-criminal indicators appear (assault, theft,
DUI, drug offences) classify as "criminal" — Ontario paralegals cannot represent
on indictable charges or where the maximum penalty exceeds 6 months / $25K, and
the firm wants to refer those out cleanly. If the description is one short
phrase ("eviction help"), assign confidence ≤ 0.6.`;

const RETAINER_TEMPLATES: Record<string, string> = {
  ltb: 'ltb-tenant-retainer',
  'small-claims': 'small-claims-retainer',
  traffic: 'traffic-retainer',
  hrto: 'hrto-retainer',
  warranty: 'warranty-retainer',
  'cash-for-keys': 'cash-for-keys-retainer',
  defamation: 'defamation-retainer',
  employment: 'employment-retainer',
  criminal: '', // intentionally empty — refer out
  sbt: 'sbt-retainer',
  unknown: '',
};

export const POST: APIRoute = async ({ request, locals }) => {
  // Origin gate.
  const origin = request.headers.get('origin') || '';
  if (origin && !origin.startsWith(PUBLIC_ORIGIN) && !origin.includes('localhost')) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403, headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: any;
  try { body = await request.json(); }
  catch {
    return new Response(JSON.stringify({ error: 'invalid body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const description = String(body?.description || '').slice(0, 4000);
  if (!description || description.length < 8) {
    return new Response(
      JSON.stringify({ matterType: 'unknown', confidence: 0, summary: '', suggestedTemplate: '' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const apiKey = getSecret(locals, 'LA_ANTHROPIC_API_KEY');
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        matterType: 'unknown', confidence: 0,
        summary: '', suggestedTemplate: '', configured: false,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: description }],
      }),
    });
    if (!r.ok) {
      const text = await r.text();
      return new Response(
        JSON.stringify({
          matterType: 'unknown', confidence: 0,
          summary: '', suggestedTemplate: '',
          error: `anthropic ${r.status}`, detail: text.slice(0, 400),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    const payload: any = await r.json();
    const text: string = payload?.content?.[0]?.text || '';

    // Parse the JSON object out of the model response. Claude may
    // wrap it in markdown ```json fences; strip them.
    const cleaned = text.replace(/```json|```/g, '').trim();
    let parsed: any = {};
    try { parsed = JSON.parse(cleaned); } catch { /* fall through */ }

    const matterType = String(parsed.matterType || 'unknown');
    const confidence = Math.min(1, Math.max(0, Number(parsed.confidence || 0)));
    const summary = String(parsed.summary || '').slice(0, 300);
    const suggestedTemplate = RETAINER_TEMPLATES[matterType] || '';

    return new Response(
      JSON.stringify({ matterType, confidence, summary, suggestedTemplate, configured: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        matterType: 'unknown', confidence: 0,
        summary: '', suggestedTemplate: '',
        error: err?.message || 'classify failed',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
