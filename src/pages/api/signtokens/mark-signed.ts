import type { APIRoute } from 'astro';

/**
 * POST /api/signtokens/mark-signed
 *
 * Anonymous update: after a client signs in PublicSignPage, we need
 * to mark the token as used. The signtokens collection is Admin-only,
 * so this update runs server-side.
 *
 * Caller passes { tokenId, signedByName, signedByEmail,
 * signedDocumentUrl?, resolvedClientId? }. The endpoint re-validates
 * the row is still active (defence against double-submit) and writes
 * the signed-state fields.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

interface MarkSignedBody {
  tokenId?: string;
  signedByName?: string;
  signedByEmail?: string;
  signedDocumentUrl?: string;
  resolvedClientId?: string;
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  let body: MarkSignedBody;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }

  if (!body.tokenId || typeof body.tokenId !== 'string') {
    return json({ success: false, error: 'Missing tokenId.' }, 400);
  }
  if (!body.signedByName || typeof body.signedByName !== 'string') {
    return json({ success: false, error: 'Missing signedByName.' }, 400);
  }
  if (
    !body.signedByEmail ||
    typeof body.signedByEmail !== 'string' ||
    !isEmail(body.signedByEmail)
  ) {
    return json({ success: false, error: 'Missing or invalid signedByEmail.' }, 400);
  }

  try {
    const { BaseCrudService } = await import('@/integrations');

    // Defence against double-submit: re-fetch the row and check it is
    // still active and not already signed.
    const res = await BaseCrudService.getAll<any>('signtokens', undefined, {
      limit: 1000,
    } as any);
    const row = (res.items || []).find((t: any) => t._id === body.tokenId);
    if (!row) {
      return json({ success: false, error: 'Token not found.' }, 404);
    }
    if (!row.isActive) {
      return json(
        { success: false, error: 'This token is no longer active.' },
        409
      );
    }
    if (row.signedDate) {
      return json(
        { success: false, error: 'This document has already been signed.' },
        409
      );
    }

    await BaseCrudService.update<any>('signtokens', {
      _id: body.tokenId,
      signedDate: new Date().toISOString(),
      isActive: false,
      lastUsedDate: new Date().toISOString(),
      signedByName: body.signedByName,
      signedByEmail: body.signedByEmail,
      signedDocumentUrl: body.signedDocumentUrl || '',
      resolvedClientId: body.resolvedClientId || '',
    });
  } catch (err: any) {
    const msg = err?.message || String(err);
    return json(
      { success: false, error: msg || 'Could not mark token as signed.' },
      500
    );
  }

  return json({ success: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
