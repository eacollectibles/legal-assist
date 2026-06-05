import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Loader2, Paperclip, Check, CheckCheck } from 'lucide-react';
import {
  type ChatConversation, type ChatMessage,
  loadIdentity, saveIdentity,
  loadConversationId, saveConversationId,
  startConversation, sendMessage, pollConversation, updateConversation,
  getPresence, pingTyping, uploadChatAttachment,
  sendVisitorHeartbeat, type PendingInitiation,
} from '@/lib/chat-client';

/**
 * ClientChatBubble (v2) — public-site chat widget.
 *
 * v2 changes:
 *   F-I-6   Online-presence aware: when no paralegal has
 *           heartbeat'd in the last minute we show a quieter
 *           "we're currently offline" experience that still
 *           captures the lead.
 *   F-I-9   Paperclip → upload an attachment via Wix Media.
 *   F-I-10  Typing indicator (both directions): polls reveal
 *           typingByParalegal; we also ping typingByClient as
 *           the user types.
 *   F-I-11  Read receipts: messages from the client carry a
 *           single tick when sent, double tick once the
 *           conversation's lastReadByParalegalAt is past their
 *           timestamp.
 */

type Phase = 'collapsed' | 'identity' | 'open' | 'offline-form';

const POLL_OPEN_MS = 3000;
const POLL_IDLE_MS = 15000;
const PRESENCE_POLL_MS = 60_000;
const TYPING_THROTTLE_MS = 2000;
const TYPING_WINDOW_MS = 3000;

export default function ClientChatBubble() {
  const [phase, setPhase] = useState<Phase>('collapsed');
  const [identity, setIdentity] = useState<{ name: string; email: string } | null>(() => loadIdentity());
  const [draftName, setDraftName] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [conversation, setConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [composer, setComposer] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [anyOnline, setAnyOnline] = useState<boolean | null>(null);
  const [offlineForm, setOfflineForm] = useState({ phone: '', message: '' });
  const [offlineSubmitted, setOfflineSubmitted] = useState(false);
  const sinceRef = useRef<string>('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const conversationIdRef = useRef<string>('');
  const lastTypingPingAt = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ── Poll presence on mount + every minute ──
  useEffect(() => {
    let cancelled = false;
    const fetchPresence = async () => {
      const p = await getPresence();
      if (cancelled) return;
      setAnyOnline(p.anyOnline);
    };
    void fetchPresence();
    const id = setInterval(fetchPresence, PRESENCE_POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // ── F-I-14 Visitor heartbeat (every 30s) ──
  // Tracks the visitor in `chatvisitors` so the paralegal Active Visitors
  // panel knows they are on the site. Returns any pending paralegal-initiated
  // chat; we react based on `mode`:
  //   - 'pop': open the bubble with the message immediately
  //   - 'soft': show a one-time badge + chime; bubble stays closed
  useEffect(() => {
    let cancelled = false;
    const sendHB = async () => {
      const stored = identity || loadIdentity();
      const r = await sendVisitorHeartbeat({
        page: typeof window !== 'undefined' ? window.location.pathname : '/',
        title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        clientName: stored?.name || '',
        clientEmail: stored?.email || '',
      });
      if (cancelled) return;
      if (r.pendingInitiation) {
        void handlePendingInitiation(r.pendingInitiation);
      }
    };
    void sendHB();
    const id = setInterval(sendHB, 30_000);
    return () => { cancelled = true; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  // React to a paralegal-initiated chat the visitor's heartbeat picked up.
  const handlePendingInitiation = useCallback(async (p: PendingInitiation) => {
    // Persist the conversation id locally so a refresh still finds it.
    saveConversationId(p.conversationId);
    conversationIdRef.current = p.conversationId;
    // Pull the conversation + messages immediately.
    const poll = await pollConversation(p.conversationId, undefined);
    if (poll?.conversation) {
      setConversation(poll.conversation);
      setMessages(poll.messages);
      if (poll.messages.length > 0) {
        sinceRef.current = poll.messages[poll.messages.length - 1]._createdDate || '';
      }
    }
    // Play a quiet attention chime regardless of mode.
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
        g.gain.setValueAtTime(0.18, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.26);
        setTimeout(() => ctx.close().catch(() => undefined), 400);
      }
    } catch { /* ignore */ }
    if (p.mode === 'pop') {
      // Force-open the bubble — only possible if we have an identity, otherwise show identity form pre-filled with anonymous.
      const stored = identity || loadIdentity();
      if (stored) {
        setIdentity(stored);
        setPhase('open');
      } else {
        // For anonymous visitors, open the identity form with a hint.
        setPhase('identity');
      }
    }
    // For 'soft' mode we leave the bubble collapsed; the badge below shows the unread count.
  }, [identity]);

  // ── Resume / start ──
  const resume = useCallback(async (name: string, email: string) => {
    setBusy(true);
    setError('');
    const c = await startConversation(name, email);
    setBusy(false);
    if (!c) { setError('Chat is temporarily unavailable. Please email us instead.'); return; }
    saveConversationId(c._id || '');
    conversationIdRef.current = c._id || '';
    setConversation(c);
    setPhase('open');
    setMessages([]);
    sinceRef.current = '';
  }, []);

  const openWidget = useCallback(async () => {
    // F-I-6 If offline, route to the leave-a-message form.
    if (anyOnline === false) {
      setPhase('offline-form');
      return;
    }
    const stored = identity || loadIdentity();
    if (stored) {
      setIdentity(stored);
      setPhase('open');
      const existingId = loadConversationId();
      if (existingId && !conversationIdRef.current) {
        conversationIdRef.current = existingId;
        const r = await pollConversation(existingId, undefined);
        if (r.conversation) {
          setConversation(r.conversation);
          setMessages(r.messages);
          if (r.messages.length > 0) {
            sinceRef.current = r.messages[r.messages.length - 1]._createdDate || '';
          }
        } else {
          saveConversationId('');
          await resume(stored.name, stored.email);
        }
      } else if (!existingId) {
        await resume(stored.name, stored.email);
      }
    } else {
      setPhase('identity');
    }
  }, [identity, resume, anyOnline]);

  // ── Identity submit ──
  const submitIdentity = useCallback(async () => {
    const name = draftName.trim();
    const email = draftEmail.trim().toLowerCase();
    if (!name || !email.includes('@')) {
      setError('Please enter your name and a valid email.');
      return;
    }
    saveIdentity(name, email);
    setIdentity({ name, email });
    await resume(name, email);
  }, [draftName, draftEmail, resume]);

  // ── F-I-6 Offline form submit ──
  const submitOfflineForm = useCallback(async () => {
    const name = (identity?.name || draftName).trim();
    const email = (identity?.email || draftEmail).trim().toLowerCase();
    const message = offlineForm.message.trim();
    if (!name || !email.includes('@') || !message) {
      setError('Please complete name, email, and a brief message.');
      return;
    }
    setBusy(true);
    setError('');
    // Save identity so we don't re-ask on return.
    saveIdentity(name, email);
    setIdentity({ name, email });
    // Create a conversation row so the paralegal sees it next login.
    const c = await startConversation(name, email);
    if (c?._id) {
      const phoneNote = offlineForm.phone.trim() ? ` (phone ${offlineForm.phone.trim()})` : '';
      await sendMessage({
        conversationId: c._id,
        senderType: 'client',
        senderName: name,
        body: `[Offline message${phoneNote}] ${message}`,
      });
      saveConversationId(c._id);
    }
    setBusy(false);
    setOfflineSubmitted(true);
  }, [identity, draftName, draftEmail, offlineForm]);

  // ── F-I-10 throttled typing ping ──
  const fireTypingPing = useCallback(() => {
    const id = conversationIdRef.current;
    if (!id) return;
    const now = Date.now();
    if (now - lastTypingPingAt.current < TYPING_THROTTLE_MS) return;
    lastTypingPingAt.current = now;
    void pingTyping(id, 'client');
  }, []);

  // ── Send message ──
  const send = useCallback(async (overrideText?: string, attachmentUrl?: string) => {
    const text = (overrideText ?? composer).trim();
    const id = conversationIdRef.current;
    if (!id || !identity) return;
    if (!text && !attachmentUrl) return;
    setSending(true);
    if (!overrideText) setComposer('');
    const m = await sendMessage({
      conversationId: id,
      senderType: 'client',
      senderName: identity.name,
      body: text,
      attachmentUrl,
    });
    setSending(false);
    if (m) {
      setMessages((prev) => [...prev, m]);
      sinceRef.current = m._createdDate || sinceRef.current;
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      });
    } else {
      setError('Message failed to send. Try again.');
    }
  }, [composer, identity]);

  // ── F-I-9 attachment upload ──
  const onPickFile = useCallback(() => fileInputRef.current?.click(), []);
  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadChatAttachment(f);
      if (url) {
        await send(`📎 ${f.name}`, url);
      } else {
        setError('Upload failed. Try a smaller file.');
      }
    } catch (err: any) {
      setError(err?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }, [send]);

  // ── Poll loop ──
  useEffect(() => {
    let cancelled = false;
    let timer: any = null;
    const tick = async () => {
      if (cancelled) return;
      const id = conversationIdRef.current;
      if (id && document.visibilityState === 'visible') {
        const r = await pollConversation(id, sinceRef.current || undefined);
        if (cancelled) return;
        if (r.conversation) setConversation(r.conversation);
        if (r.messages.length > 0) {
          setMessages((prev) => {
            const seen = new Set(prev.map((m) => m._id));
            const merged = [...prev];
            for (const m of r.messages) if (!seen.has(m._id)) merged.push(m);
            return merged;
          });
          sinceRef.current = r.messages[r.messages.length - 1]._createdDate || sinceRef.current;
          if (phase === 'open') {
            requestAnimationFrame(() => {
              scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
            });
            void updateConversation({ conversationId: id, side: 'client' });
          }
        }
      }
      const interval = phase === 'open' ? POLL_OPEN_MS : POLL_IDLE_MS;
      timer = setTimeout(tick, interval);
    };
    timer = setTimeout(tick, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [phase]);

  // ── Esc to close ──
  useEffect(() => {
    if (phase === 'collapsed') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhase('collapsed');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [phase]);

  const unread = conversation?.unreadByClient || 0;

  // F-I-10 paralegal typing?
  const paralegalTyping = (() => {
    const t = conversation?.typingByParalegal;
    if (!t) return false;
    return Date.now() - new Date(t).getTime() < TYPING_WINDOW_MS;
  })();
  // F-I-11 read receipts: paralegal-read threshold timestamp.
  const lastReadAt = conversation?.lastReadByParalegalAt
    ? new Date(conversation.lastReadByParalegalAt).getTime()
    : 0;

  /* ───── Render ───── */
  if (phase === 'collapsed') {
    return (
      <button
        type="button"
        onClick={openWidget}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors p-3.5 flex items-center justify-center"
        aria-label={anyOnline === false ? 'Leave a message — we are offline' : 'Open chat'}
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {anyOnline === false && (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gray-400 border-2 border-white"
            title="Currently offline — leave a message"
          />
        )}
        {anyOnline === true && (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse"
            title="A paralegal is online"
          />
        )}
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-64px)] overflow-hidden"
      role="dialog"
      aria-label="Live chat with Legal Assist"
    >
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm flex items-center gap-1.5">
            Legal Assist
            {anyOnline === true && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" title="Online" />}
            {anyOnline === false && <span className="w-1.5 h-1.5 rounded-full bg-white/40" title="Offline" />}
          </div>
          <div className="text-[11px] text-white/80">
            {anyOnline === false
              ? 'Currently offline — leave a message and we\'ll reply.'
              : 'We typically reply within a few minutes.'}
          </div>
        </div>
        <button onClick={() => setPhase('collapsed')} className="text-white/80 hover:text-white" aria-label="Close chat">
          <X className="w-4 h-4" />
        </button>
      </div>

      {phase === 'identity' ? (
        <div className="p-4 flex-1 flex flex-col gap-3">
          <p className="text-sm text-foreground/80">
            Hi — leave your name and email so we can reply if you step away from the page.
          </p>
          <div>
            <label className="text-xs text-foreground/60">Your name</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={draftName} onChange={(e) => setDraftName(e.target.value)} autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Email</label>
            <input
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} type="email"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            onClick={submitIdentity}
            disabled={busy}
            className="bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Start chatting'}
          </button>
          <p className="text-[10px] text-foreground/40 mt-auto">
            By chatting you consent to us replying by email if you go offline. This is not legal advice — see our terms.
          </p>
        </div>
      ) : phase === 'offline-form' ? (
        <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto">
          {offlineSubmitted ? (
            <div className="text-center mt-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">Thanks — we've got your message.</p>
              <p className="text-xs text-foreground/60">
                We'll respond by email within 1 business day. If your matter is urgent, call us at
                <a href="tel:+16399992222" className="text-primary underline ml-1">+1 (639) 999-2222</a>.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-foreground/80">
                We're not online right now — leave your details and we'll respond by email within
                one business day.
              </p>
              <div>
                <label className="text-xs text-foreground/60">Your name</label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  value={identity?.name || draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-foreground/60">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  value={identity?.email || draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)} type="email"
                />
              </div>
              <div>
                <label className="text-xs text-foreground/60">Phone (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  value={offlineForm.phone}
                  onChange={(e) => setOfflineForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-foreground/60">Message</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm resize-none"
                  placeholder="What's the matter about? Briefly is fine."
                  value={offlineForm.message}
                  onChange={(e) => setOfflineForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                onClick={submitOfflineForm}
                disabled={busy}
                className="bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Send message'}
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && !busy && (
              <p className="text-xs text-foreground/40 text-center mt-6">
                Tell us what's going on and we'll help where we can.
              </p>
            )}
            {messages.map((m) => {
              const mine = m.senderType === 'client';
              const sys = m.senderType === 'system';
              const ts = m._createdDate ? new Date(m._createdDate).getTime() : 0;
              const read = mine && ts > 0 && lastReadAt > 0 && ts <= lastReadAt;
              return (
                <div
                  key={m._id}
                  className={`flex ${mine ? 'justify-end' : sys ? 'justify-center' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      sys
                        ? 'bg-amber-50 text-amber-800 text-xs italic'
                        : mine
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-foreground'
                    }`}
                  >
                    {!mine && !sys && (
                      <div className="text-[10px] font-semibold opacity-70 mb-0.5">
                        {m.senderName || 'Legal Assist'}
                      </div>
                    )}
                    {m.body && <div className="whitespace-pre-wrap break-words">{m.body}</div>}
                    {m.attachmentUrl && (
                      <a
                        href={m.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-1 inline-flex items-center gap-1 text-xs underline ${mine ? 'text-white/90' : 'text-primary'}`}
                      >
                        <Paperclip className="w-3 h-3" />
                        Open attachment
                      </a>
                    )}
                    {mine && (
                      <div className="text-[9px] mt-0.5 flex justify-end gap-0.5 text-white/70" title={read ? 'Read' : 'Sent'}>
                        {read
                          ? <CheckCheck className="w-3 h-3" />
                          : <Check className="w-3 h-3" />
                        }
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {paralegalTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-foreground/60 rounded-2xl px-3 py-2 text-xs italic">
                  Johnny is typing…
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 p-2 flex items-end gap-2">
            <textarea
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary"
              rows={2}
              placeholder="Type a message…"
              value={composer}
              onChange={(e) => { setComposer(e.target.value); fireTypingPing(); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
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
              <button
                onClick={() => send()}
                disabled={sending || !composer.trim()}
                className="bg-primary text-white p-2 rounded-md disabled:opacity-50"
                aria-label="Send"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
              <button
                onClick={onPickFile}
                disabled={uploading}
                className="bg-gray-100 text-foreground p-2 rounded-md disabled:opacity-50 hover:bg-gray-200"
                aria-label="Attach a file"
                title="Attach a file"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="px-3 py-1.5 text-[11px] text-red-600 bg-red-50 border-t border-red-100">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
