/**
 * iCalendar (.ics) export for LTB / court deadlines and hearing dates.
 *
 * Produces an RFC 5545 VCALENDAR string the user can download and import
 * into Outlook, Google Calendar, or Apple Calendar — so a limitation
 * deadline tracked in the app also lives in the calendar the paralegal
 * actually watches.
 *
 * Pure string builder, no dependencies. The Deadline Tracker page wires a
 * "Download .ics" button to downloadIcs(buildDeadlinesIcs(...)).
 */

export interface IcsEvent {
  uid: string;          // stable unique id (use the record _id)
  title: string;        // SUMMARY
  date: string | Date;  // the deadline/hearing date (all-day event)
  description?: string;
  location?: string;
  /** Optional reminder, minutes before the event (e.g. 7 days = 10080). */
  alarmMinutesBefore?: number;
}

function pad(n: number): string { return n < 10 ? '0' + n : String(n); }

// All-day events use a DATE value (YYYYMMDD), no time component.
function toIcsDate(d: string | Date): string {
  const dt = new Date(d);
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}`;
}
function toIcsStamp(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

// RFC 5545 text escaping for SUMMARY / DESCRIPTION / LOCATION values.
function esc(s: string): string {
  return String(s || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// Fold long lines to <=75 octets per RFC 5545 (simple char-based fold).
function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) { parts.push(' ' + rest.slice(0, 74)); rest = rest.slice(74); }
  if (rest.length) parts.push(' ' + rest);
  return parts.join('\r\n');
}

export function buildDeadlinesIcs(events: IcsEvent[], calName = 'Legal Assist — Deadlines'): string {
  const stamp = toIcsStamp(new Date());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Legal Assist Paralegal Services//Deadlines//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    fold(`X-WR-CALNAME:${esc(calName)}`),
  ];

  events.forEach(e => {
    const start = toIcsDate(e.date);
    // All-day event: DTEND is the next day (exclusive) per the spec.
    const end = toIcsDate(new Date(new Date(e.date).getTime() + 86400000));
    lines.push('BEGIN:VEVENT');
    lines.push(fold(`UID:${esc(e.uid)}@legalassist.london`));
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART;VALUE=DATE:${start}`);
    lines.push(`DTEND;VALUE=DATE:${end}`);
    lines.push(fold(`SUMMARY:${esc(e.title)}`));
    if (e.description) lines.push(fold(`DESCRIPTION:${esc(e.description)}`));
    if (e.location) lines.push(fold(`LOCATION:${esc(e.location)}`));
    if (e.alarmMinutesBefore && e.alarmMinutesBefore > 0) {
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push(fold(`DESCRIPTION:Reminder — ${esc(e.title)}`));
      lines.push(`TRIGGER:-PT${e.alarmMinutesBefore}M`);
      lines.push('END:VALARM');
    }
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/** Trigger a browser download of an .ics string. */
export function downloadIcs(ics: string, filename = 'legal-assist-deadlines.ics'): void {
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.ics') ? filename : filename + '.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
