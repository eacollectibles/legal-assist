/**
 * Retainer Agreement HTML Generator
 *
 * Takes the form field values from the retainer agreement form,
 * populates the Tenant LTB Retainer HTML template with those values,
 * auto-signs with "Jean-Francois Demers" + generation date,
 * and returns the final HTML string as a data URL.
 */

import { format } from 'date-fns';

// ============================================================
// TYPES
// ============================================================

export interface RetainerHTMLData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  clientUnit?: string;
  clientCity?: string;
  clientProvince?: string;
  clientPostalCode?: string;
  matterReference?: string;
  matterType?: string;         // e.g. "T2 – Maintenance"
  feeArrangementType: string;  // 'hourly' | 'flat_fee' | 'hybrid' | 'contingency'
  hourlyRate?: string;
  flatFeeAmount?: string;
  hybridFlatFee?: string;
  hybridHourlyRate?: string;
  contingencyPercent?: string;
  retainerDeposit?: string;
}

// ============================================================
// FEE MODEL LABELS
// ============================================================

const FEE_MODEL_LABELS: Record<string, string> = {
  hourly: 'Hourly Retainer',
  flat_fee: 'Flat Fee',
  hybrid: 'Hybrid Retainer',
  contingency: 'Contingency Fee',
};

// ============================================================
// THE HTML TEMPLATE (your Tenant LTB Retainer)
// ============================================================

function getRetainerTemplate(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tenant Retainer Agreement – LegalAssist Paralegal Services</title>
<style>
  :root{
    --ink:#111827;
    --muted:#6B7280;
    --line:#E5E7EB;
    --paper:#FFFFFF;
    --bg:#F9FAFB;
  }
  *{ box-sizing:border-box; }
  body{
    margin:0;
    padding:24px;
    background:var(--bg);
    color:var(--ink);
    font-family: Arial, Helvetica, sans-serif;
    font-size:14px;
    line-height:1.55;
  }
  .page{
    max-width:920px;
    margin:0 auto;
    background:var(--paper);
    border:1px solid #000;
    padding:24px;
  }
  header{ margin-bottom:14px; }
  .toprow{
    display:flex;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
  }
  h1{ font-size:19px; margin:0 0 4px; }
  .subtitle{ font-size:13px; color:var(--muted); margin:0; }
  .meta{ font-size:13px; min-width:260px; }
  .meta strong{ font-weight:700; }
  hr{ border:none; border-top:1px solid #000; margin:16px 0; }
  h2{ font-size:13px; margin:16px 0 8px; text-transform:uppercase; letter-spacing:.06em; }
  h3{ font-size:14px; margin:12px 0 6px; }
  p{ margin:8px 0; }
  ul{ margin:8px 0 8px 18px; }
  li{ margin:6px 0; }
  .grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }
  .field{ border-bottom:1px solid #000; padding:4px 0; min-height:24px; }
  .field span{ font-weight:700; }
  .checkline{ margin:6px 0; }
  .checkline.inactive{ display:none; }
  .note-box{ border:1px solid #000; padding:12px; margin:12px 0; background:#fff; }
  .sig-grid{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:12px; }
  .sig-card{ border:1px solid #000; padding:14px; min-height:150px; }
  .sig-title{ font-weight:700; margin:0 0 10px; }
  .sig-line{ border-bottom:1px solid #000; min-height:24px; margin-top:20px; }
  .sig-label{ font-size:12px; color:var(--muted); margin-top:4px; }
  .sig-typed{
    font-family: 'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', cursive;
    font-size:20px;
    color:#111;
    padding:8px 0;
  }
  .sig-date{ font-size:13px; color:var(--ink); margin-top:4px; }
  footer{ margin-top:18px; font-size:12px; text-align:center; color:var(--muted); }
  @media (max-width:720px){ .grid,.sig-grid{ grid-template-columns:1fr; } }
  @media print{ body{ background:#fff; padding:0; } .page{ border:none; } }
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="toprow">
        <div>
          <h1>LegalAssist Paralegal Services</h1>
          <p class="subtitle">Tenant Retainer Agreement &ndash; Landlord and Tenant Board Matters</p>
        </div>
        <div class="meta">
          <div><strong>Client:</strong> {CLIENT_NAME}</div>
          <div><strong>File Ref:</strong> {MATTER_REFERENCE}</div>
          <div><strong>Date:</strong> {DATE}</div>
        </div>
      </div>
    </header>
    <hr>
    <h2>1. Parties</h2>
    <div class="grid">
      <div class="field"><span>Client Name:</span> {CLIENT_NAME}</div>
      <div class="field"><span>Phone:</span> {CLIENT_PHONE}</div>
      <div class="field"><span>Email:</span> {CLIENT_EMAIL}</div>
      <div class="field"><span>File Ref:</span> {MATTER_REFERENCE}</div>
      <div class="field"><span>Address:</span> {CLIENT_ADDRESS_LINE1}</div>
      <div class="field"><span>Unit:</span> {CLIENT_ADDRESS_LINE2}</div>
      <div class="field"><span>City:</span> {CLIENT_CITY}</div>
      <div class="field"><span>Province:</span> {CLIENT_PROVINCE}</div>
      <div class="field"><span>Postal Code:</span> {CLIENT_POSTAL_CODE}</div>
      <div class="field"><span>Tribunal Matter:</span> {LTB_MATTER_TYPE}</div>
    </div>
    <p>
      This Retainer Agreement is entered into between <strong>LegalAssist Paralegal Services</strong>
      (the &ldquo;Paralegal&rdquo;) and <strong>{CLIENT_NAME}</strong> (the &ldquo;Client&rdquo;).
    </p>
    <h2>2. Retainer and Relationship</h2>
    <p>
      The Client retains the Paralegal to provide legal services in connection with a tenant-side matter before the
      Landlord and Tenant Board in Ontario.
    </p>
    <p>
      No paralegal-client relationship exists until this agreement is signed and the required retainer payment,
      if any, has been received.
    </p>
    <h2>3. Scope of Services</h2>
    <p>The Paralegal may provide services including, where applicable:</p>
    <ul>
      <li>Legal advice and case assessment under the <em>Residential Tenancies Act, 2006</em></li>
      <li>Preparation of tenant applications, responses, evidence briefs, and written submissions</li>
      <li>Communication with the landlord or the landlord&rsquo;s representative</li>
      <li>Negotiation and settlement discussions</li>
      <li>Representation at mediation, case management, and hearings, whether virtual or in person</li>
    </ul>
    <div class="note-box">
      <strong>Important:</strong> This retainer applies only to the specific matter described above, unless expanded in writing.
    </div>
    <h2>4. Excluded Services</h2>
    <p>This retainer does not include, unless separately agreed in writing:</p>
    <ul>
      <li>Appeals or judicial review proceedings</li>
      <li>Enforcement of orders</li>
      <li>Sheriff coordination or post-order enforcement work</li>
      <li>Matters outside the jurisdiction of the Landlord and Tenant Board</li>
      <li>Advice relating to tax, immigration, criminal, or family law issues</li>
    </ul>
    <h2>5. Fee Structure</h2>
    <p>The Client and Paralegal agree to the following billing model:</p>
    {FEE_CHECKLINES}
    <p>
      The selected billing model for this matter is: <strong>{SELECTED_FEE_MODEL}</strong>
    </p>
    <h3>Retainer Deposit</h3>
    <p>
      The Client agrees to pay an initial retainer deposit of <strong>$ {RETAINER_AMOUNT} + HST</strong>.
      No work is required to begin until payment has been received.
    </p>
    <h3>Disbursements</h3>
    <p>The Client remains responsible for all reasonable disbursements, including but not limited to:</p>
    <ul>
      <li>Landlord and Tenant Board filing fees</li>
      <li>Courier, service, printing, scanning, or document production costs</li>
      <li>Third-party reports, records, or other external expenses</li>
    </ul>
    <h3>Payment Terms</h3>
    <ul>
      <li>Invoices are due upon receipt unless otherwise stated in writing</li>
      <li>Interest may be charged on overdue accounts at 2% per month (24% annually)</li>
      <li>The Paralegal may suspend services or withdraw if accounts are not kept current, subject to professional obligations</li>
    </ul>
    <h2>6. Contingency Fee Terms (If Applicable)</h2>
    <p>
      Any contingency arrangement applies only to monetary recovery actually obtained for the Client,
      such as compensation or a rent abatement awarded or secured by settlement. A contingency fee does not apply
      to avoiding eviction, delaying eviction, or obtaining non-monetary relief only.
    </p>
    <p>
      If the Client settles independently, withdraws the matter, fails to cooperate with the recovery process,
      or otherwise prevents completion of the file, the Paralegal may be entitled to fees based on the fair value
      of services performed, in addition to disbursements.
    </p>
    <h2>7. Client Responsibilities</h2>
    <p>The Client agrees to:</p>
    <ul>
      <li>Provide complete, accurate, and truthful information</li>
      <li>Promptly provide documents, records, and instructions when requested</li>
      <li>Review draft materials and advise of any corrections promptly</li>
      <li>Attend all scheduled meetings, mediations, and hearings</li>
      <li>Keep contact information current</li>
    </ul>
    <h2>8. Evidence Requirements</h2>
    <p>
      The Client acknowledges that tenant claims often depend heavily on evidence, including photographs,
      videos, notices, written communications, repair requests, receipts, inspection records, and witness information.
      The Paralegal does not create evidence and cannot guarantee a successful outcome where evidence is incomplete,
      unavailable, inconsistent, or weak.
    </p>
    <p>
      If the Client fails to provide sufficient evidence or instructions, the Paralegal may limit services,
      recommend against proceeding, or withdraw where appropriate.
    </p>
    <h2>9. Ongoing Rent Obligations</h2>
    <p>
      The Client understands that starting or defending a Landlord and Tenant Board matter does not automatically
      suspend rent obligations. Unless specifically advised otherwise, the Client remains responsible for complying
      with tenancy obligations, including payment of rent when due.
    </p>
    <h2>10. Urgent or Last-Minute Matters</h2>
    <p>
      If the Client retains the Paralegal close to a hearing date, after a deadline has nearly expired,
      or in other urgent circumstances, preparation time may be limited and strategy may be restricted by available time,
      evidence, and tribunal scheduling.
    </p>
    <p>
      The Paralegal is not responsible for prejudice caused by late retention, delayed disclosure,
      or incomplete instructions received shortly before a deadline or hearing.
    </p>
    <h2>11. Hearing Attendance and Participation</h2>
    <p>
      The Client must attend all hearings, be available during any virtual proceeding, and cooperate with hearing preparation.
      Failure to attend or remain available may result in dismissal of claims, orders being made in the Client&rsquo;s absence,
      or other adverse consequences.
    </p>
    <h2>12. Client Conduct</h2>
    <p>The Client agrees not to:</p>
    <ul>
      <li>Harass, threaten, or intimidate the landlord or any witness</li>
      <li>Send communications that undermine legal strategy</li>
      <li>Misrepresent facts or conceal relevant information</li>
      <li>Take unilateral steps that materially affect the matter without informing the Paralegal</li>
    </ul>
    <p>
      Serious misconduct, dishonesty, abuse, or a breakdown in trust may result in withdrawal,
      subject to professional obligations.
    </p>
    <h2>13. Settlement</h2>
    <p>
      The Client acknowledges that settlement may involve compromise. The Paralegal will provide advice,
      but the final decision whether to accept or reject a settlement remains with the Client unless the Client has given
      express written settlement authority.
    </p>
    <h2>14. No Guarantee and No &ldquo;Free Rent&rdquo; Expectation</h2>
    <p>
      The Client acknowledges that no result has been promised or guaranteed. Filing a claim or defending an application
      does not entitle the Client to free rent, full compensation, or any particular remedy. Outcomes depend on the law,
      the evidence, credibility findings, and the decision of the adjudicator.
    </p>
    <h2>15. Communication Policy</h2>
    <ul>
      <li>Normal response time is approximately 1 to 2 business days</li>
      <li>Immediate responses are not guaranteed</li>
      <li>Communication must remain respectful and reasonable in frequency</li>
    </ul>
    <p>
      Excessive, abusive, or inappropriate communication may be grounds for withdrawal,
      subject to professional obligations.
    </p>
    <h2>16. File Abandonment</h2>
    <p>
      If the Client stops responding, fails to provide instructions, or does not supply requested materials within a reasonable time,
      the Paralegal may close the file or withdraw. Fees and disbursements incurred to that point remain payable.
    </p>
    <h2>17. Social Media and Public Statements</h2>
    <p>
      The Client is advised not to post online about the landlord, the dispute, the evidence, or the proceeding,
      as social media and public statements may become relevant evidence.
    </p>
    <h2>18. No Action Without Funding</h2>
    <p>
      The Paralegal is not required to begin or continue work unless required funds have been paid and the account remains current.
      The Paralegal may decline to file materials, attend hearings, or continue services where payment obligations are not met,
      subject to professional obligations.
    </p>
    <h2>19. Withdrawal</h2>
    <p>The Paralegal may withdraw if:</p>
    <ul>
      <li>Fees remain unpaid</li>
      <li>The Client fails to cooperate or provide proper instructions</li>
      <li>The Client insists on a dishonest, improper, or unethical course of conduct</li>
      <li>Professional obligations require withdrawal</li>
    </ul>
    <h2>20. Limitation of Liability</h2>
    <p>
      To the extent permitted by law, the Paralegal is not responsible for delays, tribunal scheduling issues,
      technology failures outside the Paralegal&rsquo;s control, third-party acts, or the ultimate decision of the Landlord and Tenant Board.
    </p>
    <h2>21. Indemnity</h2>
    <p>
      The Client agrees to indemnify and hold the Paralegal harmless from claims, losses, or expenses arising from false,
      misleading, incomplete, or concealed information provided by the Client, or from unauthorized actions taken by the Client.
    </p>
    <h2>22. Electronic Communication and Signatures</h2>
    <p>
      The Client consents to communication by email and other electronic means, electronic document exchange,
      digital storage of the file, and the use of electronic signatures. Electronic copies shall be treated as effective originals.
    </p>
    <h2>23. Governing Law</h2>
    <p>
      This agreement shall be governed by the laws of the Province of Ontario.
    </p>
    <h2>24. Acknowledgment</h2>
    <p>
      By signing below, the Client confirms that they have read and understood this agreement,
      had the opportunity to ask questions, and agree to its terms.
    </p>
    <hr>
    <div class="sig-grid">
      <div class="sig-card">
        <div class="sig-title">Client Electronic Signature</div>
        <div class="sig-line"></div>
        <div class="sig-label">Client Signature</div>
        <div class="sig-line"></div>
        <div class="sig-label">Date</div>
      </div>
      <div class="sig-card">
        <div class="sig-title">Paralegal Signature</div>
        <div class="sig-typed">{PARALEGAL_SIGNATURE}</div>
        <div class="sig-label">Jean-Francois Demers, Licensed Paralegal</div>
        <div class="sig-date">{PARALEGAL_SIGN_DATE}</div>
        <div class="sig-label">Date</div>
      </div>
    </div>
    <footer>
      LegalAssist Paralegal Services &bull; Tenant Retainer Agreement &bull; www.legalassist.london
    </footer>
  </div>
</body>
</html>`;
}

// ============================================================
// FEE CHECKLINES BUILDER
// ============================================================

function buildFeeChecklines(data: RetainerHTMLData): string {
  const type = data.feeArrangementType;

  const lines: { key: string; label: string }[] = [
    {
      key: 'hourly',
      label: `<strong>Hourly Retainer:</strong> $ ${data.hourlyRate || '___'} per hour + HST`,
    },
    {
      key: 'flat_fee',
      label: `<strong>Flat Fee:</strong> $ ${data.flatFeeAmount || '___'} + HST`,
    },
    {
      key: 'hybrid',
      label: `<strong>Hybrid Retainer:</strong> Initial flat fee of $ ${data.hybridFlatFee || '___'} + HST, then $ ${data.hybridHourlyRate || '___'} per hour + HST`,
    },
    {
      key: 'contingency',
      label: `<strong>Contingency Fee (tenant monetary claims only):</strong> ${data.contingencyPercent || '___'}% of monetary recovery obtained, plus HST where applicable`,
    },
  ];

  return lines
    .map((l) => {
      const isSelected = l.key === type;
      const checkbox = isSelected ? '\u2611' : '\u2610'; // ☑ vs ☐
      const cls = isSelected ? 'checkline' : 'checkline inactive';
      return `    <div class="${cls}">${checkbox} ${l.label}</div>`;
    })
    .join('\n');
}

// ============================================================
// MAIN GENERATOR
// ============================================================

/**
 * Generates a fully-populated retainer agreement HTML document.
 *
 * - Replaces all {PLACEHOLDER} tokens with real values
 * - Shows only the selected fee type checkbox
 * - Auto-signs the paralegal signature block with typed name + date
 * - Returns { html, dataUrl, filename }
 */
export function generateRetainerHTML(data: RetainerHTMLData): {
  html: string;
  dataUrl: string;
  filename: string;
} {
  const now = new Date();
  const dateFormatted = format(now, 'MMMM d, yyyy');

  let html = getRetainerTemplate();

  // --- Client fields ---
  html = html.replace(/\{CLIENT_NAME\}/g, data.clientName || '\u2014');
  html = html.replace(/\{CLIENT_EMAIL\}/g, data.clientEmail || '\u2014');
  html = html.replace(/\{CLIENT_PHONE\}/g, data.clientPhone || '\u2014');
  html = html.replace(/\{CLIENT_ADDRESS_LINE1\}/g, data.clientAddress || '\u2014');
  html = html.replace(/\{CLIENT_ADDRESS_LINE2\}/g, data.clientUnit || '\u2014');
  html = html.replace(/\{CLIENT_CITY\}/g, data.clientCity || '\u2014');
  html = html.replace(/\{CLIENT_PROVINCE\}/g, data.clientProvince || 'Ontario');
  html = html.replace(/\{CLIENT_POSTAL_CODE\}/g, data.clientPostalCode || '\u2014');
  html = html.replace(/\{MATTER_REFERENCE\}/g, data.matterReference || '\u2014');
  html = html.replace(/\{LTB_MATTER_TYPE\}/g, data.matterType || '\u2014');
  html = html.replace(/\{DATE\}/g, dateFormatted);

  // --- Fee structure ---
  html = html.replace(/\{FEE_CHECKLINES\}/g, buildFeeChecklines(data));
  html = html.replace(/\{SELECTED_FEE_MODEL\}/g, FEE_MODEL_LABELS[data.feeArrangementType] || '\u2014');
  html = html.replace(/\{RETAINER_AMOUNT\}/g, data.retainerDeposit || '___');

  // --- Auto-signature (paralegal) ---
  html = html.replace(/\{PARALEGAL_SIGNATURE\}/g, 'Jean-Francois Demers');
  html = html.replace(/\{PARALEGAL_SIGN_DATE\}/g, dateFormatted);

  // --- Build data URL ---
  const blob = new Blob([html], { type: 'text/html' });
  const dataUrl = URL.createObjectURL(blob);
  const safeName = (data.clientName || 'Client').replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  const filename = `Retainer_Agreement_${safeName}_${format(now, 'yyyy-MM-dd')}.html`;

  return { html, dataUrl, filename };
}
