/**
 * SMS service — thin client-side wrapper over /api/sms/send.
 *
 * Failure-tolerant by design: when SMS isn't configured (no
 * Twilio creds in Secrets Manager) the calls return {sent:false}
 * and the caller should fall back to email. Never throws.
 *
 * Setup (one-time, in Wix Secrets Manager):
 *   LA_TWILIO_ACCOUNT_SID      from twilio.com/console
 *   LA_TWILIO_AUTH_TOKEN       from twilio.com/console
 *   LA_TWILIO_FROM_NUMBER      +1XXXXXXXXXX, purchased on Twilio
 *
 * Once configured, the Send button on the paralegal Messages tab
 * and any of the higher-level helpers below will work without
 * code changes.
 */

interface SmsResult {
  sent: boolean;
  messageSid?: string;
  error?: string;
}

/**
 * Low-level: send a single SMS.
 */
export async function sendSms(to: string, body: string, ctx?: {
  fileId?: string;
  clientId?: string;
}): Promise<SmsResult> {
  try {
    const r = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, body, ...ctx }),
    });
    const j = await r.json().catch(() => ({}));
    return {
      sent: !!j?.success,
      messageSid: j?.messageSid,
      error: j?.error,
    };
  } catch (err: any) {
    return { sent: false, error: err?.message || 'network' };
  }
}

/* ─────────────────────────────────────────────────────────────
 * Higher-level helpers — each is a template that callers can
 * invoke without thinking about wording. Add new ones here when
 * a new SMS use case shows up.
 * ───────────────────────────────────────────────────────────── */

export function smsPaymentReceived(opts: {
  to: string;
  amount: number;
  referenceNumber: string;
  fileId?: string;
  clientId?: string;
}): Promise<SmsResult> {
  const body =
    `Legal Assist: We received your payment of $${opts.amount.toFixed(2)} ` +
    `(ref ${opts.referenceNumber}). Receipt will follow by email. ` +
    `Reply STOP to opt out.`;
  return sendSms(opts.to, body, { fileId: opts.fileId, clientId: opts.clientId });
}

export function smsDocumentReadyToSign(opts: {
  to: string;
  documentName: string;
  signUrl: string;
  fileId?: string;
  clientId?: string;
}): Promise<SmsResult> {
  const body =
    `Legal Assist: ${opts.documentName} is ready for your signature. ` +
    `Sign here: ${opts.signUrl}  Reply STOP to opt out.`;
  return sendSms(opts.to, body, { fileId: opts.fileId, clientId: opts.clientId });
}

export function smsHearingReminder(opts: {
  to: string;
  hearingDate: Date;
  tribunal: string;
  fileId?: string;
  clientId?: string;
}): Promise<SmsResult> {
  const dateStr = opts.hearingDate.toLocaleString('en-CA', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  const body =
    `Legal Assist reminder: your ${opts.tribunal} hearing is ${dateStr}. ` +
    `Please be ready 30 min in advance. Reply STOP to opt out.`;
  return sendSms(opts.to, body, { fileId: opts.fileId, clientId: opts.clientId });
}
