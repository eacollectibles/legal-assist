/**
 * Form 9E — Trust Listing PDF Generator
 *
 * LSO By-Law 9 s.18(10) requires every paralegal who maintains a
 * trust account to prepare a monthly "trust listing" — a printed
 * statement of every client trust balance at month-end, with the
 * sum cross-footing the trust ledger control total.
 *
 * This helper builds the listing in the LSO-prescribed Form 9E
 * format (firm header, period, paralegal name, per-client rows
 * with opening/in/out/closing, grand-total cross-foot, signature
 * block), then pipes the HTML through the project's existing
 * generatePDF + downloadPDF helpers. Same rendering engine
 * (html2canvas + jsPDF) as every other retainer / invoice PDF.
 *
 * Called from MonthEndReconciliationPage step 5 once the period
 * is locked. The listing is generated client-side from the same
 * trustRecordsThroughPeriodEnd data the wizard already has, so
 * there's no risk of the PDF disagreeing with the snapshot just
 * written.
 */

import { generatePDF, downloadPDF } from './pdf-generator';
import { getDefaultParalegal } from './paralegals';

export interface Form9ERow {
  clientId: string;
  clientName: string;
  openingBalance: number;
  deposits: number;
  withdrawals: number;
  closingBalance: number;
}

export interface Form9EParams {
  /** 1–12 */
  month: number;
  /** Four-digit year, e.g. 2026 */
  year: number;
  /** Period-end date (last day of month) — stamped on the form. */
  periodEndDate: Date;
  /** Per-client rows, already filtered to non-zero closing balance.
   *  Caller is responsible for sorting (usually clientName asc). */
  rows: Form9ERow[];
  /** Optional paralegal override. Defaults to the firm default. */
  paralegalName?: string;
  paralegalLicense?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function fmt(n: number): string {
  // Always show 2 decimals, including for zero. Negative numbers
  // render with a leading minus, no parentheses (we keep the
  // table readable rather than adopting accounting brackets).
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n).toFixed(2);
  // Thousand separator.
  const [whole, dec] = abs.split('.');
  const w = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}$${w}.${dec}`;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Build the Form 9E HTML body. Intentionally inline-styled so the
 * existing PDF wrapper (which strips most styles) doesn't fight
 * our layout. Heading colours match the rest of the firm's PDFs
 * (navy header / orange divider).
 */
function buildForm9EHtml(params: Form9EParams): string {
  const { month, year, periodEndDate, rows } = params;
  const paralegalName =
    params.paralegalName || getDefaultParalegal().displayName;
  const paralegalLicense =
    params.paralegalLicense || getDefaultParalegal().lsoNumber;

  const totalOpening = rows.reduce((s, r) => s + r.openingBalance, 0);
  const totalDeposits = rows.reduce((s, r) => s + r.deposits, 0);
  const totalWithdrawals = rows.reduce((s, r) => s + r.withdrawals, 0);
  const totalClosing = rows.reduce((s, r) => s + r.closingBalance, 0);

  // Build the per-client rows. Each row is a <tr>; we render the
  // closing balance in red if negative (a By-Law 9 red flag — must
  // never appear in a clean listing).
  const rowHtml = rows.length === 0
    ? `<tr><td colspan="6" style="padding:18px;text-align:center;color:#666;font-style:italic;">No client trust balances at period end.</td></tr>`
    : rows.map((r, i) => `
        <tr style="background:${i % 2 === 0 ? '#FFF' : '#FAFAFA'};">
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;">${i + 1}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;">${escapeHtml(r.clientName)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;text-align:right;font-variant-numeric:tabular-nums;">${fmt(r.openingBalance)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;text-align:right;font-variant-numeric:tabular-nums;color:#059669;">${r.deposits > 0 ? '+' : ''}${fmt(r.deposits)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;text-align:right;font-variant-numeric:tabular-nums;color:#B45309;">${r.withdrawals > 0 ? '-' : ''}${fmt(r.withdrawals)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;font-size:11px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;color:${r.closingBalance < 0 ? '#DC2626' : '#111827'};">${fmt(r.closingBalance)}</td>
        </tr>
      `).join('');

  const periodEndStr = periodEndDate.toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const generatedStr = new Date().toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return `
<div style="font-family:Inter,-apple-system,sans-serif;color:#111827;padding:24px;max-width:780px;margin:0 auto;">

  <!-- Header band: firm name + Form 9E label -->
  <div style="border-bottom:3px solid #B94A1F;padding-bottom:10px;margin-bottom:18px;">
    <div style="font-size:20px;font-weight:700;color:#1E3A8A;letter-spacing:0.3px;">
      Legal Assist Paralegal Services
    </div>
    <div style="font-size:11px;color:#6B7280;margin-top:2px;">
      London, Ontario · LSO Licensed Paralegal
    </div>
    <div style="font-size:13px;font-weight:600;color:#B94A1F;margin-top:6px;text-transform:uppercase;letter-spacing:0.5px;">
      Form 9E — Monthly Trust Listing
    </div>
    <div style="font-size:10px;color:#6B7280;margin-top:1px;">
      Required by Law Society of Ontario By-Law 9, s. 18(10)
    </div>
  </div>

  <!-- Period meta block -->
  <table style="width:100%;font-size:12px;margin-bottom:14px;border-collapse:collapse;">
    <tr>
      <td style="padding:3px 0;color:#6B7280;width:120px;">Reporting period:</td>
      <td style="padding:3px 0;font-weight:600;">${MONTH_NAMES[month - 1]} ${year}</td>
      <td style="padding:3px 0;color:#6B7280;width:120px;text-align:right;padding-right:8px;">As at:</td>
      <td style="padding:3px 0;font-weight:600;">${periodEndStr}</td>
    </tr>
    <tr>
      <td style="padding:3px 0;color:#6B7280;">Paralegal of record:</td>
      <td style="padding:3px 0;font-weight:600;">${escapeHtml(paralegalName)}</td>
      <td style="padding:3px 0;color:#6B7280;text-align:right;padding-right:8px;">LSO No.:</td>
      <td style="padding:3px 0;font-weight:600;">${escapeHtml(paralegalLicense)}</td>
    </tr>
    <tr>
      <td style="padding:3px 0;color:#6B7280;">Listing generated:</td>
      <td style="padding:3px 0;">${generatedStr}</td>
      <td style="padding:3px 0;color:#6B7280;text-align:right;padding-right:8px;">Clients:</td>
      <td style="padding:3px 0;font-weight:600;">${rows.length}</td>
    </tr>
  </table>

  <!-- Per-client trust listing table -->
  <table style="width:100%;border-collapse:collapse;border:1px solid #D1D5DB;margin-bottom:14px;">
    <thead>
      <tr style="background:#1E3A8A;color:#FFF;">
        <th style="padding:8px;font-size:11px;text-align:left;width:32px;">#</th>
        <th style="padding:8px;font-size:11px;text-align:left;">Client name</th>
        <th style="padding:8px;font-size:11px;text-align:right;width:100px;">Opening</th>
        <th style="padding:8px;font-size:11px;text-align:right;width:100px;">Deposits</th>
        <th style="padding:8px;font-size:11px;text-align:right;width:100px;">Withdrawals</th>
        <th style="padding:8px;font-size:11px;text-align:right;width:110px;">Closing</th>
      </tr>
    </thead>
    <tbody>
      ${rowHtml}
    </tbody>
    <tfoot>
      <tr style="background:#F3F4F6;border-top:2px solid #1E3A8A;">
        <td style="padding:8px;font-size:12px;font-weight:700;" colspan="2">TOTAL — Trust ledger control</td>
        <td style="padding:8px;font-size:12px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums;">${fmt(totalOpening)}</td>
        <td style="padding:8px;font-size:12px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums;color:#059669;">${fmt(totalDeposits)}</td>
        <td style="padding:8px;font-size:12px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums;color:#B45309;">${fmt(totalWithdrawals)}</td>
        <td style="padding:8px;font-size:13px;text-align:right;font-weight:800;font-variant-numeric:tabular-nums;color:#1E3A8A;">${fmt(totalClosing)}</td>
      </tr>
    </tfoot>
  </table>

  <!-- Cross-foot reconciliation note -->
  <div style="border-left:3px solid #B94A1F;padding:8px 12px;background:#FFF7ED;font-size:10.5px;color:#4A2C23;margin-bottom:20px;">
    <strong>Cross-foot:</strong> The TOTAL CLOSING column above must equal
    the trust journal ending balance and the reconciled bank total for
    ${MONTH_NAMES[month - 1]} ${year}. Any discrepancy must be investigated
    and resolved within 30 days (By-Law 9, s. 18(6)–(8)).
  </div>

  <!-- Attestation -->
  <div style="margin-top:30px;padding-top:20px;border-top:1px solid #D1D5DB;">
    <p style="font-size:11px;color:#374151;margin:0 0 22px 0;line-height:1.5;">
      I, ${escapeHtml(paralegalName)} (LSO No. ${escapeHtml(paralegalLicense)}),
      certify that the foregoing is a true and correct listing of all
      client trust balances held by Legal Assist Paralegal Services as
      at ${periodEndStr}, prepared in accordance with Law Society of
      Ontario By-Law 9.
    </p>
    <table style="width:100%;font-size:11px;">
      <tr>
        <td style="width:55%;padding-top:18px;border-top:1px solid #111827;">
          Signature of paralegal
        </td>
        <td style="width:5%;"></td>
        <td style="width:40%;padding-top:18px;border-top:1px solid #111827;">
          Date
        </td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="margin-top:20px;text-align:center;font-size:9px;color:#9CA3AF;">
    Form 9E v1.0 · Generated by Legal Assist Paralegal Services
    Month-End Reconciliation Wizard
  </div>
</div>
  `.trim();
}

/**
 * Build a Form 9E PDF for the given period and trigger a download.
 * Returns the dataUrl so the caller can also stash it on the
 * reconciliation snapshot or attach it to a client communication.
 */
export async function generateForm9EPdf(params: Form9EParams): Promise<string> {
  const html = buildForm9EHtml(params);
  const monthLabel = String(params.month).padStart(2, '0');
  const filename = `Form-9E-Trust-Listing-${params.year}-${monthLabel}.pdf`;
  const dataUrl = await generatePDF(html, filename);
  await downloadPDF(dataUrl, filename);
  return dataUrl;
}
