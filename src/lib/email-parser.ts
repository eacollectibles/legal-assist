/**
 * Email (.eml) File Parser
 *
 * Lightweight browser-side parser for RFC 2822 .eml files exported from
 * Outlook, Gmail, Thunderbird, etc. Extracts headers, plain-text body,
 * and basic metadata needed to create communication log entries.
 *
 * Handles:
 *   - Standard headers (From, To, CC, Subject, Date, Message-ID)
 *   - MIME multipart/alternative and multipart/mixed
 *   - Content-Transfer-Encoding: base64, quoted-printable, 7bit, 8bit
 *   - Encoded header words (RFC 2047 =?charset?encoding?text?=)
 *   - Multiple file upload (batch parsing)
 *
 * Does NOT handle:
 *   - .msg files (proprietary Microsoft format — different parser needed)
 *   - Attachment extraction (we only need the text for comm log)
 *   - S/MIME encrypted messages
 */

// ─── Types ──────────────────────────────────────────────────────────

export interface ParsedEmail {
  /** Original filename */
  filename: string;
  /** Message-ID header */
  messageId: string;
  /** Sender address + display name */
  from: EmailAddress;
  /** Recipient addresses */
  to: EmailAddress[];
  /** CC addresses */
  cc: EmailAddress[];
  /** Subject line */
  subject: string;
  /** Parsed date */
  date: Date;
  /** Plain-text body (preferred) */
  bodyText: string;
  /** HTML body (fallback — stripped to text if no plain-text part) */
  bodyHtml: string;
  /** Best available body as plain text */
  bodyPlain: string;
  /** Whether the email has attachments (info only) */
  hasAttachments: boolean;
  /** Number of attachments */
  attachmentCount: number;
  /** List of attachment filenames */
  attachmentNames: string[];
  /** Raw headers for debugging */
  rawHeaders: Record<string, string>;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface EmailImportResult {
  success: ParsedEmail[];
  errors: { filename: string; error: string }[];
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Parse a single .eml file from a File object (browser File API).
 */
export async function parseEmlFile(file: File): Promise<ParsedEmail> {
  const text = await file.text();
  return parseEmlString(text, file.name);
}

/**
 * Parse multiple .eml files, returning successes and errors separately.
 */
export async function parseEmlFiles(files: File[]): Promise<EmailImportResult> {
  const success: ParsedEmail[] = [];
  const errors: { filename: string; error: string }[] = [];

  for (const file of files) {
    try {
      const parsed = await parseEmlFile(file);
      success.push(parsed);
    } catch (err: any) {
      errors.push({ filename: file.name, error: err?.message || 'Unknown parse error' });
    }
  }

  // Sort by date ascending
  success.sort((a, b) => a.date.getTime() - b.date.getTime());

  return { success, errors };
}

/**
 * Determine email direction relative to our firm.
 * Returns 'inbound' if sender is external, 'outbound' if sender is us.
 */
export function detectDirection(
  email: ParsedEmail,
  firmDomains: string[] = ['legalassist.london'],
  firmEmails: string[] = ['jeanfrancois@legalassist.london', 'candice@legalassist.london'],
): 'inbound' | 'outbound' {
  const senderAddr = email.from.address.toLowerCase();

  // Check if sender is from one of our domains
  for (const domain of firmDomains) {
    if (senderAddr.endsWith(`@${domain.toLowerCase()}`)) {
      return 'outbound';
    }
  }

  // Check explicit email list
  for (const addr of firmEmails) {
    if (senderAddr === addr.toLowerCase()) {
      return 'outbound';
    }
  }

  return 'inbound';
}

/**
 * Build a communication log summary from a parsed email.
 */
export function buildCommLogSummary(email: ParsedEmail): string {
  const subject = email.subject || '(No subject)';
  return subject.length > 200 ? subject.slice(0, 197) + '...' : subject;
}

/**
 * Build communication log details from a parsed email.
 */
export function buildCommLogDetails(email: ParsedEmail, direction: 'inbound' | 'outbound'): string {
  const parts: string[] = [];

  if (direction === 'inbound') {
    parts.push(`From: ${formatAddress(email.from)}`);
    if (email.to.length) parts.push(`To: ${email.to.map(formatAddress).join(', ')}`);
  } else {
    if (email.to.length) parts.push(`To: ${email.to.map(formatAddress).join(', ')}`);
    parts.push(`From: ${formatAddress(email.from)}`);
  }

  if (email.cc.length) {
    parts.push(`CC: ${email.cc.map(formatAddress).join(', ')}`);
  }

  if (email.messageId) {
    parts.push(`Message-ID: ${email.messageId}`);
  }

  if (email.hasAttachments) {
    parts.push(`Attachments (${email.attachmentCount}): ${email.attachmentNames.join(', ')}`);
  }

  // Add body (truncated to 5000 chars for CMS field limits)
  const body = email.bodyPlain.trim();
  if (body) {
    parts.push('');
    parts.push('--- Email Body ---');
    parts.push(body.length > 5000 ? body.slice(0, 4997) + '...' : body);
  }

  return parts.join('\n');
}

function formatAddress(addr: EmailAddress): string {
  if (addr.name && addr.name !== addr.address) {
    return `${addr.name} <${addr.address}>`;
  }
  return addr.address;
}

// ─── Internal Parser ────────────────────────────────────────────────

function parseEmlString(raw: string, filename: string): ParsedEmail {
  // Normalize line endings to \r\n then split headers from body
  const normalized = raw.replace(/\r?\n/g, '\r\n');
  const headerBodySplit = normalized.indexOf('\r\n\r\n');

  if (headerBodySplit === -1) {
    throw new Error('Invalid .eml file: no header/body separator found');
  }

  const headerSection = normalized.slice(0, headerBodySplit);
  const bodySection = normalized.slice(headerBodySplit + 4);

  // Parse headers (handle continuation lines — lines starting with whitespace)
  const rawHeaders = parseHeaders(headerSection);

  // Extract key fields
  const from = parseAddressList(rawHeaders['from'] || '')[0] || { name: '', address: '' };
  const to = parseAddressList(rawHeaders['to'] || '');
  const cc = parseAddressList(rawHeaders['cc'] || '');
  const subject = decodeRfc2047(rawHeaders['subject'] || '(No subject)');
  const messageId = (rawHeaders['message-id'] || '').replace(/[<>]/g, '');
  const date = parseEmailDate(rawHeaders['date'] || '');

  // Parse body based on Content-Type
  const contentType = rawHeaders['content-type'] || 'text/plain';
  const transferEncoding = (rawHeaders['content-transfer-encoding'] || '7bit').toLowerCase().trim();

  let bodyText = '';
  let bodyHtml = '';
  let hasAttachments = false;
  let attachmentCount = 0;
  let attachmentNames: string[] = [];

  if (contentType.toLowerCase().includes('multipart/')) {
    // Extract boundary
    const boundaryMatch = contentType.match(/boundary="?([^";\r\n]+)"?/i);
    if (boundaryMatch) {
      const boundary = boundaryMatch[1].trim();
      const result = parseMultipart(bodySection, boundary);
      bodyText = result.text;
      bodyHtml = result.html;
      hasAttachments = result.attachmentNames.length > 0;
      attachmentCount = result.attachmentNames.length;
      attachmentNames = result.attachmentNames;
    }
  } else if (contentType.toLowerCase().includes('text/html')) {
    bodyHtml = decodeBody(bodySection, transferEncoding);
  } else {
    // text/plain or unknown — treat as plain text
    bodyText = decodeBody(bodySection, transferEncoding);
  }

  // Build best-available plain text
  let bodyPlain = bodyText.trim();
  if (!bodyPlain && bodyHtml) {
    bodyPlain = stripHtml(bodyHtml);
  }

  // Last-resort: if bodyPlain still looks like base64, decode it.
  // This catches cases where encoding headers were lost in forwarding.
  if (bodyPlain && looksLikeBase64(bodyPlain)) {
    try {
      const decoded = decodeBase64Text(bodyPlain.replace(/\s/g, ''));
      if (decoded && !looksLikeBase64(decoded)) {
        bodyPlain = decoded;
        // Also fix bodyText so both are consistent
        if (!bodyText.trim() || bodyText.trim() === bodyPlain) {
          bodyText = decoded;
        }
      }
    } catch {
      // keep original
    }
  }

  return {
    filename,
    messageId,
    from,
    to,
    cc,
    subject,
    date,
    bodyText,
    bodyHtml,
    bodyPlain,
    hasAttachments,
    attachmentCount,
    attachmentNames,
    rawHeaders,
  };
}

// ─── Header Parsing ─────────────────────────────────────────────────

function parseHeaders(headerSection: string): Record<string, string> {
  const headers: Record<string, string> = {};

  // Unfold continuation lines (lines starting with space/tab are continuations)
  const unfolded = headerSection.replace(/\r\n([ \t]+)/g, ' ');
  const lines = unfolded.split('\r\n');

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim().toLowerCase();
      const value = line.slice(colonIdx + 1).trim();
      headers[key] = value;
    }
  }

  return headers;
}

// ─── Address Parsing ────────────────────────────────────────────────

function parseAddressList(raw: string): EmailAddress[] {
  if (!raw.trim()) return [];

  const decoded = decodeRfc2047(raw);
  const addresses: EmailAddress[] = [];

  // Split on commas, but respect quotes and angle brackets
  const parts = smartSplit(decoded, ',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Try "Display Name" <email@addr> format
    const angleMatch = trimmed.match(/^(.*?)\s*<([^>]+)>\s*$/);
    if (angleMatch) {
      const name = angleMatch[1].replace(/^["']|["']$/g, '').trim();
      addresses.push({ name, address: angleMatch[2].trim() });
      continue;
    }

    // Try bare email
    const emailMatch = trimmed.match(/[\w.+-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      addresses.push({ name: '', address: emailMatch[0] });
      continue;
    }

    // Fallback — treat whole thing as an address
    addresses.push({ name: '', address: trimmed });
  }

  return addresses;
}

function smartSplit(str: string, delimiter: string): string[] {
  const parts: string[] = [];
  let current = '';
  let inQuotes = false;
  let depth = 0;

  for (const ch of str) {
    if (ch === '"' && depth === 0) {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === '<') {
      depth++;
      current += ch;
    } else if (ch === '>') {
      depth = Math.max(0, depth - 1);
      current += ch;
    } else if (ch === delimiter && !inQuotes && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }

  if (current) parts.push(current);
  return parts;
}

// ─── RFC 2047 Decoding (encoded header words) ───────────────────────

function decodeRfc2047(str: string): string {
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]+)\?=/g, (_match, charset, encoding, text) => {
    try {
      if (encoding.toUpperCase() === 'B') {
        // Base64
        return decodeBase64Text(text);
      } else {
        // Quoted-printable (underscore = space in RFC 2047)
        return decodeQuotedPrintable(text.replace(/_/g, ' '));
      }
    } catch {
      return text;
    }
  });
}

// ─── Date Parsing ───────────────────────────────────────────────────

function parseEmailDate(dateStr: string): Date {
  if (!dateStr) return new Date();

  // Clean up common date format issues
  let cleaned = dateStr.trim();
  // Remove day-of-week prefix like "Mon, "
  cleaned = cleaned.replace(/^\w{3},\s*/, '');
  // Remove trailing timezone name in parens like "(EST)"
  cleaned = cleaned.replace(/\s*\([^)]*\)\s*$/, '');

  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) return parsed;

  // Fallback: try the original string
  const fallback = new Date(dateStr);
  if (!isNaN(fallback.getTime())) return fallback;

  return new Date();
}

// ─── MIME Multipart Parsing ─────────────────────────────────────────

interface MultipartResult {
  text: string;
  html: string;
  attachmentNames: string[];
}

function parseMultipart(body: string, boundary: string): MultipartResult {
  const result: MultipartResult = { text: '', html: '', attachmentNames: [] };

  // Split by boundary
  const delimiter = `--${boundary}`;
  const parts = body.split(delimiter);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || trimmed === '--') continue;

    // Split part headers from part body
    const partSplit = trimmed.indexOf('\r\n\r\n');
    if (partSplit === -1) continue;

    const partHeaders = parseHeaders(trimmed.slice(0, partSplit));
    const partBody = trimmed.slice(partSplit + 4);
    const partContentType = (partHeaders['content-type'] || '').toLowerCase();
    const partEncoding = (partHeaders['content-transfer-encoding'] || '7bit').toLowerCase().trim();
    const disposition = (partHeaders['content-disposition'] || '').toLowerCase();

    // Check for nested multipart
    if (partContentType.includes('multipart/')) {
      const nestedBoundary = partContentType.match(/boundary="?([^";\r\n]+)"?/i);
      if (nestedBoundary) {
        const nested = parseMultipart(partBody, nestedBoundary[1].trim());
        if (!result.text && nested.text) result.text = nested.text;
        if (!result.html && nested.html) result.html = nested.html;
        result.attachmentNames.push(...nested.attachmentNames);
      }
      continue;
    }

    // Check if this is an attachment
    if (disposition.includes('attachment') || (disposition.includes('filename') && !partContentType.includes('text/'))) {
      const filenameMatch = disposition.match(/filename="?([^";\r\n]+)"?/i)
        || partContentType.match(/name="?([^";\r\n]+)"?/i);
      if (filenameMatch) {
        result.attachmentNames.push(decodeRfc2047(filenameMatch[1].trim()));
      } else {
        result.attachmentNames.push('(unnamed attachment)');
      }
      continue;
    }

    // Extract text content
    if (partContentType.includes('text/plain') && !result.text) {
      result.text = decodeBody(partBody, partEncoding);
    } else if (partContentType.includes('text/html') && !result.html) {
      result.html = decodeBody(partBody, partEncoding);
    }
  }

  return result;
}

// ─── Content Decoding ───────────────────────────────────────────────

/**
 * Quick check: does the string look like base64-encoded data?
 * Returns true if, after stripping whitespace, it contains only valid
 * base64 characters and is long enough to be plausible.
 */
function looksLikeBase64(str: string): boolean {
  const stripped = str.replace(/\s/g, '');
  if (stripped.length < 40) return false;
  // Must be only base64 chars (A-Z, a-z, 0-9, +, /, =)
  if (!/^[A-Za-z0-9+/=]+$/.test(stripped)) return false;
  // Must not look like normal English text (base64 has very uniform char distribution)
  const spaces = (str.match(/ /g) || []).length;
  const ratio = spaces / str.length;
  // Real text has ~15-20% spaces; base64 has near zero (only whitespace is line wraps)
  return ratio < 0.05;
}

function decodeBody(body: string, encoding: string): string {
  const clean = body.replace(/\r\n$/, '');

  switch (encoding.toLowerCase().trim()) {
    case 'base64':
      return decodeBase64Text(clean.replace(/\s/g, ''));
    case 'quoted-printable':
      return decodeQuotedPrintable(clean);
    case '7bit':
    case '8bit':
    case 'binary':
    default: {
      // Fallback: if encoding header was missing or wrong but the body
      // is clearly base64, decode it anyway. Common with Apple Mail
      // forwarded messages and some Outlook exports.
      if (looksLikeBase64(clean)) {
        const decoded = decodeBase64Text(clean.replace(/\s/g, ''));
        // Only use the decoded version if it produced readable text
        if (decoded && decoded !== clean.replace(/\s/g, '') && !looksLikeBase64(decoded)) {
          return decoded;
        }
      }
      return clean;
    }
  }
}

function decodeBase64Text(encoded: string): string {
  try {
    const binary = atob(encoded);
    // Try UTF-8 decoding
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    try {
      return atob(encoded);
    } catch {
      return encoded;
    }
  }
}

function decodeQuotedPrintable(encoded: string): string {
  return encoded
    // Soft line breaks (= at end of line)
    .replace(/=\r?\n/g, '')
    // Encoded characters =XX
    .replace(/=([0-9A-Fa-f]{2})/g, (_match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
}

// ─── HTML Stripping ─────────────────────────────────────────────────

function stripHtml(html: string): string {
  // Use DOMParser if available (browser), otherwise basic regex
  if (typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      // Remove style and script elements
      doc.querySelectorAll('style, script').forEach(el => el.remove());
      return (doc.body?.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
    } catch {
      // Fall through to regex
    }
  }

  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
