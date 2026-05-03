/**
 * Paralegal Payments page — /admin/payments
 *
 * Two operations the paralegal can do from here:
 *
 *   1. "Take Payment Now" — collect a card over the phone (or in
 *      person) for a specific client/matter, charge it via Square,
 *      and write to both `payments` (Square audit trail) and
 *      `financialrecords` (Form 9A trust ledger) automatically.
 *
 *   2. "Generate Payment Link" — build a deep link to the public
 *      `/pay` page with `client`, `file`, `type`, and `amount` query
 *      parameters pre-filled. Email or text it to the client when
 *      sending an invoice; they pay with no login required.
 *
 * Plus a chronological list of recent Square payments at the bottom
 * (pulled from the `payments` collection) so the paralegal can confirm
 * a charge cleared, copy a receipt URL, etc.
 */

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToDashboard from '@/components/BackToDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  CreditCard,
  Link as LinkIcon,
  Phone,
  Receipt,
  Copy,
  ExternalLink,
  Search,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { format } from 'date-fns';
import { BaseCrudService } from '@/integrations';
import PaymentForm, {
  type PaymentSuccess,
  type PaymentType,
} from '@/components/payments/PaymentForm';
import { isAuthenticated, isAdmin } from '@/lib/auth-service';
import { useNavigate } from 'react-router-dom';

interface ClientRow {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  caseType?: string;
}

interface PaymentRow {
  _id: string;
  squarePaymentId?: string;
  status?: string;
  paymentType?: PaymentType;
  amountCents?: number;
  currency?: string;
  matterReference?: string;
  clientId?: string;
  clientName?: string;
  buyerEmail?: string;
  note?: string;
  receiptUrl?: string;
  receiptNumber?: string;
  processedAt?: string;
  _createdDate?: string | Date;
}

const PAYMENT_TYPE_OPTIONS: { value: PaymentType; label: string }[] = [
  { value: 'trust_deposit', label: 'Trust Deposit (retainer top-up)' },
  { value: 'invoice_payment', label: 'Invoice Payment' },
  { value: 'consultation', label: 'Consultation / Fixed Fee' },
];

export default function PaymentsPage() {
  const navigate = useNavigate();

  // Auth gate — only paralegal admins should see this page.
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/client-login');
      return;
    }
    if (!isAdmin()) {
      navigate('/client-dashboard');
    }
  }, [navigate]);

  // Data
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Take-payment modal
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  // Payment-link modal
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkClientId, setLinkClientId] = useState<string>('');
  const [linkPaymentType, setLinkPaymentType] = useState<PaymentType>('invoice_payment');
  const [linkAmount, setLinkAmount] = useState<string>('');
  const [linkFileRef, setLinkFileRef] = useState<string>('');
  const [linkNote, setLinkNote] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);

  // Recent-payments search
  const [searchTerm, setSearchTerm] = useState('');

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [clientsRes, paymentsRes] = await Promise.all([
        BaseCrudService.getAll<ClientRow>('clientprofiles'),
        BaseCrudService.getAll<PaymentRow>('payments').catch(() => ({ items: [] as PaymentRow[] })),
      ]);
      setClients(clientsRes.items || []);
      // Most-recent first.
      const sorted = [...(paymentsRes.items || [])].sort((a, b) => {
        const ad = new Date(a.processedAt || a._createdDate || 0).getTime();
        const bd = new Date(b.processedAt || b._createdDate || 0).getTime();
        return bd - ad;
      });
      setPayments(sorted);
    } catch (e: any) {
      setError(e?.message || 'Failed to load payment data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // ---------- Take Payment Now ----------

  function openTakePayment() {
    setSelectedClientId('');
    setIsPayDialogOpen(true);
  }

  const selectedClient = useMemo(
    () => clients.find((c) => c._id === selectedClientId) || null,
    [clients, selectedClientId]
  );

  // ---------- Payment Link ----------

  const linkClient = useMemo(
    () => clients.find((c) => c._id === linkClientId) || null,
    [clients, linkClientId]
  );

  const generatedLink = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin || 'https://www.legalassist.london';
    const params = new URLSearchParams();
    if (linkPaymentType) params.set('type', linkPaymentType);
    if (linkAmount) params.set('amount', linkAmount);
    if (linkFileRef.trim()) params.set('file', linkFileRef.trim());
    if (linkClient) {
      const name =
        `${linkClient.firstName || ''} ${linkClient.lastName || ''}`.trim();
      if (name) params.set('name', name);
      if (linkClient.email) params.set('email', linkClient.email);
    }
    if (linkNote.trim()) params.set('note', linkNote.trim());
    const qs = params.toString();
    return `${origin}/pay${qs ? `?${qs}` : ''}`;
  }, [linkPaymentType, linkAmount, linkFileRef, linkClient, linkNote]);

  async function copyLinkToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  function emailPaymentLink() {
    if (!linkClient?.email) return;
    const subject = encodeURIComponent(
      `Legal Assist — secure payment link${
        linkFileRef ? ` (File ${linkFileRef})` : ''
      }`
    );
    const body = encodeURIComponent(
      `Hi ${linkClient.firstName || 'there'},\n\n` +
        `You can pay securely by credit or debit card using the link below.${
          linkAmount ? ` The amount is $${Number(linkAmount).toFixed(2)} CAD.` : ''
        }${linkFileRef ? ` This is for File ${linkFileRef}.` : ''}\n\n` +
        `${generatedLink}\n\n` +
        `Funds are processed by Square and held in our trust account in accordance ` +
        `with LSO By-Law 9 until the related work has been performed and billed.\n\n` +
        `If you have any questions, just reply to this email.\n\n` +
        `— Legal Assist Paralegal Services\n` +
        `Jean-Francois Demers, Licensed Paralegal (LSO #P22020)`
    );
    window.location.href = `mailto:${linkClient.email}?subject=${subject}&body=${body}`;
  }

  // ---------- Recent payments filter ----------

  const filteredPayments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter((p) =>
      [
        p.clientName,
        p.buyerEmail,
        p.matterReference,
        p.note,
        p.receiptNumber,
        p.squarePaymentId,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [payments, searchTerm]);

  function formatMoney(cents?: number, currency = 'CAD'): string {
    if (typeof cents !== 'number') return '—';
    return `$${(cents / 100).toFixed(2)} ${currency}`;
  }

  function formatPaymentType(t?: string): string {
    switch (t) {
      case 'trust_deposit':
        return 'Trust Deposit';
      case 'invoice_payment':
        return 'Invoice Payment';
      case 'consultation':
        return 'Consultation';
      default:
        return t || '—';
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <BackToDashboard />
      <main className="flex-1 w-full">
        <section className="max-w-[100rem] mx-auto px-4 md:px-8 py-10 md:py-14">
          {/* Page header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Payments
              </h1>
              <p className="font-paragraph text-foreground/70 mt-2 max-w-2xl">
                Charge a client&rsquo;s card over the phone, generate a secure payment
                link to send with an invoice, or review recent Square deposits. Every
                charge is automatically recorded in the trust accounting journal
                (Form 9A) for LSO By-Law 9 compliance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={openTakePayment} className="gap-2">
                <Phone className="w-4 h-4" />
                Take Payment Now
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLinkDialogOpen(true)}
                className="gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                Generate Payment Link
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Recent payments */}
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Recent Square Payments
              </CardTitle>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by client, file ref, receipt #…"
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-foreground/60 py-6">Loading payments…</p>
              ) : filteredPayments.length === 0 ? (
                <div className="py-10 text-center text-foreground/60">
                  No payments yet. Click <strong>Take Payment Now</strong> to charge a
                  client over the phone.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-foreground/10 text-left text-foreground/60">
                        <th className="py-2 pr-4 font-paragraph font-medium">Date</th>
                        <th className="py-2 pr-4 font-paragraph font-medium">Client</th>
                        <th className="py-2 pr-4 font-paragraph font-medium">Type</th>
                        <th className="py-2 pr-4 font-paragraph font-medium">File</th>
                        <th className="py-2 pr-4 font-paragraph font-medium">Amount</th>
                        <th className="py-2 pr-4 font-paragraph font-medium">Status</th>
                        <th className="py-2 pr-4 font-paragraph font-medium text-right">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((p) => (
                        <tr key={p._id} className="border-b border-foreground/5">
                          <td className="py-2 pr-4 text-foreground/80 whitespace-nowrap">
                            {p.processedAt || p._createdDate
                              ? format(
                                  new Date((p.processedAt || p._createdDate) as any),
                                  'MMM d, yyyy h:mm a'
                                )
                              : '—'}
                          </td>
                          <td className="py-2 pr-4 text-foreground">
                            <div className="font-medium">{p.clientName || '—'}</div>
                            {p.buyerEmail && (
                              <div className="text-xs text-foreground/50">
                                {p.buyerEmail}
                              </div>
                            )}
                          </td>
                          <td className="py-2 pr-4">
                            <Badge variant="outline">{formatPaymentType(p.paymentType)}</Badge>
                          </td>
                          <td className="py-2 pr-4 text-foreground/80">
                            {p.matterReference || '—'}
                          </td>
                          <td className="py-2 pr-4 font-medium text-foreground">
                            {formatMoney(p.amountCents, p.currency)}
                          </td>
                          <td className="py-2 pr-4">
                            <Badge
                              className={
                                p.status === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }
                            >
                              {p.status || '—'}
                            </Badge>
                          </td>
                          <td className="py-2 pr-4 text-right">
                            {p.receiptUrl ? (
                              <a
                                href={p.receiptUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                {p.receiptNumber || 'View'}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              '—'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />

      {/* ---------- Take Payment Now ---------- */}
      <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Take Payment Over the Phone
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mb-4">
            <Label htmlFor="payClient">Client</Label>
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger id="payClient">
                <SelectValue placeholder="Select the client you're on the phone with" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {`${c.firstName || ''} ${c.lastName || ''}`.trim() || c.email || c._id}
                    {c.email ? ` — ${c.email}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedClient && (
              <p className="text-xs text-foreground/60">
                Card will be charged on behalf of <strong>
                  {selectedClient.firstName} {selectedClient.lastName}
                </strong>
                . The deposit is recorded automatically in the Form 9A transaction
                journal under this client&rsquo;s ledger.
              </p>
            )}
          </div>

          {selectedClient ? (
            <PaymentForm
              defaults={{
                clientId: selectedClient._id,
                clientName:
                  `${selectedClient.firstName || ''} ${selectedClient.lastName || ''}`.trim() ||
                  selectedClient.email ||
                  '',
                buyerEmail: selectedClient.email,
                paymentType: 'trust_deposit',
              }}
              lockClient
              onCancel={() => setIsPayDialogOpen(false)}
              onSuccess={(_s: PaymentSuccess) => {
                setTimeout(() => {
                  setIsPayDialogOpen(false);
                  loadData();
                }, 1500);
              }}
            />
          ) : (
            <p className="text-sm text-foreground/60 py-6">
              Select a client above to load the card form.
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------- Generate Payment Link ---------- */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Generate Payment Link
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="linkClient">Client (optional)</Label>
              {/*
                NOTE: Radix UI's <Select.Item /> throws if value="". We use
                the sentinel string "__none__" for the "no client" option
                and translate it back to an empty linkClientId in the
                onValueChange handler below.
              */}
              <Select
                value={linkClientId || '__none__'}
                onValueChange={(v) => setLinkClientId(v === '__none__' ? '' : v)}
              >
                <SelectTrigger id="linkClient">
                  <SelectValue placeholder="No client / one-off payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— No client / one-off —</SelectItem>
                  {clients.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {`${c.firstName || ''} ${c.lastName || ''}`.trim() ||
                        c.email ||
                        c._id}
                      {c.email ? ` — ${c.email}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-foreground/60">
                Selecting a client pre-fills their name and email on the payment page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkType">Payment type</Label>
                <Select
                  value={linkPaymentType}
                  onValueChange={(v) => setLinkPaymentType(v as PaymentType)}
                >
                  <SelectTrigger id="linkType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkAmount">Amount (CAD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">
                    $
                  </span>
                  <Input
                    id="linkAmount"
                    type="text"
                    inputMode="decimal"
                    value={linkAmount}
                    onChange={(e) => setLinkAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkFile">File / matter reference</Label>
              <Input
                id="linkFile"
                value={linkFileRef}
                onChange={(e) => setLinkFileRef(e.target.value)}
                placeholder="e.g. POA-2026-001 or INV-1042"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkNote">Note (optional)</Label>
              <Textarea
                id="linkNote"
                value={linkNote}
                onChange={(e) => setLinkNote(e.target.value)}
                rows={2}
                placeholder="Anything you'd like prefilled on the payment page."
              />
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs text-foreground/60 font-paragraph mb-2">
                Generated link
              </p>
              <code className="block w-full text-xs break-all text-foreground">
                {generatedLink}
              </code>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyLinkToClipboard}
                  className="gap-2"
                >
                  {linkCopied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy link
                    </>
                  )}
                </Button>
                {linkClient?.email && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={emailPaymentLink}
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email to {linkClient.email}
                  </Button>
                )}
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline ml-auto"
                >
                  Preview
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsLinkDialogOpen(false)}>Done</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
