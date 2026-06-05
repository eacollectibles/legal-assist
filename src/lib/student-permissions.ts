/**
 * F-J — Paralegal student permission helpers.
 *
 * Students are users with `userType === 'paralegal_student'`. They are
 * supervised by a paralegal (`supervisingParalegalId`) and can edit
 * client files where they appear in `assignedStudentIds`.
 *
 * Authorization model:
 *   1. Admins (paralegals) see everything.
 *   2. Students see ONLY files where their useraccount _id appears in
 *      the file's `assignedStudentIds` (comma-separated text field).
 *   3. Financial fields (trust ledger, banking, full card details) are
 *      redacted for students UNLESS the supervising paralegal flips
 *      `allowFinancialView=true` on the student's useraccount row.
 *
 * LSO context: paralegal students may work on files under the
 * supervision of a licensed paralegal per LSO By-Law 4 s.2(2). The
 * supervising paralegal is responsible for all work product. This
 * module's redaction defaults reflect that supervision obligation.
 */

export type UserType = 'paralegal' | 'paralegal_student' | 'client' | 'admin';

export interface UserAccount {
  _id: string;
  email?: string;
  userType?: UserType;
  isAdmin?: boolean;
  /** Set on students; references the supervising paralegal's useraccount _id. */
  supervisingParalegalId?: string;
  /**
   * Paralegal-controlled toggle on student rows. When true the student
   * can see trust ledger, banking details, and full payment card
   * info. Default false.
   */
  allowFinancialView?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface ClientFile {
  _id: string;
  assignedParalegalId?: string;
  /**
   * Comma-separated useraccount _id's of paralegal students permitted
   * to view + edit this file. Empty / undefined means no student
   * access.
   */
  assignedStudentIds?: string;
  [k: string]: any;
}

// ============================================================
// Role detection
// ============================================================

export function isStudent(user: UserAccount | null | undefined): boolean {
  if (!user) return false;
  return user.userType === 'paralegal_student';
}

export function isParalegal(user: UserAccount | null | undefined): boolean {
  if (!user) return false;
  // Treat existing isAdmin=true rows as paralegals for backwards-compat.
  return user.userType === 'paralegal' || user.userType === 'admin' || !!user.isAdmin;
}

export function isStudentOrParalegal(user: UserAccount | null | undefined): boolean {
  return isStudent(user) || isParalegal(user);
}

// ============================================================
// Capability checks: opening files + taking payments
// ============================================================

/**
 * May the user open (create) new client files / matters?
 *
 * Paralegals: always.
 * Students:   only when the supervising paralegal has granted
 *             `allowFinancialView` (the same toggle that unlocks
 *             financial data). New files a student opens are
 *             auto-assigned to the student AND their supervising
 *             paralegal, who remains responsible per LSO By-Law 4
 *             s.2(2).
 * Anyone else: never.
 */
export function canOpenNewFiles(user: UserAccount | null | undefined): boolean {
  if (isParalegal(user)) return true;
  return isStudent(user) && user?.allowFinancialView === true;
}

/**
 * May the user take a payment (incl. retainer into trust)?
 *
 * Same gate as opening files: paralegals always, students only with
 * `allowFinancialView`. Taking money into trust is a financial action,
 * so it is intentionally tied to the financial-view grant rather than
 * being available to every student.
 */
export function canTakePayments(user: UserAccount | null | undefined): boolean {
  return canOpenNewFiles(user);
}

// ============================================================
// File-level authorization
// ============================================================

/**
 * Returns true if `user` is allowed to view `file`.
 *
 * Paralegals: always true.
 * Students:   only if the file's assignedStudentIds contains user._id.
 * Anyone else: false.
 */
export function canViewFile(user: UserAccount | null | undefined, file: ClientFile | null | undefined): boolean {
  if (!user || !file) return false;
  if (isParalegal(user)) return true;
  if (!isStudent(user)) return false;
  return getAssignedStudentIds(file).includes(user._id);
}

/**
 * Returns true if `user` may edit `file`. Same rules as view for the
 * paralegal_student role we configured (full edit on assigned files);
 * if the firm later flips to "draft mode" this is the chokepoint to
 * change.
 */
export function canEditFile(user: UserAccount | null | undefined, file: ClientFile | null | undefined): boolean {
  return canViewFile(user, file);
}

/**
 * Filter an array of files down to ones the user is allowed to see.
 * Use this on every list endpoint that returns files.
 */
export function filterVisibleFiles<T extends ClientFile>(user: UserAccount | null | undefined, files: T[]): T[] {
  if (!user) return [];
  if (isParalegal(user)) return files;
  if (!isStudent(user)) return [];
  const myId = user._id;
  return files.filter(f => getAssignedStudentIds(f).includes(myId));
}

/** Parse the comma-separated `assignedStudentIds` field into an array. */
export function getAssignedStudentIds(file: ClientFile | null | undefined): string[] {
  const raw = file?.assignedStudentIds || '';
  return String(raw)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

/** Build a comma-separated `assignedStudentIds` field from an array. */
export function setAssignedStudentIds(ids: string[]): string {
  // Dedup + filter empties so the stored field stays clean.
  return Array.from(new Set(ids.filter(Boolean).map(s => s.trim()))).join(',');
}

// ============================================================
// Financial-field redaction
// ============================================================

/**
 * Fields that are masked when a student views a file without
 * `allowFinancialView`. Add to this list if new financial-sensitive
 * fields are introduced.
 */
export const FINANCIAL_REDACT_FIELDS = [
  'trustBalance',
  'generalBalance',
  'bankAccount',
  'bankRoutingNumber',
  'cardNumber',
  'cardLast4',
  'cardCvv',
  'sin',
  'sinFull',
  'fullPaymentHistory',
];

/**
 * Returns true if financial fields should be redacted in `file` for `user`.
 *
 * Logic:
 *   - Paralegals: never redact.
 *   - Students with allowFinancialView=true: never redact.
 *   - Students without the flag: always redact.
 *   - Anyone else: redact.
 */
export function shouldRedactFinancials(user: UserAccount | null | undefined): boolean {
  if (!user) return true;
  if (isParalegal(user)) return false;
  if (isStudent(user) && user.allowFinancialView === true) return false;
  return true;
}

/**
 * Return a shallow copy of `obj` with financial fields masked when
 * required for the given user. Numbers become 0, strings become
 * '••••'. Safe to call with any object — non-listed fields pass
 * through untouched.
 */
export function redactFinancialsFor<T extends Record<string, any>>(
  user: UserAccount | null | undefined,
  obj: T
): T {
  if (!shouldRedactFinancials(user)) return obj;
  const out: any = { ...obj };
  for (const field of FINANCIAL_REDACT_FIELDS) {
    if (field in out) {
      const v = out[field];
      if (typeof v === 'number') out[field] = 0;
      else if (typeof v === 'string') out[field] = '••••';
      else if (Array.isArray(v)) out[field] = [];
      else if (v && typeof v === 'object') out[field] = {};
    }
  }
  // Special-case partial masking: keep last 4 of card, year only on DOB.
  if ('cardNumber' in out && typeof obj['cardNumber'] === 'string') {
    out['cardNumber'] = '•••• •••• •••• ' + String(obj['cardNumber']).slice(-4);
  }
  if ('dateOfBirth' in out && typeof obj['dateOfBirth'] === 'string') {
    const year = String(obj['dateOfBirth']).slice(0, 4);
    out['dateOfBirth'] = year ? year + '-••-••' : '••••';
  }
  return out as T;
}

/**
 * Apply redaction to an array of file rows (e.g. financial records).
 */
export function redactFinancialsList<T extends Record<string, any>>(
  user: UserAccount | null | undefined,
  rows: T[]
): T[] {
  if (!shouldRedactFinancials(user)) return rows;
  return rows.map(r => redactFinancialsFor(user, r));
}

// ============================================================
// Audit trail helper
// ============================================================

/**
 * Build the payload for an `activitylogs` row recording a student
 * edit. The supervising paralegal is the audit recipient.
 *
 * Caller is responsible for inserting the row via BaseCrudService.
 */
export function buildStudentEditAuditEntry(args: {
  studentUser: UserAccount;
  fileId: string;
  fileName?: string;
  action: string; // e.g. 'updated_section_b', 'uploaded_document', 'generated_retainer'
  detail?: string;
}) {
  return {
    _id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `log_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    activityType: 'student_edit',
    actorEmail: args.studentUser.email || '',
    actorName: [args.studentUser.firstName, args.studentUser.lastName].filter(Boolean).join(' ') || args.studentUser.email || 'Student',
    actorRole: 'paralegal_student',
    supervisingParalegalId: args.studentUser.supervisingParalegalId || '',
    fileId: args.fileId,
    fileName: args.fileName || '',
    action: args.action,
    detail: args.detail || '',
    createdAt: new Date(),
  };
}
