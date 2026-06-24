/**
 * F-J — Paralegal Student Dashboard.
 *
 * Variant of the paralegal dashboard scoped to files the student has
 * been assigned to. Renders only files where the student's useraccount
 * _id appears in clientfiles.assignedStudentIds.
 *
 * Permission model is enforced server-side as well; this UI is a
 * convenience filter. If a student knows another file's _id, the API
 * still rejects access. See src/lib/student-permissions.ts.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Folder, AlertCircle, LogOut, ShieldCheck, EyeOff, FilePlus2, FileText, CalendarClock, ListChecks, Activity as ActivityIcon, Bell, UserCog, Eye, Clock, MessageSquare, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, signOut } from '@/lib/auth-service';
import { getParalegalById } from '@/lib/paralegals';
import {
  filterVisibleFiles,
  isStudent,
  canOpenNewFiles,
  shouldRedactFinancials,
  buildStudentEditAuditEntry,
  type UserAccount,
  type ClientFile,
} from '@/lib/student-permissions';

interface UpcomingItem {
  id: string;          // financialrecords row _id (used to mark a task done)
  kind: 'deadline' | 'task';
  title: string;
  date: string;        // ISO date
  daysAway: number;    // negative = overdue
  fileId: string;
  fileName: string;
  priority?: string;
  meta?: any;          // parsed task meta, for the mark-done write-back
}

interface DocItem {
  id: string;
  name: string;
  status: 'draft' | 'sent' | 'signed' | string;
  recipient: string;
  at: number;          // epoch ms (latest of generation/sent/signed)
}

interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  fileName: string;
  fileId: string;
  at: number;          // epoch ms
}

interface SupervisorMessage {
  id: string;
  fromName: string;
  body: string;
  at: number;          // epoch ms
  read: boolean;
}

const SEEN_FILES_KEY = 'la_student_seen_files';

function safeMeta(record: any): any {
  try { return JSON.parse(record?.description || '{}'); } catch { return {}; }
}
function daysFromToday(iso: string): number {
  const d = new Date(iso); d.setHours(0, 0, 0, 0);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - now.getTime()) / 86_400_000);
}
function humanAction(a: string): string {
  return (a || 'activity').replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

interface FileRow extends ClientFile {
  clientId?: string;
  clientName?: string;
  fileNumber?: string;
  matterType?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserAccount | null>(null);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upcoming, setUpcoming] = useState<UpcomingItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [messages, setMessages] = useState<SupervisorMessage[]>([]);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [newFileIds, setNewFileIds] = useState<Set<string>>(new Set());
  // Time-log composer
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeFileId, setTimeFileId] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [timeNote, setTimeNote] = useState('');
  const [timeSaving, setTimeSaving] = useState(false);
  const [timeMsg, setTimeMsg] = useState('');

  useEffect(() => {
    const u = getCurrentUser() as UserAccount | null;
    if (!u) {
      navigate('/login');
      return;
    }
    if (!isStudent(u)) {
      // Not a student — push to standard dashboards.
      if (u.isAdmin) navigate('/paralegal-dashboard');
      else navigate('/client-dashboard');
      return;
    }
    setUser(u);
    void loadFiles(u);
  }, [navigate]);

  const loadFiles = async (u: UserAccount) => {
    setLoading(true);
    setError('');
    try {
      const res: any = await BaseCrudService.getAll<FileRow>('clientfiles', undefined, { limit: 1000 });
      const all = res?.items || res || [];
      // Client-side filter; server-side authz is the source of truth on individual reads.
      const visible = filterVisibleFiles(u, all);
      // Sort by most recently updated.
      visible.sort((a, b) => {
        const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return db - da;
      });
      setFiles(visible);

      // New-assignment detection: compare against the set of file IDs we
      // recorded the last time this student loaded the dashboard.
      const visibleIds = visible.map(f => f._id);
      try {
        const seenRaw = localStorage.getItem(SEEN_FILES_KEY);
        const seen: string[] = seenRaw ? JSON.parse(seenRaw) : [];
        if (seen.length > 0) {
          setNewFileIds(new Set(visibleIds.filter(id => !seen.includes(id))));
        }
        localStorage.setItem(SEEN_FILES_KEY, JSON.stringify(visibleIds));
      } catch { /* localStorage unavailable — skip new-file badges */ }

      // Productivity data — scoped to the student's assigned files only.
      void loadProductivity(u, new Set(visibleIds), visible);
    } catch (e: any) {
      setError(e?.message || 'Could not load assigned files.');
    } finally {
      setLoading(false);
    }
  };

  const loadProductivity = async (u: UserAccount, fileIds: Set<string>, visible: FileRow[]) => {
    const nameFor = (id: string) => {
      const f = visible.find(v => v._id === id);
      return f ? (f.clientName || f.fileNumber || 'File') : 'File';
    };
    // Deadlines + tickler tasks live in `financialrecords` discriminated by
    // transactionType ('deadline' / 'tickler'); the rich data is JSON in the
    // `description` field. Documents she generated come from
    // `generateddocuments`. All best-effort via allSettled.
    const [finR, logsR, msgsR, docsR] = await Promise.allSettled([
      BaseCrudService.getAll<any>('financialrecords', undefined, { limit: 1000 }),
      BaseCrudService.getAll<any>('activitylogs', undefined, { limit: 1000 }),
      BaseCrudService.getAll<any>('studentmessages', undefined, { limit: 1000 }),
      BaseCrudService.getAll<any>('generateddocuments', undefined, { limit: 1000 }),
    ]);

    const items: UpcomingItem[] = [];
    if (finR.status === 'fulfilled') {
      for (const r of (finR.value?.items || [])) {
        if (!fileIds.has(r.fileId)) continue;
        if (r.transactionType === 'deadline') {
          const m = safeMeta(r);
          if (!m.deadlineDate || m.status === 'completed' || m.status === 'waived') continue;
          items.push({
            id: r._id, kind: 'deadline',
            title: m.deadlineName || 'Deadline',
            date: m.deadlineDate, daysAway: daysFromToday(m.deadlineDate),
            fileId: r.fileId, fileName: nameFor(r.fileId), meta: m,
          });
        } else if (r.transactionType === 'tickler') {
          const m = safeMeta(r);
          if (!m.dueDate || m.status === 'done' || m.status === 'cancelled') continue;
          items.push({
            id: r._id, kind: 'task',
            title: m.taskName || 'Task',
            date: m.dueDate, daysAway: daysFromToday(m.dueDate),
            fileId: r.fileId, fileName: nameFor(r.fileId), priority: m.priority, meta: m,
          });
        }
      }
    }
    items.sort((a, b) => a.daysAway - b.daysAway);
    setUpcoming(items.slice(0, 10));

    if (docsR.status === 'fulfilled') {
      const email = (u.email || '').toLowerCase();
      const list: DocItem[] = (docsR.value?.items || [])
        .filter((r: any) => (r.generatedBy || '').toLowerCase() === email && r.requiresSignature)
        .map((r: any) => {
          const at = Math.max(
            new Date(r.signedDate || 0).getTime(),
            new Date(r.sentDate || 0).getTime(),
            new Date(r.generationDate || r._createdDate || 0).getTime(),
          );
          return { id: r._id, name: r.documentName || 'Document', status: r.status || 'draft', recipient: r.clientEmail || '', at };
        })
        .sort((a: DocItem, b: DocItem) => b.at - a.at)
        .slice(0, 8);
      setDocs(list);
    }

    if (logsR.status === 'fulfilled') {
      const email = (u.email || '').toLowerCase();
      const acts: ActivityItem[] = (logsR.value?.items || [])
        .filter((r: any) => {
          const mine = (r.actorEmail || '').toLowerCase() === email;
          return mine || fileIds.has(r.fileId);
        })
        .map((r: any) => ({
          id: r._id,
          action: r.action || r.activityType || 'activity',
          detail: r.detail || '',
          fileName: r.fileName || nameFor(r.fileId),
          fileId: r.fileId || '',
          at: new Date(r.createdAt || r._createdDate || 0).getTime(),
        }))
        .sort((a: ActivityItem, b: ActivityItem) => b.at - a.at)
        .slice(0, 6);
      setActivity(acts);
    }

    if (msgsR.status === 'fulfilled') {
      const msgs: SupervisorMessage[] = (msgsR.value?.items || [])
        .filter((r: any) => r.studentId === u._id)
        .map((r: any) => ({
          id: r._id,
          fromName: r.fromName || 'Supervising paralegal',
          body: r.body || '',
          at: new Date(r.createdAt || r._createdDate || 0).getTime(),
          read: !!r.readByStudent,
        }))
        .sort((a: SupervisorMessage, b: SupervisorMessage) => b.at - a.at)
        .slice(0, 20);
      setMessages(msgs);
    }
  };

  const markMessageRead = async (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    try {
      await BaseCrudService.update('studentmessages', { _id: id, readByStudent: true } as any);
    } catch { /* optimistic — revert not critical for a read flag */ }
  };

  const markTaskDone = async (item: UpcomingItem) => {
    if (item.kind !== 'task') return;
    setUpcoming(prev => prev.filter(i => i.id !== item.id));
    const updatedMeta = { ...(item.meta || {}), status: 'done', completedDate: new Date().toISOString().split('T')[0] };
    try {
      await BaseCrudService.update('financialrecords', { _id: item.id, description: JSON.stringify(updatedMeta) } as any);
      if (user) {
        await BaseCrudService.create('activitylogs', buildStudentEditAuditEntry({
          studentUser: user,
          fileId: item.fileId,
          fileName: item.fileName,
          action: 'completed_task',
          detail: `Marked task done: ${item.title}`.slice(0, 280),
        }) as any);
      }
    } catch { /* best-effort; the row simply stays open if the write fails */ }
  };

  const submitTimeLog = async () => {
    if (!user) return;
    const minutes = parseInt(timeMinutes, 10);
    if (!timeFileId) { setTimeMsg('Pick a file.'); return; }
    if (!minutes || minutes <= 0) { setTimeMsg('Enter minutes worked.'); return; }
    if (!timeNote.trim()) { setTimeMsg('Add a short description.'); return; }
    setTimeSaving(true);
    setTimeMsg('');
    const file = files.find(f => f._id === timeFileId);
    const author = `${[user.firstName, user.lastName].filter(Boolean).join(' ') || 'Student'} (Student)`;
    const RATE = 150; // supervisor confirms/adjusts the rate at billing time
    const amount = Math.round((minutes / 60) * RATE * 100) / 100;
    try {
      // Recorded as a billing line the supervising paralegal reviews before
      // invoicing. The student does not see the dollar amount when financial
      // view is off; she's logging her time, not setting fees.
      await BaseCrudService.create('financialrecords', {
        _id: crypto.randomUUID(),
        clientId: file?.clientId || '',
        fileId: timeFileId,
        transactionType: 'billing',
        amount,
        transactionDate: new Date().toISOString().split('T')[0],
        description: `Time entry (student): ${timeNote.trim()} — ${minutes} min @ $${RATE}/hr [STUDENT-LOGGED, pending supervisor review]`,
        recordedBy: author,
      });
      await BaseCrudService.create('activitylogs', buildStudentEditAuditEntry({
        studentUser: user,
        fileId: timeFileId,
        fileName: file?.clientName || file?.fileNumber || 'File',
        action: 'logged_time',
        detail: `${minutes} min — ${timeNote.trim()}`.slice(0, 280),
      }) as any);
      setTimeOpen(false);
      setTimeFileId(''); setTimeMinutes(''); setTimeNote('');
      if (user) void loadProductivity(user, new Set(files.map(f => f._id)), files);
    } catch (e: any) {
      setTimeMsg(e?.message || 'Could not log time.');
    } finally {
      setTimeSaving(false);
    }
  };

  const counts = useMemo(() => {
    const total = files.length;
    const open = files.filter(f => (f.status || 'open') === 'open').length;
    const closed = files.filter(f => f.status === 'closed').length;
    return { total, open, closed };
  }, [files]);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Student access</Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Welcome, {user.firstName || 'Student'}
            </h1>
            <p className="font-paragraph text-foreground/70 mt-1">
              You can see and edit only the client files your supervising paralegal has assigned to you.
            </p>
          </div>
          <div className="flex gap-2">
            {canOpenNewFiles(user) && (
              <Button onClick={() => navigate('/student/new-file')}>
                <FilePlus2 className="w-4 h-4 mr-2" /> Open new file
              </Button>
            )}
            {/* F-J: document workflow in student mode — generate new
                documents/retainers; existing clients and other files are
                scoped out inside DocumentWorkflowPage. */}
            <Button variant="outline" onClick={() => navigate('/admin/documents')}>
              <FileText className="w-4 h-4 mr-2" /> Generate documents
            </Button>
            <Button variant="outline" onClick={() => navigate('/student-chat')}>
              <MessageSquare className="w-4 h-4 mr-2" /> Live chat
            </Button>
            <Button variant="outline" onClick={() => { setTimeOpen(true); setTimeMsg(''); }}>
              <Clock className="w-4 h-4 mr-2" /> Log time
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </header>

        {/* Access summary strip — supervisor + financial-view status */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-white border border-gray-200 rounded-xl px-5 py-3 mb-6 text-sm">
          <span className="inline-flex items-center gap-2 text-foreground/80">
            <UserCog className="w-4 h-4 text-foreground/50" />
            Supervising paralegal:&nbsp;
            <span className="font-semibold text-foreground">
              {getParalegalById(user.supervisingParalegalId)?.displayName || 'Not assigned'}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 text-foreground/80">
            {shouldRedactFinancials(user) ? (
              <><EyeOff className="w-4 h-4 text-amber-600" /> Financial view: <span className="font-semibold text-amber-700">off</span></>
            ) : (
              <><Eye className="w-4 h-4 text-emerald-600" /> Financial view: <span className="font-semibold text-emerald-700">on</span></>
            )}
          </span>
        </div>

        {/* New-assignment notification */}
        {newFileIds.size > 0 && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <Bell className="w-5 h-5 text-emerald-700" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">{newFileIds.size} new file{newFileIds.size > 1 ? 's' : ''}</span> assigned to you since your last visit — marked
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 ml-1 align-middle">New</Badge> below.
            </p>
          </div>
        )}

        {/* Messages from supervisor */}
        {messages.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-foreground/50" />
              <h2 className="font-heading font-semibold text-foreground text-sm">Messages from your supervisor</h2>
              {messages.some(m => !m.read) && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {messages.filter(m => !m.read).length} unread
                </Badge>
              )}
            </div>
            <ul className="divide-y divide-gray-100">
              {messages.slice(0, 8).map(m => (
                <li key={m.id} className={`px-5 py-3 flex items-start gap-3 ${m.read ? '' : 'bg-primary/5'}`}>
                  {!m.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" aria-label="unread" />}
                  <div className={`flex-1 min-w-0 ${m.read ? 'pl-5' : ''}`}>
                    <p className="text-sm text-foreground whitespace-pre-wrap break-words">{m.body}</p>
                    <p className="text-[11px] text-foreground/45 mt-1">
                      {m.fromName}
                      {m.at > 0 && <> · {new Date(m.at).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</>}
                    </p>
                  </div>
                  {!m.read && (
                    <Button variant="outline" size="sm" className="flex-shrink-0" onClick={() => void markMessageRead(m.id)}>
                      <Check className="w-3.5 h-3.5 mr-1" /> Mark read
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Assigned files" value={counts.total} />
          <StatCard label="Open" value={counts.open} />
          <StatCard label="Closed" value={counts.closed} />
        </div>

        {/* Productivity panel — upcoming deadlines/tasks + recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Upcoming */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-foreground/50" />
              <h2 className="font-heading font-semibold text-foreground text-sm">Upcoming deadlines &amp; tasks</h2>
            </div>
            {upcoming.length === 0 ? (
              <div className="p-6 text-center text-sm text-foreground/50">
                Nothing due on your assigned files.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {upcoming.map(item => {
                  const overdue = item.daysAway < 0;
                  const soon = item.daysAway >= 0 && item.daysAway <= 3;
                  const when = overdue
                    ? `${Math.abs(item.daysAway)}d overdue`
                    : item.daysAway === 0 ? 'Due today'
                    : `in ${item.daysAway}d`;
                  return (
                    <li key={item.id} className="px-5 py-3 hover:bg-pastelbeige/10 transition flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/client-files/${item.fileId}`)}
                        className="flex items-center gap-3 flex-1 min-w-0 text-left"
                      >
                        {item.kind === 'deadline'
                          ? <CalendarClock className="w-4 h-4 text-violet-500 flex-shrink-0" />
                          : <ListChecks className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-foreground truncate">{item.title}</span>
                          <span className="block text-xs text-foreground/55 truncate">{item.fileName}</span>
                        </span>
                      </button>
                      <span className={`text-xs font-semibold whitespace-nowrap ${overdue ? 'text-red-600' : soon ? 'text-amber-600' : 'text-foreground/50'}`}>
                        {when}
                      </span>
                      {item.kind === 'task' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                          title="Mark this task done"
                          onClick={() => void markTaskDone(item)}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-foreground/50" />
              <h2 className="font-heading font-semibold text-foreground text-sm">Recent activity</h2>
            </div>
            {activity.length === 0 ? (
              <div className="p-6 text-center text-sm text-foreground/50">
                Your recent work on these files will show here.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {activity.map(a => (
                  <li key={a.id} className="px-5 py-3 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-foreground/35 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{humanAction(a.action)}</span>
                        {a.fileName && <span className="text-foreground/55"> · {a.fileName}</span>}
                      </p>
                      {a.detail && <p className="text-xs text-foreground/55 truncate">{a.detail}</p>}
                      {a.at > 0 && (
                        <p className="text-[11px] text-foreground/40 mt-0.5">
                          {new Date(a.at).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Documents you sent for signature */}
        {docs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-foreground/50" />
              <h2 className="font-heading font-semibold text-foreground text-sm">Your documents for signature</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {docs.map(d => {
                const label = d.status === 'signed' ? 'Signed' : d.status === 'sent' ? 'Sent — awaiting signature' : 'Draft';
                const tone = d.status === 'signed'
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : d.status === 'sent'
                  ? 'bg-amber-100 text-amber-700 border-amber-200'
                  : 'bg-gray-100 text-gray-600 border-gray-200';
                return (
                  <li key={d.id} className="px-5 py-3 flex items-center gap-3">
                    <FileText className="w-4 h-4 text-foreground/35 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                      {d.recipient && <p className="text-xs text-foreground/55 truncate">{d.recipient}</p>}
                    </div>
                    <Badge className={`${tone} whitespace-nowrap`}>{label}</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Redaction notice */}
        {shouldRedactFinancials(user) && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <EyeOff className="w-5 h-5 text-amber-700 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Financial fields are hidden in your view.</p>
              <p className="text-foreground/70 mt-1">
                Trust account balances, banking details, and full payment card numbers are redacted by default.
                Ask your supervising paralegal if you need this access for a specific task.
              </p>
            </div>
          </div>
        )}

        {/* Files list */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="font-heading font-semibold text-foreground">Your assigned files</h2>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-foreground/40 mx-auto" />
              <p className="text-sm text-foreground/50 mt-2">Loading…</p>
            </div>
          ) : error ? (
            <div className="p-6 flex items-start gap-3 bg-red-50">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-red-800">Could not load files.</p>
                <p className="text-red-700/80 mt-1">{error}</p>
              </div>
            </div>
          ) : files.length === 0 ? (
            <div className="p-10 text-center">
              <Folder className="w-10 h-10 text-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-foreground/60">
                You have not been assigned to any client files yet.
              </p>
              <p className="text-xs text-foreground/40 mt-1">
                Your supervising paralegal will appear here once they assign you to a file.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {files.map(f => {
                const updated = f.updatedAt || f.createdAt || '';
                const updatedStr = updated
                  ? new Date(updated).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                  : '';
                return (
                  <li key={f._id}>
                    <button
                      onClick={() => navigate(`/admin/client-files/${f._id}`)}
                      className="w-full text-left p-4 hover:bg-pastelbeige/10 focus:outline-none focus:bg-pastelbeige/20 transition flex items-center gap-4"
                    >
                      <Folder className="w-5 h-5 text-foreground/40 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-foreground truncate">
                            {f.clientName || 'Unnamed client'}
                          </p>
                          {f.fileNumber && (
                            <span className="text-xs font-mono text-foreground/55 bg-gray-100 px-1.5 py-0.5 rounded">
                              {f.fileNumber}
                            </span>
                          )}
                          {newFileIds.has(f._id) && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">New</Badge>
                          )}
                          {f.status === 'closed' && (
                            <Badge variant="outline" className="text-xs">Closed</Badge>
                          )}
                        </div>
                        <p className="text-xs text-foreground/55 mt-0.5">
                          {f.matterType || 'Untyped matter'}
                          {updatedStr && <> · last updated {updatedStr}</>}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Time-log modal */}
      {timeOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-semibold text-foreground">Log billable time</h3>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">File</label>
                <select
                  value={timeFileId}
                  onChange={e => setTimeFileId(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5"
                >
                  <option value="">(choose an assigned file)</option>
                  {files.map(f => (
                    <option key={f._id} value={f._id}>{f.clientName || f.fileNumber || 'File'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Minutes worked</label>
                <input
                  type="number" min="1" step="5"
                  value={timeMinutes}
                  onChange={e => setTimeMinutes(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">What did you work on?</label>
                <textarea
                  value={timeNote}
                  onChange={e => setTimeNote(e.target.value)}
                  rows={3}
                  placeholder="e.g. Drafted client identification section and reviewed lease."
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 min-h-[70px]"
                />
              </div>
              <p className="text-[11px] text-foreground/50">
                Logged for your supervising paralegal to review and bill. The billing rate is set by your supervisor.
              </p>
              {timeMsg && <div className="text-xs text-red-600">{timeMsg}</div>}
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={() => setTimeOpen(false)} disabled={timeSaving}>Cancel</Button>
              <Button size="sm" onClick={() => void submitTimeLog()} disabled={timeSaving}>
                {timeSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                Log time
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="font-paragraph text-xs uppercase tracking-wide text-foreground/55">{label}</p>
      <p className="font-heading text-3xl font-bold text-foreground mt-1">{value}</p>
    </div>
  );
}
