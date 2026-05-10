import type { APIRoute } from 'astro';

/**
 * POST /api/signtokens/validate
 *
 * Anonymous read: when a client opens https://.../sign/<token> they
 * are not logged in. The signtokens collection is Admin-only, so the
 * browser cannot read it directly. This endpoint runs server-side
 * with elevated context, looks up the row by token, applies the
 * is-still-good checks, and returns a sanitized payload.
 *
 * Sensitive fields (other client matters' tokens, internal notes, etc.)
 * are NOT echoed back - we only return what PublicSignPage needs to
 * render the signing UI.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ valid: false, error: 'Forbidden origin.' }, 403);
  }

  let body: { token?: string };
  try {
    body = await request.json();
  } catch {
    return json({ valid: false, error: 'Invalid JSON body.' }, 400);
  }

  const token = (body?.token || '').trim();
  if (!token) {
    return json({ valid: false, error: 'Missing token.' }, 400);
  }

  let items: any[] = [];
  try {
    const { BaseCrudService } = await import('@/integrations');
    const res = await BaseCrudService.getAll<any>('signtokens', undefined, {
      limit: 1000,
    } as any);
    items = res.items || [];
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('WDE0025') || /does not exist/i.test(msg)) {
      return json(
        {
          valid: false,
          error:
            'The signing-link system is not fully set up yet. Please contact the firm.',
        },
        500
      );
    }
    return json(
      { valid: false, error: msg || 'Could not validate signing link.' },
      500
    );
  }

  const row = items.find((t: any) => t.token === token);
  if (!row) {
    return json({ valid: false, error: 'Invalid signing link.' }, 200);
  }
  if (!row.isActive) {
    return json(
      { valid: false, error: 'This signing link has been deactivated.' },
      200
    );
  }
  if (row.revokedDate) {
    return json(
      { valid: false, error: 'This signing link has been revoked.' },
      200
    );
  }
  if (row.signedDate) {
    return json(
      { valid: false, error: 'This document has already been signed.' },
      200
    );
  }
  const expiryStr = row.expiryDate;
  if (expiryStr) {
    const expiry = new Date(expiryStr as any);
    if (!isNaN(expiry.getTime()) && new Date() > expiry) {
      return json(
        { valid: false, error: 'This signing link has expired.' },
        200
      );
    }
  }

  // Return only what PublicSignPage needs to render
  return json(
    {
      valid: true,
      token: {
        _id: row._id,
        token: row.token,
        documentId: row.documentId,
        documentName: row.documentName,
        intendedRecipientName: row.intendedRecipientName,
        intendedRecipientEmail: row.intendedRecipientEmail,
        clientId: row.clientId,
        clientFileId: row.clientFileId,
        createdByParalegalId: row.createdByParalegalId,
        createdByParalegalName: row.createdByParalegalName,
        expiryDate: row.expiryDate,
        isActive: row.isActive,
      },
    },
    200
  );
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
