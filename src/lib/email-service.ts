// Temporarily disabled - Microsoft Graph backend not compatible with Wix Studio

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

export const sendSignedDocumentEmail = async (payload: EmailDocumentPayload): Promise<EmailActivityLog> => {
  console.log('Email disabled - would send to:', payload.to);
  throw new Error('Email functionality temporarily disabled');
};

export const sendBookingConfirmationEmail = async (payload: BookingConfirmationPayload): Promise<void> => {
  console.log('Email disabled - booking confirmation for:', payload.clientEmail);
};

export const sendStatusNotificationEmails = async (payload: EmailNotificationPayload): Promise<void> => {
  console.log('Email disabled - status notification for:', payload.clientEmail);
};
