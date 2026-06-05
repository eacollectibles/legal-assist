import type { APIRoute } from 'astro';
import {
  checkOrigin, json, makeWixClient,
  findOpenConversationByEmail, lookupClientByEmail,
} from '@/lib/chat-server';

/**
 * POST /api/chat/start
 *
 * Public endpoint — called the first time a visitor opens the chat
 * widget. Returns an existing open conversation if one exists for
 * their email, otherwise creates a new one.
 *
 * Request: { clientName, clientEmail }
 * Response: { conversation: { _id, status, lastMessageAt, ... } }
 *
 * Idempotent — calling twice with the same email returns the same
 * conversation (no orphan duplicates).
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const clientName = String(body?.clientName || '').trim().slice(0, 120);
  const clientEmail = String(body?.clientEmail || '').trim().toLowerCase().slice(0, 200);
  if (!clientName || !clientEmail || !clientEmail.includes('@')) {
    return json({ error: 'name + email required' }, 400);
  }

  const wix = makeWixClient(locals);
  if (!wix) return json({ error: 'not configured' }, 200);

  try {
    // Reuse existing conversation if one is open.
    const existing = await findOpenConversationByEmail(wix, clientEmail);
    if (existing) return json({ conversation: existing });

    // Try to link to an existing clientprofile.
    const profile = await lookupClientByEmail(wix, clientEmail);

    const created: any = await wix.items.insert('chatconversations', {
      _id: crypto.randomUUID(),
      clientId: profile?._id,
      clientName,
      clientEmail,
      status: 'open',
      assignedParalegalId: '',
      subject: 'New conversation',
      lastMessageAt: new Date(),
      lastMessagePreview: '',
      unreadByParalegal: 0,
      unreadByClient: 0,
    });
    return json({ conversation: created || { _id: '' } });
  } catch (err: any) {
    return json({ error: err?.message || 'start failed' }, 200);
  }
};
