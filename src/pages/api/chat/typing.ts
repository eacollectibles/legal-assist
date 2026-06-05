import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/chat/typing
 *
 * Both sides ping this endpoint while actively typing. We update
 * `typingByClient` or `typingByParalegal` on the conversation row
 * with the current timestamp. The poll endpoint surfaces those
 * fields; if they're within the last 3 seconds, the other side
 * shows "<name> is typing…".
 *
 * Throttled client-side to once every 2 seconds to keep Wix Data
 * write load reasonable.
 *
 * Body: { conversationId, side: 'client'|'paralegal' }
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const conversationId = String(body?.conversationId || '');
  const side = body?.side === 'paralegal' ? 'paralegal' : 'client';
  if (!conversationId) return json({ error: 'conversationId required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) return json({ ok: false, configured: false });

  try {
    const patch: any = { _id: conversationId };
    if (side === 'client') patch.typingByClient = new Date();
    else patch.typingByParalegal = new Date();
    await wix.items.update('chatconversations', patch);
    return json({ ok: true });
  } catch (err: any) {
    // Non-fatal — typing is purely cosmetic.
    return json({ ok: false, error: err?.message || 'typing failed' });
  }
};
