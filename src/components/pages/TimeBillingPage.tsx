/**
 * Time Tracking & Billing (Docketing) Page
 *
 * Comprehensive time-tracking, billing, and invoice management for paralegals.
 * Supports three billing models: Hourly, Fixed Fee, and Contingency.
 *
 * Tabs:
 * 1. Docket — Log and manage time entries per client file
 * 2. Rate Sheet — Configure hourly rates, fixed fees, and contingency %
 * 3. Invoices — Generate, view, and email PDF invoices with HST
 * 4. Receivables — Track outstanding balances and aging
 *
 * All docket entries and invoices stored in 'financialrecords' CMS collection
 * with transactionType prefixes: docket_entry, invoice, payment_received.
 * Rate configurations stored as transactionType: 'rate_config'.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft, Plus, Download, Clock, DollarSign, FileText,
  Filter, Search, Loader2, AlertCircle, CheckCircle, Eye,
  Trash2, Edit, Send, Pause, Play, Receipt, TrendingUp,
  Calendar, User, Briefcase, BarChart3, AlertTriangle,
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

// CMS record shape — matches the 'financialrecords' collection fields
interface FinancialCmsRecord {
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

// Aliases for clarity — all backed by the same CMS record
type DocketEntry = FinancialCmsRecord;
type InvoiceRecord = FinancialCmsRecord;
type RateConfig = FinancialCmsRecord;

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

const ACTIVITY_CODES = [
  { value: 'research', label: 'Legal Research' },
  { value: 'drafting', label: 'Document Drafting' },
  { value: 'review', label: 'Document Review' },
  { value: 'correspondence', label: 'Correspondence' },
  { value: 'phone_call', label: 'Phone Call' },
  { value: 'meeting_client', label: 'Client Meeting' },
  { value: 'meeting_other', label: 'Other Meeting' },
  { value: 'court', label: 'Court Attendance' },
  { value: 'tribunal', label: 'Tribunal Hearing' },
  { value: 'mediation', label: 'Mediation / ADR' },
  { value: 'filing', label: 'Filing / Service' },
  { value: 'travel', label: 'Travel' },
  { value: 'admin', label: 'Administrative' },
  { value: 'other', label: 'Other' },
];

const BILLING_MODELS = [
  { value: 'hourly', label: 'Hourly', color: 'bg-blue-100 text-blue-800' },
  { value: 'fixed', label: 'Fixed Fee', color: 'bg-purple-100 text-purple-800' },
  { value: 'contingency', label: 'Contingency', color: 'bg-amber-100 text-amber-800' },
  { value: 'retainer_replenishment', label: 'Retainer Replenishment', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'custom', label: 'Custom / One-time', color: 'bg-slate-100 text-slate-800' },
];

const INVOICE_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  { value: 'sent', label: 'Sent', color: 'bg-blue-100 text-blue-800' },
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
  { value: 'overdue', label: 'Overdue', color: 'bg-red-100 text-red-800' },
  { value: 'partial', label: 'Partial', color: 'bg-amber-100 text-amber-800' },
];

const HST_RATE = 0.13; // Ontario HST

// ============================================================
// HELPERS
// ============================================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

function formatDate(d: Date | string | undefined): string {
  if (!d) return '—';
  const date = new Date(d);
  return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatHours(hours: number, minutes: number): string {
  const h = hours || 0;
  const m = minutes || 0;
  if (h === 0 && m === 0) return '0:00';
  return `${h}:${m.toString().padStart(2, '0')}`;
}

function toDecimalHours(hours: number, minutes: number): number {
  return (hours || 0) + (minutes || 0) / 60;
}

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${y}${m}-${seq}`;
}

function getDaysOverdue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

// ============================================================
// LOADING SKELETON
// ============================================================

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-[#F0EBE3] rounded-lg" />
        ))}
      </div>
      <div className="h-12 bg-[#F0EBE3] rounded-lg w-64" />
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-16 bg-[#F0EBE3] rounded-lg" />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function TimeBillingPage() {
  // --- State ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('docket');

  // Data
  const [docketEntries, setDocketEntries] = useState<DocketEntry[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [rateConfigs, setRateConfigs] = useState<RateConfig[]>([]);
  const [clientFiles, setClientFiles] = useState<ClientFile[]>([]);
  const [allFinancialRecords, setAllFinancialRecords] = useState<any[]>([]);

  // Dialogs
  const [showDocketDialog, setShowDocketDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState<any | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFileId, setFilterFileId] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Docket form
  const [docketForm, setDocketForm] = useState({
    fileId: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    hours: 0,
    minutes: 0,
    activityCode: '',
    billingModel: 'hourly' as 'hourly' | 'fixed' | 'contingency',
    rate: 0,
  });

  // Rate form
  const [rateForm, setRateForm] = useState({
    fileId: '',
    billingModel: 'hourly' as 'hourly' | 'fixed' | 'contingency',
    hourlyRate: 150,
    fixedFeeAmount: 0,
    contingencyPercent: 0,
    description: '',
  });

  // Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerFileId, setTimerFileId] = useState('');
  const [timerActivity, setTimerActivity] = useState('');

  // Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // --- Timer logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const timerDisplay = useMemo(() => {
    const h = Math.floor(timerSeconds / 3600);
    const m = Math.floor((timerSeconds % 3600) / 60);
    const s = timerSeconds % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, [timerSeconds]);

  // --- Data Loading ---
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [financialRes, clientFileRes] = await Promise.all([
        BaseCrudService.getAll<any>('financialrecords'),
        BaseCrudService.getAll<any>('clientfiles'),
      ]);

      const records = financialRes.items || [];
      setAllFinancialRecords(records);
      setClientFiles(clientFileRes.items || []);

      // Separate record types
      const dockets: DocketEntry[] = records.filter(
        (r: any) => r.transactionType === 'docket_entry'
      );
      const invs: InvoiceRecord[] = records.filter(
        (r: any) => r.transactionType === 'invoice'
      );
      const rates: RateConfig[] = records.filter(
        (r: any) => r.transactionType === 'rate_config'
      );

      setDocketEntries(dockets);
      setInvoices(invs);
      setRateConfigs(rates);
    } catch (err: any) {
      setError(err.message || 'Failed to load billing data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // --- Client file lookup ---
  const getClientFile = (fileId: string) => clientFiles.find(f => f._id === fileId);
  const getClientName = (fileId: string) => {
    const f = getClientFile(fileId);
    return f?.clientName || f?.fileNumber || 'Unknown Client';
  };
  const getFileRate = (fileId: string): RateConfig | undefined => {
    return rateConfigs.find(r => r.fileId === fileId);
  };

  // --- Feedback ---
  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // --- Computed stats (uses enriched data — defined after enrichment below) ---
  // Placeholder: actual stats computed after enrichment

  // ============================================================
  // SAVE DOCKET ENTRY
  // ============================================================

  const handleSaveDocket = async () => {
    if (!docketForm.fileId || !docketForm.description) {
      showFeedback('error', 'Please select a file and add a description.');
      return;
    }

    const decimalHours = toDecimalHours(docketForm.hours, docketForm.minutes);
    let amount = 0;
    const fileRate = getFileRate(docketForm.fileId);
    const rateMeta = fileRate ? parseRateMeta(fileRate) : null;
    const model = rateMeta?.billingModel || docketForm.billingModel;
    const rate = rateMeta?.hourlyRate || docketForm.rate;

    if (model === 'hourly') {
      amount = decimalHours * rate;
    } else if (model === 'fixed') {
      amount = 0; // Fixed fee tracked at invoice level
    } else if (model === 'contingency') {
      amount = 0; // Contingency calculated on resolution
    }

    try {
      await BaseCrudService.create('financialrecords', {
        transactionType: 'docket_entry',
        fileId: docketForm.fileId,
        clientId: getClientFile(docketForm.fileId)?.clientId || '',
        description: docketForm.description,
        amount,
        transactionDate: docketForm.date,
        referenceNumber: docketForm.activityCode,
        paymentMethod: model,
        recordedBy: 'paralegal',
        invoiceNumber: '',
        trustAccountId: JSON.stringify({
          hours: docketForm.hours,
          minutes: docketForm.minutes,
          rate,
          activityCode: docketForm.activityCode,
          billingModel: model,
          status: 'unbilled',
        }),
      });

      showFeedback('success', 'Docket entry saved.');
      setShowDocketDialog(false);
      setDocketForm({
        fileId: '', date: new Date().toISOString().split('T')[0],
        description: '', hours: 0, minutes: 0, activityCode: '',
        billingModel: 'hourly', rate: 0,
      });
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save docket entry.');
    }
  };

  // ============================================================
  // STOP TIMER → PRE-FILL DOCKET
  // ============================================================

  const handleStopTimer = () => {
    setTimerRunning(false);
    const totalMin = Math.round(timerSeconds / 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    setDocketForm(prev => ({
      ...prev,
      fileId: timerFileId,
      hours: h,
      minutes: m,
      activityCode: timerActivity,
    }));
    setShowDocketDialog(true);
    setTimerSeconds(0);
  };

  // ============================================================
  // SAVE RATE CONFIG
  // ============================================================

  const handleSaveRate = async () => {
    if (!rateForm.fileId) {
      showFeedback('error', 'Please select a client file.');
      return;
    }

    // Check if rate already exists for this file
    const existing = rateConfigs.find(r => r.fileId === rateForm.fileId);

    try {
      const data = {
        transactionType: 'rate_config',
        fileId: rateForm.fileId,
        clientId: getClientFile(rateForm.fileId)?.clientId || '',
        description: JSON.stringify({
          billingModel: rateForm.billingModel,
          hourlyRate: rateForm.hourlyRate,
          fixedFeeAmount: rateForm.fixedFeeAmount,
          contingencyPercent: rateForm.contingencyPercent,
          description: rateForm.description,
        }),
        amount: rateForm.billingModel === 'hourly'
          ? rateForm.hourlyRate
          : rateForm.billingModel === 'fixed'
            ? rateForm.fixedFeeAmount
            : rateForm.contingencyPercent,
        transactionDate: new Date().toISOString(),
        paymentMethod: rateForm.billingModel,
      };

      if (existing) {
        await BaseCrudService.update('financialrecords', { _id: existing._id, ...data });
      } else {
        await BaseCrudService.create('financialrecords', data);
      }

      showFeedback('success', 'Rate configuration saved.');
      setShowRateDialog(false);
      setRateForm({
        fileId: '', billingModel: 'hourly', hourlyRate: 150,
        fixedFeeAmount: 0, contingencyPercent: 0, description: '',
      });
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save rate config.');
    }
  };

  // ============================================================
  // GENERATE INVOICE
  // ============================================================

  // Invoice form. `billingModel` is an OVERRIDE — null/empty means
  // "use whatever the file's RateConfig says". `lineItems` lets the
  // paralegal describe what the invoice is for ("Demand letter — $250",
  // "Hearing prep — $400") instead of always charging from the docket.
  const [invoiceForm, setInvoiceForm] = useState({
    fileId: '',
    notes: '',
    includeHst: true,
    dueInDays: 30,
    billingModel: '' as string,         // '' = inherit from file rate
    lineItems: [] as { description: string; amount: number }[],
  });

  const unbilledForFile = useMemo(() => {
    if (!invoiceForm.fileId) return [];
    return docketEntries.filter(d => {
      const meta = parseDocketMeta(d);
      return d.fileId === invoiceForm.fileId && meta.status === 'unbilled';
    });
  }, [invoiceForm.fileId, docketEntries]);

  function parseDocketMeta(d: DocketEntry) {
    try {
      return JSON.parse(d.trustAccountId || '{}');
    } catch {
      return {};
    }
  }

  function parseRateMeta(r: RateConfig) {
    try {
      return JSON.parse(r.description || '{}');
    } catch {
      return {};
    }
  }

  const handleGenerateInvoice = async () => {
    if (!invoiceForm.fileId) {
      showFeedback('error', 'Please select a client file.');
      return;
    }

    const fileRate = getFileRate(invoiceForm.fileId);
    const rateMeta = fileRate ? parseRateMeta(fileRate) : {};
    // Override > file's rate model > 'hourly' default.
    const model =
      invoiceForm.billingModel ||
      rateMeta.billingModel ||
      'hourly';

    let subtotal = 0;
    const entryIds: string[] = [];

    // Sum any user-supplied line items first — this is the "what is this
    // invoice for?" portion. Works alongside any model.
    const lineItemTotal = invoiceForm.lineItems.reduce(
      (s, li) => s + (Number(li.amount) || 0),
      0
    );
    subtotal += lineItemTotal;

    if (model === 'fixed') {
      // For fixed-fee, charge the configured fee unless line items already
      // describe a different amount (e.g. paralegal billing only a portion).
      if (lineItemTotal === 0) subtotal += rateMeta.fixedFeeAmount || 0;
    } else if (model === 'hourly') {
      // Roll any unbilled docket entries into the invoice.
      unbilledForFile.forEach(d => {
        subtotal += d.amount || 0;
        entryIds.push(d._id);
      });
    } else if (model === 'contingency') {
      // Contingency amount is paralegal-entered as a line item at
      // resolution time — already counted in lineItemTotal above.
    } else if (model === 'retainer_replenishment' || model === 'custom') {
      // These models depend entirely on the line items the paralegal
      // typed. lineItemTotal already counted above.
    }

    const hstAmount = invoiceForm.includeHst ? subtotal * HST_RATE : 0;
    const total = subtotal + hstAmount;
    const invoiceNumber = generateInvoiceNumber();
    const invoiceDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + invoiceForm.dueInDays * 86400000).toISOString().split('T')[0];

    try {
      // Create the invoice record
      await BaseCrudService.create('financialrecords', {
        transactionType: 'invoice',
        fileId: invoiceForm.fileId,
        clientId: getClientFile(invoiceForm.fileId)?.clientId || '',
        invoiceNumber,
        transactionDate: invoiceDate,
        amount: total,
        description: JSON.stringify({
          invoiceDate,
          dueDate,
          subtotal,
          hstAmount,
          total,
          status: 'draft',
          amountPaid: 0,
          lineItems: entryIds,
          notes: invoiceForm.notes,
          billingModel: model,
          dueInDays: invoiceForm.dueInDays,
          // Persist the explicit "what this invoice is for" lines so
          // they show up in the invoice detail view & on the PDF.
          customLineItems: invoiceForm.lineItems.filter(
            li => li.description.trim() || (Number(li.amount) || 0) > 0
          ),
        }),
        paymentMethod: model,
        recordedBy: 'paralegal',
      });

      // Mark docket entries as billed
      for (const id of entryIds) {
        const entry = docketEntries.find(d => d._id === id);
        if (entry) {
          const meta = parseDocketMeta(entry);
          meta.status = 'billed';
          meta.invoiceNumber = invoiceNumber;
          await BaseCrudService.update('financialrecords', {
            _id: id,
            trustAccountId: JSON.stringify(meta),
          });
        }
      }

      showFeedback('success', `Invoice ${invoiceNumber} generated.`);
      setShowInvoiceDialog(false);
      setInvoiceForm({
        fileId: '',
        notes: '',
        includeHst: true,
        dueInDays: 30,
        billingModel: '',
        lineItems: [],
      });
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to generate invoice.');
    }
  };

  // ============================================================
  // MARK INVOICE PAID / SEND
  // ============================================================

  const handleMarkInvoicePaid = async (inv: FinancialCmsRecord) => {
    try {
      const meta = JSON.parse(inv.description || '{}');
      meta.status = 'paid';
      meta.amountPaid = meta.total || inv.amount || 0;
      await BaseCrudService.update('financialrecords', {
        _id: inv._id,
        description: JSON.stringify(meta),
      });
      showFeedback('success', `Invoice ${inv.invoiceNumber} marked as paid.`);
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to update invoice.');
    }
  };

  const handleMarkInvoiceSent = async (inv: FinancialCmsRecord) => {
    try {
      const meta = JSON.parse(inv.description || '{}');
      meta.status = 'sent';
      await BaseCrudService.update('financialrecords', {
        _id: inv._id,
        description: JSON.stringify(meta),
      });
      showFeedback('success', `Invoice ${inv.invoiceNumber} marked as sent.`);
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to update invoice.');
    }
  };

  // ============================================================
  // DELETE DOCKET ENTRY
  // ============================================================

  const handleDeleteDocket = async (id: string) => {
    try {
      await BaseCrudService.delete('financialrecords', id);
      showFeedback('success', 'Docket entry deleted.');
      loadData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to delete.');
    }
  };

  // ============================================================
  // PARSE ENRICHED DATA
  // ============================================================

  interface EnrichedDocket extends FinancialCmsRecord {
    hours: number;
    minutes: number;
    rate: number;
    activityCode: string;
    billingModel: string;
    status: string;
    invoiceId: string;
    date: string;
  }

  interface EnrichedInvoice extends FinancialCmsRecord {
    invoiceDate: string;
    dueDate: string;
    subtotal: number;
    hstAmount: number;
    total: number;
    status: string;
    amountPaid: number;
    lineItems: string[];
    notes: string;
    billingModel: string;
  }

  interface EnrichedRate extends FinancialCmsRecord {
    billingModel: string;
    hourlyRate: number;
    fixedFeeAmount: number;
    contingencyPercent: number;
    rateDescription: string;
  }

  const enrichedDockets: EnrichedDocket[] = useMemo(() => {
    return docketEntries.map(d => {
      const meta = parseDocketMeta(d);
      return {
        ...d,
        date: (d.transactionDate as string) || '',
        hours: meta.hours || 0,
        minutes: meta.minutes || 0,
        rate: meta.rate || 0,
        activityCode: meta.activityCode || d.referenceNumber || '',
        billingModel: meta.billingModel || d.paymentMethod || 'hourly',
        status: meta.status || 'unbilled',
        invoiceId: meta.invoiceNumber || '',
      };
    });
  }, [docketEntries]);

  const enrichedInvoices: EnrichedInvoice[] = useMemo(() => {
    return invoices.map(inv => {
      try {
        const meta = JSON.parse(inv.description || '{}');
        return {
          ...inv,
          invoiceDate: meta.invoiceDate || (inv.transactionDate as string) || '',
          dueDate: meta.dueDate || '',
          subtotal: meta.subtotal || 0,
          hstAmount: meta.hstAmount || 0,
          total: meta.total || inv.amount || 0,
          status: meta.status || 'draft',
          amountPaid: meta.amountPaid || 0,
          lineItems: meta.lineItems || [],
          notes: meta.notes || '',
          billingModel: meta.billingModel || 'hourly',
        };
      } catch {
        return {
          ...inv,
          invoiceDate: (inv.transactionDate as string) || '',
          dueDate: '',
          subtotal: 0,
          hstAmount: 0,
          total: inv.amount || 0,
          status: 'draft',
          amountPaid: 0,
          lineItems: [] as string[],
          notes: '',
          billingModel: 'hourly',
        };
      }
    });
  }, [invoices]);

  const enrichedRates: EnrichedRate[] = useMemo(() => {
    return rateConfigs.map(r => {
      const meta = parseRateMeta(r);
      return {
        ...r,
        billingModel: meta.billingModel || r.paymentMethod || 'hourly',
        hourlyRate: meta.hourlyRate || 0,
        fixedFeeAmount: meta.fixedFeeAmount || 0,
        contingencyPercent: meta.contingencyPercent || 0,
        rateDescription: meta.description || '',
      };
    });
  }, [rateConfigs]);

  // --- Filtered dockets ---
  const filteredDockets = useMemo(() => {
    let list = enrichedDockets;
    if (filterFileId) list = list.filter(d => d.fileId === filterFileId);
    if (filterStatus) list = list.filter(d => d.status === filterStatus);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(d =>
        d.description?.toLowerCase().includes(q) ||
        getClientName(d.fileId || '').toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      const da = a.date || a._createdDate || '';
      const db = b.date || b._createdDate || '';
      return new Date(db as string).getTime() - new Date(da as string).getTime();
    });
  }, [enrichedDockets, filterFileId, filterStatus, searchQuery]);

  // --- Computed stats (uses enriched data) ---
  const stats = useMemo(() => {
    const unbilledEntries = enrichedDockets.filter(d => d.status === 'unbilled');
    const totalUnbilledHours = unbilledEntries.reduce(
      (sum, d) => sum + toDecimalHours(d.hours || 0, d.minutes || 0), 0
    );
    const totalUnbilledAmount = unbilledEntries.reduce(
      (sum, d) => sum + (d.amount || 0), 0
    );
    const totalOutstanding = enrichedInvoices
      .filter(i => i.status !== 'paid' && i.status !== 'draft')
      .reduce((sum, i) => sum + ((i.total || 0) - (i.amountPaid || 0)), 0);
    const totalCollected = enrichedInvoices
      .reduce((sum, i) => sum + (i.amountPaid || 0), 0);
    const overdueInvoices = enrichedInvoices.filter(i => {
      if (i.status === 'paid' || i.status === 'draft') return false;
      if (!i.dueDate) return false;
      return new Date(i.dueDate) < new Date();
    });

    return {
      unbilledHours: totalUnbilledHours,
      unbilledAmount: totalUnbilledAmount,
      outstanding: totalOutstanding,
      collected: totalCollected,
      overdueCount: overdueInvoices.length,
      overdueAmount: overdueInvoices.reduce(
        (sum, i) => sum + ((i.total || 0) - (i.amountPaid || 0)), 0
      ),
    };
  }, [enrichedDockets, enrichedInvoices]);

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-3xl font-bold text-[#4A2C23] mb-6">Time & Billing</h1>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-paragraph text-lg mb-4">{error}</p>
          <Button onClick={loadData} className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Feedback toast */}
        {feedback && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-paragraph ${
            feedback.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {feedback.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { window.location.href = '/paralegal-dashboard'; }}
              className="p-2 rounded-lg hover:bg-[#F0EBE3] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#4A2C23]" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#4A2C23]">
                Time & Billing
              </h1>
              <p className="font-paragraph text-sm text-[#6B5B50]">
                Docket entries, rate management, invoicing & receivables
              </p>
            </div>
          </div>

          {/* Timer widget */}
          <div className="flex items-center gap-2">
            {timerRunning ? (
              <div className="flex items-center gap-2 bg-white border border-[#B94A1F] rounded-lg px-3 py-2 shadow-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="font-mono text-lg text-[#B94A1F] font-bold">{timerDisplay}</span>
                <Button size="sm" variant="outline" onClick={handleStopTimer}
                  className="border-[#B94A1F] text-[#B94A1F] hover:bg-[#B94A1F] hover:text-white">
                  <Pause className="w-3 h-3 mr-1" /> Stop
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  if (!timerFileId) {
                    showFeedback('error', 'Select a file below before starting timer.');
                    return;
                  }
                  setTimerRunning(true);
                }}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white"
              >
                <Play className="w-4 h-4 mr-1" /> Start Timer
              </Button>
            )}
          </div>
        </div>

        {/* Quick-select file for timer */}
        {!timerRunning && (
          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm font-paragraph text-[#6B5B50]">Timer file:</label>
            <select
              value={timerFileId}
              onChange={e => setTimerFileId(e.target.value)}
              className="text-sm border border-[#D4C5B9] rounded-lg px-3 py-1.5 bg-white font-paragraph"
            >
              <option value="">Select file…</option>
              {clientFiles.map(f => (
                <option key={f._id} value={f._id}>
                  {f.fileNumber} — {f.clientName || 'No name'} ({f.matterType || 'General'})
                </option>
              ))}
            </select>
            <select
              value={timerActivity}
              onChange={e => setTimerActivity(e.target.value)}
              className="text-sm border border-[#D4C5B9] rounded-lg px-3 py-1.5 bg-white font-paragraph"
            >
              <option value="">Activity…</option>
              {ACTIVITY_CODES.map(a => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#E8DDD3] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#B94A1F]" />
              <span className="text-xs font-paragraph text-[#6B5B50] uppercase tracking-wide">Unbilled Hours</span>
            </div>
            <p className="text-2xl font-heading font-bold text-[#4A2C23]">{stats.unbilledHours.toFixed(1)}h</p>
            <p className="text-xs font-paragraph text-[#6B5B50]">{formatCurrency(stats.unbilledAmount)}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8DDD3] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-paragraph text-[#6B5B50] uppercase tracking-wide">Outstanding</span>
            </div>
            <p className="text-2xl font-heading font-bold text-[#4A2C23]">{formatCurrency(stats.outstanding)}</p>
            <p className="text-xs font-paragraph text-[#6B5B50]">{enrichedInvoices.filter(i => i.status === 'sent').length} invoices</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8DDD3] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-paragraph text-[#6B5B50] uppercase tracking-wide">Collected</span>
            </div>
            <p className="text-2xl font-heading font-bold text-[#4A2C23]">{formatCurrency(stats.collected)}</p>
            <p className="text-xs font-paragraph text-[#6B5B50]">{enrichedInvoices.filter(i => i.status === 'paid').length} paid</p>
          </div>
          <div className={`bg-white rounded-xl border p-4 shadow-sm ${stats.overdueCount > 0 ? 'border-red-300' : 'border-[#E8DDD3]'}`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className={`w-4 h-4 ${stats.overdueCount > 0 ? 'text-red-500' : 'text-[#6B5B50]'}`} />
              <span className="text-xs font-paragraph text-[#6B5B50] uppercase tracking-wide">Overdue</span>
            </div>
            <p className={`text-2xl font-heading font-bold ${stats.overdueCount > 0 ? 'text-red-600' : 'text-[#4A2C23]'}`}>
              {stats.overdueCount}
            </p>
            <p className="text-xs font-paragraph text-[#6B5B50]">{formatCurrency(stats.overdueAmount)}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#F0EBE3] mb-6">
            <TabsTrigger value="docket" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <Clock className="w-4 h-4 mr-1.5" /> Docket
            </TabsTrigger>
            <TabsTrigger value="rates" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <DollarSign className="w-4 h-4 mr-1.5" /> Rate Sheet
            </TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <FileText className="w-4 h-4 mr-1.5" /> Invoices
            </TabsTrigger>
            <TabsTrigger value="receivables" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <BarChart3 className="w-4 h-4 mr-1.5" /> Receivables
            </TabsTrigger>
          </TabsList>

          {/* ============================== */}
          {/* TAB: DOCKET                    */}
          {/* ============================== */}
          <TabsContent value="docket">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B50]" />
                <Input
                  placeholder="Search entries…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white border-[#D4C5B9] font-paragraph"
                />
              </div>
              <select
                value={filterFileId}
                onChange={e => setFilterFileId(e.target.value)}
                className="text-sm border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white font-paragraph"
              >
                <option value="">All Files</option>
                {clientFiles.map(f => (
                  <option key={f._id} value={f._id}>
                    {f.fileNumber} — {f.clientName || 'No name'}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="text-sm border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white font-paragraph"
              >
                <option value="">All Status</option>
                <option value="unbilled">Unbilled</option>
                <option value="billed">Billed</option>
                <option value="written_off">Written Off</option>
              </select>
              <Button onClick={() => setShowDocketDialog(true)}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                <Plus className="w-4 h-4 mr-1" /> New Entry
              </Button>
            </div>

            {/* Docket table */}
            <div className="bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-paragraph">
                  <thead className="bg-[#F0EBE3]">
                    <tr>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Date</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Client / File</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Activity</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Description</th>
                      <th className="text-right p-3 text-[#4A2C23] font-semibold">Time</th>
                      <th className="text-right p-3 text-[#4A2C23] font-semibold">Amount</th>
                      <th className="text-center p-3 text-[#4A2C23] font-semibold">Status</th>
                      <th className="text-center p-3 text-[#4A2C23] font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DDD3]">
                    {filteredDockets.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#6B5B50]">
                          No docket entries found. Click "New Entry" to log time.
                        </td>
                      </tr>
                    ) : (
                      filteredDockets.map(d => {
                        const activity = ACTIVITY_CODES.find(a => a.value === d.activityCode);
                        const file = getClientFile(d.fileId || '');
                        return (
                          <tr key={d._id} className="hover:bg-[#F9F5F0] transition-colors">
                            <td className="p-3 whitespace-nowrap">{formatDate(d.date || d._createdDate)}</td>
                            <td className="p-3">
                              <div className="font-medium text-[#4A2C23]">{file?.clientName || 'Unknown'}</div>
                              <div className="text-xs text-[#6B5B50]">{file?.fileNumber || '—'}</div>
                            </td>
                            <td className="p-3">{activity?.label || d.activityCode || '—'}</td>
                            <td className="p-3 max-w-[250px] truncate">{d.description || '—'}</td>
                            <td className="p-3 text-right font-mono">{formatHours(d.hours, d.minutes)}</td>
                            <td className="p-3 text-right font-mono">{formatCurrency(d.amount || 0)}</td>
                            <td className="p-3 text-center">
                              <Badge className={
                                d.status === 'unbilled' ? 'bg-amber-100 text-amber-800' :
                                d.status === 'billed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {d.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              {d.status === 'unbilled' && (
                                <button
                                  onClick={() => handleDeleteDocket(d._id)}
                                  className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ============================== */}
          {/* TAB: RATE SHEET                */}
          {/* ============================== */}
          <TabsContent value="rates">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-paragraph text-[#6B5B50]">
                Configure billing rates per client file. Hourly, fixed fee, or contingency.
              </p>
              <Button onClick={() => setShowRateDialog(true)}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                <Plus className="w-4 h-4 mr-1" /> New Rate
              </Button>
            </div>

            <div className="grid gap-4">
              {enrichedRates.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E8DDD3] p-8 text-center text-[#6B5B50]">
                  No rate configurations yet. Add a rate to get started.
                </div>
              ) : (
                enrichedRates.map(r => {
                  const file = getClientFile(r.fileId || '');
                  const modelInfo = BILLING_MODELS.find(m => m.value === r.billingModel);
                  return (
                    <div key={r._id} className="bg-white rounded-xl border border-[#E8DDD3] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F0EBE3] flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-[#B94A1F]" />
                        </div>
                        <div>
                          <div className="font-medium font-paragraph text-[#4A2C23]">
                            {file?.clientName || 'Unknown'} — {file?.fileNumber || ''}
                          </div>
                          <div className="text-xs text-[#6B5B50]">{file?.matterType || 'General'}</div>
                          {r.rateDescription && (
                            <div className="text-xs text-[#6B5B50] mt-0.5">{r.rateDescription}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={modelInfo?.color || 'bg-gray-100 text-gray-800'}>
                          {modelInfo?.label || r.billingModel}
                        </Badge>
                        <span className="font-mono font-bold text-[#4A2C23]">
                          {r.billingModel === 'hourly' && `${formatCurrency(r.hourlyRate)}/hr`}
                          {r.billingModel === 'fixed' && formatCurrency(r.fixedFeeAmount)}
                          {r.billingModel === 'contingency' && `${r.contingencyPercent}%`}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* ============================== */}
          {/* TAB: INVOICES                  */}
          {/* ============================== */}
          <TabsContent value="invoices">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-paragraph text-[#6B5B50]">
                Generate and manage client invoices with Ontario HST ({(HST_RATE * 100).toFixed(0)}%).
              </p>
              <Button onClick={() => setShowInvoiceDialog(true)}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                <Plus className="w-4 h-4 mr-1" /> New Invoice
              </Button>
            </div>

            <div className="bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-paragraph">
                  <thead className="bg-[#F0EBE3]">
                    <tr>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Invoice #</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Client / File</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Date</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Due</th>
                      <th className="text-left p-3 text-[#4A2C23] font-semibold">Model</th>
                      <th className="text-right p-3 text-[#4A2C23] font-semibold">Subtotal</th>
                      <th className="text-right p-3 text-[#4A2C23] font-semibold">HST</th>
                      <th className="text-right p-3 text-[#4A2C23] font-semibold">Total</th>
                      <th className="text-center p-3 text-[#4A2C23] font-semibold">Status</th>
                      <th className="text-center p-3 text-[#4A2C23] font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DDD3]">
                    {enrichedInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-8 text-center text-[#6B5B50]">
                          No invoices yet. Generate one from unbilled docket entries.
                        </td>
                      </tr>
                    ) : (
                      enrichedInvoices
                        .sort((a, b) => new Date(b.invoiceDate || '').getTime() - new Date(a.invoiceDate || '').getTime())
                        .map(inv => {
                          const file = getClientFile(inv.fileId || '');
                          const statusInfo = INVOICE_STATUSES.find(s => s.value === inv.status);
                          const isOverdue = inv.status === 'sent' && inv.dueDate && new Date(inv.dueDate) < new Date();
                          return (
                            <tr key={inv._id} className="hover:bg-[#F9F5F0] transition-colors">
                              <td className="p-3 font-mono font-medium text-[#B94A1F]">
                                {inv.invoiceNumber || '—'}
                              </td>
                              <td className="p-3">
                                <div className="font-medium text-[#4A2C23]">{file?.clientName || 'Unknown'}</div>
                                <div className="text-xs text-[#6B5B50]">{file?.fileNumber || '—'}</div>
                              </td>
                              <td className="p-3 whitespace-nowrap">{formatDate(inv.invoiceDate)}</td>
                              <td className={`p-3 whitespace-nowrap ${isOverdue ? 'text-red-600 font-semibold' : ''}`}>
                                {formatDate(inv.dueDate)}
                                {isOverdue && <span className="text-xs ml-1">({getDaysOverdue(inv.dueDate!)}d)</span>}
                              </td>
                              <td className="p-3">
                                <Badge className={BILLING_MODELS.find(m => m.value === inv.billingModel)?.color || 'bg-gray-100'}>
                                  {inv.billingModel}
                                </Badge>
                              </td>
                              <td className="p-3 text-right font-mono">{formatCurrency(inv.subtotal || 0)}</td>
                              <td className="p-3 text-right font-mono">{formatCurrency(inv.hstAmount || 0)}</td>
                              <td className="p-3 text-right font-mono font-bold">{formatCurrency(inv.total || 0)}</td>
                              <td className="p-3 text-center">
                                <Badge className={isOverdue ? 'bg-red-100 text-red-800' : (statusInfo?.color || 'bg-gray-100')}>
                                  {isOverdue ? 'Overdue' : (statusInfo?.label || inv.status)}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {inv.status === 'draft' && (
                                    <button onClick={() => handleMarkInvoiceSent(inv)}
                                      className="p-1 hover:bg-blue-50 rounded text-blue-500"
                                      title="Mark Sent">
                                      <Send className="w-4 h-4" />
                                    </button>
                                  )}
                                  {(inv.status === 'sent' || inv.status === 'partial') && (
                                    <button onClick={() => handleMarkInvoicePaid(inv)}
                                      className="p-1 hover:bg-green-50 rounded text-green-500"
                                      title="Mark Paid">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button onClick={() => setShowInvoiceDetail(inv)}
                                    className="p-1 hover:bg-[#F0EBE3] rounded text-[#6B5B50]"
                                    title="View Details">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ============================== */}
          {/* TAB: RECEIVABLES / AGING       */}
          {/* ============================== */}
          <TabsContent value="receivables">
            <ReceivablesTab invoices={enrichedInvoices} getClientFile={getClientFile} />
          </TabsContent>
        </Tabs>

        {/* ============================== */}
        {/* DIALOG: NEW DOCKET ENTRY       */}
        {/* ============================== */}
        <Dialog open={showDocketDialog} onOpenChange={setShowDocketDialog}>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="font-heading text-[#4A2C23]">New Docket Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 font-paragraph">
              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Client File *</label>
                <select
                  value={docketForm.fileId}
                  onChange={e => {
                    setDocketForm(f => ({ ...f, fileId: e.target.value }));
                    const rate = getFileRate(e.target.value);
                    if (rate) {
                      const meta = parseRateMeta(rate);
                      setDocketForm(f => ({
                        ...f,
                        billingModel: meta.billingModel || 'hourly',
                        rate: meta.hourlyRate || 0,
                      }));
                    }
                  }}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">Select file…</option>
                  {clientFiles.map(f => (
                    <option key={f._id} value={f._id}>
                      {f.fileNumber} — {f.clientName || 'No name'} ({f.matterType || 'General'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Date</label>
                  <Input
                    type="date"
                    value={docketForm.date}
                    onChange={e => setDocketForm(f => ({ ...f, date: e.target.value }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Activity</label>
                  <select
                    value={docketForm.activityCode}
                    onChange={e => setDocketForm(f => ({ ...f, activityCode: e.target.value }))}
                    className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="">Select…</option>
                    {ACTIVITY_CODES.map(a => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Description *</label>
                <textarea
                  value={docketForm.description}
                  onChange={e => setDocketForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 min-h-[80px] resize-y"
                  placeholder="What did you work on?"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Hours</label>
                  <Input
                    type="number"
                    min={0}
                    value={docketForm.hours}
                    onChange={e => setDocketForm(f => ({ ...f, hours: parseInt(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Minutes</label>
                  <Input
                    type="number"
                    min={0}
                    max={59}
                    value={docketForm.minutes}
                    onChange={e => setDocketForm(f => ({ ...f, minutes: parseInt(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Rate ($/hr)</label>
                  <Input
                    type="number"
                    min={0}
                    step={5}
                    value={docketForm.rate}
                    onChange={e => setDocketForm(f => ({ ...f, rate: parseFloat(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                    disabled={docketForm.billingModel !== 'hourly'}
                  />
                </div>
              </div>

              {docketForm.billingModel === 'hourly' && docketForm.rate > 0 && (
                <div className="bg-[#F0EBE3] rounded-lg p-3 text-sm">
                  <span className="text-[#6B5B50]">Estimated amount: </span>
                  <span className="font-bold text-[#4A2C23]">
                    {formatCurrency(toDecimalHours(docketForm.hours, docketForm.minutes) * docketForm.rate)}
                  </span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocketDialog(false)}
                className="border-[#D4C5B9] text-[#4A2C23]">Cancel</Button>
              <Button onClick={handleSaveDocket}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                Save Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ============================== */}
        {/* DIALOG: NEW RATE CONFIG        */}
        {/* ============================== */}
        <Dialog open={showRateDialog} onOpenChange={setShowRateDialog}>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="font-heading text-[#4A2C23]">Configure Billing Rate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 font-paragraph">
              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Client File *</label>
                <select
                  value={rateForm.fileId}
                  onChange={e => setRateForm(f => ({ ...f, fileId: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">Select file…</option>
                  {clientFiles.map(f => (
                    <option key={f._id} value={f._id}>
                      {f.fileNumber} — {f.clientName || 'No name'} ({f.matterType || 'General'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Billing Model</label>
                <div className="flex gap-2">
                  {BILLING_MODELS.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setRateForm(f => ({ ...f, billingModel: m.value as any }))}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        rateForm.billingModel === m.value
                          ? 'bg-[#B94A1F] text-white border-[#B94A1F]'
                          : 'bg-white text-[#4A2C23] border-[#D4C5B9] hover:bg-[#F0EBE3]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {rateForm.billingModel === 'hourly' && (
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Hourly Rate ($)</label>
                  <Input
                    type="number"
                    min={0}
                    step={5}
                    value={rateForm.hourlyRate}
                    onChange={e => setRateForm(f => ({ ...f, hourlyRate: parseFloat(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
              )}

              {rateForm.billingModel === 'fixed' && (
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Fixed Fee Amount ($)</label>
                  <Input
                    type="number"
                    min={0}
                    step={50}
                    value={rateForm.fixedFeeAmount}
                    onChange={e => setRateForm(f => ({ ...f, fixedFeeAmount: parseFloat(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
              )}

              {rateForm.billingModel === 'contingency' && (
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Contingency Percentage (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={rateForm.contingencyPercent}
                    onChange={e => setRateForm(f => ({ ...f, contingencyPercent: parseFloat(e.target.value) || 0 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Notes</label>
                <textarea
                  value={rateForm.description}
                  onChange={e => setRateForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 min-h-[60px] resize-y"
                  placeholder="e.g., Retainer covers filing + one hearing"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRateDialog(false)}
                className="border-[#D4C5B9] text-[#4A2C23]">Cancel</Button>
              <Button onClick={handleSaveRate}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                Save Rate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ============================== */}
        {/* DIALOG: GENERATE INVOICE       */}
        {/* ============================== */}
        <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="font-heading text-[#4A2C23]">Generate Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 font-paragraph">
              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Client File *</label>
                <select
                  value={invoiceForm.fileId}
                  onChange={e => setInvoiceForm(f => ({ ...f, fileId: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">Select file…</option>
                  {clientFiles.map(f => (
                    <option key={f._id} value={f._id}>
                      {f.fileNumber} — {f.clientName || 'No name'} ({f.matterType || 'General'})
                    </option>
                  ))}
                </select>
              </div>

              {invoiceForm.fileId && (() => {
                const rate = getFileRate(invoiceForm.fileId);
                const meta = rate ? parseRateMeta(rate) : {};
                const fileModel = meta.billingModel || 'hourly';
                const effectiveModel = invoiceForm.billingModel || fileModel;
                const lineItemTotal = invoiceForm.lineItems.reduce(
                  (s, li) => s + (Number(li.amount) || 0),
                  0
                );
                const docketTotal = unbilledForFile.reduce(
                  (s, d) => s + (d.amount || 0),
                  0
                );
                const fixedFee =
                  effectiveModel === 'fixed' && lineItemTotal === 0
                    ? meta.fixedFeeAmount || 0
                    : 0;
                const previewSubtotal =
                  lineItemTotal +
                  (effectiveModel === 'hourly' ? docketTotal : 0) +
                  fixedFee;

                return (
                  <>
                    {/* Billing model picker (override). */}
                    <div>
                      <label className="text-sm font-medium text-[#4A2C23] block mb-1">
                        Billing model *
                      </label>
                      <select
                        value={invoiceForm.billingModel || fileModel}
                        onChange={(e) =>
                          setInvoiceForm((f) => ({
                            ...f,
                            billingModel: e.target.value,
                          }))
                        }
                        className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 bg-white"
                      >
                        {BILLING_MODELS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                            {m.value === fileModel ? ' (file default)' : ''}
                          </option>
                        ))}
                      </select>
                      {invoiceForm.billingModel &&
                        invoiceForm.billingModel !== fileModel && (
                          <p className="text-xs text-amber-700 mt-1">
                            Overriding the file's billing model
                            (was: {BILLING_MODELS.find((m) => m.value === fileModel)?.label}).
                          </p>
                        )}
                    </div>

                    {/* What is this invoice for? line items. */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-[#4A2C23]">
                          What is this invoice for?
                        </label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setInvoiceForm((f) => ({
                              ...f,
                              lineItems: [
                                ...f.lineItems,
                                { description: '', amount: 0 },
                              ],
                            }))
                          }
                          className="border-[#D4C5B9] text-[#4A2C23] h-7 px-2 text-xs"
                        >
                          + Add line item
                        </Button>
                      </div>
                      {invoiceForm.lineItems.length === 0 ? (
                        <p className="text-xs italic text-[#6B5B50] px-3 py-2 bg-[#F0EBE3]/50 rounded-lg">
                          {effectiveModel === 'hourly'
                            ? `No line items added — invoice will use ${unbilledForFile.length} unbilled docket entr${unbilledForFile.length === 1 ? 'y' : 'ies'}.`
                            : effectiveModel === 'fixed'
                              ? `No line items added — invoice will use the configured fixed fee of ${formatCurrency(meta.fixedFeeAmount || 0)}.`
                              : 'Add at least one line item describing what is being billed.'}
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {invoiceForm.lineItems.map((li, idx) => (
                            <li
                              key={idx}
                              className="flex gap-2 items-start"
                            >
                              <Input
                                value={li.description}
                                onChange={(e) =>
                                  setInvoiceForm((f) => ({
                                    ...f,
                                    lineItems: f.lineItems.map((x, i) =>
                                      i === idx
                                        ? { ...x, description: e.target.value }
                                        : x
                                    ),
                                  }))
                                }
                                placeholder='e.g. "Demand letter — drafting and service"'
                                className="flex-1 border-[#D4C5B9]"
                              />
                              <Input
                                type="number"
                                min={0}
                                step="0.01"
                                value={li.amount || ''}
                                onChange={(e) =>
                                  setInvoiceForm((f) => ({
                                    ...f,
                                    lineItems: f.lineItems.map((x, i) =>
                                      i === idx
                                        ? {
                                            ...x,
                                            amount: parseFloat(e.target.value) || 0,
                                          }
                                        : x
                                    ),
                                  }))
                                }
                                placeholder="Amount"
                                className="w-28 border-[#D4C5B9]"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setInvoiceForm((f) => ({
                                    ...f,
                                    lineItems: f.lineItems.filter(
                                      (_, i) => i !== idx
                                    ),
                                  }))
                                }
                                className="border-red-200 text-red-700 hover:bg-red-50 h-9 px-2"
                              >
                                ×
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Live summary panel — adapts to selected model. */}
                    <div className="bg-[#F0EBE3] rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B5B50]">Effective model:</span>
                        <Badge
                          className={
                            BILLING_MODELS.find((m) => m.value === effectiveModel)
                              ?.color || ''
                          }
                        >
                          {BILLING_MODELS.find((m) => m.value === effectiveModel)
                            ?.label || effectiveModel}
                        </Badge>
                      </div>
                      {effectiveModel === 'hourly' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B5B50]">
                            Unbilled docket entries:
                          </span>
                          <span className="font-medium">
                            {unbilledForFile.length} ({formatCurrency(docketTotal)})
                          </span>
                        </div>
                      )}
                      {effectiveModel === 'fixed' && lineItemTotal === 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B5B50]">Fixed fee:</span>
                          <span className="font-medium">
                            {formatCurrency(meta.fixedFeeAmount || 0)}
                          </span>
                        </div>
                      )}
                      {effectiveModel === 'contingency' && lineItemTotal === 0 && (
                        <div className="text-xs text-amber-700">
                          Contingency ({meta.contingencyPercent || 0}%) —
                          add a line item with the resolved amount when ready.
                        </div>
                      )}
                      {invoiceForm.lineItems.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B5B50]">Line items:</span>
                          <span className="font-medium">
                            {formatCurrency(lineItemTotal)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm pt-2 border-t border-[#D4C5B9]">
                        <span className="text-[#6B5B50]">Subtotal:</span>
                        <span className="font-bold text-[#4A2C23]">
                          {formatCurrency(previewSubtotal)}
                        </span>
                      </div>
                      {invoiceForm.includeHst && (
                        <div className="flex justify-between text-xs text-[#6B5B50]">
                          <span>HST (13%):</span>
                          <span>{formatCurrency(previewSubtotal * HST_RATE)}</span>
                        </div>
                      )}
                      {invoiceForm.includeHst && (
                        <div className="flex justify-between text-sm font-bold text-[#4A2C23]">
                          <span>Total:</span>
                          <span>
                            {formatCurrency(previewSubtotal * (1 + HST_RATE))}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#4A2C23] block mb-1">Due in (days)</label>
                  <Input
                    type="number"
                    min={1}
                    value={invoiceForm.dueInDays}
                    onChange={e => setInvoiceForm(f => ({ ...f, dueInDays: parseInt(e.target.value) || 30 }))}
                    className="border-[#D4C5B9]"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm font-paragraph cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invoiceForm.includeHst}
                      onChange={e => setInvoiceForm(f => ({ ...f, includeHst: e.target.checked }))}
                      className="rounded border-[#D4C5B9]"
                    />
                    Include HST (13%)
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C23] block mb-1">Notes</label>
                <textarea
                  value={invoiceForm.notes}
                  onChange={e => setInvoiceForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-lg px-3 py-2 min-h-[60px] resize-y"
                  placeholder="Thank you for your payment…"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}
                className="border-[#D4C5B9] text-[#4A2C23]">Cancel</Button>
              <Button onClick={handleGenerateInvoice}
                className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">
                Generate Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ============================== */}
        {/* DIALOG: INVOICE DETAIL         */}
        {/* ============================== */}
        <Dialog open={!!showInvoiceDetail} onOpenChange={() => setShowInvoiceDetail(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="font-heading text-[#4A2C23]">
                Invoice {showInvoiceDetail?.invoiceNumber}
              </DialogTitle>
            </DialogHeader>
            {showInvoiceDetail && (() => {
              const inv = enrichedInvoices.find(i => i._id === showInvoiceDetail._id) || showInvoiceDetail;
              const file = getClientFile(inv.fileId || '');
              const meta = (() => { try { return JSON.parse(inv.description || '{}'); } catch { return {}; } })();
              const lineItemIds: string[] = meta.lineItems || [];
              const lineItems = enrichedDockets.filter(d => lineItemIds.includes(d._id));

              return (
                <div className="space-y-4 font-paragraph">
                  {/* Invoice header info */}
                  <div className="grid grid-cols-2 gap-4 bg-[#F0EBE3] rounded-lg p-4">
                    <div>
                      <div className="text-xs text-[#6B5B50] uppercase">Client</div>
                      <div className="font-medium text-[#4A2C23]">{file?.clientName || 'Unknown'}</div>
                      <div className="text-xs text-[#6B5B50]">{file?.fileNumber} — {file?.matterType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#6B5B50] uppercase">Status</div>
                      <Badge className={INVOICE_STATUSES.find(s => s.value === meta.status)?.color || ''}>
                        {meta.status || 'draft'}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B5B50] uppercase">Invoice Date</div>
                      <div className="text-sm">{formatDate(meta.invoiceDate)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#6B5B50] uppercase">Due Date</div>
                      <div className="text-sm">{formatDate(meta.dueDate)}</div>
                    </div>
                  </div>

                  {/* Custom "what is this invoice for" line items */}
                  {Array.isArray(meta.customLineItems) && meta.customLineItems.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[#4A2C23] mb-2">What this invoice is for</h4>
                      <table className="w-full text-xs">
                        <thead className="bg-[#F0EBE3]">
                          <tr>
                            <th className="text-left p-2">Description</th>
                            <th className="text-right p-2">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DDD3]">
                          {meta.customLineItems.map((li: any, i: number) => (
                            <tr key={i}>
                              <td className="p-2">{li.description || '—'}</td>
                              <td className="p-2 text-right font-mono">
                                {formatCurrency(Number(li.amount) || 0)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Line items */}
                  {lineItems.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[#4A2C23] mb-2">Docket Entries</h4>
                      <table className="w-full text-xs">
                        <thead className="bg-[#F0EBE3]">
                          <tr>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Description</th>
                            <th className="text-right p-2">Time</th>
                            <th className="text-right p-2">Rate</th>
                            <th className="text-right p-2">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DDD3]">
                          {lineItems.map(d => (
                            <tr key={d._id}>
                              <td className="p-2">{formatDate(d.date || d._createdDate)}</td>
                              <td className="p-2">{d.description}</td>
                              <td className="p-2 text-right font-mono">{formatHours(d.hours, d.minutes)}</td>
                              <td className="p-2 text-right font-mono">{formatCurrency(d.rate)}</td>
                              <td className="p-2 text-right font-mono">{formatCurrency(d.amount || 0)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="border-t border-[#E8DDD3] pt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B5B50]">Subtotal</span>
                      <span className="font-mono">{formatCurrency(meta.subtotal || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B5B50]">HST (13%)</span>
                      <span className="font-mono">{formatCurrency(meta.hstAmount || 0)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold border-t border-[#E8DDD3] pt-2">
                      <span className="text-[#4A2C23]">Total</span>
                      <span className="text-[#B94A1F] font-mono">{formatCurrency(meta.total || 0)}</span>
                    </div>
                    {meta.amountPaid > 0 && (
                      <div className="flex justify-between text-sm text-green-700">
                        <span>Paid</span>
                        <span className="font-mono">{formatCurrency(meta.amountPaid)}</span>
                      </div>
                    )}
                  </div>

                  {meta.notes && (
                    <div className="bg-[#F0EBE3] rounded-lg p-3 text-sm text-[#6B5B50]">
                      <strong>Notes:</strong> {meta.notes}
                    </div>
                  )}
                </div>
              );
            })()}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInvoiceDetail(null)}
                className="border-[#D4C5B9] text-[#4A2C23]">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// ============================================================
// RECEIVABLES SUB-COMPONENT
// ============================================================

interface ReceivablesProps {
  invoices: any[];
  getClientFile: (id: string) => ClientFile | undefined;
}

function ReceivablesTab({ invoices, getClientFile }: ReceivablesProps) {
  const aging = useMemo(() => {
    const buckets = {
      current: [] as any[],    // 0-30 days
      thirty: [] as any[],     // 31-60 days
      sixty: [] as any[],      // 61-90 days
      ninety: [] as any[],     // 90+ days
    };

    invoices
      .filter(i => i.status !== 'paid' && i.status !== 'draft')
      .forEach(inv => {
        if (!inv.dueDate) { buckets.current.push(inv); return; }
        const days = getDaysOverdue(inv.dueDate);
        if (days <= 30) buckets.current.push(inv);
        else if (days <= 60) buckets.thirty.push(inv);
        else if (days <= 90) buckets.sixty.push(inv);
        else buckets.ninety.push(inv);
      });

    return buckets;
  }, [invoices]);

  const bucketTotal = (bucket: any[]) =>
    bucket.reduce((sum, inv) => sum + ((inv.total || 0) - (inv.amountPaid || 0)), 0);

  const grandTotal = bucketTotal(aging.current) + bucketTotal(aging.thirty) +
    bucketTotal(aging.sixty) + bucketTotal(aging.ninety);

  const bucketData = [
    { label: 'Current (0–30)', items: aging.current, color: 'bg-green-500' },
    { label: '31–60 days', items: aging.thirty, color: 'bg-amber-500' },
    { label: '61–90 days', items: aging.sixty, color: 'bg-orange-500' },
    { label: '90+ days', items: aging.ninety, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Aging bar */}
      <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
        <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Aging Summary</h3>
        {grandTotal === 0 ? (
          <p className="text-[#6B5B50] font-paragraph text-sm">No outstanding receivables. All invoices are paid or in draft.</p>
        ) : (
          <>
            <div className="flex rounded-lg overflow-hidden h-8 mb-4">
              {bucketData.map(b => {
                const pct = grandTotal > 0 ? (bucketTotal(b.items) / grandTotal) * 100 : 0;
                if (pct === 0) return null;
                return (
                  <div
                    key={b.label}
                    className={`${b.color} flex items-center justify-center text-xs text-white font-bold`}
                    style={{ width: `${pct}%` }}
                    title={`${b.label}: ${formatCurrency(bucketTotal(b.items))}`}
                  >
                    {pct > 15 && formatCurrency(bucketTotal(b.items))}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bucketData.map(b => (
                <div key={b.label} className="text-center">
                  <div className={`w-3 h-3 ${b.color} rounded-full mx-auto mb-1`} />
                  <div className="text-xs font-paragraph text-[#6B5B50]">{b.label}</div>
                  <div className="font-mono font-bold text-[#4A2C23]">{formatCurrency(bucketTotal(b.items))}</div>
                  <div className="text-xs text-[#6B5B50]">{b.items.length} invoice{b.items.length !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E8DDD3] flex justify-between">
              <span className="font-paragraph font-semibold text-[#4A2C23]">Total Outstanding</span>
              <span className="font-mono font-bold text-xl text-[#B94A1F]">{formatCurrency(grandTotal)}</span>
            </div>
          </>
        )}
      </div>

      {/* Per-client breakdown */}
      <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
        <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">By Client</h3>
        {(() => {
          const unpaid = invoices.filter(i => i.status !== 'paid' && i.status !== 'draft');
          const byClient: Record<string, { fileId: string; total: number; count: number }> = {};
          unpaid.forEach(inv => {
            const fid = inv.fileId || 'unknown';
            if (!byClient[fid]) byClient[fid] = { fileId: fid, total: 0, count: 0 };
            byClient[fid].total += (inv.total || 0) - (inv.amountPaid || 0);
            byClient[fid].count++;
          });
          const sorted = Object.values(byClient).sort((a, b) => b.total - a.total);

          if (sorted.length === 0) {
            return <p className="text-[#6B5B50] font-paragraph text-sm">No outstanding balances.</p>;
          }

          return (
            <div className="space-y-3">
              {sorted.map(c => {
                const file = getClientFile(c.fileId);
                return (
                  <div key={c.fileId} className="flex items-center justify-between py-2 border-b border-[#E8DDD3] last:border-0">
                    <div>
                      <div className="font-medium font-paragraph text-[#4A2C23]">
                        {file?.clientName || 'Unknown'}
                      </div>
                      <div className="text-xs text-[#6B5B50]">
                        {file?.fileNumber} — {c.count} invoice{c.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#B94A1F]">{formatCurrency(c.total)}</span>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
