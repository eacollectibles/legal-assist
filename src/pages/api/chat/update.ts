import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/chat/update
 *
 * Update conversation metadata — used for:
 *   • Mark-read     ({ conversationId, side: 'paralegal'|'client' })
 *   • Assign        ({ conversationId, assignedParalegalId })
 *   • Close/reopen  ({ conversationId, status: 'open'|'closed' })
 *   • Link to file  ({ conversationId, fileId })
 *   • Edit subject  ({ conversationId, subject })
 *
 * Single endpoint, multiple ops. Keeps the API surface tight.
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const conversationId = String(body?.conversationId || '');
  if (!conversationId) return json({ error: 'conversationId required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) return json({ error: 'not configured' }, 200);

  try {
    const patch: any = { _id: conversationId };
    if (body?.side === 'paralegal') {
      patch.unreadByParalegal = 0;
      // F-I-11: stamp read-receipt timestamp the client side reads
      // to render "Read" ticks next to their messages.
      patch.lastReadByParalegalAt = new Date();
    }
    if (body?.side === 'client') {
      patch.unreadByClient = 0;
      patch.lastReadByClientAt = new Date();
    }
    if (typeof body?.assignedParalegalId === 'string') patch.assignedParalegalId = body.assignedParalegalId;
    if (body?.status === 'open' || body?.status === 'closed') patch.status = body.status;
    if (typeof body?.fileId === 'string') patch.fileId = body.fileId;
    if (typeof body?.clientId === 'string') patch.clientId = body.clientId;
    if (typeof body?.subject === 'string') patch.subject = body.subject.slice(0, 200);

    const r: any = await wix.items.update('chatconversations', patch);
    return json({ conversation: r });
  } catch (err: any) {
    return json({ error: err?.message || 'update failed' }, 200);
  }
};
