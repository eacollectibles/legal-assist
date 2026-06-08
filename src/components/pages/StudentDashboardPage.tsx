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
import { Loader2, Folder, AlertCircle, LogOut, ShieldCheck, EyeOff, FilePlus2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { getCurrentUser, signOut } from '@/lib/auth-service';
import {
  filterVisibleFiles,
  isStudent,
  canOpenNewFiles,
  shouldRedactFinancials,
  type UserAccount,
  type ClientFile,
} from '@/lib/student-permissions';

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
    } catch (e: any) {
      setError(e?.message || 'Could not load assigned files.');
    } finally {
      setLoading(false);
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
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Assigned files" value={counts.total} />
          <StatCard label="Open" value={counts.open} />
          <StatCard label="Closed" value={counts.closed} />
        </div>

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
