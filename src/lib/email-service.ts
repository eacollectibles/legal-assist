/**
 * Email notification service for appointment status changes
 */

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

const BUSINESS_EMAIL = 'jeanfrancois@legalassist.london';

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

/**
 * Send signed document via email with comprehensive logging
 */
export const sendSignedDocumentEmail = async (payload: EmailDocumentPayload): Promise<EmailActivityLog> => {
  const timestamp = new Date().toISOString();
  const activityLog: EmailActivityLog = {
    _id: crypto.randomUUID(),
    senderEmail: BUSINESS_EMAIL,
    senderName: payload.paralegalName,
    recipientEmails: [payload.to],
    subject: payload.subject,
    body: payload.body,
    renderedSubject: payload.subject,
    renderedBody: payload.body,
    documentId: payload.documentId,
    documentName: payload.documentName,
    attachmentUrl: payload.documentUrl,
    timestamp,
    deliveryStatus: 'pending',
  };

  try {
    // Validate recipient email
    if (!isValidEmail(payload.to)) {
      throw new Error('Invalid recipient email address');
    }

    // Generate stable filename
    const date = new Date().toISOString().split('T')[0];
    const stableFilename = `${payload.documentName} - ${payload.clientName} - Signed - ${date}.pdf`;

    const htmlContent = getSignedDocumentEmailTemplate(
      payload.clientName,
      payload.paralegalName,
      payload.body,
      payload.documentUrl,
      stableFilename
    );

    await sendEmail({
      to: payload.to,
      subject: payload.subject,
      html: htmlContent,
    });

    activityLog.deliveryStatus = 'sent';
    return activityLog;
  } catch (error) {
    activityLog.deliveryStatus = 'failed';
    activityLog.errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw error;
  }
};

/**
 * Validate email address format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Send booking confirmation email to client immediately after submission
 */
export const sendBookingConfirmationEmail = async (payload: BookingConfirmationPayload): Promise<void> => {
  try {
    const { clientName, clientEmail, serviceType, preferredDate, preferredTime, bookingId, confirmationToken } = payload;

    const subject = 'Your Appointment Request Has Been Received';
    const htmlContent = getBookingConfirmationTemplate(clientName, serviceType, preferredDate, preferredTime, bookingId, confirmationToken);

    await sendEmail({
      to: clientEmail,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    throw error;
  }
};

/**
 * Send email notification for appointment status change
 * Sends to both client and business
 */
export const sendStatusNotificationEmails = async (payload: EmailNotificationPayload): Promise<void> => {
  try {
    // Send to client
    await sendClientNotification(payload);
    
    // Send to business
    await sendBusinessNotification(payload);
  } catch (error) {
    console.error('Failed to send email notifications:', error);
    throw error;
  }
};

/**
 * Send notification email to client
 */
const sendClientNotification = async (payload: EmailNotificationPayload): Promise<void> => {
  const { clientName, clientEmail, status, serviceType, preferredDate, preferredTime, approvalNotes } = payload;

  const subject = getClientEmailSubject(status);
  const htmlContent = getClientEmailTemplate(clientName, status, serviceType, preferredDate, preferredTime, approvalNotes);

  await sendEmail({
    to: clientEmail,
    subject,
    html: htmlContent,
  });
};

/**
 * Send notification email to business
 */
const sendBusinessNotification = async (payload: EmailNotificationPayload): Promise<void> => {
  const { clientName, clientEmail, clientPhone, status, serviceType, preferredDate, preferredTime, approvalNotes, bookingId } = payload;

  const subject = getBusinessEmailSubject(status, clientName);
  const htmlContent = getBusinessEmailTemplate(clientName, clientEmail, clientPhone, status, serviceType, preferredDate, preferredTime, approvalNotes, bookingId);

  await sendEmail({
    to: BUSINESS_EMAIL,
    subject,
    html: htmlContent,
  });
};

/**
 * Generic email sending function
 * In production, this would integrate with an email service like SendGrid, AWS SES, or Mailgun
 */
const sendEmail = async (options: { to: string; subject: string; html: string }): Promise<void> => {
  try {
    // For now, we'll log the email that would be sent
    // In production, replace this with actual email service integration
    console.log('Email would be sent:', {
      to: options.to,
      subject: options.subject,
      timestamp: new Date().toISOString(),
    });

    // Placeholder for actual email sending
    // Example integration with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: options.to,
      from: 'noreply@legalassist.london',
      subject: options.subject,
      html: options.html,
    });
    */

    // Example integration with AWS SES:
    /*
    const ses = new AWS.SES();
    await ses.sendEmail({
      Source: 'noreply@legalassist.london',
      Destination: { ToAddresses: [options.to] },
      Message: {
        Subject: { Data: options.subject },
        Body: { Html: { Data: options.html } },
      },
    }).promise();
    */
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

/**
 * Get email subject for client based on status
 */
const getClientEmailSubject = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'Your Appointment Has Been Approved';
    case 'rejected':
      return 'Your Appointment Request Status';
    case 'pending':
    default:
      return 'Your Appointment Request Has Been Received';
  }
};

/**
 * Get email subject for business based on status
 */
const getBusinessEmailSubject = (status: string, clientName: string): string => {
  switch (status) {
    case 'approved':
      return `Appointment Approved: ${clientName}`;
    case 'rejected':
      return `Appointment Rejected: ${clientName}`;
    case 'pending':
    default:
      return `New Appointment Request: ${clientName}`;
  }
};

/**
 * Get HTML email template for client
 */
const getClientEmailTemplate = (
  clientName: string,
  status: string,
  serviceType: string,
  preferredDate: string,
  preferredTime: string,
  approvalNotes?: string
): string => {
  const statusMessage = getStatusMessage(status);
  const statusColor = getStatusColor(status);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #B94A1F; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; background-color: ${statusColor}; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin: 10px 0; }
          .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #B94A1F; }
          .detail-row { margin: 10px 0; }
          .detail-label { font-weight: bold; color: #4A2C23; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LegalAssist</h1>
            <p>Appointment Status Update</p>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            
            <p>${statusMessage}</p>
            
            <div class="status-badge">${status.toUpperCase()}</div>
            
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Service Type:</span> ${serviceType}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Date:</span> ${preferredDate}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Time:</span> ${preferredTime}
              </div>
              ${approvalNotes ? `<div class="detail-row"><span class="detail-label">Notes:</span> ${approvalNotes}</div>` : ''}
            </div>
            
            ${status === 'approved' ? `
              <p><strong>Your appointment has been confirmed!</strong> Our team will contact you shortly with additional details and any next steps.</p>
            ` : status === 'rejected' ? `
              <p>Unfortunately, we are unable to accommodate your appointment request at this time. If you have any questions, please don't hesitate to contact us.</p>
            ` : `
              <p>Thank you for submitting your appointment request. We have received it and will review it shortly. You will receive a confirmation email once your request has been approved or if we need any additional information.</p>
            `}
            
            <p>If you have any questions or need to make changes, please contact us:</p>
            <p>
              <strong>Phone:</strong> (555) 123-4567<br>
              <strong>Email:</strong> info@legalservices.com
            </p>
            
            <p>Best regards,<br>The LegalAssist Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2025 LegalAssist. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Get HTML email template for business
 */
const getBusinessEmailTemplate = (
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  status: string,
  serviceType: string,
  preferredDate: string,
  preferredTime: string,
  approvalNotes?: string,
  bookingId?: string
): string => {
  const statusColor = getStatusColor(status);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4A2C23; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; background-color: ${statusColor}; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin: 10px 0; }
          .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #B94A1F; }
          .detail-row { margin: 10px 0; }
          .detail-label { font-weight: bold; color: #4A2C23; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LegalAssist Admin</h1>
            <p>Appointment Status Change Notification</p>
          </div>
          <div class="content">
            <p>An appointment request has been <strong>${status.toUpperCase()}</strong>.</p>
            
            <div class="status-badge">${status.toUpperCase()}</div>
            
            <h3>Client Information</h3>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Name:</span> ${clientName}
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span> ${clientEmail}
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span> ${clientPhone}
              </div>
            </div>
            
            <h3>Appointment Details</h3>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span> ${bookingId}
              </div>
              <div class="detail-row">
                <span class="detail-label">Service Type:</span> ${serviceType}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Date:</span> ${preferredDate}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Time:</span> ${preferredTime}
              </div>
              ${approvalNotes ? `<div class="detail-row"><span class="detail-label">Admin Notes:</span> ${approvalNotes}</div>` : ''}
            </div>
            
            <p><strong>Action Required:</strong> If you need to make changes or follow up with the client, please log in to the admin panel.</p>
          </div>
          <div class="footer">
            <p>This is an automated notification. Please do not reply to this email.</p>
            <p>&copy; 2025 LegalAssist. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Get status message for client email
 */
const getStatusMessage = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'Great news! Your appointment request has been approved.';
    case 'rejected':
      return 'Thank you for your interest. Unfortunately, we are unable to accommodate your appointment request at this time.';
    case 'pending':
    default:
      return 'Thank you for submitting your appointment request. We have received it and will review it shortly.';
  }
};

/**
 * Get status color for email badges
 */
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return '#28a745'; // Green
    case 'rejected':
      return '#dc3545'; // Red
    case 'pending':
    default:
      return '#ffc107'; // Yellow/Orange
  }
};

/**
 * Get HTML email template for signed document delivery
 */
const getSignedDocumentEmailTemplate = (
  clientName: string,
  paralegalName: string,
  customMessage: string,
  documentUrl: string,
  filename: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #B94A1F; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
          .message-box { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #B94A1F; white-space: pre-wrap; }
          .document-box { background-color: #e8f5e9; border: 2px solid #4caf50; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
          .download-button { display: inline-block; background-color: #4caf50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 10px 0; }
          .download-button:hover { background-color: #45a049; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LegalAssist</h1>
            <p>Signed Document Delivery</p>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            
            <p>Please find your signed document attached to this email. This document has been electronically signed and is ready for your records.</p>
            
            ${customMessage ? `
              <div class="message-box">
                ${customMessage}
              </div>
            ` : ''}
            
            <div class="document-box">
              <h3 style="color: #2e7d32; margin-top: 0;">📄 Your Signed Document is Ready</h3>
              <p style="margin: 15px 0;"><strong>Filename:</strong> ${filename}</p>
              <a href="${documentUrl}" class="download-button" download="${filename}">
                Download Signed Document
              </a>
              <p style="font-size: 12px; color: #666; margin-top: 15px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${documentUrl}" style="color: #B94A1F; word-break: break-all;">${documentUrl}</a>
              </p>
            </div>
            
            <p><strong>Important:</strong> Please save this document for your records. If you have any questions about the document or need any clarification, please don't hesitate to contact us.</p>
            
            <div class="signature">
              <p>Best regards,</p>
              <p><strong>${paralegalName}</strong><br>
              LegalAssist<br>
              Phone: (555) 123-4567<br>
              Email: ${BUSINESS_EMAIL}</p>
            </div>
          </div>
          <div class="footer">
            <p>This email contains a legally signed document. Please keep it for your records.</p>
            <p>&copy; 2025 LegalAssist. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Get HTML email template for booking confirmation (sent immediately after submission)
 */
const getBookingConfirmationTemplate = (
  clientName: string,
  serviceType: string,
  preferredDate: string,
  preferredTime: string,
  bookingId: string,
  confirmationToken: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #B94A1F; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f5f0; padding: 20px; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; background-color: #ffc107; color: #333; padding: 8px 16px; border-radius: 4px; font-weight: bold; margin: 10px 0; }
          .details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #B94A1F; }
          .detail-row { margin: 10px 0; }
          .detail-label { font-weight: bold; color: #4A2C23; }
          .confirmation-box { background-color: #e8f5e9; border: 2px solid #4caf50; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .confirmation-box h3 { color: #2e7d32; margin-top: 0; }
          .next-steps { background-color: #fff3e0; border: 2px solid #ff9800; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .next-steps h3 { color: #e65100; margin-top: 0; }
          .next-steps ol { margin: 10px 0; padding-left: 20px; }
          .next-steps li { margin: 8px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .contact-info { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LegalAssist</h1>
            <p>Appointment Request Received</p>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>
            
            <p>Thank you for submitting your appointment request with LegalAssist. We have received your submission and are pleased to confirm that your request is now pending review.</p>
            
            <div class="status-badge">PENDING REVIEW</div>
            
            <div class="confirmation-box">
              <h3>✓ Your Request Has Been Received</h3>
              <p>We have successfully received your appointment request. Our team will review your information and contact you shortly to confirm your appointment or discuss any additional details we may need.</p>
            </div>
            
            <h3>Your Appointment Details</h3>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Confirmation ID:</span> ${bookingId}
              </div>
              <div class="detail-row">
                <span class="detail-label">Service Type:</span> ${serviceType}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Date:</span> ${preferredDate}
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Time:</span> ${preferredTime}
              </div>
              <div class="detail-row">
                <span class="detail-label">Confirmation Token:</span> <code style="background-color: #f0f0f0; padding: 2px 6px; border-radius: 3px;">${confirmationToken}</code>
              </div>
            </div>
            
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <ol>
                <li><strong>Review:</strong> Our team will review your appointment request within 1-2 business days</li>
                <li><strong>Confirmation:</strong> We will contact you via phone or email to confirm your appointment</li>
                <li><strong>Preparation:</strong> We may provide additional information or ask clarifying questions about your legal matter</li>
                <li><strong>Appointment:</strong> Your appointment will be scheduled at the confirmed date and time</li>
              </ol>
            </div>
            
            <h3>Keep This Information</h3>
            <p>Please save your Confirmation ID (${bookingId}) for your records. You may need it for future reference or if you need to reschedule your appointment.</p>
            
            <div class="contact-info">
              <h3>Questions or Need to Reschedule?</h3>
              <p>If you need to make changes to your appointment request or have any questions, please contact us:</p>
              <p>
                <strong>Phone:</strong> (555) 123-4567<br>
                <strong>Email:</strong> info@legalservices.com<br>
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
              </p>
            </div>
            
            <p>We look forward to assisting you with your legal matter.</p>
            
            <p>Best regards,<br><strong>The LegalAssist Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation message. Please do not reply to this email.</p>
            <p>If you did not submit this appointment request, please contact us immediately at info@legalservices.com</p>
            <p>&copy; 2025 LegalAssist. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
