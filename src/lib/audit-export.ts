/**
 * LSO audit export — CSV bundles formatted for a Law Society spot audit.
 *
 * Produces three CSVs from the firm's records:
 *   1. Trust journal   (By-Law 9 Form 9A) — all trust financialrecords
 *   2. General journal  — all general financialrecords
 *   3. File list        — client files with open/close dates and status
 *
 * Pure builders + a browser download helper. No dependencies. Soft-deleted
 * records (isDeleted) are excluded from the journals but the count is
 * reported so the auditor knows retention is intact.
 */

const TRUST_SIGN: Record<string, number> = {
  trust_deposit: 1, billing: 1, payment: 1,
  trust_withdrawal: -1, disbursement: -1, refund: -1, transfer: -1,
};

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v);
  // Quote if the cell contains comma, quote, or newline; escape quotes.
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function csvRows(rows: (string | number)[][]): string {
  return rows.map(r => r.map(csvCell).join(',')).join('\r\n');
}
function fmtDate(d: unknown): string {
  if (!d) return '';
  const dt = new Date(d as any);
  return isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 10);
}
const money = (n: number) => (Math.round(n * 100) / 100).toFixed(2);

/** Build the trust or general journal CSV from financialrecords. */
export function buildJournalCsv(records: any[], journal: 'trust' | 'general'): string {
  const isTrust = (r: any) => !r.journalType || r.journalType === 'trust';
  const skip = new Set(['deadline', 'conflict_search', 'tickler', 'reconciliation']);
  const rows: (string | number)[][] = [[
    'Date', 'File', 'Client', 'Type', 'Description', 'Reference',
    'Method', 'Amount', 'Signed Amount', 'Recorded By',
  ]];
  let running = 0;
  records
    .filter(r => !r.isDeleted)
    .filter(r => (journal === 'trust' ? isTrust(r) : r.journalType === 'general'))
    .filter(r => !skip.has(r.transactionType))
    .sort((a, b) => new Date(a.transactionDate || 0).getTime() - new Date(b.transactionDate || 0).getTime())
    .forEach(r => {
      const amt = Number(r.amount) || 0;
      const signed = (TRUST_SIGN[r.transactionType] ?? 0) * amt;
      running += signed;
      rows.push([
        fmtDate(r.transactionDate),
        r.fileId || '',
        r.clientId || '',
        r.transactionType || '',
        r.description || '',
        r.referenceNumber || r.invoiceNumber || '',
        r.paymentMethod || '',
        money(amt),
        money(signed),
        r.recordedBy || '',
      ]);
    });
  rows.push([]);
  rows.push(['', '', '', '', '', '', 'Running balance', '', money(running), '']);
  return csvRows(rows);
}

/** Build the client-file list CSV. */
export function buildFileListCsv(files: any[]): string {
  const rows: (string | number)[][] = [[
    'File Number', 'Client', 'Matter Type', 'Status', 'Opened', 'Closed', 'Assigned Paralegal',
  ]];
  files
    .slice()
    .sort((a, b) => String(a.fileNumber || '').localeCompare(String(b.fileNumber || '')))
    .forEach(f => {
      rows.push([
        f.fileNumber || f._id || '',
        f.clientName || '',
        f.matterType || '',
        f.fileStatus || 'active',
        fmtDate(f.fileOpenDate || f._createdDate),
        fmtDate(f.fileClosedDate || f.closedDate),
        f.assignedParalegalName || f.assignedParalegalId || '',
      ]);
    });
  return csvRows(rows);
}

/** Trigger a browser download of a text/CSV string. */
export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }); // BOM for Excel
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : filename + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Convenience: download all three audit CSVs at once, date-stamped.
 * Pass the already-loaded financialrecords + clientfiles arrays.
 */
export function downloadAuditBundle(financialRecords: any[], files: any[]): void {
  const stamp = new Date().toISOString().slice(0, 10);
  downloadCsv(buildJournalCsv(financialRecords, 'trust'), `trust-journal-${stamp}.csv`);
  downloadCsv(buildJournalCsv(financialRecords, 'general'), `general-journal-${stamp}.csv`);
  downloadCsv(buildFileListCsv(files), `file-list-${stamp}.csv`);
}
