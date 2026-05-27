/**
 * Trust Accounting Page — LSO By-Law 9 Compliant
 *
 * Comprehensive trust account management interface for paralegals.
 * Includes:
 * - Trust Account Overview with client balances and compliance alerts
 * - Transaction Journal (Form 9A)
 * - Client Trust Ledgers (Form 9B)
 * - Monthly Reconciliation (Form 9C)
 *
 * All financial records are stored in the 'financialrecords' CMS collection
 * and displayed with proper running balances and audit trails.
 */
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Plus, Download, AlertTriangle, TrendingUp, TrendingDown, Eye, Filter, Search, Loader2, AlertCircle, CheckCircle, DollarSign, FileText, Trash2, CalendarClock, RefreshCw } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ============================================================
// TYPES & CONSTANTS
// ============================================================

interface FinancialRecord {
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
  assignedParalegalId?: string;
}

interface ClientTrustBalance {
  clientId: string;
  clientName: string;
  fileNumber: string;
  matterType: string;
  balance: number;
  lastTransactionDate: string | null;
  status: 'positive' | 'negative' | 'low';
}

interface ReconciliationRecord {
  month: number;
  year: number;
  bankStatementBalance: number;
  outstandingDeposits: number;
  outstandingCheques: number;
  clientLedgersTotal: number;
  balanced: boolean;
  discrepancy: number;
  recordedDate: string;
}

const TRANSACTION_TYPES = [
  { value: 'trust_deposit', label: 'Trust Deposit', color: 'bg-green-100 text-green-800', sign: '+' },
  { value: 'trust_withdrawal', label: 'Trust Withdrawal', color: 'bg-red-100 text-red-800', sign: '-' },
  { value: 'billing', label: 'Fee / Billing', color: 'bg-blue-100 text-blue-800', sign: '+' },
  { value: 'payment', label: 'Client Payment', color: 'bg-emerald-100 text-emerald-800', sign: '+' },
  { value: 'disbursement', label: 'Disbursement', color: 'bg-orange-100 text-orange-800', sign: '-' },
  { value: 'refund', label: 'Refund', color: 'bg-purple-100 text-purple-800', sign: '-' },
  { value: 'transfer', label: 'Trust-to-General Transfer', color: 'bg-amber-100 text-amber-800', sign: '~' },
];

const PAYMENT_METHODS = [
  { value: 'etransfer', label: 'e-Transfer' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'cash', label: 'Cash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit', label: 'Debit' },
  { value: 'wire', label: 'Wire Transfer' },
  { value: 'trust_cheque', label: 'Trust Cheque' },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: Date | string | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-CA');
}

function getTransactionTypeColor(type: string): string {
  const found = TRANSACTION_TYPES.find(t => t.value === type);
  return found?.color || 'bg-gray-100 text-gray-800';
}

function getTransactionTypeLabel(type: string): string {
  const found = TRANSACTION_TYPES.find(t => t.value === type);
  return found?.label || type;
}

function getTransactionSign(type: string): string {
  const found = TRANSACTION_TYPES.find(t => t.value === type);
  return found?.sign || '';
}

/**
 * Pre-compute the running balance after each transaction, in
 * CHRONOLOGICAL order (oldest first), and return a Map keyed by
 * record _id. This way the table can be displayed in any order
 * (typically newest-first) and each row still shows the correct
 * cumulative balance at the time of that transaction.
 *
 * LSO By-Law 9 audit requirement: the journal balance column must
 * reflect the cumulative balance AT THE TIME of each entry, not the
 * value as you scroll through the page.
 *
 * Type signs:
 *   '+' trust_deposit, billing, payment      (inflow)
 *   '-' trust_withdrawal, disbursement, refund (outflow)
 *   '~' transfer (trust-to-general)          (debit to trust account)
 *
 * A trust→general transfer DEBITS the trust account from this
 * journal's perspective, so we treat it as a '-' here even though
 * it shows up with the '~' badge in the UI.
 */
function buildRunningBalances(records: FinancialRecord[]): Map<string, number> {
  const balances = new Map<string, number>();
  const chronological = [...records].sort((a, b) => {
    const da = new Date(a.transactionDate || a._createdDate || 0).getTime();
    const db = new Date(b.transactionDate || b._createdDate || 0).getTime();
    if (da !== db) return da - db;
    // Stable tie-breaker: _createdDate, then _id
    const ca = new Date(a._createdDate || 0).getTime();
    const cb = new Date(b._createdDate || 0).getTime();
    if (ca !== cb) return ca - cb;
    return (a._id || '').localeCompare(b._id || '');
  });
  let running = 0;
  for (const record of chronological) {
    const amount = record.amount || 0;
    const sign = getTransactionSign(record.transactionType || '');
    if (sign === '+') running += amount;
    else if (sign === '-' || sign === '~') running -= amount;
    balances.set(record._id || '', running);
  }
  return balances;
}

function daysAgo(date: Date | string | undefined): number {
  if (!date) return Infinity;
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function parseJSONSafely(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function TrustAccountingPage() {
  // State: Data Loading
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [clientFiles, setClientFiles] = useState<ClientFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // State: UI Navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'ledgers' | 'reconciliation'>('overview');

  // State: Transaction Dialog
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [transactionType, setTransactionType] = useState('trust_deposit');
  const [selectedClient, setSelectedClient] = useState<ClientFile | null>(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionRefNumber, setTransactionRefNumber] = useState('');
  const [transactionPaymentMethod, setTransactionPaymentMethod] = useState('etransfer');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
  const [savingTransaction, setSavingTransaction] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);

  // State: One-time backfill of legacy financialrecords rows (rows
  // created before the journalType / fileId-fallback columns landed).
  // The button on the Overview tab runs the migration on demand.
  const [isBackfilling, setIsBackfilling] = useState(false);
  const [backfillReport, setBackfillReport] = useState<string | null>(null);

  // State: Journal Filters
  const [journalDateFrom, setJournalDateFrom] = useState('');
  const [journalDateTo, setJournalDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [journalClientFilter, setJournalClientFilter] = useState('');
  const [journalTypeFilter, setJournalTypeFilter] = useState('');
  const [journalSearch, setJournalSearch] = useState('');
  // LSO By-Law 9 distinguishes Trust Account Journal (Form 9A) from
  // the General Account Receipts & Disbursements Journal. They MUST
  // be kept separate. We discriminate on the `journalType` field on
  // each financialrecords row ('trust' | 'general'). Legacy rows
  // without the field are treated as trust by default (existing data
  // is virtually all trust deposits from Square + paralegal manual
  // entries via the trust dialog).
  const [journalScope, setJournalScope] = useState<'trust' | 'general'>('trust');

  // State: Ledger View
  const [selectedLedgerClient, setSelectedLedgerClient] = useState<ClientFile | null>(null);
  const [ledgerSearchInput, setLedgerSearchInput] = useState('');

  // State: Reconciliation
  const [reconciliationMonth, setReconciliationMonth] = useState(new Date().getMonth() + 1);
  const [reconciliationYear, setReconciliationYear] = useState(new Date().getFullYear());
  const [bankStatementBalance, setBankStatementBalance] = useState('');
  const [outstandingDeposits, setOutstandingDeposits] = useState('');
  const [outstandingCheques, setOutstandingCheques] = useState('');
  const [savingReconciliation, setSavingReconciliation] = useState(false);
  const [reconciliationError, setReconciliationError] = useState<string | null>(null);
  const [reconciliationHistory, setReconciliationHistory] = useState<ReconciliationRecord[]>([]);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<FinancialRecord | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Feedback toast
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  useEffect(() => {
    if (feedback) { const t = setTimeout(() => setFeedback(null), 4000); return () => clearTimeout(t); }
  }, [feedback]);

  // ============================================================
  // LOAD DATA FROM CMS
  // ============================================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [financialRes, filesRes] = await Promise.all([
        BaseCrudService.getAll<FinancialRecord>('financialrecords', undefined, { limit: 5000 }),
        BaseCrudService.getAll<ClientFile>('clientfiles', undefined, { limit: 1000 }),
      ]);

      setFinancialRecords(financialRes.items || []);
      setClientFiles(filesRes.items || []);

      // Extract reconciliation history from records with transactionType === 'reconciliation'
      const reconciliations: ReconciliationRecord[] = [];
      (financialRes.items || []).forEach(record => {
        if (record.transactionType === 'reconciliation' && record.description) {
          const data = parseJSONSafely(record.description);
          if (data) {
            reconciliations.push({
              month: data.month,
              year: data.year,
              bankStatementBalance: data.bankStatementBalance || 0,
              outstandingDeposits: data.outstandingDeposits || 0,
              outstandingCheques: data.outstandingCheques || 0,
              clientLedgersTotal: data.clientLedgersTotal || 0,
              balanced: data.balanced || false,
              discrepancy: data.discrepancy || 0,
              recordedDate: formatDate(record._createdDate),
            });
          }
        }
      });
      setReconciliationHistory(reconciliations.sort((a, b) => b.year - a.year || b.month - a.month));
    } catch (error) {
      console.error('Error loading trust accounting data:', error);
      setLoadError('Failed to load financial records. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // CALCULATE TRUST BALANCES
  // ============================================================

  const calculateClientTrustBalances = (): ClientTrustBalance[] => {
    const balances = new Map<string, ClientTrustBalance>();

    financialRecords
      .filter(r => r.transactionType && r.transactionType !== 'reconciliation')
      .sort((a, b) => {
        const dateA = new Date(a.transactionDate || 0).getTime();
        const dateB = new Date(b.transactionDate || 0).getTime();
        return dateA - dateB;
      })
      .forEach(record => {
        if (!record.clientId) return;

        const client = clientFiles.find(f => f.clientId === record.clientId);
        if (!client) return;

        if (!balances.has(record.clientId)) {
          balances.set(record.clientId, {
            clientId: record.clientId,
            clientName: client.clientName || 'Unknown',
            fileNumber: client.fileNumber || '',
            matterType: client.matterType || '',
            balance: 0,
            lastTransactionDate: null,
            status: 'positive',
          });
        }

        const balance = balances.get(record.clientId)!;
        const amount = record.amount || 0;
        const sign = getTransactionSign(record.transactionType);

        // Use the SAME sign convention as the journal's
        // buildRunningBalances: '+' is a trust receipt (credit to
        // trust), '-' is a trust withdrawal/disbursement/refund
        // (debit to trust), and '~' (trust→general transfer) is ALSO
        // a debit to the trust account. This way the per-client
        // ledger total cross-foots to the journal total — an LSO
        // By-Law 9 reconciliation requirement.
        // (We restrict to trust-side rows here; general-side rows
        // belong to the General Account journal and don't move the
        // trust balance.)
        if (record.journalType && record.journalType !== 'trust') {
          // Skip non-trust rows for the per-client TRUST balance.
        } else if (sign === '+') {
          balance.balance += amount;
        } else if (sign === '-' || sign === '~') {
          balance.balance -= amount;
        }

        balance.lastTransactionDate = formatDate(record.transactionDate);

        // Update status
        if (balance.balance < 0) {
          balance.status = 'negative';
        } else if (balance.balance < 100) {
          balance.status = 'low';
        } else {
          balance.status = 'positive';
        }
      });

    return Array.from(balances.values());
  };

  const clientTrustBalances = calculateClientTrustBalances();
  const totalTrustBalance = clientTrustBalances.reduce((sum, b) => sum + b.balance, 0);
  const clientsWithTrust = clientTrustBalances.filter(b => b.balance !== 0).length;

  // Get deposits and withdrawals for current month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const currentMonthRecords = financialRecords.filter(r => {
    const date = new Date(r.transactionDate || 0);
    return date >= monthStart && date <= monthEnd;
  });

  const monthDeposits = currentMonthRecords
    .filter(r => getTransactionSign(r.transactionType) === '+')
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const monthWithdrawals = currentMonthRecords
    .filter(r => getTransactionSign(r.transactionType) === '-')
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  // Compliance alerts
  const complianceAlerts: string[] = [];
  clientTrustBalances.forEach(balance => {
    if (balance.status === 'negative') {
      complianceAlerts.push(`CRITICAL: ${balance.clientName} has negative trust balance (${formatCurrency(balance.balance)})`);
    }
  });

  clientTrustBalances.forEach(balance => {
    const days = daysAgo(balance.lastTransactionDate);
    if (days > 180) {
      complianceAlerts.push(`WARNING: ${balance.clientName} has no transactions in 6+ months (last: ${balance.lastTransactionDate})`);
    }
  });

  // ============================================================
  // HANDLERS
  // ============================================================

  /**
   * One-time backfill of legacy financialrecords rows.
   *
   * Two columns landed on the financialrecords schema AFTER many
   * rows had already been written:
   *   - `journalType` ('trust' | 'general'): discriminator for the
   *     Trust journal (9A) vs General journal (9D) UI split. Rows
   *     without this field are invisible to the journal scope filter
   *     and miss validators that key off it.
   *   - `fileId`: links the financialrecords row to a specific
   *     clientfile so the G. Financial Records section on the client
   *     file page picks the row up. Rows with `fileId: null` are
   *     invisible there even when `clientId` is set.
   *
   * This migration:
   *   1. Loads all financialrecords + clientfiles.
   *   2. For each record missing `journalType`, infers it from the
   *      transactionType (deposits/withdrawals/transfers/reconciliation
   *      → 'trust'; billing/payment/disbursement → 'trust' by default
   *      since these are legacy rows pre-dating the general account UI,
   *      and were all stored against the trust journal). Paralegal can
   *      manually re-tag any rows that should be 'general' afterward.
   *   3. For each record missing `fileId` but with a `clientId`, looks
   *      up the most recent active file for that client and patches.
   *
   * Idempotent: running it twice is safe — only patches rows missing
   * the relevant field.
   */
  const handleBackfillLegacy = async () => {
    if (!window.confirm(
      'Run one-time backfill on legacy financialrecords?\n\n' +
      'This will:\n' +
      '  • Add `journalType: "trust"` to rows that are missing it (legacy rows).\n' +
      '  • Set `fileId` on rows that have a clientId but no fileId, using the most recent active file for that client.\n\n' +
      'Safe and idempotent — only patches missing fields. Continue?'
    )) {
      return;
    }

    setIsBackfilling(true);
    setBackfillReport(null);

    try {
      const trustTransactionTypes = new Set([
        'trust_deposit', 'trust_withdrawal', 'transfer',
        'billing', 'payment', 'disbursement', 'refund',
        'reconciliation',
      ]);

      let fileIdPatched = 0;
      let journalTypePatched = 0;
      let skipped = 0;
      let failed = 0;
      const failures: string[] = [];

      // Build a clientId → most-recent-active-file map up front so
      // we don't do N×M lookups in the loop.
      const filesByClient = new Map<string, ClientFile>();
      for (const file of clientFiles) {
        if (!file.clientId) continue;
        const existing = filesByClient.get(file.clientId);
        const fileDate = new Date((file as any)._createdDate || 0).getTime();
        const existingDate = existing
          ? new Date((existing as any)._createdDate || 0).getTime()
          : -1;
        // Prefer active files; tie-break by recency.
        const fileActive = (file as any).status === 'active';
        const existingActive = existing
          ? (existing as any).status === 'active'
          : false;
        if (!existing
            || (fileActive && !existingActive)
            || (fileActive === existingActive && fileDate > existingDate)) {
          filesByClient.set(file.clientId, file);
        }
      }

      for (const record of financialRecords) {
        const patch: Record<string, unknown> = {};
        const txnType = (record as any).transactionType as string | undefined;
        const journalType = (record as any).journalType as string | undefined;
        const fileId = (record as any).fileId as string | undefined;
        const clientId = (record as any).clientId as string | undefined;

        if (!journalType && txnType && trustTransactionTypes.has(txnType)) {
          patch.journalType = 'trust';
        }
        if (!fileId && clientId) {
          const fallbackFile = filesByClient.get(clientId);
          if (fallbackFile?._id) {
            patch.fileId = fallbackFile._id;
          }
        }

        if (Object.keys(patch).length === 0) {
          skipped++;
          continue;
        }

        try {
          await BaseCrudService.update('financialrecords', { _id: record._id, ...patch });
          if (patch.fileId) fileIdPatched++;
          if (patch.journalType) journalTypePatched++;
        } catch (err: any) {
          failed++;
          failures.push(`${record._id}: ${err?.message || String(err)}`);
        }
      }

      const lines = [
        `Backfill complete.`,
        `• journalType added to ${journalTypePatched} record(s)`,
        `• fileId added to ${fileIdPatched} record(s)`,
        `• ${skipped} record(s) already had both fields (skipped)`,
      ];
      if (failed > 0) {
        lines.push(`• ${failed} record(s) FAILED to update`);
        lines.push(...failures.slice(0, 5).map(f => `  ${f}`));
      }
      setBackfillReport(lines.join('\n'));

      // Reload data so the UI reflects the patched rows.
      await loadData();
    } catch (err: any) {
      setBackfillReport(`Backfill failed at top level: ${err?.message || String(err)}`);
    } finally {
      setIsBackfilling(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!selectedClient || !transactionAmount || !transactionDate) {
      setTransactionError('Please fill in all required fields');
      return;
    }

    // LSO By-Law 9 s. 18(8): every trust→general transfer MUST be
    // supported by an invoice or fee bill that has been delivered (or
    // made available) to the client. The reference number is how the
    // journal entry links to that supporting document — without it,
    // the transfer is non-compliant and the entry is unreadable on a
    // Law Society audit. Block submission and ask for the invoice ref.
    if (transactionType === 'transfer' && !transactionRefNumber.trim()) {
      setTransactionError(
        'Reference number is required for Trust→General transfers ' +
        '(LSO By-Law 9 s. 18(8)). Enter the invoice or fee-bill number ' +
        'that authorises this transfer.'
      );
      return;
    }

    setSavingTransaction(true);
    setTransactionError(null);

    try {
      const amount = parseFloat(transactionAmount);
      if (isNaN(amount) || amount <= 0) {
        setTransactionError('Amount must be a positive number');
        setSavingTransaction(false);
        return;
      }

      // journalType discriminator so the Trust vs General views can
      // filter correctly. Transfers, deposits, withdrawals, billings,
      // refunds, disbursements that the paralegal records via this
      // dialog are all trust-side entries (the dialog is on the Trust
      // Accounting page). The DisburseFundsPage handles general-side.
      const journalType: 'trust' | 'general' = 'trust';

      const newRecord: Partial<FinancialRecord> = {
        clientId: selectedClient.clientId,
        fileId: selectedClient._id,
        journalType,
        transactionType,
        amount,
        transactionDate: new Date(transactionDate),
        description: transactionDescription,
        referenceNumber: transactionRefNumber,
        paymentMethod: transactionPaymentMethod,
        recordedBy: 'Paralegal Dashboard',
      };

      await BaseCrudService.create('financialrecords', newRecord);

      // Reload data
      await loadData();

      // Reset form
      setShowTransactionDialog(false);
      setTransactionType('trust_deposit');
      setSelectedClient(null);
      setTransactionAmount('');
      setTransactionDescription('');
      setTransactionRefNumber('');
      setTransactionPaymentMethod('etransfer');
      setTransactionDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error saving transaction:', error);
      setTransactionError('Failed to save transaction. Please try again.');
    } finally {
      setSavingTransaction(false);
    }
  };

  const handleSaveReconciliation = async () => {
    if (!bankStatementBalance) {
      setReconciliationError('Bank statement balance is required');
      return;
    }

    setSavingReconciliation(true);
    setReconciliationError(null);

    try {
      const bankBalance = parseFloat(bankStatementBalance);
      const outstanding = parseFloat(outstandingDeposits || '0');
      const cheques = parseFloat(outstandingCheques || '0');

      if (isNaN(bankBalance)) {
        setReconciliationError('Invalid bank statement balance');
        setSavingReconciliation(false);
        return;
      }

      const clientLedgersTotal = clientTrustBalances.reduce((sum, b) => sum + b.balance, 0);
      const reconciled = bankBalance + outstanding - cheques;
      const balanced = Math.abs(reconciled - clientLedgersTotal) < 0.01;
      const discrepancy = reconciled - clientLedgersTotal;

      const reconciliationData: ReconciliationRecord = {
        month: reconciliationMonth,
        year: reconciliationYear,
        bankStatementBalance: bankBalance,
        outstandingDeposits: outstanding,
        outstandingCheques: cheques,
        clientLedgersTotal,
        balanced,
        discrepancy,
        recordedDate: formatDate(new Date()),
      };

      const record: Partial<FinancialRecord> = {
        transactionType: 'reconciliation',
        transactionDate: new Date(),
        description: JSON.stringify(reconciliationData),
        recordedBy: 'Paralegal Dashboard',
      };

      await BaseCrudService.create('financialrecords', record);

      // Reload data
      await loadData();

      // Reset form
      setBankStatementBalance('');
      setOutstandingDeposits('');
      setOutstandingCheques('');
    } catch (error) {
      console.error('Error saving reconciliation:', error);
      setReconciliationError('Failed to save reconciliation. Please try again.');
    } finally {
      setSavingReconciliation(false);
    }
  };

  // ============================================================
  // DELETE TRANSACTION
  // ============================================================

  const handleDeleteTransaction = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await BaseCrudService.delete('financialrecords', deleteTarget._id);
      setFeedback({ type: 'success', message: 'Transaction deleted successfully.' });
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      await loadData();
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
      setFeedback({ type: 'error', message: error?.message || 'Failed to delete transaction.' });
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (record: FinancialRecord) => {
    setDeleteTarget(record);
    setShowDeleteConfirm(true);
  };

  // ============================================================
  // FILTERED DATA
  // ============================================================

  // Discriminator: legacy rows without journalType default to 'trust'
  // (backward-compat with data created before the trust/general split).
  const recordJournalType = (r: any): 'trust' | 'general' => {
    if (r.journalType === 'general') return 'general';
    return 'trust';
  };

  // Build the chronological running-balance map ONCE per journal
  // scope (trust vs general) so each scope has its own correct
  // running total. Use it to stamp the historical balance onto each
  // displayed row regardless of how the user has filtered/sorted.
  const journalRunningBalances = buildRunningBalances(
    financialRecords.filter(r =>
      r.transactionType &&
      r.transactionType !== 'reconciliation' &&
      recordJournalType(r) === journalScope
    )
  );

  const journalRecords = financialRecords
    .filter(r => r.transactionType && r.transactionType !== 'reconciliation')
    .filter(r => recordJournalType(r) === journalScope)
    .filter(r => {
      if (journalDateFrom && new Date(r.transactionDate || 0) < new Date(journalDateFrom)) return false;
      if (journalDateTo && new Date(r.transactionDate || 0) > new Date(journalDateTo)) return false;
      if (journalClientFilter && r.clientId !== journalClientFilter) return false;
      if (journalTypeFilter && r.transactionType !== journalTypeFilter) return false;
      if (journalSearch) {
        const query = journalSearch.toLowerCase();
        return (
          (r.description || '').toLowerCase().includes(query) ||
          (r.referenceNumber || '').toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.transactionDate || 0).getTime();
      const dateB = new Date(b.transactionDate || 0).getTime();
      return dateB - dateA;
    });

  const ledgerRecords = selectedLedgerClient
    ? financialRecords
        .filter(r => r.transactionType && r.transactionType !== 'reconciliation' && r.clientId === selectedLedgerClient.clientId)
        .sort((a, b) => {
          const dateA = new Date(a.transactionDate || 0).getTime();
          const dateB = new Date(b.transactionDate || 0).getTime();
          return dateA - dateB;
        })
    : [];

  const currentReconciliation = reconciliationHistory.find(
    r => r.month === reconciliationMonth && r.year === reconciliationYear
  );

  const ledgerClientOptions = clientFiles
    .filter(f => clientTrustBalances.some(b => b.clientId === f.clientId))
    .sort((a, b) => (a.clientName || '').localeCompare(b.clientName || ''));

  const filteredLedgerOptions = ledgerClientOptions.filter(f =>
    (f.clientName || '').toLowerCase().includes(ledgerSearchInput.toLowerCase()) ||
    (f.fileNumber || '').toLowerCase().includes(ledgerSearchInput.toLowerCase())
  );

  // ============================================================
  // RENDER
  // ============================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <a href="/paralegal-dashboard" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </a>

        <div className="space-y-6">
          <div>
            <div className="h-10 bg-foreground/10 rounded-lg w-96 mb-2 animate-pulse" />
            <div className="h-4 bg-foreground/10 rounded-lg w-full max-w-2xl animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg border border-foreground/10 p-4 animate-pulse">
                <div className="h-4 bg-foreground/10 rounded w-20 mb-2" />
                <div className="h-6 bg-foreground/10 rounded w-32" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-foreground/10 p-6 animate-pulse">
            <div className="h-6 bg-foreground/10 rounded w-48 mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-10 bg-foreground/10 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-background p-6">
        <a href="/paralegal-dashboard" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </a>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-lg font-bold text-red-900">Error Loading Data</h3>
            <p className="text-sm text-red-800 mt-1">{loadError}</p>
            <Button onClick={loadData} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Link */}
        <a href="/paralegal-dashboard" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </a>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Trust Account Management
          </h1>
          <p className="font-paragraph text-foreground/60 mt-1">
            LSO By-Law 9 — Trust account records, client ledgers & monthly reconciliation
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
          <TabsList className="bg-white border border-foreground/10 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journal">Transaction Journal (9A)</TabsTrigger>
            <TabsTrigger value="ledgers">Client Ledgers (9B)</TabsTrigger>
            <TabsTrigger value="reconciliation">Reconciliation (9C)</TabsTrigger>
          </TabsList>

          {/* ============================================================
              TAB 1: OVERVIEW
              ============================================================ */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Total Trust Balance</p>
                    <p className="font-heading text-2xl font-bold text-foreground mt-2">
                      {formatCurrency(totalTrustBalance)}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-full p-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Clients with Trust Funds</p>
                    <p className="font-heading text-2xl font-bold text-foreground mt-2">
                      {clientsWithTrust}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Deposits This Month</p>
                    <p className="font-heading text-2xl font-bold text-green-600 mt-2">
                      {formatCurrency(monthDeposits)}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60">Withdrawals This Month</p>
                    <p className="font-heading text-2xl font-bold text-red-600 mt-2">
                      {formatCurrency(monthWithdrawals)}
                    </p>
                  </div>
                  <div className="bg-red-100 rounded-full p-3">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Alerts */}
            {complianceAlerts.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-amber-900">Compliance Alerts</h3>
                    <p className="text-sm text-amber-800 mt-1">Review these items to maintain LSO compliance</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {complianceAlerts.map((alert, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-amber-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {complianceAlerts.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading text-green-900 font-bold">All Systems Normal</p>
                  <p className="text-sm text-green-800 mt-1">No compliance issues detected. All client trust balances are healthy.</p>
                </div>
              </div>
            )}

            {/* Legacy-records backfill — one-time migration the
                paralegal runs after the trust/general journal split +
                fileId-fallback fix ships. Idempotent: only patches
                rows that are missing the new fields. */}
            <div className="bg-white border border-amber-200 rounded-lg p-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Backfill Legacy Records</p>
                    <p className="text-sm text-foreground/70 mt-1 max-w-xl">
                      One-time migration that adds <code className="px-1 bg-foreground/5 rounded text-xs">journalType</code> and <code className="px-1 bg-foreground/5 rounded text-xs">fileId</code> to financialrecords rows created before those columns existed. Run this once after deploying the LSO compliance update so the client file Financial Records section and the Month-End Wizard validators pick up your existing data. Safe to run twice.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleBackfillLegacy}
                  disabled={isBackfilling}
                  variant="outline"
                  className="border-amber-400 text-amber-800 hover:bg-amber-50"
                >
                  {isBackfilling ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Backfilling…
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Run backfill
                    </>
                  )}
                </Button>
              </div>
              {backfillReport && (
                <pre className="mt-4 p-3 bg-foreground/5 border border-foreground/10 rounded text-xs font-mono whitespace-pre-wrap text-foreground/80">
                  {backfillReport}
                </pre>
              )}
            </div>

            {/* Client Trust Balances Table */}
            <div className="bg-white rounded-lg border border-foreground/10 overflow-hidden">
              <div className="p-6 border-b border-foreground/10">
                <h2 className="font-heading text-xl font-bold text-foreground">Client Trust Balances</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-foreground/5 border-b border-foreground/10">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Client Name</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">File Number</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Matter Type</th>
                      <th className="px-6 py-3 text-right font-semibold text-foreground/70">Trust Balance</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Last Transaction</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {clientTrustBalances.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                          No trust accounts yet. Records will appear here as transactions are added.
                        </td>
                      </tr>
                    ) : (
                      clientTrustBalances.map(balance => (
                        <tr key={balance.clientId} className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{balance.clientName}</td>
                          <td className="px-6 py-4 text-foreground/70">{balance.fileNumber}</td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="font-paragraph">
                              {balance.matterType}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right font-semibold">{formatCurrency(balance.balance)}</td>
                          <td className="px-6 py-4 text-foreground/70">{balance.lastTransactionDate || '—'}</td>
                          <td className="px-6 py-4">
                            {balance.status === 'positive' && (
                              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                            )}
                            {balance.status === 'low' && (
                              <Badge className="bg-amber-100 text-amber-800">Low Balance</Badge>
                            )}
                            {balance.status === 'negative' && (
                              <Badge className="bg-red-100 text-red-800">Negative</Badge>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setTransactionType('trust_deposit');
                  setShowTransactionDialog(true);
                }}
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Record Deposit
              </Button>
              <Button
                onClick={() => {
                  setTransactionType('trust_withdrawal');
                  setShowTransactionDialog(true);
                }}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Record Withdrawal
              </Button>
              <Button
                onClick={() => {
                  setTransactionType('transfer');
                  setShowTransactionDialog(true);
                }}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Transfer to General
              </Button>
            </div>
          </TabsContent>

          {/* ============================================================
              TAB 2: TRANSACTION JOURNAL — Trust Account (Form 9A) /
              General Account (Form 9D equivalent). LSO By-Law 9
              requires these to be kept as separate books of account
              even when stored in the same database. The toggle below
              switches the view + the running balance computation.
              ============================================================ */}
          <TabsContent value="journal" className="space-y-6">
            {/* Trust vs General toggle */}
            <div className="bg-white rounded-lg border border-foreground/10 p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setJournalScope('trust')}
                  className={
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors ' +
                    (journalScope === 'trust'
                      ? 'bg-primary text-white shadow'
                      : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10')
                  }
                >
                  Trust Account Journal (Form 9A)
                </button>
                <button
                  type="button"
                  onClick={() => setJournalScope('general')}
                  className={
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors ' +
                    (journalScope === 'general'
                      ? 'bg-primary text-white shadow'
                      : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10')
                  }
                >
                  General Account Journal (Form 9D)
                </button>
              </div>
              <p className="text-xs text-foreground/60 max-w-md">
                {journalScope === 'trust'
                  ? 'Trust account movements only — receipts, disbursements, and transfers to General. Money held on behalf of clients.'
                  : 'General account movements — paralegal pay-outs, office expenses, fees billed and collected directly, refunds from general.'}
              </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-foreground/10 p-6 space-y-4">
              <h3 className="font-heading text-lg font-bold text-foreground">Filters & Search</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
                  <Input
                    type="date"
                    value={journalDateFrom}
                    onChange={e => setJournalDateFrom(e.target.value)}
                    className="font-paragraph"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                  <Input
                    type="date"
                    value={journalDateTo}
                    onChange={e => setJournalDateTo(e.target.value)}
                    className="font-paragraph"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Transaction Type</label>
                  <select
                    value={journalTypeFilter}
                    onChange={e => setJournalTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">All Types</option>
                    {TRANSACTION_TYPES.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Client</label>
                  <select
                    value={journalClientFilter}
                    onChange={e => setJournalClientFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">All Clients</option>
                    {clientTrustBalances.map(b => (
                      <option key={b.clientId} value={b.clientId}>
                        {b.clientName} ({b.fileNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Search Description</label>
                  <Input
                    type="text"
                    placeholder="Description or reference number..."
                    value={journalSearch}
                    onChange={e => setJournalSearch(e.target.value)}
                    className="font-paragraph"
                  />
                </div>
              </div>
            </div>

            {/* Journal Table */}
            <div className="bg-white rounded-lg border border-foreground/10 overflow-hidden">
              <div className="p-6 border-b border-foreground/10 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">Transaction Journal</h3>
                  <p className="text-sm text-foreground/60 mt-1">{journalRecords.length} records</p>
                </div>
                <Button
                  onClick={() => setShowTransactionDialog(true)}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-foreground/5 border-b border-foreground/10">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Date</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Client</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">File #</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Type</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Description</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Ref #</th>
                      <th className="px-6 py-3 text-right font-semibold text-foreground/70">Debit</th>
                      <th className="px-6 py-3 text-right font-semibold text-foreground/70">Credit</th>
                      <th className="px-6 py-3 text-right font-semibold text-foreground/70">Balance</th>
                      <th className="px-6 py-3 text-center font-semibold text-foreground/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {journalRecords.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-8 text-center text-foreground/60">
                          No transactions match your filters
                        </td>
                      </tr>
                    ) : (
                      journalRunningBalances && journalRecords.map((record, idx) => {
                        const client = clientFiles.find(f => f.clientId === record.clientId);
                        const sign = getTransactionSign(record.transactionType);
                        const amount = record.amount || 0;
                        // Chronological running balance pre-computed once
                        // for the whole journal; same value regardless of
                        // how the table is sorted/filtered for display.
                        const balance = journalRunningBalances.get(record._id || '') ?? 0;

                        return (
                          <tr key={record._id} className="hover:bg-foreground/5 transition-colors">
                            <td className="px-6 py-4 text-foreground/70">{formatDate(record.transactionDate)}</td>
                            <td className="px-6 py-4 font-medium text-foreground">{client?.clientName || '—'}</td>
                            <td className="px-6 py-4 text-foreground/70">{client?.fileNumber || '—'}</td>
                            <td className="px-6 py-4">
                              <Badge className={getTransactionTypeColor(record.transactionType || '')}>
                                {getTransactionTypeLabel(record.transactionType || '')}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-foreground/70 max-w-xs truncate">{record.description || '—'}</td>
                            <td className="px-6 py-4 text-foreground/70">{record.referenceNumber || '—'}</td>
                            <td className="px-6 py-4 text-right text-foreground/70">
                              {sign === '-' ? formatCurrency(amount) : '—'}
                            </td>
                            <td className="px-6 py-4 text-right text-foreground/70">
                              {sign === '+' ? formatCurrency(amount) : '—'}
                            </td>
                            <td className="px-6 py-4 text-right font-semibold text-foreground">{formatCurrency(balance)}</td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => confirmDelete(record)}
                                className="p-1.5 rounded-md hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                                title="Delete transaction"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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

          {/* ============================================================
              TAB 3: CLIENT TRUST LEDGERS (FORM 9B)
              ============================================================ */}
          <TabsContent value="ledgers" className="space-y-6">
            {/* Client Selector */}
            <div className="bg-white rounded-lg border border-foreground/10 p-6">
              <label className="block text-sm font-medium text-foreground mb-2">Select Client</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by client name or file number..."
                  value={ledgerSearchInput}
                  onChange={e => setLedgerSearchInput(e.target.value)}
                  className="font-paragraph"
                />
                {ledgerSearchInput && filteredLedgerOptions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-foreground/20 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredLedgerOptions.map(client => (
                      <button
                        key={client._id}
                        onClick={() => {
                          setSelectedLedgerClient(client);
                          setLedgerSearchInput('');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-foreground/5 transition-colors border-b border-foreground/10 last:border-b-0"
                      >
                        <div className="font-medium text-foreground">{client.clientName}</div>
                        <div className="text-sm text-foreground/60">{client.fileNumber}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedLedgerClient && (
              <>
                {/* Client Ledger Summary */}
                <div className="bg-white rounded-lg border border-foreground/10 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    Ledger for {selectedLedgerClient.clientName}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-foreground/5 rounded-lg p-4">
                      <p className="text-sm text-foreground/60">File Number</p>
                      <p className="font-semibold text-foreground mt-1">{selectedLedgerClient.fileNumber}</p>
                    </div>
                    <div className="bg-foreground/5 rounded-lg p-4">
                      <p className="text-sm text-foreground/60">Matter Type</p>
                      <p className="font-semibold text-foreground mt-1">{selectedLedgerClient.matterType || '—'}</p>
                    </div>
                    <div className="bg-foreground/5 rounded-lg p-4">
                      <p className="text-sm text-foreground/60">Status</p>
                      <Badge className="mt-1" variant="outline">
                        {selectedLedgerClient.fileStatus || 'active'}
                      </Badge>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-green-600">Current Balance</p>
                      <p className="font-heading text-xl font-bold text-green-700 mt-1">
                        {formatCurrency(ledgerRecords.reduce((bal, r) => {
                          const sign = getTransactionSign(r.transactionType);
                          if (sign === '+') return bal + (r.amount || 0);
                          if (sign === '-') return bal - (r.amount || 0);
                          return bal;
                        }, 0))}
                      </p>
                    </div>
                  </div>

                  {/* Ledger Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground/5 border-b border-foreground/10">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-foreground/70">Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground/70">Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground/70">Description</th>
                          <th className="px-4 py-3 text-left font-semibold text-foreground/70">Reference</th>
                          <th className="px-4 py-3 text-right font-semibold text-foreground/70">Debit</th>
                          <th className="px-4 py-3 text-right font-semibold text-foreground/70">Credit</th>
                          <th className="px-4 py-3 text-right font-semibold text-foreground/70">Balance</th>
                          <th className="px-4 py-3 text-center font-semibold text-foreground/70">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-foreground/10">
                        {ledgerRecords.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="px-4 py-8 text-center text-foreground/60">
                              No transactions for this client
                            </td>
                          </tr>
                        ) : (
                          ledgerRecords.map((record, idx) => {
                            const sign = getTransactionSign(record.transactionType);
                            const amount = record.amount || 0;
                            const balance = ledgerRecords.slice(0, idx + 1).reduce((bal, r) => {
                              const s = getTransactionSign(r.transactionType);
                              if (s === '+') return bal + (r.amount || 0);
                              if (s === '-') return bal - (r.amount || 0);
                              return bal;
                            }, 0);

                            return (
                              <tr key={record._id} className="hover:bg-foreground/5 transition-colors">
                                <td className="px-4 py-3 text-foreground/70">{formatDate(record.transactionDate)}</td>
                                <td className="px-4 py-3">
                                  <Badge className={getTransactionTypeColor(record.transactionType || '')}>
                                    {getTransactionTypeLabel(record.transactionType || '')}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-foreground/70 max-w-xs truncate">{record.description || '—'}</td>
                                <td className="px-4 py-3 text-foreground/70">{record.referenceNumber || '—'}</td>
                                <td className="px-4 py-3 text-right text-foreground/70">
                                  {sign === '-' ? formatCurrency(amount) : '—'}
                                </td>
                                <td className="px-4 py-3 text-right text-foreground/70">
                                  {sign === '+' ? formatCurrency(amount) : '—'}
                                </td>
                                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(balance)}</td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => confirmDelete(record)}
                                    className="p-1.5 rounded-md hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                                    title="Delete transaction"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {!selectedLedgerClient && (
              <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-12 text-center">
                <Eye className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                <p className="text-foreground/60">Select a client above to view their trust ledger</p>
              </div>
            )}
          </TabsContent>

          {/* ============================================================
              TAB 4: MONTHLY RECONCILIATION (FORM 9C)
              ============================================================ */}
          <TabsContent value="reconciliation" className="space-y-6">
            {/* Month/Year Selector */}
            <div className="bg-white rounded-lg border border-foreground/10 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Select Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Month</label>
                  <select
                    value={reconciliationMonth}
                    onChange={e => setReconciliationMonth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                      <option key={m} value={m}>
                        {new Date(2024, m - 1).toLocaleDateString('en-CA', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                  <select
                    value={reconciliationYear}
                    onChange={e => setReconciliationYear(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {[2024, 2025, 2026, 2027].map(y => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reconciliation Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bank Statement Column */}
              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Per Bank Statement</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bank Statement Balance *</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={bankStatementBalance}
                      onChange={e => setBankStatementBalance(e.target.value)}
                      className="font-paragraph"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Outstanding Deposits</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={outstandingDeposits}
                      onChange={e => setOutstandingDeposits(e.target.value)}
                      className="font-paragraph"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Outstanding Cheques</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={outstandingCheques}
                      onChange={e => setOutstandingCheques(e.target.value)}
                      className="font-paragraph"
                    />
                  </div>

                  <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                    <p className="text-sm text-foreground/60">Reconciled Total</p>
                    <p className="font-heading text-xl font-bold text-foreground mt-1">
                      {formatCurrency(
                        (parseFloat(bankStatementBalance) || 0) +
                        (parseFloat(outstandingDeposits) || 0) -
                        (parseFloat(outstandingCheques) || 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Ledgers Column */}
              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Per Client Ledgers</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Total Client Trust Balance</p>
                    <p className="font-heading text-2xl font-bold text-foreground">
                      {formatCurrency(clientTrustBalances.reduce((sum, b) => sum + b.balance, 0))}
                    </p>
                  </div>

                  <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                    <p className="text-sm text-foreground/60">Breakdown</p>
                    <ul className="text-sm text-foreground/70 mt-2 space-y-1">
                      <li>Clients with trust funds: {clientsWithTrust}</li>
                      <li>Transactions recorded: {financialRecords.filter(r => r.transactionType !== 'reconciliation').length}</li>
                    </ul>
                  </div>

                  {currentReconciliation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-600">
                        Last reconciliation: {currentReconciliation.recordedDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reconciliation Status */}
            {bankStatementBalance && (
              <div className="bg-white rounded-lg border border-foreground/10 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Reconciliation Status</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-foreground/5 rounded-lg p-4">
                    <p className="text-sm text-foreground/60">Bank Reconciled Total</p>
                    <p className="font-heading text-lg font-bold text-foreground mt-1">
                      {formatCurrency(
                        (parseFloat(bankStatementBalance) || 0) +
                        (parseFloat(outstandingDeposits) || 0) -
                        (parseFloat(outstandingCheques) || 0)
                      )}
                    </p>
                  </div>

                  <div className="bg-foreground/5 rounded-lg p-4">
                    <p className="text-sm text-foreground/60">Client Ledgers Total</p>
                    <p className="font-heading text-lg font-bold text-foreground mt-1">
                      {formatCurrency(clientTrustBalances.reduce((sum, b) => sum + b.balance, 0))}
                    </p>
                  </div>

                  <div className={`rounded-lg p-4 border-2 ${
                    Math.abs(
                      (parseFloat(bankStatementBalance) || 0) +
                      (parseFloat(outstandingDeposits) || 0) -
                      (parseFloat(outstandingCheques) || 0) -
                      clientTrustBalances.reduce((sum, b) => sum + b.balance, 0)
                    ) < 0.01
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-sm font-medium">
                      {Math.abs(
                        (parseFloat(bankStatementBalance) || 0) +
                        (parseFloat(outstandingDeposits) || 0) -
                        (parseFloat(outstandingCheques) || 0) -
                        clientTrustBalances.reduce((sum, b) => sum + b.balance, 0)
                      ) < 0.01
                        ? 'Status: BALANCED'
                        : 'Discrepancy'}
                    </p>
                    <p className={`font-heading text-lg font-bold mt-1 ${
                      Math.abs(
                        (parseFloat(bankStatementBalance) || 0) +
                        (parseFloat(outstandingDeposits) || 0) -
                        (parseFloat(outstandingCheques) || 0) -
                        clientTrustBalances.reduce((sum, b) => sum + b.balance, 0)
                      ) < 0.01
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {formatCurrency(
                        (parseFloat(bankStatementBalance) || 0) +
                        (parseFloat(outstandingDeposits) || 0) -
                        (parseFloat(outstandingCheques) || 0) -
                        clientTrustBalances.reduce((sum, b) => sum + b.balance, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Reconciliation Button */}
            {bankStatementBalance && (
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveReconciliation}
                  disabled={savingReconciliation}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {savingReconciliation && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Reconciliation
                </Button>
              </div>
            )}

            {reconciliationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800">{reconciliationError}</p>
                </div>
              </div>
            )}

            {/* Reconciliation History */}
            {reconciliationHistory.length > 0 && (
              <div className="bg-white rounded-lg border border-foreground/10 overflow-hidden">
                <div className="p-6 border-b border-foreground/10">
                  <h3 className="font-heading text-lg font-bold text-foreground">Reconciliation History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-foreground/5 border-b border-foreground/10">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-foreground/70">Period</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground/70">Bank Balance</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground/70">Client Ledgers</th>
                        <th className="px-6 py-3 text-right font-semibold text-foreground/70">Discrepancy</th>
                        <th className="px-6 py-3 text-left font-semibold text-foreground/70">Status</th>
                        <th className="px-6 py-3 text-left font-semibold text-foreground/70">Recorded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/10">
                      {reconciliationHistory.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">
                            {new Date(2024, rec.month - 1).toLocaleDateString('en-CA', { month: 'long' })} {rec.year}
                          </td>
                          <td className="px-6 py-4 text-right text-foreground/70">{formatCurrency(rec.bankStatementBalance)}</td>
                          <td className="px-6 py-4 text-right text-foreground/70">{formatCurrency(rec.clientLedgersTotal)}</td>
                          <td className="px-6 py-4 text-right font-medium">{formatCurrency(rec.discrepancy)}</td>
                          <td className="px-6 py-4">
                            {rec.balanced ? (
                              <Badge className="bg-green-100 text-green-800">Balanced</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Discrepancy</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 text-foreground/70">{rec.recordedDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Monthly Automation Section */}
            <div className="bg-white rounded-lg border border-foreground/10 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">Monthly Reconciliation Reminder</h3>
                  <p className="text-sm text-foreground/60 font-paragraph mb-3">
                    LSO By-Law 9 requires monthly trust account reconciliation. Set up an automated monthly reminder
                    to reconcile your trust account at the beginning of each month.
                  </p>
                  <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground font-paragraph">Auto-generate monthly snapshot</p>
                        <p className="text-xs text-foreground/50 font-paragraph">
                          Creates a reconciliation record with current client ledger totals on the 1st of each month.
                          You still need to enter the bank statement balance and verify manually.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={async () => {
                          // Generate a snapshot reconciliation for current month
                          const clientLedgersTotal = clientTrustBalances.reduce((sum, b) => sum + b.balance, 0);
                          const now = new Date();
                          const monthName = now.toLocaleDateString('en-CA', { month: 'long' });

                          try {
                            const reconciliationData: ReconciliationRecord = {
                              month: now.getMonth() + 1,
                              year: now.getFullYear(),
                              bankStatementBalance: 0,
                              outstandingDeposits: 0,
                              outstandingCheques: 0,
                              clientLedgersTotal,
                              balanced: false,
                              discrepancy: 0 - clientLedgersTotal,
                              recordedDate: formatDate(now),
                            };

                            await BaseCrudService.create('financialrecords', {
                              transactionType: 'reconciliation',
                              transactionDate: now,
                              description: JSON.stringify(reconciliationData),
                              recordedBy: 'Auto-snapshot',
                            });

                            setFeedback({ type: 'success', message: `${monthName} ${now.getFullYear()} snapshot created. Enter bank balance to complete.` });
                            await loadData();
                          } catch (error: any) {
                            setFeedback({ type: 'error', message: error?.message || 'Failed to create snapshot.' });
                          }
                        }}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <CalendarClock className="w-4 h-4 mr-2" />
                        Generate This Month's Snapshot
                      </Button>
                      <p className="text-xs text-foreground/40 font-paragraph">
                        Client ledger total: <span className="font-mono font-bold">{formatCurrency(clientTrustBalances.reduce((sum, b) => sum + b.balance, 0))}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ============================================================
          ADD TRANSACTION DIALOG
          ============================================================ */}
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {transactionType === 'trust_deposit'
                ? 'Record Trust Deposit'
                : transactionType === 'trust_withdrawal'
                ? 'Record Trust Withdrawal'
                : transactionType === 'transfer'
                ? 'Record Transfer to General'
                : 'Record Transaction'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Client Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Client *</label>
              <select
                value={selectedClient?._id || ''}
                onChange={e => {
                  const client = clientFiles.find(f => f._id === e.target.value);
                  setSelectedClient(client || null);
                }}
                className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">— Select a client —</option>
                {clientFiles.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.clientName} ({client.fileNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transaction Type *</label>
              <select
                value={transactionType}
                onChange={e => setTransactionType(e.target.value)}
                className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {TRANSACTION_TYPES.map(t => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amount (CAD) *</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={transactionAmount}
                onChange={e => setTransactionAmount(e.target.value)}
                className="font-paragraph"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transaction Date *</label>
              <Input
                type="date"
                value={transactionDate}
                onChange={e => setTransactionDate(e.target.value)}
                className="font-paragraph"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Input
                type="text"
                placeholder="e.g., Client payment for legal fees"
                value={transactionDescription}
                onChange={e => setTransactionDescription(e.target.value)}
                className="font-paragraph"
              />
            </div>

            {/* Reference Number — REQUIRED for Trust→General transfers
                under LSO By-Law 9 s. 18(8) (every transfer must
                reference the invoice or fee bill that authorises it). */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reference Number
                {transactionType === 'transfer' && (
                  <span className="text-red-600"> * required (invoice or fee-bill number)</span>
                )}
              </label>
              <Input
                type="text"
                placeholder={
                  transactionType === 'transfer'
                    ? 'Invoice or fee-bill number authorising this transfer'
                    : 'e.g., Cheque #1234, Invoice #INV-001'
                }
                value={transactionRefNumber}
                onChange={e => setTransactionRefNumber(e.target.value)}
                className="font-paragraph"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
              <select
                value={transactionPaymentMethod}
                onChange={e => setTransactionPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-foreground/20 rounded-md font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {PAYMENT_METHODS.map(m => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {transactionError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{transactionError}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransactionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTransaction}
              disabled={savingTransaction}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {savingTransaction && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          {deleteTarget && (
            <div className="space-y-3 font-paragraph">
              <p className="text-sm text-foreground/70">
                Are you sure you want to permanently delete this transaction? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Type:</span>
                  <Badge className={getTransactionTypeColor(deleteTarget.transactionType || '')}>
                    {getTransactionTypeLabel(deleteTarget.transactionType || '')}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Amount:</span>
                  <span className="font-mono font-bold text-foreground">{formatCurrency(deleteTarget.amount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Date:</span>
                  <span className="text-foreground">{formatDate(deleteTarget.transactionDate)}</span>
                </div>
                {deleteTarget.description && (
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Description:</span>
                    <span className="text-foreground truncate max-w-[200px]">{deleteTarget.description}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-red-600 font-medium">
                Warning: Deleting trust account transactions affects running balances and may impact your LSO By-Law 9 compliance records.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => { setShowDeleteConfirm(false); setDeleteTarget(null); }}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTransaction}
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-paragraph ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {feedback.message}
        </div>
      )}
    </div>
  );
}
