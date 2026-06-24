import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MessageCircle, Search, Send, Loader2, Sparkles, CheckCircle2,
  RefreshCw, FileText, ChevronDown, User, X, Paperclip, Bell, BellOff,
  Volume2, VolumeX, Link2, FolderInput, Wifi, WifiOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { getDefaultParalegal } from '@/lib/paralegals';
import { getCurrentUser } from '@/lib/auth-service';
import { isStudent, buildStudentEditAuditEntry, type UserAccount } from '@/lib/student-permissions';
import {
  type ChatConversation, type ChatMessage,
  listConversations, pollConversation, sendMessage,
  updateConversation, draftReply,
  sendHeartbeat, pingTyping,
  linkConversationToFile, syncConversationToCommlog,
  uploadChatAttachment,
} from '@/lib/chat-client';
import { groupedCannedReplies } from '@/lib/chat-canned-replies';
import { expandQuickAction, QUICK_ACTION_HINTS } from '@/lib/chat-quick-actions';
import {
  ensureNotificationPermission, getNotificationSettings,
  saveNotificationSettings, notifyNewMessage,
} from '@/lib/chat-notifications';
import ActiveVisitorsPanel from './ActiveVisitorsPanel';

/**
 * LiveChatTab — paralegal-side advanced chat console (v2).
 *
 * Additions over v1:
 *   F-I-6   Presence: status pill at the top (Online / Away /
 *           Offline) + 30 s heartbeat so the public bubble knows
 *           whether to show the offline form.
 *   F-I-7   "Link to file" picker in the right pane and a
 *           "Sync to comm log" button that backfills the LSO
 *           communication record from the chat thread.
 *   F-I-8   Browser notifications + sound on new inbound message
 *           (with cooldown + opt-out toggle).
 *   F-I-9   Paperclip → upload an attachment via Wix Media.
 *   F-I-10  Typing indicator (3 s window).
 *   F-I-11  Read receipts surfaced via lastReadByParalegalAt.
 *   F-I-12  Slash commands in the composer (/pay, /consult, etc.)
 *           expand to full polite messages before send.
 */

const LIST_POLL_MS = 10_000;
const THREAD_POLL_MS = 5_000;
const HEARTBEAT_MS = 30_000;
const TYPING_THROTTLE_MS = 2_000;
const TYPING_WINDOW_MS = 3_000;

type Status = 'online' | 'away' | 'offline';

export default function LiveChatTab() {
  // Operator identity. Paralegals chat as themselves (default paralegal);
  // a paralegal student chats under her own name, flagged "(Student)", and
  // every send she makes is logged to the supervisor review queue.
  const currentUser = getCurrentUser() as UserAccount | null;
  const studentMode = !!currentUser && isStudent(currentUser);
  const paralegal = studentMode && currentUser
    ? {
        id: currentUser._id,
        displayName: `${[currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || 'Student'} (Student)`,
      }
    : getDefaultParalegal();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [filter, setFilter] = useState<'open' | 'closed' | 'all'>('open');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [active, setActive] = useState<ChatConversation | null>(null);
  const [composer, setComposer] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [showCanned, setShowCanned] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [status, setStatus] = useState<Status>('online');
  const [notifSettings, setNotifSettings] = useState(getNotificationSettings());
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [filePickerQuery, setFilePickerQuery] = useState('');
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [syncResult, setSyncResult] = useState<string>('');
  const [clientContext, setClientContext] = useState<{
    profile?: any;
    files: any[];
    recentMoney: any[];
    loading: boolean;
  }>({ files: [], recentMoney: [], loading: false });
  const threadScrollRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastMsgCreatedAt = useRef<string>('');
  const lastTypingPingAt = useRef<number>(0);
  const lastSeenMessageIds = useRef<Set<string>>(new Set());

  // ── Heartbeat — register presence ──
  useEffect(() => {
    let cancelled = false;
    const beat = () => {
      if (cancelled) return;
      void sendHeartbeat({
        paralegalId: paralegal.id,
        paralegalName: paralegal.displayName,
        status,
      });
    };
    beat();
    const id = setInterval(beat, HEARTBEAT_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [paralegal.id, paralegal.displayName, status]);

  // ── Notification permission on first mount ──
  useEffect(() => {
    void ensureNotificationPermission();
  }, []);

  // ── List polling ──
  const refreshList = useCallback(async () => {
    const list = await listConversations(filter, search);
    setConversations(list);
  }, [filter, search]);

  useEffect(() => {
    void refreshList();
    const id = setInterval(refreshList, LIST_POLL_MS);
    return () => clearInterval(id);
  }, [refreshList]);

  // ── Select a conversation: reset thread state + mark read ──
  const selectConversation = useCallback(async (id: string) => {
    setSelectedId(id);
    setMessages([]);
    setActive(null);
    setSyncResult('');
    lastMsgCreatedAt.current = '';
    lastSeenMessageIds.current = new Set();
    const r = await pollConversation(id, undefined);
    if (r.conversation) setActive(r.conversation);
    setMessages(r.messages);
    for (const m of r.messages) lastSeenMessageIds.current.add(m._id);
    if (r.messages.length > 0) {
      lastMsgCreatedAt.current = r.messages[r.messages.length - 1]._createdDate || '';
    }
    void updateConversation({ conversationId: id, side: 'paralegal' });
    void loadClientContext(r.conversation?.clientEmail || '', r.conversation?.clientId);
  }, []);

  // ── Thread polling for the active conversation ──
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled || document.visibilityState !== 'visible') return;
      const r = await pollConversation(selectedId, lastMsgCreatedAt.current || undefined);
      if (cancelled) return;
      if (r.conversation) setActive(r.conversation);
      if (r.messages.length > 0) {
        // F-I-8 surface notifications for genuinely new client messages.
        for (const m of r.messages) {
          if (
            m.senderType === 'client' &&
            !lastSeenMessageIds.current.has(m._id) &&
            document.hidden
          ) {
            notifyNewMessage({
              title: `${m.senderName || 'Client'} sent a message`,
              body: m.body || '📎 Attachment',
              conversationId: selectedId,
            });
            break; // one notification per poll is plenty
          }
        }
        setMessages((prev) => {
          const seen = new Set(prev.map((p) => p._id));
          const merged = [...prev];
          for (const m of r.messages) if (!seen.has(m._id)) merged.push(m);
          return merged;
        });
        for (const m of r.messages) lastSeenMessageIds.current.add(m._id);
        lastMsgCreatedAt.current = r.messages[r.messages.length - 1]._createdDate || lastMsgCreatedAt.current;
        void updateConversation({ conversationId: selectedId, side: 'paralegal' });
        requestAnimationFrame(() => {
          threadScrollRef.current?.scrollTo({ top: threadScrollRef.current.scrollHeight });
        });
      }
    };
    const id = setInterval(tick, THREAD_POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, [selectedId]);

  // ── Typing ping (throttled) ──
  const fireTypingPing = useCallback(() => {
    if (!selectedId) return;
    const now = Date.now();
    if (now - lastTypingPingAt.current < TYPING_THROTTLE_MS) return;
    lastTypingPingAt.current = now;
    void pingTyping(selectedId, 'paralegal');
  }, [selectedId]);

  // ── Send paralegal reply ──
  const sendReply = useCallback(async (overrideText?: string, attachmentUrl?: string) => {
    const rawText = (overrideText ?? composer).trim();
    if (!rawText && !attachmentUrl) return;
    if (!selectedId) return;
    // F-I-12 slash command expansion.
    const expanded = expandQuickAction(rawText);
    const text = expanded.text;
    setSending(true);
    if (!overrideText) setComposer('');
    const m = await sendMessage({
      conversationId: selectedId,
      senderType: 'paralegal',
      senderId: paralegal.id,
      senderName: paralegal.displayName,
      body: text,
      attachmentUrl,
    });
    setSending(false);
    if (m) {
      setMessages((prev) => [...prev, m]);
      lastSeenMessageIds.current.add(m._id);
      lastMsgCreatedAt.current = m._createdDate || lastMsgCreatedAt.current;
      requestAnimationFrame(() => {
        threadScrollRef.current?.scrollTo({ top: threadScrollRef.current.scrollHeight });
      });
      void refreshList();

      // F-J: a student's outbound client message is recorded in the
      // supervising paralegal's review queue (non-fatal).
      if (studentMode && currentUser) {
        try {
          await BaseCrudService.create('activitylogs', buildStudentEditAuditEntry({
            studentUser: currentUser,
            fileId: active?.fileId || '',
            fileName: active?.clientName || active?.clientEmail || 'Live chat',
            action: 'sent_chat_message',
            detail: `To ${active?.clientName || active?.clientEmail || 'client'}: ${text}`.slice(0, 280),
          }) as any);
        } catch { /* audit is best-effort */ }
      }
    }
  }, [composer, selectedId, paralegal.id, paralegal.displayName, refreshList, studentMode, currentUser, active]);

  // ── Upload attachment ──
  const onPickFile = useCallback(() => fileInputRef.current?.click(), []);
  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadChatAttachment(f);
      if (url) {
        await sendReply(`📎 Sent attachment: ${f.name}`, url);
      } else {
        alert('Upload failed — try again or use a smaller file.');
      }
    } catch (err: any) {
      alert(`Upload failed: ${err?.message || 'unknown error'}`);
    } finally {
      setUploading(false);
    }
  }, [sendReply]);

  // ── AI draft ──
  const aiDraft = useCallback(async () => {
    if (!selectedId) return;
    setDrafting(true);
    const { draft, configured } = await draftReply(selectedId);
    setDrafting(false);
    if (!configured) {
      setComposer((c) => c || '[AI assist not configured — add LA_ANTHROPIC_API_KEY in Wix Secrets.]');
      return;
    }
    if (draft) setComposer(draft);
  }, [selectedId]);

  // ── Mark closed / reopen ──
  const toggleStatus = useCallback(async () => {
    if (!active?._id) return;
    const next = active.status === 'closed' ? 'open' : 'closed';
    const updated = await updateConversation({
      conversationId: active._id,
      status: next,
    });
    if (updated) setActive(updated);
    void refreshList();
  }, [active, refreshList]);

  // ── Client context (right pane) ──
  const loadClientContext = useCallback(async (email: string, clientId?: string) => {
    setClientContext({ files: [], recentMoney: [], loading: true });
    try {
      const [profilesRes, filesRes, finRes] = await Promise.all([
        BaseCrudService.getAll<any>('clientprofiles', undefined, { limit: 1000 }),
        BaseCrudService.getAll<any>('clientfiles', undefined, { limit: 1000 }),
        BaseCrudService.getAll<any>('financialrecords', undefined, { limit: 1000 }),
      ]);
      const profiles = profilesRes.items || [];
      const files = filesRes.items || [];
      const fin = finRes.items || [];
      setAllFiles(files);
      const profile = clientId
        ? profiles.find((p: any) => p._id === clientId)
        : profiles.find((p: any) => (p.email || '').toLowerCase() === email);
      const matchedClientId = profile?._id || clientId;
      const clientFiles = files.filter((f: any) => f.clientId === matchedClientId);
      const recentMoney = fin
        .filter((r: any) => r.clientId === matchedClientId)
        .sort((a: any, b: any) =>
          new Date(b.transactionDate || b._createdDate || 0).getTime() -
          new Date(a.transactionDate || a._createdDate || 0).getTime()
        )
        .slice(0, 5);
      setClientContext({ profile, files: clientFiles, recentMoney, loading: false });
    } catch {
      setClientContext({ files: [], recentMoney: [], loading: false });
    }
  }, []);

  // ── F-I-7 Link to file ──
  const fileMatches = useMemo(() => {
    const q = filePickerQuery.trim().toLowerCase();
    if (!q) return allFiles.slice(0, 20);
    return allFiles
      .filter((f: any) => {
        const blob = `${f.clientName || ''} ${f.matterType || ''} ${f.fileNumber || ''}`.toLowerCase();
        return blob.includes(q);
      })
      .slice(0, 20);
  }, [filePickerQuery, allFiles]);

  const handleLinkFile = useCallback(async (file: any) => {
    if (!active?._id) return;
    const updated = await linkConversationToFile({
      conversationId: active._id,
      fileId: file._id,
      clientId: file.clientId,
    });
    if (updated) setActive(updated);
    setShowFilePicker(false);
    setFilePickerQuery('');
    setSyncResult(`Linked to ${file.clientName || 'file'}. New messages auto-sync to the comm log.`);
    setTimeout(() => setSyncResult(''), 5000);
  }, [active]);

  const handleSyncCommlog = useCallback(async () => {
    if (!active?._id) return;
    setSyncResult('Syncing…');
    const r = await syncConversationToCommlog(active._id);
    setSyncResult(`Synced ${r.synced}, skipped ${r.skipped}, errors ${r.errors} of ${r.total}.`);
    setTimeout(() => setSyncResult(''), 8000);
  }, [active]);

  // ── F-I-10 detect typing-by-client from conversation row ──
  const clientTyping = useMemo(() => {
    const t = active?.typingByClient;
    if (!t) return false;
    return Date.now() - new Date(t).getTime() < TYPING_WINDOW_MS;
  }, [active?.typingByClient]);

  // ── Render ──
  const cannedGroups = useMemo(() => groupedCannedReplies(), []);
  const totalUnread = conversations.reduce((s, c) => s + (c.unreadByParalegal || 0), 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 240px)', minHeight: 540 }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h2 className="font-heading font-semibold text-foreground">Live Chat</h2>
          {totalUnread > 0 && (
            <Badge className="bg-red-500 text-white">{totalUnread} unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* F-I-6 presence pill */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-full p-0.5">
            {(['online', 'away', 'offline'] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize flex items-center gap-1 ${
                  status === s
                    ? s === 'online'
                      ? 'bg-emerald-500 text-white'
                      : s === 'away'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-400 text-white'
                    : 'text-foreground/60 hover:bg-gray-100'
                }`}
                title={`Set status to ${s}`}
              >
                {status === s && s === 'online' ? <Wifi className="w-2.5 h-2.5" /> : null}
                {status === s && s === 'offline' ? <WifiOff className="w-2.5 h-2.5" /> : null}
                {s}
              </button>
            ))}
          </div>
          {/* F-I-8 notification toggle */}
          <button
            onClick={() => {
              const next = { ...notifSettings, enabled: !notifSettings.enabled };
              setNotifSettings(next);
              saveNotificationSettings(next);
            }}
            className="p-1.5 rounded-md hover:bg-gray-100"
            title={notifSettings.enabled ? 'Disable browser notifications' : 'Enable browser notifications'}
          >
            {notifSettings.enabled
              ? <Bell className="w-3.5 h-3.5 text-foreground/60" />
              : <BellOff className="w-3.5 h-3.5 text-foreground/40" />
            }
          </button>
          <button
            onClick={() => {
              const next = { ...notifSettings, sound: !notifSettings.sound };
              setNotifSettings(next);
              saveNotificationSettings(next);
            }}
            className="p-1.5 rounded-md hover:bg-gray-100"
            title={notifSettings.sound ? 'Mute new-message sound' : 'Unmute new-message sound'}
          >
            {notifSettings.sound
              ? <Volume2 className="w-3.5 h-3.5 text-foreground/60" />
              : <VolumeX className="w-3.5 h-3.5 text-foreground/40" />
            }
          </button>
          <Button variant="outline" size="sm" onClick={refreshList}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr_280px] divide-x divide-gray-100 min-h-0">
        {/* ─── Left pane: F-I-14 Active visitors + conversation list ─── */}
        <div className="flex flex-col min-h-0">
          {/* F-I-14 Active visitors block (top half of left pane) */}
          <div className="p-2 border-b border-gray-100 max-h-[280px] overflow-hidden">
            <ActiveVisitorsPanel />
          </div>
          <div className="p-2 border-b border-gray-100 space-y-2">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-foreground/50">
              Conversations
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-foreground/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full border border-gray-200 rounded-md pl-7 pr-2 py-1.5 text-xs"
              />
            </div>
            <div className="flex gap-1">
              {(['open', 'closed', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-xs py-1 rounded-md capitalize ${
                    filter === f
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-foreground/70 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="py-6 text-center text-xs text-foreground/40 px-3">
                No conversations match this filter.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {conversations.map((c) => {
                  const unread = c.unreadByParalegal || 0;
                  const selected = c._id === selectedId;
                  const ago = c.lastMessageAt
                    ? new Date(c.lastMessageAt).toLocaleString('en-CA', {
                        month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })
                    : '';
                  return (
                    <li key={c._id}>
                      <button
                        onClick={() => selectConversation(c._id || '')}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${selected ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-foreground truncate">
                            {c.clientName || c.clientEmail || 'Unknown'}
                          </span>
                          <div className="flex items-center gap-1">
                            {c.fileId && <Link2 className="w-3 h-3 text-emerald-600" aria-label="Linked to file" />}
                            {unread > 0 && (
                              <span className="bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">
                                {unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-[10px] text-foreground/40">{ago}</div>
                        <div className="text-xs text-foreground/60 line-clamp-2 mt-0.5">
                          {c.lastMessagePreview || '—'}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* ─── Centre pane: active thread ─── */}
        <div className="flex flex-col min-h-0">
          {!selectedId ? (
            <div className="flex-1 flex items-center justify-center text-sm text-foreground/40 text-center p-8">
              Pick a conversation from the left to start.
            </div>
          ) : (
            <>
              <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{active?.clientName}</div>
                  <div className="text-[10px] text-foreground/50">
                    {active?.clientEmail}
                    {active?.fileId && (
                      <span className="ml-2 text-emerald-700">
                        <Link2 className="w-2.5 h-2.5 inline mr-0.5" />Linked
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {active?.status === 'closed' && (
                    <Badge className="bg-gray-100 text-gray-700">Closed</Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={toggleStatus}>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {active?.status === 'closed' ? 'Reopen' : 'Resolved'}
                  </Button>
                </div>
              </div>

              <div ref={threadScrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((m) => {
                  const me = m.senderType === 'paralegal';
                  const sys = m.senderType === 'system';
                  const stamp = m._createdDate
                    ? new Date(m._createdDate).toLocaleString('en-CA', {
                        month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })
                    : '';
                  return (
                    <div
                      key={m._id}
                      className={`flex ${me ? 'justify-end' : sys ? 'justify-center' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${
                          sys
                            ? 'bg-amber-50 text-amber-800 text-xs italic'
                            : me
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-foreground'
                        }`}
                      >
                        {!me && !sys && (
                          <div className="text-[10px] font-semibold opacity-70 mb-0.5">
                            {m.senderName || 'Client'}
                          </div>
                        )}
                        {m.body && <div className="whitespace-pre-wrap break-words">{m.body}</div>}
                        {m.attachmentUrl && (
                          <a
                            href={m.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-1 inline-flex items-center gap-1 text-xs underline ${me ? 'text-white/90' : 'text-primary'}`}
                          >
                            <Paperclip className="w-3 h-3" />
                            Open attachment
                          </a>
                        )}
                        <div className={`text-[9px] mt-1 ${me ? 'text-white/70' : 'text-foreground/40'}`}>
                          {stamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {clientTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-foreground/60 rounded-2xl px-3 py-2 text-xs italic">
                      {active?.clientName || 'Client'} is typing…
                    </div>
                  </div>
                )}
              </div>

              {/* Composer + actions */}
              <div className="border-t border-gray-100 p-2 space-y-2 relative">
                {showCanned && (
                  <div className="absolute bottom-full left-2 right-2 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl z-10 p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground/60">Canned replies</span>
                      <button onClick={() => setShowCanned(false)} className="text-foreground/40">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {Object.entries(cannedGroups).map(([cat, items]) => (
                      <div key={cat} className="mb-2">
                        <div className="text-[10px] uppercase text-foreground/40 tracking-wide mb-1">{cat}</div>
                        <ul className="space-y-0.5">
                          {items.map((r) => (
                            <li key={r.id}>
                              <button
                                onClick={() => { setComposer(r.body); setShowCanned(false); }}
                                className="w-full text-left text-xs px-2 py-1 hover:bg-gray-50 rounded"
                              >
                                {r.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {showHints && (
                  <div className="absolute bottom-full left-2 right-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground/60">Slash commands</span>
                      <button onClick={() => setShowHints(false)} className="text-foreground/40">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <ul className="space-y-0.5">
                      {QUICK_ACTION_HINTS.map((h) => (
                        <li key={h.syntax} className="text-[11px]">
                          <code className="font-mono bg-gray-100 px-1 rounded">{h.syntax}</code>
                          <span className="text-foreground/60 ml-2">{h.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-end gap-2">
                  <textarea
                    value={composer}
                    onChange={(e) => {
                      setComposer(e.target.value);
                      fireTypingPing();
                    }}
                    placeholder="Type a reply… (Try /pay 500 trust)"
                    rows={3}
                    className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        void sendReply();
                      }
                    }}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <div className="flex flex-col gap-1">
                    <Button onClick={() => sendReply()} disabled={sending || (!composer.trim() && !uploading)} size="sm">
                      {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={aiDraft} disabled={drafting} title="Draft a reply with AI">
                      {drafting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={onPickFile} disabled={uploading} title="Attach a file">
                      {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Paperclip className="w-3.5 h-3.5" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowCanned((s) => !s)} title="Canned replies">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="text-[10px] text-foreground/40 flex items-center gap-3 flex-wrap">
                  <span>⌘/Ctrl + Enter to send</span>
                  <button
                    onClick={() => setShowHints((s) => !s)}
                    className="underline hover:text-primary"
                  >
                    Slash commands
                  </button>
                  {syncResult && <span className="text-emerald-700">{syncResult}</span>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── Right pane: client context ─── */}
        <div className="flex flex-col min-h-0">
          {!selectedId ? (
            <div className="p-3 text-xs text-foreground/40 text-center mt-6">
              Select a conversation to see client context here.
            </div>
          ) : clientContext.loading ? (
            <div className="p-3 text-xs text-foreground/40 text-center">
              <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
              Loading…
            </div>
          ) : (
            <div className="p-3 space-y-3 overflow-y-auto">
              {/* F-I-7 Link to file controls */}
              <div>
                <div className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">File link</div>
                {active?.fileId ? (
                  <div className="bg-emerald-50 rounded p-2 text-xs">
                    <div className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Link2 className="w-3 h-3" /> Linked
                    </div>
                    <div className="text-foreground/60 mt-0.5">
                      New messages auto-sync to the comm log.
                    </div>
                    <Button
                      size="sm" variant="outline" className="mt-2 w-full"
                      onClick={handleSyncCommlog}
                    >
                      <FolderInput className="w-3 h-3 mr-1" />
                      Backfill comm log
                    </Button>
                  </div>
                ) : (
                  <div>
                    {!showFilePicker ? (
                      <Button
                        size="sm" variant="outline" className="w-full"
                        onClick={() => setShowFilePicker(true)}
                      >
                        <Link2 className="w-3 h-3 mr-1" />
                        Link to client file
                      </Button>
                    ) : (
                      <div className="bg-gray-50 rounded p-2">
                        <input
                          value={filePickerQuery}
                          onChange={(e) => setFilePickerQuery(e.target.value)}
                          placeholder="Search files…"
                          className="w-full border border-gray-200 rounded px-2 py-1 text-xs mb-1"
                          autoFocus
                        />
                        <ul className="max-h-40 overflow-y-auto">
                          {fileMatches.length === 0 ? (
                            <li className="text-xs text-foreground/40 italic px-1">No files match.</li>
                          ) : fileMatches.map((f: any) => (
                            <li key={f._id}>
                              <button
                                onClick={() => handleLinkFile(f)}
                                className="w-full text-left text-xs px-2 py-1 hover:bg-white rounded"
                              >
                                <div className="font-medium truncate">{f.clientName || 'Unknown'}</div>
                                <div className="text-[10px] text-foreground/50">{f.matterType || ''} {f.fileNumber ? `· ${f.fileNumber}` : ''}</div>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => { setShowFilePicker(false); setFilePickerQuery(''); }}
                          className="text-[10px] text-foreground/50 hover:text-foreground/80 mt-1"
                        >Cancel</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">Client</div>
                {clientContext.profile ? (
                  <div className="bg-gray-50 rounded p-2 text-xs">
                    <div className="flex items-center gap-1 font-medium">
                      <User className="w-3 h-3" />
                      {clientContext.profile.firstName} {clientContext.profile.lastName}
                    </div>
                    <div className="text-foreground/60">{clientContext.profile.email}</div>
                    {clientContext.profile.phone && (
                      <div className="text-foreground/60">{clientContext.profile.phone}</div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-foreground/40 italic">No matching client profile.</div>
                )}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">
                  Files ({clientContext.files.length})
                </div>
                {clientContext.files.length === 0 ? (
                  <div className="text-xs text-foreground/40 italic">No open files.</div>
                ) : (
                  <ul className="space-y-1">
                    {clientContext.files.slice(0, 5).map((f: any) => (
                      <li key={f._id} className="text-xs bg-gray-50 rounded p-2 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1 truncate">
                          <FileText className="w-3 h-3 flex-shrink-0" />
                          {f.matterType || 'matter'}
                        </span>
                        <Badge className={
                          (f.fileStatus || '').toLowerCase() === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-200 text-foreground/70'
                        }>
                          {f.fileStatus || 'unknown'}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">
                  Recent transactions
                </div>
                {clientContext.recentMoney.length === 0 ? (
                  <div className="text-xs text-foreground/40 italic">No transactions on file.</div>
                ) : (
                  <ul className="space-y-1">
                    {clientContext.recentMoney.map((m: any) => (
                      <li key={m._id} className="text-xs bg-gray-50 rounded p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono">${(m.amount || 0).toFixed(2)}</span>
                          <span className="text-foreground/50">{m.transactionType}</span>
                        </div>
                        <div className="text-[10px] text-foreground/40">
                          {new Date(m.transactionDate || m._createdDate).toLocaleDateString('en-CA')}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
