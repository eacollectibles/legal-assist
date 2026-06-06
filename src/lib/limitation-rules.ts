/**
 * Ontario limitation & procedural deadline rules.
 *
 * Pure logic used by the Limitation & Deadline Calculator. Given a
 * matter type and a single key date (the event that starts the clock —
 * incident, service, conviction, etc.), it computes every applicable
 * limitation and procedural deadline for that matter type.
 *
 * Each rule states the event its clock actually runs from
 * (`triggerDescription`), so the paralegal can confirm the key date they
 * entered is the correct trigger for that particular deadline.
 *
 * DISCLAIMER: these are conservative, general limits to surface risk.
 * They are NOT legal advice and do not replace case-specific analysis.
 * Discoverability, special parties (minors/incapable), and statutory
 * exceptions can change the actual date.
 */

export type DeadlineKind = 'limitation' | 'procedural';

export interface LimitationRule {
  id: string;
  name: string;
  kind: DeadlineKind;
  /** Days added to the key date to reach the deadline. */
  daysFromTrigger: number;
  /** What event the clock runs from. */
  triggerDescription: string;
  /** Governing authority. */
  statute: string;
}

export interface MatterType {
  key: string;          // stored value, also maps from clientfiles.matterType
  label: string;
  rules: LimitationRule[];
}

export interface ComputedDeadline {
  ruleId: string;
  name: string;
  kind: DeadlineKind;
  statute: string;
  triggerDescription: string;
  daysFromTrigger: number;
  /** ISO date (yyyy-mm-dd) of the computed deadline. */
  deadlineDate: string;
  /** Days from today (negative = past). */
  daysOut: number;
  severity: 'overdue' | 'critical' | 'warning' | 'ok';
}

/** Key-date types the user can label the entered date as (informational). */
export const KEY_DATE_TYPES: { value: string; label: string }[] = [
  { value: 'incident', label: 'Incident / event date' },
  { value: 'service', label: 'Date served / received' },
  { value: 'conviction', label: 'Date of conviction / order' },
  { value: 'decision', label: 'Date of decision / letter' },
  { value: 'discovery', label: 'Date discovered (knew or ought to have known)' },
  { value: 'learned', label: 'Date learned of the matter' },
];

export const MATTER_TYPES: MatterType[] = [
  {
    key: 'small_claims', label: 'Small Claims',
    rules: [
      { id: 'sc_limit_2yr', name: 'General limitation period', kind: 'limitation', daysFromTrigger: 730, triggerDescription: 'from the day the claim was discovered', statute: 'Limitations Act, 2002, s. 4' },
      { id: 'sc_ultimate_15yr', name: 'Ultimate limitation period', kind: 'limitation', daysFromTrigger: 5478, triggerDescription: 'from the act or omission', statute: 'Limitations Act, 2002, s. 15' },
      { id: 'sc_defence_20d', name: 'Defendant’s defence due', kind: 'procedural', daysFromTrigger: 20, triggerDescription: 'from service of the Plaintiff’s Claim', statute: 'Rules of the Small Claims Court, r. 9.01' },
      { id: 'sc_appeal_30d', name: 'Appeal to Divisional Court', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the date of the judgment', statute: 'Courts of Justice Act' },
    ],
  },
  {
    key: 'ltb', label: 'Landlord & Tenant (LTB)',
    rules: [
      { id: 'ltb_s29_1yr', name: 'Tenant rights application (T2/T6)', kind: 'limitation', daysFromTrigger: 365, triggerDescription: 'from the day the conduct occurred (or ended, if ongoing)', statute: 'RTA, 2006, s. 29(2)' },
      { id: 'ltb_s135_1yr', name: 'Illegal charges / rent (T1)', kind: 'limitation', daysFromTrigger: 365, triggerDescription: 'from the day the money was collected', statute: 'RTA, 2006, s. 135(4)' },
      { id: 'ltb_review_30d', name: 'Request to review an LTB order', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the date of the order', statute: 'LTB Rules of Procedure' },
      { id: 'ltb_appeal_30d', name: 'Appeal to Divisional Court (question of law)', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the date of the order', statute: 'RTA, 2006, s. 210' },
    ],
  },
  {
    key: 'traffic', label: 'Traffic / Provincial Offences',
    rules: [
      { id: 'poa_respond_15d', name: 'Respond to offence notice (Part I)', kind: 'procedural', daysFromTrigger: 15, triggerDescription: 'from the date the ticket was issued', statute: 'Provincial Offences Act, Part I' },
      { id: 'poa_first_appearance_45d', name: 'First appearance (typical scheduling)', kind: 'procedural', daysFromTrigger: 45, triggerDescription: 'from the date the ticket was issued', statute: 'POA practice (varies by court)' },
      { id: 'poa_appeal_30d', name: 'Appeal a conviction', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the date of conviction', statute: 'Provincial Offences Act, s. 135' },
      { id: 'poa_reopen_15d', name: 'Motion to reopen (struck conviction)', kind: 'procedural', daysFromTrigger: 15, triggerDescription: 'from learning of the conviction', statute: 'Provincial Offences Act, s. 11' },
    ],
  },
  {
    key: 'hrto', label: 'Human Rights (HRTO)',
    rules: [
      { id: 'hrto_apply_1yr', name: 'File application', kind: 'limitation', daysFromTrigger: 365, triggerDescription: 'from the last incident of discrimination', statute: 'Human Rights Code, s. 34' },
      { id: 'hrto_response_35d', name: 'Respondent’s response due', kind: 'procedural', daysFromTrigger: 35, triggerDescription: 'from delivery of the application', statute: 'HRTO Rules of Procedure' },
      { id: 'hrto_reconsider_30d', name: 'Request for reconsideration', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the date of the decision', statute: 'HRTO Rules of Procedure' },
    ],
  },
  {
    key: 'employment', label: 'Employment / Labour',
    rules: [
      { id: 'emp_civil_2yr', name: 'Civil claim (wrongful dismissal)', kind: 'limitation', daysFromTrigger: 730, triggerDescription: 'from the date of dismissal', statute: 'Limitations Act, 2002, s. 4' },
      { id: 'emp_esa_2yr', name: 'ESA complaint', kind: 'limitation', daysFromTrigger: 730, triggerDescription: 'from the date wages became due', statute: 'Employment Standards Act, 2000' },
    ],
  },
  {
    key: 'defamation', label: 'Defamation (libel / slander)',
    rules: [
      { id: 'def_notice_6wk', name: 'Libel notice (newspaper / broadcast)', kind: 'procedural', daysFromTrigger: 42, triggerDescription: 'from becoming aware of the libel', statute: 'Libel and Slander Act, s. 5(1)' },
      { id: 'def_limit_3mo', name: 'Limitation (newspaper / broadcast)', kind: 'limitation', daysFromTrigger: 92, triggerDescription: 'from publication / becoming aware', statute: 'Libel and Slander Act, s. 6' },
      { id: 'def_limit_2yr', name: 'General limitation (other defamation)', kind: 'limitation', daysFromTrigger: 730, triggerDescription: 'from the day the claim was discovered', statute: 'Limitations Act, 2002, s. 4' },
    ],
  },
  {
    key: 'wsib', label: 'WSIB / Workplace Injury',
    rules: [
      { id: 'wsib_claim_6mo', name: 'File a claim', kind: 'limitation', daysFromTrigger: 183, triggerDescription: 'from the injury or awareness of it', statute: 'Workplace Safety and Insurance Act, s. 22' },
      { id: 'wsib_object_30d', name: 'Object to a WSIB decision', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the decision letter', statute: 'WSIB Operational Policy' },
      { id: 'wsib_wsiat_30d', name: 'Appeal to WSIAT', kind: 'procedural', daysFromTrigger: 30, triggerDescription: 'from the final WSIB decision', statute: 'WSIA' },
    ],
  },
  {
    key: 'collections', label: 'Debt Collection',
    rules: [
      { id: 'col_limit_2yr', name: 'Commence action on the debt', kind: 'limitation', daysFromTrigger: 730, triggerDescription: 'from default or last acknowledgement of the debt', statute: 'Limitations Act, 2002, s. 4' },
    ],
  },
];

/** Map a clientfiles.matterType value to a MATTER_TYPES key. */
export function matterKeyFromFile(matterType: string | undefined | null): string {
  const m = String(matterType || '').toLowerCase().replace(/[\s/]+/g, '_');
  const direct = MATTER_TYPES.find(t => t.key === m);
  if (direct) return direct.key;
  if (m.includes('ltb') || m.includes('landlord') || m.includes('tenant')) return 'ltb';
  if (m.includes('small')) return 'small_claims';
  if (m.includes('traffic') || m.includes('poa') || m.includes('provincial')) return 'traffic';
  if (m.includes('human') || m.includes('hrto')) return 'hrto';
  if (m.includes('employ') || m.includes('labour') || m.includes('dismissal')) return 'employment';
  if (m.includes('defam') || m.includes('libel') || m.includes('slander')) return 'defamation';
  if (m.includes('wsib') || m.includes('injur')) return 'wsib';
  if (m.includes('collect') || m.includes('debt')) return 'collections';
  return '';
}

export function getMatter(key: string): MatterType | undefined {
  return MATTER_TYPES.find(t => t.key === key);
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function daysBetweenToday(iso: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(iso + 'T00:00:00');
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

export function severityFor(daysOut: number): ComputedDeadline['severity'] {
  if (daysOut < 0) return 'overdue';
  if (daysOut <= 14) return 'critical';
  if (daysOut <= 60) return 'warning';
  return 'ok';
}

/** Compute every applicable deadline for a matter, from a single key date. */
export function computeDeadlines(matterKey: string, keyDateISO: string): ComputedDeadline[] {
  const matter = getMatter(matterKey);
  if (!matter || !keyDateISO) return [];
  return matter.rules.map(r => {
    const deadlineDate = addDays(keyDateISO, r.daysFromTrigger);
    const daysOut = daysBetweenToday(deadlineDate);
    return {
      ruleId: r.id, name: r.name, kind: r.kind, statute: r.statute,
      triggerDescription: r.triggerDescription, daysFromTrigger: r.daysFromTrigger,
      deadlineDate, daysOut, severity: severityFor(daysOut),
    };
  }).sort((a, b) => a.deadlineDate.localeCompare(b.deadlineDate));
}
