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
  conflictMatterCity?: string;
  /** @wixFieldType boolean */
  conflictAcknowledged?: boolean;
  /** @wixFieldType text */
  conflictMatchesFound?: string;
  /** @wixFieldType text */
  opposingPartyRelationship?: string;
  /** @wixFieldType text */
  opposingPartyNames?: string;
  /** @wixFieldType text */
  conflictCheckStatus?: string;
  /** @wixFieldType datetime */
  conflictCheckDate?: Date | string;
  /** @wixFieldType boolean */
  conflictCheckCompleted?: boolean;
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

  // LSO By-Law 7.1 s.23(1) - Occupation & Business Info
  /** @wixFieldType text */
  occupation?: string;
  /** @wixFieldType boolean */
  hasBusinessInfo?: boolean;
  /** @wixFieldType text */
  businessAddress?: string;
  /** @wixFieldType text */
  businessPhone?: string;

  // LSO By-Law 7.1 s.23(1) - Organization/Third Party
  /** @wixFieldType boolean */
  isOrganization?: boolean;
  /** @wixFieldType text */
  orgName?: string;
  /** @wixFieldType text */
  orgIncorporationNumber?: string;
  /** @wixFieldType boolean */
  actingForThirdParty?: boolean;
  /** @wixFieldType text */
  thirdPartyName?: string;

  // LSO By-Law 7.1 s.23(4) - Identity Verification
  /** @wixFieldType text */
  idType?: string;
  /** @wixFieldType text */
  idNumber?: string;
  /** @wixFieldType text */
  idIssuingAuthority?: string;
  /** @wixFieldType date */
  idExpiryDate?: Date | string;
  /** @wixFieldType boolean */
  idVerificationConsent?: boolean;
  /** @wixFieldType boolean */
  isMinor?: boolean;
  /** @wixFieldType text */
  parentGuardianName?: string;
  /** @wixFieldType text */
  parentGuardianPhone?: string;

  // Ticket Quote fields
  /** @wixFieldType boolean */
  ticketQuoteCompleted?: boolean;
  /** @wixFieldType text */
  ticketOffenceType?: string;
  /** @wixFieldType number */
  ticketServiceFee?: number;
  /** @wixFieldType text */
  ticketRecommendation?: string;
}


/**
 * Collection ID: conflictlogs
 * Interface for ConflictLogs
 */
export interface ConflictLogs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  conflictCode?: string;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  conflictReason?: string;
  /** @wixFieldType datetime */
  detectedAt?: Date | string;
  /** @wixFieldType boolean */
  reviewed?: boolean;
  /** @wixFieldType text */
  reviewedBy?: string;
  /** @wixFieldType datetime */
  reviewedAt?: Date | string;
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
  /** @wixFieldType text - Stores the full HTML template content for regeneration */
  documentContent?: string;
  /** @wixFieldType text - Template ID used to generate this document */
  templateId?: string;
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
 * Collection ID: locations
 * Interface for Locations
 */
export interface Locations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  region?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType number */
  population?: number;
  /** @wixFieldType text */
  nearestCourt?: string;
  /** @wixFieldType number */
  distanceFromLondon?: number;
  /** @wixFieldType text */
  serviceAreas?: string;
  /** @wixFieldType text */
  highways?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  metaTitle?: string;
  /** @wixFieldType text */
  metaDescription?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  locationType?: string;
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


// ============================================================
// LSO BY-LAW 7.1 COMPLIANCE — CLIENT FILE SYSTEM ENTITIES
// ============================================================

/**
 * Collection ID: clientfiles
 * Main client file record — one per matter/retainer
 * Maps to LSO By-Law 7.1 file management requirements
 */
export interface ClientFiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text - Auto-generated: LA-YYYY-NNNN */
  fileNumber?: string;
  /** @wixFieldType text - Reference to clientprofiles */
  clientId?: string;
  /** @wixFieldType text - Denormalized client name for quick display */
  clientName?: string;
  /** @wixFieldType text - Reference to useraccounts */
  clientEmail?: string;
  /** @wixFieldType text - traffic|ltb|small_claims|criminal|hrto|employment|debt_collection */
  matterType?: string;
  /** @wixFieldType text */
  matterDescription?: string;
  /** @wixFieldType text - Tribunal or court name */
  tribunal?: string;
  /** @wixFieldType text - JSON array of opposing party objects */
  opposingParties?: string;
  /** @wixFieldType text - Reference to paralegal */
  assignedParalegalId?: string;
  /** @wixFieldType text */
  assignedParalegalName?: string;
  /** @wixFieldType text - active|closed|archived|pending */
  fileStatus?: string;
  /** @wixFieldType datetime */
  dateOpened?: Date | string;
  /** @wixFieldType datetime */
  dateClosed?: Date | string;
  /** @wixFieldType datetime - 6 years after closing per s.23(14) */
  retentionExpiryDate?: Date | string;
  /** @wixFieldType number - 0-100 overall compliance percentage */
  complianceScore?: number;
  /** @wixFieldType datetime */
  lastAuditDate?: Date | string;
  /** @wixFieldType text */
  courtFileNumber?: string;
  /** @wixFieldType text - passed|flagged */
  conflictStatus?: string;
  /** @wixFieldType text */
  notes?: string;
  // LSO Compliance section booleans — tracks per-section completeness
  /** @wixFieldType boolean */ sectionFileOpening?: boolean;
  /** @wixFieldType boolean */ sectionClientIdentification?: boolean;
  /** @wixFieldType boolean */ sectionClientVerification?: boolean;
  /** @wixFieldType boolean */ sectionSourceOfFunds?: boolean;
  /** @wixFieldType boolean */ sectionConflictCheck?: boolean;
  /** @wixFieldType boolean */ sectionRetainerAgreement?: boolean;
  /** @wixFieldType boolean */ sectionFinancialRecords?: boolean;
  /** @wixFieldType boolean */ sectionCommunicationLog?: boolean;
  /** @wixFieldType boolean */ sectionCaseDocuments?: boolean;
  /** @wixFieldType boolean */ sectionFileClosing?: boolean;
  /** @wixFieldType boolean */ sectionContingencyPlan?: boolean;
}

/**
 * Collection ID: clientidentification
 * LSO By-Law 7.1, s.23(1) — Client identification when retained
 */
export interface ClientIdentification {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text - Full legal name as on ID */
  fullLegalName?: string;
  /** @wixFieldType text */
  homeAddress?: string;
  /** @wixFieldType text */
  homePhone?: string;
  /** @wixFieldType text */
  businessAddress?: string;
  /** @wixFieldType text */
  businessPhone?: string;
  /** @wixFieldType text - s.23(1)5 */
  occupation?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  preferredLanguage?: string;
  /** @wixFieldType boolean - Is client an organization */
  isOrganization?: boolean;
  /** @wixFieldType text - s.23(1)4 */
  orgIncorporationNumber?: string;
  /** @wixFieldType text */
  orgPlaceOfIssue?: string;
  /** @wixFieldType text - JSON array of director names */
  orgDirectors?: string;
  /** @wixFieldType text - s.23(1)7 - JSON array */
  authorizedIndividuals?: string;
  /** @wixFieldType text - s.23(1)6 */
  orgNatureOfBusiness?: string;
  /** @wixFieldType boolean - s.23(1)8 */
  actingForThirdParty?: boolean;
  /** @wixFieldType text - JSON object with third party info */
  thirdPartyInfo?: string;
  /** @wixFieldType datetime - s.23(12.1) */
  dateCollected?: Date | string;
  /** @wixFieldType text */
  collectedBy?: string;
}

/**
 * Collection ID: clientverification
 * LSO By-Law 7.1, s.23(4)-(15) — Client verification for funds activities
 */
export interface ClientVerification {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text - drivers_licence|passport|health_card|citizenship_card|other */
  idType?: string;
  /** @wixFieldType text */
  idNumber?: string;
  /** @wixFieldType text */
  idIssuingAuthority?: string;
  /** @wixFieldType date */
  idExpiryDate?: Date | string;
  /** @wixFieldType url - Uploaded copy of ID per s.23(13) */
  idDocumentUrl?: string;
  /** @wixFieldType text - in_person|agent|credit_file|dual_source */
  verificationMethod?: string;
  /** @wixFieldType datetime */
  dateVerified?: Date | string;
  /** @wixFieldType text */
  verifiedBy?: string;
  /** @wixFieldType boolean */
  alternativeVerificationUsed?: boolean;
  /** @wixFieldType text */
  alternativeVerificationDetails?: string;
  /** @wixFieldType boolean - s.23(9)-(10) */
  isMinor?: boolean;
  /** @wixFieldType text - JSON for parent/guardian verification */
  parentGuardianVerification?: string;
  /** @wixFieldType boolean */
  verificationComplete?: boolean;
}

/**
 * Collection ID: fundsource
 * LSO By-Law 7.1, s.23(2) and s.23.1 — Source of funds and monitoring
 */
export interface FundSource {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType boolean - Is licensee handling funds per s.22(1)(b) */
  handlingFunds?: boolean;
  /** @wixFieldType text - s.23(2) */
  sourceDescription?: string;
  /** @wixFieldType text - s.23(2.1) - JSON */
  orgOwnershipInfo?: string;
  /** @wixFieldType text - s.23.1 - JSON array of monitoring entries */
  monitoringRecords?: string;
  /** @wixFieldType text */
  riskAssessmentResults?: string;
  /** @wixFieldType datetime */
  riskAssessmentDate?: Date | string;
  /** @wixFieldType text */
  assessedBy?: string;
}

/**
 * Collection ID: retaineragreements
 * Retainer agreements — Paralegal Rules of Conduct
 */
export interface RetainerAgreements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType url */
  documentUrl?: string;
  /** @wixFieldType datetime */
  dateSigned?: Date | string;
  /** @wixFieldType text */
  scopeOfServices?: string;
  /** @wixFieldType text - hourly|flat_fee|contingency|block_fee */
  feeArrangementType?: string;
  /** @wixFieldType text */
  feeAmount?: string;
  /** @wixFieldType boolean */
  trustAccountDisclosure?: boolean;
  /** @wixFieldType boolean */
  clientAcknowledgment?: boolean;
  /** @wixFieldType boolean */
  scopeLimitationsAcknowledged?: boolean;
  /** @wixFieldType text - draft|sent|signed|amended|terminated */
  retainerStatus?: string;
  /** @wixFieldType text - JSON array of amendment records */
  amendments?: string;
}

/**
 * Collection ID: financialrecords
 * LSO By-Law 7.1 — Financial record keeping (Forms 9A-9E)
 */
export interface FinancialRecords {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text - trust_deposit|trust_withdrawal|billing|payment|disbursement|refund */
  transactionType?: string;
  /** @wixFieldType number */
  amount?: number;
  /** @wixFieldType datetime */
  transactionDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  referenceNumber?: string;
  /** @wixFieldType text */
  trustAccountId?: string;
  /** @wixFieldType text */
  invoiceNumber?: string;
  /** @wixFieldType text */
  paymentMethod?: string;
  /** @wixFieldType text */
  recordedBy?: string;
}

/**
 * Collection ID: communicationlog
 * Communication tracking for client file — s.23(14) retention
 */
export interface CommunicationLog {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text - email|phone|in_person|letter|court_notice|portal_message */
  communicationType?: string;
  /** @wixFieldType datetime */
  communicationDate?: Date | string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  details?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text - Reference to messages collection */
  linkedMessageId?: string;
  /** @wixFieldType text - inbound|outbound */
  direction?: string;
}

/**
 * Collection ID: casedocuments
 * Case documents — evidence, filings, correspondence tracked per file
 */
export interface CaseDocuments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text - Reference to clientfiles */
  fileId?: string;
  /** @wixFieldType text */
  fileName?: string;
  /** @wixFieldType text - court_filing|evidence|correspondence|agreement|notice|affidavit|photo_video|other */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  dateAdded?: Date | string;
  /** @wixFieldType text */
  addedBy?: string;
  /** @wixFieldType text */
  fileSize?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType boolean */
  isPrivileged?: boolean;
  /** @wixFieldType number */
  version?: number;
}

/**
 * Collection ID: fileclosing
 * File closing records — retention per s.23(14)
 */
export interface FileClosing {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text - Matter outcome */
  disposition?: string;
  /** @wixFieldType datetime */
  dateClosed?: Date | string;
  /** @wixFieldType url */
  finalAccountUrl?: string;
  /** @wixFieldType text - Description of trust fund disposition */
  trustFundDisposition?: string;
  /** @wixFieldType text - JSON array of documents returned */
  documentsReturnedList?: string;
  /** @wixFieldType datetime */
  retentionStartDate?: Date | string;
  /** @wixFieldType number - Minimum 6 per s.23(14) */
  retentionPeriodYears?: number;
  /** @wixFieldType boolean */
  closingChecklistCompleted?: boolean;
  /** @wixFieldType boolean */
  clientNotified?: boolean;
  /** @wixFieldType datetime */
  clientNotifiedDate?: Date | string;
  /** @wixFieldType text - JSON checklist items with completion status */
  closingChecklist?: string;
}

/**
 * Collection ID: compliancechecklist
 * Tracks completion status of each LSO compliance section per file
 */
export interface ComplianceChecklist {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fileId?: string;
  /** @wixFieldType text */
  clientId?: string;
  /** @wixFieldType boolean - Section A: File Opening */
  sectionA_complete?: boolean;
  /** @wixFieldType boolean - Section B: Client Identification */
  sectionB_complete?: boolean;
  /** @wixFieldType boolean - Section C: Client Verification */
  sectionC_complete?: boolean;
  /** @wixFieldType boolean - Section D: Source of Funds */
  sectionD_complete?: boolean;
  /** @wixFieldType boolean - Section E: Conflict Check */
  sectionE_complete?: boolean;
  /** @wixFieldType boolean - Section F: Retainer Agreement */
  sectionF_complete?: boolean;
  /** @wixFieldType boolean - Section G: Financial Records */
  sectionG_complete?: boolean;
  /** @wixFieldType boolean - Section H: Communication Log */
  sectionH_complete?: boolean;
  /** @wixFieldType boolean - Section I: Case Documents */
  sectionI_complete?: boolean;
  /** @wixFieldType boolean - Section J: File Closing */
  sectionJ_complete?: boolean;
  /** @wixFieldType boolean - Section K: Contingency Plan */
  sectionK_complete?: boolean;
  /** @wixFieldType number */
  overallCompliancePercent?: number;
  /** @wixFieldType datetime */
  lastCheckedDate?: Date | string;
  /** @wixFieldType text */
  checkedBy?: string;
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
