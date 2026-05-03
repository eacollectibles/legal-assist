/**
 * Tickler / Task Management Page
 *
 * Per-file to-do lists with due dates, priorities, categories, assignments,
 * and recurring task support. Designed for the paralegal daily docket workflow.
 *
 * Features:
 * - Tasks linked to client files
 * - 4 priority levels: Urgent / High / Medium / Low
 * - 8 task categories matching paralegal workflow
 * - Recurring tasks (daily, weekly, monthly, custom)
 * - "Today's Docket" view for daily workflow
 * - Kanban-style board (To Do / In Progress / Done)
 * - Overdue tracking with escalation
 *
 * Data stored in 'financialrecords' collection with transactionType: 'tickler'
 * Metadata JSON in 'description' field.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft, Plus, Clock, AlertTriangle, AlertCircle,
  CheckCircle, Search, Loader2, Calendar, Bell,
  Briefcase, Trash2, Edit, X, CalendarClock,
  ListTodo, LayoutGrid, Filter, ChevronDown, RotateCcw,
  Circle, ArrowUp, ArrowRight, ArrowDown, Minus,
  User, Tag, Repeat, CheckSquare, Square,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ============================================================
// TYPES & CONSTANTS
// ============================================================

interface CmsRecord {
  _id: string;
  _createdDate?: Date | string;
  _updatedDate?: Date | string;
  clientId?: string;
  fileId?: string;
  transactionType?: string;
  amount?: number;
  transactionDate?: Date | string;
  description?: string;
  referenceNumber?: string;
  trustAccountId?: string;
  invoiceNumber?: string;
  paymentMethod?: string;
  recordedBy?: string;
}

interface ClientFile {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  matterType?: string;
  matterDescription?: string;
  fileStatus?: string;
}

// Task metadata stored as JSON in 'description' field
interface TaskMeta {
  taskName: string;
  taskDescription: string;
  dueDate: string;                // ISO date string
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: string;
  status: 'todo' | 'in_progress' | 'done' | 'cancelled';
  assignedTo: string;
  recurring: 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
  completedDate?: string;
  notes: string;
  createdDate: string;
}

// Enriched task with computed fields
interface EnrichedTask {
  _id: string;
  record: CmsRecord;
  meta: TaskMeta;
  fileNumber: string;
  clientName: string;
  matterType: string;
  daysUntilDue: number;
  isOverdue: boolean;
}

const PRIORITIES: { value: TaskMeta['priority']; label: string; color: string; bgColor: string; icon: React.ElementType }[] = [
  { value: 'urgent', label: 'Urgent', color: 'text-red-700', bgColor: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
  { value: 'high', label: 'High', color: 'text-orange-700', bgColor: 'bg-orange-100 text-orange-700 border-orange-200', icon: ArrowUp },
  { value: 'medium', label: 'Medium', color: 'text-blue-700', bgColor: 'bg-blue-100 text-blue-700 border-blue-200', icon: ArrowRight },
  { value: 'low', label: 'Low', color: 'text-gray-600', bgColor: 'bg-gray-100 text-gray-600 border-gray-200', icon: ArrowDown },
];

const CATEGORIES = [
  { value: 'filing', label: 'Filing / Service', color: '#B94A1F' },
  { value: 'court_prep', label: 'Court / Tribunal Prep', color: '#6B21A8' },
  { value: 'client_followup', label: 'Client Follow-up', color: '#4A7C59' },
  { value: 'document_review', label: 'Document Review', color: '#3B82F6' },
  { value: 'research', label: 'Legal Research', color: '#D97706' },
  { value: 'correspondence', label: 'Correspondence', color: '#0891B2' },
  { value: 'disclosure', label: 'Disclosure / Evidence', color: '#DC2626' },
  { value: 'administrative', label: 'Administrative', color: '#6B7280' },
];

const STATUS_OPTIONS: { value: TaskMeta['status']; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
];

const RECURRING_OPTIONS: { value: TaskMeta['recurring']; label: string }[] = [
  { value: 'none', label: 'One-time' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every 2 Weeks' },
  { value: 'monthly', label: 'Monthly' },
];

// ============================================================
// HELPERS
// ============================================================

function parseMeta(record: CmsRecord): TaskMeta | null {
  try {
    return JSON.parse(record.description || '{}') as TaskMeta;
  } catch {
    return null;
  }
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function formatDate(d: string | Date | undefined): string {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function isToday(d: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return d === today;
}

function isTomorrow(d: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return d === tomorrow.toISOString().split('T')[0];
}

function dueDateLabel(daysUntilDue: number, isOverdue: boolean): string {
  if (isOverdue) return `${Math.abs(daysUntilDue)}d overdue`;
  if (daysUntilDue === 0) return 'Today';
  if (daysUntilDue === 1) return 'Tomorrow';
  if (daysUntilDue <= 7) return `${daysUntilDue}d`;
  return `${daysUntilDue}d`;
}

function prioritySort(p: TaskMeta['priority']): number {
  switch (p) {
    case 'urgent': return 0;
    case 'high': return 1;
    case 'medium': return 2;
    case 'low': return 3;
  }
}

function getNextRecurringDate(dueDate: string, recurring: TaskMeta['recurring']): string {
  const d = new Date(dueDate);
  switch (recurring) {
    case 'daily': d.setDate(d.getDate() + 1); break;
    case 'weekly': d.setDate(d.getDate() + 7); break;
    case 'biweekly': d.setDate(d.getDate() + 14); break;
    case 'monthly': d.setMonth(d.getMonth() + 1); break;
    default: return dueDate;
  }
  return d.toISOString().split('T')[0];
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function TicklerTaskPage() {
  // Data state
  const [tasks, setTasks] = useState<CmsRecord[]>([]);
  const [clientFiles, setClientFiles] = useState<ClientFile[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeTab, setActiveTab] = useState('today');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFile, setFilterFile] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);

  // Dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<EnrichedTask | null>(null);
  const [saving, setSaving] = useState(false);

  // Feedback toast
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const emptyForm = {
    fileId: '',
    taskName: '',
    taskDescription: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium' as TaskMeta['priority'],
    category: 'administrative',
    assignedTo: 'paralegal',
    recurring: 'none' as TaskMeta['recurring'],
    notes: '',
  };
  const [form, setForm] = useState(emptyForm);

  // ============================================================
  // DATA LOADING
  // ============================================================

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [finRes, fileRes] = await Promise.all([
        BaseCrudService.getAll<any>('financialrecords'),
        BaseCrudService.getAll<any>('clientfiles'),
      ]);
      const allFin = finRes.items || [];
      setTasks(allFin.filter((r: any) => r.transactionType === 'tickler'));
      setClientFiles(fileRes.items || []);
    } catch (err) {
      console.error('Failed to load task data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ============================================================
  // ENRICHMENT
  // ============================================================

  const fileMap = useMemo(() => {
    const m: Record<string, ClientFile> = {};
    clientFiles.forEach(f => { m[f._id] = f; });
    return m;
  }, [clientFiles]);

  const enrichedTasks = useMemo((): EnrichedTask[] => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return tasks
      .map(rec => {
        const meta = parseMeta(rec);
        if (!meta) return null;
        const file = fileMap[rec.fileId || ''];
        const dueDate = new Date(meta.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        const daysUntilDue = daysBetween(now, dueDate);
        const isOverdue = daysUntilDue < 0 && meta.status !== 'done' && meta.status !== 'cancelled';
        return {
          _id: rec._id,
          record: rec,
          meta,
          fileNumber: file?.fileNumber || rec.fileId || '—',
          clientName: file?.clientName || '—',
          matterType: file?.matterType || '—',
          daysUntilDue,
          isOverdue,
        } as EnrichedTask;
      })
      .filter(Boolean) as EnrichedTask[];
  }, [tasks, fileMap]);

  // ============================================================
  // STATS
  // ============================================================

  const stats = useMemo(() => {
    const active = enrichedTasks.filter(t => t.meta.status !== 'done' && t.meta.status !== 'cancelled');
    const today = new Date().toISOString().split('T')[0];
    return {
      total: active.length,
      overdue: active.filter(t => t.isOverdue).length,
      dueToday: active.filter(t => t.meta.dueDate === today).length,
      urgent: active.filter(t => t.meta.priority === 'urgent').length,
      inProgress: active.filter(t => t.meta.status === 'in_progress').length,
      completedThisWeek: enrichedTasks.filter(t => {
        if (t.meta.status !== 'done' || !t.meta.completedDate) return false;
        const completed = new Date(t.meta.completedDate);
        const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
        return completed >= weekAgo;
      }).length,
    };
  }, [enrichedTasks]);

  // ============================================================
  // FILTERED TASKS
  // ============================================================

  const filteredTasks = useMemo(() => {
    let list = [...enrichedTasks];

    // Filter by completion status
    if (!showCompleted) {
      list = list.filter(t => t.meta.status !== 'done' && t.meta.status !== 'cancelled');
    }

    // Tab-specific filtering
    if (activeTab === 'today') {
      const today = new Date().toISOString().split('T')[0];
      list = list.filter(t =>
        t.meta.status !== 'done' && t.meta.status !== 'cancelled' &&
        (t.meta.dueDate <= today || t.meta.priority === 'urgent')
      );
    }

    // Filters
    if (filterPriority !== 'all') list = list.filter(t => t.meta.priority === filterPriority);
    if (filterCategory !== 'all') list = list.filter(t => t.meta.category === filterCategory);
    if (filterFile !== 'all') list = list.filter(t => t.record.fileId === filterFile);

    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(t =>
        t.meta.taskName.toLowerCase().includes(q) ||
        t.clientName.toLowerCase().includes(q) ||
        t.fileNumber.toLowerCase().includes(q) ||
        t.meta.taskDescription.toLowerCase().includes(q)
      );
    }

    // Sort: overdue first, then by priority, then by due date
    list.sort((a, b) => {
      if (a.meta.status === 'done' && b.meta.status !== 'done') return 1;
      if (b.meta.status === 'done' && a.meta.status !== 'done') return -1;
      if (a.isOverdue && !b.isOverdue) return -1;
      if (!a.isOverdue && b.isOverdue) return 1;
      const pDiff = prioritySort(a.meta.priority) - prioritySort(b.meta.priority);
      if (pDiff !== 0) return pDiff;
      return a.daysUntilDue - b.daysUntilDue;
    });

    return list;
  }, [enrichedTasks, showCompleted, activeTab, filterPriority, filterCategory, filterFile, searchTerm]);

  // ============================================================
  // ACTIONS
  // ============================================================

  const toast = (msg: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSaveTask = async (isEdit: boolean) => {
    if (!form.fileId || !form.taskName || !form.dueDate) {
      toast('Please fill in file, task name, and due date', 'error');
      return;
    }
    setSaving(true);
    try {
      const meta: TaskMeta = {
        taskName: form.taskName,
        taskDescription: form.taskDescription,
        dueDate: form.dueDate,
        priority: form.priority,
        category: form.category,
        status: isEdit && selectedTask ? selectedTask.meta.status : 'todo',
        assignedTo: form.assignedTo,
        recurring: form.recurring,
        notes: form.notes,
        createdDate: isEdit && selectedTask ? selectedTask.meta.createdDate : new Date().toISOString().split('T')[0],
        completedDate: isEdit && selectedTask ? selectedTask.meta.completedDate : undefined,
      };

      if (isEdit && selectedTask) {
        await BaseCrudService.update('financialrecords', {
          _id: selectedTask._id,
          fileId: form.fileId,
          clientId: fileMap[form.fileId]?.clientId || '',
          description: JSON.stringify(meta),
        });
        toast('Task updated');
      } else {
        await BaseCrudService.create('financialrecords', {
          fileId: form.fileId,
          clientId: fileMap[form.fileId]?.clientId || '',
          transactionType: 'tickler',
          transactionDate: new Date().toISOString(),
          description: JSON.stringify(meta),
          referenceNumber: `TK-${Date.now()}`,
          recordedBy: 'paralegal',
        });
        toast('Task created');
      }

      setShowAddDialog(false);
      setShowEditDialog(false);
      setForm(emptyForm);
      await loadData();
    } catch (err) {
      toast('Failed to save task', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (task: EnrichedTask, newStatus: TaskMeta['status']) => {
    setSaving(true);
    try {
      const updatedMeta: TaskMeta = {
        ...task.meta,
        status: newStatus,
        completedDate: newStatus === 'done' ? new Date().toISOString().split('T')[0] : task.meta.completedDate,
      };
      await BaseCrudService.update('financialrecords', {
        _id: task._id,
        description: JSON.stringify(updatedMeta),
      });

      // If recurring and marked done, create next occurrence
      if (newStatus === 'done' && task.meta.recurring !== 'none') {
        const nextDue = getNextRecurringDate(task.meta.dueDate, task.meta.recurring);
        const nextMeta: TaskMeta = {
          ...task.meta,
          status: 'todo',
          dueDate: nextDue,
          completedDate: undefined,
          createdDate: new Date().toISOString().split('T')[0],
        };
        await BaseCrudService.create('financialrecords', {
          fileId: task.record.fileId,
          clientId: task.record.clientId,
          transactionType: 'tickler',
          transactionDate: new Date().toISOString(),
          description: JSON.stringify(nextMeta),
          referenceNumber: `TK-${Date.now()}`,
          recordedBy: 'paralegal',
        });
        toast(`Task completed — next occurrence created for ${formatDate(nextDue)}`);
      } else {
        toast(newStatus === 'done' ? 'Task completed' : 'Status updated');
      }
      await loadData();
    } catch (err) {
      toast('Failed to update task', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    setSaving(true);
    try {
      await BaseCrudService.delete('financialrecords', selectedTask._id);
      toast('Task deleted');
      setShowDeleteConfirm(false);
      setSelectedTask(null);
      await loadData();
    } catch (err) {
      toast('Failed to delete task', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (task: EnrichedTask) => {
    setSelectedTask(task);
    setForm({
      fileId: task.record.fileId || '',
      taskName: task.meta.taskName,
      taskDescription: task.meta.taskDescription,
      dueDate: task.meta.dueDate,
      priority: task.meta.priority,
      category: task.meta.category,
      assignedTo: task.meta.assignedTo,
      recurring: task.meta.recurring,
      notes: task.meta.notes,
    });
    setShowEditDialog(true);
  };

  // ============================================================
  // TASK ROW COMPONENT
  // ============================================================

  const TaskRow = ({ task }: { task: EnrichedTask }) => {
    const pri = PRIORITIES.find(p => p.value === task.meta.priority);
    const cat = CATEGORIES.find(c => c.value === task.meta.category);
    const isDone = task.meta.status === 'done' || task.meta.status === 'cancelled';

    return (
      <div className={`bg-white rounded-xl border p-4 hover:shadow-md transition-shadow ${
        task.isOverdue ? 'border-red-300 bg-red-50/50' :
        task.daysUntilDue === 0 ? 'border-orange-200 bg-orange-50/30' :
        'border-gray-100'
      } ${isDone ? 'opacity-60' : ''}`}>
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={(e) => { e.stopPropagation(); handleStatusChange(task, isDone ? 'todo' : 'done'); }}
            className={`mt-0.5 flex-shrink-0 ${isDone ? 'text-green-500' : 'text-gray-300 hover:text-green-400'} transition-colors`}
          >
            {isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-medium text-sm ${isDone ? 'line-through text-foreground/40' : ''}`}>
                {task.meta.taskName}
              </span>
              {/* Priority badge */}
              {pri && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${pri.bgColor}`}>
                  <pri.icon className="w-3 h-3" />
                  {pri.label}
                </span>
              )}
              {/* Category badge */}
              {cat && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {cat.label}
                </span>
              )}
              {/* Recurring badge */}
              {task.meta.recurring !== 'none' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  <Repeat className="w-3 h-3" />
                  {RECURRING_OPTIONS.find(r => r.value === task.meta.recurring)?.label}
                </span>
              )}
            </div>

            {task.meta.taskDescription && (
              <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{task.meta.taskDescription}</p>
            )}

            <div className="flex items-center gap-4 mt-2 text-xs text-foreground/40">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> {task.fileNumber}
              </span>
              <span>{task.clientName}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(task.meta.dueDate)}
              </span>
              {task.meta.status === 'in_progress' && (
                <span className="text-blue-600 font-medium">In Progress</span>
              )}
            </div>
          </div>

          {/* Right side: days + actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isDone && (
              <span className={`text-sm font-bold ${
                task.isOverdue ? 'text-red-600' :
                task.daysUntilDue === 0 ? 'text-orange-600' :
                task.daysUntilDue <= 3 ? 'text-yellow-600' : 'text-foreground/40'
              }`}>
                {dueDateLabel(task.daysUntilDue, task.isOverdue)}
              </span>
            )}

            {/* Status cycle button */}
            {!isDone && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = task.meta.status === 'todo' ? 'in_progress' : 'done';
                  handleStatusChange(task, next);
                }}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-foreground/40 hover:text-foreground/70 transition-colors"
                title={task.meta.status === 'todo' ? 'Start' : 'Complete'}
              >
                {task.meta.status === 'todo' ? <ArrowRight className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              </button>
            )}

            {/* Edit */}
            <button
              onClick={(e) => { e.stopPropagation(); openEdit(task); }}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>

            {/* Delete */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setShowDeleteConfirm(true); }}
              className="p-1.5 rounded-lg hover:bg-red-50 text-foreground/40 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // FORM COMPONENT (reused for add & edit)
  // ============================================================

  const TaskForm = ({ isEdit }: { isEdit: boolean }) => (
    <div className="space-y-4 py-2">
      {/* File */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Client File *</label>
        <select
          value={form.fileId}
          onChange={e => setForm(p => ({ ...p, fileId: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="">Select a file...</option>
          {clientFiles
            .filter(f => f.fileStatus === 'active' || f.fileStatus === 'Active')
            .sort((a, b) => (a.fileNumber || '').localeCompare(b.fileNumber || ''))
            .map(f => (
              <option key={f._id} value={f._id}>
                {f.fileNumber} — {f.clientName} ({f.matterType || 'General'})
              </option>
            ))
          }
        </select>
      </div>

      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Task Name *</label>
        <Input
          value={form.taskName}
          onChange={e => setForm(p => ({ ...p, taskName: e.target.value }))}
          placeholder="e.g., File Statement of Claim, Prepare disclosure package"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Description</label>
        <textarea
          value={form.taskDescription}
          onChange={e => setForm(p => ({ ...p, taskDescription: e.target.value }))}
          placeholder="Optional details..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16"
        />
      </div>

      {/* Due Date + Priority */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Due Date *</label>
          <Input
            type="date"
            value={form.dueDate}
            onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Priority</label>
          <select
            value={form.priority}
            onChange={e => setForm(p => ({ ...p, priority: e.target.value as TaskMeta['priority'] }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {PRIORITIES.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category + Recurring */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Category</label>
          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Recurring</label>
          <select
            value={form.recurring}
            onChange={e => setForm(p => ({ ...p, recurring: e.target.value as TaskMeta['recurring'] }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {RECURRING_OPTIONS.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assigned To */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Assigned To</label>
        <Input
          value={form.assignedTo}
          onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value }))}
          placeholder="e.g., paralegal, clerk, student"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Notes</label>
        <textarea
          value={form.notes}
          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          placeholder="Additional notes..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16"
        />
      </div>
    </div>
  );

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#B94A1F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/paralegal-dashboard'}
                className="text-foreground/60 hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Dashboard
              </Button>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                  <ListTodo className="w-6 h-6 text-[#B94A1F]" />
                  Tickler / Task Management
                </h1>
                <p className="font-paragraph text-sm text-foreground/60 mt-0.5">
                  Per-file to-do lists — your daily docket
                </p>
              </div>
            </div>
            <Button
              onClick={() => { setForm(emptyForm); setShowAddDialog(true); }}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> New Task
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Overdue', count: stats.overdue, color: 'bg-red-600', icon: AlertCircle },
            { label: 'Due Today', count: stats.dueToday, color: 'bg-orange-500', icon: Calendar },
            { label: 'Urgent', count: stats.urgent, color: 'bg-red-500', icon: AlertTriangle },
            { label: 'In Progress', count: stats.inProgress, color: 'bg-blue-500', icon: ArrowRight },
            { label: 'Total Active', count: stats.total, color: 'bg-[#B94A1F]', icon: ListTodo },
            { label: 'Done (7d)', count: stats.completedThisWeek, color: 'bg-green-500', icon: CheckCircle },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 rounded-lg ${s.color} text-white flex items-center justify-center mx-auto mb-2`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-foreground">{s.count}</p>
              <p className="text-xs text-foreground/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Overdue Banner */}
        {stats.overdue > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-heading font-semibold text-red-800">
                {stats.overdue} Overdue Task{stats.overdue !== 1 ? 's' : ''}
              </p>
              <p className="font-paragraph text-sm text-red-700 mt-1">
                You have tasks past their due date. Review and complete or reschedule them to stay on top of your files.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="today">Today's Docket</TabsTrigger>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="byfile">By File</TabsTrigger>
            </TabsList>
          </div>

          {/* Filters (shown on 'all' and 'today' tabs) */}
          {(activeTab === 'all' || activeTab === 'today') && (
            <div className="flex flex-wrap gap-3 items-center mt-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={filterPriority}
                onChange={e => setFilterPriority(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Priorities</option>
                {PRIORITIES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {activeTab === 'all' && (
                <label className="flex items-center gap-2 text-sm text-foreground/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={e => setShowCompleted(e.target.checked)}
                    className="rounded"
                  />
                  Show done
                </label>
              )}
            </div>
          )}

          {/* ===================== TODAY'S DOCKET ===================== */}
          <TabsContent value="today" className="mt-4 space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                <p className="font-heading text-lg text-foreground/60">All clear for today!</p>
                <p className="font-paragraph text-sm text-foreground/40 mt-1">
                  No tasks due today or overdue. You're on top of things.
                </p>
              </div>
            ) : (
              filteredTasks.map(task => <TaskRow key={task._id} task={task} />)
            )}
          </TabsContent>

          {/* ===================== ALL TASKS ===================== */}
          <TabsContent value="all" className="mt-4 space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <ListTodo className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="font-heading text-lg text-foreground/60">No tasks found</p>
                <p className="font-paragraph text-sm text-foreground/40 mt-1">
                  {tasks.length === 0 ? 'Create your first task to get started.' : 'Try adjusting your filters.'}
                </p>
              </div>
            ) : (
              filteredTasks.map(task => <TaskRow key={task._id} task={task} />)
            )}
          </TabsContent>

          {/* ===================== BY FILE ===================== */}
          <TabsContent value="byfile" className="mt-4 space-y-4">
            {(() => {
              const activeTasks = enrichedTasks.filter(t => t.meta.status !== 'done' && t.meta.status !== 'cancelled');
              const byFile: Record<string, EnrichedTask[]> = {};
              activeTasks.forEach(t => {
                const key = t.record.fileId || 'unassigned';
                if (!byFile[key]) byFile[key] = [];
                byFile[key].push(t);
              });
              const fileEntries = Object.entries(byFile).sort((a, b) => {
                const minA = Math.min(...a[1].map(t => t.daysUntilDue));
                const minB = Math.min(...b[1].map(t => t.daysUntilDue));
                return minA - minB;
              });

              if (fileEntries.length === 0) {
                return (
                  <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-heading text-lg text-foreground/60">No active tasks by file</p>
                  </div>
                );
              }

              return fileEntries.map(([fileId, fileTasks]) => {
                const file = fileMap[fileId];
                const overdue = fileTasks.filter(t => t.isOverdue).length;
                return (
                  <div key={fileId} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className={`px-4 py-3 border-b flex items-center justify-between ${overdue > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
                      <div>
                        <span className="font-heading font-semibold text-sm">
                          {file?.fileNumber || fileId}
                        </span>
                        <span className="mx-2 text-foreground/30">·</span>
                        <span className="text-sm text-foreground/60">{file?.clientName || '—'}</span>
                        {file?.matterType && (
                          <>
                            <span className="mx-2 text-foreground/30">·</span>
                            <span className="text-xs text-foreground/50">{file.matterType}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {overdue > 0 && (
                          <Badge className="bg-red-600 text-white text-xs">{overdue} overdue</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{fileTasks.length} task{fileTasks.length !== 1 ? 's' : ''}</Badge>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {fileTasks
                        .sort((a, b) => prioritySort(a.meta.priority) - prioritySort(b.meta.priority) || a.daysUntilDue - b.daysUntilDue)
                        .map(task => {
                          const pri = PRIORITIES.find(p => p.value === task.meta.priority);
                          const cat = CATEGORIES.find(c => c.value === task.meta.category);
                          return (
                            <div key={task._id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleStatusChange(task, 'done')}
                                  className="text-gray-300 hover:text-green-500 transition-colors"
                                >
                                  <Square className="w-4 h-4" />
                                </button>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">{task.meta.taskName}</p>
                                    {pri && (
                                      <span className={`px-1.5 py-0.5 rounded text-xs ${pri.bgColor}`}>{pri.label}</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-foreground/40 mt-0.5">
                                    Due: {formatDate(task.meta.dueDate)}
                                    {cat ? ` · ${cat.label}` : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${task.isOverdue ? 'text-red-600' : task.daysUntilDue <= 3 ? 'text-orange-600' : 'text-foreground/40'}`}>
                                  {dueDateLabel(task.daysUntilDue, task.isOverdue)}
                                </span>
                                <button onClick={() => openEdit(task)} className="p-1 rounded hover:bg-gray-100 text-foreground/40">
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              });
            })()}
          </TabsContent>
        </Tabs>
      </main>

      {/* ===================== ADD TASK DIALOG ===================== */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">New Task</DialogTitle>
          </DialogHeader>
          <TaskForm isEdit={false} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button
              onClick={() => handleSaveTask(false)}
              disabled={saving}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== EDIT TASK DIALOG ===================== */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm isEdit={true} />
          {selectedTask && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <label className="text-sm font-medium text-foreground/70">Status:</label>
              <select
                value={selectedTask.meta.status}
                onChange={e => {
                  const newStatus = e.target.value as TaskMeta['status'];
                  handleStatusChange(selectedTask, newStatus);
                  setShowEditDialog(false);
                }}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button
              onClick={() => handleSaveTask(true)}
              disabled={saving}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== DELETE CONFIRM ===================== */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-red-600">Delete Task</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm text-foreground/70">
              Are you sure you want to delete <strong>{selectedTask?.meta.taskName}</strong>
              {' '}from file <strong>{selectedTask?.fileNumber}</strong>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== FEEDBACK TOAST ===================== */}
      {feedback && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2 text-sm font-medium animate-in slide-in-from-right ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {feedback.msg}
        </div>
      )}
    </div>
  );
}
