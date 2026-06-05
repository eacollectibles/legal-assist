import type { APIRoute } from 'astro';
import { json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/visitors/heartbeat
 *
 * F-I-14: Active visitor tracking
 *
 * Called every 30 seconds by every visitor on the public site (anonymous
 * or signed-in). Upserts a row in `chatvisitors` so the paralegal Active
 * Visitors panel can show who is currently browsing.
 *
 * Body:
 *   {
 *     sessionId: string,           // localStorage UUID for anonymous, or 'client:<id>' for signed-in
 *     page: string,                // /services/traffic-tickets
 *     title: string,               // document.title
 *     referrer?: string,
 *     userAgent?: string,
 *     clientId?: string,           // populated if visitor is signed in
 *     clientName?: string,
 *     clientEmail?: string,
 *   }
 *
 * Returns:
 *   { ok: true, pendingInitiation?: {
 *       conversationId: string,
 *       paralegalName: string,
 *       message: string,
 *       mode: 'soft' | 'pop'
 *   }}
 *
 * The pendingInitiation hint lets the ClientChatBubble pick up an
 * outbound chat the paralegal started, without a separate poll.
 */

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  // We do NOT enforce origin here — heartbeat must work for any page on the public site.

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const sessionId = String(body?.sessionId || '').slice(0, 120);
  const page = String(body?.page || '/').slice(0, 500);
  const title = String(body?.title || '').slice(0, 250);
  const referrer = String(body?.referrer || '').slice(0, 500);
  const userAgent = String(body?.userAgent || '').slice(0, 300);
  const clientId = String(body?.clientId || '').slice(0, 60);
  const clientName = String(body?.clientName || '').slice(0, 150);
  const clientEmail = String(body?.clientEmail || '').slice(0, 200);

  if (!sessionId) return json({ error: 'sessionId required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) return json({ ok: false, configured: false });

  try {
    // Look up existing visitor row by sessionId
    const existing: any = await wix.items
      .query('chatvisitors')
      .eq('sessionId', sessionId)
      .limit(1)
      .find()
      .catch(() => ({ items: [] }));

    const now = new Date();
    const row = existing?.items?.[0];

    if (row) {
      // Update existing row
      await wix.items.update('chatvisitors', {
        _id: row._id,
        sessionId,
        clientId: clientId || row.clientId || '',
        clientName: clientName || row.clientName || '',
        clientEmail: clientEmail || row.clientEmail || '',
        currentPage: page,
        pageTitle: title,
        referrer: referrer || row.referrer || '',
        userAgent: userAgent || row.userAgent || '',
        lastSeenAt: now,
      });
    } else {
      // First time we see this session
      await wix.items.insert('chatvisitors', {
        _id: crypto.randomUUID(),
        sessionId,
        clientId: clientId || '',
        clientName: clientName || '',
        clientEmail: clientEmail || '',
        currentPage: page,
        pageTitle: title,
        referrer,
        userAgent,
        firstSeenAt: now,
        lastSeenAt: now,
      });
    }

    // Check for a pending paralegal-initiated chat for this visitor
    // The initiate-chat endpoint writes a `pendingInitiation` JSON blob onto
    // the visitor's chatvisitors row. We return it and clear it.
    const updated: any = await wix.items
      .query('chatvisitors')
      .eq('sessionId', sessionId)
      .limit(1)
      .find()
      .catch(() => ({ items: [] }));
    const updatedRow = updated?.items?.[0];

    let pendingInitiation: any = undefined;
    if (updatedRow?.pendingInitiation) {
      try {
        pendingInitiation = JSON.parse(updatedRow.pendingInitiation);
      } catch { /* ignore */ }

      // Clear the flag after delivery so it only fires once.
      try {
        await wix.items.update('chatvisitors', {
          _id: updatedRow._id,
          pendingInitiation: '',
        });
      } catch { /* ignore */ }
    }

    return json({ ok: true, pendingInitiation });
  } catch (err: any) {
    return json({ ok: false, error: err?.message || 'heartbeat failed' });
  }
};
