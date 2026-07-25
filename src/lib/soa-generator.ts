/**
 * Statement of Account (SOA) PDF Generator
 *
 * Generates a professional "Detailed Statement of Account" PDF matching
 * the firm's standard invoice format. Pulls data from the financialrecords
 * collection (docket entries, disbursements, trust transactions) and
 * produces a multi-section document:
 *
 *   A. Professional Services  (selected docket entries)
 *   B. Disbursements           (selected disbursement records)
 *   C. Summary of Account      (subtotal + HST + total)
 *   D. Trust Account Ledger    (deposits, withdrawals, running balance)
 *   Retainer Credit Remaining
 *   Legal disclaimers (Right to Assessment, Interest, Payment, Dispute)
 *
 * Uses the project's existing html2canvas + jsPDF pipeline via
 * generatePDF / downloadPDF from pdf-generator.ts.
 *
 * Solicitors Act, R.S.O. 1990, c. S.15 — delivery of accounts (s. 6),
 * right to assessment (ss. 4, 6, 28.1), extended to paralegals by s. 28.1.
 */

import { generatePDF, downloadPDF } from './pdf-generator';
import { getParalegalById, getDefaultParalegal, type Paralegal } from './paralegals';
import { PHONE_DISPLAY, EMAIL_PRIMARY } from './contact';

// ─── Data types ──────────────────────────────────────────────────────

export interface SOADocketEntry {
  /** financialrecords._id */
  id: string;
  /** Transaction date */
  date: Date;
  /** Description of services rendered */
  description: string;
  /** Hours billed (decimal, e.g. 1.4) */
  hours: number;
  /** Hourly rate */
  rate: number;
  /** Computed amount (hours * rate). 0 if complimentary. */
  amount: number;
  /** True if this entry is complimentary / no charge */
  noCharge?: boolean;
}

export interface SOADisbursement {
  id: string;
  date: Date;
  description: string;
  amount: number;
}

export interface SOATrustEntry {
  date: Date;
  description: string;
  received: number;
  disbursed: number;
  balance: number;
}

export interface SOAParams {
  // ── Header / client info ──
  statementDate: Date;
  invoiceNumber: string;
  clientName: string;
  fileNumber: string;
  matterDescription: string;
  retainerDate: Date | null;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  currency?: string; // defaults to 'CAD'

  // ── Delivery ──
  deliveryNote: string; // e.g. "By email to client on July 16, 2026"

  // ── Paralegal ──
  paralegalId?: string;

  // ── Billing config ──
  hourlyRate: number;
  billingIncrement?: number; // minutes; defaults to 6 (0.1 hour)

  // ── Line items (user-selected) ──
  docketEntries: SOADocketEntry[];
  disbursements: SOADisbursement[];

  // ── Trust ──
  trustEntries: SOATrustEntry[];

  // ── Interest rate on overdue accounts ──
  interestRate?: number; // percent per annum; defaults to 2.0
}

// ─── Helpers ─────────────────────────────────────────────────────────

function fmt(n: number): string {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n).toFixed(2);
  const [whole, dec] = abs.split('.');
  const w = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}$${w}.${dec}`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fmtDateShort(d: Date): string {
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── HTML builder ────────────────────────────────────────────────────

function buildSOAHtml(params: SOAParams): string {
  const paralegal: Paralegal =
    getParalegalById(params.paralegalId) || getDefaultParalegal();

  const currency = params.currency || 'CAD';
  const billingIncrement = params.billingIncrement || 6;
  const interestRate = params.interestRate ?? 2.0;

  // ── Compute totals ──
  const totalHours = params.docketEntries.reduce((s, e) => s + e.hours, 0);
  const totalFees = params.docketEntries.reduce((s, e) => s + e.amount, 0);
  const totalDisbursements = params.disbursements.reduce((s, e) => s + e.amount, 0);
  const subtotal = totalFees + totalDisbursements;
  const hst = Math.round(subtotal * 13) / 100; // 13% HST, round to cents
  const totalAmount = subtotal + hst;

  // ── Trust balance ──
  const trustBalance =
    params.trustEntries.length > 0
      ? params.trustEntries[params.trustEntries.length - 1].balance
      : 0;

  // Retainer credit = trust balance after applying this statement
  // If trust covers the total, credit = trust - total. If not, amount owing.
  const retainerCreditRemaining = trustBalance;

  // ── Styles ──
  // Navy: #1B2A4A (matches letterhead). Inline everything for PDF pipeline.
  const NAVY = '#1B2A4A';
  const HEADER_BG = '#2C3E6B';
  const ROW_ALT = '#F8F9FB';
  const BORDER = '#D1D5DB';

  // ── Docket entry rows ──
  const docketRows = params.docketEntries.length === 0
    ? `<tr><td colspan="4" style="padding:12px;text-align:center;color:#666;font-style:italic;">No professional services in this period.</td></tr>`
    : params.docketEntries
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(
          (e, i) => `
      <tr style="background:${i % 2 === 1 ? ROW_ALT : '#FFF'};">
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;width:100px;white-space:nowrap;">${fmtDateShort(e.date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;">${esc(e.description)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:55px;">${e.hours.toFixed(1)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:75px;">${fmt(e.rate)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:80px;">${e.noCharge ? 'No Charge' : fmt(e.amount)}</td>
      </tr>`
        )
        .join('');

  // ── Disbursement rows ──
  const disbursementRows = params.disbursements.length === 0
    ? `<tr><td style="padding:8px 10px;border-bottom:1px solid ${BORDER};font-style:italic;color:#666;" colspan="2">No disbursements incurred to date.</td><td style="padding:8px 10px;border-bottom:1px solid ${BORDER};text-align:right;">${fmt(0)}</td></tr>`
    : params.disbursements
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(
          (d, i) => `
      <tr style="background:${i % 2 === 1 ? ROW_ALT : '#FFF'};">
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;width:100px;white-space:nowrap;">${fmtDateShort(d.date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;">${esc(d.description)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:80px;">${fmt(d.amount)}</td>
      </tr>`
        )
        .join('');

  // ── Trust ledger rows ──
  const trustRows = params.trustEntries.length === 0
    ? `<tr><td colspan="5" style="padding:12px;text-align:center;color:#666;font-style:italic;">No trust account activity.</td></tr>`
    : params.trustEntries
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(
          (t, i) => `
      <tr style="background:${i % 2 === 1 ? ROW_ALT : '#FFF'};">
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;width:100px;white-space:nowrap;">${fmtDateShort(t.date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;">${esc(t.description)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:90px;">${t.received > 0 ? fmt(t.received) : '&mdash;'}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:90px;">${t.disbursed > 0 ? fmt(t.disbursed) : '&mdash;'}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${BORDER};vertical-align:top;text-align:right;width:90px;">${fmt(t.balance)}</td>
      </tr>`
        )
        .join('');

  return `
<div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #1a1a1a; line-height: 1.45; max-width: 720px; margin: 0 auto; padding: 0;">

  <!-- ═══ HEADER ═══ -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
    <div>
      <div style="font-size: 22pt; font-weight: 800; color: ${NAVY}; letter-spacing: -0.5px; line-height: 1.1;">LEGAL ASSIST</div>
      <div style="font-size: 11pt; color: #6B7280; margin-top: 2px;">Paralegal Services</div>
    </div>
    <div style="text-align: right; font-size: 9pt; color: #374151; line-height: 1.6;">
      <div>www.legalassist.london</div>
      <div>${PHONE_DISPLAY}</div>
      <div>${EMAIL_PRIMARY}</div>
      <div>${esc(paralegal.displayName)} | LSO #${esc(paralegal.lsoNumber)}</div>
    </div>
  </div>
  <hr style="border: none; border-top: 3px solid ${NAVY}; margin: 0 0 20px;" />

  <!-- ═══ TITLE ═══ -->
  <div style="text-align: center; font-size: 15pt; font-weight: 700; color: ${NAVY}; margin-bottom: 18px; letter-spacing: 0.5px;">
    DETAILED STATEMENT OF ACCOUNT
  </div>

  <!-- ═══ INFO BLOCK ═══ -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9.5pt;">
    <tr>
      <td style="padding: 4px 0; width: 105px;"><strong>Statement Date:</strong></td>
      <td style="padding: 4px 0;">${fmtDate(params.statementDate)}</td>
      <td style="padding: 4px 0; text-align: right;"><strong>Invoice No.:</strong> ${esc(params.invoiceNumber)}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0;"><strong>Client:</strong></td>
      <td style="padding: 4px 0;">${esc(params.clientName)}</td>
      <td style="padding: 4px 0; text-align: right;"><strong>File No.:</strong> ${esc(params.fileNumber)}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0; vertical-align: top;"><strong>Matter:</strong></td>
      <td style="padding: 4px 0;">${esc(params.matterDescription)}</td>
      <td style="padding: 4px 0; text-align: right;">${params.retainerDate ? `<strong>Retainer Date:</strong> ${fmtDate(params.retainerDate)}` : ''}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0;"><strong>Paralegal:</strong></td>
      <td style="padding: 4px 0;">${esc(paralegal.displayName)}, Licensed Paralegal (LSO #${esc(paralegal.lsoNumber)})</td>
      <td style="padding: 4px 0; text-align: right;"><strong>Currency:</strong> ${esc(currency)}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0;"><strong>Billing Period:</strong></td>
      <td colspan="2" style="padding: 4px 0;">${fmtDate(params.billingPeriodStart)} &ndash; ${fmtDate(params.billingPeriodEnd)}</td>
    </tr>
  </table>

  <div style="font-size: 9pt; color: #374151; margin-bottom: 20px;">
    <strong>Delivered:</strong>&nbsp; ${esc(params.deliveryNote)} &mdash; constitutes delivery pursuant to s. 6 of the <em>Solicitors Act</em>, R.S.O. 1990, c. S.15.
  </div>

  <!-- ═══ A. PROFESSIONAL SERVICES ═══ -->
  <div style="font-size: 12pt; font-weight: 700; color: ${NAVY}; margin-bottom: 6px;">A. &nbsp; PROFESSIONAL SERVICES</div>
  <div style="font-size: 9pt; color: #374151; margin-bottom: 8px;">
    Hourly Rate: ${fmt(params.hourlyRate)} per hour &nbsp;|&nbsp; Billing Increment: ${(billingIncrement / 60).toFixed(1)} hour (${billingIncrement} minutes)
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;" data-keep-together>
    <thead>
      <tr style="background: ${HEADER_BG}; color: #FFF;">
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Date</th>
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Description of Services Rendered</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Hours</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Rate</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${docketRows}
      <tr style="background: #F3F4F6; font-weight: 700;">
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px;"><strong>Total Professional Fees (${totalHours.toFixed(1)} billable hours)</strong></td>
        <td style="padding: 8px 10px; text-align: right;">${totalHours.toFixed(1)}</td>
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px; text-align: right;"><strong>${fmt(totalFees)}</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- ═══ B. DISBURSEMENTS ═══ -->
  <div style="font-size: 12pt; font-weight: 700; color: ${NAVY}; margin-bottom: 8px;">B. &nbsp; DISBURSEMENTS</div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
      <tr style="background: ${HEADER_BG}; color: #FFF;">
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Date</th>
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Description</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${disbursementRows}
      <tr style="background: #F3F4F6; font-weight: 700;">
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px;"><strong>Total Disbursements</strong></td>
        <td style="padding: 8px 10px; text-align: right;"><strong>${fmt(totalDisbursements)}</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- ═══ C. SUMMARY OF ACCOUNT ═══ -->
  <div style="font-size: 12pt; font-weight: 700; color: ${NAVY}; margin-bottom: 8px;">C. &nbsp; SUMMARY OF ACCOUNT</div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 6px 10px;">Professional Fees (${totalHours.toFixed(1)} billable hours)</td>
      <td style="padding: 6px 10px; text-align: right; width: 100px;">${fmt(totalFees)}</td>
    </tr>
    <tr>
      <td style="padding: 6px 10px;">Disbursements</td>
      <td style="padding: 6px 10px; text-align: right;">${fmt(totalDisbursements)}</td>
    </tr>
    <tr style="font-weight: 700; border-top: 2px solid ${NAVY};">
      <td style="padding: 6px 10px;"><strong>Subtotal</strong></td>
      <td style="padding: 6px 10px; text-align: right;"><strong>${fmt(subtotal)}</strong></td>
    </tr>
    <tr>
      <td style="padding: 6px 10px;">HST (13%)</td>
      <td style="padding: 6px 10px; text-align: right;">${fmt(hst)}</td>
    </tr>
    <tr style="background: ${NAVY}; color: #FFF; font-weight: 700;">
      <td style="padding: 8px 10px;"><strong>Total Amount of Account</strong></td>
      <td style="padding: 8px 10px; text-align: right;"><strong>${fmt(totalAmount)}</strong></td>
    </tr>
  </table>

  ${params.trustEntries.length > 0 ? `
  <!-- ═══ D. TRUST ACCOUNT LEDGER ═══ -->
  <div style="font-size: 12pt; font-weight: 700; color: ${NAVY}; margin-bottom: 6px;">D. &nbsp; TRUST ACCOUNT LEDGER</div>
  <div style="font-size: 9pt; color: #374151; margin-bottom: 8px;">
    Maintained in accordance with LSO By-Law 9 and the <em>Paralegal Rules of Conduct</em>, Rule 5.
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
    <thead>
      <tr style="background: ${HEADER_BG}; color: #FFF;">
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Date</th>
        <th style="padding: 8px 10px; text-align: left; font-weight: 600; font-size: 9pt;">Description</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Received</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Disbursed</th>
        <th style="padding: 8px 10px; text-align: right; font-weight: 600; font-size: 9pt;">Balance</th>
      </tr>
    </thead>
    <tbody>
      ${trustRows}
      <tr style="background: #F3F4F6; font-weight: 700;">
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px;"><strong>Trust Balance Remaining</strong></td>
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px;"></td>
        <td style="padding: 8px 10px; text-align: right;"><strong>${fmt(retainerCreditRemaining)}</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- Retainer Credit Remaining banner -->
  <div style="background: ${NAVY}; color: #FFF; padding: 10px 14px; font-weight: 700; font-size: 11pt; display: flex; justify-content: space-between; margin-bottom: 20px;">
    <span>RETAINER CREDIT REMAINING</span>
    <span>${fmt(retainerCreditRemaining)}</span>
  </div>
  ` : ''}

  <!-- ═══ DISCLAIMERS ═══ -->
  <div style="font-size: 8.5pt; color: #374151; line-height: 1.55; margin-top: 16px;">
    <p style="margin: 0 0 10px;">
      <strong>Right to Assessment:</strong>&nbsp; Pursuant to sections 4 and 6 of the <em>Solicitors Act</em>, R.S.O. 1990, c. S.15 (as extended to paralegals by s. 28.1), you have the right to have this account assessed by an Assessment Officer of the Superior Court of Justice. If a request for assessment is made within one month of delivery of this statement, assessment is available as of right; between one and twelve months, the court may order assessment if special circumstances are shown.
    </p>
    <p style="margin: 0 0 10px;">
      <strong>Interest on Overdue Accounts:</strong>&nbsp; Interest at a rate of ${interestRate.toFixed(1)}% per annum may be charged on any portion of this account remaining unpaid 30 days after delivery, in accordance with the terms of the retainer agreement${params.retainerDate ? ` dated ${fmtDate(params.retainerDate)}` : ''}.
    </p>
    <p style="margin: 0 0 10px;">
      <strong>Payment:</strong>&nbsp; ${retainerCreditRemaining > 0 && params.trustEntries.length > 0
        ? `The amount owing has been applied against the retainer held in trust, leaving a credit balance of ${fmt(retainerCreditRemaining)}. No further payment is required at this time. The remaining retainer will be applied to future services or refunded upon conclusion of the matter.`
        : `Payment is due within 30 days of delivery. Please make payment by e-transfer to ${EMAIL_PRIMARY} or by cheque payable to "Legal Assist Paralegal Services."`}
    </p>
    <p style="margin: 0 0 10px;">
      <strong>Dispute Resolution:</strong>&nbsp; If you have concerns about this account, please contact our office. You may also contact the Law Society of Ontario at 1-800-668-7380 or www.lso.ca.
    </p>
  </div>

  <!-- ═══ FOOTER ═══ -->
  <div style="margin-top: 28px; font-size: 10pt;">
    <div>Prepared by: &nbsp;<strong>${esc(paralegal.displayName)}</strong>, Licensed Paralegal &nbsp;|&nbsp; LSO #${esc(paralegal.lsoNumber)}</div>
    <div style="font-size: 9pt; color: #6B7280; margin-top: 4px;">
      Legal Assist Paralegal Services &nbsp;|&nbsp; www.legalassist.london &nbsp;|&nbsp; ${PHONE_DISPLAY}
    </div>
  </div>

</div>
`;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Generate and download a Statement of Account PDF.
 * Returns the PDF data URL for optional further use.
 */
export async function generateSOA(params: SOAParams): Promise<string> {
  const html = buildSOAHtml(params);
  const clientSlug = params.clientName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const dateSlug = params.statementDate.toISOString().slice(0, 10);
  const docName = `SOA_${clientSlug}_${dateSlug}`;

  const pdfDataUrl = await generatePDF(html, docName);
  return pdfDataUrl;
}

export async function generateAndDownloadSOA(params: SOAParams): Promise<void> {
  const pdfDataUrl = await generateSOA(params);
  const clientSlug = params.clientName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const dateSlug = params.statementDate.toISOString().slice(0, 10);
  await downloadPDF(pdfDataUrl, `SOA_${clientSlug}_${dateSlug}.pdf`);
}

/**
 * Generate a next invoice number in the format INV-YYYYMM-NNNN.
 * Accepts the existing invoice count for the current month.
 */
export function generateInvoiceNumber(existingCount: number): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const seq = String(existingCount + 1).padStart(4, '0');
  return `LA-${yyyy}-${seq}`;
}

/**
 * Parse docket entry metadata from the financialrecords trustAccountId
 * JSON field into a typed object.
 */
export function parseDocketMeta(trustAccountId: string | null | undefined): {
  hours: number;
  minutes: number;
  rate: number;
  activityCode: string;
  billingModel: string;
  status: string;
} | null {
  if (!trustAccountId) return null;
  try {
    const parsed = JSON.parse(trustAccountId);
    return {
      hours: Number(parsed.hours) || 0,
      minutes: Number(parsed.minutes) || 0,
      rate: Number(parsed.rate) || 0,
      activityCode: parsed.activityCode || 'other',
      billingModel: parsed.billingModel || 'hourly',
      status: parsed.status || 'unbilled',
    };
  } catch {
    return null;
  }
}

/**
 * Convert a financialrecords docket_entry row + parsed meta into an
 * SOADocketEntry for the generator.
 */
export function toSOADocketEntry(record: {
  _id: string;
  transactionDate: string | Date;
  description: string;
  amount: number;
  trustAccountId?: string;
}, noCharge?: boolean): SOADocketEntry {
  const meta = parseDocketMeta(record.trustAccountId);
  const hours = meta ? meta.hours + meta.minutes / 60 : 0;
  const rate = meta?.rate ?? 0;
  const amount = noCharge ? 0 : (record.amount || hours * rate);

  return {
    id: record._id,
    date: new Date(record.transactionDate),
    description: record.description || '',
    hours: Math.round(hours * 10) / 10, // round to 0.1
    rate,
    amount,
    noCharge,
  };
}
