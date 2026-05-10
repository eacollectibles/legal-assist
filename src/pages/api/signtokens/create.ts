import type { APIRoute } from 'astro';
import { getParalegalById } from '@/lib/paralegals';

/**
 * POST /api/signtokens/create
 *
 * Server-side mint of a one-time signing token for the public e-sign
 * flow. Mirrors the create-payment.ts pattern.
 *
 * The signtokens Wix CMS collection is locked to Admin-only writes for
 * security - we do NOT want a logged-in client to be able to mint a
 * sign token for an arbitrary document. So the browser cannot write
 * to it directly (that throws WDE0027). Instead the browser POSTs
 * here, and this endpoint runs with elevated CMS context.
 *
 * Authentication strategy:
 *   - Origin allow-list (CSRF defence)
 *   - createdByParalegalId must match a known paralegal in
 *     src/lib/paralegals.ts (otherwise the call is rejected)
 *   - All inputs validated; recipient email format-checked
 *
 * For higher-stakes deployments, we would also verify a Wix Members
 * session cookie and confirm the caller has an admin role on the
 * useraccounts row. That can be layered on later.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

interface CreateSignTokenBody {
  documentId?: string;
  documentName?: string;
  intendedRecipientName?: string;
  intendedRecipientEmail?: string;
  clientId?: string;
  clientFileId?: string;
  createdByParalegalId?: string;
  createdByParalegalName?: string;
  expiryHours?: number;
  notes?: string;
}

function generateSecureSignToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request, locals }) => {
  // 1) Origin / Referer check
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  let body: CreateSignTokenBody;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }

  // 2) Validate body fields
  if (!body.documentId || typeof body.documentId !== 'string') {
    return json(
      { success: false, error: 'Missing documentId.' },
      400
    );
  }
  if (
    !body.intendedRecipientName ||
    typeof body.intendedRecipientName !== 'string' ||
    body.intendedRecipientName.length > 200
  ) {
    return json(
      { success: false, error: 'Missing or invalid intendedRecipientName.' },
      400
    );
  }
  if (
    !body.intendedRecipientEmail ||
    typeof body.intendedRecipientEmail !== 'string' ||
    !isEmail(body.intendedRecipientEmail)
  ) {
    return json(
      {
        success: false,
        error: 'Missing or invalid intendedRecipientEmail.',
      },
      400
    );
  }
  if (
    !body.createdByParalegalId ||
    typeof body.createdByParalegalId !== 'string'
  ) {
    return json(
      { success: false, error: 'Missing createdByParalegalId.' },
      400
    );
  }

  // 3) Authorise: the caller-claimed paralegal id must resolve to a
  //    known paralegal in the firm directory. This blocks an outside
  //    actor from minting tokens with a made-up paralegal id.
  const paralegal = getParalegalById(body.createdByParalegalId);
  if (!paralegal) {
    return json(
      { success: false, error: 'Unknown paralegal id.' },
      403
    );
  }

  const now = new Date();
  const hours = Number.isFinite(body.expiryHours) ? Number(body.expiryHours) : 168;
  const expiryDate = new Date(now.getTime() + hours * 60 * 60 * 1000);

  const row = {
    _id: crypto.randomUUID(),
    token: generateSecureSignToken(),
    documentId: body.documentId,
    documentName: body.documentName || '',
    intendedRecipientName: body.intendedRecipientName,
    intendedRecipientEmail: body.intendedRecipientEmail,
    clientId: body.clientId || '',
    clientFileId: body.clientFileId || '',
    createdByParalegalId: body.createdByParalegalId,
    createdByParalegalName:
      body.createdByParalegalName || paralegal.displayName,
    expiryDate: expiryDate.toISOString(),
    isActive: true,
    createdDate: now.toISOString(),
    notes: body.notes || '',
    _createdDate: new Date(),
  };

  // 4) Write to the signtokens collection. The Astro server context
  //    (locals.runtime / Wix Data SDK called from server side) runs
  //    with elevated permissions, so the Admin-only write rule does
  //    not block us.
  try {
    const { BaseCrudService } = await import('@/integrations');
    await BaseCrudService.create('signtokens', row);
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('WDE0025') || /does not exist/i.test(msg)) {
      return json(
        {
          success: false,
          error:
            'The "signtokens" CMS collection does not exist. Create it in Wix Studio CMS and try again.',
        },
        500
      );
    }
    if (msg.includes('WDE0027') || /permission/i.test(msg)) {
      return json(
        {
          success: false,
          error:
            'Server context lacks insert permission on signtokens. Open the collection in Wix Studio CMS and confirm Admin Add is enabled.',
        },
        500
      );
    }
    return json(
      { success: false, error: msg || 'Could not create sign token.' },
      500
    );
  }

  return json(
    {
      success: true,
      token: row.token,
      _id: row._id,
      expiryDate: row.expiryDate,
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
