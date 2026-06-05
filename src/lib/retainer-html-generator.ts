/**
 * Retainer Agreement HTML Generator
 *
 * Generates a fully-populated retainer agreement HTML document for any
 * matter type the firm handles (LTB Tenant, LTB Landlord, Provincial
 * Offences, Traffic Tickets, Small Claims, Human Rights Tribunal, WSIB,
 * Employment, Other).
 *
 * Each matter type has a profile that controls:
 *   - Document title and footer
 *   - Matter-reference label (e.g. "POA #" vs "Court File #")
 *   - Nature-of-matter label (e.g. "Nature of Claim" vs "Nature of Charge")
 *   - Scope of services / exclusions
 *   - Disbursements list (matter-specific filing fees + standard items)
 *   - Conduct clause (landlord / opposing party / prosecutor variants)
 *   - LTB-only clauses (rent obligations, "no free rent")
 *
 * The signature block is auto-populated from the selected paralegal in
 * `src/lib/paralegals.ts` — name, LSO licence number, electronic signature,
 * and credential line. If no paralegal is supplied, the firm default is used.
 *
 * Backwards compatible: the only required fields are the ones already used
 * by existing callers (ClientFileManagementPage). All new fields are optional.
 */

import { format } from 'date-fns';
import { getParalegalById, getDefaultParalegal } from './paralegals';

// ============================================================
// TYPES
// ============================================================

export interface RetainerHTMLData {
  // ---- Client ----
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  clientUnit?: string;
  clientCity?: string;
  clientProvince?: string;
  clientPostalCode?: string;

  // ---- Matter ----
  matterReference?: string;
  matterType?: string;
  /** Free-text describing the claim/charge/dispute. Optional. */
  natureOfMatter?: string;
  /** Selects which retainer template to render. Optional — defaults to LTB Tenant. */
  templateName?: string;

  // ---- Fees ----
  feeArrangementType: string;
  hourlyRate?: string;
  flatFeeAmount?: string;
  hybridFlatFee?: string;
  hybridHourlyRate?: string;
  contingencyPercent?: string;
  retainerDeposit?: string;

  // ---- Payment received at signing (optional) ----
  // If `paymentReceived` is true the generated retainer renders a
  // "Receipt of Funds" / Form 9A-aligned section confirming the
  // payment. Callers should also write a matching row to the
  // `financialrecords` collection so the trust ledger stays in
  // sync with what the retainer documents.
  paymentReceived?: boolean;
  /** Numeric amount as a string, e.g. "500.00". Will be rendered with $. */
  paymentAmount?: string;
  /** cash | cheque | credit_card | etransfer | square | other */
  paymentMethod?: string;
  /** Display-formatted date the funds were received. */
  paymentDate?: string;
  /** Name of the paralegal who received the funds. */
  paymentReceivedBy?: string;
  /** Why the funds were received - "Retainer deposit", "Flat fee", "Disbursement", etc. */
  paymentPurpose?: string;
  /** Cheque #, e-transfer reference, Square receipt number, etc. */
  paymentReference?: string;
  /** "trust" or "general" - where the funds are deposited. */
  paymentDeposit?: string;

  // ---- Payment arrangement (going-forward schedule, optional) ----
  // Renders a "Payment Arrangement" subsection in Section 5 of the
  // retainer when `paymentArrangementEnabled` is true. Use this to
  // document an instalment plan or any non-default payment terms the
  // client agreed to. Distinct from "paymentReceived" which is the
  // Form 9A-aligned receipt for funds received at signing.
  /** If true, render a "Payment Arrangement" block. */
  paymentArrangementEnabled?: boolean;
  /** "full" | "installments" | "deferred" | "custom" */
  paymentArrangementType?: string;
  /** Total expected over the life of the arrangement (display only). */
  paymentArrangementTotal?: string;
  /** Per-instalment amount (when type === "installments"). */
  paymentInstallmentAmount?: string;
  /** "weekly" | "biweekly" | "monthly" | "quarterly" | string */
  paymentInstallmentFrequency?: string;
  /** Date the instalment schedule starts. */
  paymentInstallmentStartDate?: string;
  /** Number of instalments. */
  paymentInstallmentCount?: string;
  /** Free-text additional terms / clarifications. */
  paymentArrangementNotes?: string;

  // ---- Paralegal (signing) ----
  /** Id from `paralegals.ts`. Defaults to firm primary if omitted. */
  paralegalId?: string;
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
// MATTER PROFILES
// ============================================================

interface MatterProfile {
  documentTitle: string;
  subtitle: string;
  pageTitle: string;
  matterReferenceLabel: string;
  matterTypeLabel: string;
  natureOfMatterLabel: string;
  retainerSentence: string;
  scopeItems: string[];
  exclusions: string[];
  disbursementItems: string[];
  decisionMaker: string;
  footerCaption: string;
  showRentObligations: boolean;
  showFreeRentClause: boolean;
  conductReferent: 'landlord' | 'opposing_party' | 'prosecutor';
}

function getMatterProfile(templateName?: string): MatterProfile {
  const name = (templateName || '').toLowerCase();

  // -------------------- Limited Scope — Single Letter / Demand Letter --------------------
  // Flat-fee, one-shot engagement: paralegal drafts and sends ONE letter on
  // the Client's behalf voicing their concerns / demands to the other side.
  // Scope expressly ENDS the moment that letter is sent. No reply review,
  // no follow-up, no negotiation, no representation — any further work is
  // a separate retainer. Entered into in accordance with the LSO Paralegal
  // Rules of Conduct provisions governing limited scope representation
  // (see r. 3.02-1.1).
  //
  // Triggers (matched on lowercased templateName.includes):
  //   - 'limited scope'
  //   - 'demand letter'
  //   - 'single letter'
  //   - 'concerns letter'
  //   - 'letter retainer'
  if (
    name.includes('limited scope') ||
    name.includes('demand letter') ||
    name.includes('single letter') ||
    name.includes('concerns letter') ||
    name.includes('letter retainer')
  ) {
    const heading = 'Limited Scope Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Single Correspondence (One Letter) Service',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'File Ref:',
      matterTypeLabel: 'Recipient / Other Party:',
      natureOfMatterLabel: 'Nature of the Dispute and Concerns to be Raised in the Letter',
      retainerSentence:
        '<strong>This is a LIMITED SCOPE retainer</strong> entered into in accordance with the Law Society of Ontario&rsquo;s Paralegal Rules of Conduct provisions governing limited scope representation. ' +
        'The Client retains the Paralegal to provide ONE legal-correspondence service only: drafting a single letter on the Client&rsquo;s behalf setting out the Client&rsquo;s position, concerns, and any demands, and sending that letter to the identified recipient described above. ' +
        '<strong>The Paralegal&rsquo;s engagement under this retainer ends when the letter has been sent.</strong> ' +
        'The Paralegal is not retained to monitor for, review, or respond to any reply, to engage in further negotiation, to advise on litigation strategy, or to represent the Client in any proceeding arising from the dispute. Any further work requires a separate written retainer.',
      scopeItems: [
        'One (1) initial consultation regarding the dispute and the proposed letter',
        'Drafting one (1) letter setting out the Client&rsquo;s position, concerns, and any demands',
        'Review of the draft with the Client and incorporation of up to one round of reasonable revisions',
        'Sending the finalized letter via the agreed delivery method (email, ordinary mail, or courier)',
        'Providing the Client with a copy of the sent letter and, where reasonably available, proof of delivery',
      ],
      exclusions: [
        '<strong>Any work after the letter is sent</strong> — including reviewing, advising on, or responding to any reply received from the recipient',
        'A second demand letter, follow-up correspondence, or any further communication with the recipient',
        'Negotiation, mediation, or settlement discussions with the recipient or their counsel',
        'Drafting pleadings or commencing any proceeding (Small Claims, LTB, HRTO, Superior Court, etc.)',
        'Representation at any court, tribunal, mediation, settlement conference, or hearing',
        'Legal opinion on the merits of the dispute beyond what is reasonably necessary to draft the letter',
        'Strategy or analysis of likely response, settlement value, or expected outcome',
        'Investigation of facts beyond what the Client provides',
        'Advice relating to tax, immigration, criminal, family, or other unrelated legal issues',
        'Any assurance that the letter will be answered, that the dispute will be resolved, or that any deadline or limitation period will be paused, tolled, or extended by the letter',
        'Monitoring or calendaring of any limitation period, deadline, or response date — these remain solely the Client&rsquo;s responsibility',
      ],
      disbursementItems: [
        'Courier or registered mail charges (where used in lieu of email)',
        'Postage for ordinary mail delivery',
        'Photocopies, printing, or scanning if hard-copy delivery is requested',
      ],
      decisionMaker: 'the recipient of the letter (no adjudicator is involved in this engagement)',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' (Single Letter Scope) &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- Provincial Offences / Traffic Ticket --------------------
  if (name.includes('provincial offence') || name.includes('traffic ticket') || name.includes('poa')) {
    const isTraffic = name.includes('traffic');
    const heading = isTraffic ? 'Traffic Ticket Retainer Agreement' : 'Provincial Offences Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: isTraffic
        ? heading + ' &ndash; Provincial Offences Court Matters'
        : heading + ' &ndash; Provincial Offences Act Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: isTraffic ? 'Ticket / Offence #:' : 'POA / Offence #:',
      matterTypeLabel: 'Charge / Offence:',
      natureOfMatterLabel: 'Nature of the Charge',
      retainerSentence: isTraffic
        ? 'The Client retains the Paralegal to provide legal services in connection with a traffic ticket or related offence under the <em>Provincial Offences Act</em>, including representation at the Ontario Court of Justice (Provincial Offences Court).'
        : 'The Client retains the Paralegal to provide legal services in connection with a charge under the <em>Provincial Offences Act</em>, including representation at the Ontario Court of Justice (Provincial Offences Court).',
      scopeItems: [
        'Legal advice and case assessment in respect of the charge(s)',
        'Review of the certificate of offence, disclosure, and any officer notes',
        'Filing the Notice of Intention to Appear and any required forms',
        'Negotiation with the prosecutor regarding plea, charge reduction, or fine reduction',
        'Representation at early resolution meetings, pre-trials, and trial',
        'Advice on demerit points, insurance impact, and licence consequences',
      ],
      exclusions: [
        'Appeals to the Ontario Court of Justice (appellate division) or higher courts',
        'Civil claims arising from the underlying incident',
        'Criminal Code charges (indictable offences) or related criminal proceedings',
        'Reinstatement of a suspended licence outside this matter',
        'Advice relating to tax, immigration, family, or other unrelated legal issues',
      ],
      disbursementItems: [
        'Provincial Offences Court filing or transcript fees',
        'Disclosure request fees and copies of officer notes',
        'Process server fees, courier, printing, scanning, postage',
        'Witness or expert fees (e.g., accident reconstruction) if required',
      ],
      decisionMaker: 'Justice of the Peace or Provincial Offences Court',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'prosecutor',
    };
  }

  // -------------------- Small Claims Court --------------------
  if (name.includes('small claim')) {
    const heading = 'Small Claims Court Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Ontario Small Claims Court Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'Court File #:',
      matterTypeLabel: 'Type of Claim:',
      natureOfMatterLabel: 'Nature of the Claim',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with a Small Claims Court matter under the <em>Courts of Justice Act</em> and the <em>Rules of the Small Claims Court</em>.',
      scopeItems: [
        'Legal advice and case assessment within Small Claims Court jurisdiction',
        'Drafting of Plaintiff&rsquo;s Claim, Defence, Defendant&rsquo;s Claim, or related pleadings',
        'Service of documents and filing with the court',
        'Representation at settlement conferences, motions, and trial',
        'Negotiation and settlement discussions with the opposing party or counsel',
      ],
      exclusions: [
        'Appeals to the Divisional Court or higher courts',
        'Enforcement of judgments beyond initial steps',
        'Matters exceeding the monetary jurisdiction of the Small Claims Court',
        'Advice relating to tax, immigration, criminal, or family law issues',
      ],
      disbursementItems: [
        'Small Claims Court filing, motion, and trial fees',
        'Process server fees and service of documents',
        'Transcript or recording fees',
        'Courier, printing, scanning, document production costs',
        'Witness or expert reports if required',
      ],
      decisionMaker: 'Small Claims Court Deputy Judge',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- Human Rights Tribunal --------------------
  if (name.includes('human right') || name.includes('hrto')) {
    const heading = 'Human Rights Tribunal Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Human Rights Tribunal of Ontario Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'HRTO File #:',
      matterTypeLabel: 'Ground(s) of Discrimination:',
      natureOfMatterLabel: 'Nature of the Complaint',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with a complaint under the <em>Ontario Human Rights Code</em> before the Human Rights Tribunal of Ontario.',
      scopeItems: [
        'Legal advice and case assessment under the <em>Human Rights Code</em>',
        'Preparation and filing of the HRTO Application (Form 1) or Response (Form 2)',
        'Communication with the opposing party or counsel',
        'Negotiation, mediation, and settlement discussions',
        'Representation at case management conferences, mediations, and hearings',
      ],
      exclusions: [
        'Appeals or judicial review proceedings',
        'Civil litigation arising from the same facts (Small Claims, Superior Court)',
        'Criminal Code matters',
        'Advice relating to tax, immigration, or family law issues',
      ],
      disbursementItems: [
        'Tribunal filing fees (currently no fee at HRTO)',
        'Process server fees, courier, postage',
        'Medical, expert, or witness reports',
        'Transcripts, printing, scanning, document production',
      ],
      decisionMaker: 'Human Rights Tribunal of Ontario',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- WSIB / WSIAT --------------------
  if (name.includes('wsib') || name.includes('wsiat') || name.includes('workplace injury')) {
    const heading = 'WSIB / WSIAT Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Workplace Safety and Insurance Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'WSIB Claim #:',
      matterTypeLabel: 'Type of Claim:',
      natureOfMatterLabel: 'Nature of the Workplace Injury / Claim',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with a claim under the <em>Workplace Safety and Insurance Act, 1997</em> before the Workplace Safety and Insurance Board (WSIB) and, where applicable, the Workplace Safety and Insurance Appeals Tribunal (WSIAT).',
      scopeItems: [
        'Legal advice and case assessment under the <em>Workplace Safety and Insurance Act, 1997</em>',
        'Preparation and filing of WSIB initial claims, objections, and appeal forms',
        'Review of medical records and case file disclosure',
        'Communication with the WSIB case manager and the Appeals Resolution Officer',
        'Representation at WSIB hearings and at WSIAT hearings where applicable',
      ],
      exclusions: [
        'Civil claims against employers or third parties (right of action issues)',
        'Long-term disability claims with private insurers',
        'CPP-Disability or other federal benefit claims',
        'Advice relating to tax, immigration, or family law issues',
      ],
      disbursementItems: [
        'Medical record retrieval fees and physician report fees',
        'Translation services for medical documents if required',
        'Photocopies, scanning, courier, and postage',
        'Expert opinion or independent medical examination fees',
      ],
      decisionMaker: 'Workplace Safety and Insurance Board / WSIAT',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- Employment / Wrongful Dismissal --------------------
  if (name.includes('employment') || name.includes('wrongful dismissal')) {
    const heading = 'Employment Matter Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Employment Standards and Wrongful Dismissal Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'File Ref:',
      matterTypeLabel: 'Type of Matter:',
      natureOfMatterLabel: 'Nature of the Employment Dispute',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with an employment matter, including claims under the <em>Employment Standards Act, 2000</em> and common-law wrongful dismissal matters within Small Claims Court jurisdiction.',
      scopeItems: [
        'Legal advice and case assessment under the <em>Employment Standards Act, 2000</em>',
        'Filing of an Employment Standards complaint with the Ministry of Labour',
        'Drafting of demand letters and severance negotiation',
        'Representation in Small Claims Court for monetary recovery within jurisdiction',
        'Negotiation and settlement discussions with the employer',
      ],
      exclusions: [
        'Wrongful dismissal claims exceeding Small Claims Court jurisdiction (Superior Court)',
        'Class actions and unionized labour matters (referrals available)',
        'Human Rights Tribunal applications (separate retainer)',
        'Advice relating to tax, immigration, criminal, or family law issues',
      ],
      disbursementItems: [
        'Filing fees (Ministry of Labour or Small Claims Court)',
        'Process server fees and service of documents',
        'Photocopies, courier, printing, scanning, postage',
        'Expert reports (e.g., income loss calculation) if required',
      ],
      decisionMaker: 'Ministry of Labour or Small Claims Court',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- LTB Landlord --------------------
  if (name.includes('ltb landlord') || name.includes('landlord retainer')) {
    const heading = 'Landlord Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Landlord and Tenant Board Matters',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'File Ref:',
      matterTypeLabel: 'Tribunal Matter:',
      natureOfMatterLabel: 'Nature of the Dispute',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with a landlord-side matter before the Landlord and Tenant Board in Ontario.',
      scopeItems: [
        'Legal advice and case assessment under the <em>Residential Tenancies Act, 2006</em>',
        'Preparation of landlord applications (L1, L2, L3, L4, L5, L9, L10), notices (N4, N5, N12, N13), and evidence briefs',
        'Communication with the tenant or the tenant&rsquo;s representative',
        'Negotiation, mediation, and settlement discussions',
        'Representation at case management and hearings, whether virtual or in person',
      ],
      exclusions: [
        'Appeals or judicial review proceedings',
        'Sheriff coordination or post-order enforcement work',
        'Matters outside the jurisdiction of the Landlord and Tenant Board',
        'Civil claims for amounts beyond LTB monetary jurisdiction',
        'Advice relating to tax, immigration, criminal, or family law issues',
      ],
      disbursementItems: [
        'Landlord and Tenant Board filing fees',
        'Process server fees and service of notices',
        'Courier, printing, scanning, postage',
        'Background or compliance reports if required',
      ],
      decisionMaker: 'Landlord and Tenant Board',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- Other / Catch-all --------------------
  if (name.includes('other')) {
    const heading = 'Retainer Agreement';
    return {
      documentTitle: heading,
      subtitle: heading + ' &ndash; Legal Services',
      pageTitle: heading + ' – Legal Assist Paralegal Services',
      matterReferenceLabel: 'File Ref:',
      matterTypeLabel: 'Type of Matter:',
      natureOfMatterLabel: 'Nature of the Matter',
      retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with the matter described in this retainer agreement, within the scope of practice of a Licensed Paralegal regulated by the Law Society of Ontario.',
      scopeItems: [
        'Legal advice and case assessment within paralegal scope of practice',
        'Preparation of any required pleadings, applications, responses, or correspondence',
        'Communication with the opposing party or counsel',
        'Negotiation and settlement discussions',
        'Representation before the appropriate adjudicating body',
      ],
      exclusions: [
        'Matters outside paralegal scope of practice as defined by the Law Society of Ontario',
        'Appeals or judicial review proceedings',
        'Advice relating to tax, immigration, criminal, or family law issues',
      ],
      disbursementItems: [
        'Filing fees, motion fees, or hearing fees as applicable',
        'Process server fees and service of documents',
        'Courier, printing, scanning, postage',
        'Expert or witness reports if required',
      ],
      decisionMaker: 'the appropriate court or tribunal',
      footerCaption: 'Legal Assist Paralegal Services &bull; ' + heading + ' &bull; www.legalassist.london',
      showRentObligations: false,
      showFreeRentClause: false,
      conductReferent: 'opposing_party',
    };
  }

  // -------------------- DEFAULT: LTB Tenant --------------------
  return {
    documentTitle: 'Tenant Retainer Agreement',
    subtitle: 'Tenant Retainer Agreement &ndash; Landlord and Tenant Board Matters',
    pageTitle: 'Tenant Retainer Agreement – Legal Assist Paralegal Services',
    matterReferenceLabel: 'File Ref:',
    matterTypeLabel: 'Tribunal Matter:',
    natureOfMatterLabel: 'Nature of the Dispute',
    retainerSentence: 'The Client retains the Paralegal to provide legal services in connection with a tenant-side matter before the Landlord and Tenant Board in Ontario.',
    scopeItems: [
      'Legal advice and case assessment under the <em>Residential Tenancies Act, 2006</em>',
      'Preparation of tenant applications, responses, evidence briefs, and written submissions',
      'Communication with the landlord or the landlord&rsquo;s representative',
      'Negotiation and settlement discussions',
      'Representation at mediation, case management, and hearings, whether virtual or in person',
    ],
    exclusions: [
      'Appeals or judicial review proceedings',
      'Enforcement of orders',
      'Sheriff coordination or post-order enforcement work',
      'Matters outside the jurisdiction of the Landlord and Tenant Board',
      'Advice relating to tax, immigration, criminal, or family law issues',
    ],
    disbursementItems: [
      'Landlord and Tenant Board filing fees',
      'Process server fees, courier, printing, scanning, postage',
      'Third-party reports, records, or other external expenses',
    ],
    decisionMaker: 'Landlord and Tenant Board',
    footerCaption: 'Legal Assist Paralegal Services &bull; Tenant Retainer Agreement &bull; www.legalassist.london',
    showRentObligations: true,
    showFreeRentClause: true,
    conductReferent: 'landlord',
  };
}

// ============================================================
// HELPERS
// ============================================================

function bulletList(items: string[]): string {
  return items.map((i) => '      <li>' + i + '</li>').join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================================
// THE HTML TEMPLATE
// ============================================================

function getRetainerTemplate(profile: MatterProfile): string {
  const conductLandlordItems = '      <li>Harass, threaten, or intimidate the landlord or any witness</li>\n' +
    '      <li>Send communications that undermine legal strategy</li>\n' +
    '      <li>Misrepresent facts or conceal relevant information</li>\n' +
    '      <li>Take unilateral steps that materially affect the matter without informing the Paralegal</li>';
  const conductOpposingPartyItems = '      <li>Harass, threaten, or intimidate the opposing party, their representative, or any witness</li>\n' +
    '      <li>Send communications that undermine legal strategy</li>\n' +
    '      <li>Misrepresent facts or conceal relevant information</li>\n' +
    '      <li>Take unilateral steps that materially affect the matter without informing the Paralegal</li>';
  const conductProsecutorItems = '      <li>Contact the prosecutor, the issuing officer, or any witness directly without the Paralegal&rsquo;s knowledge</li>\n' +
    '      <li>Send communications that undermine legal strategy</li>\n' +
    '      <li>Misrepresent facts or conceal relevant information</li>\n' +
    '      <li>Take unilateral steps that materially affect the matter without informing the Paralegal</li>';
  const conductItems =
    profile.conductReferent === 'prosecutor'
      ? conductProsecutorItems
      : profile.conductReferent === 'opposing_party'
      ? conductOpposingPartyItems
      : conductLandlordItems;

  const socialMediaTarget =
    profile.conductReferent === 'prosecutor'
      ? 'the charge, the officer, the prosecution'
      : profile.conductReferent === 'opposing_party'
      ? 'the opposing party, the dispute, the evidence'
      : 'the landlord, the dispute, the evidence';

  const rentObligationsSection = profile.showRentObligations
    ? '    <h2>9. Ongoing Rent Obligations</h2>\n' +
      '    <p>\n' +
      '      The Client understands that starting or defending a Landlord and Tenant Board matter does not automatically\n' +
      '      suspend rent obligations. Unless specifically advised otherwise, the Client remains responsible for complying\n' +
      '      with tenancy obligations, including payment of rent when due.\n' +
      '    </p>'
    : profile.conductReferent === 'prosecutor'
    ? '    <h2>9. Continuing Obligations Pending Resolution</h2>\n' +
      '    <p>\n' +
      '      The Client understands that retaining the Paralegal does not stay the matter, suspend any deadlines,\n' +
      '      or eliminate underlying obligations. The Client remains responsible for complying with the law, any\n' +
      '      applicable conditions of release, demerit-point consequences, and any insurance reporting obligations\n' +
      '      until the matter is finally resolved.\n' +
      '    </p>'
    : '    <h2>9. Continuing Obligations Pending Resolution</h2>\n' +
      '    <p>\n' +
      '      The Client understands that retaining the Paralegal does not stay the matter, suspend any deadlines,\n' +
      '      or eliminate the Client&rsquo;s underlying obligations. The Client remains responsible for complying\n' +
      '      with all contractual, statutory, or court-imposed obligations until the matter is finally resolved.\n' +
      '    </p>';

  const freeRentSection = profile.showFreeRentClause
    ? '    <h2>14. No Guarantee and No &ldquo;Free Rent&rdquo; Expectation</h2>\n' +
      '    <p>\n' +
      '      The Client acknowledges that no result has been promised or guaranteed. Filing a claim or defending an application\n' +
      '      does not entitle the Client to free rent, full compensation, or any particular remedy. Outcomes depend on the law,\n' +
      '      the evidence, credibility findings, and the decision of the adjudicator.\n' +
      '    </p>'
    : '    <h2>14. No Guarantee of Outcome</h2>\n' +
      '    <p>\n' +
      '      The Client acknowledges that no result has been promised or guaranteed. Outcomes depend on the law,\n' +
      '      the evidence, credibility findings, and the decision of the adjudicator.\n' +
      '    </p>';

  const head = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + profile.pageTitle + '</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet">\n<style>\n  :root{ --ink:#111827; --muted:#6B7280; --line:#E5E7EB; --paper:#FFFFFF; --bg:#F9FAFB; --sig:#1F2D5C; }\n  *{ box-sizing:border-box; }\n  body{ margin:0; padding:24px; background:var(--bg); color:var(--ink); font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:1.55; }\n  .page{ max-width:920px; margin:0 auto; background:var(--paper); border:1px solid #000; padding:24px; }\n  header{ margin-bottom:14px; }\n  .toprow{ display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; }\n  h1{ font-size:19px; margin:0 0 4px; }\n  .subtitle{ font-size:13px; color:var(--muted); margin:0; }\n  .meta{ font-size:13px; min-width:260px; }\n  .meta strong{ font-weight:700; }\n  hr{ border:none; border-top:1px solid #000; margin:16px 0; }\n  h2{ font-size:13px; margin:16px 0 8px; text-transform:uppercase; letter-spacing:.06em; }\n  h3{ font-size:14px; margin:12px 0 6px; }\n  p{ margin:8px 0; }\n  ul{ margin:8px 0 8px 18px; }\n  li{ margin:6px 0; }\n  .grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }\n  .field{ border-bottom:1px solid #000; padding:4px 0; min-height:24px; }\n  .field span{ font-weight:700; }\n  .nature-box{ border:1px solid #000; padding:12px; margin:12px 0; background:#fff; }\n  .nature-box .nature-label{ font-weight:700; text-transform:uppercase; font-size:12px; letter-spacing:.06em; margin:0 0 6px; }\n  .checkline{ margin:6px 0; }\n  .checkline.inactive{ display:none; }\n  .note-box{ border:1px solid #000; padding:12px; margin:12px 0; background:#fff; }\n  .sig-grid{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:12px; }\n  .sig-card{ border:1px solid #000; padding:14px; min-height:150px; }\n  .sig-title{ font-weight:700; margin:0 0 10px; }\n  .sig-line{ border-bottom:1px solid #000; min-height:24px; margin-top:20px; }\n  .sig-label{ font-size:12px; color:var(--muted); margin-top:4px; }\n  /* Cursive paralegal signature — Allura is loaded from Google Fonts above\n     with system-script fallbacks for offline / printing contexts. */\n  .sig-typed{ font-family: \'Allura\', \'Segoe Script\', \'Brush Script MT\', \'Lucida Handwriting\', cursive; font-size:36px; color: var(--sig); padding:4px 0 0; line-height:1.1; }\n  .sig-date{ font-size:13px; color:var(--ink); margin-top:4px; }\n  footer{ margin-top:18px; font-size:12px; text-align:center; color:var(--muted); }\n  @media (max-width:720px){ .grid,.sig-grid{ grid-template-columns:1fr; } }\n  @media print{ body{ background:#fff; padding:0; } .page{ border:none; } }\n</style>\n</head>';

  const body = '<body>\n  <div class="page">\n    <header>\n      <div class="toprow">\n        <div>\n          <h1>Legal Assist Paralegal Services</h1>\n          <p class="subtitle">' + profile.subtitle + '</p>\n        </div>\n        <div class="meta">\n          <div><strong>Client:</strong> {CLIENT_NAME}</div>\n          <div><strong>' + profile.matterReferenceLabel + '</strong> {MATTER_REFERENCE}</div>\n          <div><strong>Date:</strong> {DATE}</div>\n        </div>\n      </div>\n    </header>\n    <hr>\n    <h2>1. Parties</h2>\n    <div class="grid">\n      <div class="field"><span>Client Name:</span> {CLIENT_NAME}</div>\n      <div class="field"><span>Phone:</span> {CLIENT_PHONE}</div>\n      <div class="field"><span>Email:</span> {CLIENT_EMAIL}</div>\n      <div class="field"><span>' + profile.matterReferenceLabel + '</span> {MATTER_REFERENCE}</div>\n      <div class="field"><span>Address:</span> {CLIENT_ADDRESS_LINE1}</div>\n      <div class="field"><span>Unit:</span> {CLIENT_ADDRESS_LINE2}</div>\n      <div class="field"><span>City:</span> {CLIENT_CITY}</div>\n      <div class="field"><span>Province:</span> {CLIENT_PROVINCE}</div>\n      <div class="field"><span>Postal Code:</span> {CLIENT_POSTAL_CODE}</div>\n      <div class="field"><span>' + profile.matterTypeLabel + '</span> {LTB_MATTER_TYPE}</div>\n    </div>\n    <p>\n      This Retainer Agreement is entered into between <strong>Legal Assist Paralegal Services</strong>\n      (the &ldquo;Paralegal&rdquo;) and <strong>{CLIENT_NAME}</strong> (the &ldquo;Client&rdquo;).\n    </p>\n    <h2>2. Retainer and Relationship</h2>\n    <p>\n      ' + profile.retainerSentence + '\n    </p>\n    <p>\n      No paralegal-client relationship exists until this agreement is signed and the required retainer payment,\n      if any, has been received.\n    </p>\n    <div class="nature-box">\n      <p class="nature-label">' + profile.natureOfMatterLabel + '</p>\n      <p>{NATURE_OF_MATTER}</p>\n    </div>\n    <h2>3. Scope of Services</h2>\n    <p>The Paralegal may provide services including, where applicable:</p>\n    <ul>\n' + bulletList(profile.scopeItems) + '\n    </ul>\n    <div class="note-box">\n      <strong>Important:</strong> This retainer applies only to the specific matter described above, unless expanded in writing.\n    </div>\n    <h2>4. Excluded Services</h2>\n    <p>This retainer does not include, unless separately agreed in writing:</p>\n    <ul>\n' + bulletList(profile.exclusions) + '\n    </ul>\n    <h2>5. Fee Structure</h2>\n    <p>The Client and Paralegal agree to the following billing model:</p>\n    {FEE_CHECKLINES}\n    <p>\n      The selected billing model for this matter is: <strong>{SELECTED_FEE_MODEL}</strong>\n    </p>\n    <h3>Retainer Deposit</h3>\n    <p>\n      The Client agrees to pay an initial retainer deposit of <strong>$ {RETAINER_AMOUNT} + HST</strong>.\n      No work is required to begin until payment has been received.\n    </p>\n    {PAYMENT_SECTION}\n    {PAYMENT_ARRANGEMENT_SECTION}\n    <h3>Disbursements</h3>\n    <p>\n      Disbursements are out-of-pocket expenses we incur on the Client&rsquo;s behalf and are billed in\n      addition to legal fees, at cost. Typical disbursements in this matter may include:\n    </p>\n    <ul>\n' + bulletList(profile.disbursementItems) + '\n    </ul>\n    <p>\n      The Paralegal will provide an estimate where reasonably possible and notify the Client in advance of any\n      disbursement exceeding $250. HST is charged on legal fees and on taxable disbursements (court filing fees\n      that are exempt from HST will not be charged HST).\n    </p>\n    <h3>Payment Terms</h3>\n    <ul>\n      <li>Invoices are due upon receipt unless otherwise stated in writing</li>\n      <li>Interest may be charged on overdue accounts at 2% per month (24% annually)</li>\n      <li>The Paralegal may suspend services or withdraw if accounts are not kept current, subject to professional obligations</li>\n    </ul>\n    <h2>6. Contingency Fee Terms (If Applicable)</h2>\n    <p>\n      Any contingency arrangement applies only to monetary recovery actually obtained for the Client.\n      A contingency fee does not apply to non-monetary relief, dismissal of charges, avoidance of penalty,\n      or other purely defensive outcomes.\n    </p>\n    <p>\n      If the Client settles independently, withdraws the matter, fails to cooperate with the recovery process,\n      or otherwise prevents completion of the file, the Paralegal may be entitled to fees based on the fair value\n      of services performed, in addition to disbursements.\n    </p>\n    <h2>7. Client Responsibilities</h2>\n    <p>The Client agrees to:</p>\n    <ul>\n      <li>Provide complete, accurate, and truthful information</li>\n      <li>Promptly provide documents, records, and instructions when requested</li>\n      <li>Review draft materials and advise of any corrections promptly</li>\n      <li>Attend all scheduled meetings, mediations, and hearings</li>\n      <li>Keep contact information current</li>\n    </ul>\n    <h2>8. Evidence Requirements</h2>\n    <p>\n      The Client acknowledges that outcomes often depend heavily on evidence, including documents,\n      photographs, videos, written communications, receipts, records, and witness information.\n      The Paralegal does not create evidence and cannot guarantee a successful outcome where evidence is incomplete,\n      unavailable, inconsistent, or weak.\n    </p>\n    <p>\n      If the Client fails to provide sufficient evidence or instructions, the Paralegal may limit services,\n      recommend against proceeding, or withdraw where appropriate.\n    </p>\n' + rentObligationsSection + '\n    <h2>10. Urgent or Last-Minute Matters</h2>\n    <p>\n      If the Client retains the Paralegal close to a hearing date, after a deadline has nearly expired,\n      or in other urgent circumstances, preparation time may be limited and strategy may be restricted.\n    </p>\n    <p>\n      The Paralegal is not responsible for prejudice caused by late retention, delayed disclosure,\n      or incomplete instructions received shortly before a deadline or hearing.\n    </p>\n    <h2>11. Hearing Attendance and Participation</h2>\n    <p>\n      The Client must attend all hearings, be available during any virtual proceeding, and cooperate with hearing preparation.\n      Failure to attend or remain available may result in dismissal of claims, orders being made in the Client&rsquo;s absence,\n      or other adverse consequences.\n    </p>\n    <h2>12. Client Conduct</h2>\n    <p>The Client agrees not to:</p>\n    <ul>\n' + conductItems + '\n    </ul>\n    <p>\n      Serious misconduct, dishonesty, abuse, or a breakdown in trust may result in withdrawal,\n      subject to professional obligations.\n    </p>\n    <h2>13. Settlement</h2>\n    <p>\n      The Client acknowledges that settlement may involve compromise. The Paralegal will provide advice,\n      but the final decision whether to accept or reject a settlement remains with the Client unless the Client has given\n      express written settlement authority.\n    </p>\n' + freeRentSection + '\n    <h2>15. Communication Policy</h2>\n    <ul>\n      <li>Normal response time is approximately 1 to 2 business days</li>\n      <li>Immediate responses are not guaranteed</li>\n      <li>Communication must remain respectful and reasonable in frequency</li>\n    </ul>\n    <p>\n      Excessive, abusive, or inappropriate communication may be grounds for withdrawal,\n      subject to professional obligations.\n    </p>\n    <h2>16. File Abandonment</h2>\n    <p>\n      If the Client stops responding, fails to provide instructions, or does not supply requested materials within a reasonable time,\n      the Paralegal may close the file or withdraw. Fees and disbursements incurred to that point remain payable.\n    </p>\n    <h2>17. Social Media and Public Statements</h2>\n    <p>\n      The Client is advised not to post online about ' + socialMediaTarget + ', or the proceeding,\n      as social media and public statements may become relevant evidence.\n    </p>\n    <h2>18. No Action Without Funding</h2>\n    <p>\n      The Paralegal is not required to begin or continue work unless required funds have been paid and the account remains current.\n    </p>\n    <h2>19. Withdrawal</h2>\n    <p>The Paralegal may withdraw if:</p>\n    <ul>\n      <li>Fees remain unpaid</li>\n      <li>The Client fails to cooperate or provide proper instructions</li>\n      <li>The Client insists on a dishonest, improper, or unethical course of conduct</li>\n      <li>Professional obligations require withdrawal</li>\n    </ul>\n    <h2>20. Limitation of Liability</h2>\n    <p>\n      To the extent permitted by law, the Paralegal is not responsible for delays, scheduling issues,\n      technology failures outside the Paralegal&rsquo;s control, third-party acts, or the ultimate decision of ' + profile.decisionMaker + '.\n    </p>\n    <h2>21. Indemnity</h2>\n    <p>\n      The Client agrees to indemnify and hold the Paralegal harmless from claims, losses, or expenses arising from false,\n      misleading, incomplete, or concealed information provided by the Client, or from unauthorized actions taken by the Client.\n    </p>\n    <h2>22. Electronic Communication and Signatures</h2>\n    <p>\n      The Client consents to communication by email and other electronic means, electronic document exchange,\n      digital storage of the file, and the use of electronic signatures. Electronic copies shall be treated as effective originals.\n    </p>\n    <h2>23. Governing Law</h2>\n    <p>\n      This agreement shall be governed by the laws of the Province of Ontario.\n    </p>\n    <h2>24. Acknowledgment</h2>\n    <p>\n      By signing below, the Client confirms that they have read and understood this agreement,\n      had the opportunity to ask questions, and agree to its terms.\n    </p>\n    <hr>\n    <div class="sig-grid">\n      <div class="sig-card">\n        <div class="sig-title">Client Electronic Signature</div>\n        <div class="sig-line"></div>\n        <div class="sig-label">Client Signature</div>\n        <div class="sig-line"></div>\n        <div class="sig-label">Date</div>\n      </div>\n      <div class="sig-card">\n        <div class="sig-title">Paralegal Signature</div>\n        <div class="sig-typed">{PARALEGAL_SIGNATURE}</div>\n        <div class="sig-label">{PARALEGAL_NAME}, {PARALEGAL_CREDENTIAL}</div>\n        <div class="sig-label">LSO #{PARALEGAL_LSO}</div>\n        <div class="sig-date">{PARALEGAL_SIGN_DATE}</div>\n        <div class="sig-label">Date</div>\n      </div>\n    </div>\n    <footer>\n      ' + profile.footerCaption + '\n    </footer>\n  </div>\n</body>\n</html>';

  return head + '\n' + body;
}

// ============================================================
// FEE CHECKLINES BUILDER
// ============================================================

function buildFeeChecklines(data: RetainerHTMLData): string {
  const type = data.feeArrangementType;

  const lines: { key: string; label: string }[] = [
    { key: 'hourly', label: '<strong>Hourly Retainer:</strong> $ ' + (data.hourlyRate || '___') + ' per hour + HST' },
    { key: 'flat_fee', label: '<strong>Flat Fee:</strong> $ ' + (data.flatFeeAmount || '___') + ' + HST' },
    { key: 'hybrid', label: '<strong>Hybrid Retainer:</strong> Initial flat fee of $ ' + (data.hybridFlatFee || '___') + ' + HST, then $ ' + (data.hybridHourlyRate || '___') + ' per hour + HST' },
    { key: 'contingency', label: '<strong>Contingency Fee (monetary claims only):</strong> ' + (data.contingencyPercent || '___') + '% of monetary recovery obtained, plus HST where applicable' },
  ];

  return lines
    .map((l) => {
      const isSelected = l.key === type;
      const checkbox = isSelected ? '☑' : '☐';
      const cls = isSelected ? 'checkline' : 'checkline inactive';
      return '    <div class="' + cls + '">' + checkbox + ' ' + l.label + '</div>';
    })
    .join('\n');
}

// ============================================================
// PAYMENT RECEIVED ("Receipt of Funds") SECTION
// ============================================================
// If the paralegal recorded a payment at the time of signing the
// retainer (cash, cheque, e-transfer, Square, etc.), this renders a
// dedicated "Receipt of Funds" block in the PDF. The block doubles as
// the client's receipt and as an LSO By-Law 9 / Form 9A trust ledger
// reference. The caller is responsible for writing a matching row to
// the `financialrecords` collection so the trust ledger and the
// retainer text never drift apart.
const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'Cash',
  cheque: 'Cheque',
  credit_card: 'Credit card',
  etransfer: 'Interac e-Transfer',
  square: 'Credit card (Square)',
  other: 'Other',
};
const PAYMENT_DEPOSIT_LABELS: Record<string, string> = {
  trust: 'Trust account (LSO By-Law 9)',
  general: 'General (firm operating) account',
};
export function buildPaymentSection(data: RetainerHTMLData): string {
  if (!data.paymentReceived) return '';
  const row = (label: string, value: string) =>
    '<tr><td style="padding:4px 8px;font-weight:bold;width:40%;">' +
    escapeHtml(label) +
    '</td><td style="padding:4px 8px;">' +
    value +
    '</td></tr>';
  const amount = data.paymentAmount
    ? '$' + escapeHtml(String(data.paymentAmount).replace(/^\$\s*/, ''))
    : '___';
  const method = data.paymentMethod
    ? escapeHtml(PAYMENT_METHOD_LABELS[data.paymentMethod] || data.paymentMethod)
    : '___';
  const date = data.paymentDate ? escapeHtml(data.paymentDate) : '___';
  const receivedBy = data.paymentReceivedBy
    ? escapeHtml(data.paymentReceivedBy)
    : '___';
  const purpose = data.paymentPurpose ? escapeHtml(data.paymentPurpose) : '___';
  const reference = data.paymentReference
    ? escapeHtml(data.paymentReference)
    : 'N/A';
  const deposit = data.paymentDeposit
    ? escapeHtml(
        PAYMENT_DEPOSIT_LABELS[data.paymentDeposit] || data.paymentDeposit
      )
    : '___';
  return [
    '<section class="payment-received" style="margin-top:24px;padding:14px 16px;border:1.5pt solid #1F2D5C;background:#F7F8FB;">',
    '  <h3 style="margin:0 0 8px 0;font-size:13pt;color:#1F2D5C;">Receipt of Funds (Payment Received with Retainer)</h3>',
    '  <p style="margin:0 0 8px 0;font-size:10pt;">The Paralegal hereby acknowledges receipt of the following funds from the Client in connection with this retainer. This receipt is recorded in the firm’s trust accounting records in accordance with Law Society of Ontario By-Law 9.</p>',
    '  <table style="width:100%;border-collapse:collapse;font-size:10pt;">',
    '    <tbody>',
    row('Amount received:', amount + ' (plus HST where applicable)'),
    row('Method of payment:', method),
    row('Date received:', date),
    row('Received by:', receivedBy),
    row('Purpose of payment:', purpose),
    row('Reference / receipt #:', reference),
    row('Funds deposited into:', deposit),
    '    </tbody>',
    '  </table>',
    '</section>',
  ].join('\n');
}

// ============================================================
// PAYMENT ARRANGEMENT (going-forward schedule) SECTION
// ============================================================
// Renders a "Payment Arrangement" block in Section 5 of the retainer
// when the paralegal has filled in arrangement details. Documents
// instalment plans, deferred-payment terms, or any non-default
// payment schedule the client agreed to. Distinct from the
// "Receipt of Funds" block above, which records money received AT
// signing; this block records money expected AFTER signing.

const ARRANGEMENT_TYPE_LABELS: Record<string, string> = {
  full: 'Paid in full at signing',
  installments: 'Instalment plan',
  deferred: 'Deferred payment',
  custom: 'Custom arrangement (see notes)',
};

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  biweekly: 'Bi-weekly (every 2 weeks)',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

export function buildPaymentArrangementSection(data: RetainerHTMLData): string {
  if (!data.paymentArrangementEnabled) return '';

  const arrType = data.paymentArrangementType || '';
  const typeLabel = arrType
    ? escapeHtml(ARRANGEMENT_TYPE_LABELS[arrType] || arrType)
    : '___';

  const row = (label: string, value: string) =>
    '<tr><td style="padding:4px 8px;font-weight:bold;width:40%;">' +
    escapeHtml(label) +
    '</td><td style="padding:4px 8px;">' +
    value +
    '</td></tr>';

  const total = data.paymentArrangementTotal
    ? '$' + escapeHtml(String(data.paymentArrangementTotal).replace(/^\$\s*/, ''))
    : '___';

  const rows: string[] = [row('Arrangement type:', typeLabel)];

  // Total field always rendered (matters for every arrangement type).
  if (data.paymentArrangementTotal) {
    rows.push(row('Total amount expected:', total + ' (plus HST where applicable)'));
  }

  // Instalment-specific rows only when the arrangement is instalments.
  if (arrType === 'installments') {
    const instAmount = data.paymentInstallmentAmount
      ? '$' +
        escapeHtml(
          String(data.paymentInstallmentAmount).replace(/^\$\s*/, '')
        )
      : '___';
    const freq = data.paymentInstallmentFrequency
      ? escapeHtml(
          FREQUENCY_LABELS[data.paymentInstallmentFrequency] ||
            data.paymentInstallmentFrequency
        )
      : '___';
    const start = data.paymentInstallmentStartDate
      ? escapeHtml(data.paymentInstallmentStartDate)
      : '___';
    const count = data.paymentInstallmentCount
      ? escapeHtml(data.paymentInstallmentCount)
      : '___';
    rows.push(row('Instalment amount:', instAmount + ' per instalment + HST'));
    rows.push(row('Instalment frequency:', freq));
    rows.push(row('First instalment due:', start));
    rows.push(row('Number of instalments:', count));
  }

  const notes = data.paymentArrangementNotes
    ? '<p style="margin:8px 0 0 0;font-size:10pt;"><strong>Additional terms:</strong> ' +
      escapeHtml(data.paymentArrangementNotes) +
      '</p>'
    : '';

  return [
    '<section class="payment-arrangement" style="margin-top:18px;padding:14px 16px;border:1pt solid #1F2D5C;background:#FFFFFF;">',
    '  <h3 style="margin:0 0 8px 0;font-size:13pt;color:#1F2D5C;">Payment Arrangement</h3>',
    '  <p style="margin:0 0 8px 0;font-size:10pt;">The Client and the Paralegal have agreed to the following payment arrangement for fees and disbursements under this retainer. Amounts shown are exclusive of HST unless otherwise stated. Missed payments may, subject to the Paralegal&rsquo;s professional obligations, result in suspension of services or withdrawal of representation under Section 19.</p>',
    '  <table style="width:100%;border-collapse:collapse;font-size:10pt;">',
    '    <tbody>',
    rows.join('\n    '),
    '    </tbody>',
    '  </table>',
    '  ' + notes,
    '</section>',
  ].join('\n');
}

// ============================================================
// MAIN GENERATOR
// ============================================================

export function generateRetainerHTML(data: RetainerHTMLData): {
  html: string;
  dataUrl: string;
  filename: string;
} {
  const now = new Date();
  const dateFormatted = format(now, 'MMMM d, yyyy');

  const profile = getMatterProfile(data.templateName);
  const paralegal = getParalegalById(data.paralegalId) || getDefaultParalegal();

  let html = getRetainerTemplate(profile);

  // --- Client fields ---
  html = html.replace(/\{CLIENT_NAME\}/g, data.clientName || '—');
  html = html.replace(/\{CLIENT_EMAIL\}/g, data.clientEmail || '—');
  html = html.replace(/\{CLIENT_PHONE\}/g, data.clientPhone || '—');
  html = html.replace(/\{CLIENT_ADDRESS_LINE1\}/g, data.clientAddress || '—');
  html = html.replace(/\{CLIENT_ADDRESS_LINE2\}/g, data.clientUnit || '—');
  html = html.replace(/\{CLIENT_CITY\}/g, data.clientCity || '—');
  html = html.replace(/\{CLIENT_PROVINCE\}/g, data.clientProvince || 'Ontario');
  html = html.replace(/\{CLIENT_POSTAL_CODE\}/g, data.clientPostalCode || '—');
  html = html.replace(/\{MATTER_REFERENCE\}/g, data.matterReference || '—');
  html = html.replace(/\{LTB_MATTER_TYPE\}/g, data.matterType || '—');
  html = html.replace(/\{DATE\}/g, dateFormatted);

  // --- Nature of Matter ---
  const natureText = data.natureOfMatter && data.natureOfMatter.trim()
    ? escapeHtml(data.natureOfMatter.trim())
    : '<em>(To be provided by the Client.)</em>';
  html = html.replace(/\{NATURE_OF_MATTER\}/g, natureText);

  // --- Fee structure ---
  html = html.replace(/\{FEE_CHECKLINES\}/g, buildFeeChecklines(data));
  html = html.replace(/\{SELECTED_FEE_MODEL\}/g, FEE_MODEL_LABELS[data.feeArrangementType] || '—');
  html = html.replace(/\{RETAINER_AMOUNT\}/g, data.retainerDeposit || '___');

  // --- Payment Received (Receipt of Funds) section ---
  // If the paralegal recorded a payment in the Generate Retainer
  // dialog, render a notarised-style receipt block. Otherwise leave
  // an empty string so the placeholder collapses to nothing.
  html = html.replace(/\{PAYMENT_SECTION\}/g, buildPaymentSection(data));
  html = html.replace(
    /\{PAYMENT_ARRANGEMENT_SECTION\}/g,
    buildPaymentArrangementSection(data)
  );

  // --- Auto-signature (paralegal) ---
  // Use the bare display name (no "/s/" prefix) for the cursive rendering;
  // the Allura font + sig-typed CSS already convey that this is a signed
  // document. The "/s/" convention is implicit from the styled signature
  // appearing on the line.
  html = html.replace(/\{PARALEGAL_SIGNATURE\}/g, paralegal.displayName);
  html = html.replace(/\{PARALEGAL_NAME\}/g, paralegal.displayName);
  html = html.replace(/\{PARALEGAL_LSO\}/g, paralegal.lsoNumber);
  html = html.replace(/\{PARALEGAL_CREDENTIAL\}/g, paralegal.credentialLine);
  html = html.replace(/\{PARALEGAL_SIGN_DATE\}/g, dateFormatted);

  // --- Build data URL ---
  const blob = new Blob([html], { type: 'text/html' });
  const dataUrl = URL.createObjectURL(blob);
  const safeName = (data.clientName || 'Client').replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  const filename = 'Retainer_Agreement_' + safeName + '_' + format(now, 'yyyy-MM-dd') + '.html';

  return { html, dataUrl, filename };
}
