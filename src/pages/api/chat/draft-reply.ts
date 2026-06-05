import type { APIRoute } from 'astro';
import { checkOrigin, getSecret, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/chat/draft-reply
 *
 * Paralegal-only AI assist. Given a conversationId, pulls the
 * recent message history and asks Claude Haiku to draft a polite,
 * substantive reply in the firm's voice. The paralegal can then
 * edit and send.
 *
 * Uses LA_ANTHROPIC_API_KEY (shared with the intake classifier).
 * Returns { draft: '' } when not configured so the UI shows a
 * gentle "AI assist disabled" hint.
 *
 * Hard limits:
 *   • Last 20 messages only (token budget).
 *   • Reply capped at 600 tokens.
 *   • Will NEVER invent legal advice — system prompt instructs the
 *     model to defer to the paralegal for any matter-specific
 *     statements, citations, fee quotes, or commitments.
 */

const SYSTEM_PROMPT = `You are drafting a chat reply for an Ontario paralegal firm \
("Legal Assist Paralegal Services"). The firm handles Landlord & Tenant Board, Small \
Claims Court, Provincial Offences, Human Rights Tribunal, and related matters. The \
paralegal of record is Jean-Francois "Johnny" Demers (LSO #P22020).

Rules for the draft:

1. Tone: warm, professional, plain English. Short paragraphs. No legalese.
2. Length: 1–4 sentences unless the user clearly asked for detail.
3. NEVER give legal advice or commit to outcomes. If the client asks "will I win" or \
   "is X legal", reply with "It depends on the facts" and offer a consultation.
4. NEVER quote a fee. Direct the client to book a consultation if they ask about cost.
5. NEVER claim a deadline result. Suggest the paralegal will follow up after reviewing.
6. If the client is in distress (eviction, court date imminent), acknowledge urgency \
   and offer to schedule a call.
7. If the question is procedural and the paralegal can answer factually (e.g. "what \
   forms do I need for an L1 application"), answer briefly.
8. End with a soft handoff: "I'll loop in Johnny shortly" or "Let me know if that helps."
9. Reply as the firm ("we") — never use first person singular.

Output ONLY the draft reply text. No preamble, no markdown, no JSON.`;

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const conversationId = String(body?.conversationId || '');
  if (!conversationId) return json({ error: 'conversationId required' }, 400);

  const apiKey = getSecret(locals, 'LA_ANTHROPIC_API_KEY');
  if (!apiKey) return json({ draft: '', configured: false });

  const wix = makeWixClient(locals);
  if (!wix) return json({ draft: '', configured: false });

  try {
    // Pull the last 20 messages for context.
    const msgsRes: any = await wix.items
      .query('chatmessages')
      .eq('conversationId', conversationId)
      .descending('_createdDate')
      .limit(20)
      .find();
    const ordered = (msgsRes?.items || []).reverse();
    if (ordered.length === 0) return json({ draft: '' });

    const transcript = ordered.map((m: any) => {
      const who = m.senderType === 'client'
        ? 'CLIENT'
        : m.senderType === 'paralegal'
          ? 'PARALEGAL'
          : 'SYSTEM';
      return `${who} (${m.senderName || ''}): ${m.body}`;
    }).join('\n\n');

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Conversation so far:\n\n${transcript}\n\nDraft the paralegal's next reply.`,
        }],
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return json({ draft: '', error: `anthropic ${r.status}`, detail: text.slice(0, 400) });
    }
    const payload: any = await r.json();
    const draft = String(payload?.content?.[0]?.text || '').trim();
    return json({ draft, configured: true });
  } catch (err: any) {
    return json({ draft: '', error: err?.message || 'draft failed' }, 200);
  }
};
