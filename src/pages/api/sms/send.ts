import type { APIRoute } from 'astro';

/**
 * POST /api/sms/send
 *
 * Server-side Twilio relay for transactional SMS to clients.
 *
 * Triggers we expect to call this:
 *   • "Your payment of $X has been received and applied to your trust."
 *   • "A document is ready for your signature. Sign at: <link>"
 *   • "Your hearing has been rescheduled to <date>."
 *   • "Reminder: your hearing is tomorrow at <time>."
 *
 * Request body (JSON):
 *   { to, body, fileId?, clientId? }
 *
 * Auth gate: only same-origin POSTs. The endpoint reads:
 *   LA_TWILIO_ACCOUNT_SID
 *   LA_TWILIO_AUTH_TOKEN
 *   LA_TWILIO_FROM_NUMBER     (E.164 — e.g. +16399992222)
 *
 * Configure these in Wix Secrets Manager. Without credentials the
 * endpoint returns success:false + reason:'not configured' so
 * callers can degrade gracefully (e.g. fall back to email).
 *
 * Cost note: Twilio Canadian outbound SMS is ~$0.0079 per
 * segment, plus a per-month phone-number fee (~$1.50). At an
 * average paralegal practice volume this is negligible.
 *
 * Compliance note: CASL requires consent for commercial messages.
 * Transactional SMS (payment receipts, signature-link delivery,
 * hearing reminders) is exempt under CASL s.6(6)(a). Always
 * include "Reply STOP to unsubscribe" on the FIRST SMS to a
 * given number to honor TCPA / CRTC implied-consent rules.
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

/**
 * Twilio expects E.164. Normalises common North American formats
 * to "+1XXXXXXXXXX". Rejects anything we can't safely interpret.
 */
function normalizeE164(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (raw.startsWith('+') && digits.length >= 10) return `+${digits}`;
  return '';
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Origin gate.
  const origin = request.headers.get('origin') || '';
  if (origin && !origin.startsWith(PUBLIC_ORIGIN) && !origin.includes('localhost')) {
    return new Response(JSON.stringify({ success: false, error: 'forbidden' }), {
      status: 403, headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: any;
  try { body = await request.json(); }
  catch {
    return new Response(JSON.stringify({ success: false, error: 'invalid body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const to = normalizeE164(body?.to || '');
  const msg = String(body?.body || '').slice(0, 1600); // 1600 = 10 SMS segments
  if (!to || !msg) {
    return new Response(JSON.stringify({ success: false, error: 'missing to/body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const sid = getSecret(locals, 'LA_TWILIO_ACCOUNT_SID');
  const token = getSecret(locals, 'LA_TWILIO_AUTH_TOKEN');
  const from = getSecret(locals, 'LA_TWILIO_FROM_NUMBER');

  if (!sid || !token || !from) {
    // Degrade gracefully. Callers should fall back to email.
    return new Response(
      JSON.stringify({ success: false, error: 'not configured' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const auth = btoa(`${sid}:${token}`);
    const params = new URLSearchParams({ To: to, From: from, Body: msg });
    const r = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      },
    );
    const text = await r.text();
    if (!r.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `twilio ${r.status}`, body: text.slice(0, 400) }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    let parsed: any;
    try { parsed = JSON.parse(text); } catch { parsed = { sid: null }; }
    return new Response(
      JSON.stringify({ success: true, messageSid: parsed.sid }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'send failed' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
