/**
 * Reports & Practice Analytics Page
 *
 * Comprehensive reporting dashboard for paralegal practice management.
 * Five report sections:
 * 1. Practice Overview — KPIs, caseload summary, file status distribution
 * 2. Revenue & Billing — Revenue by period, billing model breakdown, collection rate
 * 3. Trust Account Summary — LSO annual report data, balances, transaction summary
 * 4. Aging Receivables — Outstanding invoices by age bucket, per-client breakdown
 * 5. Matter-Type Analytics — Case distribution, outcomes, average duration by type
 *
 * Data sourced from: clientfiles, financialrecords, bookings, appointments, fileassignments
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft, Download, Loader2, AlertCircle, BarChart3,
  TrendingUp, DollarSign, Scale, Clock, FileText, Users,
  Calendar, Briefcase, PieChart, ArrowUpRight, ArrowDownRight,
  Filter, RefreshCw, CheckCircle,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ============================================================
// TYPES
// ============================================================

interface CmsRecord {
  _id: string;
  _createdDate?: Date | string;
  [key: string]: any;
}

// ============================================================
// HELPERS
// ============================================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

function formatDate(d: Date | string | undefined): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Trust account sign convention — MUST mirror getTransactionSign() in
 * TrustAccountingPage.tsx exactly. If these two disagree, the Reports
 * trust balance won't match the Trust Accounting balance and we get
 * the user-visible "$1,988 vs $3,191" cross-foot bug (B-1 in the
 * 2026-05-29 audit).
 *
 * '+' = inflow to trust    (trust_deposit, billing, payment)
 * '-' = outflow from trust (trust_withdrawal, disbursement, refund)
 * '~' = trust→general transfer — DEBITS the trust account, so treated
 *       as '-' for balance purposes even though it shows the '~' badge
 *       in the journal UI.
 */
function getTrustSign(type: string | undefined): '+' | '-' | '~' | '' {
  switch (type) {
    case 'trust_deposit':
    case 'billing':
    case 'payment':
      return '+';
    case 'trust_withdrawal':
    case 'disbursement':
    case 'refund':
      return '-';
    case 'transfer':
      return '~';
    default:
      return '';
  }
}

/** Sum trust amounts honouring the sign convention above. */
function sumTrustSigned(records: { transactionType?: string; amount?: number }[]): number {
  let total = 0;
  for (const r of records) {
    const sign = getTrustSign(r.transactionType);
    const amt = r.amount || 0;
    if (sign === '+') total += amt;
    else if (sign === '-' || sign === '~') total -= amt;
  }
  return total;
}

function getMonthKey(d: Date | string): string {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel(key: string): string {
  const [y, m] = key.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

function parseMeta(record: CmsRecord, field: string = 'description'): any {
  try { return JSON.parse(record[field] || '{}'); } catch { return {}; }
}

function getDaysOverdue(dueDate: string): number {
  const diff = Math.floor((new Date().getTime() - new Date(dueDate).getTime()) / 86400000);
  return diff > 0 ? diff : 0;
}

// ============================================================
// LOADING SKELETON
// ============================================================

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-[#F0EBE3] rounded-xl" />)}
      </div>
      <div className="h-64 bg-[#F0EBE3] rounded-xl" />
      <div className="h-48 bg-[#F0EBE3] rounded-xl" />
    </div>
  );
}

// ============================================================
// SIMPLE BAR CHART (pure CSS, no dependencies)
// ============================================================

function BarChart({ data, maxValue, color = '#B94A1F', labelWidth = 100 }: {
  data: { label: string; value: number; subLabel?: string }[];
  maxValue: number;
  color?: string;
  labelWidth?: number;
}) {
  if (data.length === 0) return <p className="text-sm text-[#6B5B50] font-paragraph">No data available.</p>;
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-xs font-paragraph text-[#4A2C23] text-right shrink-0" style={{ width: labelWidth }}>
            {d.label}
          </div>
          <div className="flex-1 bg-[#F0EBE3] rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
              style={{
                width: `${maxValue > 0 ? Math.max((d.value / maxValue) * 100, 2) : 0}%`,
                backgroundColor: color,
              }}
            >
              {d.value > 0 && (
                <span className="text-xs text-white font-bold whitespace-nowrap">
                  {d.subLabel || formatCurrency(d.value)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DONUT CHART (pure SVG)
// ============================================================

function DonutChart({ segments, size = 180 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return <p className="text-sm text-[#6B5B50] font-paragraph text-center">No data</p>;

  const radius = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 30;
  const innerRadius = radius - strokeWidth / 2;
  let cumulativeAngle = -90; // Start at top

  const arcs = segments.filter(s => s.value > 0).map(seg => {
    const angle = (seg.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + innerRadius * Math.cos(startRad);
    const y1 = cy + innerRadius * Math.sin(startRad);
    const x2 = cx + innerRadius * Math.cos(endRad);
    const y2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...seg,
      d: `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
      percentage: ((seg.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={arc.d}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-[#4A2C23] text-lg font-bold">
          {total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-[#6B5B50] text-xs">
          total
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {arcs.map((arc, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs font-paragraph">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: arc.color }} />
            <span className="text-[#4A2C23]">{arc.label}</span>
            <span className="text-[#6B5B50]">({arc.percentage}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({ icon: Icon, label, value, subValue, trend, trendUp, accentColor }: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E8DDD3] p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: accentColor || '#B94A1F' }} />
        <span className="text-xs font-paragraph text-[#6B5B50] uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-heading font-bold text-[#4A2C23]">{value}</p>
      {subValue && <p className="text-xs font-paragraph text-[#6B5B50] mt-0.5">{subValue}</p>}
      {trend && (
        <div className={`flex items-center gap-1 mt-1 text-xs font-paragraph ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ReportsAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Raw data
  const [clientFiles, setClientFiles] = useState<CmsRecord[]>([]);
  const [financialRecords, setFinancialRecords] = useState<CmsRecord[]>([]);
  const [bookings, setBookings] = useState<CmsRecord[]>([]);
  const [appointments, setAppointments] = useState<CmsRecord[]>([]);
  const [fileAssignments, setFileAssignments] = useState<CmsRecord[]>([]);

  // Date range filter
  const [dateRange, setDateRange] = useState<'all' | '12m' | '6m' | '3m' | '1m'>('12m');

  // --- Load data ---
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filesRes, finRes, bookRes, apptRes, assignRes] = await Promise.all([
        BaseCrudService.getAll<any>('clientfiles'),
        BaseCrudService.getAll<any>('financialrecords'),
        BaseCrudService.getAll<any>('bookings'),
        BaseCrudService.getAll<any>('appointments'),
        BaseCrudService.getAll<any>('fileassignments'),
      ]);
      setClientFiles(filesRes.items || []);
      setFinancialRecords(finRes.items || []);
      setBookings(bookRes.items || []);
      setAppointments(apptRes.items || []);
      setFileAssignments(assignRes.items || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // --- Date filter ---
  const dateFilterStart = useMemo(() => {
    if (dateRange === 'all') return null;
    const now = new Date();
    const months = dateRange === '12m' ? 12 : dateRange === '6m' ? 6 : dateRange === '3m' ? 3 : 1;
    now.setMonth(now.getMonth() - months);
    return now;
  }, [dateRange]);

  const filterByDate = useCallback((records: CmsRecord[], dateField: string = '_createdDate') => {
    if (!dateFilterStart) return records;
    return records.filter(r => {
      const d = r[dateField] || r._createdDate;
      if (!d) return false;
      return new Date(d) >= dateFilterStart;
    });
  }, [dateFilterStart]);

  // --- Derived data ---
  const docketEntries = useMemo(() =>
    financialRecords.filter(r => r.transactionType === 'docket_entry'),
    [financialRecords]
  );
  const invoiceRecords = useMemo(() =>
    financialRecords.filter(r => r.transactionType === 'invoice'),
    [financialRecords]
  );
  const trustRecords = useMemo(() =>
    financialRecords.filter(r =>
      r.transactionType && ['trust_deposit', 'trust_withdrawal', 'billing', 'payment', 'disbursement', 'refund', 'transfer'].includes(r.transactionType)
    ),
    [financialRecords]
  );
  const rateConfigs = useMemo(() =>
    financialRecords.filter(r => r.transactionType === 'rate_config'),
    [financialRecords]
  );

  // Enrich invoices
  const enrichedInvoices = useMemo(() => {
    return invoiceRecords.map(inv => {
      const meta = parseMeta(inv);
      return {
        ...inv,
        invoiceDate: meta.invoiceDate || inv.transactionDate || '',
        dueDate: meta.dueDate || '',
        subtotal: meta.subtotal || 0,
        hstAmount: meta.hstAmount || 0,
        total: meta.total || inv.amount || 0,
        invStatus: meta.status || 'draft',
        amountPaid: meta.amountPaid || 0,
        billingModel: meta.billingModel || 'hourly',
      };
    });
  }, [invoiceRecords]);

  // Enrich docket entries
  const enrichedDockets = useMemo(() => {
    return docketEntries.map(d => {
      const meta = parseMeta(d, 'trustAccountId');
      return {
        ...d,
        hours: meta.hours || 0,
        minutes: meta.minutes || 0,
        rate: meta.rate || 0,
        activityCode: meta.activityCode || d.referenceNumber || '',
        billingModel: meta.billingModel || d.paymentMethod || 'hourly',
        docketStatus: meta.status || 'unbilled',
      };
    });
  }, [docketEntries]);

  // ============================================================
  // SECTION 1: PRACTICE OVERVIEW
  // ============================================================

  const overviewData = useMemo(() => {
    const files = filterByDate(clientFiles, '_createdDate');
    const activeFiles = clientFiles.filter(f => f.fileStatus === 'Active' || f.fileStatus === 'active');
    const closedFiles = clientFiles.filter(f => f.fileStatus === 'Closed' || f.fileStatus === 'closed');
    const pendingFiles = clientFiles.filter(f => f.fileStatus === 'Pending' || f.fileStatus === 'pending');
    const onHoldFiles = clientFiles.filter(f => f.fileStatus === 'On Hold' || f.fileStatus === 'onhold');

    const upcomingAppts = appointments.filter(a => {
      const d = a.eventDate || a.date;
      return d && new Date(d) >= new Date() && a.status !== 'Cancelled';
    });

    const completedBookings = bookings.filter(b => b.status === 'completed' || b.status === 'approved');
    const pendingBookings = bookings.filter(b => b.status === 'pending');

    // Files opened per month
    const filesPerMonth: Record<string, number> = {};
    files.forEach(f => {
      const key = getMonthKey(f._createdDate || new Date());
      filesPerMonth[key] = (filesPerMonth[key] || 0) + 1;
    });

    // Matter type distribution
    const matterDist: Record<string, number> = {};
    clientFiles.forEach(f => {
      const type = f.matterType || 'Unknown';
      matterDist[type] = (matterDist[type] || 0) + 1;
    });

    return {
      totalFiles: clientFiles.length,
      activeFiles: activeFiles.length,
      closedFiles: closedFiles.length,
      pendingFiles: pendingFiles.length,
      onHoldFiles: onHoldFiles.length,
      upcomingAppts: upcomingAppts.length,
      completedBookings: completedBookings.length,
      pendingBookings: pendingBookings.length,
      totalAssignments: fileAssignments.length,
      filesPerMonth,
      matterDist,
    };
  }, [clientFiles, appointments, bookings, fileAssignments, filterByDate]);

  // ============================================================
  // SECTION 2: REVENUE & BILLING
  // ============================================================

  const revenueData = useMemo(() => {
    const filteredInvoices = filterByDate(enrichedInvoices, 'invoiceDate');
    const filteredDockets = filterByDate(enrichedDockets, 'transactionDate');

    // ----------------------------------------------------------------
    // Square Canada online-card fees: 2.9% + $0.30 per transaction.
    // Source: https://squareup.com/ca/en/pricing (online payments rate).
    // We identify Square inflows as financialrecords where the
    // recordedBy starts with "Square" OR paymentMethod is credit_card —
    // both are stamped by /api/square/create-payment when a client
    // pays via the PayPage. We do NOT charge fees on transfers,
    // refunds, or manually entered receipts.
    // ----------------------------------------------------------------
    const SQUARE_FEE_PCT = 0.029;
    const SQUARE_FEE_FIXED = 0.30;
    const filteredFinancial = filterByDate(financialRecords, 'transactionDate');
    const squareDeposits = filteredFinancial.filter((r) => {
      const type = (r.transactionType || '').toLowerCase();
      if (!['trust_deposit', 'payment', 'billing'].includes(type)) return false;
      const recordedBy = String(r.recordedBy || '').toLowerCase();
      const method = String(r.paymentMethod || '').toLowerCase();
      return (
        recordedBy.startsWith('square') ||
        method === 'credit_card' ||
        method === 'card'
      );
    });
    const squareGross = squareDeposits.reduce((s, r) => s + (r.amount || 0), 0);
    const squareFees = squareDeposits.reduce(
      (s, r) => s + (r.amount || 0) * SQUARE_FEE_PCT + SQUARE_FEE_FIXED,
      0,
    );

    // Total revenue (paid invoices)
    const totalRevenue = filteredInvoices
      .filter(i => i.invStatus === 'paid')
      .reduce((s, i) => s + (i.total || 0), 0);

    // Net revenue = total paid revenue minus Square processing fees.
    // This is the cash actually deposited into the firm account after
    // Square's cut — the number that matters for budgeting and HST.
    const netRevenue = Math.max(0, totalRevenue - squareFees);

    // Total billed
    const totalBilled = filteredInvoices
      .reduce((s, i) => s + (i.total || 0), 0);

    // Total collected
    const totalCollected = filteredInvoices
      .reduce((s, i) => s + (i.amountPaid || 0), 0);

    // Collection rate
    const collectionRate = totalBilled > 0 ? (totalCollected / totalBilled) * 100 : 0;

    // Revenue by month
    const revenueByMonth: Record<string, number> = {};
    filteredInvoices.filter(i => i.invStatus === 'paid').forEach(inv => {
      const key = getMonthKey(inv.invoiceDate || inv._createdDate || new Date());
      revenueByMonth[key] = (revenueByMonth[key] || 0) + (inv.total || 0);
    });

    // Revenue by billing model
    const byModel: Record<string, number> = {};
    filteredInvoices.filter(i => i.invStatus === 'paid').forEach(inv => {
      const model = inv.billingModel || 'hourly';
      byModel[model] = (byModel[model] || 0) + (inv.total || 0);
    });

    // Total hours docketed
    const totalHours = filteredDockets.reduce(
      (s, d) => s + (d.hours || 0) + (d.minutes || 0) / 60, 0
    );

    // Unbilled amount
    const unbilledAmount = filteredDockets
      .filter(d => d.docketStatus === 'unbilled')
      .reduce((s, d) => s + (d.amount || 0), 0);

    // Average hourly effective rate
    const hourlyDockets = filteredDockets.filter(d => d.billingModel === 'hourly');
    const hourlyRevenue = hourlyDockets.reduce((s, d) => s + (d.amount || 0), 0);
    const hourlyHours = hourlyDockets.reduce((s, d) => s + (d.hours || 0) + (d.minutes || 0) / 60, 0);
    const effectiveRate = hourlyHours > 0 ? hourlyRevenue / hourlyHours : 0;

    // Activity code breakdown
    const byActivity: Record<string, { hours: number; amount: number }> = {};
    filteredDockets.forEach(d => {
      const code = d.activityCode || 'other';
      if (!byActivity[code]) byActivity[code] = { hours: 0, amount: 0 };
      byActivity[code].hours += (d.hours || 0) + (d.minutes || 0) / 60;
      byActivity[code].amount += d.amount || 0;
    });

    return {
      totalRevenue,
      totalBilled,
      totalCollected,
      collectionRate,
      revenueByMonth,
      byModel,
      totalHours,
      unbilledAmount,
      effectiveRate,
      byActivity,
      squareGross,
      squareFees,
      netRevenue,
      squareTxCount: squareDeposits.length,
    };
  }, [enrichedInvoices, enrichedDockets, financialRecords, filterByDate]);

  // ============================================================
  // SECTION 3: TRUST ACCOUNT SUMMARY
  // ============================================================

  const trustData = useMemo(() => {
    const filtered = filterByDate(trustRecords, 'transactionDate');

    // Total deposits & withdrawals — now sign-aware so billing/payment
    // are counted as inflows and transfer/refund as outflows, matching
    // the Trust Accounting page exactly.
    const deposits = filtered
      .filter(r => getTrustSign(r.transactionType) === '+')
      .reduce((s, r) => s + (r.amount || 0), 0);
    const withdrawals = filtered
      .filter(r => {
        const s = getTrustSign(r.transactionType);
        return s === '-' || s === '~';
      })
      .reduce((s, r) => s + (r.amount || 0), 0);

    // Current balance (all time) — uses the shared sumTrustSigned helper
    // so this page and Trust Accounting always agree.
    const currentBalance = sumTrustSigned(trustRecords);

    // Per-client trust balances. We track inflows and outflows separately
    // so the UI can show "deposits / withdrawals" columns, but the net
    // balance uses the same sign convention.
    const clientBalances: Record<string, { deposits: number; withdrawals: number; name: string }> = {};
    trustRecords.forEach(r => {
      const cid = r.clientId || r.fileId || 'unknown';
      if (!clientBalances[cid]) {
        const file = clientFiles.find(f => f._id === r.fileId || f.clientId === r.clientId);
        clientBalances[cid] = { deposits: 0, withdrawals: 0, name: file?.clientName || 'Unknown' };
      }
      const sign = getTrustSign(r.transactionType);
      const amt = r.amount || 0;
      if (sign === '+') clientBalances[cid].deposits += amt;
      else if (sign === '-' || sign === '~') clientBalances[cid].withdrawals += amt;
    });

    // Transaction count by type
    const txByType: Record<string, number> = {};
    filtered.forEach(r => {
      const t = r.transactionType || 'unknown';
      txByType[t] = (txByType[t] || 0) + 1;
    });

    // Monthly trust activity — same sign-aware bucketing.
    const monthlyActivity: Record<string, { deposits: number; withdrawals: number }> = {};
    filtered.forEach(r => {
      const key = getMonthKey(r.transactionDate || r._createdDate || new Date());
      if (!monthlyActivity[key]) monthlyActivity[key] = { deposits: 0, withdrawals: 0 };
      const sign = getTrustSign(r.transactionType);
      const amt = r.amount || 0;
      if (sign === '+') monthlyActivity[key].deposits += amt;
      else if (sign === '-' || sign === '~') monthlyActivity[key].withdrawals += amt;
    });

    // Negative balance clients (compliance risk)
    const negativeClients = Object.entries(clientBalances)
      .filter(([, b]) => b.deposits - b.withdrawals < 0)
      .map(([id, b]) => ({ id, ...b, balance: b.deposits - b.withdrawals }));

    return {
      deposits,
      withdrawals,
      currentBalance,
      clientBalances,
      txByType,
      monthlyActivity,
      negativeClients,
      totalTransactions: filtered.length,
    };
  }, [trustRecords, clientFiles, filterByDate]);

  // ============================================================
  // SECTION 4: AGING RECEIVABLES
  // ============================================================

  const agingData = useMemo(() => {
    const unpaid = enrichedInvoices.filter(i => i.invStatus !== 'paid' && i.invStatus !== 'draft');

    const buckets = { current: 0, thirty: 0, sixty: 0, ninety: 0 };
    const bucketCounts = { current: 0, thirty: 0, sixty: 0, ninety: 0 };
    const byClient: Record<string, { name: string; total: number; count: number; oldest: number }> = {};

    unpaid.forEach(inv => {
      const outstanding = (inv.total || 0) - (inv.amountPaid || 0);
      const days = inv.dueDate ? getDaysOverdue(inv.dueDate) : 0;

      if (days <= 30) { buckets.current += outstanding; bucketCounts.current++; }
      else if (days <= 60) { buckets.thirty += outstanding; bucketCounts.thirty++; }
      else if (days <= 90) { buckets.sixty += outstanding; bucketCounts.sixty++; }
      else { buckets.ninety += outstanding; bucketCounts.ninety++; }

      const fid = inv.fileId || 'unknown';
      const file = clientFiles.find(f => f._id === fid);
      if (!byClient[fid]) {
        byClient[fid] = { name: file?.clientName || 'Unknown', total: 0, count: 0, oldest: 0 };
      }
      byClient[fid].total += outstanding;
      byClient[fid].count++;
      byClient[fid].oldest = Math.max(byClient[fid].oldest, days);
    });

    const grandTotal = buckets.current + buckets.thirty + buckets.sixty + buckets.ninety;

    return { buckets, bucketCounts, byClient, grandTotal, totalUnpaid: unpaid.length };
  }, [enrichedInvoices, clientFiles]);

  // ============================================================
  // SECTION 5: MATTER-TYPE ANALYTICS
  // ============================================================

  const matterData = useMemo(() => {
    // Group files by matter type
    const byType: Record<string, {
      total: number; active: number; closed: number;
      revenue: number; hours: number; avgComplianceScore: number; scores: number[];
    }> = {};

    clientFiles.forEach(f => {
      const type = f.matterType || 'Unknown';
      if (!byType[type]) {
        byType[type] = { total: 0, active: 0, closed: 0, revenue: 0, hours: 0, avgComplianceScore: 0, scores: [] };
      }
      byType[type].total++;
      if (f.fileStatus === 'Active' || f.fileStatus === 'active') byType[type].active++;
      if (f.fileStatus === 'Closed' || f.fileStatus === 'closed') byType[type].closed++;
      if (f.complianceScore) byType[type].scores.push(f.complianceScore);
    });

    // Add revenue and hours from docket entries
    enrichedDockets.forEach(d => {
      const file = clientFiles.find(f => f._id === d.fileId);
      const type = file?.matterType || 'Unknown';
      if (byType[type]) {
        byType[type].revenue += d.amount || 0;
        byType[type].hours += (d.hours || 0) + (d.minutes || 0) / 60;
      }
    });

    // Compute average compliance scores
    Object.values(byType).forEach(t => {
      t.avgComplianceScore = t.scores.length > 0
        ? t.scores.reduce((a, b) => a + b, 0) / t.scores.length
        : 0;
    });

    return byType;
  }, [clientFiles, enrichedDockets]);

  // ============================================================
  // EXPORT CSV
  // ============================================================

  const exportCsv = (filename: string, headers: string[], rows: string[][]) => {
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-3xl font-bold text-[#4A2C23] mb-6">Reports & Analytics</h1>
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
          <Button onClick={loadData} className="bg-[#B94A1F] hover:bg-[#a13f1a] text-white">Retry</Button>
        </div>
      </div>
    );
  }

  const MATTER_COLORS: Record<string, string> = {
    'Small Claims': '#B94A1F',
    'LTB': '#4A7C59',
    'Traffic': '#3B82F6',
    'Criminal': '#6B21A8',
    'HRTO': '#D97706',
    'Employment': '#0891B2',
    'Debt Collection': '#DC2626',
    'Defamation': '#7C3AED',
    'Insurance': '#059669',
    'Contract': '#EA580C',
    'Mediation': '#2563EB',
    'General': '#6B7280',
    'Unknown': '#9CA3AF',
  };

  return (
    <div className="min-h-screen bg-[#F9F5F0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => { window.location.href = '/paralegal-dashboard'; }}
              className="p-2 rounded-lg hover:bg-[#F0EBE3] transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#4A2C23]" />
            </button>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#4A2C23]">Reports & Analytics</h1>
              <p className="font-paragraph text-sm text-[#6B5B50]">Practice performance, revenue, trust accounts & caseload</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Date range filter */}
            <div className="flex bg-white border border-[#D4C5B9] rounded-lg overflow-hidden">
              {(['1m', '3m', '6m', '12m', 'all'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 text-xs font-paragraph font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-[#B94A1F] text-white'
                      : 'text-[#4A2C23] hover:bg-[#F0EBE3]'
                  }`}
                >
                  {range === 'all' ? 'All' : range.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={loadData}
              className="border-[#D4C5B9] text-[#4A2C23]">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#F0EBE3] mb-6 flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <BarChart3 className="w-4 h-4 mr-1.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <TrendingUp className="w-4 h-4 mr-1.5" /> Revenue
            </TabsTrigger>
            <TabsTrigger value="trust" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <Scale className="w-4 h-4 mr-1.5" /> Trust Account
            </TabsTrigger>
            <TabsTrigger value="aging" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <Clock className="w-4 h-4 mr-1.5" /> Receivables
            </TabsTrigger>
            <TabsTrigger value="matters" className="data-[state=active]:bg-white data-[state=active]:text-[#B94A1F]">
              <Briefcase className="w-4 h-4 mr-1.5" /> Matters
            </TabsTrigger>
          </TabsList>

          {/* ========== TAB: OVERVIEW ========== */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Briefcase} label="Active Files" value={String(overviewData.activeFiles)}
                  subValue={`${overviewData.totalFiles} total`} accentColor="#B94A1F" />
                <StatCard icon={Calendar} label="Upcoming Appts" value={String(overviewData.upcomingAppts)}
                  subValue={`${overviewData.pendingBookings} pending bookings`} accentColor="#3B82F6" />
                <StatCard icon={DollarSign} label="Total Revenue" value={formatCurrency(revenueData.totalRevenue)}
                  subValue={`${revenueData.collectionRate.toFixed(0)}% collection rate`} accentColor="#059669" />
                <StatCard icon={Scale} label="Trust Balance" value={formatCurrency(trustData.currentBalance)}
                  subValue={`${trustData.negativeClients.length} negative balances`}
                  accentColor={trustData.negativeClients.length > 0 ? '#DC2626' : '#059669'} />
              </div>

              {/* File status and matter type side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">File Status Distribution</h3>
                  <DonutChart segments={[
                    { label: 'Active', value: overviewData.activeFiles, color: '#059669' },
                    { label: 'Pending', value: overviewData.pendingFiles, color: '#D97706' },
                    { label: 'On Hold', value: overviewData.onHoldFiles, color: '#6B7280' },
                    { label: 'Closed', value: overviewData.closedFiles, color: '#4A2C23' },
                  ]} />
                </div>
                <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Cases by Matter Type</h3>
                  <DonutChart segments={
                    Object.entries(overviewData.matterDist)
                      .sort((a, b) => b[1] - a[1])
                      .map(([type, count]) => ({
                        label: type,
                        value: count,
                        color: MATTER_COLORS[type] || '#6B7280',
                      }))
                  } />
                </div>
              </div>

              {/* New files per month */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">New Files Opened</h3>
                {(() => {
                  const entries = Object.entries(overviewData.filesPerMonth).sort((a, b) => a[0].localeCompare(b[0]));
                  const max = Math.max(...entries.map(e => e[1]), 1);
                  return (
                    <BarChart
                      data={entries.map(([k, v]) => ({ label: getMonthLabel(k), value: v, subLabel: String(v) }))}
                      maxValue={max}
                      color="#4A7C59"
                    />
                  );
                })()}
              </div>
            </div>
          </TabsContent>

          {/* ========== TAB: REVENUE ========== */}
          <TabsContent value="revenue">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={DollarSign} label="Total Revenue" value={formatCurrency(revenueData.totalRevenue)}
                  accentColor="#059669" />
                <StatCard icon={TrendingUp} label="Total Billed" value={formatCurrency(revenueData.totalBilled)}
                  subValue={`${revenueData.collectionRate.toFixed(1)}% collected`} accentColor="#3B82F6" />
                <StatCard icon={Clock} label="Hours Docketed" value={`${revenueData.totalHours.toFixed(1)}h`}
                  subValue={`Avg ${formatCurrency(revenueData.effectiveRate)}/hr`} accentColor="#B94A1F" />
                <StatCard icon={AlertCircle} label="Unbilled Work" value={formatCurrency(revenueData.unbilledAmount)}
                  accentColor="#D97706" />
              </div>

              {/* Square fee + Net Revenue row.
                  Square Canada online card rate: 2.9% + $0.30 per
                  transaction. We surface the deduction so the firm
                  can see what actually lands in the operating account
                  after processing fees. */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <StatCard
                  icon={DollarSign}
                  label="Gross Card Receipts"
                  value={formatCurrency(revenueData.squareGross)}
                  subValue={`${revenueData.squareTxCount} Square transaction${revenueData.squareTxCount === 1 ? '' : 's'}`}
                  accentColor="#0EA5E9"
                />
                <StatCard
                  icon={AlertCircle}
                  label="Square Processing Fees"
                  value={`− ${formatCurrency(revenueData.squareFees)}`}
                  subValue="2.9% + $0.30 per online tx"
                  accentColor="#DC2626"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Net Revenue (after fees)"
                  value={formatCurrency(revenueData.netRevenue)}
                  subValue="Operating cash, post-Square"
                  accentColor="#059669"
                />
              </div>

              {/* Revenue by month */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23]">Revenue by Month</h3>
                  <Button variant="outline" size="sm"
                    className="border-[#D4C5B9] text-[#4A2C23]"
                    onClick={() => {
                      const entries = Object.entries(revenueData.revenueByMonth).sort((a, b) => a[0].localeCompare(b[0]));
                      exportCsv('revenue-by-month.csv', ['Month', 'Revenue'],
                        entries.map(([k, v]) => [getMonthLabel(k), v.toFixed(2)]));
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </Button>
                </div>
                {(() => {
                  const entries = Object.entries(revenueData.revenueByMonth).sort((a, b) => a[0].localeCompare(b[0]));
                  const max = Math.max(...entries.map(e => e[1]), 1);
                  return <BarChart data={entries.map(([k, v]) => ({ label: getMonthLabel(k), value: v }))} maxValue={max} color="#059669" />;
                })()}
              </div>

              {/* Revenue by billing model and by activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">By Billing Model</h3>
                  {(() => {
                    const entries = Object.entries(revenueData.byModel).sort((a, b) => b[1] - a[1]);
                    const modelColors: Record<string, string> = { hourly: '#3B82F6', fixed: '#7C3AED', contingency: '#D97706' };
                    return (
                      <DonutChart segments={entries.map(([model, val]) => ({
                        label: model.charAt(0).toUpperCase() + model.slice(1),
                        value: val,
                        color: modelColors[model] || '#6B7280',
                      }))} />
                    );
                  })()}
                </div>
                <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Hours by Activity</h3>
                  {(() => {
                    const CODES: Record<string, string> = {
                      research: 'Legal Research', drafting: 'Drafting', review: 'Doc Review',
                      correspondence: 'Correspondence', phone_call: 'Phone Call',
                      meeting_client: 'Client Meeting', meeting_other: 'Other Meeting',
                      court: 'Court', tribunal: 'Tribunal', mediation: 'Mediation/ADR',
                      filing: 'Filing/Service', travel: 'Travel', admin: 'Admin', other: 'Other',
                    };
                    const entries = Object.entries(revenueData.byActivity)
                      .sort((a, b) => b[1].hours - a[1].hours);
                    const max = Math.max(...entries.map(e => e[1].hours), 1);
                    return (
                      <BarChart
                        data={entries.map(([code, d]) => ({
                          label: CODES[code] || code,
                          value: d.hours,
                          subLabel: `${d.hours.toFixed(1)}h`,
                        }))}
                        maxValue={max}
                        color="#B94A1F"
                        labelWidth={120}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ========== TAB: TRUST ACCOUNT ========== */}
          <TabsContent value="trust">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={DollarSign} label="Current Balance" value={formatCurrency(trustData.currentBalance)}
                  accentColor={trustData.currentBalance >= 0 ? '#059669' : '#DC2626'} />
                <StatCard icon={ArrowUpRight} label="Total Deposits" value={formatCurrency(trustData.deposits)}
                  subValue={`${dateRange === 'all' ? 'All time' : `Last ${dateRange}`}`} accentColor="#059669" />
                <StatCard icon={ArrowDownRight} label="Total Withdrawals" value={formatCurrency(trustData.withdrawals)}
                  accentColor="#DC2626" />
                <StatCard icon={FileText} label="Transactions" value={String(trustData.totalTransactions)}
                  accentColor="#3B82F6" />
              </div>

              {/* Compliance alerts */}
              {trustData.negativeClients.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-heading text-base font-bold text-red-800">
                      LSO Compliance Alert — Negative Trust Balances
                    </h3>
                  </div>
                  <p className="text-sm font-paragraph text-red-700 mb-3">
                    The following clients have negative trust balances. LSO By-Law 9 requires all client trust balances to be non-negative.
                  </p>
                  <div className="space-y-1">
                    {trustData.negativeClients.map(c => (
                      <div key={c.id} className="flex justify-between text-sm font-paragraph bg-white rounded-lg px-3 py-2">
                        <span className="text-red-800 font-medium">{c.name}</span>
                        <span className="text-red-600 font-mono font-bold">{formatCurrency(c.balance)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly trust activity */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23]">Monthly Trust Activity</h3>
                  <Button variant="outline" size="sm"
                    className="border-[#D4C5B9] text-[#4A2C23]"
                    onClick={() => {
                      const entries = Object.entries(trustData.monthlyActivity).sort((a, b) => a[0].localeCompare(b[0]));
                      exportCsv('trust-activity.csv', ['Month', 'Deposits', 'Withdrawals', 'Net'],
                        entries.map(([k, v]) => [
                          getMonthLabel(k), v.deposits.toFixed(2), v.withdrawals.toFixed(2),
                          (v.deposits - v.withdrawals).toFixed(2)
                        ]));
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </Button>
                </div>
                {(() => {
                  const entries = Object.entries(trustData.monthlyActivity).sort((a, b) => a[0].localeCompare(b[0]));
                  if (entries.length === 0) return <p className="text-sm text-[#6B5B50] font-paragraph">No trust transactions in this period.</p>;
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm font-paragraph">
                        <thead className="bg-[#F0EBE3]">
                          <tr>
                            <th className="text-left p-3 text-[#4A2C23] font-semibold">Month</th>
                            <th className="text-right p-3 text-green-700 font-semibold">Deposits</th>
                            <th className="text-right p-3 text-red-700 font-semibold">Withdrawals</th>
                            <th className="text-right p-3 text-[#4A2C23] font-semibold">Net</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DDD3]">
                          {entries.map(([key, val]) => (
                            <tr key={key} className="hover:bg-[#F9F5F0]">
                              <td className="p-3">{getMonthLabel(key)}</td>
                              <td className="p-3 text-right font-mono text-green-700">{formatCurrency(val.deposits)}</td>
                              <td className="p-3 text-right font-mono text-red-700">{formatCurrency(val.withdrawals)}</td>
                              <td className={`p-3 text-right font-mono font-bold ${
                                val.deposits - val.withdrawals >= 0 ? 'text-[#4A2C23]' : 'text-red-600'
                              }`}>
                                {formatCurrency(val.deposits - val.withdrawals)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>

              {/* Client trust balances */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Client Trust Balances</h3>
                {(() => {
                  const clients = Object.entries(trustData.clientBalances)
                    .map(([id, b]) => ({ id, ...b, balance: b.deposits - b.withdrawals }))
                    .sort((a, b) => b.balance - a.balance);
                  if (clients.length === 0) return <p className="text-sm text-[#6B5B50] font-paragraph">No client trust data.</p>;
                  const max = Math.max(...clients.map(c => Math.abs(c.balance)), 1);
                  return (
                    <BarChart
                      data={clients.map(c => ({
                        label: c.name,
                        value: Math.abs(c.balance),
                        subLabel: formatCurrency(c.balance),
                      }))}
                      maxValue={max}
                      color="#4A7C59"
                      labelWidth={140}
                    />
                  );
                })()}
              </div>
            </div>
          </TabsContent>

          {/* ========== TAB: AGING RECEIVABLES ========== */}
          <TabsContent value="aging">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={DollarSign} label="Total Outstanding" value={formatCurrency(agingData.grandTotal)}
                  subValue={`${agingData.totalUnpaid} invoices`} accentColor="#D97706" />
                <StatCard icon={Clock} label="Current (0–30d)" value={formatCurrency(agingData.buckets.current)}
                  subValue={`${agingData.bucketCounts.current} invoices`} accentColor="#059669" />
                <StatCard icon={AlertCircle} label="31–60 Days" value={formatCurrency(agingData.buckets.thirty)}
                  subValue={`${agingData.bucketCounts.thirty} invoices`} accentColor="#D97706" />
                <StatCard icon={AlertCircle} label="60+ Days" value={formatCurrency(agingData.buckets.sixty + agingData.buckets.ninety)}
                  subValue={`${agingData.bucketCounts.sixty + agingData.bucketCounts.ninety} invoices`}
                  accentColor="#DC2626" />
              </div>

              {/* Aging bar visualization */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23]">Aging Breakdown</h3>
                  <Button variant="outline" size="sm" className="border-[#D4C5B9] text-[#4A2C23]"
                    onClick={() => {
                      const clients = Object.entries(agingData.byClient).sort((a, b) => b[1].total - a[1].total);
                      exportCsv('aging-receivables.csv', ['Client', 'Outstanding', 'Invoices', 'Oldest (days)'],
                        clients.map(([, c]) => [c.name, c.total.toFixed(2), String(c.count), String(c.oldest)]));
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </Button>
                </div>
                {agingData.grandTotal === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-[#6B5B50] font-paragraph">All invoices are paid or in draft. No outstanding receivables.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex rounded-lg overflow-hidden h-10 mb-6">
                      {[
                        { label: 'Current', value: agingData.buckets.current, color: '#059669' },
                        { label: '31–60d', value: agingData.buckets.thirty, color: '#D97706' },
                        { label: '61–90d', value: agingData.buckets.sixty, color: '#EA580C' },
                        { label: '90d+', value: agingData.buckets.ninety, color: '#DC2626' },
                      ].map(b => {
                        const pct = agingData.grandTotal > 0 ? (b.value / agingData.grandTotal) * 100 : 0;
                        if (pct === 0) return null;
                        return (
                          <div key={b.label} className="flex items-center justify-center text-xs text-white font-bold"
                            style={{ width: `${pct}%`, backgroundColor: b.color }}
                            title={`${b.label}: ${formatCurrency(b.value)}`}
                          >
                            {pct > 12 && formatCurrency(b.value)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Current (0–30d)', value: agingData.buckets.current, count: agingData.bucketCounts.current, color: '#059669' },
                        { label: '31–60 days', value: agingData.buckets.thirty, count: agingData.bucketCounts.thirty, color: '#D97706' },
                        { label: '61–90 days', value: agingData.buckets.sixty, count: agingData.bucketCounts.sixty, color: '#EA580C' },
                        { label: '90+ days', value: agingData.buckets.ninety, count: agingData.bucketCounts.ninety, color: '#DC2626' },
                      ].map(b => (
                        <div key={b.label} className="text-center">
                          <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: b.color }} />
                          <div className="text-xs font-paragraph text-[#6B5B50]">{b.label}</div>
                          <div className="font-mono font-bold text-[#4A2C23]">{formatCurrency(b.value)}</div>
                          <div className="text-xs text-[#6B5B50]">{b.count} invoice{b.count !== 1 ? 's' : ''}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Per-client breakdown */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Outstanding by Client</h3>
                {(() => {
                  const clients = Object.entries(agingData.byClient)
                    .map(([id, c]) => ({ id, ...c }))
                    .sort((a, b) => b.total - a.total);
                  if (clients.length === 0) return <p className="text-sm text-[#6B5B50] font-paragraph">No outstanding balances.</p>;
                  return (
                    <div className="space-y-3">
                      {clients.map(c => {
                        // Look up client email so we can deep-link a mailto: reminder.
                        // F-D action button: opens the user's mail client with a
                        // pre-composed reminder. Past 60 days we bump to a firmer tone.
                        const client = clientFiles.find((cf: any) => cf.clientId === c.id || cf._id === c.id);
                        const clientEmail = (client as any)?.clientEmail || (client as any)?.email || '';
                        const subject = encodeURIComponent(
                          c.oldest > 60
                            ? `Past-due account — ${c.name}`
                            : `Payment reminder — ${c.name}`
                        );
                        const body = encodeURIComponent(
                          (c.oldest > 60
                            ? `Hello,\n\nOur records show an outstanding balance of ${formatCurrency(c.total)} on your account, with the oldest invoice now ${c.oldest} days past due. Please remit payment at your earliest convenience or contact us to discuss a payment arrangement.\n\nIf payment has been sent recently, please disregard this notice.\n\n— Legal Assist Paralegal Services`
                            : `Hello,\n\nA gentle reminder that your account currently shows an outstanding balance of ${formatCurrency(c.total)} across ${c.count} invoice${c.count !== 1 ? 's' : ''}. Payment can be made through your client portal at www.legalassist.london/client-dashboard.\n\nThank you,\nLegal Assist Paralegal Services`)
                        );
                        const mailto = clientEmail
                          ? `mailto:${clientEmail}?subject=${subject}&body=${body}`
                          : '';
                        return (
                          <div key={c.id} className="flex items-center justify-between py-2 border-b border-[#E8DDD3] last:border-0 gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium font-paragraph text-[#4A2C23] truncate">{c.name}</div>
                              <div className="text-xs text-[#6B5B50]">
                                {c.count} invoice{c.count !== 1 ? 's' : ''} · oldest: {c.oldest} days
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`font-mono font-bold ${c.oldest > 60 ? 'text-red-600' : c.oldest > 30 ? 'text-amber-600' : 'text-[#4A2C23]'}`}>
                                {formatCurrency(c.total)}
                              </span>
                              {mailto && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#D4C5B9] text-[#4A2C23] text-xs"
                                  onClick={() => { window.location.href = mailto; }}
                                  title={`Email ${clientEmail}`}
                                >
                                  Remind
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </TabsContent>

          {/* ========== TAB: MATTER TYPE ANALYTICS ========== */}
          <TabsContent value="matters">
            <div className="space-y-6">
              {/* Summary table */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-[#4A2C23]">Matter-Type Breakdown</h3>
                  <Button variant="outline" size="sm" className="border-[#D4C5B9] text-[#4A2C23]"
                    onClick={() => {
                      const types = Object.entries(matterData).sort((a, b) => b[1].total - a[1].total);
                      exportCsv('matter-breakdown.csv',
                        ['Matter Type', 'Total Files', 'Active', 'Closed', 'Revenue', 'Hours', 'Avg Compliance %'],
                        types.map(([type, d]) => [
                          type, String(d.total), String(d.active), String(d.closed),
                          d.revenue.toFixed(2), d.hours.toFixed(1),
                          d.avgComplianceScore > 0 ? d.avgComplianceScore.toFixed(0) : 'N/A',
                        ]));
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-paragraph">
                    <thead className="bg-[#F0EBE3]">
                      <tr>
                        <th className="text-left p-3 text-[#4A2C23] font-semibold">Matter Type</th>
                        <th className="text-center p-3 text-[#4A2C23] font-semibold">Total</th>
                        <th className="text-center p-3 text-[#4A2C23] font-semibold">Active</th>
                        <th className="text-center p-3 text-[#4A2C23] font-semibold">Closed</th>
                        <th className="text-right p-3 text-[#4A2C23] font-semibold">Revenue</th>
                        <th className="text-right p-3 text-[#4A2C23] font-semibold">Hours</th>
                        <th className="text-center p-3 text-[#4A2C23] font-semibold">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD3]">
                      {Object.entries(matterData)
                        .sort((a, b) => b[1].total - a[1].total)
                        .map(([type, d]) => (
                          <tr key={type} className="hover:bg-[#F9F5F0]">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full shrink-0"
                                  style={{ backgroundColor: MATTER_COLORS[type] || '#6B7280' }} />
                                <span className="font-medium text-[#4A2C23]">{type}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center font-mono">{d.total}</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800">{d.active}</Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge className="bg-gray-100 text-gray-800">{d.closed}</Badge>
                            </td>
                            <td className="p-3 text-right font-mono">{formatCurrency(d.revenue)}</td>
                            <td className="p-3 text-right font-mono">{d.hours.toFixed(1)}h</td>
                            <td className="p-3 text-center">
                              {d.avgComplianceScore > 0 ? (
                                <Badge className={
                                  d.avgComplianceScore >= 80 ? 'bg-green-100 text-green-800' :
                                  d.avgComplianceScore >= 50 ? 'bg-amber-100 text-amber-800' :
                                  'bg-red-100 text-red-800'
                                }>
                                  {d.avgComplianceScore.toFixed(0)}%
                                </Badge>
                              ) : (
                                <span className="text-[#6B5B50]">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue by matter type */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Revenue by Matter Type</h3>
                {(() => {
                  const entries = Object.entries(matterData)
                    .filter(([, d]) => d.revenue > 0)
                    .sort((a, b) => b[1].revenue - a[1].revenue);
                  const max = Math.max(...entries.map(e => e[1].revenue), 1);
                  return (
                    <BarChart
                      data={entries.map(([type, d]) => ({ label: type, value: d.revenue }))}
                      maxValue={max}
                      color="#B94A1F"
                      labelWidth={130}
                    />
                  );
                })()}
              </div>

              {/* Hours by matter type */}
              <div className="bg-white rounded-xl border border-[#E8DDD3] p-6">
                <h3 className="font-heading text-lg font-bold text-[#4A2C23] mb-4">Hours by Matter Type</h3>
                {(() => {
                  const entries = Object.entries(matterData)
                    .filter(([, d]) => d.hours > 0)
                    .sort((a, b) => b[1].hours - a[1].hours);
                  const max = Math.max(...entries.map(e => e[1].hours), 1);
                  return (
                    <BarChart
                      data={entries.map(([type, d]) => ({ label: type, value: d.hours, subLabel: `${d.hours.toFixed(1)}h` }))}
                      maxValue={max}
                      color="#3B82F6"
                      labelWidth={130}
                    />
                  );
                })()}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
