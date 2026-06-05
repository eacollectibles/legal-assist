/**
 * Client-side chat helpers — thin typed wrappers around the
 * /api/chat/* endpoints. Used by BOTH the client widget and the
 * paralegal dashboard.
 *
 * All functions are failure-tolerant; they never throw, they just
 * return `{ ok: false }` so the UI can show a quiet error pill
 * instead of crashing.
 */

export interface ChatConversation {
  _id: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  status?: 'open' | 'closed';
  assignedParalegalId?: string;
  subject?: string;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  unreadByParalegal?: number;
  unreadByClient?: number;
  fileId?: string;
  /** F-I-10 typing indicators */
  typingByClient?: string;
  typingByParalegal?: string;
  /** F-I-11 read receipts */
  lastReadByParalegalAt?: string;
  lastReadByClientAt?: string;
  _createdDate?: string;
}

export interface ChatMessage {
  _id: string;
  conversationId: string;
  senderType: 'client' | 'paralegal' | 'system';
  senderId?: string;
  senderName?: string;
  body: string;
  attachmentUrl?: string;
  _createdDate?: string;
}

async function postJSON<T = any>(url: string, body: any): Promise<T | null> {
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await r.json();
  } catch {
    return null;
  }
}

async function getJSON<T = any>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url);
    return await r.json();
  } catch {
    return null;
  }
}

/** Start or resume a conversation by client name + email. */
export async function startConversation(clientName: string, clientEmail: string) {
  const j = await postJSON<{ conversation: ChatConversation }>('/api/chat/start', {
    clientName, clientEmail,
  });
  return j?.conversation || null;
}

/** Send a new message. senderType defaults to 'client' for safety. */
export async function sendMessage(args: {
  conversationId: string;
  senderType?: 'client' | 'paralegal' | 'system';
  senderId?: string;
  senderName: string;
  body: string;
  attachmentUrl?: string;
}) {
  const j = await postJSON<{ message: ChatMessage }>('/api/chat/send', {
    senderType: 'client',
    ...args,
  });
  return j?.message || null;
}

/** Poll for new messages and the latest conversation row. */
export async function pollConversation(conversationId: string, since?: string) {
  const params = new URLSearchParams({ conversationId });
  if (since) params.set('since', since);
  const j = await getJSON<{ conversation: ChatConversation; messages: ChatMessage[] }>(
    `/api/chat/poll?${params.toString()}`,
  );
  return {
    conversation: j?.conversation || null,
    messages: j?.messages || [],
  };
}

/** Paralegal: list all conversations matching the filter. */
export async function listConversations(filter: 'open' | 'closed' | 'all' = 'open', q = '') {
  const params = new URLSearchParams({ filter });
  if (q) params.set('q', q);
  const j = await getJSON<{ conversations: ChatConversation[] }>(
    `/api/chat/conversations?${params.toString()}`,
  );
  return j?.conversations || [];
}

/** Update conversation metadata. Used for mark-read / close / assign. */
export async function updateConversation(args: {
  conversationId: string;
  side?: 'client' | 'paralegal';
  status?: 'open' | 'closed';
  assignedParalegalId?: string;
  fileId?: string;
  subject?: string;
}) {
  const j = await postJSON<{ conversation: ChatConversation }>('/api/chat/update', args);
  return j?.conversation || null;
}

/** Paralegal AI assist — draft a reply. */
export async function draftReply(conversationId: string) {
  const j = await postJSON<{ draft: string; configured?: boolean }>(
    '/api/chat/draft-reply',
    { conversationId },
  );
  return { draft: j?.draft || '', configured: j?.configured !== false };
}

/* ─────────────────────────────────────────────────────────────
 * Chat v2 helpers — presence, typing, link-to-file, sync commlog,
 * attachment upload (F-I-6 through F-I-11).
 * ───────────────────────────────────────────────────────────── */

export interface PresenceState {
  anyOnline: boolean;
  onlineCount: number;
  paralegals: Array<{ name: string; status: 'online' | 'away' | 'offline' }>;
  configured?: boolean;
}

/** Public: is any paralegal available? */
export async function getPresence(): Promise<PresenceState> {
  const j = await getJSON<PresenceState>('/api/chat/presence');
  return j || { anyOnline: false, onlineCount: 0, paralegals: [] };
}

/** Paralegal: heartbeat to register as online/away/offline. */
export async function sendHeartbeat(args: {
  paralegalId: string;
  paralegalName: string;
  status: 'online' | 'away' | 'offline';
}) {
  return postJSON<{ ok: boolean }>('/api/chat/heartbeat', args);
}

/** Both sides: signal that the user is typing. Throttle to 2s. */
export async function pingTyping(conversationId: string, side: 'client' | 'paralegal') {
  return postJSON<{ ok: boolean }>('/api/chat/typing', { conversationId, side });
}

/** Paralegal: link conversation to an existing client file. */
export async function linkConversationToFile(args: {
  conversationId: string;
  fileId: string;
  clientId?: string;
}) {
  return postJSON<{ conversation: ChatConversation }>('/api/chat/update', args);
}

/** Paralegal: backfill the comm log from this conversation. */
export async function syncConversationToCommlog(conversationId: string) {
  const j = await postJSON<{
    synced: number; skipped: number; errors: number; total: number; error?: string;
  }>('/api/chat/sync-commlog', { conversationId });
  return j || { synced: 0, skipped: 0, errors: 0, total: 0 };
}

/**
 * Both sides: get a Wix Media upload URL, PUT the file, return
 * the public attachment URL.
 *
 * Wix's generateFileUploadUrl flow: we ask for a URL, the
 * browser PUTs the file directly to it, and Wix's response body
 * carries the public file URL. We surface that as `attachmentUrl`.
 */
export async function uploadChatAttachment(file: File): Promise<string> {
  if (!file) return '';
  // 1. mint signed URL
  const tokenRes = await postJSON<{ uploadUrl: string; error?: string }>(
    '/api/chat/upload-url',
    { mimeType: file.type, fileName: file.name },
  );
  if (!tokenRes?.uploadUrl) {
    throw new Error(tokenRes?.error || 'Could not start upload');
  }
  // 2. PUT bytes
  const putRes = await fetch(tokenRes.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!putRes.ok) throw new Error(`upload failed: ${putRes.status}`);
  let mediaUrl = '';
  try {
    const j = await putRes.json();
    mediaUrl = j?.file?.url || j?.url || '';
  } catch {
    /* some Wix flows return non-JSON; fall through */
  }
  return mediaUrl;
}

/* ─────────────────────────────────────────────────────────────
 * Local-storage identity persistence — so the client doesn't
 * re-enter name/email on every page load.
 * ───────────────────────────────────────────────────────────── */

const IDENTITY_KEY = 'la.chat.identity.v1';
const CONVO_KEY = 'la.chat.convoId.v1';

export function loadIdentity(): { name: string; email: string } | null {
  try {
    const raw = localStorage.getItem(IDENTITY_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    if (!j?.name || !j?.email) return null;
    return j;
  } catch { return null; }
}

export function saveIdentity(name: string, email: string) {
  try { localStorage.setItem(IDENTITY_KEY, JSON.stringify({ name, email })); }
  catch { /* ignore */ }
}

export function loadConversationId(): string {
  try { return localStorage.getItem(CONVO_KEY) || ''; } catch { return ''; }
}

export function saveConversationId(id: string) {
  try {
    if (id) localStorage.setItem(CONVO_KEY, id);
    else localStorage.removeItem(CONVO_KEY);
  } catch { /* ignore */ }
}

// ============================================================
// F-I-14: Visitor tracking + paralegal-initiated chat helpers
// ============================================================

const VISITOR_SESSION_KEY = 'la.chat.visitor.session.v1';

export interface PendingInitiation {
  conversationId: string;
  paralegalId: string;
  paralegalName: string;
  message: string;
  mode: 'soft' | 'pop';
  at: string;
}

export interface ActiveVisitor {
  sessionId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  currentPage: string;
  pageTitle: string;
  lastSeenAt: string;
  firstSeenAt: string;
  referrer: string;
  isSignedIn: boolean;
  timeOnSiteMinutes: number;
  hasOpenChat: boolean;
  activeConversationId: string;
}

/** Get or create the visitor session ID (persisted in localStorage). */
export function getVisitorSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let s = localStorage.getItem(VISITOR_SESSION_KEY);
    if (!s) {
      s = (crypto.randomUUID ? crypto.randomUUID() : `v${Date.now()}${Math.random().toString(36).slice(2)}`);
      localStorage.setItem(VISITOR_SESSION_KEY, s);
    }
    return s;
  } catch { return ''; }
}

/** Visitor heartbeat. Returns any pending paralegal-initiated chat. */
export async function sendVisitorHeartbeat(args: {
  page: string;
  title: string;
  referrer?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
}): Promise<{ ok: boolean; pendingInitiation?: PendingInitiation }> {
  const sessionId = getVisitorSessionId();
  if (!sessionId) return { ok: false };
  const r = await postJSON<{ ok: boolean; pendingInitiation?: PendingInitiation }>(
    '/api/visitors/heartbeat',
    {
      sessionId,
      page: args.page,
      title: args.title,
      referrer: args.referrer || '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      clientId: args.clientId || '',
      clientName: args.clientName || '',
      clientEmail: args.clientEmail || '',
    }
  );
  return r || { ok: false };
}

/** Paralegal-side: fetch list of active visitors. */
export async function getActiveVisitors(): Promise<{ ok: boolean; count: number; visitors: ActiveVisitor[] }> {
  const r = await getJSON<{ ok: boolean; count: number; visitors: ActiveVisitor[] }>(
    '/api/visitors/active'
  );
  return r || { ok: false, count: 0, visitors: [] };
}

/** Paralegal-side: initiate a chat with a visitor. */
export async function initiateVisitorChat(args: {
  sessionId: string;
  paralegalId: string;
  paralegalName: string;
  message: string;
  mode: 'soft' | 'pop';
}) {
  return postJSON<{ ok: boolean; conversation?: ChatConversation; message?: ChatMessage; error?: string }>(
    '/api/visitors/initiate-chat',
    args
  );
}
