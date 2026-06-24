/**
 * F-J — Student management page for supervising paralegals.
 *
 * Lets a paralegal:
 *   - Create a paralegal_student useraccount (sets a temp password).
 *   - Toggle allowFinancialView per student.
 *   - Re-assign supervisingParalegalId.
 *   - Suspend a student account.
 *
 * Route: /admin/students
 * Access: paralegals only (isAdmin === true).
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, UserPlus, Users, ShieldCheck, ShieldOff, RefreshCw, AlertCircle, Eye, EyeOff, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, isAdmin, hashPassword } from '@/lib/auth-service';
import { getActiveParalegals } from '@/lib/paralegals';

interface UserRow {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  userType?: string;
  supervisingParalegalId?: string;
  allowFinancialView?: boolean;
  accountStatus?: string;
  lastLoginDate?: string;
}

export default function StudentManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Add-student form state
  const [draft, setDraft] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    supervisingParalegalId: '',
    allowFinancialView: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  // Student activity review queue (activitylogs, activityType 'student_edit')
  interface AuditRow {
    _id: string;
    actorName?: string;
    actorEmail?: string;
    fileName?: string;
    action?: string;
    detail?: string;
    createdAt?: string | Date;
    activityType?: string;
  }
  const [auditRows, setAuditRows] = useState<AuditRow[]>([]);
  const [auditLoading, setAuditLoading] = useState(true);
  const [auditAll, setAuditAll] = useState(false);

  const loadAudit = async () => {
    setAuditLoading(true);
    try {
      const r: any = await BaseCrudService.getAll('activitylogs', undefined, { limit: 1000 });
      const all: AuditRow[] = (r?.items || []) as AuditRow[];
      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const rows = all
        .filter(a => a.activityType === 'student_edit')
        .filter(a => auditAll || (a.createdAt && new Date(a.createdAt).getTime() >= cutoff))
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setAuditRows(rows);
    } catch { /* non-fatal panel */ }
    finally { setAuditLoading(false); }
  };

  useEffect(() => { void loadAudit(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [auditAll]);

  // Supervisor → student message composer
  const [msgTarget, setMsgTarget] = useState<UserRow | null>(null);
  const [msgBody, setMsgBody] = useState('');
  const [msgSending, setMsgSending] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [msgSent, setMsgSent] = useState('');

  const sendMessage = async () => {
    if (!msgTarget) return;
    const body = msgBody.trim();
    if (!body) { setMsgError('Write a message first.'); return; }
    setMsgSending(true);
    setMsgError('');
    try {
      const me: any = getCurrentUser();
      const fromName = me ? `${me.firstName || ''} ${me.lastName || ''}`.trim() || me.email : 'Supervising paralegal';
      await BaseCrudService.create('studentmessages', {
        _id: crypto.randomUUID(),
        studentId: msgTarget._id,
        studentName: `${msgTarget.firstName || ''} ${msgTarget.lastName || ''}`.trim(),
        fromParalegalId: me?.supervisingParalegalId || '',
        fromName,
        fromEmail: me?.email || '',
        body,
        readByStudent: false,
        createdAt: new Date(),
      });
      setMsgSent(`Message sent to ${msgTarget.firstName || 'the student'}.`);
      setMsgBody('');
      setMsgTarget(null);
      setTimeout(() => setMsgSent(''), 4000);
    } catch (e: any) {
      setMsgError(e?.message || 'Could not send the message.');
    } finally {
      setMsgSending(false);
    }
  };

  const paralegals = useMemo(() => getActiveParalegals(), []);

  useEffect(() => {
    const me = getCurrentUser();
    if (!me || !isAdmin()) {
      navigate('/login');
      return;
    }
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadUsers = async () => {
    setRefreshing(true);
    setError('');
    try {
      const r: any = await BaseCrudService.getAll('useraccounts', undefined, { limit: 1000 });
      const all: UserRow[] = (r?.items || r || []) as UserRow[];
      const students = all.filter(u => u.userType === 'paralegal_student');
      // Sort by last name, then first name
      students.sort((a, b) => {
        const an = `${a.lastName || ''} ${a.firstName || ''}`.toLowerCase();
        const bn = `${b.lastName || ''} ${b.firstName || ''}`.toLowerCase();
        return an.localeCompare(bn);
      });
      setUsers(students);
    } catch (e: any) {
      setError(e?.message || 'Could not load students.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const addStudent = async () => {
    setSubmitError('');
    const firstName = draft.firstName.trim();
    const lastName = draft.lastName.trim();
    const email = draft.email.trim().toLowerCase();
    const password = draft.password;
    if (!firstName || !lastName) { setSubmitError('First and last name required.'); return; }
    if (!email.includes('@')) { setSubmitError('Valid email required.'); return; }
    if (password.length < 8) { setSubmitError('Password must be at least 8 characters.'); return; }
    if (!draft.supervisingParalegalId) { setSubmitError('Pick a supervising paralegal.'); return; }

    setSubmitting(true);
    try {
      // Check for duplicate email
      const existing: any = await BaseCrudService.getAll('useraccounts', undefined, { limit: 1000 });
      const list: UserRow[] = existing?.items || existing || [];
      if (list.some(u => (u.email || '').toLowerCase() === email)) {
        setSubmitError('A user with that email already exists.');
        setSubmitting(false);
        return;
      }
      const passwordHash = await hashPassword(password);
      await BaseCrudService.create('useraccounts', {
        _id: crypto.randomUUID(),
        firstName,
        lastName,
        email,
        passwordHash,
        userType: 'paralegal_student',
        isAdmin: false,
        accountStatus: 'active',
        supervisingParalegalId: draft.supervisingParalegalId,
        allowFinancialView: !!draft.allowFinancialView,
        createdAt: new Date(),
      });
      setShowAdd(false);
      setDraft({ firstName: '', lastName: '', email: '', password: '', supervisingParalegalId: '', allowFinancialView: false });
      await loadUsers();
    } catch (e: any) {
      setSubmitError(e?.message || 'Could not create the student account.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFinancialView = async (u: UserRow) => {
    try {
      const next = !u.allowFinancialView;
      await BaseCrudService.update('useraccounts', { _id: u._id, allowFinancialView: next });
      setUsers(prev => prev.map(p => p._id === u._id ? { ...p, allowFinancialView: next } : p));
    } catch (e: any) {
      alert(e?.message || 'Could not update.');
    }
  };

  const toggleSuspend = async (u: UserRow) => {
    const next = u.accountStatus === 'suspended' ? 'active' : 'suspended';
    try {
      await BaseCrudService.update('useraccounts', { _id: u._id, accountStatus: next });
      setUsers(prev => prev.map(p => p._id === u._id ? { ...p, accountStatus: next } : p));
    } catch (e: any) {
      alert(e?.message || 'Could not update.');
    }
  };

  const reassign = async (u: UserRow, paralegalId: string) => {
    try {
      await BaseCrudService.update('useraccounts', { _id: u._id, supervisingParalegalId: paralegalId });
      setUsers(prev => prev.map(p => p._id === u._id ? { ...p, supervisingParalegalId: paralegalId } : p));
    } catch (e: any) {
      alert(e?.message || 'Could not update.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-foreground/40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pastelbeige/20">
      <div className="max-w-5xl mx-auto p-6 lg:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-primary" />
              <Badge>Supervisor view</Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Paralegal students</h1>
            <p className="font-paragraph text-foreground/70 mt-1">
              Add students, choose a supervising paralegal, and control which students may see financial data.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void loadUsers()} disabled={refreshing}>
              {refreshing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh
            </Button>
            <Button onClick={() => setShowAdd(true)}>
              <UserPlus className="w-4 h-4 mr-2" /> Add student
            </Button>
          </div>
        </header>

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {msgSent && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <Send className="w-5 h-5 text-emerald-600" />
            <p className="text-sm text-emerald-800">{msgSent}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-foreground">
              Students ({users.length})
            </h2>
          </div>

          {users.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="w-10 h-10 text-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-foreground/60">No students yet.</p>
              <p className="text-xs text-foreground/40 mt-1">Click "Add student" to create one.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {users.map(u => {
                const supervisor = paralegals.find(p => p.id === u.supervisingParalegalId);
                const suspended = u.accountStatus === 'suspended';
                return (
                  <li key={u._id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${suspended ? 'bg-gray-200 text-gray-500' : 'bg-emerald-100 text-emerald-800'}`}>
                        {(u.firstName?.[0] || '') + (u.lastName?.[0] || '')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-foreground">
                            {u.firstName} {u.lastName}
                          </p>
                          {suspended && <Badge variant="outline" className="text-xs">Suspended</Badge>}
                          {u.allowFinancialView && (
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                              <Eye className="w-3 h-3 mr-1" /> Financial view
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-foreground/60 mt-0.5">{u.email}</p>
                        <div className="text-xs text-foreground/55 mt-1 flex items-center gap-2 flex-wrap">
                          <span>Supervisor:</span>
                          <select
                            value={u.supervisingParalegalId || ''}
                            onChange={(e) => void reassign(u, e.target.value)}
                            className="text-xs border border-gray-200 rounded px-1.5 py-0.5"
                          >
                            <option value="">(none)</option>
                            {paralegals.map(p => (
                              <option key={p.id} value={p.id}>{p.displayName}</option>
                            ))}
                          </select>
                          {supervisor && (
                            <span className="text-foreground/40">— LSO #{supervisor.lsoNumber}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setMsgTarget(u); setMsgBody(''); setMsgError(''); }}
                          title="Send a message to this student"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => void toggleFinancialView(u)}
                          title={u.allowFinancialView ? 'Revoke financial view' : 'Grant financial view'}
                        >
                          {u.allowFinancialView ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => void toggleSuspend(u)}
                          title={suspended ? 'Reactivate' : 'Suspend'}
                        >
                          {suspended ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldOff className="w-3.5 h-3.5" />}
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Student activity review queue — surfaces buildStudentEditAuditEntry
            rows (activitylogs, activityType 'student_edit') so the supervising
            paralegal can review what students changed (LSO By-Law 4 s. 2(2)
            supervision). Newest first, last 30 days by default. */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-8">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-foreground">
              Student activity {auditLoading ? '' : `(${auditRows.length}${auditAll ? '' : ' in last 30 days'})`}
            </h2>
            <div className="flex items-center gap-3">
              <label className="text-xs text-foreground/60 flex items-center gap-1.5">
                <input type="checkbox" checked={auditAll} onChange={e => setAuditAll(e.target.checked)} />
                Show all
              </label>
              <Button variant="outline" size="sm" onClick={() => void loadAudit()} disabled={auditLoading}>
                {auditLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>
          {auditLoading ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-foreground/30" /></div>
          ) : auditRows.length === 0 ? (
            <div className="p-8 text-center text-sm text-foreground/55">
              No student edits recorded{auditAll ? '' : ' in the last 30 days'}.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {auditRows.slice(0, 50).map(a => (
                <li key={a._id} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{a.actorName || a.actorEmail || 'Student'}</span>
                        {' '}<span className="text-foreground/70">{(a.action || 'edited').replace(/_/g, ' ')}</span>
                        {a.fileName ? <span className="text-foreground/70"> on <span className="font-medium text-foreground">{a.fileName}</span></span> : null}
                      </p>
                      {a.detail && <p className="text-xs text-foreground/55 mt-0.5">{a.detail}</p>}
                    </div>
                    <span className="text-xs text-foreground/45 whitespace-nowrap">
                      {a.createdAt ? new Date(a.createdAt).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </li>
              ))}
              {auditRows.length > 50 && (
                <li className="px-5 py-2 text-xs text-foreground/50">Showing the 50 most recent of {auditRows.length}.</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Message composer modal */}
      {msgTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-semibold text-foreground">
                Message {msgTarget.firstName} {msgTarget.lastName}
              </h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-foreground/60">
                This appears in the student's dashboard under "Messages from your supervisor."
              </p>
              <textarea
                value={msgBody}
                onChange={e => setMsgBody(e.target.value)}
                rows={5}
                autoFocus
                placeholder="e.g. Please finish the client identification section on the Wahlah file before Friday."
                className="w-full text-sm border border-gray-200 rounded px-3 py-2 min-h-[110px]"
              />
              {msgError && <div className="text-xs text-red-600">{msgError}</div>}
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={() => setMsgTarget(null)} disabled={msgSending}>Cancel</Button>
              <Button size="sm" onClick={() => void sendMessage()} disabled={msgSending || !msgBody.trim()}>
                {msgSending ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add-student modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="font-heading font-semibold text-foreground">Add a paralegal student</h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First name" value={draft.firstName} onChange={v => setDraft({ ...draft, firstName: v })} />
                <Input label="Last name" value={draft.lastName} onChange={v => setDraft({ ...draft, lastName: v })} />
              </div>
              <Input label="Email" type="email" value={draft.email} onChange={v => setDraft({ ...draft, email: v })} />
              <div className="relative">
                <Input
                  label="Temporary password (min 8 chars)"
                  type={showPwd ? 'text' : 'password'}
                  value={draft.password}
                  onChange={v => setDraft({ ...draft, password: v })}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  className="absolute right-2 top-7 text-foreground/50 hover:text-foreground"
                  title={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Supervising paralegal</label>
                <select
                  value={draft.supervisingParalegalId}
                  onChange={(e) => setDraft({ ...draft, supervisingParalegalId: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5"
                >
                  <option value="">(choose)</option>
                  {paralegals.map(p => (
                    <option key={p.id} value={p.id}>{p.displayName} — LSO #{p.lsoNumber}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.allowFinancialView}
                  onChange={(e) => setDraft({ ...draft, allowFinancialView: e.target.checked })}
                  className="mt-1"
                />
                <span>
                  <span className="font-medium text-foreground">Allow financial view</span>
                  <span className="block text-xs text-foreground/60">
                    Shows trust balances, banking details, full payment cards. Default off; you can toggle later.
                  </span>
                </span>
              </label>
              {submitError && <div className="text-xs text-red-600">{submitError}</div>}
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)} disabled={submitting}>Cancel</Button>
              <Button size="sm" onClick={() => void addStudent()} disabled={submitting}>
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <UserPlus className="w-3.5 h-3.5 mr-1" />}
                Create student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input(props: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground/70 mb-1">{props.label}</label>
      <input
        type={props.type || 'text'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded px-2 py-1.5"
      />
    </div>
  );
}
