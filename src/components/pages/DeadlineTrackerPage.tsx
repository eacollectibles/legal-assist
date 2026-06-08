/**
 * Limitation Period & Deadline Tracker
 *
 * Critical risk-management tool for Ontario paralegals.
 * Auto-calculates limitation periods and procedural deadlines based on
 * matter type, with 3-tier escalating alerts (Warning / Urgent / Critical).
 *
 * Features:
 * - Pre-configured Ontario limitation periods by matter type
 * - Custom deadline support for ad-hoc dates
 * - Per-file deadline tracking linked to clientfiles collection
 * - 3-tier color-coded alert system (30d / 7d / 48h)
 * - Dashboard overview with counts per tier
 * - Deadline completion / snooze / extension
 *
 * Data stored in 'financialrecords' collection with transactionType: 'deadline'
 * Metadata JSON in 'description' field.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft, Plus, Clock, AlertTriangle, AlertCircle,
  CheckCircle, Search, Filter, Loader2, Calendar, Bell,
  Shield, Briefcase, Eye, Trash2, Edit, ChevronDown,
  ChevronUp, X, CalendarClock, RotateCcw, Timer,
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
  fileOpenDate?: string;
  incidentDate?: string;
}

// Deadline metadata stored as JSON in 'description' field
interface DeadlineMeta {
  deadlineType: string;        // 'limitation' | 'procedural' | 'custom'
  deadlineName: string;        // Human-readable name
  deadlineDate: string;        // ISO date string — the actual deadline
  triggerDate: string;          // The date the clock started (incident, filing, etc.)
  matterType: string;          // e.g. 'small_claims', 'ltb', etc.
  ruleId: string;              // Which rule was applied
  notes: string;               // Optional notes
  status: 'active' | 'completed' | 'extended' | 'waived';
  completedDate?: string;
  extensionDate?: string;
  extensionReason?: string;
}

// Enriched deadline with computed fields
interface EnrichedDeadline {
  _id: string;
  record: CmsRecord;
  meta: DeadlineMeta;
  fileNumber: string;
  clientName: string;
  matterType: string;
  daysRemaining: number;
  alertTier: 'safe' | 'warning' | 'urgent' | 'critical' | 'overdue' | 'completed';
  isOverdue: boolean;
}

// ============================================================
// ONTARIO LIMITATION RULES
// ============================================================

interface LimitationRule {
  id: string;
  matterType: string;
  name: string;
  description: string;
  type: 'limitation' | 'procedural';
  daysFromTrigger: number;
  triggerDescription: string;  // What event starts the clock
  statute: string;             // Legal authority
}

const ONTARIO_LIMITATION_RULES: LimitationRule[] = [
  // Small Claims Court
  {
    id: 'sc_limitation_2yr',
    matterType: 'small_claims',
    name: 'General Limitation Period',
    description: 'Action must be commenced within 2 years of discovery',
    type: 'limitation',
    daysFromTrigger: 730,
    triggerDescription: 'Date cause of action discovered',
    statute: 'Limitations Act, 2002, s. 4',
  },
  {
    id: 'sc_ultimate_15yr',
    matterType: 'small_claims',
    name: 'Ultimate Limitation Period',
    description: 'No action after 15 years from the act or omission',
    type: 'limitation',
    daysFromTrigger: 5475,
    triggerDescription: 'Date of the act or omission',
    statute: 'Limitations Act, 2002, s. 15',
  },
  {
    id: 'sc_defence_20d',
    matterType: 'small_claims',
    name: 'Defence Filing Deadline',
    description: 'Defendant must file defence within 20 days of service',
    type: 'procedural',
    daysFromTrigger: 20,
    triggerDescription: 'Date of service of claim',
    statute: 'Small Claims Court Rules, R. 9.01(1)',
  },
  {
    id: 'sc_appeal_30d',
    matterType: 'small_claims',
    name: 'Appeal Period',
    description: 'Appeal to Divisional Court within 30 days of order',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of judgment/order',
    statute: 'Courts of Justice Act, s. 31',
  },

  // Landlord and Tenant Board (LTB)
  {
    id: 'ltb_t2_1yr',
    matterType: 'ltb',
    name: 'T2 Application Limitation',
    description: 'Tenant application about rights — 1 year from breach',
    type: 'limitation',
    daysFromTrigger: 365,
    triggerDescription: 'Date of alleged breach by landlord',
    statute: 'Residential Tenancies Act, 2006, s. 29(2)',
  },
  {
    id: 'ltb_l2_30d',
    matterType: 'ltb',
    name: 'L2 Application (N12/N13)',
    description: 'Landlord application after notice period expires',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date notice termination date passes',
    statute: 'RTA, s. 69(2)',
  },
  {
    id: 'ltb_review_30d',
    matterType: 'ltb',
    name: 'Request to Review Order',
    description: 'Request review of LTB order within 30 days',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date order was issued',
    statute: 'RTA, s. 21.2 of SPPA',
  },
  {
    id: 'ltb_rent_1yr',
    matterType: 'ltb',
    name: 'T1 Rent Arrears Application',
    description: 'Tenant application for illegal rent — 1 year',
    type: 'limitation',
    daysFromTrigger: 365,
    triggerDescription: 'Date of last illegal charge',
    statute: 'RTA, s. 135(4)',
  },

  // Provincial Offences / Traffic (POA)
  {
    id: 'poa_trial_option',
    matterType: 'traffic',
    name: 'Request Early Resolution / Trial',
    description: 'Must respond to ticket within 15 days',
    type: 'procedural',
    daysFromTrigger: 15,
    triggerDescription: 'Date ticket was served',
    statute: 'Provincial Offences Act, s. 5(1)',
  },
  {
    id: 'poa_appeal_30d',
    matterType: 'traffic',
    name: 'Appeal Conviction',
    description: 'Appeal POA conviction within 30 days',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of conviction',
    statute: 'Provincial Offences Act, s. 135',
  },
  {
    id: 'poa_reopen_15d',
    matterType: 'traffic',
    name: 'Reopen Conviction (Struck Out)',
    description: 'Motion to reopen within 15 days of learning of conviction',
    type: 'procedural',
    daysFromTrigger: 15,
    triggerDescription: 'Date defendant learned of conviction in absence',
    statute: 'Provincial Offences Act, s. 11(1)',
  },

  // Criminal (Summary Conviction — paralegal jurisdiction)
  {
    id: 'crim_summary_info',
    matterType: 'criminal',
    name: 'Summary Conviction Information',
    description: 'Information must be laid within 12 months',
    type: 'limitation',
    daysFromTrigger: 365,
    triggerDescription: 'Date of alleged offence',
    statute: 'Criminal Code, s. 786(2)',
  },
  {
    id: 'crim_appeal_30d',
    matterType: 'criminal',
    name: 'Summary Conviction Appeal',
    description: 'Appeal within 30 days of sentence',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of sentencing',
    statute: 'Criminal Code, s. 813 & 815',
  },

  // Human Rights Tribunal of Ontario (HRTO)
  {
    id: 'hrto_app_1yr',
    matterType: 'hrto',
    name: 'HRTO Application Filing',
    description: 'File application within 1 year of last discrimination incident',
    type: 'limitation',
    daysFromTrigger: 365,
    triggerDescription: 'Date of last discriminatory incident',
    statute: 'Human Rights Code, s. 34(1)',
  },
  {
    id: 'hrto_response_35d',
    matterType: 'hrto',
    name: 'Response to HRTO Application',
    description: 'Respondent must file response within 35 days',
    type: 'procedural',
    daysFromTrigger: 35,
    triggerDescription: 'Date application was served on respondent',
    statute: 'HRTO Rules, R. 9',
  },
  {
    id: 'hrto_reconsider_30d',
    matterType: 'hrto',
    name: 'Reconsideration Request',
    description: 'Request reconsideration within 30 days of decision',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of HRTO decision',
    statute: 'HRTO Rules, R. 26',
  },

  // WSIB (Workplace Safety and Insurance Board)
  {
    id: 'wsib_initial_6mo',
    matterType: 'wsib',
    name: 'Initial Claim Filing',
    description: 'Worker must file claim within 6 months of injury/awareness',
    type: 'limitation',
    daysFromTrigger: 183,
    triggerDescription: 'Date of injury or first medical attention',
    statute: 'WSIA, s. 22(1)',
  },
  {
    id: 'wsib_objection_30d',
    matterType: 'wsib',
    name: 'Objection to WSIB Decision',
    description: 'File objection within 30 days of decision letter',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of WSIB decision letter',
    statute: 'WSIA, s. 120(1)',
  },
  {
    id: 'wsib_appeal_30d',
    matterType: 'wsib',
    name: 'WSIAT Appeal',
    description: 'Appeal to WSIAT within 30 days of final WSIB decision',
    type: 'procedural',
    daysFromTrigger: 30,
    triggerDescription: 'Date of final WSIB decision',
    statute: 'WSIA, s. 125',
  },

  // Collections
  {
    id: 'collections_limitation_2yr',
    matterType: 'collections',
    name: 'General Limitation — Debt Collection',
    description: 'Must commence action within 2 years of default',
    type: 'limitation',
    daysFromTrigger: 730,
    triggerDescription: 'Date of default or last acknowledgment',
    statute: 'Limitations Act, 2002, s. 4',
  },

  // General — applies to all matter types
  {
    id: 'general_limitation_2yr',
    matterType: 'general',
    name: 'Basic Limitation Period',
    description: 'Default 2-year limitation from discovery',
    type: 'limitation',
    daysFromTrigger: 730,
    triggerDescription: 'Date cause of action discovered',
    statute: 'Limitations Act, 2002, s. 4',
  },
];

const MATTER_TYPE_MAP: Record<string, string> = {
  small_claims: 'Small Claims',
  ltb: 'Landlord & Tenant (LTB)',
  traffic: 'Traffic / POA',
  criminal: 'Criminal (Summary)',
  hrto: 'Human Rights (HRTO)',
  wsib: 'WSIB',
  collections: 'Collections',
  general: 'General',
};

const MATTER_TYPE_COLORS: Record<string, string> = {
  small_claims: '#B94A1F',
  ltb: '#4A7C59',
  traffic: '#3B82F6',
  criminal: '#6B21A8',
  hrto: '#D97706',
  wsib: '#0891B2',
  collections: '#DC2626',
  general: '#6B7280',
};

// Map from clientfiles matterType field values to our rule matterType
const FILE_MATTER_TO_RULE: Record<string, string> = {
  'Small Claims': 'small_claims',
  'Landlord Tenant': 'ltb',
  'LTB': 'ltb',
  'Traffic': 'traffic',
  'POA': 'traffic',
  'Provincial Offences': 'traffic',
  'Criminal': 'criminal',
  'Criminal Summary': 'criminal',
  'Human Rights': 'hrto',
  'HRTO': 'hrto',
  'WSIB': 'wsib',
  'Collections': 'collections',
  'Debt Collection': 'collections',
};

// ============================================================
// HELPERS
// ============================================================

function parseMeta(record: CmsRecord): DeadlineMeta | null {
  try {
    return JSON.parse(record.description || '{}') as DeadlineMeta;
  } catch {
    return null;
  }
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function getAlertTier(daysRemaining: number, status: string): EnrichedDeadline['alertTier'] {
  if (status === 'completed' || status === 'waived') return 'completed';
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining <= 2) return 'critical';
  if (daysRemaining <= 7) return 'urgent';
  if (daysRemaining <= 30) return 'warning';
  return 'safe';
}

function tierColor(tier: EnrichedDeadline['alertTier']): string {
  switch (tier) {
    case 'overdue': return 'bg-red-100 text-red-800 border-red-300';
    case 'critical': return 'bg-red-50 text-red-700 border-red-200';
    case 'urgent': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'safe': return 'bg-green-50 text-green-700 border-green-200';
    case 'completed': return 'bg-gray-50 text-gray-500 border-gray-200';
  }
}

function tierBadgeColor(tier: EnrichedDeadline['alertTier']): string {
  switch (tier) {
    case 'overdue': return 'bg-red-600 text-white';
    case 'critical': return 'bg-red-500 text-white';
    case 'urgent': return 'bg-orange-500 text-white';
    case 'warning': return 'bg-yellow-500 text-white';
    case 'safe': return 'bg-green-500 text-white';
    case 'completed': return 'bg-gray-400 text-white';
  }
}

function tierLabel(tier: EnrichedDeadline['alertTier']): string {
  switch (tier) {
    case 'overdue': return 'OVERDUE';
    case 'critical': return 'CRITICAL';
    case 'urgent': return 'URGENT';
    case 'warning': return 'WARNING';
    case 'safe': return 'OK';
    case 'completed': return 'DONE';
  }
}

function tierIcon(tier: EnrichedDeadline['alertTier']) {
  switch (tier) {
    case 'overdue':
    case 'critical': return <AlertCircle className="w-4 h-4" />;
    case 'urgent': return <AlertTriangle className="w-4 h-4" />;
    case 'warning': return <Bell className="w-4 h-4" />;
    case 'safe': return <CheckCircle className="w-4 h-4" />;
    case 'completed': return <CheckCircle className="w-4 h-4" />;
  }
}

function formatDate(d: string | Date | undefined): string {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function DeadlineTrackerPage() {
  // Data state
  const [deadlines, setDeadlines] = useState<CmsRecord[]>([]);
  const [clientFiles, setClientFiles] = useState<ClientFile[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterMatter, setFilterMatter] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  // Dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState<EnrichedDeadline | null>(null);
  const [saving, setSaving] = useState(false);

  // Feedback toast
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Add form state
  const [addForm, setAddForm] = useState({
    fileId: '',
    ruleId: '',
    triggerDate: '',
    notes: '',
    customName: '',
    customDate: '',
  });

  // Extend form
  const [extendDate, setExtendDate] = useState('');
  const [extendReason, setExtendReason] = useState('');

  // ============================================================
  // DATA LOADING
  // ============================================================

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Deadlines live in financialrecords — read the WHOLE collection or
      // saved deadlines silently disappear from the tracker as it grows.
      const [finRes, fileRes] = await Promise.all([
        BaseCrudService.getAllPages<any>('financialrecords'),
        BaseCrudService.getAllPages<any>('clientfiles'),
      ]);
      const allFin = finRes.items || [];
      setDeadlines(allFin.filter(r => r.transactionType === 'deadline'));
      setClientFiles(fileRes.items || []);
    } catch (err) {
      console.error('Failed to load deadline data:', err);
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

  const enrichedDeadlines = useMemo((): EnrichedDeadline[] => {
    const now = new Date();
    return deadlines
      .map(rec => {
        const meta = parseMeta(rec);
        if (!meta) return null;
        const file = fileMap[rec.fileId || ''];
        const deadlineDate = new Date(meta.deadlineDate);
        const daysRemaining = daysBetween(now, deadlineDate);
        const alertTier = getAlertTier(daysRemaining, meta.status);
        return {
          _id: rec._id,
          record: rec,
          meta,
          fileNumber: file?.fileNumber || rec.fileId || '—',
          clientName: file?.clientName || '—',
          matterType: meta.matterType,
          daysRemaining,
          alertTier,
          isOverdue: daysRemaining < 0 && meta.status === 'active',
        } as EnrichedDeadline;
      })
      .filter(Boolean) as EnrichedDeadline[];
  }, [deadlines, fileMap]);

  // ============================================================
  // STATS
  // ============================================================

  const stats = useMemo(() => {
    const active = enrichedDeadlines.filter(d => d.meta.status === 'active');
    return {
      total: active.length,
      overdue: active.filter(d => d.alertTier === 'overdue').length,
      critical: active.filter(d => d.alertTier === 'critical').length,
      urgent: active.filter(d => d.alertTier === 'urgent').length,
      warning: active.filter(d => d.alertTier === 'warning').length,
      safe: active.filter(d => d.alertTier === 'safe').length,
      completed: enrichedDeadlines.filter(d => d.meta.status === 'completed' || d.meta.status === 'waived').length,
    };
  }, [enrichedDeadlines]);

  // ============================================================
  // FILTERED & SORTED LIST
  // ============================================================

  const filteredDeadlines = useMemo(() => {
    let list = [...enrichedDeadlines];

    // Filter by status
    if (!showCompleted) {
      list = list.filter(d => d.meta.status === 'active' || d.meta.status === 'extended');
    }

    // Filter by tier
    if (filterTier !== 'all') {
      list = list.filter(d => d.alertTier === filterTier);
    }

    // Filter by matter type
    if (filterMatter !== 'all') {
      list = list.filter(d => d.matterType === filterMatter);
    }

    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(d =>
        d.fileNumber.toLowerCase().includes(q) ||
        d.clientName.toLowerCase().includes(q) ||
        d.meta.deadlineName.toLowerCase().includes(q) ||
        (MATTER_TYPE_MAP[d.matterType] || '').toLowerCase().includes(q)
      );
    }

    // Sort: overdue first, then by days remaining ascending
    list.sort((a, b) => {
      // Completed always at bottom
      if (a.meta.status === 'completed' && b.meta.status !== 'completed') return 1;
      if (b.meta.status === 'completed' && a.meta.status !== 'completed') return -1;
      return a.daysRemaining - b.daysRemaining;
    });

    return list;
  }, [enrichedDeadlines, showCompleted, filterTier, filterMatter, searchTerm]);

  // ============================================================
  // AVAILABLE RULES FOR SELECTED FILE
  // ============================================================

  const availableRules = useMemo(() => {
    if (!addForm.fileId) return ONTARIO_LIMITATION_RULES;
    const file = fileMap[addForm.fileId];
    if (!file?.matterType) return ONTARIO_LIMITATION_RULES;
    const ruleType = FILE_MATTER_TO_RULE[file.matterType] || 'general';
    // Show rules matching this matter type + general rules
    return ONTARIO_LIMITATION_RULES.filter(r => r.matterType === ruleType || r.matterType === 'general');
  }, [addForm.fileId, fileMap]);

  // ============================================================
  // ACTIONS
  // ============================================================

  const toast = (msg: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleAddDeadline = async () => {
    setSaving(true);
    try {
      let deadlineName: string;
      let deadlineDate: string;
      let ruleId: string;
      let triggerDate: string;
      let matterType: string;
      let deadlineType: DeadlineMeta['deadlineType'];

      if (addForm.ruleId === 'custom') {
        // Custom deadline
        if (!addForm.customName || !addForm.customDate || !addForm.fileId) {
          toast('Please fill in all required fields', 'error');
          setSaving(false);
          return;
        }
        deadlineName = addForm.customName;
        deadlineDate = addForm.customDate;
        ruleId = 'custom';
        triggerDate = addForm.triggerDate || new Date().toISOString().split('T')[0];
        const file = fileMap[addForm.fileId];
        matterType = FILE_MATTER_TO_RULE[file?.matterType || ''] || 'general';
        deadlineType = 'custom';
      } else {
        // Rule-based deadline
        const rule = ONTARIO_LIMITATION_RULES.find(r => r.id === addForm.ruleId);
        if (!rule || !addForm.triggerDate || !addForm.fileId) {
          toast('Please select a file, rule, and trigger date', 'error');
          setSaving(false);
          return;
        }
        deadlineName = rule.name;
        const trigger = new Date(addForm.triggerDate);
        trigger.setDate(trigger.getDate() + rule.daysFromTrigger);
        deadlineDate = trigger.toISOString().split('T')[0];
        ruleId = rule.id;
        triggerDate = addForm.triggerDate;
        matterType = rule.matterType;
        deadlineType = rule.type;
      }

      const meta: DeadlineMeta = {
        deadlineType,
        deadlineName,
        deadlineDate,
        triggerDate,
        matterType,
        ruleId,
        notes: addForm.notes,
        status: 'active',
      };

      await BaseCrudService.create('financialrecords', {
        fileId: addForm.fileId,
        clientId: fileMap[addForm.fileId]?.clientId || '',
        transactionType: 'deadline',
        transactionDate: new Date().toISOString(),
        description: JSON.stringify(meta),
        referenceNumber: `DL-${Date.now()}`,
        recordedBy: 'paralegal',
      });

      toast('Deadline added successfully');
      setShowAddDialog(false);
      setAddForm({ fileId: '', ruleId: '', triggerDate: '', notes: '', customName: '', customDate: '' });
      await loadData();
    } catch (err) {
      toast('Failed to save deadline', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleMarkComplete = async (dl: EnrichedDeadline) => {
    setSaving(true);
    try {
      const updatedMeta: DeadlineMeta = {
        ...dl.meta,
        status: 'completed',
        completedDate: new Date().toISOString().split('T')[0],
      };
      await BaseCrudService.update('financialrecords', {
        _id: dl._id,
        description: JSON.stringify(updatedMeta),
      });
      toast('Deadline marked complete');
      await loadData();
    } catch (err) {
      toast('Failed to update deadline', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleExtend = async () => {
    if (!selectedDeadline || !extendDate) return;
    setSaving(true);
    try {
      const updatedMeta: DeadlineMeta = {
        ...selectedDeadline.meta,
        status: 'extended',
        deadlineDate: extendDate,
        extensionDate: new Date().toISOString().split('T')[0],
        extensionReason: extendReason,
      };
      await BaseCrudService.update('financialrecords', {
        _id: selectedDeadline._id,
        description: JSON.stringify(updatedMeta),
      });
      toast('Deadline extended');
      setShowExtendDialog(false);
      setExtendDate('');
      setExtendReason('');
      await loadData();
    } catch (err) {
      toast('Failed to extend deadline', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeadline) return;
    setSaving(true);
    try {
      await BaseCrudService.delete('financialrecords', selectedDeadline._id);
      toast('Deadline removed');
      setShowDeleteConfirm(false);
      setSelectedDeadline(null);
      await loadData();
    } catch (err) {
      toast('Failed to delete deadline', 'error');
    } finally {
      setSaving(false);
    }
  };

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
                  <Shield className="w-6 h-6 text-[#B94A1F]" />
                  Limitation Periods & Deadlines
                </h1>
                <p className="font-paragraph text-sm text-foreground/60 mt-0.5">
                  Track critical deadlines — never miss a limitation period
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setAddForm({ fileId: '', ruleId: '', triggerDate: '', notes: '', customName: '', customDate: '' });
                setShowAddDialog(true);
              }}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Deadline
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Alert Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Overdue', count: stats.overdue, color: 'bg-red-600', icon: AlertCircle },
            { label: 'Critical', count: stats.critical, color: 'bg-red-500', icon: AlertCircle },
            { label: 'Urgent', count: stats.urgent, color: 'bg-orange-500', icon: AlertTriangle },
            { label: 'Warning', count: stats.warning, color: 'bg-yellow-500', icon: Bell },
            { label: 'Safe', count: stats.safe, color: 'bg-green-500', icon: CheckCircle },
            { label: 'Completed', count: stats.completed, color: 'bg-gray-400', icon: CheckCircle },
            { label: 'Total Active', count: stats.total, color: 'bg-[#B94A1F]', icon: Calendar },
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

        {/* Urgent Banner */}
        {(stats.overdue > 0 || stats.critical > 0) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-heading font-semibold text-red-800">
                Immediate Attention Required
              </p>
              <p className="font-paragraph text-sm text-red-700 mt-1">
                You have {stats.overdue > 0 ? `${stats.overdue} overdue` : ''}
                {stats.overdue > 0 && stats.critical > 0 ? ' and ' : ''}
                {stats.critical > 0 ? `${stats.critical} critical` : ''} deadline{(stats.overdue + stats.critical) !== 1 ? 's' : ''}.
                Missing a limitation period can result in LSO disciplinary proceedings and client harm.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="dashboard">All Deadlines</TabsTrigger>
            <TabsTrigger value="byfile">By File</TabsTrigger>
            <TabsTrigger value="rules">Rule Library</TabsTrigger>
          </TabsList>

          {/* ===================== ALL DEADLINES TAB ===================== */}
          <TabsContent value="dashboard" className="mt-4 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by file, client, or deadline name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={filterTier}
                onChange={e => setFilterTier(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Tiers</option>
                <option value="overdue">Overdue</option>
                <option value="critical">Critical (≤48h)</option>
                <option value="urgent">Urgent (≤7d)</option>
                <option value="warning">Warning (≤30d)</option>
                <option value="safe">Safe (&gt;30d)</option>
              </select>
              <select
                value={filterMatter}
                onChange={e => setFilterMatter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="all">All Matter Types</option>
                {Object.entries(MATTER_TYPE_MAP).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-foreground/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={e => setShowCompleted(e.target.checked)}
                  className="rounded"
                />
                Show completed
              </label>
            </div>

            {/* Deadline List */}
            {filteredDeadlines.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="font-heading text-lg text-foreground/60">No deadlines found</p>
                <p className="font-paragraph text-sm text-foreground/40 mt-1">
                  {deadlines.length === 0 ? 'Add your first deadline to start tracking.' : 'Try adjusting your filters.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDeadlines.map(dl => (
                  <div
                    key={dl._id}
                    className={`bg-white rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer ${tierColor(dl.alertTier)}`}
                    onClick={() => { setSelectedDeadline(dl); setShowDetailDialog(true); }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-0.5">{tierIcon(dl.alertTier)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-semibold text-sm">{dl.meta.deadlineName}</span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tierBadgeColor(dl.alertTier)}`}
                            >
                              {tierLabel(dl.alertTier)}
                            </span>
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ backgroundColor: `${MATTER_TYPE_COLORS[dl.matterType] || '#6B7280'}20`, color: MATTER_TYPE_COLORS[dl.matterType] || '#6B7280' }}
                            >
                              {MATTER_TYPE_MAP[dl.matterType] || dl.matterType}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-foreground/50">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" /> {dl.fileNumber}
                            </span>
                            <span>{dl.clientName}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Due: {formatDate(dl.meta.deadlineDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-lg font-bold ${dl.isOverdue ? 'text-red-600' : dl.daysRemaining <= 7 ? 'text-orange-600' : 'text-foreground'}`}>
                          {dl.meta.status === 'completed' ? '✓' : dl.isOverdue ? `${Math.abs(dl.daysRemaining)}d overdue` : `${dl.daysRemaining}d`}
                        </p>
                        <p className="text-xs text-foreground/40">
                          {dl.meta.status === 'completed' ? 'Completed' : dl.isOverdue ? '' : 'remaining'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ===================== BY FILE TAB ===================== */}
          <TabsContent value="byfile" className="mt-4 space-y-4">
            {(() => {
              // Group deadlines by file
              const activeDeadlines = enrichedDeadlines.filter(d => d.meta.status === 'active' || d.meta.status === 'extended');
              const byFile: Record<string, EnrichedDeadline[]> = {};
              activeDeadlines.forEach(dl => {
                const key = dl.record.fileId || 'unassigned';
                if (!byFile[key]) byFile[key] = [];
                byFile[key].push(dl);
              });
              // Sort files by most urgent deadline
              const fileEntries = Object.entries(byFile).sort((a, b) => {
                const minA = Math.min(...a[1].map(d => d.daysRemaining));
                const minB = Math.min(...b[1].map(d => d.daysRemaining));
                return minA - minB;
              });

              if (fileEntries.length === 0) {
                return (
                  <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-heading text-lg text-foreground/60">No active deadlines by file</p>
                  </div>
                );
              }

              return fileEntries.map(([fileId, dls]) => {
                const file = fileMap[fileId];
                const mostUrgent = dls.reduce((prev, cur) => cur.daysRemaining < prev.daysRemaining ? cur : prev);
                return (
                  <div key={fileId} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className={`px-4 py-3 border-b flex items-center justify-between ${tierColor(mostUrgent.alertTier)}`}>
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
                      <Badge className={tierBadgeColor(mostUrgent.alertTier)}>
                        {dls.length} deadline{dls.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {dls.sort((a, b) => a.daysRemaining - b.daysRemaining).map(dl => (
                        <div
                          key={dl._id}
                          className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                          onClick={() => { setSelectedDeadline(dl); setShowDetailDialog(true); }}
                        >
                          <div className="flex items-center gap-3">
                            {tierIcon(dl.alertTier)}
                            <div>
                              <p className="text-sm font-medium">{dl.meta.deadlineName}</p>
                              <p className="text-xs text-foreground/50">Due: {formatDate(dl.meta.deadlineDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${dl.isOverdue ? 'text-red-600' : dl.daysRemaining <= 7 ? 'text-orange-600' : ''}`}>
                              {dl.isOverdue ? `${Math.abs(dl.daysRemaining)}d overdue` : `${dl.daysRemaining}d`}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierBadgeColor(dl.alertTier)}`}>
                              {tierLabel(dl.alertTier)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </TabsContent>

          {/* ===================== RULE LIBRARY TAB ===================== */}
          <TabsContent value="rules" className="mt-4 space-y-4">
            <p className="font-paragraph text-sm text-foreground/60">
              Ontario limitation periods and procedural deadlines configured in this system. Select a rule when adding a deadline to auto-calculate the due date.
            </p>
            {Object.entries(MATTER_TYPE_MAP).map(([matterKey, matterLabel]) => {
              const rules = ONTARIO_LIMITATION_RULES.filter(r => r.matterType === matterKey);
              if (rules.length === 0) return null;
              return (
                <div key={matterKey} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div
                    className="px-4 py-3 border-b flex items-center gap-2"
                    style={{ borderLeftWidth: 4, borderLeftColor: MATTER_TYPE_COLORS[matterKey] || '#6B7280' }}
                  >
                    <span className="font-heading font-semibold text-sm">{matterLabel}</span>
                    <Badge variant="outline" className="text-xs">{rules.length} rule{rules.length !== 1 ? 's' : ''}</Badge>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {rules.map(rule => (
                      <div key={rule.id} className="px-4 py-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{rule.name}</p>
                            <p className="text-xs text-foreground/60 mt-0.5">{rule.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-foreground/40">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {rule.daysFromTrigger} days from: {rule.triggerDescription}
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <Badge variant="outline" className="text-xs">
                              {rule.type === 'limitation' ? 'Limitation' : 'Procedural'}
                            </Badge>
                            <p className="text-xs text-foreground/40 mt-1">{rule.statute}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </main>

      {/* ===================== ADD DEADLINE DIALOG ===================== */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Add Deadline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Select File */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">Client File *</label>
              <select
                value={addForm.fileId}
                onChange={e => setAddForm(p => ({ ...p, fileId: e.target.value, ruleId: '' }))}
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

            {/* Select Rule */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">Limitation Rule *</label>
              <select
                value={addForm.ruleId}
                onChange={e => setAddForm(p => ({ ...p, ruleId: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="">Select a rule...</option>
                {availableRules.map(r => (
                  <option key={r.id} value={r.id}>
                    [{r.type === 'limitation' ? 'LIM' : 'PROC'}] {r.name} — {r.daysFromTrigger}d ({r.statute})
                  </option>
                ))}
                <option value="custom">✏️ Custom Deadline...</option>
              </select>
              {addForm.ruleId && addForm.ruleId !== 'custom' && (() => {
                const rule = ONTARIO_LIMITATION_RULES.find(r => r.id === addForm.ruleId);
                if (!rule) return null;
                return (
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                    <p className="font-medium">{rule.description}</p>
                    <p className="mt-1 text-blue-600">
                      {rule.daysFromTrigger} days from: {rule.triggerDescription}
                    </p>
                    <p className="mt-1 text-blue-500">{rule.statute}</p>
                  </div>
                );
              })()}
            </div>

            {/* Custom deadline fields */}
            {addForm.ruleId === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Deadline Name *</label>
                  <Input
                    value={addForm.customName}
                    onChange={e => setAddForm(p => ({ ...p, customName: e.target.value }))}
                    placeholder="e.g., File response to motion"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Deadline Date *</label>
                  <Input
                    type="date"
                    value={addForm.customDate}
                    onChange={e => setAddForm(p => ({ ...p, customDate: e.target.value }))}
                  />
                </div>
              </>
            )}

            {/* Trigger Date (for rule-based) */}
            {addForm.ruleId && addForm.ruleId !== 'custom' && (
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  Trigger Date * <span className="text-foreground/40 font-normal">
                    ({ONTARIO_LIMITATION_RULES.find(r => r.id === addForm.ruleId)?.triggerDescription || 'event date'})
                  </span>
                </label>
                <Input
                  type="date"
                  value={addForm.triggerDate}
                  onChange={e => setAddForm(p => ({ ...p, triggerDate: e.target.value }))}
                />
                {addForm.triggerDate && addForm.ruleId && (() => {
                  const rule = ONTARIO_LIMITATION_RULES.find(r => r.id === addForm.ruleId);
                  if (!rule) return null;
                  const trigger = new Date(addForm.triggerDate);
                  trigger.setDate(trigger.getDate() + rule.daysFromTrigger);
                  return (
                    <p className="text-xs text-foreground/50 mt-1">
                      Calculated deadline: <strong>{formatDate(trigger)}</strong> ({rule.daysFromTrigger} days from trigger)
                    </p>
                  );
                })()}
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">Notes</label>
              <textarea
                value={addForm.notes}
                onChange={e => setAddForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Optional notes about this deadline..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button
              onClick={handleAddDeadline}
              disabled={saving}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Deadline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== DETAIL DIALOG ===================== */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-md">
          {selectedDeadline && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center gap-2">
                  {tierIcon(selectedDeadline.alertTier)}
                  {selectedDeadline.meta.deadlineName}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierBadgeColor(selectedDeadline.alertTier)}`}>
                    {tierLabel(selectedDeadline.alertTier)}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${MATTER_TYPE_COLORS[selectedDeadline.matterType] || '#6B7280'}20`, color: MATTER_TYPE_COLORS[selectedDeadline.matterType] || '#6B7280' }}
                  >
                    {MATTER_TYPE_MAP[selectedDeadline.matterType] || selectedDeadline.matterType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-foreground/40 text-xs">File</p>
                    <p className="font-medium">{selectedDeadline.fileNumber}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs">Client</p>
                    <p className="font-medium">{selectedDeadline.clientName}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs">Deadline Date</p>
                    <p className="font-medium">{formatDate(selectedDeadline.meta.deadlineDate)}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs">Days Remaining</p>
                    <p className={`font-bold ${selectedDeadline.isOverdue ? 'text-red-600' : selectedDeadline.daysRemaining <= 7 ? 'text-orange-600' : ''}`}>
                      {selectedDeadline.isOverdue ? `${Math.abs(selectedDeadline.daysRemaining)} days overdue` : `${selectedDeadline.daysRemaining} days`}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs">Trigger Date</p>
                    <p>{formatDate(selectedDeadline.meta.triggerDate)}</p>
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs">Type</p>
                    <p className="capitalize">{selectedDeadline.meta.deadlineType}</p>
                  </div>
                  {selectedDeadline.meta.ruleId !== 'custom' && (
                    <div className="col-span-2">
                      <p className="text-foreground/40 text-xs">Legal Authority</p>
                      <p className="text-xs">{ONTARIO_LIMITATION_RULES.find(r => r.id === selectedDeadline.meta.ruleId)?.statute || '—'}</p>
                    </div>
                  )}
                  {selectedDeadline.meta.extensionDate && (
                    <div className="col-span-2">
                      <p className="text-foreground/40 text-xs">Extended on</p>
                      <p className="text-xs">{formatDate(selectedDeadline.meta.extensionDate)} — {selectedDeadline.meta.extensionReason}</p>
                    </div>
                  )}
                </div>

                {selectedDeadline.meta.notes && (
                  <div>
                    <p className="text-foreground/40 text-xs mb-1">Notes</p>
                    <p className="text-sm bg-gray-50 rounded-lg p-2">{selectedDeadline.meta.notes}</p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex gap-2">
                {selectedDeadline.meta.status === 'active' || selectedDeadline.meta.status === 'extended' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => { setShowDetailDialog(false); setShowDeleteConfirm(true); }}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowDetailDialog(false);
                        setExtendDate('');
                        setExtendReason('');
                        setShowExtendDialog(true);
                      }}
                    >
                      <CalendarClock className="w-3.5 h-3.5 mr-1" /> Extend
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => { handleMarkComplete(selectedDeadline); setShowDetailDialog(false); }}
                      disabled={saving}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Complete
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setShowDetailDialog(false)}>Close</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===================== EXTEND DIALOG ===================== */}
      <Dialog open={showExtendDialog} onOpenChange={setShowExtendDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Extend Deadline</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-foreground/60">
              Set a new deadline date for: <strong>{selectedDeadline?.meta.deadlineName}</strong>
            </p>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">New Deadline Date *</label>
              <Input
                type="date"
                value={extendDate}
                onChange={e => setExtendDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">Reason for Extension *</label>
              <textarea
                value={extendReason}
                onChange={e => setExtendReason(e.target.value)}
                placeholder="e.g., Court granted adjournment, consent of parties..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExtendDialog(false)}>Cancel</Button>
            <Button
              onClick={handleExtend}
              disabled={saving || !extendDate || !extendReason}
              className="bg-[#B94A1F] hover:bg-[#a03f1a] text-white"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Extend Deadline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== DELETE CONFIRM ===================== */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-red-600">Delete Deadline</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm text-foreground/70">
              Are you sure you want to delete <strong>{selectedDeadline?.meta.deadlineName}</strong>
              {' '}for file <strong>{selectedDeadline?.fileNumber}</strong>?
            </p>
            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
              <p className="font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> LSO Compliance Warning
              </p>
              <p className="mt-1">
                Deleting a limitation period tracker removes your record of monitoring this deadline.
                Ensure you have alternative tracking in place before removing.
              </p>
            </div>
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
