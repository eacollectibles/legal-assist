import type { APIRoute } from 'astro';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

/**
 * GET /api/track/document-opened
 *
 * 1×1 transparent GIF pixel embedded at the bottom of every
 * outbound retainer-signature email. When the recipient's email
 * client renders the message, the pixel loads — at which point
 * we log "Client opened the document" to the client file's
 * communicationlog (LSO By-Law 7.1 s.23(14)).
 *
 * Query parameters:
 *   doc=<generatedDocumentId>   required
 *   client=<clientId>           required
 *   file=<fileId>               optional but preferred
 *
 * Always returns 200 + a transparent GIF, even on errors —
 * email clients won't retry on failure and we don't want a
 * broken pixel to draw attention.
 *
 * Idempotency: an "Opened" entry is only written once per
 * (documentId, day) combo to avoid double-logging when the
 * client reopens the email an hour later. Multiple opens
 * across days do get logged so a paralegal can see whether
 * the client has been reading the email repeatedly.
 *
 * Privacy / GDPR note: the email recipient already opened
 * our email containing the link, so this is functional
 * confirmation of receipt — not third-party tracking. We
 * intentionally do NOT log IP, user agent, or geographic
 * location.
 */

// Hex-decoded 1×1 transparent GIF89a — 43 bytes, the standard
// "web bug" pixel. Sent with no-cache so email clients re-fetch
// it on each open (which is what we want — that's the signal).
const PIXEL = Uint8Array.from([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00,
  0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02,
  0x44, 0x01, 0x00, 0x3b,
]);

function pixelResponse() {
  return new Response(PIXEL, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

function getSecret(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

export const GET: APIRoute = async ({ request, locals }) => {
  // We never fail this endpoint visibly — even on bad input we
  // return the pixel so the email recipient sees nothing weird.
  const url = new URL(request.url);
  const docId = url.searchParams.get('doc') || '';
  const clientId = url.searchParams.get('client') || '';
  const fileId = url.searchParams.get('file') || '';

  if (!docId || !clientId) {
    return pixelResponse();
  }

  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    return pixelResponse();
  }

  // Fire-and-forget: write the open event but never block the
  // pixel response. We `await` here only because Cloudflare Workers
  // doesn't keep promises alive past the response handler unless
  // we explicitly await them. ctx.waitUntil would be cleaner but
  // requires changing the Astro runtime wiring.
  try {
    const wixClient = createClient({
      modules: { items: wixDataItems },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    // Idempotency: only log one "Opened" per doc per UTC day.
    const todayKey = new Date().toISOString().slice(0, 10);
    const dedupeId = `open-${docId}-${todayKey}`;

    // Look up whether we've already written this open today.
    const existing: any = await wixClient.items
      .query('communicationlog')
      .eq('details', dedupeId)
      .limit(1)
      .find()
      .catch(() => ({ items: [] }));

    if (existing?.items?.length > 0) {
      return pixelResponse();
    }

    await wixClient.items.insert('communicationlog', {
      clientId,
      fileId: fileId || undefined,
      communicationDate: new Date(),
      communicationType: 'system',
      direction: 'inbound',
      summary: 'Client opened the retainer email',
      details: dedupeId,
      author: 'System (email pixel)',
    });
  } catch {
    // Swallow — pixel must always return.
  }

  return pixelResponse();
};
