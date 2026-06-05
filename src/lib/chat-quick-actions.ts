/**
 * Quick actions — slash-command expansion for the paralegal
 * composer. Paralegal types `/pay 500 trust deposit` and the
 * composer expands it into a polite message with a pre-filled
 * link before sending.
 *
 * Add new actions here as the firm finds use for them. Keep the
 * expanded text professional and short — these are sent to real
 * clients.
 */

export interface ExpansionResult {
  /** True if a slash command matched. */
  matched: boolean;
  /** The text to actually send to the client. */
  text: string;
}

const BASE = 'https://www.legalassist.london';

/**
 * Try to expand a slash command at the start of `input`. Returns
 * the original input unchanged if nothing matches.
 *
 * Supported forms:
 *   /pay <amount> [type words...]
 *      type words match against: trust|deposit → trust_deposit
 *                                consult|consultation → consultation
 *                                anything else → invoice_payment
 *   /consult
 *   /sign  (placeholder — needs a signtoken in v2)
 *   /book  (alias for /consult)
 */
export function expandQuickAction(input: string): ExpansionResult {
  const raw = input.trim();
  if (!raw.startsWith('/')) return { matched: false, text: input };

  const parts = raw.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  if (cmd === '/pay') {
    const amount = parseFloat(parts[1] || '0');
    const rest = parts.slice(2).join(' ').toLowerCase();
    let type: 'trust_deposit' | 'consultation' | 'invoice_payment' = 'invoice_payment';
    if (rest.includes('trust') || rest.includes('deposit')) type = 'trust_deposit';
    else if (rest.includes('consult')) type = 'consultation';

    if (!amount || amount <= 0) {
      return {
        matched: true,
        text:
          `You can pay securely here: ${BASE}/pay\n\n` +
          `Square accepts all major cards. We also support Interac e-Transfer for lower fees — instructions on the same page.`,
      };
    }
    const params = new URLSearchParams({
      type, amount: amount.toFixed(0),
    });
    const typeLabel = type === 'trust_deposit'
      ? `$${amount.toFixed(2)} retainer / trust deposit`
      : type === 'consultation'
        ? `$${amount.toFixed(2)} consultation fee`
        : `$${amount.toFixed(2)}`;
    return {
      matched: true,
      text:
        `When you're ready, here's a pre-filled payment link for ${typeLabel}:\n\n` +
        `${BASE}/pay?${params.toString()}\n\n` +
        `Square card or Interac e-Transfer both work. Let me know once it's sent.`,
    };
  }

  if (cmd === '/consult' || cmd === '/book') {
    return {
      matched: true,
      text:
        `Let's get you on the calendar. You can pick a time that works for you here:\n\n` +
        `${BASE}/contact\n\n` +
        `Consultations are by phone or video — whichever you prefer.`,
    };
  }

  if (cmd === '/sign') {
    // Reserved. The actual sign-link flow requires generating a
    // sign-token via /api/sign/create-token first; the paralegal
    // does that from the Document Workflow page. For now we just
    // point the client there.
    return {
      matched: true,
      text:
        `I'll send you the signing link in the next message — give me a moment to prepare the document.`,
    };
  }

  if (cmd === '/intake') {
    return {
      matched: true,
      text:
        `To get started, fill out our quick intake form so we have your details on file:\n\n` +
        `${BASE}/client-intake\n\n` +
        `It takes about 5 minutes and lets us check for any conflicts before we proceed.`,
    };
  }

  // Unknown slash command — return unchanged so the paralegal
  // sees their literal text and can fix the typo.
  return { matched: false, text: input };
}

/**
 * For surfacing in a "Slash command hints" tooltip beside the
 * composer. UI-only.
 */
export const QUICK_ACTION_HINTS: Array<{ syntax: string; description: string }> = [
  { syntax: '/pay <amount> trust', description: 'Send a pre-filled retainer payment link' },
  { syntax: '/pay <amount>', description: 'Send a generic invoice payment link' },
  { syntax: '/consult', description: 'Send the consultation booking link' },
  { syntax: '/intake', description: 'Send the intake form link' },
  { syntax: '/sign', description: 'Promise to send a signing link (then attach it manually)' },
];
