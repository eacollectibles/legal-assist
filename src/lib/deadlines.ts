/**
 * Deadlines — compute hard limitation periods and tribunal/court
 * deadlines for each open client file.
 *
 * Ontario limitation rules baked in (current as of 2026):
 *
 *   Limitations Act, 2002, s.4         — 2 years general
 *   Real Property Limitations Act     — 10 years (boundary cases)
 *   Residential Tenancies Act s.135   — 1 year (improper charges /
 *                                      unauthorized rent recovery)
 *   RTA s.69                          — 14 days notice → app to LTB
 *   Courts of Justice Act / Rules     — 2 years (Small Claims)
 *   Highway Traffic Act / POA         — 15 days (notice of intent)
 *                                       45 days (first appearance)
 *   Crown election (hybrid POA)        — pre-trial; tracked manually
 *   Human Rights Code s.34             — 1 year from incident
 *
 * The function below estimates the FIRST hard deadline per file
 * based on its matterType and dateOpened. A paralegal can override
 * by setting `nextDeadline` directly on the clientfile row — when
 * present, that explicit value always wins.
 *
 * Disclaimer: these are conservative limits intended to surface
 * upcoming risk on the dashboard. They are NOT legal advice and
 * are not a substitute for case-specific limitation analysis.
 */

export interface DeadlineRow {
  fileId: string;
  clientId?: string;
  clientName: string;
  matterType: string;
  /** ISO date string of the computed/explicit deadline. */
  deadlineDate: string;
  /** Human label, e.g. "RTA s.135 (1-year). */
  rule: string;
  /** Days from today (negative = past). */
  daysOut: number;
  /** Urgency bucket. */
  level: 'overdue' | 'critical' | 'warning' | 'ok';
  /** Was this overridden by the paralegal? */
  explicit: boolean;
}

// Lower-cased matter-type → (default limitation in months, rule label).
const RULES: Record<string, { months: number; rule: string }> = {
  ltb: { months: 12, rule: 'RTA s.135 (1-year)' },
  'landlord-tenant': { months: 12, rule: 'RTA s.135 (1-year)' },
  'small-claims': { months: 24, rule: 'Limitations Act s.4 (2-year)' },
  'small claims': { months: 24, rule: 'Limitations Act s.4 (2-year)' },
  traffic: { months: 0.5, rule: 'POA 15-day notice / 45-day first appearance' },
  'provincial-offences': { months: 0.5, rule: 'POA 15-day notice / 45-day first appearance' },
  poa: { months: 0.5, rule: 'POA 15-day notice / 45-day first appearance' },
  hrto: { months: 12, rule: 'Human Rights Code s.34 (1-year)' },
  'human-rights': { months: 12, rule: 'Human Rights Code s.34 (1-year)' },
  warranty: { months: 24, rule: 'Tarion warranty windows (matter-specific)' },
  'cash-for-keys': { months: 12, rule: 'RTA windows (matter-specific)' },
  defamation: { months: 6, rule: 'Libel and Slander Act notice (6-week / suit 3-mo)' },
  employment: { months: 24, rule: 'ESA / Limitations Act (case-specific)' },
  contract: { months: 24, rule: 'Limitations Act s.4 (2-year)' },
};

/**
 * Compute the urgency level given days remaining.
 */
function classify(daysOut: number): DeadlineRow['level'] {
  if (daysOut < 0) return 'overdue';
  if (daysOut <= 14) return 'critical';
  if (daysOut <= 30) return 'warning';
  return 'ok';
}

/**
 * Add `months` calendar months to a date. Handles year rollover.
 */
function addMonths(d: Date, months: number): Date {
  const out = new Date(d);
  const dec = Math.floor(months);
  const frac = months - dec;
  out.setMonth(out.getMonth() + dec);
  if (frac > 0) out.setDate(out.getDate() + Math.round(frac * 30));
  return out;
}

/**
 * Compute a single deadline row for one file, or null if no rule
 * applies or the file is closed.
 */
export function computeDeadline(file: {
  _id?: string;
  clientId?: string;
  clientName?: string;
  matterType?: string;
  fileStatus?: string;
  dateOpened?: string | Date;
  _createdDate?: string | Date;
  nextDeadline?: string | Date;
}): DeadlineRow | null {
  // Skip closed files — no live deadlines.
  const status = String(file.fileStatus || '').toLowerCase();
  if (['closed', 'archived', 'resolved'].includes(status)) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let deadlineDate: Date | null = null;
  let rule = '';
  let explicit = false;

  // Explicit override always wins.
  if (file.nextDeadline) {
    deadlineDate = new Date(file.nextDeadline as any);
    rule = 'Paralegal-set deadline';
    explicit = true;
  } else {
    // Compute from matter type + dateOpened.
    const matter = String(file.matterType || '').toLowerCase().trim();
    const ruleEntry = RULES[matter];
    if (!ruleEntry) return null;
    const opened = file.dateOpened || file._createdDate;
    if (!opened) return null;
    const openedDate = new Date(opened as any);
    if (Number.isNaN(openedDate.getTime())) return null;
    deadlineDate = addMonths(openedDate, ruleEntry.months);
    rule = ruleEntry.rule;
  }

  if (!deadlineDate || Number.isNaN(deadlineDate.getTime())) return null;

  const daysOut = Math.round(
    (deadlineDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000),
  );

  return {
    fileId: file._id || '',
    clientId: file.clientId,
    clientName: file.clientName || 'Unknown client',
    matterType: file.matterType || 'unknown',
    deadlineDate: deadlineDate.toISOString().slice(0, 10),
    rule,
    daysOut,
    level: classify(daysOut),
    explicit,
  };
}

/**
 * Bulk: take a list of clientfiles, return only the ones that
 * have a computable deadline, sorted nearest-first.
 */
export function computeDeadlines(files: any[]): DeadlineRow[] {
  const rows: DeadlineRow[] = [];
  for (const f of files) {
    const row = computeDeadline(f);
    if (row) rows.push(row);
  }
  rows.sort((a, b) => a.daysOut - b.daysOut);
  return rows;
}
