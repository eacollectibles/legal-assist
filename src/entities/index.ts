/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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
  /** @wixFieldType text */
  status?: 'pending' | 'confirmed' | 'approved' | 'rejected' | 'rescheduled' | 'cancelled';
  /** @wixFieldType text */
  approvalNotes?: string;
  /** @wixFieldType url */
  meetingLink?: string;
  /** @wixFieldType url */
  zoomUrl?: string;
  /** @wixFieldType text */
  confirmationToken?: string;
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
  /** @wixFieldType image */
  categoryImage?: string;
  /** @wixFieldType boolean */
  isCurrentlyOffered?: boolean;
}


/**
 * Collection ID: meetingrequests
 * Interface for MeetingRequests
 */
export interface MeetingRequests {
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
  /** @wixFieldType text */
  status?: 'pending' | 'approved' | 'rejected';
  /** @wixFieldType text */
  approvalNotes?: string;
  /** @wixFieldType url */
  meetingLink?: string;
  /** @wixFieldType url */
  zoomUrl?: string;
  /** @wixFieldType text */
  confirmationToken?: string;
}
