/**
 * Canned replies — quick-insertable templates for the paralegal
 * chat panel. Grouped by intent. The paralegal clicks one to
 * pre-fill the composer; they can still edit before sending.
 *
 * Keep these short, plain-English, and risk-controlled. NEVER
 * include fee quotes or outcome guarantees here.
 */

export interface CannedReply {
  id: string;
  category: string;
  label: string;
  body: string;
}

export const CANNED_REPLIES: CannedReply[] = [
  // ── Greetings ──
  {
    id: 'greet-hi',
    category: 'Greetings',
    label: 'Hi + intro',
    body: `Hi! Thanks for reaching out to Legal Assist. I'm Johnny — give me a moment to read what you've sent and I'll be right with you.`,
  },
  {
    id: 'greet-busy',
    category: 'Greetings',
    label: 'Be right with you',
    body: `Thanks for your patience — I'm finishing something up and will be with you in a few minutes.`,
  },

  // ── Triage ──
  {
    id: 'triage-tell-more',
    category: 'Triage',
    label: 'Tell me more',
    body: `Can you tell me a bit more about what's happened so far? Dates, who's involved, and any documents you've received will help me figure out the best next step.`,
  },
  {
    id: 'triage-not-our-area',
    category: 'Triage',
    label: 'Not our practice area',
    body: `Thanks for letting me know. That sounds like something outside our paralegal scope — we'd want to refer you to the right professional rather than try to help with the wrong tools. Would you like me to point you in a direction?`,
  },
  {
    id: 'triage-needs-lawyer',
    category: 'Triage',
    label: 'Needs a lawyer',
    body: `That sounds like something that needs a lawyer rather than a paralegal — paralegals in Ontario can't represent on that type of matter. We can refer you to a lawyer if you'd like.`,
  },

  // ── Scheduling ──
  {
    id: 'sched-consult',
    category: 'Scheduling',
    label: 'Book a consult',
    body: `The fastest path is a short consultation so we can look at your situation properly. You can book here: https://www.legalassist.london/contact — pick a time that works for you and we'll go from there.`,
  },
  {
    id: 'sched-call-back',
    category: 'Scheduling',
    label: 'Schedule a call back',
    body: `Want me to call you back today? If so, what's the best number to reach you on and roughly what time works?`,
  },

  // ── Fees & retainer ──
  {
    id: 'fee-no-quote',
    category: 'Fees',
    label: 'Can\'t quote without details',
    body: `I can't quote a fee until I know what's involved — the work varies a lot between matters. Once we've had a quick consult I can give you a clear flat fee or hourly rate, and you can decide from there.`,
  },
  {
    id: 'fee-retainer-process',
    category: 'Fees',
    label: 'How retainers work',
    body: `Our retainer process is straightforward: after the consult I'll send you a clear written agreement with the scope and fee. You sign electronically, deposit funds into trust through Square or e-Transfer, and we get started. Funds stay in trust until earned.`,
  },

  // ── LTB-specific ──
  {
    id: 'ltb-eviction-urgent',
    category: 'LTB',
    label: 'Eviction — urgent',
    body: `Eviction matters move fast — please send me a photo of any notice you've received and the date you got it. The form number (N4, N5, N12, N13) tells us a lot about timing. We'll prioritize a same-day or next-day call.`,
  },
  {
    id: 'ltb-rta-section',
    category: 'LTB',
    label: 'Send RTA section',
    body: `That's typically governed by the Residential Tenancies Act. I'll send you the relevant section and a short plain-English summary once we've confirmed which type of issue this is.`,
  },

  // ── Traffic / POA ──
  {
    id: 'poa-ticket-photo',
    category: 'Traffic',
    label: 'Send ticket photo',
    body: `Can you send me a clear photo of both sides of the ticket? I'll check the deadline to file a notice of intent — Ontario tickets typically have a 15-day clock running.`,
  },

  // ── Closing ──
  {
    id: 'close-thanks',
    category: 'Closing',
    label: 'Thanks + next step',
    body: `Thanks — I'll review what you've sent and get back to you with concrete next steps shortly. Anything urgent in the meantime, you can email jeanfrancois@legalassist.london.`,
  },
  {
    id: 'close-handoff',
    category: 'Closing',
    label: 'Handoff to email',
    body: `Let's move this to email so I can attach documents properly. I'll email you in the next few minutes from jeanfrancois@legalassist.london.`,
  },
];

export function groupedCannedReplies(): Record<string, CannedReply[]> {
  const out: Record<string, CannedReply[]> = {};
  for (const r of CANNED_REPLIES) {
    if (!out[r.category]) out[r.category] = [];
    out[r.category].push(r);
  }
  return out;
}
