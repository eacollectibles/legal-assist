/**
 * Disburse Funds Page — /admin/disburse-funds
 *
 * LSO By-Law 9 compliant outflow entry form. Records a debit against
 * either the Trust Account (Form 9A) or the General Account, with the
 * recipient, payment method, reference number, and client-file tie-in
 * required for trust withdrawals.
 *
 * Writes ONE row to the `financialrecords` collection via
 * /api/disbursements/create, mapped to an existing `transactionType`
 * already understood by TrustAccountingPage / SectionFinancialRecords:
 *
 *   source=trust  + client_disbursement   → trust_withdrawal
 *   source=general+ client_disbursement   → disbursement
 *   any           + refund_to_client      → refund
 *   any           + paralegal_payout      → payment (general only)
 *   any           + office_expense        → payment (general only)
 *   any           + bank_fee              → payment
 *
 * Validation rules enforced both client- and server-side:
 *   • Trust + paralegal_payout is blocked (must transfer to general first)
 *   • Trust + missing fileId is blocked (By-Law 9 s.18 — client tie-in)
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Send, AlertCircle, CheckCircle2, Loader2, DollarSign, Receipt,
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { isAuthenticated, isAdmin } from '@/lib/auth-service';
import { getActiveParalegals, getDefaultParalegal } from '@/lib/paralegals';

// ============================================================
// TYPES
// ============================================================

type SourceAccount = 'trust' | 'general';

type DisbursementType =
  | 'client_disbursement'
  | 'paralegal_payout'
  | 'office_expense'
  | 'refund_to_client'
  | 'bank_fee';

type RecipientType = 'paralegal' | 'vendor' | 'client' | 'court' | 'other';

type PaymentMethod =
  | 'cheque'
  | 'etransfer'
  | 'EFT'
  | 'wire'
  | 'cash'
  | 'debit'
  | 'credit_card';

interface ClientFileRow {
  _id: string;
  fileNumber?: string;
  clientId?: string;
  clientName?: string;
  matterType?: string;
  fileStatus?: string;
}

// ============================================================
// CONSTANTS
// ============================================================

const DISBURSEMENT_TYPES: { value: DisbursementType; label: string; help?: string }[] = [
  { value: 'client_disbursement', label: 'Client Disbursement (court fee, expert, transcript, process server)' },
  { value: 'paralegal_payout',    label: 'Paralegal Pay-out (earned fees — general account only)' },
  { value: 'office_expense',      label: 'Office Expense (general account only)' },
  { value: 'refund_to_client',    label: 'Refund to Client' },
  { value: 'bank_fee',            label: 'Bank Fee / Service Charge' },
];

const RECIPIENT_TYPES: { value: RecipientType; label: string }[] = [
  { value: 'paralegal', label: 'Paralegal' },
  { value: 'vendor',    label: 'Vendor' },
  { value: 'client',    label: 'Client' },
  { value: 'court',     label: 'Court' },
  { value: 'other',     label: 'Other' },
];

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'cheque',      label: 'Cheque' },
  { value: 'etransfer',   label: 'e-Transfer' },
  { value: 'EFT',         label: 'EFT' },
  { value: 'wire',        label: 'Wire Transfer' },
  { value: 'cash',        label: 'Cash' },
  { value: 'debit',       label: 'Debit' },
  { value: 'credit_card', label: 'Credit Card' },
];

// ============================================================
// COMPONENT
// ============================================================

export default function DisburseFundsPage() {
  const navigate = useNavigate();

  // Auth gate — paralegal admins only.
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
      return;
    }
    if (!isAdmin()) {
      navigate('/client-dashboard');
    }
  }, [navigate]);

  // ----- Form state -----
  const defaultParalegal = getDefaultParalegal();
  const activeParalegals = getActiveParalegals();

  const [sourceAccount, setSourceAccount] = useState<SourceAccount>('general');
  const [disbursementType, setDisbursementType] =
    useState<DisbursementType>('client_disbursement');
  const [recipient, setRecipient] = useState('');
  const [recipientType, setRecipientType] = useState<RecipientType>('vendor');
  const [fileId, setFileId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cheque');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [description, setDescription] = useState('');
  const [authorizedBy, setAuthorizedBy] = useState(defaultParalegal.displayName);

  // ----- Data state -----
  const [files, setFiles] = useState<ClientFileRow[]>([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [filesError, setFilesError] = useState<string>('');

  // ----- Submission state -----
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');

  // Load client files for the picker.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await BaseCrudService.getAll<ClientFileRow>(
          'clientfiles',
          undefined,
          { limit: 1000 }
        );
        if (cancelled) return;
        const sorted = [...(result.items || [])].sort((a, b) =>
          (a.clientName || '').localeCompare(b.clientName || '')
        );
        setFiles(sorted);
      } catch (e: any) {
        if (cancelled) return;
        setFilesError(e?.message || 'Failed to load client files.');
      } finally {
        if (!cancelled) setFilesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ----- Derived: required vs optional client/file -----
  const fileRequired =
    disbursementType === 'client_disbursement' ||
    disbursementType === 'refund_to_client' ||
    sourceAccount === 'trust';

  // ----- Validation -----
  const validationError = useMemo<string | null>(() => {
    // Hard rule: Trust + paralegal_payout — never allowed.
    if (sourceAccount === 'trust' && disbursementType === 'paralegal_payout') {
      return 'Paralegal pay-outs must be from General Account. Earned fees must first be transferred from trust to general (use the Trust→General Transfer flow).';
    }
    // Hard rule: Trust withdrawals must be tied to a client file
    // (LSO By-Law 9 s. 18).
    if (sourceAccount === 'trust' && !fileId) {
      return 'Trust disbursements must be tied to a specific client file (LSO By-Law 9 s. 18).';
    }
    // office_expense + trust source: not allowed.
    if (sourceAccount === 'trust' && disbursementType === 'office_expense') {
      return 'Office expenses cannot be paid out of the trust account. Select General as the source.';
    }
    return null;
  }, [sourceAccount, disbursementType, fileId]);

  // ----- Submit -----
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    // Re-check validation rules.
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    // Required field checks.
    if (!recipient.trim()) {
      setSubmitError('Recipient is required.');
      return;
    }
    const amountNum = parseFloat(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setSubmitError('Amount must be a positive number.');
      return;
    }
    if (!referenceNumber.trim()) {
      setSubmitError('Reference / cheque number is required.');
      return;
    }
    if (!description.trim()) {
      setSubmitError('Description / memo is required.');
      return;
    }
    if (fileRequired && !fileId) {
      setSubmitError('A client file must be selected for this disbursement type.');
      return;
    }

    // Resolve clientId from the selected file (so we can write both).
    const selectedFile = files.find((f) => f._id === fileId) || null;
    const clientId = selectedFile?.clientId || null;

    setSubmitting(true);
    try {
      const res = await fetch('/api/disbursements/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceAccount,
          disbursementType,
          recipient: recipient.trim(),
          recipientType,
          fileId: fileId || null,
          clientId,
          amount: amountNum,
          paymentMethod,
          referenceNumber: referenceNumber.trim(),
          transactionDate,
          description: description.trim(),
          authorizedBy: authorizedBy.trim() || defaultParalegal.displayName,
        }),
      });
      const data: any = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === false) {
        setSubmitError(
          data?.error || `Failed to record disbursement (HTTP ${res.status}).`
        );
        return;
      }
      setSubmitSuccess(
        `Recorded $${amountNum.toFixed(2)} to ${recipient.trim()}` +
          (data?.recordId ? ` (id: ${data.recordId.slice(0, 8)}…)` : '') +
          '.'
      );
      // Reset transactional fields; keep source/type so paralegal can
      // batch-record multiple similar items.
      setRecipient('');
      setAmount('');
      setReferenceNumber('');
      setDescription('');
      setFileId('');
      setTransactionDate(new Date().toISOString().split('T')[0]);
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error recording disbursement.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <BackToDashboard />
      <main className="flex-1 w-full">
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Disburse Funds — LSO By-Law 9
              </h1>
            </div>
            <p className="font-paragraph text-foreground/70 max-w-3xl">
              Record an outflow from either the Trust Account (Form 9A) or the
              General Account. Trust withdrawals must be tied to a specific
              client file. Paralegal pay-outs must come from the general
              account after the related fees have been transferred out of trust
              against a delivered invoice.
            </p>
          </div>

          {filesError && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                Failed to load client files: {filesError}. You can still record
                a disbursement that does not require a client file.
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                New Disbursement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Source account */}
                <div>
                  <Label className="font-medium">Source Account</Label>
                  <p className="text-xs text-foreground/50 mb-2">
                    Which ledger is this disbursement debited against?
                  </p>
                  <RadioGroup
                    value={sourceAccount}
                    onValueChange={(v) => setSourceAccount(v as SourceAccount)}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <label
                      htmlFor="src-trust"
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer flex-1 ${
                        sourceAccount === 'trust'
                          ? 'border-primary bg-primary/5'
                          : 'border-foreground/15'
                      }`}
                    >
                      <RadioGroupItem id="src-trust" value="trust" />
                      <div>
                        <div className="font-medium text-foreground">
                          Trust Account
                        </div>
                        <div className="text-xs text-foreground/60">
                          Form 9A withdrawal. Must be tied to a client file.
                        </div>
                      </div>
                    </label>
                    <label
                      htmlFor="src-general"
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer flex-1 ${
                        sourceAccount === 'general'
                          ? 'border-primary bg-primary/5'
                          : 'border-foreground/15'
                      }`}
                    >
                      <RadioGroupItem id="src-general" value="general" />
                      <div>
                        <div className="font-medium text-foreground">
                          General Account
                        </div>
                        <div className="text-xs text-foreground/60">
                          Operating account — fees, payouts, office expenses.
                        </div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                {/* Disbursement type */}
                <div>
                  <Label htmlFor="dtype" className="font-medium">
                    Disbursement Type
                  </Label>
                  <Select
                    value={disbursementType}
                    onValueChange={(v) =>
                      setDisbursementType(v as DisbursementType)
                    }
                  >
                    <SelectTrigger id="dtype" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DISBURSEMENT_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Validation banner */}
                {validationError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>{validationError}</div>
                  </div>
                )}

                {/* Recipient + recipient type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipient" className="font-medium">
                      Recipient
                    </Label>
                    <Input
                      id="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder='e.g. "Ministry of the Attorney General"'
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="font-medium">Recipient Type</Label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {RECIPIENT_TYPES.map((rt) => {
                        const active = recipientType === rt.value;
                        return (
                          <button
                            key={rt.value}
                            type="button"
                            onClick={() => setRecipientType(rt.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                              active
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white text-foreground/70 border-foreground/15 hover:border-foreground/30'
                            }`}
                          >
                            {rt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Paralegal recipient picker — only when recipientType=paralegal */}
                {recipientType === 'paralegal' && (
                  <div>
                    <Label className="font-medium">Paralegal Recipient</Label>
                    <Select
                      value={recipient}
                      onValueChange={(v) => setRecipient(v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select paralegal…" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeParalegals.map((p) => (
                          <SelectItem key={p.id} value={p.displayName}>
                            {p.displayName} (LSO #{p.lsoNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-foreground/50 mt-1">
                      Picker writes the paralegal's display name into the
                      Recipient field above.
                    </p>
                  </div>
                )}

                {/* Client / file picker */}
                <div>
                  <Label htmlFor="file" className="font-medium">
                    Client / File{' '}
                    <span className="text-foreground/50">
                      ({fileRequired ? 'required' : 'optional'})
                    </span>
                  </Label>
                  {filesLoading ? (
                    <div className="mt-1 text-sm text-foreground/60 flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Loading client files…
                    </div>
                  ) : (
                    <Select value={fileId} onValueChange={setFileId}>
                      <SelectTrigger id="file" className="mt-1">
                        <SelectValue placeholder="Select client file…" />
                      </SelectTrigger>
                      <SelectContent>
                        {files.length === 0 && (
                          <div className="px-2 py-1 text-sm text-foreground/60">
                            No client files yet.
                          </div>
                        )}
                        {files.map((f) => (
                          <SelectItem key={f._id} value={f._id}>
                            {(f.clientName || 'Unnamed Client') +
                              (f.fileNumber ? ` — File ${f.fileNumber}` : '') +
                              (f.matterType ? ` (${f.matterType})` : '')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Amount + Payment method + Reference + Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount" className="font-medium">
                      Amount (CAD)
                    </Label>
                    <div className="mt-1 relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-9"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="paymethod" className="font-medium">
                      Payment Method
                    </Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                    >
                      <SelectTrigger id="paymethod" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_METHODS.map((m) => (
                          <SelectItem key={m.value} value={m.value}>
                            {m.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="refnum" className="font-medium">
                      Reference / Cheque Number
                    </Label>
                    <Input
                      id="refnum"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      placeholder="Cheque #, EFT confirmation, or invoice ref"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="txdate" className="font-medium">
                      Date
                    </Label>
                    <Input
                      id="txdate"
                      type="date"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="desc" className="font-medium">
                    Description / Memo
                  </Label>
                  <Textarea
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="What was paid for — e.g. 'Form 10 issuance fee for Smith v. Jones'"
                    className="mt-1"
                  />
                </div>

                {/* Authorized by */}
                <div>
                  <Label htmlFor="authby" className="font-medium">
                    Authorized By
                  </Label>
                  <Input
                    id="authby"
                    value={authorizedBy}
                    onChange={(e) => setAuthorizedBy(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Defaults to the firm's primary paralegal —{' '}
                    {defaultParalegal.displayName} (LSO #
                    {defaultParalegal.lsoNumber}).
                  </p>
                </div>

                {/* Errors / success */}
                {submitError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>{submitError}</div>
                  </div>
                )}
                {submitSuccess && (
                  <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>{submitSuccess}</div>
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="submit"
                    disabled={submitting || !!validationError}
                    className="gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Recording…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Record Disbursement
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/trust-accounting')}
                  >
                    Open Trust Accounting
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
