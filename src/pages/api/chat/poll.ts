import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * GET /api/chat/poll?conversationId=...&since=<ISO>
 *
 * Returns all messages for a conversation, optionally filtered to
 * those _createdDate > `since`. Used by both the client widget
 * (polls every 3s when open, 15s when minimised) and the paralegal
 * thread view (polls every 5s when focused).
 *
 * Returns the conversation row alongside so callers can update
 * unread counters / status display without a second round-trip.
 *
 * Edge-cached for 2 seconds — keeps Wix Data load down without
 * making the chat feel laggy.
 */

export const GET: APIRoute = async ({ url, request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  const conversationId = url.searchParams.get('conversationId') || '';
  const sinceParam = url.searchParams.get('since') || '';
  if (!conversationId) return json({ error: 'conversationId required' }, 400);

  const wix = makeWixClient(locals);
  if (!wix) {
    return new Response(
      JSON.stringify({ conversation: null, messages: [], configured: false }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=2',
        },
      },
    );
  }

  try {
    const [convRes, msgRes]: any[] = await Promise.all([
      wix.items.query('chatconversations').eq('_id', conversationId).limit(1).find(),
      (async () => {
        let q = wix.items.query('chatmessages').eq('conversationId', conversationId);
        if (sinceParam) {
          const since = new Date(sinceParam);
          if (!Number.isNaN(since.getTime())) {
            q = q.gt('_createdDate', since);
          }
        }
        return q.ascending('_createdDate').limit(500).find();
      })(),
    ]);

    return new Response(
      JSON.stringify({
        conversation: convRes?.items?.[0] || null,
        messages: msgRes?.items || [],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=2',
        },
      },
    );
  } catch (err: any) {
    return json({ error: err?.message || 'poll failed', messages: [] }, 200);
  }
};
