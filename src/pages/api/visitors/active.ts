import type { APIRoute } from 'astro';
import { json, makeWixClient } from '@/lib/chat-server';

/**
 * GET /api/visitors/active
 *
 * F-I-14: Paralegal-side endpoint that returns visitors active in the
 * last 60 seconds (matching the heartbeat cadence + safety margin).
 *
 * Returns:
 *   {
 *     ok: true,
 *     count: number,
 *     visitors: [{
 *       sessionId, clientId, clientName, clientEmail,
 *       currentPage, pageTitle, lastSeenAt, firstSeenAt,
 *       isSignedIn: boolean,
 *       timeOnSiteMinutes: number,
 *       hasOpenChat: boolean,
 *     }]
 *   }
 */

export const GET: APIRoute = async ({ locals }) => {
  const wix = makeWixClient(locals);
  if (!wix) return json({ ok: false, configured: false });

  try {
    const sixtySecondsAgo = new Date(Date.now() - 60 * 1000);

    // Pull all visitors whose lastSeenAt is in the last 60s
    const result: any = await wix.items
      .query('chatvisitors')
      .ge('lastSeenAt', sixtySecondsAgo)
      .descending('lastSeenAt')
      .limit(100)
      .find()
      .catch((err: any) => ({ items: [], _error: err?.message }));

    const visitors = (result?.items || []).map((v: any) => {
      const firstSeen = v.firstSeenAt ? new Date(v.firstSeenAt).getTime() : Date.now();
      const lastSeen = v.lastSeenAt ? new Date(v.lastSeenAt).getTime() : Date.now();
      const timeOnSiteMinutes = Math.max(1, Math.round((lastSeen - firstSeen) / 60000));

      return {
        sessionId: v.sessionId,
        clientId: v.clientId || '',
        clientName: v.clientName || '',
        clientEmail: v.clientEmail || '',
        currentPage: v.currentPage || '/',
        pageTitle: v.pageTitle || '',
        lastSeenAt: v.lastSeenAt || '',
        firstSeenAt: v.firstSeenAt || '',
        referrer: v.referrer || '',
        isSignedIn: !!v.clientId,
        timeOnSiteMinutes,
        hasOpenChat: !!v.activeConversationId,
        activeConversationId: v.activeConversationId || '',
      };
    });

    return json({
      ok: true,
      count: visitors.length,
      visitors,
    });
  } catch (err: any) {
    return json({ ok: false, error: err?.message || 'active visitors query failed' });
  }
};
