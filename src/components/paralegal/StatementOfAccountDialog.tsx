/**
 * Statement of Account Dialog
 *
 * Paralegal-facing dialog that lets the user:
 *   1. Select docket entries (time entries) and disbursements to include
 *   2. Review auto-filled statement metadata (dates, delivery note, etc.)
 *   3. Generate and download a professional SOA PDF
 *
 * Opened from Section G (Financial Records) of the client file detail page.
 */

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  X, Download, Loader2, FileText, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import {
  generateAndDownloadSOA,
  generateInvoiceNumber,
  parseDocketMeta,
  toSOADocketEntry,
  type SOAParams,
  type SOADocketEntry,
  type SOADisbursement,
  type SOATrustEntry,
} from '@/lib/soa-generator';
import { getActiveParalegals, getDefaultParalegal } from '@/lib/paralegals';

// ─── Props ───────────────────────────────────────────────────────────

interface FinancialRecord {
  _id?: string;
  transactionType: string;
  amount: string;
  transactionDate: string;
  description: string;
  referenceNumber: string;
  paymentMethod: string;
  invoiceNumber: string;
  recordedBy: string;
  trustAccountId?: string;
}

interface ClientFile {
  _id: string;
  fileNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  matterType: string;
  matterDescription: string;
  assignedParalegalId?: string;
  assignedParalegalName: string;
  dateOpened: string;
}

interface StatementOfAccountDialogProps {
  open: boolean;
  onClose: () => void;
  file: ClientFile;
  records: FinancialRecord[];
  /** Total count of existing invoices for this file, used to auto-increment */
  existingInvoiceCount?: number;
}

// ─── Component ───────────────────────────────────────────────────────

export default function StatementOfAccountDialog({
  open,
  onClose,
  file,
  records,
  existingInvoiceCount = 0,
}: StatementOfAccountDialogProps) {
  // ── Classify records ──
  const docketEntries = useMemo(() => {
    return records
      .filter((r) => r.transactionType === 'docket_entry')
      .map((r) => {
        const meta = parseDocketMeta(r.trustAccountId);
        return { record: r, meta };
      })
      .sort((a, b) => (a.record.transactionDate || '').localeCompare(b.record.transactionDate || ''));
  }, [records]);

  const disbursementRecords = useMemo(() => {
    return records
      .filter((r) => r.transactionType === 'disbursement')
      .sort((a, b) => (a.transactionDate || '').localeCompare(b.transactionDate || ''));
  }, [records]);

  const trustRecords = useMemo(() => {
    // Build trust ledger from trust_deposit, trust_withdrawal, transfer
    const trustTypes = ['trust_deposit', 'trust_withdrawal', 'transfer'];
    const sorted = records
      .filter((r) => trustTypes.includes(r.transactionType))
      .sort((a, b) => (a.transactionDate || '').localeCompare(b.transactionDate || ''));

    let balance = 0;
    return sorted.map((r) => {
      const amt = parseFloat(r.amount) || 0;
      const isDeposit = r.transactionType === 'trust_deposit';
      if (isDeposit) {
        balance += amt;
      } else {
        balance -= amt;
      }
      return {
        date: new Date(r.transactionDate),
        description: r.description || (isDeposit ? 'Retainer deposit received from client' : 'Transfer to general account'),
        received: isDeposit ? amt : 0,
        disbursed: !isDeposit ? amt : 0,
        balance,
      } satisfies SOATrustEntry;
    });
  }, [records]);

  // ── Retainer agreement date — look for first trust_deposit ──
  const retainerDate = useMemo(() => {
    const firstDeposit = records
      .filter((r) => r.transactionType === 'trust_deposit')
      .sort((a, b) => (a.transactionDate || '').localeCompare(b.transactionDate || ''));
    return firstDeposit.length > 0 ? new Date(firstDeposit[0].transactionDate) : null;
  }, [records]);

  // ── Rate config ──
  const rateConfig = useMemo(() => {
    const rc = records.find((r) => r.transactionType === 'rate_config');
    if (!rc) return { hourlyRate: 100, billingModel: 'hourly' };
    try {
      const parsed = JSON.parse(rc.description);
      return {
        hourlyRate: Number(parsed.hourlyRate) || 100,
        billingModel: parsed.billingModel || 'hourly',
      };
    } catch {
      return { hourlyRate: 100, billingModel: 'hourly' };
    }
  }, [records]);

  // ── Selection state ──
  const [selectedDockets, setSelectedDockets] = useState<Set<string>>(
    () => new Set(docketEntries.filter((d) => d.meta?.status === 'unbilled').map((d) => d.record._id!))
  );
  const [selectedDisbursements, setSelectedDisbursements] = useState<Set<string>>(
    () => new Set(disbursementRecords.map((d) => d._id!))
  );

  // ── Form state (auto-filled, editable) ──
  const today = new Date();
  const [statementDate, setStatementDate] = useState(today.toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(
    generateInvoiceNumber(existingInvoiceCount)
  );

  // Auto-detect billing period from selected entries
  const billingPeriod = useMemo(() => {
    const selectedEntryDates = docketEntries
      .filter((d) => selectedDockets.has(d.record._id!))
      .map((d) => d.record.transactionDate)
      .concat(
        disbursementRecords
          .filter((d) => selectedDisbursements.has(d._id!))
          .map((d) => d.transactionDate)
      )
      .filter(Boolean)
      .sort();

    if (selectedEntryDates.length === 0) {
      return { start: today.toISOString().split('T')[0], end: today.toISOString().split('T')[0] };
    }
    return { start: selectedEntryDates[0], end: selectedEntryDates[selectedEntryDates.length - 1] };
  }, [selectedDockets, selectedDisbursements, docketEntries, disbursementRecords]);

  const [periodStart, setPeriodStart] = useState(billingPeriod.start);
  const [periodEnd, setPeriodEnd] = useState(billingPeriod.end);

  // Update period when selection changes
  useMemo(() => {
    setPeriodStart(billingPeriod.start);
    setPeriodEnd(billingPeriod.end);
  }, [billingPeriod.start, billingPeriod.end]);

  const [deliveryNote, setDeliveryNote] = useState(
    `By email to client on ${today.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}`
  );

  const paralegals = getActiveParalegals();
  const defaultParalegal = getDefaultParalegal();
  const [selectedParalegalId, setSelectedParalegalId] = useState(
    file.assignedParalegalId || defaultParalegal.id
  );

  // ── UI state ──
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ── Computed totals ──
  const selectedDocketEntries = docketEntries.filter((d) => selectedDockets.has(d.record._id!));
  const totalHours = selectedDocketEntries.reduce((s, d) => {
    const meta = d.meta;
    if (!meta) return s;
    return s + meta.hours + meta.minutes / 60;
  }, 0);
  const totalFees = selectedDocketEntries.reduce((s, d) => {
    const meta = d.meta;
    if (!meta) return s;
    const hours = meta.hours + meta.minutes / 60;
    return s + hours * meta.rate;
  }, 0);
  const totalDisb = disbursementRecords
    .filter((d) => selectedDisbursements.has(d._id!))
    .reduce((s, d) => s + (parseFloat(d.amount) || 0), 0);
  const subtotal = totalFees + totalDisb;
  const hst = Math.round(subtotal * 13) / 100;
  const total = subtotal + hst;

  // ── Toggle helpers ──
  const toggleDocket = (id: string) => {
    setSelectedDockets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAllDockets = () => {
    if (selectedDockets.size === docketEntries.length) {
      setSelectedDockets(new Set());
    } else {
      setSelectedDockets(new Set(docketEntries.map((d) => d.record._id!)));
    }
  };
  const toggleDisbursement = (id: string) => {
    setSelectedDisbursements((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Activity code labels ──
  const activityLabels: Record<string, string> = {
    research: 'Legal Research',
    drafting: 'Drafting',
    review: 'Review',
    correspondence: 'Correspondence',
    phone_call: 'Telephone Call',
    meeting_client: 'Client Meeting',
    meeting_other: 'Meeting',
    court: 'Court Attendance',
    tribunal: 'Tribunal Attendance',
    mediation: 'Mediation',
    filing: 'Filing',
    travel: 'Travel',
    admin: 'Administration',
    other: 'Other',
  };

  // ── Generate handler ──
  const handleGenerate = async () => {
    if (selectedDockets.size === 0 && selectedDisbursements.size === 0) {
      setError('Select at least one entry to include in the statement.');
      return;
    }
    setError('');
    setGenerating(true);
    try {
      const soaDockets: SOADocketEntry[] = selectedDocketEntries.map((d) =>
        toSOADocketEntry({
          _id: d.record._id!,
          transactionDate: d.record.transactionDate,
          description: d.record.description,
          amount: parseFloat(d.record.amount) || 0,
          trustAccountId: d.record.trustAccountId,
        })
      );

      const soaDisbursements: SOADisbursement[] = disbursementRecords
        .filter((d) => selectedDisbursements.has(d._id!))
        .map((d) => ({
          id: d._id!,
          date: new Date(d.transactionDate),
          description: d.description || 'Disbursement',
          amount: parseFloat(d.amount) || 0,
        }));

      // Add the transfer line for this statement to the trust ledger
      const trustEntriesForSOA: SOATrustEntry[] = [...trustRecords];
      if (total > 0 && trustEntriesForSOA.length > 0) {
        const lastBalance = trustEntriesForSOA[trustEntriesForSOA.length - 1].balance;
        trustEntriesForSOA.push({
          date: new Date(statementDate),
          description: `Transfer to general account — fees per this statement, authorized pursuant to s. 5 of the retainer agreement${retainerDate ? ` dated ${retainerDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}`,
          received: 0,
          disbursed: total,
          balance: lastBalance - total,
        });
      }

      const params: SOAParams = {
        statementDate: new Date(statementDate),
        invoiceNumber,
        clientName: file.clientName,
        fileNumber: file.fileNumber,
        matterDescription: file.matterDescription || file.matterType || '',
        retainerDate,
        billingPeriodStart: new Date(periodStart),
        billingPeriodEnd: new Date(periodEnd),
        deliveryNote,
        paralegalId: selectedParalegalId,
        hourlyRate: rateConfig.hourlyRate,
        docketEntries: soaDockets,
        disbursements: soaDisbursements,
        trustEntries: trustEntriesForSOA,
      };

      await generateAndDownloadSOA(params);
      onClose();
    } catch (err: any) {
      console.error('SOA generation failed:', err);
      setError(`Generation failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setGenerating(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Generate Statement of Account</h2>
              <p className="text-xs text-gray-500">{file.fileNumber} — {file.clientName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* ── DOCKET ENTRIES (TIME) ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">
                A. Professional Services ({docketEntries.length} entries)
              </h3>
              {docketEntries.length > 0 && (
                <button
                  onClick={toggleAllDockets}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {selectedDockets.size === docketEntries.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            {docketEntries.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-3">
                No docket entries found. Add time entries in the Time &amp; Billing page first.
              </p>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-60 overflow-y-auto">
                {docketEntries.map(({ record, meta }) => {
                  const hours = meta ? meta.hours + meta.minutes / 60 : 0;
                  const rate = meta?.rate ?? 0;
                  const amount = hours * rate;
                  const isUnbilled = meta?.status === 'unbilled';
                  const checked = selectedDockets.has(record._id!);

                  return (
                    <label
                      key={record._id}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                        checked ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDocket(record._id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {record.transactionDate}
                          </span>
                          {isUnbilled && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                              Unbilled
                            </span>
                          )}
                          {meta?.activityCode && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {activityLabels[meta.activityCode] || meta.activityCode}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-700 truncate mt-0.5">{record.description}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="text-xs font-medium text-gray-800">{hours.toFixed(1)}h × ${rate}</p>
                        <p className="text-xs text-gray-500">${amount.toFixed(2)}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── DISBURSEMENTS ── */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              B. Disbursements ({disbursementRecords.length} entries)
            </h3>

            {disbursementRecords.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-2">No disbursements recorded.</p>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
                {disbursementRecords.map((record) => {
                  const checked = selectedDisbursements.has(record._id!);
                  return (
                    <label
                      key={record._id}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                        checked ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDisbursement(record._id!)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500">{record.transactionDate}</span>
                        <p className="text-xs text-gray-700 truncate">{record.description}</p>
                      </div>
                      <span className="text-xs font-medium text-gray-800">
                        ${(parseFloat(record.amount) || 0).toFixed(2)}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── SUMMARY PREVIEW ── */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-bold text-gray-800 mb-2">C. Summary Preview</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Professional Fees ({totalHours.toFixed(1)} hrs)</span>
              <span className="font-medium">${totalFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Disbursements</span>
              <span className="font-medium">${totalDisb.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">HST (13%)</span>
              <span className="font-medium">${hst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm bg-slate-800 text-white px-3 py-2 rounded -mx-1">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* ── STATEMENT DETAILS (editable) ── */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3 hover:text-blue-700 transition-colors"
            >
              Statement Details
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Statement Date</label>
                    <Input
                      type="date"
                      value={statementDate}
                      onChange={(e) => setStatementDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Invoice Number</label>
                    <Input
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Billing Period Start</label>
                    <Input
                      type="date"
                      value={periodStart}
                      onChange={(e) => setPeriodStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Billing Period End</label>
                    <Input
                      type="date"
                      value={periodEnd}
                      onChange={(e) => setPeriodEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Prepared By</label>
                  <select
                    value={selectedParalegalId}
                    onChange={(e) => setSelectedParalegalId(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
                  >
                    {paralegals.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.displayName} — LSO #{p.lsoNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Note</label>
                  <Input
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="e.g. By email to client on July 16, 2026"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {selectedDockets.size} time {selectedDockets.size === 1 ? 'entry' : 'entries'} +{' '}
            {selectedDisbursements.size} disbursement{selectedDisbursements.size !== 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={generating || (selectedDockets.size === 0 && selectedDisbursements.size === 0)}
              onClick={handleGenerate}
              className={`text-white ${
                !generating && (selectedDockets.size > 0 || selectedDisbursements.size > 0)
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1.5" /> Generate & Download
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
