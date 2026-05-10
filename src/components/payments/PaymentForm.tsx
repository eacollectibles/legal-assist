import { useRef, useState } from 'react';
import SquareCardForm, { type SquareCardFormHandle } from './SquareCardForm';

/**
 * Full payment form — payment-type selector, amount, optional matter
 * reference, optional client info, and the embedded Square card form.
 *
 * Used in two places:
 *  - The public `/pay` page (anonymous payment with link).
 *  - The client dashboard's "Pay" modal (pre-filled with the logged-in
 *    client's info and a matter selector).
 *
 * On successful payment, the `onSuccess` callback fires with the receipt
 * info so the parent can show the right confirmation UI / route.
 */

export type PaymentType = 'trust_deposit' | 'invoice_payment' | 'consultation';

export interface PaymentFormDefaults {
  paymentType?: PaymentType;
  amountDollars?: string;
  matterReference?: string;
  matterId?: string;
  clientId?: string;
  clientName?: string;
  buyerEmail?: string;
  note?: string;
}

export interface PaymentSuccess {
  paymentId: string;
  status: string;
  receiptUrl?: string;
  receiptNumber?: string;
  amountCents: number;
  currency: string;
  /**
   * Square charge cleared, but one or both audit-trail writes failed.
   * Usually means the `payments` or `financialrecords` Wix CMS
   * collection is missing or has a schema mismatch. Surfaced as a
   * yellow warning on the success card so the issue is visible
   * instead of going silent.
   */
  ledgerWarnings?: { payments?: string | null; financialrecords?: string | null };
}

interface PaymentFormProps {
  defaults?: PaymentFormDefaults;
  /** Whether to lock the matter / client fields (e.g. inside dashboard). */
  lockClient?: boolean;
  /** Called once the Square charge succeeds. */
  onSuccess?: (success: PaymentSuccess) => void;
  /** Called when the user cancels (only used in the dashboard modal). */
  onCancel?: () => void;
}

const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  trust_deposit: 'Trust Deposit (retainer top-up)',
  invoice_payment: 'Invoice Payment (work already done)',
  consultation: 'Consultation / Fixed Fee',
};

const PAYMENT_TYPE_BLURBS: Record<PaymentType, string> = {
  trust_deposit:
    'Funds are held in trust until earned (per LSO By-Law 9). They will appear on your Form 9C reconciliation.',
  invoice_payment:
    'Pays an outstanding invoice from your file. Receipt will reference the matter.',
  consultation:
    'For up-front consultation or fixed-fee bookings (e.g. flat-fee traffic ticket defence).',
};

export default function PaymentForm({
  defaults,
  lockClient,
  onSuccess,
  onCancel,
}: PaymentFormProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    defaults?.paymentType || 'trust_deposit'
  );
  const [amountDollars, setAmountDollars] = useState(defaults?.amountDollars || '');
  const [matterReference, setMatterReference] = useState(defaults?.matterReference || '');
  const [clientName, setClientName] = useState(defaults?.clientName || '');
  const [buyerEmail, setBuyerEmail] = useState(defaults?.buyerEmail || '');
  const [note, setNote] = useState(defaults?.note || '');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<PaymentSuccess | null>(null);

  const cardHandleRef = useRef<SquareCardFormHandle | null>(null);

  /**
   * Idempotency key for the in-flight Pay click. We generate ONE key
   * per render of the form and reuse it for every retry — that way if
   * the network call to /api/square/create-payment times out and the
   * user clicks Pay again, Square sees the same idempotency key and
   * returns the original payment instead of charging a second time.
   * Reset to a fresh key on success so the next charge has its own.
   */
  const idempotencyKeyRef = useRef<string>('');
  function ensureIdempotencyKey(): string {
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `idem-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    }
    return idempotencyKeyRef.current;
  }

  function dollarsToCents(s: string): number | null {
    const n = Number(String(s).replace(/[^\d.]/g, ''));
    if (!Number.isFinite(n) || n <= 0) return null;
    return Math.round(n * 100);
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError('');

    const amountCents = dollarsToCents(amountDollars);
    if (!amountCents) {
      setError('Enter a valid amount greater than $0.');
      return;
    }
    if (!clientName.trim()) {
      setError('Please enter the client / cardholder name.');
      return;
    }

    setSubmitting(true);
    try {
      // 1) Tokenize the card on the client. We pass the SCA
      // verification details (intent + amount + currency + buyer
      // contact) — Square's production mode REQUIRES this on every
      // tokenize call. amount is a string in major units ("150.00"),
      // not cents.
      const [givenName, ...familyParts] = clientName.trim().split(/\s+/);
      const familyName = familyParts.join(' ');
      const amountStr = (amountCents / 100).toFixed(2);
      const tokRes = await cardHandleRef.current?.tokenize({
        amount: amountStr,
        currencyCode: 'CAD',
        givenName: givenName || undefined,
        familyName: familyName || undefined,
        email: buyerEmail.trim() || undefined,
      });
      if (!tokRes || !tokRes.token) {
        setError(tokRes?.errorMessage || 'Card details are not valid. Please re-check.');
        return;
      }

      // The card form returns either a plain card token, or a packed
      // "<cardToken>|<verificationToken>" string when SCA produced a
      // verification token. Split it out here so we can forward the
      // verification token to Square's CreatePayment as a separate
      // field — that's what unblocks live charges.
      let sourceId = tokRes.token;
      let verificationToken: string | undefined;
      if (sourceId.includes('|')) {
        const [s, v] = sourceId.split('|');
        sourceId = s;
        verificationToken = v;
      }

      // 2) Submit to our server endpoint, which actually charges via Square.
      const resp = await fetch('/api/square/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId,
          verificationToken,
          amountCents,
          currency: 'CAD',
          paymentType,
          matterId: defaults?.matterId,
          matterReference: matterReference.trim() || undefined,
          clientId: defaults?.clientId,
          clientName: clientName.trim(),
          buyerEmail: buyerEmail.trim() || undefined,
          note: note.trim() || undefined,
          // Per-Pay-click idempotency key. Stable across retries of the
          // same click, so a network blip can't double-charge.
          idempotencyKey: ensureIdempotencyKey(),
        }),
      });

      let data: any = null;
      try {
        data = await resp.json();
      } catch {
        data = null;
      }
      if (!data?.success) {
        setError(data?.error || `Payment failed (HTTP ${resp.status}).`);
        return;
      }

      const result: PaymentSuccess = {
        paymentId: data.paymentId,
        status: data.status,
        receiptUrl: data.receiptUrl,
        receiptNumber: data.receiptNumber,
        amountCents: data.amountCents,
        currency: data.currency,
        ledgerWarnings: data.ledgerWarnings,
      };
      setSuccess(result);
      // Burn the idempotency key on success so the form is ready for a
      // fresh charge if the user reuses this component (rare in practice
      // since success unmounts most callers, but cheap to be safe).
      idempotencyKeyRef.current = '';
      onSuccess?.(result);
    } catch (err: any) {
      setError(err?.message || 'Unexpected error processing payment.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="font-heading text-xl font-bold text-emerald-900 mb-2">
          Payment received
        </h3>
        <p className="font-paragraph text-sm text-emerald-900/80 mb-4">
          Thank you. Your card was charged ${(success.amountCents / 100).toFixed(2)} {success.currency}.
        </p>
        <dl className="text-sm text-emerald-900/80 space-y-1 mb-4">
          {success.receiptNumber && (
            <div>
              <dt className="inline font-semibold">Receipt #:</dt>{' '}
              <dd className="inline">{success.receiptNumber}</dd>
            </div>
          )}
          <div>
            <dt className="inline font-semibold">Status:</dt>{' '}
            <dd className="inline">{success.status}</dd>
          </div>
        </dl>
        {success.receiptUrl && (
          <a
            href={success.receiptUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-paragraph"
          >
            View Square receipt &rarr;
          </a>
        )}

        {(success.ledgerWarnings?.payments || success.ledgerWarnings?.financialrecords) && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-semibold mb-1">Audit row was not saved.</p>
            <p className="mb-2">
              The Square charge cleared, but writing to the audit trail
              failed. Usually this means a CMS collection is missing or
              has a schema mismatch. Reconcile this charge manually from
              the Square dashboard.
            </p>
            {success.ledgerWarnings?.payments && (
              <p className="text-xs"><span className="font-semibold">payments:</span> {success.ledgerWarnings.payments}</p>
            )}
            {success.ledgerWarnings?.financialrecords && (
              <p className="text-xs"><span className="font-semibold">financialrecords:</span> {success.ledgerWarnings.financialrecords}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Payment type */}
      <div>
        <label className="block text-sm font-paragraph font-semibold text-foreground mb-2">
          Payment type
        </label>
        <div className="space-y-2">
          {(Object.keys(PAYMENT_TYPE_LABELS) as PaymentType[]).map((t) => (
            <label
              key={t}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                paymentType === t
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentType"
                value={t}
                checked={paymentType === t}
                onChange={() => setPaymentType(t)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-paragraph font-semibold text-foreground">
                  {PAYMENT_TYPE_LABELS[t]}
                </span>
                <span className="block text-xs text-foreground/60 mt-0.5">
                  {PAYMENT_TYPE_BLURBS[t]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-paragraph font-semibold text-foreground mb-1">
          Amount (CAD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amountDollars}
            onChange={(e) => setAmountDollars(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Cardholder / Client name */}
      <div>
        <label htmlFor="clientName" className="block text-sm font-paragraph font-semibold text-foreground mb-1">
          Cardholder / Client name
        </label>
        <input
          id="clientName"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          disabled={lockClient}
          placeholder="e.g. William Worth"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
          required
        />
      </div>

      {/* Email (for receipt) */}
      <div>
        <label htmlFor="buyerEmail" className="block text-sm font-paragraph font-semibold text-foreground mb-1">
          Email (for receipt)
        </label>
        <input
          id="buyerEmail"
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* File / matter reference */}
      <div>
        <label htmlFor="matterRef" className="block text-sm font-paragraph font-semibold text-foreground mb-1">
          File / matter reference (optional)
        </label>
        <input
          id="matterRef"
          type="text"
          value={matterReference}
          onChange={(e) => setMatterReference(e.target.value)}
          placeholder="e.g. POA-2026-001"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Note */}
      <div>
        <label htmlFor="note" className="block text-sm font-paragraph font-semibold text-foreground mb-1">
          Note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Anything you'd like recorded with the payment."
        />
      </div>

      {/* Square card form */}
      <div className="border-t border-gray-200 pt-5">
        <label className="block text-sm font-paragraph font-semibold text-foreground mb-2">
          Card details
        </label>
        <SquareCardForm handleRef={cardHandleRef} />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-paragraph font-semibold py-3 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Processing…' : `Pay${amountDollars ? ` $${Number(amountDollars).toFixed(2)}` : ''}`}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-4 py-3 rounded-lg border border-gray-300 text-foreground font-paragraph hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
