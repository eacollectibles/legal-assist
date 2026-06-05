import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * POST /api/chat/heartbeat
 *
 * Called by the paralegal Live Chat tab every 30 seconds while the
 * tab is focused. Upserts a row in `chatpresence` with the current
 * status (online / away / offline) and a fresh lastSeenAt timestamp.
 *
 * Body: { paralegalId, paralegalName, status: 'online'|'away'|'offline' }
 *
 * The public bubble's /api/chat/presence endpoint reads this table
 * to decide whether to show "Online" or the "Leave a message"
 * offline form.
 */

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const paralegalId = String(body?.paralegalId || '').slice(0, 60);
  const paralegalName = String(body?.paralegalName || '').slice(0, 120);
  const statusRaw = String(body?.status || 'online').toLowerCase();
  const status = ['online', 'away', 'offline'].includes(statusRaw) ? statusRaw : 'online';

  if (!paralegalId) return json({ error: 'paralegalId required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) return json({ ok: false, configured: false });

  try {
    // Idempotent upsert: find by paralegalId, update or insert.
    const existing: any = await wix.items
      .query('chatpresence')
      .eq('paralegalId', paralegalId)
      .limit(1)
      .find()
      .catch(() => ({ items: [] }));

    const row = existing?.items?.[0];
    if (row) {
      await wix.items.update('chatpresence', {
        _id: row._id,
        paralegalId,
        paralegalName: paralegalName || row.paralegalName,
        status,
        lastSeenAt: new Date(),
      });
    } else {
      await wix.items.insert('chatpresence', {
        _id: crypto.randomUUID(),
        paralegalId,
        paralegalName,
        status,
        lastSeenAt: new Date(),
      });
    }
    return json({ ok: true });
  } catch (err: any) {
    return json({ ok: false, error: err?.message || 'heartbeat failed' });
  }
};
