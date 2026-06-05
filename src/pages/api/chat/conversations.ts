import type { APIRoute } from 'astro';
import { checkOrigin, json, makeWixClient } from '@/lib/chat-server';

/**
 * GET /api/chat/conversations?filter=open|closed|all&q=<search>
 *
 * Paralegal-only — lists conversations. Filter / sort happen here
 * so the dashboard can paginate without slurping the whole table
 * on every poll.
 *
 * Sort: newest activity first (lastMessageAt desc).
 */

export const GET: APIRoute = async ({ url, request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  const filter = (url.searchParams.get('filter') || 'open').toLowerCase();
  const q = (url.searchParams.get('q') || '').trim().toLowerCase();

  const wix = makeWixClient(locals);
  if (!wix) return json({ conversations: [], configured: false });

  try {
    let query = wix.items.query('chatconversations');
    if (filter === 'open') query = query.eq('status', 'open');
    else if (filter === 'closed') query = query.eq('status', 'closed');
    // 'all' = no status filter

    const r: any = await query
      .descending('lastMessageAt')
      .limit(200)
      .find();

    let items: any[] = r?.items || [];
    if (q) {
      items = items.filter((c) => {
        const blob = `${c.clientName || ''} ${c.clientEmail || ''} ${c.lastMessagePreview || ''} ${c.subject || ''}`.toLowerCase();
        return blob.includes(q);
      });
    }

    return json({ conversations: items });
  } catch (err: any) {
    return json({ conversations: [], error: err?.message || 'list failed' }, 200);
  }
};
