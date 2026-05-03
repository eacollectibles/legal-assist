import type { APIRoute } from 'astro';
import { createPayment } from '@/lib/square-service';
import type { CreatePaymentInput } from '@/lib/square-service';

/**
 * POST /api/square/create-payment
 *
 * Body: {
 *   sourceId,            // required — card nonce from Web Payments SDK
 *   amountCents,         // required — integer, cents
 *   currency?,           // default 'CAD'
 *   paymentType,         // 'trust_deposit' | 'invoice_payment' | 'consultation'
 *   matterId?, matterReference?, clientId?, clientName?,
 *   buyerEmail?, note?
 * }
 *
 * Calls Square's Payments API server-side, then returns:
 *   { success, paymentId, status, receiptUrl, receiptNumber, amountCents, currency }
 *
 * Recordkeeping: every successful payment is also written to the
 * `payments` collection so the trust-accounting page (Form 9A transaction
 * journal) can show a complete audit trail.
 */
/**
 * Origin allow-list. Only allow requests that originate from the actual
 * Legal Assist production domain (and localhost for dev). Stops a third
 * party from scripting charges against the firm's Square account from
 * an attacker-controlled page.
 */
const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

/** Hard upper bound on a single charge — 25,000 CAD (in cents). */
const MAX_AMOUNT_CENTS = 25_000_00;

export const POST: APIRoute = async ({ request }) => {
  // 1) Origin / Referer check. Browsers always send Origin on POSTs from
  //    a different page; a missing origin (e.g. server-to-server) is
  //    rejected for this endpoint, since the only legitimate caller is
  //    our own browser-side payment form.
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  let body: Partial<CreatePaymentInput> & { idempotencyKey?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }

  // 2) Server-side validation — anything from the browser is hostile.
  if (!body.sourceId || typeof body.sourceId !== 'string') {
    return json({ success: false, error: 'Missing card token (sourceId).' }, 400);
  }
  if (!Number.isFinite(body.amountCents) || (body.amountCents as number) <= 0) {
    return json({ success: false, error: 'Amount must be a positive number of cents.' }, 400);
  }
  if ((body.amountCents as number) > MAX_AMOUNT_CENTS) {
    return json(
      {
        success: false,
        error: `Amount exceeds the per-charge ceiling of $${MAX_AMOUNT_CENTS / 100}. Contact the firm directly for larger payments.`,
      },
      400
    );
  }
  // Currency whitelist (Square accepts CAD/USD here).
  const allowedCurrencies = new Set(['CAD', 'USD']);
  const currency = (body.currency || 'CAD').toUpperCase();
  if (!allowedCurrencies.has(currency)) {
    return json({ success: false, error: 'Unsupported currency.' }, 400);
  }
  body.currency = currency;
  const allowedTypes: CreatePaymentInput['paymentType'][] = [
    'trust_deposit',
    'invoice_payment',
    'consultation',
  ];
  if (!allowedTypes.includes(body.paymentType as CreatePaymentInput['paymentType'])) {
    return json({ success: false, error: 'Invalid paymentType.' }, 400);
  }

  // 3) Idempotency key — accept one from the client so a network retry
  //    of the same Pay click can't double-charge. If the client didn't
  //    supply one, the service-layer generates a fresh uuid (best-effort
  //    only — but the Square nonce is itself one-time, so a reused
  //    nonce will be rejected by Square the second time anyway).
  if (body.idempotencyKey && typeof body.idempotencyKey !== 'string') {
    return json({ success: false, error: 'Invalid idempotencyKey.' }, 400);
  }

  const result = await createPayment(body as CreatePaymentInput);

  if (!result.ok) {
    return json({ success: false, error: result.errorMessage, code: result.errorCode }, 200);
  }

  // --- Best-effort persistence to the payments + financialrecords ---
  // Wrapped in try/catch so a logging failure never causes Square to
  // re-charge the customer; the Square payment is the source of truth.
  //
  // We write to two collections:
  //  1) `payments` — Square-specific audit trail (full payment id, receipt
  //     url, etc). Source of truth when reconciling against the Square
  //     dashboard.
  //  2) `financialrecords` — LSO By-Law 9 trust-accounting ledger that
  //     drives the Trust Overview / Transaction Journal (Form 9A) /
  //     Client Ledger (Form 9B) / Reconciliation (Form 9C) pages. This
  //     write is what makes the Square charge show up automatically in
  //     compliance reporting without the paralegal having to enter it
  //     manually.
  const amountDollars =
    typeof result.amountCents === 'number'
      ? Math.round(result.amountCents) / 100
      : (typeof body.amountCents === 'number' ? Math.round(body.amountCents) / 100 : 0);

  try {
    const { BaseCrudService } = await import('@/integrations');

    // 1) Square audit trail
    await BaseCrudService.create('payments', {
      _id: crypto.randomUUID(),
      squarePaymentId: result.paymentId,
      status: result.status,
      paymentType: body.paymentType,
      amountCents: result.amountCents,
      currency: result.currency,
      matterId: body.matterId || null,
      matterReference: body.matterReference || null,
      clientId: body.clientId || null,
      clientName: body.clientName || null,
      buyerEmail: body.buyerEmail || null,
      note: body.note || null,
      receiptUrl: result.receiptUrl || null,
      receiptNumber: result.receiptNumber || null,
      processedAt: new Date().toISOString(),
      _createdDate: new Date(),
    });

    // 2) Trust accounting ledger entry (LSO Form 9A schema). Mapping:
    //    - 'trust_deposit'    → transactionType 'trust_deposit'
    //    - 'invoice_payment'  → 'trust_deposit' as well (the funds land in
    //                            trust per the firm's policy; billing/
    //                            transfer-to-operating happens separately
    //                            via the existing trust-accounting page).
    //    - 'consultation'     → 'trust_deposit' (same reasoning).
    //
    //    `paymentMethod: 'credit_card'` matches the existing
    //    PAYMENT_METHODS dropdown values on the Trust Accounting page.
    await BaseCrudService.create('financialrecords', {
      _id: crypto.randomUUID(),
      clientId: body.clientId || null,
      fileId: body.matterId || null,
      transactionType: 'trust_deposit',
      amount: amountDollars,
      transactionDate: new Date(),
      description:
        `Square ${body.paymentType?.replace('_', ' ') || 'payment'} — ` +
        `${body.clientName || body.buyerEmail || 'client'}` +
        (body.matterReference ? ` — File: ${body.matterReference}` : '') +
        (body.note ? ` — ${body.note}` : ''),
      referenceNumber:
        result.receiptNumber || result.paymentId || '',
      paymentMethod: 'credit_card',
      recordedBy: 'Square (online payment)',
      // Optional — useful for cross-linking back to the Square audit row.
      squarePaymentId: result.paymentId,
      receiptUrl: result.receiptUrl || null,
      _createdDate: new Date(),
    });
  } catch (logErr) {
    // eslint-disable-next-line no-console
    console.error('Square payment succeeded but ledger write failed:', logErr);
  }

  return json(
    {
      success: true,
      paymentId: result.paymentId,
      status: result.status,
      receiptUrl: result.receiptUrl,
      receiptNumber: result.receiptNumber,
      amountCents: result.amountCents,
      currency: result.currency,
    },
    200
  );
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
