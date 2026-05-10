import { BaseCrudService } from '@/integrations';

/**
 * sign-token-service
 * ------------------
 * One-time signing tokens that let a paralegal email a public link to a
 * client and have them sign the document online without ever creating
 * an account on legalassist.london. The flow is:
 *
 *   1. Paralegal generates a document via Document Workflow.
 *   2. Paralegal clicks "Send Sign Link" — we mint a token tied to
 *      this document + the intended recipient's name and email and
 *      email them a unique URL: https://.../sign/<token>
 *   3. The client opens the link, sees the document, types/draws their
 *      signature, and submits.
 *   4. PublicSignPage validates the token, embeds the signature into a
 *      copy of the PDF, auto-creates a clientprofile if no profile
 *      exists for that email, and attaches the signed document to that
 *      profile (and to the underlying client file when applicable).
 */

export interface SignTokens {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  token?: string;
  documentId?: string;
  documentName?: string;
  /** Display name the paralegal entered when sending the link. */
  intendedRecipientName?: string;
  /** Email the link was sent to. */
  intendedRecipientEmail?: string;
  /** Pre-existing client profile id, if known. */
  clientId?: string;
  /** Pre-existing client file id, if known. */
  clientFileId?: string;
  /** Which paralegal sent the link. */
  createdByParalegalId?: string;
  createdByParalegalName?: string;
  /** ISO timestamp; the link refuses to validate after this. */
  expiryDate?: Date | string;
  /** When false, every validation fails. */
  isActive?: boolean;
  /** ISO timestamp the client signed (set by PublicSignPage on submit). */
  signedDate?: Date | string;
  /** Name the client typed in / signed under. */
  signedByName?: string;
  /** Email the client confirmed at signing time. */
  signedByEmail?: string;
  /** URL of the embedded-signature PDF Wix Media stored. */
  signedDocumentUrl?: string;
  /** clientprofiles row that was matched-or-created at signing time. */
  resolvedClientId?: string;
  createdDate?: Date | string;
  lastUsedDate?: Date | string;
  revokedDate?: Date | string;
  revokedBy?: string;
  notes?: string;
}

export interface CreateSignTokenParams {
  documentId: string;
  documentName?: string;
  intendedRecipientName: string;
  intendedRecipientEmail: string;
  clientId?: string;
  clientFileId?: string;
  createdByParalegalId: string;
  createdByParalegalName: string;
  /** Hours until the link expires. Defaults to 7 × 24 = 168. */
  expiryHours?: number;
  notes?: string;
}

export interface ValidateSignTokenResult {
  valid: boolean;
  token?: SignTokens;
  error?: string;
}

const COLLECTION = 'signtokens';

/**
 * Wrap a Wix Data error with a clearer, action-oriented message when
 * the underlying problem is a missing CMS collection. Users see this
 * verbatim, so it should tell them exactly what to do.
 */
function rethrowWithSchema(err: any): never {
  const msg = err?.message || String(err);
  if (msg.includes('WDE0025') || /does not exist/i.test(msg)) {
    throw new Error(
      'The "signtokens" CMS collection does not exist yet. ' +
        'Create it in Wix Studio CMS with these Text fields: token, ' +
        'documentId, documentName, intendedRecipientName, ' +
        'intendedRecipientEmail, clientId, clientFileId, ' +
        'createdByParalegalId, createdByParalegalName, expiryDate, ' +
        'isActive (Boolean), signedDate, signedByName, signedByEmail, ' +
        'signedDocumentUrl, resolvedClientId, createdDate, ' +
        'lastUsedDate, revokedDate, revokedBy, notes. Then try again.'
    );
  }
  throw err;
}

/**
 * Generate a cryptographically secure token (64 hex chars).
 */
export function generateSecureSignToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a new sign-link token.
 *
 * The signtokens CMS collection is locked Admin-only for security
 * (otherwise any logged-in client could mint tokens for arbitrary
 * documents). The browser cannot write to it directly - the Wix Data
 * SDK throws WDE0027 from a member session.
 *
 * Instead, we POST to /api/signtokens/create which runs server-side
 * with elevated context, validates the caller's paralegal id against
 * the firm directory, and writes the row.
 */
export async function createSignToken(
  params: CreateSignTokenParams
): Promise<SignTokens> {
  let resp: Response;
  try {
    resp = await fetch('/api/signtokens/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch (err: any) {
    throw new Error(
      `Could not reach the sign-token endpoint: ${err?.message || String(err)}`
    );
  }

  let data: any = null;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }
  if (!data?.success) {
    throw new Error(
      data?.error || `Sign-token creation failed (HTTP ${resp.status}).`
    );
  }

  const now = new Date();
  return {
    _id: data._id,
    token: data.token,
    documentId: params.documentId,
    documentName: params.documentName,
    intendedRecipientName: params.intendedRecipientName,
    intendedRecipientEmail: params.intendedRecipientEmail,
    clientId: params.clientId,
    clientFileId: params.clientFileId,
    createdByParalegalId: params.createdByParalegalId,
    createdByParalegalName: params.createdByParalegalName,
    expiryDate: data.expiryDate,
    isActive: true,
    createdDate: now.toISOString(),
    notes: params.notes,
  };
}

/**
 * Validate a token and return the row if it's still good.
 *
 * Anonymous-call path: PublicSignPage runs in an unauthenticated
 * browser context, and the signtokens collection is Admin-only. So
 * validation goes through /api/signtokens/validate which runs
 * server-side with elevated context. Returns a sanitized payload
 * that contains only what the public sign page needs to render.
 */
export async function validateSignToken(
  token: string
): Promise<ValidateSignTokenResult> {
  if (!token) return { valid: false, error: 'Missing token' };
  let resp: Response;
  try {
    resp = await fetch('/api/signtokens/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  } catch (err: any) {
    return {
      valid: false,
      error: 'Could not reach the signing-link validator. Please try again.',
    };
  }
  let data: any = null;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }
  if (!data) {
    return { valid: false, error: 'Invalid response from validator.' };
  }
  if (data.valid && data.token) {
    return { valid: true, token: data.token as SignTokens };
  }
  return { valid: false, error: data.error || 'Signing link is not valid.' };
}

/**
 * Mark a token as used after successful signing.
 *
 * Anonymous-call path: PublicSignPage submits the signature without
 * a logged-in session. The collection is Admin-only, so the update
 * goes through /api/signtokens/mark-signed which re-validates the
 * row (defence against double-submit) and writes the signed-state
 * fields server-side.
 */
export async function markSignTokenSigned(
  tokenId: string,
  patch: {
    signedByName: string;
    signedByEmail: string;
    signedDocumentUrl?: string;
    resolvedClientId?: string;
  }
): Promise<void> {
  let resp: Response;
  try {
    resp = await fetch('/api/signtokens/mark-signed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId, ...patch }),
    });
  } catch (err: any) {
    throw new Error(
      'Could not reach the sign-token endpoint. Please try again.'
    );
  }
  let data: any = null;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }
  if (!data?.success) {
    throw new Error(
      data?.error || `Could not record signature (HTTP ${resp.status}).`
    );
  }
}

/**
 * Revoke a token (paralegal-initiated).
 */
export async function revokeSignToken(
  tokenId: string,
  revokedBy: string
): Promise<void> {
  await BaseCrudService.update<SignTokens>(COLLECTION, {
    _id: tokenId,
    isActive: false,
    revokedDate: new Date().toISOString(),
    revokedBy,
  });
}

/**
 * Build the public sign URL for a token.
 */
export function generateSignLink(token: string): string {
  if (typeof window === 'undefined') {
    return `/sign/${token}`;
  }
  return `${window.location.origin}/sign/${token}`;
}
