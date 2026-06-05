import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/chat/sync-commlog
 *
 * Paralegal-side action. Walks every message in a conversation and
 * writes a matching row to the LSO `communicationlog` so the chat
 * thread becomes part of the official client-file record (By-Law
 * 7.1 s.23(14)).
 *
 * Idempotent: each commlog row carries `details = chat-${messageId}`
 * so a re-sync skips rows already present. Safe to call twice.
 *
 * Body: { conversationId }
 * Response: { synced: number, skipped: number, errors: number }
 *
 * Pre-conditions:
 *   • conversation.fileId must be set (link a file first via
 *     /api/chat/update)
 *   • conversation.clientId is used as the commlog clientId; if
 *     blank we infer from the linked clientfile.
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
    const convRes: any = await wix.items
      .query('chatconversations')
      .eq('_id', conversationId)
      .limit(1)
      .find();
    const conv = convRes?.items?.[0];
    if (!conv) return json({ error: 'no such conversation' }, 404);
    if (!conv.fileId) {
      return json({ error: 'link a client file first' }, 400);
    }

    // Resolve clientId from the linked file if not on the convo.
    let clientId = conv.clientId || '';
    if (!clientId) {
      const fileRes: any = await wix.items
        .query('clientfiles')
        .eq('_id', conv.fileId)
        .limit(1)
        .find()
        .catch(() => ({ items: [] }));
      clientId = fileRes?.items?.[0]?.clientId || '';
    }

    // Pull all messages.
    const msgsRes: any = await wix.items
      .query('chatmessages')
      .eq('conversationId', conversationId)
      .ascending('_createdDate')
      .limit(500)
      .find();
    const messages: any[] = msgsRes?.items || [];

    // For each message, write a commlog row unless one already
    // exists (matched by the magic details prefix).
    let synced = 0, skipped = 0, errors = 0;
    for (const m of messages) {
      const dedupeKey = `chat-${m._id}`;
      const existing: any = await wix.items
        .query('communicationlog')
        .eq('details', dedupeKey)
        .limit(1)
        .find()
        .catch(() => ({ items: [] }));
      if (existing?.items?.length > 0) { skipped++; continue; }
      const direction = m.senderType === 'paralegal'
        ? 'outbound'
        : m.senderType === 'client'
          ? 'inbound'
          : 'system';
      try {
        await wix.items.insert('communicationlog', {
          _id: crypto.randomUUID(),
          clientId,
          fileId: conv.fileId,
          communicationDate: m._createdDate || new Date(),
          communicationType: 'live_chat',
          direction,
          summary: (m.body || '').slice(0, 200),
          details: dedupeKey,
          author: m.senderName || (m.senderType === 'paralegal' ? 'Paralegal' : 'Client'),
        });
        synced++;
      } catch (err: any) {
        errors++;
      }
    }
    return json({ synced, skipped, errors, total: messages.length });
  } catch (err: any) {
    return json({ error: err?.message || 'sync failed' }, 200);
  }
};
