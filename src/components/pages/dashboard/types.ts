// Shared types for Client Dashboard components

export interface CurrentUser {
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  clientId?: string;
}

export interface ClientDocument {
  _id: string;
  documentName?: string;
  fileUrl?: string;
  uploadDate?: Date | string;
  clientEmail?: string;
  fileType?: string;
  fileSize?: number;
  documentCategory?: string;
  notes?: string;
}

export interface ClientProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  intakeCompleted?: boolean;
  intakeCompletedDate?: Date | string;
  dateOfBirth?: Date | string;
  preferredName?: string;
  preferredLanguage?: string;
  howHeardAboutUs?: string;
  alternatePhone?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
  unitNumber?: string;
  emergencyContactRelationship?: string;
  caseType?: string;
  caseDescription?: string;
  hasCourtDocuments?: boolean;
  courtDeadline?: Date | string;
  consultedOther?: boolean;
  additionalNotes?: string;
  preferredDays?: string;
  preferredTimes?: string;
}

export interface PaymentRecord {
  _id: string;
  paymentAmount?: number;
  serviceType?: string;
  paymentDate?: Date | string;
  paymentStatus?: string;
  transactionId?: string;
}

export interface Message {
  _id: string;
  senderEmail?: string;
  senderName?: string;
  recipientEmail?: string;
  messageContent?: string;
  sentDate?: Date | string;
  isRead?: boolean;
  conversationId?: string;
}

export interface Notification {
  _id: string;
  userId?: string;
  notificationType?: string;
  notificationTitle?: string;
  notificationMessage?: string;
  isRead?: boolean;
  createdDate?: Date | string;
  relatedActivityId?: string;
}

export interface UserAccount {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
