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
 * Generate a cryptographically secure token (64 hex chars).
 */
export function generateSecureSignToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a new sign-link token.
 */
export async function createSignToken(
  params: CreateSignTokenParams
): Promise<SignTokens> {
  const token = generateSecureSignToken();
  const now = new Date();
  const expiryDate = new Date(
    now.getTime() + (params.expiryHours || 168) * 60 * 60 * 1000
  );

  const row: SignTokens = {
    _id: crypto.randomUUID(),
    token,
    documentId: params.documentId,
    documentName: params.documentName,
    intendedRecipientName: params.intendedRecipientName,
    intendedRecipientEmail: params.intendedRecipientEmail,
    clientId: params.clientId,
    clientFileId: params.clientFileId,
    createdByParalegalId: params.createdByParalegalId,
    createdByParalegalName: params.createdByParalegalName,
    expiryDate: expiryDate.toISOString(),
    isActive: true,
    createdDate: now.toISOString(),
    notes: params.notes,
  };

  await BaseCrudService.create(COLLECTION, row);
  return row;
}

/**
 * Validate a token and return the row if it's still good.
 */
export async function validateSignToken(
  token: string
): Promise<ValidateSignTokenResult> {
  if (!token) return { valid: false, error: 'Missing token' };

  // Pull all tokens; limit:1000 in case BaseCrudService has paginated.
  const { items } = await BaseCrudService.getAll<SignTokens>(
    COLLECTION,
    undefined,
    { limit: 1000 } as any
  );
  const row = items.find((t) => t.token === token);
  if (!row) return { valid: false, error: 'Invalid signing link.' };
  if (!row.isActive) return { valid: false, error: 'This signing link has been deactivated.' };
  if (row.revokedDate) return { valid: false, error: 'This signing link has been revoked.' };
  if (row.signedDate) return { valid: false, error: 'This document has already been signed.' };

  const expiryStr = row.expiryDate;
  if (expiryStr) {
    const expiry = new Date(expiryStr as any);
    if (!isNaN(expiry.getTime()) && new Date() > expiry) {
      return { valid: false, error: 'This signing link has expired.' };
    }
  }
  return { valid: true, token: row };
}

/**
 * Mark a token as used after successful signing.
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
  await BaseCrudService.update<SignTokens>(COLLECTION, {
    _id: tokenId,
    signedDate: new Date().toISOString(),
    isActive: false,
    lastUsedDate: new Date().toISOString(),
    ...patch,
  });
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
