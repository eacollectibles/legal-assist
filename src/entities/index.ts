/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: activitylogs
 * Interface for ActivityLogs
 */
export interface ActivityLogs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  activityType?: string;
  /** @wixFieldType text */
  activityDescription?: string;
  /** @wixFieldType text */
  performedBy?: string;
  /** @wixFieldType text */
  performedByName?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
  /** @wixFieldType text */
  relatedItemId?: string;
}


/**
 * Collection ID: appointments
 * Interface for UpcomingAppointmentsandDeadlines
 */
export interface UpcomingAppointmentsandDeadlines {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  assignedParalegalId?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  priority?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  notes?: string;
}


/**
 * Collection ID: bookings
 * Interface for Bookings
 */
export interface Bookings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  clientPhone?: string;
  /** @wixFieldType date */
  preferredDate?: Date | string;
  /** @wixFieldType time */
  preferredTime?: any;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  clientNotes?: string;
}


/**
 * Collection ID: clientdocuments
 * Interface for ClientDocuments
 */
export interface ClientDocuments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  documentName?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType datetime */
  uploadDate?: Date | string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  fileType?: string;
  /** @wixFieldType number */
  fileSize?: number;
  /** @wixFieldType text */
  documentCategory?: string;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType text */
  clientId?: string;
}


/**
 * Collection ID: clientprofiles
 * Interface for ClientProfiles
 */
export interface ClientProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType date */
  courtDeadline?: Date | string;
  /** @wixFieldType text */
  preferredTimes?: string;
  /** @wixFieldType text */
  preferredDays?: string;
  /** @wixFieldType text */
  additionalNotes?: string;
  /** @wixFieldType boolean */
  consultedOther?: boolean;
  /** @wixFieldType text */
  unitNumber?: string;
  /** @wixFieldType boolean */
  hasCourtDocuments?: boolean;
  /** @wixFieldType text */
  caseDescription?: string;
  /** @wixFieldType text */
  caseType?: string;
  /** @wixFieldType text */
  emergencyContactRelationship?: string;
  /** @wixFieldType text */
  howHeardAboutUs?: string;
  /** @wixFieldType text */
  bestTimeToContact?: string;
  /** @wixFieldType text */
  preferredContactMethod?: string;
  /** @wixFieldType text */
  alternatePhone?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  preferredLanguage?: string;
  /** @wixFieldType text */
  preferredName?: string;
  /** @wixFieldType boolean */
  intakeCompleted?: boolean;
  /** @wixFieldType datetime */
  intakeCompletedDate?: Date | string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType text */
  streetAddress?: string;
  /** @wixFieldType text */
  city?: string;
  /** @wixFieldType text */
  state?: string;
  /** @wixFieldType text */
  zipCode?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  emergencyContactName?: string;
  /** @wixFieldType text */
  emergencyContactPhone?: string;
}


/**
 * Collection ID: documenttemplates
 * Interface for DocumentTemplates
 */
export interface DocumentTemplates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  templateName?: string;
  /** @wixFieldType text */
  templateType?: string;
  /** @wixFieldType text */
  templateContent?: string;
  /** @wixFieldType text */
  createdBy?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: fileassignments
 * Interface for FileAssignments
 */
export interface FileAssignments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  paralegalId?: string;
  /** @wixFieldType datetime */
  assignedDate?: Date | string;
  /** @wixFieldType text */
  assignedBy?: string;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType text */
  fileStatus?: string;
  /** @wixFieldType text */
  caseType?: string;
}


/**
 * Collection ID: generateddocuments
 * Interface for GeneratedDocuments
 */
export interface GeneratedDocuments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  documentName?: string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType datetime */
  generationDate?: Date | string;
  /** @wixFieldType datetime */
  sentDate?: Date | string;
  /** @wixFieldType datetime */
  signedDate?: Date | string;
  /** @wixFieldType boolean */
  requiresSignature?: boolean;
  /** @wixFieldType url */
  documentUrl?: string;
  /** @wixFieldType url */
  signedDocumentUrl?: string;
}


/**
 * Collection ID: legalservicecategories
 * Interface for LegalServiceCategories
 */
export interface LegalServiceCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  costStructure?: string;
  /** @wixFieldType text */
  complianceNotes?: string;
  /** @wixFieldType text */
  servicesIncluded?: string;
  /** @wixFieldType text */
  estimatedTimeline?: string;
  /** @wixFieldType text */
  servicesExcluded?: string;
  /** @wixFieldType text */
  faqs?: string;
  /** @wixFieldType text */
  disclaimers?: string;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  processSteps?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  relevantTribunal?: string;
  /** @wixFieldType text */
  eligibilityCriteria?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryImage?: string;
  /** @wixFieldType boolean */
  isCurrentlyOffered?: boolean;
}


/**
 * Collection ID: messages
 * Interface for Messages
 */
export interface Messages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  priority?: string;
  /** @wixFieldType url */
  attachmentUrl?: string;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  matterId?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  recipientEmail?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  sentDate?: Date | string;
  /** @wixFieldType boolean */
  isRead?: boolean;
  /** @wixFieldType text */
  conversationId?: string;
}


/**
 * Collection ID: notifications
 * Interface for Notifications
 */
export interface Notifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  notificationType?: string;
  /** @wixFieldType text */
  notificationTitle?: string;
  /** @wixFieldType text */
  notificationMessage?: string;
  /** @wixFieldType boolean */
  isRead?: boolean;
  /** @wixFieldType datetime */
  createdDate?: Date | string;
  /** @wixFieldType text */
  relatedActivityId?: string;
}


/**
 * Collection ID: paymentrecords
 * Interface for PaymentRecords
 */
export interface PaymentRecords {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  paymentAmount?: number;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType date */
  paymentDate?: Date | string;
  /** @wixFieldType text */
  paymentStatus?: string;
  /** @wixFieldType text */
  transactionId?: string;
}


/**
 * Collection ID: uploadtokens
 * Interface for UploadTokens
 */
export interface UploadTokens {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  token?: string;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  matterId?: string;
  /** @wixFieldType text */
  matterReference?: string;
  /** @wixFieldType text */
  documentId?: string;
  /** @wixFieldType text */
  createdByParalegalId?: string;
  /** @wixFieldType text */
  createdByParalegalName?: string;
  /** @wixFieldType text */
  allowedPurpose?: string;
  /** @wixFieldType datetime */
  expiryDate?: Date | string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType number */
  maxFileSize?: number;
  /** @wixFieldType text */
  allowedFileTypes?: string;
  /** @wixFieldType number */
  usageCount?: number;
  /** @wixFieldType number */
  maxUsageCount?: number;
  /** @wixFieldType datetime */
  createdDate?: Date | string;
  /** @wixFieldType datetime */
  lastUsedDate?: Date | string;
  /** @wixFieldType datetime */
  revokedDate?: Date | string;
  /** @wixFieldType text */
  revokedBy?: string;
  /** @wixFieldType text */
  notes?: string;
}


/**
 * Collection ID: useraccounts
 * Interface for UserAccounts
 */
export interface UserAccounts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  passwordHash?: string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType boolean */
  isAdmin?: boolean;
  /** @wixFieldType datetime */
  lastLoginDate?: Date | string;
  /** @wixFieldType text */
  accountStatus?: string;
}
