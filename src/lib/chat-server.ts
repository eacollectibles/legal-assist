/**
 * Server-side helpers shared by every /api/chat/* endpoint.
 *
 * Data model (two Wix CMS collections):
 *
 *   chatconversations
 *     _id                  uuid
 *     clientId             string (optional — set only if a clientprofile
 *                          can be matched by email)
 *     clientName           string
 *     clientEmail          string (lowercased — used as the natural key)
 *     status               'open' | 'closed'
 *     assignedParalegalId  string (paralegals.ts id; '' = unassigned)
 *     subject              string (auto-summarised from first message)
 *     lastMessageAt        Date
 *     lastMessagePreview   string (first 120 chars)
 *     unreadByParalegal    number
 *     unreadByClient       number
 *     fileId               string (optional, manually linkable)
 *
 *   chatmessages
 *     _id                  uuid
 *     conversationId       string (FK → chatconversations._id)
 *     senderType           'client' | 'paralegal' | 'system'
 *     senderId             string
 *     senderName           string
 *     body                 string (plain text, ≤ 4000 chars)
 *     attachmentUrl        string (optional, Wix Media URL)
 *
 * Why these aren't merged into the existing `messages` collection:
 * `messages` is heavily used by the per-file communication log and
 * has a very different shape (per-file threading, no live-chat
 * status). Keeping live chat separate avoids cross-contamination of
 * the LSO communication-log audit trail.
 */

import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';

export interface ChatConversation {
  _id?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  status?: 'open' | 'closed';
  assignedParalegalId?: string;
  subject?: string;
  lastMessageAt?: string | Date;
  lastMessagePreview?: string;
  unreadByParalegal?: number;
  unreadByClient?: number;
  fileId?: string;
  _createdDate?: string | Date;
}

export interface ChatMessage {
  _id?: string;
  conversationId: string;
  senderType: 'client' | 'paralegal' | 'system';
  senderId?: string;
  senderName?: string;
  body: string;
  attachmentUrl?: string;
  _createdDate?: string | Date;
}

export const PUBLIC_ORIGIN = 'https://www.legalassist.london';

export function getSecret(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

/**
 * Build an authenticated Wix client. Returns null if the API key
 * isn't configured — callers should fail gracefully.
 */
export function makeWixClient(locals: any) {
  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) return null;
  return createClient({
    modules: { items: wixDataItems },
    auth: ApiKeyStrategy({ apiKey, siteId }),
  });
}

/**
 * Same-origin guard used on every endpoint. Localhost passes for dev.
 */
export function checkOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') || '';
  if (!origin) return true; // server-to-server / no-origin requests pass
  return origin.startsWith(PUBLIC_ORIGIN) || origin.includes('localhost');
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Find an existing OPEN conversation for this email, or null.
 * Matches case-insensitively. Returns the most recent if multiple.
 */
export async function findOpenConversationByEmail(
  wix: NonNullable<ReturnType<typeof makeWixClient>>,
  email: string,
): Promise<ChatConversation | null> {
  if (!email) return null;
  const r: any = await wix.items
    .query('chatconversations')
    .eq('clientEmail', email.toLowerCase())
    .eq('status', 'open')
    .descending('_createdDate')
    .limit(1)
    .find()
    .catch(() => ({ items: [] }));
  return r?.items?.[0] || null;
}

/**
 * Try to match an email to an existing clientprofile so we can
 * populate clientId on the conversation. Silent on miss.
 */
export async function lookupClientByEmail(
  wix: NonNullable<ReturnType<typeof makeWixClient>>,
  email: string,
): Promise<{ _id: string; firstName?: string; lastName?: string } | null> {
  if (!email) return null;
  const r: any = await wix.items
    .query('clientprofiles')
    .eq('email', email.toLowerCase())
    .limit(1)
    .find()
    .catch(() => ({ items: [] }));
  return r?.items?.[0] || null;
}

/**
 * Bump the conversation's lastMessageAt + preview + unread counters
 * after a message is inserted. Single update, atomic from the
 * conversation's perspective.
 */
export async function bumpConversationAfterMessage(
  wix: NonNullable<ReturnType<typeof makeWixClient>>,
  conversation: ChatConversation,
  msg: { senderType: ChatMessage['senderType']; body: string },
): Promise<void> {
  const now = new Date();
  const preview = (msg.body || '').slice(0, 120);
  const next: any = {
    _id: conversation._id,
    lastMessageAt: now,
    lastMessagePreview: preview,
    unreadByParalegal: msg.senderType === 'client'
      ? (conversation.unreadByParalegal || 0) + 1
      : conversation.unreadByParalegal || 0,
    unreadByClient: msg.senderType === 'paralegal'
      ? (conversation.unreadByClient || 0) + 1
      : conversation.unreadByClient || 0,
  };
  await wix.items.update('chatconversations', next).catch(() => undefined);
}
