import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/visitors/initiate-chat
 *
 * F-I-14: Paralegal-side endpoint. Creates a chat conversation for a
 * visitor and queues a pending initiation on their chatvisitors row.
 * The visitor's next heartbeat will pick it up and react based on `mode`:
 *
 *   - 'soft': bubble shows unread badge + soft chime, stays closed
 *   - 'pop' : bubble auto-opens with the message visible
 *
 * Body:
 *   {
 *     sessionId: string,        // target visitor's sessionId from /active
 *     paralegalId: string,      // who is initiating
 *     paralegalName: string,
 *     message: string,          // first message body
 *     mode: 'soft' | 'pop',
 *   }
 *
 * Returns:
 *   { ok: true, conversation: ChatConversation, message: ChatMessage }
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const sessionId = String(body?.sessionId || '').slice(0, 120);
  const paralegalId = String(body?.paralegalId || '').slice(0, 60);
  const paralegalName = String(body?.paralegalName || 'Legal Assist').slice(0, 120);
  const message = String(body?.message || '').slice(0, 2000);
  const modeRaw = String(body?.mode || 'soft').toLowerCase();
  const mode: 'soft' | 'pop' = modeRaw === 'pop' ? 'pop' : 'soft';

  if (!sessionId) return json({ error: 'sessionId required' }, 400);
  if (!paralegalId) return json({ error: 'paralegalId required' }, 400);
  if (!message) return json({ error: 'message required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) return json({ ok: false, configured: false });

  try {
    // 1. Look up the visitor row
    const vResult: any = await wix.items
      .query('chatvisitors')
      .eq('sessionId', sessionId)
      .limit(1)
      .find();
    const visitor = vResult?.items?.[0];
    if (!visitor) return json({ ok: false, error: 'visitor not found (may have left the site)' });

    // 2. Decide identity for the conversation
    const isSignedIn = !!visitor.clientId;
    const conversationClientName = visitor.clientName || `Visitor on ${visitor.currentPage || 'unknown'}`;
    const conversationClientEmail = visitor.clientEmail || `anonymous-${sessionId.slice(0, 8)}@visitor.local`;

    // 3. Check if conversation already exists for this visitor
    let conversation: any;
    if (visitor.activeConversationId) {
      const cResult: any = await wix.items
        .query('chatconversations')
        .eq('_id', visitor.activeConversationId)
        .limit(1)
        .find();
      conversation = cResult?.items?.[0];
    }

    if (!conversation) {
      const now = new Date();
      conversation = {
        _id: crypto.randomUUID(),
        clientId: visitor.clientId || '',
        clientName: conversationClientName,
        clientEmail: conversationClientEmail,
        status: 'open',
        assignedParalegalId: paralegalId,
        subject: `Paralegal-initiated chat (was on ${visitor.currentPage || 'site'})`,
        lastMessageAt: now,
        lastMessagePreview: message.slice(0, 200),
        unreadByParalegal: 0,
        unreadByClient: 1,
        _isOutbound: true,
      };
      await wix.items.insert('chatconversations', conversation);

      // Update visitor row with conversation ID
      await wix.items.update('chatvisitors', {
        _id: visitor._id,
        activeConversationId: conversation._id,
      });
    }

    // 4. Insert the paralegal's first message
    const msgRow = {
      _id: crypto.randomUUID(),
      conversationId: conversation._id,
      senderType: 'paralegal',
      senderId: paralegalId,
      senderName: paralegalName,
      body: message,
    };
    await wix.items.insert('chatmessages', msgRow);

    // Bump the conversation's lastMessage*
    await wix.items.update('chatconversations', {
      _id: conversation._id,
      lastMessageAt: new Date(),
      lastMessagePreview: message.slice(0, 200),
      unreadByClient: (conversation.unreadByClient || 0) + 1,
    });

    // 5. Queue the pending initiation on the visitor row
    const pendingInitiation = {
      conversationId: conversation._id,
      paralegalId,
      paralegalName,
      message,
      mode,
      at: new Date().toISOString(),
    };
    await wix.items.update('chatvisitors', {
      _id: visitor._id,
      pendingInitiation: JSON.stringify(pendingInitiation),
    });

    return json({ ok: true, conversation, message: msgRow });
  } catch (err: any) {
    return json({ ok: false, error: err?.message || 'initiate-chat failed' });
  }
};
