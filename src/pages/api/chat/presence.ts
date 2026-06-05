import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * GET /api/chat/presence
 *
 * Public endpoint. Returns whether any paralegal is currently
 * available to chat, used by the client-side bubble to decide
 * between "online — start chatting" and "offline — leave a
 * message" modes.
 *
 * A paralegal is considered "online" if they have a chatpresence
 * row with status='online' AND lastSeenAt within the last 60
 * seconds. Heartbeat cadence in the dashboard is 30 s, so this
 * gives one missed beat of slack before flipping to offline.
 *
 * Response:
 *   {
 *     anyOnline: boolean,
 *     onlineCount: number,
 *     paralegals: [{ name, status }, ...]  (no IDs leaked to public)
 *   }
 *
 * Edge-cached for 10 s — the bubble polls every 60 s when shown,
 * so this is effectively free of Wix Data load.
 */

const ONLINE_WINDOW_MS = 60_000;

export const GET: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  const wix = makeWixClient(locals);
  if (!wix) {
    return new Response(
      JSON.stringify({ anyOnline: false, onlineCount: 0, paralegals: [], configured: false }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=10',
        },
      },
    );
  }

  try {
    const r: any = await wix.items
      .query('chatpresence')
      .limit(20)
      .find();
    const now = Date.now();
    const allRows = r?.items || [];
    const online = allRows.filter((row: any) => {
      if ((row.status || '').toLowerCase() !== 'online') return false;
      const last = row.lastSeenAt ? new Date(row.lastSeenAt).getTime() : 0;
      return last > 0 && now - last < ONLINE_WINDOW_MS;
    });
    return new Response(
      JSON.stringify({
        anyOnline: online.length > 0,
        onlineCount: online.length,
        paralegals: online.map((o: any) => ({
          name: o.paralegalName || 'A paralegal',
          status: 'online',
        })),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=10',
        },
      },
    );
  } catch (err: any) {
    return json({
      anyOnline: false, onlineCount: 0, paralegals: [],
      error: err?.message || 'presence failed',
    });
  }
};
