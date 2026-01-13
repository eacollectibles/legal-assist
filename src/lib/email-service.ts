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

const BUSINESS_EMAIL = 'jeanfrancois@legalassist.london';

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
