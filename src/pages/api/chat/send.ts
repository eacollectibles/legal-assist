import type { APIRoute } from 'astro';
import {
  checkOrigin, json, makeWixClient,
  bumpConversationAfterMessage,
} from '@/lib/chat-server';

/**
 * POST /api/chat/send
 *
 * Append a message to a conversation. Used by BOTH the client
 * widget and the paralegal dashboard. Caller specifies senderType
 * ('client' or 'paralegal'); we trust the senderType but record
 * the senderName so paralegals can spot impersonation in the
 * unlikely event a client tries to send as 'paralegal'.
 *
 * Side-effects beyond the message insert:
 *   • Bumps lastMessageAt + preview + unread counters on the
 *     parent conversation row.
 *   • If the conversation has a fileId set, ALSO writes a row to
 *     `communicationlog` so the LSO client-file trail stays
 *     current as the chat happens (F-I-7).
 *   • Clears the typing flag for the sending side (since sending
 *     a message is implicitly the end of typing).
 *
 * Request: { conversationId, senderType, senderId?, senderName, body, attachmentUrl? }
 * Response: { message: { _id, ... } }
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const conversationId = String(body?.conversationId || '');
  const senderType = body?.senderType === 'paralegal' ? 'paralegal'
    : body?.senderType === 'system' ? 'system' : 'client';
  const senderName = String(body?.senderName || '').slice(0, 120);
  const text = String(body?.body || '').slice(0, 4000);
  const attachmentUrl = String(body?.attachmentUrl || '').slice(0, 1000);

  if (!conversationId || (!text.trim() && !attachmentUrl)) {
    return json({ error: 'conversationId + body (or attachmentUrl) required' }, 400);
  }

  const wix = makeWixClient(locals);
  if (!wix) return json({ error: 'not configured' }, 200);

  try {
    const r: any = await wix.items
      .query('chatconversations')
      .eq('_id', conversationId)
      .limit(1)
      .find();
    const conversation = r?.items?.[0];
    if (!conversation) return json({ error: 'no such conversation' }, 404);
    if (conversation.status === 'closed') {
      // Re-open on a new message so the paralegal sees a "reopened" beat.
      await wix.items.update('chatconversations', {
        _id: conversation._id,
        status: 'open',
      }).catch(() => undefined);
    }

    const inserted: any = await wix.items.insert('chatmessages', {
      _id: crypto.randomUUID(),
      conversationId,
      senderType,
      senderId: String(body?.senderId || ''),
      senderName,
      body: text,
      attachmentUrl: attachmentUrl || undefined,
    });

    await bumpConversationAfterMessage(wix, conversation, {
      senderType,
      body: text || (attachmentUrl ? '📎 Attachment' : ''),
    });

    // F-I-7: live commlog sync. If the conversation is linked to a
    // client file, mirror every new message into communicationlog
    // so the LSO record stays current without manual paralegal action.
    if (conversation.fileId) {
      const dedupeKey = `chat-${inserted?._id || crypto.randomUUID()}`;
      let clientId = conversation.clientId || '';
      if (!clientId) {
        const fileRes: any = await wix.items
          .query('clientfiles')
          .eq('_id', conversation.fileId)
          .limit(1)
          .find()
          .catch(() => ({ items: [] }));
        clientId = fileRes?.items?.[0]?.clientId || '';
      }
      const direction = senderType === 'paralegal'
        ? 'outbound' : senderType === 'client' ? 'inbound' : 'system';
      await wix.items.insert('communicationlog', {
        _id: crypto.randomUUID(),
        clientId,
        fileId: conversation.fileId,
        communicationDate: new Date(),
        communicationType: 'live_chat',
        direction,
        summary: (text || '📎 Attachment').slice(0, 200),
        details: dedupeKey,
        author: senderName || (senderType === 'paralegal' ? 'Paralegal' : 'Client'),
      }).catch(() => undefined);
    }

    // Clear typing flag for the sending side. The other side will
    // see typing field stale-out within ~3s; clearing on send is
    // just polish so the indicator vanishes instantly.
    const clearPatch: any = { _id: conversationId };
    if (senderType === 'client') clearPatch.typingByClient = null;
    else if (senderType === 'paralegal') clearPatch.typingByParalegal = null;
    await wix.items.update('chatconversations', clearPatch).catch(() => undefined);

    return json({ message: inserted });
  } catch (err: any) {
    return json({ error: err?.message || 'send failed' }, 200);
  }
};
