/**
 * F-J — AssignedStudentsPicker
 *
 * Drop-in component for the paralegal-side client file detail page.
 * Renders a multi-select of paralegal students and persists changes
 * back to clientfiles.assignedStudentIds (comma-separated text).
 *
 * Usage:
 *   <AssignedStudentsPicker fileId={file._id} value={file.assignedStudentIds || ''} />
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, UserCheck, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { getAssignedStudentIds, setAssignedStudentIds } from '@/lib/student-permissions';

interface Student {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountStatus?: string;
  supervisingParalegalId?: string;
}

interface Props {
  fileId: string;
  /** Current value from clientfiles.assignedStudentIds (comma-separated). */
  value?: string;
  /** Optional: scope the picker to students supervised by this paralegal id. */
  supervisingParalegalId?: string;
  /** Called after a successful save with the new comma-separated string. */
  onChange?: (next: string) => void;
}

export default function AssignedStudentsPicker(props: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(() => getAssignedStudentIds({ assignedStudentIds: props.value }));
  const [error, setError] = useState('');

  useEffect(() => {
    setSelected(getAssignedStudentIds({ assignedStudentIds: props.value }));
  }, [props.value]);

  useEffect(() => {
    void loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const r: any = await BaseCrudService.getAll('useraccounts', undefined, { limit: 1000 });
      const all: Student[] = (r?.items || r || []) as any;
      let list = all.filter((u: any) => u.userType === 'paralegal_student' && u.accountStatus !== 'suspended');
      // We intentionally do NOT filter by props.supervisingParalegalId here.
      // The supervisor is the chain of legal responsibility (LSO By-Law 4
      // s.2(2)), not a routing constraint — any paralegal who opens a file
      // may assign any active student. Showing only same-supervisor students
      // hid them entirely when the file's assigned paralegal differed from
      // the student's supervisor, which was a footgun.
      list.sort((a, b) => {
        const an = `${a.lastName || ''} ${a.firstName || ''}`.toLowerCase();
        const bn = `${b.lastName || ''} ${b.firstName || ''}`.toLowerCase();
        return an.localeCompare(bn);
      });
      setStudents(list);
    } catch (e: any) {
      setError(e?.message || 'Could not load students.');
    } finally {
      setLoading(false);
    }
  };

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = useCallback(async (studentId: string) => {
    const next = selectedSet.has(studentId)
      ? selected.filter(id => id !== studentId)
      : [...selected, studentId];
    setSelected(next);
    await persist(next);
  }, [selected, selectedSet]);

  const persist = async (ids: string[]) => {
    setSaving(true);
    setError('');
    const fieldValue = setAssignedStudentIds(ids);
    try {
      await BaseCrudService.update('clientfiles', {
        _id: props.fileId,
        assignedStudentIds: fieldValue,
      });
      props.onChange?.(fieldValue);
    } catch (e: any) {
      setError(e?.message || 'Could not save assignment.');
      // Rollback local selection
      setSelected(getAssignedStudentIds({ assignedStudentIds: props.value }));
    } finally {
      setSaving(false);
    }
  };

  const selectedStudents = students.filter(s => selectedSet.has(s._id));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h4 className="font-heading font-semibold text-sm text-foreground">Assigned students</h4>
          {saving && <Loader2 className="w-3 h-3 animate-spin text-foreground/40" />}
        </div>
        <Button variant="ghost" size="sm" onClick={() => setOpen(o => !o)} className="h-7 px-2">
          {open ? 'Done' : 'Manage'}
          <ChevronDown className={`w-3.5 h-3.5 ml-1 transition ${open ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Current selection chips */}
      {selectedStudents.length === 0 ? (
        <p className="text-xs text-foreground/55">
          No students assigned. They will not see this file in their dashboard.
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {selectedStudents.map(s => (
            <Badge key={s._id} className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <UserCheck className="w-3 h-3 mr-1" />
              {s.firstName} {s.lastName}
            </Badge>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

      {/* Picker list */}
      {open && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          {loading ? (
            <div className="text-xs text-foreground/50 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Loading students…
            </div>
          ) : students.length === 0 ? (
            <p className="text-xs text-foreground/55">
              No active students yet. Create one at <a href="/admin/students" className="underline">/admin/students</a>.
            </p>
          ) : (
            <ul className="space-y-1 max-h-60 overflow-y-auto">
              {students.map(s => {
                const isSel = selectedSet.has(s._id);
                return (
                  <li key={s._id}>
                    <label className="flex items-center gap-2 text-sm py-1 px-1.5 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSel}
                        onChange={() => void toggle(s._id)}
                        disabled={saving}
                      />
                      <span className="flex-1">
                        {s.firstName} {s.lastName}{' '}
                        <span className="text-xs text-foreground/55">({s.email})</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
