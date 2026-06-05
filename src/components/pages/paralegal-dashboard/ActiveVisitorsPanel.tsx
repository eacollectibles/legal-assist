import { useCallback, useEffect, useState } from 'react';
import { Eye, MessageCircle, Loader2, RefreshCw, User, UserCheck, X, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDefaultParalegal } from '@/lib/paralegals';
import {
  type ActiveVisitor,
  getActiveVisitors,
  initiateVisitorChat,
} from '@/lib/chat-client';

/**
 * F-I-14 ActiveVisitorsPanel — paralegal-side view of who is on
 * the public site right now and a way to start a chat with them.
 *
 * Two modes when initiating:
 *   - 'soft'  : visitor sees a chime + bubble badge; bubble stays closed
 *   - 'pop'   : bubble auto-opens with the paralegal's message visible
 *
 * Polling cadence: every 10 seconds while mounted.
 */

const POLL_MS = 10_000;

export default function ActiveVisitorsPanel() {
  const paralegal = getDefaultParalegal();
  const [visitors, setVisitors] = useState<ActiveVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [target, setTarget] = useState<ActiveVisitor | null>(null);
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'soft' | 'pop'>('soft');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sentBanner, setSentBanner] = useState('');

  const fetchVisitors = useCallback(async () => {
    setRefreshing(true);
    const r = await getActiveVisitors();
    setVisitors(r.visitors || []);
    setRefreshing(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchVisitors();
    const id = setInterval(fetchVisitors, POLL_MS);
    return () => clearInterval(id);
  }, [fetchVisitors]);

  const openInitiateModal = (v: ActiveVisitor) => {
    setTarget(v);
    setMode('soft');
    setMessage(
      v.isSignedIn
        ? `Hi ${v.clientName.split(' ')[0] || 'there'} — I noticed you were on ${v.currentPage}. Anything I can help with?`
        : `Hi — I noticed you were on ${v.currentPage}. Would you like a quick free 30-minute consult on your matter?`
    );
    setError('');
  };

  const closeModal = () => {
    setTarget(null);
    setMessage('');
    setError('');
    setSending(false);
  };

  const submit = async () => {
    if (!target || !message.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    setSending(true);
    setError('');
    const r = await initiateVisitorChat({
      sessionId: target.sessionId,
      paralegalId: paralegal.id,
      paralegalName: paralegal.displayName,
      message: message.trim(),
      mode,
    });
    setSending(false);
    if (!r?.ok) {
      setError(r?.error || 'Could not start the chat. The visitor may have left.');
      return;
    }
    setSentBanner(`Chat started with ${target.clientName || 'visitor'} (mode: ${mode}).`);
    closeModal();
    void fetchVisitors();
    setTimeout(() => setSentBanner(''), 5000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-600" />
          <h3 className="font-heading font-semibold text-foreground text-sm">Active visitors</h3>
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{visitors.length}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { void fetchVisitors(); }}
          disabled={refreshing}
          className="h-8 px-2"
        >
          {refreshing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {/* Sent banner */}
      {sentBanner && (
        <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-700">
          {sentBanner}
        </div>
      )}

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto">
        {loading ? (
          <div className="p-6 text-center text-sm text-foreground/50">
            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
            Loading active visitors…
          </div>
        ) : visitors.length === 0 ? (
          <div className="p-6 text-center text-sm text-foreground/50">
            <Globe className="w-6 h-6 mx-auto mb-2 text-foreground/30" />
            No active visitors right now.
            <div className="text-xs mt-1 text-foreground/40">
              Visitors appear here within ~30 seconds of arriving on the site.
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {visitors.map((v) => (
              <li key={v.sessionId} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {v.isSignedIn ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-emerald-700" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {v.isSignedIn ? (v.clientName || 'Signed-in client') : `Visitor ${v.sessionId.slice(0, 6)}`}
                      </p>
                      {v.hasOpenChat && (
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0">
                          in chat
                        </Badge>
                      )}
                    </div>
                    {v.isSignedIn && v.clientEmail && (
                      <p className="text-xs text-foreground/60 truncate">{v.clientEmail}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-xs text-foreground/55">
                      <span className="inline-flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span className="truncate max-w-[200px]" title={v.currentPage}>
                          {v.currentPage}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {v.timeOnSiteMinutes} min on site
                      </span>
                    </div>
                    {v.referrer && (
                      <p className="text-[10px] text-foreground/40 mt-0.5 truncate" title={v.referrer}>
                        via {v.referrer}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openInitiateModal(v)}
                    className="h-8 px-2.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    Chat
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Initiate-chat modal */}
      {target && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h3 className="font-heading font-semibold text-foreground">
                Start chat with {target.isSignedIn ? (target.clientName || 'client') : `visitor on ${target.currentPage}`}
              </h3>
              <button onClick={closeModal} className="text-foreground/50 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="text-xs text-foreground/60 bg-gray-50 rounded p-2.5">
                <div><strong>Page:</strong> {target.currentPage}</div>
                <div><strong>Time on site:</strong> {target.timeOnSiteMinutes} min</div>
                {target.isSignedIn && (
                  <>
                    <div><strong>Client:</strong> {target.clientName} ({target.clientEmail})</div>
                  </>
                )}
                {!target.isSignedIn && (
                  <div className="mt-1 text-foreground/50">
                    Anonymous visitor — your message will appear in their chat bubble.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Keep it short and personal. Mention the page or topic."
                />
                <div className="text-[10px] text-foreground/50 mt-1">{message.length}/500</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-2">How should the visitor see this?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('soft')}
                    className={`text-left p-3 rounded border ${
                      mode === 'soft' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">Soft prompt</div>
                    <div className="text-[11px] text-foreground/60 mt-0.5">
                      Bubble badge + soft chime. Visitor opens when ready.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('pop')}
                    className={`text-left p-3 rounded border ${
                      mode === 'pop' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">Pop open</div>
                    <div className="text-[11px] text-foreground/60 mt-0.5">
                      Bubble auto-opens with your message. Higher response.
                    </div>
                  </button>
                </div>
              </div>
              {error && <div className="text-xs text-red-600">{error}</div>}
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={closeModal} disabled={sending}>Cancel</Button>
              <Button size="sm" onClick={submit} disabled={sending || !message.trim()}>
                {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <MessageCircle className="w-3.5 h-3.5 mr-1" />}
                Send to visitor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
