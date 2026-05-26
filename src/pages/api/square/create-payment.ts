import type { APIRoute } from 'astro';
import { createPayment } from '@/lib/square-service';
import type { CreatePaymentInput } from '@/lib/square-service';

/**
 * POST /api/square/create-payment
 *
 * Body: {
 *   sourceId,            // required - card nonce from Web Payments SDK
 *   amountCents,         // required - integer, cents
 *   currency?,           // default 'CAD'
 *   paymentType,         // 'trust_deposit' | 'invoice_payment' | 'consultation'
 *   matterId?, matterReference?, clientId?, clientName?,
 *   buyerEmail?, note?
 * }
 *
 * Calls Square's Payments API server-side, then returns:
 *   { success, paymentId, status, receiptUrl, receiptNumber, amountCents,
 *     currency, ledgerWarnings? }
 *
 * Recordkeeping: every successful payment is also written to the
 * `payments` collection (Square audit) and `financialrecords` collection
 * (LSO Form 9A trust ledger). Each write is in its own try/catch so a
 * missing/misconfigured CMS collection does not skip the other write,
 * and any failure is reported back to the client in `ledgerWarnings`.
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

/** Hard upper bound on a single charge - 25,000 CAD (in cents). */
const MAX_AMOUNT_CENTS = 25_000_00;

export const POST: APIRoute = async ({ request, locals }) => {
  // 1) Origin / Referer check.
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

  // 2) Server-side validation.
  if (!body.sourceId || typeof body.sourceId !== 'string') {
    return json({ success: false, error: 'Missing card token (sourceId).' }, 400);
  }
  if (
    (body as any).verificationToken !== undefined &&
    typeof (body as any).verificationToken !== 'string'
  ) {
    return json({ success: false, error: 'Invalid verificationToken.' }, 400);
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

  // 3) Idempotency key - accept one from the client.
  if (body.idempotencyKey && typeof body.idempotencyKey !== 'string') {
    return json({ success: false, error: 'Invalid idempotencyKey.' }, 400);
  }

  const result = await createPayment(body as CreatePaymentInput, locals);

  if (!result.ok) {
    return json({ success: false, error: result.errorMessage, code: result.errorCode }, 200);
  }

  // --- Best-effort persistence to payments + financialrecords ---
  // Wrapped in try/catch so a logging failure never causes Square to
  // re-charge the customer; the Square payment is the source of truth.
  // Each collection write is in its OWN try/catch so a missing
  // `payments` collection does not skip the `financialrecords` write
  // (or vice versa). Failures are reported back via `ledgerWarnings`
  // so the paralegal sees a yellow banner instead of a silent miss.
  let paymentsWriteError: string | null = null;
  let financialRecordsWriteError: string | null = null;

  const amountDollars =
    typeof result.amountCents === 'number'
      ? Math.round(result.amountCents) / 100
      : (typeof body.amountCents === 'number' ? Math.round(body.amountCents) / 100 : 0);

  try {
    const { BaseCrudService } = await import('@/integrations');

    // 1) Square audit trail
    try {
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
    } catch (e: any) {
      paymentsWriteError = e?.message || String(e);
      // eslint-disable-next-line no-console
      console.error('payments collection write failed:', paymentsWriteError);
    }

    // 2) Trust / general accounting ledger entry (LSO Form 9A / 9D).
    //
    // - paymentType=trust_deposit  → goes into the Trust Account Journal
    //   (Form 9A) as a trust receipt. Money is held on behalf of the
    //   client and may not be drawn against until earned and supported
    //   by a delivered invoice (By-Law 9 s. 18).
    // - paymentType=invoice_payment → goes into the General Account
    //   Receipts Journal (Form 9D equivalent) as a fee receipt.
    //   Money is for work already done and may be deposited directly
    //   into the operating account.
    // - paymentType=consultation → general receipt (consultation fees
    //   are earned at the time of consultation).
    //
    // If `fileId` is missing on the request but `clientId` is provided,
    // we look up the client's most recent active file as a fallback so
    // the entry still shows up under the client file's G. Financial
    // Records section.
    const paymentType = (body.paymentType || 'trust_deposit') as string;
    const typeMap: Record<string, { transactionType: string; journalType: 'trust' | 'general' }> = {
      'trust_deposit':    { transactionType: 'trust_deposit', journalType: 'trust' },
      'invoice_payment':  { transactionType: 'payment',       journalType: 'general' },
      'consultation':     { transactionType: 'payment',       journalType: 'general' },
    };
    const mapped = typeMap[paymentType] || typeMap['trust_deposit'];

    let resolvedFileId: string | null = body.matterId || null;
    let resolvedFileNumber: string | null = body.matterReference || null;
    if (!resolvedFileId && body.clientId) {
      try {
        const filesResult = await BaseCrudService.getAll<any>('clientfiles', undefined, { limit: 1000 });
        const clientFiles = (filesResult.items || [])
          .filter((f: any) => f.clientId === body.clientId)
          .sort((a: any, b: any) =>
            new Date(b._createdDate || 0).getTime() - new Date(a._createdDate || 0).getTime()
          );
        const activeFile = clientFiles.find((f: any) => f.status === 'active') || clientFiles[0];
        if (activeFile) {
          resolvedFileId = activeFile._id;
          resolvedFileNumber = resolvedFileNumber || activeFile.fileNumber || null;
        }
      } catch (lookupErr) {
        // Non-fatal: we still write the record without fileId.
        // eslint-disable-next-line no-console
        console.warn('fileId fallback lookup failed:', lookupErr);
      }
    }

    try {
      await BaseCrudService.create('financialrecords', {
        _id: crypto.randomUUID(),
        clientId: body.clientId || null,
        fileId: resolvedFileId,
        // Discriminator so the UI can split Trust journal (9A) from
        // General Receipts journal (9D equivalent). Existing rows
        // without this field default to 'trust' for backwards-compat
        // in the TrustAccountingPage filter logic.
        journalType: mapped.journalType,
        transactionType: mapped.transactionType,
        amount: amountDollars,
        transactionDate: new Date(),
        description:
          `Square ${paymentType.replace('_', ' ')} - ` +
          `${body.clientName || body.buyerEmail || 'client'}` +
          (resolvedFileNumber ? ` - File: ${resolvedFileNumber}` : '') +
          (body.note ? ` - ${body.note}` : ''),
        referenceNumber: result.receiptNumber || result.paymentId || '',
        paymentMethod: 'credit_card',
        recordedBy: 'Square (online payment)',
        squarePaymentId: result.paymentId,
        receiptUrl: result.receiptUrl || null,
        _createdDate: new Date(),
      });
    } catch (e: any) {
      financialRecordsWriteError = e?.message || String(e);
      // eslint-disable-next-line no-console
      console.error('financialrecords write failed:', financialRecordsWriteError);
    }

    // 3) Communication log entry — Square automatically emails the
    // client a receipt, which under LSO By-Law 7.1 s. 23(14) is a
    // client communication that must be retained for 6+ years. Log
    // it as an outbound email on the client file so the audit trail
    // is complete.
    if (resolvedFileId || body.clientId) {
      try {
        await BaseCrudService.create('communicationlog', {
          _id: crypto.randomUUID(),
          clientId: body.clientId || null,
          fileId: resolvedFileId,
          communicationType: 'email_outbound',
          subject: `Payment Receipt - Square Auth #${result.paymentId || ''}`,
          summary:
            `Automated Square receipt emailed to ` +
            `${body.buyerEmail || body.clientName || 'client'} ` +
            `for $${amountDollars.toFixed(2)} CAD ` +
            `(${paymentType.replace('_', ' ')}). ` +
            (result.receiptUrl ? `Receipt URL: ${result.receiptUrl}` : ''),
          direction: 'outbound',
          method: 'email',
          contactDate: new Date(),
          recordedBy: 'Square (online payment)',
          _createdDate: new Date(),
        });
      } catch (e: any) {
        // Non-fatal: receipt is still on Square; just log and continue.
        // eslint-disable-next-line no-console
        console.warn('communicationlog write failed:', e?.message || e);
      }
    }
  } catch (logErr: any) {
    // Top-level - likely failed to even import BaseCrudService.
    paymentsWriteError = paymentsWriteError || (logErr?.message || String(logErr));
    financialRecordsWriteError =
      financialRecordsWriteError || (logErr?.message || String(logErr));
    // eslint-disable-next-line no-console
    console.error('Square ledger logging unavailable:', logErr);
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
      // Partial-success diagnostics. Square charge cleared, but one or
      // both audit writes failed. Client surfaces this as a yellow
      // warning so the issue (usually a missing CMS collection) is
      // visible instead of silent.
      ledgerWarnings: (paymentsWriteError || financialRecordsWriteError)
        ? {
            payments: paymentsWriteError,
            financialrecords: financialRecordsWriteError,
          }
        : undefined,
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
