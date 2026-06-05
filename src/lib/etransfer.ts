/**
 * Interac e-Transfer helper — generates short, human-readable
 * reference numbers and the instructional copy clients see on
 * the pay page.
 *
 * Why we bother: Square charges 2.9% + $0.30 per online card
 * transaction. Interac e-Transfer is $0.50 flat, paid by the firm
 * (or routed to the sender depending on the bank). On a $1,500
 * retainer that's roughly $44 saved per file. Most Ontario
 * consumer banking apps support e-Transfer natively, so adoption
 * friction is low.
 *
 * Reconciliation is currently manual: when the firm gets an
 * Interac auto-deposit email, the paralegal records a
 * trust_deposit on the Payments page using the reference number
 * to match it to a client.
 */

const ETRANSFER_RECIPIENT_EMAIL = 'jeanfrancois@legalassist.london';
const REFERENCE_PREFIX = 'LA';

/**
 * Build a short reference number that includes the file ID hash
 * and amount in dollars so the paralegal can match an incoming
 * e-Transfer to the right matter even if the sender forgets to
 * include a memo.
 *
 * Format: LA-<short>-<dollars>
 *   e.g. LA-7K2P-1500
 */
export function buildEtransferReference(opts: {
  fileId?: string;
  clientId?: string;
  amountDollars: number;
}): string {
  const idSource = (opts.fileId || opts.clientId || crypto.randomUUID()).replace(/-/g, '');
  // 4-char base36 hash of the id source — short but unique enough
  // for a single firm's volume.
  let hash = 0;
  for (let i = 0; i < idSource.length; i++) hash = (hash * 31 + idSource.charCodeAt(i)) >>> 0;
  const short = hash.toString(36).slice(0, 4).toUpperCase().padEnd(4, '0');
  const dollars = Math.round(opts.amountDollars).toString();
  return `${REFERENCE_PREFIX}-${short}-${dollars}`;
}

export interface EtransferInstructions {
  recipientEmail: string;
  amountDollars: number;
  referenceNumber: string;
  securityQuestion: string;
  securityAnswer: string;
  steps: string[];
}

/**
 * Produce the full set of instructions to show on the pay page
 * when the client selects "Pay by Interac e-Transfer". The
 * security question/answer is constructed so the firm can
 * auto-deposit without back-and-forth.
 */
export function buildEtransferInstructions(opts: {
  fileId?: string;
  clientId?: string;
  amountDollars: number;
  clientName?: string;
}): EtransferInstructions {
  const ref = buildEtransferReference(opts);
  return {
    recipientEmail: ETRANSFER_RECIPIENT_EMAIL,
    amountDollars: opts.amountDollars,
    referenceNumber: ref,
    // We use a fixed security question because the firm has
    // auto-deposit set up — the answer isn't actually checked, but
    // the bank's interface still requires one to be filled in.
    securityQuestion: 'Reference number',
    securityAnswer: ref,
    steps: [
      `Open your bank's mobile app or online banking and start an Interac e-Transfer.`,
      `Send to: ${ETRANSFER_RECIPIENT_EMAIL}`,
      `Amount: $${opts.amountDollars.toFixed(2)} CAD`,
      `In the message/memo field, paste: ${ref}`,
      `If your bank asks for a security question, use "Reference number" and answer ${ref}.`,
      `Submit. You'll receive a confirmation email from your bank within minutes.`,
      `We'll auto-deposit and apply the funds to your trust account, then email you a receipt.`,
    ],
  };
}
