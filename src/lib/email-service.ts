/**
 * Email Service — powered by EmailJS
 *
 * Sends emails directly from the browser using EmailJS.
 * No backend required. Supports:
 *  - Plain text emails (notifications, status updates)
 *  - Document emails with download links
 *  - Court form emails with pre-filled form attachments
 *
 * SETUP REQUIRED:
 * 1. Create a free account at https://www.emailjs.com
 * 2. Connect your email provider (Gmail, Outlook, etc.)
 * 3. Create email templates (see template IDs below)
 * 4. Copy your Service ID, Template IDs, and Public Key below
 */

import emailjs from '@emailjs/browser';

// ============================================================
// EMAILJS CONFIGURATION
// ============================================================
// EmailJS credentials — configured via https://dashboard.emailjs.com

const EMAILJS_CONFIG = {
  serviceId: 'service_k8ftd61',           // Your EmailJS service ID
  publicKey: 'qloAMKgkOi3P8Lw3Z',       // Your EmailJS public key

  // Template IDs — create these in the EmailJS dashboard
  templates: {
    /** General email template: {{to_email}}, {{subject}}, {{message}}, {{from_name}} */
    general: 'template_general',

    /** Document email: {{to_email}}, {{subject}}, {{message}}, {{from_name}}, {{document_name}}, {{document_link}} */
    document: 'template_document',

    /** Booking notification: {{to_email}}, {{client_name}}, {{service_type}}, {{date}}, {{time}}, {{status}} */
    booking: 'template_booking',

    /** Court forms email: {{to_email}}, {{subject}}, {{message}}, {{from_name}}, {{court_name}}, {{client_name}}, {{form_list}} */
    courtForms: 'template_court_forms',
  },
};

// Initialize EmailJS
let initialized = false;
function ensureInitialized() {
  if (!initialized) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    initialized = true;
  }
}

// ============================================================
// INTERFACES (preserved from original for backward compatibility)
// ============================================================

export interface EmailNotificationPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  status: 'pending' | 'approved' | 'rejected';
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  approvalNotes?: string;
  bookingId: string;
}

export interface BookingConfirmationPayload {
  clientName: string;
  clientEmail: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  bookingId: string;
  confirmationToken: string;
}

export interface EmailDocumentPayload {
  to: string;
  subject: string;
  body: string;
  documentUrl: string;
  documentName: string;
  clientName: string;
  paralegalName: string;
  documentId: string;
  clientId?: string;
  /** File ID for tracking — used to scope the document-opened
   *  pixel to the correct client file's communication log.
   *  Optional; when present, every outbound retainer email gets
   *  an invisible 1×1 pixel that posts to /api/track/document-opened
   *  the first time the recipient opens the email. */
  fileId?: string;
}

/**
 * Build the URL of the 1×1 tracking pixel embedded at the bottom
 * of outbound retainer emails. When the recipient renders the
 * message, the pixel loads and the server writes a
 * "Client opened the retainer email" entry to the client file's
 * communication log (LSO By-Law 7.1 s.23(14)).
 *
 * Idempotent per (documentId, day) — see
 * /api/track/document-opened.ts.
 */
function buildTrackingPixelUrl(
  documentId: string | undefined,
  clientId: string | undefined,
  fileId: string | undefined,
): string {
  if (!documentId || !clientId) return '';
  const base = 'https://www.legalassist.london/api/track/document-opened';
  const params = new URLSearchParams({
    doc: documentId,
    client: clientId,
  });
  if (fileId) params.set('file', fileId);
  return `${base}?${params.toString()}`;
}

export interface EmailActivityLog {
  _id: string;
  senderEmail: string;
  senderName: string;
  recipientEmails: string[];
  subject: string;
  body: string;
  renderedSubject: string;
  renderedBody: string;
  documentId?: string;
  documentName?: string;
  attachmentUrl?: string;
  timestamp: string;
  deliveryStatus: 'sent' | 'failed' | 'pending';
  errorMessage?: string;
}

export interface SimpleEmailPayload {
  to: string;
  subject: string;
  body: string;
}

// ============================================================
// CORE SEND FUNCTION
// ============================================================

/**
 * Low-level EmailJS send wrapper with retry and logging.
 */
async function sendViaEmailJS(
  templateId: string,
  templateParams: Record<string, string>,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  ensureInitialized();

  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      templateParams,
    );

    console.log(`[EmailJS] Sent successfully: ${result.status} ${result.text}`);
    return { success: true, messageId: result.text };
  } catch (error: any) {
    const errorMsg = error?.text || error?.message || 'Unknown EmailJS error';
    console.error(`[EmailJS] Send failed:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

// ============================================================
// PUBLIC API — drop-in replacements for the disabled functions
// ============================================================

/**
 * Send a signed document email with a download link.
 * Used by: DocumentWorkflowPage, ParalegalDashboardPage, SignaturesTab
 */
export const sendSignedDocumentEmail = async (payload: EmailDocumentPayload): Promise<EmailActivityLog> => {
  // Build the tracking pixel and append it to the body so the
  // server logs "Client opened the retainer email" the first
  // time the recipient renders the message. Plain <img> with
  // width=1 height=1 — universally supported by email clients.
  const pixelUrl = buildTrackingPixelUrl(
    payload.documentId,
    payload.clientId,
    payload.fileId,
  );
  const bodyWithPixel = pixelUrl
    ? `${payload.body}\n\n<img src="${pixelUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />`
    : payload.body;

  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.document, {
    to_email: payload.to,
    subject: payload.subject,
    message: bodyWithPixel,
    from_name: payload.paralegalName || 'Legal Assist Paralegal Services',
    document_name: payload.documentName,
    document_link: payload.documentUrl || '',
    client_name: payload.clientName,
  });

  const now = new Date().toISOString();

  if (!result.success) {
    throw new Error(result.error || 'Failed to send email');
  }

  // Return an activity log for tracking
  return {
    _id: `email_${Date.now()}`,
    senderEmail: 'jeanfrancois@legalassist.london',
    senderName: payload.paralegalName,
    recipientEmails: [payload.to],
    subject: payload.subject,
    body: payload.body,
    renderedSubject: payload.subject,
    renderedBody: payload.body,
    documentId: payload.documentId,
    documentName: payload.documentName,
    attachmentUrl: payload.documentUrl,
    timestamp: now,
    deliveryStatus: 'sent',
  };
};

/**
 * Send a booking confirmation email.
 * Used by: AdminBookingsPage
 */
export const sendBookingConfirmationEmail = async (payload: BookingConfirmationPayload): Promise<void> => {
  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.booking, {
    to_email: payload.clientEmail,
    client_name: payload.clientName,
    service_type: payload.serviceType,
    date: payload.preferredDate,
    time: payload.preferredTime,
    status: 'confirmed',
    from_name: 'Legal Assist Paralegal Services',
  });

  if (!result.success) {
    throw new Error(result.error || 'Failed to send booking confirmation');
  }
};

/**
 * Send status notification emails (approve/reject bookings & meetings).
 * Used by: AdminMeetingRequestsPage, AdminBookingsPage
 */
export const sendStatusNotificationEmails = async (payload: EmailNotificationPayload): Promise<void> => {
  const statusText = payload.status === 'approved'
    ? 'has been approved'
    : payload.status === 'rejected'
      ? 'has been declined'
      : 'is pending review';

  const subject = payload.status === 'approved'
    ? `Your ${payload.serviceType} has been confirmed`
    : payload.status === 'rejected'
      ? `Update regarding your ${payload.serviceType} request`
      : `Your ${payload.serviceType} request is being reviewed`;

  const body = `Dear ${payload.clientName},\n\nYour ${payload.serviceType} request for ${payload.preferredDate} at ${payload.preferredTime} ${statusText}.\n\n${payload.approvalNotes ? `Notes: ${payload.approvalNotes}\n\n` : ''}If you have any questions, please don't hesitate to contact us.\n\nThank you,\nLegal Assist Paralegal Services`;

  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.booking, {
    to_email: payload.clientEmail,
    client_name: payload.clientName,
    service_type: payload.serviceType,
    date: payload.preferredDate,
    time: payload.preferredTime,
    status: payload.status,
    subject: subject,
    message: body,
    from_name: 'Legal Assist Paralegal Services',
  });

  if (!result.success) {
    throw new Error(result.error || 'Failed to send status notification');
  }
};

/**
 * Send a simple email (plain text).
 * Used by: AdminMessagesPage (client message notifications)
 */
export const sendEmail = async (payload: SimpleEmailPayload): Promise<void> => {
  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.general, {
    to_email: payload.to,
    subject: payload.subject,
    message: payload.body,
    from_name: 'Legal Assist Paralegal Services',
  });

  if (!result.success) {
    throw new Error(result.error || 'Failed to send email');
  }
};

// ============================================================
// NEW: Court Forms Email (for Traffic Ticket Onboarding)
// ============================================================

export interface CourtFormsEmailPayload {
  to: string;
  subject: string;
  body: string;
  courtName: string;
  clientName: string;
  formNames: string[];
  formUrls?: string[];       // Original blank form download URLs
  paralegalName: string;
}

/**
 * Send an email to the court with form information and download links.
 * Used by: TrafficTicketOnboarding
 */
export const sendCourtFormsEmail = async (payload: CourtFormsEmailPayload): Promise<void> => {
  // Build form list with download links when available
  const formList = payload.formNames.map((name, i) => {
    const url = payload.formUrls?.[i];
    if (url) {
      return `${i + 1}. ${name}\n   Download: ${url}`;
    }
    return `${i + 1}. ${name}`;
  }).join('\n\n');

  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.courtForms, {
    to_email: payload.to,
    subject: payload.subject,
    message: payload.body,
    from_name: payload.paralegalName || 'Legal Assist Paralegal Services',
    court_name: payload.courtName,
    client_name: payload.clientName,
    form_list: formList,
  });

  if (!result.success) {
    throw new Error(result.error || 'Failed to send court forms email');
  }
};

/**
 * Send a document email (works for ANY status — draft, sent, or signed).
 * Used by: DocumentWorkflowPage for emailing documents before/after signing.
 *
 * Mirrors sendSignedDocumentEmail: also appends the 1×1 tracking pixel
 * to the body when the payload carries a documentId + clientId, so we
 * get a "Client opened the retainer email" event regardless of which
 * helper sent it.
 */
export const sendDocumentEmail = async (payload: EmailDocumentPayload): Promise<EmailActivityLog> => {
  const pixelUrl = buildTrackingPixelUrl(
    payload.documentId,
    payload.clientId,
    payload.fileId,
  );
  const bodyWithPixel = pixelUrl
    ? `${payload.body}\n\n<img src="${pixelUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />`
    : payload.body;

  const result = await sendViaEmailJS(EMAILJS_CONFIG.templates.document, {
    to_email: payload.to,
    subject: payload.subject,
    message: bodyWithPixel,
    from_name: payload.paralegalName || 'Legal Assist Paralegal Services',
    document_name: payload.documentName,
    document_link: payload.documentUrl || '',
    client_name: payload.clientName,
  });

  const now = new Date().toISOString();

  if (!result.success) {
    throw new Error(result.error || 'Failed to send email');
  }

  return {
    _id: `email_${Date.now()}`,
    senderEmail: 'jeanfrancois@legalassist.london',
    senderName: payload.paralegalName,
    recipientEmails: [payload.to],
    subject: payload.subject,
    body: payload.body,
    renderedSubject: payload.subject,
    renderedBody: payload.body,
    documentId: payload.documentId,
    documentName: payload.documentName,
    attachmentUrl: payload.documentUrl,
    timestamp: now,
    deliveryStatus: 'sent',
  };
};
