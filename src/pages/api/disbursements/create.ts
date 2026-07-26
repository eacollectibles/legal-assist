import type { APIRoute } from 'astro';
import { requireAuth, STAFF_ROLES } from '@/lib/server/require-auth';

/**
 * POST /api/disbursements/create
 *
 * Records a single outflow (disbursement / withdrawal / refund / payout
 * / office expense / bank fee) against either the trust or general
 * account. Mirrors the structure of /api/square/create-payment but
 * inverted — every disbursement is a DEBIT to the source account.
 *
 * Body: {
 *   sourceAccount:    'trust' | 'general'        // required
 *   disbursementType: 'client_disbursement' | 'paralegal_payout' |
 *                     'office_expense' | 'refund_to_client' |
 *                     'bank_fee'                  // required
 *   recipient:        string                      // required
 *   recipientType?:   'paralegal' | 'vendor' | 'client' | 'court' | 'other'
 *   fileId?:          string                      // required when
 *                                                 //   sourceAccount=trust
 *                                                 //   or type in
 *                                                 //   {client_disbursement,
 *                                                 //    refund_to_client}
 *   clientId?:        string
 *   amount:           number (dollars, > 0)       // required
 *   paymentMethod:    'cheque' | 'etransfer' | 'EFT' | 'wire' | 'cash' |
 *                     'debit' | 'credit_card'     // required
 *   referenceNumber:  string                      // required
 *   transactionDate?: string (ISO date)           // defaults today
 *   description:      string                      // required
 *   authorizedBy?:    string                      // defaults firm primary
 * }
 *
 * Returns: { success, recordId, ledgerWarnings? }
 *
 * Side effects:
 *   • Writes ONE row to `financialrecords` with `journalType`
 *     ('trust' | 'general') and a `transactionType` mapped to the
 *     existing TRANSACTION_TYPES enum used by TrustAccountingPage and
 *     SectionFinancialRecords (trust_withdrawal | disbursement | refund
 *     | payment).
 *   • If a fileId is supplied, also writes a `communicationlog` row
 *     so the disbursement shows up on the client file's audit trail.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

const MAX_AMOUNT = 250_000; // $250,000 hard ceiling per disbursement.

type SourceAccount = 'trust' | 'general';
type DisbursementType =
  | 'client_disbursement'
  | 'paralegal_payout'
  | 'office_expense'
  | 'refund_to_client'
  | 'bank_fee';
type PaymentMethod =
  | 'cheque'
  | 'etransfer'
  | 'EFT'
  | 'wire'
  | 'cash'
  | 'debit'
  | 'credit_card';

const VALID_DISBURSEMENT_TYPES: DisbursementType[] = [
  'client_disbursement',
  'paralegal_payout',
  'office_expense',
  'refund_to_client',
  'bank_fee',
];

const VALID_PAYMENT_METHODS: PaymentMethod[] = [
  'cheque',
  'etransfer',
  'EFT',
  'wire',
  'cash',
  'debit',
  'credit_card',
];

interface DisbursementBody {
  sourceAccount?: SourceAccount;
  disbursementType?: DisbursementType;
  recipient?: string;
  recipientType?: string;
  fileId?: string | null;
  clientId?: string | null;
  amount?: number;
  paymentMethod?: PaymentMethod;
  referenceNumber?: string;
  transactionDate?: string;
  description?: string;
  authorizedBy?: string;
}

/**
 * Map (source, type) → existing TRANSACTION_TYPES enum value.
 *
 *   trust + client_disbursement → trust_withdrawal
 *   trust + refund_to_client    → refund
 *   trust + bank_fee            → trust_withdrawal (bank-charge against trust)
 *   general + client_disbursement → disbursement
 *   general + refund_to_client  → refund
 *   general + paralegal_payout  → payment
 *   general + office_expense    → payment
 *   general + bank_fee          → payment
 *
 * All values map to types already present in the enum
 * (trust_withdrawal, disbursement, refund, payment) so existing
 * UI badge / sign rendering keeps working.
 */
function mapTransactionType(
  source: SourceAccount,
  type: DisbursementType
): string {
  if (type === 'refund_to_client') return 'refund';
  if (source === 'trust') {
    if (type === 'client_disbursement') return 'trust_withdrawal';
    if (type === 'bank_fee') return 'trust_withdrawal';
    // Other trust types are blocked by validation, but fall back
    // safely to trust_withdrawal.
    return 'trust_withdrawal';
  }
  // source === 'general'
  if (type === 'client_disbursement') return 'disbursement';
  // paralegal_payout, office_expense, bank_fee → payment (debit).
  return 'payment';
}

export const POST: APIRoute = async ({ request, locals }) => {
  // 1) AUTHENTICATION (was: origin header only).
  //
  //    This endpoint DEBITS the trust or general account — it writes a real
  //    money-out row into `financialrecords`, which is a By-Law 9 record.
  //    An Origin header is set by the caller, so the old gate stopped nothing:
  //    an anonymous script could inject fraudulent ledger entries and corrupt
  //    the trust reconciliation.
  //
  //    Moving money is staff-only. requireAuth() also does the same-origin
  //    check, so CSRF defence is retained on top of authentication.
  const gate = await requireAuth(request, locals, { roles: STAFF_ROLES });
  if (!gate.ok) return gate.response!;

  // 2) JSON parse.
  let body: DisbursementBody;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }

  // 3) Field validation.
  const source = body.sourceAccount;
  if (source !== 'trust' && source !== 'general') {
    return json(
      { success: false, error: 'sourceAccount must be "trust" or "general".' },
      400
    );
  }
  const type = body.disbursementType as DisbursementType | undefined;
  if (!type || !VALID_DISBURSEMENT_TYPES.includes(type)) {
    return json(
      {
        success: false,
        error:
          'disbursementType must be one of: ' +
          VALID_DISBURSEMENT_TYPES.join(', '),
      },
      400
    );
  }
  if (!body.recipient || typeof body.recipient !== 'string' || !body.recipient.trim()) {
    return json({ success: false, error: 'recipient is required.' }, 400);
  }
  if (typeof body.amount !== 'number' || !Number.isFinite(body.amount) || body.amount <= 0) {
    return json(
      { success: false, error: 'amount must be a positive number of dollars.' },
      400
    );
  }
  if (body.amount > MAX_AMOUNT) {
    return json(
      {
        success: false,
        error: `Amount exceeds the per-disbursement ceiling of $${MAX_AMOUNT.toLocaleString()}.`,
      },
      400
    );
  }
  const method = body.paymentMethod as PaymentMethod | undefined;
  if (!method || !VALID_PAYMENT_METHODS.includes(method)) {
    return json(
      {
        success: false,
        error:
          'paymentMethod must be one of: ' + VALID_PAYMENT_METHODS.join(', '),
      },
      400
    );
  }
  if (
    !body.referenceNumber ||
    typeof body.referenceNumber !== 'string' ||
    !body.referenceNumber.trim()
  ) {
    return json(
      { success: false, error: 'referenceNumber is required.' },
      400
    );
  }
  if (
    !body.description ||
    typeof body.description !== 'string' ||
    !body.description.trim()
  ) {
    return json({ success: false, error: 'description is required.' }, 400);
  }

  // 4) Business rules.
  if (source === 'trust' && type === 'paralegal_payout') {
    return json(
      {
        success: false,
        error:
          'Paralegal pay-outs must be from General Account. Earned fees must first be transferred from trust to general (use the Trust→General Transfer flow).',
      },
      400
    );
  }
  if (source === 'trust' && type === 'office_expense') {
    return json(
      {
        success: false,
        error:
          'Office expenses cannot be paid out of the trust account. Use General as the source.',
      },
      400
    );
  }
  const fileRequired =
    source === 'trust' ||
    type === 'client_disbursement' ||
    type === 'refund_to_client';
  if (fileRequired && !body.fileId) {
    return json(
      {
        success: false,
        error:
          source === 'trust'
            ? 'Trust disbursements must be tied to a specific client file (LSO By-Law 9 s. 18).'
            : 'A client file is required for this disbursement type.',
      },
      400
    );
  }

  // 4b) Trust overdraft guard (LSO By-Law 9 s. 18 — a trust account must
  //     never go negative). Before persisting any TRUST withdrawal, compute
  //     the file's current trust balance from financialrecords and reject if
  //     the disbursement would overdraw it. General-account disbursements are
  //     not balance-checked here.
  if (source === 'trust' && body.fileId) {
    try {
      const { BaseCrudService } = await import('@/integrations');
      const fin: any = await BaseCrudService.getAllPages('financialrecords');
      // Same sign convention as TrustAccountingPage / TrustTopUpPage.
      const SIGN: Record<string, number> = {
        trust_deposit: 1, billing: 1, payment: 1,
        trust_withdrawal: -1, disbursement: -1, refund: -1, transfer: -1,
      };
      let balance = 0;
      for (const r of (fin?.items || [])) {
        if (r.fileId !== body.fileId) continue;
        if (r.journalType && r.journalType !== 'trust') continue;
        if (r.transactionType === 'deadline' || r.transactionType === 'conflict_search' || r.transactionType === 'tickler') continue;
        if (r.isDeleted) continue;
        balance += (SIGN[r.transactionType] ?? 0) * (Number(r.amount) || 0);
      }
      const round2 = (n: number) => Math.round(n * 100) / 100;
      if (round2(body.amount) > round2(balance)) {
        return json(
          {
            success: false,
            error:
              `Insufficient trust balance: this file holds $${round2(balance).toFixed(2)} in trust, ` +
              `but the disbursement is $${round2(body.amount).toFixed(2)}. A trust account cannot go negative (By-Law 9 s. 18).`,
          },
          400
        );
      }
    } catch (e: any) {
      // If the balance cannot be confirmed, refuse rather than risk an
      // overdraft — fail closed on a trust withdrawal.
      return json(
        { success: false, error: 'Could not verify the trust balance for this file; disbursement not recorded. Please retry.' },
        503
      );
    }
  }

  // 5) Persist.
  const transactionType = mapTransactionType(source, type);
  const recordId = crypto.randomUUID();
  const transactionDate = body.transactionDate
    ? new Date(body.transactionDate)
    : new Date();

  let financialRecordsWriteError: string | null = null;
  let communicationLogWriteError: string | null = null;

  try {
    const { BaseCrudService } = await import('@/integrations');

    try {
      await BaseCrudService.create('financialrecords', {
        _id: recordId,
        clientId: body.clientId || null,
        fileId: body.fileId || null,
        journalType: source, // 'trust' | 'general'
        transactionType,
        amount: Math.round(body.amount * 100) / 100,
        transactionDate,
        description:
          body.description.trim() +
          ` — to ${body.recipient.trim()}` +
          (body.recipientType ? ` (${body.recipientType})` : '') +
          ` [${type.replace(/_/g, ' ')}]`,
        referenceNumber: body.referenceNumber.trim(),
        paymentMethod: method,
        recordedBy:
          (body.authorizedBy && body.authorizedBy.trim()) ||
          'Jean-Francois Demers',
        // Extra fields — safe to store even if the CMS schema doesn't
        // surface them in the UI.
        disbursementType: type,
        recipient: body.recipient.trim(),
        recipientType: body.recipientType || null,
        _createdDate: new Date(),
      });
    } catch (e: any) {
      financialRecordsWriteError = e?.message || String(e);
      // eslint-disable-next-line no-console
      console.error('financialrecords write failed:', financialRecordsWriteError);
    }

    // Communication log on the client file (audit trail).
    if (body.fileId) {
      try {
        await BaseCrudService.create('communicationlog', {
          _id: crypto.randomUUID(),
          clientId: body.clientId || null,
          fileId: body.fileId,
          communicationType: 'internal_note',
          subject: `Disbursement recorded — $${body.amount.toFixed(2)} to ${body.recipient.trim()}`,
          summary:
            `${type.replace(/_/g, ' ')} from ${source} account ` +
            `via ${method}, ref ${body.referenceNumber.trim()}. ` +
            body.description.trim(),
          direction: 'outbound',
          method: 'internal',
          contactDate: new Date(),
          recordedBy:
            (body.authorizedBy && body.authorizedBy.trim()) ||
            'Jean-Francois Demers',
          _createdDate: new Date(),
        });
      } catch (e: any) {
        communicationLogWriteError = e?.message || String(e);
        // eslint-disable-next-line no-console
        console.warn(
          'communicationlog write failed:',
          communicationLogWriteError
        );
      }
    }
  } catch (importErr: any) {
    financialRecordsWriteError =
      financialRecordsWriteError || (importErr?.message || String(importErr));
    // eslint-disable-next-line no-console
    console.error('disbursement persistence unavailable:', importErr);
  }

  if (financialRecordsWriteError) {
    return json(
      {
        success: false,
        error:
          'Failed to write disbursement to financialrecords: ' +
          financialRecordsWriteError,
      },
      500
    );
  }

  return json(
    {
      success: true,
      recordId,
      ledgerWarnings: communicationLogWriteError
        ? { communicationlog: communicationLogWriteError }
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
