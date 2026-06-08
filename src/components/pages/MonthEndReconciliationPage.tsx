/**
 * Month-End Reconciliation Wizard — /admin/month-end-reconciliation
 *
 * LSO By-Law 9 compliant month-end reconciliation flow that walks the
 * paralegal through:
 *
 *   1. Period selection (month + year)
 *   2. Validation scan of the trust journal for the period:
 *        V1 Trust→General transfers carry an invoice/fee-bill reference
 *           (By-Law 9 s.18(8)).
 *        V2 No client trust balance is negative.
 *        V3 Sum of per-client trust balances equals the running trust
 *           journal at period end (cross-foot).
 *        V4 Trust receipts ≥ $7,500 carry a paymentMethod.
 *        V5 No trust-journal row has clientId empty (trust money must
 *           be tied to a client).
 *        V6 Every Square `payments` row in the period has a matching
 *           `financialrecords` row by squarePaymentId.
 *        V7 Disbursements and trust withdrawals carry a referenceNumber.
 *        V8 No reconciliation snapshot for the chosen month/year yet
 *           (warning only — paralegal may be re-reconciling).
 *   3. Fix prompts — inline edit / acknowledge for each violation.
 *   4. Bank statement entry — Bank balance ± outstandings vs. ledger.
 *   5. Lock & snapshot — writes a single financialrecords row of
 *      transactionType=`reconciliation` with the structured JSON in
 *      `description`, mirroring TrustAccountingPage's 9C tab.
 *
 * Writes only via BaseCrudService.create / .update on
 * `financialrecords`. No new collections.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle, Loader2,
  ChevronRight, ChevronLeft, RefreshCw, Lock, Printer, FileText, Search,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { isAuthenticated, isAdmin } from '@/lib/auth-service';
import { getDefaultParalegal } from '@/lib/paralegals';
import { generateForm9EPdf, type Form9ERow } from '@/lib/form9e-generator';

// ============================================================
// TYPES
// ============================================================

interface FinancialRecord {
  _id: string;
  _createdDate?: Date | string;
  clientId?: string;
  fileId?: string;
  transactionType?: string;
  journalType?: 'trust' | 'general' | string;
  amount?: number;
  transactionDate?: Date | string;
  description?: string;
  referenceNumber?: string;
  paymentMethod?: string;
  recordedBy?: string;
  squarePaymentId?: string;
}

interface PaymentRow {
  _id: string;
  squarePaymentId?: string;
  amountCents?: number;
  paymentType?: string;
  clientId?: string;
  clientName?: string;
  processedAt?: string;
  _createdDate?: Date | string;
}

interface ClientFileRow {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  matterType?: string;
  fileStatus?: string;
}

type Severity = 'error' | 'warning' | 'ok';

interface ValidatorIssue {
  /** stable per-row key for the fix-prompt UI */
  key: string;
  recordId?: string;
  paymentId?: string;
  clientId?: string;
  description: string;
  detail?: string;
  amount?: number;
}

interface ValidatorResult {
  id: 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8';
  label: string;
  byLaw: string;
  severity: Severity;
  passed: boolean;
  issues: ValidatorIssue[];
  /** validator-specific extra payload (e.g. discrepancy amount) */
  meta?: Record<string, any>;
}

// Trust-journal transaction types (no `reconciliation`).
const TRUST_RECEIPT_TYPES = new Set(['trust_deposit', 'payment', 'billing']);
const TRUST_DEBIT_TYPES = new Set([
  'trust_withdrawal',
  'disbursement',
  'refund',
  'transfer',
]);

const CASH_THRESHOLD = 7500; // LSO cash-handling threshold ($CAD)

// ============================================================
// UTILITIES
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

function lastDayOfMonth(year: number, month1Based: number): Date {
  // month1Based: 1 = Jan ... 12 = Dec
  return new Date(year, month1Based, 0, 23, 59, 59, 999);
}

function isInPeriod(
  record: { transactionDate?: Date | string; _createdDate?: Date | string },
  year: number,
  month1Based: number,
): boolean {
  const raw = record.transactionDate || record._createdDate;
  if (!raw) return false;
  const d = typeof raw === 'string' ? new Date(raw) : raw;
  if (Number.isNaN(d.getTime())) return false;
  return d.getFullYear() === year && d.getMonth() + 1 === month1Based;
}

function parseJSONSafely(str: string): any {
  try { return JSON.parse(str); } catch { return null; }
}

/**
 * Treat any row without an explicit journalType but with a
 * trust-relevant transactionType as belonging to the Trust journal
 * (backwards-compat with rows written before journalType was added).
 */
function isTrustJournalRow(r: FinancialRecord): boolean {
  if (r.journalType === 'trust') return true;
  if (r.journalType === 'general') return false;
  // Legacy rows: anything with a trust-relevant type defaults to trust.
  const t = r.transactionType || '';
  return (
    TRUST_RECEIPT_TYPES.has(t) ||
    TRUST_DEBIT_TYPES.has(t) ||
    t === 'reconciliation'
  );
}

// ============================================================
// COMPONENT
// ============================================================

type Step = 1 | 2 | 3 | 4 | 5;

export default function MonthEndReconciliationPage() {
  const navigate = useNavigate();

  // Auth gate.
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
      return;
    }
    if (!isAdmin()) {
      navigate('/client-dashboard');
    }
  }, [navigate]);

  // ----- Step state -----
  const [step, setStep] = useState<Step>(1);

  // ----- Period -----
  const now = new Date();
  // Default: previous calendar month, current year (Dec → Nov last year).
  const defaultMonth = now.getMonth() === 0 ? 12 : now.getMonth(); // 1-indexed
  const defaultYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const [month, setMonth] = useState<number>(defaultMonth);
  const [year, setYear] = useState<number>(defaultYear);

  // ----- Data -----
  const [allRecords, setAllRecords] = useState<FinancialRecord[]>([]);
  const [allPayments, setAllPayments] = useState<PaymentRow[]>([]);
  const [clientFiles, setClientFiles] = useState<ClientFileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>('');

  // ----- Validators -----
  const [validators, setValidators] = useState<ValidatorResult[]>([]);
  const [acknowledged, setAcknowledged] = useState<Record<string, string>>({});
  // Map of issue.key → in-flight fix value to remember what user typed.
  const [fixDrafts, setFixDrafts] = useState<Record<string, string>>({});
  const [savingFix, setSavingFix] = useState<Record<string, boolean>>({});

  // ----- Bank entry (Step 4) -----
  const [bankStatementBalance, setBankStatementBalance] = useState<string>('');
  const [outstandingDeposits, setOutstandingDeposits] = useState<string>('0');
  const [outstandingCheques, setOutstandingCheques] = useState<string>('0');

  // ----- Lock state (Step 5) -----
  const [locking, setLocking] = useState(false);
  const [lockError, setLockError] = useState<string>('');
  const [lockedSnapshot, setLockedSnapshot] = useState<any | null>(null);

  // ============================================================
  // LOAD DATA — Step 1 → 2 transition
  // ============================================================

  async function loadData() {
    setLoading(true);
    setLoadError('');
    try {
      const [finRes, payRes, filesRes] = await Promise.all([
        BaseCrudService.getAllPages<FinancialRecord>('financialrecords'),
        // payments collection may not exist on older deployments — guard
        BaseCrudService.getAllPages<PaymentRow>('payments').catch(() => ({ items: [] as PaymentRow[] })),
        BaseCrudService.getAllPages<ClientFileRow>('clientfiles'),
      ]);
      setAllRecords(finRes.items || []);
      setAllPayments(((payRes as any).items || []) as PaymentRow[]);
      setClientFiles(filesRes.items || []);
    } catch (err: any) {
      setLoadError(err?.message || 'Failed to load financial data.');
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // PERIOD-FILTERED DATA
  // ============================================================

  const trustRecordsAll = useMemo(
    () => allRecords.filter(isTrustJournalRow),
    [allRecords]
  );

  const trustRecordsThroughPeriodEnd = useMemo(() => {
    const end = lastDayOfMonth(year, month).getTime();
    return trustRecordsAll.filter((r) => {
      const raw = r.transactionDate || r._createdDate;
      if (!raw) return false;
      const d = typeof raw === 'string' ? new Date(raw) : raw;
      if (Number.isNaN(d.getTime())) return false;
      return d.getTime() <= end && r.transactionType !== 'reconciliation';
    });
  }, [trustRecordsAll, year, month]);

  const periodRecords = useMemo(
    () => allRecords.filter((r) => isInPeriod(r, year, month)),
    [allRecords, year, month]
  );

  const periodTrustRecords = useMemo(
    () => periodRecords.filter(isTrustJournalRow).filter(
      (r) => r.transactionType !== 'reconciliation'
    ),
    [periodRecords]
  );

  const periodPayments = useMemo(
    () => allPayments.filter((p) => {
      const raw = p.processedAt || p._createdDate;
      if (!raw) return false;
      const d = typeof raw === 'string' ? new Date(raw) : raw;
      if (Number.isNaN(d.getTime())) return false;
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    }),
    [allPayments, year, month]
  );

  // ----- Per-client trust balance computed from journal at end of period -----
  const perClientBalances = useMemo(() => {
    const map = new Map<string, { clientId: string; clientName: string; balance: number }>();
    for (const r of trustRecordsThroughPeriodEnd) {
      if (!r.clientId) continue;
      const t = r.transactionType || '';
      const amt = r.amount || 0;
      let delta = 0;
      if (TRUST_RECEIPT_TYPES.has(t)) delta = amt;
      else if (TRUST_DEBIT_TYPES.has(t)) delta = -amt;
      if (!map.has(r.clientId)) {
        const file = clientFiles.find((f) => f.clientId === r.clientId);
        map.set(r.clientId, {
          clientId: r.clientId,
          clientName: file?.clientName || 'Unknown client',
          balance: 0,
        });
      }
      map.get(r.clientId)!.balance += delta;
    }
    return Array.from(map.values());
  }, [trustRecordsThroughPeriodEnd, clientFiles]);

  const perClientLedgerTotal = useMemo(
    () => perClientBalances.reduce((s, b) => s + b.balance, 0),
    [perClientBalances]
  );

  // --------------------------------------------------------------
  // Form 9E rows — opening / deposits / withdrawals / closing for
  // each client active during the selected period. Built off the
  // same trust-journal data the rest of the wizard uses so the
  // PDF cross-foots the locked snapshot exactly. By-Law 9 s.18(10).
  // --------------------------------------------------------------
  const form9eRows = useMemo<Form9ERow[]>(() => {
    const periodStart = new Date(year, month - 1, 1).getTime();
    // Walk the journal in chronological order; before-period rows
    // accumulate into `opening`, in-period rows into deposits or
    // withdrawals. closing = opening + deposits − withdrawals.
    const map = new Map<string, Form9ERow>();
    for (const r of trustRecordsThroughPeriodEnd) {
      if (!r.clientId) continue;
      const t = r.transactionType || '';
      const amt = r.amount || 0;
      const isReceipt = TRUST_RECEIPT_TYPES.has(t);
      const isDebit = TRUST_DEBIT_TYPES.has(t);
      if (!isReceipt && !isDebit) continue;
      const raw = r.transactionDate || r._createdDate;
      const rowDate = raw ? new Date(raw as any).getTime() : 0;
      const inPeriod = rowDate >= periodStart;

      if (!map.has(r.clientId)) {
        const file = clientFiles.find((f) => f.clientId === r.clientId);
        map.set(r.clientId, {
          clientId: r.clientId,
          clientName: file?.clientName || 'Unknown client',
          openingBalance: 0,
          deposits: 0,
          withdrawals: 0,
          closingBalance: 0,
        });
      }
      const row = map.get(r.clientId)!;
      if (!inPeriod) {
        // Before-period activity rolls into opening.
        row.openingBalance += isReceipt ? amt : -amt;
      } else if (isReceipt) {
        row.deposits += amt;
      } else {
        row.withdrawals += amt;
      }
    }
    // Compute closing and drop rows where everything is zero (no
    // activity during or before the period — nothing to list).
    const rows = Array.from(map.values())
      .map((r) => ({
        ...r,
        closingBalance: r.openingBalance + r.deposits - r.withdrawals,
      }))
      .filter(
        (r) =>
          Math.abs(r.openingBalance) > 0.005 ||
          Math.abs(r.deposits) > 0.005 ||
          Math.abs(r.withdrawals) > 0.005 ||
          Math.abs(r.closingBalance) > 0.005,
      )
      .sort((a, b) => a.clientName.localeCompare(b.clientName));
    return rows;
  }, [trustRecordsThroughPeriodEnd, clientFiles, year, month]);

  const [generatingForm9E, setGeneratingForm9E] = useState(false);
  const [form9eError, setForm9eError] = useState<string>('');

  async function handleGenerateForm9E() {
    setGeneratingForm9E(true);
    setForm9eError('');
    try {
      await generateForm9EPdf({
        month,
        year,
        periodEndDate: lastDayOfMonth(year, month),
        rows: form9eRows,
        paralegalName: getDefaultParalegal().displayName,
        paralegalLicense: getDefaultParalegal().lsoNumber,
      });
    } catch (err: any) {
      setForm9eError(err?.message || 'Failed to generate Form 9E PDF.');
    } finally {
      setGeneratingForm9E(false);
    }
  }

  // Running journal total at end of period (cross-foot reference).
  const journalEndingTotal = useMemo(() => {
    let total = 0;
    for (const r of trustRecordsThroughPeriodEnd) {
      const t = r.transactionType || '';
      const amt = r.amount || 0;
      if (TRUST_RECEIPT_TYPES.has(t)) total += amt;
      else if (TRUST_DEBIT_TYPES.has(t)) total -= amt;
    }
    return total;
  }, [trustRecordsThroughPeriodEnd]);

  function clientNameFor(clientId?: string): string {
    if (!clientId) return 'Unknown client';
    const f = clientFiles.find((f) => f.clientId === clientId);
    return f?.clientName || 'Unknown client';
  }

  // ============================================================
  // RUN VALIDATORS
  // ============================================================

  function runValidators(): ValidatorResult[] {
    const results: ValidatorResult[] = [];

    // V1 — Trust→General transfers need a referenceNumber.
    {
      const issues: ValidatorIssue[] = [];
      for (const r of periodTrustRecords) {
        if (r.transactionType === 'transfer' && !(r.referenceNumber || '').trim()) {
          issues.push({
            key: `V1-${r._id}`,
            recordId: r._id,
            clientId: r.clientId,
            amount: r.amount,
            description: `Transfer for ${clientNameFor(r.clientId)} — ${formatCurrency(r.amount || 0)} on ${formatDate(r.transactionDate)}`,
            detail: 'Missing invoice / fee-bill reference number.',
          });
        }
      }
      results.push({
        id: 'V1',
        label: 'Trust→General transfers carry an invoice reference',
        byLaw: 'LSO By-Law 9 s. 18(8)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V2 — No negative per-client trust balance (whole-firm, through period end).
    {
      const issues: ValidatorIssue[] = [];
      for (const b of perClientBalances) {
        if (b.balance < -0.005) {
          issues.push({
            key: `V2-${b.clientId}`,
            clientId: b.clientId,
            amount: b.balance,
            description: `${b.clientName} — balance ${formatCurrency(b.balance)}`,
            detail: 'Negative trust balance. Funds were drawn against money that was not on deposit.',
          });
        }
      }
      results.push({
        id: 'V2',
        label: 'No client trust balance is negative',
        byLaw: 'LSO By-Law 9 s. 7 (no overdrafts)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V3 — Sum of per-client balances = running journal total at period end.
    {
      const diff = perClientLedgerTotal - journalEndingTotal;
      const passes = Math.abs(diff) < 0.005;
      results.push({
        id: 'V3',
        label: 'Per-client ledger total equals trust journal balance',
        byLaw: 'LSO By-Law 9 s. 19 (monthly cross-foot)',
        severity: passes ? 'ok' : 'error',
        passed: passes,
        issues: passes
          ? []
          : [{
              key: 'V3-crossfoot',
              description: `Per-client total ${formatCurrency(perClientLedgerTotal)} vs. journal total ${formatCurrency(journalEndingTotal)}`,
              detail: `Discrepancy of ${formatCurrency(diff)}. Re-foot the journal or check for orphan entries (missing clientId).`,
            }],
        meta: { difference: diff, perClientLedgerTotal, journalEndingTotal },
      });
    }

    // V4 — Trust receipts ≥ $7,500 must carry a paymentMethod.
    {
      const issues: ValidatorIssue[] = [];
      for (const r of periodTrustRecords) {
        const t = r.transactionType || '';
        const amt = r.amount || 0;
        if (TRUST_RECEIPT_TYPES.has(t) && amt >= CASH_THRESHOLD && !(r.paymentMethod || '').trim()) {
          issues.push({
            key: `V4-${r._id}`,
            recordId: r._id,
            clientId: r.clientId,
            amount: amt,
            description: `${clientNameFor(r.clientId)} — ${formatCurrency(amt)} (${t}) on ${formatDate(r.transactionDate)}`,
            detail: 'Receipt ≥ $7,500 with no paymentMethod recorded.',
          });
        }
      }
      results.push({
        id: 'V4',
        label: 'Trust receipts ≥ $7,500 record a payment method',
        byLaw: 'LSO By-Law 9 (cash-handling threshold)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V5 — No trust-journal row has empty clientId.
    {
      const issues: ValidatorIssue[] = [];
      for (const r of periodTrustRecords) {
        if (!r.clientId || !r.clientId.trim()) {
          issues.push({
            key: `V5-${r._id}`,
            recordId: r._id,
            amount: r.amount,
            description: `${r.transactionType || 'entry'} — ${formatCurrency(r.amount || 0)} on ${formatDate(r.transactionDate)}`,
            detail: 'Trust money must be allocated to a client. Assign a client to remove this from the unallocated bucket.',
          });
        }
      }
      results.push({
        id: 'V5',
        label: 'No trust entry is missing its client tie-in',
        byLaw: 'LSO By-Law 9 s. 18(7) (client identification)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V6 — Square payments have matching financialrecords row.
    {
      const ledgerSquareIds = new Set(
        allRecords
          .map((r) => r.squarePaymentId)
          .filter((v): v is string => !!v && v.length > 0)
      );
      const issues: ValidatorIssue[] = [];
      for (const p of periodPayments) {
        if (!p.squarePaymentId) continue;
        if (!ledgerSquareIds.has(p.squarePaymentId)) {
          issues.push({
            key: `V6-${p._id}`,
            paymentId: p._id,
            clientId: p.clientId,
            amount: typeof p.amountCents === 'number' ? p.amountCents / 100 : undefined,
            description: `Square ${p.squarePaymentId.slice(0, 12)}… — ${p.clientName || p.clientId || 'unknown'} (${p.paymentType || 'payment'})`,
            detail: 'Square payment captured but no matching financialrecords row. Manually add the journal entry from Trust Accounting.',
          });
        }
      }
      results.push({
        id: 'V6',
        label: 'All Square receipts are recorded in the ledger',
        byLaw: 'LSO By-Law 9 s. 18 (receipt journal)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V7 — Disbursements / trust withdrawals carry referenceNumber.
    {
      const issues: ValidatorIssue[] = [];
      for (const r of periodTrustRecords) {
        const t = r.transactionType || '';
        if ((t === 'disbursement' || t === 'trust_withdrawal') && !(r.referenceNumber || '').trim()) {
          issues.push({
            key: `V7-${r._id}`,
            recordId: r._id,
            clientId: r.clientId,
            amount: r.amount,
            description: `${t} — ${clientNameFor(r.clientId)} — ${formatCurrency(r.amount || 0)} on ${formatDate(r.transactionDate)}`,
            detail: 'Missing cheque / EFT reference number.',
          });
        }
      }
      results.push({
        id: 'V7',
        label: 'Disbursements & trust withdrawals carry a reference number',
        byLaw: 'LSO By-Law 9 s. 18 (disbursement journal)',
        severity: issues.length ? 'error' : 'ok',
        passed: issues.length === 0,
        issues,
      });
    }

    // V8 — No existing reconciliation snapshot for this month/year (warning).
    {
      const existing = allRecords.filter((r) => {
        if (r.transactionType !== 'reconciliation' || !r.description) return false;
        const data = parseJSONSafely(r.description);
        return data && data.month === month && data.year === year;
      });
      results.push({
        id: 'V8',
        label: 'No prior reconciliation snapshot for this period',
        byLaw: 'House rule — re-reconciliation guard',
        severity: existing.length ? 'warning' : 'ok',
        passed: existing.length === 0,
        issues: existing.map((r) => ({
          key: `V8-${r._id}`,
          recordId: r._id,
          description: `Existing snapshot recorded ${formatDate(r._createdDate)}`,
          detail: 'A snapshot already exists for this period. Proceeding will write a SECOND snapshot. Acceptable if re-reconciling after corrections; not blocking.',
        })),
      });
    }

    return results;
  }

  // ============================================================
  // STEP TRANSITIONS
  // ============================================================

  async function handleBeginReconciliation() {
    await loadData();
    setStep(2);
  }

  // Re-run validators whenever underlying data or period changes while on
  // Step 2 / 3.
  useEffect(() => {
    if (step >= 2) {
      setValidators(runValidators());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecords, allPayments, clientFiles, year, month, step]);

  // Step 2 → 3 / 4. Critical errors must be either fixed or acknowledged
  // before locking, but the paralegal can advance to Step 3 to start
  // resolving them.
  const allCriticalResolved = useMemo(() => {
    for (const v of validators) {
      if (v.severity !== 'error') continue;
      for (const issue of v.issues) {
        if (!acknowledged[issue.key]) return false;
      }
    }
    return true;
  }, [validators, acknowledged]);

  // ============================================================
  // FIX HANDLERS
  // ============================================================

  async function applyFix(validatorId: ValidatorResult['id'], issue: ValidatorIssue, value: string) {
    if (!issue.recordId) return;
    setSavingFix((m) => ({ ...m, [issue.key]: true }));
    try {
      const update: Record<string, any> = { _id: issue.recordId };
      if (validatorId === 'V1' || validatorId === 'V7') {
        update.referenceNumber = value.trim();
      } else if (validatorId === 'V4') {
        update.paymentMethod = value.trim();
      } else if (validatorId === 'V5') {
        update.clientId = value.trim();
      }
      await BaseCrudService.update('financialrecords', update);
      // Reflect locally so the next run picks it up without a full reload.
      setAllRecords((prev) => prev.map((r) =>
        r._id === issue.recordId ? { ...r, ...update } : r
      ));
      setFixDrafts((m) => { const c = { ...m }; delete c[issue.key]; return c; });
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      alert(`Fix failed: ${err?.message || err}`);
    } finally {
      setSavingFix((m) => { const c = { ...m }; delete c[issue.key]; return c; });
    }
  }

  function acknowledgeIssue(key: string, reason: string) {
    setAcknowledged((m) => ({ ...m, [key]: reason || 'Acknowledged' }));
  }

  function unacknowledgeIssue(key: string) {
    setAcknowledged((m) => { const c = { ...m }; delete c[key]; return c; });
  }

  // ============================================================
  // LOCK & SNAPSHOT — Step 5
  // ============================================================

  async function handleLockPeriod() {
    setLocking(true);
    setLockError('');
    try {
      const bankBal = parseFloat(bankStatementBalance);
      const outDep = parseFloat(outstandingDeposits || '0');
      const outChq = parseFloat(outstandingCheques || '0');
      if (!Number.isFinite(bankBal)) {
        setLockError('Bank statement balance is required.');
        setLocking(false);
        return;
      }
      const reconciledBank = bankBal + outDep - outChq;
      const difference = reconciledBank - perClientLedgerTotal;
      const balanced = Math.abs(difference) < 0.01;
      const validatorsPassedAll = validators.every(
        (v) => v.severity !== 'error' || v.issues.every((i) => acknowledged[i.key])
      );

      const ackList = Object.entries(acknowledged).map(([key, reason]) => ({ key, reason }));

      const snapshot = {
        month,
        year,
        bankStatementBalance: bankBal,
        outstandingDeposits: outDep,
        outstandingCheques: outChq,
        // Mirror TrustAccountingPage 9C field name for cross-compatibility.
        clientLedgersTotal: perClientLedgerTotal,
        perClientLedgerTotal,
        journalEndingTotal,
        reconciledBank,
        difference,
        discrepancy: difference,
        balanced,
        validatorsPassedAll,
        validatorSummary: validators.map((v) => ({
          id: v.id, label: v.label, severity: v.severity, passed: v.passed,
          issueCount: v.issues.length,
        })),
        acknowledgedIssues: ackList,
        recordedDate: formatDate(new Date()),
        recordedBy: getDefaultParalegal().displayName,
      };

      await BaseCrudService.create('financialrecords', {
        _id: crypto.randomUUID(),
        transactionType: 'reconciliation',
        journalType: 'trust',
        amount: 0,
        transactionDate: lastDayOfMonth(year, month),
        description: JSON.stringify(snapshot),
        recordedBy: getDefaultParalegal().displayName,
        _createdDate: new Date(),
      });

      setLockedSnapshot(snapshot);
    } catch (err: any) {
      setLockError(err?.message || 'Failed to write reconciliation snapshot.');
    } finally {
      setLocking(false);
    }
  }

  // ============================================================
  // RENDER HELPERS
  // ============================================================

  const STEP_LABELS: Record<Step, string> = {
    1: 'Period',
    2: 'Validation',
    3: 'Fix Issues',
    4: 'Bank Entry',
    5: 'Lock & Snapshot',
  };

  function ProgressBar() {
    return (
      <div className="flex items-center gap-2 mb-8 overflow-x-auto" aria-label="Wizard progress">
        {([1, 2, 3, 4, 5] as Step[]).map((s, idx) => {
          const isActive = step === s;
          const isDone = step > s;
          return (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm border-2 transition ${
                  isDone
                    ? 'bg-green-600 text-white border-green-600'
                    : isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-foreground/60 border-foreground/20'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {STEP_LABELS[s]}
              </span>
              {idx < 4 && <ChevronRight className="w-4 h-4 text-foreground/30" />}
            </div>
          );
        })}
      </div>
    );
  }

  function SeverityIcon({ severity }: { severity: Severity }) {
    if (severity === 'ok') return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (severity === 'warning') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  }

  // ============================================================
  // STEP RENDERERS
  // ============================================================

  function renderStep1() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const yearOptions = [now.getFullYear() - 2, now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1];
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Select Reconciliation Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            <div>
              <Label htmlFor="rec-month" className="font-medium">Month</Label>
              <Select value={String(month)} onValueChange={(v) => setMonth(parseInt(v))}>
                <SelectTrigger id="rec-month" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((n, i) => (
                    <SelectItem key={n} value={String(i + 1)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rec-year" className="font-medium">Year</Label>
              <Select value={String(year)} onValueChange={(v) => setYear(parseInt(v))}>
                <SelectTrigger id="rec-year" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-foreground/60 mt-3 max-w-xl">
            By-Law 9 requires monthly reconciliation of the trust account
            within 25 days of month-end. The wizard scans every entry in
            the period, flags compliance gaps, and locks a snapshot.
          </p>
          <div className="flex justify-end mt-6">
            <Button onClick={handleBeginReconciliation} disabled={loading}>
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…</>
              ) : (
                <>Begin Reconciliation <ChevronRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
          {loadError && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>{loadError}</div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  function renderValidatorRow(v: ValidatorResult) {
    const totalIssues = v.issues.length;
    return (
      <div
        key={v.id}
        className={`rounded-lg border p-4 ${
          v.severity === 'ok'
            ? 'border-green-200 bg-green-50/40'
            : v.severity === 'warning'
            ? 'border-amber-200 bg-amber-50/40'
            : 'border-red-200 bg-red-50/40'
        }`}
      >
        <div className="flex items-start gap-3">
          <SeverityIcon severity={v.severity} />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="font-semibold text-foreground">{v.id} — {v.label}</div>
                <div className="text-xs text-foreground/60">{v.byLaw}</div>
              </div>
              <Badge
                className={
                  v.severity === 'ok'
                    ? 'bg-green-100 text-green-800'
                    : v.severity === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {v.passed ? 'Pass' : `${totalIssues} issue${totalIssues === 1 ? '' : 's'}`}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStep2() {
    const errorCount = validators.filter((v) => v.severity === 'error' && !v.passed).length;
    const warnCount = validators.filter((v) => v.severity === 'warning' && !v.passed).length;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Validation Scan — {month}/{year}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <Badge className="bg-foreground/5 text-foreground border border-foreground/15">
              {periodTrustRecords.length} trust journal entries in period
            </Badge>
            <Badge className="bg-foreground/5 text-foreground border border-foreground/15">
              {periodPayments.length} Square payments in period
            </Badge>
            {errorCount > 0 && (
              <Badge className="bg-red-100 text-red-800">{errorCount} critical issue{errorCount === 1 ? '' : 's'}</Badge>
            )}
            {warnCount > 0 && (
              <Badge className="bg-amber-100 text-amber-800">{warnCount} warning{warnCount === 1 ? '' : 's'}</Badge>
            )}
            {errorCount === 0 && warnCount === 0 && (
              <Badge className="bg-green-100 text-green-800">All validators passed</Badge>
            )}
            <Button
              variant="outline" size="sm"
              onClick={() => setValidators(runValidators())}
              className="ml-auto"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Re-run
            </Button>
          </div>
          <div className="space-y-3">
            {validators.map(renderValidatorRow)}
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button onClick={() => setStep(errorCount > 0 ? 3 : 4)}>
              {errorCount > 0 ? 'Fix issues' : 'Continue to bank entry'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderFixForIssue(v: ValidatorResult, issue: ValidatorIssue) {
    const draft = fixDrafts[issue.key] ?? '';
    const saving = !!savingFix[issue.key];
    const isAck = !!acknowledged[issue.key];

    // V1, V7 — referenceNumber input
    // V4 — paymentMethod dropdown
    // V5 — clientId search/select
    // V2, V3, V6, V8 — no inline edit; acknowledge or fix upstream

    let inlineFix: React.ReactNode = null;

    if (v.id === 'V1' || v.id === 'V7') {
      inlineFix = (
        <div className="flex gap-2 items-end mt-2">
          <div className="flex-1">
            <Label className="text-xs">Reference number (invoice / cheque / EFT)</Label>
            <Input
              value={draft}
              onChange={(e) => setFixDrafts((m) => ({ ...m, [issue.key]: e.target.value }))}
              placeholder={v.id === 'V1' ? 'INV-2026-001' : 'CHQ-1042 / EFT-...'}
              disabled={saving || isAck}
            />
          </div>
          <Button
            size="sm"
            onClick={() => applyFix(v.id, issue, draft)}
            disabled={!draft.trim() || saving || isAck}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save'}
          </Button>
        </div>
      );
    } else if (v.id === 'V4') {
      const methods = [
        { value: 'etransfer', label: 'e-Transfer' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'cash', label: 'Cash' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'debit', label: 'Debit' },
        { value: 'wire', label: 'Wire Transfer' },
        { value: 'trust_cheque', label: 'Trust Cheque' },
      ];
      inlineFix = (
        <div className="flex gap-2 items-end mt-2">
          <div className="flex-1">
            <Label className="text-xs">Payment method</Label>
            <Select
              value={draft}
              onValueChange={(v2) => setFixDrafts((m) => ({ ...m, [issue.key]: v2 }))}
            >
              <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
              <SelectContent>
                {methods.map((m) => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="sm"
            onClick={() => applyFix(v.id, issue, draft)}
            disabled={!draft.trim() || saving || isAck}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save'}
          </Button>
        </div>
      );
    } else if (v.id === 'V5') {
      const q = (fixDrafts[`${issue.key}-q`] ?? '').toLowerCase();
      const matches = q.length >= 2
        ? clientFiles
            .filter((f) => (f.clientName || '').toLowerCase().includes(q) || (f.fileNumber || '').toLowerCase().includes(q))
            .slice(0, 6)
        : [];
      inlineFix = (
        <div className="space-y-2 mt-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input
              className="pl-9"
              placeholder="Search client by name or file number…"
              value={fixDrafts[`${issue.key}-q`] ?? ''}
              onChange={(e) => setFixDrafts((m) => ({ ...m, [`${issue.key}-q`]: e.target.value }))}
              disabled={isAck || saving}
            />
          </div>
          {matches.length > 0 && (
            <div className="border border-foreground/15 rounded-md overflow-hidden">
              {matches.map((f) => (
                <button
                  key={f._id}
                  type="button"
                  onClick={() => applyFix('V5', issue, f.clientId || '')}
                  className="w-full text-left px-3 py-2 hover:bg-foreground/5 text-sm border-b border-foreground/10 last:border-b-0"
                  disabled={!f.clientId || saving || isAck}
                >
                  <div className="font-medium text-foreground">{f.clientName}</div>
                  <div className="text-xs text-foreground/60">{f.fileNumber} · {f.matterType || '—'}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={issue.key}
        className={`rounded-md border p-3 ${
          isAck ? 'border-foreground/10 bg-foreground/5' : 'border-foreground/15 bg-white'
        }`}
      >
        <div className="text-sm text-foreground">{issue.description}</div>
        {issue.detail && (
          <div className="text-xs text-foreground/60 mt-0.5">{issue.detail}</div>
        )}
        {!isAck && inlineFix}
        {!isAck && (
          <div className="flex gap-2 items-end mt-3 pt-3 border-t border-foreground/10">
            <div className="flex-1">
              <Label className="text-xs">Acknowledge reason (if can't be fixed)</Label>
              <Input
                value={fixDrafts[`${issue.key}-ack`] ?? ''}
                onChange={(e) => setFixDrafts((m) => ({ ...m, [`${issue.key}-ack`]: e.target.value }))}
                placeholder="e.g. legacy record, paper invoice on file"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => acknowledgeIssue(issue.key, fixDrafts[`${issue.key}-ack`] || 'Acknowledged')}
            >
              Acknowledge
            </Button>
          </div>
        )}
        {isAck && (
          <div className="flex items-center justify-between mt-2 text-xs text-foreground/70">
            <span><CheckCircle2 className="w-3 h-3 inline mr-1 text-green-600" />Acknowledged — {acknowledged[issue.key]}</span>
            <button
              className="underline hover:text-foreground"
              onClick={() => unacknowledgeIssue(issue.key)}
              type="button"
            >
              Undo
            </button>
          </div>
        )}
      </div>
    );
  }

  function renderStep3() {
    const open = validators.filter((v) => v.severity === 'error' && v.issues.length > 0);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Fix Compliance Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {open.length === 0 ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>All critical issues are resolved. You can proceed to bank entry.</div>
            </div>
          ) : (
            <div className="space-y-6">
              {open.map((v) => (
                <div key={v.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-100 text-red-800">{v.id}</Badge>
                    <div className="font-semibold text-foreground">{v.label}</div>
                  </div>
                  <div className="space-y-2">
                    {v.issues.map((issue) => renderFixForIssue(v, issue))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to scan
            </Button>
            <Button
              onClick={() => setStep(4)}
              disabled={!allCriticalResolved}
              title={
                allCriticalResolved
                  ? ''
                  : 'Fix or acknowledge every critical issue first.'
              }
            >
              Continue to bank entry <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderStep4() {
    const bankBal = parseFloat(bankStatementBalance) || 0;
    const outDep = parseFloat(outstandingDeposits) || 0;
    const outChq = parseFloat(outstandingCheques) || 0;
    const reconciledBank = bankBal + outDep - outChq;
    const diff = reconciledBank - perClientLedgerTotal;
    const balanced = Math.abs(diff) < 0.01;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Bank Statement Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Per Bank Statement</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="bankBal">Bank statement balance *</Label>
                  <Input
                    id="bankBal" type="number" step="0.01" placeholder="0.00"
                    value={bankStatementBalance}
                    onChange={(e) => setBankStatementBalance(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="outDep">Outstanding deposits</Label>
                  <Input
                    id="outDep" type="number" step="0.01" placeholder="0.00"
                    value={outstandingDeposits}
                    onChange={(e) => setOutstandingDeposits(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="outChq">Outstanding cheques</Label>
                  <Input
                    id="outChq" type="number" step="0.01" placeholder="0.00"
                    value={outstandingCheques}
                    onChange={(e) => setOutstandingCheques(e.target.value)}
                  />
                </div>
                <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                  <div className="text-xs text-foreground/60">Reconciled bank total</div>
                  <div className="font-heading text-xl font-bold text-foreground">
                    {formatCurrency(reconciledBank)}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Per Client Ledgers</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                  <div className="text-xs text-foreground/60">Per-client ledger total</div>
                  <div className="font-heading text-xl font-bold text-foreground">
                    {formatCurrency(perClientLedgerTotal)}
                  </div>
                </div>
                <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                  <div className="text-xs text-foreground/60">Trust journal ending balance</div>
                  <div className="font-heading text-lg font-semibold text-foreground">
                    {formatCurrency(journalEndingTotal)}
                  </div>
                </div>
                <div className="text-xs text-foreground/60">
                  {perClientBalances.length} client{perClientBalances.length === 1 ? '' : 's'} with non-zero balances.
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-6 rounded-lg border p-4 ${
            bankStatementBalance && balanced
              ? 'border-green-300 bg-green-50'
              : 'border-red-300 bg-red-50'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-semibold text-foreground">
                Bank vs. ledgers
              </div>
              <div className="font-heading text-lg">
                {formatCurrency(reconciledBank)} {balanced ? '=' : '−'} {formatCurrency(perClientLedgerTotal)}
              </div>
              <Badge className={balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {balanced ? 'Balanced' : `Off by ${formatCurrency(diff)}`}
              </Badge>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(3)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button onClick={() => setStep(5)} disabled={!bankStatementBalance}>
              Review &amp; lock <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderStep5() {
    if (lockedSnapshot) {
      return (
        <Card className="print:shadow-none print:border-0">
          <CardHeader>
            <CardTitle className="font-heading text-2xl flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              Period Locked — Snapshot Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 mb-4">
              <div className="font-semibold text-green-900">
                Reconciliation snapshot recorded for {String(lockedSnapshot.month).padStart(2, '0')}/{lockedSnapshot.year}.
              </div>
              <div className="text-sm text-green-800/80 mt-1">
                Recorded by {lockedSnapshot.recordedBy} on {lockedSnapshot.recordedDate}.
              </div>
            </div>

            <h3 className="font-heading text-lg font-bold mb-2">Bank Reconciliation</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-foreground/15">
                <tbody>
                  <tr className="border-b border-foreground/10">
                    <td className="px-3 py-2 text-foreground/70">Bank statement balance</td>
                    <td className="px-3 py-2 text-right font-semibold">{formatCurrency(lockedSnapshot.bankStatementBalance)}</td>
                  </tr>
                  <tr className="border-b border-foreground/10">
                    <td className="px-3 py-2 text-foreground/70">+ Outstanding deposits</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(lockedSnapshot.outstandingDeposits)}</td>
                  </tr>
                  <tr className="border-b border-foreground/10">
                    <td className="px-3 py-2 text-foreground/70">− Outstanding cheques</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(lockedSnapshot.outstandingCheques)}</td>
                  </tr>
                  <tr className="border-b border-foreground/10 bg-foreground/5">
                    <td className="px-3 py-2 font-semibold">Reconciled bank total</td>
                    <td className="px-3 py-2 text-right font-semibold">{formatCurrency(lockedSnapshot.reconciledBank)}</td>
                  </tr>
                  <tr className="border-b border-foreground/10">
                    <td className="px-3 py-2 text-foreground/70">Per-client ledger total</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(lockedSnapshot.perClientLedgerTotal)}</td>
                  </tr>
                  <tr className="border-b border-foreground/10">
                    <td className="px-3 py-2 text-foreground/70">Journal ending total</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(lockedSnapshot.journalEndingTotal)}</td>
                  </tr>
                  <tr className={lockedSnapshot.balanced ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="px-3 py-2 font-semibold">Difference</td>
                    <td className="px-3 py-2 text-right font-semibold">
                      {formatCurrency(lockedSnapshot.difference)}
                      {' '}
                      <Badge className={lockedSnapshot.balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {lockedSnapshot.balanced ? 'Balanced' : 'Out of balance'}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-lg font-bold mb-2">Validators</h3>
            <ul className="text-sm mb-6 space-y-1">
              {lockedSnapshot.validatorSummary.map((v: any) => (
                <li key={v.id} className="flex items-center gap-2">
                  {v.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : v.severity === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span><span className="font-semibold">{v.id}</span> — {v.label}{!v.passed && v.issueCount > 0 ? ` (${v.issueCount} issue${v.issueCount === 1 ? '' : 's'})` : ''}</span>
                </li>
              ))}
            </ul>

            {lockedSnapshot.acknowledgedIssues.length > 0 && (
              <>
                <h3 className="font-heading text-lg font-bold mb-2">Acknowledged Issues</h3>
                <ul className="text-sm mb-6 list-disc pl-6 space-y-1">
                  {lockedSnapshot.acknowledgedIssues.map((a: any) => (
                    <li key={a.key} className="text-foreground/80">
                      <span className="font-mono text-xs">{a.key}</span> — {a.reason}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-wrap gap-2 print:hidden">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" /> Print Report
              </Button>
              {/* Form 9E — LSO By-Law 9 s.18(10) monthly trust listing.
                  Generated from the same per-client journal data the
                  wizard just reconciled, so its totals match the
                  locked snapshot. */}
              <Button
                variant="outline"
                className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/5"
                onClick={handleGenerateForm9E}
                disabled={generatingForm9E}
              >
                {generatingForm9E ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Generating Form 9E…
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-1" />
                    Generate Form 9E Trust Listing PDF
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => {
                setLockedSnapshot(null);
                setStep(1);
                setBankStatementBalance('');
                setOutstandingDeposits('0');
                setOutstandingCheques('0');
                setAcknowledged({});
                setFixDrafts({});
              }}>
                Reconcile another period
              </Button>
            </div>
            {form9eError && (
              <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2 print:hidden">
                {form9eError}
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    const bankBal = parseFloat(bankStatementBalance) || 0;
    const outDep = parseFloat(outstandingDeposits) || 0;
    const outChq = parseFloat(outstandingCheques) || 0;
    const reconciledBank = bankBal + outDep - outChq;
    const diff = reconciledBank - perClientLedgerTotal;
    const balanced = Math.abs(diff) < 0.01;
    const ackCount = Object.keys(acknowledged).length;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Review &amp; Lock Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70 mb-4">
            Locking writes a permanent reconciliation snapshot to{' '}
            <code className="text-xs">financialrecords</code>. You can still
            re-reconcile later — that creates a new snapshot rather than
            overwriting this one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Period</div>
              <div className="font-semibold">{String(month).padStart(2, '0')}/{year}</div>
            </div>
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Status</div>
              <Badge className={balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {balanced ? 'Balanced' : `Off by ${formatCurrency(diff)}`}
              </Badge>
            </div>
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Reconciled bank</div>
              <div className="font-semibold">{formatCurrency(reconciledBank)}</div>
            </div>
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Per-client ledger</div>
              <div className="font-semibold">{formatCurrency(perClientLedgerTotal)}</div>
            </div>
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Validators</div>
              <div className="font-semibold">
                {validators.filter((v) => v.passed).length}/{validators.length} passing
              </div>
            </div>
            <div className="rounded-lg border border-foreground/15 p-3">
              <div className="text-xs text-foreground/60">Acknowledged issues</div>
              <div className="font-semibold">{ackCount}</div>
            </div>
          </div>

          {lockError && (
            <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>{lockError}</div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(4)} disabled={locking}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button onClick={handleLockPeriod} disabled={locking}>
              {locking ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Locking…</>
              ) : (
                <><Lock className="w-4 h-4 mr-1" /> Lock Period</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <BackToDashboard />
      <main className="flex-1 w-full">
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 print:px-0 print:py-0">
          <div className="mb-6 print:mb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center print:hidden">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Month-End Reconciliation
              </h1>
            </div>
            <p className="font-paragraph text-foreground/70 max-w-3xl print:hidden">
              LSO By-Law 9 month-end trust reconciliation wizard. Validates
              the journal for the period, surfaces missing references and
              ledger errors, then locks a permanent snapshot.
            </p>
          </div>

          <div className="print:hidden">
            <ProgressBar />
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </section>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
